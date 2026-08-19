# Review 210 — 6e18c402 — monmove.c `mon_yells` (D-1248)

## Metadata
- Full / short hash: `6e18c402fe06873cb4a6fdc9adacc95d8a6ac84b` / `6e18c402`
- Parent: `4dfec66a` (D-1247). This file audits **this SHA only**. Archive row **Addressed:** D-1248 `6e18c402` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 02:35:31 +0200
- D-id: **D-1248**
- Stats: 12 files, +190 / −69 — `js/monmove.js` +94 / −9; `js/dokick.js` +19 / −10; comment `js/display.js`.
- Claims to close: Open `monmove.c` `mon_yells` (named from D-1247 / D-1246 / D-1238 / D-0876 / review **200**). Not iron bars. `reviews/loop-2026-08-15/` has no unpaid yell Must-fix.
- JS / map: `monmove.js` `mon_yells` + `watch_on_duty`; `dokick.js` watchman thief/door; `c-js-map/turns.md` / `debt.md`. `gelcube_digests` / ALLOW_BARS rust / `watch_dig` SetVoice+verbalize still named.
- Prior reviews this SHA claims to close: **200** named omit `mon_yells`; D-1247 follow-up.

## Intent vs deliverable

Git subject promises: “Match C monmove.c mon_yells so a town watch that spots lockpicking or door damage yells (or angrily waves when the hero is Deaf), instead of dumping a raw pline/verbalize without the yells prefix.”

C `mon_yells` (`monmove.c:106–129`): if `Deaf`, `canspotmon` → `pline_mon` `"%s angrily %s %s %s!"` `Amonnam`, `nolimbs`? shakes HEAD : waves `makeplural(ARM)`, `mhis`; else `canspotmon` → `pline_mon` `"%s yells:"` `Amonnam`, else `You_hear("someone yell:")`; then `SetVoice(mon,0,80,0)` + `verbalize1(shout)`. `Soundeffect(se_someone_yells)` is commented out in C. Callers: `watch_on_duty` (`:186–189`) lockpick `D_WARNED` arrest + `angry_guards(!!Deaf)` else warn; `dokick.c` `watchman_thief_arrest` (`:838–839`) `angry_guards(FALSE)`; `watchman_door_damage` (`:851–856`) vandal arrest `FALSE` or warn + `D_WARNED`.

Old JS: `watch_on_duty` raw `pline` shout; dokick `verbalize` only (no `"X yells:"`, no Deaf waves).

The diff **does** the shared body and wires those three callers. It does **not** pull `watch_dig` (C does not call `mon_yells` there), fountain `watchman_warn_fountain`, `gelcube_digests`, or ALLOW_BARS rust. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mon_yells` | C `:106–129`, **new** | |
| `watch_on_duty` shouts | C `:186–189`, **wired** | `angry_guards(!!Deaf)` only here |
| dokick thief / door | C `:838–855`, **wired** | `angry_guards(false)`; dynamic `import` (makemon cycle) |
| `Amonnam` | C `do_name.c`, **imported live** | |
| `pline_mon` / `verbalize` | C `pline.c`, **imported live** | `verbalize1` ≡ `verbalize("%s")` |
| `display_canspotmon` | C `display.h` `canspotmon`, **imported live** | not local stub |
| `mbodypart` | C `polyself.c`, **imported live** | `ARM=0` / `HEAD=8` match `hack.h` |
| `nolimbs` / `humanoid` / `is_neuter` / `type_is_pname` | C `mondata`, **imported live** | |
| `hero_Deaf` | C `youprop.h` `Deaf`, **clone** | `H\|\|E\|\|uroleplay.deaf` plus `u.Deaf` flag |
| `mhis_yell` | C `you.h` `mhis` → `pronoun_gender(..., PRONOUN_HALLU)`, **clone** | Hallu `rn2(4)`; unseen/neuter/`its` |
| `You_hear_yell` | C `pline.c:436–451`, **clone** | acoustics/Deaf; Unaware/Underwater named |
| `SetVoice` | C empty without `SND_LIB_INTEGRATED` | contest; not a stub shout |
| `watch_dig` / fountain earnestly | C other sites, **named omit** | C `watch_dig` is not `mon_yells` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG:** `mhis_yell` `rn2(4)` only when `Hallucination()` (C `pronoun_gender` `:1199–1200`). Deaf waves can burn that; hearing path does not.

## C ↔ JS fidelity

Pinned C (`monmove.c:108–128`):

```
    if (Deaf) {
        if (canspotmon(mon))
            pline_mon(mon, "%s angrily %s %s %s!",
                Amonnam(mon),
                nolimbs(mon->data) ? "shakes" : "waves",
                mhis(mon),
                nolimbs(mon->data) ? mbodypart(mon, HEAD)
                                   : makeplural(mbodypart(mon, ARM)));
    } else {
        if (canspotmon(mon)) {
            pline_mon(mon, "%s yells:", Amonnam(mon));
        } else {
            You_hear("someone yell:");
        }
        SetVoice(mon, 0, 80, 0);
        verbalize1(shout);
    }
```

JS: `hero_Deaf()` then spotted `pline_mon` waves/shakes and **return** (no `verbalize`). Hearing: spotted `"Y yells:"` else `You_hear_yell('someone yell:')`, then `verbalize(shout)` which wraps quotes like C `verbalize`. Unseen Deaf: silent. Match C’s empty Deaf-unseen arm.

`Deaf` (`youprop.h:125`): `HDeaf || EDeaf || u.uroleplay.deaf`. JS adds `u.Deaf` (port flag used by other clones). `angry_guards(!!hero_Deaf())` on `watch_on_duty` arrest only; dokick stays `false`. Match C `:187` vs `:839/:853`.

`mhis_yell` vs C `pronoun_gender` (`mondata.c:1191–1207`): Hallu → `rn2(4)` his/her/its/their; `!canspotmon` → its; `is_neuter` → its; `humanoid || G_UNIQ || type_is_pname` → female? her : his; else its. Uses live `Hallucination()` and `display_canspotmon`, **not** `mhitu.js`’s weaker `mhis` (female or his only). Clone matches C.

`You_hear_yell`: skip if Deaf or `flags.acoustics===false`, then `You hear ${line}`. C also skips `(Deaf && !Unaware) || !acoustics`, then Underwater “barely” / Unaware “dream” / else “You hear”. Unaware/Underwater named (same deferral as `dokick.js` `You_hear`). Acoustics check is closer to C than the dokick clone. Not a stub that prints the shout without hearing.

`Amonnam` / `mbodypart` / `nolimbs` / `makeplural` are live imports. `ARM`/`HEAD` match `hack.h` enum. dokick dropped the per-arm `angry_guards` dynamic import because `mon.js` is already a top-level import — `angry_guards(false)` still runs. Not a missing-callee.

`watch_dig` still uses its own pline/verbalize. C `watch_dig` does not call `mon_yells`. Leaving it named is correct, not a miss of this SHA’s locus.

## Hallucinations / overclaim

Subject + D-1248 say Deaf waves/shakes or `"X yells:"` / `You_hear` then quoted shout. **The body + three C callers are the hunk.** Stamping **Addressed:** D-1248 is fair. This is **not** “Match C dispatch, callee is a stub”: `verbalize` is live; `Amonnam` is live. Do **not** stamp “Match C `watch_dig` SetVoice” or “Match C fountain earnestly clone” or “Match C `You_hear` Underwater/Unaware.” `SetVoice` empty is the contest `sndprocs.h` macro, same as D-1222 `Soundeffect`.

## Density

One C function plus the three callers C uses. ~70 JS lines of body + watch_on_duty/dokick wires. Right size. Did not glue `gelcube_digests`.

## Branch-by-branch confirm

1. Hearing, spotted watchman: `Amonnam yells:` then `"Halt, thief!  You're under arrest!"`. Match.
2. Hearing, unseen: `You hear someone yell:` then quoted shout. Match.
3. Deaf, spotted, has limbs: `A watchman angrily waves his/her arms!`, no quote. Match (C sidenote: career name “watchman” with her).
4. Deaf, spotted, `nolimbs`: shakes `mbodypart(HEAD)`. Match.
5. Deaf, unseen: nothing. Match.
6. Lockpick first warning: `mon_yells` + `D_WARNED`, no `angry_guards`. Match.
7. Lockpick already warned: yell + `angry_guards(!!Deaf)`. Match.
8. Kick thief: yell + `angry_guards(false)` even if Deaf. Match.
9. Hallu Deaf spotted: `rn2(4)` for `mhis`. Match C `PRONOUN_HALLU`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./monmove.js')` is ESM cycle-breaking, not `node:`. Plain ESM.

## Verification

Journal: private canary **16**/16 (C body+callers; JS Deaf waves/her/shakes; unseen You_hear; unseen Deaf silent; Hallu `rn2(4)`; acoustics; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a peaceful watch yells at lockpick/kick. Cadence this audit: full `sessions` after D-1249.

## Actionable C-wrongs

None for Must-fix. Body through live `Amonnam`/`pline_mon`/`verbalize`/`mbodypart`. `mhis_yell` matches C `pronoun_gender`. `You_hear_yell` Unaware/Underwater is a named clone deferral, not a shout stub.

Named omits (map, not Must-fix):

1. `You_hear` Unaware / Underwater prefixes
2. `watch_dig` (not a `mon_yells` caller in C)
3. `gelcube_digests`; ALLOW_BARS rust; fountain earnestly

Do not Must-fix “dokick `angry_guards(false)` vs `!!Deaf`.” Do not pull AT_HUGS.

## Callers / RNG ledger

C: `watch_on_duty`, dokick thief/door. JS same three. RNG: Hallu `rn2(4)` on Deaf spotted `mhis` only. Public fortress is not evidence a watch yelled.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: town watch lockpick/kick now goes through live `mon_yells` (Deaf waves or yells prefix + quote); `watch_dig` stays named because C does not call `mon_yells` there.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1248 `6e18c402`.
