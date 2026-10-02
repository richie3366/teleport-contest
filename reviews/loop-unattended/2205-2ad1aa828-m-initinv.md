# Review 2205 — 2ad1aa828 — m_initinv erosion term + impossible default

Metadata: SHA `2ad1aa828`, D-3244, `js/makemon.js` only (1
closure + 1 default arm + 1 comment removal). Parent `f247f6b3c`.

## Intent vs deliverable

Subject promises: ARM_BONUS erosion term + mercenary
`impossible` default, moving Samurai-94217 s5→s6 with 668/668
REACH. Delivered exactly that. The mechanism analysis (mac
over-count skipping the round-4/5 gate pairs, positional match
surfacing the mismatch at :668) is read from the two draws and
matches the C gate structure I walked below.

## Inventory

- `m_initinv` (js/makemon.js:2945): armBonus subtracts
  `min(max(oeroded,oeroded2), a_ac)`; mercenary-switch default
  calls `void impossible('odd mercenary %d?', …)`; stale
  elf/guardian comment removed (C has no such arms).

## C ↔ JS fidelity

`m_initinv` — C makemon.c:588–833, walked in full (246 lines)
against JS js/makemon.js:2945–3185. Rogue return ✓; mercenary
mac 7-table ✓ + default `impossible("odd mercenary %d?",
monsndx(ptr))` now live (`void impossible` fire-and-forget =
file's sync convention, line 648 precedent; `ptr.mndx` ≡
monsndx) ✓; 5 armor rounds — gates, `rn2` draws, pieces in C
order, RNG call-for-call ✓; add_ac nulling via per-round
`otmp = null` + null-safe armBonus ≡ the macro ✓ (round-5
final add skipped per C's own "not technically needed");
WATCH_CAPTAIN/WATCHMAN/GUARD/soldier gear ✓ (guard cursed
whistle mksobj(TRUE,FALSE)+curse+mpickobj ✓; rations/bugle
draws ✓); SHOPKEEPER rn2(4) MAJOR fallthrough ✓; PRIEST robe
chain + shield + rn1(10,20) gold ✓; MONK robe ✓; all other
mlet arms (NYMPH/GIANT/WRAITH/LICH/MUMMY/QUANTMECH/
LEPRECHAUN/DEMON/GNOME) — draws, pieces, corpse/box/timer/
container/burn details exact ✓ (JS switch order differs from
C; dispatch order is behavior-free); soldier rn2(13) return
✓; tail defensive/misc/gold gates incl. `d(level_difficulty,
minvent?5:10)` ✓. ARM_BONUS = a_ac + spe −
min(greatest_erosion, a_ac) per hack.h:1526–1528 ✓;
greatest_erosion = max(oeroded,oeroded2) per obj.h:126–128 ✓
— the JS expansion is exactly right. Sole C caller
makemon.c:1444 → js/makemon.js:3717 allow_minvent block ✓
(signature unchanged). `m_initinv_tail` confirmed dead (1
self-occurrence), correctly untouched. Verdict: whole exact.

Helpers: every in-body callee already live (mongets/mksobj/
curse/mpickobj/mkmonmoney/rnd_class/weight/rnd/set_corpsenm/
stop_timer/add_to_container/d/level_difficulty/begin_burn/
defensive/misc/findgold-clone per the D-log; none touched
here). No clones added, no stubs, no re-points.

## Hallucinations / overclaim

One doc-citation error, code unaffected: the D-log/commit
message cites "obj.h greatest_erosion (:3066–3077" but obj.h
has 537 lines — `greatest_erosion` is obj.h:126–128. (The
3066–3077 range looks like the new JS armBonus lines with a
wrong file label.) Correction stands as review text; the
expansion itself is verified exact above. No "Match C"
dispatch/stub split anywhere.

## Density

One whole 246-line C function, fully walked + fully reached
(668 sessions). ~15 insertions is under the §2b floor, but
the exception is evidenced (coverage block empty at ship,
no other makemon.c residuals, callee closure all live;
D-3242 precedent). Own C-locus/Callers/Verify/Named-omissions
bullets + own `Ledger:` entry. No Must-fix bundled.

## Verification

- Banned-pattern grep on the js hunks: clean.
- Re-measured in one call: `hidden-proxy.mjs verify m_initinv
  --base 2ad1aa828~1 --reach-all` → "0 PASS, 1 moved past, 0
  unchanged, 0 worse → PROGRESS" (Samurai-94217 5→js-throw@6
  ✓ — the throw is the D-log's pre-existing relink error,
  downstream of m_initinv) + reach 668/668 REACH-OK (268s
  full spread). D-log reproduced exactly; zero REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
