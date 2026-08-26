# Proposal: navigation substitution, and a verdict on graphify

**Status:** proposal for human review. **Not adopted.** Loop agents must
not treat this file as playbook, constitution, or runbook. Do not edit
loop scripts from this note.

**Date:** 2026-08-26. Loop stopped at global iteration **#1941**
(`9b53440e`, D-1548/D-1549, public suite **44/44** fortress).
**Author:** Claude (Opus 5), operator request.
**Question asked:** would regular use of **graphify**
(`https://github.com/Graphify-Labs/graphify`) help this loop, and what
else would cut wall time and tokens at minimal quality loss?

**Relationship to the prior document.** This does not re-open
`2026-08-25-iteration-density-token-efficiency.md` (closed at G13).
That document's cost model is **replicated and confirmed** here. What
is new is a *measurement of whether its Tier 1 worked* — it did not —
and the reason, which changes what should be built next.

---

## 0. Answer in one paragraph

**Graphify: no, not in the loop's inner path.** Not because the graph
would be bad, but because this loop does not currently *substitute*
retrieval — it *adds* it. `scripts/sym.mjs` proves this: it landed
around **#1867**, adoption climbed to **2.1 calls/iteration**, and the
grep class it was built to replace **did not fall at all** (27–37 per
iteration, before and after). A knowledge-graph query costs the same
~39k tokens as the grep it was supposed to replace, and a *lossy,
LLM-inferred* answer cannot be trusted in a port whose entire value is
byte-exact fidelity — so the agent would query the graph **and then
verify against the C anyway**. That is strictly additive. The tooling
gap is not the bottleneck; **enforcement is**.

---

## 1. Cost model (replicated, current data)

From the last 40 `iter-*.raw` (tool calls counted on `subtype:started`
only, so no double count):

| Relation | Fit | R² |
|---|---|---:|
| `tokens ~ toolCalls` | **38.8k tokens per call**, intercept ≈ 0 | **0.86** |
| `minutes ~ toolCalls` | 2.0 + **0.062 min per call** (3.7 s) | 0.60 |

Median port iteration: **176 calls**, **6.2M tokens**, **~14 min**.
`cacheWriteTokens` is `0` on every iteration; `cacheRead` is ~90% of
the total and is the whole conversation re-read once per turn.
Average prefix is **27–38k tokens** and is roughly *flat* whether an
iteration makes 120 calls or 436 — so total cost is very close to
**linear in tool-call count**, and tool-call count is the only lever
that moves it.

**Reasoning effort is not a lever.** Thinking text is 7–16k tokens per
iteration (~21–28% of `outputTokens`, and `outputTokens` is <1% of
total). Dropping from `xhigh` would buy ~0.2% of tokens and cost
fidelity. Do not touch it.

### 1.1 Where the calls go (40 iterations, 8,085 calls)

| Class | Calls | Share |
|---|---:|---:|
| `read` | 3,464 | 43% |
| `grep` | 2,568 | 32% |
| `edit` | 1,078 | 13% |
| `shell` | 619 | 8% |
| `glob` | 320 | 4% |

**Navigation (read+grep+glob) = 78%.** Re-read ratio is **2.36×** —
the median iteration opens 37 distinct files with 87 reads. 93% of
reads are *ranged* (`offset`/`limit`), i.e. paging.

Search calls by purpose (2,888 grep+glob):

| Purpose | Share | Already answered in ONE call by |
|---|---:|---|
| symbol / identifier / export lookup | **44%** | `scripts/sym.mjs` (exists since ~#1867) |
| file/review globbing, other | 38% | — |
| bookkeeping (`Addressed:`, queue, canary) | 12% | nothing — needs a script |
| Rule #2 / banned-pattern lint | 3% | supervisor already scans this |
| import edge / cycle | 3% | nothing — needs a script |

---

## 2. The finding that matters: Tier 1 shipped and changed nothing

`node scripts/loop-nav-report.mjs 200 --blocks` (new, this note):

| Iterations | calls | tokens | nav% | `sym.mjs` calls/iter | avoidable greps/iter |
|---|---:|---:|---:|---:|---:|
| 1743–1767 | 150 | 4.74M | 77% | 0.0 | 42.9 |
| 1768–1792 | 187 | 6.24M | 76% | 0.0 | 49.1 |
| 1793–1817 | 196 | 5.66M | 75% | 0.0 | 49.6 |
| 1818–1842 | 182 | 6.47M | 76% | 0.0 | 47.5 |
| 1843–1866 | 165 | 5.34M | 74% | 0.0 | 42.0 |
| **1867–1891** | 193 | 7.31M | 77% | **0.7** | 52.5 |
| **1892–1916** | 167 | 4.94M | 78% | **1.8** | 42.2 |
| **1917–1941** | 194 | 7.38M | 78% | **2.1** | 51.2 |

"Avoidable" = a grep whose exact question a checked-in deterministic
script already answers in one call (symbol/export, bookkeeping, import
edge, map section, pinned-C locus). The classifier is coarse and will
over-count: some of those greps are legitimate second looks at
primary source. It is a **ceiling**, not a target.

`sym.mjs` is called in **92%** of iterations. The prompt *bans*
`export (async )?function` fishing. Both are true, and the banned
greps still run 5–10 times per iteration, with the wider symbol class
flat at ~30. Navigation share has not moved off 74–78% in 200
iterations.

**Diagnosis.** The agent satisfies the instruction with one `sym.mjs`
call and then navigates the way it would have anyway. This is not
laziness — it is the correct instinct for a fidelity port: *the agent
does not trust a summary it did not read*. Any tool that returns a
**derived** answer will be checked against source. Only tools that
return the **source itself**, addressed precisely, actually remove a
call.

That is the design rule this note is built on:

> **A tool removes tool calls only if it returns the same primary
> evidence the agent would otherwise assemble by hand — not a summary
> of it.**

`sym.mjs` obeys this (it returns `file:line` + binding kind, which is
primary). It failed anyway because nothing *enforces* substitution.
Graphify would violate the rule *and* lack enforcement.

---

## 3. Graphify verdict

### 3.1 Against, in the loop

1. **Wrong epistemics.** Graphify's audit trail is
   `EXTRACTED / INFERRED / AMBIGUOUS`. The three things this port must
   preserve — short-circuit order, RNG call order, integer semantics —
   are exactly what a semantic graph abstracts away. An `INFERRED` edge
   that reads as authoritative is a fidelity hazard in a 100%-RNG-match
   fortress, and the loop's only backstop is a 1-in-10 audit.
2. **No call saving.** A `graphify query` is a shell call: ~39k tokens,
   same as the grep. It wins only if one query replaces ≥2 calls
   **and the agent skips verification**. §2 says it will not skip
   verification. Expect **+1 to +3 calls/iteration**, i.e. **+40k to
   +120k tokens**, for zero removals.
3. **Recurring build cost.** The corpus is 250k lines of pinned C +
   170k lines of `js/` + 4.1k lines of map docs. LLM extraction over
   that is a large one-off, and `--update` recurs — the loop touches
   up to 10 `js/` files per iteration, ~9 per audit window.
4. **The structural questions it would answer well do not need an
   LLM.** Import graph, cycles, call sites, clone families, fan-in:
   all deterministic, all cheap, all exactly reproducible. §5 ships
   them as three small scripts. Deterministic beats inferred here, and
   it is free per query.

### 3.2 For, narrowly and off the loop

There is **one** use I would endorse, and it is a *human* use, run
once, not a loop dependency:

- A **one-shot cross-corpus map of the 294 divergent clone families**
  (`js-port-clone-drift`), to see which families cluster and which
  subsystems concentrate the drift, so Tier 3's queue refills can be
  ordered by blast radius instead of alphabetically.

Even there, `scripts/sym.mjs` plus `scripts/imports.mjs --who` already
produces the family list deterministically. Graphify would add
community structure and a browsable wiki — genuinely nice for a human
planning session, worth **zero** to a loop iteration. Run it against a
copy, keep `graphify-out/` out of the repo, and never cite it in a
divergence entry.

**Recommendation: do not adopt for the loop.** If the operator wants
the clustering picture, run it once by hand, off the critical path.

One caveat worth stating plainly: this verdict is about *this* loop —
a fidelity port where the primary source must be read regardless, on a
harness that charges ~39k tokens per tool call. It is not a verdict on
graphify. On a codebase where the question is "how does this system
fit together" rather than "does line 504 short-circuit in the same
order as C", the trade would look very different.

---

## 4. A quantitative rule for "just put it in the prompt"

The tempting fix is to pre-resolve the queue item in the supervisor
overlay. That is charged differently and the arithmetic is sharp.

Injecting **S** tokens into the initial prompt is re-read on every one
of the **N** remaining turns: cost **N·S**. Removing **k** tool calls
saves **k·38.8k**. So injection pays iff:

> **S < k · 38,800 / N**

At today's `N ≈ 176`: an overlay that removes **k=20** calls may be up
to **~4.4k tokens**. One that removes **k=2** may be **~440 tokens**.

**Consequences:**

- **Inject pointers, not bodies.** `data.md:336-366` is ~10 tokens and
  removes the whole paging sequence. The 30-line section body is ~700
  tokens and removes one read.
- Injecting a 47k-token map file, or a graph summary, is a **large net
  loss** at any plausible k.
- A short discipline overlay (~100 tokens) that removes even **one**
  call is a **4× return**. This is why §6's heal overlay is cheap.

---

## 5. Shipped in this note (four scripts, additive, no `js/` change)

All deterministic, read-only, no network, no LLM, no cache. None of
them touch scored `js/`, `frozen/**`, or any authority doc.

### `scripts/map.mjs` — C→JS map section retrieval

`docs/c-js-map/turns.md` is **2,546 lines / ~47k tokens** with exactly
**one** `##` heading and no table of contents. It is read **3.9×/iter**
in median **30-line** chunks; `data.md` the same. That is binary-search
paging through the largest file in the repo.

```
node scripts/map.mjs worm.c          # the section, whole, one call
node scripts/map.mjs detect_wsegs    # every map file:line naming it
node scripts/map.mjs --index         # 59-line TOC of all 59 sections
node scripts/map.mjs --heads shk.c   # heading + JS/status line only
```

`--index` renders the entire map as **59 lines**. Expected saving:
**6–8 calls/iteration**.

### `scripts/csym.mjs` — pinned-C definition and call sites

`nethack-c/**` is read **12.7×/iter**, each preceded by a locating grep.

```
node scripts/csym.mjs detect_wsegs           # worm.c:502-519 + full body
node scripts/csym.mjs worm_known monkilled --sig
node scripts/csym.mjs --callers worm_known   # all 5 sites, one call
node scripts/csym.mjs --macro canseemon      # #define bodies
```

Verified against the map's own citations: `detect_wsegs` →
`worm.c:502–519` (map says 502–519); `--callers worm_known` returns
`mon.c:3384`, `vision.c:2162`, `display.h:118` — exactly the sites
D-1548 cites. Expected saving: **4–6 calls/iteration**.

### `scripts/imports.mjs` — import oracle, and a correction

```
node scripts/imports.mjs --can wield.js polyself.js body_part
node scripts/imports.mjs --cycles --deps X --who X --path A B
node scripts/imports.mjs --rulecheck     # Contest Rule #2 over js/
```

Building it surfaced a **live, load-bearing error in the hot pack**.
See §6.

### `scripts/loop-nav-report.mjs` — the trial metrics, measured

Supplies exactly what the prior proposal's trial table asked for and
had no tooling for: calls/iter, nav share, tokens per call, avoidable
grep counts by class, and per-script adoption.

```
node scripts/loop-nav-report.mjs 200 --blocks
```

---

## 6. Correction: the hot pack's import bans are not cycle facts

`docs/CURRENT.md` carries a growing list of the form *"Do not import
`wield.js`→`polyself.js` for `body_part` (latebound)"*, *"Do not
import `makemon.js`→`hack.js` for `in_town` (local clone;
hack→trap/mon cycle)"*, and five more. Each costs hot-pack budget on
**every** iteration, and each forces a **divergent clone** — the very
drift Tier 3 exists to undo.

**The premise is false.** `js/` already contains **one static cycle
component of 82 of its 126 modules**, with 1,866 static import edges.
Practically every module pair named in those bans is *already* in the
same cycle. "Would create a cycle" is not a discriminating test here —
it is true of almost any edge, including the 1,866 that ship today.

What actually breaks an ESM cycle is a **top-level (module-evaluation)
read of a not-yet-initialised binding** — a TDZ error. Function
declarations are hoisted and are cycle-safe. So `--can` was rewritten
to answer *that* question. Checking the current ban list:

| Ban in `CURRENT.md` | Name | Binding | Verdict |
|---|---|---|---|
| `wield.js`→`polyself.js` | `body_part` | `function` | **SAFE** |
| `pickup.js`→`polyself.js` | `body_part` | `function` | **SAFE** |
| `makemon.js`→`hack.js` | `in_town` | `function` | **SAFE** |
| `bones.js`→`options.js` | `fruitadd` | `function` | **SAFE** |
| `uhitm.js`→`pager.js` | `object_from_map`, `look_at_object` | `function` | **SAFE** |
| `makemon.js`→`artifact.js` | `u_wield_art` | — | **not exported** — ban cites a name that does not exist there |
| `dog.js`→`mklev.js` | `somexy` | — | **not exported**; 3 local clones (`dog.js:613`, `mklev.js:19013`, `teleport.js:937`) |

**Verified empirically, not just statically.** On a scratch copy of
`js/`, injecting `import { body_part } from './polyself.js'` into
`wield.js` and loading through three separate entry points
(`wield.js`, `polyself.js`, `hack.js`) all succeed. `wield.js` today
reaches `body_part` through a `body_part_latebound` shim imported from
`objnam.js` — machinery built to route around a hazard that is not
there.

`--can` also reports the **real** hazard when there is one:
`dog.js` executes 9 top-level statements that read imported bindings
(`monsterNames` lines 42–46, `objectNames` 47–48). *That* is the
pattern that can break, and it is invisible to the current rules.

**This is not a request to bulk-merge clones.** G13 explicitly
rejected blanket canonicalisation and I am not reopening it. The claim
is narrower and, I think, uncontroversial: the *stated reason* on
those hot-pack lines is wrong, the lines cost budget every iteration,
and future ones should be produced by `--can` rather than by
inference. Where a clone is kept for a different reason, say that
reason.

**Suggested action:** replace the seven ban lines with one line —
*"Before adding a cross-module import, run
`node scripts/imports.mjs --can <importer> <target> <Name>`; a cycle
alone is not a blocker (js/ already has an 82-module SCC), a top-level
TDZ read is."* Net hot-pack change: **−7 lines**, read ~2.5× per
iteration, forever.

---

## 7. Recommended package

Ordered by expected saving per unit of risk. Items 1–2 are the
substance; 3–5 are cheap follow-ons.

### 1. Enforce substitution (the actual bottleneck)

Tools alone provably do nothing (§2). The supervisor already has the
exact mechanism: `arm_banned_heal_prompt` writes a one-shot
`NEXT_AGENT_PROMPT.md` consumed by the next iteration. Add a second,
non-halting scan of the finished `.raw`:

- Count avoidable greps by class (`loop-nav-report.mjs --json`).
- If `symbol + cmap + csrc + imports` greps exceed a threshold
  (baseline median is ~40; start the gate at **20**), arm a heal
  overlay naming the classes and the script that answers each.
- **Never halt on it.** This is a nudge, not a gate — a fidelity miss
  must stay the only thing that stops the loop.

Overlay cost ~100 tokens × 176 turns = ~18k. It pays for itself if it
removes **one** call (§4).

### 2. Pointer pre-resolution in the overlay (bounded by §4)

When the popped queue item names a C `file.c:function`, the supervisor
can run `map.mjs --heads`, `csym.mjs --sig`, and `sym.mjs` and inject
**pointers only** — `worm.c:502-519`, `data.md:336-366`,
`js/worm.js:118 exported`. That is ~150 tokens and removes the whole
locate phase. Do **not** inject bodies: §4 makes that a net loss.

### 3. A bookkeeping script

12% of searches (~6/iteration) are `Addressed:` hash filling, queue
archiving, and canary sweeps — pure mechanics with a deterministic
answer. One `scripts/stamp.mjs` doing the whole ritual should remove
**4–6 calls/iteration**. Not built here; it touches the commit
protocol and should be specified by the owner of that protocol.

### 4. Give `turns.md` a generated TOC

`--index` already produces one. Writing it into the head of each map
file makes the first read land on the right range even when the agent
does not call the script.

### 5. Measure, every audit

`loop-nav-report.mjs 40` in the audit iteration, echoed into
`CURRENT.md` Score. The prior proposal specified these metrics; nobody
could compute them. Now they are one call.

### Expected effect

Two numbers, and the gap between them is the whole argument.

**Ceiling.** ~47 greps per iteration are classified avoidable (§2). At
38.8k each that is **1.8M tokens — 29% of a median iteration.** Do not
plan against this number; the classifier over-counts and some of those
greps are the agent legitimately re-reading primary source.

**Conservative, defensible.** Items 1–4 target ~20 calls out of 176:
**~0.8M tokens (−13%)** and **~1.2 min (−8%)** per iteration, with
**zero** change to what gets ported or how it is verified. Plan
against this.

The gap between 13% and 29% is not a tooling question — §2 shows the
tools do not get substituted without a gate. Item 1 is what decides
which end of that range this lands on, and
`loop-nav-report.mjs --blocks` is how you find out within 25
iterations of turning it on.

---

## 8. Explicitly not recommended

- **Graphify in the loop** (§3.1). Additive cost, inferred edges,
  recurring rebuilds.
- **Lower reasoning effort.** ~0.2% of tokens, real fidelity cost.
- **Injecting map sections, C bodies, or graph summaries into the
  prompt.** Fails §4 at any plausible `k`.
- **Halting the loop on a navigation-discipline miss.** Fidelity is
  the only thing worth stopping for.
- **Bulk clone canonicalisation off the back of §6.** G13 settled
  that. §6 corrects a *stated reason*, nothing more.
- **Reducing audit cadence, sampling SHAs, decoupling the suite.**
  Rejected at G13; nothing here reopens it.

---

## 9. Reproducing every number in this note

```bash
node scripts/loop-nav-report.mjs 200 --blocks   # §1, §2 tables
node scripts/loop-nav-report.mjs 40             # per-iteration detail
node scripts/imports.mjs --stats                # 126 modules, 1866 edges, 82-SCC
node scripts/imports.mjs --cycles
node scripts/imports.mjs --can wield.js polyself.js body_part   # §6
node scripts/map.mjs --index                    # 59 sections
node scripts/csym.mjs --callers worm_known      # §5
```

The §6 load test used a scratch copy of `js/` outside the repo; it is
not checked in and left no trace in the tree.
