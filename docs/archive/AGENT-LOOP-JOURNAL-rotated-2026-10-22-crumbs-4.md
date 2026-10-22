# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-22 — D-4224 vault.c invault asks the guard's question with getlin in a `do { … } while (!buf[0] && --trycount > 0)` loop (`:501–505`). tty getlin returns "\033" when the player presses ESC, which is non-empty, so the loop ends and the guard goes on («"I don't know you."» …). JS turned the ESC into an empty answer (`if (buf === '\x1b') buf = ''`) and asked «"Hello stranger, who are you?" -» again, up to five times, so every vault escort answered with ESC desynced at the question

**C locus:** vault.c invault `:380–620`, getlin loop `:499–505`; tty getlin ESC → "\033" (getline.c hooked_tty_getlin).
**JS:** js/vault.js invault `:631–`, getlin loop `:780–790`.
**Change:** the line is removed; the loop is C's: mungspaces, then `!buf && --trycount > 0`.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-vault-Priest-53456019.session.json` → PASS (RNG 50144/50144, Screen 423/423).
**Named:** none in invault. The 1 unchanged session (scen-vault-Tourist-53456001 step 387) is another writer: C ends the counted search («You stop searching.») before invault's «Suddenly one of the Vault's guards enters!», and JS prints them in the opposite order.
**Next:** the cliffs head (m_move / newsym / impossible / gd_letknow from the vault family).

## 2026-10-22 — Grow #26 @3b74ec586: fresh 53450000 ×160 160/160 (100.0 %) on arrival; calibration family `vault`

**Fresh:** RNG 100.0 %, screens 100.0 %, every family 100 %; nothing folded. Gap to held-out 20.5 pts > 20: added wave-3 `vault` (public seed0012 vault escort): probe 8/20 (40 %), +80 @53456000 35/80. 57 failing folded under 6 owners (invault 35, m_move 12, newsym 4, gd_letknow 3, impossible 2, domonnoise 1); 42 to reserve. Board 716/773.
**Next:** the cliffs head (invault).

## 2026-10-22 — D-4223 dothrow.c hero_breaks decides whether the hero sees a breakage from youprop.h Blind ≡ (HBlinded || EBlinded) && !BBlinded (`:2424`). js/dothrow.js gated its sight checks on a local Blind() clone that read the phantom fields u.Blind / u.ublind, so a blindfolded, levitating hero whose wished-for potion slipped to the floor read «A potion shatters!» where C prints «You hear something shatter!». Clearing the mirror family in the same file also fixes throw_obj's multishot gate (phantom u.Confusion / u.Stunned / game.Fumbling, on an RNG path) and folds three divergent Deaf copies into one C-exact Deaf

**C locus:** dothrow.c hero_breaks `:2417–2436` (in_view `:2424`), breaks `:2444–2455`, breakmsg `:2612–2650`; throw_obj multishot `:158–176` (`!(Confusion || Stunned)`, `Fumbling`); youprop.h Blind `:103`, Confusion `:84`, Stunned `:81`, Fumbling `:129`, Deaf `:125`.
**JS:** js/dothrow.js imports `:56`, `:71`; throw_obj `:1094–1099`; Deaf `:1197–1201`; throw_impaired `:1783–1790`; hero_breaks `:1503–1517` (body unchanged).
**Change:** the Blind clone is deleted and dothrow.js imports the live invent.js Blind (an existing import edge). throw_obj gates on HConfusion / HStun and the live attrib.js Fumbling(). throw_impaired drops the phantoms. Deaf is C's `HDeaf || EDeaf || uroleplay.deaf`, used by thitmonst `:649`, boomhit «Klonk!» `:2160` and throwit `:2510`. Deaf_youprop / Deaf_boom and the now-unused DEAF import are removed.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-sweep-Rogue-53250089.session.json` → PASS (RNG 29057/29057, Screen 1373/1373).
**Named:** none in dothrow.js. The other 25 Blind clones and 13 Deaf clones in other files are not touched (sym.mjs lists them).
**Next:** cliffs empty after Grow #25's three folds (D-4221..D-4223); the next slot is a grow.

## 2026-10-22 — D-4222 polyself.c poly_gender returns 2 (no gender) while the hero is polymorphed into a neuter or non-humanoid form (`:2149–2157`), and apply.c beautiful picks «handsome»/«amiable» for anything but 1 (`:1003–1011`). JS beautiful called a local poly_gender clone that returned flags.female only, so a polymorphed female hero refusing to rename herself (#name on her own square) read «This beautiful creature is called wizard…» where C says «This handsome creature…». Three more clones (detect.js, dokick.js, sounds.js) had the same gap, sounds.js's on an RNG path

**C locus:** polyself.c poly_gender `:2149–2157`; apply.c beautiful `:997–1013`; do_name.c do_mgivenname `:222–223`. Other poly_gender callers whose JS used clones: detect.c (the «babe»/«dude» crystal-ball line), dokick.c (gend), sounds.c (domonnoise seduction swval, rn2(3)).
**JS:** js/apply.js beautiful `:670–680`, import `:142`; js/detect.js import `:79` (use `:2710`); js/dokick.js import `:136` (use `:738`); js/sounds.js import `:50` (uses `:1685–1687`).
**Change:** the four clones are deleted, and each file imports the live polyself.js poly_gender (all four already import polyself.js). beautiful itself was already C-shaped.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-extcmd-Healer-53250042.session.json` → PASS (RNG 12921/12921, Screen 1113/1113).
**Named:** none.
**Next:** the cliffs head (hornoplenty).

## 2026-10-22 — D-4221 zap.c dobuzz's Rider arm (the `buzzmonst:` label, a closure in JS dobuzz), when a death ray from a breath disintegrates a Rider, prints «%s body reintegrates before your %s!» with body_part(EYE) (`:4887–4897`). JS used `EYE` without importing it from const.js, so the first Rider hit by a breathed death ray threw `ReferenceError: EYE is not defined` and voided the rest of the session

**C locus:** zap.c dobuzz `:4780–5037`, Rider / ZT_BREATH(ZT_DEATH) arm `:4887–4899` (body_part(EYE) `:4895–4896`); you.h/const EYE.
**JS:** js/zap.js import `:389`.
**Change:** `EYE` added to zap.js's const.js import (const.js `:582`, same edge). The arm is otherwise C-shaped.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-worldtour-Wizard-53250033.session.json` → PASS (RNG 25253/25253, Screen 246/246).
**Named:** none. D-4220's Verify gains its sweep line here (run after its commit: 713 re-run, 0 regressed).
**Next:** the cliffs head (do_mgivenname / hornoplenty).

## 2026-10-22 — Grow #25 @fbbb271b4: fresh 53250000 ×160 157/160 (98.1 %) on arrival

**Fresh:** RNG 99.4 %, screens 99.7 %; extcmd 7/8, sweep 8/9, worldtour 8/9, every other family 100 %. Gap to held-out 18.6 pts: no calibration family.
**Folded:** scen-worldtour-Wizard-53250033 (JS throw `EYE is not defined` zap.js buzzmonst → Must-fix), scen-sweep-Rogue-53250089 (hornoplenty «You hear something shatter!» s900), scen-extcmd-Healer-53250042 (do_mgivenname «handsome» vs «beautiful» s1103). Board 713/716.
**Next:** the Must-fix (buzzmonst EYE import).
