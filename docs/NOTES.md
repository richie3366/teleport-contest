# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-42 gap — await cron; D-0483 serialize revert.
- **Primary (D-0928):** seed4500 @**1252** — map glyph DEC room vs
  Primary (`"~~~~` / `s` vs `│····s····│`). Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`
  Falsify: C glyph/memory at cited cell vs JS `newsym`/`map_location`.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not “fix” gethungry / clear invuln to hide early `#pray` (#1095).
- Do not FORCE `ualign.abuse=2` — missing path was `check_caitiff` (#1100).
- Do not treat @103155 getlev/`^V` as root; no inediate FOOD reject (#1113).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not invent create_particular appear pline from mtmp.mx/my —
  C appear is makemon !MM_NOMSG; next2u uses **requested** (x,y)
  (wizgenesis u.ux,u.uy → always “next to you”) (#1164).
- Do not treat @1092 `[30]` as menu pad/Sprintf — prior `#wizintrinsic`
  set INVULNERABLE TIMEOUT; C generic `nh_timeout` `--` cleared it
  (#1168); menu format already matched C.
- Do not treat @1098 `_` color 6 as altar — `CLR_CYAN` iron **chain**
  (Punished); was missing Blind `feel_location` (#1169).
- Do not treat @1151 Blind `[23]` as cream-only — was
  `incr_prop_timeout` from stale uprops + missing `u.uinvulnerable`
  nh_timeout freeze (#1171).

## Landmarks (≤15)

- suite **42/44** @#1170 Scr **11111**/11405 RNG **792838**/792838
  (**100%**); speed `30+0.25/turn`; next cadence @**#1175**.
- **D-0928 #1171:** wiz Blind `make_blinded` + `u.uinvulnerable`
  nh_timeout freeze; prefix **@1151→@1252**; Scr **1521→1525**.
- **D-0928 #1169:** Blind `feel_location` + newsym u_at; maps chain;
  prefix **@1098→@1151**; Scr **1419→1521**.
- **D-0928 #1168:** `nh_timeout` generic remaining uprops TIMEOUT `--`;
  prefix **@1092→@1098**; Scr **1417→1419**.
- **D-0928 #1167:** `flags.pushweapon` → `setuswapwep(oldwep)` in
  `dowield`/`wield_tool`; prefix **@1053→@1092**; Scr **1413→1417**.
- **D-0928 #1166:** unmap_object `map_background` + fight_empty
  always-unmap; prefix **@1048→@1053**; Scr **1434→1413**.
- **D-0928 #1165:** score cadence Scr **11024**; @1048 diagnosed.
- **D-0928 #1164:** drop invent create_particular appear; add
  `makemon_appear_msg` (req x,y next2u + MM_NOEXCLAM); Scr
  **1433→1434**; prefix **@1034→@1048**.
- **D-0928 #1163:** `waterbody_name` Medusa/juiblex/samurai/ICE/
  waterlevel; Scr **1431→1433**; @1001 OK; next @1034 wizgenesis.
- **D-0928 #1162:** zap_over_floor hissing-gas Norep + hit The;
  Scr **1427→1431**; @997–@1000 OK; next @1001 shallow sea vs moat.
- **D-0928 #1161:** wakeup `wake_msg` + growl; Scr **1423→1427**;
  @985–@996 OK; next @997 hissing gas vs fire order.
- **D-0928 #1160:** savelev/getlev `lastseentyp`; Scr **1412→1423**;
  @941 OK; next @985 nymph disarm vs wake.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**; seed4500 Scr **1389** held; four near-misses PASS.
