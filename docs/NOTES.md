# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0030 seg9 @8138 — **D-0263** — C `rnd(862) @ rnd_class`
  after `drinkfountain` vs JS `rn2(3)` (after D-0262 shop-mimic fix).
- **Hypothesis:** fountain drink `fate` arm creates a gem/`rnd_class` object
  that JS skips or short-circuits into dryup/`rn2(3)`.
- **Falsifier:** compare C vs JS `drinkfountain` at first seg9 mismatch @8138
  (after `rnd(30)=27`); port missing fate branch or `rnd_class` caller.
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Parked seed2200 @158:** RC config path — harness `$HOME`, not a port bug.

## Don’t re-check

- Do not reject the dart in `can_carry`; an earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as a carry rejection; C does not.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` must be monster-table IDs (`PM_ROGUE=338`), never roles[] index.
- **roles[] order must match C** (Rogue before Ranger) — pantheon
  `randrole` uses roles[] indices.
- **roles `name.f` is null where C has 0** — only Caveman/Priestess keep
  distinct `f`. Welcome gender uses `!name.f` **and** both-genders
  allow mask (D-0138). Do not restore same-string `f===m` proxy.
- Do not hardcode Tourist `Aloha` / `neutral` / `HP:10` in `allmain`.
- Do not auto-submit unique `#` extcmds without Enter — regresses
  `#levelchange` (seed0361).
- Binding `'f'`→`dofire` **without** fireassist swap when bow is only in
  `uswapwep` makes `l` a real shot; C eats `l` in swap `prinv` `--More--`
  (D-0069).
- **Ctrl-rush is `context.run=3`**, capital run is `run=1` (C
  `do_rush_*` / `do_run_*`). `run=1` does **not** stop for hostiles
  beside/behind — only in-front (D-0261). Do not “fix” more() for that peel.
- **Unawaited `pline` in muse `mbhitm`/`mzapwand` races `more()`** and
  steals early keys (wand hit during combat) — always `await pline` on
  that path (D-0261). DIAG that `await import`s inside `more()` also
  perturbs async order — do not diagnose with await-in-more hooks.
- **seg8 @3068 fleeck / mfndpos squeeze** falsified — was key desync from
  run=1 + unawaited wand more (D-0261).
- **seg8 @3310 missing katana** was not missing `dodrop` alone —
  `dodrop` ported earlier; live blocker was rush never ending so `d`
  never reached rhack (D-0261).
- **seg9 @7196 was not stock_room/`mkshobj_at` eligibility** — C
  `set_mimic_sym` shop arm calls `get_shop_item` after `rn2(10)` (D-0262).
  JS had deferred that body to S_MIMIC_DEF.
- Do not treat session `\r` as plain `j` — ICRNL → `\n` = `C('j')` rush
  (D-0259). `rushDirFromCtrl` keys 1..26 only.

## Landmarks

- STAIRS glyph: `known_branch_stairs(stairway_at)` → CLR_YELLOW;
  else CLR_GRAY (tty NO_COLOR); direction from `ladder & LA_DOWN`
  (D-0162). Dlvl1 upstairs is traversed branch.
- **`goto_level` descend:** `stairway_find_from(&u.uz0, at_ladder)` then
  mark `u_traversed`; not bare `u_on_upstairs`/`find_dir` (D-0224).
- **tty map coords:** screen col = map_x − 1; screen row = map_y + 1
  (message row 0). Never treat session screen (65,3) as map (65,3).
  DEC sessions: expand CSI `\x1b[NC`; strip `\x1b[…m`; track **SO/SI**
  (`\x0e`/`\x0f`) — in G1, `jklmqx` are line-drawing not monsters
  (D-0253).
- **Session step key:** `steps[i].key === moves[i-1]` (RNG/screen after
  that key); `moves[i]` is the key about to be read at capture (D-0238).
- **ICRNL:** session moves may store `\r`; C under tmux reads `\n`.
  JS `runSegment` must translate `\r`→`\n` like `record-session.mjs`
  (D-0259). `\n` = rush south via `C('j')` → **`context.run=3`** (D-0261).
- **`armoroff` delay:** `nomul(-oc_delay)` + `afternmv=*_off` +
  `nomovemsg="You finish taking off your %s."` (suit → `"mail"`);
  delay-0 still immediate `*_off`+`off_msg` (D-0259).
- **`newmonhp` level-0:** `basehp=1`; `rnd(4)`; if `mhpmax==basehp`
  boost +1 (min HP 2). Same boost when `d(m_lev,8)==m_lev` (D-0260).
- **`more()` dismiss:** only space/CR/ESC; other keys bell+continue
  (topl.c `xwaitforspace`). Mid-movemon more can consume later command
  letters from the queue — but first check unawaited pline / wrong
  `context.run` before blaming more alone (D-0261).
- **Shop mimic appearance:** after `rn2(10) >= depth(&u.uz)` fails,
  `set_mimic_sym` calls `get_shop_item(rt-SHOPBASE)` then may `mkobj`
  for appearance (D-0262). Use `depth()`, not bare `dlevel`.
- **`F`/`do_fight`:** PREFIXCMD sets `forcefight`; next move dir attacks
  (empty → `domove_fight_empty` “thin air” / solid); no turn on F alone
  (D-0225).
- Key attribution ≠ RNG order: 0-RNG `--More--` / safety-reject keys can
  sit between matched EOT RNG and the next gameplay command (D-0228).
