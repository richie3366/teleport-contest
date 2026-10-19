# Review 2929 — 52e432cc8 — status_enlightenment blind timeout uses Blindfolded

- SHA: `52e432cc8` (cliff, writer behind `one_characteristic`)
- D-entry: D-4088; Ledger: insight.c (`status_enlightenment`, D-4088)
- `js/` diff: `js/invent.js` +4 −2

## Intent vs deliverable

Promise: the wizard-mode « (N)» timeout on «You were temporarily blind»
tested `!u.ublindf` for C's `!Blindfolded`. youprop.h `Blindfolded ≡
EBlinded`, and worn lenses set `ublindf` but not EBlinded, so the timeout
was dropped (2 sessions). Diff: `!(u.EBlinded | 0)`. Promise = diff.

## Inventory

- `status_core_lines` blind arm — invent.js:6390–6410; C insight.c:1060–1072
  (status_enlightenment).

## C ↔ JS fidelity

```c
#define Blindfolded EBlinded   /* youprop.h:96: lenses don't set [BLINDED].extrinsic */
…
: Blindfolded_only ? "deliberately" : "temporarily");
if (wizard && (HBlinded == BlindedTimeout && !Blindfolded))
    Sprintf(eos(buf), " (%ld)", BlindedTimeout);
```

The JS kind selector reads `u.EBlinded` (its own `blindfoldOnly`), so
the timeout test now uses the same field. That is the macro, as the
youprop.h comment says. `(hb & TIMEOUT) === hb` is `HBlinded ==
BlindedTimeout`. The text and the leading space match. No RNG.

The JS gate reads only the `u.EBlinded` flat, not
`uprops[BLINDED].extrinsic`. The same split-store question comes up in
2930–2932. Here it is consistent with the arm's other two reads, and a
worn blindfold sets the flat (`Blindf_on`). Not a C-wrong on any path
measured.

## Hallucinations / overclaim

None. The Named line lists the other 22 rows by shape. Later SHAs of
this window took those shapes one at a time (2930–2933).

## Density

One condition. One Ledger bullet.

## Verification

`one_characteristic` (--base 52e432cc8~1) has 15 blocked rows. Every
re-measure runs HEAD's code, which includes 2930–2933. So the
per-commit split comes from the board diff: this SHA's commit flips
exactly sweep-Samurai-50055051 and sweep-Healer-50950065.

```text
verify one_characteristic: 14 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
  unchanged: scen-worldtour-Wizard-610136 s503 (blind timeout 103 vs 106 — named)
```

Consistent with the D-log's 2. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
