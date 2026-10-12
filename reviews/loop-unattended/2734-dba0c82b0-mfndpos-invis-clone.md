# Review 2734 — dba0c82b0 — mfndpos monseeu live Invis (D-3874)

## Metadata

- SHA: `dba0c82b0` (cliffs-head writer port)
- D-entry: D-3874; Ledger: `mfndpos ported js=mon.js:mfndpos`
- js diff: `js/mon.js` (INVIS const import + 5-line inline + comment) + test
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: mfndpos's monseeu read the stale `u.Invis` flat and
phantom-NOTONL-rejected the unicorn's hero-row candidates; a live
`(H||E)&&!B` read moves Valkyrie→PASS and Caveman 723→900.

The diff actually adds: an inline 5-line computation from flats +
`uprops[INVIS]` instead of importing the live `Invis()` export. The
movement half delivered; the "mirrors timeout.js Invis() verbatim"
half did not — see below. Promise half == deliverable.

## Inventory

- `mfndpos` (`js/mon.js:3127`, sync) — `const Invis` flat read replaced
  by inline `__H/__E/__B` computation. No symbol deleted; one const
  (`INVIS`) added to the existing const.js import.
- Classification: the inline is a **CLONE** of the `Invis` export
  (`js/timeout.js:1752`) — the 5th in the tree (`sym.mjs Invis` lists 4
  named clones and says "IMPORT the export; do NOT add another"; this
  one is inline, so the counter cannot see it).

## C ↔ JS fidelity

C loci, read from pinned C: `mon.c` mfndpos monseeu `:2261–2262`
(`mon->mcansee && (!Invis || perceives(mdat))`), the `:2339` NOTONL
gate, `youprop.h:198` (`Invis = (H||E)&&!B`, live), `worn.c:39`
W_BLOCKS (worn MUMMY_WRAPPING on W_ARMC blocks INVIS).

The fix direction is C-right: the flat was stale-false under the worn
ring, monseeu wrongly TRUE, hero-row candidates wrongly dropped. The
reconstruction (C pass-1 cnt=4 →(60,6), pass-2 track draw) fits the
measured draws exactly, and both probe sessions moved as predicted.

The clone is C-WRONG in one arm. Canonical `Invis()` delegates the B
half to `BInvis()` (`js/timeout.js:1739–1744`):

```
if ((u.BInvis | 0) || (p?.blocked | 0)) return true;
const cloak = u.uarmc;
return !!(cloak && (cloak.otyp | 0) === MUMMY_WRAPPING);
```

The mon.js inline (`:3135`) reads only
`(game.u?.BInvis|0) || (blocked|0)` — the worn-mummy-wrapping arm is
missing. Every conforming clone implements it (mhitu.js:250–256,
potion.js, zap.js:731–737). Consequence: hero wears mummy wrapping
with B desynced (the reset-time extrinsic-drop class already documented
at monmove.js:751 / muse.js:466) + invisibility from another source →
C-situation-correct Invis=FALSE, inline=TRUE → monseeu=FALSE →
phantom NOTONL rejection — the very class this commit fixed,
reintroduced inverted. The D-log sentence "mirrors timeout.js Invis()
verbatim incl. the BInvis blocked-read" is false.

The "cannot import" justification is also false. Required `--can`
paste:

```
IN-SCC: mon.js and timeout.js are already in the same 101-module import cycle.
  Invis   function  hoisted — cycle-safe
VERDICT: SAFE — every name requested is a hoisted function declaration.
Same shape as the 1866 edges already in js/. Cite this instead of a clone.
```

A cycle alone is not a blocker (playbook §2b/method step 4); mfndpos
calls at runtime, never at module top level. Live precedent of the
exact shape: timeout.js already imports from shk.js (`:83`) while
shk.js imports `Invis` from timeout.js (`:129`, used by D-3873) —
shk↔timeout ships fine. The import was available; the clone was
unnecessary.

## Hallucinations / overclaim

Two, both quoted above: "mirrors … verbatim" (missing arm) and
"mon.js cannot import it" (contradicted by `--can` SAFE + the
shk↔timeout precedent). The movement claim itself ("1 PASS, 1 moved
past") is accurate and re-measured below. No FORCE/DIAG/seed markers
in the hunk; Rule #2 clean (review 2727 scan).

## Density

Cliff-head writer port with movement on both probe sessions (m_move
row's writer; m_move itself correctly not re-ported — briefed whole
per its parked tag). One cliff, code + ledger + verify in one handoff.
`Ledger: mfndpos ported` — right owner. Density is right; the defect is
fidelity of the clone, not scope.

## Verification

Re-measured by this audit
(`verify m_move,mfndpos --base dba0c82b0~1 --reach-all`):

- `verify m_move: 1 PASS, 1 moved past → PROGRESS` (Valkyrie-582704
  PASS; Caveman-582707 723 → cursetxt@900).
- `reach m_move: 1119/1119 PASS, 0 regressed → REACH-OK` (full spread;
  stronger than the ship-time 80).
- `verify mfndpos`: vacuous (0 blocked — expected) + smoke 24/24
  REACH-OK.

No REGRESSED session. Movement confirmed exactly as claimed; the
C-wrong below is latent (no current corpus session wears mummy
wrapping with desynced B at an mfndpos call), which is why reach is
green — it is still a C-wrong, not a named omit.

## Actionable C-wrongs

1. **mfndpos inline Invis clone (js/mon.js:3131–3136) omits the BInvis
   mummy-wrapping arm and must be the import.** C `worn.c:39` W_BLOCKS
   blocks INVIS for worn mummy wrapping; canonical `BInvis()`
   (timeout.js:1739–1744) and every conforming clone (mhitu/potion/zap)
   implement the cloak arm; the inline does not, so it reads Invis=TRUE
   where C reads FALSE on worn-wrapping + desynced-B states. Fix (one
   port iter): `import { Invis } from './timeout.js'` in mon.js
   (`--can` VERDICT: SAFE; shk↔timeout precedent), delete the 5-line
   inline + the now-unused INVIS const if unreferenced elsewhere;
   re-run the D-3874 test + `verify --fn m_move` (expect Valkyrie PASS,
   Caveman still 900+). Do not "fix" by copying the cloak arm into the
   inline — that keeps the 5th clone `sym.mjs` forbids.

Verdict: **QUALITY-RISK**
