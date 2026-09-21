# Review 1682 — f6f4a0b26 — `dokick.c` dokick whole body (D-2723)

Metadata: commit `f6f4a0b26`, D-2723, `js/dokick.js` only (+130/−36). Coverage row (PARTIAL → live; 0 corpus blocks — stated). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body re-port in C order — boots-99, swallow `rn2(3)`, pit side-kick, Levitation brace, oldglyph + DEADMONSTER restore / `map_invisible` / cwt recoil, `(void) unmap_invisible`, `is_pool` + `hliquid`, Levitation-gated object kick + air `hurtle`, `kick_nondoor` return-through. The diff delivers every arm. Promise matches deliverable.

## Inventory

Changed JS: `dokick` (`js/dokick.js:1572`) — boots line, three pre-`mtmp` arms, monster-arm glyph/recoil block, pool/object/door tails; import lines extended (`glyph_at`, `glyph_is_invisible_id`, `show_glyph_cell`, `digests`, `hliquid`, `engulfing_u`). No deleted symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (all newly imported names):

```text
digests          js/mhitu.js:1117   sync
hliquid          js/do_name.js:373   sync
kick_nondoor     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dokick.js:530
```

`--can dokick.js→mhitu.js digests` (run this iteration): `ALREADY: dokick.js already statically imports mhitu.js. No new edge needed.` — better than the message's "new edge / IN-SCC" phrasing: no new module edge at all, just a new name on an existing one. (The `mhitm.js:5136` `digests` twin is pre-existing; the import uses the C-locus `mhitu.js:1117` one, whose body is the C predicate verbatim.) `kick_nondoor` file-local is the faithful shape — C declares it `staticfn` in `dokick.c`. All other names join pre-existing edges. No STUB in any arm; `digests` body read (AT_ENGL+AD_DGST scan ✓).

## C ↔ JS fidelity

C locus read: `dokick dokick.c:1256–1470` (csym range; message cites `:1257–1470`, same body). Branch-by-branch against the JS hunks:

- boots-99: `uarmf && otyp==KICKING_BOOTS → 99 else trunc((STR+DEX+CON)/3)` ✓ (C integer `/` = truncation ✓).
- swallow `rn2(3)`: case 0 cant-move ✓; case 1 `digests(ustuck.data)` → burp+break else FALLTHROUGH ✓; default feeble ✓; `return ECMD_TIME` (`return true` = house ECMD_TIME) ✓.
- pit side-kick (`utrap && TT_PIT`, message, return) ✓; Levitation brace (`xx=ux-dx`, `!IS_OBSTRUCTED && !IS_DOOR && (!Is_airlevel || !OBJ_AT)` → brace-fail + `return false` = ECMD_OK) ✓.
- `mtmp` + `oldglyph=glyph_at` + `maybe_kick_monster` return-through ✓ (the added `oldmem` snapshot is purely additive).
- DEADMONSTER `(mhp|0)<1` (monst.h:214 ✓): `glyph != oldglyph && invisible(glyph)` → restore ✓, rendered through the JS hero-memory model (`remembered_glyph` + `show_glyph_cell` with the recorded paint + oldglyph) with the rationale cited inline. Else-arm (`!canspotmon && mx==x && my==y && !invisible && !engulfing` → `map_invisible`) ✓ exact.
- recoil: `mdat` saved pre-kill ✓; `(Is_airlevel || Levitation) && move` ✓; `range = cwt + (weight_cap + inv_weight)`, `<1→1`, `trunc(3*mdat.cwt/range)`, `<1→1`, `hurtle(-dx,-dy,range,TRUE)` ✓ (C truncating `/` ✓).
- `(void) unmap_invisible` discarded ✓; pool XOR (`!==` on booleans = C `^`) with `is_pool(x,y)` — C-exact, an improvement over the old `IS_POOL(loc.typ)` macro read ✓; `hliquid(water/lava)` ✓ (old code skipped hallucination); OBJ_AT Levitation gate with boulder exception ✓; airlevel `hurtle(...,1,TRUE)` ✓; doors last with `kick_nondoor` return-through — the old code dropped its ECMD value (`await; return true`), the new `return await` restores C's `return kick_nondoor(...)` ✓ a real second fix.
- RNG: one new `rn2(3)` in C position; no other draw added/removed/reordered.

Known corner (disclosed in the commit "Named" line, see Actionable §1): the restore additionally requires `oldmem` (a hero-memory record); C restores unconditionally.

## Hallucinations / overclaim

None material. Two imprecisions, both in the conservative direction: (1) the message says "`digests` new edge — IN-SCC" while `--can` says ALREADY — no new edge exists; (2) the single FORCE/DIAG grep hit is the message's own "No DIAG/FORCE" disclaimer. No seed/step/coordinate logic in the hunks.

## Density

Breadth-phase whole-function restart (213-line C body), one module, no new edges. Right-sized; the `kick_nondoor` return-through is same-function contract completion, not scope creep.

## Verification

Re-measured per-SHA re-run (`--base f6f4a0b26~1 --reach-all`) — both lines, matching the D-log:

```text
verify dokick: baseline f6f4a0b26~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dokick: no corpus session is blocked on it at f6f4a0b26~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke dokick: no RNG-tagged reach; fixed smoke spread (24 run, 3.3s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log; full suite skipped (single non-shared module — acceptable); Rule #2 clean.

## Actionable C-wrongs

1. `!oldmem` sub-case lives only in the commit message — `grep oldmem docs/c-js-map/turns.md` is empty. C (`:1411–1413`) restores unconditionally; JS skips the restore with no hero-memory record (kill an invisible monster on a never-displayed square — display-only, no RNG/state effect). Record it in the `dokick` map section (one line) so the named omit is findable; a port iter may additionally decide whether to repaint `oldglyph` bare.

Verdict: **ACCEPT-WITH-DEBT**
