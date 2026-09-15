# Review 1290 — 90809a8c — invent.c mergable full port + shk.c same_price (D-2324)

Metadata: SHA `90809a8c`, D-2324, Open queue head (row cited 0 blocks). Method: `git show` full `js/` hunks (`js/mkobj.js` +119/−~40, `js/shk.js` +30); C `mergable invent.c:4378-4499` full body + `same_price shk.c:954-981` full body (via `csym.mjs`); `sym.mjs` on `same_price`/`safe_oname`/`Is_candle`/`erosion_matters`/`has_omonst`/`has_omid`/`has_oname`/`ONAME`/`impossible`/`Hallucination`/`Blind`/`mons`; C `is_reviver`/`is_rider mondata.h:161-173`, `unique_corpstat :174`, `Hallucination youprop.h:120`, `MAIL_STRUCTURES global.h:430`, `LOW_PM const` (all read); `imports.mjs --rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify mergable --base 90809a8c~1` re-run.

## Intent vs deliverable

Subject promises: `mergable` rewritten in C order (unpaid/erosion/candle/oil/price/name/mail/artifact/known gates) + new `same_price`, replacing a version that merged stacks C refuses. Diff delivers exactly that, plus the scoreboard commit/at re-stamp (2+2 lines, bookkeeping, no row edits). Promise kept.

## Inventory

- `mergable` (`mkobj.js`): unpaid/spe/no_charge/obroken/otrapped/lamplit block; FOOD arm; dknown/bknown/oeroded/oeroded2/greased; erosion-gated oerodeproof/rknown; corpsenm narrowing; EGG-timed + reviver refusal; candle buckets; POT_OIL; `same_price`; omonst/omid; oname length+content; omailcmd; SCR_MAIL parity; oartifact; known. New local `is_reviver` on file-local `is_rider`.
- `same_price` (`shk.js`): new export on file-local `onbill`/`next_shkp`, bare `impossible()`.
- Import joins only (all verified ALREADY/existing, no new edges): `safe_oname`, `PM_CLERIC`, `LOW_PM`, `Is_candle`, `same_price`, `Hallucination`, `EGG`/`TIN` consts.

## C ↔ JS fidelity

Branch order matches C `:4378-4499` gate-for-gate, including globby-after-how_lost (the old JS had it early — fixed here), the `#if 0` bypass staying out (named, exact), and the final `known` gate. Checked equivalences: (1) `Role_if(PM_CLERIC)` ≡ `urole.mnum == PM_CLERIC` — same formula as `invent.js:1167`, same `monsters_data` import domain ✓. (2) `Is_candle` ≡ TALLOW/WAX (`timeout.js:1324` vs obj.h) ✓; `age/25` truncation ≡ `|0` for non-negative ages ✓. (3) `is_reviver` ≡ `is_rider || mlet==S_TROLL` (`mondata.h:170`) ✓, on file-local `is_rider` ≡ pointer-identity trio (`mondata.h:161-163`) via `mndx` index equality — pre-existing matched local, null-safe (`?.`), probe-exercised. (4) EGG `obj->timed` bit ≡ JS `timed|0` fuse count for the gate ✓. (5) oname: equal-length `!==` ≡ `strlen`+`strncmp` (every unequal shape refuses identically, incl. one-sided-name + CORPSE) ✓. (6) `MAIL_STRUCTURES` is unconditionally `#define`d (`global.h:430`) — the mail-parity arm is live C, correctly ported, not ifdef-dead ✓. (7) `NON_PM` bound (`mkobj.js:117`), `LOW_PM=0`, `LAND` indices valid, `o_id%2` non-negative ✓. (8) FOOD `orotten`: JS separate storage vs C `#define orotten oeroded` (`obj.h:130`) — documented in-comment (D-0923 design, pre-existing); both arms must match on each side, probe-covered. Not a fresh wrong.

`same_price` vs C `:954-981`: two-phase walk (same-shk shortcut, then full scan), `!bp1||!bp2 → impossible` else `shkp=== && price===` ✓. File-local `next_shkp` matches C's walk (DEADMONSTER≡mhp<1, billct gate, rile_shk side effect preserved, index-continuation ≡ nmon-continuation) — CLONE-verified. Bare `impossible()` matches the file's sync convention (`shk.js:847/877/948`); the async display.js export runs its guard/format synchronously, return value unaffected. No STUB in either live arm.

Hallucination-gate choice verified: mkobj.js imports the `display.js:964` export ≡ C `(HHallucination && !Halluc_resistance)` (`youprop.h:120`), same as the invent-family convention — not the sticky-first `do_name.js:252` variant. Correct pick.

RNG walk: no `rn2/rnd/rn1/d` in added lines (fillholetyp-style draws N/A here); `same_price` draws nothing on either side.

Gate detail: globby-after-how_lost restores C order (the old JS had globby before cursed — fixed here). Cursed/blessed/dknown/known compare as `!!`-normalized booleans (C fields are 0/1). `NON_PM` is bound (`mkobj.js:117` = `MON_NON_PM`, −1 — no `ReferenceError` on nullish corpsenm); `LOW_PM=0` (`const.js:3120`); `LAND_MINE=243`/`BEARTRAP=244` verified non-−1. Candle `age/25` truncation ≡ `|0` for non-negative ages. oname edge table: equal-length `!==` ≡ `strlen`+`strncmp`; one-sided-name merges for non-CORPSE, refuses for CORPSE — both sides identical. `o_id%2` non-negative both sides.

`same_price` walk: index-continuation (`nextIdx=i+1`) ≡ C's `nmon`-continuation; DEADMONSTER≡mhp<1, billct gate, and the `rile_shk` scan side effect are all preserved in the file-local `next_shkp` — CLONE-verified. Bare `impossible()` matches the file's sync convention (`shk.js:847/877/948`); the async display.js export runs its guard/format synchronously and the return value is unaffected either way.

## Hallucinations / overclaim

None. The 37/37 hand probe enumerates per-arm results and is disclosed as deleted scratch; vacuous hidden note explicit; `verify --full` 44/44 claim is the mkobj-family rule (this review's end-of-iteration cadence re-runs full `sessions` independently). `adtyp_to_prop` checks FIRE before COLD while C's switch lists COLD first — order-irrelevant pure mapping, same five arms + 0 default, verified.

FOOD design note: JS `orotten` is separate storage (D-0923) while C `#define orotten oeroded` aliases the erosion counter. Both sides refuse on any FOOD mismatch in their arm, and the erosion arm then compares `oeroded` on both sides too — so JS refuses a strict superset only if `orotten` and `oeroded` can disagree, which the `touchfood` writer keeps consistent. Documented in-comment, probe-covered, pre-existing storage design — not a fresh wrong.

## Density

~149 insertions across two functions in one caller/callee cluster (mergable→same_price) — one envelope, one falsifier. Good.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap). Re-measured:

```text
verify mergable: baseline 90809a8c~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
