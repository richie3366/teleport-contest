# Review 1403 — f57848fc — mon.c xkilled whole body + zap.c disintegrate_mon (D-2444)

- Commit: `f57848fc` — "`mon.c` xkilled whole body in C order (coverage PARTIAL → live) + `zap.c` disintegrate_mon (D-2444)."
- Files: `js/uhitm.js` (restart 242 lines), `js/zap.js` (+76),
  `js/mon.js` (+32), one-line exports in display/dogmove/explode/mhitm;
  docs + map + queue pop. Total +324/−106, 7 js files (< 1500/15).
- D-log: D-2444. Queue row popped: xkilled PARTIAL.

## Intent vs deliverable

Subject promises whole `xkilled` (`mon.c:3477–3740`) plus
`disintegrate_mon` (`zap.c:4724–4758`). Diff delivers both in C
order, verified arm-by-arm below — except one misplaced release
(item 1). `disintegrate_mon` rides along as the caller of the new
`xkilled` flags (tight caller/callee pair, acceptable density).

## Inventory

New/changed JS: `xkilled` + `xkilled_treasure_drop` restart
(`js/uhitm.js:618–898`); `oresists_disintegration` +
`disintegrate_mon` (`js/zap.js:2111–2146`); dobuzz MAGIC_COOKIE /
DEADMONSTER arms; bhitm system-shock site (`:3905`); new exports
`iter_mons`/`anger_quest_guardians` (`mon.js`), re-pointed
function→export `hero_Blind_telepat`, `is_quest_artifact`,
`completelyburns`, `mlifesaver`, `unique_corpstat`. Required
`sym.mjs` output (paste):

- `hero_Blind_telepat js/display.js:953 sync` (+1 pre-existing local
  clone `js/invent.js:4730` — predates, debt only)
- `is_quest_artifact js/dogmove.js:113 sync` BUT ALSO
  `js/quest.js:275 sync` — two exports (+3 pre-existing local clones
  incl. detect/dothrow; see debt)
- `completelyburns js/explode.js:227 sync`; `mlifesaver
  js/mhitm.js:2346 sync`; `unique_corpstat js/mon.js:2540 sync`
  (+4 pre-existing local clones incl. `js/zap.js:2780` — predates)
- `iter_mons js/mon.js:2549 ASYNC`; `anger_quest_guardians
  js/mon.js:2561 ASYNC` — call sites await ✓

## C ↔ JS fidelity

C loci via csym: `xkilled :3476–3740` (265 lines),
`disintegrate_mon :4722–4756`, `oresist macro :4738–4741`,
dobuzz arms `:4913–4931`, bhitm `:290–297`, `unstuck :3437–3467`,
`mon_leaving_level :2695–2731`, `m_detach :2733–2803`,
`monstone :3286–3373`. Walked the whole JS body against C:

- Exact: sad/conduct/kill-msg (`:3485–3513`), pit+boulder gates,
  tame `killed_by_u`, engulfer missile exclusions, vamp/disinteg
  writers + reset, lifesaved stoned-reset + "Maybe not...",
  be_sad, stoned/nocorpse→cleanup skips (incl. newsym skip ✓),
  MAIL_DAEMON (`mksobj_at(SCR_MAIL)`, MAIL_STRUCTURES always on),
  `!rn2(6)` first + G_NOCORPSE/hero-square/Kop/clone gates,
  flooreffects `nomsg?'':'fall'` + place/stack, corpse_chance +
  zombify expression + buried message, museum copy + spoteffects +
  newsym, murder arm (`hero_Blind_telepat` LIVE), peaceful
  `!rn2(2)` short-circuit, unicorn sgn, experience, all six
  adjalign arms in order + malign, `#if 0` out. RNG call-for-call
  exact (rn2 positions, short-circuits).
- `disintegrate_mon`: mlifesaver spare, canseemon gate,
  `!m_amulet → "is disintegrated!"` else `hit_msg(fltxt)` (C `hit`),
  nobj-chain strip with extract+obfree, `type<0 →
  monkilled(-AD_RBRE)` else `xkilled(NOMSG|NOCORPSE)` — exact,
  including the oresist macro (DISINT_RES/obj_resists(5,50)/quest/
  m_amulet). dobuzz + bhitm sites match `:4913–4931`/`:290–297`
  (DEADMONSTER ≡ mhp<1 ✓, fire+completelyburns NOCORPSE ✓).
- All new edges `--can` → ALREADY (uhitm→mon/display,
  zap→mhitm/explode/dogmove). Banned-pattern grep: zero hits.

EXCEPT item 1. Debts (pre-existing, not Must-fix): `is_quest_artifact`
second export (this SHA exported dogmove's local instead of importing
quest.js:275 — bodies agree, consolidate on a quest iter);
`flash_str(fltyp)` one-arg idiom file-wide (C passes FALSE; hallu-only
diff, zap-wide follow-up); leader-arm `leader_m_id!=0` guard (fires
only in a C-unreachable both-zero state — defensive, keep).

## Hallucinations / overclaim

"Two self-caused throws fixed within the iteration" — plausible,
no residue (all imports resolve). No dispatch/callee mismatch: every
callee in both ports is LIVE or a verified matched clone. The
"`mon.c:4527` iter_mons" callee cite is real (leader arm). One
misleading comment (item 1's "before the rn2(6) draw" misplaces the
mechanism — the release happens inside mondead, on all paths).

## Density

One function family + its zap caller, 7 files, +324/−106. Within
cap; whole-body claim holds except item 1.

## Verification

D-log: `verify.mjs --fn xkilled` → PASS (syntax 7 files · rule2 ·
hidden note · reach 80/80 · green · strict · cohort · full 44/44)
then `--reach-all` 125/125. My re-run on this SHA:

- `hidden-proxy.mjs verify xkilled --base f57848fc~1 --reach-all` →
  "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" + "reach xkilled: 125 baseline-PASS session(s) reach
  it (125 run): 125 PASS, 0 regressed → REACH-OK". Matches the D-log
  exactly — no vacuous-PASS trick, no REGRESSED session.
- Global `imports.mjs --rulecheck`: Rule #2 clean.

No corpus session holds-then-lifesaves or stones its holder, so the
suite cannot catch item 1 (same structural blindness as 1393/1395).

## Actionable C-wrongs

1. `xkilled` holder-release is mis-layered, mis-ordered, and
   over-broad (`js/uhitm.js:745–750`; lines predate per blame
   `08eb87984`, kept and re-certified by this restart). C releases
   via `mon_leaving_level :2702–2703` (`mtrapped=0` + `unstuck`)
   reached through `m_detach` inside `mondead` — i.e. on EVERY death
   path including lifesaved, BEFORE xkilled's lifesave check, and
   NEVER on the `monstone` path (`monstone :3286–3373` has no
   unstuck call). JS instead: (a) runs AFTER the lifesaved
   early-return (`:734–740`), so a lifesaved holder stays stuck
   where C releases it (plus C's `rnd(2)` mspec_used draw at
   `unstuck :3459–3466` is skipped — RNG order); (b) runs
   unconditionally, so the stoned path releases + draws where C
   does neither. Fix (one iter): move the two lines to right after
   `game.disintegested = false` (`:732`), gated on `!was_stoned`.
   The deeper fix (unstuck inside JS `mondead` for all callers)
   is a same-file follow-up debt, not this row. Must-fix prepended.

Verdict: **QUALITY-RISK**
