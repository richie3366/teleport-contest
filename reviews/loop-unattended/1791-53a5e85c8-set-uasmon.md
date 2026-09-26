# Review 1791 — 53a5e85c8 — set_uasmon (D-2832)

- SHA: `53a5e85c8` (coverage; `polyself.c` `set_uasmon`)
- Files: `js/polyself.js` `set_uasmon` / `polysense`; `js/mon.js` `valid_vampshiftform`; `js/display.js` `MATCH_WARN_OF_MON`; callers `js/u_init.js`, `js/save.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: not re-scanned line by line; the subject and the function bodies have no seed, coordinate, or `FORCE` gate. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `set_uasmon` in C order: cham sampled before `set_mon_data`, every `FROMFORM` intrinsic, `resists_drli` with `uwep` cleared, `polysense`, and `were_changes = 0`. `u_init` and restore call it. The diff is that body. `status_initialize` stays uncalled.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `set_uasmon` | `polyself.js:793` | `polyself.c:37–127` |
| `valid_vampshiftform` | LIVE `mon.js:164` | `mon.c:5014–5023` |
| `set_mon_data` | LIVE `mondata.js:89` | `mondata.c:12–38` |
| `propset_fromform` | local | `PROPSET` macro at `:55–61` |
| `resists_drli` | LIVE `zap.js:3750` | `mondata.c:200–211`; `uwep` saved and cleared |
| `defended` | LIVE `mondata.js:162` | reads `u.uwep` (`:166`) |
| `polysense` | local `:760` (C `staticfn`) | `polyself.c:2235–2261` |
| `pm_invisible_form` | inlined macro | `mondata.h:192–193`; `trap.js:4738` stays the named function |
| `float_vs_flight` | `polyself.js:691` | `polyself.c:130–154` |
| `via_windowport` | local | `botl.h` `WC2_HILITE_STATUS \| WC2_FLUSH_STATUS` |
| `status_initialize` | OMIT | `botl.c:1682`; empty `if` |
| `MATCH_WARN_OF_MON` | `display.js:1158` | species compared by `mndx` |

Deleted local `resists_drli_you` is gone. `sym.mjs`:

```
resists_drli     js/zap.js:3750   sync
resists_drli_you NOT FOUND
valid_vampshiftform js/mon.js:164   sync
set_uasmon       js/polyself.js:793   sync
MATCH_WARN_OF_MON js/display.js:1158   sync
polysense        local js/polyself.js:760 (C static; one caller)
pm_invisible     local js/trap.js:4738 (macro; this file inlines it)
```

`imports.mjs --can`: `u_init.js`/`save.js` → `polyself.js` `set_uasmon`, `polyself.js` → `zap.js` `resists_drli`, `polyself.js` → `mon.js` `valid_vampshiftform` are all `ALREADY`.

## C ↔ JS fidelity

`csym --callers set_uasmon`: `allmain.c:349` is `allmain.js:1129` (`were_changes`). `invent.c:5373` is a comment, not a call. `polyself.c:213` is `polyman` (`polyself.js:1015`). `:301` is `change_sex` (`:952`). `:815` is `polymon` after `u.umonnum = mntmp` (`:1648`). `restore.c:627` is `save.js:978`. `u_init.c:993` is `u_init.js:1956`. `were.c:236` is `set_ulycn` (`were.js:250`). `role.c:2093` is a comment.

Cham. `was_vampshifter` uses the old `youmonst.cham` (unset is 0, not `NON_PM`) and the new `umonnum`, before `set_mon_data`. Then protection → `NON_PM`, else `is_vampire` → `mnum`, else clear unless the sampled vampire form. `u.mcham` follows. That is `:41–53`.

`PROPSET` order matches `:64–101`: eight `mresists` bits, then `resists_drli` with `u.uwep` nulled and restored (so `defended` skips the wielded artifact and still sees dragon armor), then `AD_MAGM` / baby gray dragon / `AD_RBRE` (`AD_MAGM` is 1, `AD_RBRE` is 242, `monattk.h:43` and `:89`), fungus or ghoul, stalker or `is_bat` (`mondata.h:103–105`), `AD_HALU` (36), `perceives`, `telepathic` (floating eye, mind flayer, master), infravision of the race monster when `!Upolyd` (`you.h:554` `umonnum != umonster`; `const.js:3190`), stalker or black light, teleport pair, floater, flyer-and-not-floater, swimmer, passes walls, regenerates, silver dragon, `!haseyes`, then `AD_BLND` with `AT_EXPL` or `AT_GAZE`. `MAGICAL_BREATHING` is not written. `propset_fromform` toggles `FROMFORM` on `uprops[].intrinsic` and the `H*` mirror of that word.

`float_vs_flight` runs only when `program_state.restoring` is clear. Restore sets `youmonst.data = null` and `cham = u.mcham`, then `set_uasmon`, while `restoring` is already nonzero (`restore.c:795` `REST_GSTATE` wraps `:627`; JS uses `REST_CURRENT_LEVEL`, which is also nonzero). `u_init` sets `umonnum`, `umonster`, `ulycn = NON_PM`, then `set_uasmon`, and skips the call only when `urole.mnum` is null.

`polysense` clears `speciesidx`, `species`, `polyd`, and the `FROMRACE` bit (`youprop.h:168` is the intrinsic). Purple worm and baby purple worm set shrieker. Vampire and vampire leader set `M2_HUMAN|M2_ELF` and return. `ismnum` then stores the species. `MATCH_WARN_OF_MON` compares `mndx` because `mons()` (`monsters.js:203`) returns a new object.

`valid_vampshiftform`: vampire base, then bat, fog cloud, or wolf when the base is not `PM_VAMPIRE`. `mons(base)` null makes `is_vampire` false (`base >= NUMMONS`).

No `rn2` in this function. `polymon`'s `rn1(500, 500)` stays in the caller, before `set_uasmon`.

## Hallucinations / overclaim

The subject does not say `status_initialize` was ported. The empty `if (via_windowport())` matches the claim that contest tty `wincap2` is 0. Null `mdat` is named; `haseyes(null)` is true (no `M1_NOEYES` bit), so `BLINDED` stays off, which is the safe side of a null form. The old drain clone is actually deleted.

## Density

The whole `set_uasmon` body, `polysense`, and `valid_vampshiftform`. Every C caller that is a real call is wired. `status_initialize` is a named omit behind a false guard, not a stub that pretends to run.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify set_uasmon --base 53a5e85c8~1 --reach-all`.

```
verify set_uasmon: baseline 53a5e85c8~1 (scoreboard at fb4f1bf7d) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke set_uasmon: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2832's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
