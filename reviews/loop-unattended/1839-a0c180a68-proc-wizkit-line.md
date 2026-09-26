# Review 1839 — a0c180a68 — proc_wizkit_line buffer (D-2880)

- SHA: `a0c180a68` (Must-fix from review 1832; `files.c` `proc_wizkit_line` plus `readobjnam` caller-buffer shadow)
- Files: `js/files.js` (+6/−3), `js/readobjnam.js` (+113/−23). 119 `js/` insertions.
- Queue row: review 1832 C-wrong, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises that `proc_wizkit_line` records the buffer `readobjnam` left, not the length-clipped input. The diff does that, and adds a cursor shadow so the in-place writes that already exist in JS update that buffer. `sym.mjs`:

```
proc_wizkit_line js/files.js:144   ASYNC — await required
readobjnam       js/readobjnam.js:1389   sync
wish_history_add js/zap.js:7178   sync
cbufAdvance      NOT EXPORTED — local js/readobjnam.js:148
cbufReplace      NOT EXPORTED — local js/readobjnam.js:153
publishWishbuf   NOT EXPORTED — local js/readobjnam.js:173
is_hands_obj     NOT EXPORTED — local js/files.js:62
wizkit_addinv    NOT EXPORTED — local js/files.js:123
```

`cbufAdvance` / `cbufReplace` / `publishWishbuf` are not C symbols. `sym.mjs` prints "LOCAL CLONE" for any file-local function; that label is an index artifact here.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `proc_wizkit_line` | export `files.js:144` | `files.c:2561–2581` |
| `wish_history_add` | import, already live | `zap.c:6226`; call `files.c:2572` |
| `cbufAdvance` | local cursor | `d->bp += n` (bytes stay) |
| `cbufReplace` | local tail write | `Strcpy` / `*p = 0` / `strsubst` at the cursor |
| `cbufSkipToSuffix` | local cursor | `d->bp = rest` (`objnam.c:4415`) |
| `publishWishbuf` | local out-param | no C symbol; the caller's `buf` |
| `readobjnam` | export | `objnam.c:4909–5400` |

## C ↔ JS fidelity

`csym` body is `files.c:2561–2581`. Callers: the declaration at `files.c:191`; the use is the function pointer at `files.c:2594` `parse_conf_file(fp, proc_wizkit_line)` (`csym --callers` only lists the prototype). No RNG.

`strlen >= BUFSZ` keeps `BUFSZ - 1` characters (`files.c:2566–2567`). JS slices the same way. `readobjnam(buf, NULL)` then: null object → `config_error_add` and `FALSE` (`:2575–2578`); `&hands_obj` → `TRUE` with no history (`:2571`); any other object → `wish_history_add(buf)` then `wizkit_addinv` (`:2572–2573`). JS returns false for null / `NOTHING_OBJ` (C's `no_wish` argument is NULL, so "nothing"/"nil"/"none" is a null `otmp`). Hands returns true with no history. The real-object arm records `parsed.wishbuf` before `await wizkit_addinv`. `config_error_add` stays named in `docs/c-js-map/data.md`.

`readobjnam` (`objnam.c:4909–5400`) aliases `d.bp` to the caller's buffer (`readobjnam_init`). `mungspaces` at `:4919` is the new `_cbuf`. Pointer walks in `readobjnam_preparse` (`:3978–4170`) call `cbufAdvance` and leave the prefix. `save_bp` for "corpse/statue/figurine of" stores `_saveOff`; a later `strsubst` of "female "/"male "/"neuter " (`:4136–4148`) replaces only the tail, then the restore puts `_boff` back. "blessed corpse of a female gnome" therefore becomes "blessed corpse of a gnome" in both buffers.

In-place writes that already ran on `d.bp` now hit `_cbuf` at `_boff`: charges NUL-and-copy (`objnam.c:4186–4220`), trailing class-word NUL (`:4591–4594`), `*p = 0` on " of " (`:4395`), `Strcpy` of `makesingular` (`:4453`), gem " stone"/" gem" NUL (`:4680`), glass `Strcpy` of "worthless piece of " (`:4713–4715`), armor `Strcat` " mail" (`:4779`). A leading class word (`:4571–4580`) only does `d->bp += j`. JS does not move `_boff` there, and the wish string is unchanged either way. `name_to_monplus`'s `rest` (`:4415–4425`) only moves the cursor; `cbufSkipToSuffix` matches the space / "s " / "es " / "'s " walks. The `s'` lookbehind (`:4420–4421`) is still absent; it does not write the buffer unless a later `Strcpy` runs, and `makesingular` on that unskipped tail does not fire for "' corpse".

`readobjnam_wish` passes `missOut` (`readobjnam.js:752`). `wishbuf` is set and ignored. `makewish` still records `bufcpy` from before `readobjnam` (`zap.c:6359`). The null-`bp` return (`zap.c:6366`) is before `mungspaces` and does not publish; that call has no caller buffer.

## Hallucinations / overclaim

The subject does not say every `readobjnam` mutation is ported. The absent writers are named, and they are absent: no " named " / " called " / " labeled " / "grey spell" / "armour" / "pair of" arm in `js/readobjnam.js`. The cited span `objnam.c:4253–4279` also contains the " of spinach" NUL (`:4278–4279`), which is likewise absent. `pair of` / `pairs of` / `set of` (`:4324–4334`) and `d->bp = d->globbuf` (`:4364`) do not modify the caller buffer in C, so leaving them out does not change `wish_history_add`'s text. "grey spell" and "armour" do, and those strings still keep the pre-edit spelling. That is the named omit, not a silent stub in a live writer.

## Density

Review 1832's C-wrong was the argument to `wish_history_add`. This commit changes that call and the writers that already existed. 119 insertions. It is not a new port of `readobjnam`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify readobjnam --base a0c180a68~1 --reach-all` and the same for `proc_wizkit_line`.

```
verify readobjnam: baseline a0c180a68~1 (scoreboard at 539f2fe06) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke readobjnam: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
verify proc_wizkit_line: … 0 session(s) blocked … smoke (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Wizard wizkit text is not on that smoke path.

## Actionable C-wrongs

None. The grey-spell / armour / named-called-labeled / spinach NUL writers stay the named omissions in `docs/c-js-map/data.md`.

Verdict: **ACCEPT**
