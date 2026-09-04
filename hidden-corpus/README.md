# hidden-corpus — the hidden-score proxy

The public 44 sessions pass 100% and can no longer tell a faithful port from
an unfaithful one. This directory is the local stand-in for the sessions we
cannot see: ordinary-play sessions recorded on the pinned C recorder and
replayed in JS, with **every first divergence attributed to a C function**.

Only the **recipes** (a seed, an rc, a keystroke string) are committed. The
recorded sessions live in `.cache/hidden/sessions/` and are rebuilt from the
recipes by the deterministic recorder in about a second each:

```bash
node scripts/hidden-proxy.mjs record          # rebuild missing sessions
node scripts/hidden-proxy.mjs score --jobs 8  # replay all in JS, attribute
node scripts/hidden-proxy.mjs status          # pass rate + blocking owners
node scripts/hidden-proxy.mjs queue           # LOOP-QUEUE rows from owners
node scripts/hidden-proxy.mjs verify <cfn>    # after a port: did it move?
node scripts/hidden-proxy.mjs show <id>       # one session's first diff
node scripts/hidden-proxy.mjs gen --n 240     # more ordinary-play mutants
node scripts/hidden-proxy.mjs gen --mode tour # debug ^V descents to deep levels
```

`scoreboard.json` is the committed summary of the last `score` (per session:
pass, RNG/screen counts, divergence kind and step, owning C function, C and
JS toplines). `.cache/hidden/scores.json` holds the full worker output.

## Three recipe families

| prefix | how it is made | what it measures |
|---|---|---|
| `explore-*`, `random-*` | a public session's tail replaced by random sane keys (`fuzz-oracle` explore / random alphabets) | ordinary play near the public distribution: prompts, menus, item actions, messages |
| `ind-*` | a fresh seed and role, random keys from turn 1 | chargen + early game for roles the public set under-samples |
| `tour-*` | `playmode:debug`, `^V<dlvl>` teleports down a schedule (3…27) with a few moves per level | **level content**: bigrm / rogue / medusa / castle depths a held-out tour walks into and the port may render blank |

`private-sessions/*.session.json` (the older hand-curated oracle corpus) is
scored alongside these.

## Rules

- These files are evidence and a work picker, **never the specification**.
  The C source is the specification. A row in `LOOP-QUEUE.md` names the C
  function that owns a divergence; the fix is that function's port.
- Never write a seed, a step index, a recorded coordinate, or an RNG index
  into `js/` to make a corpus session pass. That is the same ban as for the
  public sessions (Constitution §1.2 / playbook §3).
- Never add these to `sessions/manifest.json`; the public cadence stays the
  public 44.
- `env:config-path` owners are the recording environment (a temp-dir path
  printed on a help screen), not the port. They are excluded from the queue
  and from the pass-rate denominator.
