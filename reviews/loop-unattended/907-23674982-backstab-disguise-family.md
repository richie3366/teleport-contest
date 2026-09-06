# Review 907 — 23674982 — backstabbable/disguise family + zap wiring (D-1937)

Metadata: SHA `23674982`, D-1937. Files: `js/uhitm.js`
(+42: three exports), `js/zap.js` (+14/−4: STRIKING
guard + dobuzz miss arm). Map-driven Open row, 0 corpus
blocks cited.

Intent vs deliverable: subject promises three
predicates plus wiring two live zap arms that were
C-wrong (mimic over-reveal; dead `_saymiss`). The diff
delivers exactly that. Promise ≡ diff.

Inventory: three new sync exports (`uhitm.js:369`,
`:386`, `:396`; single definitions). Two call-site
edits, no new module edges (uhitm edge already
imported by zap). No stub, no new omit.

**C ↔ JS fidelity**: `backstabbable`
(`uhitm.c:920–931` via csym) — seven-clause order
exact (amorphous → whirly → noncorporeal → three
mlets → canseemon → flee-or-helpless); `!!(mflee ||
helpless)` keeps C 0/1. `disguised_as_mon`
(`:6307–6312`) and `disguised_as_non_mon`
(`:6299–6305`) keep C two-clause shape and
short-circuit order; single `M_AP_TYPE` read is
equivalent (pure field macro). Call sites read
directly in `zap.c`: `:197`
`if (disguised_mimic && !disguised_as_mon(mtmp))` —
JS verbatim; `:4952–4955` `saymiss ||
(canseemon && !disguised_as_non_mon)` → `miss(...)` —
JS verbatim modulo the pre-existing file-local
`miss_msg` shape (named in-commit). Callee closure:
LIVE = `amorphous`/`noncorporeal` (monsters.js),
`sensemon`/`canseemon` (display.js, export imported —
not a 7th clone), `seemimic` (mon.js), `M_AP_TYPE`
(const.js). CLONE-reuse (pre-existing, not added
here): `helpless` (uhitm.js:359), `miss_msg`
(zap.js:3507, nuance named). No RNG either side.

Hallucinations / overclaim: none. "New arms inert on
the fortress" is a stated observation, not a PASS
claim.

Density: 52/−4 for a three-predicate family + two
wired arms — right-sized per §2b.

Verification: re-measured `hidden-proxy verify
backstabbable --base 23674982~1` → `0 session(s)
blocked (0 at baseline, 0 working)` — vacuous as
stated. D-log gates: preflight + post green 2/2 +
strict ×2, cohort 7/7; full skipped (no shared file)
— legitimate. Rule #2 clean. Diff grep: zero banned
hits (only the message's own denial).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
