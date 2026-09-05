# Iteration 2262 postmortem — mineralize leftover (for strategy review)

**Audience:** a fresh model (e.g. Fable 5.1) that has not seen the loop
prompt, the 43 MB stream-json, or this repo’s Constitution. This file is
the briefing. Sources: `.agent-port-loop-logs/iter-2262-20260905-083009.raw`
(killed at 54 min), leftover `git diff HEAD -- js/mklev.js`, D-1847,
review 817, `docs/NOTES.md`, `docs/LOOP-QUEUE.md`.

**Outcome:** no port shipped. No C-faithful JS change. 27 edits were
temporary DIAG dumps (dlevel/coordinate gates). The agent was SIGTERM’d
mid C-binary probe. Public suite remains 44/44 at `77d45652`. The Open
queue row is unchanged.

---

## 0. How to use this file

Ask the reviewing model two separate questions (do not mix them in one
prompt if you want clean answers):

1. **Process / strategy.** Why did a green-suite Open peel burn ~55
   minutes and 362 tools without a handoff? What should change in the
   loop prompt, `brief.mjs`, queue wording, or “when stuck” playbook so
   the next agent does not repeat it?
2. **The remaining C-wrong.** Given the evidence below (not a new grep
   of `js/mklev.js`), what is the cheapest *C-faithful* next peel that
   could make C and JS agree on the extra `rn2(1000)` gold check? What
   dump would falsify it in one run?

Do **not** ask it to invent a FORCE of tiles `(76,14)` / `(77,14)` to
STONE. D-1847 already proved that passes Knight and is banned (seed /
coordinate control flow).

---

## 1. One-screen verdict

| | |
|---|---|
| Loop iter | **#2262** (global), started 2026-09-05 08:30:10 +02 |
| Model | Cursor Grok 4.6 Extra High (`cursor-grok-4.6-xhigh`) |
| Wall clock | **54.2 min** (3250 s). Killed by operator (SIGTERM, exit 143). Not a timeout, not quota. |
| Tool calls | **362 started / 361 completed / 6 err** |
| Visible assistant text | **5 short status lines** (~800 chars). Almost all time is hidden thinking (~222 k chars, 10 313 stream deltas). |
| Shell mix | `csym.mjs` ×49 · `brief.mjs` ×19 · `sym.mjs` ×10 · hidden-session runner ×8 · C-nethack probe ×6 · `verify.mjs` ×1 (**`--no-cohort` only**) · `git status` ×1 |
| Never run | `verify.mjs --fn mineralize` · `hidden-proxy.mjs verify` · `rng-diff` · `hidden-worker` · `finish-iteration.mjs` |
| Edits | 27× `js/mklev.js`, all DIAG. Net leftover **+76 / −7**. Throws `Error(_mkDumpHdr)` on dlevel 5 and 6. |
| Reconnects | Two agentn disconnects (23:26 and 27:59). Retries with `checkpoint_turn_count: 1` (context may have collapsed to turn 1). ~5 min dead. |
| Overlay in the prompt | Navigation note from **#2261**: “you grepped instead of `sym.mjs`.” #2262 over-corrected into a `csym`/`brief` tour of ~40 mklev symbols. |

Median port iteration in this repo is on the order of **~14 min / ~176
calls / ~6 M tokens** (see `docs/2026-09-05-continuation-postmortem-2238-2240.md`).
This run is ~4× wall clock at similar call count, with **zero** verified
code.

---

## 2. What the queue item actually is

### 2.1 The row the agent was told to pop

```
- [ ] mklev.c mineralize — 2 corpus blocks;
      C rn2(1000) vs JS place_lregion rn2(79).
```

That sentence describes the **first positional RNG mismatch** in two
held-out sessions. It is *not* “JS `mineralize` still draws `rn2(1000)`
wrongly.” After D-1847 the gold/gem **loop body** matches C. JS simply
**never visits one extra STONE cell** that C still treats as eligible,
so C draws one more `rn2(1000)` and JS has already moved on to
`place_lregion`.

### 2.2 The two blocked corpus sessions

From `hidden-corpus/scoreboard.json` at HEAD (`77d45652`):

| Session | Step | C | JS | RNG |
|---|---:|---|---|---|
| `tour-Knight-70020-d5-8-15-17-22` | 3 (`^V` to dlvl 5) | `rn2(1000)=… @ mineralize(mklev.c:1515)` | `rn2(79)=… @ place_lregion(mklev.js:590)` | **13015 / 13017** (2 draws short). Screens **50/50**. |
| `tour-Monk-70009-d3-6-10-11-12` | 12 (`^V` path; leftover is **dlvl 6**) | same owner | same JS owner | **18322 / 18324**. Screens **50/50**. |

Toplines match (`You materialize on a different level!`). This is a
**geometry / eligible-cell count** bug, not a message bug.

Replay (JS side):

```bash
node frozen/ps_test_runner.mjs .cache/hidden/sessions/tour-Knight-70020-d5-8-15-17-22.session.json
node frozen/ps_test_runner.mjs .cache/hidden/sessions/tour-Monk-70009-d3-6-10-11-12.session.json
```

Corpus verify after a real port:

```bash
node scripts/verify.mjs --fn mineralize
# or: node scripts/hidden-proxy.mjs verify mineralize --base 77d45652
```

### 2.3 What D-1847 already proved (do not re-port)

Shipped in `2c9f2ad0`. Review **817** ACCEPT-WITH-DEBT. Status **partial**.

Gold/gem skip arithmetic (`y += 2` / `y += 1` then the `for` `y++`),
`Is_special` via `on_level`, `dunlev` default 0, `bound_digging`
earth/`W_NONPASSWALL`, `join` arboreal `ROOM`, `reset_xystart_size`
call sites — all claimed C-faithful. Hidden verify: **NO MOVEMENT**
(2 unchanged). Public 44/44 held.

**Named leftover (D-1847, NOTES, CURRENT, review 817 — all agree):**

- Knight d5: C **410** gold `rn2(1000)` checks, JS **409**. First 409
  values match. C’s extra is `rn2(1000)=52` at **(77,13)**.
- At mineralize time JS has **HWALL at (76,14)** and **TRCORNER at
  (77,14)**; C has **STONE** there. `wall_cleanup` (`mkmaze.c:197–225`)
  converts a wall to STONE only when **all eight neighbors** are
  `is_solid` (`!isok || IS_STWALL`). JS still has **ROOM at (75,15)
  and (76,15)**, so the east HWALL+TRC cannot become STONE, so (77,13)
  is not an eligible gold cell (`y+1` must be STONE).
- **Falsifier already in NOTES:** forcing those two tiles to STONE
  yields the 410th gold and Knight **13017/13017**. **Not shipped**
  (would be a coordinate FORCE). “Do not re-port the gold loop.”
- Review 817: next peel is **`wall_cleanup` / room-paint at the `ly=15`
  east corner**, not another gold-loop pass. Same-size 6×4 `create_room`
  lockstep was already checked in D-1847.

C `wall_cleanup` (the conversion the leftover depends on):

```197:225:nethack-c/upstream/src/mkmaze.c
staticfn void
wall_cleanup(coordxy x1, coordxy y1, coordxy x2, coordxy y2)
{
    /* ... */
    /* change walls surrounded by rock to rock. */
    for (x = x1; x <= x2; x++)
        for (y = y1; y <= y2; y++) {
            /* bughack.inarea skipped */
            if (IS_WALL(type) && type != DBWALL) {
                if (/* all 8 neighbors is_solid */)
                    lev->typ = STONE;
            }
        }
}
```

`is_solid` is `!isok(x,y) || IS_STWALL(levl[x][y].typ)` with
`IS_STWALL(typ) = (typ) <= DBWALL`. ROOM is not STWALL. A single
interior ROOM neighbor is enough to keep the wall.

C paints ordinary rooms in `do_room_or_subroom` (`mklev.c:230–301`):
HWALL on north/south (including corners first as HWALL), VWALL on
east/west, then interior `typ = ROOM`, then overwrite corners to
TLC/TRC/BLC/BRC. Interior `(hx, hy)` **is supposed to be ROOM**. If C
and JS both painted a 6×4 at `(71,15)–(76,18)`, both would have ROOM
at (75,15)/(76,15) and **neither** would convert (76,14). The
D-1847 leftover only makes sense if **C does not have that interior
ROOM** (different room bounds, room never placed, later overwritten
to STONE, or the wall was never painted).

---

## 3. What iteration 2262 actually did

### 3.1 Timeline (from the raw stream)

| t | Phase | What happened |
|---|---|---|
| 00:00–00:19 | Preflight | Read playbook/CURRENT/NOTES/queue/HIDDEN-PROXY. `git status` clean. `verify.mjs --no-cohort` PASS. `brief.mjs mineralize` (~15 kB — already contained D-1847 leftover + replay cmds). |
| 00:19–05:24 | Read-only spiral | `csym`/`sym` on `wall_cleanup`, `create_room`, `join`, `add_room`, `check_room`, `do_room_or_subroom`, `IS_STWALL`, `sort_rooms`, `finddpos`, `level_finalize_topology`, `makerooms`, … Thinking correctly restates D-1847, then generates six hypotheses (oversize room, join, flood-fill, themerms, wallification timing, xstart). **No dump yet.** |
| 05:24–08:00 | First JS DIAG | Inserts `throw new Error(MINDUMP…)` inside `mineralize`. Runs Knight hidden session **three times**. First dumps mix **dlvl 1** (different rooms) with **dlvl 5**. Confuses itself, then lands on d5 room 7. |
| 08:00–22:00 | Symbol tourism | 20+ more `csym` (`XLIM`, `bound_digging`, `bughack`, `add_doors_to_room`, `build_room`, `topologize`, `dig_corridor`, `lspo_map`, `flood_fill_rm`, `split_rects`, `get_location`, …). 92 greps. No C dump. No `verify --fn`. |
| 22:00–23:26 | Second DIAG wave | Dumps in `add_room`, `wallification`, `themerooms_generate`. Discovers T-shaped themeroom `(69,2)–(74,10)` **above** the leftover. Spins on `filler_region` / `SHOPBASE` vs `THEMEROOM` constants. |
| 23:26–28:04 | **Disconnect** | `connection: reconnecting` ×2; `retry` with `checkpoint_turn_count: 1`. ~5 min gap. |
| 28:04–35:31 | More theories | `split_rects` exclusive bounds, `smeq` after `sort_rooms`, `create_room` `yabs`, `lspo_region` `get_location` vs JS `xstart+ystart`. Monk session dump: **those Knight coordinates are STONE on Monk d3** (wrong level). |
| 35:31–52:00 | `brief.mjs` of everything | `wall_cleanup`, `do_room`, `add_room`, `do_room_or_subroom`, `wallification`, `create_room`, `check_room`, `themerooms_post_level_generate`, `fix_wall_spines`, `makeniche`, `dig_corridor`, `flood_fill_rm`, `bound_digging`, `add_doors_to_room`, `topologize`, `lspo_map`, `okdoor`, `maybe_add_door`. Then **hand-parses the C session JSON** (screen rows, RNG lists) instead of `hidden-worker` / `rng-diff`. |
| 48:38 | Useful dump | Monk **d6** `MINDUMP#3`: east room `(69,15)–(75,17)` — same `ly=15` family, **one column narrower** than Knight. |
| 52:00–54:10 | C probe, too late | `nm` on recorder binary (`_mineralize` exists). Starts `arch -x86_64 nethack` with seed 70020 + wizard `^V` 5. **Killed here.** Playbook §7 (“prefer a temp C dump at the cited locus” for geometry) was the *last* idea, not the first. |

### 3.2 Assistant-visible text (complete)

1. `[00:08]` I’ll start with the required docs and preflight, then pop the queue head (`mklev.c` mineralize) via `brief.mjs` rather than grepping.
2. `[00:16]` Git is clean. Next I’ll run the green-gate preflight, then `brief.mjs mineralize`.
3. `[00:34]` Preflight is green. The gold/gem loop is already C-faithful; the leftover is the named 1-cell TRC.
4. `[05:24]` Leftover is extra ROOM blocking `wall_cleanup`. I’ll dump rooms and the (75–77,13–16) patch on the Knight d5 session.
5. `[35:31]` Knight extra gold cell is (77,13); both leftover rooms keep interior ROOM, so `wall_cleanup` cannot convert the TRC.

Five sentences in 54 minutes. The model was thinking continuously and
almost never summarizing or stopping.

### 3.3 Hypothesis graveyard (from reconstructed thinking)

The agent **considered and (mostly) discarded**, in order:

| # | Theory | Fate in this iter |
|---|---|---|
| 1 | Gold-loop skip arithmetic still wrong | Correctly refused (D-1847). |
| 2 | `wall_cleanup` / `is_solid` / `IS_STWALL` JS≠C | Read both; concluded faithful. Did not ship a change. |
| 3 | `do_room_or_subroom` off-by-one on last column | Read both; concluded HWALL/ROOM loops match. |
| 4 | `sort_rooms` remaps `roomnoidx` / `smeq` differently | Concluded JS matches C’s “stale smeq after qsort” quirk. |
| 5 | `check_room` shrinks JS less than C | Speculated; no C room-bounds dump to compare. |
| 6 | T-shaped themeroom `add_room` paints a solid bbox over STONE cutouts | Dump showed T-map south wall ~y=11; leftover is room 7 at y=15. **Ruled out as the painter of (76,14).** |
| 7 | `filler_region` / `flood_fill_rm` leak south | Dump: (75,14)/(75,15) still STONE *before* room 7 `add_room`. |
| 8 | C never placed room 7 (check_room reject) while JS did | Attractive, but **409 matching gold values** imply the same number of eligible cells *until the last one*, so a whole extra 6×4 room is a large RNG claim. Agent oscillated on this. |
| 9 | JS `filler_region` skips C `get_location` | Noted; not tested. Room 7 comes from `create_room`, not the T region. |
| 10 | `split_rects` exclusive vs inclusive | Read; not tested. |
| 11 | Port `add_doors_to_room` / garden / `replace_terrain` as a density cluster even if mineralize does not move | Planned at 53:30; would have been an **unrelated** cluster on an Open mineralize row (playbook forbids). |

**Working theory at kill time:** C does not have interior ROOM at
(75,15)/(76,15) for that east `ly=15` room, therefore `wall_cleanup`
turns the NE wall to STONE, therefore (77,13) is gold-eligible. JS
*does* have that 6×4 room fully painted. **Missing measurement:** C
`levl[76][14]`, `levl[77][14]`, `levl[75][15]`, `levl[76][15]` and C
`rooms[]` bounds on Knight d5 at entry to `mineralize`. That is exactly
the playbook §7 geometry dump.

---

## 4. Evidence the dumps actually produced

Keep these; they are the only new facts.

### 4.1 Knight d5 (`MINDUMP#2`, `uz=0:5`) — JS at `mineralize`

Rooms (JS):

```
0:(5,3)-(12,7) t=24     1:(10,14)-(17,18) t=0
2:(21,4)-(33,6) t=0     3:(34,15)-(46,18) t=0
4:(40,4)-(48,8) t=0     5:(56,11)-(59,15) t=0
6:(69,2)-(74,10) t=1    7:(71,15)-(76,18) t=0    ← leftover room
8:(59,2)-(60,3) t=4
```

Room 6 is the T-shaped themeroom (`t=1` THEMEROOM). Room 7 is an
ordinary 6×4 at **ly=15, hx=76**.

Tile probes around the leftover (typ: 0 STONE, 2 HWALL, 4 TRC, 25 ROOM):

| Event | (76,14) | (77,14) | (75,15) | (76,15) |
|---|---|---|---|---|
| After room 7 `do_room` paint | HWALL | TRC | ROOM | ROOM |
| Pre-wallify (full map) | HWALL | TRC | ROOM | ROOM |
| Post-wallify | HWALL | TRC | ROOM | ROOM |

So JS `wall_cleanup` is doing what C would do **given those interiors**.
The peel is “why does C not have ROOM there?”, not “rewrite `wall_cleanup`.”

East patch at mineralize (JS):

```
y14  … 70:TLC 71:HWALL 72:23 73:HWALL 74:23 75:HWALL 76:HWALL 77:TRC 78:STONE
y15  … 70:VWALL 71:ROOM 72:ROOM 73:ROOM 74:ROOM 75:ROOM 76:ROOM 77:VWALL 78:STONE
```

(`23` is `SDOOR` / similar — doors on the north wall. Not the leftover.)

### 4.2 Monk d6 (`MINDUMP#3`, `uz=0:6`) — same family

```
7:(69,15)-(75,17) t=0
y15  … 68:VWALL 69:ROOM … 75:ROOM 76:VWALL 77:STONE
```

East ordinary room at **ly=15**, but **hx=75** (one column west of
Knight’s hx=76). NOTES already called Monk “the same 1-cluster gap.”
A C dump of Monk d6 room bounds + those four tiles is the paired
falsifier.

### 4.3 C session JSON (Knight step 3)

Hand-parsed from `.cache/hidden/sessions/tour-Knight-70020-…`:

- Step 3 RNG log: **840** mineralize-tagged draws; first
  `rn2(1000)=94 @ mineralize(mklev.c:1515)`.
- D-1847: C extra draw is `rn2(1000)=52` at (77,13) after 409 matching
  gold values.
- Screens at step 3 already match (50/50). You cannot see the leftover
  on the tty; it is pre-entry topology.

### 4.4 Pitfall: first Knight dump was the **wrong level**

`MINDUMP#1` (earlier in the same process, probably d1) showed an east
room `(69,9)–(74,13)` with STONE at (76,14). The agent spent minutes
treating that as d5. Any future dump must key on **`uz.dlevel`** (5 for
Knight, 6 for Monk) or it will lie.

---

## 5. What went wrong (process) — facts, not sermons

These are the strategy questions. Evidence in the raw:

1. **The answer was already in NOTES / D-1847 / review 817.** The
   iteration re-derived “ROOM at (75,15) blocks wall_cleanup” from
   scratch, then spent 50 minutes reading callees of callees. `brief.mjs
   mineralize` at 00:19 already printed the leftover, the replay command,
   and “do not re-port the gold loop.”

2. **Queue wording pulls toward the wrong function.** “C `rn2(1000)` vs
   JS `place_lregion` `rn2(79)`” is the **attribution**, not the peel.
   The agent started in `mineralize` (correct to pop) but then needed a
   *geometry* protocol. Playbook §7 says: geometry → **temp C dump at
   the locus**, not another FORCE / another gold-loop pass. The C dump
   started at minute 52.

3. **JS DIAG was used as a substitute for a C dump.** Playbook: “Prefer
   a temp C dump … over screens, JS FORCE, or another topline shim.”
   The agent threw `Error(dump)` from production `mineralize` gated on
   `dlevel === 5 \|\| 6` and hardcoded coords. That is:
   - a **seed/dlevel/coordinate gate** (contest / review REJECT if shipped);
   - a process that **cannot see C `levl[]`**, which is the one unknown.

4. **`brief.mjs` of functions that are not blocked is a trap.** After
   35:31 it called `brief.mjs` on ~15 symbols. Each brief says
   “no queue row / none blocked on it” and dumps unrelated D-index
   rows. That looks like progress and is not.

5. **Navigation overlay over-correction.** #2261 was scolded for grep
   instead of `sym.mjs`. #2262 called `csym` 49 times and still grepped
   92 times (including hunting `level.at` across `js/`). The overlay
   did not name a **stop condition** (“if NOTES already has a dump
   falsifier, do that dump”).

6. **Reconnect with `checkpoint_turn_count: 1`.** If that really resets
   visible chat to turn 1, the model may have re-thought the same
   hypotheses after 23:26 without a durable note. There is no
   `loop-resume-brief` for an *in-iteration* disconnect.

7. **No halt after two falsifications.** Playbook §7: after two failed
   theories, reconstruct the C path or park. The agent listed ten
   theories and kept opening files.

8. **Density-at-any-cost temptation** at 53:30 (“port garden /
   `add_doors_to_room` so the iter is not empty”). That would have
   shipped an unrelated cluster on a mineralize Open row and likely
   been reverted.

9. **Hidden-session JSON archaeology.** `scripts/lib/hidden-worker.mjs`
   and `rng-diff` already print first diffs. The agent wrote five
   inline Python parsers of `segments[0].steps[i].rng` (and even
   printed the C *screen* as one-char rows). Cost: several long
   thinking turns. New information: almost none beyond D-1847.

10. **Killed leftover is dirty `js/mklev.js`.** Operator must revert or
    finish stripping DIAG before any relaunch (`AGENT_FORCE=1` refuses a
    dirty tracked tree unless continue-unfinished is armed).

---

## 6. Tree state right now (2026-09-05 ~09:25)

- HEAD: `77d45652` (D-1848 lookat stamp; mineralize still Open).
- Uncommitted: `js/mklev.js` +76/−7 — DIAG only (`g._mkDump`,
  `game._mineralizeDumpN`, `throw new Error(...)` on dlevel 5/6,
  recorded cells 76,14 / 77,14 / 75,15 / 76,15).
- `STOP_AGENT_LOOP.md` = `1`.
- `last-halt-reason.txt` is **stale** (older “3 consecutive short
  runs”); this kill did not rewrite it.

**Do not commit that diff.** Strip or `git checkout -- js/mklev.js`
before the next port iter.

---

## 7. Constraints the next peel must respect

From Constitution / playbook / review 817 (non-negotiable):

- Scored `js/` is plain ESM; no `fs`; no DIAG/FORCE left in the handoff.
- No seed names, recorded coordinates, or raw RNG-index gates in
  **production control flow**. Dumps are allowed only if deleted before
  commit (playbook: temp dump, revert after).
- Do not FORCE `(76,14)`/`(77,14)` to STONE even though it PASSes Knight.
- Do not re-port the gold/gem loop body.
- One C family per Open iter. If the real C-wrong is `create_room` /
  `check_room` / `do_room_or_subroom` / themerms placement, **cite that
  C function** in the D-log; mineralize stays the *symptom* until the
  extra cell appears.
- Public 44/44 is a regression fortress. A peel that moves hidden Knight
  but breaks public sessions is a failed handoff.
- `hidden-proxy verify mineralize` must show PASS or movement to a
  **later** owner. NO MOVEMENT = the arm is still wrong, not “named.”

---

## 8. Cheapest remaining experiments (for the “how to solve it” prompt)

Ordered by “one command, one unknown.” Not a recommended patch.

1. **C tile dump at `mineralize` entry on Knight d5** (playbook §7).
   Recorder binary is `nethack-c/recorder/install/games/lib/nethackdir/nethack`
   (Mach-O x86_64). Symbols: `_mineralize`, `_u`, `_svr`, `_svl`.
   Print `u.uz.dlevel`, `svn.nroom`, each `svr.rooms[i].{lx,ly,hx,hy,rtype}`,
   and `levl[76][14].typ`, `levl[77][14].typ`, `levl[75][15].typ`,
   `levl[76][15].typ` when `dlevel==5`. Compare to §4.1. Repeat Monk
   `dlevel==6` for `(69–76, 15–17)`.
2. If C **also** has room 7 = `(71,15)–(76,18)` and ROOM at (75,15):
   then D-1847’s “interior ROOM blocks cleanup” story is incomplete
   (C would not convert either). Pivot to “what *after* paint, *before*
   mineralize, sets those C tiles to STONE?” (`join`/`dig_corridor`/
   `topologize`/`bound_digging` are already claimed faithful — dump C
   **after each**).
3. If C **does not** have that room, or has `hx<76`: dump `create_room`
   / `check_room` return for the last ordinary room (wtmp/htmp, whether
   `check_room` failed). RNG-lockstep of `rn2` during `makerooms` on
   that level (rng-diff on the mklev prefix) tells you whether JS placed
   a room C rejected.
4. **Do not** start by `brief.mjs`’ing `flood_fill_rm`. The JS dump
   already showed the T-map did not paint y=15.

---

## 9. Suggested prompts to paste into Fable 5.1

### A. Strategy / loop design

> You are reviewing a failed unattended C→JS NetHack port iteration.
> Read `docs/2026-09-05-iter-2262-mineralize-postmortem.md` (this file).
> The public suite is 44/44. The agent had D-1847 + NOTES + `brief.mjs
> mineralize` in the first two minutes, then spent 54 minutes and 362
> tools without a C dump until minute 52, and shipped nothing.
>
> Propose concrete changes (prompt text, queue-row template, tool
> policy, halt rules) that would have stopped this by ~minute 15 with
> either a C dump comparison or a parked “need C levl dump” note.
> Do not propose new alignment/FORCE machinery. Do not rewrite the
> Constitution. Call out which existing playbook rules were ignored
> versus which rules are missing.

### B. Solving the leftover

> Same briefing. Assume we revert the DIAG diff. What is the single
> cheapest C-faithful experiment to explain Knight d5’s extra
> `rn2(1000)` at (77,13)? Give: the C function to cite, the exact
> dump (C and JS), the two possible outcomes, and what to port in
> each case. Forbid coordinate FORCEs and a second gold-loop pass.

---

## 10. Pointers (optional; the briefing above is enough)

| Doc / artifact | Why |
|---|---|
| `docs/GROK-PLAYBOOK.md` §2a, §2b, §7, §9 | Map-driven mode, density, C dump when stuck, pitfalls |
| `docs/HIDDEN-PROXY.md` §1–3 | What a corpus row is; `verify` semantics |
| `docs/DIVERGENCE-LOG.md` **D-1847** | Last mineralize peel |
| `reviews/loop-unattended/817-2c9f2ad0-mineralize.md` | ACCEPT-WITH-DEBT; leftover named |
| `docs/NOTES.md` Active “1-cell TRC” | Falsifier already written |
| `docs/2026-09-05-continuation-postmortem-2238-2240.md` | Prior 43-min continuation failure (different causes) |
| Raw log | `.agent-port-loop-logs/iter-2262-20260905-083009.raw` (43 MB) |
| Resume extractor | `node scripts/loop-resume-brief.mjs` that raw (caps at 220 lines) |

---

## 11. Resolution (2026-09-05, Fable 5.1 — after the sections above)

**The premise in §2.3 was false.** "C STONE at (76,14)/(77,14)" was never
measured: it was inferred from a JS FORCE that restored the RNG count.
The frozen runner scores RNG positionally over the whole session, so a
one-cell gap in `mineralize` re-aligns two draws later (13015/13017) and
*any* single-cell change satisfies it. Two different C states were
consistent with every number in §1–§4.

**One recording answered it.** Fork the Knight recipe at the `^V 5 Enter`
step, append wizard `^F`, record on the existing recorder (0.3 s, no
rebuild), replay the same keys in JS, diff the two `^F` screens
cell by cell:

| Session | Only differing map cell | C | JS | C-only gold cell |
|---|---|---|---|---|
| Knight d5 | (6,9) | STONE | ROOM + `"Closed for inventory"` engraving | (5,10) |
| Monk d6 | (5,7) | STONE | ROOM + same engraving | (4,8) |

The east `ly=15` room has its full top wall and corner in C. The map-derived
eligible-cell scan reproduced C's recorded counts exactly (410 / 472).

**The C-wrong was not in `mklev.c`.** `shknam.c` `stock_room` engraves
`"Closed for inventory"` outside a locked shop door, choosing the cell with
`shk.c` `inside_shop`, which treats wall cells (`edge`) as outside.
`js/shknam.js` carried a local `inside_shop` clone without the `edge`
test, so the door's wall neighbour counted as inside, the engraving went
one cell west into rock, and C's typ rewrite — ported as "always ROOM" —
turned that rock into ROOM. Fix: D-1849 (`fc3c7c8b`): import the
`shk.js` export, port `(Is_special || *in_rooms) ? ROOM : CORR`. Both
sessions PASS; public 44/44; corpus 217 → 222/265.

**What changed so this does not repeat**

- `scripts/geom-probe.mjs` — the measurement above as one call:
  `node scripts/geom-probe.mjs <session-id> [--step N] [--js-root dir]`
  (forks the recipe, records C `^F`, replays JS, prints every differing
  cell and the mineralize-eligible diff; `--js-root` bisects a scratch
  copy). `brief.mjs` prints that command for level-gen owners.
- Playbook §7 rewritten: geometry owner → probe first; evidence grades
  (*measured* vs *inferred*); park after two falsifications **or** ~40
  calls without a C measurement. §3 anti-pattern: helper clone dropping a
  C predicate. §9 / §11 updated.
- Runbook §5.C.5–6, §5.G, §6 "A level-wide scan owns the first diff".
- Loop prompt: "Geometry owners" paragraph + the ~40-call rule.
- Constitution §10.12: measure C before theorizing; evidence grades;
  a JS FORCE/DIAG is not a falsifier.
- `LOOP-QUEUE.md` header, `HIDDEN-PROXY.md` §2–3, `AGENT-PORT-LOOP.md`
  failure modes (probe-less geometry spiral; mid-iteration reconnect —
  still a proposal for the supervisor).

**Rules that existed and were ignored vs rules that were missing**

- Ignored: playbook §7 "prefer a temp C dump at the cited locus" for
  geometry (came at minute 52); §7 "after two falsifications … park";
  §9 "infer C geometry from screens"; `sym.mjs` "IMPORT the export; do
  NOT add another" for `inside_shop`.
- Missing: a one-call C geometry measurement (the dump advice needed a
  rebuild, so it was never first); the distinction between a measured
  and an inferred C-state claim in NOTES (the false premise read as
  fact); the "symptom owner ≠ writer" rule for level-wide scans; a
  call budget that ends theorizing without a measurement.
