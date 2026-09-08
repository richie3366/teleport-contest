# Review 1118 — a56c8567 — hmon_hitmon_weapon_melee Healer/Rogue/shatter/artifact (D-2152)

Metadata: SHA `a56c8567`, js/ +142/−~15 in `uhitm.js` only. D-log
D-2152. Subject promises: Healer anatomy + Rogue backstab + shatter +
artifact doreturn; 1 session PASS (scen-normal-Rogue-92146).

Intent vs deliverable: promise matches diff. Actually adds: new
file-local async `hmon_hitmon_weapon_melee(mon, obj, ctx)` (~95 lines)
plus call-site wiring in `hmon` (ctx pack/unpack, doreturn early-return
citing `hmon_hitmon :1797`). Previously JS had no such function (brief:
NOT FOUND) — this fills a whole-function gap, not a tweak.

Inventory: one new function (combined-arm port, verified CLONE of C
`:933–1067` minus named tails), import-line extensions only
(P_KNIFE/P_NONE/P_SKILLED/NEED_WEAPON, PM_HEALER/PM_ROGUE,
ART_CLEAVER, setmnotwielded/is_flimsy/extract_from_minvent,
Yobjnam2, obj_resists). No new module edges.

**C ↔ JS fidelity**: confirmed against `uhitm.c:933–1067` (csym range;
`:933–1013` and `:1000–1067` read directly). Branch order exact:
dmgval + `dmg>1` train gate; Healer `P_KNIFE` +
`min(3, died/6)` with integer division (`Math.trunc`, C `min`);
no-bonus gate (`!train || ustuck || twoweap || hand_to_hand+Cleaver`)
verbatim incl. comment; Rogue pline-then-`rnd(ulevel)` + hittxt;
shatter conjunction (dieroll==2, obj==uwep, WEAPON_CLASS,
bimanual||Samurai-KATANA-no-shield, wtype!=P_NONE &&
skill>=SKILLED, MON_WEP non-null && !flimsy && !obj_resists with the
`50+15*erosion-diff` chance) verbatim; both message arms
(Yobjnam2 vs s_suffix(Monnam)+plur+otense + shared
`from_your_blow`); `m_useupall`→`extract_from_minvent` (GC rationale
sound); `rn2(4)`→`monflee(d(2,3),TRUE,TRUE)`; artifact_hit doreturn
(killed→FALSE, dmg-zero→TRUE) with dmgBox write-back on BOTH return
paths — correctly mirroring C's "artifact_hit updates tmp" comment,
including the falsy-return write-back the old inline code also had.
RNG call-for-call on the shipping path: backstab `rnd(ulevel)` is the
reported first-diff draw. Inlined helpers verified, not assumed:
`uwep_skill_type` ≡ `twoweap ? P_TWO_WEAPON_COMBAT : weapon_type(uwep)`
(matches C weapon.c); `greatest_erosion` ≡ max(oeroded,oeroded2);
`bimanual` local (`uhitm.js:774`) byte-identical to `wield.js:951`
export (read both here) — verified CLONE, and the D-log is transparent
about keeping the local over the export.
Unshipped tails (silver/light flags, joust, thrown-ammo/poison,
permapoisoned) are named in the function docstring AND map `turns.md`
in this commit; their consumers don't exist in JS hmon either
(standing map entries), so the flags would be dead — legitimate named
omits, no STUB in a live arm. `hand_to_hand` pack mirrors `:1780`.
Callee closure: `MON_WEP`/`is_flimsy`/`obj_resists`/`setmnotwielded`/
`Yobjnam2`/`Monnam`/`otense`/`artifact_hit` all LIVE;
`obj_resists` from dogmove.js rides an ALREADY edge
(`--can`: no new edge), used at call time (no TDZ read).
`sym.mjs`: `backstabbable → js/uhitm.js:383 sync`,
`obj_resists → js/dogmove.js:110 sync`.

Hallucinations / overclaim: none. "Exact C order and short-circuit"
holds for the shipped arms; deferrals are named, not hidden.

Density: 142 insertions, one C function in one module, code+map+verify
in one handoff. Right-sized (largest of this batch, still one locus).

Verification: D-log bullet shows `verify.mjs` → hidden 1 PASS +
green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify hmon_hitmon_weapon_melee --base a56c8567~1` →
"1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS"
(Rogue-92146 PASS). True claim. Banned-pattern grep over js/ hunks:
zero hits. Rule #2 covered by D-log verify PASS.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
