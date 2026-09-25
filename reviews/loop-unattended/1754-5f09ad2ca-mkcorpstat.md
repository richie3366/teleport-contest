# Review 1754 — 5f09ad2ca — mkcorpstat (D-2795)

- SHA: `5f09ad2ca` (`mkobj.c` mkcorpstat whole-body port, D-2795)
- Files: `js/mkobj.js` (+67), `js/mhitm.js` and `js/mklev.js` (index → `mons()`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises a restart: bad type calls `impossible` and continues,
`(0,0)` uses `mksobj` without `rloco`, `spe` is the low 3 flag bits,
`norevive` copies the global then forces 1 for a cancelled non-rider,
and `monsndx(ptr)` restarts a special corpse timer. Diff replaces the
body and fixes `make_corpse` (`mon.c:626`/`:647`) and `mktrap_victim`
(`mklev.c:1932`) to pass `mons(mndx)`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mkcorpstat` | C body | `mkobj.c:2066–2118` |
| `mksobj` / `mksobj_at` | imported | same file |
| `rloco` | **named omit, not called** | `teleport.c` async |
| `save_mtraits` | existing export | same file |
| `monsndx` | imported | `mondata.c` |
| `special_corpse` | local clone, matches | `mkobj.c:2052–2054` |
| `is_rider` | local clone, `mndx` | `mondata.h:161–163` pointer compare |
| `obj_stop_timers` / `start_corpse_timeout` | existing | live |
| `impossible` | imported, not awaited | — |

`csym --callers`: `mklev.c:786`, `:1004`, `:1932`; `mkmaze.c:675`;
`mkobj.c:2263`; `mon.c:626`, `:647`, `:671`, `:898`, `:3344`;
`trap.c:401`. The two sites that passed an index now pass `mons()`.
Other JS callers already pass `ptr` / `mdat` / `mdef.data` / null.

`sym.mjs`:

```
monsndx          js/mondata.js:148   sync
special_corpse   NOT EXPORTED — 1 LOCAL at js/mkobj.js:929
is_rider         js/monsters.js:912   sync
                 ALSO local js/mkobj.js:923
save_mtraits     js/mkobj.js:3879   sync
rloco            js/teleport.js:1857   ASYNC
mksobj           js/mkobj.js:2388   sync
mksobj_at        js/mkobj.js:2454   sync
```

## C ↔ JS fidelity

Bad type: `impossible` and continue (`:2078`). `(x == 0 && y == 0)`
calls `mksobj` and does not call `rloco` (`:2080–2082`). Any other
pair, including a negative, uses `mksobj_at`. `spe` is
`flags & 0x07` (`CORPSTAT_SPE_VAL`). `CORPSTAT_INIT` is `0x08` and is
only the `mksobj` init bit. `norevive` is `game.mkcorpstat_norevive ? 1 : 0`
(C assigns the bit; 0 stays 0). `mtmp` saves traits, fills `ptr` from
`mtmp.data`, and sets `norevive` when `mcan && !is_rider`. `ptr` then
sets `corpsenm = monsndx(ptr)` (`ptr.mndx`), `weight`, and on a corpse
with `game.zombify` or `special_corpse` of the old or new index stops
timers and `start_corpse_timeout`. `special_corpse` is lizard, lichen,
`mlet === 'S_TROLL'`, or rider. No RNG in this function.

`is_rider` compares `mndx` to Death/Famine/Pestilence. C compares the
`permonst` pointer. `mons()` sets `mndx`, so the local clone matches
for objects this function receives.

## Hallucinations / overclaim

"Whole-body" matches `:2076–2116` except `rloco`. That call is named
in the subject, the D-log, and the map, with `mkobj.c:2082`. No
current caller passes `(0,0)`. `impossible` not awaited is named.
The two index callers are the ones the diff changes.

## Density

~67 insertions for a 53-line function plus two call-site types. Under
the 200-line band because C is that small. The random-placement arm
is present and its one callee is an omit, not a silent stub.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify mkcorpstat --base
5f09ad2ca~1 --reach-all`. Parent board is the 12-row file (stamp
field `f176b8c0a`):

```
verify mkcorpstat: baseline 5f09ad2ca~1 (scoreboard at f176b8c0a, 2026-09-25T19:16:36.182Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mkcorpstat: no corpus session is blocked on it at 5f09ad2ca~1 — a vacuous verify is NOT a corpus PASS. …
smoke mkcorpstat: no RNG-tagged reach; fixed smoke spread (12 run, 4.3s): 12 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. D-log "smoke 12/12" is that board.

## Actionable C-wrongs

None. `rloco` at `(0,0)` stays the named omit.

Verdict: **ACCEPT**
