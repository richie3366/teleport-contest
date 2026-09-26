# Review 1787 — 4d4432b8f — mcast_insects (D-2828)

- SHA: `4d4432b8f` (coverage; `mcastu.c` `mcast_insects`)
- Files: `js/mcastu.js` the body plus `insects_Unaware` / `insects_Deaf` / `insects_Invis` / `insects_BInvis` / `insects_Displaced`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

**Addressed:** D-2835 `57e3529ab`

## Intent vs deliverable

Subject promises one `mcast_insects` in C order: class letter from the first `mkclass`, `i <= quan`, `!enexto` returns with no message, `Hallucination` from `display.js`, `Unaware` as the `youprop.h` macro, seen results through `pline_mon`, and a plural copy before `makesingular`. The diff is that body. The deaf, detect, and displaced predicates are local clones that add tests C does not have.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mcast_insects` | `mcastu.js:689` | `mcastu.c:644–726` |
| `mkclass` / `makemon` / `set_malign` | LIVE `makemon.js` | loop body |
| `enexto` | LIVE sync `teleport.js:657` | `!enexto` returns |
| `monster_census` | LIVE `minion.js:107` | before and after the loop |
| `hero_Hallucination` | LIVE `display.js:1091` | `youprop.h:120` |
| `bogusmon` / `makeplural` / `makesingular` / `an` / `vtense` | LIVE `do_name.js` / `objnam.js` | `:680`, `:692` |
| `insects_Unaware` | CLONE of the macro | `youprop.h:399`; `unconscious` `trap.c:6775–6786`, `is_fainted` `eat.c:3346–3350` |
| `insects_Deaf` | CLONE, extra `u.Deaf` | `youprop.h:123–125` |
| `Detect_monsters` | file clone `mcastu.js:144` | `youprop.h:188–190` |
| `insects_Invis` / `insects_BInvis` | CLONE plus worn wrapping | `youprop.h:195–198`; `w_blocks` is live |
| `insects_Displaced` | CLONE plus worn cloak | `youprop.h:202–204` |
| `pline_mon` | LIVE async `display.js:7616` | `:722–724` |
| `You_hear` | LIVE `hack.js:176` | `pline.c:435–452`; underwater prefix still absent |
| `Soundeffect` | no-op, matches this build | `sndprocs.h:272` empty (`#define Soundeffect(seid, vol)`) |
| `perceives` | file clone `mcastu.js:67` | `mondata.h:81` `M1_SEE_INVIS`; null `ptr` is false |

`sym.mjs` (imports this diff adds or re-points):

```
Hallucination    js/display.js:1091   sync
                 js/do_name.js:255   sync
             !! multiple exports — import the C-locus one
             !! ALSO 8 LOCAL CLONE(S) — including js/mcastu.js:107
unconscious      js/teleport.js:1705   sync
is_fainted       js/eat.js:481   sync
enexto           js/teleport.js:657   sync
pline_mon        js/display.js:7616   ASYNC — await required
You_hear         js/hack.js:176   ASYNC — await required
Soundeffect      js/sndprocs.js:38   sync
```

`imports.mjs --can` for `mcastu.js` → `display.js` `Hallucination`, `teleport.js` `unconscious`, `eat.js` `is_fainted`, `hack.js` `You_hear`, `sndprocs.js` `Soundeffect`: all `ALREADY`. Calls are inside the function.

## C ↔ JS fidelity

`csym` body `mcastu.c:644–726`. Caller: declaration `:53`, `mcast_spell` `MCAST_INSECTS` `:872` → `mcastu.js:868` (`await`, then `dmg = 0`).

First `mkclass(S_ANT, 0)` picks the letter; null means snakes. `oldseen = monster_census(TRUE)`. `quan` is 1 when `m_lev < 2`, else `rnd(m_lev / 2)`, then at least 3. The loop is `i <= quan`. `!enexto(&bypos, mux, muy, data)` returns immediately, including after earlier successes, with no message. Otherwise `mkclass(let, 0)` and `makemon(..., MM_ANGRY|MM_NOMSG)`; a monster clears `msleeping` / `mpeaceful` / `mtame` and `set_malign`. JS `mcastu.js:690–717` is that order. `rnd` runs only when `m_lev >= 2`. `bogusmon` runs only after the loop, and only when `hero_Hallucination()`.

`seecaster` is `canseemon || tp_sensemon || Detect_monsters` (`:677`). The file `Detect_monsters` (`:144–148`) ORs sticky `u.Detect_monsters`. `youprop.h:190` is `HDetect_monsters || EDetect_monsters` only. A sticky-only hero is "seen" here and is not in C, so the arm is `pline_mon` instead of `You_hear`.

Unseen (`:682–704`): `newseen <= oldseen || Unaware` is the short `You_hear("someone summoning %s.")`. `insects_Unaware` is `multi < 0 && (unconscious() || is_fainted())`, and those two callees match `trap.c:6775` and `eat.c:3346`. Otherwise copy the plural, then one critter uses `an(makesingular(what))` and the rest use the copy. JS strings are immutable, so `whatbuf = what` keeps the plural across `makesingular`. `!Deaf` calls `Soundeffect(se_someone_summoning, 100)` then `You_hear`; else `pline` + `upstart`. `insects_Deaf` (`:639–644`) ORs sticky `u.Deaf`. `youprop.h:123–125` does not. `You_hear` (`hack.js:179`) ORs the same sticky and returns without printing, which is why the helper forces the visual line. A sticky-only deaf hero gets `Insects appear.` here; C prints `You hear someone summoning something, and ...`.

Seen (`:706–724`): `!success` uses the sticks format and `what = ""`; snakes; else `Invis && !perceives(data) && (mux,muy) != (ux,uy)`; else `Displaced` with the same position test; else the plain summons. Then `pline_mon(mtmp, fmt, Monnam(mtmp), what)`. JS `:749–766` is that order and awaits `pline_mon`, which sets the message position from `mtmp.mx` / `mtmp.my`.

`insects_Invis` is `(H || E) && !B` from flats or `uprops[INVIS]`, and it does not read sticky `u.Invis`. `insects_BInvis` also returns true when `u.uarmc` is a mummy wrapping. `w_blocks` is not omitted: `worn.js:261` is the C macro, and `setworn` calls `apply_w_blocks` (`do_wear.js:636` / `:649`), which sets `uprops[INVIS].blocked`. The wrapping read is a second true when that bit is still 0.

`insects_Displaced` reads H/E and `uprops[DISPLACED]`, then returns true for a worn cloak of displacement. `youprop.h:204` is only `HDisplaced || EDisplaced`. `confer_oc_oprop` (`do_wear.js:370–379`) already ORs the cloak's `oc_oprop` into `uprops[].extrinsic`. The cloak read flips the seen arm to "displaced image" when that word is still 0.

`Soundeffect` is empty in this build (`sndprocs.h:266–272`, no `SND_LIB_*`). The call matches. `You_hear`'s underwater "You barely hear" (`pline.c:445–446`) is still absent in `hack.js:176–182`. Named, and it is the callee, not a stub of this function.

## Hallucinations / overclaim

The subject says `w_blocks` is omitted and the wrapping stands in for it. `w_blocks` is live and `setworn` applies it. The subject also says the function is the C order while `insects_Deaf` and `Detect_monsters` add sticky fields the macros do not have. Those are named in the commit, and they change which message runs. The null `mtmp.data` and missing `game.u` notes match the code (`perceives` and `u.ux | 0`).

## Density

The whole function and its one caller. The summon loop, the hallucinated name, and `pline_mon` are live. Three predicates in the message arms are divergent clones, not omitted callees.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify mcast_insects --base 4d4432b8f~1 --reach-all`.

```
verify mcast_insects: baseline 4d4432b8f~1 (scoreboard at 38097d48c) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mcast_insects: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2828's green, strict, and cohort were not re-run here. The sticky gates are not on that smoke path.

## Actionable C-wrongs

1. `mcast_insects` unseen-success `!Deaf` (`mcastu.c:694–698`) must be `youprop.h:123–125` (`HDeaf || EDeaf || u.uroleplay.deaf`). `insects_Deaf` (`mcastu.js:639`) and `You_hear` (`hack.js:179`) both OR sticky `u.Deaf`, so a sticky-only deaf hero takes the visual `pline` instead of `You hear`.

2. `seecaster` (`mcastu.c:677`) must use `youprop.h:190` `Detect_monsters` (`H || E` only). The file clone `mcastu.js:144` ORs sticky `u.Detect_monsters`, so that hero takes `pline_mon` instead of the unseen `You_hear` arm.

3. `insects_Displaced` (`mcastu.js:676`) and `insects_BInvis` (`:655`) must be the macros (`youprop.h:204` and `:198`). Drop the worn-cloak and worn-wrapping disjuncts. `confer_oc_oprop` and `w_blocks` already write those bits.

Verdict: **QUALITY-RISK**
