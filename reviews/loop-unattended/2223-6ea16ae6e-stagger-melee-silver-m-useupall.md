# Review 2223 — 6ea16ae6e — stagger restart + melee silver + m_useupall

Metadata: SHA `6ea16ae6ea5beb248117e2ddb1eb27fd104c9194` (D-3262,
2026-10-02). `js/uhitm.js` (+38/−22), `js/mthrowu.js` (+12/−6).
Cluster: 2 uhitm.c arms + callee-closure m_useupall (mthrowu.c) —
one C file + callee. Method per function below.

Intent vs deliverable: subject promises "hmon_hitmon_stagger
restart + weapon_melee silver flags + m_useupall live export". The
diff restarts stagger as async-(hmd,mon,obj) with pline + hurtle,
sets both silver flags in melee, exports m_useupall and wires both
C callers. Delivers what it promises.

Inventory:

- `hmon_hitmon_stagger` (`js/uhitm.js:1015`): restart — rnd(100)
  gate on hmd.mdat, canspotmon pline, mhurtle_to_doom →
  already_killed, hittxt; caller builds the hmd snapshot and
  copies back dmg/hittxt/already_killed/mdat.
- `hmon_hitmon_weapon_melee` (`js/uhitm.js:1139`): +silver flags
  `ctx.material===SILVER && mon_hates_silver` (C :1035–1036);
  shatter arm now calls m_useupall (C :1007).
- `m_useupall` (`js/mthrowu.js:174`): new sync export
  (extract_from_minvent + GC instead of obfree); m_useup else
  branch now calls it (C :1168).
- One import extension (uhitm→mthrowu :133, pre-existing edge).
  `sym.mjs`: m_useupall sync; mon_hates_silver monsters.js:850
  sync export; stagger mhitm.js:1131 sync export; makeplural
  objnam.js:2237 export; canspotmon display.js:1383 export (not
  monmove.js:1323's clone); P_SKILL weapon.js:1301 export
  (uhitm.js:47 import, not a clone); mhurtle_to_doom local-only
  in uhitm.js:1609 — correct home (C staticfn uhitm.c:1940–1958),
  not drift. No symbols deleted; two call sites re-pointed from
  inlined bodies to the new export (same semantics).

**C ↔ JS fidelity — `hmon_hitmon_stagger`** (C uhitm.c:1569–1585)

- Gate `rnd(100) < P_SKILL(BARE_HANDED) && !bigmonst && !thick`
  on hmd.mdat ✓; pline `"%s %s from your powerful strike!"`
  with Monnam + makeplural(stagger(mon->data)) — JS keeps C's
  mon.data (not hmd.mdat) for stagger ✓; mhurtle(mon,dmg,&mdat)
  → already_killed, then hittxt ✓. rnd(100) always burned ✓.
- Caller (C :1827–1828): JS gate `unarmed && dmg>1 && !thrown &&
  !obj && !Upolyd` matches ✓. Fresh-hmd `already_killed:false`
  is sound: outer var is still false at that point (init :1993,
  only sibling-branch writes), and C's hmd.already_killed is
  likewise false (init :1787, shade_miss sets hittxt only) ✓.
  mdat refresh `hmd.mdat || mon.data` mirrors C's `*mptr` ✓.
- mhurtle_to_doom body (pre-existing, now dual-called): `tmp <
  mhp → mhurtle(dx,dy,1) → mdat=mon.data → mhp<1` — matches C
  :1940–1958 including DEADMONSTER `<1` ✓. stagger() callee
  chain matches C mondata.c:1395–1407 (same order, same
  locoindx rule) ✓.

**C ↔ JS fidelity — `hmon_hitmon_weapon_melee`** (C :1035–1036)

- `ctx.material===SILVER && mon_hates_silver → silvermsg =
  silverobj = true`, placed after the artifact-dmg block and
  before lightobj (:1038) — C order exact ✓. ctx.material is the
  hmdHit :1774 oc_material snapshot on the same object do_hit
  dispatches (:2015 → :1832) — populated before melee runs ✓.
  SILVER=14 both sides (objclass.h:27) ✓.
- :1877 weapon-silver msg_silver call stays named with its
  follow-up row sketched (needs saved_oname/cxname plumbing) —
  honest downstream omit, flags-only this commit ✓.

**C ↔ JS fidelity — `m_useupall`** (C mthrowu.c:1153–1158)

- extract_from_minvent(mon,obj,TRUE,FALSE) + obfree → JS drops
  only the free (GC convention, same as m_useup's doc) ✓. Both
  C callers wired (:1168 m_useup, :1007 shatter; mkobj.c:2530
  is a comment) ✓. Shatter arm's `ex.then` await preserves the
  old inline's sync/async tolerance ✓.

Hallucinations / overclaim: none. "Whole C body live" for stagger
and m_useupall verified line-for-line; melee's remaining :1877
omit is named, not hidden.

Density: 3 functions, one C file + callee, +50/−28 JS — below the
~80 floor with the D-3258 escape honestly invoked (generator 0
rows, uhitm.c nothing more Open, closure otherwise live with
per-callee C citations). Verdicts: all three ACCEPT. Each has its
own `Ledger:` entry (all `ported`) and Verify sub-bullet. SHA
verdict = ACCEPT.

Verification: D-log Verify shows green/strict/cohort + 3× hidden
note with REACH-OK. Re-measured (`hidden-proxy.mjs verify …
--base 6ea16ae6e~1 --reach-all`): all three vacuous at baseline
(rows cited 0 blocks — correctly notes, not PASS) + `reach
stagger: 57/57 → REACH-OK`, `reach melee: 2/2 → REACH-OK`,
`smoke m_useupall: 24/24 → REACH-OK`. Zero regressed.
Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2221 run).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
