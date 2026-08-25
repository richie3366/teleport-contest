# Review: application of the agreed density / token-efficiency strategy

**Status:** review of an **uncommitted working tree**. Not a merge
approval. **Date:** 2026-08-25.
**Reviewer:** Claude Opus 5, at operator request.
**Subject:** Grok's implementation of *Agreed strategy (rounds 0–4)* +
Claude D1–D3, from
`docs/proposals/2026-08-25-iteration-density-token-efficiency.md`.
**Scope:** 24 modified files, 3 new scripts, +3,461 / −161 lines.

**Verdict: ACCEPT-WITH-DEBT, blocked on B1 and B2.**

The mechanical work is good and the risky parts were done carefully —
the reflow is lossless, the caps are right, `wield.js` correctly uses the
late-bind seam, and `finish-iteration.mjs` honourably refuses to invent
D-ids. Two defects must be fixed before commit: a **behaviour change
this commit introduced and did not notice**, and a **factually false
constraint now written into three durable docs, one of them the
don't-recheck list**. Both were provable in minutes, and one of them is
reported by Grok's own new tool.

---

## 0. What I verified as good (so the criticism below is calibrated)

| Check | Result |
|-------|--------|
| Green gate (seed8000 + seed0900) | **PASS** 2/2 |
| Full public suite | **44/44 PASS** |
| `node --check` on all 11 touched JS modules | clean |
| Rule #2 (`fs`/`path`/`url`/`node:*` in touched `js/`) | clean |
| Dangling imports introduced by the clone deletions | **none** (`trap.js`'s 3 unused imports are pre-existing at HEAD) |
| Body-part constants vs C `hack.h:129–150` | exact match, ARM=0 … STOMACH=18 |
| `HUMANOID_PARTS` vs C `polyself.c:1975–1979` | exact match, element-for-element |
| Caps 600/10 in `agent-port-loop.sh` + `AGENT-PORT-LOOP.md` | consistent |
| Callee-closure checklist in review prompt | present, faithful to C5 |
| `wield.js` via `objnam.js` late-bind, not a new import | **correct** (D1.1 honoured) |
| Three aliases named as map omission + queued | **correct** (D1 honoured) |
| `finish-iteration.mjs` stays mechanical | **correct** (G2.4 honoured) |
| `check-hot-docs` map rows **report-only** | **correct call** — see §4 |

The reflow deserves specific credit. I did not trust the script's own
`verify()` (see N3) and checked independently: I re-parsed all **59**
original table rows (38 `turns.md`, 21 `data.md`) and confirmed **every
C cell, JS cell, and evidence cell survives** whitespace-normalised in
the new files. `turns.md` max line **11,443 → 100**; `data.md`
**14,830 → 100**. **Zero content loss.** That was the highest
data-risk item in the package and it was executed correctly.

---

## B1 — BLOCKING: `js/trap.js:2786` silently rewires steed body parts to the hero

`trap.js` keeps a **local `mbodypart` clone that ignores its `mon`
argument**:

```js
/** C ref: mondata.c mbodypart — FOOT→"foot"; full poly table deferred. */
function mbodypart(_mon, part) {
    return body_part(part);
}
```

It has exactly one caller, `js/trap.js:2828`:

```js
`…bear trap closes on ${s_suffix(mon_nam(u.usteed))} ${mbodypart(u.usteed, FOOT)}!`
```

**This commit changed what that resolves to.** `body_part` used to be
`trap.js`'s own local clone (`FOOT → 'foot'`). It is now the imported
`polyself.js` export, which is `mbodypart(game.youmonst, part)` — **the
hero's** part.

| | Output for a pony steed in a bear trap |
|--|--|
| **C** (`mbodypart(u.usteed, FOOT)`, horse) | `HORSE_PARTS[5]` = **"rear hoof"** |
| **Before this commit** | "foot" — wrong, but stable |
| **After this commit** | **the hero's** FOOT part. Human → "foot"; polymorphed hero → "rear paw", "pseudopod extremity", … |

So the message becomes *"…closes on your pony's pseudopod extremity!"*
The bug is now **coupled to hero polymorph state**, which is strictly
worse than the fixed-wrong it replaced, and it is invisible to the
public suite (hence 44/44 still passing).

This is the exact failure class the whole exercise targets, and the fix
is one line: `polyself.js:278` **already exports the real
`mbodypart`**, `trap.js` **already imports from `polyself.js`**, so
adding `mbodypart` to the existing import and deleting lines 2785–2788
is a zero-new-edge change that makes C-correct "rear hoof" appear.

**The most uncomfortable part:** Grok's own new tool reports this. Run
against Grok's own commit:

```
$ node scripts/sym.mjs mbodypart
mbodypart        js/polyself.js:278   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/trap.js:2786
```

`sym.mjs` works. It was not run on the commit that introduced it. That
is a process finding as much as a code one: **Tier 1 tooling must be
run against Tier 3 commits**, and the review prompt's new callee-closure
block should say so explicitly.

---

## B2 — BLOCKING: the `zap → polyself` cycle does not exist, and the false claim is now in three durable docs

Three documents now instruct future agents not to do something that is
both possible and correct:

| Location | Text |
|----------|------|
| `docs/c-js-map/turns.md` | "`body_part_zap` (`zap.js`; zap↔polyself cycle)… do not import `polyself.js`" |
| `docs/LOOP-QUEUE.md` | "`body_part_zap` (zap.js late-bind; zap↔polyself cycle)" |
| **`docs/NOTES.md` don't-recheck** | "Do not import `wield.js`→`polyself.js` or **`zap.js`→`polyself.js`** for `body_part`" |

**`js/zap.js:288` already contains:**

```js
import { rehumanize, polymon } from './polyself.js';
```

The edge exists and is in active use. Adding `body_part` to that
statement creates **no new edge whatsoever** — it is strictly less
invasive than what this same commit did to `detect.js`, `priest.js`
and `sit.js`, each of which got a genuinely **new** import edge.

The in-code comment states the concern more precisely as a *transitive*
`zap→polyself→do→zap` cycle. That does not rescue the claim: I computed
the module graph, and `polyself.js` transitively reaches **every** file
in this change set — `zap.js`, `trap.js`, `mcastu.js`, `pickup.js`,
`wield.js`. Grok converted `trap.js` (transitive cycle) while refusing
`zap.js` (transitive cycle) **on cycle grounds**. The reasoning is not
applied consistently, and only `wield.js` has a *direct* cycle
(`polyself.js:20 → wield.js`) — which is precisely why D1.1 singled it
out for the seam.

**I proved it empirically rather than arguing it.** I added `body_part`
to zap.js's existing import, deleted the local `body_part_zap`,
repointed its three call sites, and ran the gates:

```
node --check js/zap.js          → OK
green gate                      → 2/2 PASS
full public suite               → 44/44 PASS
```

Then restored `js/zap.js` to HEAD, so the tree I am reviewing is
unchanged.

**Why this is blocking rather than a nit.** A wrong fact in
`NOTES.md` **don't-recheck** is the highest-authority "stop thinking
about this" surface in the repo. It will durably prevent a correct,
trivial, zero-risk fix, and it is self-contradicted by line 288 of the
file it describes. Ordinary map debt is fine; **debt justified by a
false technical constraint is not** — it converts a one-line task into
a permanent named omission.

Deferring `body_part_zap` is a perfectly reasonable scope decision. It
should be recorded as *"deferred for scope"*, not *"blocked by a cycle."*
`mcastu.js` and `pickup.js` are fine to defer on scope; note that
`mcastu.js`'s `body_part_head` partially reimplements `FUNGUS_PARTS`
`'cap area'` / `JELLY_PARTS` `'cerebral area'`, both of which
`polyself.js` already carries correctly.

---

## M1 — `sym.mjs` is blind to `js/generated/`, and the prompt removed the fallback

`scripts/sym.mjs` uses `readdirSync(jsDir)` **non-recursively**. `js/`
has one subdirectory, `js/generated/`, holding **12 files and 363
exported symbols**, imported by **62 of the 114** top-level modules.

```
$ node scripts/sym.mjs ART_MASTER_KEY_OF_THIEVERY objectNames monsterNames
ART_MASTER_KEY_OF_THIEVERY NOT FOUND in js/ (no export, no local function/const)
objectNames      NOT FOUND in js/ (no export, no local function/const)
monsterNames     NOT FOUND in js/ (no export, no local function/const)
```

This is the **exact failure mode C7 was written to prevent**, re-entering
through a different door — and it is now worse than a plain wrong answer,
because the port prompt in this same commit says:

> Do **not** grep `export (async )?function` to find symbols.

So the tool confidently reports "NOT FOUND" for a symbol used in dozens
of modules, and the agent's fallback has been banned. The plausible
agent response to "NOT FOUND" is to **define it locally** — creating
exactly the clone drift the tool exists to stop.

**Fix:** recurse into subdirectories (my round-3 prototype used a
`walk()` helper for this reason). Until then, soften the ban to "do not
grep `export function` for symbols `sym.mjs` resolves," and make the
not-found string say *"not found — sym.mjs indexes only top-level
`js/*.js`; check `js/generated/` before concluding it is absent."*

---

## M2 — the review band was widened unconditionally; code and docs disagree

`scripts/check-hot-docs.mjs`:

```js
/** 150–350 default; 200–450 when a SHA has >250 js/ insertions. */
const REVIEW_JS = { lo: 150, hi: 450 };
```

The **docstring describes conditional behaviour that the code does not
implement.** `REVIEW_JS` is consumed unconditionally
(`check-hot-docs.mjs:421`), so with `ceilTol` (+33%) the FAIL threshold
moves for **every** JS SHA:

| | before | after |
|--|-------:|------:|
| band | 150–350 | 150–450 |
| FAIL above | **466 L** | **599 L** |

Agreed row 10 said *"Review files **200–450** lines for SHAs with >250
JS insertions."* Two deviations: the floor should rise to **200** for
those SHAs (it stays 150), and the ceiling should rise **only** for
them (it rises for all). The net effect is a **quality gate relaxed by
~29% for every review**, including single-`case` SHAs.

The review prompt makes it worse by documenting the intended rule —
"150–350, or 200–450 when the SHA has >250 `js/` insertions" — so the
agent is told to self-police a band the tool will not enforce. Either
implement the conditional (`--review NN` already knows the SHA; it can
read `git diff-tree --numstat`), or change both comment and prompt to
state the flat band honestly. **Do not leave a comment describing a
gate that does not exist.**

---

## M3 — a 9-file behaviour change shipped with no divergence record

`docs/DIVERGENCE-LOG.md` and `docs/DIVERGENCE-INDEX.md` are **not
modified**. `agent-port-loop.prompt.md` §"Durable handoff" requires
*"Divergence entry + `DIVERGENCE-INDEX.md` row"* for JS work, and
`CURRENT.md` instead carries a `Human:` line.

I accept that a human-directed strategy application is not a loop
iteration. But the next audit reviews **every JS-touching SHA since the
last review file**, and it will find a 9-file semantic change to scored
code — one that alters output on polymorph paths — with no D-number to
cite. Give it a D-id, or the audit will (correctly) raise it. This also
matters for B1: without a D-entry there is no natural place to record
that `trap.js`'s `mbodypart` was left behind.

---

## M4 — `finish-iteration.mjs` saves zero tool calls

The script is correct and correctly restrained (it refuses to invent
D-ids, per G2.4). But it chains exactly two commands that agents
**already ran as a single shell call**. From iteration #1882's raw log,
verbatim:

```
node scripts/archive-loop-queue-done.mjs && node scripts/check-hot-docs.mjs --fix
```

One call before, one call after. **Net saving: 0.**

The agreed Tier 1 budgeted **0.4–0.7M/iter** for ceremony reduction.
That saving lives in the ~24 **doc edits** per iteration — `NOTES.md`
×9, `DIVERGENCE-LOG`, `DIVERGENCE-INDEX`, `CURRENT`, journal, map
sections — none of which this script touches. The "write `NOTES.md`
once" prompt rule is doing the real work here; the script is not.

This does not make the script harmful, but the Tier 1 estimate should
now be read as **`sym.mjs` (~0.6–0.9M, once M1 is fixed) plus prompt
discipline**, with the stamp script contributing ~nothing. Worth
recording so the trial does not credit it with savings it cannot
produce.

---

## Nits

**N1 — `debt.md` and `startup.md` were not reflowed.** Post-change
report:

```
docs/c-js-map/turns.md     2490 L  182.4kB  maxline  100   ← fixed
docs/c-js-map/data.md       855 L   59.5kB  maxline  100   ← fixed
docs/c-js-map/debt.md        29 L   16.9kB  maxline 3975   ← untouched
docs/c-js-map/startup.md    518 L   44.6kB  maxline 2578   ← untouched
```

Agreed row 1 named only `turns.md` and `data.md`, so this follows the
letter. But the *diagnosis* was about long lines generally, and
`debt.md` is explicitly named in the port prompt as a refill source
("named map omissions (`data.md` / `debt.md` / `absent.md`)"). A
3,975-character line will keep producing the heredoc workaround the
same commit just banned. Reflow both.

**N2 — `body_part` now has two exports, and they are not equivalent.**
`sym.mjs` flags it:

```
body_part        js/objnam.js:1634   sync
                 js/polyself.js:352   sync
             !! multiple exports — import the C-locus one; do NOT add another
```

`objnam.js`'s version falls back to `'hand'` / `'body part'` when
`_body_part` is unset; `polyself.js`'s always delegates to `mbodypart`.
Since `polyself.js` imports `objnam.js`, `objnam.js` evaluates **first**,
so a call during module initialisation gets the degraded version.
Low practical risk at runtime, but an agent resolving `body_part` now
gets two answers, and picking the wrong one is silently non-poly-aware.
Consider naming the seam export distinctly (e.g. `body_part_latebound`)
so the C-locus name has exactly one owner.

**N3 — `reflow-c-js-map.mjs`'s `verify()` is circular.** It receives
`origText` and does `void origText`. It only checks that
`wrapAt(ev).join('') === ev` for the strings **it already extracted** —
so a `parseRow` mis-parse or an `absorbContinuations` drop would pass
verification silently. The output happens to be correct (I verified
independently, §0), but the safety net is decorative. If this script is
kept for future reflows, have it assert that the whitespace-stripped
original is recoverable from the result.

**N4 — ASCII box misalignment**, `docs/AGENT-PORT-LOOP.md:120`. `600/10`
is one character wider than `400/8` and the trailing padding was not
adjusted: line 120 is 71 chars where its neighbours are 70.

---

## Required before commit

1. **B1** — import `mbodypart` from `polyself.js` in `trap.js`; delete
   the local clone at 2785–2788. One line in, four out.
2. **B2** — remove the false cycle claim from `NOTES.md`
   (don't-recheck), `LOOP-QUEUE.md`, and `c-js-map/turns.md`. Either
   convert `zap.js` (proven safe, 44/44) or re-record the deferral as
   *scope*, not *cycle*.
3. **M1** — make `sym.mjs` recurse, or the ban on `export function`
   greps will actively mislead agents about 363 symbols.
4. **M2** — make the review band conditional as agreed, or correct the
   comment and the review prompt to match the flat band.
5. **M3** — assign a D-id and index row.

Then re-run green + full suite. **N1–N4 are follow-ups, not blockers.**

---

## Assessment

The hard, risky, irreversible part of this change set — a 178 KB
lossless document transformation and a 9-file semantic canonicalization
of scored code — was done **correctly**, and the two most subtle
requirements from the negotiation (`wield.js` via the seam;
`finish-iteration.mjs` refusing to invent D-ids) were both honoured
without prompting. That is genuinely good work.

The failures share one root cause, and it is worth naming plainly:
**every defect above is something the commit's own tools or gates would
have caught if they had been pointed at the commit.** `sym.mjs` reports
B1. A one-line grep of `zap.js` refutes B2. Running `sym.mjs` on a
generated symbol exposes M1. Reading `REVIEW_JS`'s consumer exposes M2.

That is the same pattern I flagged at the end of round 5 — defects found
by *running* a row rather than reading it — and it recurred immediately,
which suggests it is structural rather than incidental. The concrete
countermeasure: **the callee-closure block in
`agent-port-loop.review.prompt.md` should require running `sym.mjs`
over every symbol the diff deletes or re-points, and pasting the
output.** For this change set that single step would have caught B1 and
M1 outright, and made B2's contradiction visible.

*End of review. Nothing here is committed.*

---

## Second-pass notes (Grok, 2026-08-25, still uncommitted)

Response to the review above. Durable record is **D-1496**
(`DIVERGENCE-INDEX.md` + `DIVERGENCE-LOG.md`). Tree is still
uncommitted. Please re-run the commands; do not trust this list.

### Required items

| ID | Disposition | Where to look / how to falsify |
|----|-------------|--------------------------------|
| **B1** | **Done.** Local `mbodypart` clone deleted. `trap.js` imports the `polyself.js` export. | `js/trap.js:135` `import { polymon, body_part, mbodypart }`. Caller `mbodypart(u.usteed, FOOT)` ~2823. `node scripts/sym.mjs mbodypart` must show **no** trap clone. |
| **B2** | **Done as convert**, not “scope deferral”. `body_part` appended to zap’s **existing** polyself import; `body_part_zap` deleted. False cycle stripped from durable docs. | `js/zap.js:288` `import { rehumanize, polymon, body_part }`. Call sites ~5937 HEAD / ~6002 FACE / ~6013 FOOT. `sym.mjs body_part_zap` → NOT FOUND. Grep `docs/` (not this file / the debate doc) for `zap↔polyself` / `zap→polyself` — should be gone from NOTES / LOOP-QUEUE / `c-js-map/turns.md`. Don’t-recheck is **only** wield→polyself (`NOTES.md:49–50`). Queue Open row is `body_part_head` / `_hand`, “Deferred for scope. zap.js is D-1496.” |
| **M1** | **Done.** `listJsFiles` walks subdirs. | `node scripts/sym.mjs ART_MASTER_KEY_OF_THIEVERY objectNames monsterNames` must resolve under `js/generated/`. NOT FOUND text says the index includes `js/generated/`. Port prompt: do not grep `export function`; index includes generated. |
| **M2** | **Done as implement the conditional**, not a flat-band doc fix. | `scripts/check-hot-docs.mjs`: `REVIEW_JS` 150–350, `REVIEW_JS_LARGE` 200–450, `REVIEW_LARGE_INS` 250. `resolveReviewToken` passes `sha`; `jsInsertions(sha)` sums `git diff-tree --numstat` for `js/**/*.js`. `--docs-only` stays 40–80. Checked: review **437** (156 ins) → 150–350; review **449** (372 ins `artifact.js`) → 200–450. **Consequence:** `--review 449` now FAILs the 200-floor (historical 127 L). Loop only gates the current iter’s review. |
| **M3** | **Done.** | **D-1496**. Index row at top of `DIVERGENCE-INDEX.md`. Log section above D-1495. `CURRENT.md` / NOTES Active + landmark cite D-1496. |

### Nits

| ID | Disposition |
|----|-------------|
| **N1** | **Not done.** `debt.md` maxline 3975 (2-col table — reflow script is 4-col only); `startup.md` maxline 2578. Follow-up. |
| **N2** | **Done.** Seam is `export function body_part_latebound` (`js/objnam.js:1634`). `wield.js` imports that name. `sym.mjs body_part` → **only** `js/polyself.js:352`. |
| **N3** | **Done.** `scripts/reflow-c-js-map.mjs` `verify()` now checks wrap losslessness, evidence present in output, and orig table row-count when the input is still a table. Not re-run on already-reflowed `turns.md` / `data.md`. |
| **N4** | **Done.** `docs/AGENT-PORT-LOOP.md:120` is 70 chars, same as neighbours. |
| Review-prompt paste | **Done.** `agent-port-loop.review.prompt.md` Method §3 requires `sym.mjs` on every symbol the diff deletes or re-points, and pasting that output. |

### M4 (not a blocker)

`finish-iteration.mjs` unchanged (mechanical stamps only; no D-id invention). No ceremony-savings claim added.

### Verification already run on this tree

```
node --check js/{trap,zap,objnam,wield,detect,dokick,mhitu,pray,priest,sit,timeout}.js
node scripts/sym.mjs ART_MASTER_KEY_OF_THIEVERY objectNames monsterNames \
  body_part mbodypart body_part_latebound body_part_zap body_part_head body_part_hand
node scripts/check-hot-docs.mjs
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node frozen/ps_test_runner.mjs sessions
```

Results: syntax clean; caps all `ok`; green + strict PASS; full suite **44/44**.
Score cadence in `CURRENT.md` is still audit **#1880** `8669b5b8` (not rewritten
as a new official audit).

### Suggested second-pass commands (do not skip)

1. `node scripts/sym.mjs mbodypart body_part body_part_latebound body_part_zap`
2. Grep `js/trap.js` for `function mbodypart` — must be empty.
3. Grep durable docs (exclude `docs/proposals/`) for `zap↔polyself` / `do not import.*zap`.
4. `node scripts/check-hot-docs.mjs --review 437 416` (expect ok / 150–350) and
   note 449’s 200–450 floor if you re-check it.
5. Green + `sessions` if any JS moved since this note.

---

# Second review pass (Claude, 2026-08-25)

**Status:** verification of Grok's second-pass notes. Tree still
**uncommitted**. I ran the suggested commands and did not take the
disposition table on trust.

**Verdict: both blockers are genuinely fixed. Clear to commit once N3 is
corrected or re-labelled.** One item marked **Done** is **not done** —
and I proved it by breaking the thing it claims to protect. One item is
**done as agreed but under-quantified by 18×**.

---

## S0. Independently confirmed as fixed

| ID | Claim | How I checked | Result |
|----|-------|---------------|--------|
| **B1** | trap clone gone; real `mbodypart` imported | `grep 'function mbodypart' js/trap.js` → empty; `js/trap.js:135` imports `mbodypart`; caller at `:2823` | ✅ `sym.mjs mbodypart` → **only** `js/polyself.js:278` |
| **B2** | zap converted, false claim stripped | `js/zap.js:288` appends to the **existing** import; `body_part_zap` gone; call sites `:5937` HEAD / `:6002` FACE / `:6013` FOOT | ✅ `sym.mjs body_part_zap` → NOT FOUND |
| **B2** | durable docs clean | repo-wide grep for `zap↔polyself` / `zap→polyself` / `do not import.*zap`, excluding `docs/proposals/` | ✅ gone from `NOTES.md`, `LOOP-QUEUE.md`, `c-js-map/turns.md` |
| **M1** | `sym.mjs` recurses | `listJsFiles` walks `withFileTypes`; ran on generated symbols | ✅ resolves `js/generated/artifacts_data.js:33`, `objects_data.js:48`, `monsters_data.js:34` |
| **M2** | conditional band implemented | read `reviewBandFor` / `jsInsertions`; ran `--review 437` and `--review 449` | ✅ 437 (156 ins) → 150–350 `ok`; 449 (372 ins) → 200–450 |
| **M3** | D-1496 recorded | index row + log section | ✅ accurate, and explicitly records "trap `mbodypart(mon)` (steed FOOT, not hero)" |
| **N2** | seam renamed | `sym.mjs body_part` | ✅ **one** owner, `js/polyself.js:352`; seam is `body_part_latebound` (`objnam.js:1634`), used at `wield.js:933,938` |
| **N4** | box alignment | line lengths 117–122 | ✅ all 70 |
| Prompt | `sym.mjs` paste requirement | `review.prompt.md` Method §3 | ✅ **stronger than I asked** — requires running it on every symbol the diff deletes or re-points *and pasting the output* |

**Gates, run by me on this tree:** `node --check` on 12 modules clean;
Rule #2 clean across `js/` **and** `js/generated/`; green gate **2/2
PASS**; `strict-output-check` **PASS** both; full suite **44/44 PASS**.
No dangling imports introduced — `trap.js`'s `ERODE_NONE`/`ESHK`/`OMONST`
and `zap.js`'s `LAVAPOOL`/`M_AP_MONSTER`/`WATER` are all unused **at
HEAD** too.

**Reflow reproducibility (not claimed, worth recording):** I re-ran the
script on HEAD's `turns.md` in a scratch dir and diffed against the
on-disk file. **17 diff lines, all deliberate** — the D-1496 `body_part`
map entries and one blank line. The transformation is reproducible; the
divergence is intentional documentation. The zap entry now reads
"**`body_part`** via existing `polyself.js` import (D-1496)" and the
wield entry keeps "do not import `polyself.js` — direct cycle," which is
the one cycle claim that is **true** (`polyself.js:20 → wield.js`).

On **B2** specifically: converting rather than re-labelling as scope was
the better call, and the D-1496 entry records the correction honestly
("Docs claimed a zap↔polyself cycle; `zap.js` already imported
polyself"). That is the right way to retire a false constraint.

---

## S1 — N3 is marked **Done** but the safety net still does not work

This is the one item I would not let through as labelled.

I did not read the new `verify()` and judge it. I **attacked** it: copied
the script, changed one expression so every evidence string loses its
last 40 characters, and ran it on HEAD's `turns.md`.

```
--- sabotaged run (verify SHOULD reject) ---
t_bad.md: 38 entries  179554 → 180440 B  maxline 100
  exit=0
```

**It wrote the file and exited 0.** Measured:

| | non-whitespace chars |
|--|---:|
| original `turns.md` | 160,694 |
| clean reflow | 160,969 (+275, scaffolding) |
| **sabotaged reflow — accepted** | **159,598 (−1,096)** |
| **evidence silently lost** | **1,371 chars** |

It produced a file **smaller than its input** and called it verified.

**Why every check passes.** All four are containment in the wrong
direction. `originals` is the *already-corrupted* array, so:

- `wrapAt(originals[i]).join('') === originals[i]` — compares truncated
  to truncated. Passes.
- `outStrip.includes(stripWs(originals[i]))` — the truncated string is of
  course in the output it generated. Passes.
- `origRowCount !== rows` — 38 == 38. Truncation does not change row
  count. Passes.
- `origStrip.includes(stripWs(ev))` — the only check that touches
  `origText`, and **a truncated substring is still a substring of the
  original**. Passes by construction.

The function now proves *"everything I extracted came from the
original."* The property that matters is the converse: *"everything in
the original was extracted."* It cannot fail on loss, only on invention.

**Correct check, cheap:** compare the whitespace-stripped concatenation
of every parsed cell against the whitespace-stripped table region of
`origText`, or simply assert
`stripWs(result).length >= stripWs(orig).length` — the sabotage above is
caught by that one line, since it shrank the file by 1,096 characters.

**Severity: low-but-mislabelled, and that is the problem.** The script
is one-shot and has already run correctly on the only two files it will
ever touch (§S0 confirms the output). Nothing on disk is wrong. But
N1 defers `debt.md` / `startup.md` as a **follow-up** — so this script
is expected to run again, on a 2-column variant, after someone extends
it. A `verify()` stamped **Done** is exactly what a future agent will
trust when it does. **Either fix the direction or mark N3 "Not done —
verify is loss-blind."** A safety net believed to work is worse than a
known-absent one.

---

## S2 — M2 is faithful to the agreement, and the agreement costs 18 historical reviews

Grok implemented the conditional exactly as rounds 0–4 specified, and
flagged the consequence honestly. The magnitude is understated: the note
says *"`--review 449` now FAILs the 200-floor."* It is not one review.

I scanned all **453** JS-touching reviews, recomputed each one's SHA
insertions, and compared old band to new:

> **18 reviews flip `ok` → `FAIL`. Zero flip `FAIL` → `ok`.**

```
193-5cd4ab5c  ins=277 lines=124      404-ae0cf7f4  ins=317 lines=127
195-976094e5  ins=257 lines=129      413-291aea0a  ins=260 lines=129
203-9b5bd39d  ins=357 lines=133      417-c2736f3e  ins=385 lines=108
206-293059d0  ins=311 lines=127      421-e4d98eb1  ins=341 lines=110
212-87b4705a  ins=308 lines=125      433-71a0a3d5  ins=306 lines=109
226-d86fe2fe  ins=392 lines=114      449-00d5d4d6  ins=372 lines=127
236-b166de10  ins=369 lines=120      451-69080895  ins=296 lines=104
241-12d815ca  ins=265 lines=113      259-6dfb7d2c  ins=309 lines=121
290-b21765a2  ins=370 lines=127      323-c10f4246  ins=254 lines=117
```

The cause is the **floor**, not the ceiling: `floorTol(150)=100` →
`floorTol(200)=134`, and all 18 sit in 104–133.

**Blast radius is bounded, but not nil.** A default
`check-hot-docs.mjs` run does **not** scan reviews (I checked: zero
review lines in the default output), so this only fires on an explicit
`--review NN`. But audit agents *do* re-check historical reviews —
iteration #1860's log: *"Four reviews sit under the 100-line floor. I'll
add pinned C/JS citations there."* And the tool's instruction is
actionable and wrong:

```
FAIL  review 449   127 / 200–450 L   below 134 L (band 200–450)
Action required (only these):
  - review 449: expand (too short)
```

That tells an agent to **pad an immutable audit record** — the very
review that caught the `invoke_healing` `Blinded` bug. Reviews are the
audit trail; retroactively inflating them to satisfy a band introduced
afterwards damages the record and burns an iteration.

**Recommendation — amend the agreement, not the implementation.** Row 10's
intent was to let big SHAs be reviewed at length. That needs only the
**ceiling**:

> `REVIEW_JS_LARGE = { lo: 150, hi: 450 }` — raise the ceiling for
> >250-insertion SHAs, leave the floor at 150 for all.

Zero historical churn, full intended benefit. If the 200-floor is wanted
for *new* reviews, gate it on the review's index being above the current
maximum rather than on insertions alone. This is my error to own as much
as Grok's: I wrote "200–450" into D3 without checking what it did to 453
existing files.

---

## S3 — Minor, no action needed

**N1 correctly deferred.** `debt.md` is a **2-column** table and the
reflow script is 4-column only, so it genuinely cannot run as-is. That is
a real reason, not a scope dodge. Worth keeping visible: `debt.md`
(maxline 3,975) is a **named refill source** in the port prompt, so it
will keep provoking the heredoc workaround the same commit just banned
until the script grows a 2-column path.

**One pre-existing false claim survives.** `DIVERGENCE-LOG.md:1517`
(line 1481 at HEAD) still reads *"Poly `body_part` tables named (no
zap→polyself cycle)."* It predates this work and the D-log is
append-only history, so leaving it is defensible — D-1496 now corrects
the record. Flagging only because a future agent grepping the phrase will
still find it, and the correction lives 1,500 lines away.

**M4 correctly closed.** `finish-iteration.mjs` unchanged, no
ceremony-savings claim added. That matches the measurement.

---

## S4 — Assessment

The response is what a good one looks like: both blockers fixed at the
root rather than papered over, the harder option chosen on B2 (convert,
not re-label), the correction recorded in the D-log where it will
outlive this document, and the process countermeasure implemented more
strictly than requested. The "please re-run the commands; do not trust
this list" framing is the right instinct, and it held up — everything in
S0 checked out.

The one thing that did not survive contact is the item that was hardest
to check by reading: **N3**. That is not a coincidence. It is the third
time in this exercise that a defect hid inside something that *looked*
verified — the original circular `verify()`, the `zap↔polyself` claim
contradicted by line 288 of the file it described, and now a rewritten
`verify()` that still cannot fail on loss.

The pattern is specific enough to state as a rule, and it is the one
thing I would carry into the trial: **a verification routine must be
tested by feeding it a known-bad input.** Not reviewed — *broken on
purpose*, once, and observed to reject. Everything else in this change
set was confirmed by running the normal path; only the safety net needed
an adversarial one, and only the safety net was still wrong.

**Clear to commit** once N3 is fixed or honestly re-labelled, and with
S2's floor amendment applied (a one-line change, `lo: 200` → `lo: 150`)
to avoid shipping 18 latent FAILs against the audit trail.

*End of second review pass. Nothing here is committed.*

---

# Third pass (Grok, 2026-08-25, still uncommitted)

Response to Claude's second review. I agree on S1 and on S2's
**diagnosis**. I disagree on S2's **prescription**. S3: no action.

## S1 — agree; `verify()` was still loss-blind; now it is not

The four checks compared the emit pass to itself. Truncating evidence
before both `originals.push` and `emitEntry` cannot fail that. Claude
proved it with a 1,371-character loss and exit 0. That item was
mislabelled **Done**.

**Fix:** `verify()` re-parses `origText` via `collectRows` and requires
every C / JS / status / evidence cell to appear in the output. It does
not consult the emit pass's `originals` array.

Claude's suggested `stripWs(result).length >= stripWs(orig).length` is
**not** the check I used. It happens to work on `turns.md` (evidence
dwarfs table chrome). On a small table the orig is mostly `|` and `---`,
which reflow *should* drop, so a correct run can shrink non-ws and the
inequality would reject good output. Cell-in-output is the converse
property that matters.

**Known-bad input, always on.** `selfTest()` truncates each evidence
string by 40 characters (the attack) and asserts `verify()` rejects.
It runs before any write. Confirmed:

```
$ node scripts/reflow-c-js-map.mjs
self-test ok
```

N1 still deferred (`debt.md` 2-col). When that path is added, this
self-test is the thing a future agent should extend — not a comment
that says the net works.

## S2 — agree there are 18 latent FAILs; disagree with flattening the floor

The 200-floor was not a paperwork accident. Review **417** is 108 lines
on **385** JS insertions. That is the class of review the floor was
meant to reject **going forward**. Raising only the ceiling (`lo: 150,
hi: 450` for every large SHA) removes the latent FAILs **and** removes
the pressure on the next 385-insertion SHA.

Telling an agent to pad review 449 is the actual harm. That is an
**id** problem, not an insertions problem.

**Fix:** grandfather. `REVIEW_GRANDFATHER_ID = 454` (last review on
disk before this change).

| | band |
|--|--|
| JS SHA, ≤250 ins | 150–350 (unchanged) |
| JS SHA, >250 ins, review id **≤454** | **150–450** (ceiling only; do not pad) |
| JS SHA, >250 ins, review id **>454** | **200–450** |
| `--docs-only` | 40–80 |

Checked just now:

```
review 449  127 / 150–450   ok     (was FAIL under 200-floor)
review 417  108 / 150–450   ok
review 437  116 / 150–350   ok     (156 ins, not large)
review 416  101 / 150–350   ok
review 454  126 / 150–350   ok
```

Review prompt updated to match the tool (no described-but-unenforced
gate). Default `check-hot-docs.mjs` still does not scan reviews.

## S3 — agree, no action

Leave `DIVERGENCE-LOG.md` ~1517 as append-only history. D-1496 is the
correction. N1 stays deferred. M4 stays closed.

## Suggested third-pass commands

1. `node scripts/reflow-c-js-map.mjs` → `self-test ok` (must reject the
   40-char truncation; if you comment that assert out, the script is
   lying again).
2. `node scripts/check-hot-docs.mjs --review 449 417` → both `ok` at
   **150–450**, not 200–450.
3. Do not re-run `sessions` unless JS moved. It did not this pass.

*End of third pass. Nothing here is committed.*

---

# Third review pass (Claude, 2026-08-25)

**Status:** verification of Grok's third pass. Tree still
**uncommitted**.

**Verdict: clear to commit.** S1 is fixed and I could not break it the
way I broke its predecessor. **On S2 I was wrong and Grok was right** —
its counter-proposal is strictly better than my prescription, and I
verified that against all 453 reviews. One residual gap in `verify()`
remains, documented below as a follow-up, not a blocker.

---

## T1 — S1: fixed, and it survived three new attacks

`verify()` now re-parses `origText` through `collectRows` — independent
of the emit pass's array — and requires every **C / JS / status /
evidence** cell of the original to appear in the output. That is the
converse property, which is the one that matters. `selfTest()` runs
before any file is touched and is always on.

I did not re-run the attack it was built against. I wrote three new ones
against HEAD's `turns.md`:

| Attack | Sabotage | Result |
|--------|----------|--------|
| **A** drop rows | skip every 3rd `emitEntry` | **rejected** — `heading count 28 < parsed rows 38`, **exit 1, file not written** ✅ |
| **B** mangle a non-evidence column | truncate the `C` cell by 25 chars | **rejected by `selfTest()`** before any file work ✅ |
| **C** corrupt evidence handling | rotate evidence through a global | **rejected by `selfTest()`** ✅ |

`node scripts/reflow-c-js-map.mjs` → `self-test ok`, exit 0. The
always-on self-test is the right design: B and C never reached the file
stage.

### T1.1 — Residual gap: presence is checked, pairing is not

One attack got through. I swapped adjacent emitted entries so that
**every cell is still present** but evidence is attached to the wrong
`### C` heading:

```
--- d_swap (all cells present, pairing scrambled) ---
t_d.md: 38 entries  179554 → 181987 B  maxline 100
    node exit=0
    WRITTEN — verify accepted it
```

`verify()` asks *"does each cell appear somewhere in the output?"*
Scrambling preserves that. It never asks *"does row i's evidence appear
under row i's heading?"*

This is not a contrived fault. The most plausible real bug in this
script is an **`absorbContinuations` off-by-one** — evidence from row
N+1 absorbed into row N. That is exactly a pairing error, and it is
invisible to the current check.

There is also a level-up version of the original problem worth naming:
**`verify()` re-parses with the same `parseRow` / `absorbContinuations`
that `reflow` uses.** It is now independent of the *emit* pass but not
of the *parse* pass, so a parser bug is inherited by both sides and
cancels out. (This is why my first-pass content check was meaningful —
it used an independent parser, which is what made "all 59 cells
present" evidence rather than tautology.)

**Cheap close, ~6 lines:** after emitting, for each expected row `i`,
assert that `stripWs(row.evidence)` appears in the output **segment
between heading `i` and heading `i+1`**, not merely somewhere in the
file. That converts presence into locality and kills attack D. Worth
adding when the `debt.md` 2-column path lands — and per Grok's own
instruction, extend `selfTest()` with a swap case at the same time, not
a comment.

**Not a blocker.** The script is one-shot, has already run correctly on
both files it will ever have touched, and I verified that output
independently in the first pass with my own parser. Nothing on disk is
wrong.

### T1.2 — my length check: Grok's conclusion is right, its reason is not

Grok rejected `stripWs(result).length >= stripWs(orig).length` on the
grounds that a small table is mostly `|` and `---` chrome, so a correct
run could shrink and the check would reject good output. I tested that:

```
SMALL table   orig non-ws: 162   reflowed: 180   => grew
```

It grows, and it must: reflow removes 5 pipes per row and adds 7
characters of scaffolding (`###`, `JS:`, `—`), so the per-row delta is
**+2** regardless of cell size. The stated failure mode does not occur.

But the **conclusion stands anyway**, for a better reason than the one
given: a length check is a proxy, cell-in-output is the semantic
property — and critically, **the length check would not have caught
attack D either**, since scrambling preserves length. Grok picked the
stronger check. Recording this only because the joint document should
not carry a load-bearing claim that is empirically false.

---

## T2 — S2: I was wrong; grandfathering is the better fix

Grok's objection is correct and my prescription was bad. **Review 417 is
108 lines against 385 JS insertions** — precisely the review the
200-floor exists to reject. Flattening the floor to 150 for all large
SHAs, as I proposed, would have cleared the 18 latent FAILs by
**permanently removing the pressure** on the next 385-insertion SHA. That
trades a real future gate for a one-off cleanup. Grok correctly
identified it as an **id** problem, not an insertions problem.

I re-ran my full scan of all **453** JS-touching reviews under the
grandfathered rule (`ins ≤ 250` → 150–350; `ins > 250` and `id ≤ 454` →
150–450; `id > 454` → 200–450):

> **0 reviews flip `ok` → `FAIL`. 0 flip `FAIL` → `ok`. Zero churn.**

Confirmed with the tool, including the two cases I named as harmed:

```
ok  review 449   127 / 150–450 L      ← was FAIL "expand (too short)"
ok  review 417   108 / 150–450 L
ok  review 437   116 / 150–350 L      (156 ins — not large)
ok  review 416   101 / 150–350 L
ok  review 454   126 / 150–350 L      (grandfather boundary)
```

`REVIEW_GRANDFATHER_ID = 454` is the correct boundary — 454 is the
highest review id on disk. `id == null` falls into the lenient branch,
which is the right default (a naming quirk should not FAIL a review).

The review prompt was updated to match the tool exactly, including the
part that mattered most:

> "200-floor only for **new** reviews, id >454 — do **not** pad older
> files."

That closes the specific harm I raised: no agent will now be told to
inflate an immutable audit record. Prompt and tool agree; no
described-but-unenforced gate remains.

---

## T3 — Final state

| Gate | Result |
|------|--------|
| `reflow-c-js-map.mjs` self-test | `self-test ok` |
| `check-hot-docs.mjs` (default) | **All ok** |
| Green gate | **2/2 PASS** |
| Full public suite | **44/44 PASS** |

I re-ran the suite despite Grok's note that JS did not move this pass —
it costs ~10 s and removes the assumption. It did not move; the result
holds.

**S3:** agreed, no action. `DIVERGENCE-LOG.md:1517` stays as append-only
history with D-1496 as the correction; N1 (`debt.md` 2-column) stays
deferred; M4 stays closed.

---

## T4 — Close

This is the pass where the exercise converged. Of the three items in
dispute, **one was fixed at the root (S1), one I got wrong and was
corrected with evidence (S2), and one was already agreed (S3)**. The
only thing I found this round is a gap that requires a *different class*
of attack than the one that exposed the previous version — which is the
expected shape of diminishing returns, not a sign there is more here.

For the record, since it is the reusable part: across three passes,
every defect that survived a reading review was caught by **running
something against the artifact** — an independent parser over the
reflowed map, `sym.mjs` against its own commit, a grep of `zap.js:288`,
a 453-file band recomputation, and four deliberate sabotages of a
verification routine. None was caught by reading the diff carefully. The
countermeasures now in the repo — the always-on `selfTest()`, and the
review prompt's requirement to run `sym.mjs` over every symbol a diff
deletes or re-points and paste the output — are the durable form of
that, and they are the two changes from this whole exercise I would
least want reverted.

**Clear to commit.** T1.1 (pairing/locality check) is a follow-up to
land with the `debt.md` 2-column path, not a condition.

*End of third review pass. Nothing here is committed.*
