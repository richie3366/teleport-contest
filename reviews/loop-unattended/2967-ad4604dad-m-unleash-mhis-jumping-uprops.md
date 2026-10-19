# Review 2967 — ad4604dad — m_unleash takes live mhis; jump reads Jumping from uprops

- SHA: `ad4604dad` (two near-pass cliffs, one C file apply.c: owners
  `m_unleash`, `jump`)
- D-entry: D-4127; Ledger: m_unleash ported; jump ported; is_valid_jump_pos ported
- `js/` diff: `js/apply.js` +18/−18, `js/teleport.js` +6/−6

## Intent vs deliverable

Promise (1): m_unleash's «%s pulls free of %s leash!» uses you.h `mhis`
(`genders[pronoun_gender(mtmp, PRONOUN_HALLU)].his`). JS used a local
`mhis_leash` (female ? her : his), so a pony was "his" where C says
"its". Promise (2): apply.c reads `Jumping` as `u.uprops[JUMPING]
.intrinsic || .extrinsic`, but apply.js's clone read flat
`u.HJumping`/`u.EJumping`, and jumping boots set only the uprops
extrinsic. Diff: `mhis_leash` is deleted and both message sites (apply.js
m_unleash and teleport.js migrate_to_level's inline copy) call
mondata.js `mhis`. `HJumping()` / `EJumping()` / `Jumping()` read the
uprops slots, and is_valid_jump_pos and its sync twin use them. Promise
= diff.

## Inventory

- `m_unleash` — apply.js:1520; C apply.c:726–750 (msg :731–732).
- `migrate_to_level` leash arm — teleport.js:2857 (its own ledger row stays partial).
- `mhis` — mondata.js:1250 (you.h:324), `pronoun_gender` → C mondata.c:1188–1207.
- `HJumping` / `EJumping` / `Jumping` — apply.js:5296–5312; C youprop.h:221–223.
- `is_valid_jump_pos` (+ `_sync`) — apply.js:5361, :5424; C apply.c (the
  `!magic && !(HJumping & ~INTRINSIC) && !EJumping && distu != 5` gate).
- Deleted: `mhis_leash`. Its only importer, teleport.js, was re-pointed;
  `grep -rn mhis_leash js/` finds nothing.

## C ↔ JS fidelity

`mhis` is a straight C macro port. pronoun_gender keeps C's order:
hallucinating → `rn2(4)` (core RNG, as in C), then !canspotmon → 2, then
neuter → 2, then humanoid / G_UNIQ / pname → female, else 2. For a pony
that is "its", which is the measured line. The old clone also skipped
the hallucination draw. That was an RNG divergence on this path, and
it is fixed too.

`HJumping()` ORs `uprops[JUMPING].intrinsic` with the flat `u.HJumping`,
because u_init.js still writes the Knight's FROMOUTSIDE to the flat. The
D-log names that, along with the attrib.js/insight readers, as other
files' work. In effect this is C's HJumping as long as the two stores
are not both set to conflicting values. The INTRINSIC mask test is
unchanged. `EJumping()` likewise ORs the extrinsic with the never-written
flat `u.EJumping`, which is harmless. No new RNG on the jump path.

## Hallucinations / overclaim

None. The D-log names the dual-store bridge and the files that still read
the flats.

## Density

Two writers in one C file, each healing one row: within the §10.20 bundle rule.

## Verification

```text
verify m_unleash (--base ad4604dad~1): 1 blocked
  scen-symset-Ranger-50250047: PASS → PROGRESS
verify jump: 1 blocked
  scen-sweep-Wizard-50050019: PASS → PROGRESS
```

Exact match with the D-log.

## Actionable C-wrongs

None in apply.c. The JUMPING dual store (u_init.js flat writer,
attrib.js PROP_HFIELD, invent.js enlightenment) is named debt in other C
files.

Verdict: **ACCEPT**
