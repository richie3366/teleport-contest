# Review 770 — e532a792 — allmain.c moveloop_core do_storms/glibr/mkot/end_of_input (D-1801)

## Metadata
- Full / short hash: `e532a7924b921bccf6c3731ac3c7d08e90094f4f` / `e532a792`
- Parent: `b9a72263` (D-1800 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 03:03:49 +0200
- D-id: **D-1801**
- Stats: `js/do_wear.js` +111/−6; `js/artifact.js` +65/−2; `js/timeout.js` +65/−2; `js/cmd.js` +29/−1; `js/allmain.js` +22/−7; `js/hack.js` +1/−1. Total `js/` insertions **293** >250 → ceiling **450**. Band **80–450**.
- Claims to close: Open `allmain.c` `moveloop_core` per-turn callees. Not `nh_timeout`.
- JS / map: timeout `do_storms`; do_wear `glibr`/`fingers_or_gloves`; artifact `mkot_trap_warn`; cmd `end_of_input`; hack `You_hear` export. `c-js-map/turns.md`. Archive **Addressed:** D-1801 `e532a792`.

## Intent vs deliverable

Git subject promises: Match C `allmain.c` `moveloop_core` so `do_storms`, `glibr`, `mkot_trap_warn`, and SAFERHANGUP `end_of_input` actually run each turn, instead of skipping Glib slip, stormy lightning/thunder, Master Key heat, and hangup save.

`node scripts/csym.mjs do_storms` → `timeout.c:1846–1892`. `glibr` `do_wear.c:2527–2627`. `fingers_or_gloves` `:59–65`. `count_surround_traps` `artifact.c:2707–2749`. `mkot_trap_warn` `:2752–2770`. `end_of_input` `cmd.c:5182–5209`. Callers: `allmain.c:181–184` / `:271–272` / `:347–353`; `cmd.c` `rhack:3638`.

Parent jumped `nh_timeout` → `dosounds`. The diff **does** call those four in C order. Thunder/`You_hear`/`glibr`/Key heat/`dosave0` run. **Lightning `buzz` does not** — named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `do_storms` | LIVE + OMIT bolt | strike RNG runs; `buzz` **OMIT named** |
| `glibr` / `fingers_or_gloves` | LIVE | eat.js/fountain.js clones remain |
| `mkot_trap_warn` / `count_surround_traps` | LIVE | staticfn stays local |
| `end_of_input` | LIVE | `dosave0` LIVE; windows/locks **OMIT** (Rule #2) |
| `You_hear` | LIVE export | **do not add clone #14** |
| `u_wield_art` | LIVE export | 4 clones remain |
| `set_uasmon` | LIVE | consumes `were_changes` |
| `buzz` | OMIT named | NOT FOUND; `dobuzz` exists in zap.js — do **not** invent a second |

`node scripts/sym.mjs`:

```
do_storms        js/timeout.js:967   ASYNC
glibr            js/do_wear.js:2501   ASYNC
fingers_or_gloves js/do_wear.js:2489   sync  + eat.js / fountain.js clones
mkot_trap_warn   js/artifact.js:1794   ASYNC
count_surround_traps NOT EXPORTED — 1 LOCAL (artifact.js:1760)
end_of_input     js/cmd.js:118   sync
You_hear         js/hack.js:131   ASYNC  + 13 clones — do NOT add another
u_wield_art      js/artifact.js:550   sync  + 4 clones — do NOT add another
set_uasmon       js/polyself.js:444   sync
dosave0          js/save.js:362   sync
buzz             NOT FOUND
dobuzz           js/zap.js:2032   ASYNC
```

`--can allmain.js` timeout/do_wear/artifact/cmd/polyself: **ALREADY**. `--can timeout.js hack.js You_hear`: **ALREADY**. FORCE/DIAG/`getRngLog`/seed-in-control-flow: **none**. `fastforward_pre_mklev` in the hunk is pre-existing import context, not a new `fastforward.js` entry. Rule #2 **clean**.

## C ↔ JS fidelity

**Callee closure.** `glibr`: `Ring_off`/`dropx`/`cmdq_clear(CQ_CANNED default)`/`setuswapwep`/`setuwep`/`canletgo`/`welded`/`bimanual`/`is_sword`/`weapon_descr` LIVE. `mkot`: `u_wield_art`/`glyph_is_trap`/`t_at`/`Is_container` LIVE. `end_of_input`: `In_tutorial`/`dosave0` LIVE; `sound_exit_nhsound`/`exit_nhwindows`/`clearlocks` **OMIT**. `do_storms` thunder/`You_hear`/`incr_itimeout HDeaf`/`stop_occupation`/`nomul(-3)` LIVE; `buzz(...)` **OMIT named**. No silent STUB.

**`do_storms` (`:1846–1892`).** `!stormy \|\| rn2(8)` before any further RNG. `for (nstrike = rnd(64); nstrike <= 64; nstrike *= 2)` then `rnd(COLNO-1)`/`rn2(ROWNO)` until CLOUD or 100; `dirx/diry = rn2(3)-1`; nonzero dir would `buzz`. JS draws those rolls, sets `game.buzzer = null`, skips the bolt. Hero-in-CLOUD: Soundeffect + Kaboom + `rn1(20,30)` deaf + `nomul(-3)` unless invulnerable; else `You_hear`. **Match every RNG C draws; do not stamp Match C lightning.**

**`glibr` (`:2527–2627`).** Uncursed ring slip unless gloves/nolimbs; two-weapon then uwep unless AKLYS/welded. `ULEFTY`/`URIGHTY` ≡ `uhandedness`. **Match.**

**`mkot_trap_warn` (`:2752–2770`).** Ungloved Master Key; heat word on count change; 3×3 skip shown trap glyphs. **Match.** No RNG.

**Hangup (`:181–184`).** `unixconf.h` SAFERHANGUP: `done_hup` → `end_of_input` without the `done_hup++` gate. JS moveloop + rhack. Tutorial zeros save. **Match the compiled path.**

## Hallucinations / overclaim

Subject’s “stormy **lightning** actually run” is **false**; thunder and strike-position RNG run, `buzz` does not. D-log names that. Do **not** stamp “Match C `amulet` / `intervene` / `buzz`.” Do **not** add You_hear clone #14. Do **not** write `count_surround_traps` #2.

## Density

§2b: the four `moveloop_core` callees on the Open row. +293. Did **not** glue `nh_timeout` or `amulet()`. Right size.

## Verification

D-log: green + named cohort. save-oracle skip. Public-unhit for stormy `rn2(8)` and Glib slip. This audit: `csym` ranges vs HEAD `js/timeout.js:967–1008` / `js/do_wear.js:2501–2584` / `js/artifact.js:1760–1812` / `js/cmd.js:118–130`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: `buzz`/`dobuzz`; `amulet()`; udemigod `intervene`; hangup window/lock (Rule #2); `do_positionbar` / bypasses / resume_wish.

Verdict: **ACCEPT-WITH-DEBT**
