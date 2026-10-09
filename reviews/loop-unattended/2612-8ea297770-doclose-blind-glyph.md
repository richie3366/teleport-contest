# Review 2612 — 8ea297770 — doclose Blind learned-glyph half (D-3744)

Metadata. SHA `8ea297770` (2026-10-09), D-3744, parent `4b3c063ec`.
js diff: `js/lock.js` +13/−6 (capture remembered glyph before
feel_location, OR into res; hoist loc/portcullis to C order) +
`scripts/doclose-blind-glyph-learned.test.mjs` (new, 1 it).
Ledger: `doclose` ported (D-3744 appended). Works its HEAD's
cliffs head (`monmove.c` distfleeck, 3 blocked: 95345, 95303,
95246 — verified in the parent queue).

## Intent vs deliverable

Promise (subject + D-log): 95345 diverges at distfleeck
monmove.c:538 (`rn2(5)=0` vs `rn2(25)=10 @ doengrave`) because
the blind close-west at slice 848 cost C a turn (felt cell
(41,16) ROOM mapped memory) while JS's lastseentyp-only
comparison saw no change (25→25) and consumed no turn — the
jsEntry is a flat-shift artifact (both sides engrave identically
at slice/step 870). Ship C's glyph half. Claimed: distfleeck 0
PASS + 1 moved (95345 → bottlename@962) + 2 unchanged
(different writers) + 0 worse, REACH-OK, test 1/1, full 44/44
forced.

Diff actually adds exactly the glyph capture + OR + hoist.
Promise and diff match. No new import.

## Inventory

Changed JS function (1):

- `doclose` — `js/lock.js:1130–~1180` (Blind arm :1157–1171).
  C: `lock.c` doclose `:956–1051` (`csym` range); door/
  portcullis `:995–996`; Blind arm `:997–1005`
  (`oldglyph = door->glyph; oldlastseentyp =
  update_mapseen_for; feel_location; if (glyph changed ||
  lastseentyp changed) res = ECMD_TIME`).

## C ↔ JS fidelity

**Order exact.** JS: capture `loc?.remembered_glyph?.glyph` →
`update_mapseen_for` → `feel_location` → compare — C's
`:998–1004` statement for statement. The `loc`/`portcullis`
hoist (pure reads: `game.level.at`, `is_drawbridge_wall`)
matches C `:995–996` before the Blind `if`.

**Memory model** (re-checked, not trusted): `remembered_glyph`
writes store integer glyph ids from cmap/obj-domain suppliers
(`cmap_to_glyph`, `trap_glyph`, `mapappearance` cmap — verified
at display.js:2118/:2342/:3990); `cmap_to_glyph` returns
`GLYPH_CMAP_STONE_OFF` for S_stone and cmap offsets or
`NO_GLYPH = MAX_GLYPH` otherwise (verified) — never 0, never
undefined. C virgin cells are zero-init; per display.h:497–514
(verified) `GLYPH_MON_OFF = 0` is monster-only, so a 0-valued
glyph is unreachable via feel_location's terrain mapping. The
four comparison cases all agree: absent→absent false ≡ C 0→0;
absent→id true ≡ C 0→id; id→id false; id→id′ true. The measured
probe (undefined→3993, ROOM cmap) is exactly the absent→id
case. C's comparison is value equality; JS `!==` on
number-vs-undefined/number is equivalent here.

**Callees.** `feel_location` LIVE (display.js:5655 sync, C
`:745–909`); `update_mapseen_for` pre-existing call, unchanged.
Both already imported (lock.js:7/:53) — no new edge. C has no
code call sites (command dispatch); the arm sits in the shared
JS body so every close inherits it — no wiring needed.

**Named omissions** (in-map): doopen_indir + pick_lock Blind
glyph-halves — same lastseentyp-only idiom, explicitly
unmeasured, each needing its own proving session. Correctly
not ported here.

## Hallucinations / overclaim

None. The doengrave jsEntry is proven artifact (both sides draw
it at slice/step 870), not hand-waved. Diff grep: zero hits
across js + scripts hunks. The new test is synthetic (built
blind-close scenario, `initRng(95345)` seeds only the test
harness) — no seed/step/coordinate gates in scored code. Rule
#2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is distfleeck (3 blocked, RNG lost
72674, SYMPTOM tag — writer port, owner not re-ported, tag
honored); this commit ships the measured writer arm whole,
names the sibling halves, and moves the probe. The 2 unchanged
have recorded different writers (Next bullet: set_apparxy
displ inputs; m_move appr gate). One cliff, one C locus, no
bundling. Correct gates (green/strict/cohort + forced full
44/44 — the blind-close turn change is reach-invisible since
doclose draws RNG only on D_ISOPEN, so forcing full was right).

## Verification

D-log Verify: test 1/1 (failed pre-fix); `verify.mjs --fn
doclose,distfleeck` → doclose note (writer, none blocked —
honest); distfleeck 0 PASS + 1 moved + 2 unchanged + 0 worse →
PROGRESS; reach 1/1 + 80/80 → REACH-OK; green/strict/cohort
PASS; full 44/44.

Re-measured by this audit (`verify doclose,distfleeck --base
8ea297770~1 --reach-all`):

```text
verify distfleeck: 0 PASS, 1 moved past, 2 unchanged, 0 worse → PROGRESS
reach distfleeck: 954 baseline-PASS session(s) reach it (954 run, 425.0s): 953 PASS, 1 regressed → REACH-REGRESSION
```

95345 → bottlename@962 lands exactly as claimed; the 2
unchanged are the named sessions at the named steps. The 1
"regressed" (`ind-Tourist-415276941-d71ffc02`, `error:
"worker: "` — empty detail, a worker-protocol failure, not a
JS error) does NOT reproduce: direct replay on HEAD code
passes fully (RNG 2684/2684, Screen 91/91, 288 ms), and the
same HEAD code passed the 986- and 997-session reach-alls
above. Verdict: harness flake under 954-way parallel load,
not a port regression — the final full rescore below
arbitrates it. No vacuous check (row cited 3; all 3 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
