# Review 2903 — 80a8469b3 — maybe_wail writers drain ×4

- SHA: `80a8469b3` (cliff owner + 4 writers: deferred-wail drains,
  5 sessions)
- D-entry: D-4062; Ledger: attrib.c (`losestr ported`), music.c
  (`do_pit partial`), apply.c (`use_grapple partial`), read.c
  (`drop_boulder_on_player ported`)
- `js/` diff: `js/attrib.js` +6, `js/music.js` +9 (import + 2
  drains), `js/apply.js` +6 (import + drain), `js/muse.js` +13
  (twin-mirror tail); new `scripts/maybe-wail-drains.test.mjs`

## Intent vs deliverable

Promise: one `await finish_maybe_wail()` per losehp in exact C
order at four sites (losestr, do_pit ×2, use_grapple, muse
earth-boulder); 5/5 probes FULL PASS. Delivers exactly that,
plus the muse tail's `finish_losehp_done` drains mirroring the
read.js twin. Promise = diff.

## Inventory

- `losestr` — attrib.js:414–415: drain after the fatal/done
  block, before setuhpmax. C: attrib.c:244 (csym :220–270).
- `do_pit` fall arm — music.js:524: drain before selftouch. C:
  music.c:312–316 (csym :220–338; `staticfn` — do_pit really
  lives in music.c).
- `do_pit` jostle arm — music.js:539: drain before
  exercise/selftouch. C: music.c:323–333.
- `use_grapple` self-hook — apply.js:4072: drain before the
  ECMD_TIME return. C: apply.c:3865–3867.
- muse `drop_boulder_on_player` — muse.js:1241–1252: crush
  pre-drain + gameover return + hit post-drain. C: read.c:2331–2337.
- Imports: `finish_maybe_wail` into the existing `./hack.js`
  lines (music.js:53, apply.js:83 — hunk-visible extensions, zero
  new edges); attrib.js dynamic import matches the file idiom
  (:511/:534 siblings verified live); muse finishers pre-imported
  (:47/:51).

No deleted symbols, no re-pointed clones — step-3 paste not
triggered. Callee evidence anyway:

```text
finish_maybe_wail js/hack.js:2011   ASYNC — await required
finish_losehp_done js/end.js:2021   ASYNC — await required
```

Both LIVE, awaited at every new site. No clones, no stubs.

## C ↔ JS fidelity

C losehp (hack.c:4284–4292; `maybe_wail()` at :4290): fatal
`u.uhp < 1` → noreturn `done(DIED)`; `else if (n > 0 && u.uhp*10
< u.uhpmax)` → `maybe_wail()`; poly arm :4274–4275 adds the
`Unchanging` conjunct. JS `losehp` (hack.js:1911, sync) mirrors
this with deferred flags (fatal sets `_losehp_needs_done` only,
:1956–1967; else-if sets `_needs_maybe_wail`, :1968–1969 —
verified in review 2899). Per site:

- losestr: C losehp :244 → setuhpmax :246–254; JS drains
  between the done block and setuhpmax — C order exact. The
  survived-fatal no-op claim holds: the flag is set only by
  the non-fatal else arm, so a survived fatal drains nothing.
- do_pit: C fall arm losehp :314–315 → selftouch :316; jostle
  losehp :325–326 → exercise/selftouch :327–333. JS drains sit
  exactly at those seams (line numbers counted off sed output,
  cites exact). No RNG on either seam beyond C's own draws.
- use_grapple: C `You hook yourself!` :3864 → losehp :3865–3866
  → return :3867. JS: pline → losehp → drain → return. Exact.
- muse boulder: drain-for-drain mirror of the read.js:1677 twin
  (pre-drain after flooreffects, gameover return, post-drain
  after the hit losehp). Static vs dynamic import is
  behavior-neutral (same module singletons). The twin's
  `passes_walls(youdat)` vs muse's flats read is pre-existing,
  untouched by this diff, and disclosed as omission (2).

Caller table: mcast_weaken_you (both weaken probes), do_earthquake
drum/horn, doapply→use_grapple, MUSE_SCR_EARTH — all pre-wired,
gain the drains for free. Melee ruled out by code read
(mhitu.c:1902–1927 never wails — cited, not assumed).

## Hallucinations / overclaim

None. The four writer verifies are vacuous at baseline (0
blocked each — owner was maybe_wail) and the D-log claims
movement only on maybe_wail plus reach lines — no "PASS hidden"
for a vacuous check. The jostle arm is disclosed as a
session-less same-function companion. RED pre-fix is certain by
reading (parent had no drains; the /tmp probe showed the flag
still set after Rogue s811).

## Density

Cliff owner (committed rank 16, 5 sessions) with FULL PASS on
all five. Whole-function holds per the ledger: losestr and
drop_boulder_on_player `ported`, do_pit/use_grapple `partial`
with the true fatal-continue omit (C losehp→done noreturn vs JS
continue — verified live in `ledger.mjs show`, omit text
identical on both rows). One `Ledger:` entry per function,
all four verified. No unreached work.

## Verification

Re-measure (`--base 80a8469b3~1 --no-reach`):

```text
verify maybe_wail: baseline 80a8469b3~1 — 5 session(s) blocked on it
  scen-sweep-Rogue-50250081: PASS
  scen-sweep-Valkyrie-50550049: PASS
  scen-worldtour-Wizard-49955052: PASS
  scen-sweep-Barbarian-50255242: PASS
  scen-sweep-Knight-49956002: PASS
verify maybe_wail: 5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match — same 5 probes, all FULL PASS. Focused test 4/4
green on HEAD. No FORCE/DIAG/seed strings in the `js/` hunks
(one grep hit is the commit message's session list, prose
only). Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
