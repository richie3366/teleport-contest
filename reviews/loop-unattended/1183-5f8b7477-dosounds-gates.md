# Review 1183 — 5f8b7477 — dosounds gates (D-2217)

Metadata: SHA `5f8b7477`, `js/sounds.js` + `js/pray.js`
+ `js/vault.js` (168+/42−), D-2217. Queue row
dosounds family (0 blocked) — four named-deferred
gates: seven unwired Soundeffect sites; temple gate
missing Is_sanctum; findgd missing migrating arm +
heal; temple %s arms using align_gname where C hears
halu_gname.

Intent vs deliverable: subject promises all four
gates. Diff delivers them: seven Soundeffect(se,vol)
sites; Is_sanctum temple gate; halu_gname full port
+ temple %s re-point; findgd heal + migrating arms.
Three modules, one envelope — combined-arm-legal
(every reached callee LIVE or map-named).

Inventory: `halu_gname` local → exported + full
Hallu body (C callee now LIVE); throne/beehive/vault
sound arms gain Soundeffect calls (LIVE no-op);
`temple_priest_sound` %s re-pointed
align_gname→halu_gname; `findgd` gains heal +
migrating arms (same-module parkguard, live
mon_track_clear). No bodies deleted.

**C ↔ JS fidelity**: verified site-by-site.
Soundeffect — throne `se_courtly_conversation/30` +
`se_sceptor_pounding/100` only on which 0/1
(`sounds.c:45–56`; which=3 «cats!» correctly gets
none) ✓; beehive 30/100/100 in arm order (`:69–79`)
✓; vault `se_someone_searching/30` +
`se_guards_footsteps/30` (`:262–270`) ✓. JS
`Soundeffect` (`sndprocs.js:36`) is an empty no-op
≡ contest C `#define Soundeffect(seid,vol)` without
SND_LIB (`sndprocs.h:269`) — zero behavior change;
all seven se ids are real generated constants
(`seffects_data.js`). Temple gate now
`!(Is_astralevel||Is_sanctum)` ≡ C `:330–331` ✓
(Is_sanctum live, `const.js:3256`). halu_gname
matches `pray.c:2577–2619` exactly: non-Hallu
align_gname; `randrole(TRUE)` ≡
`rn2_on_display_rng(SIZE(roles)-1)` (role.c:719–727)
≡ JS `rn2_on_display_rng(roles.length)` — C
`roles[NUM_ROLES+1]` carries a terminator while JS
`roles.length` is 13 with lgod/ngod/cgod fields
present; 14-entry hallu_gods table byte-identical;
rn2(9) switch, Moloch case 8, impossible default,
Paranoia fallback, `_`-strip ✓. All draws on the
display stream — zero positional-RNG impact. findgd
matches `vault.c:204–232` line-for-line: fmon
isgd+on_level scan with `!mx && !gddone` heal;
migrating scan with unlink≡splice, prepend≡unshift,
mon_track_clear, mux/muy, mx=my=0, parkguard ✓ (C's
comment even states the simplified-mon_arrive
rationale JS quotes). Both new static edges already
existed (`--can` → ALREADY for sounds→pray and
vault→monmove) — no cycle question. Newly-async
halu_gname: both callers await (doturn, temple);
only other mention is a do_name.js comment.
Residuals (priest.c:364 pname, null-gdlevel
tolerance) named in D-log; Soundeffect no-op
matches contest C — not a stub in a live arm.

Hallucinations / overclaim: none. «Seven sites in
C order/volumes» counts exactly the seven added
calls.

Density: §2b combined-arm port of one envelope;
map omits retired in-commit. Fine.

Verification: D-log claims hidden vacuous +
green/strict/cohort + full 44/44, explicitly not a
corpus PASS. Confirmed: `verify dosounds` and
`verify findgd` both → 0 blocked with the runner's
own vacuous-not-PASS warning. Honest. No banned
patterns; end-of-iteration cadence re-confirms the
shared-file full suite at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
