# Review 2049 — d1541778d — wiz_custom + wiz_kill + ecname_from_fn (D-3089)

Metadata: SHA `d1541778d`, D-3089, js/wizcmds.js (+170/−12),
js/dokeylist.js (+25), js/const.js (+3 KNOWN_HANDLING). Three-function
cluster (2 wizcmds MISSING + cmd lookup).

## Intent vs deliverable

Promise: wiz_custom whole (gate, cache, menu, bufa, fill, prompt-last,
select/destroy, free-note, cache drop, docrt, live unavail call site);
wiz_kill whole (pick loop, steed/seppuku/swallow/m_at arms, name block,
credited vs m-prefix kills, breaks, dmonsfree); ecname_from_fn whole
(scan + UNAVAILCMD + KNOWN_HANDLING). Diff delivers all three bodies
exactly — but wires neither dispatch runner although both C rows are
unconditional (below). Bodies kept; dispatch missed again.

## Inventory (per function)

- `wiz_custom` (NEW export js/wizcmds.js:2109): wizard gate + live
  unavail else, cache fill, raw-array win, verbatim heading, bufa
  (colorcount/name/`, active`/`, handler=`), dead-copy drop, live
  wizcustom_glyphids fill, prompt-last, select_menu_pick_none, free
  note, cache drop, docrt, ECMD_OK. Callees all LIVE or house-mapped
  (menu verbs → array + select; `free`/dead copy have no analogue).
- `wiz_kill` (NEW export :2149): prelude, pick loop, steed ynq,
  seppuku paranoid_query, next2u swallow, m_at, unmap_invisible,
  tame/seen/flgs/articl/adjs block, You+xkilled vs mon_moving +
  pline+monkilled, level-change break, There arm, dmonsfree,
  ECMD_OK. All 20+ callees LIVE (list verified below). No gate in
  C or JS (WIZMODECMD dispatch gates it).
- `ecname_from_fn` (NEW export dokeylist.js:652) + UNAVAILCMD const
  (cmd.c:157 text exact): EXTCMDLIST scan via same-file efTxt
  bridge (generated table has no funct pointers), null on miss.
  Zero C callees. 1 of 12 C sites wired live; 3 C-identical
  hardcodes; 8 owned elsewhere (below).

## C ↔ JS fidelity (per function)

wiz_custom (C :1933–1984): gate `wizard` ≡ debug||wizard ✓; cache
fill/drop ✓ (live glyphs.js trio); create+start ≡ `[]` ✓; heading
PROVED verbatim by programmatic C-vs-JS string compare (both
literals incl. all spaces) ✓; bufa `%s: colorcount=%ld %s` ✓
(`|0` ≡ long, `?? 'default'` ≡ ternary); `, active` gate
(currentgraphics==PRIMARYSET && name; BSS-0 ≡ `|0`, PRIMARYSET=0
both sides — sym.h:126 ✓) ✓; `, handler=` with KNOWN_HANDLING
char-exact vs symbols.c:376–384 (6 names + null) ✓; dead :1965
copy dropped — `buf` never read later in C ✓ verified; fill ✓
(takes the array); end_menu(bufa) ≡ prompt-last (select renders
rows + morestr; bufa last ≈ tty prompt position — disclosed
house mapping) ✓; select PICK_NONE + destroy ≡ awaited
select_menu_pick_none ✓; #if0 omitted (dead in C) ✓; `n>=1 free`
noted (PICK_NONE → n=0, never fires in C either) ✓; docrt
awaited ✓; else `pline(UNAVAILCMD, ecname_from_fn('wizcustom'))`
FIRST live site ✓; ECMD_OK ✓. No RNG. Body: confirm.

wiz_kill (C :241–347): prelude ✓ (uz struct copy ≡ spread);
`%s:` prompt + swap ✓; getpos(cc,true,'a monster') ≡ C signature
✓ (live async, awaited); restore + `ans<0||cc.x<1` ✓; steed
`Kill %.110s?` ≡ slice(0,110) ✓, ynq awaited (correct sync-or-
promise) with 'q'/'y' ✓; seppuku Role_if(PM_SAMURAI) ≡
urole.mnum===PM_SAMURAI (you.h:247 ✓); paranoid_query(TRUE) ✓;
killer `${uhis()} own player` + KILLED_BY (pre-imported :13 —
no ReferenceError) + done(DIED) ✓; unconditional break ✓;
next2u ≡ dist2≤2 PROVED (you.h:558 distu≤2; hack.h:1531
distu=dist2; hacklib.c:673 dist2=dx²+dy² ≡ JS) ✓; m_at ✓;
unmap_invisible ✓ (attempt teaches); tame/seen(`===` identity ✓)
/flgs/articl/adjs (`'poor, unseen'`/`'poor'`/`'unseen'`/null ✓)/
x_monnam(5 args ≡ C ✓); credited You+`await xkilled(XKILL_NOMSG)`
✓ vs m-prefix mon_moving + `upstart(Mn) is destroyed|killed` +
`await monkilled(null, AD_PHYS=0)` (monattk.h:42 ✓) ✓; utotype/
on_level break ✓ (live dungeon export — the 12 clones are
elsewhere, this imports the export ✓); There+break ✓;
dmonsfree ✓; ECMD_OK ✓. No RNG. Body: confirm.

ecname_from_fn (C cmd.c:3091–3102): funct-ptr scan ≡ efTxt txt
scan (disclosed adaptation — no funct pointers in generated
data) ✓; efTxt('wizcustom')→'wizcustom' → row found → returns
txt ✓; miss/null→null ✓ (probe claims match the code). 12 C
sites: :1982 wiz_custom WIRED LIVE ✓; :64/:223/:1094 hardcodes
VERIFIED C-identical ("Unavailable command 'wizidentify|wizwhere|
wizintrinsic'." vs cmd.c:1963/1998/1965 rows ✓ — "rewiring is
churn" is behaviorally sound); remaining 8 in unported-or-gated
functions (their rows own the arms — callee can't wire callers).
Nit: the D-log's blanket "unported" mislabels sites whose arms
exist with NAMED-divergent text (wiz_wish :376–379 "You can't do
that." + in-code note :424) — scoping conclusion still holds,
gap already named in code. No RNG. Verdict: ACCEPT.

CALLERS — the gap (both wizards). csym reports 0 references; the
D-log says "(WIZMODECMD dispatch only, unported) — no JS callers
yet". Direct C read: "wizcustom" cmd.c:1951–1952 IFBURIED|
WIZMODECMD|NOFUZZERCMD and "wizkill" cmd.c:1967–1969 (+AUTOCOMPLETE
+CMD_M_PREFIX) are BOTH UNCONDITIONAL. The dispatch is NOT
"unported" — EXT_CMDS runs D-2779 wizard runners today, and the
generated rows exist (wizcustom flags 37, wizkill flags 167) —
only these two RUNNERS are missing, so #wizcustom/#wizkill are
dead ends. Same family as review 2045's finding, one iteration
later, with the dispatch-exists fact now established. Both
functions: unwired C caller.

`sym.mjs` callee roll (all LIVE; async awaited, sync called):
wizcustom_glyphids, glyphid trio, select_menu_pick_none, docrt,
getpos, ynq, paranoid_query, mon_nam, x_monnam, uhis, xkilled,
monkilled, done, nonliving, on_level, upstart, You, There,
m_at, dmonsfree, pline. New-edge `--can` ×5 (uhitm/mhitm/end/
roles/dungeon) → all ALREADY (D-log "SAFE" holds trivially).
No deleted/re-pointed symbols.

Stale: dump_enums partial→ported ledger flip (same sink note
kept — matches the sf_log named-omit precedent, no finding).

## Hallucinations / overclaim

YES — material but narrow: "(WIZMODECMD dispatch only, unported)"
misstates the dispatch as unported when EXT_CMDS + generated rows
exist and D-2779 wired siblings in-commit; "no JS callers yet"
presents two live C call sites as future work with no row. Bodies'
"none in-body" claims all hold. The ecname "unported" blanket is a
minor mislabel (see above), immaterial.

## Density

One C file + callee closure (cmd.c lookup — §2b allows the
closure) ✓, 3 whole functions, no Must-fix bundled ✓. `Ledger:`
3 ported ✓. Per-function: wiz_custom body ACCEPT / caller
QUALITY-RISK; wiz_kill body ACCEPT / caller QUALITY-RISK;
ecname_from_fn ACCEPT → SHA QUALITY-RISK.

## Verification

- Re-measured `hidden-proxy verify wiz_custom,wiz_kill,
  ecname_from_fn --base d1541778d~1 --reach-all`: all three
  `0 blocked (0/0)` + `smoke 24/24, 0 regressed → REACH-OK`.
  Matches the D-log; honestly vacuous (rows cited 0). (Corpus
  can't reach wizard extcmds — the dispatch gap is invisible to
  verify, as in 2045.)
- Ban-grep on js hunks: clean. Rule #2 clean.

## Actionable C-wrongs

1. `wiz_custom` + `wiz_kill` unwired from the runnable extcmd
   dispatch: C cmd.c:1951–1952 "wizcustom" and cmd.c:1967–1969
   "wizkill" (both unconditional; wizkill +AUTOCOMPLETE)
   call the D-3089 exports, but js/getline.js EXT_CMDS has no
   runners (siblings wired per D-2779; 2045 queued the same
   family for vision/wizmondiff). Fix: add both EXT_CMDS rows
   (wiz:true; autocomplete false/true per C flags; lazy import).

Verdict: **QUALITY-RISK**

**Addressed:** D-3091 `da4f12710`
