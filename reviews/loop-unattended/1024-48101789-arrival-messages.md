# Review 1024 — 48101789 — arrival --More--: DELPHI + COURT + Sam goal_first (D-2054)

Metadata: SHA `48101789`, D-2054, Open-row port
(queue owner `level_tele`, screen-first missing
arrival text, 3 sessions). js/ touches 4 files:
`hack.js` (+~79), `mklev.js` (one-word export),
`questpgr.js` (+Sam text), `quest.js` (header
comment). No stamp owed.

## Intent vs deliverable

Subject promises: COURT throne suffix via a local
`furniture_present`, DELPHI oracle verbalize via a
local `monstinroom` (+ `room_discovered` now
running), Sam `goal_first` body verbatim from
quest.lua. Diff actually adds exactly that. Promise
≡ diff.

## Inventory

- New JS: `monstinroom` (sync file-local),
  `furniture_present` (async file-local, lazy
  `import('./mklev.js')` at call time);
  `QUEST_GOAL_FIRST.Sam` + meta; one-word
  `export` on `inside_room`.
- `sym.mjs`: `SetVoice js/sndprocs.js:50 sync`,
  `Hello js/roles.js:740 sync`,
  `verbalize js/display.js:7222 ASYNC` (awaited
  at both sites ✓). `--can`: both new static
  names are ALREADY-imported edges (no new edge).
  `verbalize` joins the existing display.js line;
  `THRONE` joins the const.js line.
- No symbol deleted or re-pointed. `inside_room`
  export widens visibility of the mkroom.c port
  instead of cloning it (D-1849-compliant ✓).

## C ↔ JS fidelity

C loci (`csym.mjs`: `check_special_room`
`hack.c:3625-3780`, `monstinroom` `:3465-3478`,
`furniture_present` `:3481-3495`):

- COURT (`:54-58`): `You("enter an opulent%s
  room!", !furniture_present(THRONE,roomno) ? ""
  : " throne")` → JS appends `' throne'` iff
  present ✓ (with the Sam-home-level comment
  preserved). `furniture_present` body: room bbox
  scan + `inside_room` irregular rejection ✓
  line-for-line.
- `monstinroom`: fmon scan, DEADMONSTER skip,
  `data==mdat` + `in_rooms(0)` contains
  `roomno+ROOMOFFSET` ✓. JS compares numeric
  `mnum ?? data?.mndx` to the PM const — equal to
  pointer equality under the JS data model (mnum
  tracks the form). `want = roomno + ROOMOFFSET`
  + `indexOf(...)>=0` mirrors `strchr` ✓.
- DELPHI (`:88-101`): oracle → `SetVoice(oracle,
  0,80,0)`; hostile → `You're in Delphi, %s`;
  peaceful → `Hello(NULL), welcome`; else
  `msg_given=FALSE` ✓ all four. `Hello(null)`
  resolves via `urole.mnum` — C `Hello(NULL)`
  likewise uses the player role ✓.
- Load-bearing tail (`:110-111`): `if (msg_given)
  room_discovered(roomno)` — JS mirrors it, so
  with an oracle present the discovery now runs
  (previously JS forced `msg_given=false` always).
  Overview/mapseen-only, no live-map effect, as
  stated ✓.
- Sam `goal_first`: text + synopsis verbatim from
  `dat/quest.lua:2276-2284` (bracket convention
  matches sibling entries) ✓. Delivery machinery
  (`flush_topl_more` + `show_text_pages`) was
  already live — no dispatch invented.
- BARRACKS soldier check + wake_msg text stay
  named omits (same switch, untouched) ✓.

Callee closure: verbalize/Hello/SetVoice/
inside_room all LIVE; no stub in a live arm.

## Hallucinations / overclaim

None — and one preempted confusion: the verify
line's "js-throw" token for Barbarian-92129 is
the proxy's null-owner fallback. Scoreboard row
confirms `error: null`, RNG 38280/38280, step-177
map-glyph diff — exactly what the D-log says.

## Density

~100 insertions / 4 files / one arrival-message
family (one shape: the missing post-`level_tele`
`--More--`). The three arms are the three
sessions' three causes inside one function. The
10 frozen `--More--` screens on 70015 reproduce
byte-exact with no extra port — evidence the arms
are complete, not padded.

## Verification

- Diff-hunk grep: 1 hit, commit-message only;
  zero code hits. No seed/getRngLog/coords.
- Re-measured `hidden-proxy verify level_tele
  --base 48101789~1`: `1 PASS, 2 moved past,
  0 unchanged, 0 worse → PROGRESS` (70015 PASS
  50/50; 92161 → next_ident@34 was 26; 92129 →
  step-177 glyph diff was 51) — matches the D-log
  step-for-step (owner label on 92129 is the
  null-owner fallback, verified above).
- Green 2/2 + strict ×2, cohort 7/7, full 44/44
  (shared hack.js ⇒ full auto-ran) per pasted
  tails.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
