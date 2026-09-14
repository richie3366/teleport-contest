# Review 1226 — 9d218d29 — mhitm CURS/DCAY/DETH/DRLI mon→mon arms (D-2260)

Metadata: SHA `9d218d29` (D-2260). Pops the Open queue head
(mon→mon remainder named by D-2251/D-2259). js/ +187/−4, all in
`js/mhitm.js`. Ceiling 450 not triggered (+187 < 250).

## Intent vs deliverable

Subject promises the four mhitm (mon→mon) arms plus an
`mdamagem` dispatch block. Diff actually adds: file-local
`mhitm_ad_curs` / `_dcay` / `_drli` / `_deth`, one dispatch
block inside `mdamagem`, a `fltxt != null` gate in `monkilled`,
new imports on existing edges, and local `PM_GREMLIN` /
`AD_CURS|AD_DCAY|AD_DETH` consts in the file's existing style.
Promise matches diff; nothing else smuggled in.

## Inventory

New: the four arms + dispatch (all file-local except via the
existing exported `mdamagem`). Changed: `monkilled` pline gate.
New imports (all additions, no local→import re-points, so no
`sym.mjs` deletion/re-point output is owed): `defended`
(mondata.js:135 sync), `ERODE_ROT` (const.js:2491), `is_undead`
(monsters.js:650 sync), `is_were` (monsters.js:779 sync),
`were_change` (were.js:306, async — awaited at the call site),
`night` (calendar.js:225 sync), `resists_drli` (zap.js:3601
sync, called without await in a sync boolean context —
correct). Pre-existing locals reused: `You_hear` (mhitm.js:359,
house clone with C ref comment), `_mm_vis` (mhitm.js:346/4788,
the file's `gv.vis`), `s_suffix` (canonical do_name.js import,
mhitm.js:119), `mlifesaver`, `deadmonster`, `grow_up`,
`mondied`, `erode_armor`, `mhitm_mgc_atk_negated`,
`mhitm_knockback`, `mon_offmap`. (`is_undead` has one clone in
`js/pray.js:836` — a different file; this commit imports the
canonical export, no new clone.)

Callee closure per shipped arm — all LIVE: CURS →
`night`/`were_change`/`mondied`/`grow_up`/`You_hear`; DCAY →
`mlifesaver`/`monkilled`/`erode_armor`; DRLI →
`resists_drli`/`defended`/`mhitm_mgc_atk_negated`; DETH →
`is_undead` + drli redirect. No STUB in any live arm; omits are
named in-commit (below).

## C ↔ JS fidelity

Each arm walked against its pinned C body (`csym.mjs`, ranges
cited):

- CURS vs `uhitm.c:3014–3096` mhitm branch (`:3063–3095`,
  fetched this audit). `!night()` before the gremlin test with
  `magr.data` (`pa`, correct side — attacker) in the D-2259
  `mndx` idiom; `!mcan && !rn2(10)` short-circuit kept (no draw
  when cancelled); `mcan = 1` + WAITFORU clear; `is_were(pd)
  && mlet != S_HUMAN` → `were_change` with `pd` captured
  before, exactly as C uses the stale `pd` for the clay-golem
  test after; `vis && canseemon` double pline; `mondied` then
  lifesaved → MISS + done / unseen tame → sad-feeling line /
  DEF_DIED | grow_up AGR_DIED + done; Deaf-gated laughter with
  the `!vis → You_hear / canseemon(magr) → chuckles` split.
  The hardcoded sad-feeling string matches C `brief_feeling`
  (`mhitm.c:9–10`: `"have a %s feeling for a moment, then it
  passes."`) through `You()`. No `hitmsg` — C mhitm arm has
  none. C.
- DCAY vs `uhitm.c:2362–2415` mhitm branch (`:2393–2413`,
  fetched). `mcan` return first, then `completelyrots` (mndx
  pair, D-2259) → `vis && canseemon` «falls/starts to fall to
  pieces!» via `mlifesaver` → `monkilled(mdef, null, AD_DCAY)`
  (C passes `(char *) 0`) → lifesaved MISS + done (C sets done
  before hitflags in this arm; JS sets both — order between two
  struct stores is unobservable) else DEF_DIED | grow_up +
  done; else `erode_armor(ERODE_ROT)`, WAITFORU clear, leftover
  zeroed. C.
- DRLI vs `uhitm.c:2444–2518` mhitm branch (`:2490–2517`,
  fetched). `is_death || (!rn2(3) && !(resists_drli ||
  defended(AD_DRLI)) && !negated(TRUE))` in exact short-circuit
  order; non-Death leftover `d(2,6)` (Death keeps leftover as
  the amount); `vis && canspotmon` «becomes weaker!»; mhpmax
  cut floored at `m_lev + 1` without ever raising; level 0 →
  leftover = mhp else `m_lev--`. C leaves HP subtraction to the
  caller — the new dispatch tail does `mdef.mhp -= damage`.
  C.
- DETH vs `uhitm.c:3836–3894` mhitm label (`:3880–3893`,
  fetched). Undead && leftover > 1 → `rnd(leftover/2)` with C
  truncation (`Math.trunc`), then drli redirect with
  `AD_DETH` surviving on `mattk.adtyp` for the `is_death`
  test. The uhitm `goto mhitm_deth` needs no separate port
  (no hero form has AD_DETH; mon→mon dispatch covers it). C.
- Dispatch vs `mhitm_adtyping` (`:4803` area — all four `case`
  lines confirmed this audit). The new `mdamagem` block copies
  the sibling tail verbatim: knockback preempt, `done`,
  `!damage`, HP/lifesave/grow_up. AD consts match monattk.h
  (`AD_DRLI = 15` pre-existing; new `AD_DCAY = 34`,
  `AD_DETH = 37`, `AD_CURS = 253` in-file).
- `monkilled` vs `mon.c:3376–3418` (`:3381–3386`, fetched):
  `if (fltxt && …)` gate now mirrored (`fltxt != null`);
  `*fltxt ? " by the " : ""` ≡ `txt ? … : …` with `txt =
  fltxt || ''`. D-log asserts every existing JS caller passes
  a string, so only the new DCAY call changes behavior
  (previously printed a bogus «is destroyed!»). The
  `iflags.sad_feeling` else-branch and the pet
  «rot/rust/roast in peace» tail are named omits in-commit.

## Hallucinations / overclaim

None. D-log Symptom/C-locus/Fix describe exactly the four arms
and the monkilled gate; the "no corpus reach" limitation is
stated, not hidden.

## Density

+187 for four C arms + dispatch + one gate fix. In-band (§2b:
one C locus family, one JS module).

## Verification

D-log Verify bullet pasted with `--full` forced and 44/44 PASS.
Re-measured myself: `hidden-proxy verify mhitm_ad_curs --base
9d218d29~1` → 0 blocked at baseline and working scoreboard
(vacuous, exactly as labeled — no PASS claimed, none owed);
`verify.mjs --fn mhitm_ad_curs` at HEAD → syntax PASS, rule2
PASS, green 2/2, strict ×2, cohort 7/7, VERIFY: PASS (tail
pasted in full this audit). Diff grep: no FORCE/DIAG/seed/
coordinate/`fastforward` tokens. Rule #2 repo-wide re-run
clean (review 1225).

## Actionable C-wrongs

None. Remaining arms (uhitm CURS/DCAY hero-poly) are already
queued as the next Open row, not Must-fix.

Verdict: **ACCEPT**
