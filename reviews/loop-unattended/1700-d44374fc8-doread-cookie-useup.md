# Review 1700 — d44374fc8 — `read.c` doread cookie consume via live `useup` (D-2741)

Metadata: commit `d44374fc8`, D-2741, `js/read.js` only (+4/−1). Must-fix from review 1688 (QUALITY-RISK on D-2729). Claims to close that review. 0 corpus sessions read a fortune cookie.

## Intent vs deliverable

Subject promises: the FORTUNE_COOKIE arm consumes via live `useup` (`invent.c:1320–1333`), not the `js/read.js:260` clone. The diff does exactly that: `useup(scroll)` → `useup_live(scroll)` plus a C-cite comment. Promise matches deliverable. No other arm of `doread` is touched.

## Inventory

Changed JS: one call site inside `doread` (`js/read.js:2207`). No new function, no deleted symbol, no new import. `useup_live` is the existing alias `import { useup as useup_live }` at `js/read.js:107`. The local `function useup` at `:260` remains for other call sites (named in the map line this commit extends).

## Callee closure

Required `sym.mjs` (the re-pointed name; the alias itself is not a declared symbol):

```text
useup            js/invent.js:4596   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/detect.js:215  js/potion.js:331  js/read.js:260  js/spell.js:625
useup_live       NOT FOUND in js/** (no export, no local function/const).
```

`useup_live` is the import alias of that export. `node scripts/imports.mjs --can js/read.js js/invent.js useup` → `ALREADY` (no new edge). The cookie site now calls the sync export bare, which matches `sym` (not async). The `:260` clone is no longer on this arm. LIVE.

## C ↔ JS fidelity

C loci: `doread` cookie arm `read.c:365–377` (body `read.c:329–647` via `csym`); `useup` `invent.c:1320–1333`. Callers of `doread`: `csym --callers` reports only the `cmd.c:77` extern (command-table dispatch, no direct call). This commit does not rewire callers.

Cookie arm, unchanged except the consume call (review 1688 already walked the rest):

- `flags.verbose` → `You("break up the cookie…")` ✓
- `outrumor(bcsign(scroll), BY_COOKIE)` awaited ✓
- `!Blind` then literate post-increment with the first-read livelog ✓ (JS splits the C `uconduct.literate++` into test-then-add; same result)
- `return ECMD_TIME` as `return 1` ✓ (file convention)

Consume call now matches C `useup`:

```4596:4604:js/invent.js
export function useup(obj) {
    if (obj.quan > 1) {
        obj.in_use = false;
        obj.quan--;
        obj.owt = weight(obj);
        update_inventory();
    } else {
        useupall(obj);
    }
}
```

That is `invent.c:1320–1333` (quan>1: `in_use=FALSE`, `quan--`, `weight`, `update_inventory`; else `useupall`). The clone review 1688 named (dropped `update_inventory`, bare invent splice instead of `setnotworn`/`freeinv`/`obfree`) is off this path. No RNG on the changed line.

## Hallucinations / overclaim

The D-log's screen quote for scen-normal-Tourist-92061 shortens the JS side (omits `A map coalesces in your mind!`). The classification is accurate: still `doread` at step 17, unchanged, 0 worse — not sold as PASS. "Named: remaining local-clone `useup` sites" matches `sym` (clone still at `js/read.js:260`) and the map line. No FORCE/DIAG/seed/coordinate/`fastforward` in the hunk. Rule #2 clean (`imports.mjs --rulecheck`).

## Density

Must-fix, one call site, one module. Below the 200-line port target because the row was a one-line callee wiring, which §2b allows for Must-fix alone. Not a failed density handoff.

## Verification

Re-measured (`--base d44374fc8~1 --reach-all`) — both lines. The parent scoreboard is `acefaa812`. Not vacuous: one real block, and the D-log does not call it PASS.

```text
verify doread: baseline d44374fc8~1 (scoreboard at acefaa812) — 1 session(s) blocked on it (1 at baseline, 1 in the working scoreboard)
  scen-normal-Tourist-92061: still doread at step 17: C«As you pronounce the formula on it, the scroll disappears.--More--» J«As you read the scroll, it disappears. A map coalesces in your mind!--More--»
verify doread: 0 PASS, 0 moved past, 1 unchanged, 0 worse → NO MOVEMENT
smoke doread: no RNG-tagged reach; fixed smoke spread (24 run, 3.0s): 24 PASS, 0 regressed → REACH-OK
```

The leftover is the pre-existing Blind-vs-sighted scroll formula (`read.c:622` "pronounce" vs JS "you read"), identical at the parent. This one-line cookie change does not touch that arm. 0 REGRESSED. Green/strict/cohort claimed in the D-log; this commit changes one non-shared file.

## Actionable C-wrongs

None. The review-1688 cookie clone is fixed. Other `useup` clones and the deferred shirt/credit/marker/coin/orb/candy arms stay named in `docs/c-js-map/turns.md` (D-2741 line), not new C-wrongs of this SHA.

Verdict: **ACCEPT**
