# Review 1079 — 7a8bf664 — were_change unseen-howl arm

Metadata: SHA `7a8bf664`, D-2113, `js/were.js` only (51 lines).
No prior review claims this SHA.

Intent vs deliverable: the subject promises the human→beast unseen-howl
arm (`You_hear` + `wake_nearto`).
The diff delivers exactly that plus the sync→async flip, in one module.

Inventory: one extended function (`were_change`), one new local clone
(`Deaf`), three extended import edges (`You_hear`, `wake_nearto`,
`Soundeffect` + data const).

**C ↔ JS fidelity**: C `were_change`
(`nethack-c/upstream/src/were.c:8–45`, 38 lines), in full:

- is_were guard → is_human / chance ladder → `new_were` →
  `were_changes++` →
- `!Deaf && !canseemon` → `monsndx` switch (WEREWOLF→wolf,
  WEREJACKAL→jackal, default NULL) →
- `Soundeffect(se_canine_howl, 50)` +
  `You_hear("a %s howling at the moon.")` + `wake_nearto(mx, my, 4*4)`;
- beast→human arm unchanged.

JS mirrors every line in C order.
`mon.data?.mndx` ≡ `monsndx(mon->data)` per the repo's mndx convention.
`Deaf()` is character-identical to the `You_hear` gate at hack.js:149
(`HDeaf || EDeaf || uroleplay.deaf || u.Deaf`; extras beyond C's
`(HDeaf||EDeaf)` are repo-wide JS extensions, not invented here) —
though it is local-clone #14 of an unexported family:

```text
Deaf             NOT EXPORTED — but 13 LOCAL CLONE(S) in 13 file(s):
               js/detect.js:134  js/do.js:404  js/dothrow.js:1012  ...
```

Given the repo's settled local-clone convention for `Deaf` and zero
formula drift, this is consistency, not a new wrong.
`new_were` is sync (were.js:142) so `await` is a harmless no-op.
Sole JS caller already awaits and discards the return:

```text
js/mon.js:840:    await were_change(mtmp);
js/were.js:306:export async function were_change(mon) {
```

(Grep shows these two hits total; the old `return p` is dropped with no
reader.) `--can` output:

```text
ALREADY: were.js already statically imports mon.js. No new edge needed.
```

No new edge, no TDZ.
The unwired `uhitm.c:3067` gaze call site is correctly left alone
(different envelope, no corpus coverage) and named.

Hallucinations / overclaim: none.
The Healer-92124 residual is honestly reported as unchanged with C-side
dice proof (zero `were.c` draws at that step) and parked with a
falsifier — exactly the misattribution discipline §7 demands.

Density: 51 insertions, one C function — within §2b.

Verification: D-log cites hidden 1 PASS + 1 unchanged / PROGRESS
(Ranger-92177 full PASS 30739/30739 RNG + 135/135 screens).
Re-measured (`--base 7a8bf664~1`):

```text
scen-intrinsic-Healer-92124: still were_change at step 69
scen-tour-Ranger-92177: PASS
verify were_change: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
```

Exact match. Draw-free arms; no seed / step / coordinate read.

**Actionable C-wrongs**: none.
Note (not queueable): `Deaf` is now cloned in 14 files — a future
consolidation iter could export one canonical `Deaf`, but that is
cross-module refactoring, not this SHA's debt.

Verdict: **ACCEPT**
