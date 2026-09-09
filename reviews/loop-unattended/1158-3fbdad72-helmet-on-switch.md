# Review 1158 — 3fbdad72 — Helmet_on helm switch

Subject promises: full `do_wear.c` Helmet_on switch in C order, incl. dunce-cap glow/curse + sitting arms (D-2192, queue owner `accessory_or_armor_on`, 1 session PASS).
Diff actually adds: `Helmet_on` rewrite in `js/do_wear.js` (+~77/−~12: null guard, otyp switch, BRILLIANCE inline, CORNUTHAUM, DUNCE) + canonical `set_bknown` in `js/mkobj.js` (+11). Import widenings only, no new edges.

## Intent vs deliverable

Promise matches diff. The mechanism is documented from the C recording, not inferred: step 58 dressing+More (key `n`),
step 59 «The conical hat glows black for a moment.--More--», step 60 «You feel like sitting in a corner.» — three plines in
one end-of-turn, so the first two page. The port covers exactly the exercised arms plus the full switch envelope.

## Diff outline (`js/do_wear.js`)

Null guard (`if (!h) { find_ac(); return 0; }`, C-unreachable, old no-op kept) → `switch (otyp)`:
FEDORA luck / six plain-helm `break` / CAUTION `see_monsters()` / BRILLIANCE inline `adj_abon` helm half / CORNUTHAUM CHA±1 /
DUNCE glow-or-vibrate + `curse` + bknown triple + botl + Hallu-vs-`You_feel` → shared known tail (`:509–513`) in C position.
`js/mkobj.js` gains the canonical `set_bknown` in its C home:

```js
export function set_bknown(obj, onoff) {
    const val = (onoff | 0) ? 1 : 0;
    if (!obj || (obj.bknown | 0) === val) return;
    obj.bknown = val;
    if (obj.where === OBJ_INVENT && (game.moves | 0) > 1) update_inventory();
}
```

## Inventory

- `Helmet_on` (`js/do_wear.js`): switch over 11 helm otypes + shared known tail.
- `set_bknown` (`js/mkobj.js:529`): new canonical export in its C home.

## C ↔ JS fidelity

C `do_wear.c:433–515` (`node scripts/csym.mjs Helmet_on`), arm by arm:

| arm | C | JS |
|-----|---|----|
| FEDORA | `Role_if(ARCHEOLOGIST)→change_luck(1)` | `urole.mnum` check, equivalent (redundant `h &&` harmless) |
| 6 plain helms | `break` | `break` ✓ |
| CAUTION | `see_monsters()` | live `js/display.js:5140` ✓ |
| BRILLIANCE | `adj_abon(uarmh, spe)` | inlines only the helm half of C `do_wear.c:3318–3336` (`if (delta) { makeknown; ABON INT/WIS += delta } botl`), exact under this call site (`h≡u.uarmh`, otyp matched; `(spe\|0)` truthiness ≡ `if (delta)`) ✓ |
| CORNUTHAUM | `ABON CHA ±1` by Wizard, botl, makeknown | ✓ verbatim |
| OPPOSITE_ALIGN | `uchangealign` + FALLTHROUGH | map-named OMIT (unported; wears take the known tail, net-known identical) |
| DUNCE | `!cursed` → Blind-vibrate vs glow-`hcolor(NH_BLACK)`, `curse`, Blind→`set_bknown(0)` / Cleric→`set_bknown(1)` / bknown→`update_inventory`, botl, Hallu→"My brain hurts!" vs ACURR-vs-base `You_feel` | ✓ all arms |
| tail | `known=1` + `update_inventory` | ✓ in C position |

`set_bknown` ports `mkobj.c:1863–1873` verbatim (change-gated, `OBJ_INVENT && moves>1` update gate) ✓.
`hcolor('black')` uses the string-name idiom (`js/do.js:652` precedent) for C `hcolor(NH_BLACK)` ✓.
`PM_WIZARD` resolves via the `monsters.js:45–67` re-export block (confirmed by read); `PM_CLERIC` is the live
`generated/monsters_data.js:26` const; `curse` is the same-file-edge LIVE (`mkobj.js:501`); `--can mkobj.js invent.js` →
ALREADY (existing edge widened). `Blind()` is the pre-existing file-local clone (`do_wear.js:1276`, `(H||E)&&!B` house
shape) — verified CLONE, not introduced here. One nit, not a C-wrong: C's `default: impossible(unknown_type, …)` has no JS
counterpart — unreachable for valid otypes, no RNG/message surface, not queueable.

## Hallucinations / overclaim

None. "Match C" is earned per arm; the one deferred arm is named in the map in-commit, not silently stubbed.

## Density

~90 JS lines for an 83-line C function + 11-line helper — textbook §2b single-cluster size.

## Verification

D-log claims `verify --fn accessory_or_armor_on` 1 PASS (Tourist-92144 7579/7579 RNG + 109/109) + green/strict/cohort. Re-measured:

```text
verify accessory_or_armor_on: baseline 3fbdad72~1 (scoreboard at 74944545) — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-genesis-Tourist-92144: PASS
verify accessory_or_armor_on: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match — a genuine full PASS (RNG + screens). Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate gates.
Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
