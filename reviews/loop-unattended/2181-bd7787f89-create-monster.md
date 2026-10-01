# Review 2181 — bd7787f89 — create_monster whole-body completion

SHA `bd7787f89`, D-3221; 2026-10-01; mklev.js (+214/−63) + mondata.js
(export) + uhitm.js (export). Single-function cluster (sp_lev.c).
Closes no prior review.

## Metadata

- Subject: "sp_lev.c create_monster whole-body completion (geno arms,
  class panic, FURNITURE/OBJECT appear, direct-path post-spawn)
  (D-3221)".
- Promises: geno arms; canonical DEF_CHAR_TO_MLET + throw on miss;
  christen + dormant post-spawn opts in C order; vampshift moved from
  l_create_monster (no double-apply); 4 appear arms + default;
  FURNITURE/OBJECT scans; "none missing — whole :1925–2187 live".

## Intent vs deliverable

Kept except one latent scan bound (debt, below). Everything else —
geno, panic, all four appear arms, the 12 post-spawn opts, the
l_create_monster split — verifies against pinned C.

## Inventory — create_monster

`splev_create_monster` (mklev.js:21767) + `splev_create_monster_
appear_fixup` (+loc param). Imports join ALREADY edges: place_monster
(steed), DEF_CHAR_TO_MLET (mondata, new export), DEFSYM_EXPLANATION
(uhitm, new export). Deleted/re-pointed: none (the mklev-local
`monclass_letter_to_mlet` keeps its 9 other sites — out of cluster,
named in the message).

## C ↔ JS fidelity — create_monster

C `sp_lev.c:1924–2187` (csym range), walked in order:

- Class `:1935–1941`: `DEF_CHAR_TO_MLET[id] ?? null` + throw ≡ C's
  def_char_to_monclass/MAXMCLASSES panic shape (NORETURN → throw,
  u_on_newpos precedent) ✓. Map verified C-exact: all 60 entries
  incl. the 9 tricky ones (I→S_invisible, @→S_HUMAN, space→S_GHOST,
  '→S_GOLEM, &→S_DEMON, ;→S_EEL, :→S_LIZARD, ~→S_WORM_TAIL,
  ]→S_MIMIC_DEF — each matched to defsym.h MONSYM raw lines) ✓.
  All 16 single-char live callers are in the map; variable callers
  pass names/null only — the throw is unreachable today ✓. Values
  are mlet-name strings, same as the old local map (no S_ANT=0
  trap; mkclass call shape unchanged) ✓.
- Geno `:1949–1953`: mvitals/mvflags read, G_UNIQ&G_EXTINCT → return
  null, G_GONE → pm=null with mid kept ✓; mk_mplayer dispatch uses
  kept mid (`PM_ARCHEOLOGIST <= mid <= PM_WIZARD`) like C's m->id ✓
  (fires even when pm was nulled — C-identical) ✓.
- Spawn + christen `:1983–1995`: roamer/mplayer/makemon arms ✓;
  christen reassigned before fixup ✓.
- Appear switch `:2002–2123`: NOTHING/FURNITURE/OBJECT/MONSTER +
  default all live in C order ✓. OBJECT null-guard
  (`objectNameStrs[i] &&`) mirrors C's `OBJ_NAME()` check ✓;
  boulder `:2041` gate kept verbatim C-order-dead (placed x ≥ 0
  always) with the retry body ported ✓; `does_block` now uses the
  tracked x/y like C's relocated locals ✓ (was mtmp.mx/my).
- Post-spawn `:2125–2184`: female/peaceful/asleep pre-existing;
  NEW seentraps/cancelled/revived/avenge/stunned/confused/invis/
  blinded/paralyzed/fleeing/waiting(+vampshifted newcham)/m_lev_adj/
  invent in exact C order with exact values (%127 trio,
  mcansee/mcanmove zeroes, 49/0 clamp, DEFAULT/CUSTOM bits) ✓.
  Strategy bit present (mklev.js:21873 — the diff window cut it;
  read in file) ✓.
- Split audit (the "no double-apply" claim): l_create_monster's opts
  carry ONLY rx/ry/croom/sp_amask/mm_flags/appear/appear_as/asleep/
  waiting; every other post-arm it applies itself from tmp AFTER
  splev returns. Each arm fires exactly once per path ✓. The moved
  vampshift runs before l_create's post-arms where C runs it after —
  accepted nuance: fires only for shifted-vampire + waiting, and
  shipped .lua has waiting only on a ghost + riders (themerms/tower),
  never a shifted vampire; for all real inputs the moved block is a
  verified no-op besides the (unchanged) strategy bit.

DEBT — FURNITURE scan bound: JS scans 88-entry DEFSYM_EXPLANATION
(ends [86]="poison cloud", [87]="valid position" ✓ = C PCHAR
86/87) but C scans `MAXPCHARS` = **105** (defsym.h PCHAR 0..104
contiguous — verified; 88–95 swallow display, 96–104 explosions).
The D-log's "verified 88 = MAXPCHARS" is false (3.6-era value; 3.7
merged the tables). An appear_as naming one of those 17 explanations
("swallow top left", "explosion …") would be found by C and
impossible()'d by JS. No shipped .lua contains such strings and no
direct caller passes appear_as (dormant) — strictly latent. Fix:
extend the table with the 17 entries or name the bound in the map.
BOULDER defined (mklev.js:190); syntax OK.

Diff grep: 0 hits. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"Verified 88 = MAXPCHARS" (message + doc comment) is wrong as shown
above; "none missing — whole :1925–2187 live" overclaims by the 17
scan entries. "No double-apply" and "raw[73]" both check out.

## Density

One whole C function (264 C lines), one C file, no Must-fix bundled,
full 44/44 (shared file — correctly run). No stale pops this iter.

- Ledger: create_monster ported — ACCEPT-WITH-DEBT (scan bound).

## Verification

Re-measured (current tree incl. this SHA):

```text
verify create_monster: baseline bd7787f89~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach create_monster: 14 baseline-PASS session(s) reach it (14 run, 18.8s): 14 PASS, 0 regressed → REACH-OK
```

Matches the D-log verbatim (vacuous + 14-session reach). No REGRESSED
session. The debt is level-author-input-only — invisible to the corpus.

## Actionable C-wrongs

1. FURNITURE scan bound (debt, map-named — not Must-fix): extend
   DEFSYM_EXPLANATION to C's 105 defsyms (append swallow 88–95 +
   explosion 96–104 explanations in defsym.h order) or name "FURNITURE
   scan covers 0–87; swallow/explosion explanations unfindable" in
   the map. One-line table or one-line map entry; queueable with any
   mklev touch.

Verdict: **ACCEPT-WITH-DEBT**
