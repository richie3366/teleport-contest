# Review 625 — 88a989f0 — wizcmds.c sanity_check gold/invlet (D-1664)

## Metadata
- Full / short hash: `88a989f0ddb15c69a7e5eada2c802b00d5450311` / `88a989f0`
- Parent: `c1e99a17` (D-1663). This file audits **this SHA only** (eighth of nine `js/` commits since review **617**). Archive **Addressed:** D-1664 `88a989f0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 16:07:08 +0200
- D-id: **D-1664**
- Stats: `js/wizcmds.js` +76/−2, `js/cmd.js` +16/−3, `js/allmain.js` +7/−0, `js/invent.js` +3/−3. `js/` **102** insertions. Band **150–350**.
- Claims to close: Open wizcmds `sanity_check` gold/invlet after D-1641 / D-1655. Not `check_invent_gold` body. Not `doredraw` body.
- JS / map: `wizcmds.js` `sanity_check` / `you_sanity_check`; `allmain.js` `moveloop_core`; `cmd.js` `rhack_cmd_insane`; `invent.js` gold letter. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **602** named wizcmds `check_invent_gold("invent")`; **616** named wizcmds. `reviews/loop-2026-08-15/` has no unpaid sanity_check Must-fix.

## Intent vs deliverable

Git subject promises: `moveloop` gold/invlet runs `check_invent_gold("invent")` when `iflags.sanity_check`, instead of omitting the wizard sanity walk after D-1641.

Pinned C `sanity_check` `:1459–1481` (`node scripts/csym.mjs sanity_check`). `--callers`: `allmain.c:198`; comment `cmd.c:3742`; comment `invent.c:4887`. `you_sanity_check` `:1401–1441` (`--callers`: prototype, `:1471`, worn.c comment). `check_invent_gold` `:4887–4913` (`--callers`: iactions `:464`, doorganize `:4998`, wizcmds `:1440`). `CMD_INSANE` `func_tab.h:23` `0x1000`. `GOLD_SYM` `defsym.h:479` `'$'`.

```197:201:nethack-c/upstream/src/allmain.c
    if (iflags.sanity_check || iflags.debug_fuzzer)
        sanity_check();

    if (svc.context.resume_wish)
        makewish(); /* clears resume_wish */
```

```3745:3746:nethack-c/upstream/src/cmd.c
                if ((tlist->flags & CMD_INSANE) != 0)
                    iflags.sanity_no_check = iflags.sanity_check;
```

Old JS: no `sanity_check` export; `check_invent_gold` compared `invlet !== GOLD_SYM` (D-log: undeclared → always wrong-slot). The diff **does** the envelope (`sanity_no_check`, `in_sanity_check++`), `you_sanity_check` swallow/`m_at`/HP-Pw clamps + `check_invent_gold('invent')`, allmain gate, `rhack_cmd_insane` on bound + canned EXTCMD + hardcoded `^P`, `GOLD_SYM_ADJ`. It **does not** call `obj_sanity_check` / `timer_sanity_check` / `mon_sanity_check` / `light_sources_sanity_check` / `bc_sanity_check` / `trap_sanity_check` / `engraving_sanity_check` / `levl_sanity_check`, `check_wornmask_slots`, `dobjsfree` / `clear_bypasses` / `resume_wish`, OPTIONS=`sanity_check`, or `doredraw` body. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `sanity_check` | C `:1459–1481`, **LIVE envelope this SHA** | only `you_sanity_check` inside |
| `you_sanity_check` | C `:1401–1441`, **LIVE this SHA** | local static equivalent |
| `check_invent_gold` | C `:4887–4913`, **LIVE** | D-1641; letter fix this SHA |
| `rhack_cmd_insane` | C `:3745–3746`, **LIVE this SHA** | helper, not a C name |
| allmain gate | C `:197–198`, **LIVE this SHA** | before `context.move` |
| `m_at` | **LIVE** import | do not add clone #5 |
| `Upolyd` | C `you.h` `mtimedone != 0`, **LIVE** | |
| `impossible` / `docrt` | **LIVE** | |
| `flush_topl_more` | C `display_nhwindow(WIN_MESSAGE,TRUE)` | **CLONE** wait-More |
| `GOLD_SYM_ADJ` | C `GOLD_SYM` `'$'`, **LIVE** | value match |
| `check_wornmask_slots` | C `:1439`, **OMIT named** | |
| obj/timer/mon/light/bc/trap/engr/levl | C `:1472–1479`, **OMIT named** | |
| `dobjsfree` / bypasses / `resume_wish` | C `:192–201`, **OMIT named** | |
| OPTIONS=`sanity_check` | **OMIT named** | opt_in Off |
| `doredraw` body | C `C('r')` `:1818`, **OMIT named** | flags still CMD_INSANE in EXTCMDLIST |

`node scripts/csym.mjs sanity_check` → `:1459-1481`. `you_sanity_check` → `:1401-1441`. `--callers sanity_check`: `:198`. `--callers you_sanity_check`: `:1471`. `--callers check_invent_gold`: four src sites. `--macro CMD_INSANE` → `0x1000`. `GOLD_SYM` csym: no macro body; `defsym.h:479` `'$'`.

RNG: none in `you_sanity_check` / envelope. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
sanity_check     js/wizcmds.js:573   ASYNC — await required
you_sanity_check NOT EXPORTED — 1 LOCAL js/wizcmds.js:520
             => Do NOT write clone #2 (C static).
check_invent_gold js/invent.js:6414   ASYNC — await required
rhack_cmd_insane NOT EXPORTED — 1 LOCAL js/cmd.js:146
             => Do NOT write clone #2.
m_at             js/mon.js:1234   sync
             !! ALSO 4 LOCAL CLONE(S) — do NOT add #5
Upolyd           js/const.js:2997   sync
flush_topl_more  js/display.js:4660   ASYNC — await required
GOLD_SYM_ADJ     NOT FOUND in js/** (const, not a function)
```

`--can allmain.js wizcmds.js sanity_check`: ALREADY. `--can wizcmds.js invent.js check_invent_gold`: ALREADY. `--can wizcmds.js mon.js m_at`: ALREADY. Do **not** stamp cycle-forced clone. Do **not** add `m_at` #5. Do **not** export `you_sanity_check`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Envelope.** C: if `sanity_no_check` then clear and return; `in_sanity_check++`; `you_sanity_check`; seven more `*_sanity_check`; `--`. JS: same skip; `++`; **only** `you_sanity_check`; `--`. Remaining seven are **named omits**, not silent no-ops pretending to be C. Not “dispatch ported, callee stubbed” for the **gold/invlet** claim; it **is** that pattern if someone stamps Match C `sanity_check()` as the full list. Do not.

**allmain.** C `:192–201`: `dobjsfree`; maybe `clear_bypasses`; then `if (sanity_check \|\| debug_fuzzer) sanity_check()`; maybe `makewish`; then `if (context.move)`. JS inserts the gate immediately before `context.move`, names the three neighbors. Order vs move: **Match.** Neighbors: named.

**`you_sanity_check`.** C swallow: `impossible`, `display_nhwindow(WIN_MESSAGE,TRUE)`, `uswallow=0`, `uswldtim=0`, `docrt`. JS `flush_topl_more` for the wait-More. Then `m_at(ux,uy)`; if set and `ustuck != mtmp`, `impossible` over-monster (C: steed is not on the map; JS `m_at` skips steed — **Match**). HP: `uhp > uhpmax` clamp; `Upolyd && mh > mhmax`; `uen > uenmax`. JS `Upolyd(u)` is `mtimedone > 0` vs C `!= 0` — **Match** for live heroes. Then C `check_wornmask_slots()` — **OMIT named**. Then `check_invent_gold("invent")`. JS last line is that call. **Match the shipped arms.**

**`GOLD_SYM`.** C `:4898` `otmp->invlet != GOLD_SYM` with `GOLD_SYM` `'$'` (`defsym.h:479`). JS now `GOLD_SYM_ADJ` which is also module `'$'` (`invent.js:5693`). Same value. Module `GOLD_SYM` at `:1713` is already `'$'` — at **this** SHA the identifier was not undeclared. Switching names does not change the comparison. D-log “undeclared GOLD_SYM” describes D-1641, not a remaining C-wrong here.

**CMD_INSANE.** C copies `sanity_check` onto `sanity_no_check` when `tlist->flags & CMD_INSANE` **before** `func()`. Default table: `prevmsg` `C('p')` and `redraw` `C('r')` both `IFBURIED|GENERALCMD|CMD_INSANE` (`cmd.c:1806–1819`). JS `EXTCMDLIST` keys 16 and 18 `flags: 4105` (`0x1000|…`). Bound `rhack_dispatch_bound` already had the copy; this SHA extracts `rhack_cmd_insane` and also runs it on canned `CMDQ_EXTCMD` and hardcoded `key===16` `^P` (the if/else would skip bound). `^R` is **not** in the if/else; it falls through to bound, so `tlist.flags` already suppressed. **Match ^P and bound ^R flags.** `doredraw` **body** is still named (no JS `doredraw`).

Callee closure (you-path gold/invlet). LIVE: `check_invent_gold`, `m_at`, `Upolyd`, `impossible`, `docrt`. CLONE: `flush_topl_more`. OMIT named: `check_wornmask_slots`, seven sibling `*_sanity_check`, OPTIONS, `dobjsfree`. STUB: **none** in the gold/invlet arm. Combined-arm ships. Do not add `m_at` #5.

## Hallucinations / overclaim

Subject “moveloop gold/invlet runs `check_invent_gold("invent")` when `iflags.sanity_check`”: **true** for the you-path. D-log “live dispatcher”: **false** as a full `sanity_check()` — seven callees are not called. Comment “^P/^R CMD_INSANE”: **true** for flags; **false** that this SHA ports `doredraw`. D-log “GOLD_SYM undeclared”: **stale** at this SHA (`GOLD_SYM` already `'$'`). Do **not** stamp “Match C `obj_sanity_check` / `mon_sanity_check` / ….” Do **not** stamp “Match C `check_wornmask_slots`.” Do **not** stamp “Match C OPTIONS=`sanity_check`.” Do **not** stamp “Match C `doredraw`.” Do **not** stamp “Match C `dobjsfree`.” Default opt_in Off: public traces do not set the flag — **public-unhit** except the `'$'` compare also used by #adjust / itemactions.

## Density

+102: envelope + you-path + allmain + CMD_INSANE helper + letter. §2b one gold/invlet family. Did not glue worn slots or obj-sanity. Above a one-`if` peel.

## Verification

Wired: allmain gate; you-path gold/invlet; `^P` / bound / canned `sanity_no_check`; `'$'` slot. Unwired C: seven `*_sanity_check`; `check_wornmask_slots`; OPTIONS; `doredraw` body; `dobjsfree`. Conf: no `rn2`. No seed gate. Journal: private canary (opt-off skip; `$` silent; `'a'` wrong slot; two stacks; `sanity_no_check`) + green+strict seed8000/0900 + cohort **7**/7. Fortress 44/44 does not prove `iflags.sanity_check` On.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `check_wornmask_slots` (`wizcmds.c:1439` / worn.c); `obj_sanity_check` and the six siblings (`:1472–1479`); OPTIONS=`sanity_check`; `doredraw` body; `dobjsfree` / `clear_bypasses` / `resume_wish`. Do **not** add `m_at` #5. Do **not** add `you_sanity_check` export/`#2`. Do **not** re-port `check_invent_gold` (D-1641). Do not call the seven omitted `*_sanity_check` as empty functions and stamp Match C.

Verdict: **ACCEPT-WITH-DEBT**
