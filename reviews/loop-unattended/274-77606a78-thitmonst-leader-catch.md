# Review 274 — 77606a78 — dothrow.c thitmonst leader catch / finish_quest (D-1312)

## Metadata
- Full / short hash: `77606a78a3f9a880ef5378b9451bebd594e854d9` / `77606a78`
- Parent: `3633eb61` (D-1311). This file audits **this SHA only**. Archive row **Addressed:** D-1312 `77606a78` already has the short hash (filled by D-1313).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 22:20:24 +0200
- D-id: **D-1312**
- Stats: 11 files, +248 / −44 — `js/dothrow.js` +87 / −~20; `js/quest.js` +88 / −~4; `js/questpgr.js` +5.
- Claims to close: Open `dothrow.c` thitmonst leader catch / `finish_quest` (named from D-1311 / review **265**). Not vanish pline. `reviews/loop-2026-08-15/` has no unpaid leader-catch Must-fix.
- JS / map: `dothrow.js` `thitmonst`; `quest.js` `finish_quest`; `questpgr.js` `quest_complete_no_bell`; `c-js-map/turns.md`. offeredit / hasamulet bodies / chat got_thanks named.
- Prior reviews this SHA claims to close: **265** named the leader `!next2u` `sho_obj_return_to_u` caller; **273** named leader catch after tether.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c thitmonst so the quest leader catches a thrown quest artifact (or unique/fake Amulet) and finish_quest or keeps it, instead of letting the missile land.”

C `thitmonst` (`dothrow.c:2104–2149`) after unicorn gems, **before** `rnd(20)`: `hmode != HMON_APPLIED && special_obj_hits_leader` then clear sleep/WAITMASK. If `mcanmove`: `Some_Monnam` catches; keep if `(u.uevent.invoked && oc_unique && otyp != AMULET_OF_YENDOR) || !mpeaceful` (`fully_identify` + two `verbalize` when peaceful `!Deaf`, shop `check_shop_obj`, `mpickobj`); else `finish_quest` + hands/tosses + `!next2u` FLASH-walk + `addinv` + `encumber_msg`; return 1. `!mcanmove` return 0 (missile still lands). Predicate `special_obj_hits_leader` already D-1044. Callee `finish_quest` (`quest.c:226–279`): non-questarti Deaf return; ID then hasamulet / fake AoY verbalize / “Ah, I see”; else has-amulet pager or offeredit/offeredit2 + missing Bell `com_pager("quest_complete_no_bell")`; `got_thanks`; if `obj` then `qcompleted` + ID.

Old JS: sleep/WAITMASK then `return false` so the dart still placed.

The diff **does** the catch arm and `finish_quest` plus `quest_complete_no_bell`. It does **not** port offeredit/hasamulet/offeredit2 `qt_pager` bodies (`qt_pager` still has no those msgids → no-op deliver), chat_with_leader got_thanks/questart, or vanish pline. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `thitmonst` catch arm | C `:2104–2149`, **wired** | before `dieroll = rnd(20)` |
| `special_obj_hits_leader` | C macro `:1969–1972`, **pre-existing** | D-1044 |
| `Some_Monnam` | C `do_name.c:1091–1098`, **clone** | `canspotmon` → `Monnam`; else Someone/Something; AUGMENT_IT named |
| `Deaf_youprop` | C `youprop.h:125`, **clone** | uprops[DEAF] only; HDeaf path weaker than C |
| `s_suffix_throw_gold` | C `hacklib.c` `s_suffix`, **pre-existing clone** | reused; not a throw-gold-only fake |
| `finish_quest` | C `:226–279`, **new C callee** | offeredit bodies named |
| `carrying` | C `invent.c`, **clone** | first matching `otyp` in invent |
| `is_quest_artifact` (quest.js) | C `questpgr.c`, **clone** | `oartifact == urole.questarti` |
| `com_pager("quest_complete_no_bell")` | C `:267–268`, **wired** | text live in QUEST_COMMON |
| `qt_pager("hasamulet"/"offeredit*")` | C `:241/:264`, **named omit** | msgid not in `qt_pager` chain |
| `mpickobj` / `addinv` / `sho_obj_return_to_u` / `encumber_msg` / `fully_identify_obj` / `verbalize` / `align_gname` / `monnear` | C callees, **imported live** | dynamic import cycles |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG** in the catch arm (`rnd(20)` still skipped). `finish_quest` `qt_pager` still burns nhl shuffle when those msgids someday exist; today they no-op.

## C ↔ JS fidelity

Pinned C (`dothrow.c:2104–2148`):

```
    if (hmode != HMON_APPLIED && special_obj_hits_leader(obj, mon)) {
        mon->msleeping = 0;
        mon->mstrategy &= ~STRAT_WAITMASK;
        if (mon->mcanmove) {
            pline("%s catches %s.", Some_Monnam(mon), the(xname(obj)));
            if ((u.uevent.invoked && objects[obj->otyp].oc_unique
                 && obj->otyp != AMULET_OF_YENDOR)
                || !mon->mpeaceful) {
                …
                (void) mpickobj(mon, obj);
            } else {
                boolean next2u = monnear(mon, u.ux, u.uy);
                finish_quest(obj);
                pline("%s %s %s back to you.", Some_Monnam(mon),
                      (next2u ? "hands" : "tosses"), the(xname(obj)));
                if (!next2u)
                    sho_obj_return_to_u(obj);
                obj = addinv(obj);
                encumber_msg();
            }
            return 1;
        }
        return 0;
    }
```

JS copies that keep-vs-return split, `HMON_APPLIED` skip, `mcanmove` gate, shop `*ushops || unpaid` → `check_shop_obj`, and `align_gname(..., ualignbase.original)`. Visible leader: `canspotmon` → `Monnam` ≡ C `Some_Monnam` → `highc(some_mon_nam)` on a spotted unique. AUGMENT_IT for unseen is named on the helper, not this path’s usual leader.

`finish_quest` non-arti arm: Deaf return, ID, AoY pager / fake verbalize / “Ah, I see” match `:231–248`. Questarti arm: `uhave.amulet` vs offeredit, Bell `com_pager`, `got_thanks`, `qcompleted`. **hasamulet/offeredit texts are still empty** — `qt_pager` never selects those msgids. D-log names that. This is **not** “Match C offeredit speech.” It **is** Match C catch-before-dieroll plus the keep/`finish_quest`/hand-back control flow.

`Deaf_youprop` / quest.js `Deaf()` read `uprops[DEAF]` only. C `Deaf` is `HDeaf || EDeaf || uroleplay.deaf` (`youprop.h:125`). Timed deaf lives on `u.HDeaf` (`timeout.js` / `make_deaf`). A deaf hero tossing the Bell can still hear the keep/finish lines. Clone gap, not the promised catch-vs-land.

## Hallucinations / overclaim

Subject + D-1312 say the leader catches and either keeps or `finish_quest`s instead of letting the missile land. **The catch arm plus `finish_quest` control flow are the hunk.** Stamping **Addressed:** D-1312 is fair. Do **not** stamp “Match C offeredit/hasamulet pager bodies.” Do **not** stamp “Match C `chat_with_leader` got_thanks.” Do **not** stamp “Match C `some_mon_nam` AUGMENT_IT.” Do **not** stamp “Match C `Deaf` via HDeaf.”

## Density

One `thitmonst` arm plus its C callee `finish_quest`. ~120 executable JS lines. Vanish pline / gem_accept correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Peaceful leader, questarti, `mcanmove`: catch, `finish_quest`, hands if `monnear` else tosses+FLASH, addinv, return true. Match `:2133–2147`.
2. `!mcanmove`: WAITMASK clear, return false, `rnd(20)` still happens. Match `:2149`.
3. Angry or invoked unique ≠ AoY: `mpickobj`, no `qcompleted`. Match `:2114–2132`.
4. Fake unknown AoY: `special_obj_hits_leader` true; finish arm IDs and verbalizes imitation; no `qcompleted`. Match `:243–244`.
5. `HMON_APPLIED` pole: skip catch. Match `:2104`.
6. Ordinary dart: fall through to `rnd(20)`. Match.
7. Missing Bell on completion: `com_pager("quest_complete_no_bell")`. Match `:267–268`.
8. offeredit/hasamulet `qt_pager`: no-op. Named.
9. **Public-unhit** unless a session throws at the quest leader.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./u_init.js')` / `shk.js` are ESM cycles, not filesystem. Plain ESM.

## Verification

Journal: private canary **16**/16; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws at the leader. Cadence this audit: full `sessions` at HEAD `a1d48196` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Catch-before-dieroll, keep vs `finish_quest`+hand-back, `mpickobj` / `addinv` / `sho_obj_return_to_u`, and Bell `com_pager` match C `:2104–2149` / `:226–279`. `finish_quest` is not a stub; the pager **bodies** are named omits.

Named omits / clone debt (map, not Must-fix):

1. `qt_pager` hasamulet / offeredit / offeredit2 texts
2. `chat_with_leader` got_thanks / questart
3. `Some_Monnam` AUGMENT_IT / `x_monnam` unseen
4. `Deaf` clone should use `HDeaf\|\|EDeaf\|\|uroleplay.deaf`, not uprops-only (keep/finish verbalize skip)

Do not Must-fix “`s_suffix_throw_gold` name.” Do not Must-fix `You()` vs `pline`. Do not Must-fix vanish pline. Next Open after this SHA was throwit_mon_hit snuff (now D-1313).

## Callers / RNG ledger

C: throw / kick → `thitmonst`. JS: same. Public fortress is not evidence a leader catch fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: the leader now catches a thrown questarti/unique/fake AoY and keeps or `finish_quest`s it; offeredit pager bodies stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1312 `77606a78` already filled by the next port commit.
