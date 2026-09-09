# Review 1133 — 4508ab31 — lock.c doopen_indir !IS_DOOR envelope (D-2167)

Metadata: SHA `4508ab31`, js/ +37/−8 in `lock.js` (envelope rework) +
1-word `pickup.js` export (`container_at`) + map row. D-log D-2167.
Subject promises: Blind feel/see + mapseen/newsym + drawbridge/container
on the !IS_DOOR path (row named pick_lock; true writer measured, 1
session moved past).

Intent vs deliverable: promise matches diff. Actually adds: (1)
Confusion/Stunned `res` gate, (2) unconditional mapseen/newsym +
lastseentyp `res`, (3) four message arms (db-wall/DRAWBRIDGE_UP,
portcullis/DRAWBRIDGE_DOWN, container Feels/Seems, Blind feel/see),
(4) `container_at` export. No scope creep.

Inventory: no new functions; one reworked envelope. Callee closure —
all LIVE, all sync: `is_drawbridge_wall` + `is_db_wall` →
`js/dbridge.js` (edge pre-exists); `update_mapseen_for` →
`js/dungeon.js:1461`; `container_at` → `js/pickup.js:3832`
(`imports.mjs --can lock.js pickup.js container_at` → ALREADY, hoisted
declaration, no TDZ). No deleted/re-pointed symbols, so no
clone→import output to paste.

**C ↔ JS fidelity**: confirm against pinned C (`lock.c:779–853` via
`csym.mjs doopen_indir`, body + `--callers`: `hack.c:1099` kick path,
`lock.c:775` doopen). Walked arm by arm:

- Impaired direction (C `:825` `if (Confusion || Stunned) res =
  ECMD_TIME`): JS sets `res = true` per the house `true≡ECMD_TIME`
  convention stated in the docstring (same H-field + flat idiom as
  doclose below). Return contract preserved: the !IS_DOOR path
  `return res` matches C `return res`.
- Mapseen block (C `:830–839`, incl. the "using a key skips that"
  comment): JS calls `update_mapseen_for` + `newsym` + lastseentyp
  compare in the same position. One named half-omit: C also compares
  `door->glyph != oldglyph`, which JS cells cannot model (no
  `lev->glyph`, noted in code comment + map). Acceptable — the
  comparison is unrepresentable, not skipped.
- Four message arms (C `:841–853`) in exact order with exact
  predicates: `is_db_wall || DRAWBRIDGE_UP` → "no obvious way";
  `portcullis || DRAWBRIDGE_DOWN` → "already open";
  `container_at(cc.x, cc.y, TRUE)` → `Blind ? "Feels" : "Seems"`;
  else `You("%s no door there", Blind ? "feel" : "see")`. `There` /
  `pline_The` render as plain pline per the read.js:1683 house idiom.
  No RNG anywhere in this span — none added.

Hallucinations / overclaim: none. D-log correctly names
doopen_indir (not pick_lock) as the writer, explains the
topline-literal tie-break across pick_lock:591/doopen_indir:851/
doclose:1015, cites the measured key trace (`o` then `l`, hero Blind
both sides), and leaves doclose's twin arms + pit/mimic/set_msg_xy as
named omits rather than claiming them.

Density: ~40 insertions, one C arm envelope — right-sized per §2b.

Verification: D-log cites `verify.mjs --fn pick_lock` → 0 PASS,
1 moved past (Samurai-92071 175→191 doengrave), green 2/2, cohort
7/7. Re-measured independently: `hidden-proxy.mjs verify pick_lock
--base 4508ab31~1` → baseline 1 blocked, `0 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS` (175→191, later step AND later
owner). Claim true, not vacuous. `imports.mjs --rulecheck` → clean;
zero FORCE/DIAG/getRngLog/fastforward/seed hits in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
