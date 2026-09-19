# Review 1489 — e900cb58 — wizcmds.c misc_stats (D-2530)

## Metadata

- SHA: `e900cb58`
- D-id: D-2530. Next index: 1489.
- Files: `js/wizcmds.js` (+268, one new import word).
- C locus: `nethack-c/upstream/src/wizcmds.c:1283–1399` (`misc_stats`,
  staticfn, 117 L).

## Intent vs deliverable

Subject promises: whole `misc_stats` in C order (MISSING → live) + LP64
`SIZEOF_*` constants + `engr_text_alloc`. Diff actually adds: 9
`SIZEOF_*` consts, `stats_row`, file-local `engr_stats` /
`engr_text_alloc` / `light_stats` / `timer_stats` / `region_stats`, and
exported `misc_stats` (`js/wizcmds.js:1020`). Promise matches
deliverable. No RNG in C; none added.

## Inventory

- New: `misc_stats(lines, total)` (exported sync — `sym.mjs`: single
  hit `js/wizcmds.js:1020`, sync).
- New: five file-local helpers (C callee bodies folded in, not clones
  of existing exports — no same-named JS symbol exists for any of the
  four `*_stats` helpers; `sym.mjs` only hit is the new export).
- Changed: +1 `NUM_OBJECTS` import word on the existing objects.js
  edge (`--can`: ALREADY, no new edge).
- No symbol deleted or re-pointed; no clone→import paste owed.

## C ↔ JS fidelity

`csym.mjs` body `:1283–1399` vs JS, arm by arm:

- `:1296–1307` traps unconditional (`++count`, `sizeof *tt`).
  JS identical, plus a bones-restore array shape beside the `ntrap`
  chain (mirrors the detect.js dual shape; documented). Confirm.
- `:1309–1314` engravings unconditional via `engr_stats`. C
  (`engrave.c:1625–1640`, via `csym`): header `sizeof struct engr`,
  `*size += sizeof *ep + ep->engr_alloc`. JS matches. `engr_alloc`
  reconstruction (`3 * (longest+1)`): C `make_engr_at` (`:407–457`,
  via `csym`) sets `smem = max(Strlen(s), Strlen(pristine)) + 1`,
  `engr_alloc = smem * 3`; all three text states are `strcpy`'d from
  those inputs at creation, so JS max-over-3 equals C `smem` at
  creation. Later lengthening past `smem` is unrepresentable in C's
  fixed buffer too. Display-only `#stats` bytes. Confirm.
- `:1316–1323` lights gated nonzero via `light_stats`. C
  (`light.c:500–511`): `gl.light_base` `->next` walk. JS walks the
  `game.light_base` array with the linked shape as fallback.
  Confirm.
- `:1325–1332` timers gated nonzero via `timer_stats`. C
  (`timeout.c:2734–2745`): `gt.timer_base` walk. JS
  `game._timer_base` walk. Confirm.
- `:1334–1345` shop damage gated nonzero (`svl.level.damagelist`).
  JS `game.level?.damagelist` walk. Confirm.
- `:1347–1354` regions gated nonzero via `region_stats`. C
  (`region.c:898–922`): header takes TWO sizeofs
  (`sizeof NhRegion`, `sizeof NhRect`) — JS emits both (`96+8`);
  count `svn.n_regions` ≡ JS live-list length; base
  `gm.max_regions * sizeof` → `n * sizeof` (JS arrays have no spare
  capacity — named adaptation in D-log and comment); per-region
  rects/msgs/`max_monst * sizeof(unsigned)` all present.
  Confirm with the one named adaptation.
- `:1356–1367` delayed killers gated nonzero (`svk.killer.next`).
  JS `game.killer?.next` walk. `plur(count)` (`hack.h:1520`,
  `((x)==1)?"":"s"` macro via `csym`) inlined exactly. Confirm.
- `:1369–1379` bones gated nonzero (`svl.level.bonesinfo`). JS
  matches. Confirm.
- `:1381–1396` oc_uname gated nonzero (`idx < NUM_OBJECTS`,
  `strlen+1`). JS `otable[idx]?.oc_uname` loop. Confirm.
- Row format: C `template[]` (`:1112`,
  `"%-27s  %4ld  %6ld"`) vs `stats_row` padEnd(27)/padStart(4/6)
  with two-space separators — C `%4ld`/`%6ld` never truncate, neither
  does padStart. Confirm.
- `SIZEOF_*`: D-log claims gcc-measured from pinned headers (probe
  in /tmp, not committed — not independently re-verifiable here);
  spot plausibility: `struct trap` (`trap.h:18`: ptr + 2×coordxy +
  d_level + coord + bitfield-int + small union) fits 32 LP64. Values
  feed only wizard `#stats` display text. Accepted on the D-log
  claim, noted.
- Caller: C `:1676` (`wiz_show_stats`) named as a future row, not
  silently dropped. Correct per the caller-wiring rule.

Callee closure: no STUB in any live arm; omits (`wiz_show_stats`,
`gm.max_regions` preallocation, `Sprintf`/`Strcpy`/`putstr` sinks)
all named in this commit with C citations.

## Hallucinations / overclaim

None. "Whole body in C order" holds for all nine rows; the one
deviation (regions base) is disclosed, not buried.

## Density

One 117-line C function + four tiny callee bodies folded file-local,
one file. Right-sized per §2b.

## Verification

- D-log: syntax (1 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  (no shared file changed) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify misc_stats
  --base e900cb58~1 --reach-all` → 0 blocked at baseline and working
  tree (vacuous note, honestly reported — the queue row cited no
  blocks) + smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic. Global `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
