# Review 57 — bd16c130 — `dryup` wizard `y_n("Dry up fountain?")` (D-1096)

## Metadata
- Full / short hash: `bd16c1305b6fb7c126c27bfa0a8e5066b3ed1ce9` / `bd16c130`
- Parent: `a86a7111` (D-1095). JS-touching since last dedicated review file creation (`685625fb`): D-1093–D-1095, **this SHA**. This file audits **this SHA only**. This SHA also filled D-1095 archive hash `a86a7111` — stamp, not a new review file.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 18:24:57 +0200
- D-id: **D-1096**
- Stats: 10 files, +107 / −44 — `js/fountain.js` +23 / −6 (`wizard_mode` + `yn_function` after town warn).
- Claims to close: Open queue `fountain.c` `dryup` wizard yn (named). Not angry_guards. Stamped **Addressed:** D-1096 on the archive row **without** the short hash (chicken-egg). This review commit fills `bd16c130`. `reviews/loop-2026-08-15/` has no open dryup-yn Must-fix.
- JS / map: `fountain.js` `dryup`. `c-js-map/data.md` fountain row names D-1096. `angry_guards` after real dryup, Deaf shake/wave, cansee cloud-glyph skip still named (live Open).
- Prior reviews this SHA claims to close: none as Must-fix. Named omit from D-0894 / fountain map.

## Intent vs deliverable

Git subject promises: “Match C fountain.c so wizard dryup asks y_n after the town warn.”

Old JS `dryup` returned on first town use (D-0894) then always dried. C `fountain.c:216–219` then asks `y_n("Dry up fountain?")` when `isyou && wizard`, and `'n'` aborts without replacing the fountain.

The diff **does** that envelope: after the town-warn `return`, `isyou && wizard_mode()` → `yn_function('Dry up fountain?', 'yn', 'n')`; `'n'` returns. No `iflags.debug_fuzzer` skip (C has none here; sit `getlin` does — do not copy that). `void isyou` removed because `isyou` is live again.

It does **not** call `angry_guards(FALSE)` after the real dry (`fountain.c:236–237`). Named, already Open. It does **not** skip the dryup pline when the glyph is `S_cloud`. Named. It does **not** port Deaf shake/wave in `watchman_warn_fountain`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dryup` wizard `y_n` | C body, **retouched** | `fountain.c:216–219` after town return |
| `yn_function` | C callee, **imported** | `getline.js`; real tty yn |
| `y_n` macro | **expanded** | `hack.h:1329` `yn_function(query, ynchars, 'n', TRUE)` |
| `wizard_mode` | **clone** of `flag.h:30` | `flags.debug \|\| flags.wizard` (D-0576 sit shape) |
| `debug_fuzzer` skip | C **absent** here | correctly not invented |
| `angry_guards` | C after dry, **named omit** | live Open |
| cloud-glyph skip | C `glyph_to_cmap != S_cloud` | named omit |
| town warn | C before yn, **untouched** | D-0894 |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No RNG** in the new arm (`y_n` is input). Town `rn2(3)` / `FOUNTAIN_IS_WARNED` gate unchanged (`fountain.c:203–204` ≡ JS `648–649`).

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. Prompt string is C’s `"Dry up fountain?"`, not a seed-shaped wizard menu. Contest Rule #2: no Node builtins. `yn_function` is the existing getline path (one await at `nhgetch`).

## C ↔ JS fidelity

### Order — town warn **then** wizard yn **then** dry

C `fountain.c:201–238`:

```
    if (IS_FOUNTAIN(typ) && (!rn2(3) || FOUNTAIN_IS_WARNED(x, y))) {
        if (isyou && in_town(x, y) && !FOUNTAIN_IS_WARNED(x, y)) {
            SET_FOUNTAIN_WARNED(x, y);
            mtmp = get_iter_mons(watchman_warn_fountain);
            if (!mtmp) pline_The("flow reduces to a trickle.");
            return;
        }
        if (isyou && wizard) {
            if (y_n("Dry up fountain?") == 'n')
                return;
        }
        if (cansee(x, y)) { … maybe pline … }
        set_levltyp ROOM; flags=0; blessedftn=0; newsym;
        if (isyou && in_town(x, y))
            (void) angry_guards(FALSE);
    }
```

JS `646–678`: `IS_FOUNTAIN` early return; `!(!rn2(3) || WARNED)` return (De Morgan of C’s outer `if`); town warn + `return`; **then** wizard yn; then cansee pline (no cloud skip); `typ=ROOM` / flags / blessedftn / nfountains-- / `newsym`; angry_guards still commented. Match for the claimed yn slot. `nfountains--` is the JS analog of C `set_levltyp` updating `level.flags.nfountains` — pre-existing, not this SHA.

C `set_levltyp(x, y, ROOM)` also clears some location bookkeeping JS still does as `loc.flags = 0` / `blessedftn = 0` (named “full `set_levltyp` side effects” on the fountain map). Wizard `'n'` never reaches that. Wizard `'y'` still uses the pre-existing ROOM write, not a new dryup body. This SHA only inserts the yn between warn-return and cansee.

First town use still **returns before** yn. Wizard sitting in town on an unwarned fountain gets the trickle, not the prompt. C same. Second use (warned) can prompt.

Outer gate: C `!rn2(3) || FOUNTAIN_IS_WARNED`. JS `if (!(!rn2(3) || FOUNTAIN_IS_WARNED)) return` then proceeds. Same boolean. A non-warned fountain still burns `rn2(3)` **before** town warn and before yn. Wizard answering `'n'` on a later use does not un-burn that `rn2`. C same. `SET_FOUNTAIN_WARNED` still happens only on the town first-use arm, not on wizard `'n'`. A wizard who aborts yn leaves the warned bit as it was (already warned, or never in town). Match.

`!isyou` (monster `dryup` from minliquid D-1095) never prompts. C `isyou && wizard`. Match. Minliquid passes `FALSE`.

### `wizard` and `y_n`

C `flag.h:30`: `#define wizard flags.debug`. JS `wizard_mode` is `!!(game.flags?.debug || game.flags?.wizard)` — same clone sit.js used for throne getlin (D-0576 / D-1084). `options.js` playmode debug sets `flags.debug`. Extra `flags.wizard` is the established JS alias, not a dryup-only invention. Not Must-fix.

C `hack.h:1329`: `#define y_n(query) yn_function(query, ynchars, 'n', TRUE)`. Fourth argument saves the response in the do-again buffer (`YN()` passes FALSE). JS `yn_function(query, resp='yn', def='n')` has **no** fourth arg — pre-existing getline signature. ESC with `'n'` in resp returns `'n'` (`getline.js:765–769`); space/CR return def `'n'`. So `'n'` abort includes quit→def, as the D-log claimed. Do-again replay of a prior yn is thinner than C `TRUE`. Named analog of getline, not a dryup C-wrong of the prompt/default/abort.

`wizard_mode` is `!!(game.flags?.debug || game.flags?.wizard)` at `fountain.js:106–108`. C `wizard` is only `flags.debug`. The extra `flags.wizard` alias is D-0576 sit, not a dryup invention. `options.js` playmode debug sets `flags.debug`, so the prompt fires for contest wizard the same way C does.

No `debug_fuzzer` gate: C dryup has none. Sit `throne_sit_effect` skips getlin when `iflags.debug_fuzzer`. Copying that skip here would be a C-wrong. The port did not.

`ynchars` in C is `"yn"` (`decl.c` / `hack.h` users). JS passes `'yn'` explicitly. Def `'n'` matches the macro’s third argument. Prompt text is exact, including the question mark, without a `" ["` prefix of JS’s own — `yn_function` adds ` [yn] (n) ` like tty (`getline.js:738–742`). C `tty_yn_function` does the same. Public screens do not hit this prompt; if a private canary captures it, the painted line is getline’s, not a dryup invention.

### What `'y'` vs `'n'` does

`'n'` (or def): return; fountain stays; no pline; no `angry_guards`. `'y'` (or any other char in `'yn'`): fall through to dry. Invalid keys retry (C tty_yn). Match.

`angry_guards` still missing on the **successful** dry in town. A wizard who answers `'y'` in town dries without angering the watch. C would angry. That is the live Open line, not this subject.

## Hallucinations / overclaim

“Match C fountain.c so wizard dryup asks y_n after the town warn” is **true for the prompt slot, the `'n'` abort, the `isyou` gate, and the absence of a fuzzer skip.** It is **not** true that `angry_guards` ran, that cloud glyphs suppress the pline, or that `y_n`’s do-again `TRUE` exists in JS `yn_function`.

This is **not** “Match C dispatch, callee is a stub.” `yn_function` is the real getline callee. Stamping **Addressed:** D-1096 is fair for the Open line. Fill hash `bd16c130` in this commit.

## Density (§2b)

One Open cluster: the wizard yn after town warn. ~15 executable lines. Playbook “one deferred `if` alone” is the **too-small** column. The queue line forbade pulling `angry_guards`. Sibling of the same function (`angry_guards` after the real dry) would have been the denser envelope. That is a density smell, not a shipped C-wrong of the yn. Do not Must-fix `angry_guards` onto this SHA — it is already the next fountain Open row after `kill_eggs` / genocide / `goodpos` / … / `dryup angry_guards`.

## Verification

Journal: private canary **12**/12 (non-wizard no yn; wizard `'n'`/`'y'`/space-def; `!isyou` no yn; `flags.wizard` alias; fuzzer still yn; town first-use skips yn); green+strict seed8000/0900; cohort **15**/15 (0014 fountain + 0006/2200/0108/0360/5002 wizard + 1500/1800/0060/0102/0700/0017/4500/0009/0106) + strict 0014/0006/2200/0360. Path **public-unhit** (public seats are not wizard dryup). Cadence **#1395** (this audit) **44**/44.

C read of `fountain.c:201–238`, `hack.h:1329`, `flag.h:30`; JS `fountain.js:103–108` / `646–678`, `getline.js:730–774`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| non-wizard `isyou` | no yn; maybe dry | **same** |
| wizard `'n'` | abort, fountain stays | **same** |
| wizard `'y'` | dry | **same** |
| wizard space/ESC | def `'n'` abort | **same** |
| `!isyou` (minliquid) | no yn | **same** |
| town first use | warn, return, **no** yn | **same** |
| `debug_fuzzer` | still yn | **still yn** |
| wizard `'y'` in town | dry + `angry_guards` | **dry only** (named) |

## Actionable C-wrongs

None that Must-fix this next iter. The yn sits where `fountain.c` puts it and aborts on `'n'`.

Named omits / do-nots (map / Open, not Must-fix):

1. `angry_guards(FALSE)` after a real dry when `isyou && in_town` (`fountain.c:236–237`). Do not pull it into `kill_eggs`. Live Open after genocide / `goodpos` / `db_under_typ`.
2. cansee cloud-glyph skip of the dryup pline; Deaf shake/wave warn.
3. `yn_function` fourth `resp_save` analog — getline debt, not a dryup peel.

Do not skip the yn under `debug_fuzzer`. Do not prompt before the town-warn `return`. Do not prompt when `!isyou`. Do not restore always-dry wizard.

## Verdict

- Verdict: **ACCEPT**
- Score: **7 / 10**
- One sentence: wizard `dryup` now asks C’s `y_n("Dry up fountain?")` after the town warn and aborts on `'n'`, while `angry_guards` after a real dry stays the named Open row.
- Must-fix stays empty for this SHA; density is thin but the callee is real getline, not a stub.
