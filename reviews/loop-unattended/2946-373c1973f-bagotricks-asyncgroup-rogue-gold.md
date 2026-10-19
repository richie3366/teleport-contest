# Review 2946 — 373c1973f — bagotricks group appears inline; Rogue gold `*` from the full def_r_oc_syms

- SHA: `373c1973f` (cliff, board owner `makemon`, 2 sweep rows)
- D-entry: D-4106; Ledger: bagotricks ported; map_object ported
- `js/` diff: `js/apply.js` +6/−3, `js/display.js` +8/−15

## Intent vs deliverable

Promise, in two parts. (a) bagotricks' random group was placed whole
before the first member's «suddenly appears» --More--, but C places and
announces members one by one. (b) The Rogue-level object-class table
lacked gold `*`, so a gold mimic drew `$`. Diff: bagotricks passes
`NO_MM_FLAGS | MM_ASYNCGROUP` to `makemon` and `makemon_appear_msg`
(the D-4014 opt-in). The 3-entry partial `DEF_R_OC_SYM` is deleted, and
`oc_display_sym` and `showsyms_defaults` read the existing full
18-entry `DEF_R_OC_SYM_FULL`. The COIN live_showsyms patch in
`objnum_to_display_glyph` is removed. Promise = diff.

## Inventory

- `bagotricks` makemon loop — apply.js:5182–5190; C apply.c bagotricks
  (`makemon((struct permonst *) 0, u.ux, u.uy, NO_MM_FLAGS)`).
- `oc_display_sym` — display.js:634; C drawing.c def_r_oc_syms :72–82 via
  symbols.c init_rogue_symbols.
- `showsyms_defaults` Rogue arm — display.js:3599–3603.
- `objnum_to_display_glyph` — display.js:2324.
- Callees: `makemon` / `makemon_appear_msg` (makemon.js), MM_ASYNCGROUP
  path from D-4014. LIVE.

## C ↔ JS fidelity

C makemon :1430–1439 runs a grouped summons inside makemon itself, so
each member's appear message (the Norep at :1476–1500) prints before the
next member is placed. JS makemon is sync, and its default group tail
places every member first. MM_ASYNCGROUP is the house async envelope,
not a C flag: the group, its inventory and the primary newsym run in C
order inside the awaited tail. It reaches the same order as C. No RNG
call is added or reordered (verify reports RNG 60000/60000 matching on
the Samurai row before the fix, so the change is screen-only).

```c
const char def_r_oc_syms[MAXOCLASSES] = {
    '\0', ']', ')', ']', '=', ',', '(', ':', '!', '?', '+',
    '/', '*', '*', '`', '0', '_', '.' };          /* drawing.c :72–82 */
```

`DEF_R_OC_SYM_FULL` (display.js:3743) matches this table entry for entry.
COIN_CLASS (12) and GEM_CLASS (13) are both `*`. The old partial table
covered only ARMOR/AMULET/FOOD and patched gold at two sites.

Removing the COIN live_showsyms read from `objnum_to_display_glyph` is
safe for user symsets with `S_coin`. The returned `glyph` (objnum_to_glyph)
reaches the screen through the `obj_symidx` → showsyms map (C
reset_glyphmap :2804/:2969), and `ch` is only the fallback.

## Hallucinations / overclaim

None. The D-log names about 30 other sync-group callers (read.js
create_particular, pickup.js, were.js, sit.js) and says no corpus session
blocks on them.

## Density

One owner, two writers (one per session), both small and at their C
sites.

## Verification

```text
verify makemon (--base 373c1973f~1): 2 blocked
  scen-sweep-Samurai-50050031: PASS
  scen-sweep-Valkyrie-50362019: PASS
verify makemon: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify bagotricks / map_object: 0 blocked at the parent board
```

Exact match with the D-log. Full public 44/44 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
