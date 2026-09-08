# Review 1091 — 137e650f — mon_wield_item artifact_light arm (D-2125)

Metadata: SHA `137e650f`, `js/weapon.js` +23/−5, `js/objnam.js` +2/−1
(export keyword only). Queue row `light.c` arti_light_description,
scen-poly-Tourist-92047 step 161/280: C «The long sword named Sunsword
shines brilliantly in the Arch...» vs JS «The Archon swings his long
sword named Sunsword. The Archon ...». No prior review claimed closed.

## Intent vs deliverable

Subject promises: a newly-wielded light artifact ignites plus the
wield-shine pline. Diff actually adds: (1) the
`artifact_light(obj) && !obj.lamplit` arm in `mon_wield_item`
(`begin_burn` first, then canseemon shine pline / cansee distance
pline); (2) `arti_light_description` export in objnam.js (body
untouched); (3) `Tobjnam` / `arti_light_description` / `dist2` /
`begin_burn` imports. Promise matches diff.

## Inventory

Changed JS: `mon_wield_item` (weapon.js) — one new arm;
`arti_light_description` — export only. Callee closure:

| Symbol | Status | Evidence |
|---|---|---|
| `artifact_light` | LIVE (`timeout.js:1237` sync) | pre-existing import |
| `begin_burn` | LIVE (`timeout.js:1389` sync) | newly imported, C-locus module |
| `arti_light_description` | LIVE (`objnam.js:2363` sync) | import-the-export, body untouched |
| `Tobjnam` | LIVE (`objnam.js:1626` sync) | newly imported, not an 8th clone |
| `dist2` | LIVE (`hacklib.js:23` sync) | the C-locus export; hoisted, no TDZ risk |
| `s_suffix` / `mon_nam` / `mbodypart` / `canseemon` / `cansee` | LIVE, pre-existing | untouched |

No STUB, no clone, no new module-cycle risk (all target modules
already imported by weapon.js; `imports.mjs --rulecheck` clean
tree-wide). The `mwelded` refuse-wield arm above stays named-deferred
(map + header), so live-code relative order matches C.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/weapon.c:800-934` (`csym.mjs
mon_wield_item`, 135 lines); the arm is `:918-928`, pulled verbatim:

- `begin_burn(obj, FALSE)` before any pline — JS honors this, and the
  D-log states why (the lit radius/adverb read the lit state).
- canseemon: `pline("%s %s in %s %s!", Tobjnam(obj,"shine"),
  arti_light_description(obj), s_suffix(mon_nam(mon)),
  mbodypart(mon, HAND))` — JS template matches field-for-field.
- `else if (cansee(mx,my))`: `pline("Light begins shining %s.",
  mdistu(mon) <= 5*5 ? "nearby" : "in the distance")` — JS matches.
- Distance predicate verified through the macro chain:
  `mdistu(mon)` ≡ `distu(mx,my)` (`hack.h:1532`) ≡ `dist2(...)`
  (`hack.h:1531`); JS `dist2` is squared-Euclidean (`hacklib.js:23`).
  Both compare `<= 25`. Identical.
- `obj->owornmask = W_WEP; return 1;` position preserved; the wields
  pline stays before `owornmask` set (the 3.6.3 '(weapon in hand)'
  concern from the C comment).

RNG call-for-call: this arm draws nothing on either side (the
`rnd`/`rn2` draws in the session come from surrounding combat, not
this arm). `resists_blnd_by_arti` inside the adverb path is
named-deferred with the weld arms.

## Hallucinations / overclaim

None. "Exact C order" holds for the shipped arm per the text above;
deferred arms are named in header + map, not hidden.

## Density

22 insertions for a 24-line C arm — the whole envelope. Small but
complete; acceptable ("C is that small").

## Verification

D-log Verify bullet: `verify.mjs --fn arti_light_description` →
PASS syntax + PASS rule2 + hidden PROGRESS + green 2/2 + strict ×2 +
cohort 7/7 (full skipped, no shared file). Re-measured myself:
`hidden-proxy.mjs verify arti_light_description --base 137e650f~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Tourist-92047 moved 161 → `gazemu`@163). Grep: no FORCE/DIAG/seed/
fastforward/coords. Queue row archived; map retires the arm from
named omits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
