# Review 2101 — 6c8474344 — attrib.c restore_attrib + postadjabil

- SHA: `6c84743446f343fd77428d50c7c3306f34d2b1b5` (D-3141)
- Parent: `b20fdf92d`
- Files: `js/attrib.js` (+65/−3) only; docs + ledger otherwise
- Cluster: 2 whole C functions, one C file + 2 stale dispositions

## Intent vs deliverable

Subject promises: "restore_attrib + postadjabil (coverage head + same-file MISSING sibling)".
Diff actually adds: exported async `restore_attrib`, local `postadjabil`, the adjabil changed-gate
wire, two import-name additions, dynamic-import `encumber_msg`, and dropped deferral comments.
Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `restore_attrib` | new export (async for encumber_msg) | `attrib.c:454–484` |
| `postadjabil` | new local (C staticfn) | `attrib.c:778–786` |

No clones; no deleted symbols. Callees: in-file `acurr` (sync), `encumber_msg` (invent.js ASYNC,
awaited, via the file's dynamic-import idiom to avoid the invent cycle), `see_monsters`
(display.js sync, same-edge addition).

## C ↔ JS fidelity

**restore_attrib** (`:454–484`) — confirm. A_MAX loop; equilibrium
`(i==A_STR && uhs>=WEAK) || (i==A_DEX && Wounded_legs)` → −1/0 (`:472–473`) with C WEAK = 3
(hack.h:567) ≡ JS `WEAK = 3`; `--ATIME` countdown (`:474–475`); ATEMP step toward 0 + botl
(`:476–477`); `Math.trunc(100/acurr(A_CON))` retimer ≡ C integer division (`:478–479`);
live `disp.botl` read before `encumber_msg` (`:483–484`). Wounded_legs inline
(`u.Wounded_legs || (HW&TIMEOUT) || EW`) follows the 7-site repo precedent (allmain/apply/dokick/
potion); TIMEOUT is the 0x00ffffff count mask (prop.h:135), the flat flag is trap-maintained,
and WOUNDED_LEGS has no permanent intrinsic granter — equivalent to C `(H || E)` (youprop.h:138)
in practice, not a C-wrong here (the form-1/form-2 repo variance predates this SHA).
Dead-like-C: no `u.atime` writer exists in JS and C's own comment (`:461`) says ATIME is never
set nonzero — the countdown arm is unreachable on both sides, and the unguarded `u.atime.a[i]`
write sits behind the `atime !== 0` guard, so no throw hazard. Zero C callers → exported but
called from nowhere, as documented.

**postadjabil** (`:778–786`) — confirm. `ulevel` early return (`:782–783`); pointer identity on
`&HWarning`/`&HSee_invisible` becomes exact prop-string compare (`:784–785`), and the abil tables
use exactly `'HWarning'`/`'HSee_invisible'` (attrib.js:902/914/…). Wired at adjabil :1060 behind
`prev !== (u[prop] || 0)` ≡ C `:1063–1064` "it changed" (C verified in-file: `prevabil !=
*(abil->ability)` → `postadjabil(abil->ability)`). Sole C caller wired; no foreign callers.

**2 stale:** `vary_init_attr` live with its caller at u_init.js:2025 ✓; `check_innate_abil` live
with callers now at :1181/:1183 (shifted +57 by this hunk from the cited :1124/:1126 — consistent).
Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. The commit subject abbreviates Verify to one line, but the D-log carries per-function
Verify sub-bullets for both functions (vacuous + REACH-OK each) plus the shared gates.

## Density

Breadth-phase cluster: 2 whole C functions, one C file, 68 js changed lines. Below the ~80 floor
but justified in the D-log (attrib.c holds nothing more Open). Each function has its Ledger entry
(both ported) and Verify line. Per-function verdicts: both ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify restore_attrib,postadjabil --base 6c8474344~1 --reach-all`
→ both `0 blocked` + `smoke 24 PASS, 0 regressed → REACH-OK`. No REGRESSED. Matches D-3141.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
