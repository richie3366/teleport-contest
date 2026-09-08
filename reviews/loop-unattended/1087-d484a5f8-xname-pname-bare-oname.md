# Review 1087 — d484a5f8 — xname/doname obj_is_pname bare-ONAME

Metadata: SHA `d484a5f8`, D-2121, `js/objnam.js` only (~30 js/
insertions). No prior review claims this SHA.

Intent vs deliverable: the subject promises the `xname_flags`
`:663–664` `obj_is_pname → goto nameit` arm in `xname` (bare ONAME:
The-downcase + strip leading "the ") and the matching `doname` base
(no "poisoned " strip, no " named ONAME" suffix), leaving
article/BUC/erosion/spe logic untouched. The diff delivers exactly
that in two hunks. The message also correctly re-attributes the queue
row: `inuse_classify` never runs on the gameover-disclosure path
(D-1850 precedent) — the writer was `objnam`, not `invent.c:70–144`.

Inventory: two extended functions (`xname`, `doname`); zero new
functions, zero new imports (`ONAME`/`has_oname` pre-imported,
`obj_is_pname` same-module hoisted), zero deleted symbols (no `sym.mjs`
deletion output required).

**C ↔ JS fidelity**, checked against the cited ranges:

- `:663–664` `if (obj_is_pname(obj)) goto nameit;` sits before the
  oclass switch — pname skips base-type/poisoned/pluralize ✓. JS
  `if (obj_is_pname(obj) && has_oname(obj))` — the extra `has_oname`
  conjunct is redundant-but-harmless: C `obj_is_pname` (`:333–341`)
  already returns FALSE without `oartifact && has_oname`, and JS's own
  `obj_is_pname` (objnam.js:2401) encodes the same gate.
- `nameit:` (`:1001–1008`): concat ONAME, downcase 'T' in "The " iff
  `oartifact` ✓ (`nm.slice(0,4)==='The '` → `'t'+slice(1)`, oartifact
  gated ✓); then `:1011–1012` strip leading "the " case-insensitively,
  unconditional ✓ (JS `.toLowerCase()==='the '` slice, no oartifact
  gate ✓).
- `doname_base` starts `bp = xname(obj)` (`:1252`), so C needs no new
  suffix logic for pname — JS's `doname` builds base via `pretty_base`
  instead, so duplicating the bare-ONAME computation there is a
  faithful equivalent of `bp=xname` on this arm (duplicated three
  lines, not a divergence).
- "poisoned ": C sets `ispoisoned` only via the bp-prefix strip
  (`:1271–1274`); a pname bp is bare ONAME so the strip fails and the
  WEAPON_CLASS arm (`:1419–1420`) adds nothing — C prints
  `the +0 Grimtooth`, never "poisoned". JS `!isPname` gate on the strip
  keeps `ispoisoned=false` on the same arm ✓. (Residual micro-gap: a
  pname artifact literally named "poisoned …" that is also opoisoned
  would order differently — pathological, unshippable as a Must-fix,
  not even debt.)
- " named ONAME": C appends it only inside xname's
  `has_oname && dknown` block, which the goto skips ✓ — JS
  `!isPname` on the suffix ✓.
- Article: C `:1292` `force_the || obj_is_pname || the_unique_obj` →
  "the " ✓ — JS doname:2850 keeps that exact gate, untouched ✓.

Callee closure: all LIVE (same-module `obj_is_pname`, imported
`ONAME`/`has_oname`). No clones, no stubs. No RNG in the arms.

Hallucinations / overclaim: none. The message's "already bare" and
"re-adds its own" parentheticals match the C mechanics above. The
byte-identical post-change screen claim (offx 24C/32C) is consistent
with the two sessions moving past in verification.

Density: ~30 insertions, one C envelope, one module — right-sized.

Verification: D-log claims `verify inuse_classify --full` → 2 moved
past (Knight-92068 → really_done@94; Caveman-92148 →
one_characteristic@245), green/strict/cohort/full 44/44. Re-measured:
`hidden-proxy.mjs verify inuse_classify --base d484a5f8~1` →
`0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(Knight-92068 → next_ident@96; Caveman-92148 →
one_characteristic@245). Knight sits two steps further than at commit
time — the later D-2122 `done_in_by` port moved it past really_done
since; forward motion, not a regression. Non-vacuous. No
FORCE/DIAG/seed/coordinate reads in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
