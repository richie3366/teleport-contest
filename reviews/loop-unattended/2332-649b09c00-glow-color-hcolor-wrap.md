# Review 2332 — 649b09c00 — glow_color hcolor wrap (both C call sites)

**SHA:** `649b09c00` — "`artifact.c` glow_color hcolor wrap (both C call sites) (D-3377)."
**Scope:** js/artifact.js +4/−3, js/objnam.js +2/−2 (one import name + one wrap each, comments). No clone deleted — no re-point sym required; sym below classifies.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: C artifact.c:2432 returns `hcolor(clr2colorname)`; JS returned the inner call directly — add the wrap at `glow_color` and its objnam twin. Diff does exactly that plus retires the two stale omit comments. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | glow_color return wrap js/artifact.js:891 | missing tail of live fn | artifact.c:2426–2433 |
| 2 | doname_glow_color return wrap js/objnam.js:2700 | same tail in structural twin | artifact.c:2432 via objnam.c:1605 caller |

`sym.mjs`: `glow_color js/artifact.js:891 sync`, `hcolor js/do_name.js:347 sync` (+4 pre-existing clones elsewhere — this SHA adds none), `clr2colorname js/artifact.js:878 sync`, `doname_glow_color` local twin js/objnam.js:2697. The hcolor import extends the existing do_name edge (ALREADY, hoisted function — cycle-safe).

## C ↔ JS fidelity

**Body** — C `:2429–2432`: `colornum = artilist[arti].acolor; colorstr = clr2colorname(colornum); return hcolor(colorstr);`. JS: `colornum = list[arti|0]?.acolor|0; return hcolor(clr2colorname(colornum));` — exact (the `?.` guard is defensive-only). **Confirm.**

**Callee `hcolor`** — C do_name.c:1460–1466: `(Hallucination || !colorpref) ? hcolors[rn2_on_display_rng(SIZE)] : colorpref`. JS do_name.js:347: `if (Hallucination() || colorpref == null) return HCOLORS[rn2_on_display_rng(len)]; return colorpref;` — exact, including the NULL-vs-empty-string distinction (`== null` mirrors the C pointer check; doc states it). LIVE, imported — not cloned. **Confirm.**

**Twin** — `doname_glow_color` applies the same canonical wrap to `DONAME_CLR2COLORNAME[colornum] || ''`. I diffed the twin table against artifact's `CLR2COLORNAME`: 16/16 identical, and both encode C `colornames[]` semantics (index 8 = NO_COLOR "no color"). The twin itself is pre-existing (structural: objnam↔artifact init cycle, rationale in the doc comment); this SHA only makes it C-exact too. `--can objnam→artifact glow_color` reports the binding hoisted-safe, so the keep-twin rationale rests on the reverse-direction TDZ claim (artifact eval reaching back into objnam init) — pre-existing architecture either way, and behavior is now C-exact at both sites, so no C-wrong attaches to this SHA. Verified C-exact CLONE. **Confirm.**

**Callers** (`--callers`): artifact.c:2491 + objnam.c:1605 (+extern decl) — match the D-log. Wiring verified: artifact.js:962 Sting_effects pline calls `glow_color(...)` (auto-wired by the in-place fix), objnam.js:3675 doname W_WEP glow calls `doname_glow_color(...)`. **Confirm.**

Quoted C (the three functions in the chain):

```c
/* artifact.c:2426–2433 */ const char *glow_color(int arti_indx) {
    int colornum = artilist[arti_indx].acolor;
    const char *colorstr = clr2colorname(colornum);
    return hcolor(colorstr); }
/* do_name.c:1460–1466 */  const char *hcolor(const char *colorpref) {
    return (Hallucination || !colorpref)
        ? hcolors[rn2_on_display_rng(SIZE(hcolors))] : colorpref; }
/* coloratt.c:337–346 */   clr2colorname: scan colornames[] for .color==clr,
    return .name; fall off the end → return (char *)0 (NULL possible).
```

Twin-table diff: artifact `CLR2COLORNAME` vs objnam `DONAME_CLR2COLORNAME` — 16/16 identical entries, and index 8 = NO_COLOR "no color" matches C `colornames[]` (which names every CLR value 0–15 + NO_COLOR, so the NULL fallthrough is unreachable for valid artilist acolors). `--can js/objnam.js js/artifact.js glow_color` verdict: "SAFE — every name requested is a hoisted function declaration" for the binding itself; the keep-twin rationale therefore rests on the reverse-direction claim (artifact's eval chain reaching back into objnam init) documented in the code comment — pre-existing architecture, behavior now C-exact at both sites either way.

| Callee | Status | Evidence |
|---|---|---|
| hcolor | LIVE | do_name.js:347 canonical (no 5th clone) |
| clr2colorname | LIVE | artifact.js:878 |
| DONAME_CLR2COLORNAME | verified CLONE | 16/16 identical table |

Corner noted and dismissed: C `clr2colorname` can return NULL (coloratt.c:337–346) while JS returns `''` (a live pref, no draw). Every valid CLR/NO_COLOR value has a `colornames[]` row, and artilist acolors are fixed valid data — the NULL path is unreachable here, and the `''` fallback predates this SHA, which strictly improves fidelity (Hallu arm was identity-before, display-RNG draw now). No queue item.

## Hallucinations / overclaim

None. "Non-Hallu is identity, so only Hallu paths change" is exactly what the C ternary gives. Display-RNG draws are positionally untagged, so the no-REACH-reach claim is coherent.

## Density

Breadth phase, §2b: 1 function made whole (ledger partial→ported, omit string deleted), own C-locus/Callers/Verify/Named sub-bullets, own `Ledger:` entry. ~8 js/ insertions, below bar; D-log states the exception (artifact.c holds nothing more Open, both callees already live). Whole-function verdict: whole.

## Verification

Re-measured (`verify glow_color --base 649b09c00~1 --reach-all`): 0 blocked + vacuous-note + smoke 24/24 REACH-OK — matches the D-log. Verbatim:

```text
verify glow_color: baseline 649b09c00~1 … 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke glow_color: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
``` D-log cohort 7/7 incl. hallu seed0383 is the relevant cohort for a Hallu-only behavioral change. Diff grep: no FORCE/DIAG/RNG-log/fastforward hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
