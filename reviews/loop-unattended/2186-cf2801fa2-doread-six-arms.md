# Review 2186 — cf2801fa2 — doread whole-body six arms + Blind-gate fix

SHA `cf2801fa2`, D-3226; 2026-10-01; js/read.js (+157/−21) +
scripts/doread-learnscroll.test.mjs (new, unscored). Single-function
cluster (read.c). Closes no prior review (touches 2184 only to fill
the D-3225 hash per the next-commit rule ✓).

## Metadata

- Subject: "doread whole-body: six arms + Blind-gate fix (3 scen-*
  blocked) (D-3226)."
- Promises: six missing C arms in C order with exact strings; Blind()
  gate + disappear fix; conduct livelogs; live useup tail; canonical
  Hallucination(); learnscroll dknown deletion + export; PROGRESS on
  3 blocked sessions.

## Intent vs deliverable

Kept. The diff adds exactly the six arms (dunce, credit, marker,
coin, orb, candy), the two Blind() reads, seven literate-livelog
sites, the `useup_live` tail, the `Hallucination()` swap, the
learnscroll change, the `find_any_braille` hoist, and the regression
test. No second function, no caller changes (none needed — cmd.c
dispatch only).

## Inventory — doread, learnscroll

Changed: `doread` (js/read.js:2189) — six arms + gate/disappear/
conduct/confused/tail fixes; `learnscroll` (js/read.js:295) —
dknown line deleted, now exported. Moved: `find_any_braille` to
function top (C static). Added data: `RED_MONS[14]`, `PM_TOURIST`,
`DUNCE_CAP`/`CREDIT_CARD`/`CANDY_BAR` consts. New imports are all
LIVE exports (see fidelity). Deleted/re-pointed: none (no
clone→import; `sym.mjs` re-point check vacuous — the `useup_live`
alias at js/read.js:108 is a pre-existing invent.js import, and
the local `useup` clone at :279 stays for 6 other call sites).

## C ↔ JS fidelity — doread

C `read.c:329–647` (csym range; no direct C callers — cmd.c:77
extern only ✓). Arm order verified C-identical: cookie → shirt →
dunce → credit → grease → marker → coin → orb → candy → silly →
Blind-gate (JS sequential `if`s each return, ≡ C's else-if chain).

- Dunce (:414–449): `Role_if(PM_TOURIST)` gate ✓, `o_id % 3`
  unreadable-two-thirds ✓, "DUNCE"/"WIZZARD" ✓, writing/lettering
  Blind split with exact `"on the %s.  It reads:  %s."` shape ✓,
  conduct + livelog before trycall ✓, no discovery ✓.
- Credit: 14 card_msgs in C order, artifact→last ✓;
  `o_id % 13` selector ✓; `"%d0%d %ld%d1 0%d%d0"` digits verified
  term-for-term (`(oid%89)+10`, `oid%4`, `((oid*499)%899999)+100000`,
  `oid%10`, `!(oid%3)`, `(oid*7)%10`) ✓; verbose||Blind period ✓.
- Marker: red_mons[14] in C order (FIRE_ANT…PIRANHA) ✓,
  `pmname(pm, NEUTRAL)` + upwords ✓, blind→braille ✓, exact
  `"Magic Marker(TM)…"` string ✓.
- Coin: embossed-words/read split + exact Zorkmid string ✓.
- Orb: `is_art(scroll, ART_ORB_OF_FATE)` + signed/Odin strings ✓.
- Candy: `candy_wrapper_text` (always-string, so JS `!wrapper` ≡ C
  `!*wrapper` ✓) + blank/wrapper strings ✓.
- Blind-gate: `Blind()` now ✓ (was stale `u.Blind`/`u.ublind`
  snapshot); disappear block `blind = Blind()` ✓; confused keeps
  the `HConfusion||Confusion` superset (named ✓); `Hallucination()`
  is the display.js youprop reader (D-1493), not the do_name.js
  sticky variant — correct C-locus choice ✓.
- Conduct: `!(literate|0)` + livelog + bump ≡ C
  `if (!u.uconduct.literate++)` at all 7 sites incl. book/scroll/
  `something` ✓. Tail `useup_live(scroll)` = invent.js useup
  (update_inventory/setnotworn) ✓.

Callee closure: simpleonames, candy_wrapper_text (objnam.js),
pmname (do_name.js), upwords (hacklib.js), is_art (artifact.js),
Hallucination/Blind (display.js), useup_live/· (invent.js),
livelog_printf, trycall — all LIVE. `Role_if` is read.js's
pre-existing local clone, verified against C you.h:247
(`urole.mnum == pm`) — matches exactly ✓. `something` =
"something" (const.js:541) ✓; `verbose !== false` is file
convention (cookie/shirt arms) ✓. No RNG in the new arms (o_id
arithmetic only) ✓.

## C ↔ JS fidelity — learnscroll

C `read.c:69–76` (+ `learnscrolltyp` `:57–66`, csym): dknown
"implied", never written ✓ — deletion correct; makeknown +
more_experienced(0,10) on new type ✓ matches learnscrolltyp.
Export adds no callers (test only). Test passes 3/3 here.

Diff grep on the js hunk: 0 hits. Rule #2 clean (prior
iteration-wide rulecheck; this SHA adds no imports outside js/).

## Hallucinations / overclaim

None. "Six arms in C order with exact strings" verified
term-for-term above. The stale-snapshot diagnosis (make_blinded
writes only, do.js) matches the removed code.

## Density

One whole C function (319 lines) + its callee fix, one file, no
Must-fix bundled ✓. Well inside caps; above the ~80 floor.

- Ledger: doread ported — ACCEPT.

## Verification

Re-measured (current tree):

```text
verify doread: baseline cf2801fa2~1 — 3 session(s) blocked on it (3 at baseline, 0 in the working scoreboard)
  scen-impaired-Healer-94190: moved → object_detect at step 198 (was 70)
  scen-impaired-Tourist-94350: PASS
  scen-normal-Tourist-92061: moved → seffect_magic_mapping at step 18 (was 17)
verify doread: 1 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
smoke doread: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
```

Identical to the D-log claim (sessions, steps, owners) — not
vacuous, not rewritten. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
