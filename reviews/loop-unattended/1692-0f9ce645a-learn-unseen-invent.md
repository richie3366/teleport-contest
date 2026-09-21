# Review 1692 — 0f9ce645a — `invent.c` learn_unseen_invent whole body (D-2733)

Metadata: commit `0f9ce645a`, D-2733, `js/invent.js` + one-line `js/do.js` await. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: cleric/arch gates, `addinv_core2`, `update_inventory` tail, `export async` with caller await. The diff delivers the 28-line C body verbatim in C order. Promise matches deliverable.

## Inventory

Changed JS: `learn_unseen_invent` (`js/invent.js`, restarted as `export async`); `toggle_blindness` (`js/do.js:3086`, adds `await`); new imports `addinv_core2` (existing u_init edge) and `PM_ARCHEOLOGIST` (existing generated-data edge). No deleted symbols, no clones.

## Callee closure

Required `sym.mjs` output pasted verbatim (new import):

```text
addinv_core2     js/u_init.js:937   ASYNC — await required
```

LIVE async and awaited — the function's async-ness is forced by this callee (decipher arm awaits pline), correctly propagated to the sole caller. `xname`/`update_inventory` same-file live; `maybereleaseobuf` correctly a GC no-op (C buffer release). Role gates use the same-file `urole.mnum` convention (`js/invent.js:1267` precedent). No STUB in any arm.

## C ↔ JS fidelity

C locus read: `learn_unseen_invent — invent.c:2748-2775` (csym range; message cites `:2750–2775`), body read verbatim. Line-by-line:

- `:2755–2756` Blind sanity return ✓.
- `:2759–2761` skip predicate (`dknown && (bknown || !Cleric) && (non-scroll || !Archeologist)`) ✓ exact — fixes the old dknown-only skip.
- `:2762–2765` `xname(otmp)` discarded + release no-op ✓ (dknown + cleric bknown live in `xname_flags`; `observe_object`-on-!Blind preserved inside xname, so the old direct `observe_object` call loses nothing).
- `:2766` `addinv_core2` ✓ (luckstone `set_moreluck` is that callee's own pre-existing named omit, not this body's).
- `:2770–2774` eknown-deferred comment kept ✓; `:2776–2777` `invupdated` tail ✓.
- Caller: C's only call site is `toggle_blindness` (`potion.c:363`, inside the `!Blind` gate after `Sting_effects`) → `js/do.js:3086` awaits under the same gate ✓ — the `--callers` single hit resolves exactly.
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate logic. Named omits (`maybereleaseobuf`, luckstone, eknown) are in message and map.

## Density

Whole-function restart (28-line C body), two files, zero new edges, full 44/44 claimed. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 0f9ce645a~1 --reach-all`) — both lines, matching the D-log:

```text
verify learn_unseen_invent: baseline 0f9ce645a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify learn_unseen_invent: no corpus session is blocked on it at 0f9ce645a~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke learn_unseen_invent: no RNG-tagged reach; fixed smoke spread (24 run, 3.8s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort/full-44 per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
