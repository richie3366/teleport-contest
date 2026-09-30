# Review 2117 — db34c42bb — optfn_map_mode + menu_headings + color_attr_to_str + pettype

- SHA: `db34c42bbf2c730d8fefb159b4e29c8a250f99c4` (D-3157)
- Date: 2026-09-30. `js/` delta: +283/−14 (options.js + const/map-mode enums + jsmain default).
- Cluster: 4 ports + 6 dispositions (1 stale same-file set, 2 by-design) = 10 functions, at the ceiling.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises the 4-function cluster. Diff actually adds: the four
ports, allopt/rc/doset wirings, the menu_headings C-domain attr flip
(+ painter translation), map-mode consts, the jsmain default, and the
test suite (17/17, re-ran). Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `optfn_map_mode` (options.js:3016, sync export) | new, C order | whole |
| `optfn_menu_headings` (options.js:3097, sync export) | new, C order | whole |
| `color_attr_to_str` (options.js:3133, sync export — C extern) | new | whole |
| `optfn_pettype` (options.js:3151, sync export) | new, C order | whole |
| `ape_heading_attr` | C-domain → terminal translation | verified adaptation |
| `sortloot_descr`, `handler_whatis_filter`, `handler_windowborders`, `query_msgtype` | ledger stale → ported | dispositions (sites verified) |
| `optfn_palette`, `mapfrag_free` | ledger by-design | dispositions (verified below) |

Callee closure, all LIVE same-file locals (C staticfns — locality
correct): `string_for_opt`, `string_for_env_opt`, `bad_negation`,
`config_error_add`, `allopt_name`, `set_optbuf`, `wc_supported`,
`preference_update`, `color_attr_parse_str`, `clr2colorname`,
`attr2attrname`, `strncmpi` (hacklib), `strNsubst`. No stubs, no
re-points. do_handler for menu_headings async-splits into
`doset_optfn_do_handler` + `doset_compound_via_getlin` (established
precedent, both sites wired).

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity (per function)

**`optfn_map_mode`** — C `options.c:1962–2047` (`csym`). do_init/init
✓; do_set: `string_for_opt` + `op!=empty && !negated` gate ✓,
`save_map_mode` ✓, exact-`tiles` via length-5 gate + strncmpi
(≡ C `strcmpi`; gate required and present) ✓, prefix chain lengths
8/8/8/9/9/9/10/10/10/13/19/19 = sizeof−1 each (verified) ✓,
unknown → error + ERR ✓, `wc_supported` + `!mode||changed` →
`preference_update` ✓, negated → bad_negation + ERR ✓; get_val chain
names modes 0–10 with 11 falling to `defopt`="default" (:126,
verified) ✓. JS `strncmpi` matches C prefix semantics (short op
≠ match, long op = match). No RNG. Confirm.

**`optfn_menu_headings`** — C `:2182–2222`. Empty → C-domain
attr (negated? NONE : INVERSE) + NO_COLOR + OK ✓; negated+value →
bad_negation + SILENTERR ✓; parse-fail → ERR, whole-struct assign ✓;
get_val to_str + space→hyphen ✓; do_handler via the async-split
dispatcher (both doset paths wired) ✓. The C-domain flip is
consistent: MC_ATR_* = wintype.h `:128–134` exactly (0,1,2,3,4,5,7,
verified), writers (`parse_str`/`query_attr` pick-one) already
C-domain, painter translates (DIM/ITALIC/BLINK → NONE named), and the
only other painter (`add_menu_heading_attr`) hardcodes its constant —
unaffected. Confirm.

**`color_attr_to_str`** — C `coloratt.c:248–257`: `"%s&%s"` over
clr/attr names; JS identical with `|0` ≡ C zero-struct. Confirm.

**`optfn_pettype`** — C `:3196–3253`: env_opt parse, 9-letter switch
(d/c-f/h-q/n/r-*, C `'\0'` → JS `''` so both get_val and get_cnf_val
truthiness match C's 0) ✓, unknown → error + ERR ✓, empty+negated →
'n' ✓, dead post-return `break` skipped ✓. Store
`game.preferred_pet` is read by `dog.js pet_type` (:101, '' falls to
C's random arm) and makedog's 'n' skip. rc valued + valueless arms
follow the sibling `(stripped, val)` convention; the skipped
valueless map_mode arm is behaviorally zero-effect (returns ignored
on that chain) and named. jsmain `{7,8}` default = C `:7188–7189`,
rc spread overrides. Confirm.

**Dispositions:** `optfn_palette` body `:2699–2730` sits inside
`#ifdef CHANGE_COLOR` (`:2694–:2814`) with the define commented out
(`windconf.h:29`) — compiled out, by-design correct.
`mapfrag_free` is pure `free`+NULL — GC no-op correct. The four
stales exist at the claimed sites with matching shape. Confirm.

## Hallucinations / overclaim

None. The D-entry names the async-split, the valueless-map_mode skip,
and the unrenderable attrs rather than hiding them.

## Density

- Whole-function verdicts: all four whole (every arm verified, every
  C caller path wired: allopt + rc valued/valueless + doset get/handler).
- Cluster: one C file (+ its `coloratt.c` callee), 4 ports + 6
  dispositions = 10 functions — exactly at the §10.17 ceiling, not
  over. One `Ledger:` entry per function — present.

## Verification

Re-measured myself (`--base db34c42bb~1 --reach-all`, all 4):

```text
verify <each of 4>: baseline db34c42bb~1 — 0 session(s) blocked on it
smoke <each of 4>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Focused suite 17/17 (re-ran).
No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
