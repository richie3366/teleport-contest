# Review 1309 — b52af340 — uchangealign + cross-align altar offering (D-2343)

Metadata: SHA `b52af340`, D-2343, C-fidelity residual (queue row cited 0 blocks; turns.md:399 dosacrifice family). Method: full `js/` hunks read (`attrib.js` +79, `pray.js` +100ish); C `uchangealign attrib.c:1319-1362` + `offer_different_alignment_altar pray.c:1630-1695` full bodies (via `csym.mjs`), `adjalign :1298-1316`, `A_CG_* align.h:63-68`, `ALIGNLIM align.h:17`, `on_shrine pray.c:106`; `sym.mjs` on `uchangealign`/`retouch_equipment`/`summon_furies`/`on_shrine`; `imports.mjs --can` ×5 (all ALREADY); added-lines banned grep (0 hits); `--rulecheck` clean (iteration run); `hidden-proxy verify offer_different_alignment_altar --base b52af340~1` re-run.

## Intent vs deliverable

Subject promises `uchangealign` (CONVERT + helm on/off) and the cross-align `offer_corpse` arm (convert / reject / consume+glow / decrease), wired in replacing the bare return. Diff delivers both functions plus 9 import names, all in C order. Promise kept exactly.

## Inventory

- `attrib.js`: exported async `uchangealign` (single def); imports `Is_astralevel`/`A_CG_*`/`LL_ALIGNMENT` (const), `Hallucination` (display), `aligns` (roles), `make_confused` (potion), `livelog_printf` (pline) — all `--can` ALREADY, no new edges.
- `pray.js`: file-local `offer_different_alignment_altar` (C `staticfn` ⇒ file-local, matches `offer_corpse` convention); imports `uchangealign`/`Align2amask`/`A_CG_CONVERT` + `findpriest`/`temple_occupied`/`p_coaligned` (all ALREADY — the "new edge (SAFE)" message is imprecise in the safe direction).
- Named: `angry_priest` (own Open row, map-cited, wired next commit D-2344); `summon_furies` + `retouch_equipment` (both NOT FOUND in `js/`, code comments + D-log cite C loci).

## C ↔ JS fidelity

`uchangealign` branch-for-branch vs `:1319-1362`: ublessed=0 + botl-before-message ✓; CONVERT livelog `aligns[1-newalign].adj` (roles order [lawful, neutral, chaotic] matches the `1-` indexing) ✓; `ualignbase.current` + helm-block (`!uarmh || otyp !== HELM…`) ✓; sudden-pline ✓; HELM_ON `adjalign(-7)` + oscillate + `make_confused(rn1(2,3),false)` + livelog ✓ with the summon arm correctly reduced to its RNG-preserving condition (`Is_astralevel || rn2(50) < abuse` still draws — abuse ≥ 0 invariantly via `adjalign :1302-1310`, so the unsigned compare is equivalent); HELM_OFF ✓; record-wipe tail ✓.

`offer_different_alignment_altar` vs `:1630-1695`: angry/Reject gates + ORDER (strong-feeling → consume → allegiance → uchangealign → luck−3 → blesscnt+300; ugangr+3 → adjalign−5 → rejects → godvoice → luck−5 → `adjattrib(WIS,−2,TRUE)` → `!Inhell && angrygods`) ✓; `rn2(8+ulevel)>5` glow arm (`Align2amask(ualign.type)` + shrine bit + newsym + Blind-gated `hcolor` white/black/gray — `type?black:gray` neutral-gray matched) ✓; `rnl>6 && record>0 && rnd(record) > trunc(3*ALIGNLIM()/4)` vs `7/8` gates ✓ (`ALIGNLIM()` ≡ `10+trunc(moves/200)`, positive-only so `Math.trunc` ≡ C long division); `A_CG_*` 0/1/2 ≡ `align.h:63-68` ✓.

Callee closure: `on_shrine` is a PRE-EXISTING local clone (C is a pure altarmask macro, `pray.c:106`; the JS `?? loc.flags` fallback predates this commit and never fires on altar squares, which always carry altarmask) — CLONE, no new divergence. `angry_priest` is OMIT (map-cited, own row, lands in D-2344 — confirmed in this audit's SHA list), not STUB. `summon_minion`/`godvoice`/`consume_offering`/`a_gname`/`u_gname` were already imported (no new names beyond the diff's hunks).

Integer semantics confirmed while auditing:
- `ALIGNLIM` is a C macro (`align.h:17`, `10L + moves/200L`, truncation toward zero); JS `10 + Math.trunc(moves/200)` with `Math.trunc(3*ALIGNLIM()/4)` is identical on positive values — both summon gates exact.
- Helm-on `(unsigned)rn2(50) < abuse` vs JS signed compare: equivalent under the abuse ≥ 0 invariant (`adjalign :1302-1310` only grows abuse via `abuse - n`, n < 0; no decrement path).
- The `rn2(50)` draw is preserved in the condition on both sides even though `summon_furies` itself is omitted.
- `A_CG_CONVERT/HELM_ON/HELM_OFF` 0/1/2 ≡ `align.h:63-68` (the value lives in the enum, not a `#define`).
- Map evidence in this commit (`turns.md:399-400`): `offer_different_alignment_altar` retired to D-2343-live while `angry_priest` explicitly "stays named, own Open row" — the OMIT is map-recorded with C citations, not just a code comment.
- Convert-path inner guard (`baseCur === baseOrig && altaralign !== A_NONE`) matches C's `ualignbase[A_CURRENT] == ualignbase[A_ORIGINAL] && altaralign != A_NONE`; the `?? atype` fallbacks only fire when `ualignbase` is missing (init'd at game start per `u_init.js:1963`), identical whenever it exists.

## Hallucinations / overclaim

None material. "CONVERT draws nothing — probed" consistent with both bodies (no RNG call in either CONVERT arm).

## Density

One C envelope (conversion + its caller) across two already-linked files. Good.

## Verification

D-log tail PASS with the hidden bullet honestly vacuous. Re-measured:

```text
verify offer_different_alignment_altar: baseline b52af340~1 — 0 session(s) blocked (0 at baseline, 0 working)
```

Matches (vacuous note, no `--base` owed). Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
