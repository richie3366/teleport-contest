# Review 749 — 45f35a52 — dungeon.c lev_by_name (D-1780)

## Metadata
- Full / short hash: `45f35a5240e0127b31e0bf1dc1808da1ebc6198d` / `45f35a52`
- Parent: `e8515402` (D-1779). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 19:18:05 +0200
- D-id: **D-1780**
- Stats: `js/dungeon.js` +140/−3; `js/teleport.js` +14/−9. Total `js/` insertions **154** ≤250. Band **150–350**.
- Claims to close: Open `teleport.c` `lev_by_name` (the function lives in `dungeon.c`; `teleport.c:1248` is the only caller). Not Nowhere ynq. Not Quest/mines/sanctum clamp.
- JS / map: `dungeon.js` `lev_by_name` + `find_branch` pd==NULL; `teleport.js` `level_tele`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1780 `45f35a52`.

## Intent vs deliverable

Git subject promises: Match C `dungeon.c` `lev_by_name` so the level-teleport prompt accepts a level name, instead of answering 0 to everything but a number.

`node scripts/csym.mjs lev_by_name` → `dungeon.c:2097–2170`. `--callers`: `teleport.c:1248` only. `find_branch` `:310–337`. `dlev_in_current_branch` macro `:2087–2092`.

Parent: `level_tele` used `/^-?\d+$/` else 0. The diff **does** port `lev_by_name` whole, add C’s `pd==NULL` `find_branch` arm, wire `:1248` name-then-atoi, keep the load-bearing gehennom/hell → valley rewrite. It **does not** port Nowhere ynq, the deepest clamp / invoked gate, `print_dungeon(FALSE)`, or `debug_fuzzer`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `lev_by_name` | LIVE new | `:2097–2170` |
| `find_mapseen_by_str` | LIVE new, local | C `staticfn` |
| `dlev_in_current_branch` | LIVE new, local | same-dnum **or** valley↔medusa |
| `find_branch` pd==NULL | LIVE repaired | end2 dname; both ledger VISITED |
| `level_tele` parse | LIVE repaired | `:1248–1249` |
| Nowhere `ynq` | OMIT named | |
| Quest/mines/sanctum clamp | OMIT named | |
| `on_level` | not this SHA | |

`node scripts/sym.mjs`:

```
lev_by_name      js/dungeon.js:792   sync
find_branch      NOT EXPORTED — 1 LOCAL js/dungeon.js:266
find_mapseen_by_str NOT EXPORTED — 1 LOCAL
dlev_in_current_branch NOT EXPORTED — 1 LOCAL
ledger_visited   NOT EXPORTED — 1 LOCAL
wizard_mode      NOT EXPORTED — 5 LOCAL CLONES — Do NOT write #6
find_level       js/dungeon.js:854   sync
In_V_tower       js/const.js:3175   sync
VISITED          js/const.js:1099   sync
```

`--can teleport.js dungeon.js lev_by_name`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**. No RNG in `lev_by_name`.

## C ↔ JS fidelity

**Normalisation order (`:2108–2134`).** Custom `#annotate` via `find_mapseen_by_str` first; else strip `"the "` / trailing `" level"`; aliases; `find_level`. **Match.**

**gehennom / hell → valley — LOAD-BEARING, present.** Bare `"gehennom"` would `find_branch` the Gehennom dungeon and from Doom keep **castle**. Rewrite to `"valley"` makes `find_level` hit proto valley. `In_V_tower` rewrites to `" to Vlad's tower"` (leading space is load-bearing). Delphi → `"oracle"`. **Match. Without this rewrite the branch arm is wrong.**

**`dlev_in_current_branch` (`:2087–2092`).** Same `dnum`, or valley↔medusa. **Match.** Do not stamp “can name your way into another dungeon.”

**Wizard-or-VISITED, both ledger ends.** Specific level: one ledger. Branch: **both** `idx` (end2) **and** `idxtoo` (end1). JS `ledger_visited` uses exact `=== VISITED`. **Match both gates.**

**`find_branch` pd==NULL (`:322–334`).** Match `dungeons[end2].dname` case-insensitively, or ignore a leading `"The "` on the **dname**. Pack `(end1<<8)|end2`. Only `lev_by_name` passes `null`. **Match.**

**Caller (`teleport.c:1248–1249`).** `newlev = lev_by_name(buf); if 0 then atoi`. JS leading-digits `/^\s*(-?\d+)/` replaces the parent whole-string `/^-?\d+$/`. **Match the C else-if.** Minor: C `atoi("+8")==8`; JS regex does not take a leading `+`. Not a realistic prompt.

**`find_mapseen_by_str` first.** Custom `#annotate` wins over proto names. JS the same. **Match.** Do not let `find_level` steal an annotated string.

**Branch both-ends VISITED.** `idx` is end2, `idxtoo` is end1 (`(idx>>8)&0xff`). Wizard bypasses; otherwise **both** ledgers must be `=== VISITED`. Prefer the end whose `dnum` matches `u.uz`. **Match.** Gating a branch on only one ledger would be a C-wrong; this SHA does not.

**Callee closure.** LIVE: `find_mapseen_by_str`, `find_level`, `find_branch` null arm, `ledger_no`, `In_V_tower`, `VISITED`. OMIT named: Nowhere, clamps, `print_dungeon(FALSE)`, `debug_fuzzer`. STUB: **none**. No RNG in `lev_by_name`.

## Hallucinations / overclaim

Subject “accepts a level name instead of answering 0” is true for the helper and `:1248`. Do **not** stamp “Match C Nowhere ynq.” Do **not** stamp “Match C Quest/mines/sanctum clamp.” Probe table is verification, not JS hardcodes. No public session teleports by name — **public-unhit**.

## Density

§2b: one C helper + the `find_branch` arm that exists solely for it + the one C caller. +154. Did **not** glue Nowhere / clamps.

## Verification

D-log: save-oracle skip; green+strict; 44/44; `init_dungeons()` name/gate probe. Public-unhit. This audit re-read `dungeon.c:2097–2170` and the gehennom rewrite.

## Actionable C-wrongs

None for Must-fix. Named: Nowhere `ynq` (`:1257`); Quest·mines·sanctum deepest + invoked (`:1393–1412`); `print_dungeon(FALSE)`; `debug_fuzzer`. Do **not** drop the gehennom/hell rewrite. Do **not** VISITED-gate a branch on only one ledger end. Do **not** write `wizard_mode` clone #6.

**Pinned-C walk this overlay.**
`csym.mjs lev_by_name` → `dungeon.c:2097–2170`.
`--callers`: `teleport.c:1248` only.
`find_mapseen_by_str` first; else strip `"the "` / trailing `" level"`;
`gehennom`/`hell` → `valley` (or `" to Vlad's tower"` when
`In_V_tower` — leading space is load-bearing); Delphi → `oracle`;
`find_level`.
Branch arm: `find_branch(nam, NULL)` packs `(end1<<8)|end2`;
wizard **or both** ledger ends `=== VISITED`;
prefer the end whose `dnum` matches `u.uz`;
then `dlev_in_current_branch` (same dnum **or** valley↔medusa).
HEAD `js/dungeon.js:792–851` walks that order.
Caller: name then `atoi`. No RNG. Public-unhit.

Verdict: **ACCEPT-WITH-DEBT**
