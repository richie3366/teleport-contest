# Review 322 — a979a9ac — dokick.c no_kick poly/steed/lizard/uinwater/boulder (D-1362)

## Metadata
- Full / short hash: `a979a9acb367f952d5c2b3a3c06c398dc3ba9d87` / `a979a9ac`
- Parent: `a895ac7e` (D-1361). This file audits **this SHA only** (second of two `js/` commits since review **320**). Archive **Addressed:** D-1362 lacked the short hash; this review commit fills `a979a9ac`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 12:42:04 +0200
- D-id: **D-1362**
- Stats: 12 files, +337 / −176 — `js/dokick.js` +67 / −8 (no_kick chain); `js/steed.js` +86 (kick_steed); `js/apply.js` −30 (delete local clone, dynamic-import the export).
- Claims to close: Open `dokick.c` no_kick poly/steed/lizard/uinwater/boulder (named from D-0786 / reviews **305** / **320**). Not Wounded_legs (already D-0786). `reviews/loop-2026-08-15/` has no unpaid no_kick Must-fix. Review **06** named apply `kick_steed` `He='It'` always.
- JS / map: `dokick.js` `dokick`; `steed.js` `kick_steed`; apply whip `kick_steed_apply` wrapper; `c-js-map/turns.md` + steed.md row. Swallow / pit-brace / Lev after getdir still named. `monverbself` vtense/makeplural named.
- Prior reviews this SHA claims to close: **320** still listed swallow/pit/lev as D-0786-adjacent omits **before** getdir — those C arms are **after** getdir (`:1333–1370`); this SHA names that correctly. **06**’s apply clone is deleted.

## Intent vs deliverable

Git subject promises: “Match C dokick.c dokick so poly, mounted, lizard, swimming, and boulder-cell kicks take the C no_kick chain (and kick_steed) instead of proceeding to getdir after only wounded/utrap/encumber.”

C `dokick` (`dokick.c:1265–1316`): nolimbs/slithy → verysmall → `u.usteed` yn (`ynchars`, `'y'`, `TRUE`) → Wounded_legs → `near_capacity() > SLT_ENCUMBER` → `mlet == S_LIZARD` → `uinwater && !rn2(2)` → `utrap` (TT_PIT `Passes_walls` keep / WEB|BEARTRAP `You_cant` / default silent) → `sobj_at(BOULDER) && !Passes_walls`. Then `no_kick` → `display_nhwindow(WIN_MESSAGE, TRUE)` `--More--` / `ECMD_FAIL`. Steed `'y'` returns `ECMD_TIME` **before** More; `'n'` `ECMD_OK` **before** More.

C `kick_steed` (`steed.c:402–449`): helpless → `mhe` + `highc` + `!rn2(2)` wake/thaw else “does not respond”; else `mtame--`, unleash, `ulevel+mtame < rnd(MAXULEV/2+5)` → `dismount_steed(DISMOUNT_THROWN)`, else gallop `rn1(20,30)`.

Old JS: wounded → generic utrap pit pline → encumber; then getdir. No poly/steed/lizard/water/boulder. Apply had a local `kick_steed` with `He = 'It'`.

The diff **does** port the `:1265–1310` chain in C order, steed yn+`kick_steed` in `steed.js`, and point apply whip at that export. It does **not** port swallow / pit-brace / Levitation **after** getdir (`:1333–1370`). Named. `monverbself` is a `"rouse"` stand-in, not `do_name.c:1221`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dokick` no_kick chain | C `:1265–1310`, **wired** | poly → steed → wounded → encumber → lizard → water → utrap → boulder |
| `kick_steed` | C `steed.c:402–449`, **wired export** | dokick + apply whip |
| `yn_function` | C `cmd.c:5471`, **imported live** | JS 3-arg; C 4th `addcmdq` unused in JS yn (pre-existing getline) |
| `nolimbs` / `slithy` / `verysmall` | C `mondata.h`, **imported live** | `monsters.js` |
| `sobj_at` | C `hack.c`/`mkobj.c`, **clone** | nexthere scan; matches `hack.js` local |
| `Passes_walls()` | C `youprop.h:286`, **clone** | H\|\|E plus `u.Passes_walls` cache; pre-existing in this file |
| `pronoun_gender` / `mhe` | C `mondata.c:1191` / `you.h:322`, **clones** | `PRONOUN_HALLU` ≡ always-hallu `rn2(4)` |
| `helpless_steed` | C `monst.h:251`, **clone** | `msleeping \|\| !mcanmove` |
| `monverbself` | C `do_name.c:1221`, **thin clone** | `"rouse"` + second `pronoun_gender`; vtense/makeplural named |
| `m_unleash` | C `apply.c`, **imported live** | dynamic import (cycle) |
| `dismount_steed` | C `steed.c`, **pre-existing live** | `DISMOUNT_THROWN` |
| `kick_steed_apply` | JS wrapper | no remaining logic clone |
| swallow / pit-brace / Lev | C `:1333–1370`, **named omit** | after getdir |
| kicking-boots `avrg_attrib=99` | C `:1328–1329`, **pre-existing omit** | not this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `uinwater && !rn2(2)` (only that arm); `kick_steed` `rn2(2)` / hallu `rn2(4)` ×1 or ×2 / `rnd(MAXULEV/2+5)` / `rn1(20,30)`.

## C ↔ JS fidelity

Chain order matches `:1265–1310`. Steed yn: C `ynchars` is `"yn"` (`decl.c:113`); JS `'yn'`, default `'y'`. `'y'` → `You kick` + `kick_steed` + `return true` (`ECMD_TIME`). `'n'` / ESC-as-n → `return false` **without** `flush_topl_more` (`ECMD_OK`). `no_kick` still More then false (`ECMD_FAIL`). That ECMD collapse is pre-existing dokick; the More-vs-not split is the C distinction that mattered.

Lizard: C `mlet == S_LIZARD` (`:`). JS `youdata?.mlet === 'S_LIZARD'` matches generated `mlets[]` (not the cmap `:`). Encumber sits **before** lizard/water/utrap; old JS had utrap before encumber. Pit + `Passes_walls` clears `no_kick` (`:1297–1298`). WEB/BEARTRAP: `You_cant("move your %s!", body_part(LEG))` → JS `You can't move your ${body_part(LEG)}!` (`pline.c:403–411`). Default utrap: silent `no_kick`. Boulder: `sobj_at` clone walks `nexthere` like C.

`kick_steed` helpless: C `mhe` (`pronoun_gender` + `PRONOUN_HALLU`) then `highc`; JS same one `rn2(4)` when Hallu. Wake/thaw `!rn2(2)` then re-test helpless → `"stirs"` (still helpless) else `monverbself(..., "rouse")`. C `mon_nam_too(mon,mon)` is a **second** `pronoun_gender(..., PRONOUN_HALLU)` (`do_name.c:1199`). JS second `pronoun_gender` for self matches that RNG. For verb `"rouse"`, `vtense` is `rouses` unless self is `themselves` (`rouse`); JS hardcodes that. When self is `themselves`, C `makeplural`s the subject (`He`→`They`); JS overwrites `subj` to `They`. Hallu mismatch `"He rouses herself"` is C’s two-call design — JS keeps first `He` + second self. **This verb matches.** Full `vtense`/`makeplural` for other verbs is still a named omit, not a silent C-wrong on the kick path.

Apply whip `:3591–3594` now awaits the same export (old `He='It'` clone is gone).

Hallucination check: “Match C `dokick`” while **swallow after getdir is omitted** is an overclaim on **engulfed kicks**. The **no_kick chain and `kick_steed`** are live, not a stub that still falls through to getdir for a snake-poly. Do **not** stamp “Match C `monverbself`.” Do **not** stamp “Match C `u.uswallow` / pit-brace / Lev.” Do **not** stamp “Match C kicking boots 99.”

## Hallucinations / overclaim

Subject says poly/mounted/lizard/swim/boulder take the C no_kick chain instead of getdir after only wounded/utrap/encumber. **True for those arms.** Steed `'n'` does not `--More--`. **False until named for swallow/pit-brace/Lev after getdir.** D-log “Not this iter” is honest. Stamping **Addressed:** D-1362 for `:1265–1310` + `kick_steed` is fair. Do **not** treat fortress PASS as `"Kick your steed?"` or `"You have no legs to kick with."`

## Density

One C function’s no_kick envelope plus the `kick_steed` callee C already calls from that arm (and apply whip). ~150 lines. Playbook §2b caller/callee cluster. Did not glue `obj_delivery` (different function, next Open). Duplicate `pronoun_gender` (also in `fountain.js`) is extra clone weight, not a second subsystem. Right size. D-1361’s thin remap plus this cluster in two consecutive peels is the queued map, not a glued hypothesis.

## Branch-by-branch confirm

1. nolimbs/slithy: no-legs pline, More, fail. Match `:1265–1267`.
2. verysmall (and has legs): too-small. Match `:1268–1270`.
3. `u.usteed` `'y'`: kick pline + `kick_steed`, TIME, no More. Match `:1272–1275`.
4. steed `'n'`: OK, no More. Match `:1276–1278`.
5. wounded after poly/steed: `legs_in_no_shape` then More. Match `:1279–1281` (D-0786).
6. encumber before lizard: heavy-load pline. Match `:1282–1284`.
7. `mlet` lizard: ineffective legs. Match `:1285–1287`.
8. `uinwater && !rn2(2)`: slow-motion, consumes `rn2(2)` only on this arm. Match `:1288–1290`. Swim keep-path (`rn2==1`) continues to utrap/boulder.
9. TT_PIT `!Passes_walls`: not-enough-room-down-here. Match `:1294–1296`.
10. TT_PIT `Passes_walls`: `no_kick=false`, proceed to getdir. Match `:1297–1298`.
11. TT_WEB / TT_BEARTRAP: can't move LEG. Match `:1300–1302`. Constants match `you.h:347–349`.
12. other utrap: silent no_kick. Match `:1304–1305`.
13. boulder `!Passes_walls`: not-enough-room-in-here. Match `:1307–1309`.
14. helpless steed `rn2(2)` miss: `"does not respond"`. Match `:430–431`.
15. helpless wake still helpless: `"stirs"`. Match `:424–425`.
16. helpless wake then free: `"He rouses himself!"` / hallu they. Match `:429` for this verb.
17. tame gallop vs thrown dismount: `rnd` then `rn1`. Match `:440–448`.
18. swallow after getdir: JS comment skip. Named. **Would** burn `rn2(3)` in C.
19. **Public-unhit** unless a session kicks while poly’d, mounted, lizard, swimming, or on a boulder.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `'S_LIZARD'` is the JS mlet encoding, not a recorded glyph. `yn_function` is live getline, not a canned key list. Plain ESM. Dynamic `import('./apply.js')` is cycle avoidance, not Node `fs`.

## Verification

Journal: private canary **60**/60 (C/JS order; live slithy/nolimbs/verysmall/lizard/pit/web/beartrap/boulder; poly-before-wounded; Passes_walls pit/boulder keep; steed `n`; `kick_steed` mtame/gallop/helpless; uinwater `rn2(2)`; Rule #2); green+strict seed8000/0900; focused seed0060; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383 + seed0060. **Public-unhit** on this chain. This audit cadence: full `sessions` at HEAD `a979a9ac` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. seed0060 PASS is not a poly/steed kick.

## Actionable C-wrongs

None for Must-fix. The no_kick `else if` ladder matches `:1265–1310` branch order and RNG (`!rn2(2)` only on the water arm). `kick_steed` matches `:402–449` including helpless/tame/unleash/dismount/gallop; the `monverbself` stand-in matches **this** `"rouse"` path’s two HALLU rolls. Swallow/pit-brace/Lev are named omits of a **later** region (`:1333–1370`), already distinct from this queue row.

Named omits (map / Open, not Must-fix):

1. swallow `rn2(3)` / pit-side kick / Levitation brace (`dokick.c:1333–1370`)
2. `monverbself` full `vtense`/`makeplural` (`do_name.c:1221–1248`) — not the `"rouse"` kick path
3. `obj_delivery` stolen_booty / `mksobj_migr_to_species` (next Open, D-1177)
4. kicking-boots `avrg_attrib = 99` (`:1328–1329`, pre-existing)
5. JS `yn_function` `addcmdq` 4th arg (`cmd.c:5496`, pre-existing getline)

Do not Must-fix “steed `'n'` should `--More--`” (C `ECMD_OK` skips it). Do not Must-fix “utrap before encumber” (C encumber first). Do not Must-fix “`He = 'It'` on apply whip” (clone deleted). Do not Must-fix “wake on declined peaceful” (different function).

## Callers / RNG ledger

C dokick no_kick: RNG only `uinwater && !rn2(2)`. C `kick_steed`: `rn2(2)` / hallu `rn2(4)` ×(1 stirs / 2 rouse) / `rnd` / `rn1`. JS same on those paths. Swallow `rn2(3)` still not burned. Public fortress is not a mounted/poly kick.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: no_kick now follows C `:1265–1310` and `kick_steed` is the live steed.c body; swallow/pit-brace/Lev after getdir stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1362 `a979a9ac`.
