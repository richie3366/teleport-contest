# Review 1688 — c453b9ca9 — `rumors.c` outrumor whole body + cookie caller (D-2729)

Metadata: commit `c453b9ca9`, D-2729, `js/rumors.js` + `js/read.js` (+ `js/muse.js` doc-only). Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: outrumor faint/Blind gates + oracle/cookie/paper arms live, `read.c:368` cookie arm wired. The gates and cookie arm are all delivered and C-ordered — but the cookie arm's consume call resolves to the divergent local `useup` clone instead of the live export imported one line above. Promise mostly matches deliverable; one callee is a C-wrong (see §Actionable).

## Inventory

Changed JS: `outrumor` (`js/rumors.js`, gate block added, tail unchanged); `doread` (`js/read.js`, FORTUNE_COOKIE arm added, calls bare `useup(scroll)`); `FORTUNE_COOKIE` const; imports extended (`is_fainted`, `Blind`, `BY_COOKIE`, `outrumor`). `js/muse.js` doc-only. No deleted symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (gate names + the two `useup`s):

```text
is_fainted       js/eat.js:481   sync
BY_COOKIE        js/const.js:1753   sync   export const
Blind            js/invent.js:359   sync
             !! ALSO 31 LOCAL CLONE(S) in 31 files — IMPORT the export; do NOT add another
useup            js/invent.js:4596   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/detect.js:215  js/potion.js:331  js/read.js:260  js/spell.js:625
```

Gates all LIVE (`is_fainted`, `Blind`, `BY_COOKIE`, `bcsign`/`outrumor` on existing edges). The cookie arm's `useup(scroll)` binds the `js/read.js:260` local clone — **CLONE, and it diverges** (next section). The live `useup` (`invent.js:4596`) is already imported in the same file as `useup_live` (`js/read.js:107`).

## C ↔ JS fidelity

C loci read: `outrumor` gates (`rumors.c:539–549`, cited range) and cookie arm (`read.c:365–377`), both verbatim.

- Gates ✓ exact: `reading && is_fainted && BY_COOKIE → silent return`; `reading && Blind → scrap (cookie only) + pity + return`; `getrumor(truth, reading?FALSE:TRUE)` + renovation fallback untouched.
- Cookie arm ✓ except the consume call: verbose break-up `You` ✓, `outrumor(bcsign(scroll), BY_COOKIE)` awaited ✓, `!Blind` literate conduct + exact livelog text (`became literate by reading a fortune cookie`) ✓, `return 1` = ECMD_TIME ✓ — but `useup(scroll)` is the clone.
- Clone vs C (`read.c:377` calls the real `useup`; live cites `invent.c:1320–1333`): live does quan>1 → `update_inventory()`, else `useupall` = `setnotworn + freeinv + obfree`. The clone drops `update_inventory()` on the quan>1 path and replaces `useupall` with a bare invent splice — no `setnotworn` (a wielded cookie leaves `uwep` dangling), no `freeinv`/`obfree` teardown, no inventory refresh. Observable state/display divergence on exactly the object this new arm consumes.
- Callers: `read.c:368` → `js/read.js` cookie arm ✓ (only C caller of this path; outrumor's other callers untouched).
- RNG: gates run before `getrumor` draws, in C order — the faint/Blind arms newly *save* rumor RNG vs the old code ✓ direction-correct.

## Hallucinations / overclaim

The message names the clone ("local `useup` clone") but presents it as the implementation, not as a named omit — and per method, a diverging clone is a C-wrong, not an omit. The "Named: none new — whole C body live; every callee live" line is therefore overclaimed for this arm. No FORCE/DIAG/seed/coordinate logic.

## Density

Whole-function gates + one caller arm, two modules, correct size — but the arm shipped with a divergent callee that the live import (already present) would have satisfied. That is the Must-fix below, not a scope problem.

## Verification

Re-measured per-SHA re-run (`--base c453b9ca9~1 --reach-all`) — both lines, matching the D-log:

```text
verify outrumor: baseline c453b9ca9~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify outrumor: no corpus session is blocked on it at c453b9ca9~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke outrumor: no RNG-tagged reach; fixed smoke spread (24 run, 4.9s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log. Rule #2 clean. Verification is green, but verification does not erase the clone divergence (no corpus session reads a wielded/stacked cookie) — hence QUALITY-RISK, not REJECT.

## Actionable C-wrongs

1. doread FORTUNE_COOKIE arm consumes via the divergent `js/read.js:260` local `useup` clone (drops C `update_inventory()` + `useupall` `setnotworn/freeinv/obfree`) while live `useup` is already imported as `useup_live` in the same file: call `useup_live(scroll)` (one-line), or inline-equivalent. Source: this review.

Verdict: **QUALITY-RISK**

**Addressed:** D-2741 `d44374fc8`
