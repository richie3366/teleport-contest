# Review 921 — 4f597828 — o_init.c doclassdisco class-discovery singleton (D-1951)

## Metadata

- SHA: `4f597828` (D-1951). JS: `js/artifact.js` +61/−1, `js/o_init.js` +309 (370 insertions → 450 ceiling applies).
- Subject promises: `disp_artifact_discoveries` + `dump_artifact_info` in artifact.js; disco consts + 4 file-local helpers + `choose_disco_sort` + `doclassdisco` in o_init.js; new edges SAFE/ALREADY; probes; named omits ('s' sortloot, extcmd wiring, preselect highlight, dodiscovered arm).
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. Every symbol the subject names is present. Banned-pattern grep over the JS hunks: 0. Rule #2 clean.

## Inventory

| Symbol | Class |
|---|---|
| `disp_artifact_discoveries(lines)` (artifact.js) | new export; ports C `artifact.c:1146–1173` |
| `dump_artifact_info(lines)` (artifact.js) | new export; ports C `artifact.c:1176–1209` |
| `DISCO_ORDER_LET`/`DISCO_ORDERS_DESCR`/`UNIQ_OBJS`/AMULET const | consts; C `o_init.c:599–606`, `:543–548` verbatim |
| `discovered_cmp` | CLONE (file-local) of C `:553–565` |
| `disco_output_sorted` | CLONE (file-local) of C `:743–766` |
| `disco_fmt_uniq` | CLONE (file-local) of C `:725–741` |
| `oclass_to_name` | CLONE (file-local) of C `:877–886` |
| `choose_disco_sort(mode)` | new export; ports C `:610–657` |
| `doclassdisco()` | new export; ports C `:888–1127` |
| All other callees (`yn_function`, `y_n`, `select_menu_pick_one`, `show_text_pages`, `clear_nhwindow_message`, `visctrl`, `upstart`, `let_to_name`, `def_char_to_objclass`, `interesting_to_discover`, `disco_append_typename`, `simple_typename`, `align_str`, `NROFARTIFACTS`, `ECMD_OK`, MENU_*) | LIVE (`sym.mjs`); async ones awaited (`y_n` is sync — `await` on it harmless) |

## C ↔ JS fidelity

- `disp_artifact_discoveries`: loop/break-on-empty/WIN_ERR-count/header-at-i==0/`"  %s [%s %s]"` shape all ≡ C; `"non-aligned"` remap handles JS `align_str`'s missing unaligned arm (disclosed); return-`i` count correct in all three exits (break/full/empty). Header attr uses ATR_INVERSE per the `dodiscovered` convention (C uses `menu_headings.attr` — same stated convention, presentation parity by repo idiom).
- `dump_artifact_info`: 9-bit `[%s…]` order (exists/found/gift/wish/named/viadip/lvldef/bones/random) ≡ C; `#if 0` tab arm correctly dead; `"  %-36.36s%s"` → `slice(0,36).padEnd(36)` ≡; `ae.rnd` ≡ C `.rndm` verified against the JS model (`rnd:` init :287, set :1024/:1029 — established name, not this commit's invention).
- Helpers: `uniq_objs` order, `disco_order_let` "osca" + 4 descr strings, mode-2 note 3 lines — all verbatim vs C. `discovered_cmp` ≡ (strcmpi past 2-char mark; JS stable sort vs C qsort differs only on exact ties where C specifies none — disclosed). `disco_output_sorted` lootsort rewrite `s.charAt(0)+s.slice(7)` ≡ C `sl[6]=sl[0]; sl+=6` (mark + post-key tail; verified index arithmetic) — dead arm (`lootsort=false` always, named omit) but shape-faithful. `disco_fmt_uniq` ≡ incl. the "papyrus spellbook" comment (disclosed). `oclass_to_name` ≡.
- `choose_disco_sort`: mode-2 note, title-as-first-item (rename_disco idiom, disclosed), 1/−1 returns, PICK_ONE-kills-n>1 arm (named) ≡. C 4th-arg `addcmdq` verified (`cmd.c:5470`, `extern.h:483`) — JS passes `true` ≡ C TRUE.
- `doclassdisco`: discosort normalize→'o', `menu_requested` gate, `alphabetized`/`lootsort` flags, unique/artifact/class collection in packorder+VENOM order, ESC-appended unseen syms in traditional `yn_function` (4th arg `true` ≡ C TRUE), MENU_PARTIAL single-class skip, pick→`a_int`, decline→ECMD_OK, 'u'/'r' + 'a'(wizard dump vs discoveries) + default arms, `objects[dis]` (not `[i]`) indexing, `bases[oclass]..bases[oclass+1]-1` bounds, `impossible`-then-fall-through (fuzzer-observed, cited), sortname header with `attr:0` (C "skip menu_headings" comment honored), `ct`-gated `show_text_pages` ≡ `display_nhwindow` — all branch-by-branch ≡ C `:888–1127`. `wizard` triple-disjunction follows the established repo idiom (cmd.js:346 etc.; C `wizard ≡ flags.debug` per flag.h:30). Numeric-class model (`def_oc_syms[oclass]`, `b[oclass]`) is consistent with the pre-existing `DEF_INV_ORDER`/array-index model, not a re-interpretation.
- Named omits in-commit with C citations: 's' sortloot (`sortloot_descr`/`loot_classify` own-row), extcmd `` ` `` wiring (cmd.c:1752), preselect highlight, `dodiscovered` arm. None are live arms.

## Hallucinations / overclaim

None material. Vacuous hidden note explicit. The "skip full (tool: no shared file changed)" is accurate (o_init.js/artifact.js are not shared-file triggers).

## Density

Large but single-envelope §2b: the whole `#knownclass` command + its two artifact.c helpers, one C locus family. Justified.

## Verification

- `hidden-proxy verify doclassdisco --base 4f597828~1`: 0 blocked at baseline and now — matches D-log.
- `--can o_init.js pager.js show_text_pages`: same-shape edge; artifact.js edge ALREADY. Callee closure: every arm callee LIVE or named omit. No stub in a live arm.

## Actionable C-wrongs

1. (debt, minor, function currently unwired) `choose_disco_sort` items carry no `selector`, so the JS menu engine auto-assigns positional `a`–`d`; C `:624–630` uses the sort letter itself (`(char) any.a_int` → `o/s/c/a`) as the selector. Fix in one port iter: add `selector: DISCO_ORDER_LET[i]` to the four items (class menu in `doclassdisco` already does explicit selectors + `gselector` correctly). No RNG/state impact; no session reaches it until extcmd wiring lands — hence debt, review-listed, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
