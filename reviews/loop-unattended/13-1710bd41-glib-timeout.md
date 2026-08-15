# Review 13 — 1710bd41 — cursed-lamp make_glib Glib TIMEOUT (D-1052)

## Metadata
- Full / short hash: `1710bd4123f2c5da24bd5a9cb953da17b33a5d6d` / `1710bd41`
- Parent: `6e35d72a` (reviews 11/12; queued this Must-fix)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 01:34:11 +0200
- D-id: **D-1052**
- Stats: 13 files, +146 / −56 — `js/potion.js` +44 / −2, `js/apply.js` +15 / −7, `js/timeout.js` +5 / −1
- Claims to close: D-1023 **`use_lamp` Glib gap** (`(u.Glib|0)&TIMEOUT` vs C remaining timeout). Stamped **Addressed:** D-1052 `1710bd41` on that review in the same SHA.
- JS / map: `potion.js` `Glib`/`make_glib`; apply lamp/towel/grease callers; `nh_timeout` TIMEOUT_FLAT. Cadence still **#1320** **44**/44 (this SHA is not a score refresh).

## Intent vs deliverable

Git subject promises: “Match C Glib remaining TIMEOUT so cursed-lamp make_glib adds d(2,10) to HGlib|EGlib, not a frozen u.Glib.”

D-1023: C `use_lamp` does `make_glib((int)(Glib & TIMEOUT) + d(2,10))` (`apply.c:1673`). JS read a flat `u.Glib` that `nh_timeout` never decremented, so a second spill added `d(2,10)` to a frozen remainder.

The diff **does** (1) export `Glib()` from `uprops[GLIB]`, (2) write `make_glib` via `set_itimeout` on the intrinsic, (3) switch apply lamp/towel/grease remainder reads to `Glib() & TIMEOUT`, (4) put `GLIB` on `TIMEOUT_FLAT` so the generic `--` loop ticks the mirror.

It does **not** port `timeout.c:935–936` `make_glib(0)` on expiry, potion-dip oil spill (`potion.c:2653`, same C expression), eat greasy-tin `alreadyglib` (`eat.c:1639`), or wizcmds `#wizintrinsic` GLIB. D-log names those. The subject does not claim them.

The subject’s “HGlib|EGlib” is the D-1023 review’s wording, not a C macro. C has **no** `EGlib` (`youprop.h:112`: `Glib` is intrinsic-only). Runtime E is 0. Overclaim is the name, not the lamp arithmetic.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Glib()` | C macro as function | `youprop.h:112` `u.uprops[GLIB].intrinsic`; JS ORs leftover `.extrinsic` |
| `make_glib` | C function, retouched | `potion.c:460–467` `set_itimeout(&Glib, xtime)` |
| `itimeout` | imported C callee (local) | `potion.c:56–63`; clamp `<1 → 0`, `≥TIMEOUT → TIMEOUT` |
| `set_itimeout` | inlined in `make_glib` | `potion.c:74–78`: `&~TIMEOUT` then `\|= itimeout(val)` |
| `use_lamp` cursed spill | C call site | `apply.c:1669–1673`; remainder now `Glib()&TIMEOUT` |
| `use_towel` case 2 / wipe | C call sites | `apply.c:127–128`, `166–167` |
| `use_grease` `oldglib` | C call site | `apply.c:2633–2643` |
| `Glib_apply` | thin wrapper | now `!!Glib()`; comment still says H\|E |
| `TIMEOUT_FLAT[GLIB]='Glib'` | JS mirror | generic `nh_timeout` `--` already walks `uprops` |
| `glib_uprop` | JS leftover adapter | first write migrates flat `u.Glib`/`u.HGlib` |
| eat greasy-tin `alreadyglib` | named omit | still `(u.Glib\|0)&TIMEOUT` (`eat.js:2803`) |
| potion-dip oil spill | named omit | not this SHA |
| GLIB expiry `make_glib(0)` | named omit | whole expiry switch still silent |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunk. Apply’s `J_DIAG` is jump trajectory (pre-existing). Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of `js/apply.js` `js/potion.js` `js/timeout.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. `TIMEOUT_FLAT` is not a seed shim; it is how other maladies already mirror `uprops` into `u.H*`. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### `Glib` is intrinsic, not H\|E

C `youprop.h:106–113` maladies (`Sick`/`Stoned`/`Glib`/`Slimed`) are **intrinsic only**. There is no `#define EGlib`. Remaining timeout at every C call site is `(Glib & TIMEOUT)`.

JS `Glib()` when `uprops[GLIB]` exists returns `intrinsic | extrinsic`. Nobody in scored `js/` writes `EGlib` / `.extrinsic` for GLIB (grep: only this accessor and the leftover migrate). With E=0, `Glib()` ≡ C `Glib`. The OR is leftover-JS insurance, not a C property. Do not treat it as “C remaining is HGlib|EGlib” — that sentence in the D-log / subject copies the D-1023 review, which was guessing the usual H\|E pattern onto a malady.

Fallback when the slot is missing: `(HGlib|EGlib|Glib)`. That is how a pre-D-1052 frozen flat still feeds the first spill. After `make_glib`, the slot exists.

`glib_uprop` first-write uses `intrinsic: (u.HGlib|0) || (u.Glib|0)` — `||` not `|`. If both leftovers were nonzero and disagreed, H wins and the Glib timeout is dropped. Public traces never have glib. Thin leftover, not a live Must-fix.

`GLIB === 21` in `const.js` matches `prop.h`. `TIMEOUT === 0x00FFFFFF` matches C.

### `make_glib` — call-for-call, no RNG

C `potion.c:460–467`:

```
void make_glib(int xtime)
{
    disp.botl |= (!Glib ^ !!xtime);
    set_itimeout(&Glib, xtime);
    if (uarmg)
        update_inventory();
}
```

`set_itimeout` (`potion.c:74–78`): `*which &= ~TIMEOUT; *which |= itimeout(val)`. `itimeout` (`potion.c:56–63`): `val>=TIMEOUT → TIMEOUT`, `val<1 → 0`.

JS `potion.js:452–466`: `was = !!(p.intrinsic)`, `now = !!(xtime)`, botl if they differ (≡ `!Glib ^ !!xtime` on the pre-set intrinsic). Then `p.intrinsic = (p.intrinsic & ~TIMEOUT) | itimeout(xtime)`. Mirrors `u.HGlib = p.intrinsic` and `u.Glib = intrinsic | extrinsic`. `update_inventory` still named omit (gloves polish). **No `rn2`/`rnd`/`d` in `make_glib`.** Match.

Botl uses **intrinsic**, not `Glib()`’s H\|E. That is the C operand.

### `use_lamp` cursed spill — RNG order

C `apply.c:1669–1679`: `if (obj->cursed && !rn2(2))` then `if ((OIL_LAMP \|\| MAGIC_LAMP) && !rn2(3))` spill `make_glib((int)(Glib & TIMEOUT) + d(2,10))` else flicker / nothing. **Else** (the outer cursed test failed) `begin_burn`. Fail does not light.

JS `apply.js:5186–5199`: same `rn2(2)` then `rn2(3)` then `make_glib((Glib() & TIMEOUT) + d(2, 10))`, then `return` so the light arm is skipped. Equivalent to C `if/else`. RNG: `rn2(2)`, maybe `rn2(3)`, maybe `d(2,10)`. `d(2,10)` is two `rn2(10)+1` in `rng.js` as in C. Match.

This is **not** “Match C dispatch, callee is a stub.” `make_glib` is the real function; `Glib()` is the real remaining-timeout word (E=0).

### Towel / grease — same remainder expression

C towel case 2 (`apply.c:125–128`): `old = (Glib & TIMEOUT); make_glib((int)old + rn1(10,3))`. JS `apply.js:1935–1936`: `Glib() & TIMEOUT` then `rn1(10,3)`. RNG: `rn2(3)` for the switch, then `rn1` on case 2. Match.

C towel wipe (`apply.c:166–167`): `if (Glib) make_glib(0)` — any intrinsic bits, not TIMEOUT-only. Old JS was `(u.Glib|0) & TIMEOUT` (would skip a FROMOUTSIDE-only leftover). New `if (Glib())` is closer to C. Match for the malady.

C grease (`apply.c:2633–2643`): `oldglib = (int)(Glib & TIMEOUT)` then `+ rn1(6,10)` or `+ rn1(11,5)`. JS `apply.js:2380–2393`: same. Match.

### `nh_timeout` — the frozen-flat bug is actually closed

C `timeout.c:670–671`: for each `uprops` slot, `if ((intrinsic & TIMEOUT) && !(--intrinsic & TIMEOUT))` then the expiry switch. GLIB case (`timeout.c:935–936`): `make_glib(0)` (inventory if gloves).

Before this SHA, `make_glib` wrote **only** `u.Glib`. `GLIB` was not in `TIMEOUT_FLAT`. The generic loop skips missing `uprops[p]`. The remainder never ticked. That **was** the C-wrong.

After: `make_glib` creates `uprops[GLIB].intrinsic`, so the generic `--` runs. `TIMEOUT_FLAT[GLIB]='Glib'` copies TIMEOUT bits onto the flat; `u.HGlib = next` copies the full word. Private node 5→2 after three ticks is the right falsifier.

Expiry still does **not** call `make_glib(0)`. Botl-on-expiry and glove `update_inventory` stay inside the named “expiry switch deferred — silent clear” omit that already covers STONED/HALLUC/…. Newly ticking GLIB without that case is not a new Must-fix: timeout bits reach 0 like C; polish does not. D-log names it.

TIMEOUT_FLAT update preserves non-TIMEOUT bits of `u.Glib` and ORs `next & TIMEOUT`. With E=0 and no FROMOUTSIDE, `u.Glib` tracks the decremented intrinsic. `Glib()` reads `uprops.intrinsic`, which **is** `next`. Apply remainder uses `Glib()`, not the flat.

C decrement is `--upp->intrinsic` on the whole long, then `!(next & TIMEOUT)` to enter the switch. JS `next = intr - 1` is the same integer step. Dedicated props (CONFUSION/BLINDED/DEAF/FUMBLING/FAST/WOUNDED_LEGS) are skipped in this loop because they have their own arms; GLIB is not dedicated, so it belongs here. Putting it only on TIMEOUT_FLAT without writing `uprops` would still have frozen it.

### Sibling `eat.js` still reads the flat

C `eat.c:1639–1641`: `alreadyglib = (int)(Glib & TIMEOUT); make_glib(alreadyglib + rn1(11,5))`. JS `eat.js:2803–2804` still uses `(game.u?.Glib|0) & TIMEOUT`. After this SHA the flat is a maintained mirror, so a lamp spill then a greasy tin should see the same remainder. If something wrote only `uprops` without the mirror, eat would under-count. Not this subject; D-log already defers it. Map, not Must-fix.

## Hallucinations / overclaim

“Match C Glib remaining TIMEOUT so cursed-lamp make_glib adds d(2,10) to HGlib|EGlib, not a frozen u.Glib” is **true for the freeze and for the lamp/towel/grease remainder expression.** It is **not** true that C remaining is `HGlib|EGlib`. C remaining is `(Glib & TIMEOUT)` with `Glib` ≡ intrinsic. Stamping D-1023’s `use_lamp` Glib gap **Addressed** is fair. Hash already in the fix commit.

Cadence still **#1320** 44/44 does not prove a cursed-lamp spill. Journal admits public **unhit**. Private remainder 20→27 and `nh_timeout` 5→2 is the right check.

## Density (§2b)

One Must-fix: stop using a frozen flat as C `Glib`. Accessor + `make_glib` + the apply remainder sites + TIMEOUT_FLAT so the generic `--` can see the slot. ~50 lines JS. Right size. Not “finish maladies.” Dip/eat/expiry left named on purpose.

## Verification

Journal: green+strict PASS; apply/timeout cohort **8**/8 (seed0361 Scr **366**/366; seed4500 **1814**/1814; seed2200 **230**/230; seed0012 **308**/308; seed0009 **73**/73; seed0017 **67**/67; seed0077 **33**/33; seed0102 **25**/25). Private node remainder + tick. Path **unhit**. Fortress unchanged (cadence still **#1320**; next was @**#1325**, later measured in D-1053). Adequate: fortress plus private tick. Public traces do not spill a cursed lamp.

This review iter did not re-run sessions (not a cadence slot; Must-fix remains open so cadence stays score-only except the D-1053 SHA that already ran #1325). C read + JS hunk grep is the audit.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1023’s frozen `u.Glib` remainder is actually closed.

Named omits (map, not queue): GLIB expiry `make_glib(0)` inventory/botl; potion-dip oil spill same C expression; eat greasy-tin still reads the flat; `Glib()` leftover extrinsic OR; `glib_uprop` `||` migrate; `update_inventory` when `uarmg`.

Do not restore `(u.Glib|0)&TIMEOUT` in `use_lamp`. Do not invent `EGlib` as a worn mask. Remaining Must-fix after D-1053 is `get_obj_location` flags.

### `d(2,10)` vs a boolean `u.Glib`

C `d(2,10)` is `rnd(10)+rnd(10)` with `rnd(x)=rn2(x)+1`. First spill on a non-glib hero: remainder 0, `make_glib(0 + d(2,10))` → timeout 2..20. Second spill after *k* turns: C adds `d(2,10)` to `(Glib&TIMEOUT)` which is `max(0, first-k)`. Pre-SHA JS added `d(2,10)` to the **original** first roll every time because `nh_timeout` never saw a `uprops[GLIB]` slot. That is the bug this SHA closes. A boolean leftover `u.Glib=1` would have contributed `1&TIMEOUT=1` to the sum; after `glib_uprop` that 1 becomes the intrinsic until `make_glib` overwrites TIMEOUT bits.

`sit.js` `make_glib(rn1(101,100))` already called the shared function; it now writes the slot too. Not this SHA’s subject; it benefits from the tick.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: lamp/towel/grease now add `d`/`rn1` to a ticking `uprops[GLIB].intrinsic` remainder like C `Glib & TIMEOUT`; the H\|E name is the old review’s wording, not a C macro.
