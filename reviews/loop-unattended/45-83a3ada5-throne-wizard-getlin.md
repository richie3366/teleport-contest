# Review 45 — 83a3ada5 — `throne_sit_effect` wizard getlin 1..13 (D-1084)

## Metadata
- Full / short hash: `83a3ada56a70d5f025bf9ddca78a85ff4f847f2e` / `83a3ada5`
- Parent: `e6167027` (D-1083; review **44**). JS-touching since last `reviews/loop-unattended/` file: D-1081–D-1083, **this SHA**. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 14:56:32 +0200
- D-id: **D-1084**
- Stats: 11 files, +124 / −62 — `js/sit.js` +30 / −15 (getlin after `rnd(13)`). Live JS is that `if`, not a new helper file.
- Claims to close: Open queue `sit.c` `throne_sit_effect` wizard getlin `"Throne sit effect (1..13)"` (named). Not Analyze `y_n`. Review **36** named wizard getlin as omit. Stamped **Addressed:** D-1084 on the archive row **without** the short hash (chicken-egg). This review commit fills `83a3ada5`. `reviews/loop-2026-08-15/` D-1033/D-1034 have no open getlin Must-fix.
- JS / map: `sit.js` `throne_sit_effect`. `c-js-map/data.md` names D-1084; Analyze vanish `y_n` already ported; `shieldeff` / `rndcurse` still named.
- Prior reviews this SHA claims to close: **36** named omit “wizard getlin / `shieldeff`”. Review **35** forbade pulling getlin into `lay_an_egg`.

## Intent vs deliverable

Git subject promises: “Match C throne_sit_effect so a wizard sitting on a throne can choose effect 1..13 after rnd(13).” Body: wizard `#sit` always kept `rnd(13)`.

The queue line was C `sit.c:48–61` only. Not Analyze `y_n` vanish (later arm). Not `special_throne_effect`. Not `take_gold` armor `*_off`.

The diff **does** that envelope: after `effect = rnd(13)`, `wizard_mode() && !iflags.debug_fuzzer` → `getlin("Throne sit effect (1..13) [0=random]")`; ESC → `Never_mind` and `return`; `parseInt` 1..13 overrides; 0/empty/junk keep the roll. `dosit` still `return ECMD_TIME` after `await throne_sit_effect()` (`sit.js:1387–1388`) — C `sit.c:558` then `564` `return ECMD_TIME`, including ESC (comment: “caller will still cause a move to elapse”).

It does **not** retouch Analyze `y_n`. Correct exclusion. It does **not** skip `rnd(13)` when wizard (C still rolls first). Match.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throne_sit_effect` wizard `if` | C body, **retouched** | `sit.c:48–61` |
| `wizard_mode` | **clone** of `flag.h` `wizard` | `flags.debug \|\| flags.wizard` (D-0576) |
| `getlin` | C callee, **imported** | `getline.js:45–88`; ESC `\x1b` |
| `Never_mind` | C string, **imported** | `const.js` `"Never mind."` |
| `parseInt(..., 10)` | **clone** of `atoi` | empty → NaN → keep rnd |
| Analyze `y_n` vanish | C later arm, **not this SHA** | already ported |
| `special_throne_effect` | C callee, **untouched** | after the override |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. RNG: `rnd(6)` then `rnd(13)` **before** getlin, same as C; getlin itself is input, not RNG.

## Constitution / playbook

Grep of the `js/sit.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. Prompt string is C’s literal, not a seed-shaped throne table. Contest Rule #2: no Node builtins. `getlin` uses `nhgetch` (the one gameplay input boundary).

## C ↔ JS fidelity

### Gate, prompt, ESC, atoi — then existing switch

C `sit.c:45–66`:

```
    if (rnd(6) > 4) {
        int effect = rnd(13);
        if (wizard && !iflags.debug_fuzzer) {
            char buf[BUFSZ];
            int which;
            buf[0] = '\0';
            getlin("Throne sit effect (1..13) [0=random]", buf);
            if (buf[0] == '\033') {
                pline("%s", Never_mind);
                return; /* caller will still cause a move to elapse */
            }
            which = atoi(buf);
            if (which >= 1 && which <= 13)
                effect = which;
        }
        if (special_throne) { special_throne_effect(effect); return; }
        switch (effect) { ... }
```

JS `sit.js:780–798`: `rnd(6) > 4`; `effect = rnd(13)`; `wizard_mode() && !game.iflags?.debug_fuzzer`; `getlin` same prompt; `buf === '\x1b'` → `pline(Never_mind)` return; `parseInt(String(buf ?? ''), 10)`; `which >= 1 && which <= 13`. Then existing `special_throne` / `switch`. Match for the claimed `if`.

### `wizard` vs `wizard_mode`

C `#define wizard flags.debug` (`flag.h:30`). JS `wizard_mode()` is `flags.debug || flags.wizard` (D-0576, used elsewhere in `sit.js` / `end.js`). If `flags.wizard` is set without `debug`, JS prompts and C does not. Pre-existing analog, not invented here. Public sessions are not wizard. Named with D-0576, not Must-fix.

### `getlin` ESC

C tty: ESC → `buf[0] == '\033'`. JS `getline.js:62–69`: ESC with empty buf returns `'\x1b'`; ESC with content clears the buffer (second ESC cancels). C ports differ on mid-line ESC. Empty-buf ESC matches. `Never_mind` is C’s string including the period.

### `atoi` vs `parseInt`

C `atoi("")` / junk → 0 → keep `rnd(13)`. JS `parseInt('', 10)` is `NaN`; `NaN >= 1` is false → keep rnd. `parseInt('5abc', 10)` is 5 like `atoi`. `parseInt('0')` is 0 → keep rnd (C “0=random”). `parseInt('13')` is 13. `parseInt('14')` is 14 → out of range, keep rnd. Match for the prompt’s contract.

### Turn still elapses

C `dosit` `IS_THRONE` → `throne_sit_effect()` (void) → `return ECMD_TIME`. ESC returns from the inner function only. JS `await throne_sit_effect(); return ECMD_TIME`. Match. Do not return `ECMD_OK` from `dosit` on ESC.

### RNG order

C always burns `rnd(6)` then, if that arm, `rnd(13)` **before** the wizard prompt. A wizard who ESC still consumed those two rolls; the throne does not vanish on that return (vanish is a later arm after the switch). JS same: `return` skips vanish/switch. Journal canary: ESC gold+throne kept. Match.

`debug_fuzzer` skips the prompt so fuzzers do not hang on getlin — C `iflags.debug_fuzzer`. JS `game.iflags?.debug_fuzzer`. Match.

Ordinary effects after a successful atoi are the pre-existing `switch (effect)` (D-1034): 1 cursed attr+hp, 2 bless attr, 3 shock, 4 heal, 5 `take_gold`, 6 luck/wish, 7 court, 8 genocide, 9 curse, 10 see-invis, 11 aggravate-tele, 12 identify, 13 pretzel. This SHA does not retouch those arms. Vlad `special_throne` still runs **after** the override and **returns** before vanish — a wizard on the tower who types `5` still takes Vlad’s case 5, not ordinary `take_gold`. C same order (`sit.c:63–66`). Journal atoi 5/13 canaries were ordinary-throne (not `In_V_tower`). Honest.

`rnd(6) > 4` is C’s “same as `!rn2(3)`” comment. JS keeps the convoluted form. Two `rnd` calls on the success path whether or not getlin runs. A wizard who types `0` still burned both rolls. Match.

## Hallucinations / overclaim

“Match C throne_sit_effect so a wizard sitting on a throne can choose effect 1..13 after rnd(13)” is **true for that `if`.** `getlin` is not a stub. Analyze `y_n` was not claimed. This is **not** “Match C dispatch, callee is a stub.”

It is **not** true that `wizard_mode` is exactly `flags.debug` with no `flags.wizard` OR (D-0576).

Stamping **Addressed:** D-1084 is fair for the Open line. Fill hash `83a3ada5` in this commit.

## Density (§2b)

One Open cluster: C `sit.c:48–61`. ~15 executable lines. Small (one `if`), but it is the whole remaining wizard getlin gap in that function. Analyze left named/already done. Not “finish thrones.” §2b would have preferred bundling with a sibling sit arm; the queue forbade Analyze.

## Verification

Journal: private canary (non-wizard / fuzzer skip; ESC gold+throne kept + Never_mind; atoi 5 `take_gold`; atoi 13 pretzel; 0/empty keep rnd); green+strict seed8000/0900; cohort **12**/12 + strict 1800/4500/2200. Path **public-unhit** (public seats are not wizard). Cadence **#1380** **44**/44 after this SHA.

C read of `sit.c:39–66`/`556–564`, `flag.h:30`, `getline` ESC; JS `sit.js:632–634`/`774–798`/`1385–1388`, `getline.js:45–88`, `const.js` `Never_mind`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| Path | C | JS after |
|------|---|---------|
| non-wizard | no getlin; keep `rnd(13)` | **skip if** |
| fuzzer | no getlin | **`debug_fuzzer` skip** |
| ESC | Never_mind; throne remains; turn used | **same** |
| `"5"` | `take_gold` | **effect 5** |
| `"13"` | pretzel | **13** |
| `""` / `"0"` / junk | keep rnd | **keep rnd** |

Public 2200/0108 wizard sessions do not `#sit` a throne through this prompt in the scored keystream. Admit **public-unhit**.

## Actionable C-wrongs

None that Must-fix this next iter. The getlin/atoi/ESC/turn envelope matches `sit.c`.

Named omits / do-nots (map / Open, not Must-fix):

1. Review **43** Flying uprops is the live Must-fix (not this SHA).
2. `shieldeff`; `rndcurse` `shieldeff`; take_gold armor `*_off` / `unpunish` / `setnotworn` (live Open after Must-fix).
3. `wizard_mode` extra `flags.wizard` (D-0576 analog).

Do not restore always-`rnd(13)` for wizard. Do not skip `rnd(13)` before getlin. Do not return `ECMD_OK` on ESC. Do not steal Analyze `y_n`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: after `rnd(13)`, a wizard (non-fuzzer) getlin can override 1..13 or ESC with Never_mind while the sit turn still elapses, matching `sit.c:48–61`.
- Must-fix stays empty for this SHA; next port pops review **43** Flying uprops, not steal.c.
