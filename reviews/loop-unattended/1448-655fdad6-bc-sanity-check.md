# Review 1448 — 655fdad6 — bc_sanity_check whole-body port (D-2489)

Metadata: SHA `655fdad6`, `js/ball.js` +108, `js/objnam.js` +26, `js/wizcmds.js` +11/−. C `ball.c:1033–1102` + `objnam.c:311–330` (`safe_typename`) + caller `wizcmds.c:1476`. D-log: D-2489.

## Intent vs deliverable

Promise: whole `bc_sanity_check` in C order + live `safe_typename` + caller wired at the C position. Diff delivers it: all five check arms, `Punished` per `youprop.h:77`, caller via dynamic import after `you_sanity_check`. Promise = deliverable.

## Inventory

- Added: `export async function bc_sanity_check` (ball.js), `export async function safe_typename` (objnam.js), `await bc_sanity_check()` in `sanity_check`.
- `sym.mjs` (required): no deleted/re-pointed symbols (pure additions). New-import spot checks all live: `W_BALL`/`W_CHAIN` (const.js:2462–63), `OBJ_FREE` (const.js:1341), `impossible` (display.js:7947 async, awaited), `NUM_OBJECTS` (objects.js, 481), `STRANGE_OBJECT` (objnam.js:72, resolves). `HEAVY_IRON_BALL`/`IRON_CHAIN` via indexOf idiom.

## C ↔ JS fidelity

`safe_typename` — C `objnam.c:311–330`:

```c
if (otyp < STRANGE_OBJECT || otyp >= NUM_OBJECTS
    || !OBJ_NAME(objects[otyp])) {
    res = nextobuf();
    Sprintf(res, "glorkum[%d]", otyp);
    impossible("safe_typename: %s", res);
} else {
    save_nameknown = objects[otyp].oc_name_known;
    objects[otyp].oc_name_known = 1;
    res = simple_typename(otyp);
    objects[otyp].oc_name_known = save_nameknown;
}
```

JS matches except the third disjunct (item 1 below). `Punished` verified at `youprop.h:77` (`#define Punished (uball != 0)`); `OBJ_NAME` verified at `objclass.h:190` (`obj_descr[oc_name_idx].oc_name`).

`bc_sanity_check` arm-by-arm ≡ C `:1033–1102`: Punished/`!Punished` `%s%s%s` arms verbatim (dead `!uball` disjunct kept like C); `freechain`/`freeball` as 0/1 ints so `^` matches; `where` read off objects (the `carried()`/`get_obj_location()` comments match C's own comments); uball arm (type/where/XOR/`W_BALL`/`~mask` gates) and uchain arm (no-inventory, `~W_CHAIN`) verbatim; Chebyshev distance arm with `Math.abs` and carried-ball→hero-square; `[check bc_order too?]` kept as comment. `%08lx`→8-hex-via-`%s` is sound (non-negative small masks; `impossible` expands `%s`/`%d`). Caller at C `:1476` (after light, before trap; siblings stay named). No RNG anywhere. Callee closure: `safe_typename`, `impossible` LIVE; sanity siblings OMIT with cites.

1. (Debt, not Must-fix) **`safe_typename` guard reads the wrong table.** C `:316` tests `!OBJ_NAME(objects[otyp])` = `obj_descr[oc_name_idx].oc_name` NULL; JS `objnam.js:3508` tests `!objectNames[otyp]` (enum identifiers, always truthy in range — dead disjunct). 23 in-range otyps have NULL oc_name (SC01–SC10 et al., verified in generated data), so C prints `glorkum[N]` + impossible while JS runs `simple_typename`. One-word fix (`objectNameStrs[otyp]`, which ≡ oc_name per the D-2487 mapping). Blast radius nil: only fires for a corrupt-typed ball/chain inside opt-in wizard `sanity_check`, and both arms print `impossible()` regardless (`simple_typename` doesn't throw on null names — verified body: `obj_typename` + paren-strip, no throw path).

Required pastes — new-import liveness:

```text
W_BALL           js/const.js:2462   sync   export const
W_CHAIN          js/const.js:2463   sync   export const
OBJ_FREE         js/const.js:1341   sync   export const
impossible       js/display.js:7947   ASYNC — await required
```

(`impossible` async and awaited at all three call sites; `NUM_OBJECTS` confirmed exported from objects.js as 481; `HEAVY_IRON_BALL`/`IRON_CHAIN` via the indexOf idiom.)

## Hallucinations / overclaim

None. The `~mask` and `%08lx` adaptations are disclosed with correct justification; the dynamic-import caller shape matches the file idiom.

## Density

Right-sized: one 70-line C function + 20-line callee + caller, 3 files.

## Verification

`hidden-proxy verify bc_sanity_check --base 655fdad6~1 --reach-all` (re-run here):

```text
verify bc_sanity_check: baseline 655fdad6~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke bc_sanity_check: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Matches. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Static-edge audit: the final diff adds one import word (`safe_typename`, objnam→display dynamic import inside the glorkum arm only) plus const widenings on pre-existing edges — the `ball.js → generated/objects_data.js` edge matches the pre-existing `seffects_data.js` static-edge class.

## Actionable C-wrongs

1. (Debt) `safe_typename` guard: `!objectNames[otyp]` → `!objectNameStrs[otyp]` (C `objnam.c:316`). No Must-fix (diagnostic-only, cosmetic, corrupt-state-only).

Verdict: **ACCEPT-WITH-DEBT**
