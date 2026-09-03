# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **D-1796** shipped `xkilled` LEVEL_SPECIFIC_NOCORPSE +
  accessible||is_pool + artifact un-create. Must-fix empty — pop first
  Open (`dochug` + `wormhitu`). Do not invent a seed4500 FAIL peel
  (D-1792 leftover). Hidden-score Open: `PORT-GAP-TOP30.md`.
- **Luck still runs when invulnerable.** Dialogues do not
  (`timeout.c:623` return). STONED/SLIMED expiry stays silent
  (`done_timeout` omitted).
- **`sit.js` lay-egg `morehungry` still not awaited.** `losedogs`
  still rebuilds `migrating_mons`. `strict-output-check.mjs` leaks
  across sessions — run per file. DUMPLOG retired (D-1776).
- Clone drift: `zap.js` useupf; detect/potion/read/spell `useup`;
  `qst_guardians_respond`; Elbereth; teleport.js `accessible`.

## Don't re-check (≤15)

- Do not re-port `xkilled` LEVEL_SPECIFIC / pool gate / artifact
  un-create / bury `m_carrying` / murder luck-2 / unicorn luck-5
  (D-1796). No second `accessible` export (teleport clone stays).
  Floor-boulder `sobj_at` nocorpse / MAIL / wasinside `spoteffects`
  / Blind_telepat `see_monsters` / quest adjalign still named.
- Do not re-port `mattacku` Underwater/undetected/mimic/Invis/eel/
  invulnerable/DISE/DREN/cancelled-WEAP/home-elem/Snickersnee/`bot()`/
  sleep `rn2(10)` (D-1795). No second `m_monnam` / `simple_typename`
  (`lock.js` clone stays) / `ceiling` / `is_home_elemental`. Do not
  glue `hitmu`. Do not omit `flush_screen(1)` for seed4500: that
  13-cell `#wizintrinsic` DEAF `[2]` is D-1792 (RNG full).
- Do not re-port `make_corpse` special table (D-1794) / `dmgval`
  bonus `rnd()` (D-1793) / `nh_timeout` dialogues+luck (D-1792) /
  `newuhs` (D-1791) / `monverbself` genders[3] (D-1790). No second
  `free_mgivenname` / `clear_dknown` / `is_axe` / `carrying` /
  `end_running`.
- Reviews **728–736** AWD held; **747**=D-1786 `uball`; **748**=D-1787;
  **750**=D-1788; **752**=D-1789 — no `stay` rebuild. No `u.Punished`.
  No `rn2(20)` on ordinary pit farlook. No rubber-stamp fortress.
- Do not re-check 40/44 at D-1765/66; seed0014 was I-glyph `newsym`
  (D-1774). findone tail is D-1775.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse D-1582.
  ParanoidTrap portal yn / `domagicportal` / `undestroyable_trap`
  / `mktrap` dst / `goto_level` uz0 are D-1187/1188.
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1796.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask`
  (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) /
  omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()`
  (D-1066). Do not skip D-1067…D-1796.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / re-port `eyecount` / delete emin / stub
  `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static
  `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. No trailing
  `confdir` in shared `getdir`. Do not re-port D-1682…D-1796.

## Landmarks (≤15)

- D-1796: `xkilled` LEVEL_SPECIFIC + pool gate + artifact un-create.
  Named: flooreffects; `sobj_at` boulder; MAIL; wasinside; quest align.
- D-1795: `mattacku` remaining + `getmattk` DISE/DREN/WEAP/home-elem.
  Named: `hitmu`; SEDUCE=0; uhitm `prev_result`; lock.js clone.
- D-1794: `make_corpse` special table + bury/bypass/oname/Blind tail.
- D-1793: `dmgval` vs-mon bonus `rnd()` + erosion; `is_axe` export.
- D-1792: `nh_timeout` dialogues + `stone_luck`; luck while invuln.
- D-1791: `newuhs` / faint / `end_running`; sit.js egg still unawaited.
- D-1790: `mon_nam_too`/`monverbself`; hallu steed “Them” as C writes.
- D-1789: `keepdogs` `[...fmon]`; named `relmon` / async `unstuck`.
- D-1788: `#cast` SPE_DETECT_FOOD `seffects`; remaining otyps named.
- D-1787: lookat tnum `glyph_to_trap(glyph_at)`; helpers D-1779.
- D-1786: ballfall callers `u.uball`; helper is D-1778.
- D-1774: `newsym` I-arm `lev->glyph`; fight_empty `glyph_at`.
- D-1773: `gold_detect`; `o_in`/`o_material`/`clear_stale_map`.
- D-1772: `peacefuls_respond`; named `qst_guardians_respond`.
- D-1771: invent.c `useupf`; eat.c `carried()?useup:useupf`.
