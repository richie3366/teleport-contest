# Review 2789 — 6f89ca4ec — inhishop in_rooms SHARED-walk

- **SHA:** `6f89ca4ec` (Tue 2026-10-13) — m_move-row writer (D-3936).
- **D-entry:** D-3936. **Ledger:** `inhishop` ported (3 sites: shk + sounds + teleport).
- **Diff size:** `js/shk.js` +13/−6, `js/sounds.js` +15/−6 (bodies + imports). Board: 1 row.
- **Method:** cliff commit — whole Method on both bodies + clone/cycle audit.

## Intent vs deliverable (promise vs diff)

The subject promises: both `inhishop` bodies did a direct
`roomno===shoproom` compare, so a keeper in its shop doorway (roomno
SHARED) read as outside and Keystone Kops shopped; porting the
`on_level` gate + `in_rooms` SHARED-walk moves Monk-49959628 s150→PASS
while Caveman-49956036 is proven different-cause (zero isshk, own
writer).

The diff actually ports both bodies to C order (ESHK guard → live
`on_level` → live `in_rooms` + `includes(fromCharCode(shoproom))`),
adding `on_level` (new dungeon.js edge) and `in_rooms` (existing
hack.js line) to sounds.js. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `inhishop` export (shk.js:838) | shk.c:1038–1048 (csym; D-log :1039, off-by-one start) | whole vs C |
| 2 | `inhishop` sounds clone (:618) | same | verified identical, ships as CLONE |
| 3 | teleport.js:347 clone (untouched) | same | verified identical |
| 4 | sounds.js imports (dungeon + hack lines) | — | live-export wiring |

`sym.mjs inhishop`: export shk.js:838 sync + 2 local clones tracked.
No symbol deleted or re-pointed; no required re-point output — but the
kept clone needs the cycle check below.

## C ↔ JS fidelity

C (11 lines): `eshkp = ESHK(shkp)` → `on_level` gate → `in_rooms(mx,
my, SHOPBASE)` → `strchr(shkrooms, shoproom)`. JS matches in C order;
the two null guards are JS-necessary and behavior-preserving (C would
deref-crash on null eshk; C callers never pass off-map coords).
`on_level` (dungeon.js:1834) is dnum+dlevel ≡ C dungeon.c:1438–1443 ✓.
`in_rooms` (hack.js:2025, live sync export) has the SHARED/SHARED_PLUS
neighbor walk, returns `''` on null loc (so the dropped `mx==null`
guard is SAFE — same FALSE), and joins room chars into a string for
`.includes()` ✓.

Callee closure: `on_level` LIVE, `in_rooms` LIVE, sounds clone a
**verified CLONE** (statement-identical to the export, modulo
comments). Kept-clone audit: `imports.mjs --can js/sounds.js
js/shk.js inhishop` → ALREADY (sounds statically imports shk), the
export is a hoisted `export function`, and all uses are runtime calls —
so a rewire would be TDZ-safe and the D-log's "kept: shk.js:139
imports sounds" justification is weak (a cycle alone is not a
blocker). Harmless either way: the clone is C-identical and all three
sites are ledger-tracked. Observation, not a finding.

NUL quirk (named omit) confirmed as described: C `strchr(buf, 0)`
finds the terminator (TRUE); JS `in_rooms` never emits `'\0'`
(NO_ROOM→`''`, SHARED walk filters `rno>=ROOMOFFSET`), so
shoproom==0 reads FALSE — unreachable for sane eshk. ✓

Precision nit: "behavior changes only on SHARED squares" overlooks
that the `on_level` gate is also new (off-level keepers now read
FALSE per C :1044 instead of a stale-level roomno compare). C-correct,
and 1980/1980 reach shows no reached path disagrees.

Callers: 48 C sites; JS sites pre-wired (spot-checked shk.c:283/595/
671 shapes ≡ shk.js:359/382/579; sounds tended_shop :630/:639 uses the
local clone). No RNG in the path. ✓

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 8 SHAs).

## Hallucinations / overclaim

- MAPLOG ground truth (`kpos=(51,7) inshop=1 … inrms=[55,0,0,0]`) and
  the Kop-position sanity probe stand on ignored-recorder / /tmp
  evidence — the durable proof is the session PASS, which reproduces.
- Caveman different-cause is forward-confirmed: the current queue
  re-filed m_move as a 1-session row for 49956036@505 exactly as
  D-3936's Next predicted. ✓ None found.

## Density

Cliff phase (§10.18): parent head was m_move 2/2296 (verified in
`6f89ca4ec~1:docs/LOOP-QUEUE.md`, first at step 150); Must-fix empty.
Writer ported whole (both bodies + live callees), own Ledger entry,
movement on the probe it names (1 PASS) with the other proven
different-cause — legitimate partial PROGRESS with proof, not
NO-MOVEMENT packaging. ✓

## Verification

Re-measured myself (`--base 6f89ca4ec~1 --reach-all`, current code):

```
verify m_move: baseline 6f89ca4ec~1 — 2 session(s) blocked on it (2 at baseline, 1 in the working scoreboard)
  scen-shop-Monk-49959628: PASS
  scen-sweep-Caveman-49956036: still m_move at step 505
verify m_move: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
reach m_move: 1980 baseline-PASS session(s) reach it (1980 run, 1309.3s): 1980 PASS, 0 regressed → REACH-OK
```

The D-log's "1 PASS, 0 moved past, 1 unchanged" reproduces exactly.
Board diff: exactly that 1 row →PASS. Reach 1980/1980, zero
regressions. No REGRESSED session.

## Actionable C-wrongs

None. Both bodies whole vs C, callees live, clones verified, kept-clone
tradeoff disclosed, movement and full reach reproduce clean.

Verdict: **ACCEPT**
