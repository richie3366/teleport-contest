# Review 891 — eb154b73 — hitmu envelope arms (D-1921)

Metadata: SHA `eb154b73`, D-1921. Files: `js/mhitu.js` (+52/−12:
midnight, knockback defender, Half/Mitre, permdmg). Map-driven
Open row, 0 corpus blocks cited. Next index 891.

Intent vs deliverable: subject promises the midnight undead
extra, Half/Mitre halve, permdmg hpmax cut, and knockback
defender. The diff delivers all four; nothing else. Promise ≡
diff.

Inventory: no new helpers. New imports ride existing edges (no new
module edge per D-log, verified by inspection — the hunk extends
already-present import lists): `sym.mjs midnight` →
`js/calendar.js:183 sync`, `sym.mjs is_undead` →
`js/monsters.js:636 sync`, `sym.mjs minuhpmax` →
`js/attrib.js:282 sync` (plus `is_vampshifter`/
`mon_hates_blessings`/`PM_CLERIC` on the same live edges). No stub
added, no clone added (the pre-existing `is_undead` clone in
pray.js is untouched by this SHA). No omit beyond the named ones
(full `mhitm_adtyping` arms, knockback hurtle body, passiveum
detail — all named at their docs).

**C ↔ JS fidelity** (`csym hitmu` → mid-body incl. the permdmg
block, read in full): midnight gate + second `d(damn,damd)` exact
— RNG: the second draw is gated in both, so draw counts match.
Knockback args exact except `hitflags` by value; the D-log is
honest about it, and the callee is still the named-deferred stub
(which currently returns without touching flags), so no write is
dropped today. Residual debt, not a new C-wrong: the call site must
go writable when the knockback body ships. Half `(damage+1)/2` via
`Math.trunc` (damage>0 here, ≡ C truncation); Mitre arm with the
`questarti!==0` repo guard, role check via generated `PM_CLERIC`,
`mon_hates_blessings` — exact. permdmg `rn2(trunc(damage/2)+1)`,
25x/10x/5x scaling, poly-vs-normal lowerlimit (`Math.min` on both
sides) + clamp — exact. Dual `disp`+`flags` `botl` is this file's
existing idiom (same pattern at `:604-605`, `:758-759`).
`mdamageu` position unchanged. No RNG reordered.

Hallucinations / overclaim: none. No corpus claim, no probe —
correctly scoped for a 0-block row whose callees are all live and
cohort-covered; the D-log does not dress that up as verification.

Density: 64-line single-function envelope — right-sized per §2b.

Verification: re-measured `hidden-proxy verify hitmu --base
eb154b73~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
