# Review 909 — 53deed83 — polyuse/mon_spell_hits_spot/wish menu (D-1939)

Metadata: SHA `53deed83`, D-1939. Files: `js/zap.js`
only (+81/−3: two async exports + one no-op). Map-driven
Open row, 0 corpus blocks cited.

Intent vs deliverable: subject promises three zap-misc
symbols with deferred caller arms. The diff delivers
exactly that. Promise ≡ diff.

Inventory: two new async exports + one sync no-op.
Imports extended on existing edges only (no new module
edge). Local `AD_MAGM`/`AD_ACID` consts beside existing
`AD_*`. No stub, no new omit beyond named caller arms.

**C ↔ JS fidelity**: `polyuse` (`zap.c:1504–1539`
via csym) — loop cond, nexthere prefetch, bypasses →
uball/uchain → obj_resists → SCR_MAIL → material-match
`== rn2(minwt+1)!=0` → costly bill/stolen → quan/
LARGEST_INT → delobj — arm-for-arm exact. MAIL guard
checked: `MAIL_STRUCTURES` is unconditional
(`global.h:430`), so always-skip-mail is right.
`mon_spell_hits_spot` (`:5500–5533` via csym) — MAGM/
ACID engraving wipe (`strlen + d(6,6)`, TRUE) then the
`AD_MAGM..AD_ACID` gate with `zt_typ = adtyp-1`,
`-ZT_SPELL(zt)` else impossible — exact. Constants
checked: AD_MAGM=1, AD_ACID=8 (`monattk.h:43,50`);
ZT_SPELL(x)=10+x (`zap.c:56`); `engr_txt.actual_text`
matches engrave.js shape; `{v:false}` is the
established `zap_over_floor` out-param idiom (also at
zap.js:2058). `wish_history_menu`: verified the C body
opens with `#ifdef DEBUG` at `:6277` (read directly)
— the JS no-op IS the production shape, not a stub;
DEBUG menu named deferred. RNG: `rn2(minwt+1)` and
`d(6,6)` call-for-call. Callee closure all LIVE or
same-module.

Hallucinations / overclaim: none. Triple vacuous
verify stated as vacuous.

Density: 81 lines for three symbols in one module —
one C locus family, right-sized per §2b.

Verification: re-measured `hidden-proxy verify
polyuse --base 53deed83~1` → `0 session(s) blocked
(0 at baseline, 0 working)` — vacuous as stated.
D-log gates: preflight + post green 2/2 + strict ×2,
cohort 7/7; full skipped (single file) — legitimate.
Rule #2 clean. Diff grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
