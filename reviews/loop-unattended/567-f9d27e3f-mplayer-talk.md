# Review 567 — f9d27e3f — mplayer.c mplayer_talk (D-1606)

## Metadata
- Full / short hash: `f9d27e3ff4a98ae84175a026917fd9ab116b56b3` / `f9d27e3f`
- Parent: `44151244` (D-1605). This file audits **this SHA only** (fourth of nine `js/` commits since review **563**). Archive **Addressed:** D-1606 `f9d27e3f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 00:53:14 +0200
- D-id: **D-1606**
- Stats: `js/mplayer.js` +36/−4, `js/sounds.js` +23/−5. Band **150–350** (js/ insertions **59**).
- Claims to close: Open `mplayer_talk` after D-1596. Not peaceful MS_HUMANOID. Not `"threatens you."` Not `mongets` sword spe. `reviews/loop-2026-08-15/` has no unpaid mplayer_talk Must-fix.
- JS / map: `mplayer.js` `mplayer_talk`; `sounds.js` `domonnoise` MS_HUMANOID. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **557** named `mplayer_talk` after `create_mplayers`.

## Intent vs deliverable

Git subject promises: hostile endgame `#chat` with a role-monster verbalizes a same-class vs other-class line.

Pinned C `mplayer.c` `mplayer_talk` `:355–377`. Caller `sounds.c` `domonnoise` MS_HUMANOID `:1025–1032`. `monflag.h:40` `MS_HUMANOID = 25`. `mondata.h:157–158` `is_mplayer`. `dungeon.h:141` `In_endgame`. `pline.c` `verbalize` `:475–490`. `--callers mplayer_talk`: `sounds.c:1028` only.

```355:377:nethack-c/upstream/src/mplayer.c
void
mplayer_talk(struct monst *mtmp)
{
    ...
    if (mtmp->mpeaceful)
        return; /* will drop to humanoid talk */

    SetVoice(mtmp, 0, 80, 0);
    verbalize("Talk? -- %s", mtmp->data == &mons[gu.urole.mnum]
                                ? same_class_msg[rn2(3)]
                                : other_class_msg[rn2(3)]);
}
```

```1025:1032:nethack-c/upstream/src/sounds.c
    case MS_HUMANOID:
        if (!mtmp->mpeaceful) {
            if (In_endgame(&u.uz) && is_mplayer(ptr))
                mplayer_talk(mtmp);
            else
                pline_msg = "threatens you.";
            break;
        }
```

Old JS: no `mplayer_talk` export; `domonnoise` had MS_BARK / SEDUCE / LEADER only.

The diff **does** live the three+three strings, peaceful return, one `rn2(3)`, mndx vs `urole.mnum`, `verbalize("Talk? -- …")`, and the hostile endgame `is_mplayer` caller that returns `ECMD_TIME`. It **does not** print `"threatens you."`, peaceful humanoid chatter, or MS_BOAST fallthrough. Named. `SetVoice` is absent (SND_LIB no-op in this tree).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mplayer_talk` | C `:355–377`, **LIVE this SHA** | |
| same/other class strings | C `:358–368`, **LIVE** | |
| `rn2(3)` once | C `:375–376`, **LIVE** | ternary, one call |
| `verbalize` | C `:475–490`, **LIVE** | quote wrap |
| mndx vs `urole.mnum` | C `&mons[gu.urole.mnum]`, **LIVE** | `mons()` is not a stable pointer |
| `SetVoice` | SND_LIB, **no-op / OMIT named** | `sym` NOT FOUND |
| MS_HUMANOID caller | C `:1025–1032`, **LIVE this SHA** | value **25** |
| `is_mplayer` | C `mondata.h:157`, **LIVE** | mndx Archeologist..Wizard |
| `In_endgame` | C `dungeon.h:141`, **LIVE** | astral `dnum` |
| hostile `"threatens you."` | C `:1030`, **OMIT named** | JS falls through silent / `ECMD_OK` |
| peaceful MS_HUMANOID | C `:1033–1112`, **OMIT named** | |
| MS_BOAST fallthrough | C `:1013–1024`, **OMIT named** | |

`node scripts/csym.mjs mplayer_talk` → `:355-377`. `is_mplayer` → `mondata.h:157-158`. `In_endgame` → `dungeon.h:141`. `verbalize` → `:475-490`. `domonnoise` → `:678-1242`. `--callers mplayer_talk`: `sounds.c:1028`.

RNG: exactly one `rn2(3)` on the live hostile endgame path. Peaceful/threatens omits do not consume that roll. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
mplayer_talk     js/mplayer.js:368   ASYNC — await required
verbalize        js/display.js:4645   ASYNC — await required
is_mplayer       js/monsters.js:750   sync
In_endgame       js/const.js:3018   sync
SetVoice         NOT FOUND in js/** (no export, no local function/const).
             Do not add a local clone.
```

`--can sounds.js mplayer.js mplayer_talk`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `mplayer_talk` #2 in `sounds.js`. Do **not** add `SetVoice` just to look complete.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Body. Peaceful return; pick same-class iff `data.mndx === urole.mnum`; `verbalize("Talk? -- " + line)`. Strings match C byte-for-byte. **Match `:370–376`.** Pointer equality on `mons()` would never hold (D-1549); mndx is the C slot test. **Match the predicate, not the C syntax.**

`SetVoice(mtmp, 0, 80, 0)` before verbalize. Contest `sndprocs` is empty; other live talk arms already skip it. Not a stub inside the speech arm. Named.

Caller. `msound === 25`; `!mpeaceful && In_endgame(uz) && is_mplayer(ptr)` then `await mplayer_talk` then `ECMD_TIME`. C `break` then neither `pline_msg` nor `verbl_msg` so it also returns `ECMD_TIME` (`:1238`). **Match the live arm.** `is_mplayer` is mndx in `[PM_ARCHEOLOGIST, PM_WIZARD]`. **Match `:157–158` for JS `mons()` objects.** `In_endgame` is `uz.dnum === astral_level.dnum`. **Match `:141`.**

Hostile non-endgame / non-mplayer. C sets `pline_msg = "threatens you."` then `ECMD_TIME`. JS leaves both msgs unset and returns `ECMD_OK` at the function tail. **Named omit, including the ECMD.** Not a stub inside the endgame arm.

Peaceful. C continues `:1033+` (flee/moan/Huh/trapped/hungry/elf/dwarf/…). JS does not enter those tests. Named. `mplayer_talk`’s peaceful return is therefore unhit from this caller (caller already requires `!mpeaceful`). Harmless clone of C’s early return.

Callee closure (hostile endgame arm). LIVE: `mplayer_talk`, `verbalize`, `rn2`, `is_mplayer`, `In_endgame`. OMIT named: SetVoice / threatens / peaceful / MS_BOAST. STUB: none in the live arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject hostile endgame `#chat` verbalizes same vs other class: **true** when `ptr.msound === 25`. D-log “`rn2(3)` once”: **true.** D-log “SetVoice no-op”: **true (absent).** Do **not** stamp “Match C `"threatens you."`.” Do **not** stamp “Match C peaceful MS_HUMANOID.” Do **not** stamp “Match C MS_BOAST fallthrough.” Do **not** stamp “Match C `SetVoice` / SND_LIB.” Do **not** stamp “retired `domonnoise` other MS_*.” Public suite has no Astral `#chat` with a role-monster.

## Density

One C function plus its one caller arm. +59 JS. Did not glue `mongets` sword spe. §2b OK.

## Branch-by-branch confirm

1. Hostile, endgame, `is_mplayer`, same `mnum`: `same_class_msg[rn2(3)]`. **Match.**
2. Hostile, endgame, other role: `other_class_msg[rn2(3)]`. **Match.**
3. Peaceful inside `mplayer_talk`: return. **Match**; caller does not take this path.
4. Hostile, not endgame / not mplayer: `"threatens you."` **Named** (silent `ECMD_OK`).
5. Peaceful humanoid / MS_BOAST. **Named.**

## Callers / RNG ledger

Wired: `domonnoise` only, as C. One `rn2(3)` on the live path. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `mplayer_talk` #2. Do not compare `data === mons(urole.mnum)`. Do not wrap `wildmiss` as `pline_mon`. Do not glue `mongets` spe. Do not invent `SetVoice` without SND_LIB.

## Verification

D-log private canary **15**/15; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Astral `#chat`. Fortress does not prove same-class vs other-class text. `"threatens you."` / peaceful unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): peaceful MS_HUMANOID (`sounds.c:1033–1112`); hostile `"threatens you."` (`:1030`, and JS `ECMD_OK` vs C `ECMD_TIME` on that arm); MS_BOAST fallthrough (`:1013–1024`); `SetVoice`. Do not add `mplayer_talk` #2. create_mplayers is D-1596. `mongets` sword spe is D-1607.

Verdict: **ACCEPT-WITH-DEBT**
