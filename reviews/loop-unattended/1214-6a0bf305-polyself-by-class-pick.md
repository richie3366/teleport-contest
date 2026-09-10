# Review 1214 — 6a0bf305 — polyself by_class pick (D-2248)

Metadata: SHA `6a0bf305` (D-2248). Queue row `polyself.c`
mkclass_poly callers (`:542`/`:598`, named D-2245), no corpus
block. js/ polyself.js +116/−5 (staticfn + by_class loop +
miss-fork split + placeholder gate).

## Intent vs deliverable

Subject promises the two C call sites that resolve a
controlled-polyself class word (`D`, `dragon`) via
`name_to_monclass` → worn-dragon `armor_to_dragon` /
`mkclass_poly` with the `rn2(3)` retry, plus the
any-of-those miss fork. Diff adds exactly `armor_to_dragon`,
the `by_class` `for(;;)`, the fork split, and retires
`mkclass_poly` from the map line. Promise kept.

## Inventory

New: `armor_to_dragon` (:304, module-local) — correct shape for
a C staticfn with same-file callers only. Changed: `polyself`
controlled block (`cls` + loop + fork + `!cls` placeholder
gate), 2 import names, 16 otyp + 9 PM consts, map comment.
Callee closure: `name_to_monclass`, `mkclass_poly` LIVE
(`sym.mjs`: both exported sync; `--can` ALREADY, no new
edge); `polyok`, `your_race`, `rn2` LIVE. No STUB in a live
arm; remaining arms named in-commit (were/do_merge/
POLY_REVERT/post-loop gotos/wizard rehumanize/light-src/
placeholder substitutes/SHIMMERING).

## C ↔ JS fidelity

- `armor_to_dragon` vs `polyself.c:2190–2232` (`csym`
range): 10 mail/scales pairs → adult `PM_*_DRAGON` exact;
SHIMMERING pair omitted with the `#if 0 // DEFERRED` cite.
Switch order differs but cases are disjoint — no behavior
delta. All 16 new otyp + 8 sampled PM consts resolve in the
generated lists (re-checked here, none missing).
- by_class vs `:535–542`: `cls = 0` per try, `name_to_mon`
miss-gate, `name_to_monclass(buf, box)` (`mondata.c:1088–
1176`: `*mndx_p = NON_PM` default, specific rides in
`mndx_p` — the `{ mndx: NON_PM }` box is the same idiom),
`cls && mntmp === NON_PM` → draconian `S_DRAGON` merges
else `mkclass_poly`. `cls === 'S_DRAGON'` matches the JS
mlet-name representation (`name_to_monclass` returns
`'S_*'`; `mkclass_poly(mletClass)` takes it). Exact.
- Retry vs `:598–604`: `rn2(3) || --tryct > 0` re-picks
without consuming a try; exhaustion `++tryct` falls to the
message — the `for(;;)`+preview is C's `goto by_class`
without re-prompting. RNG call-for-call (callees draw-free
except live `mkclass_poly`).
- Miss fork vs `:566–569` (`!cls` → never-heard, else
any-of-those) and the `!cls` placeholder gate (C's `else
if` structurally never sees a by_class pick) — exact.
- Untouched pre-existing line `name_to_mon(buf)` drops C's
`&gvariant` (JS default `null`); out of this SHA's scope,
not queued.

## Hallucinations / overclaim

None. D-log labels hidden vacuous (NOT a PASS) and the
fortress-neutral argument (class path unreachable in
fortress sessions) is sound.

## Density

116 insertions, one C locus family + its staticfn. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify polyself: baseline 6a0bf305~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict
×2 + cohort 7/7 + forced full 44/44 pasted. Diff grep: no
FORCE/DIAG/seed/coordinates. Rule #2 clean (re-run here,
repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
