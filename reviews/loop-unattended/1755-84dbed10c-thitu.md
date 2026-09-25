# Review 1755 — 84dbed10c — thitu (D-2796)

- SHA: `84dbed10c` (`mthrowu.c` thitu whole-body port, D-2796)
- Files: `js/mthrowu.js` (+178 / −56)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises the C order: null name uses `doname` (stack) or
`mshot_xname`, death reason `killer_xname` with `KILLED_BY`, article
prefixes force `KILLED_BY`, pname/`an` for the visible name, one
`rnd(20)`, miss text via `mesg_given`, hit arms for acid resistance,
stone plus `passes_rocks`, and `potionhit` (clears `*objp`), else
silver, acid burn, `losehp`, `exercise(A_STR)`. Diff replaces `thitu`
and adds four local helpers. `m_throw` copies `box.obj` back after
the call. New names on existing imports: `Hate_silver`, `A_CON`,
`doname`. No new module edge.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `thitu` | C body | `mthrowu.c:73–155` |
| `thitu_ci_prefix` | local, three literals | `strncmpi` `:92–94` |
| `thitu_blind` | calls imported `Blind` | `youprop.h:103` |
| `thitu_acid_resistance` | local clone of the macro | `youprop.h:61` |
| `thitu_passes_rocks` | local clone, matches | `mondata.h:208` |
| `exclam` / `upstart` | existing locals | `zap.c:3546–3553`, `hacklib.c` |
| `stone_missile` | imported | `obj.h:274–277` |
| `Hate_silver` | imported | `youprop.h:401` |
| `potionhit` | imported, `null` = hero | `potion.c` |
| `exercise` / `losehp` | imported | live |

`csym --callers`: `apply.c:3197` is inside `#if 0`. Live: `explode.c:876`,
`mthrowu.c:716`, `:742`, `:1238`, `trap.c:1213`, `:1278`, `:3419`,
`zap.c:4207` (boomerang). JS: `explode.js:1003`, `mthrowu.js:1311`,
`:1320`, `:1345`, `:1630`, `trap.js:2284`, `:2351`, `:2546`,
`dothrow.js:2164`. Callers pass `{ obj }`.

`sym.mjs` (re-points):

```
Hate_silver      js/uhitm.js:1057   sync
                 ALSO local js/dothrow.js:1213
doname           js/objnam.js:3123   sync
stone_missile    js/dothrow.js:1237   sync
potionhit        js/potion.js:3812   ASYNC
exercise         js/attrib.js:199   sync
Blind            js/invent.js:359   sync
```

## C ↔ JS fidelity

Null name with no object throws the C panic string. Otherwise
`quan > 1` → `doname`, else `mshot_xname`; `knm = killer_xname`;
`kprefix = KILLED_BY`. A supplied name keeps `KILLED_BY_AN` unless
it starts with `the ` / `an ` / `a ` (case-insensitive, short strings
miss). `named` is snapshotted before that overwrite. Visible name:
`obj_is_pname` → `the`, else a stack uses the name, else `an`.
`is_acid` is `otyp === ACID_VENOM`.

One `rnd(20)` is stored, then `u.uac + tlev <= dieroll` is the miss
(`u.uac ?? 10` only when the field is missing). Miss increments
`game._mesg_given` (this file's `gm.mesg_given`). Blind or
`flags.verbose === false` prints "It misses." A roll at least 2
over the threshold capitalizes then `vtense`s that capital
(left-to-right, same as the C comment). Otherwise "almost hit".

Hit: same blind/verbose split, `exclam` (`< 0` `?`, `<= 4` `.`, else
`!`). Acid plus resistance: the no-hurt line and `monstseesu`, no
HP. Else stone missile and `passes_rocks(youmonst.data)`: `named`
picks "passes harmlessly through" vs "doesn't harm". Else a potion:
`potionhit(null, obj, POTHIT_OTHER_THROW)` (`potion.js:3814` treats
null as the hero) and clears `objp.obj`. Else silver plus
`Hate_silver` prints the sear and `exercise(A_CON, false)` (that
callee's `rn2` is C's), then acid "It burns!" and `monstunseesu`,
then `losehp(dam, knm, kprefix)`, then `exercise(A_STR, false)` only
when `done` did not run. Return 0 or 1 matches.

`thitu_acid_resistance` is `H || E` or the `uprops[ACID_RES]` bits.
C's macro is `(HAcid_resistance || EAcid_resistance)` with no blocked
term. `thitu_blind` calls `Blind()` then also `u.Blind || u.ublind`.
`u.ublind` is only assigned `false` (`do.js:3322`); `u.Blind` is set
from `Blind()` except a lock-picker window. The extra OR does not
change the `rnd(20)`.

## Hallucinations / overclaim

The old body really did skip the three hit arms and always `losehp`.
The new body has those arms. `apply.c:3197` is `#if 0`, as the D-log
says. `exercise` (`attrib.c:488–518`) still omits the trailing
`encumber_msg` (`:515–516`). That tail predates this SHA; the new
calls are in C's positions and the `rn2` inside `exercise` is live.

## Density

~178 insertions for an 83-line function plus helpers. Under the
200-line band because C is that small. Every hit arm's callee is an
import or a matching local clone. No silent stub.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify thitu --base
84dbed10c~1 --reach-all`. Parent board is the 12-row file (stamp
field `2b10e06e1`):

```
verify thitu: baseline 84dbed10c~1 (scoreboard at 2b10e06e1, 2026-09-25T19:25:55.074Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify thitu: no corpus session is blocked on it at 84dbed10c~1 — a vacuous verify is NOT a corpus PASS. …
smoke thitu: no RNG-tagged reach; fixed smoke spread (12 run, 4.3s): 12 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. D-log "smoke 12/12" is that board.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
