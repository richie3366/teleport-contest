# Review 975 — cb634081 — mhitu FIRE/TLPT/STCK/PLYS arms (D-2005)

Metadata: SHA `cb634081`, D-2005, Open-row port (missing
`mhitm_mgc_atk_negated` gates; row cited 5 sessions from step 26).
js/ touches 1 file (`js/mhitu.js`, +189/−78: four `_u` arms + four
switch cases + dispatch doc). `c-js-map/turns.md` + rescore
`hidden-corpus/scoreboard.json` committed. No stamp owed.

## Intent vs deliverable

Subject promises: `mhitm_ad_fire_u` / `_tlpt_u` / `_stck_u` /
`_plys_u` in exact C branch order (stck gate-first, plys
rn2-before-gate, fire `(void)` destroy_items, tlpt clamp with 1-HP
floor) plus four switch cases. Diff actually adds: exactly that,
plus four verified-idiom locals and same-edge import extensions.
Promise == diff. The RNG thesis (C `rn2(10)` in the gate where JS
drew knockback `rn2(3)`/`rn2(6)`) is the recorded first divergence.

## Inventory

- New JS functions: the four `_u` arms (mhitu thirds of the
  combined `uhitm.c` `mhitm_ad_*` functions; uhitm/mhitm thirds
  stay map-deferred under D-1907 — named in this commit).
- New helpers: file-local `Your` (zap.js:851/artifact.js:1307
  idiom, identical one-liner), `Teleport_control()` (byte-identical
  to invent.js `hero_Teleport_control`), `Stunned()`
  (byte-identical to zap.js:618), `Free_action()` (byte-identical
  to potion.js:1756) — all verified CLONEs of established
  conventions; any drift in those conventions predates this SHA.
  `PM_BARBED_DEVIL`/`PM_PAPER_GOLEM`/`PM_STRAW_GOLEM` consts
  (`monsterNames.indexOf` idiom).
- No deleted symbols, no import re-points (pure additions +
  default→arm reroutes) — no `sym.mjs` delete audit required.
- One named message-only deviation: `dynamic_multi_reason` as
  static `'paralyzed by a monster'` (mcastu.c precedent, surfaces
  only on mid-paralysis death) — commit-named with rationale.

## C ↔ JS fidelity

C loci read verbatim: gate `uhitm.c:74–99`; fire `:2520–2623`;
tlpt `:2858–2955`; stck `:3305–3334`; plys `:3430–3476`. Arm by arm:

- Fire: `hitmsg` → `!negated(TRUE)` → `"You're %s!"` →
  `completelyburns` (C `mondata.h:223` paper/straw pointer
  compare; JS `=== mons[PM_*]` identity, same-file precedent at
  mhitu.js:2260) → burn-up/rehumanize/return →
  `Fire_resistance` → `"The fire doesn't feel hot!"` + seesu +
  dmg 0 → else unseesu → `m_lev > rn2(20)` →
  `destroy_items(youmonst, FIRE, orig_dmg)` + `ignite_items` →
  `burn_away_slime`, else dmg 0. JS mirrors all of it, incl. the
  `(void)` (return dropped, `zap.c:5962` cite) and `orig_dmg`
  capture before mutation. ✓ No RNG reorder. ✓
- Tlpt: `hitmsg` → `negated(FALSE)` → `"You are not affected."`
  → verbose `Your("position … %suncertain!")` with the exact
  `(Teleport_control && !Stunned && !unconscious())` ternary →
  `tele()` → Half_physical clamp with `Math.trunc((damage-1)/2)`
  (non-negative domain, matches C int division), `tmphp-1`,
  `*= 2`, `<1 → 1` + HP bump, `[don't set botl]` (absent on both
  sides). ✓ `Upolyd`/`Half_physical_damage` are live imports;
  `flags.verbose !== false` is the codebase idiom (apply.js ×5).
- Stck: gate evaluated first (C computes `negated` at function
  top — JS `await`s it before `hitmsg`, same draw order since the
  gate holds the only RNG) → `hitmsg` → `!negated && !ustuck &&
  !sticks(pd)` → `set_ustuck(magr)` + barbs line. Damage
  untouched on both sides (`void mhm`). ✓
- Plys: `hitmsg` → `multi >= 0 && !rn2(3) && !negated(TRUE)` —
  JS `&&`-chain preserves C short-circuit, so `rn2(3)` draws
  before the gate's `rn2(10)` exactly as in C. ✓ Freeze branch:
  Blind-gated message, `nomovemsg`, `nomul(-rnd(10))`,
  `exercise(A_DEX, FALSE)` all exact.
- Callee closure: `hitmsg`/`sticks`/`set_ustuck`/`Blind`/
  `Fire_resistance` pre-existing live in-file; `tele` async
  awaited, `unconscious`/`on_fire`/`exercise`/`nomul`/
  `monst[un]seesu` sync-correct; `rehumanize` async awaited;
  `newcham` untouched. New imports extend existing edges only
  (teleport.js, mondata.js, mhitm.js `mhitm_mgc_atk_negated` at
  :89) — no new module cycle. `unconscious`'s one eat.js clone
  predates; this SHA imports the export. Every shipped arm's
  callees LIVE or verified CLONE. ✓
- Observation (not Must-fix, untouched lines): the fire arm's
  `{ _youmonst: true }` fallback if `game.youmonst` is missing is
  defensive shim with no C counterpart — harmless (identical
  behavior whenever youmonst exists, i.e. always mid-combat), but
  worth not copying further.

## Hallucinations / overclaim

None. "1 PASS, 5 moved past, 1 unchanged" — my re-run shows the
same shape (`1 PASS, 6 moved past (1 still … at a later step), 1
unchanged, 0 worse → PROGRESS`; the extra move is the
working-board union session the D-log itself footnotes, and
"still at a later step" is forward motion per the playbook).

## Density

189 insertions for four arms of one C function family in one
module. Right-sized tight cluster; the uhitm/mhitm thirds were
correctly left deferred, not half-ported.

## Verification

Re-measured myself: `hidden-proxy verify mhitm_mgc_atk_negated
--base cb634081~1` → PROGRESS, every move to a strictly later
step/owner (Tourist-92003 PASS; 92140 save_dungeon@123;
92050 one_characteristic@112; 92183 escape_from_sticky@247;
92045 use_container@71). 0 worse. Plus cited green 2/2 + strict
×2, cohort 7/7. Grep of the js hunk: no `FORCE`/`DIAG`/
`getRngLog`/seed/coordinate/`fastforward`. Rule #2 clean
(re-ran this iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
