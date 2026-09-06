# Review 886 — 9b35a3ff — uhitm.c hmonas polymorphed-hero weaponless attack-type envelope (D-1916)

Metadata: SHA `9b35a3ff`, D-1916. Files: `js/uhitm.js` (+133/−~60 in
`hmonas`), `js/mhitm.js` (1 word: `failed_grab` added to the export
list). Queue row archived, map `turns.md` updated. Next index 886.

Intent vs deliverable: subject promises the weaponless envelope —
shared-dhit discipline, seduce no-wakeup, wakeup-before-verbs,
per-aatyp verb + silver bonus, shade override, failed_grab, TENT vs
verb arms, silver_sears, specialdmg into damageum, multi_claw
pre-count + odd_claw/WEAP toggles, `get_mattk` sum arg, impossible +
knockback-break tails. The diff delivers all of it, plus the one-word
`failed_grab` export the envelope needs. Promise ≡ diff.

Inventory: 0 new functions, 1 promotion (local→export list, body
untouched), 1 body completed (`hmonas`), 0 deletions.

**C ↔ JS fidelity** (`csym hmonas` →
`nethack-c/upstream/src/uhitm.c:5423–5860`, 438 lines; envelope
`:5423–5460` + `:5575–5670` + `:5810–5820` read, `odd_claw`/`dhit`
sites grepped): branch-by-branch confirm. Pre-loop multi_claw count
(WEAP/CLA/MISS-equivalent TUCH arms, `>1` → boolean) ✓ matches
`:5436–5450`; `get_mattk(ym,i,mon,sum)` both loops ✓ (C `sum` +
`&alt_attk`; alt_attk a named omit). WEAP-arm `odd_claw = !odd_claw`
before the bimanual gate ✓ — C `:5450` line 50 carries the `/* see
case AT_CLAW,AT_TUCH below */` comment, exact. Shared-`dhit`
discipline ✓ — WEAP assigns the outer (was `wep_dhit` local),
weaponless assigns the outer (was shadowing `const dhit`, which let an
EXPL `-1` leak into later arms); BREA/SPIT/GAZE reset `dhit = 0` ✓
(C line 394 `:5812–5816`). Seduce: no-wakeup + `damageum(...,0)` ✓
(C `:5582–5594`, including the `break`-past-wakeup shape). Wakeup
before the verb switch ✓. Per-aatyp verbs exact: TUCH `touch`, CLAW
`claws`, TENT `tentacles`, KICK `kick`, BUTT `head butt`, BITE `bite`,
STNG `sting`, default `hit` ✓; ring-mask alternation
`(odd_claw||!multi_claw)?W_RINGL : 0` /
`((!odd_claw||!multi_claw)?W_RINGR : 0)` with W_ARMG ✓ (C lines
185–190); KICK→W_ARMF (new const import, `const.js:2444`
`0x00000020` ✓), BUTT→W_ARMH ✓. Shade arm ✓ —
`(mnum ?? data.mndx) === PM_SHADE` (predicate unchanged from the old
code), `verb === 'hit' || (CLAW && humanoid)` → `attack` override (C
`!strcmp(verb,"hit")`), `Your ${verb} ${vtense} harmlessly through`
(C `Your("%s %s harmlessly through %s")`); non-humanoid CLAW keeps
`claws`, matching the D-log probe. `failed_grab(youmonst,mon,mattk)`
before the TENT split ✓ (C order; miss leaves `sum[i]` at its
pre-filled `M_ATTK_MISS`, `uhitm.js:2231` ✓); CLAW→`hit` reset on
connect ✓; `silverhit.v && verbose !== false` → `silver_sears` ✓ (C
`silverhit && flags.verbose`; `!== false` preserves C's verbose-on
default); `damageum(...,specialdmg)` with TENT correctly carrying 0
✓. Unknown aatyp: `continue` → `await impossible('strange attack of
yours (%d)')` with passive running ✓ (C line 398 `:5818`). Knockback:
fire-and-forget → `if (...) break` ✓ (C line 412; stub still FALSE so
no RNG burn changes — disclosed). Callee closure all LIVE:
`special_dmgval`/`silver_sears` (uhitm locals/imports, line 40),
`vtense` (objnam import, line 80), canonical `failed_grab`
(mhitm.js:3443, 3-arg C signature, already used by two mhitm call
sites). Named omits (`gv.vis`, `alt_attk`, `failed_grab_you` for
hugs/ENGL, remaining `mhitm_ad_*`) are real map rows.

Hallucinations / overclaim: none. "No new clones" holds —
`failed_grab_you` untouched for hugs/ENGL; the mhitu.js:1421 2-arg
local is pre-existing drift in another caller family, not written
here. One tool note: `sym.mjs failed_grab` reports "NOT EXPORTED …
2 LOCAL CLONES" because it does not parse `export { … }` list form —
the export at `mhitm.js:669` is real (verified by read); treat that
output as a parser gap, not a code gap.

Density: one C envelope + its forced export word, ~135 js lines — in
band, single-locus. Correct shape.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7)
plus two hand probes with C-shaped output quoted (shade `claws pass
harmlessly`, silver-ring `sears` + mhp 100→85). Re-measured:
`hidden-proxy verify hmonas --base 9b35a3ff~1` → `0 session(s)
blocked on it (0 at baseline, 0 in the working scoreboard)` —
vacuous as stated, map-driven row. `imports.mjs --rulecheck` → Rule
#2 clean (HEAD). Diff grep: no FORCE/DIAG/seed/coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
