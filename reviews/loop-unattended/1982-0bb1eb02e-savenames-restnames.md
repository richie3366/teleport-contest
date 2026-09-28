# Review 1982 — 0bb1eb02e — savenames + restnames whole (D-3022)

Metadata: SHA `0bb1eb02e` (D-3022). Coverage head (`o_init.c`
savenames MISSING, no corpus blocks). Scored diff: `js/o_init.js`
(+74) + `js/save.js` (−32 net: blob moved under the C entry
points). Subject promises the names chunk as a JSON-analogue
entry-point pair.

## Intent vs deliverable

Promise: new `savenames`/`restnames` in C order, dosave0 /
try_restore_save rewired, file-local blob deleted. Diff actually
adds exactly that plus `scripts/names-save-restore.test.mjs`.
Promise kept.

## Inventory

- `savenames` (js/o_init.js:358, exported sync): whole C chunk.
- `restnames` (js/o_init.js:390, exported sync): whole C chunk.
- Deleted `serObjectsMutable` (was js/save.js:184, file-local):
  a clone of the objclass-mutable projection — its bytes now live
  once under the canonical export. `grep -c serObjectsMutable
  js/save.js` → 0, no dangling refs. Required re-point check
  passes: single definition site removed with its single use.

## C ↔ JS fidelity

### savenames — verdict: exact-C modulo named architecture, ACCEPT

C (`o_init.c:374–407`, csym range; D-log cites `:375–407`, one
line of cite drift at the decl line — not a gap):

```c
if (update_file(nhfp)) {
    for (i = 0; i < (MAXOCLASSES + 2); ++i)
        Sfo_int(nhfp, &svb.bases[i], "names-bases");
    for (i = 0; i < NUM_OBJECTS; ++i)
        Sfo_short(nhfp, &svd.disco[i], "names-disco");
    for (i = 0; i < NUM_OBJECTS; ++i)
        Sfo_objclass(nhfp, &objects[i], "names-objclass");
}
/* ... oc_uname for all objects */
for (i = 0; i < NUM_OBJECTS; i++)
    if (objects[i].oc_uname) { /* len+chars, then release_data free */ }
```

JS: bases copy → disco copy → per-entry mutables +
`oc_uname: string|null` inline. The separate string loop folds
into the entry (JSON analogue; length prefix implicit); the
round-trip is equivalent. Named in this commit with C cites:
Sfo_* encode, update_file gate (VFS always writes),
release_data free (GC no-op), `freenames()` save.c:1096
(FREE_ALL_MEMORY-only). No RNG. Confirm.

### restnames — verdict: exact-C modulo named architecture, ACCEPT

C (`o_init.c:410–437`, csym range): bases → disco → objclass →
`:429–435` `if (objects[i].oc_uname)` marker arm → TILES
shuffle_tiles ifdef. JS: bases → disco → mutable overlay →
set-only uname arm. Fresh-table entries start null so set-only
is exact; shuffle_tiles TILES-only already named at
init_objects; table reset stays with the caller
(`objects_globals_init` pre-call, as C boots init'ed). Confirm.

### Callee closure — verdict: ACCEPT

Required `sym.mjs` outputs:

```text
savenames        js/o_init.js:358   sync
restnames        js/o_init.js:390   sync
```

Single definitions. Live C callers: save.c:325 (savegamestate)
→ `js/save.js:519` dosave0; restore.c:719 (restgamestate) →
`js/save.js:795` try_restore_save (csym `--callers` confirms
both). Data source identical (`objs()`/`bases()` return
`game.objects`/`game.bases`, verified in-tree); payload key
order preserved; restore field assignments are independent, so
the disco/bases reorder inside the chunk is behavior-neutral.

## Hallucinations / overclaim

None. D-log correctly calls both hidden checks notes (0
blocked, expected for a coverage pair) and claims no PROGRESS.

## Density

Two whole counterpart functions of one C file + caller wiring
+ a deleted clone, ~116 net js lines with test. Right-sized
cluster.

## Verification

Re-measured (`hidden-proxy.mjs verify savenames,restnames
--base 0bb1eb02e~1 --reach-all`):

```text
verify savenames: 0 session(s) blocked (vacuous, honest)
smoke savenames: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify restnames: 0 session(s) blocked (vacuous, honest)
smoke restnames: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None. (Nit, not queueable: the savenames C cite `:375–407`
should read `:374–407` per csym; fix opportunistically.)

Ledger: `savenames`/`restnames` ported, REACH-OK ×2.
Verify lines: hidden vacuous ×2 (honest) + smoke ×2.

Verdict: **ACCEPT**
