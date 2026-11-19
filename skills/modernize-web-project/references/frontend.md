# Frontend

Three checks for projects with a UI: interaction semantics, Tailwind v4 canonical classes, and template-default styling. The first is about correctness and accessibility; the other two are maintainability and intent.

## Interaction semantics

In JSX, the oxlint `jsx-a11y` rules from step 5 (`click-events-have-key-events`, `no-static-element-interactions`, `interactive-supports-focus`, `anchor-is-valid`) already flag most of this; review their hits against the list below. Vue, Svelte, Astro and HTML templates are never linted, so this search runs even when oxlint succeeded:

```sh
rg -n "onClick|onclick|on:click|@click|v-on:click" --glob "*.{jsx,tsx,vue,svelte,astro,html}"
rg -n "hover:" --glob "*.{jsx,tsx,vue,svelte,astro,html}"
rg -n "cursor-pointer|focus-visible|role=\"button\"|tabIndex"
```

Each is a finding unless it holds:

- Each interaction uses the native element made for it: `button` for an action, `a` with `href` for navigation, `details` / `summary` for a disclosure, form controls for input. A `div` or `span` with a click handler needs one of these, not `role="button"` plus a key handler patched on.
- Composite widgets (tabs, menus, comboboxes, listboxes) have no single native element. They pass when roles, state attributes, focus management and arrow-key behavior follow the matching [ARIA APG pattern](https://www.w3.org/WAI/ARIA/apg/patterns/), even on a `div`; judge them by that pattern, not by the rule above.
- Every interactive element shows a `focus-visible` style and works with Enter and Space (buttons) or Enter (links).
- Hover effects (`hover:shadow-*`, `hover:-translate-y-*`, `hover:scale-*`) appear only on elements that do something. A static card that lifts on hover promises a click it does not deliver.
- `cursor-pointer` marks custom interactive controls that must stay custom. A `button` under Tailwind v4 shows the default cursor, so adding `cursor-pointer` there is a project-wide choice, set once in the base layer rather than per element.

## Tailwind v4 canonical classes

Tailwind v4 maps many arbitrary values onto its scale: `max-h-[360px]` is `max-h-90`, `mt-[16px]` is `mt-4`. The arbitrary form hides that the value is on the scale and drifts when the theme changes.

The oxlint toolbox from step 5 checks this when the project has Tailwind v4: `oxlint-setup.mjs` finds the CSS file with `@import "tailwindcss"` and enables `better-tailwindcss/enforce-canonical-classes` with `rootFontSize: 16`, so px values map onto the scale. Its hits read `The class: "max-h-[360px]" can be simplified to "max-h-90"`.

- Read the setup output first. With `tailwindEntry: null` and a note about the entry, rerun the setup with the entry CSS as its third argument; with a note that Tailwind is not installed, install dependencies in the audit copy and rerun. A skipped canonical-class check is reported as skipped, never as "no findings".
- If the project's root font size is not 16px, set `rootFontSize` to match, or px values map to the wrong class.
- The rule sees class strings in `className` / `class` attributes and in calls to helpers it recognizes (such as `clsx`, `cn`, `cva`). It misses strings assigned to plain variables or built in other ways, and every Vue, Svelte, Astro and HTML template. So the search below runs every time, and a clean lint result covers only what the rule could see:

  ```sh
  rg -n "\w-\[[0-9.]+(px|rem)\]"
  ```

  Confirm each hit against the theme. `npx --yes @tailwindcss/cli canonicalize --css <entry.css> <classes...>` converts rem values but leaves px values unchanged.
- The rule runs through oxlint's JS plugin support, which is alpha. If it fails to load, the search above is the whole check; say so in the report.

Keep an arbitrary value that encodes a real design token, an external measurement, or a value the project's root font size makes non-equivalent.

## Template-default styling

Generated and starter UIs converge on the same look. None of these is wrong alone; together they say nobody chose the design:

- indigo or purple gradients as the brand (`from-indigo-*`, `to-purple-*`, `bg-gradient-to-*`)
- a centered hero with a gradient headline, a pill badge above it, and three icon feature cards below
- every block a rounded card with a soft shadow, cards inside cards, pills that carry no status or category
- identical spacing everywhere (`p-6`, `gap-6`, `space-y-6`) instead of tighter spacing within a group than between groups
- component-library defaults (shadcn/ui, DaisyUI, Radix themes) left unstyled
- the same fade-in or slide-up animation on every section
- sections the product does not need: placeholder testimonials, pricing or FAQ

```sh
rg -n "from-indigo|to-purple|bg-gradient-to|backdrop-blur"
rg -n "rounded-(xl|2xl|3xl)|shadow-(md|lg|xl)"
```

Report these as one finding with the strongest examples, not one row per class. The change is a direction (a palette from the domain, hierarchy from spacing and type instead of boxes), and the `impeccable` skill is the place to work it out.

Also note what a modern frontend states explicitly and this one leaves out: loading, empty and error states, the mobile layout, and keyboard paths through the main task.
