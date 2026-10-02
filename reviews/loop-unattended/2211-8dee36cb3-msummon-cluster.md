# Review 2211 — 8dee36cb3 — msummon cluster + Amonnam clone deletion

Metadata: SHA `8dee36cb3`, D-3250, `js/minion.js` only
(+8/−13). Parent `084395223`.

## Intent vs deliverable

Subject promises: Amonnam clone→live-export fix (Monk-94052
s90→s130) + 9 whole-function verifies (10 members total).
Delivered: the clone deletion with import swap, one
`impossible` default arm, one doc correction, and 10
per-function C-locus/Callers/Named/Ledger bullets. The
incubus mechanism (5.0 foocubi NAMS trio vs the neuter-name
clone) is MEASURED from C data + the live export chain.

## Inventory (per function)

- `msummon`: no body change — benefits via the Amonnam
  import swap (site :406) + doc corrected (transient
  light / EPRI/EMIN align un-named as omissions).
- `Amonnam`: local clone deleted; live do_name.js export
  imported (11 sites); sole-use `an` import removed.
- `summon_minion`: default arm += `await impossible(
  'unaligned player?')`.
- `lose_gain` pair, `demon_talk`, `dprince`, `dlord`,
  `llord`, `lminion`: untouched, claimed whole.

## C ↔ JS fidelity (per function)

`msummon` — C minion.c:58–195 (csym; D-log 59–195, same
body), walked in full vs JS :304–416. Demonbane gate ✓;
atyp priest/minion/malign chain ✓; all 6 dtype/cnt arms
with short-circuit RNG order exact (incl. the lawful-angel
`!rn2(6)`-with-no-match → NON_PM → return 0 path, which JS
reproduces via switch-default-fallthrough) ✓;
ELEMENTALS[rn2] ≡ ROLL_FROM ✓; G_UNIQ/G_GONE gates ✓;
makemon MM_EMIN|MM_NOMSG loop ✓; angel emin+renegade xor
✓; S_ANGEL !Blind transient light (repo youprop expansion)
✓; `cnt==1 && canseemon` Amonnam pline — now the live
export (the fix) ✓; cleanup ✓; census-diff result ✓.
Callers: C's complete 5-ref set (mhitu:969, sit:305–307,
wizard:609) → js/mhitu.js:3397, sit.js:711–713,
wizard.js:93 (all confirmed). Verdict: whole exact.

`Amonnam` — C do_name.c:1158–1165 highc(a_monnam()) ≡ JS
`highc_name(a_monnam(mtmp))` (do_name.js:1296, sync) ✓.
Deleted clone verified divergent (neuter `data.name` +
`an()`, no gender/hallu/invis/priest handling — D-1849
class) ✓ good riddance. 11 minion.js sites now resolve
to the import (count confirmed); zero `an(` uses remain;
module loads. Required sym.mjs output:
`Amonnam → js/do_name.js:1296 sync + 5 LOCAL CLONEs in
fountain/mhitu/music/teleport/zap` — matching the D-log's
Next (3) exactly (own rows when queued). No new edge
(`--can` ALREADY on the extended Monnam/mon_nam/x_monnam
edge). Verdict: re-point exact.

`summon_minion` — C minion.c:197–257 (csym; D-log 198–257).
Switch incl. default impossible + ndemon(A_NONE) ✓ (the
new line); NON_PM/ANGEL/plain/shopkeep-exclusion makemon
arms with emin+renegade=FALSE ✓; talk arm (Deaf voice/feel,
verbalize, canspotmon Amonnam, mstrategy) ✓; mpeaceful=FALSE
✓. SetVoice deferred (named, SND_LIB no-op). Callers: C's
6 pray.c refs → 6 js/pray.js sites at exactly the D-log's
lines. Verdict: whole exact. (Pre-existing docstring still
lists "full EMIN polish beyond min_align" as omitted — but
C sets exactly min_align + renegade FALSE, both live; stale
doc line, untouched by this SHA, noted not queued.)

`lose_guardian_angel` — C minion.c:467–494 vs JS :426–450:
rebuke/verbalize vs Deaf vanish, mongone, rn1(3,2) hostile
mk_roamer loop — exact ✓. Callers dogmove.js:1378 +
minion.js:481 per the D-log (doc-corroborated D-1608/D-1617).
Verdict: whole exact.

`gain_guardian_angel` — C minion.c:497–565 vs JS :461–536:
Hear_again, Conflict hostiles vs fervent whisper + tame-10
mk_roamer (conduct-gated, no edog) + newsym + Blind-gated
greeting + m_lev rn1(8,15) / mhp d+rnd kit + saber/bless/
spe/armor — exact, RNG call-for-call ✓. Verdict: whole exact.

`demon_talk` — C minion.c:262–358 vs JS :579–679, walked in
full: blade rage, faint/occupation, dprince reveal, S_DEMON
kin + rloc, demand formula with pre-check rnd(80) burn,
amulet/Deaf unmeetable rn1(1000,125), bribe>=demand,
charisma rnd(5*CHA) fallback, livelog + mongone — exact,
RNG call-for-call ✓. Callers: sounds.c:1143 →
js/sounds.js:1720 wired (confirmed); monmove.c:823 NAMED
(pre-existing D-1798, confirmed at js/monmove.js:2681).
Verdict: whole exact.

`dprince`/`dlord`/`llord`/`lminion` — C :390–402/:404–416/
:419–426/:428–441 vs JS :284–295/:270–281/:262–267/:178–184:
tryct loops, rn1 ranges, G_GONE + align gates, fallback
chains, mkclass non-lord loop — all exact ✓. Caller table
(minion.c + pray.c sites) consistent with the bodies.
Verdicts: whole exact.

Helpers: no clones added; the one clone touched was
deleted. No stubs, no other re-points.

## Hallucinations / overclaim

None. "9 whole-function verifies" holds — I re-walked all
10 bodies above. The remaining-clone list matches sym.mjs.

## Density

10 whole functions at the 10-cap, one C file (minion.c)
plus the fix's direct callee (Amonnam, do_name.c) —
coherent closure, no Must-fix bundled. Own C-locus/Callers/
Named bullets + 10 `Ledger:` entries. Under-floor insertions
with the evidenced exception (coverage 0 rows; leftovers
bribe/newemin/free_emin named live+wired in Next for a
future 1-call declare).

## Verification

- Banned-pattern grep on `^+` hunk lines: clean.
- Re-measured in one call: `hidden-proxy.mjs verify
  msummon,…,lminion --base 8dee36cb3~1 --reach-all` (10
  fns) → msummon "1 moved past (90→rloc_to_core@130) →
  PROGRESS" + reach 1/1; summon_minion reach 1/1; other
  eight vacuous-as-logged + smoke 24/24 each. D-log
  reproduced exactly; zero REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
