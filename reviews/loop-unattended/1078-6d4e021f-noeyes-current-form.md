# Review 1078 — 6d4e021f — status_enlightenment noeyes reads current form

Metadata: SHA `6d4e021f`, D-2112, `js/invent.js` only (3 changed lines).
No prior review claims this SHA.

Intent vs deliverable: the subject promises the Blind `!haseyes` gate
reads the polymorphed current form, not the race base form.
The diff delivers exactly one predicate change plus a corrected
comment:

```js
const noeyes = !haseyes(game.youmonst?.data);
```

Inventory: one changed expression; zero helpers, zero imports.

**C ↔ JS fidelity**: C `insight.c:1070–1071`:

```c
/* !haseyes: avoid "you are innately blind innately" */
you_are(buf, !haseyes(gy.youmonst.data) ? "" : from_what(BLINDED));
```

JS is now the verbatim projection:
`wrap(buf, noeyes ? '' : from_what(BLINDED))`.
The old race-form read (`mons(game.urace?.mnum)`) was a genuine C-wrong:
race never changes under poly, so `HBlinded & FROMFORM` with an eyeless
form printed the doubled "innately … from your creature form".
The D-log's `set_uasmon` currency claim is corroborated in-tree
(`game.youmonst.data` is assigned on form change, e.g. invent.js:3736)
and behaviorally by both blocked sessions moving past.
The `?.` guard vs C's non-null deref is dead defense (`haseyes`
null-safe per monsters.js:379); unreachable in play.
Surrounding logic (kind wording, wizard timeout suffix, neighboring
Deaf arm) untouched. No `sym.mjs` re-point applies.

Hallucinations / overclaim: none.
The queue row was filed under `wield.c chwepon` (a red herring —
chwepon prints no such line); the D-log correctly attributes the writer
to `insight.c` and verifies under the queued owner name.

Density: 3 lines — C locus is one predicate; "C is that small" applies.

Verification: D-log cites hidden 0 / 2-moved / PROGRESS
(Monk-92000 → from_what@69; Wizard-92120 →
attributes_enlightenment@50).
Re-measured (`--base 6d4e021f~1`):

```text
scen-death-Monk-92000: moved → from_what at step 69 (was 68)
scen-death-Wizard-92120: moved → attributes_enlightenment at step 50 (was 49)
verify chwepon: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match. No seed / step / coordinate read.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
