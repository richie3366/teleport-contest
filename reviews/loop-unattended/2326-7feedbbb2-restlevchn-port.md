# Review 2326 — 7feedbbb2 — restlevchn whole port

Metadata: SHA `7feedbbb2`, D-3371, coverage row. C
`restore.c:129–150` (csym range), sole caller :703.
Stat: js/restore.js +51, js/save.js import+call.

Intent vs deliverable: subject promises "restlevchn
whole port (special-level chain restore, savelevchn
mirror)". Diff actually: the whole body at
js/restore.js:272 + ungated try_restore_save call.
Matches promise.

Inventory: 1 new **C callee** (exported; C staticfn →
exported for the save.js caller — justified) + 1
call-site wiring. No new import edge (brace extension),
no stub, no clone. `alloc` ⇔ GC object literal, named
(alloc.js has no struct call sites — accepted: raw
Uint8Array buffer cannot host `{dlevel,proto,…}`).

C ↔ JS fidelity: confirm. Unconditional reset
(`game.sp_levchn=[]` = :136, even on missing key ✓);
array length ⇔ Sfi_int lev_count ✓; per-node rebuild
in dungeon.h:25–32 order ✓; tail-append + `next:null`
⇔ :142–148 ✓; `unconnected` unread (dungeon-level bit,
savelevchn precedent ✓). boneid: wire 1-char/'' ⇔
live numeric — verified live shape is numeric
(dungeon.js:805 `bonec|0`, :972 `charCodeAt(0)`), so
the `charCodeAt(0)` back-conversion round-trips
savelevchn's `fromCharCode` exactly; numeric
passthrough arm covers direct input ✓. Caller: C :703
after restore_dungeon :702, before quest_status :706 —
JS after dungeon_topology ✓ (quest_status handled
later in try_restore_save). No RNG. Test 3/3 incl.
round-trip + reset-on-missing.

Hallucinations / overclaim: none. The density-exception
note names the remaining same-file fns concretely
(restlevelstate stub, rest_adjust_levelflags wire-wrong
with the lev_json.js:800 mechanism, restore_menu
excluded) — checkable, not hand-waving.

Density: single-function cluster with stated exception
✓. One `Ledger:` entry, one Verify line, seed0013
save-restore PASS cited.

Verification: re-measured — `verify restlevchn --base
7feedbbb2~1 --reach-all` → "0 blocked" + "smoke 24/24
→ REACH-OK". Matches the D-log. Diff grep: 0 banned
hits. `sym.mjs` + `--can` (required paste):

```text
restlevchn       js/restore.js:272   sync
--can save→restore: ALREADY
```

Single definer.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
