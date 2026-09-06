# Review 866 — eb2fae2f — read.c seffect_* scroll arms (D-1896)

Metadata: SHA `eb2fae2f`, D-1896. Files: `js/read.js` (+575/−23:
15 new functions + `seffects`/`doread` dispatch + import-name
extensions on existing edges). Next index 866.

Intent vs deliverable: subject promises eight scroll arms plus two
spell-duplicate arms, "all eleven C functions in C branch order".
The diff delivers `seffect_charging/amnesia/confuse_monster/
scare_monster/enchant_armor/earth/stinking_cloud/mail` +
`do_stinking_cloud` + `display/can_center` + `forget` +
`drop_boulder_on_player/monster` + `p_glow3`, with dispatch and
consumption wiring. Promise ≡ diff.

Inventory: 15 new functions, all file-local. Callee closure — every
added import name joins an EXISTING static edge, verified:
`--can` ALREADY for hack, region, getpos, rumors, zap, monmove,
uhitm, mhitm, shk, weapon, mondata, trap, worn, do_wear, hacklib,
do_name, spell, mkobj, mon, do, vision, sndprocs (21 checks, all
ALREADY). Dynamic `polyself`/`potion`/`steal` where the module
already imports dynamically. Nothing deleted or re-pointed (the `-`
lines are import-list and gate-condition extensions only), so no
re-point `sym` output is owed. `Blind_read`/`Yobjnam2_read` are
pre-existing helpers, not new clones.

**C ↔ JS fidelity** (each function vs its `csym` range; RNG
call-for-call): charging ≡ `read.c:1787–1827` (confused
discharge/`d(6|4,4)`+uenmax rule; learnscroll/useup-first/
getobj+recharge order; kept/null return feeds the `1/0` protocol
which `doread` honors with single useup) ✓; amnesia ≡
`:1829–1847` (ALL_SPELLS gate, Hallu/Maud/`rn2(2)`, WIS) ✓; forget
≡ `:1019–1040` (`uball` ≡ Punished, `losespells`,
`rnd(5|3)`, both meverseen loops) ✓; confuse ≡ `:1398–1451`
(S_HUMAN/scursed arms, `rnd(100)` ×2, `rnd(2)`/`rn1(8,2)`,
40-cap) ✓; scare ≡ `:1453–1486` (cansee loop, un-flee,
resist→monflee, ct-gated sounds + distance) ✓; enchant ≡
`:1114–1290` (no-armor strange_feeling, confused erodeproof
sequence, elven 5-list ≡ `obj.h:299`, same_color arms,
`rn2(s)` evaporate, `(4-s)/2` with `|0` truncation,
`rnd(s)`/`rn2(spe)`/`rn2(7)`, dragon range ≡ `obj.h:347`,
spe/cap/curse-bless chain, vibrate tail) ✓; earth ≡ `:1918–1973`
+ boulders ≡ `:2293–2410` (`rn1(5,2)`, helmet cap 2, `killed`/
`mondied`/`wakeup`, `wake_nearto` 16 = 4×4, floor-before-losehp,
`Maybe_Half_Phys`; `losehp` is sync so un-awaited is correct) ✓;
cloud family ≡ `:1990–2002`, `:3080–3105`, `:1079–1112`
(`dist2` ≡ `hacklib.c:672–678` verified; `getpos` mutates ccp
with -1/0 codes, `gp < 0` matches; `15+10·bcsign`,
`8+4·bcsign`) ✓; mail ≡ `:2155–2188` (o_id parity, spe 2/1
strings exact, default takes the C `#else` text with `readmail`
named-deferred) ✓; `p_glow3` ≡ `:679–685` exact ✓.
`has_ceiling`/`avoid_ceiling` are inlined but verified exact
against `dungeon.c:1689–1711`. Four notes, none queueable:
(1) `isShield` tests `oc_skill === 1` instead of the file's own
`armcat()` idiom — equivalent (armcat reads oc_skill,
ARM_SHIELD=1, otmp is armor by construction); style only.
(2) dragon arm drops the `was_lit` restore — contained in the
named light-radius deferral. (3) `p_glow3` is exact but unwired
(its only C caller is `recharge()` `:789` lim==1, pre-existing
D-1502, not this arm). (4) the SPE_CONFUSE/SPE_CAUSE_FEAR
`seffects` cases are correct but unreachable until
`spelleffects` routes them — that routing is a named omit
(`turns.md:163–164`), and the spellbook-class `incr` arm
already handles it.

Hallucinations / overclaim: none. No corpus PASS is claimed;
the vacuous note is quoted with the zero-block row cited.

Density: 575 insertions across eleven functions + one dispatch —
one tight `read.c` envelope (the practical seffects switch),
coherent though at the top of the band.

Verification: D-log gates all PASS; `skip full` per the tool (no
shared file changed). Re-measured myself:
`hidden-proxy.mjs verify seffect_enchant_armor --base
eb2fae2f~1` → `0 blocked (0 at baseline, 0 working)` — vacuous
as stated; HELDOUT Tier C row cited no blocks, so public gates
carry it. Diff grep: no FORCE/DIAG/seed/coordinate code (one
hit is the message's own "no DIAG/FORCE/seed gates" text).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
