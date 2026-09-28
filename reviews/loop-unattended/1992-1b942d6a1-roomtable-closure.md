# Review 1992 — 1b942d6a1 — sp_lev.c room-table closure whole (D-3032)

Metadata: SHA `1b942d6a1` (D-3032). Four-function cluster of
one C file (closure: table + both roomtype directions +
wid/hei push), plus re-pointing three `splev_roomtype` call
sites and three themeroom fills onto the canonical table.
Subject promises the C-exact table object with real
consumer proof (themerms.lua reads).

## Intent vs deliverable

Promise: `l_push_mkroom_table` as the C-exact table object
(region sub-object per nhlua.c, `!!rlit` for the
`(boolean)` cast incl. -1); full 26-name `room_types[]`
shared by both directions; no Lua-stack analogue (named).
Diff actually adds that (158-line `js/mklev.js` rework +
committed `scripts/splev-roomtable.test.mjs` 4/4). Kept.

## Inventory

- `ROOM_TYPES` + `splev_roomtype_entry` (js/mklev.js,
  file-local): the C `room_types[]` table, both directions.
- `splev_roomtype` (local, kept): re-pointed onto the
  shared table (17-name inline map deleted).
- `get_mkroom_name` (js/mklev.js:22992, exported): new.
- `get_table_roomtype_opt` (js/mklev.js:23007, exported):
  new; adopted at 3 call sites.
- `l_push_mkroom_table` (js/mklev.js:23027, exported): new.
- `l_push_wid_hei_table` (js/mklev.js:23044, exported):
  new; adopted at 2 call sites.
- No deleted exports (`sym.mjs` below).

## C ↔ JS fidelity

### room_types[] table — verdict: exact-C, ACCEPT

JS `ROOM_TYPES` lists all 26 C entries
(`sp_lev.c:3956–3988`, read in full) in C order with
per-entry `:line` cites, names all-lowercase as in C.
`SCROLLSHOP/POTIONSHOP/RINGSHOP` import widening resolves
to live `js/const.js` exports. Side benefit, C-correct:
the deleted inline map had only 17 names (missing swamp,
vault, beehive, zoo, anthole, cocknest, leprehall, scroll /
potion / ring shops); remaining `splev_roomtype` callers
(`monkfoodshop()` at :17389/:17608) map identically, and
misses still return defval without `impossible` — no
behavior change on those paths.

### get_mkroom_name — verdict: exact-C, ACCEPT

C (`sp_lev.c:3990–4001`, csym range): first-match linear
scan, `impossible` + `"unknown"` (never NULL). JS matches
arm-for-arm. Sole C caller `:3069` is inside the shipped
`l_push_mkroom_table` — closure complete.

### get_table_roomtype_opt — verdict: exact-C, ACCEPT

C (`sp_lev.c:4003–4020`, csym range): `roomstr &&
*roomstr` gate, `strcmpi` first-match + break, unknown →
`impossible` keeping defval, `Free` (GC no-op, named). JS:
`if (roomstr)` ≡ the C gate for strings (`''` falsy);
`String(roomstr).toLowerCase()` ≡ `strcmpi`; first-match
entry; `impossible` + defval preserved. Both C callers
wired: `:4072` (lspo_room) and `:5604` (lspo_region).
Nit (comment-only, not a C-wrong): the lspo_region region
comment block cites `:5603–5606` while pinned C reads
`:5601–5604` — the +2 drift pre-existed in the adjacent
lines and the new cite followed it.

### l_push_mkroom_table — verdict: exact-C, ACCEPT

C (`sp_lev.c:3058–3070`, csym range): width/height 1-based
spans, region(lx,ly,hx,hy), `(boolean)rlit`,
irregular/needjoining, `type=get_mkroom_name(rtype)`. JS
matches field-for-field: `!!rlit` ≡ the boolean cast
(nonzero incl. -1 → true); region `{x1,y1,x2,y2}` matches
`nhl_add_table_entry_region` (nhlua.c) key-for-key. Both C
callers (`:4095`, `:5704`) are Lua-pcall push sites with no
scored analogue — named in this commit, consistent with the
file's unpacked-opts architecture; the live-room-passing
convention (`contents(troom)`) is the same named omit the
lspo_room precedent already carries. Themeroom fills reuse
it for width/height arithmetic only — identical spans.

### l_push_wid_hei_table — verdict: exact-C, ACCEPT

C (`sp_lev.c:3049–3055`): `{width: wid, height: hei}`.
JS identical. C caller `:6309` wired at both JS sites
(lspo_map + map-themeroom path); mapdef `contents()`
bodies take no args, so the newly-passed table is ignored
exactly like Lua extra args.

### Callee closure — verdict: ACCEPT

Per arm: `get_mkroom_name` LIVE inside the table push;
`nhl_add_table_entry_*` OMIT (named, no scored analogue);
`impossible` LIVE. No stub in a live arm. `sym.mjs`
(required outputs for the re-pointed symbols):

```text
splev_roomtype   NOT EXPORTED — 1 LOCAL in js/mklev.js:22982 (kept, re-pointed)
get_mkroom_name  js/mklev.js:22992   sync
get_table_roomtype_opt js/mklev.js:23007   sync
l_push_mkroom_table js/mklev.js:23027   sync
l_push_wid_hei_table js/mklev.js:23044   sync
```

Single definitions throughout; nothing deleted.

## Hallucinations / overclaim

None. Consumer proof cites real themerms.lua line ranges;
the named omits are in the map section of the D-entry.

## Density

Four whole C functions of one C file + call-site adoption
+ committed test. Right-sized cluster (§2b/§10.17).

## Verification

Re-measured (all four in one call, `--base 1b942d6a1~1
--reach-all`): 0 blocked (honest vacuous) per function +
smoke 24 PASS, 0 regressed per function → REACH-OK all
four. Zero REGRESSED. Matches the pasted tail.

## Actionable C-wrongs

None.

Ledger: all four ported, REACH-OK via smoke. Verify
lines: hidden vacuous (honest) + smoke, per function.

Verdict: **ACCEPT**
