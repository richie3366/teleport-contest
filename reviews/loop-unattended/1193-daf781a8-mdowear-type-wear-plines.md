# Review 1193 — daf781a8 — m_dowear_type !creation wear plines + light/invis arms (D-2227)

Metadata: SHA `daf781a8`, `js/worn.js` +95/−35, one-line `await` updates in
`js/mon.js`, `js/end.js`, `js/minion.js`. Queue row: Open `worn.c`
m_dowear_type, 1 blocked (scen-intrinsic-Samurai-92017 step 142).

## Intent vs deliverable

Subject promises: !creation wear plines + artifact_light/invis arms with
async conversion. Diff actually adds: `sawmon`/`sawloc` capture, puts-on +
autocurse-glow plines with the `another` substitution, old/best
artifact_light end/begin_burn arms, four-way shine pline, invis
cannot-see + makeknown, async through `m_dowear`/`maybe_m_dowear_special`
with awaited callers. Matches the promise. One undocumented extra:
`vision_recalc(1)` after `begin_burn` (see below).

## Inventory

- `m_dowear_type` (local, now async): message + light arms.
- `m_dowear`, `maybe_m_dowear_special` (exported, now async): await-through.
- Imports, all LIVE canonical: `strsubst` (hacklib.js:278), `distant_name`
  /`doname`/`simpleonames`/`otense`/`Yname2`/`arti_light_description`
  (objnam.js), `artifact_light`/`begin_burn`/`end_burn` (timeout.js),
  `makeknown` (invent.js:3984), `vision_recalc` (vision.js:908),
  `Something` (const.js:539 `"Something"`), `hcolor` (do_name.js).
  No clones, no stubs. (`Yname2` has clones in do/music/timeout — this
  site imports the export. Correct.)

## C ↔ JS fidelity

Against `worn.c:798–1002`: `sawmon`/`sawloc` before visibility change
(`:809`); puts-on buffer shape `" removes %s and"` + `"%s%s puts on %s."`
(`:920–951`) including empty-buf no-old path; case-insensitive
newarm-vs-oldarm compare with `a `/`an ` → `another ` via canonical
`strsubst` (`:939–949`); autocurse pline arg order incl.
`hcolor(NH_BLACK)` (`NH_BLACK` ≡ black, `decl.h:17`; `Something` ≡
`"Something"`); `old.lamplit && artifact_light(old)` short-circuit order
for `end_burn`; `artifact_light(best) && !best.lamplit` for `begin_burn`;
four-way shine pline verbatim (`:971–984`); `!creation && (sawmon ^
canseemon)` invis arm with the commented-out else-branch honored (`:987–995`).
Branch order and RNG call-for-call (no RNG in the arms). Async safety:
every `await` sits behind `!creation`; creation callers
(makemon/mplayer/trap/savebones/guardian) run sync-through with no await
reached; all !creation entries (`movemon_singlemon`,
`maybe_m_dowear_special`) are awaited. Named defers (W_ARMC See_invisible
guard, dragon-scale altprop, extract_from_minvent light) recorded in-map.

Gap (debt, not blocking): `vision_recalc(1)` after `begin_burn`
(`js/worn.js:945`) has no C counterpart — C `m_dowear_type` never recalcs;
C `begin_burn` → `new_light_source` only sets `vision_full_recalc`
(`light.c:92`), consumed at display time (`allmain`/`display`), and no
other `begin_burn` call site in `js/` pairs it with a recalc. Effect is
RNG-free and display-convergent, but the immediately following
`cansee(mon.mx,mon.my)` then reads a fresh matrix where C reads the
stale one, which can flip the shine 4-way when a monster's new light
changes its square's visibility. Undocumented in the D-log Fix bullet.

## Hallucinations / overclaim

None on the headline: "Match C" is earned arm-for-arm except the noted
recalc line. The `imports.mjs --can` claims check out (all imports resolve
to live exports; `sym.mjs` confirms).

## Density

One C function + tight caller updates, ~95 insertions, 1 corpus block.
In-band §2b.

## Verification

Re-measured myself: `hidden-proxy.mjs verify m_dowear_type --base
daf781a8~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(Samurai-92017 fully PASS). The D-log's PASS claim is true, not vacuous.
Green 2/2 + strict + cohort per D-log; no seed/coordinate/RNG-index reads
in the diff (grepped clean).

## Actionable C-wrongs

1. (Debt) `js/worn.js:945` `vision_recalc(1)` — no C citation; either drop
   it (deferred flag already shows the light at display) or name the
   divergence in the worn map section. One-line iter.

Verdict: **ACCEPT-WITH-DEBT**
