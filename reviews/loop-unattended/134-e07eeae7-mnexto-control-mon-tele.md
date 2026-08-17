# Review 134 — e07eeae7 — mon.c `mnexto` `control_mon_tele` savemm (D-1173)

## Metadata
- Full / short hash: `e07eeae77d6f6c9caeb1ff3bc729092c4b45fe81` / `e07eeae7`
- Parent: `c1dec752` (review **130–133** + cadence #1490). This file audits **this SHA only**. Archive row **Addressed:** D-1173 `e07eeae7` was filled by D-1174.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 19:42:16 +0200
- D-id: **D-1173**
- Stats: 11 files, +125 / −46 — `js/mon.js` +18 / −3 (`mnexto` telecontrol arm + import); `js/teleport.js` comments only.
- Claims to close: Open queue `mon.c` `mnexto` `control_mon_tele` (named). Not rloc. Review **133** named `mon.c:3974–3978`. Review **83** named the `mnexto` caller as distinct from `rloc` via_rloc TRUE. `reviews/loop-2026-08-15/` has no open mnexto-telecontrol Must-fix.
- JS / map: `mon.js` `mnexto`; callee `teleport.js` `control_mon_tele` (D-1122). `c-js-map/turns.md` `mnexto`. OPTIONS=`montelecontrol` doset, vanish-msg, `RLOC_ERR`, `mnearto` overcrowding still named.
- Prior reviews this SHA claims to close: **133** next Open; **83** / **132** named `via_rloc` FALSE.

## Intent vs deliverable

Git subject promises: “Match C mon.c mnexto so wizard-mode montelecontrol can pick the dest via control_mon_tele and restore the enexto spot on cancel, instead of always placing at the derived cell.”

Old JS after successful `enexto` jumped to `rloc_to_flag`. C `mon.c:3974–3978`, when `iflags.mon_telecontrol` is set, calls `control_mon_tele(..., FALSE)` and restores a coord copy of the enexto result if that returns FALSE — so a cancelled getpos or a hero-cell pick cannot stick even if the player would answer y to force.

The diff **does** that arm: `if (game.iflags?.mon_telecontrol)` copy `{x,y}`, `await control_mon_tele(mtmp, mm, rlocflags, false)`, restore savemm on FALSE, then the existing `rloc_to_flag`. It does **not** parse OPTIONS= into doset, change `rloc`’s via_rloc TRUE caller, or port vanish-msg / `RLOC_ERR`. Named. Default Off: public `mnexto` still enexto → `rloc_to_flag`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mnexto` telecontrol arm | C body, **new** | `mon.c:3974–3978` |
| `control_mon_tele` | C callee, **imported** | `teleport.c:1898–1934`; D-1122; **not a stub** |
| `enexto` / `rloc_to_flag` | C callees, **pre-existing** | before / after the new if |
| `deal_with_overcrowding` | C callee, **pre-existing** | failed enexto; D-1148 |
| steed `mx=u.ux` early return | C arm, **untouched** | `:3959–3964` |
| savemm coord copy | C local, **new** | struct copy, not alias |
| via_rloc FALSE → `goodpos` | C branch, **live** | not `rloc_pos_ok` (that is rloc) |
| OPTIONS= doset `montelecontrol` | C caller, **named omit** | iflags may be set directly |
| `rloc` via_rloc TRUE | C sibling, **untouched** | D-1122; `mx!=0` gate stays there |
| vanish-msg / `RLOC_ERR` | C body, **named omit** | Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dest is live `mm` from enexto or getpos, not a traced cell. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none when Off (public). When On+wizard: `getpos` keys, then either `goodpos` (no RNG) or force `y_n`. Path **public-unhit** on wizard `montelecontrol`. Cadence fortress is not a telecontrol proof.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not restore “always enexto cell” when the flag is On. Do not gate the caller on wizard or `mx!=0` (C does not; wizard is inside the callee). Do not pass `true` (that would `rloc_pos_ok` / “Picking random”). Do not pull vanish-msg into this peel.

## C ↔ JS fidelity

### Envelope vs `mon.c:3955–3982`

C: steed sync return; `enexto(&mm, u.ux, u.uy, mtmp->data)` or `!isok` → overcrowding return; then the telecontrol if; then `rloc_to_flag(mtmp, mm.x, mm.y, rlocflags)`.

JS (`mon.js:1290–1312`): null-guard (JS-only); steed `mx/my = u.ux/uy`; `enexto(mm, …)` or `!isok_xy` → overcrowding; this SHA’s if; `rloc_to_flag`. Match the claimed slot. Failed enexto never reaches telecontrol (C same — the if is after that return).

### Arm vs `:3974–3978`

C:

```
if (iflags.mon_telecontrol) {
    coord savemm = mm;
    if (!control_mon_tele(mtmp, &mm, rlocflags, FALSE))
        mm = savemm;
}
```

JS: `game.iflags?.mon_telecontrol`; `savemm = { x: mm.x, y: mm.y }`; await callee with `false`; restore fields on FALSE. C `coord savemm = mm` is a **value** copy. JS copies scalars, not `savemm = mm` (that would alias and make restore a no-op after getpos mutated `mm`). Match. Canary: cancel / hero-cell must leave `mm` at the enexto cell.

Caller does **not** test `wizard` or `mtmp->mx`. C comment: enexto `mm` is the default; savemm exists so the player cannot choose the hero cell and then y-force it. `control_mon_tele` itself returns FALSE on `!wizard || !iflags.mon_telecontrol` without mutating a valid `mm` — restore is then a no-op. JS callee same (`flags.debug || flags.wizard`, D-0576). Match.

### Callee vs `teleport.c:1898–1934`

`control_mon_tele(..., FALSE)`:

1. If `!isok(cc_p)` fill from `mon->mx/my` then hero. Enexto just wrote a valid adjacent cell — this arm is for rloc’s `mx==0` more than mnexto. JS still has it (pre-existing).
2. `!wizard || !mon_telecontrol` → FALSE.
3. pline / `getpos` / `!u_at`.
4. `via_rloc ? rloc_pos_ok : goodpos(..., rlocflags)`. **FALSE → goodpos**, not the shop/priest room lock.
5. Else force `y_n` unless `debug_fuzzer`; y → TRUE (even hero-adjacent STONE).
6. Else pline `"Using derived" destination.` → FALSE.

JS (`teleport.js:1107–1136`) is that function. **Not** “Match C dispatch, callee is a stub”: D-1122 already shipped getpos / `rloc_pos_ok` / `goodpos` / `yn_function` / `noit_mon_nam`. This SHA only **calls** it with FALSE and restores savemm.

`goodpos` 4th arg is C’s `rlocflags` (RLOC_MSG=0x02 happens to equal `MM_NOWAIT`). C does that. JS does that. `goodpos` does not use `MM_NOWAIT`. Not a JS invention.

Cancel / ESC / `.` on hero: getpos `< 0` or `u_at` → skip the ok/force arms → FALSE → savemm. C comment’s whole point. Match. rloc’s caller (`:1175–1177`) still requires `mx!=0` and via_rloc TRUE — this SHA’s comment-only `teleport.js` hunk restates that split. Do not collapse them.

### Steed is not this arm

C `:3959–3964` returns before enexto. JS same. `rloc(usteed)` → `tele()` is D-1172, a different function. Canary: `mnexto(usteed)` still syncs coords, no getpos.

| Case | C | JS after |
|------|---|---------|
| flag Off (public) | enexto → `rloc_to_flag` | **same** |
| flag On, not wizard | callee FALSE, savemm no-op | **same** |
| wizard cancel / hero cell | restore enexto `mm` | **same** |
| wizard goodpos dest | `mm` mutated, place there | **same** |
| wizard force y | TRUE even if !goodpos | **same** |
| failed enexto | overcrowding, no getpos | **same** |
| `rloc` Wizard / 50-try | unchanged | **same** |

### Callers of `mnexto`

C `mnexto` is not only wizard telecontrol. Live callers include appear-next-to-hero (`RLOC_MSG` / `STRAT_APPEARMSG`, D-0928 #1128), failed-enexto overcrowding (D-1148), and various summon/return paths. This SHA does not change those: Off skips the new if. `maybe_mnexto` (`mon.c:3998`) is a different function (accessible dest) and was not touched.

`rloc` still gates telecontrol on `iflags.mon_telecontrol && mx` and passes TRUE (`teleport.js:1175–1177` / C `:1833–1841`). A wizard `mnexto` of an off-map mon (`mx==0`) still prompts (C mnexto has no mx gate; canary). Do not copy rloc’s mx gate here.

## Hallucinations / overclaim

D-log / CURRENT / subject say wizard-mode `montelecontrol` can pick the dest via `control_mon_tele(..., FALSE)` and restore savemm on cancel, instead of always placing at the enexto cell. **That is the hunk:** one if after enexto. Stamping **Addressed:** D-1173 is fair for the Open **mnexto** line. Hash `e07eeae7` is on the archive row (filled by D-1174). Do **not** stamp it as “Match C OPTIONS= doset” or “Match C vanish-msg” or “mnexto now uses `rloc_pos_ok`.” This is **not** “Match C dispatch, callee is a stub”: `control_mon_tele` is D-1122.

Do not claim public `mnexto` RNG changed. Default Off skips the callee before getpos.

## Density

One C if plus the savemm copy the Open item named. ~15 JS lines of behavior (comments extra). Thin vs §2b “one deferred `if`,” but the queue item is exactly that wire (not `rloc`, not doset). Callee already existed. Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **38**/38 (C/JS order; via_rloc FALSE; savemm copy not alias; no wizard/mx gate at caller; default Off; On without wizard; steed sync; wizard `.` / ESC / hero restore savemm; STONE force y/n; mx==0 still prompts; rloc still rnd; thenable; getpos consumes `.`; no fs/FORCE); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/0373/0002/0700/0015/0116/0106. Path **public-unhit** on wizard `montelecontrol`.

C read of `mon.c:3955–3982`, `teleport.c:1898–1934`, `rloc` `:1175–1177` (not this SHA); JS SHA `mnexto` + import. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1495**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — Off no-op did not desync the fortress.

## Actionable C-wrongs

None that Must-fix this next iter. The Open mnexto call matches `mon.c:3974–3978`. Callee is real. savemm is a copy.

Named omits / do-nots (map / Open, not Must-fix):

1. OPTIONS=`montelecontrol` doset page (iflags may be set directly).
2. telemsg “vanishes and reappears” / ustuck-together. Open.
3. `RLOC_ERR` `impossible()`. Open.
4. `mnearto` overcrowding (D-1148 named).
5. Do not restore always-enexto when the flag is On. Do not gate the caller on wizard/`mx`. Do not pass via_rloc TRUE from `mnexto`. Do not pull `mdisplacem` into this SHA — **Addressed:** D-1174 `e5ec6685`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `mnexto` now calls real `control_mon_tele(..., FALSE)` after enexto and restores a coord copy on cancel, matching C `:3974–3978`, while public Off and `rloc` via_rloc TRUE stay as they were.
- Must-fix stays empty for this SHA; next port in this window popped Open `mdisplacem`. **Addressed:** D-1173 `e07eeae7`. Not rloc, not doset.
