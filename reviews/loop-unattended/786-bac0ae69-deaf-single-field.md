# Review 786 — bac0ae69 — timeout.c / wizcmds.c Deaf single field (D-1817)

## Metadata
- Full / short hash: `bac0ae692e0a1df6c2c5d7ee7421565ecfa5077a` / `bac0ae69`
- Parent: `f144982f` (D-1816). Must-fix fortress §2 (`docs/2026-09-04-fortress-regression-42-44.md`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 09:26:50 +0200
- D-id: **D-1817**
- Stats: `js/timeout.js` +43/−21; `js/potion.js` +24/−12; `js/eat.js` +14/−7; `js/wizcmds.js` +8/−4. `js/` insertions **89** ≤250. Band **80–350**.
- Claims to close: seed4500 `#wizintrinsic` `deafness [2]` (13 screens). D-1792 wrote a dual-storage TIMEOUT that C’s single `HDeaf` does not have. Not menu hide-`[2]`. Not drown.
- JS / map: `timeout.js` `set_HDeaf` / DEAF expiry; `potion.js` `make_deaf`; `wizcmds.js` DEAF arm; `eat.js` rottenfood / faint / `Hear_again`. `c-js-map/turns.md`. Archive **Addressed:** D-1817 `bac0ae69`.

## Intent vs deliverable

Git subject promises: Match C `timeout.c` `nh_timeout` and `wizcmds.c` `wiz_intrinsic` so Deaf is one field and `#wizintrinsic` does not paint leftover `deafness [2]`.

`node scripts/csym.mjs make_deaf` → `potion.c:442–457`. `--callers make_deaf`: apply `:2298/:2300/:2375`, eat `:1805`, potion `:1450/:2003`, pray `:569`, timeout `:754`, wizcmds `:1030`. `nh_timeout` `timeout.c:587–948`, DEAF case `:752–757`. `wiz_intrinsic` `wizcmds.c:948–1096`, DEAF `:1029–1031`. `Hear_again` `eat.c:1800–1809`. `rottenfood` `eat.c:1812–1851`. `youprop.h:123–125` `HDeaf` ≡ `u.uprops[DEAF].intrinsic`; `Deaf` ≡ `HDeaf \|\| EDeaf \|\| u.uroleplay.deaf`. `Unaware` `:399`.

Dump at T:97: rottenfood duration 3; dedicated `--` only `u.HDeaf`; D-1792 `sync_timeout_flats` copied TIMEOUT=2 into `uprops[DEAF]` once then refused to overwrite; menu read stuck uprops after the flat expired. The diff **does** lockstep both stores, skip DEAF in sync, call `make_deaf` from expiry and `#wizintrinsic`, and keep rottenfood/faint/`Hear_again` in lockstep. Did **not** special-case the menu painter. Did **not** skip `flush_screen(1)`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `set_HDeaf` | CLONE (macro analogue) | C `HDeaf` is the uprops field; JS writes both |
| `make_deaf` | LIVE repaired | Unaware + both stores |
| `nh_timeout` DEAF arm | LIVE repaired | `make_deaf(0, TRUE)` |
| `wiz_intrinsic` DEAF | LIVE new arm | C `:1029`; not generic Timeout pline |
| `Hear_again` | CLONE of `make_deaf(0,FALSE)` | TIMEOUT clear + uprops if present |
| `rottenfood` / faint `incr_itimeout` | CLONE | lockstep copy after the flat |
| sick/slimed/stoned/… wiz arms | OMIT named | |
| count-prefix `DEFAULT_TIMEOUT_INCR` | OMIT named | |
| `float_vs_flight` / `rescham` / `pooleffects` | OMIT named | |

`node scripts/sym.mjs`:

```
make_deaf        js/potion.js:880   ASYNC — await required
set_HDeaf        NOT EXPORTED — 1 LOCAL in timeout.js:269 (do NOT add #2)
wiz_intrinsic    js/wizcmds.js:163   ASYNC
nh_timeout       js/timeout.js:722   ASYNC
Hear_again       js/eat.js:1947   sync
Unaware          js/eat.js:477   sync  + 7 clones — do NOT add another
```

`--can potion.js eat.js Unaware`: **ALREADY**. `--can timeout.js potion.js make_deaf`: **ALREADY**. `--can wizcmds.js potion.js make_deaf`: **SAFE** (hoisted; 87-module SCC). FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none** (seed4500 only in comments).

## C ↔ JS fidelity

**`make_deaf` (`:442–457`).** `old = HDeaf`; `Unaware` → `talk = FALSE`; `set_itimeout(&HDeaf, xtime)`; `(xtime != 0) ^ (old != 0)` then `botl` + `You(old && !Deaf ? hear again : unable)`. JS ORs both stores into `old`, writes both to `next`, `!!xtime !== !!old` is that XOR, `Deaf` includes EDeaf / uroleplay / extrinsic. **Match the live talk/TIMEOUT path.** Sticky extrinsic polish stays named.

**Expiry (`timeout.c:752–757`).** Generic `--` then `set_itimeout(&HDeaf, 1L); make_deaf(0L, TRUE); botl; if (!Deaf) stop_occupation`. JS dedicated arm (TIMEOUT_DEDICATED includes DEAF so the later uprops walk does **not** double-`--`): `set_HDeaf(hd-1)`; on expiry `set_itimeout_HDeaf(1); make_deaf(0, true); botl; stop_occupation`. **Match.** `sync_timeout_flats` `continue` on DEAF — that copy was the D-1792 freeze.

**`wiz_intrinsic` (`:1029`).** `make_deaf(newtimeout, TRUE)` — **not** default `incr_itimeout` + `Timeout for deafness set to`. JS DEAF `else if` does the same and skips the generic pline. Menu still reads `prop_old_timeout`: flat if truthy else uprops. After lockstep both are 0, so no `[2]`. Did **not** hide `[2]` in the painter.

**RNG.** `Hear_again` still `rn2(2)` then clear (C `make_deaf(0, FALSE)`). No extra draws. seed4500 RNG was already full.

**Callee closure.** `make_deaf` LIVE. `Hear_again` is a verified TIMEOUT clone, not a stub. Remaining wiz specials **OMIT named**.

## Hallucinations / overclaim

“Deaf is one field” is the C macro; JS still has a flat **plus** uprops, kept equal by `set_HDeaf`. That is the analogue, not a second TIMEOUT. Do **not** stamp “Match C count-prefix” or “Match C `Hear_again` calls `make_deaf`.” Do **not** stamp a menu hide.

## Density

§2b Must-fix: the dual-store freeze + the two C `make_deaf` callers that painted `[2]`. +89. Related eat lockstep in the same envelope. Did **not** glue remaining wiz arms. Right size.

## Verification

Hidden-proxy tools did **not** exist yet at this SHA. No corpus session is blocked on this TIMEOUT bit; the owner was public seed4500. Journal: save-oracle skip; seed4500 RNG 108275 Screen 1814; green; wizard 2200/0383/0108 + strict; seed0030 hold; full `sessions` **44/44**. D-log has no `hidden-proxy verify` bullet — **not required**.

This audit: `csym` `make_deaf` `:442–457`, `nh_timeout` `:752–757`, `wiz_intrinsic` `:1029` vs HEAD `js/potion.js:880–898`, `js/timeout.js:801–819`, `js/wizcmds.js:210–212`. Rule #2 at end-of-iter.

## Actionable C-wrongs

None in this peel. Named (map, not Must-fix): remaining wiz specials; count-prefix; `float_vs_flight`; `Hear_again` still inlines instead of `make_deaf`; other modules’ HDeaf-only clones (`music.js` `incr_itimeout_HDeaf`, `trap.js` `incr_itimeout_prop`) are **not** this SHA.

Verdict: **ACCEPT**
