# Review 1278 — 8fd36dc4 — dig.c dig() occupation residuals: bear-trap rnl(7), fumble steed, drawbridge noun, earth debris (D-2312)

Metadata: SHA `8fd36dc4`, D-2312, C-fidelity residuals (review-18 debts #2/#5; row cited 0 blocks). Method: `git show` full `js/dig.js` hunk (+87/−~30); C `dig.c:299–568` (`dig`) via `csym.mjs` + direct reads of `:332–334` (noun), `:341–355` (fumble), `:393–410` (bear-trap), `:529–534` (debris); `sym.mjs dmgval/body_part/Yobjnam2/uhis/is_db_wall/mon_nam`; remaining-clone read (`js/dig.js:2153–2163`); `hidden-proxy verify dig --base 8fd36dc4~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises four `dig()`-tick arms: bear-trap `rnl(7)` self-hit vs destroy, welded-fumble steed branch with conjugated namers, drawbridge/wall too-hard noun, earth-level debris coming alive.
Diff actually changes (`js/dig.js` only): those four arms plus import joins. Promise kept.

## Inventory

- Bear-trap arm (js/dig.js:1959) — `rnl(7) > (Fumbling()?1:4)` self-hit vs destroy.
- Fumble welded arm (js/dig.js:1902) — `u.usteed` branch, live `Yobjnam2`/`otense`/`mon_nam`.
- Too-hard noun (js/dig.js:1888) — `is_db_wall` ternary.
- Earth debris (js/dig.js:2105) — `Is_earthlevel && !rn2(3)`, `rn2(2)` elemental/xorn, dynamic `makemon`.
- Import joins: `rnl`, `mons`, `monsterNames`, `Yobjnam2`/`otense`, `mon_nam`, `dmgval`, `uhis`, `is_db_wall`, `FOOT` — all onto existing edges; sole new edge `polyself.js body_part` is call-time dynamic.

## C ↔ JS fidelity

Branch-by-branch against pinned C:

1. Bear-trap (`:393–410`): `rnl(7)` FIRST (before any damage calc) ✓; `dmgval(uwep, &gy.youmonst) + dbon()` ≡ `dmgval(uwep, game.youmonst) + dbon()` ✓; `dmg<1→1` else `uarmf→(dmg+1)/2` with `| 0` ✓; `You("hit yourself in the %s.", body_part(FOOT))` ✓; killer `"chopping off %s own %s"` via `uhis()` ✓; `losehp(Maybe_Half_Phys(dmg), kbuf, KILLED_BY)` ≡ `losehp(maybe_half_phys(dmg), …, KILLED_BY)` + the file's `_losehp_needs_done`/`finish_losehp_done` longjmp bridge ✓. Destroy branch keeps `deltrap` + `reset_utrap(TRUE)` ✓; `effort = 0; return 0` both arms ✓.
2. Fumble (`:347–355`): steed ternary and both message templates match C verbatim incl. double space in `"Ouch!  %s and %s you!"`. The re-point off the local clones is a genuine fix: `Yobjnam2_dig` hardcodes `` `${verb}s` `` and `otense_dig` returns the verb raw (`js/dig.js:2157–2163`), which is exactly the "unconjugated hit" C-wrong the message confesses.
3. Noun (`:332–334`): `is_db_wall(dpx,dpy) ? "drawbridge" : "wall"` verbatim ✓.
4. Debris (`:529–534`): `Is_earthlevel && !rn2(3)`, `rn2(2) ? EARTH_ELEMENTAL : XORN`, `makemon(&mons[mndx], dpx, dpy, MM_NOMSG)` → pline only on success; `pline_The("debris…")` ≡ `'The debris…'` ✓. `mons()` takes a PM index (`js/monsters.js:203`); PM consts via `monsterNames.indexOf` (minion.js convention for non-role PMs) ✓. RNG call order (`rn2(3)` then `rn2(2)`) preserved ✓.

Callee closure: `dmgval` (weapon.js:233 sync), `body_part` (polyself.js:538 sync, hoisted — dynamic import TDZ-safe), `Yobjnam2` (objnam.js:2515; the sit.js/wield.js clones flagged by `sym.mjs` are other files' pre-existing clones, untouched here), `uhis`/`is_db_wall`/`mon_nam` all LIVE sync. `Soundeffect` stays named with a draw-free justification matching the apply.js/ball.js precedent. No STUB in a live arm.

Observation (not a Must-fix — pre-existing, untouched arms): the retired clones `Yobjnam2_dig`/`otense_dig`/`yobjnam_dig` still serve the web/rubble/thin-air arms (`:2297/:2353/:2358/:2398`) with the same naive conjugation; if any of those arms reaches a corpus screen they deserve their own row. This SHA narrowed clone use; it did not widen it.

## Hallucinations / overclaim

None. The message is explicit that no live pre-fix probe existed and why (trapped-digging state no harness builds), and the import-smoke substitute is disclosed as such rather than as behavior proof.

## Density

Eighty-seven insertions for four arms of one C function. At the §2b ceiling but one locus family — OK.

## Verification

D-log: clean-tree preflight, import smoke PASS, `verify --fn dig` full PASS with hidden note explicitly vacuous, green 2/2 + strict ×2 + cohort 7/7. Re-measured by this review:

```text
verify dig: baseline 8fd36dc4~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — vacuous-honest, no `--base` debt. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
