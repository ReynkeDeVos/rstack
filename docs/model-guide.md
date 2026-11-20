# AI model and thinking-level guide

Updated: **20 November 2026**. V9, Theo’s “holy sh*t”, is the newest source: after two days of heavy use he calls **Gemini 4 Neon** his favourite model, more coherent than any Anthropic model and more capable for code than Opus 5.5, so Neon takes over building and written plans; Opus 5.5 keeps investigation, and Fable 5.2 and GPT-6.2 Astra keep their roles. Before it, V8, Theo and Ben’s Nerd Snipe episode “Astra 6.2 Is A Step Back”, kept Opus 5.5 as the everyday model, made Fable 5.2 the oracle that directs Opus rather than the model that ships unchecked code, and moved the cross-family review to **GPT-6.2 Astra**, the strongest reviewer in Theo’s evals but too hard to read and steer for anything else. Before it, V7, Theo’s “I think I figured it out”, kept only Opus 5.5 and Fable 5.2 for real-world coding, moved Opus’s everyday thinking level to **High**, split the two by **provable versus unprovable** work, narrowed Haiku to bulk analysis, and added Fable as the model that tells you stuck work is good enough to ship; it kept Sol 6.1 as the cross-family reviewer, which V8 replaces. V6 added Fable 5.2 as the advisor; V5’s Haiku worker role is superseded where V7 narrows it. V3 is ignored at your request and contributes no recommendations. Preserve the full range of non-sponsored recommendations from the active supplied videos. Put coding first, with planning, research, websites, UI, frontend interactions, and animations given prominent coverage. These interests determine the reading order, not which information is retained. Exact prices remain outside the guide's scope.

**Current coding workflow (V9): Gemini 4 Neon / Extra High builds; Opus 5.5 / High investigates, and builds whenever Neon is unavailable; Fable 5.2 / High keeps unprovable work and stuck runs; GPT-6.2 Astra / High reviews; Haiku 5.5 only does bulk analysis.** Theo finds Neon more coherent than any Anthropic model and, after pushing it hard on code, more capable: it solves harder problems more often and writes code he is more likely to merge. He calls it level with Opus for dev work and quite possibly the best model for code right now, while “Fable is still Fable”. [V9, 15:30][v9-contender] [V9, 17:01][v9-more-coherent] [V9, 17:12][v9-capable] [V9, 30:49][v9-best-code] His deciding case: on his TS Rust compiler, Astra spent more than ten days making it smaller but 56% slower, Opus and Fable took many days to reach about 20% faster, and Neon, using Antigravity’s swarm feature, made it 5.95x smaller and 1.5x faster across his bench repos in 10 hours. [V9, 17:56][v9-tsrust-astra] [V9, 18:40][v9-tsrust-opus] [V9, 18:54][v9-tsrust] Investigation stays with Opus because Neon answers questions about a repo without checking them (10 of 72 architecture claims wrong, 13th on understanding), though it does check when it implements. [V9, 23:27][v9-hallucinate] [V9, 24:12][v9-verify] Extra High for building is this guide’s suggestion: it is the level Theo chose on purpose for his review bench and for a 3D rerun after running High by accident, but he gives no level for the TS Rust run. High is Google’s default and this guide’s suggestion for small, clear edits and for writing. [V9, 24:25][v9-review] [V9, 25:41][v9-3d-xhigh] [Neon thinking levels][neon-levels] **Availability:** Neon needs a paid Google AI Pro or Ultra plan in Antigravity. On 20 November T3 Code’s `antigravity` provider lists it as `gemini-4-neon` with `thought_level` (`low`, `medium`, `high`, `xhigh`, default `high`), and the Antigravity CLI lists it as `gemini-4-neon-low`, `-medium`, `-high` and `-xhigh`; a handoff that cannot reach Neon falls back to Opus 5.5 / High. [Neon in Antigravity][neon-antigravity]

**Previous coding workflow (V8, building superseded 20 November): Opus 5.5 / High investigates, leads and builds; Fable 5.2 takes the work no check can settle (taste, a fresh direction, novel options, whether stuck work is good enough to ship) and advises when Opus is stuck, directing Opus to implement rather than shipping its own unchecked changes; GPT-6.2 Astra supplies the independent cross-family review; Haiku 5.5 only does bulk analysis.** V8 adds Ben’s “Opus most of the time, Fable as the atomic bomb”, Theo’s finding that Fable calls work done without running the checks, and Theo’s evals placing GPT-6.2 Astra above Sol 6.1 as a reviewer; Astra 6.2 High is a suggested level, since V8 gives none. [V8, 42:51][v8-atomic] [V8, 34:14][v8-unverified] [V8, 34:55][v8-oracle] [V8, 50:49][v8-astra-bench] V7 states only Opus High as Theo’s own level; Fable High and Haiku Medium carry over from V6/V5 as suggested settings. Theo’s rule of thumb: provable, checkable work goes to Opus; unprovable work goes to Fable; use Opus until you want more from it. Bounded lookups for a lead run on Opus 5.5 / Medium (suggested). V7 supersedes Ben’s Extra High as the Opus default, V5/V6’s Sol-led investigation, and V5’s Haiku side-task role. Computer use moves to GPT-6.2 Sol (routine) and GPT-6.2 Astra (heavy) by your decision on 18 November; no video tests either there. [V7, 01:09][v7-only-two] [V7, 07:48][v7-high] [V7, 11:18][v7-haiku] [V7, 35:27][v7-provable] [V7, 37:00][v7-opus-first] [V7, 38:55][v7-merge]

**Previous workflow (V5/V6, superseded 14 November):** Opus 5.5 / Extra High leads implementation; GPT-6.1 Sol / High supplies independent audit and difficult investigation; Haiku 5.5 / Medium handles bounded supporting work. V5 restores Theo’s Opus-builder/Sol-auditor pairing and adds Haiku for collecting evidence, categorizing, and trying candidates with an objective check. It supersedes V4’s Sol-first coding default under your recency rule. Opus Extra High carries forward Ben’s compatible explicit setting; Sol and Haiku levels are suggested. Sol Medium remains a useful existing setup for bounded work and the practical starting point for general questions. V6 leaves this trio in place and adds **Fable 5.2 / High** as a read-only advisor when a run is stuck or a problem is hard and open-ended; Fable does not replace Opus as the builder. [V6, 07:43][v6-daily-driver] [V6, 36:43][v6-mcp] [V6, 46:42][v6-verdict] [V5, 31:31][v5-coding] [V5, 38:28][v5-audit] [V5, 39:07][v5-final-pairing] [V4, 17:27][v4-effort]

I read the full English auto-generated captions of V1, V2, V4, V5, V6, V7, V8, and V9, and inspected selected frames for the earlier videos. Model names were checked against descriptions, available labels, and official documentation. Theo explicitly recommends Opus High in V7, superseding Ben’s older explicit Opus Extra High as the default. The task-specific Sol and Haiku levels, general non-coding recommendations, standalone planning procedure, animation workflow, and Astra effort below remain **suggested starting settings**, rather than claims that a creator tested each assignment. V5’s provider demonstrations, community examples, benchmark observations, and Theo’s own trials are labelled separately. V3 has not been incorporated.

## What determines the recommendations

**Your preference: newest relevant information first, then Ben over Theo when the advice is equally current; both creators’ hands-on experience outweighs benchmark intelligence scores.** Their experience with actual code, collaboration, planning, investigation, and design is the main basis for choosing a model in this guide.

- **Supplied videos are the main sources.** Prioritize concrete examples of successful or failed work, demonstrated output, and the creators' stated workflow preferences.
- **Keep the full non-sponsored recommendations.** Give your interests more prominence, while retaining non-sponsored advice about other tasks, models, tools, and workflows. Superseded advice stays in the source notes with its status clear; current choices follow the newer video.
- **Resolve conflicts in order: recency, then creator preference.** Newest relevant information wins; Ben has a slight preference over Theo when their information is equally current. Older Ben advice cannot override newer Theo advice. Respect your explicit source-priority choices and exclusions. Preserve exact model/version and recording context when deciding relevance.
- **Benchmarks are supporting evidence.** A high score alone does not establish intelligence, coding quality, design taste, good judgment, or reliability on your tasks. Where scores and hands-on experience disagree, the practical recommendation follows the experience.
- **Price per completed task can still be useful benchmark evidence.** It does not prove that the output meets your quality bar. Price comparisons remain outside this guide.
- **Official documentation verifies controls and capabilities:** model names, supported thinking levels, defaults, and source/tool access. Provider rankings do not determine the preferred coding or design model here.
- **Sponsor segments are excluded.** Their endorsements, demonstrations, and product claims do not inform the chooser, tool recommendations, research workflow, or skill handoffs. This applies to earlier videos too.
- **Inferences stay visible.** When the videos do not establish a winner or a task-specific thinking level, identify the recommendation as a starting hypothesis rather than attributing it to Theo or Ben.

V1, V2, V5, V6, V7, and V9 are Theo videos; V8 is a joint Theo and Ben episode, so Ben’s claims in it win ties. V4 supplies Ben’s direct experience and was your designated newest source on 3 October; V5, V6, and V7 are now newer. V7 replaces Ben’s Extra High as the Opus default; his compatible design and specialist observations remain active. Theo’s earlier report of Ben’s reaction remains a second-hand historical note. V3 is excluded. [V4, 00:00][v4-opening] [V2, 11:59][v2-ben] [V5, 39:07][v5-final-pairing]

## Choose by task

**If choosing a fresh coding setup:** build with **Gemini 4 Neon / Extra High**, which Theo runs through Antigravity inside T3 Code, and investigate with **Opus 5.5 / High**, which also builds whenever Neon is unavailable. V9 replaces V7’s “only Opus and Fable” verdict for building. [V9, 10:18][v9-t3] [V9, 30:33][v9-t3-only] Add **Fable 5.2 / High** for unprovable work and when the builder is stuck. Add **GPT-6.2 Astra / High** for independent cross-family review (V8), and **Haiku 5.5 / Medium** only for bulk analysis over many files or records. Before V9, Theo’s V7 preference governed and called any other coding model “cope” without very good, specific reasons; the OpenAI model stays as a cross-family reviewer, not a coding model, which Theo’s own sol-loop review skill and V8’s “reviewing the work Claude does and not much else” support; the Claude subscription is his reason not to pick a cheaper model. A model recommendation does not automatically require switching a working harness. [V7, 00:43][v7-opening] [V7, 02:50][v7-subscription] [V7, 07:48][v7-high] [V7, 31:06][v7-sol-loop]

**Provable versus unprovable (V7):** when the work can be verified and you can hill-climb toward it (a TypeScript-to-Rust rewrite, a decision settled by reading, testing theories, and then doing it), Opus is more than good enough and misses less. When no check can say one result is better than another (better graphics, a visualizer that does not look generic, a clever infrastructure idea, a fresh variety of options), Fable finds things Opus never would. Theo’s V7 rule was to use Opus until you want more from it, such as when its options are too similar, then ask Fable; since V9 the same applies to the builder, Neon. [V7, 35:27][v7-provable] [V7, 36:15][v7-unprovable] [V7, 37:00][v7-opus-first] [V7, 38:11][v7-variety]

| Your task | Model to choose | Thinking level | Why / video evidence |
| --- | --- | --- | --- |
| General daily coding; normal feature or fix with clear requirements | **Gemini 4 Neon**; **Opus 5.5** when Neon is unavailable | **Extra High** for Neon; **High** for Opus | V9: Theo calls Neon level with Opus for dev work, more capable for code, and the model whose code he is more likely to merge; he started landing real T3 Code changes with it. Extra High is suggested, from the level he chose for his evals. [V9, 15:30][v9-contender] [V9, 15:15][v9-landing] [V9, 17:12][v9-capable] [V9, 25:41][v9-3d-xhigh] Fallback evidence, V7: Theo moved from Extra High to High (“High is the goat”), has rarely found tasks High could not complete, and finds Medium slightly too quick to end its turn and check its work. Anthropic’s guidance starts at Medium and steps up; Theo agrees with that path. Supersedes Ben’s Extra High default. [V7, 07:24][v7-opus-effort] [V7, 07:48][v7-high] [V7, 09:21][v7-medium-bolder] [V4, 17:27][v4-effort] |
| Small, precisely specified edit with a clear check | **Gemini 4 Neon**; **Opus 5.5** when Neon is unavailable | **High** for Neon (Google’s default, suggested); **High** for Opus | V9 tests no small edits, so Neon High is a suggestion. [Neon thinking levels][neon-levels] V7 keeps only Opus and Fable for real-world code; Sonnet and Haiku are not edit models. A working Sol setup is no longer the maintained recommendation. [V7, 01:09][v7-only-two] [V7, 10:58][v7-sonnet-picker] [V7, 11:40][v7-haiku-code] |
| Vague feature request, many discretionary decisions, or complex implementation needing strong judgment | **Gemini 4 Neon**; **Opus 5.5** when Neon is unavailable | **Extra High** for Neon; **High** for Opus | V9: given a loosely bounded task (set up Antigravity on his Windows PC so another thread could use Neon), Neon worked for eight minutes, took a steer mid-run, configured and verified everything, and messaged the waiting thread, a task Theo would never have trusted to an earlier Gemini model. [V9, 11:27][v9-setup] [V9, 11:50][v9-setup-done] For Opus: Ben values Opus’s reading of unsaid intent. V7 adds that Opus will not challenge the task and lets specs bloat: state the scope and add “If you think this is a good idea, do it. Otherwise, suggest something else.” When the decision itself has no checkable answer, ask Fable 5.2. [V4, 09:08][v4-intent] [V7, 21:39][v7-bloat] [V7, 23:43][v7-prompt-tip] |
| Large rewrite, long port, migration, or sustained implementation, including leading many subagents | **Gemini 4 Neon**; **Opus 5.5** when Neon is unavailable | **Extra High** for Neon; **High** for Opus, **Extra High** for hairy work | V9: Neon stays on task over long runs, and with Antigravity’s swarm it did in 10 hours what no model managed in more than ten days on Theo’s TS Rust fork. [V9, 16:19][v9-coherence-def] [V9, 18:54][v9-tsrust] [V9, 19:56][v9-tsrust-days] For Opus: Theo rewrote the TypeScript compiler in Rust with Opus as commander and implementer; Opus handles huge migrations with many subagents, and Fable is only slightly better. Anthropic suggests Fable for this; Theo disagrees that it is needed. Ben’s long ports remain supporting evidence. [V7, 15:33][v7-orchestration] [V7, 15:55][v7-migrations] [V4, 03:11][v4-game] [V2, 15:51][v2-rewrites] |
| Hairy work that needs many checks: Windows-specific work, replaying large logs against an implementation, exploratory PRs where every stone gets turned | **Opus 5.5** investigates; the builder (Neon; Opus when Neon is unavailable) implements | **Extra High** | V9 tests none of these. Theo’s V7 Extra High uses. He finds Opus a better stone-turner than Fable here. [V7, 13:10][v7-xhigh] [V7, 13:34][v7-logs] [V7, 13:59][v7-stones] |
| Simplify a codebase, refactor, improve performance or UX | **Gemini 4 Neon**; **Opus 5.5** when Neon is unavailable | **Extra High** for Neon; **High** for Opus | V9: Neon made TS Rust 5.95x smaller and up to 20x faster on warm starts, with whole-suite time down 48.6%, after Astra, Opus and Fable had managed at best about 20%. [V9, 18:54][v9-tsrust] [V9, 18:40][v9-tsrust-opus] For Opus: Ben’s asset-catalog work produced useful commits and PRs while the codebase became smaller; V7 updates the effort. For a performance problem where Opus has the repro but not the fix, hand Fable the environment. [V4, 10:35][v4-refactor] [V7, 29:37][v7-fable-verify] |
| Bounded lookups for a lead: locate relevant files, read logs, collect facts | **Opus 5.5** subagent | **Medium**, suggested | V7: Theo would “never ever” use Haiku for a side task, rejecting Anthropic’s Haiku/Sonnet subagent framing. The Medium level is this guide’s inference; raise it if the subagent stops early. Use deterministic search directly when it answers the question. Supersedes V5’s Haiku search role. [V7, 11:18][v7-haiku] [V7, 14:48][v7-addy-table] [Claude model guide][claude-dev-models] |
| Bulk analysis: classify or pattern-match across many files or a large data set, such as every file showing a pattern no script can find | **Haiku 5.5** workers under **Opus 5.5** | **Medium**; **Low** only for simple validated tasks | V7’s remaining Haiku role, and Anthropic’s high-volume classification, routing, and extraction role. Haiku does not write code. The lead spot-checks results. [V7, 11:18][v7-haiku] [V7, 11:40][v7-haiku-code] [V5, 22:00][v5-subagents] [Haiku prompting][haiku-prompting] |
| Compare independently checkable hypotheses or candidate variants | **Opus 5.5** subagents; **Haiku 5.5** only for bulk, objectively scored candidates | **Medium** for workers; **High** for the lead | V7 narrows Haiku; the egg-drop example is Anthropic’s demo, not Theo’s trial. Keep within actual concurrency and tool limits. [V7, 11:18][v7-haiku] [V5, 22:21][v5-egg-demo] [V5, 32:58][v5-candidates] |
| Summarize or compact supplied material; classify or extract structured data | **Haiku 5.5** for a high-volume pipeline | **Medium** initially; **Low** only for simple validated tasks | Fits V7’s bulk-analysis role and Anthropic’s guidance; these effort choices are practical settings informed by official docs. [V5, 04:00][v5-provider] [V7, 11:18][v7-haiku] [Haiku prompting][haiku-prompting] |
| Text categorization without reasoning or image input | **Jev**, as a specialized decision model | No chat-style thinking level assigned | Theo suggests Jev for this narrow role. If vision is required with reasoning off, he tentatively prefers GPT-6 Luna. This does not promote either to coding lead or everyday Q&A. [V5, 11:09][v5-classification] [Jev identity][jev-docs] |
| Write a plan, proposal or feature write-up for people to read | **Gemini 4 Neon** | **High**, suggested | V9: asked for a working-backwards plan written as a blog post, posted through his plan skill while ignoring its style guide, Neon was the first model to get it right: the page looked good and read too well to feel LLM-written, while Fable makes a nice page but cannot write like a real blog post and nearly every model keeps the skill’s default style. Theo still sees a few em dashes. [V9, 20:55][v9-press] [V9, 21:20][v9-plan-prompt] [V9, 22:09][v9-style] [V9, 22:31][v9-plan-page] [V9, 10:11][v9-em-dash] |
| Turn ambiguous requirements into a substantial implementation plan | **Opus 5.5**; **Fable 5.2** when the plan hinges on a judgment no check settles; **Gemini 4 Neon** to write it up for people | **High** for all | Synthesis: Opus investigates and plans checkable work; Fable challenges the premise and offers a wider variety of options. Opus will bloat a plan unless told the scope. No standalone planning comparison is established. [V4, 09:08][v4-intent] [V7, 21:39][v7-bloat] [V7, 36:38][v7-challenge] [V7, 38:11][v7-variety] |
| Find a difficult bug’s root cause; investigate a regression or architecture | **Opus 5.5** | **High**; **Extra High** for hairy, check-heavy cases | V9 keeps this on Opus: Neon answers questions about a repo without checking them, though it checks when it implements. It did find the real cause in Theo’s VPS disk-speed thread (a volume formatted for a spinning disk, 3.8 s of a 6.3 s gap) that Astra had buried in noise, so a Neon diagnosis backed by measurements is worth having. [V9, 24:12][v9-verify] [V9, 07:49][v9-disk] [V9, 08:08][v9-disk-cause] V7: Opus double- and triple-checks and finds what Fable glosses over; it built Theo’s repro environment for the T3 Code long-thread problem. OpenAI models lose coherence on long runs. Supersedes V2–V6’s Sol root-cause role; Sol’s V6 eval accuracy stays recorded. If Opus has the repro but not the cause, hand Fable the environment (next row). [V7, 13:59][v7-stones] [V7, 14:25][v7-opus-checks] [V7, 22:52][v7-coherence] [V7, 28:26][v7-opus-repro] [V6, 20:12][v6-analysis] |
| A run is stuck: two attempts at the same problem failed, it keeps circling one decision, or work keeps circling before it ships | **Fable 5.2** takes the work over: it fixes it, says it is fine to ship, or hands a plan back to the original model | **High**; **Extra High** for the hardest problems, both suggested | V6: Fable cut through hours of MCP back-and-forth. V7: Fable verified Opus’s test environment and found the problem Opus had missed, cutting data over the wire about 150x; and when Opus kept finding more to do, Fable audited the work, said it was fine, and everything it called good to merge was. V8: Theo uses it to push work stuck at the last 10% over the line, and Ben brings it out as the atomic bomb when every model keeps producing nonsense. Fable lets nitpicks slide, makes some wrong claims and calls work done without running checks, so check its answer and run the checks on any fix it makes. [V8, 43:12][v8-last-ten] [V8, 42:51][v8-atomic] [V8, 34:14][v8-unverified] [V6, 36:43][v6-mcp] [V7, 29:37][v7-fable-verify] [V7, 30:19][v7-fable-env] [V7, 39:35][v7-merge-audit] [V7, 40:41][v7-good-to-merge] [V6, 38:46][v6-autonomy] |
| Unprovable work: taste, a fresh direction, novel options, a clever infrastructure idea | **Fable 5.2** finds the direction and directs; the builder (Neon; Opus when Neon is unavailable) implements it and builds the large, check-heavy parts | **High** for Fable; the builder’s own level | V8’s evidence names Opus as the implementer, before V9 made Neon the builder. V7’s provable/unprovable split. V8 confirms the division: Fable found the right way to cut T3 Code’s Cloudflare bill and Opus implemented it; a Fable-orchestrated Opus loop transformed Ben’s game; and Theo calls Fable best as an oracle directing Opus, after it repeatedly called its own PRs done without running checks. [V8, 32:51][v8-cloudflare] [V8, 34:55][v8-oracle] [V8, 60:33][v8-fable-opus] Fable’s willingness to go past the norm is the point; Opus is designed to regress to the mean (Theo’s training speculation). [V7, 35:51][v7-provable-split] [V7, 36:15][v7-unprovable] [V7, 37:24][v7-rerun] [V7, 37:49][v7-regress-mean] |
| Ambitious, open-ended technical work: an otherwise infeasible migration, science, hardware/CAD | the builder (Neon; Opus when Neon is unavailable) leads and builds; **Fable 5.2** advises or takes the parts no check can settle | **High** for Fable, suggested; the builder’s own level | Anthropic’s when-to-use guidance and benchmarks, not a Theo comparison on these tasks. Anthropic also offers Fable as an orchestrator; V7 says Opus orchestrates huge migrations fine. Theo says Fable 5.2 is not his everyday model. [V6, 06:52][v6-when-to-use] [V6, 13:06][v6-cad] [V6, 46:42][v6-verdict] [V7, 15:55][v7-migrations] |
| Deep PR review or audit before merge | **GPT-6.2 Astra**; it also reviews PRs Neon opens | **High**, suggested | V9: in Theo’s review bench Neon at Extra High found 21 valid and 5 plausible issues with none wrong, slightly slowly, and he added it to his council skill. When Neon opens a PR, the cross-family review goes to Astra. [V9, 24:25][v9-review] [V9, 15:23][v9-council] V8: in Theo’s evals GPT-6.2 Astra sweeps Sol 6.1 on every measure, finding the most issues and none wrong (his judges may favour it), and reviewing Claude’s work is the one use he has for it. Its reports are hard to read, so ask for plain-English findings and have Opus restate one you cannot follow; its findings can bloat the spec, so judge each one. V7’s reasons for cross-family review stand: Theo still runs his sol-loop skill and reworked it so Opus does not apply every finding, and uses Sol 6.1 as a judge that punishes misses. Brief the reviewer to hold the change to its intent and to call rare cases and extra paths nits, except security, permissions, auth, data-loss and concurrency bugs, which stay at least “should” on any path. Fable is not the reviewer, but it is the model to ask whether circling work is good enough to ship (row above). [V7, 30:41][v7-stop] [V7, 31:06][v7-sol-loop] [V7, 40:17][v7-eval-audit] [tstack sol-loop][tstack-sol-loop] [V8, 50:49][v8-astra-bench] [V8, 51:32][v8-translate] [V8, 57:42][v8-review-only] [V5, 38:28][v5-audit] |
| Research an API, library, or technical question on the web | **Opus 5.5**; **Fable 5.2** for deep or qualitative analysis | **Medium** for bounded collection; **High** for synthesis | V7 retires Haiku side tasks and Sol for coding work; Anthropic suggests Fable for deep research. The lead checks sources and resolves conflicts; all models need source tools. Supersedes V5’s Haiku/Sol research split. [V7, 11:18][v7-haiku] [V7, 15:33][v7-orchestration] [Claude model guide][claude-dev-models] |
| Explore a website, UI, visual direction, graphics, or a visualizer that should not look generic | **Fable 5.2** builds the visual with the design skill on; the builder (Neon; Opus when Neon is unavailable) builds the surrounding app and its checks | **High** for Fable; the builder’s own level | V7: making graphics better or a unique visualizer is “what Fable’s here for”. V6 caveats stay: without the design skill Fable gives template slop, and its chart redesign hid the data it was meant to show, so check the result still shows it. Ben’s Opus design judgment stays the fallback. Supersedes Opus-first visual exploration. [V7, 36:15][v7-unprovable] [V6, 32:54][v6-slop] [V6, 22:38][v6-redesign] [V6, 44:06][v6-combination] [V4, 09:08][v4-intent] |
| Implement UI with precise design instructions or an existing style | **Gemini 4 Neon**; **Opus 5.5** when Neon is unavailable | **Extra High** for Neon, suggested; **High** for Opus | Provable work goes to the builder. V9 tests no UI implementation; Google ranks Neon second on steerability. Theo’s Opus steerability observation remains useful for the fallback. [V9, 04:36][v9-steer] [V1, 20:12][v1-design] [V7, 07:48][v7-high] |
| Build animations, transitions, or interactive behavior | the builder (Neon; Opus when Neon is unavailable); **Fable 5.2** to propose the motion direction when taste decides | the builder’s own level; **High** for Fable | Provisional application of the provable/unprovable split. No animation-specific winner is established; inspect the running interaction. [V7, 35:27][v7-provable] [V4, 09:08][v4-intent] |
| Explore a constrained frontend or programmatic video with a small model | **Superseded:** use the builder (Neon; Opus when Neon is unavailable) | the builder’s own level | V5 found Haiku merely usable for frontend work with the design skill; V7 says Haiku should not write code. The V5 examples stay recorded below. [V5, 25:24][v5-design] [V5, 27:07][v5-design-limits] [V7, 11:40][v7-haiku-code] |
| Game modding, dungeon layout, puzzles, or gameplay work | the builder (Neon; Opus when Neon is unavailable) for gameplay logic; **Opus 5.5** for 3D integration; **Fable 5.2** for look and coherence; not Neon for 3D visuals | **High**; **Extra High** for long unattended runs | V9: Neon is still weak at 3D visuals; its Fish Slop build had broken fonts and details though movement felt fine, and an Extra High rerun was better but still behind Opus 5.5. Theo doubts the test says much about everyday work. [V9, 25:18][v9-3d] [V9, 25:41][v9-3d-xhigh] Ben’s multi-hour Majora’s Mask mini-dungeon ran at Extra High: layout, enemies, puzzles, and 3D integration, not a shippable game. V6: Opus’s game played better, Fable’s looked better and stayed coherent; a combination worked best. The High default is V7’s; Extra High for long runs carries forward Ben’s demonstration. [V4, 03:11][v4-game] [V4, 10:12][v4-game-intent] [V6, 44:06][v6-combination] |
| Routine browser/computer tasks | **GPT-6.2 Sol** | **Medium**; **High** for difficult dependencies | V9: Theo’s little computer use with Neon has gone well and friends doing browser-use and CUA work call it level with OpenAI or better, but he has not compared them himself, so the route stays. [V9, 06:27][v9-computer] [V9, 06:36][v9-cua] Theo’s routine Sol choice, moved to the current Sol by your decision on 18 November, not tested by a video. Ben reserves Astra for heavy computer use rather than routine tasks. [V2, 12:35][v2-computer-default] [V4, 11:45][v4-astra] |
| Especially demanding computer use | **GPT-6.2 Astra** | **High**, suggested; Ben gives no effort level | Ben explicitly retains Astra for heavy computer use; moved to the current Astra by your decision on 18 November, not tested by a video. V8 warns that GPT-6.2 Astra flooded Theo’s Mac with permission requests until it froze, so watch its first heavy runs. [V8, 50:29][v8-freeze] This restores a concrete specialist role, while Sol remains the ordinary default. A harness must expose the necessary computer tools. [V4, 11:45][v4-astra] |
| Create a specific Blender/3D asset from a reference | **GPT-6.2 Sol** | **High** | Retain Theo’s Blender-specific evidence. Opus is now supported for game/3D integration too; V4 does not negate Sol’s asset-making result. [V2, 24:59][v2-blender] [V4, 03:11][v4-game] |
| Produce an interactive graph or explanatory visualization in chat | **GPT-6.2 Sol in Codex desktop with visualization support** | **Medium**, suggested | Ben demonstrates a visualization and recommends explicitly asking the model to visualize the subject. Verify that the current harness provides a rendered view. [V4, 13:01][v4-visualize] |
| Explain code or an issue clearly while collaborating | **Gemini 4 Neon** or **Opus 5.5**, or **Sol 6.2** for a pragmatic report | **High** for Neon (suggested) and Opus (V7 default; Ben used Extra High); **Medium** for a bounded Sol report | V9: Theo finds Neon’s replies the easiest he has read, clear about what it did, what it wants and what he needs to care about; check its claims about the code. [V9, 08:43][v9-readable] [V9, 09:40][v9-readme] [V9, 24:12][v9-verify] Ben finds both understandable; Opus’s clearer explanations help him complete larger tasks. This is communication experience, not a general literary-writing ranking. [V4, 06:52][v4-communication] [V4, 08:25][v4-sol-communication] |

**Gemini 4 Neon (V9):** the builder. Theo calls it the most pleasant model he has used and the most coherent: it stays on task, understands him, explains what it is doing, and does not lose track on very long runs. It worked out on its own that T3 Code’s Antigravity adapter was hiding its HTML output, showed screenshots instead, and filed a PR fixing the adapter. Its limits: it states claims about a codebase without checking them (10 of 72 wrong, between Fable 5.1 and Fable 5.2), it did not trigger his skills when he named them (Antigravity or the model, he is not sure), it is weak at 3D, and it still uses a few em dashes. Extra High is the level Theo chose for his evals; levels are Low, Medium, High (default) and Extra High, with no Max. Google’s ID is `gemini-4-neon`, with a 1M-token context. Theo runs it only in T3 Code, recommends the nightly for Antigravity fixes, and calls the Antigravity app garbage and its CLI fine-ish. [V9, 04:45][v9-pleasant] [V9, 16:19][v9-coherence-def] [V9, 13:32][v9-viz-diag] [V9, 14:32][v9-skills] [V9, 23:27][v9-hallucinate] [V9, 25:18][v9-3d] [V9, 30:27][v9-antigravity] [Neon API][neon-api] [Neon thinking levels][neon-levels]

**Opus 5.5:** the investigator, and the builder whenever Neon is unavailable (V9); V7 made it the default for real-world coding, investigation, building, and orchestration. Theo’s “teacher’s pet”: it does not give up, does not cut corners, rarely misses anything, and checks its work several times because it knows it is not the smartest in the room. The cost of that: it takes the task as given, lets a spec bloat and features creep unless told the scope, and applies any feedback it receives, so an unchecked review loop can turn a 30-line PR into a thousand-line one. State the scope, ask it to push back (“If you think this is a good idea, do it. Otherwise, suggest something else.”), and decide yourself which review findings it fixes. High by default; Medium for bounded lookups; Extra High for check-heavy work; never Low or Max. [V7, 13:59][v7-stones] [V7, 21:14][v7-teachers-pet] [V7, 21:39][v7-bloat] [V7, 23:43][v7-prompt-tip] [V7, 30:41][v7-stop] [V7, 07:48][v7-high]

**Haiku 5.5:** only for bulk analysis under a stronger lead: classifying, routing, extracting, or pattern-matching across a large data set or every file in a codebase. V7: Theo would never use it for a side task and says not to use it to write code; this supersedes V5’s bounded-support and search role. Start at Medium with reasoning enabled and a clear check. It can over-fetch APIs, mistake a clean GitHub status for an audit, and stop without scheduling the wait it promises. See the bulk-analysis section. [V7, 11:18][v7-haiku] [V7, 11:40][v7-haiku-code] [V5, 30:42][v5-audit-failure] [V5, 33:48][v5-rate-limit] [V5, 35:05][v5-orchestration]

**Sonnet 5.5:** do not pick it in the model picker (V7). It cost more than Opus on Theo’s Fish Slop and made a worse version, runs up output tokens when it lacks a clear path, and at most serves as a scoped tool your agents call. Anthropic still suggests it for well-scoped work and interactive chat; V7’s hands-on view governs. Older successful game and investigation examples remain recorded. Theo explicitly rejects Sonnet Max. [V7, 09:43][v7-sonnet] [V7, 10:58][v7-sonnet-picker] [V1, 27:04][v1-game] [V5, 15:04][v5-max] [V5, 37:31][v5-anthropic-pairing] [Claude model guide][claude-dev-models]

**Fable 5.1:** superseded by Fable 5.2; V7 says Opus 5.5 was more capable than 5.1 [V7, 20:30][v7-fable51]. Historical note: Theo’s earlier frontend-design strength, then Opus as general design collaborator under Ben’s advice. Ben dislikes Fable’s verbose interaction style and has used it less; he does not specify a Fable version in that comparison. His experience does not establish that Fable loses every visual-design comparison. High remains its documented default, not a Ben task setting. [V1, 20:12][v1-design] [V4, 06:52][v4-communication]

**Fable 5.2:** the model for unprovable work and the model to switch to when a run is stuck. V8 makes it the oracle: it finds the fix or direction and directs, the builder implements and grinds it out (Opus in V8, Neon since V9), and any change it makes itself gets its checks run, because Theo found it repeatedly called PRs done or safe without running tests. It is not the PR reviewer: in Theo’s evals its recall is poor, though its precision is excellent, and its restraint makes it a good final reviewer inside a build loop (Ben) and a council (Theo). [V8, 34:14][v8-unverified] [V8, 34:55][v8-oracle] [V8, 36:16][v8-reviewer-swap] [V8, 41:46][v8-recall] [V8, 43:53][v8-restraint] Theo’s “student in the back of the classroom who smokes too much weed and somehow gets a perfect score”: smarter than Opus, lazy, willing to cheat, more creative, and ready to say work is fine to ship. It misses details Opus would catch (text hidden under the player bar in the demo video Theo believes Fable edited for Addy’s post; the read-the-whole-test-first exercise Opus passes and Fable fails), was worse than Opus at building a test environment, and sometimes says stupid things. Give it the full context and the sources to check its claims against, and keep a human or the lead in the loop. Start at High; Extra High for the hardest problems; never Max, which scores worse than Extra High in most benchmarks. Reserve it: on subscriptions it can use at most half the weekly limit, which buys much less work than the same share of Opus. It replaces Fable 5.1 for visual exploration. [V7, 06:56][v7-fable-misses] [V7, 08:17][v7-max] [V7, 16:41][v7-fable-limit] [V7, 25:55][v7-stoner] [V7, 26:42][v7-read-test] [V7, 27:12][v7-lazy] [V7, 30:19][v7-fable-env] [V6, 33:27][v6-in-loop] [V6, 38:46][v6-autonomy]

**Speed is no longer a reason to choose between them.** Theo measures Fable 5.2 at about 106 tokens per second, within margin of error of Opus 5.5; Fable 5.1 ran about 88. V8 repeats this at about 110 for Fable 5.2 and 120 for Opus 5.5, though Theo still finds Fable 5.2 on High too slow. [V8, 26:46][v8-speed] [V8, 06:38][v8-fable-slow] Ultimate capability and orchestration skill are not deciding factors either; both do those well. [V7, 18:15][v7-speed-opus] [V7, 19:12][v7-speed] [V7, 20:07][v7-not-relevant]

**GPT-6.2 Astra (V8):** the cross-family reviewer, and by your 18 November decision the heavy computer-use model; nothing else. Theo’s evals put it first at understanding and reviewing code, but its output is unreadable, it asks the user questions meant for other agents, it does not surface what matters, and it needs a very clear task and close steering; Theo knows no use for it beyond review. Ben still sends it off as a workhorse from a smarter orchestrator and keeps it on a review panel. V8 recorded it before release under the working name “Astra 6.2”; Codex lists `gpt-6.2-astra`, whose default effort is Low, so pass High explicitly. Theo’s suggestion applies when trusting it: keep Sol 6.1 next to it on a panel, logging only, to see whether it adds anything. [V8, 50:49][v8-astra-bench] [V8, 51:55][v8-questions] [V8, 52:56][v8-surface] [V8, 66:21][v8-workhorse] [V8, 67:01][v8-last-gen]

**GPT-6.2 Sol:** released alongside GPT-6.2 Astra and listed by Codex as its go-to coding model. No supplied video tests it, but under your standing rule (18 November) every recommendation names the newest version of a model, so it takes every Sol row: routine computer use, general questions, Blender assets and visualizations.

**Gemini 4 Carbon (V8):** not a daily driver: slow, hallucination-prone and only on Google’s $200 tier. At most a logged second opinion in a security review council, where it once beat Mythos 5.2 and Anthropic’s models rerouted to Opus 4.8. [V8, 06:58][v8-carbon-fix] [V8, 08:40][v8-carbon-security] [V8, 11:24][v8-council-tool]

**GPT-6 Astra:** superseded on 18 November by GPT-6.2 Astra for heavy computer use, by your decision. It was the specialist for heavy computer use or an exceptional demonstrated capability. Ben also uses it to try Ultrafast, but recommends almost never enabling that mode for ordinary work. Ultrafast is a service/speed mode, not a thinking level. [V4, 11:45][v4-astra] [V4, 16:25][v4-ultrafast]

## General questions and non-coding use

**Start with GPT-6.2 Sol / Medium for everyday questions, explanations, and summaries**, including a question about which model to use. These are practical starting recommendations adapted from Ben's workhorse preference and communication observations. The videos primarily cover coding and do not establish a tested general-chat ranking or task-specific non-coding effort levels. [V4, 08:25][v4-sol-communication] [V4, 19:50][v4-default]

| Your task | Suggested model and thinking level | When to use it |
| --- | --- | --- |
| Everyday questions, explanations, summaries, or a straightforward discussion | **GPT-6.2 Sol / Medium** | The ordinary starting point; provide the relevant context or text to summarize. |
| Difficult analysis, comparing options against several constraints, or synthesizing conflicting evidence | **GPT-6.2 Sol / High** | Increase effort when the reasoning is difficult, after supplying the necessary evidence. |
| Open-ended brainstorming or planning with vague goals and many judgment calls | **Fable 5.2 / High** for a wide variety of options; **Opus 5.5 / High** otherwise | V7: Fable gives a better variety of options and challenges the premise; Opus’s options can be too similar. Assess whether the suggestions fit your actual goal. [V7, 36:38][v7-challenge] [V7, 38:34][v7-options] |
| Current facts or a question requiring external sources | **GPT-6.2 Sol / Medium with browsing/source tools**; **High** for difficult synthesis | Retrieve and cite sources first. A higher thinking level does not supply missing or current information. |

Keep simple questions at the starting setting. Use Opus High when its judgment is useful; it is not the blanket default for every conversation. General-use suggestions remain distinct from the creators' directly demonstrated coding workflows. V7’s “only Opus and Fable” verdict covers real-world coding; it does not test general chat, so the Sol rows above stay as practical starting points. [V4, 09:08][v4-intent] [V7, 01:09][v7-only-two]

## Choose a thinking level

**Opus 5.5: High is now the video-based default (V7).** Theo used to run Extra High, switched to High on a friend’s advice, and calls it “the goat”: it rarely fails a task, does not overdo it, and is not much less token-efficient. Medium and Extra High are both very good; Medium is slightly too quick to end its turn and check things. He keeps Extra High for check-heavy work (Windows, large log corpora, exploratory every-stone PRs). Low and Max are “garbage”. He agrees with Anthropic’s advice to start at Medium and step up when the model misses things, and adds that if Medium is always enough you should ask for bolder work. This supersedes Ben’s Extra High default from V4, which stays recorded. Medium is the official API default and this guide’s suggested level for bounded lookups. [V7, 07:24][v7-opus-effort] [V7, 07:48][v7-high] [V7, 09:00][v7-high-balance] [V7, 09:21][v7-medium-bolder] [V7, 13:10][v7-xhigh] [V4, 17:27][v4-effort]

**Gemini 4 Neon: Extra High is Theo’s deliberate setting (V9).** He ran his review bench on it and reran a 3D build on it after running High by accident; the Extra High build was better. He states no setting for the TS Rust run. Google makes High the default and Extra High the level for the hardest engineering work; Neon has no Max. High for small edits and writing is this guide’s suggestion. [V9, 24:25][v9-review] [V9, 25:41][v9-3d-xhigh] [Neon announcement][neon-blog] [Neon thinking levels][neon-levels]

**Extra High versus the next model up.** Anthropic’s guide notes that past High one more effort level can cost as much as a bigger model, so test the next model up at a lower effort instead. Theo relays this and adds that overthinking hurts: Max forces long thinking even on simple tasks. Ultracode is now a separate toggle for deliberately burning many tokens on absurd goals, not an effort level. [V7, 08:17][v7-max] [V7, 08:40][v7-overthinking] [V7, 12:04][v7-past-high] [Claude model guide][claude-dev-models]

**Sol 6.1: task levels are still suggested.** Ben recommends the model but does not prescribe narrated Sol thinking levels for daily coding, research, review, or design. The on-screen Codex session at 13:55 shows Sol Medium; that is an observed configuration, not evidence that Ben recommends Medium for every task. [V4, 13:55][v4-medium-visible]

**Haiku 5.5: Medium with reasoning enabled is the suggested worker starting point.** V5 supplies no task-by-task effort rule. Theo cautions against disabling reasoning for general automation; the poor no-reasoning trial he discusses belongs to another person. Anthropic documents Low, Medium, High, Extra High, and Max, with Medium as default. Low may suit simple validated requests; High may help longer tasks or strict instructions. Neither Extra High nor Max is the guide’s worker default. [V5, 10:20][v5-no-reasoning] [Haiku prompting][haiku-prompting]

| Level | Practical use in this guide |
| --- | --- |
| **Low** | Optional Haiku setting for simple validated bulk requests. Theo calls Opus Low “garbage” (V7). |
| **Medium** | Suggested Haiku bulk-analysis starting point; suggested Opus level for bounded lookups for a lead; Sol for general questions and routine computer use. |
| **High** | **Theo’s everyday Opus 5.5 setting (V7).** Gemini 4 Neon’s default, suggested for small edits and writing. Suggested GPT-6.2 Astra level for deep review. Haiku High can be tested for longer bulk runs or strict instructions. Suggested GPT-6.2 Astra level for heavy computer use. Suggested Fable 5.2 level. |
| **Extra High / `xhigh`** | **Gemini 4 Neon for building (suggested, from the level Theo chose in V9).** Opus 5.5 for check-heavy work (V7) and long unattended runs (Ben’s V4 everyday setting, now superseded as the default). For Sol, use selectively when High is insufficient. Fable 5.2 Extra High scored highest on Anthropic’s Frontier Code chart; use it for the hardest advisor questions. |
| **Max** | Avoid. Ben rejects Max on Claude; Theo calls it garbage in V7 and says Fable 5.2 consistently scores worse on Max than on Extra High in most benchmarks. Some Sol benchmark regressions remain supporting observations. |

What the videos explicitly establish:

- **Theo, Opus 5.5 and Fable 5.2 (V7; V8 states no levels):** High is his everyday Opus setting; Medium and Extra High are very good; Low and Max are garbage; Fable 5.2 does worse on Max than on Extra High. [V7, 07:48][v7-high] [V7, 08:17][v7-max]
- **Ben, Opus 5.5 (V4, superseded as default):** Extra High works well in his heavy everyday use; he sets it once and leaves it there. He rejects Max on Claude. This is hands-on advice rather than a universal proof that lower levels cannot work. [V4, 03:11][v4-game] [V4, 17:27][v4-effort]
- **Theo, V1 Anthropic models:** avoid Low and Max; Medium is substantially more convincing on Opus than on Sonnet. Preserve the model-specific historical scope. V7’s High governs Opus; Haiku’s later supported settings require their own assessment. V5 explicitly rejects Sonnet Max. [V1, 16:24][v1-effort] [V5, 15:04][v5-max]
- **Theo, Sol 6.1:** Low/High perform well in some Deep SWE runs; Extra High/Max sometimes regress, while other terminal tasks benefit from High/Extra High. These remain benchmark observations, not a task-by-task effort rule from Ben. [V2, 03:38][v2-bench-effort] [V2, 08:46][v2-terminal]

Official documentation clarifies the controls:

- Sol 6.1 supports **Low, Medium, High, Extra High, and Max**; its API default is Medium. `none` and `minimal` are not supported. [OpenAI model page][sol-docs]
- Opus 5.5, Sonnet 5.5, and Fable 5.1 support those five effort levels too. Opus defaults to Medium and Fable to High. Sonnet defaults to High in the API, but Medium in Claude apps and Claude Code. Select the level explicitly when reproducing a workflow across tools. Fable 5.2 (`claude-fable-5-2`) offers the same levels in T3 Code, where its default is Medium, so pass High explicitly; its documented API default was not checked for this update. [Anthropic effort documentation][effort-docs] [Fable documentation][fable-docs] [Sonnet announcement][sonnet-docs]
- Haiku 5.5 (`claude-haiku-5-5`) supports the same five levels; Medium and adaptive thinking are defaults. Its context window is **1M tokens**. The **100k prompt threshold is a pricing boundary, not a context limit**. Low/Medium can omit coding checks, so require a check that exercises the actual change. With thinking disabled, only Low–High are accepted. These are official controls/caveats, not Theo’s tested effort recommendations. [Haiku overview][haiku-overview] [Haiku prompting][haiku-prompting]
- Gemini 4 Neon (`gemini-4-neon`) supports Low, Medium, High and Extra High (`xhigh`), with High the default; `minimal` and a token thinking budget are rejected. Antigravity labels the top level Extra High. [Neon thinking levels][neon-levels] [Neon in Antigravity][neon-antigravity]
- Effort is guidance, not a fixed thinking duration or a promise to use a certain number of tokens. Equal level names are not calibrated equally across models. Theo's explanation that Max raises a reasoning “floor” is his interpretation; Anthropic's documentation does not guarantee such a minimum and says a request can skip thinking even at Max. [Anthropic thinking documentation][thinking-docs]

When a result is poor, first check whether the model had the relevant files, sources, tools, and a clear success criterion, including a way to verify its own work. Raise effort when reasoning is the problem. Switch models when the problem is fit: Opus going in circles, missing an idea, or offering options that are too similar is a reason to ask Fable, not automatically Max. Anthropic’s guide gives the same order: verification, then one effort level, then the next model up at a lower effort. [V7, 38:11][v7-variety] [V7, 41:21][v7-ship] [Claude model guide][claude-dev-models]

## Planning and frontend workflow

The procedures below are a synthesis of the recorded model roles. V7 supplies the provable/unprovable split and Opus’s High setting; Ben supplies Opus’s intent/design/refactor strengths. Neither creator establishes an animation-specific or standalone planning ranking.

### Plan coding work

Use **Opus High** to investigate existing behavior, dependencies, and constraints, and to turn the intent into a plan with milestones that have observable completion criteria. Give it the scope explicitly and invite pushback, because Opus takes the task as given and lets a spec grow. When the plan turns on a judgment no check can settle (which architecture, which product direction, which of several options), ask **Fable High** for a wider variety of options and a challenge to the premise; the builder (Neon; Opus when Neon is unavailable) then carries out the chosen plan. When people will read the plan, as a proposal or a feature write-up, have **Neon High** write it up: it is the first model to write Theo’s working-backwards plan like a real blog post and to drop a skill’s style guide when told to (V9). Superseded: the V2–V6 handoff in which Sol investigated and Opus built. [V9, 22:31][v9-plan-page] [V7, 21:39][v7-bloat] [V7, 23:43][v7-prompt-tip] [V7, 35:27][v7-provable] [V7, 38:11][v7-variety] [V4, 09:08][v4-intent] [V2, 21:34][v2-investigate]

For architecture investigation that can be settled by reading the code, testing theories, and measuring, Opus finds pretty much everything. Use Fable when the right answer is a matter of judgment or needs a clever idea, such as an unusual way to cut infrastructure cost. [V7, 36:15][v7-unprovable] [V4, 10:35][v4-refactor]

### Design and build a frontend

1. **Explore the direction with Fable 5.2 High, the design skill on.** Supply the audience, purpose, content, visual references, and existing conventions. V7 makes graphics and visuals that should not look generic Fable’s job; V6 showed Fable’s game looked better and stayed more coherent. Without the design skill it produces template slop, and its chart redesign once hid the data it was meant to show. Ben’s dislike of Fable’s interaction style is a separate consideration from visual output.
2. **Implement and simplify with Neon Extra High (Opus High when Neon is unavailable).** V9 makes Neon the builder but tests no frontend implementation; the Opus evidence below still applies to Opus. Preserve the chosen direction and concrete constraints. Ben’s UX/performance cleanup experience supports this role; Opus is more steerable for precise instructions.
3. **Inspect the real result.** Check relevant screen sizes and inputs, and that the visual still shows what it must. For animations, assess timing, interruption, reduced motion, and performance. These checks are practical synthesis, not claimed demonstrations.
4. **Use GPT-6.2 Astra High for independent technical review when needed.** Check logic, regressions, or performance evidence. Judge aesthetics against the intended design and rendered output. [V7, 36:15][v7-unprovable] [V6, 32:54][v6-slop] [V6, 22:38][v6-redesign] [V6, 45:29][v6-coherent] [V4, 10:35][v4-refactor] [V1, 20:12][v1-design]

When the direction is already fixed, skip step 1 and let the builder (Neon; Opus when Neon is unavailable) build it. For Sol-authored frontend or refactor work, spell out the framework, intended layout, visual constraints, and complexity limits. Ben finds GPT models more literal and more likely to make unwanted discretionary choices or add unnecessary structure. This is a reason to provide clear constraints and inspect the result, not to assume every Sol implementation has these problems. [V4, 09:37][v4-gpt-choices] [V4, 11:02][v4-complexity]

## When and how to research

### Codebase investigation

This is the kind of research the videos actually demonstrate: inspecting code, tracing behavior, testing a hypothesis, and giving a builder or reviewer useful evidence.

Use a separate investigation step when you do not yet understand the cause, the change spans several modules, a rewrite needs scoping, or a fix could introduce a regression. A tiny change with an obvious cause and a clear check usually needs only local inspection.

Suggested workflow, combining the newer video's model roles with a practical handoff:

1. **The lead frames the work.** State the intended behavior and what needs to be discovered. Opus High leads the investigation; Neon builds (V9).
2. **Investigate with Opus.** Opus Medium subagents can locate files or read logs in a bounded area; Opus High diagnoses root causes, builds a reproduction, and tests theories; Extra High for check-heavy cases such as replaying a large log corpus. Haiku only sweeps a large data set for a pattern. Give the worker the relevant repository, failure symptoms, and a bounded question.
3. **Ask for evidence.** Require file/line references, a causal explanation, a reproduction or check where possible, and remaining uncertainty.
4. **Hand Fable the environment when Opus is stuck.** If Opus has a repro but keeps missing the cause, ask Fable High to verify the environment, play with it, find the edges that actually cause problems, and propose solutions. In Theo’s T3 Code case it found the problem Opus had missed at once and fixed it. Fable directs the fix and the builder implements it (V8; Neon since V9, Opus when Neon is unavailable); if Fable makes a small fix itself, run its checks before accepting it. [V8, 34:14][v8-unverified] [V8, 34:55][v8-oracle]
5. **The builder implements.** Neon Extra High (V9), or Opus High when Neon is unavailable, with the investigation report and a concrete success criterion.
6. **GPT-6.2 Astra reviews independently (V8).** Use High for consequential changes; ask for plain-English findings; check behavior, regressions, and whether the implementation actually addresses the cause. Fix only findings within the intent, so review does not grow the change.
7. **Verify the result.** Run the appropriate tests or inspect the actual behavior. A second model's agreement is useful feedback, not proof.

V7 moves investigation from Sol to Opus and adds the Fable handoff; the Opus-builder/Sol-auditor pairing from V5 survives as builder and cross-family reviewer, with GPT-6.2 Astra replacing Sol as the reviewer in V8 and Neon replacing Opus as the builder in V9. The numbered procedure and the Medium/High split are my synthesis. [V7, 14:25][v7-opus-checks] [V7, 27:39][v7-t3-perf] [V7, 28:26][v7-opus-repro] [V7, 29:37][v7-fable-verify] [V7, 31:06][v7-sol-loop] [V5, 38:28][v5-audit]

Example investigation prompt:

```text
Investigate why [observed behavior] happens in this repository.
Expected behavior: [desired behavior].
Work read-only and trace the relevant code paths.
Return the likely cause, file/line evidence, a reproduction or verification
step, the smallest plausible fix, and anything still uncertain.
```

Example review prompt:

```text
Review this change against [expected behavior].
Look for concrete regressions and edge cases across the affected code paths.
For each finding, give the location, trigger, impact, and supporting evidence.
Check the running behavior or tests when available.
```

You can perform the handoff manually by copying reports between chats. Automatic delegation requires an agent setup that can call the selected model; choosing Opus by itself does not establish that setup.

### Web and documentation research

V5 suggested Haiku for reading documentation and comparing projects; V7 retires Haiku side tasks, so a coding lead now hands bounded source collection to an Opus subagent. Anthropic suggests Fable for deep research and qualitative analysis. The source-selection and synthesis procedure below remains **additional practical guidance**, rather than a demonstrated general web-research comparison. [V5, 33:20][v5-research] [V7, 11:18][v7-haiku] [Claude model guide][claude-dev-models]

Research before deciding when the answer depends on a current library/API version, an unfamiliar tool, changing product behavior, or conflicting factual claims. Use source access when facts are missing; higher thinking alone cannot retrieve them.

- For a focused standalone question outside a coding session, **Sol Medium** remains useful. Under a coding lead, an **Opus Medium** subagent collects a bounded set of primary-source facts, with links and clear uncertainty.
- Use **Opus High** to reconcile conflicting sources or synthesize a technical question for coding work, or **Sol High** for a standalone question. Ask **Fable High** when the synthesis is qualitative or needs novel ideas; give it the timeline and outside events, which V6 showed it forgets to check. [V6, 17:40][v6-timeline]
- Try **Extra High** only when the source material is available and the unresolved difficulty is the analysis itself.
- Give a clear scope, relevant version/date, desired output, and a stopping criterion. Prefer official documentation, source code, specifications, and original research. Require links that support the conclusions.

Example:

```text
Research [question] for [project/version/use case].
Use current primary sources and open the pages supporting key claims.
Compare publication/update dates when sources conflict.
Return a recommendation, the supporting links, unresolved uncertainties,
and a short explanation of what would change the recommendation.
```

Browsing, a dedicated Deep Research workflow, and thinking effort are separate controls. Sol at High is not automatically “Deep Research”; research needs source tools, and the dedicated API workflow has its own setup. [OpenAI web search][web-docs] [OpenAI Deep Research][research-docs]

## Delegate side tasks to Opus and bulk analysis to Haiku

**Side tasks go to Opus 5.5 / Medium (suggested).** Locating files, reading logs or specified documentation, and collecting facts for a lead run on an Opus subagent. V7: Theo would never use Haiku for a side task, and rejects Anthropic’s framing that Haiku or Sonnet subagents should search files, read logs, or summarize. Anthropic’s reasoning (“keep small models on work where a mistake is cheap to spot”) is recorded as provider guidance; Theo’s hands-on view governs. The Medium level is this guide’s inference; raise it to High if the subagent stops before the question is answered. [V7, 11:18][v7-haiku] [V7, 14:48][v7-addy-table] [Claude model guide][claude-dev-models]

**Bulk analysis goes to Haiku 5.5 / Medium.** Use Haiku to go through a large amount of data and pattern-match it, or to visit every file in a codebase and flag a bad pattern you cannot identify with a script. Classification, routing, and extraction at volume fit too. Haiku does not write code. The lead owns the conclusion, spot-checks Haiku’s output, and keeps deep diagnosis, final review, implementation decisions, and orchestration. V5’s broader Haiku support role (locating files, reading documentation, checking theories) is superseded. [V7, 11:18][v7-haiku] [V7, 11:40][v7-haiku-code] [V5, 23:25][v5-attempts] [V5, 38:28][v5-audit]

Keep each brief explicit about inputs, scope, expected evidence, permitted tools, and completion. For bulk API work, let the lead retrieve/cache the shared data and partition it into bounded batches; set a request budget and handle error responses before parsing. Verify that a promised wait or retry was actually scheduled. These are practical adaptations to Theo’s observed rate-limit, error-handling, and early-stop failure, not a universally tested API recipe. A clean merge status is not a substantive review result. [V5, 30:42][v5-audit-failure] [V5, 33:48][v5-rate-limit] [V5, 35:05][v5-orchestration]

For bulk analysis, use **Haiku 5.5 / Medium with reasoning enabled** as the suggested initial setup. Select a harness that actually exposes that model and the needed tools. Claude Code or an API-backed agent are candidates whose current integration must be checked; the current Codex subagent launcher may not support Haiku. If unavailable, use a supported worker or supply a manual handoff. Adapt worker count to available concurrency rather than copying the video’s ten-agent demo or hundred-agent example.

Example Haiku bulk-analysis prompt, ready to adapt:

```text
Check every file in [list or batch] for [pattern, with one positive and one
negative example]. Work read-only. For each match, return the file, line, the
matching snippet, and a confidence. Return nothing else for files without a
match. Stop when every file in the batch has been checked; list any file you
could not read.
```

Example Opus Medium side-task prompt, ready to adapt:

```text
Find the implementation of [specific behavior] within [repository paths].
Work read-only. Start with deterministic searches and inspect relevant files.
Return file/line evidence, the relevant callers, and facts the lead needs.
Separate confirmed facts from hypotheses. Do not decide the final fix.
Use only [allowed tools] and at most [request budget] external requests.
Stop when the bounded question is answered; if blocked, return the exact gap
and partial evidence. Do not claim a wait or retry unless you scheduled it.
```

Haiku’s **1M-token capacity** and **100k prompt pricing boundary** are separate. Theo relays an optional Haiku-only compaction setting for API-billed work; its exact current configuration is not verified here, and this guide changes no settings. Compacting can discard needed evidence, so choose based on task needs rather than treating the threshold as a hard model limit. Browser/computer use likewise needs an implemented tool environment; it does not come with selecting the model. [V5, 06:38][v5-context] [V5, 08:29][v5-compaction] [Haiku overview][haiku-overview] [Haiku migration][haiku-migration]

## Recommendations retained from each video

This section keeps the broader advice alongside the task chooser. It separates current recommendations, superseded preferences, reported opinions, and tentative suggestions. Numerical benchmark scores and prices are not needed to preserve the recommendations.

### V1 — Theo: OpenAI should be scared of this one

- **Main coding model:** Opus 5.5 has taken over Theo's own workflow, even though Fable 5.1 was previously his favorite coding model. Sonnet 5.5 impresses him, but he does not recommend selecting it as the main everyday coder when choosing between these models. **V4 temporarily supplied a Sol-first general default; V5 reaffirms Opus as the current coding builder.** [V1, 00:00][v1-opening] [V1, 21:04][v1-main-choice] [V5, 39:07][v5-final-pairing]
- **Frontend design:** Fable 5.1 remains his preferred model for attractive frontend and marketing-site designs. Opus is more steerable and better at following specific design instructions. He is unimpressed by Sonnet's frontend examples. **Retained as older marketing-page evidence; V4 makes Opus the general design collaborator without a head-to-head comparison on this exact task.** [V1, 18:54][v1-design-demo] [V1, 20:12][v1-design]
- **Investigation and planning support:** Let Opus or Fable call Sonnet to examine a large codebase, explain behavior, help scope work, check API-related hunches, or prepare a breakdown of a large change. These are investigative tasks, not the same as implementing code. **Superseded as Theo's preferred assistant: V2 chose Sol 6.1, and V7 moves investigation to Opus. Sonnet's demonstrated usefulness remains recorded.** [V1, 21:44][v1-sonnet-role] [V1, 24:13][v1-sonnet-research] [V1, 30:02][v1-delegation]
- **Deep analysis:** At the time of V1, Astra produces his strongest detailed breakdown of a large change. **Routine preference superseded by V2's Sol recommendation, and later by V7: Opus investigates.** [V1, 22:28][v1-astra-analysis]
- **Thinking levels:** Avoid Max for ordinary work and avoid Low on the Anthropic models discussed in V1. Medium is more convincing on Opus than Sonnet; High/Extra High can help more demanding work. Do not assume that the highest level gives the best result. **Historical model-specific observation; V7’s Opus High now governs. Do not extend the Low caution automatically to the later Haiku release.** [V1, 11:25][v1-max] [V1, 16:24][v1-effort]
- **Game-building results:** Sonnet produces an impressive game whose movement and mechanics feel good to him, despite reservations about its frontend design and efficiency. This distinction matters: a model can perform well on a game-building task and poorly on a marketing-site design task. **Retained as a demonstrated strength, not a claim that Sonnet should replace Opus.** [V1, 27:04][v1-game]
- **Writing and office artifacts:** Theo notices clearer writing and collaboration from Sonnet than its predecessor. He also relays Anthropic's document/slide/spreadsheet claims and later suggests its investigative strengths may extend to documents and office work. **Limited evidence: he does not establish a personally tested best model for those artifacts.** [V1, 04:24][v1-office] [V1, 06:57][v1-writing] [V1, 30:54][v1-office-inference]
- **Efficiency:** Evaluate whole tasks. Faster token generation does not guarantee a faster finish; token volume, repeated context reads, and caching affect the outcome. Sonnet did not consistently deliver the everyday savings its model tier might suggest in his examples. **Retained as selection advice, without price tables.** [V1, 07:45][v1-efficiency] [V1, 17:30][v1-speed]
- **Other models and upcoming releases:** Theo dislikes Sonnet 5 and is unimpressed by GPT-6 Sol. Haiku 5.5 was only upcoming in V1; V5 supplied worker roles, and V7 narrows Haiku to bulk analysis. **Historical context retained; GPT-6 Sol must not be confused with the later GPT-6.1 Sol.** [V1, 03:33][v1-old-models] [V1, 05:06][v1-haiku] [V1, 15:00][v1-sol6]

### V2 — Theo: OpenAI fights back

- **His overall pairing:** Keep Opus 5.5 as the preferred collaborator and implementation model. Use Sol 6.1 for investigation and independent review. Sol can plausibly be a default coding model for people whose work fits its strengths, but it has not displaced Opus in Theo's own workflow. **V7 moves investigation to Opus; Sol keeps independent review until V8 hands it to GPT-6.2 Astra.** [V2, 21:34][v2-investigate] [V2, 27:51][v2-tandem] [V2, 29:26][v2-sonnet]
- **Scoped work:** Sol is particularly appealing for bounded work. The video includes an assessment written by Opus calling it a default for scoped work; keep that attribution separate from Theo's stronger personal preference for Opus as the main builder. [V2, 15:41][v2-model-assessment] [V2, 18:28][v2-scoped]
- **Code review and regression hunting:** Sol can investigate deeply and find real problems that Fable and Opus miss. Theo trusts it to review work even while remaining less comfortable merging its authored code. He wants Opus to call Sol for reviews, root-cause investigation, codebase analysis, and triage. **V7 moves investigation to Opus; Sol keeps review until V8 hands it to GPT-6.2 Astra.** [V2, 13:08][v2-audits] [V2, 21:34][v2-investigate] [V2, 26:23][v2-regressions]
- **Large rewrites and unattended loops:** Prefer Opus. Theo describes Sol following process rules while failing to make progress or ask for help. His compiler rewrite advances with Opus after unsuccessful work with OpenAI models. A long-running agent is useful only when the project is actually advancing. [V2, 15:51][v2-rewrites]
- **Cleanup after successful implementation:** Keep independent review in the workflow. Opus made the compiler work but left a large amount of obsolete code; Sol's later audit exposed it. Successful implementation and thorough cleanup are separate checks. [V2, 27:51][v2-tandem] [V2, 28:46][v2-cleanup]
- **Browser and computer use:** Sol becomes a practical default for his everyday computer tasks. Astra still has stronger capability in some cases, but Sol's more consistent behavior makes it attractive to him. His invoice/investment example has Sol find information and prepare tabs/forms, with Theo completing the final send step. [V2, 11:22][v2-computer] [V2, 12:35][v2-computer-default]
- **Astra's remaining strengths:** Its exceptional peaks, including 3D and computer use, remain acknowledged. In Theo's fleet-management examples, Astra makes fewer mistakes than Sol or Opus. Still, he says he is moving away from Astra after this release. Preserve both observations rather than declaring it worse at every task. [V2, 11:10][v2-peaks] [V2, 16:41][v2-astra]
- **Frontend/UI design:** Avoid Sol as the default designer. Theo criticizes its excessive text, poor taste, and game UI despite impressive graphics. Strong analysis or coding-benchmark performance does not imply good visual judgment. [V2, 22:18][v2-game-ui] [V2, 24:34][v2-ui]
- **Blender and 3D assets:** Sol is good at making a requested model using Blender through the CLI, including from a reference screenshot. Separate that asset work from gameplay mechanics. Theo suggests that Opus or Sonnet could improve how the attractive Sol-generated game plays. [V2, 24:59][v2-blender] [V2, 25:31][v2-game-handoff]
- **Sonnet's role:** Sol 6.1 effectively replaces Sonnet as Theo's investigation/review assistant. Sonnet remains capable; the recommendation is about which model he now reaches for. [V2, 29:26][v2-sonnet]
- **Automatic model routing:** Theo advises against the particular OpenRouter cost-routing approach he tests. He argues that a router choosing from a prompt without the task's context cannot judge its difficulty well; his runs also take more steps and longer to finish. Preserve this as criticism of that tested routing setup, not proof that every form of routing fails. [V2, 19:33][v2-router]
- **Thinking levels and benchmarks:** Try settings against real tasks. Sol Low/High looks strong in some runs, while Extra High/Max can regress. His runs have methodological limits, so use them as support rather than an intelligence ranking. [V2, 03:38][v2-bench-effort] [V2, 08:46][v2-terminal]
- **Earlier GPT-6 releases:** He was unimpressed by GPT-6 Sol and Luna and did not make dedicated videos about them. That is a negative overall impression, not a detailed task-by-task evaluation. Sol **6.1** is the release he recommends here. [V2, 00:04][v2-opening]
- **Limits of his Sol coding experience:** Pre-release restrictions kept him from putting Sol-authored code into his open-source projects, so much of his testing involved audits. His review recommendation has more direct support than a blanket claim that Sol should write all your production code. [V2, 26:06][v2-testing-scope]
- **Future acceleration:** He is excited about the possibility of faster OpenAI execution, but describes it as something he is waiting for. It is not an established capability to rely on for the recommendations in these videos. [V2, 12:35][v2-computer-default] [V2, 25:38][v2-future]

### V4 — Ben Davis: So Who Won?

**Governing source from 3 October until V5; retained where compatible.** These are direct Ben recommendations and observations unless otherwise labelled. V5 supersedes the Sol-first coding default; Ben’s explicit Opus effort and compatible specialist evidence remain active.

- **Default tier and exact versions:** Sol 6.1 and Opus 5.5 are both successful daily-driver models; most people need this tier most of the time rather than automatically choosing Astra/Fable. Reconsider Sol **6.1** even if GPT-6 Sol disappointed you: Ben experiences a substantial capability improvement, closer to Astra, with fewer of its unusual behaviors. Astra’s exceptional peaks remain distinct. [V4, 00:00][v4-opening] [V4, 00:46][v4-version] [V4, 02:13][v4-sol]
- **Overall choice:** Sol 6.1 is Ben’s reliable general workhorse. If selecting one ecosystem he chooses Codex/OpenAI; he recommends both Sol and Opus when practical. This preference combines useful output, efficiency, and ecosystem access, rather than declaring Sol superior on every task. Ben also says he has used Opus more and regards it as the strongest overall model, with Astra’s occasional higher peaks. **Retain his experience; V5’s newer Opus-led coding preference supersedes this coding/ecosystem starting choice.** [V4, 13:33][v4-capability] [V4, 19:31][v4-workhorse] [V4, 19:50][v4-default] [V4, 21:50][v4-final]
- **Opus improvement and collaboration:** Ben had low expectations after Opus 5, but Opus 5.5 became a heavily used model with readable outputs and clear explanations. Better communication makes complicated work easier to manage. Both models communicate usefully: Opus is more personable; Sol is pragmatic and mechanical. Ben dislikes Fable’s verbose interaction style; he does not establish a new Fable-versus-Opus visual-aesthetics contest. The captions contain an apparent version slip at 07:09; the clear surrounding Opus 5 comparison is used instead. [V4, 02:31][v4-opus] [V4, 06:52][v4-communication] [V4, 08:25][v4-sol-communication]
- **Implied intent and discretionary choices:** Opus is especially good at filling in a vague request in a way Ben likes. GPT models’ decisions about unspecified frameworks, layouts, and implementation details can drift from what he wanted during long tasks. His dungeon example illustrates fitting a hookshot exit target naturally into the existing area. Prefer Opus when judgment and incomplete requirements matter; with Sol, specify important choices. [V4, 09:08][v4-intent] [V4, 09:37][v4-gpt-choices] [V4, 10:12][v4-game-intent]
- **Design, substantial ports, and simplification:** Ben explicitly values Opus for design, long complicated ports, refactoring, and simplification. In his thumbnail/asset-catalog project, many commits and PRs improved performance, UX, and code quality while the codebase got smaller. This supports a practical role more directly than a benchmark intelligence score. [V4, 10:35][v4-refactor]
- **Complexity and supervision:** Ben finds OpenAI models more likely to add unnecessary exception handling, tests, or complicated structure when left unconstrained. Sol is less prone to this than Astra and can be easier to work with when Astra’s top-end capability is unnecessary. This is his observed tendency; it is not a recommendation to remove necessary tests or exception handling. [V4, 11:02][v4-complexity]
- **Game/3D work:** Opus 5.5 at Extra High ran for hours on a decompiled Majora’s Mask project, creating a custom area, mini-dungeon, enemies, and puzzles. Ben praises its 3D handling and layout choices, while explicitly saying the result is not a shippable game. This establishes a modding/integration example rather than proof that every 3D task should switch from Sol/Astra. [V4, 03:11][v4-game] [V4, 10:12][v4-game-intent]
- **Effort:** Ben leaves Opus 5.5 on **Extra High** and calls it the sweet spot. **Superseded as the default by V7’s High; Extra High stays for check-heavy and long unattended runs.** He advises against **Max on Claude**. No narrated task-specific Sol effort assignment is supplied. His long Sonnet experiments in “Ultra mode” were experimentation and consumed substantial usage; the unspecified mode/harness is not a recommended API effort setting. [V4, 17:27][v4-effort] [V4, 17:41][v4-limits]
- **Astra’s specialist role:** Ben now chiefly reaches for Astra for heavy computer use, where he considers it strongest, or to try Ultrafast. The former is a positive specialist recommendation; the latter comes with his advice to almost never enable Ultrafast for normal work. He reports rapid usage consumption and finds the speed rarely worthwhile. No thinking level is stated for either role. [V4, 11:45][v4-astra] [V4, 16:25][v4-ultrafast]
- **Sol Ultrafast roadmap:** Ben says Sol 6.1 Ultrafast is not available yet at recording time and looks forward to it. Expected speed, efficiency, and allowance are predictions, not a tested setup. Official Ultrafast documentation checked on 2026-10-03 establishes Astra access but does not establish a generally available Sol 6.1 Ultrafast setup; verify again before proposing that handoff. [V4, 16:39][v4-roadmap] [Ultrafast documentation][ultrafast-docs]
- **Harness/access tradeoffs:** Ben compares model access, usage allowance, interaction style, unique capabilities, and daily preference. He describes Claude subscription use as primarily Claude Code or wrappers such as Conductor/T3 Code, with less portability into Hermes, Pi, or OpenCode. This is a dated subscription-access assessment, not a restriction on Opus API availability. He praises supported Sign in with ChatGPT integrations beyond Codex desktop, naming Amp, Conductor, Devin, Hermes, and T3 Code. Preserve his ecosystem preference, while verifying a particular integration before promising it works. Official documentation supports plan usage for **eligible requests in participating integrations**, rather than arbitrary software. [V4, 06:14][v4-selection] [V4, 18:13][v4-harness] [V4, 18:39][v4-portability] [Sign in with ChatGPT documentation][siwc-docs]
- **Visualization and data investigation:** Ben demonstrates Sol 6.1 producing graphs/interactive HTML in Codex desktop and recommends asking the model to visualize the information in chat. He still uses that app for this capability despite performance/sidebar issues. He also uses Sol to analyze model-usage data across his current machine and Linux box. Its task categories/counts are approximate, exclude his Windows game work, and are not a standardized productivity metric. Neither example specifies a narrated reasoning level. [V4, 13:01][v4-visualize] [V4, 20:12][v4-telemetry]
- **Efficiency and limits:** Judge completed work, including steps, token volume, and repeated file reads, rather than API sticker price alone. Ben’s ordinary Sol/Opus usage feels generous; that is personal experience, not an unlimited-usage guarantee. His interpretation of subscription-accounting changes includes short observation time and a changed subscription, so it cannot establish a settled entitlement comparison. Numerical prices, usage totals, and task-price charts are omitted under the guide’s scope. [V4, 03:59][v4-opus-limits] [V4, 14:09][v4-efficiency] [V4, 15:17][v4-accounting] [V4, 17:41][v4-limits]
- **Benchmark limits:** Ben values Deep SWE for efficiency comparison but doubts its intelligence ranking, citing apparent contamination and implausibly high placements. Treat contamination as his assessment, not an independently proven finding. His chart commentary and approximate task telemetry support efficiency observations; they do not replace hands-on evidence of judgment or design. The exaggerated repeated-read example is not a measured file-read rate. [V4, 01:44][v4-benchmarks] [V4, 14:09][v4-efficiency] [V4, 20:12][v4-telemetry]
- **Competition explanation:** Ben views the labs as corrective forces pushing each other toward better models, access, and efficiency. This is his interpretation of the market, not verified causation and not a separate model/task recommendation. [V4, 21:03][v4-competition]

### V5 — Theo: finally a good small model

**Added on 9 October; V6 and V7 are newer.** Its Haiku support role and Sol investigation role are superseded by V7; the rest stays where compatible. The full review was read; sponsor content is excluded. No narrated task-specific Haiku or Sol effort rule is supplied.

- **V5 coding trio:** keep Opus 5.5 as the builder and Sol 6.1 as the independent auditor. Add Haiku 5.5 for collecting data, reading material, and categorizing. Theo now finds his Claude subscription more useful for his own coding work. This supersedes V4’s coding starting choice, while preserving compatible older specialist evidence. **V7 keeps Opus as builder and Sol as reviewer (V8 replaces Sol with GPT-6.2 Astra), moves investigation to Opus, adds Fable, and narrows Haiku to bulk analysis.** [V5, 38:28][v5-audit] [V5, 39:07][v5-final-pairing] [V5, 40:55][v5-ecosystem]
- **A real small worker, distinct from Haiku 4.5:** Theo now considers Haiku 5.5 worth using in some roles and intends to remove his blanket Opus/Sol-only delegation rule. He continues to reject Haiku 4.5. Do not apply that older rejection to the new exact version. [V5, 00:16][v5-old-haiku] [V5, 24:00][v5-delegation-change] [V5, 40:14][v5-small-verdict]
- **Best deployment:** embed Haiku in applications or let stronger agents call it for bounded support. Theo explicitly declines it as his own primary coding agent. Useful examples include locating files, categorizing incoming data, reading documentation, checking theories, and comparing projects. **Superseded by V7 except for bulk categorization and pattern-matching; side tasks go to Opus.** [V5, 22:00][v5-subagents] [V5, 31:31][v5-coding] [V5, 33:20][v5-research]
- **Checkable attempts:** Haiku may help when several cheap candidates can be objectively evaluated and repeated attempts matter more than each candidate’s judgment. Anthropic’s egg-drop demonstration supports the idea but is not Theo’s independent trial. His Opus-led bulk-PR rerun is shown starting; the review does not establish its completed success. [V5, 22:21][v5-egg-demo] [V5, 23:25][v5-attempts] [V5, 32:58][v5-candidates] [V5, 35:05][v5-orchestration]
- **Keep reasoning enabled for general Haiku workers:** Theo discusses another person’s worse automation results after disabling reasoning; his own Claude Code speed impression with reasoning enabled is favorable. This is not a controlled effort comparison. For no-reasoning text categorization he suggests Jev; with vision, Haiku or Luna are possibilities and he tentatively favors Luna. Jev’s provider identity is separately verified as TypeSafe AI; the nearby mention of an OpenAI Decisions API does not identify Jev as an OpenAI model. [V5, 10:20][v5-no-reasoning] [V5, 11:09][v5-classification] [V5, 11:29][v5-speed] [Jev identity][jev-docs]
- **Provider-positioned applications:** the announcement he reads lists summaries, compaction, database queries, classification, coding subagents, customer support, and browser use. Preserve these as provider claims. Theo’s browser/computer-use enthusiasm is based on benchmarks and reports; he explicitly says he has not tried it. Existing Sol/Astra hands-on computer-use roles remain active. [V5, 04:00][v5-provider] [V5, 09:44][v5-computer]
- **Frontend and programmatic video:** he praises community examples and observes a substantial improvement with the design skill enabled. He calls Haiku usable for constrained frontend work but does not present it as sufficient for all application/design work. His dataset/taste explanation is speculation. These examples do not displace Opus or establish a video/animation-specific effort level. [V5, 24:24][v5-video] [V5, 25:24][v5-design] [V5, 27:07][v5-design-limits]
- **Game-building limits:** his Fish Slop trial lacks mouse movement and sound, has corner and attack-timing problems, and fails to honor the source as desired. Haiku’s output does not establish reliable gameplay or a replacement for a stronger builder. Most requests in that run crossed the lower pricing threshold; shrinking context could also lose quality. [V5, 28:19][v5-game] [V5, 30:10][v5-game-context]
- **PR triage is not final audit:** Haiku finds performance-related PRs but treats GitHub’s clean status as readiness without enough substantive examination. Theo hands a candidate to Opus for judgment and correction. Sol’s independently thorough audit was his preferred cross-family check before a PR is opened (V8 replaces Sol with GPT-6.2 Astra). [V5, 27:39][v5-pr-trial] [V5, 30:42][v5-audit-failure] [V5, 38:28][v5-audit]
- **Bulk API and continuation failure:** a large PR run exhausts shared GitHub quota, saves an error body as data, then claims it will wait without scheduling a continuation. Theo reruns the task with Opus coordinating Haiku workers. Preserve these demonstrated limits; stronger orchestration is not proof of the rerun’s final outcome. [V5, 33:48][v5-rate-limit] [V5, 35:05][v5-orchestration]
- **Judge completed work:** context gathering, verification, repeated attempts, and failures can dominate a task. A cheap small model that cannot finish can be worse value than a capable builder. V5 prefers the strong model for implementation and places Haiku around it for suitable support. This is workflow advice, not a claim that every repository has the same cost distribution. [V5, 31:31][v5-coding] [V5, 36:07][v5-lead-choice]
- **Anthropic-only pairing and Sonnet:** Theo considers Opus + Haiku a sufficient current lineup for many users and suggests Sonnet can be omitted. Sonnet’s improved cache economics are acknowledged, but he does not supply a new hands-on Sonnet task ranking. He explicitly rejects Sonnet Max. Historical Sonnet successes stay recorded. [V5, 15:04][v5-max] [V5, 19:17][v5-cache-update] [V5, 37:31][v5-anthropic-pairing]
- **Benchmark-qualified alternatives:** his chart-based API-value lineup includes GPT-6 Luna, GPT-6.1 Sol, and Opus 5.5; he calls **MiMo-V2.6-Pro** an underrated open-weight option. His chart comments about Fable, Gemini, Grok, or Astra do not establish universal task losses or undo earlier task-specific evidence. The video’s charts change as effort runs and cache data arrive. Preserve the caveat rather than promoting the chart to an intelligence ranking. [V5, 13:18][v5-benchmark-limits] [V5, 17:05][v5-value-lineup] [V5, 17:20][v5-mimo] [V5, 40:00][v5-final-chart] [MiMo name/release][mimo-docs]
- **Context and access:** the low prompt-price tier ends above 100k input tokens; it is not the model’s capacity. Theo relays a Haiku-specific compaction option for API-billed work. He also welcomes subscription API credits for building apps and beta SDK browser/computer support, and describes T3 Code using installed Claude Code/Codex backends. These are dated access observations; verify the current integration before a handoff. No prices, credit amounts, or account changes are included here. [V5, 06:38][v5-context] [V5, 08:29][v5-compaction] [V5, 19:44][v5-access] [V5, 21:09][v5-sdk]
- **Future release:** Fable 5.5 is an anticipated release, not a tested model or a recommendation to use now. [V5, 40:26][v5-future]

### V6 — Theo: Nobody Is Competing With Anthropic

**Added on 11 November; V7 is newer.** Theo spent a launch day with Fable 5.2 and landed about 20 PRs with it. It adds an advisor role and Fable-specific limits; it did not change the V5 coding trio. Sponsor content is excluded.

- **Opus stays the daily driver:** Anthropic’s own guidance calls Opus 5.5 its strongest daily driver and suggests moving up to Fable only as scope requires; Theo agrees “beyond hard”. Fable 5.2 is not the model he will use for everything. He ran a project audit on Opus 5.5 High by mistake and was impressed; V7 then makes High his everyday setting. [V6, 07:02][v6-anthropic-guidance] [V6, 07:43][v6-daily-driver] [V6, 39:52][v6-opus-audit] [V6, 46:42][v6-verdict]
- **Advisor when stuck:** after hours of Opus 5.5 and Muse going back and forth on MCP guidance, Fable saw the problem at once, pushed back, and disproved its own claim once pointed at his history. When Terra kept producing noise about a slow machine, Fable gave the one-line cause; Opus also answered well. Anthropic offers Fable as an adviser other models consult or as an orchestrator of smaller models. Direct experience plus provider framing. [V6, 07:13][v6-advisor] [V6, 35:30][v6-terra] [V6, 36:43][v6-mcp] [V6, 38:01][v6-pushback]
- **More capable, not more autonomous:** a friend with early access put it that way, and Theo agrees from his own runs: Fable unblocks itself on hard problems but needs a human in the loop more than Opus, can spiral on an unimportant decision, and makes mistakes Opus would not, such as putting his email in a safe-mode banner meant to hide it and leaving out the diagram an explainer needed. He describes it as clever and spiky, the “wise owl”. [V6, 10:17][v6-wise-owl] [V6, 33:27][v6-in-loop] [V6, 33:56][v6-spiral] [V6, 38:22][v6-safe-mode] [V6, 38:46][v6-autonomy] [V6, 40:56][v6-diagram]
- **Codebase analysis:** in Theo’s own eval set Fable 5.2 underperforms Opus and Sonnet. On the TS-in-Rust codebase Sol 6.1 made 38 claims with none false, the best value; Fable got 4 of 61 wrong. On T3 Code Opus came first, Terra second, and Fable third with 6 of 83 wrong. This reaffirmed Sol for investigation. **Superseded by V7: Opus now investigates; Sol stayed the reviewer until V8 handed review to GPT-6.2 Astra.** [V6, 09:46][v6-evals] [V6, 20:12][v6-analysis] [V6, 20:47][v6-t3-analysis]
- **Review:** Fable reviews carefully and lets nitpicks slide, so it rarely gets stuck, but it misses some things and took about 120 minutes for eight PRs, against his unlogged estimate of 20 to 30 minutes for GPT models. When Fable calls a PR ready it usually is. Sol stays the cross-family auditor. **V7 reframes the slip-through as a strength for unblocking stuck work; V8 replaces Sol with GPT-6.2 Astra as the auditor.** [V6, 21:12][v6-review] [V6, 21:38][v6-ready] [V6, 21:46][v6-nitpicks]
- **Thinking level:** Theo says Fable 5.2 Max scores worse on most coding tasks and developers should not use it unless they evaluate it against lower levels. On Anthropic’s Frontier Code chart Extra High scores highest; Max does slightly better on two other charts (provider benchmarks). He states no Fable level of his own; High is this guide’s suggested start. [V6, 11:29][v6-xhigh] [V6, 11:54][v6-max-intro] [V6, 12:10][v6-max]
- **Design and games:** Fable needs the design skill; without it Theo gets template slop. Its redesign of a usage chart hid the differences it was asked to show until he complained twice. Its Fish Slop game looked better and stayed more coherent, while Opus’s was more fun; he concludes a combination of Opus and Fable works best. [V6, 22:38][v6-redesign] [V6, 32:21][v6-design-skill] [V6, 32:54][v6-slop] [V6, 44:06][v6-combination] [V6, 45:29][v6-coherent]
- **Data analysis:** more novel ideas, but it makes leaps and forgets to check events outside the data set; Theo had to remind it to look up model release dates as confounders. Give it the timeline. [V6, 17:29][v6-analysis-leaps] [V6, 17:40][v6-timeline]
- **Writing:** Fable seems better at prose and at writing for other models; Theo used it to overhaul copy and skills. It still adds needless eyebrow text and subheadings; he asked it what they are called and added a rule to his AGENTS.md. [V6, 34:12][v6-eyebrow] [V6, 34:22][v6-agents-md] [V6, 34:28][v6-prose]
- **Usage and speed:** on Claude subscriptions Fable has its own weekly limit on top of the regular one, and two points of it cost one regular point, so heavy Fable use cuts total usage sharply. Fable 5.2 now runs close to Opus speed; its optional fast mode is a service mode, not a thinking level. Prices stay outside this guide. [V6, 05:51][v6-fast-mode] [V6, 23:14][v6-subscription] [V6, 23:41][v6-limit] [V6, 28:18][v6-speed]
- **Provider claims and access:** Anthropic reports gains in science, hardware CAD and robotics, and Mythos 5.2 is the same model behind looser safeguards for vetted cyber and life-science work. Fable still has no zero-data-retention option for enterprises, which Theo credits for Opus 5.5’s wider adoption. These inform access, not task routing. [V6, 04:26][v6-mythos] [V6, 13:06][v6-cad] [V6, 17:49][v6-zdr]
- **Future release:** Fable 5.5 is still unreleased; Theo reads the 5.2 number as a smaller gap over Opus than Opus has over Sonnet. [V6, 46:48][v6-future]

### V7 — Theo: I think I figured it out

**Added on 14 November; V8 is newer.** Theo’s comparison of Opus 5.5 and Fable 5.2 after about two days of heavy Fable 5.2 use, against far more Opus use. It walks through Addy Osmani’s claude.dev model guide and then gives his own split. Direct experience unless labelled. Sponsor content is excluded.

- **Only two models for real-world coding:** of the current lineup (Opus, Fable, Sonnet, Haiku, Astra, Sol, Terra, Muse, Gemini 4 Carbon, Kimi), he keeps Opus 5.5 and Fable 5.2 and calls anything else “cope” without very good, specific reasons. [V7, 00:43][v7-opening] [V7, 01:09][v7-only-two] [V7, 05:14][v7-two-matter]
- **Subscriptions over cheaper models:** a Claude subscription gives far more work than API spend on any other model, and on a chart of intelligence against subscription cost per task Opus leads; he would take Opus Medium over Sol Max for real code and for how it feels to work with. Benchmark and pricing evidence, kept qualitative under this guide’s scope. [V7, 02:50][v7-subscription] [V7, 03:36][v7-sub-chart] [V7, 04:53][v7-opus-medium-sol]
- **Simple split, with nuance:** Opus for most things, Fable for hard things; but Opus has outperformed Fable in some of his own benchmarks, and Fable misses things Opus catches. [V7, 05:32][v7-nuance] [V7, 06:56][v7-fable-misses]
- **Effort:** start Opus at Medium as Anthropic says, step up when it misses things; his own setting is now High, which he calls the best balance. Extra High for check-heavy work; Low and Max are garbage; Fable 5.2 does worse on Max than on Extra High (the caption’s “Why is X high worse?” reads as a slip for Max). Max forces long thinking even on simple tasks. Ultracode is a toggle now, not an effort level. If Medium always suffices, ask for bolder work. [V7, 07:24][v7-opus-effort] [V7, 07:48][v7-high] [V7, 08:17][v7-max] [V7, 08:40][v7-overthinking] [V7, 09:00][v7-high-balance] [V7, 09:21][v7-medium-bolder]
- **Extra High uses:** Windows development, which needs many extra checks; analysing big log corpora and building a way to replay them against the implementation; exploratory PRs where every stone should be turned. Opus Extra High beats Fable at stone-turning. [V7, 13:10][v7-xhigh] [V7, 13:34][v7-logs] [V7, 13:59][v7-stones]
- **Sonnet 5.5:** he does not know when he would pick it now. It cost more than Opus on Fish Slop and made a worse version, and burns output tokens when it lacks a clear path. At most a scoped tool agents call, not a model-picker choice. Anthropic suggests it for well-scoped work; even with a clear spec, hard migrations or performance work warrant Opus or Fable. [V7, 09:43][v7-sonnet] [V7, 10:05][v7-sonnet-spec] [V7, 10:58][v7-sonnet-picker]
- **Haiku 5.5:** never for side tasks; use it for bulk analysis, pattern-matching over lots of data, or visiting every file to flag a pattern a script cannot find. Do not use it to write code. [V7, 11:18][v7-haiku] [V7, 11:40][v7-haiku-code]
- **Orchestration:** Opus 5.5 led and implemented his full compiler rewrite in Rust and handles huge migrations with many subagents; Fable does not unlock subagents Opus cannot run, and is only slightly better. Anthropic’s guide suggests Fable for leading many subagents. [V7, 15:33][v7-orchestration] [V7, 15:55][v7-migrations]
- **Usage limits:** Anthropic’s cost-per-task comparison uses API pricing. On subscriptions Fable can use at most half the weekly limit, and that half buys much less work than the same share spent on Opus. [V7, 16:17][v7-api-cost] [V7, 16:41][v7-fable-limit]
- **Speed:** Opus 5.5 runs about 100–115 tokens per second, Sonnet about 145, Haiku about 255; Fable 5.2 runs about 106, within margin of error of Opus, while Fable 5.1 ran about 88. Speed, ultimate capability, and orchestration skill no longer separate the two models. [V7, 18:15][v7-speed-opus] [V7, 19:12][v7-speed] [V7, 20:07][v7-not-relevant]
- **Opus, the teacher’s pet:** too willing to do too much, takes the teacher’s word, rarely misses anything, and reminds the teacher about forgotten homework. It bloats specs, lets features creep, and does not stop unless told to. It is not sycophantic, but it does not challenge the task. Opus 5.5 was more capable than Fable 5.1. [V7, 20:30][v7-fable51] [V7, 21:14][v7-teachers-pet] [V7, 21:39][v7-bloat] [V7, 23:16][v7-opus-summary]
- **Prompting Opus to push back:** adding “If you think this is a good idea, do it. Otherwise, suggest something else.” meaningfully improved his results. It still misses things: sometimes its alternative is bad, and once he insists on his plan Opus agrees it was better. [V7, 23:43][v7-prompt-tip] [V7, 24:05][v7-prompt-caveat]
- **OpenAI models on long runs:** they keep working but slowly lose track of reality, and after many compactions their output becomes hard to understand; Opus and Fable stay coherent. [V7, 22:25][v7-sol-coherence] [V7, 22:52][v7-coherence]
- **Fable, the student at the back:** the smartest in the room, lazy, willing to cheat, finds genius shortcuts; it will fail the read-the-whole-test-first exercise that Opus passes. If the model should know everything about the task before it starts, Opus does better. [V7, 25:55][v7-stoner] [V7, 26:42][v7-read-test] [V7, 27:12][v7-lazy]
- **T3 Code long-thread example:** Opus built a thorough repro environment and made real progress on loading very long threads, but missed that an unresolved to-do list kept the whole history in the projection. Fable, asked to verify Opus’s environment and find the edges, spotted it at once; exposing the goal separately cut data over the wire by about 150x in some cases. Fable building the environment in parallel did worse, but fixed the problem. [V7, 27:39][v7-t3-perf] [V7, 28:26][v7-opus-repro] [V7, 29:37][v7-fable-verify] [V7, 30:19][v7-fable-env]
- **Feedback loops:** Opus applies any feedback, good or bad, so an unchecked Sol review can turn a 30-line PR into a thousand-line one; he reworked his sol-loop skill to steer against that. Fable is the only model he has seen that knows when to stop. His published sol-loop asks for the minimal change that satisfies the reviewer, guards against scope creep, and caps the rounds. [V7, 30:41][v7-stop] [V7, 31:06][v7-sol-loop] [tstack sol-loop][tstack-sol-loop]
- **Allan and Brad:** the meticulous long-tenured engineer you call when a risky change must be perfect, versus the very experienced newcomer who glances for the risks that are hard to fix later and says LGTM when you need to ship. Opus is nervous to be wrong and checks hard before answering; Fable answers on intuition. [V7, 31:27][v7-allan-brad] [V7, 32:30][v7-when-to-call] [V7, 34:20][v7-nervous]
- **Provable versus unprovable:** if the work can be verified and hill-climbed, Opus is more than good enough; if no check can say one result is better, Fable finds things Opus never would. Examples: better graphics, a visualizer that does not suck, a clever way to cut infrastructure cost. Fable challenges premises and will discard poor earlier work. [V7, 35:27][v7-provable] [V7, 35:51][v7-provable-split] [V7, 36:15][v7-unprovable] [V7, 36:38][v7-challenge]
- **Use Opus until you want more:** he has rerun Fable prompts on Opus and got the right result. Reach for Fable when Opus is not doing a good enough job, or when its options are too similar; Fable gives a wider variety, some much better and some much worse. His explanation that Opus is a smaller distillation trained to regress to the mean is speculation. [V7, 37:00][v7-opus-first] [V7, 37:24][v7-rerun] [V7, 37:49][v7-regress-mean] [V7, 38:11][v7-variety] [V7, 38:34][v7-options]
- **Fable to ship stuck work:** when work has run in circles with the agent second-guessing itself, Fable is both smarter and more willing to let hypothetical edge cases slide. He asked it to audit unmerged Opus work and say what should actually happen next; it called the work fine, and so far everything it called good to merge was. [V7, 38:55][v7-merge] [V7, 39:14][v7-let-slide] [V7, 39:35][v7-merge-audit] [V7, 40:41][v7-good-to-merge]
- **Review evals revisited:** in his feedback evals Fable underperforms Sonnet and Opus because it lets slightly wrong code through; Sol 6.1, one of the judges, punishes any miss. A deeper audit of Fable’s missed and incorrect comments convinced him the gap does not matter. This revises his V6 reading. [V7, 39:55][v7-review-evals] [V7, 40:17][v7-eval-audit]
- **Switch old threads:** if an old thread has run in circles, switch it to Fable: it may fix what Opus is not smart enough to fix, and if the work is already good enough it will say so. [V7, 41:21][v7-ship] [V7, 41:45][v7-switch]
- **Provider guidance he relays (Addy Osmani, claude.dev):** start most work on Opus 5.5 at Medium; Sonnet for well-scoped work; Haiku for high-volume classification, routing, and extraction, and for search/log/summary subagents; Fable 5.2 for the hardest technical work, when Opus High falls short, or for long unattended runs; past High, test the next model up at lower effort. Theo agrees on effort stepping and disagrees on Haiku side tasks and on needing Fable to orchestrate. Prices and benchmark figures from the post are omitted. [V7, 05:57][v7-addy] [V7, 11:40][v7-fable-when] [V7, 12:04][v7-past-high] [V7, 14:48][v7-addy-table] [Claude model guide][claude-dev-models]

### V8 — Nerd Snipe, Theo and Ben: Astra 6.2 Is A Step Back

**Added on 18 November; V9 is newer.** Theo and Ben discuss Gemini 4 Carbon, Fable 5.2 and the new OpenAI model they call “Astra 6.2”. They recorded before that model’s release, and Codex now lists it as **GPT-6.2 Astra**. Theo’s claims rest on his own evals and T3 Code work; Ben’s on his long build loops, his Among Us benchmark and a robot project. Direct experience unless labelled. Speaker attribution comes from context because the captions carry no names; two independent passes agreed on every attribution used here. Sponsor content is excluded. V8 is a Nerd Snipe episode like the ignored V3, but you supplied it, so it is active.

- **Opus stays the everyday model; Fable is the atomic bomb (Ben):** work with Opus 5.5 most of the time, and bring out Fable 5.2 for the specific things that need its intuition, when you hit a wall and every model keeps producing nonsense. Fable 5.2 complements Opus rather than replacing it. Theo calls Opus 5.5 the greatest code production machine ever made, and would pick the Claude $200 subscription over OpenAI’s even if he could have several. [V8, 21:39][v8-complement] [V8, 42:51][v8-atomic] [V8, 57:21][v8-zdr] [V8, 71:28][v8-greatest]
- **Fable directs, Opus implements (Theo):** across about 20 Fable PRs, Fable repeatedly called work done or safe without running the tests, the checks or the change itself. One preview build opened on a broken chat screen, a first on a project otherwise built almost entirely with Opus. He concludes Fable works best as an orchestrator or reviewer, an oracle that directs Opus to implement and grind the work out. His Cloudflare-bill case fits: Opus proposed spending more on Cloudflare, the new OpenAI model proposed self-hosting, and Fable proposed the right variant, one that keeps latency and bandwidth intact. Opus then implemented it well. [V8, 32:31][v8-fable-daily] [V8, 32:51][v8-cloudflare] [V8, 34:14][v8-unverified] [V8, 34:55][v8-oracle]
- **How Fable works:** Theo compares it to the smartest kid in the class answering from memory instead of checking the dictionary, and getting 75–80% right. He relays from Anthropic employees and testers that it has not much more autonomy than Opus, only more capability at the edges, and that specified tasks gain little from it (the speaker of this second point is uncertain): it feels its way around a problem, while Opus measures thrice and cuts once. It often hits anyway. [V8, 33:54][v8-dictionary] [V8, 35:16][v8-edges] [V8, 35:36][v8-measure]
- **Fable as the loop’s final reviewer:** Ben swapped the reviewer at the end of his build loops from Opus to Fable and saw an instant improvement, with fewer iterations because Fable shows restraint. Theo sees the same in his council and sol-loop skills. Opus bloats the spec unless held back, while Fable stopped a council at 9 of a requested 9.5 because the remaining suggestions were bad, which no other model he has used will do. Ben counters that Astra has overridden its judges a couple of times; Theo says he would not have noticed through its unreadable output. [V8, 36:16][v8-reviewer-swap] [V8, 43:53][v8-restraint] [V8, 44:13][v8-council] [V8, 44:34][v8-astra-override]
- **Fable for the last 10% (Theo):** Fable 5.2 has pushed a bunch of T3 Code work that was stuck at the last 10% over the line, helped by the confidence of a smarter model saying it is fine. This reaffirms V7’s ship-it role. [V8, 43:12][v8-last-ten] [V8, 43:53][v8-restraint]
- **Fable in review evals (Theo):** his own evals (a factual overview of a large codebase; eight PRs seeded with right and wrong changes) show Fable is not the most trustworthy reviewer. It bombs code review, misses important things, has poor recall, and is slow and expensive. Its precision is excellent, though: of its findings, 24 were valid, 1 plausible and 1 wrong, against GPT-6.2 Astra’s 36 findings (24 valid, 12 plausible, none wrong). He likens it to an expert half-listening at the back of a design review: about two-thirds of what it says is correct and often useful, but it lies more. Ben adds that panel-judged evals undercount Fable, because it calls other models’ code fine while Astra lets nothing slide. [V8, 40:01][v8-evals] [V8, 40:22][v8-design-review] [V8, 41:05][v8-eval-set] [V8, 41:46][v8-recall] [V8, 42:07][v8-findings] [V8, 63:55][v8-panel]
- **Fable orchestrating Opus transformed Ben’s game:** his FPS game was mostly built by the new Astra, with Opus 5.5 reviewing and play-testing each run. A loop with Fable orchestrating Opus then produced what Ben calls a night-and-day difference, shown live during the recording. [V8, 31:49][v8-game-loop] [V8, 59:27][v8-game-live] [V8, 60:33][v8-fable-opus]
- **Opus and Fable clean up GPT code:** Theo calls them the best thing to happen to Codex users, because they can clean up what GPT models did to a codebase. One host deleted projects GPT models had built entirely (the passes disagree on which) and rebuilt them with Opus or Fable in a few hours, with much better results. [V8, 36:37][v8-gpt-slop] [V8, 37:18][v8-rebuild]
- **Fable limits and speed:** on the $200 plan Fable may use at most half the weekly points and is subsidised less, so it buys much less work than Opus. Ben is more than one subscription deep and nearly out of Fable. Theo measures Opus 5.5 at about 120 tokens per second, Fable 5 and 5.1 at 70–80, and Fable 5.2 at about 110, and suspects a silent tier swap to a smaller model. Even so, he finds Fable 5.2 on High too slow. Prices stay out. [V8, 01:24][v8-ben-subs] [V8, 23:00][v8-fable-points] [V8, 26:06][v8-burn] [V8, 26:46][v8-speed] [V8, 27:26][v8-tier-swap] [V8, 06:38][v8-fable-slow]
- **GPT-6.2 Astra reviews best (Theo):** in his benches it is “one straight line”, sweeping Sol 6.1 on every measure. It finds the most issues, finds things nothing else finds, and is liked most by the judges, though he notes his judges seem to prefer Astra in general. Theo credits it with the best proposal for cutting T3 Code’s infrastructure bill, though his fuller account has Fable refining its self-hosting idea into the right one. It needs a very clear task, and a better model to translate what it says. Theo knows no use for it other than code review, and even there its findings are as likely to bloat the spec as to help. [V8, 50:49][v8-astra-bench] [V8, 51:10][v8-astra-sweeps] [V8, 51:32][v8-translate] [V8, 57:42][v8-review-only] [V8, 69:04][v8-no-other-use]
- **GPT-6.2 Astra is hard to work with:** its outputs are unreadable, its tool use is often stupid, and it asks the user questions meant for its parent agent or subagents. It does not surface what matters: in Ben’s Among Us benchmark it silently spun up a new agent session for every move until one player hit a 100-session limit, and explained this only after three prompts. Theo says it will be unusable in Codex, because Codex cannot switch to a readable model mid-thread. When it wrote paragraphs of timings on a VPS slowdown, he forked the thread to Opus, which explained the cause in plain English in 11 seconds. He confesses that the dumb “Terra 6.1” in an earlier video was this model. OpenAI says it improved output formatting before release; Ben had not seen the change. [V8, 51:55][v8-questions] [V8, 52:56][v8-surface] [V8, 53:58][v8-handoff] [V8, 55:20][v8-opus-explains] [V8, 56:01][v8-terra] [V8, 56:21][v8-formatting]
- **GPT-6.2 Astra for building:** Ben says OpenAI models need extensive specification and a human in the loop, while Anthropic models reach a described end state on their own. It flooded Theo’s Mac with permission requests until it froze, and Ben has rescued several projects and machines from it. On Theo’s TS Rust fork it made the binary about 40% smaller and the compiler 56% slower. Ben gets equally good 3D, renders and games from Fable with a tenth of the effort, and Theo makes ZDR needs the only exception. Ben still uses it as a workhorse sent off by a smarter orchestrator, keeps it on his game’s review panel next to Fable, and used it to design and source parts for a robot. [V8, 47:02][v8-ben-astra] [V8, 49:47][v8-spec] [V8, 50:29][v8-freeze] [V8, 56:41][v8-tenth] [V8, 57:21][v8-zdr] [V8, 58:24][v8-tsrust] [V8, 62:55][v8-robot] [V8, 66:21][v8-workhorse] [V8, 69:25][v8-human-loop]
- **Check a new reviewer against the last one (Theo):** add the previous model next to the new one on a review panel, as he ran Carbon next to Argon, to see whether the new one adds anything. He tells Ben to put Sol 6.1 next to Astra, and Ben adds Opus to measure what Fable adds as a reviewer. Theo suggests the extra panelists only log their findings, with nothing acting on them, as he does with Gemini “jesters”. [V8, 67:01][v8-last-gen] [V8, 67:42][v8-log-only]
- **Ultrafast:** Ultrafast on GPT-6.2 Astra is slower than Fable’s fast mode, and costs far more for its speed-up. [V8, 68:44][v8-ultrafast]
- **Gemini 4 Carbon (Theo):** too slow to use even if it were good, with a large cache-miss rate and frequent hallucinations. A two-line fix took it 20 minutes, and anyone who daily-drives it got lucky. It has one use. On a T3 Code security report, Fable 5.2 and Opus 5.5 rerouted to Opus 4.8, which failed, and Mythos 5.2 suggested making the product worse, while Carbon gave the best suggestion; Theo still merged Mythos’s code, because Carbon took too long to implement its own. At most a second opinion in a review council, logged rather than followed. Only Google’s $200 tier can use it. [V8, 12:26][v8-carbon-tier] [V8, 67:42][v8-log-only] [V8, 03:29][v8-carbon] [V8, 05:58][v8-carbon-cache] [V8, 06:58][v8-carbon-fix] [V8, 07:58][v8-reroute] [V8, 08:40][v8-carbon-security] [V8, 10:02][v8-carbon-daily] [V8, 11:24][v8-council-tool]
- **Double-check what a model says (Theo):** someone went viral presenting a PR, made on a model’s advice, to cut T3 Code’s RAM use. In Theo’s heavy usage it would have saved about 16 MB during search and made search on long threads four times slower. Knowing to check is still the skill. [V8, 72:28][v8-ram] [V8, 73:30][v8-ram-cost] [V8, 73:51][v8-check]

### V9 — Theo: holy sh*t

**Newest source, added on 20 November.** Theo’s review of **Gemini 4 Neon**, Google’s medium-sized model, after about two days of heavy use, run through Antigravity inside T3 Code. Direct experience unless labelled. Sponsor content is excluded.

- **His new favourite model:** he took extra time because early hype has got him in trouble before, and still calls Neon his favourite, the first real Opus 5.5 competitor, the most pleasant model he has worked with, and one he would pick over GPT-6.2 Astra and everything else OpenAI has out. It hit him instantly, as Fable once did, where Opus impressed him gradually. [V9, 00:53][v9-favorite] [V9, 01:12][v9-competitor] [V9, 04:04][v9-openai] [V9, 04:45][v9-pleasant] [V9, 28:38][v9-instant] [V9, 32:06][v9-new-favorite]
- **Coherence is the new frontier:** most models are smart enough now; coherence is what separates them, and Neon closed that gap. By coherent he means easy to read, on task, understanding him, finishing work, collaborating (including with copies of itself), and not losing track on very long runs. He finds it more coherent than any Anthropic model and comically more so than any OpenAI model. [V9, 05:57][v9-coherency-gap] [V9, 16:19][v9-coherence-def] [V9, 17:01][v9-more-coherent] [V9, 31:21][v9-frontier]
- **More capable for code:** after pushing it hard on code he finds Neon more capable than Opus as well: it solves harder problems more often and writes code he is more likely to merge. He calls it level with Opus for dev work, says “Fable is still Fable”, and calls Neon quite possibly the best model for code right now. He has started landing real T3 Code changes with it. [V9, 15:15][v9-landing] [V9, 15:30][v9-contender] [V9, 17:12][v9-capable] [V9, 30:49][v9-best-code]
- **TS Rust:** with one goal (make it smaller and faster than the official build and its rivals), GPT-6.2 Astra ran for over seven days and made it 46% smaller and 56% slower, then spent four more days and landed nothing, because none of its attempts could type-check apps properly. Opus then made it slightly faster in a few days, and Opus with Fable reached about 20% faster after many more. From the same fork point, Neon with Antigravity’s swarm feature took 10 hours: 47.44 MB down to 7.97 MB, up to 20x faster on warm starts, 1.5x faster overall, 2.3x on the Sentry repo, and whole-suite time down 48.6%. [V9, 17:56][v9-tsrust-astra] [V9, 18:40][v9-tsrust-opus] [V9, 18:54][v9-tsrust] [V9, 19:56][v9-tsrust-days]
- **Diagnosis:** in his VPS disk-speed thread, where Astra had produced pages unrelated to disk speed, Neon named three concrete causes; the largest, a volume formatted for a spinning disk, explained 3.8 s of the 6.3 s gap and was news to Theo after three weeks of using the thread as a test. [V9, 07:49][v9-disk] [V9, 08:08][v9-disk-cause]
- **Readable output:** its replies read naturally, with clear pacing and focus, and say what it did, what it wants and what he must care about. His only copy complaint is a few em dashes, which he has not bothered to prompt away. [V9, 08:43][v9-readable] [V9, 09:40][v9-readme] [V9, 10:11][v9-em-dash]
- **Planning and writing:** brought into a Lakebed source-control plan he was writing with Fable and Astra, Neon’s design was adopted by Astra at once, and Theo moved the thread to Neon. Asked to write the plan as a blog-style HTML page through his plan skill while ignoring the skill’s style guide, Neon was the first model to do it well; Fable makes a nice page but cannot write like a blog post, OpenAI models fixate on the question in the prompt, and nearly every model keeps the skill’s minimal style. Ben, shown the page, found it read too well to feel LLM-written. [V9, 10:39][v9-lakebed] [V9, 11:11][v9-switch] [V9, 20:55][v9-press] [V9, 21:20][v9-plan-prompt] [V9, 22:09][v9-style] [V9, 22:31][v9-plan-page]
- **Loosely bounded tasks:** asked to get Antigravity running on his Windows PC so another thread could use Neon, it worked eight minutes, accepted a mid-run steer, configured and verified the setup in T3 Code, found the waiting thread and messaged it. That thread has gone much better since. Theo would never have trusted an earlier Gemini model with this. [V9, 11:27][v9-setup] [V9, 11:50][v9-setup-done] [V9, 12:37][v9-trust]
- **Working around a broken harness:** asked for a throughput visualisation, it seemed to stop twice; it then worked out that T3 Code’s Antigravity adapter was hiding its rendered HTML, showed screenshots instead, explained the bug, and filed a PR fixing it when asked. [V9, 12:52][v9-viz] [V9, 13:32][v9-viz-diag]
- **The one issue:** asked to use his full-stop and council skills by name, it did not trigger them; he does not know whether Antigravity or the model is at fault. He then added Neon to his council skill and dropped Gemini’s “jester” label. [V9, 14:32][v9-skills] [V9, 15:23][v9-council]
- **Hallucination and review evals (benchmarks):** 10 of its 72 claims in a TS Rust architecture analysis were wrong, slightly behind Fable 5.2 and ahead of Fable 5.1, and half Carbon’s rate; it placed 13th on understanding the architecture yet improved the repo most and fastest. Asked about a repo it does not check what it says, but when implementing it verifies its claims. In his code-review bench at Extra High it found 21 valid and 5 plausible issues with none wrong, slightly slowly. Its aggregate rank rose from Carbon’s 12th to 6th. He has lost faith in these benches and says they do not reflect his experience. [V9, 23:27][v9-hallucinate] [V9, 23:48][v9-bench-faith] [V9, 23:59][v9-13th] [V9, 24:12][v9-verify] [V9, 24:25][v9-review] [V9, 24:48][v9-aggregate]
- **3D:** still weak. His Fish Slop build had broken fonts and details; run on High by accident, then rerun on Extra High, which was better but still behind Opus 5.5 and recent models. He calls 3D a poor guide to day-to-day work. [V9, 25:18][v9-3d] [V9, 25:41][v9-3d-xhigh]
- **Computer use (limited and relayed):** Google says it is very good; his minimal use has gone well, and friends doing browser-use and CUA work call it level with OpenAI or better. He does not know whether it beats OpenAI’s. [V9, 06:27][v9-computer] [V9, 06:36][v9-cua]
- **Harness and speed:** he uses it only in T3 Code and recommends the nightly, since Antigravity fixes ship constantly; the Antigravity app is “kind of garbage” and its CLI slow and fine-ish. Google cut Gemini’s time to first token by over 50%, which he credits to his earlier complaints. [V9, 07:30][v9-ttft] [V9, 30:27][v9-antigravity] [V9, 30:33][v9-t3-only]
- **Provider claims and benchmarks he relays:** Google positions Neon for software engineering, knowledge work and science; it scores 61 on the Artificial Analysis index at Extra High (third overall), second on the Vals index and second on steerability on the Agent Arena index. Theo thinks Google benchmaxes and does not care. [V9, 00:14][v9-bench] [V9, 04:19][v9-announce] [V9, 04:36][v9-steer] [Neon announcement][neon-blog]
- **Where it came from (speculation and relayed):** Theo speculates DeepMind research tried engineering’s feedback on a medium-sized model; friends at DeepMind told him engineers loved it so much they begged to ship it early, and that it was intentionally undersold. Google’s model card says it is adapted from Gemini 4 Carbon. [V9, 27:16][v9-origin] [V9, 28:09][v9-rushed] [Neon model card][neon-card]

### Ben’s earlier reported reaction

V2 reports Ben finding Sol more dependable than Astra’s inconsistent behavior. That remains second-hand historical context; V4 supplies his direct, fuller Sol 6.1 review. V7 and V8 now govern conflicting coding preferences. [V2, 11:59][v2-ben] [V4, 19:31][v4-workhorse]

### Excluded sponsor segments

Your clarification on **2026-10-03** excludes sponsorship from consideration, including earlier videos. These segments contribute no tool, model, harness, or research recommendations: **V1 at 01:32**, **V2 at 01:36**, **V4 from 04:42 to 06:14**, **V5 from 02:16 to 03:40**, **V6 from 01:50 to 03:15**, **V7 from 01:32 to 02:50** (Browserbase and Stagehand), **V8 from 02:07 to 03:29** (General Translation), **18:54 to 20:37** (CodeAF by AgentField) and **44:56 to 47:02** (Paper, including its Sonnet 5.5 demo), and **V9 from 02:10 to 03:01** (WorkOS). Non-sponsored model experience elsewhere in each video remains eligible. [V1][v1-sponsor] [V2][v2-sponsor] [V4][v4-sponsor] [V5][v5-sponsor] [V6][v6-sponsor] [V7][v7-sponsor] [V8][v8-sponsor] [V9][v9-sponsor]

## Source order and what changed

**Your standing order: newest relevant information first, then Ben over Theo when their relevant information is equally current.** Publication time normally determines recency, not the order in which you send links; explicit user source-priority decisions govern. You designated V4 as newest on 3 October; V5, V6, V7 (published 13 November), V8 (17 November) and V9 (20 November) now supply newer coding information. An older Ben video cannot override newer Theo information. Earlier advice remains only where the newer video has not replaced or contradicted it. Apply this rule to relevant claims about the same model/version and task: a later-published recording made before a model existed is not an evaluation of that model. Record known recording context separately from publication time.

V1 and V2 have the same publication date. YouTube metadata supplies these UTC publication timestamps, which make the order clear:

| Source | Video | Published, UTC | Duration | Priority |
| --- | --- | --- | --- | --- |
| **V1** | [OpenAI should be scared of this one](https://www.youtube.com/watch?v=8WbW_n95wc4) | 2026-09-29, **07:31:15** | 31:46 | Earlier |
| **V2** | [OpenAI fights back](https://www.youtube.com/watch?v=vu8X3YroB-w) | 2026-09-29, **17:44:20** | 30:58 | Retained where compatible with newer sources |
| **V3** | [Opus 5.5 & Grok 4.7 Are Exactly Why Post-Training Matters — Nerd Snipe, Theo and Ben](https://www.youtube.com/watch?v=4zMgyhXeGig) | 2026-09-30, **22:02:00** | 2:08:57 | **Ignored at user request, 2026-10-03; excluded from recommendations** |
| **V4** | [So Who Won? — Ben Davis](https://www.youtube.com/watch?v=UUsb_AbMG9w) | 2026-10-02, **23:48:10** | 22:06 | Prior governing source; retain compatible settings and roles |
| **V5** | [finally a good small model — Theo](https://www.youtube.com/watch?v=38_6C0dkKmU) | 2026-10-09, **02:20:47** | 41:10 | Opus builder superseded by V9 (Neon); Sol reviewer superseded by V8 (GPT-6.2 Astra); Haiku support role and Sol investigation superseded by V7 |
| **V6** | [Nobody Is Competing With Anthropic — Theo](https://www.youtube.com/watch?v=yh5IAUow4Hc) | 2026-11-10, **19:38:40** | 48:20 | Fable 5.2 advisor role retained; Sol-investigation reading superseded by V7 |
| **V7** | [I think I figured it out — Theo](https://www.youtube.com/watch?v=XtykeVoSmP8) | 2026-11-13, **02:34:12** | 42:19 | Governing coding, effort and delegation information, except where V8 updates it |
| **V8** | [Astra 6.2 Is A Step Back — Nerd Snipe, Theo and Ben](https://www.youtube.com/watch?v=3nXqsK1xVU8) | 2026-11-17, **22:37:44** | 1:20:46 | Governing reviewer choice and Fable’s role; its Opus-builds route superseded by V9 |
| **V9** | [holy sh*t — Theo](https://www.youtube.com/watch?v=HQlk9RGx2dk) | 2026-11-20, **15:40:19** | 32:29 | **Newest; governing the build model and written plans** |

**V3 status:** ignored at your request on 2026-10-03, rather than queued for future subtitle processing. No recommendations from it are used. Your earlier clarification—that it was recorded before Sol 6.1 was released—is retained solely as source-registration history. The local transcription attempt was stopped and its temporary files removed on 2026-10-01.

**V4 recording context:** its precise recording time has not been verified. It explicitly discusses Sol **6.1**, and its description and on-screen model labels confirm that version. Its auto-caption text sometimes renders names incorrectly; the corrected names used here are supported by those labels. It was the governing source at the 3 October update.

**V6 recording context:** Theo says he filmed it overnight after testing Fable 5.2 from its release that morning, so it reflects about a day of use. Its title/description and captions establish Fable **5.2**, Opus **5.5**, and Sol **6.1**; the captions render Sol as “Soul” and Terra as “Tara”. Publication timestamp comes from YouTube metadata.

**V7 recording context:** Theo says he had used Fable 5.2 for about two days, heavily, and Opus 5.5 far more than any other model; his Fable views may change. Its description and captions establish Opus **5.5**, Fable **5.2**, and Sol **6.1**; the captions render Sol as “Soul”, Fable once as “Babel”, Opus twice as “OBS”, Addy Osmani as “Addiosmani”/“Addi”, and Opus 5.5 once as “5.55”. He calls V6 his “Fable 55 video”, a slip for 5.2. Publication timestamp comes from YouTube metadata. [V7, 20:53][v7-two-days]

**V8 recording context:** recorded before the new OpenAI model’s release; the hosts call it “Astra 6.2” and say the name may change. Codex now lists GPT-6.2 Astra (“most capable”) and GPT-6.2 Sol (“go-to coding”); V8 tests only the former. The captions render Opus as “Obus”, Fable 5.2 as “Fable 52”, Sol as “soul”, the council skill’s judges as “gestures” for “jesters”, and Codex as “codeex”. The two hosts are not labelled in the captions; attribution follows two independent passes that agreed on every claim used. Publication timestamp comes from YouTube metadata.

**V9 recording context:** Theo says he tested Neon for about two days before filming and took extra time to be sure. Google announced Neon on 18 November. The captions render Argon as “Argan”, Opus 5.5 as “Opus 55”, Fable 5.2 as “Fable 52”, GPT-6.2 Astra as “62 Astra”, “Astro” and “Aster”, Antigravity as “anti-gravity”, Extra High as “XI” and “X high”, cache as “cash” and Theo as “Thea”; “56 soul to six Astra era” and “Muse Wonderful Fall” stay uncertain. Publication timestamp comes from YouTube metadata.

**V5 recording context:** exact recording time is unverified. Its title/description and full captions establish Haiku **5.5**, Opus **5.5**, and Sol **6.1**. It incorporates updated benchmark data during the edited review. Publication timestamp comes from YouTube metadata; no earlier recording date is inferred. No effort setting is attributed to an uninspected on-screen session.

| Topic | Earlier advice | Current governing recommendation |
| --- | --- | --- |
| Build model | V2–V8: Opus 5.5 builds. | **Gemini 4 Neon / Extra High builds (V9); Opus 5.5 / High investigates and builds when Neon is unavailable.** Theo finds Neon more capable for code and more coherent, and it beat every model on TS Rust. [V9, 17:12][v9-capable] [V9, 18:54][v9-tsrust] [V9, 24:12][v9-verify] |
| Written plans and proposals | No earlier recommendation. | **Gemini 4 Neon / High (suggested level)**, the first model to write Theo’s plan as a real blog post. [V9, 22:31][v9-plan-page] |
| General daily coding/default setup | V2: Opus builder; V4: Sol/Codex first; V5/V6: Opus builder + Sol audit + Haiku support. | **V9: Neon builds (row above).** Otherwise **V7: Opus 5.5 / High for checkable work, Fable 5.2 / High for unprovable work and stuck runs (V8: directing Opus), GPT-6.2 Astra / High (V8) for cross-family review.** Any other coding model needs a very specific reason. [V7, 01:09][v7-only-two] [V7, 35:27][v7-provable] [V7, 31:06][v7-sol-loop] |
| Opus thinking level | Earlier guide inferred Medium/High; V4: Ben’s Extra High. | **High**, Theo’s explicit everyday setting. Medium for bounded lookups (suggested); Extra High for check-heavy work; never Low or Max. [V7, 07:48][v7-high] [V7, 13:10][v7-xhigh] |
| Investigation assistant | V1: Sonnet; V2–V6: Sol 6.1. | **Opus 5.5 / High investigates; Fable 5.2 verifies a stuck investigation.** [V7, 14:25][v7-opus-checks] [V7, 29:37][v7-fable-verify] |
| Review assistant | V2–V7: Sol 6.1, steered so its findings do not grow the change. | **GPT-6.2 Astra / High (suggested level) is the cross-family reviewer**, for PRs Claude or Gemini models open: it sweeps Sol 6.1 in Theo’s evals. Ask for plain-English findings and keep steering against scope growth. [V8, 50:49][v8-astra-bench] [V8, 57:42][v8-review-only] [V7, 30:41][v7-stop] |
| Small Anthropic worker | V1: Haiku 5.5 upcoming; V5: Haiku for bounded evidence, classification, and candidates. | **Haiku 5.5 / Medium only for bulk analysis**; side tasks go to Opus 5.5 / Medium (suggested); Haiku does not write code. [V7, 11:18][v7-haiku] [V7, 11:40][v7-haiku-code] |
| Anthropic-only lineup | Sonnet retained as fallback; V5: Opus + Haiku. | **Opus + Fable**, with Haiku for bulk analysis. Do not pick Sonnet in the model picker. [V7, 10:58][v7-sonnet-picker] |
| Haiku thinking level | No earlier recommendation. | **Medium with reasoning enabled is a suggested start.** V5 supplies no exact task level; simple validated Low is permitted by official docs, not banned by V1’s older Low caution. [V5, 10:20][v5-no-reasoning] [Haiku prompting][haiku-prompting] |
| Refactoring, long ports, and ambiguous implementation | V2: Opus succeeds where Sol gets stuck; V4: Opus Extra High. | **Gemini 4 Neon / Extra High (V9); Opus 5.5 / High when Neon is unavailable**, Extra High for hairy work. V9’s TS Rust run; V7 adds huge migrations with many subagents. [V9, 18:54][v9-tsrust] [V7, 15:55][v7-migrations] [V4, 10:35][v4-refactor] |
| General design collaborator | V1: Fable for attractive marketing pages; V4–V6: Opus Extra High, Fable as optional comparison. | **Fable 5.2 / High builds the visual direction with the design skill on; the builder (Neon; Opus when Neon is unavailable) builds around it** and handles precise instructions. [V7, 36:15][v7-unprovable] [V6, 32:54][v6-slop] [V1, 20:12][v1-design] |
| Routine versus heavy computer use | V2: Sol routine default; Astra’s exceptional peaks acknowledged. | **GPT-6.2 Sol for routine work; GPT-6.2 Astra for heavy computer use**, moved from Sol 6.1 and GPT-6 Astra by your decision on 18 November. Ben explicitly retains the Astra specialist role. [V4, 11:45][v4-astra] |
| Very fast execution | V2: future speed improvements anticipated. | **Astra Ultrafast is demonstrated in Ben’s usage, but rarely recommended for normal work.** Sol 6.1 Ultrafast remains a recording-time roadmap claim. [V4, 16:25][v4-ultrafast] [V4, 16:39][v4-roadmap] |
| Advisor for stuck runs and hard problems | V6: Fable 5.2 / High when two attempts fail or a run circles one decision. | **Fable 5.2 / High**, also when work keeps circling before it ships: it audits and says what actually remains and directs the builder to implement (V8; Neon since V9); any fix it makes itself gets its checks run (V7: switch the stuck thread to Fable); larger builds go back to the original model. [V8, 34:55][v8-oracle] [V8, 34:14][v8-unverified] [V6, 36:43][v6-mcp] [V7, 39:35][v7-merge-audit] [V7, 41:21][v7-ship] |
| Fable version and effort | V1: Fable 5.1 / High for attractive marketing pages. | **Fable 5.2**: High by default, Extra High for the hardest problems, never Max. Fable 5.2 replaces 5.1 and needs the design skill for visual work. [V6, 12:10][v6-max] [V7, 08:17][v7-max] [V6, 32:54][v6-slop] |
| Fable’s role beside the builder | V7: Fable may make the fix itself; Opus builds the check-heavy parts. | **Fable directs, the builder implements (Opus in V8, Neon since V9); Fable’s own changes get their checks run** (Theo, about 20 unverified PRs). Ben: Opus most of the time, Fable as the atomic bomb. [V8, 34:14][v8-unverified] [V8, 34:55][v8-oracle] [V8, 42:51][v8-atomic] |
| Choosing between the builder and Fable | V6: Opus daily driver, Fable for hard problems. | **Provable versus unprovable; use the builder (Neon since V9; Opus when Neon is unavailable) until you want more from it.** Speed no longer separates them. [V7, 35:27][v7-provable] [V7, 37:00][v7-opus-first] [V7, 19:12][v7-speed] |
| Sponsored recommendations | Earlier guide retained them separately. | **Excluded from consideration and skill guidance** by user clarification, 2026-10-03. |

V2’s benchmark evidence has limits: Theo says some runs were misconfigured, Medium was initially missing, Max was incomplete with some results filled from Extra High, and some hardware-dependent tasks were excluded. Keep those observations subordinate to his practical experience and demonstrated results; they do not prove that one model or effort level always wins. [V2, 03:38][v2-bench-effort] [V2, 08:46][v2-terminal]

Official documentation in this guide verifies settings and terminology. It is kept separate from the video-based preferences and does not silently replace them with a provider's model ranking.

## Updating this guide with more videos

1. Read the new video's transcript and verify its publication date/time.
2. Add it to the source table, preserving publication order even when an older video arrives later.
3. Extract the creator's hands-on model/task recommendations, demonstrated outcomes, and any explicitly recommended thinking levels, with timestamps. Record whether a claim comes from direct experience, someone else's reported opinion, a benchmark, or an inference.
4. For conflicts, apply **newest relevant information first, then Ben over Theo when equally current**. A newly supplied older Ben video must never undo newer Theo advice. Respect explicit user source-priority decisions and ignored-video exclusions.
5. Preserve useful older recommendations only when they remain compatible. Record replacements in the change table.
6. Prioritize Theo's and Ben Davis's experience over benchmark intelligence rankings. Keep inferred starting settings visibly separate from explicit video claims, and keep price information outside this guide.
7. Record known recording context and distinguish exact model versions before deciding whether later-published advice supersedes an earlier recommendation.
8. Preserve all non-sponsored model, thinking-level, task, and workflow recommendations. Put coding, planning, technical research, websites, UI, frontend interactions, and animations first in the practical chooser; do not filter out the other recommendations. Mark gaps rather than inventing an experience-based recommendation.
9. Exclude sponsor-segment endorsements, demonstrations, and claims from consideration. Record only the exclusion if useful for source coverage.
10. If a supplied source lacks YouTube subtitles, report that gap; wait for subtitles unless the user authorizes another transcription method. An ignored video stays excluded until the user explicitly reactivates it.
11. Carry only the resulting rules into the `ai-workflow` skill, each with a short reason. Keep creator names, videos, evals and anecdotes out of the skill, because it is used out of context; the evidence stays in this guide.
12. On every update, name the newest released version of each model in the skill and in this guide’s current recommendations: Sol, Astra, Opus, Fable, Haiku, Sonnet, Neon and any other named model. A newer version with the same name replaces the older one even when no video tests it; versions never jump across names (Sol never becomes Astra). Historical source notes keep the version each source discussed. Check the current versions in `orchestrator_capabilities`, `~/.codex/models_cache.json` and Anthropic’s model list.

Initial entry: **2026-09-29 — V1 and V2 incorporated; V2 governs conflicting recommendations.**

Preference update: **2026-09-29 — coding given priority; Theo and Ben Davis's hands-on experience ranked above intelligence benchmarks; planning and frontend/animation workflows added, with inferred recommendations labelled.**

Coverage clarification: **2026-09-29 — priority affects presentation, not retention; broader recommendations and superseded source advice kept alongside the current chooser.**

Source registration: **2026-10-01 — V3 registered with publication metadata and the user's pre-Sol-6.1 recording clarification; processing deferred at the user's request until YouTube subtitles are available. No V3 recommendations incorporated.**

Source and preference update: **2026-10-03 — V4 fully incorporated; newest relevant information first, then Ben over Theo; Sol 6.1 general default and Opus Extra High specialist workflow. V3 ignored. Sponsor segments excluded from current recommendations, including V1/V2.**

Scope clarification: **2026-10-03 — general questions and non-coding starting settings added as practical extensions, with their evidence limits explicit. The skill also covers general model selection and model choices for subagents and research; the portfolio keeps its development-focused summary.**

Source update: **2026-10-09 — V5 fully incorporated. Newer Theo coding advice supersedes V4’s Sol-first coding default: Opus builds, Sol audits, Haiku handles bounded supporting work. Opus Extra High remains Ben’s compatible explicit setting; Haiku/Sol levels are suggested. Provider/community examples and failed trials are retained with attribution. V5 sponsorship excluded. Portfolio content is a separate snapshot and was not edited in this video update.**

Source update: **2026-11-11 — V6 incorporated. Fable 5.2 / High joins as a read-only advisor for stuck runs and hard, open-ended problems; never Max. The V5 coding trio stands, and V6’s analysis eval reaffirms Sol for investigation and review. Fable 5.2 replaces 5.1 in the optional visual comparison. V6 sponsorship excluded. The ai-workflow skill, the user-wide AGENTS.md, and the portfolio’s AI table gained the advisor row.**

Source update: **2026-11-14 — V7 incorporated. Real-world coding uses Opus 5.5 and Fable 5.2: Opus 5.5 / High (Theo’s explicit setting, superseding Ben’s Extra High default) investigates, leads, orchestrates, and builds; Extra High for check-heavy work; Medium for bounded lookups (suggested). Fable 5.2 / High takes unprovable work (taste, visual direction, novel options) and advises when a run is stuck or work keeps circling before it ships. Sol 6.1 / High stays the cross-family reviewer, steered against scope growth per Theo’s sol-loop. Haiku 5.5 is limited to bulk analysis and does not write code; Sonnet leaves the picker. Computer-use rows unchanged. Addy Osmani’s claude.dev guide recorded as provider guidance. The linked cost-per-task charts rendered no readable data and prices stay out. V7 sponsorship excluded.**

Source update: **2026-11-18 — V8 incorporated. GPT-6.2 Astra / High (suggested level) replaces Sol 6.1 as the cross-family reviewer on Theo’s evals, with plain-English findings and Opus restating unreadable reports. Fable 5.2 becomes the oracle that directs Opus, and any change it makes itself gets its checks run, after Theo found it calling PRs done untested. Ben’s “Opus most of the time, Fable as the atomic bomb” and Fable’s restraint as a final loop reviewer recorded. Gemini 4 Carbon recorded as a logged second opinion only. GPT-6.2 Sol is untested by any video. Computer-use rows unchanged. V8 sponsorship excluded. The ai-workflow skill and the user-wide AGENTS.md follow; the portfolio’s review row still names Sol 6.1.**

Preference update: **2026-11-18 — standing rule: every update names the newest version of each model (step 12). GPT-6.2 Sol replaces GPT-6.1 Sol in all current recommendations, including general questions, Blender assets, visualizations and explanations. The guide now lives in the rstack repository as `docs/model-guide.md`.**

Preference update: **2026-11-18 — at your request, computer use moves to the current OpenAI models: GPT-6.2 Sol for routine tasks, GPT-6.2 Astra for heavy ones. No video tests either for computer use. The skill pins model versions and falls back to the newest same-family model when a pinned one is missing or rejected.**

Source update: **2026-11-20 — V9 incorporated. Gemini 4 Neon / Extra High (suggested) becomes the builder, and Neon / High (suggested) writes plans and proposals for people; Opus 5.5 / High keeps investigation, because Neon states claims about a codebase unchecked, and builds whenever Neon is unavailable. Fable 5.2, GPT-6.2 Astra, Haiku and the computer-use rows are unchanged; Astra also reviews PRs Neon opens. T3 Code’s Antigravity provider now lists Neon (`gemini-4-neon`, option `thought_level`), with Opus as fallback when Neon cannot be reached. V9 sponsorship excluded. The ai-workflow skill and the portfolio’s AI table follow.**

[v1-opening]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=0s
[v1-sponsor]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=92s
[v1-old-models]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=213s
[v1-office]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=264s
[v1-haiku]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=306s
[v1-writing]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=417s
[v1-efficiency]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=465s
[v1-max]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=685s
[v1-sol6]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=900s
[v1-effort]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=984s
[v1-speed]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1050s
[v1-design-demo]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1134s
[v1-design]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1212s
[v1-main-choice]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1264s
[v1-sonnet-role]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1304s
[v1-astra-analysis]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1348s
[v1-sonnet-research]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1453s
[v1-game]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1624s
[v1-delegation]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1802s
[v1-office-inference]: https://www.youtube.com/watch?v=8WbW_n95wc4&t=1854s
[v2-opening]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=4s
[v2-sponsor]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=96s
[v2-bench-effort]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=218s
[v2-terminal]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=526s
[v2-peaks]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=670s
[v2-computer]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=682s
[v2-ben]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=719s
[v2-computer-default]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=755s
[v2-audits]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=788s
[v2-audit-results]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=804s
[v2-improvements]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=844s
[v2-model-assessment]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=941s
[v2-rewrites]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=951s
[v2-astra]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1001s
[v2-scoped]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1108s
[v2-low]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1267s
[v2-investigate]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1294s
[v2-router]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1173s
[v2-game-ui]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1338s
[v2-ui]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1474s
[v2-blender]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1499s
[v2-game-handoff]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1531s
[v2-future]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1538s
[v2-testing-scope]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1566s
[v2-regressions]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1583s
[v2-tandem]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1671s
[v2-cleanup]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1726s
[v2-sonnet]: https://www.youtube.com/watch?v=vu8X3YroB-w&t=1766s
[sol-docs]: https://developers.openai.com/api/docs/models/gpt-6.1-sol
[effort-docs]: https://platform.claude.com/docs/en/build-with-claude/effort
[thinking-docs]: https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost
[fable-docs]: https://platform.claude.com/docs/en/models/fable-5-1/overview
[sonnet-docs]: https://www.anthropic.com/claude-sonnet-5-5
[web-docs]: https://developers.openai.com/api/docs/guides/tools-web-search
[research-docs]: https://developers.openai.com/api/docs/guides/deep-research
[v4-opening]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=0s
[v4-version]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=46s
[v4-benchmarks]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=104s
[v4-sol]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=133s
[v4-opus]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=151s
[v4-game]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=191s
[v4-opus-limits]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=239s
[v4-sponsor]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=282s
[v4-selection]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=374s
[v4-communication]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=412s
[v4-sol-communication]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=505s
[v4-intent]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=548s
[v4-gpt-choices]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=577s
[v4-game-intent]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=612s
[v4-refactor]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=635s
[v4-complexity]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=662s
[v4-astra]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=705s
[v4-visualize]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=781s
[v4-capability]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=813s
[v4-efficiency]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=849s
[v4-accounting]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=917s
[v4-ultrafast]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=985s
[v4-roadmap]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=999s
[v4-effort]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1047s
[v4-limits]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1061s
[v4-harness]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1093s
[v4-portability]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1119s
[v4-workhorse]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1171s
[v4-default]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1190s
[v4-telemetry]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1212s
[v4-competition]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1263s
[v4-final]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=1310s
[siwc-docs]: https://developers.openai.com/siwc
[ultrafast-docs]: https://developers.openai.com/api/docs/guides/ultrafast-mode
[v4-medium-visible]: https://www.youtube.com/watch?v=UUsb_AbMG9w&t=835s
[v5-old-haiku]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=16s
[v5-sponsor]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=136s
[v5-provider]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=240s
[v5-context]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=398s
[v5-compaction]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=509s
[v5-computer]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=584s
[v5-no-reasoning]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=620s
[v5-classification]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=669s
[v5-speed]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=689s
[v5-benchmark-limits]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=798s
[v5-max]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=904s
[v5-value-lineup]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1025s
[v5-mimo]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1040s
[v5-cache-update]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1157s
[v5-access]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1184s
[v5-sdk]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1269s
[v5-subagents]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1320s
[v5-egg-demo]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1341s
[v5-attempts]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1405s
[v5-delegation-change]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1440s
[v5-video]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1464s
[v5-design]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1524s
[v5-design-limits]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1627s
[v5-pr-trial]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1659s
[v5-game]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1699s
[v5-game-context]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1810s
[v5-audit-failure]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1842s
[v5-coding]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1891s
[v5-candidates]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=1978s
[v5-research]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2000s
[v5-rate-limit]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2028s
[v5-orchestration]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2105s
[v5-lead-choice]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2167s
[v5-anthropic-pairing]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2251s
[v5-audit]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2308s
[v5-final-pairing]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2347s
[v5-final-chart]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2400s
[v5-small-verdict]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2414s
[v5-future]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2426s
[v5-ecosystem]: https://www.youtube.com/watch?v=38_6C0dkKmU&t=2455s
[haiku-overview]: https://platform.claude.com/docs/en/models/haiku-5-5/overview
[haiku-prompting]: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5
[haiku-migration]: https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide
[jev-docs]: https://typesafe.ai/blog/introducing-system-one-models-and-jev
[mimo-docs]: https://mimo.mi.com/docs/en-US/news/latest/v2-6
[v6-sponsor]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=110s
[v6-mythos]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=266s
[v6-fast-mode]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=351s
[v6-when-to-use]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=412s
[v6-anthropic-guidance]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=422s
[v6-advisor]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=433s
[v6-daily-driver]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=463s
[v6-evals]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=586s
[v6-wise-owl]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=617s
[v6-xhigh]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=689s
[v6-max-intro]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=714s
[v6-max]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=730s
[v6-cad]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=786s
[v6-analysis-leaps]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1049s
[v6-timeline]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1060s
[v6-zdr]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1069s
[v6-analysis]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1212s
[v6-t3-analysis]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1247s
[v6-review]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1272s
[v6-ready]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1298s
[v6-nitpicks]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1306s
[v6-redesign]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1358s
[v6-subscription]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1394s
[v6-limit]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1421s
[v6-speed]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1698s
[v6-design-skill]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1941s
[v6-slop]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=1974s
[v6-in-loop]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2007s
[v6-spiral]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2036s
[v6-eyebrow]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2052s
[v6-agents-md]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2062s
[v6-prose]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2068s
[v6-terra]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2130s
[v6-mcp]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2203s
[v6-pushback]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2281s
[v6-safe-mode]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2302s
[v6-autonomy]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2326s
[v6-opus-audit]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2392s
[v6-diagram]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2456s
[v6-combination]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2646s
[v6-coherent]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2729s
[v6-verdict]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2802s
[v6-future]: https://www.youtube.com/watch?v=yh5IAUow4Hc&t=2808s
[v7-opening]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=43s
[v7-only-two]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=69s
[v7-sponsor]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=92s
[v7-subscription]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=170s
[v7-sub-chart]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=216s
[v7-opus-medium-sol]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=293s
[v7-two-matter]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=314s
[v7-nuance]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=332s
[v7-addy]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=357s
[v7-fable-misses]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=416s
[v7-opus-effort]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=444s
[v7-high]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=468s
[v7-max]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=497s
[v7-overthinking]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=520s
[v7-high-balance]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=540s
[v7-medium-bolder]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=561s
[v7-sonnet]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=583s
[v7-sonnet-spec]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=605s
[v7-sonnet-picker]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=658s
[v7-haiku]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=678s
[v7-fable-when]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=700s
[v7-haiku-code]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=700s
[v7-past-high]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=724s
[v7-xhigh]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=790s
[v7-logs]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=814s
[v7-stones]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=839s
[v7-opus-checks]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=865s
[v7-addy-table]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=888s
[v7-orchestration]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=933s
[v7-migrations]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=955s
[v7-api-cost]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=977s
[v7-fable-limit]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1001s
[v7-speed-opus]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1095s
[v7-speed]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1152s
[v7-not-relevant]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1207s
[v7-fable51]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1230s
[v7-two-days]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1253s
[v7-teachers-pet]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1274s
[v7-bloat]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1299s
[v7-sol-coherence]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1345s
[v7-coherence]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1372s
[v7-opus-summary]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1396s
[v7-prompt-tip]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1423s
[v7-prompt-caveat]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1445s
[v7-stoner]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1555s
[v7-read-test]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1602s
[v7-lazy]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1632s
[v7-t3-perf]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1659s
[v7-opus-repro]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1706s
[v7-fable-verify]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1777s
[v7-fable-env]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1819s
[v7-stop]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1841s
[v7-sol-loop]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1866s
[v7-allan-brad]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1887s
[v7-when-to-call]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=1950s
[v7-nervous]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2060s
[v7-provable]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2127s
[v7-provable-split]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2151s
[v7-unprovable]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2175s
[v7-challenge]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2198s
[v7-opus-first]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2220s
[v7-rerun]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2244s
[v7-regress-mean]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2269s
[v7-variety]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2291s
[v7-options]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2314s
[v7-merge]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2335s
[v7-let-slide]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2354s
[v7-merge-audit]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2375s
[v7-review-evals]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2395s
[v7-eval-audit]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2417s
[v7-good-to-merge]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2441s
[v7-ship]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2481s
[v7-switch]: https://www.youtube.com/watch?v=XtykeVoSmP8&t=2505s
[v8-atomic]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2571s
[v8-unverified]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2054s
[v8-oracle]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2095s
[v8-astra-bench]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3049s
[v8-last-ten]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2592s
[v8-cloudflare]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1971s
[v8-fable-opus]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3633s
[v8-translate]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3092s
[v8-review-only]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3462s
[v8-reviewer-swap]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2176s
[v8-recall]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2506s
[v8-restraint]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2633s
[v8-speed]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1606s
[v8-fable-slow]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=398s
[v8-questions]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3115s
[v8-surface]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3176s
[v8-workhorse]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3981s
[v8-last-gen]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4021s
[v8-carbon-fix]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=418s
[v8-carbon-security]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=520s
[v8-council-tool]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=684s
[v8-complement]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1299s
[v8-zdr]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3441s
[v8-greatest]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4288s
[v8-fable-daily]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1951s
[v8-dictionary]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2034s
[v8-edges]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2116s
[v8-measure]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2136s
[v8-council]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2653s
[v8-astra-override]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2674s
[v8-evals]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2401s
[v8-design-review]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2422s
[v8-eval-set]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2465s
[v8-findings]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2527s
[v8-panel]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3835s
[v8-game-loop]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1909s
[v8-game-live]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3567s
[v8-gpt-slop]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2197s
[v8-rebuild]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2238s
[v8-ben-subs]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=84s
[v8-fable-points]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1380s
[v8-burn]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1566s
[v8-tier-swap]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=1646s
[v8-astra-sweeps]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3070s
[v8-no-other-use]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4144s
[v8-handoff]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3238s
[v8-opus-explains]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3320s
[v8-terra]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3361s
[v8-formatting]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3381s
[v8-ben-astra]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2822s
[v8-spec]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=2987s
[v8-freeze]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3029s
[v8-tenth]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3401s
[v8-tsrust]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3504s
[v8-robot]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=3775s
[v8-human-loop]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4165s
[v8-log-only]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4062s
[v8-ultrafast]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4124s
[v8-carbon-tier]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=746s
[v8-carbon]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=209s
[v8-carbon-cache]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=358s
[v8-reroute]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=478s
[v8-carbon-daily]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=602s
[v8-ram]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4348s
[v8-ram-cost]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4410s
[v8-check]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=4431s
[v8-sponsor]: https://www.youtube.com/watch?v=3nXqsK1xVU8&t=127s
[v9-bench]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=14s
[v9-favorite]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=53s
[v9-competitor]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=72s
[v9-sponsor]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=130s
[v9-openai]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=244s
[v9-announce]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=259s
[v9-steer]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=276s
[v9-pleasant]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=285s
[v9-coherency-gap]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=357s
[v9-computer]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=387s
[v9-cua]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=396s
[v9-ttft]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=450s
[v9-disk]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=469s
[v9-disk-cause]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=488s
[v9-readable]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=523s
[v9-readme]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=580s
[v9-em-dash]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=611s
[v9-t3]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=618s
[v9-lakebed]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=639s
[v9-switch]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=671s
[v9-setup]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=687s
[v9-setup-done]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=710s
[v9-trust]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=757s
[v9-viz]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=772s
[v9-viz-diag]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=812s
[v9-skills]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=872s
[v9-landing]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=915s
[v9-council]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=923s
[v9-contender]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=930s
[v9-coherence-def]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=979s
[v9-more-coherent]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1021s
[v9-capable]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1032s
[v9-tsrust-astra]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1076s
[v9-tsrust-opus]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1120s
[v9-tsrust]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1134s
[v9-tsrust-days]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1196s
[v9-press]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1255s
[v9-plan-prompt]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1280s
[v9-style]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1329s
[v9-plan-page]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1351s
[v9-hallucinate]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1407s
[v9-bench-faith]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1428s
[v9-13th]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1439s
[v9-verify]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1452s
[v9-review]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1465s
[v9-aggregate]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1488s
[v9-3d]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1518s
[v9-3d-xhigh]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1541s
[v9-origin]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1636s
[v9-rushed]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1689s
[v9-instant]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1718s
[v9-antigravity]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1827s
[v9-t3-only]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1833s
[v9-best-code]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1849s
[v9-frontier]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1881s
[v9-new-favorite]: https://www.youtube.com/watch?v=HQlk9RGx2dk&t=1926s
[neon-blog]: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/
[neon-levels]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-4-neon
[neon-antigravity]: https://antigravity.google/blog/gemini-4-neon-in-google-antigravity/
[neon-api]: https://aistudio.google.com/docs/models/gemini-4-neon
[neon-card]: https://deepmind.google/models/model-cards/gemini-4-neon/
[claude-dev-models]: https://claude.dev/blog/which-claude-model-should-you-build-with/
[tstack-sol-loop]: https://github.com/t3dotgg/tstack/blob/main/skills/sol-loop/SKILL.md
