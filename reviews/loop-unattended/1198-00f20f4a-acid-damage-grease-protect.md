# Review 1198 — 00f20f4a — trap acid_damage + grease_protect into zhitu ZT_ACID

Metadata: SHA `00f20f4a` (D-2232). Queue row `zap.c` zhitu, no corpus
block. js/ trap.js +82/−2, zap.js +14/−8.

## Intent vs deliverable

Subject promises `acid_damage` + `grease_protect` bodies wired into the
ZT_ACID arm: the arm kept the resist/damage envelope but stubbed the
erosion tail (three bare rn2 consumptions, nothing called). Diff actually
adds `export async function grease_protect`, `export async function
acid_damage` (trap.js), three gated calls in `zhitu`, import names only on
pre-existing edges. Promise kept; no scope creep.

## Inventory

New: `grease_protect(otmp, ostr, victim)`, `acid_damage(obj)`. Changed:
`zhitu` ZT_ACID tail. `sym.mjs` confirms both new exports:

```text
acid_damage      js/trap.js:3985   ASYNC — await required
grease_protect   js/trap.js:3950   ASYNC — await required
erode_armor      js/mhitm.js:1783   ASYNC — await required
```

Callee closure: `erode_armor` LIVE (same `(mdef, hurt)` shape as C),
`erode_obj` LIVE, `carried_obj` pre-existing file helper (trap.js:231 —
looser than C's `carried` macro via an invent-includes fallback, but
pre-existing, not introduced here). OMIT (named in D-log + map): hero
`inventory_resistance_check(AD_ACID)` gate; ZT_ACID
`monstseesu/monstunseesu(M_SEEN_ACID)` (pre-existing absence, header-named).

## C ↔ JS fidelity

`grease_protect` vs `trap.c:359–386`, branch-for-branch: ostr+hero Your
arm / ostr+visible-mon `Monnam's` arm / ostr-less `Yobjnam2` arm for
hero-or-visible victims / `!rn2(2)` wear-off with carried `The grease
dissolves.` + `update_inventory()` + boolean return (caller ignores it,
same as C). `update_inventory` is sync (invent.js:4075) — call is correct.

`acid_damage` vs `trap.c:4617–4654`, in C order: Null return;
victim = carried→hero else OBJ_MINVENT→ocarry else Null (matches
`mcarried`; `|| null` is defensive, behavior-equal); vismon gate;
greased → `grease_protect(obj, NULL, victim)`; scroll-not-blank → Blind-
gated fade (`Your`/`s_suffix(Monnam)`) except blank/mail, then blank to
SCR_BLANK_PAPER with spe/dknown cleared (C touches nothing else — JS
doesn't either); else `erode_obj(obj, NULL, ERODE_CORRODE,
EF_GREASE|EF_VERBOSE)`. MAIL_STRUCTURES is hard-defined (`global.h:430`)
and `objectNames` contains SCR_MAIL (generated table), so the fade-skip
matches C exactly — no lookup-miss path.

ZT_ACID gates vs `zap.c:4528–4546`: `!rn2(twoweap?3:6)` →
`acid_damage(u.uwep)`; twoweap `!rn2(3)` → `acid_damage(u.uswapwep)`;
`!rn2(6)` → `erode_armor(youmonst, ERODE_CORRODE)`. Identical draw count
and order to the stubbed code — zero RNG shift. The `_youmonst` sentinel
fallback never fires in practice (`which_armor` accepts it per worn.js).

`inventory_resistance_check` (zap.c:5706–5718) returns FALSE draw-free
when no ward is worn (`!prob → FALSE`, no `rn2(100)`), so the deferral is
unobservable on ordinary heroes. Minor doc nit, not a C-wrong: the
deferral is named in the D-log only, not yet a map clause.

## Hallucinations / overclaim

None. D-log marks the hidden check vacuous with the reason (row cited 0
blocks) and names both deferrals. No "Match C" claim exceeds the body.

## Density

Right-sized: one tight family, code + map + verify in one handoff (~96
insertions, in the 80–400 band).

## Verification

Audit re-ran the corpus claim itself:

```text
verify zhitu: baseline 00f20f4a~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled — no PASS claimed, nothing worse.
Green 2/2 + strict ×2 + cohort 7/7 + full 44/44 RNG+screen exact pasted
in D-log. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/hardcoded
coordinates. `imports.mjs --rulecheck` re-run here: Rule #2 clean
repo-wide. Import edges: `--can` ×4 ALREADY (no new module edge).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
