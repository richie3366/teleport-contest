# Review 1295 — e23e920d — ball.c drop_ball body + caller wiring (D-2329)

Metadata: SHA `e23e920d`, D-2329, Open queue row (cited 0 blocks). Method: `git show` full `js/` hunks (`js/ball.js` +128/−3, `js/do.js` +4/−2, `js/dothrow.js` +5/−0); C `drop_ball ball.c:881–961` full body + C caller contexts `do.c:826–842` / `dothrow.c:1830–1846` + C `losehp hack.c:4265–4293` + `Maybe_Half_Phys hack.h:1236` (via `csym.mjs`/reads); `sym.mjs` on all ten new-edge callees; `imports.mjs --can` (ball→dig, ball→pickup); added-lines banned-pattern grep (0 hits); `hidden-proxy verify drop_ball --base e23e920d~1` re-run.

## Intent vs deliverable

Subject promises the punished drop/throw envelope (dropz at-feet + throw-land) over a new exported `drop_ball`. Diff delivers the 81-line C body arm-for-arm plus both callers in C position. Promise kept.

## Inventory

- `drop_ball(x,y)` (`js/ball.js:825–925`): Blind snapshot; `x!=ux||y!=uy` gate; utrap yank (pit/web/lava/beartrap) + `reset_utrap`/`fill_pit`; pool/pit/hole slide vs short-stop; recalc flag; Blind chain-glyph cycle; `movobj`; `bc_order` refresh; `newsym`; conditional `spoteffects`.
- New static edges join existing imports (trap ×3) or hoisted-fn homes (dig/pickup/do_name/polyself/sndprocs/generated); `do.js` static `drop_ball`, `dothrow.js` dynamic (CHECK/const-binding, file pattern).
- Callers: dropz `obj===u.uball → drop_ball(ux,uy)` else shop-sell; throw-land `stackobj → drop_ball(x,y) → cansee newsym`.

## C ↔ JS fidelity

Body vs `:881–961`, arm by arm: snapshot (`bc_order` then `bglyph` felt/landing) ✓; pullmsg prefix identical incl. `hliquid("lava")` (JS `hliquid` verified exact, display-RNG incl.) ✓; WEB sound + `deltrap(t_at(ux,uy))` ✓; BEARTRAP `rn2(3)` side → `set_wounded_legs(side, rn1(1000,500))` → steed gate → leg pline → `losehp(maybe_half_phys(2),…,KILLED_BY)` (macro ≡ JS, draw-free both sides; `KILLED_BY=1` ✓) → `finish_maybe_wail()` ✓; `reset_utrap(TRUE)` + `fill_pit` inside the yank-if ✓; slide predicate (`!Levitation && !MON_AT && !u.utrap` post-reset ≡ always-true-after-yank on both sides ✓, pool/pit/hole with `t` assignment) ✓; recalc flag ✓; Blind drop-glyph/felt-clear/pickup ✓; `movobj` ✓; refresh ✓; `newsym(ux0,uy0)` ✓; `spoteffects(TRUE)` iff moved ✓. `finish_maybe_wail` is the faithful async split, not an extra — C `losehp` calls `maybe_wail()` internally (`hack.c:4275/:4290`) and JS defers it via `_needs_maybe_wail` (same pattern at `trap.js:1825`). `pline_The`/`Your` render text-identical through `pline` (no 5th clone — right call). Callers exact: `do.c:833–836` uball→drop_ball/else-shop-sell order ✓; `dothrow.c:1838–1841` stackobj→drop_ball(bhitpos)→cansee-newsym with `x,y≡bhitpos` ✓.

Callee closure: deltrap/reset_utrap/fill_pit/movobj/mon_at/losehp/Soundeffect sync bare ✓; set_wounded_legs/spoteffects async awaited ✓; `body_part(LEG)` via reviewed `mbodypart` (review 06 ACCEPT); `Blind_bc`/`bc_order` pre-existing file locals (Blinded expansion, D-1777 area — not this commit). `--can` ALREADY ×2 spot-checked. One defensive extra: `if (!uchain) return` has no C counterpart, but both wired callers gate on `obj===uball` (⟹ punished ⟹ uchain live), so it is unreachable and RNG-free — note, not a C-wrong.

Slide-condition subtlety checked: C tests `!u.utrap` AFTER `reset_utrap(TRUE)` inside the yank-if, so the predicate is trivially true post-yank on both sides (JS `reset_utrap` zeroes `u.utrap` the same way); when the yank never ran, both sides test the live trap state. The `(dx,dy)` short-stop else-arm, the `ux0/uy0` snapshot pair, and the moved-iff-`spoteffects` tail all match. `sym.mjs` spot-checks for the record:

```text
deltrap          js/trap.js:1302   sync
reset_utrap      js/trap.js:2733   sync
set_wounded_legs js/trap.js:3127   ASYNC — await required
fill_pit         js/dig.js:883   sync
spoteffects      js/pickup.js:1995   ASYNC — await required
Soundeffect      js/sndprocs.js:36   sync
movobj           js/hack.js:346   sync
mon_at           js/uhitm.js:3693   sync
losehp           js/hack.js:1224   sync
```

(`bc_order` stays the pre-existing `ball.js:257` file-local from the D-1777 area — used by the new body but neither added nor changed here.) Caller order verified triple: dropz runs place → impact → zombies → drop_ball/sellobj → stackobj → Blind+Levitation map_object → newsym on both sides (`do.c:826–842`); throw-land runs stackobj → drop_ball(bhitpos) → cansee-newsym → light-vision-tail on both sides (`dothrow.c:1836–1844`, vision tail pre-existing and untouched).

## Hallucinations / overclaim

None. "No corpus session reaches the arm" disclosed; correctness rested on the arm audit + live callees, said plainly. Full-44/44 auto-run disclosed as shared-file trigger.

## Density

~156 `js/` insertions for one 81-line C body + two one-line caller wirings — one function family, one falsifier. Good.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44, no D-1831 gap) + 4/4 smoke probe (deleted, disclosed) + honest vacuous-hidden note. Re-measured:

```text
verify drop_ball: baseline e23e920d~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Banned grep: 0 hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
