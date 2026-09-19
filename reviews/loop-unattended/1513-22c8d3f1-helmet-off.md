# Review 1513 — 22c8d3f1 — do_wear.c Helmet_off (D-2554)

## Metadata

- SHA: `22c8d3f1`
- D-id: D-2554. Next index: 1513.
- Files: `js/do_wear.js` (+94−: restarted async
  `Helmet_off` + 3 call-site `await`s + 2 import extensions),
  `js/polyself.js` (2 `await`s), `js/steal.js` (1 `await`).
- C locus: `nethack-c/upstream/src/do_wear.c:517–564`
  (`Helmet_off`, 48 L; `csym.mjs` range, cited as that
  range). Inline reference: `adj_abon` helm half
  `:3328–3335`; message consts `:9–13`.

## Intent vs deliverable

Subject promises: the full helm-doff switch in C order,
async for the two awaiting arms, all callers awaited. Diff
delivers exactly that. Promise matches deliverable. No RNG
in C; none added. Coverage gap, 0 blocked — honestly
stated.

## Inventory

- Changed: `Helmet_off` (sync → async, full restart),
  6 call-site `await`s (3 do_wear, 2 polyself, 1 steal).
- Callees: `change_luck` LIVE (`js/attrib.js:687`),
  `makeknown` LIVE (`js/invent.js:4012`), `see_monsters`
  LIVE (`js/display.js:5271`), `uchangealign` LIVE async
  (`js/attrib.js:768`, awaited), `impossible` LIVE async
  (`js/display.js:7947`, awaited), `setworn` LIVE
  (`js/do_wear.js:605`) via the file-local `clear_worn`
  trivial alias (Armor_off precedent — verified CLONE,
  not a divergence). All 12 helm otyp consts + `W_ARMH` +
  role consts resolve via imports (checked each at this
  SHA). `A_CG_HELM_OFF = 2` verified against
  `align.h:67`; `A_CURRENT = 0` is the `ualignbase[0]`
  index.
- No deleted symbols → no clone→import audit beyond the
  `clear_worn` alias check above.

## C ↔ JS fidelity

Switch vs C `:517–564`, arm by arm:

- `:521` mask clear first (covers the telepathy early
  return) ✓.
- FEDORA/archaeologist luck ✓; five plain helms break ✓
  (case list matches C `:528–533` exactly).
- DUNCE_CAP `disp.botl` → `game.flags.botl` (Helmet_on
  precedent) ✓.
- CORNUTHAUM: `!cancelled_don` gate, `ABON(A_CHA) +=
  wizard ? -1 : 1`, botl ✓ (`u.abon.a[]` is the Helmet_on
  shape).
- TELEPATHY/CAUTION: `setworn(0)` → `see_monsters` →
  early return skipping the `cancelled_don` reset ✓.
- BRILLIANCE: `adj_abon(uarmh, -spe)` inlined to the helm
  half only — verified against C `:3328–3335` (`if
  (delta) { makeknown; INT += delta; WIS += delta; }
  botl = TRUE`), gated by `!cancelled_don` like the call
  site. The gloves half is correctly NOT inlined (separate
  arm, `Gloves_on` precedent). ✓
- OPPOSITE: `uchangealign(ualignbase[A_CURRENT],
  A_CG_HELM_OFF)`; JS reads `ualignbase?.current ??
  ualign?.type ?? 0` (the pray.js shape — disclosed) with
  the idempotent-tail comment matching C's
  dropped-or-destroyed note. ✓
- default: `impossible(unknown_type, c_helmet, otyp)` →
  `` `Unknown type of helmet (${otyp})` `` — verified
  against C `:9–13` (`"Unknown type of %s (%d)"` +
  `"helmet"`). Exact.
- Tail `setworn(0)` + `cancelled_don = FALSE` ✓.
- Null helm: C dereferences `uarmh` (unreachable in C —
  every C caller holds a helm); JS keeps the old graceful
  clear. Disclosed named exception, preserves the old
  no-throw path. Not a divergence from reachable C.
- Callers: all 6 C sites map to awaited JS sites
  (`:1983` afternmv unwear, `:2866` selective doff,
  `:3162` wornarm_destroyed, `polyself.c:1243/1269`,
  `steal.c:256`); grep at this SHA shows all 7 JS call
  sites (incl. the def) awaited, zero floating calls.
  New imports join existing edges only.

## Hallucinations / overclaim

None. The D-log's caller list and arm map both check out;
the `adj_abon` "helm half exactly" claim is verified
against C here, not taken on trust.

## Density

One 48-line C function + caller awaits, three files, ~100
insertions. Right-sized per §2b (restart beats patching).

## Verification

- D-log: `verify.mjs --fn Helmet_off` → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify Helmet_off --base
  22c8d3f1~1 --reach-all` → 0 blocked both trees (vacuous,
  honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates.

## Actionable C-wrongs

None. Every arm, both async callees, the inlined half, the
message format, and all six caller wirings check out
against pinned C; the two named exceptions (null-helm
grace, `adj_abon` gloves half) are map-noted with owners.

Verdict: **ACCEPT**
