# Review 504 — caae0b20 — makemon.c set_mimic_sym furnsyms real S_* (D-1543)

## Metadata
- Full / short hash: `caae0b20cab3e0794602be62982fc99fb1b5cca2` / `caae0b20`
- Parent: `e5188ba2` (D-1542). This file audits **this SHA only** (fourth of nine `js/` commits since review **500**). Archive **Addressed:** D-1543 `caae0b20`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 09:03:33 +0200
- D-id: **D-1543**
- Stats: 10 files, +253 / −210 — `js/makemon.js` +21 / −11 (journal rotate inflates docs). Band 150–350 (js/ insertions 21).
- Claims to close: Open `makemon.c` `set_mimic_sym` furnsyms (named from D-1542 / review **497**). Not door `S_hcdoor`. `reviews/loop-2026-08-15/` has no unpaid furnsyms Must-fix.
- JS / map: `makemon.js` `MIMIC_FURNSYMS` / `set_mimic_sym`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **497** named real S_*; **486** TEMPLE altar already live.

## Intent vs deliverable

Git subject promises: ordinary-room furniture mimics use real `S_upstair`/`S_dnstair`/`S_altar`/`S_grave`/`S_throne`/`S_sink` cmap ids, not stub 0..5.

Pinned C `makemon.c` `set_mimic_sym` `:2490–2497`. `syms[]` `:2386–2389` two leading `MAXOCLASSES`. `hack.h` `ROLL_FROM` = `array[rn2(SIZE)]`. `defsym.h` PCHAR: `S_upstair=25`, `S_dnstair=26`, `S_altar=33`, `S_grave=34`, `S_throne=35`, `S_sink=36`. Altar amask `:2538–2542` (D-1525). Shop `:2483–2484` `syms[rn2(SIZE-2)+2]` skips the two `MAXOCLASSES` so shops never take furnsyms.

```2490:2497:nethack-c/upstream/src/makemon.c
        if (s_sym == MAXOCLASSES) {
            static const int furnsyms[] = {
                S_upstair, S_upstair, S_dnstair, S_dnstair,
                S_altar, S_grave, S_throne, S_sink
            };

            ap_type = M_AP_FURNITURE;
            appear = ROLL_FROM(furnsyms);
```

Old JS: `MIMIC_FURNSYMS = [0,0,1,1,2,3,4,5]` (S_stone…S_brcorner); length already 8 so `rn2(8)` matched; values did not. Furnsyms altar `appear===2` never hit `S_altar=33` Align2amask.

The diff **does** replace the table with the eight cmap ids and local `S_*` constants. It **does not** port Protection_from_shape_changers, `block_point`, DELPHI `S_fountain`, nocorpse/hatch/tin Plan-B, `flags.made_fruit`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `furnsyms[]` | C `:2491–2494`, **LIVE this SHA** | values, not just length |
| `ROLL_FROM(furnsyms)` | C `:2497`, **LIVE** | `rn2(8)` unchanged |
| `S_upstair`…`S_sink` | C `defsym.h`, **CLONE** constants | 25/26/33/34/35/36 |
| altar amask | C `:2538`, **LIVE** | now reachable from furnsyms |
| shop skip MAXOCLASSES | C `:2484`, **LIVE** | `length-2+2` |
| DELPHI fountain | C, **STUB named** | `appear=0` |
| `block_point` | C `:2548`, **OMIT named** | **NOT FOUND** in js/** |
| Protection early-out | C `:2401`, **OMIT named** | |

`node scripts/sym.mjs set_mimic_sym Align2amask block_point`:

```
set_mimic_sym    js/makemon.js:2546   sync
Align2amask      js/const.js:183   sync
block_point      NOT FOUND in js/**
```

No symbol deleted/re-pointed. Table rewrite only.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (same `rn2(8)`).

## C ↔ JS fidelity

Ids. JS `25,25,26,26,33,34,35,36`. **Match `defsym.h` and C `furnsyms[]`.** Appear is a **cmap** index, not `levl.typ` (ROOM=25 coincidentally equals `S_upstair`). **Match the comment in C-JS-MAP.**

Roll. `MIMIC_FURNSYMS[rn2(length)]` with length 8 ≡ `ROLL_FROM`. **Match `:2497`.** Ordinary `ROLL_FROM(syms)` still two `MAXOCLASSES` then classes then two `S_MIMIC_DEF`. **Match `:2386–2489`.** Shop still `rn2(len-2)+2`. **Match `:2484`.**

Altar arm. `ap_type===M_AP_FURNITURE && appear===S_altar` → `rn2(3)-1` then `(hellish && rn2(3)) ? AM_NONE : Align2amask`. Furnsyms `S_altar` (index 4 of 8) now equals 33, so this arm runs. Stairs/grave/throne/sink take the stale-`mcorpsenm` NON_PM else. **Match `:2538–2546` for those shapes.** TEMPLE still hard `S_altar` (D-1525). Door still `S_hcdoor` (D-1536).

DELPHI. `rn2(2)` statue else `appear=0`. C is `S_fountain=37`. **Still stub. Named. Open queue row exists.**

Callee closure (furnsyms arm). LIVE: table, `rn2`, altar `Align2amask`. CLONE: `S_*` literals matched here. OMIT named: `block_point` (absent), Protection, DELPHI fountain, Plan-B. STUB: DELPHI only, **not this arm**. **The furnsyms arm may ship.** Do **not** stub furnsyms as 0..5 again.

## Hallucinations / overclaim

Subject real S_* not 0..5: **true.** D-log “furnsyms altar now hits Align2amask”: **true** (`appear===33`). Stamping **Addressed:** D-1543 is fair for **the table**. Do **not** stamp “Match C `S_fountain`.” Do **not** stamp “Match C `block_point`.” Do **not** restamp door/TEMPLE. This is **not** “dispatch ported, callee stubbed.”

## Density

+21 JS: eight cmap ids + comments. C is the array. §2b “unless C is that small.” Did not glue `that_is_a_mimic`.

## Branch-by-branch confirm

1. Ordinary `s_sym==MAXOCLASSES`: furniture from the eight ids. **Match.**
2. `rn2(8)===4`: `S_altar` + amask. **Match.**
3. Stairs: 25/26, then NON_PM stale clear. **Match.**
4. Shop: never furnsyms. **Match.**
5. TEMPLE / door: unchanged. **Match.**
6. DELPHI fountain: still 0. **Named.**

## Callers / RNG ledger

C: `makemon` S_MIMIC, dosdoor, `m_restartcham`/`restrap`, zap heal. Same `rn2` count as before. Public-unhit (no public look at ordinary furniture cmap). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Local `S_*` not imported from display (values match `defsym.h`).

## Verification

D-log canary **16**/16 (grep; every S_*; no stub 0..5; furnsyms altar amask off-hell; stairs NON_PM; hellish AM_NONE; TEMPLE; door S_hcdoor; DELPHI stub named; Rule #2); green+strict; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: Protection early-out; `block_point`; DELPHI `S_fountain`; nocorpse/hatch/tin Plan-B; `flags.made_fruit`.

Verdict: **ACCEPT-WITH-DEBT**
