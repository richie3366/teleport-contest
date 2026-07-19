# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#900 / D-0786:** seed0360 peel **108369→109077**. Misread as
  `set_apparxy` rn2(4) vs rn2(2); JS site was `kick_ouch`→`exercise`
  after C refused next kick. Cause: missing `Wounded_legs` gate.
- **Falsifier:** after Ouch sets wounded, next `^D` must pline
  "right leg is in no shape for kicking.--More--" (no getdir/kick RNG).
- **Next @109077:** C `exercise` `rn2(19)` vs JS `rn2(4)` (key `^F`).
- **D-0731:** unicorn @58,12 cnt=7; WEB@58,13; FORCE WEB-know →cnt=6
  still need one more omit. Pair ID exhausted.
- **D-0708:** seed0014 prefix still **50419** after D-0786; open mfndpos.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0786 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only —
  same string can hide different call sites (D-0769…D-0786).
- seed5002 **PASS** (write/cmdassist/itemed throw — D-0742).
- D-0743…D-0772 seed0360 peels (…/wizard2/hell_tweaks `.w.`).
- D-0770: flyers ignore floor_trigger traps; mfndpos avoids only
  `S_poisoncloud` (damage>0), not fog/steam `S_cloud`.
- D-0771: wizard2 = shuffle→walkfrom (not hellfill hellno before mazewalk).
- D-0772: nhlib `[[.w.]]` ≠ `'[.w.]'`; bigrm-3 brackets intentional.
- D-0774: map_cleanup before wallify/flip; does **not** strip ROOM LOS
  boulder @98492. Wiz-strt cleanup (#886).
- **#889:** Wiz-strt map throne must be `\\` in template (not `\.`).
- **#896–#900:** siege peels — portal FlipY, wear makeknown, travel
  seenv||couldsee, kick wounded-legs + dokick Wounded_legs gate.
- LAVAPOOL is not `blocking_terrain` / not `does_block` (only LAVAWALL).
- `assigninvlet` **preserves** free a-z/A-Z; don’t “always next lastinvnr”.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44** @#900;
  seed0360 **109077**/109603/**391** after D-0786).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @50419 mfndpos (D-0708 open).
- S_KOP / minetn-1/3/4/6/7 / **medusa-2/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred; region binary save format deferred;
  **Wiz-loca/goal/fila/filb**; hellfill/fakewiz deferred;
  minend-3 / soko2-2 / other bigrm-N deferred;
  `LVLINIT_ROGUE` sp_lev deferred;
  `pick_nasty` GEHENNOM dnum deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup uses handling=2.
- **wizard2** (D-0771); **wizard1** (D-0768); **orcus** (D-0767);
  **baalz** (D-0766); **juiblex + lvlfill_swamp** (D-0765);
  **hell_tweaks** (D-0764/D-0772 `.w.`); **asmodeus + hell helpers** (D-0763);
  **makeroguerooms + rogue skip0** (D-0762);
  **makemon mlet before G_SGROUP** (D-0761);
  **bigrm-4 L-replace+fountains** (D-0760);
  **medusa-3 + mk_artifact A_NONE** (D-0759);
  **minliquid** (D-0775); **Wiz-strt** (D-0776/D-0782 branch FlipY);
  **maketrap AIR** (D-0777); **Tengu m_move teleport** (D-0778);
  **getdir lock SELF** (D-0780); **getpos seenv stairs** (D-0779);
  **mon_offmap dochug/postmov** (D-0781); **MAGIC_PORTAL migrate** (D-0782);
  **Gloves POWER + Cloak DISPLACEMENT** (D-0783);
  **dotravel seenv||couldsee** (D-0784);
  **kick set_wounded_legs** (D-0785);
  **dokick Wounded_legs legs_in_no_shape** (D-0786).
  Wiz-strt FlipY flp=1; throne `\\`; travel `_`/`>`/`\\n`→(8,8).
