# Review 488 — d53c5cd1 — timeout.c wiz_timeout_queue + region.c visible_region_summary (D-1527)

## Metadata
- Full / short hash: `d53c5cd103af61b7d197e85c6c791aae4b1d4355` / `d53c5cd1`
- Parent: `4e78ca90` (D-1526). This file audits **this SHA only** (sixth of nine `js/` commits since review **482**). Archive **Addressed:** D-1527 `d53c5cd1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 04:40:43 +0200
- D-id: **D-1527**
- Stats: 13 files, +493 / −138 — `js/timeout.js` +238, `js/region.js` +38 / −4, `js/getline.js` +11, `js/mkobj.js` +6 / −2 (js/ insertions **285**). Band **200–450**.
- Claims to close: Open `timeout.c` `visible_region_summary` (named from D-1512 / map `turns.md`). Not `show_region`. `reviews/loop-2026-08-15/` has no unpaid `#timeout` Must-fix.
- JS / map: `timeout.js` `wiz_timeout_queue`; `region.js` `visible_region_summary`; `getline.js` EXT_CMDS; `mkobj.js` `start_timer` tid. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: none by SHA. Map named `#timeout` after D-1512 `any_visible_region`.

## Intent vs deliverable

Git subject promises: wizard `#timeout` lists live gas clouds (ttl+1, poison vs vapor, bounding box), not a named omit.

Pinned C `timeout.c` `wiz_timeout_queue` `:2041–2127` and callee `region.c` `visible_region_summary` `:674–711`. Helpers `kind_name` `:1995–2011`, `print_queue` `:2014–2037`. `start_timer` tid `:2280`. `cmd.c` `:1903–1904` `"timeout"` `IFBURIED|AUTOCOMPLETE|WIZMODECMD`.

```2041:2114:nethack-c/upstream/src/timeout.c
wiz_timeout_queue(void)
{
    /* create_nhwindow(NHW_MENU); Current time; Active timeout queue;
       print_queue(gt.timer_base); timed uprops; uswldtim; uinvault; */
    if (any_visible_region()) {
        visible_region_summary(win);
    }
    /* stasis_until; display_nhwindow(FALSE); return ECMD_OK; */
}
```

```681:709:nethack-c/upstream/src/region.c
    for (i = 0; i < svn.n_regions; i++) {
        reg = gr.regions[i];
        if (!reg->visible || reg->ttl == -2L)
            continue;
        if (!hdr_done++) {
            putstr(win, 0, "");
            putstr(win, 0, "Visible regions");
        }
        Sprintf(buf, "%5ld", reg->ttl + 1L);
        damg = reg->arg.a_int;
        /* poison gas (%d) else vapor; %-16s; @[lx,ly..hx,hy] */
    }
```

Old JS: `any_visible_region` live (D-1512); `wiz_timeout_queue` / `visible_region_summary` `sym` NOT FOUND; getline name-list `timeout` wiz:true with **no** runner.

The diff **does** add EXT_CMDS `#timeout` → `wiz_timeout_queue`; `wiz_timeout_queue_lines` (putstr stand-in); `print_queue` / `kind_name` / `PROPERTYNAMES`; `visible_region_summary`; `start_timer` `tid = timer_id++` from 1. It **does not** port `show_region`, VERBOSE_TIMER names, `fmt_ptr` heap pointers, save/rest `timer_id`, `wiz_light_sources`, `timer_sanity_check`, or TIMER_NONE `impossible()`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `wiz_timeout_queue` | C `:2041–2127`, **LIVE this SHA** | async; `show_nhw_menu_text` |
| `wiz_timeout_queue_lines` | JS split of putstr body, **LIVE** | same order as C |
| `print_queue` | C `:2014–2037` static, **CLONE this file** | C is static; not a second export |
| `kind_name` | C `:1995–2011` static, **CLONE this file** | TIMER_NONE `impossible` **OMIT named** |
| `PROPERTYNAMES` | C `propertynames[]` `:30–114`, **LIVE table** | `sym` misses `const`; 83 rows |
| `visible_region_summary` | C `:674–711`, **LIVE this SHA** | |
| `any_visible_region` | C `:660–670`, **LIVE D-1512** | gate `:2112` |
| `start_timer` tid | C `:2280`, **LIVE this SHA** | was 0/absent |
| `region_bounding_box` | C `create_region` `:86–107` field, **CLONE** | nrect>0 union of rects |
| `#timeout` EXT_CMDS | C `cmd.c:1903`, **LIVE** | AUTOCOMPLETE\|WIZMODECMD |
| `show_nhw_menu_text` | C `display_nhwindow` NHW_MENU, **LIVE** | same as `#wizwhere` |
| `fmt_ptr` heap | C `:2032`, **OMIT named** | JS `o_id` / `a_long` hex |
| VERBOSE_TIMER names | C `:2024–2028`, **OMIT named** | contest is `#%d` |
| save/rest `timer_id` | C `:2675`/`:2714`, **OMIT named** | |
| `show_region` | C `display.c`, **OMIT named** | next Open at this SHA |

`node scripts/sym.mjs wiz_timeout_queue wiz_timeout_queue_lines visible_region_summary any_visible_region start_timer show_nhw_menu_text kind_name print_queue region_bounding_box PROPERTYNAMES`:

```
wiz_timeout_queue js/timeout.js:1563   ASYNC — await required
wiz_timeout_queue_lines js/timeout.js:1493   sync
visible_region_summary js/region.js:130   sync
any_visible_region js/region.js:110   sync
start_timer      js/mkobj.js:845   sync
show_nhw_menu_text js/pager.js:294   ASYNC — await required
kind_name        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/timeout.js:1434
print_queue      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/timeout.js:1469
region_bounding_box NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/region.js:679
PROPERTYNAMES    NOT FOUND in js/** (no export, no local function/const).
```

This SHA does **not** delete a symbol. `kind_name` / `print_queue` are C `staticfn` in the same C file — one JS local each is the C shape, not clone drift. `PROPERTYNAMES` is `const PROPERTYNAMES` (sym indexes functions). `region_bounding_box` predates this SHA (expire_gas_cloud); summary **reuses** it.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No gameplay RNG** (wizard listing + tid counter). **Public-unhit** for `#timeout`. Inherited seed0367 FAIL from parent D-1526 is **not** this SHA.

## C ↔ JS fidelity

Command envelope. C `cmd.c:1903–1904` WIZMODECMD + AUTOCOMPLETE + IFBURIED. JS name-list already had `{ name: 'timeout', wiz: true }`; this SHA adds EXT_CMDS `wiz: true`, `autocomplete: true`, `run` → `wiz_timeout_queue`. C `wizard` ≡ `flags.debug`. JS runner also `if (!(flags.debug \|\| flags.wizard))` then `Unavailable command 'timeout'.` — same as `#wizwhere`. **Match the cmd flags.** Buried: EXT_CMDS are available IFBURIED like other wiz cmds here. **Match.**

Window. C `create_nhwindow(NHW_MENU)` + `putstr` + `display_nhwindow(FALSE)` + `destroy_nhwindow`. JS `show_nhw_menu_text(lines)` is the existing NHW_MENU corner/fullscreen path (D-0929 / `#wizwhere`). **Match the display class.** `WIN_ERR` early `ECMD_OK`: JS has no WIN_ERR. Harmless.

Header. C: `Current time = %ld.` `svm.moves`; blank; `Active timeout queue:`; blank; `print_queue`. JS `:1496–1500` the same with `game.moves`. **Match.**

`print_queue`. Empty: `" <empty>"` (leading space). Else header `"timeout  id   kind   call"` then `" %4ld   %4ld  %-6s #%d(%s)"` (`!VERBOSE_TIMER`). JS padStart 4 / 3 spaces / padStart 4 / 2 spaces / padEnd 6 / ` #n(0x…)`. **Match the non-VERBOSE format.** `kind_name`: TIMER_LEVEL/GLOBAL/OBJECT/MONSTER/unknown strings match C. TIMER_NONE: C `impossible("no timer type")` then `"none"`; JS `"none"` only. Queue never stores TIMER_NONE (`start_timer` rejects `kind <= TIMER_NONE`). **Named omit of the pline, not a live-arm stub.** `fmt_ptr(a_void)`: C heap address; JS TIMER_OBJECT `o_id` hex, TIMER_LEVEL packed `a_long` hex. **Named.** tid was 0/absent before this SHA; now `timer_id++` from 1. C `:2280` `gnu->tid = svt.timer_id++`. JS `:860–864` if `timer_id < 1` then 1, then post-increment. First tid **1**. **Match the C counter for a fresh game.** Save/rest of `timer_id` still named — a restore can renumber vs C. Not this SHA’s listing claim.

Timed properties. C walks `propertynames[]` until `prop_name==0`. Count TIMEOUT bits; track `longestlen`; `specindx` = first index where `p == COLD_RES`. Then either `No timed properties.` or `Timed properties:` + blank + rows `" %*s %4ld"` left-padded names, with banner `" -- settable via #wizintrinsic only --"` once when `i >= specindx`. JS `PROPERTYNAMES` order: INVULNERABLE … FIRE_RES, then COLD_RES … LIFESAVED — **same order as C `:31–112`**. Banner on COLD_RES, not FIRE_RES. **Match.** Intrinsic read `u.uprops[p].intrinsic & TIMEOUT`. JS `u.uprops?.[p]?.intrinsic`. **Match the mask.**

Swallow / vault / stasis. C `u.uswldtim` / `u.uinvault` / `stasis_until >= moves` with `remain+1` and `"turns"` vs `"more turn"`. JS `:1542–1560` the same (`until - moves`, `remain > 0 ? 'turns' : 'more turn'`). **Match `:2100–2121`.**

Region gate. C `:2112–2113` `any_visible_region()` then summary. JS `:1549–1551`. **Match.** Summary does **not** run when every cloud is `!visible` or `ttl==-2`. **Match `any_visible_region`.**

`visible_region_summary`. Same skip as `any_visible_region`. `hdr_done` once: blank + `"Visible regions"`. `ttl+1` width 5 (C `%5ld`; JS `padStart(5)`). `damg = arg`: `"poison gas (%d)"` else `"vapor"`, `%-16s`. `fldsep` tab vs two spaces from `iflags.menu_tab_sep`. Box `@[lx,ly..hx,hy]`. JS uses `region_bounding_box(reg)` (union of `rects`) instead of a stored `bounding_box` field. C `create_region` `:86–107` for `nrect > 0` **is** that union (first rect then min/max). Gas clouds always have rects. Empty-rect C box is `COLNO`/`ROWNO`/`0`/`0`; JS empty is `{lx:1,hx:0,ly:0,hy:-1}` — **not hit** for live `make_gas_cloud`. **Match the printed box for every region this command can list.** `reg.arg | 0` vs C `arg.a_int`. JS clouds store damage in `arg`. **Match.**

Callee closure (`wiz_timeout_queue` arm). LIVE: `print_queue` (local = C static), `kind_name` (local = C static), `any_visible_region`, `visible_region_summary`, `show_nhw_menu_text`, `start_timer` tid. CLONE: `region_bounding_box` ≡ C stored box for nrect>0. STUB: none in the listing. OMIT named: VERBOSE names, `fmt_ptr` heap, TIMER_NONE `impossible`, save `timer_id`, `wiz_light_sources`, `timer_sanity_check`, `show_region`. **Arm may ship.** Not “dispatch ported, callee stubbed”: the region callee is a real body, not a TODO.

`#timeout` is wizard-only. No `rn2` in the new code. tid++ is not a dice stream.

## Hallucinations / overclaim

Subject lists live gas clouds ttl+1 / poison vs vapor / box: **true of `visible_region_summary` + the `any_visible_region` gate**. D-log canary empty / invisible / ttl−2 / poison / vapor ttl 0 / forever −1 / header once / tab / COLD_RES banner / FIRE_RES no banner / swallow vault stasis / tid+print_queue: **true of that canary**, not a public `#timeout` key. Stamping **Addressed:** D-1527 for **`:2039–2127` + `:672–711` + tid** is fair. Do **not** stamp “Match C `fmt_ptr` heap.” Do **not** stamp “Match C VERBOSE_TIMER.” Do **not** stamp “Match C `show_region`.” Do **not** stamp “Match C save/rest `timer_id`.” D-log “not a public FAIL” is **true of this SHA’s delta**; the suite at this parent already FAILed seed0367 from D-1526 — this commit did not cause that. `kind_name` is **not** a stub.

## Density

+285 JS: C `wiz_timeout_queue` + table + two static helpers + `visible_region_summary` + tid + one EXT_CMDS row. One wizard command cluster. Did not glue `show_region` (D-1528). Playbook §2b size is the C function family, not a drive-by. Acceptable.

## Branch-by-branch confirm

1. No wizard: Unavailable pline, `ECMD_OK`. **Match WIZMODECMD.**
2. Empty timer_base: `" <empty>"`. **Match `:2019–2020`.**
3. One TIMER_OBJECT: header + `#action(0x o_id)`. **Match non-VERBOSE; ptr named.**
4. No TIMEOUT uprops: `No timed properties.` **Match `:2077–2078`.**
5. FIRE_RES timed, nothing after COLD_RES: no banner. **Match specindx.**
6. COLD_RES (or later) timed: banner once before that row. **Match `:2086–2088`.**
7. `uswldtim` / `uinvault` zero: skip. Nonzero: exact strings. **Match.**
8. `stasis_until < moves`: skip. `== moves`: `1 more turn`. `> moves`: `N turns` with N=`until-moves+1`. **Match `:2115–2120`.**
9. No visible region / only ttl==-2 / `!visible`: no “Visible regions”. **Match gate.**
10. Poison damg>0: `poison gas (N)` ttl+1 box. Vapor damg==0: `vapor`. **Match `:700–704`.**
11. ttl 0 → printed 1; ttl -1 → printed 0. **Match comment `:694–698`.**
12. Two visible: header once. **Match `hdr_done`.**
13. `menu_tab_sep`: tab vs two spaces. **Match `:679`.**
14. TIMER_NONE `impossible`. **Named omit.**
15. **Public-unhit** (`#timeout` not in public tapes).

## Callers / RNG ledger

C callers: only the `#timeout` cmd. JS: EXT_CMDS `timeout`. `start_timer` tid is a counter, not `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Wizard listing is not a public-screen hardcode.

## Verification

D-log: private canary **43**/43; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** until wizard `#timeout` with a live cloud. Cohort is shared-startup, not `#timeout`. Honest for **this** SHA. This audit’s full-suite FAIL is seed0367 from **D-1526**, still FAIL at this SHA; screens for that session still 324/324 — not a `#timeout` screen.

## Actionable C-wrongs

None at the claimed listing. Remaining **named** (map / Open at this SHA): `show_region`; VERBOSE_TIMER names; `fmt_ptr` heap vs o_id; save/rest `timer_id`; `wiz_light_sources`; `timer_sanity_check`; TIMER_NONE `impossible()`. Do not Must-fix `region_bounding_box` for nrect>0 gas (equals C `bounding_box`). Do not Must-fix “call summary without `any_visible_region`” (C gates). Do not Must-fix the inherited Pri-strt emin dice — that is review **487**, not this SHA.

Verdict: **ACCEPT-WITH-DEBT**
