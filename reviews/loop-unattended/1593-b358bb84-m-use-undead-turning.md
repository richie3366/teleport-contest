# Review 1593 — b358bb84 — muse.c m_use_undead_turning whole-body port (D-2634)

**Metadata:** SHA `b358bb84`, `muse.c` `m_use_undead_turning`, D-2634.
JS: `js/mthrowu.js` (+27), `js/muse.js` (+26/−9).
Coverage row (invent-corpse arm only → full). Retires review 779's
named floor-corpse debt. No prior review claimed closed.

## Intent vs deliverable

Subject promises: floor-corpse ray arm (`|| linedup_callback(...)`)
via a new export in its C home, retiring review 779's named omit.
Diff delivers exactly that: exported walker + local predicate, main
export restarted in C order. Promise matches deliverable.

## Inventory

- `linedup_callback()` — new export in mthrowu.js:343 (sync).
- `linedup_chk_corpse()` — new muse.js file-local (matches C
  staticfn).
- `m_use_undead_turning()` — restarted, still unexported (matches
  C staticfn).
- muse.js extends its existing mthrowu.js/mkobj.js imports.
- No deleted symbol, no local→import re-point.
- Required `sym.mjs` outputs pasted:

```text
linedup_callback js/mthrowu.js:343   sync
sobj_at          js/mkobj.js:2704   sync
ALREADY: muse.js already statically imports mthrowu.js. No new edge needed.
```

Single export, live dependency, no new edge.

## C ↔ JS fidelity

C loci: `muse.c:1299–1340` (42 L, m_use_undead_turning) +
`muse.c:1293–1297` (linedup_chk_corpse) + `mthrowu.c:1291–1327`
(37 L, linedup_callback) — all three bodies read via
`csym.mjs`. Call-for-call confirm:

- `linedup_callback`: tbx/tby set, zero-displacement FALSE,
  orthogonal/diagonal + BOLT_LIM gate, do/while converge with
  blocking_terrain→FALSE and fnc→TRUE — exact (`Math.abs` ≡ C
  `abs`; `game._tbx`/`_tby` for `gt.tbx`/`tby` per `linedup`
  precedent). Reuses the live mthrowu.js:265 local
  `blocking_terrain` + `sgn`/`distmin`/`BOLT_LIM` — verified
  in-file, no clone.
- `linedup_chk_corpse`: `sobj_at(CORPSE,x,y) !== null`; sobj_at
  body read (mkobj.js:2704, returns obj|null) so `!== null` ≡ C
  `!= 0` — exact.
- Main export: ax/ay/bx/by computed *before* the otyp/spe gate
  like C `:1302–1307`; negated-conjunction guard `:1306` kept as
  `if (!(...)) return`; `carrying(CORPSE) || linedup_callback(...)`
  disjunction with the necrophiliac comment carried (comment-only
  in C too — correctly not wired); offensive/has_offense sets —
  exact. No RNG in body.
- Caller: C `muse.c:1500` → JS muse.js:702 (inside the offensive
  selection flow) — wired, exact.

Callee closure: every callee live (`carrying` hack.js, `sobj_at`
mkobj.js, `blocking_terrain` mthrowu.js local) or ported here —
"Named: none" accurate.

## Hallucinations / overclaim

None. D-log correctly notes `necrophiliac` is C-comment-only, not
a call, and frames the 779 debt retirement precisely (invent arm
was live, floor ray was the named omit — now ported).

## Density

One function family across two already-linked modules, +53/−9.
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify m_use_undead_turning
  --base b358bb84~1 --reach-all` → `0 session(s) blocked`
  (vacuous-note path, honestly labeled) + `smoke 24/24 PASS, 0
  regressed → REACH-OK`. Both summary lines cited; no REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
