# C → JS coverage map

Structural ledger for the port. Status meanings are defined in
`PORTING-RUNBOOK.md`; a passing session alone does not imply `ported`.

**Read rule:** open **only** the subsystem file you will edit. Do not load
this index’s children by default. Entries are `### C` + `JS: … — status`
+ wrapped evidence (not giant table rows). Edit with the edit tool, not
heredocs.

Last broad audit: **2026-07-12** (see section files for later row updates).

| Section | File | When to open |
|---------|------|--------------|
| Update rule | `c-js-map/update-rule.md` | subsystem in scope |
| Harness and contracts | `c-js-map/harness.md` | subsystem in scope |
| Startup and character creation | `c-js-map/startup.md` | subsystem in scope |
| Data and world generation | `c-js-map/data.md` | subsystem in scope |
| Turns, commands, and display | `c-js-map/turns.md` | subsystem in scope |
| Known constitutional debt | `c-js-map/debt.md` | subsystem in scope |
| Major absent or scaffolded systems | `c-js-map/absent.md` | subsystem in scope |
| Scaffolding retirement | `c-js-map/scaffolding.md` | subsystem in scope |

## Update rule (all sections)

When changing a subsystem:

1. cite the pinned C source/module;
2. update status only if the status definition is met;
3. name deferred semantics, not the public seed that failed to exercise them;
4. add verification evidence or link to `DIVERGENCE-LOG.md` / `DIVERGENCE-INDEX.md`.
