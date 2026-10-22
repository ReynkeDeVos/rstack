# Student Review Questions

Use these to convert suspicious code into fair learning checks.

## Dependency Questions

- Where is this package used?
- What problem does this package solve in your project?
- What would break if we removed it?
- Does the runtime or browser already provide this feature?
- Why did you choose this package over a built-in API?
- Why is this specific major version installed?
- Can you replace this package with a platform feature?
- Can you remove this package and make the tests/build pass?

## Script Questions

- Walk me through each script in `package.json`.
- Which script do you use during development?
- Which script would run in production?
- Why does this project need a TypeScript runner?
- Why does this project need `nodemon` instead of the runtime watch mode?
- What does this `--loader`, `--require`, or preload flag do?
- Can we simplify this script and keep the same behavior?

## TypeScript Questions

- Does this project use TypeScript at runtime or only for typechecking?
- Which TypeScript features are erased and which require transformation?
- Why is this `tsconfig` target set to this value?
- Why is `moduleResolution` configured this way?
- What would happen if we ran `tsc --noEmit`?
- Can you explain this type instead of replacing it with `any`?

## React/UI Questions

- Why is this state stored here?
- Could this be derived instead of stored?
- Why does this `useEffect` need these dependencies?
- What happens if this component renders twice?
- Can you remove this helper and keep the same UI?
- Why is `clsx`, `classnames`, or `tailwind-merge` needed here?
- Can you write the same class logic without the package?

## Backend/API Questions

- Trace one request from route to response.
- Where is input validated?
- What happens when the database call fails?
- Which errors are visible to the user/client?
- Why is this middleware needed?
- Why is `cors` configured this way?
- Can you add one validation rule and one failing test?

## Live Modification Tasks

Use one or two of these during review:

- Remove one unused dependency.
- Replace `node-fetch` or simple `axios` usage with native `fetch`.
- Replace `uuid` v4 usage with `crypto.randomUUID()`.
- Replace simple `dotenv` usage with runtime env-file loading.
- Replace `nodemon` with runtime watch mode when suitable.
- Replace a tiny `clsx` usage with an array join.
- Add a missing error message in the UI.
- Add one test for a helper function.
- Delete an unused helper and prove nothing breaks.
- Explain and simplify one overengineered abstraction.
- Change one endpoint response shape and update the frontend.
- Add one loading/error state.
- Fix one TypeScript error without using `any`.

## Reflection Questions

These are useful when AI use is allowed but understanding is required:

- Which parts did you write yourself?
- Which parts did AI help with?
- Which parts did you edit after AI generated them?
- Which part are you least confident about?
- Show me one prompt you used and explain what you changed afterwards.
- What would you do differently if you wrote this again from scratch?
- Which dependency could you remove next?

## Question Quality Checklist

Good questions are:

- Specific to the submitted code.
- Answerable by pointing to files and lines.
- Hard to answer with generic AI text.
- Connected to a concrete change or behavior.
- Fair for the student’s current module level.

Bad questions are:

- Accusatory.
- Based only on vibes.
- Too broad.
- Impossible without external research.
- Designed to trap rather than teach.


## Teacher Answer Keys

When producing suggested student questions, also produce a teacher-only answer key.

For each question, include:

- Good answer should mention:
- Red flags:
- Follow-up:

For live-coding tasks, include:

- Accept if:
- Red flags:
- Follow-up:

The answer key should be short and practical. It should help an instructor decide whether the student actually understands their submitted code.
