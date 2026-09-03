# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-04 — D-1796 mon.c xkilled LEVEL_SPECIFIC + pool gate

**Objective:** Open `mon.c` `xkilled` LEVEL_SPECIFIC_NOCORPSE +
accessible||is_pool + artifact un-create. Not `make_corpse`.
**C:** `mon.c:3476–3740` / macro `:44` / `corpse_chance` `:3242` /
`accessible` `:2187` / `artifact_exists` un-create `:369`.
**JS was:** always `!rn2(6)` + corpse on every tile; `!mod` only
zeroed `oartifact`.
**Fix:** those C gates; `accessible` export (`SURFACE_AT`);
`artiexist` clear; corpse_chance clones; bury `m_carrying`;
murder/unicorn luck; tut-1 `deathdrops=false`. Named: flooreffects /
MAIL / wasinside / `sobj_at` boulder / quest adjalign.
**Verify:** canary 19/19; green + strict; cohort 7/7. save-oracle
skip (untagged).
**Next:** Open `monmove.c` `dochug` remaining + `wormhitu`. Not
`m_move`.
## 2026-09-04 — D-1795 mhitu.c mattacku remaining arms + getmattk

**Objective:** Open `mhitu.c` `mattacku` remaining attack-type body
`:491–952`. Not `hitmu`.
**C:** `mhitu.c` `mattacku` `:490–952`; `getmattk` `:309–444`.
**JS was:** switch without Underwater / hidden / mimic / Invis tmp /
eel vis / invulnerable / getmattk DISE·DREN·cancelled-WEAP·home-elem /
Snickersnee `hitval(youmonst)` / AT_ENGL flush+pline_mon / `bot()` /
sleep `rn2(10)`.
**Fix:** those arms; `m_monnam`; `simple_typename`/`mimic_obj_name`;
`ceiling` + `is_home_elemental` exports. Named: `hitmu`; SEDUCE=0;
ceiling `in_rooms`; uhitm `prev_result`; lock.js `simple_typename`
clone.
**Verify:** getmattk probe (PEST/DREN/ENGL/wight/mimic); green +
strict; cohort 8/8. save-oracle skip (untagged). seed4500 still
1801/1814 as at D-1792 (not this peel).
**Next:** Open `mon.c` `xkilled` LEVEL_SPECIFIC_NOCORPSE + pool gate.
Not `make_corpse`.
## 2026-09-04 — D-1794 mon.c make_corpse special-corpse table

**Objective:** Open `mon.c` `make_corpse` dragon/unicorn/worm/golem
table (19 C draws). Not mondied.
**C:** `mon.c:563–941`.
**JS was:** undead + pudding + default_1 only.
**Fix:** rest of C switch + bury/bypass/oname/Blind tail;
`free_mgivenname`; `clear_dknown` export.
**Verify:** canary 20/20; green + strict; cohort 7/7. save-oracle
skip (untagged).
**Next:** Open `mhitu.c` `mattacku` remaining attack-type arms.
Not hitmu.
## 2026-09-03 — D-1793 weapon.c dmgval bonus rnd() + erosion

**Objective:** Open `weapon.c` `dmgval` blessed/axe/silver/
`artifact_light` bonus `rnd()` + `greatest_erosion`. Not `spec_abon`.
**C:** `weapon.c:215–356`.
**JS was:** small switch + shade only; bonus draws and erosion skipped.
**Fix:** rest of C body; `is_axe` one export; `is_wooden`/`hates_light`.
**Verify:** probe (blessed/silver/axe/erosion/ball/large switch);
green + strict; cohort 7/7. save-oracle skip (untagged).
**Next:** Open `mon.c` `make_corpse` special-corpse table. Not mondied.
## 2026-09-03 — D-1792 timeout.c nh_timeout dialogues + stone_luck

**Objective:** Open `timeout.c` `nh_timeout` property dialogues +
`stone_luck` (not `make_blinded`).
**C:** `timeout.c:588–637` + stoned `:136` / slime `:388` / vomiting
`:196` / choke `:294` / sickness `:322` / levitation `:352` / phaze
`:533` + `attrib.c` `stone_luck` `:421` + `eat.c` `Popeye` `:3915`.
**JS was:** no luck timeout; no countdown plines; those TIMEOUT flats
skipped the generic `--`.
**Fix:** luck before invulnerable; dialogues before `--`;
`TIMEOUT_FLAT` includes STONED/SLIMED/VOMITING/SICK/STRANGLED/
PASSES_WALLS; `Popeye` + inlined `polyfood`.
**Verify:** green + strict; cohort 7/7. save-oracle skip (untagged).
**Next:** Open `weapon.c` `dmgval` blessed/axe/silver/`artifact_light`.
## 2026-09-03 — D-1791 eat.c newuhs hunger / faint / end_running

**Objective:** Open `eat.c` `newuhs` (not `gethungry`).
**C:** `eat.c:3362–3512` + `unfaint` `:3335–3344` + `hack.c`
`end_running` `:4129–4158`.
**JS was:** 14-line field stub; cmd.js `end_running` always zeroed
`multi`.
**Fix:** C body; `unfaint` afternmv; `gethungry`/`morehungry` async;
`end_running` in `hack.js`; cmd clone deleted. Probe 25/25.
**Verify:** green + strict; cohort 8/8 incl. seed1800/0361. save-oracle
skip (untagged).
**Next:** Open `timeout.c` `nh_timeout` property dialogues.
## 2026-09-03 — hidden-score gap ranking; Open queue re-pointed

**Objective:** user request (not a port iteration) — rank the C
functions a session we cannot see is most likely to hit, and make the
Open queue follow that order instead of map-walk order.
**Built:** `scripts/port-coverage.mjs` — indexes 4,868 pinned-C
functions and `js/**` symbols, builds the C call graph, BFSes from the
turn loop, and scores reach x call-breadth x (RNG + message loudness) x
coverage gap, amplified by **dead callees** (C callees with no symbol
and no mention anywhere in `js/`). `--md`, `--limit`, `--name` modes.
**Wrote:** `docs/PORT-GAP-TOP30.md` — the 30 rows with evidence
columns, plus honourable mentions, deliberate exclusions (polymorph /
Gehennom / wizard-wish paths), and the caveat that this is a prior, not
a measurement.
**Hand-verified false positives excluded:** `makelevel` (split into
`makelevel_ordinary`), `display_pickinv`, `mon_arrive`,
`look_at_monster`, `do_screen_description` — all ported piecewise under
other names. Every "dead callee" cited was confirmed absent with
`sym.mjs`.
**Queue:** Open replaced with rows 1–12 (newuhs, nh_timeout dialogues,
dmgval RNG bonuses, make_corpse, mattacku, xkilled, dochug,
spoteffects, test_move/domove_core, moveloop_core, xname_flags,
x_monnam). The nine displaced map rows are listed in the new doc so
nothing is lost. No `js/` change; suite untouched at 44/44.
**Next:** Open row 1 — `eat.c` `newuhs` hunger messages / faint / starve.
## 2026-09-03 — D-1790 mon_nam_too / monverbself one home

**Objective:** first Open — `do_name.c` `mon_nam_too` + `monverbself`
(named; `mhitm.js` clone). Not `pronoun_gender`. Must-fix empty.
**C locus:** `do_name.c` `:1189–1216` / `:1219–1249`; live callers
`apply.c:1126` + `:1158`, `muse.c:184`, `steed.c:429`; callee
`objnam.c` `makeplural` pronoun block `:2853–2869`.
**JS locus:** `js/do_name.js` (both exports), `js/objnam.js`
(makeplural), `js/mhitm.js` (clone deleted, 6 uses rebound),
`js/apply.js`, `js/muse.js`, `js/steed.js`.
**Change:** `monverbself` did not exist; each caller had invented a
stand-in that dropped the reflexive — "too far away to see **in the
dark**" instead of "to see itself in the dark", "<mon> zaps <wand>!"
instead of "<mon> zaps himself with <wand>!", and a hand-rolled
they/themselves table in `kick_steed`. `mon_nam_too` was an
`is_neuter`/`female` clone that never drew C's `rn2(4)`.
**The genders[3] arm is ported as C writes it, not as C's comment
reads:** makeplural("It") = "They" (genders[2].he beats .him), and
`:1240` rewrites that to genders[3].him, so a hallucinated steed reads
"Them rouse themselves!" and "They" → "Theys". Do not correct it.
**Verify:** probe **29/29** (makeplural pronouns, vtense plural test,
mon_nam_too genders, all five live caller strings, three hallucination
shapes). Green+strict incl. seed0383 hallucinate; full `sessions`
**44/44**. save-oracle `do_name.c:monverbself` untagged skip. Rule #2
clean. 116 ins / 39 del across 6 files.
**Next:** Open `apply.c` corpse gender PRONOUN_NO_IT arm `:230–248`.
## 2026-09-03 — D-1789 keepdogs walks a snapshot of fmon

**Objective:** Must-fix review **752** — `dog.c` `keepdogs` must not
`for-of` live `fmon` while `migrate_to_level` splices it. Not
`mon_leave`. Not `losedogs`.
**C locus:** `dog.c` `keepdogs` `:793–794` (`mtmp2 = mtmp->nmon`
saved before the body); departure arms `relmon(&gm.mydogs)` `:863`
and `migrate_to_level` `:906`.
**JS locus:** `js/dog.js` `keepdogs`.
**Change:** walk `[...(game.fmon || [])]` instead of aliasing the
live array, and unlink departers in place — the follower arm splices
`game.fmon` before `mydogs.unshift` (C `relmon`), the accessible arm
already splices inside `migrate_to_level`. Dropped the `stay` array
and the `game.fmon = stay` rebuild, which deleted whatever a
mid-walk splice skipped past.
**Verify:** falsifier probe `[wizard,B,C]` — HEAD `fmon=[C]` (B
vanished) vs patched `fmon=[B,C]`; parity probe `[pet,B,C]` identical
either way, which is why the fortress never saw it. green+strict per
session; cohort 7/7; full `sessions` **44/44**. save-oracle
`dog.c:keepdogs` untagged skip. Rule #2 clean. 28 ins / 17 del.
**Next:** Must-fix empty — first Open `do_name.c` `mon_nam_too` +
`monverbself`.
## 2026-09-03 — D-1788 spell.c SPE_DETECT_FOOD seffects(pseudo)

**Objective:** Must-fix review **750** — `spell.c` `SPE_DETECT_FOOD`
must call `seffects(pseudo)` (skilled bless FALLTHROUGH). Not
`food_detect` scroll. Not `look_traps`.
**C locus:** `spell.c` `spelleffects` `:1517–1531`.
**JS locus:** `js/spell.js` `spelleffects`.
**Change:** D-1781 wired the helper + `seffects` switch. `#cast`
only handed `pseudo` to `seffects` for MAGIC_MAPPING/CREATE_MONSTER.
DETECT_FOOD is now in that arm; bless when `role_skill >= P_SKILLED`.
Remaining scroll-duplicate otyps still named.
**Verify:** green+strict PASS; cohort incl. seed2200 wizard
quaff-zap-read PASS; probe 13/13 (unskilled smell, skilled
tingle+uedibility, REMOVE_CURSE still Nothing happens). save-oracle
`spell.c:spelleffects` untagged skip. Rule #2 clean. 25 ins / 6 del.
**Next:** Must-fix `dog.c` keepdogs must not `for-of` live `fmon`
while `migrate_to_level` splices it.
