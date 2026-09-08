# Review 1130 — 3b27be21 — invent.c useup in_use clear in 5 clones (D-2164)

Metadata: SHA `3b27be21`, js/ +5/−0 across `detect.js`,
`potion.js`, `read.js`, `spell.js`, `zap.js` (one line each) +
map row. D-log D-2164. Subject promises: local `useup` clones
omitted the `in_use = FALSE` clear, freezing a victim potion
out of `destroy_items` — scen-tour-Tourist-91101 step 164/169,
RNG-first at `zap.c:5823` (C `rnd(4)=2 @ maybe_destroy_item`
vs JS knockback `rn2(3)`; JS never ran `maybe_destroy_item`).

Intent vs deliverable: promise matches diff. Actually adds:
`otmp/obj.in_use = false; /* C invent.c:1326 — no longer in
use */` as the first statement of the quan>1 branch in all
five hero-side clones. No scope creep; canonical
`js/invent.js:4105` export untouched.

Inventory: no new/changed functions, five one-line clone
repairs. Classification: all five sites are pre-existing
CLONEs of C `useup`; the commit narrows (not widens) the clone
gap. No imports, no new edges, no deleted symbols — no
`sym.mjs` resolution owed beyond confirming no new clone was
written (confirmed: same names, same files).

**C ↔ JS fidelity**: confirm against pinned C
(`invent.c:1320–1333`, via `csym.mjs useup`): C quan>1 branch
is `obj->in_use = FALSE; /* no longer in use */ obj->quan--;
obj->owt = weight(obj); update_inventory();` — JS now matches
the first three statements in order and position (the
`update_inventory` remainder stays map-named, correctly —
retiring only the `:1326` line from the omit). Owner-vs-writer
attribution is explicit and measured (maybe_destroy_item is
the draw site, `useup` the writer; `m_useup` correctly
untouched since C `mthrowu.c:1162–1170` has no such clear).
Shipping all five clones in one iter is within the
same-`file.c:function` rule — one C locus, identical line.

Hallucinations / overclaim: none. "Match C" is claimed for one
line and the line matches; the remaining clone gap
(`update_inventory`/`setnotworn`/`freeinv`/`obfree`) stays
named in the map, not Must-fix.

Density: 5 insertions for a 13-line C function — C is that
small. Fine.

Verification: D-log Verify bullet shows `verify.mjs --fn
maybe_destroy_item` → hidden Tourist-91101 PASS + green +
strict + cohort 7/7. Re-measured myself:
`hidden-proxy.mjs verify maybe_destroy_item --base
3b27be21~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (scen-tour-Tourist-91101: PASS) — a true PASS, the
strongest claim class, confirmed. No FORCE/DIAG/seed-gate in
the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
