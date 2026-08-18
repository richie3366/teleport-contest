# Review 194 — 83624a46 — uhitm.c `hmon_hitmon` `troll_baned` around `killed` (D-1232)

## Metadata
- Full / short hash: `83624a4607dc6e9165258aaec6e2bcfbc9e3b34c` / `83624a46`
- Parent: `5cd4ab5c` (D-1231). This file audits **this SHA only**. Archive row **Addressed:** D-1232 `83624a46` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 22:14:16 +0200
- D-id: **D-1232**
- Stats: 11 files, +224 / −151 — `js/uhitm.js` +15 / −6; `js/mhitm.js` comments. Journal rotate in the same SHA.
- Claims to close: Open `uhitm.c` `hmon_hitmon` `troll_baned` around `killed` (named from D-1223 / review **185**). Not hmonas. `reviews/loop-2026-08-15/` has no unpaid hmon Trollsbane Must-fix.
- JS / map: `uhitm.js` `hmon` wrap; `troll_baned` already exported. `c-js-map/data.md`. hmonas ternary/`uwep` was still named at this SHA (D-1233 next).
- Prior reviews this SHA claims to close: **185** item 2 (`uhitm.c:1906–1909`).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c hmon_hitmon troll_baned so a Trollsbane kill copies mkcorpstat_norevive onto the troll corpse, instead of leaving the revive-ban unset.”

C (`uhitm.c:1904–1909`): `else if (hmd.destroyed) { if (!already_killed) { if (troll_baned(mon, obj)) gm.mkcorpstat_norevive = TRUE; killed(mon); gm.mkcorpstat_norevive = FALSE; } }`. Unlike mhitm/hmonas, this site is **TRUE-only** (does not force FALSE when the hitting object is not Trollsbane) then always resets after `killed`. Hitting `obj`, not `uwep`. Comment: poiskilled/already_killed will not apply for Trollsbane.

Old JS `hmon` called `killed` with the flag unset. `troll_baned` / `mkcorpstat` copy / `revive()` twitch already live (D-1223).

The diff **does** `if (troll_baned(mon, obj))` TRUE, `killed`, FALSE. It does **not** pull hmonas AT_WEAP||AT_CLAW ternary/`uwep` or the poiskilled/`already_killed` skip. Named at this SHA.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hmon` wrap | C `hmon_hitmon` `:1906–1909`, **wired** | TRUE-only; hitting `obj` |
| `troll_baned` | C `monst.h` macro, **imported** | D-1223; not a new clone |
| `killed` → `make_corpse` → `mkcorpstat` | C callee, **already live** | copies `norevive` |
| `revive()` twitch | C `zap.c:967`, **already live** | |
| poiskilled / `already_killed` skip | C `:1899–1903`, **named omit** | C says unused for Trollsbane |
| hmonas `damageum` ternary | C `:4866–4880`, **named omit** | D-1233 next |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** Troll `start_corpse_timeout` still `rn2(TROLL_REVIVE_CHANCE)` per C even when `norevive` (ban is at `revive()`, not timer start).

## C ↔ JS fidelity

Pinned C (`uhitm.c:1904–1909`):

```
    } else if (hmd.destroyed) {
        if (!hmd.already_killed) {
            if (troll_baned(mon, obj))
                gm.mkcorpstat_norevive = TRUE;
            killed(mon); /* takes care of most messages */
            gm.mkcorpstat_norevive = FALSE;
        }
    }
```

JS (`uhitm.js` `hmon` destroyed arm): same TRUE-only, same always-reset, same hitting `obj` (melee `uwep` or thrown object). Does **not** write FALSE when `troll_baned` is false (leftover TRUE from a prior kill would still copy — C same; canary covered leftover). `already_killed` skip absent: if that flag were set, JS would `killed` again. Named; C comment says it will not apply for Trollsbane.

**Callee `killed` is live**, not a stub. `mkcorpstat` already honors the env flag (D-1223). Do not confuse with mhitm’s ternary on `mwep` or hmonas’s ternary on `uwep`.

## Hallucinations / overclaim

Subject + D-1232 say a hero Trollsbane kill copies `norevive`. **The TRUE-only wrap around live `killed` is the hunk.** Stamping **Addressed:** D-1232 is fair. Do **not** stamp “Match C hmonas ternary” (next SHA) or “Match C poiskilled `xkilled`.”

## Density

One C site, one JS arm. ~15 lines. Right size. Did not glue hmonas.

## Branch-by-branch confirm

1. Trollsbane vs S_TROLL: TRUE around `killed`; corpse `norevive`; `revive` twitch. Match.
2. Excalibur / plain / null obj vs troll: do not set TRUE; reset still runs. Match TRUE-only.
3. Trollsbane vs ogre: `troll_baned` false. Match `S_TROLL`.
4. Thrown Trollsbane: hitting `obj` is the missile. Match C `obj` not `uwep`.
5. Leftover TRUE + non-bane kill: copies then clears. Match C.
6. Always FALSE after `killed` even if it was already false. Match.
7. Poison deadly skip: JS still `killed` on destroyed. **Named.**
8. Poly AT_WEAP||AT_CLAW `uwep` ternary: not this SHA.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `ART_TROLLSBANE` is extracted.

## Verification

Journal: private canary **31**/31 (C TRUE-only vs hmonas ternary; Trollsbane troll `norevive`+twitch; Excalibur/plain/null/ogre skip; leftover TRUE copies; reset after); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session has a hero Trollsbane troll kill. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. The wrap matches C; `revive()` already honors the flag.

Named omits (map, not Must-fix):

1. poiskilled / `already_killed` skip (`xkilled` NOMSG)
2. hmonas `damageum` ternary/`uwep` (D-1233 at next SHA)
3. remaining uhitm `pline_mon`

Do not Must-fix “force FALSE when not Trollsbane” (that is mhitm/hmonas, not this site). Do not skip the always-reset.

## Callers / RNG ledger

C this site: `hmon_hitmon` only. JS `hmon` is that function. No `rn2` in the wrap. Public fortress is not evidence a troll corpse has `norevive`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: hero melee/thrown Trollsbane kills now set `mkcorpstat_norevive` TRUE-only around live `killed` like C; hmonas ternary and poison skip stay named at this SHA.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1232 `83624a46`.
