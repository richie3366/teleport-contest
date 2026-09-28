# Review 2016 — cd05c0f73 — zap.c hero-spell ray bonus

Metadata: SHA `cd05c0f73`, D-3056, js/zap.js (+70/−~20). Two-function
single-C-file cluster (spell_hit_bonus whole; wish_history_menu gate +
named omit) + one ledger-stale disposition (bydoor, no `js/`).

## Intent vs deliverable

Subject promises "`spell_hit_bonus` new; `zap_hit` + dobuzz
`spell_type` wired; makewish history-menu gate". Diff actually adds:
file-local `spell_hit_bonus` (js/zap.js:1377), `zap_hit` rework to
C `:4705–4719`, dobuzz `spell_type` at the `:4872` site, makewish
`:6334` gate, plus spell.js/weapon.js/const.js import edges. Matches
promise. No more, no less.

## Inventory

- `spell_hit_bonus` (new file-local js/zap.js:1377, sync) — C
  zap.c:3508–3544 (csym range; body :3509–3543). C `staticfn`, so
  file-local is the correct shape.
- `zap_hit` (reworked file-local js/zap.js:1408, sync) — C
  zap.c:4704–4720. Signature `zap_hit(ac, _type)` → `zap_hit(ac, type)`.
- dobuzz `spell_type` (new const js/zap.js:2275) — C zap.c:4800.
- makewish `:6334` gate (js/zap.js:7275) + `wish_history_menu` comment
  refresh (no-op kept) — C zap.c:6334–6337 / :6273–6309.
- Ledger-only: `bydoor` → ported (stale; C staticfn, no `js/` change).
- No deleted symbols, no clone→import re-points (imports are additive).

## C ↔ JS fidelity

`spell_hit_bonus` vs C `:3509–3543` (csym), branch-for-branch: skill
switch `:3514–3528` — RESTRICTED/UNSKILLED → −4, BASIC → 0, SKILLED →
2, EXPERT → 3, no default arm in either ✓; DEX chain `:3530–3541`
(−3/−2/−1/−0/`+= dex−14` with the C:3540 abon comment) ✓ including
the explicit `-= 0` arm; `return hit_bon` `:3543` ✓. Zero RNG both
sides. Callees: ACURR(A_DEX)→live `acurr` (js/attrib.js:113),
P_SKILL→live js/weapon.js:1273, spell_skilltype→live js/spell.js:421 —
all LIVE imports, no new clones (sym warns of pre-existing clones in
u_init/dothrow/spell.js; this commit correctly imported the exports).
Callees: LIVE × 3. Verdict: exact.

`zap_hit` vs C `:4704–4720`: `rn2(20)` first `:4709` ✓, then
`spell_bonus = type ? spell_hit_bonus(type) : 0` `:4710` (JS
`(type|0) ? spell_hit_bonus(type) : 0` — same gate; raw `type` passed
on, as C does) ✓; `!chance → rnd(10) < ac + spell_bonus` `:4713–4714`
uses pre-AC_VALUE ac both sides ✓; `AC_VALUE` fold
(positive as-is, negative → `−rnd(−ac)`) `:4717` ✓; `3 − chance < ac +
spell_bonus` `:4719` ✓. RNG order rn2→(no draw)→rnd identical.
Callers: C `:4872` (spell_type) → JS dobuzz passes `spell_type` ✓;
C `:4962` (0) → JS keeps 0 ✓ (diff shows only the :4872 hunk; the
:4962 site is untouched pre-existing `zap_hit(..., 0)` — confirmed the
diff does not alter it). Verdict: exact.

dobuzz `spell_type` vs C `:4800`:
`spell_type = is_hero_spell(type) ? SPE_MAGIC_MISSILE + damgtype : 0`
✓ verbatim. `is_hero_spell` is a C file-local `#define`
(`(type) >= 10 && (type) < 20`, zap.c:59), so the pre-existing JS
local (js/zap.js:1502, `(type|0) >= ZT_SPELL_0 && < 20`, ZT_SPELL_0=10)
is a verified CLONE — matches the macro exactly, not an import
candidate. Verdict: exact.

makewish gate vs C `:6334–6337`: `menu_requested && wish_history[0] &&
tries == 0 → wish_history_menu(buf) else getlin` ✓ mirrored. One
micro-gap: C applies `mungspaces(buf)` after *both* arms; the JS menu
arm skips it (buf keeps its stale value un-munged). Reachable only
when `menu_requested` is set, which no scored JS path sets (only read
in js/insight.js vanquished menus), and D-3057 (next SHA) restarts the
menu body anyway. Debt-level nit, not queueable — noted, not enqueued.

`wish_history_menu` body: honestly kept a no-op with the pick body
(`create_nhwindow`…`select_menu`) named in the map; Ledger `partial`,
not sold as ported. The C body is `#ifdef DEBUG` (on via
patchlevel.h:36) but every live line is NHW_MENU window calls with no
scored analogue — the named omit is legitimate, and the very next
commit (D-3057) ports the ring walk. No overclaim.

bydoor stale: C staticfn mklev.c with exactly 3 call sites (:87, :1781,
:2312 per csym); JS has the local def (js/mklev.js:31919) plus exactly
3 call sites (:31568, :31934, :32629). Disposition validated.

sym.mjs (diff adds imports; nothing deleted/re-pointed):
`spell_skilltype js/spell.js:421 sync` (+1 pre-existing clone in
u_init.js — not added here); `P_SKILL js/weapon.js:1273 sync`
(+2 pre-existing clones — not added here); `acurr js/attrib.js:113
sync`. All callee edges LIVE.

## Hallucinations / overclaim

None. D-log says "gate" for makewish (true — body still no-op),
"partial" for wish_history_menu (true), names the menu pick body as
the omit (true). No "Match C" claim on any stubbed callee. The
`imports.mjs --can` SAFE claim for the two new edges is consistent
with the committed tree loading (rulecheck clean, see below).

## Density

Breadth-phase cluster: 2 zap.c functions + 1 stale disposition, one C
file, ~70 `js/` insertions. spell_hit_bonus is whole (every arm,
every callee live, sole C caller zap_hit wired; zap_hit's both C call
sites wired). wish_history_menu is gate-only but sold as `partial`
with the body named — honest per §2b, and completed next SHA. Each
function has its Ledger entry and Verify sub-bullet. No bundling of
unrelated files, no Must-fix smuggled in. Density right-sized for a
27-line leaf + gate (below the 200-line target but the head's closure
held nothing more Open — the file's next Open row shipped as D-3057).

## Verification

D-log Verify bullet: syntax PASS · rule2 PASS · note hidden (0 blocks
both) · smoke 24/24 REACH-OK each · green 2/2 · strict · cohort 7/7.
Re-measured myself (`hidden-proxy.mjs verify
spell_hit_bonus,wish_history_menu --base cd05c0f73~1 --reach-all`):
both functions "0 session(s) blocked" + "no RNG-tagged reach; fixed
smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK" — matches the
D-log exactly, honestly presented as vacuous (rows cited 0 blocks).
No REGRESSED session. `imports.mjs --rulecheck`: "Rule #2 clean".
Diff grep for FORCE/DIAG/getRngLog/fastforward: 3 hits, all in
CURRENT.md "Do not" boilerplate — production clean. No seed/step/
coordinate reads, no hardcoded coordinates.

## Actionable C-wrongs

None. The makewish menu-arm mungspaces micro-gap is unreachable in
scored play (menu_requested never set) and adjacent to D-3057's
restart — recorded here, not queued.

Verdict: **ACCEPT**
