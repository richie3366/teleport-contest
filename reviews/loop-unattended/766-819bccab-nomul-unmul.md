# Review 766 — 819bccab — hack.c nomul/unmul usleep=0 (D-1797)

## Metadata
- Full / short hash: `819bccab1c5454007d6d812c44324b6e8b03fa54` / `819bccab`
- Parent: `45e90f35` (audit 755–765). Closes Must-fix from review **764** (D-1795 QUALITY-RISK).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 01:56:19 +0200
- D-id: **D-1797**
- Stats: `js/hack.js` **+8/−0**. Band **80–350** (Must-fix; C bodies are 14+33 lines).
- Claims to close: review 764 Actionable #1 — `nomul`/`unmul` `u.usleep = 0` and `nomul` `u.uinvulnerable = FALSE`. Not `mattacku`. Not a seed0030 peel.
- JS / map: `js/hack.js` `nomul` / `unmul`. `c-js-map/turns.md`. Archive **Addressed:** D-1797 `819bccab`. Review 764 already stamped.

## Intent vs deliverable

Git subject promises: Match C `hack.c` `nomul`/`unmul` so `usleep=0` and `nomul` `uinvulnerable=FALSE` actually run, instead of leaving those fields sticky after sleep.

`node scripts/csym.mjs nomul` → `hack.c:4160–4173`. `unmul` `:4176–4208`. `fall_asleep` `timeout.c:950–974`. `--callers nomul`: 118 sites including `mhitu.c:513`. `--callers unmul`: `allmain.c:383`, `mhitu.c:703`, `trap.c:5146`, plus wear/eat/poly/vault.

Parent: `nomul` botl/`multi`/`end_running`/`_cmdq_canned` only; `unmul` pline/`afternmv` only; sole `usleep =` write was `fall_asleep`. The diff **does** assign those two fields in `nomul` before replacing `multi`, and `usleep = 0` in `unmul` after clearing `nomovemsg`. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `nomul` | LIVE repaired | `:4166–4167` now run |
| `unmul` | LIVE repaired | `:4197` now runs; Upolyd form named |
| `fall_asleep` | LIVE (unchanged) | restamps `usleep = moves` after `nomul` |
| `end_running` | LIVE callee | already in `hack.js` (D-1791) |
| `cmdq_clear(CQ_CANNED)` | LIVE | `_cmdq_canned = []` |

`node scripts/sym.mjs` (no clone → import in this SHA):

```
nomul            js/hack.js:976   sync
unmul            js/hack.js:1034   ASYNC — await required
fall_asleep      js/hack.js:1020   sync
end_running      js/hack.js:950   sync
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**. No new import edge.

## C ↔ JS fidelity

**`nomul` (`:4160–4173`).** Early-return `multi < nval` **before** the clears — asleep `multi = -N` then `nomul(0)` from `mattacku:513` still keeps the stamp so C’s sleep arm can fire. Then `botl |= (multi >= 0)`, **`uinvulnerable = FALSE`**, **`usleep = 0`**, then `multi = nval`. `nval == 0` clears `multi_reason` (JS also clears `nomovemsg` — pre-existing, named). `end_running(TRUE)` then canned-queue clear. **Match the Must-fix assignments and branch order.** No RNG in this function.

**`unmul` (`:4176–4208`).** `botl`, `multi = 0`, override / default `You can move again.`, skip pline on empty string (D-0695), then **`usleep = 0`**, `multi_reason`, `afternmv`. JS places the clear after `nomovemsg = null`, before `afternmv` — same relative order as C `:4196–4197`. **Match.**

**`fall_asleep` (`:950–974`).** `nomul(how_long)` now zeros `usleep`; C then writes `u.usleep = svm.moves`. JS still restamps `game.u.usleep = game.moves` after `nomul`. **Match.** `#if 0` Deaf/`Hear_again` stays compiled out.

**Callee closure.** LIVE: `end_running`, canned clear, `pline`, `afternmv`. OMIT named: Upolyd `"You survived that "` `:4192–4194`; `multireasonbuf`. STUB in the live Must-fix arm: **none**.

## Hallucinations / overclaim

Subject is **true**. Do **not** stamp “seed0030 first token is `usleep`.” D-log: seg0 RNG OK 14300; first all-segments miss is C seg4 `randomize_gem_colors` vs JS still in seg3 combat. Do **not** delete the D-1795 `mattacku` sleep `rn2(10)` arm — it is C, now gated by a real `usleep`. Do **not** add trailing `confdir` in `getdir`. The extra `nomovemsg = null` on JS `nomul(0)` is pre-existing, not this peel.

## Density

Must-fix one item, alone. +8. C is that small. Did **not** glue Open `dochug`. Right size.

## Verification

D-log: green + strict; cohort 9/9; save-oracle skip (untagged `hack.c:nomul`). Public `seed0030` still 39912/105529 at this SHA — expected; not a fortress claim. This audit: `csym` `:4160–4173` / `:4176–4208` / `fall_asleep:950–974` vs HEAD `js/hack.js:976–1058`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: `unmul` Upolyd `"You survived that "` form (`:4192–4194`); `multireasonbuf`; JS `nomul(0)` also clears `nomovemsg` (C only `multi_reason`).

Verdict: **ACCEPT-WITH-DEBT**
