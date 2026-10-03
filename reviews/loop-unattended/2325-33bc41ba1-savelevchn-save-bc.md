# Review 2325 — 33bc41ba1 — savelevchn + save_bc whole ports

Metadata: SHA `33bc41ba1`, D-3370, 2 coverage rows (both
queue heads). C `save.c:973–994` + `:694–721` (csym
ranges). Stat: js/save.js only (+75/−4).

Intent vs deliverable: subject promises "savelevchn +
save_bc whole ports (special-level chain + swallowed
ball/chain on save payload)". Diff actually: both
exports + dosave0 loose snapshot + both payload keys +
omit-line update. Matches promise.

Inventory (savelevchn): 1 new **C callee** at
js/save.js:466. Emits every s_level field but `next`
(dungeon.h:25–32: dlevel/proto/boneid/rndlevs/flags;
array order = chain order, C restlevchn appends back in
order ✓). Count = array length ≡ C lev_count ✓.
Callees: none (pure emit). Named: release_data free
arm (:984/:992–993 → JSON never frees live chain,
savefruitchn precedent ✓), free_dungeons :1065 caller
(FREE_ALL_MEMORY-only, no JS analogue ✓),
`unconnected` bit (dungeon-level; C dungeon.c:577–588
memset + exactly 5 bits ✓ verified).

Inventory (save_bc): 1 new **C callee** at
js/save.js:508. nobj prepend C-literal (chain first,
ball head) ✓; FREEING setworn/clear arms named (JSON
never unwears ✓); saveobjchn ⇔ serObjChain LIVE
(lev_json.js:116 ✓). The nobj surgery mutates live
nodes — C does the same (surgery unconditional;
update-only leaves it) ✓.

C ↔ JS fidelity: confirm per function. Caller order:
save_bc :304 after invent :300, savelevchn :315 after
save_dungeon :313–314 — JS payload keys in the same
slots ✓. dosave0 loose snapshot ≡ BALL/CHAIN_IN_MON
macros (hack.h:1412–1413: uswallow + OBJ_FREE) ✓;
decl.h:563–564 home ✓. boneid numeric→chr matches the
bones.js:380 precedent ✓. sp_levchn insertion order
(dungeon.js:671–681) ✓. No RNG. Restores named as
separate rows (restlevchn, bc walk) ✓ — shipped next
(D-3371) for levchn.

Hallucinations / overclaim: none. "0 blocked each —
normal for coverage" is the honest vacuous note;
save-path proof via seed0013 + strict + probe cited.

Density: 2-function same-C-file cluster ✓, each whole
with D-log C-locus/Callers/Verify/Named + `Ledger:` +
combined `verify.mjs`. No Must-fix bundled ✓. Per
function: savelevchn ACCEPT; save_bc ACCEPT.

Verification: re-measured — `verify savelevchn,save_bc
--base 33bc41ba1~1 --reach-all` → both "0 blocked" +
"smoke 24/24 → REACH-OK". Matches the D-log. Diff
grep: 0 banned hits. `sym.mjs` (required paste;
nothing re-pointed):

```text
savelevchn       js/save.js:466   sync
save_bc          js/save.js:508   sync
```

Single definers.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
