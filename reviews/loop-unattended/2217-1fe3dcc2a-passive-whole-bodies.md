# Review 2217 — 1fe3dcc2a — passive_obj + passive whole bodies

Metadata: SHA `1fe3dcc2a6b39c1e67eaeba9328b7e7dbf1b2ff9` (D-3256, 2026-10-02).
2 js/ files (`uhitm.js` ~90 ins, `mthrowu.js` wiring). Cluster: 2 whole
C functions (one C file) + 1 caller wiring — inside §10.17. Method run
per function below.

Intent vs deliverable: subject promises "passive_obj whole body +
passive whole body + drop_throw caller wiring". The diff delivers all
three, plus two latent-bug fixes found en route (RUST/CORR combined
case using CORRODE for rust; `obj`→`weapon` unresolved-param erosion).
Both fixes are C-cited in the message. Delivers what it promises.

Inventory:

- `passive_obj` (`js/uhitm.js:3145`): AD_RUST erode, AD_ENCH
  drain+pline, `carried→update_inventory` tail, ACID/CORR
  `obj`→`weapon`. All import extensions (update_inventory/drain_item/
  Adjmonnam/monstseesu+unseesu/carried/ureflects) grow pre-existing
  edges — no `imports.mjs --can` needed; erode_obj stays dynamic per
  file convention.
- `passive` (`js/uhitm.js:3224`): FIRE/ACID/RUST/CORR kick erodes,
  RUST+CORR split into C-order cases, ACID M_SEEN+erode_armor, MAGM/
  COLD/FIRE/ELEC shieldeff+M_SEEN, PLYS reflect/gaze/cube completion.
- `drop_throw` (`js/mthrowu.js:788`): `passive_obj` import extends the
  pre-existing uhitm.js edge; `m_at`→youmonst→`passive_obj` before
  stackobj.
- `sym.mjs` (all LIVE, async ones awaited, sync ones sync-called):
  carried eat.js:2685 sync; update_inventory invent.js:4791 sync;
  change_luck attrib.js:701 sync; canseemon display.js:1077 sync;
  monstseesu mondata.js:1052 sync; erode_armor mhitm.js:2440 ASYNC;
  shieldeff display.js:4756 ASYNC; ureflects mhitu.js:3498 ASYNC;
  Adjmonnam do_name.js:1304 sync; drain_item zap.js:5446 ASYNC;
  Yobjnam2 objnam.js:2896 sync. (Clone warnings for carried/canseemon/
  Yobjnam2 name other files' locals — this SHA imports the exports.)
  No symbols deleted or re-pointed.

**C ↔ JS fidelity — `passive_obj`** (C `uhitm.c:6126–6195`)

- AD_RUST :6170–6173: `if (!mcan) erode_obj(obj,0,RUST,GREASE)` ✓
  draw-free, no gate added. AD_ENCH :6180–6186: drain+carried+
  known||ARMOR → `"%s less effective."` ✓; C's in-arm break +
  FALLTHROUGH-to-default-break flattens to one break — equivalent ✓.
  Tail :6193–6195 `if (carried) update_inventory()` ✓ (sync export,
  correctly un-awaited). `obj`→`weapon`: C erodes the post-resolution
  object; JS resolves into `weapon` (:3155) — the old `obj` reads were
  the bug; fix direction correct ✓. RNG: no order change (rn2(6)s
  untouched).

**C ↔ JS fidelity — `passive`** (C `uhitm.c:5864–6125`)

- Even-if-dead, in C order: FIRE kick :5897–5900 ✓ (uarmf+rn2(6)+
  BURN+GREASE|VERBOSE); ACID :5906–5933 ✓ — rn2(2) gate, splashed
  strings (You→pline identical, disclosed), mdamageu→monstunseesu /
  monstseesu order, rn2(30)→erode_armor(youmonst,CORRODE), kick
  corrode, `exercise(A_STR,false)` tail present (:3321); STON
  untouched (D-2770); RUST :5958–5968 split from CORR ✓ (old combined
  case corroded for rust — real C-wrong fixed); CORR :5969–5979 ✓;
  MAGM :5980–5991 ✓ (shieldeff+see order in Antimagic arm,
  You→mdamageu→unseesu in else); ENCH :5992–6012 untouched incl. the
  comment-only `;` ✓.
- Live gate `malive && !mcan && rn2(3)` ✓ (pre-existing). PLYS
  :6021–6065 ✓: eye test, live `canseemon` (replaces the `mx!=null`
  stub — real fix), ureflects fmt+s_suffix(Monnam), Monnam capital
  fix in Hallu arm, rn2(4)→rn2(2)→rn2(2) order, s_suffix message
  fixes, nomul formulae, dynamic_multi_reason flags,
  `nomovemsg=null` gaze / `'You can move again.'` cube (mappings
  disclosed; You_can_move_again is that string), Adjmonnam blind +
  rn2(500)→change_luck(-1). COLD :6066–6084 ✓ (monnear, resist order
  shieldeff→feel→see→ugolemeffects→break, unseesu→pline→mdamageu→
  healmon halves→split gate; integer-division halves exact). STUN
  untouched (D-3251). FIRE :6089–6102 ✓. ELEC :6103–6114 ✓ incl. the
  absent monnear gate (commented). Return `malive|mhit` ✓.
- `drop_throw` (C `mthrowu.c:160–196`): place→occupant→passive_obj→
  stackobj order ✓, `(struct attack *)0` → null ✓. One reorder: C
  snapshots `m_at` *before* flooreffects (:183), JS reads it after.
  Benign: flooreffects 'fall' neither moves nor spawns monsters, and
  C's pre-read can dangle when the occupant dies mid-call — JS's
  post-read skips a dead occupant instead of reading freed memory.
  Observation, not a C-wrong.
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. "Whole C body live" ×2 holds — every
arm above walked against C. The message's bug-fix claims (RUST/CORR
split, obj→weapon) check out against the parent blobs.

Density (§2b): ~90 js ins, two whole functions + caller wiring, one C
file. Above the ~80 floor, inside the 10-fn/single-file cluster rule.
ACCEPT.

Verification: re-measured:
`verify passive,passive_obj --base 1fe3dcc2a~1 --reach-all` → both
vacuous (D-log says exactly that) + `reach passive: 248/248 → REACH-OK`
(full, reproduces the D-log's own --reach-all) + `reach passive_obj:
8/8 → REACH-OK`. 0 regressed.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
