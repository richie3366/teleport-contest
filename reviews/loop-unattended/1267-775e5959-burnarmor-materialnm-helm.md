# Review 1267 — 775e5959 — trap.c burnarmor case-0 materialnm helm prefix (D-2301)

Metadata: SHA `775e5959`, D-2301, C-wrong noun fix (no corpus owner; `verify` 0 blocked). Method: `git show` stat + full `js/trap.js` diff; C `trap.c:116–123` read directly; `decl.c:90–95` table + `objclass.h:13–34` enum order verified word-for-word; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: case 0 passes `"<material> <helm_simple_name>"` like C instead of the bare helm name.
Diff actually adds (`git show 775e5959 -- js/trap.js`, single file): file-local 22-word `materialnm` + `descr` construction in case 0. Promise kept.

## Inventory

- `materialnm` (js/trap.js, file-local const) — new, data CLONE of C `decl.c:90–95`.
- `burnarmor` case 0 — `descr` now `material + helm_simple_name`, bare slot still `'helmet'`.

## C ↔ JS fidelity

Table verified word-for-word against pinned C (`decl.c:90–95`):

```c
"mysterious", "liquid",  "wax",   "organic",
"flesh",      "paper",   "cloth", "leather",
"wooden",     "bone",    "dragonhide", "iron",
"metal",      "copper",  "silver",     "gold",
"platinum",   "mithril", "plastic",    "glass",
"gemstone",   "stone"
```

JS carries the identical 22 words in the identical order (re-counted both sides: 4+4+4+4+4+2). Indices 0–21 align with `objclass.h:13–34` (`NO_MATERIAL=0` … `MINERAL=21` — enum verified). The commit's 22/22 word-diff claim reproduces exactly.
Case logic vs C `trap.c:116–123`:

```c
item = hitting_u ? uarmh : which_armor(victim, W_ARMH);
if (item) {
    mat_idx = objects[item->otyp].oc_material;
    Sprintf(buf, "%s %s", materialnm[mat_idx],
            helm_simple_name(item));
}
if (!burn_dmg(item, item ? buf : "helmet"))
    continue;
```

JS mirrors it: `mat` from the objects table, `descr = item ? material + helm_simple_name : 'helmet'`, `=== ER_NOTHING → continue`, `break` otherwise. Guard analysis: `?? 0` on the material read and `?? 'mysterious'` on the table can only fire on table-missing data C never has — both documented, and the fallback word is index 0, the C value for `NO_MATERIAL`, so even the unreachable path agrees with C. The `=== ER_NOTHING → continue` matches the function's pre-existing convention for the other cases. `helm_simple_name` was already the call in the old line — no callee change. Display-only arm, zero RNG either side (review-1152 measurement cited; plausible on its face — pure string formatting into `erode_obj`'s message argument, no `rn2` in the arm).
Clone classification: file-local data clone with C citation at the table, `eat.js foodwords` precedent, no new module edge — the correct call for a 22-word constant (an import would manufacture a cross-module edge for a datum). No STUB, no omit. `grease_protect` stays named (pre-existing); Lua `nhlobj.c:222` noted out of scope at the table.

## Hallucinations / overclaim

None. "No corpus divergence — C-wrong noun" with before/after literals ("iron helm" vs "helm") is concrete and checkable.

## Density

~20 insertions for a one-arm noun fix — below the ~40 floor, but the C locus is literally three lines plus a datum; "unless C is that small" applies. Single file, single arm, no padding.

## Verification

D-log: preflight clean-tree green, `verify --fn burnarmor` syntax/rule2/green/strict/cohort PASS (full skipped — single non-shared file, reasonable), hidden vacuous (explicitly NOT a corpus PASS). Re-measured by this review:

```text
verify burnarmor: baseline 775e5959~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches "row cited 0". Diff grep: no FORCE/DIAG/seed/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
