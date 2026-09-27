# Review 1933 — 3b405b65a — look_at_object (D-2974)

- SHA: `3b405b65a` (coverage; `pager.c` `look_at_object` plus `mkobj.c` `is_treefruit`)
- Files: `js/pager.js` (`+45/−23`), `js/mkobj.js` (`+21/−0`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed name in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
look_at_object   js/pager.js:1814   sync
is_treefruit     js/mkobj.js:3946   sync
look_buf_cat     NOT EXPORTED — 1 LOCAL CLONE(S): js/pager.js:1801
dealloc_obj      js/mkobj.js:3789   sync
object_from_map  js/pager.js:1724   sync
```

`look_buf_cat` is the local `BUFSZ` cap, not a second copy of a C function. `is_treefruit` is imported at `pager.js:51`. No later commit touches `js/pager.js` or `js/mkobj.js`.

## Intent vs deliverable

Subject: farlook of an object skipped the tree suffix, so a fruit in a tree was not "dangling" and arboreal stone was "embedded in stone". A fake, or no object, never took a terrain suffix. The fake was marked `OBJ_FREE` and left allocated.

The diff rewrites `look_at_object` in that order and adds `is_treefruit` plus the fruit table.

## Inventory

| JS | Class | C |
|----|-------|---|
| `look_at_object` | live sync `pager.js:1814` | `pager.c:380–419` |
| `is_treefruit` | live sync `mkobj.js:3946` | `mkobj.c:1991–1999` |
| `TREEFRUITS` | local table | `mkobj.c:1978–1980` |
| `look_buf_cat` | local `BUFSZ` bound | `Strcat` / tree `Snprintf` |
| `object_from_map`, `distant_name`, `doname_with_price`, `doname_vague_quan`, `dealloc_obj`, `closed_door`, `is_pool`, `is_lava` | imported | existing |

Callers: `pager.c:717` `lookat` → `js/pager.js:2062` (`glyph_to_obj(glyph)`). `pager.c:2017` `look_all` → `js/pager.js:2233` (same conversion at `:2232`). `pager.c:17` is the prototype. `is_treefruit` has no other C call (`extern.h:1694`).

## C ↔ JS fidelity

No `rn2`. `object_from_map` fills `otmp`. A real object is `distant_name` of `doname_with_price` when `dknown`, else `doname_vague_quan`. `STRANGE_OBJECT` uses `objectNameStrs` (`obj_descr[].oc_name`), with the literal fallback `'strange object'`. A fake sets `where` to `OBJ_FREE` and `dealloc_obj`s, then `otmp` is null, before the suffix chain. No object copies `"something"` (`decl.c:45`, `decl.h:36`).

Suffix order matches: buried while `otmp` is still buried; else `IS_TREE` before stone (arboreal stone is a tree), `"dangling"` when `otmp && is_treefruit(otmp)` and `"stuck"` otherwise; then `STONE`/`SCORR`, wall/`SDOOR`, `closed_door`, `is_pool`, `is_lava`. The strings match the C literals, including the leading space on the tree phrase.

`is_treefruit` walks apple, orange, pear, banana, eucalyptus leaf and returns false otherwise. `rnd_treefruit_at` is not this function; the D-log says `dig.js` and `dokick.js` keep their own fruit lists for that copy.

`look_buf_cat` stops every append at `BUFSZ - 1`. The tree arm is the C `Snprintf(eos(buf), BUFSZ - strlen(buf), …)` bound. The other arms are `Strcat`, which does not check `BUFSZ`. A name that already fills the buffer drops the suffix in JS and would overflow in C. Ordinary `doname` text fits.

A missing map cell is `typ | 0`, and `STONE` is 0 (`const.js:46`), so that cell reads as stone. C would index `levl` out of range. The D-log names that. Callers only look at cells `glyph_at` already produced.

The signature takes `glyphotyp` rather than an integer glyph. Both callers pass `glyph_to_obj`, which is what `object_from_map` reads. That conversion predates this function.

## Hallucinations / overclaim

The subject says the fake is freed before the suffix, and the body does that. No arm is a comment or a TODO. `in_rooms` was marked ported in the same ledger note; this diff does not touch it.

## Density

The compiled `look_at_object` body and its one new callee shipped. Both C callers are wired. Insertions are the suffix chain and the five-fruit walk.

## Verification

```
verify look_at_object: baseline 3b405b65a~1 (scoreboard at 1c7c62258, 2026-09-27T14:32:09.397Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify look_at_object: no corpus session is blocked on it at 3b405b65a~1 — a vacuous verify is NOT a corpus PASS. ...
smoke look_at_object: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2974 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
