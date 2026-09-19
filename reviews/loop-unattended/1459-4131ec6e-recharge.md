# Review 1459 — 4131ec6e — `read.c` recharge whole-body port (D-2500)

Metadata: SHA `4131ec6e`, `js/read.js` only (+88/−69). C `read.c:727–1008`
(`recharge`, 282 lines) + staticfns `stripspe :651–664`, `p_glow1–3
:667–685`. D-log: D-2500.

## Intent vs deliverable

Promise: restart in C order with live namers, static Ring/shop imports,
awaited BUC. Diff delivers: `p_glow3` for the `lim==1` arm, live
`Yobjnam2`/`Yname2`/`Tobjnam`/`otense` replacing two local clones,
dynamic `await import()` → static imports, `You()` for not_chargable.
Promise = deliverable.

## Inventory

- Changed: `stripspe`/`p_glow1`/`p_glow2`/`p_glow3` to C-exact shapes;
  `recharge` wand/ring/tool arms re-commented in C order; import lines
  extended (`useup as useup_live`, `Ring_gone/Ring_off/Ring_on`,
  `end_burn`).
- Deleted: local clones `Yobjnam2_read`, `Tobjnam_read` (clone removal —
  the right direction per the anti-patterns).
- `sym.mjs` (required): no deleted/re-pointed symbols. `Yobjnam2`
  objnam.js:2646 sync, `Yname2` objnam.js:2614 sync, `otense`
  objnam.js:2332 sync — all LIVE. `useup` live is invent.js:4133 sync;
  read.js:256 keeps its pre-existing local clone (named in D-log, used
  by other read fns — not added here, not this arm).

## C ↔ JS fidelity

Branch-by-branch against `:727–1008`:

- Wand arm: `lim` compute, spe==-1 uncancel, `n*n*n > rn2(343)`
  explode with `rnd(lim)`, `recharged++`, cursed → stripspe else
  `rn1(5, lim-4)`/`rnd(n)`, wishing cap-3 explode — carried (pre-existing
  body); the fix: `lim == 1 → p_glow3(obj, NH_BLUE)` ≡ C (old code faked
  it via `p_glow2(obj, NH_BLUE, true)` with an invented `feeble` param —
  C `p_glow2` takes only `(otmp, color)`). New `p_glow2` ≡
  `"%s%s%s for a moment."` and `p_glow3` ≡ `"%s feebly%s%s ..."` ✓
  verbatim. `stripspe` ≡ `:651–664` incl. the order-matters comment ✓.
- Ring arm: `s = blessed ? rnd(3) : cursed ? -rnd(2) : 1` ✓; destroy gate
  on current state (`spe > rn2(7) || spe <= -5`) ✓;
  `Yobjnam2(pulsate) + otense(explode)` (old code used
  `vtense(xname)` — wrong namer, fixed) ✓; `Ring_gone` when on ✓;
  `s = rnd(3*|spe|)`, **live** `useup_live` (invent — old code dynamically
  imported eat.js's copy) ✓; `losehp` ✓; spin line via live `Yname2` ✓;
  `costly_alteration(COST_DECHNT)` when s<0 ✓; `Ring_off`, `spe += s`
  while off, `setworn(mask)`, `Ring_on` ✓; `s>0 && unpaid → alter_cost`
  ✓. RNG (`rnd(3)`, `-rnd(2)`, `rn2(7)`, `rnd(3*|spe|)`) call-for-call.
- Tool arms: marker/blessed/uncursed gates, lamp/lantern age, crystal
  ball curse/bless/uncurse/max, `not_chargable: You("have a feeling of
  loss.")` (`:1002`) — the old `pline('You have a feeling...')` printed
  "You You have..." shape? No — old text already contained "You"; the new
  `You()` matches C's `You()` call exactly ✓. `cap_spe(obj)` tail
  (read.js:1002) ✓.
- Cycle: `--can` on all four pairs (do_wear, shk, timeout, invent) →
  ALREADY, no new edge ✓ (past `imports.mjs --can` output pasted above).

Callee closure: all LIVE or C-matched locals (`Blind_read` youprop
idiom); named omits (`useup`/`Yname2_read` locals elsewhere in read.js,
`#if 0` shop-price arm) carry cites. No STUB in a live arm. `curse`/
`bless`/`uncurse` newly awaited — strictly more correct sequencing.

## Hallucinations / overclaim

None. "No new module edges" verified ALREADY ×4 here.

## Density

One 282-line C function, one file, +88/−69 net. Right-sized.

## Verification

Re-ran here (`--base 4131ec6e~1 --reach-all`) — **genuine reach**:

```text
reach recharge: 3 baseline-PASS session(s) reach it (3 run): 3 PASS, 0 regressed → REACH-OK
```

3 reaching sessions, all still PASS — this is the non-vacuous case, and
it confirms the D-log's PASS claim. Diff grep: no FORCE/DIAG/`getRngLog`/
seed/fastforward/coords.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
