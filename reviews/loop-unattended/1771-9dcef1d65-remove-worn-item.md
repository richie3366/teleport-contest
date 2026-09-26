# Review 1771 — 9dcef1d65 — remove_worn_item (D-2812)

- SHA: `9dcef1d65` (coverage; the off-function body)
- Files: `js/steal.js` `remove_worn_item` (`:271`); callers in `do_wear.js`, `do.js`, `muse.js`, `steed.js`, `trap.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can` for the new edges: `do_wear.js`/`muse.js`/`steed.js`/`trap.js` → `steal.js` `ALREADY`. `steal.js` → `do_wear.js` `Ring_gone` and `polyself.js` `skinback` `ALREADY`. `do.js` → `steal.js` is `IN-SCC`, and `remove_worn_item` is a hoisted function (`VERDICT: SAFE`). The lava site uses a dynamic `import()` inside the function, not a top-level read.

## Intent vs deliverable

Subject promises one `remove_worn_item`: `donning`/`cancel_don` before the mask test, `in_use` held at 1 across the body, embedded scales `impossible` + `skinback(true)` before the suit test, rings `Ring_gone`, eyewear `Blindf_off`, and the do_wear/steed/muse clones deleted. The diff does that. Bullwhip (`do_wear.c:641`), saddle, the worn statue, carried lava, `stop_donning`, and the strange-accessory arm call this export with the C `unchain_ball` flag.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `remove_worn_item` | C body, async, one export | `steal.c:213–290` |
| `donning` / `cancel_don` | imported, sync | `do_wear.c:1574–1596` / `:1664–1683` |
| `skinback` | imported, awaited | `polyself.c:1953–1967`; `true` is silent |
| `Armor_off`…`Helmet_off`, `Amulet_off`, `Ring_gone`, `Blindf_off`, `uwepgone` | awaited | live `*_off` / `*gone` |
| `Shield_off`, `Shirt_off`, `uswapwepgone`, `uqwepgone`, `unpunish`, `setworn`, `setnotworn` | sync, not awaited | same |
| `do_wear.js` / `steed.js` `remove_worn_item`, `muse.js` `remove_worn_weapon` | deleted | were weapon-slot clones |

`csym --callers` live calls (comments at `artifact.c:2677`, `do_wear.c:1247`, `shk.c:1271`, `steal.c:232/288/292/746`, `trap.c:6825/6827/6885` omitted): each has a JS `await` with the same boolean — `artifact.js:1546` FALSE, `mkobj.js:1516` `rot_corpse` TRUE, `do_wear.js:479/1763/1890/2765/3191/3810` FALSE, `dokick.js:2006` TRUE, `dothrow.js:1171` FALSE, `eat.js:4239` FALSE, `mhitu.js:1248` TRUE and `:1310` FALSE, `mkobj.js:1794` FALSE, `muse.js:3185` FALSE, `pickup.js:4789` FALSE, `potion.js:2326` FALSE, `read.js:1593` FALSE, `sit.js:249` FALSE, `steal.js:258` TRUE / `:573` TRUE / `:603` FALSE, `steed.js:385` FALSE, `trap.js:472` statue TRUE, `:4350` erode TRUE, `:6188` `emergency_disrobe` FALSE, `:6588` lava TRUE, `do.js:682` carried lava TRUE, `zap.js:5229` TRUE. `shk.c:173` and `steal.c:784` are the named skips.

`sym.mjs` (clones deleted; the name is only the export):

```
remove_worn_item js/steal.js:271   ASYNC — await required
donning          js/do_wear.js:3759   sync
cancel_don       js/do_wear.js:3711   sync
Ring_gone        js/do_wear.js:3587   ASYNC — await required
Blindf_off       js/do_wear.js:1793   ASYNC — await required
skinback         js/polyself.js:1804   ASYNC — await required
Shield_off       js/do_wear.js:934   sync
Shirt_off        js/do_wear.js:1083   sync
uwepgone         js/wield.js:349   ASYNC — await required
uswapwepgone     js/wield.js:370   sync
uqwepgone        js/wield.js:380   sync
unpunish         js/read.js:1934   sync
setnotworn       js/do.js:493   sync
```

## C ↔ JS fidelity

Null `obj` returns. C is `NONNULLARG1`. Then `donning` → `cancel_don` (`steal.c:218–219`) before the mask test. `cancel_don` sets `cancelled_don` from the seven `*_on` `afternmv` values, then clears `afternmv`, `nomovemsg`, `multi`, `takeoff.delay`, and `takeoff.what` (`do_wear.c:1673–1682`). `donning` is `doffing` or the matching `*_on` (`:1578–1595`). Both JS bodies do that. If the mask is clear after the cancel, both return before `in_use`.

`oldinuse` is saved, `in_use = 1` (`:242–243`). Armor (`:246–261`): scales `impossible` then `skinback(TRUE)` (silent; `uarm = uskin`), then `uarm` / cloak / boots / gloves / helm / shield / shirt / `setworn(0, mask & W_ARMOR)`. The suit test is not `else` of the scales test, so `skinback` makes the same object `uarm` for `Armor_off`. JS `:282–296` is that order. Amulet, `Ring_gone`, `Blindf_off` (`:262–269`). Weapons are three separate `if`s, not `else if` (`:270–276`). Ball/chain is a second `if`, not part of that chain (`:278–280`): `unpunish` only when `unchain_ball`. Otherwise a leftover mask calls `setnotworn` (`:281–284`). `debugpline1` on `OBJ_DELETED` (`:286–288`) is the non-DEBUG empty macro. `in_use` is restored (`:289`). JS `:309–321` matches. No RNG on this function.

`stop_donning` calls it only when `putting_on` (`do_wear.c:1723–1724`). The strange accessory (`:1822–1826`) `impossible`s with `safe_typename`, then the call when `owornmask` is still set, and returns a turn. Carried lava (`trap.c:4607–4611`) is `remove_worn_item(obj, TRUE)` then `useupall`; the floor arm stays `delobj`. `animate_statue` (`:888`) uses TRUE before `delobj`.

## Hallucinations / overclaim

The subject does not say `money2mon` or `maybe_absorb_item` were wired. `shk.js:4533` still skips the call. `steal.c:784` still has no JS function. `debugpline1` is not a dropped message on a DEBUG build; the contest compile leaves that macro empty.

## Density

One function, the off-functions it already called, and the clones that were pretending to be it. Callers that already awaited the export keep their flags. The two named skips are not a silent arm of this body.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify remove_worn_item --base 9dcef1d65~1 --reach-all`.

```
verify remove_worn_item: baseline 9dcef1d65~1 (scoreboard at 7041ab3e4) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke remove_worn_item: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. D-2812's green, strict, cohort, and full 44/44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
