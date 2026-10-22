# Frontend AI Slop and Tailwind Signals

Use this reference when reviewing React, Vite, Next.js, Tailwind, DaisyUI, shadcn/ui, or similar frontend submissions.

These are review signals, not proof of AI use. The goal is to test intentionality: can the student explain why the UI is structured and styled this way?

## Common 2025–2026 AI Frontend Defaults

AI-generated frontends often converge on the same safe visual patterns:

- Purple, blue, or indigo gradients.
- `bg-gradient-to-* from-indigo-* to-purple-*` hero sections.
- Inter or default system fonts everywhere.
- Very rounded cards and containers.
- Subtle shadows on almost every block.
- Glassmorphism: `backdrop-blur`, translucent backgrounds, borders, glow effects.
- Three feature cards in a grid with icons.
- Repeated pill badges above headings.
- Large centered hero section with generic copy.
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` everywhere.
- Uniform spacing such as `p-4`, `p-6`, `gap-6`, `space-y-6` with little hierarchy.
- shadcn/ui or Radix defaults with little customization.
- Generic fade-in or slide-up animations on many sections.
- Decorative icons on every card.
- Overuse of boxes: every idea becomes a card, panel, alert, or pill.
- Overuse of hover effects: every card lifts, scales, changes shadow, or changes border.
- Too many borders, rings, shadows, and background layers at once.
- “Clean but personality-free” UI that could fit any product.

## Tailwind-Specific Review Signals

Search for patterns like:

```bash
rg "hover:.*(scale|shadow|translate|border|bg|ring)"
rg "transition|duration-|ease-"
rg "rounded-(lg|xl|2xl|3xl)|shadow-(sm|md|lg|xl)|backdrop-blur|bg-gradient|from-indigo|to-purple|text-indigo"
rg "badge|pill|Card|CardContent|CardHeader"
rg "cursor-pointer|role=|onClick|button|a href"
rg "\[[0-9.]+(px|rem|em|%)\]"
rg "(h|w|min-h|min-w|max-h|max-w|m|p|gap|space|inset|top|right|bottom|left|translate|rounded|text)-\[[^]]+\]"
```

### Tailwind v4 Canonical Class Warnings

Tailwind CSS IntelliSense can report `suggestCanonicalClasses` warnings when an arbitrary class has a simpler Tailwind v4 canonical form. Example:

- `max-h-[360px]` can be `max-h-90`.

Review these as maintainability and style consistency findings, not AI proof. The issue is usually that the code uses arbitrary values where the Tailwind scale already contains an exact equivalent.

Preferred workflow:

- First run the project's existing lint script or Tailwind-aware check.
- If the repo already uses ESLint with Tailwind rules, inspect the configured rules before adding anything temporary.
- If no Tailwind-aware lint exists and Tailwind v4 is present, consider a temporary ESLint dry-run with `eslint-plugin-better-tailwindcss` and the `better-tailwindcss/enforce-canonical-classes` rule.
- Run without `--fix` first. Report the warnings and only auto-fix if the user explicitly asked for improvements/refactoring.
- Remove temporary ESLint config and do not keep temporary dependencies, scripts, or lockfile changes unless the user explicitly asked to add lint tooling.

Temporary check shape:

```js
// eslint.tailwind-canonical.tmp.mjs
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [eslintPluginBetterTailwindcss.configs.recommended],
    settings: {
      "better-tailwindcss": {
        // Tailwind v4: point this at the CSS entry file that imports Tailwind.
        entryPoint: "src/global.css",
      },
    },
    rules: {
      "better-tailwindcss/enforce-canonical-classes": "warn",
    },
  },
]);
```

Adjust the file globs, parser setup, and `entryPoint` to match the project. For TSX projects, the temporary config may need the same TypeScript/JSX parser settings as the existing project ESLint config. If that setup is not clear, report the canonical check as skipped rather than leaving new tooling behind.

Useful review questions:

- Why did you use an arbitrary value here instead of the existing Tailwind scale class?
- Is `max-h-[360px]` intentionally different from `max-h-90` in this project?
- What Tailwind CSS file or theme setting determines whether this canonical replacement is valid?
- Can you run the canonical-class lint check and explain one warning?

Related tools:

- `eslint-plugin-better-tailwindcss`: `better-tailwindcss/enforce-canonical-classes`, Tailwind v4 canonical suggestions.
- `eslint-plugin-tailwindcss`: `tailwindcss/no-unnecessary-arbitrary-value`, older arbitrary-value linting pattern.
- `eslint-plugin-tailwind-canonical-classes`: focused Tailwind v4 canonical-class plugin.

### Hover Overuse

Suspicious when:

- Every card has `hover:shadow-*`.
- Every card has `hover:-translate-y-*`.
- Every card has `hover:scale-*`.
- Static informational cards look clickable.
- Hover states exist without any click, link, expansion, or meaningful interaction.
- The same `transition-all duration-300` appears everywhere.
- Mobile/touch UX was not considered.

Ask:

- Is this element interactive or only decorative?
- What should happen on touch devices?
- Does this hover effect communicate affordance or only decoration?
- If every card moves, which element is actually important?
- Can you remove hover effects from non-interactive cards?

### Missing CTA Affordance

Suspicious when a call-to-action has click behavior but lacks clear affordance:

- `onClick` on a `div` without button semantics.
- Clickable card with no `cursor-pointer`.
- Interactive element has hover styling but no keyboard support.
- Button-looking element is not a `<button>` or `<a>`.
- CTA is visually buried among decorative cards.
- Link/button lacks focus-visible styling.

Ask:

- Is this a button, link, or static element?
- Can it be reached with the keyboard?
- Does it need `cursor-pointer`, or should it be a real `<button>`/`<a>`?
- What happens on Enter/Space?
- Where is the focus-visible style?
- Is the CTA visually stronger than the surrounding decoration?

Prefer semantic elements over patching `cursor-pointer` onto everything. `cursor-pointer` is a useful signal for custom clickable UI, but it does not replace button/link semantics.

### Box and Pill Overuse

Suspicious when:

- Every sentence or metadata label is in a pill.
- Every section is wrapped in nested cards.
- The layout has cards inside cards inside cards.
- The UI has more containers than content.
- Pills are used as decoration instead of status, category, filter, or metadata.
- Cards have identical padding, radius, border, and shadow regardless of importance.

Ask:

- What information hierarchy does this card create?
- Could this be plain text, a list, or a section heading instead?
- What does this pill mean?
- Is this a status/filter/category, or just decoration?
- Which containers could be removed without losing clarity?

### Generic Landing Page Structure

Suspicious when the layout defaults to:

1. Centered hero.
2. Gradient headline.
3. Pill badge.
4. CTA button row.
5. Three feature cards.
6. Testimonials/pricing/FAQ sections whether requested or not.

Ask:

- Which sections were required by the assignment?
- Which sections are real and which are placeholder content?
- Why are there exactly three feature cards?
- What is the user’s primary task?
- Can you remove one section and make the page clearer?

## Better Review Criteria

A frontend is stronger when:

- Visual hierarchy is clear without relying on boxes everywhere.
- Hover states are reserved for interactive elements.
- CTAs are semantic, accessible, and visually obvious.
- Cards are used for grouped, comparable content, not for everything.
- Pills represent real metadata/status/filter information.
- Spacing varies intentionally between related and unrelated content.
- Color choices match the project/domain instead of default blue/purple gradients.
- Typography has hierarchy and readable line lengths.
- Empty, loading, error, and success states are intentionally designed.
- Mobile layout and keyboard navigation are checked.
- Components are reusable because the project needs reuse, not because AI generated abstractions.

## Student Questions

Use these during review:

- Show me the main CTA. Why is it the most visually important element?
- Which elements are clickable? How can a user tell?
- Which hover effects are meaningful, and which are decorative?
- Remove hover effects from all non-interactive cards.
- Replace a clickable `div` with a semantic `button` or `a`.
- Add keyboard and focus-visible support to this CTA.
- Remove three unnecessary boxes/pills and preserve clarity.
- Explain why this content needs to be a card.
- Which Tailwind classes are repeated enough to become a component?
- Which Tailwind classes are just copied defaults?
- Which arbitrary Tailwind classes have canonical Tailwind v4 equivalents?
- How does this page look on mobile?
- What is the loading/error/empty state?
- Which design choice makes this app specific to its domain?

## Suggested Live Tasks

- Audit all `hover:` classes and remove decorative hover from static content.
- Find every clickable non-button/non-link element and make it semantic.
- Add `cursor-pointer` only where a custom interactive element genuinely remains necessary.
- Reduce nested cards by one level.
- Replace generic pills with real status/category/filter labels, or remove them.
- Change the color palette away from default indigo/purple if it does not match the project.
- Pick one section and improve hierarchy using spacing and typography instead of another box.
- Run a Tailwind v4 canonical-class lint dry-run and explain or fix one warning.
- Add `focus-visible` styles for keyboard navigation.
- Test one CTA with keyboard only.
- Explain the difference between a card, a button, and a link in this UI.

## Wording

Prefer:

- “This looks like a generic AI/Tailwind default.”
- “This hover effect implies clickability, but the card is static.”
- “This CTA needs stronger affordance and accessibility.”
- “This pill/card does not appear to carry meaning.”
- “This arbitrary Tailwind class appears to have a canonical v4 equivalent.”
- “This would be a good live UI review task.”

Avoid:

- “AI made this.”
- “This design is bad because it uses Tailwind.”
- “Never use gradients/cards/pills.”
- “Hover effects are always wrong.”
- “Arbitrary values are always wrong.”
