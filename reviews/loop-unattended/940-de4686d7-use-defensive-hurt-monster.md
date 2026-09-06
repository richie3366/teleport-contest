# Review 940 — de4686d7 — muse.c use_defensive hurt-monster horn/bugle/wand depth (D-1970)

Metadata: SHA `de4686d7`, D-1970, `js/muse.js` (+288/−30) +
`js/music.js` (+15/−2). Reviewer re-ran the C arms
(`muse.c:822–1010`, `:470–745` at HEAD), `monst.h:222`, the new
JS arms line by line, sym on ~35 callees, three `--can` edges,
Rule #2, banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises 7 use arms in C order
plus the matching `find_defensive` selection and an exported
`awaken_soldiers`. Diff actually adds all of that. Promise
kept.

Inventory: seven new `use_defensive` case arms (HORN, BUGLE,
WAN_TELE_SELF, WAN_TELE, WAN_DIGGING, WAN_UNDEAD, WAN_CREATE)
spliced in C switch position (horn before SCR_TELE,
digging/undead/create between SCR_TELE and SCR_CREATE —
verified against the C case order). Four new `find_defensive`
selection blocks (horn, undead, bugle, pit-kludge + isVlad +
dig/tele/tele-self/create in the loop). One promoted export
(`awaken_soldiers`, music.js:406, async). No deleted symbols.

C ↔ JS fidelity:

- HORN: optional-otmp shape kept; `pline_The("tip of %s's
  horn glows!")` → `The tip of ...` (no `pline_The` symbol
  house-wide, dig.js style); blind/conf/stun cures in C
  if-order; `impossible` else-arm awaited. Exact.
- BUGLE: `!otmp → return 0` matches the house-wide softening
  of C's `panic` (every arm in this switch already does it;
  find only selects with the item present). vismon pline vs
  `!Deaf` sound split exact; file-local deaf quadruple
  (HDeaf/EDeaf/uroleplay.deaf/Deaf) follows the house pattern
  (`Deaf` has no JS export anywhere). `awaken_soldiers(mtmp)`
  wired; no early return — falls into the pre-existing
  `if (m.has_defense) return true` ≡ C's `goto botm`. Exact.
- TELE_SELF: shk/inhishop/gd/priest gate, `m_flee`, self
  `mzapwand`, `m_tele`. Exact.
- TELE beam: `_zap_oseen`/`m_using` set/clear around local
  `mbhit(rn1(8,6))` (same-module pre-existing local from the
  use_offensive arm, D-1810) + noteleport-learn arm. Exact.
- DIGGING: ineffective-gate (FURNITURE/DRAWBRIDGE/
  `is_drawbridge_wall >= 0`/stairway), `Can_dig_down`+`candig`
  pit fork with `t_at || !maketrap(PIT)` short-circuit,
  `seetrap`+`fill_pit`+`recalc_block_point`,
  `mintrap(FORCEBUNGLE) == Trap_Killed_Mon ? 1 : 2`, HOLE fork
  (flyer dives/falls vs Deaf-gated crash + `You_hear` with the
  live `something` const), `migrate_to_level(ledger+1,
  MIGR_RANDOM)`. Exact. The `wall_info | flags` OR in the
  selection gate is the D-0865 house pattern (`#define
  wall_info flags` — one C field), not an invention.
- UNDEAD/CREATE: exact incl. `enexto`-fail → 0 and
  `canspotmon && oseen` makeknown (the older SCR_CREATE arm's
  `canseemon||sensemon` predates this SHA — D-1809 — left
  alone, correctly not re-litigated).
- Selection: horn (conf/stun/blind + nohands scan +
  unicorn/ki-rin, `return true`), undead (corpse-wielder
  chain), bugle (mercenary + carrying + sleepy-soldier, no
  return → botm gate), pit kludge, `nomore` order with
  digging-`break` vs rest-`continue`, tele amulet split,
  Pestilence branch — all match `:470–745`. `PM_VLAD` const is
  `indexOf('PM_VLAD_THE_IMPALER')` with the `monst.h:222`
  data-or-cham shape. No new RNG in find arms.
- `awaken_soldiers`: null → ulevel/mdistu, monster →
  mlevel/dist2 — exact vs `music.c:161–192`; hero callers pass
  null so behavior identical.

Callee closure: ~35 names swept — all LIVE exports except
same-module pre-existing locals (`mbhit`, `m_flee`,
`mzapwand`, `m_tele`, `mcureblindness`,
`m_sees_sleepy_soldier`) reused, not re-cloned. Three `--can`
checks: ALREADY. No STUBs in live arms.

Hallucinations / overclaim: none. The "C-wrong risk" framing
is accurate (omission + selection gap, now closed).

Density: §2b right size — one C function family's arms, two
modules. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn use_defensive` → PASS syntax/rule2/green/strict/cohort
(full skipped: two-file but tool judged no shared file —
taken at face value; green+cohort held), an explicitly vacuous
hidden note (row cited 0 blocks, no corpus-PASS claim).
Weaker than siblings: the only probe is an import smoke
(`load ok`), no behavioral arm probe. Given zero corpus
blocks, held green, and the arm-by-arm exactness confirmed
above, this is a probe-depth note, not a verdict-changer.
Reviewer re-measured: `hidden-proxy verify use_defensive
--base de4686d7~1` → "0 session(s) blocked (0 at baseline, 0
in working scoreboard)". Honest. Diff-body banned grep clean
(FORCEBUNGLE is the C trap flag, not a FORCE gate); Rule #2
clean.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
