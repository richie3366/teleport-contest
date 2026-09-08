# Review 1047 — 6a12bc6f — armoroff delay-arm nouns (D-2077)

## Metadata

- SHA: `6a12bc6f` — `do_wear.c armoroff delay arm hardcoded generic nouns: Knight helm doff drew «helmet» where C draws helm_simple_name «helm», and dragon mail doff drew «mail» where C draws suit_simple_name «dragon mail» (queue owner armoroff) (D-2077).`
- JS diff: `js/do_wear.js` +42/−12 (dragon range consts, `suit_simple_name` dragon arms, 7-arm `armor_doff_simple_name`, doc).
- Docs: D-2077 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1047.

## Intent vs deliverable

Subject promises: the delay-arm `what` dispatches the same
per-category simple names C assigns (suit dragon arms included).
Diff actually adds the 7-arm dispatch plus the two dragon arms in
`suit_simple_name`. Promise == diff.

## Inventory

- Changed: `suit_simple_name` (+dragon arms), new
  `armor_doff_simple_name` (7 arms + default), `armoroff` call site
  (unchanged shape — already called the helper name).
- New file-local consts: 4 dragon-range otyp bounds via
  `objectNames.indexOf` (module idiom).
- Callee closure: `suit_simple_name` (same module), local
  `shield_simple_name` (silver/smooth), `hard_helmet` (already used
  in-module), local `gloves/boots/cloak_simple_name` (pre-existing,
  C-cited), `gloves_simple_name` objnam.js import pre-existing. No
  new module edge, no TDZ.
- No deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step reads, no
  `fastforward`, no coordinates.

## C ↔ JS fidelity

C `suit_simple_name` (`objnam.c:5470–5489`, via `csym.mjs`):
`Is_dragon_mail→"dragon mail"`, `Is_dragon_scales→"dragon scales"`,
then `" mail"`/`" jacket"` suffix arms, else `"suit"`. JS mirrors
order exactly; the ranges match the C macros verbatim
(`obj.h:347–352`: `GRAY_DRAGON_SCALES..YELLOW_DRAGON_SCALES`,
`GRAY_DRAGON_SCALE_MAIL..YELLOW_DRAGON_SCALE_MAIL`); suffix arms keep
the pre-existing length/endsWith shape that matches C's
`strlen/strcmp`.

C `armoroff` delay switch (`do_wear.c:1933–1966`, read directly):
SUIT→`suit_simple_name`, SHIELD→`shield_simple_name`,
HELM→`helm_simple_name`, GLOVES/BOOTS/CLOAK/SHIRT→their simples.
JS dispatches all seven: suit/shield/gloves/boots/cloak to the
(matching) helpers, helm to `hard_helmet?'helm':'hat'` (= C
`objnam.c:5512–5528` `!hard_helmet?"hat":"helm"`), shirt to `'shirt'`
(= C `shirt_simple_name` `:5599–5603`, unconditionally `"shirt"`).
Spot-checked the wired helpers against C: shield silver/smooth +
dknown gate (`:5569–5596`), cloak robe/wrapping/smock-or-apron
(`:5491–5509`), gloves gauntlets (`:5531–5547`), boots shoes
(`:5550–5566`) — all present with C cites. Branch-by-branch confirm.

One named gap (in the map, not Must-fix): JS `default:` returns
`'armor'` where C's `default:` hits `impossible()` with `what`
staying 0 (no nomovemsg). Unreachable for real armor (7 armcats
cover the switch); map row records it as pre-existing.

## Hallucinations / overclaim

None. «Helpers live in this module so no new module edge» verified
true.

## Density

Net +30 lines for one C switch + one C helper's two arms. Right-sized.

## Verification

D-log Verify bullet: `verify --fn armoroff` → `1 PASS, 1 moved past`
(Knight-92106 PASS; Knight-92215 87→save_dungeon@102) + green +
strict + cohort. Re-measured myself: `hidden-proxy.mjs verify
armoroff --base 6a12bc6f~1` → `1 PASS, 1 moved past, 0 unchanged, 0
worse → PROGRESS`, both rows identical. No WORSE, no vacuous check.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
