# Review 228 — 42d50a53 — uhitm.c hmonas altwep / uswapwep (D-1266)

## Metadata
- Full / short hash: `42d50a537f2de716a89c333e5aa0b4faffbf63a5` / `42d50a53`
- Parent: `9859426c` (D-1265). This file audits **this SHA only**. Archive row **Addressed:** D-1266 lacked the short hash; this review commit fills `42d50a53`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 09:53:39 +0200
- D-id: **D-1266**
- Stats: 12 files, +187 / −55 — `js/uhitm.js` +100 / −40; `js/wield.js` +6 / −1 (`is_weptool` / `drop_uswapwep` export).
- Claims to close: Open `uhitm.c` altwep / `uswapwep` (named from D-1252 / reviews **213**/**214**). Not AT_ENGL. `reviews/loop-2026-08-15/` has no unpaid altwep Must-fix.
- JS / map: `uhitm.js` `hmonas` / `hmonas_toggle_altwep` / `Hate_silver`; `wield.js` exports; `c-js-map/data.md`. skipdrin / pit kick still named.
- Prior reviews this SHA claims to close: **214** named omit altwep after `demonpet`.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c hmonas altwep so a poly'd multi-AT_WEAP hero swings uswapwep on the second hit and drops a cursed secondary at passivedone, instead of always using uwep.”

C `hmonas` (`uhitm.c:5490–5543`): `originalweapon = (altwep && uswapwep) ? &uswapwep : &uwep`; if gates, `altwep = !altwep`; `weapon = *originalweapon`; empty → `originalweapon = &uarmg`; `known_hitum`; `weapon = *originalweapon` re-read; worm-cut `i=NATTK; goto passivedone`. Passivedone `:5838–5847`: if `uswapwep && weapon==uswapwep && cursed` → `drop_uswapwep(); break;` **then** `DEADMONSTER` break. Gates `:5494–5512`: `uswapwep` + `uwep` weapon/weptool, `!bimanual(uwep)`, `!uarms`, `!uswapwep->oartifact`, swap weapon/weptool, `!launcher/ammo/missile`, `!bimanual(uswapwep)`, `!(objects[].oc_material==SILVER && Hate_silver)`. `Hate_silver` (`youprop.h:401`): `u.ulycn >= LOW_PM \|\| hates_silver(youmonst.data)`. `drop_uswapwep` (`wield.c:809–831`).

Old JS: `weapon = u.uwep`; no toggle; `DEADMONSTER` break before a cursed-swap drop.

The diff **does** orig-slot + toggle + re-read + passivedone drop. It does **not** pull skipdrin / pit kick. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hmonas_toggle_altwep` | C `:5494–5513`, **new** | |
| origSlot `uwep`/`uswapwep`/`uarmg` | C `:5493–5516`, **wired** | pointer via slot name |
| re-read after `known_hitum` | C `:5531`, **wired** | |
| worm-cut `passivedone` | C `:5539–5542`, **wired** | skip passive, still drop |
| cursed `drop_uswapwep` | C `:5842–5844`, **wired** | before DEADMONSTER |
| `drop_uswapwep` | C `wield.c:809`, **imported live** | |
| `is_weptool` / `is_launcher` / `is_ammo` / `is_missile` / `bimanual` | C `obj.h`, **imported live** | weptool has named name-fallback |
| `Hate_silver` | C `youprop.h:401`, **local clone** | `hates_silver` D-1254 live |
| `hates_silver` | C `mondata.c`, **imported live** | |
| skipdrin AT_TENT AD_DRIN | C `:5464`, **named omit** | |
| pit AT_KICK | **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in the toggle; `known_hitum` still `rnd(20)`. Cursed drop is `dropx`, no extra `rn2`.

## C ↔ JS fidelity

Pinned C toggle (`uhitm.c:5493–5513`):

```
            originalweapon = (altwep && uswapwep) ? &uswapwep : &uwep;
            if (uswapwep && uwep && (WEAPON || is_weptool(uwep))
                && !bimanual(uwep) && !uarms && !uswapwep->oartifact
                && (WEAPON || is_weptool(uswapwep))
                && !(is_launcher || is_ammo || is_missile)
                && !bimanual(uswapwep)
                && !(objects[uswapwep->otyp].oc_material == SILVER
                     && Hate_silver))
                altwep = !altwep;
            weapon = *originalweapon;
```

JS: `origSlot = (altwep && uswapwep) ? 'uswapwep' : 'uwep'` **before** the toggle (C same: first AT_WEAP uses `uwep` even when the toggle will flip). Gates match, including **`objects[otyp].oc_material`** not instance `obj.material`. `Hate_silver()` uses live `hates_silver` (were / vampire / demon / shade / imp-except-tengu + vampshifter) plus `ulycn >= LOW_PM`. Silver secondary while lycanthrope/shade-form does **not** toggle — C same.

After `known_hitum`, JS `weapon = u[origSlot]` (destroyed → null / gloves if orig was redirected). C `weapon = *originalweapon`. Empty primary: C retargets the pointer to `uarmg` **after** the first read so the hit uses null weapon and passive sees gloves. JS `if (!weapon) origSlot = 'uarmg'` then hit with null, re-read gloves. Match.

Worm-cut: C `goto passivedone` skips `dhit==-1` / `passive` / knockback, still cursed-drop. JS `skip_passive` then the same drop. Cursed `uswapwep` drop **breaks** before `DEADMONSTER` so a dead foe still drops the cursed secondary. JS drop then `mhp<1` break. Match.

`drop_uswapwep` is live `dropx` (Glib/twoweap wording already there). Poly altwep is not `u.twoweap`, so cursed drop uses C’s `!twoweap` “evades your grasp” arm. Match.

This is **not** “Match C dispatch, callee is a stub”: second AT_WEAP passes `uswapwep` into `known_hitum`; cream-pie on the swap slot splatters; cursed drop calls `dropx`.

`is_weptool` extra name-fallback (pick-axe / hook / horn / aklys / bullwhip) is pre-existing; C is `TOOL_CLASS && oc_skill != P_NONE`. If `oc_skill` is populated the fallback is dead. Not a toggle that treats a towel as a weapon (`P_NONE` towel fails both).

## Hallucinations / overclaim

Subject + D-1266 say the second AT_WEAP swings `uswapwep` and a cursed secondary drops at passivedone. **Orig-slot + toggle + re-read + `drop_uswapwep` are the hunk.** Stamping **Addressed:** D-1266 is fair. Do **not** stamp “Match C skipdrin” or “Match C pit kick” or “Match C real `#twoweapon` `u.twoweap`.” C’s comment is “approximate two-weapon mode”; JS does not set `u.twoweap`. `Hate_silver` is the C macro over live `hates_silver`, not the old `M2_WERE|M2_DEMON` clone.

## Density

One C cluster: AT_WEAP orig/toggle/re-read + passivedone drop. ~70 JS lines + two exports. Right size. Did not glue `set_uinwater`.

## Branch-by-branch confirm

1. Two AT_WEAP, one-handed primary, no shield, sword+short sword: first `uwep`, toggle, second `uswapwep`. Match.
2. `uarms` / bimanual primary / artifact swap / launcher/ammo/missile swap: no toggle, both `uwep`. Match.
3. Silver swap + `Hate_silver`: no toggle. Match.
4. Silver swap, human not lycanthrope: toggle. Match.
5. Single AT_WEAP: one swing `uwep`, toggle unused. Match.
6. `known_hitum` destroys swap: re-read null; cursed check needs `weapon==uswapwep` — gone, no drop. Match.
7. Cursed swap, foe dies on first hit: still drop then break. Match.
8. Worm-cut: skip passive, still cursed drop. Match.
9. Empty `uwep`, gloves: hit unarmed, passive gloves. Match.
10. skipdrin tentacle: still named (fires). Match the omit.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. SILVER is `objects[].oc_material`, not a recorded otyp. Plain ESM.

## Verification

Journal: private canary **21**/21 (C toggle/re-read/drop order; JS origSlot; cursed drop; dart/shield/bimanual/silver+Hate/artifact/single-AT_WEAP/worm-cut no drop; cream-pie splat proves second swing used uswapwep); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session Upolyd-melees with a secondary. Cadence this audit: full `sessions` at HEAD `42d50a53` **44**/44.

## Actionable C-wrongs

None for Must-fix. Second swing is the live `uswapwep` object through `known_hitum`. `Hate_silver` uses D-1254 `hates_silver`, not a truncated were/demon clone.

Named omits (map, not Must-fix):

1. skipdrin AT_TENT AD_DRIN (`uhitm.c:5464`)
2. pit AT_KICK
3. `is_weptool` name-fallback if `oc_skill` missing; `drop_uswapwep` Yobjnam2 polish

Do not Must-fix “JS uses origSlot strings not C pointers.” Do not Must-fix “AT_WEAP local `wep_dhit` vs outer `dhit`” (review **213**; Unchanging leftover). Do not pull `set_uinwater`.

## Callers / RNG ledger

C: only `hmonas` AT_WEAP. JS same. No new RNG. Public fortress is not evidence a dual-wield poly swung `uswapwep`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly multi-AT_WEAP now toggles onto live `uswapwep` and `drop_uswapwep`s a cursed secondary at passivedone; skipdrin stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1266 `42d50a53`.
