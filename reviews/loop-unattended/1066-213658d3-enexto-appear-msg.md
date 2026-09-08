# Review 1066 — 213658d3 — enexto_core candy overwrite + appear-msg coords (D-2096)

Metadata: SHA `213658d3`, `js/teleport.js` + `js/read.js` + `js/makemon.js`
(comment), queue owner goodpos (1 session). D-log D-2096.

## Intent vs deliverable

Subject promises: (1) far loop evaluated a shifted candy slice (append
vs C overwrite); (2) genesis appear-msg used requested coords, forcing
"next to you". Diff actually adds: `candy.length = 0` before the second
collect + index fix; read.js passes `(mtmp.mx|0, mtmp.my|0)`; makemon.js
doc correction. Promise == deliverable.

## Inventory

Changed: `enexto_core` (buffer handling), `create_particular_creation`
(one call arg), doc comment. No new functions/imports/edges; no
deleted/re-pointed symbols (`collect_coords` untouched; other callers
pass fresh arrays per D-log — confirmed no signature change in diff).

## C ↔ JS fidelity

Buffer reuse (`teleport.c:218–276`, csym; far loop :256–268): C calls
`collect_coords(candy, …)` twice on the SAME buffer — the second call
overwrites from index 0 — then loops `for (i = nearcandyct; i <
allcandyct; ++i) candy[i]`, skipping the already-rejected near spots
"in different random order but same overall total". Old JS appended
(`candy[allStart + (i - nearcandyct)]`): shifted slice, wrong
indices/shuffle/draws. New JS truncates then indexes `candy[i]` —
exact structural equivalent (JS collect appends onto the passed array,
so truncate-then-append ≡ C overwrite). Confirm.

Appear coords (`makemon.c:1179–1184` + `:1491–1499`, read): `x = cc.x;
y = cc.y` post-enexto, and the Norep tests `next2u(x, y)` /
`distu(x, y)` on those. Requested `(u.ux,u.uy)` forces distance 0 →
always "next to you". JS `makemon_appear_msg` computes the same
`next2u ≡ du<=2 / close-by ≡ du<=BOLT_LIM²` ladder (`js/makemon.js:3124–
3128`) from its `(x, y)` params, so passing final `(mtmp.mx, mtmp.my)`
is the exact fix; mon.js:1181 already used final coords. Confirm.
Second-attempt retry without GP_CHECKSCARY untouched — matches C
:1180–1181. Confirm.

Residual same-family site (pre-existing, NOT this delta):
`js/uhitm.js:1453` `demonpet` still passes `(u.ux|0, u.uy|0)` while JS
`makemon` enexto-adjusts on the byyou path (`js/makemon.js:2714–2717`)
and C `demonpet` (`uhitm.c:2133–2145`) funnels through C makemon's
post-enexto message. Diverges only when the pet lands beyond adjacent
("close by"/"" vs forced "next to you") — message-only, no RNG, no
corpus block. Debt pointer, not a queue item. → Actionable 1 (debt).

## Hallucinations / overclaim

None. "Temp probe fully reverted in the same edit" — ban grep 0 added
lines and no leftover probe helpers in the hunks; taken as true.
"Small diff … full-suite verify guards it" — full 44/44 recorded.

## Density

~15 insertions across 3 files, one step, two one-spot divergences —
complete minimal cluster. OK.

## Verification

- Rule #2 clean (global rulecheck). Ban grep 0.
- Re-measured `hidden-proxy.mjs verify goodpos --base 213658d3~1`:
  "0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
  (Rogue-91119 step 67 → givit step 70) — matches D-log.
- Green/strict/cohort/full-44/44 recorded (shared-file change ran full).

## Actionable C-wrongs

1. (Debt, map-pointer) `js/uhitm.js:1453` demonpet appear-msg: pass
   `(dtmp.mx|0, dtmp.my|0)` instead of `(u.ux|0, u.uy|0)` per
   `makemon.c:1491–1499` post-enexto coords. One-line future iter; no
   corpus session blocks on it, so it does not outrank Open rows.

Verdict: **ACCEPT-WITH-DEBT**
