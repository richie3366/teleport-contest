# Review 2109 — 40d1154a3 — cmd suspend/shell + extcmd-match family

- SHA: `40d1154a3e7befb20908d63dfcd0e226eaeea627` (D-3149)
- Date: 2026-09-30. `js/` delta: +61 cmd.js / +6−2 generated / +50−63
  getline.js; plus extractor fix + new test (4/4, re-ran myself).
- Cluster: 5 `cmd.c` functions — new `dosuspend_core`/`dosh_core`/
  `extcmds_getentry`, `extcmds_match` caller rewire, stale `cmdbind_remove`.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "suspend/shell + extcmd-match family". Diff actually
adds: `cmdnotavail` + `win_can_suspend` + both cores in cmd.js, shell/
suspend EXT_CMDS runners, `extcmds_getentry`, the `extCmdAutocomplete`
rewire with `EXT_CMD_AC`/`availableAcNames` deletion, extractor DEBUG fix
+ regen (+4 rows, migratemons desc). Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `dosuspend_core` (cmd.js:1376, async export; C `staticfn` — export needed for the getline.js runner) | new, C order | whole |
| `dosh_core` (cmd.js:1400, async export; same export note) | new, C order | whole |
| `extcmds_getentry` (getline.js:1377, sync export — C extern) | new | whole |
| `extcmds_match` (getline.js:1342, pre-existing) | caller rewired, body untouched | whole (verified) |
| `cmdbind_remove` (cmd.js:1646, stale) | none | whole (verified) |

Callee closure, all LIVE: `getnow` (`calendar.js:177`), `timet_delta`
(`allmain.js:1458`), `game.urealtime` (`{realtime,start_timing,...}`
`:902`), `Norep` (`display.js:7993`, async, awaited). `win_can_suspend`
is a platform-constant helper (false; tty answers
`genl_can_suspend_yes`, ESM has no SIGTSTP) — correct adaptation, not a
clone. Named omits: `dosuspend()` (SIGTSTP) and `dosh()` (subshell) —
both Rule-#2-unportable, named in the D-entry; the `dosh` arm falls back
to C's own !SHELL text rather than silent success.

`sym.mjs` (required — two symbols deleted, none re-pointed):

```text
EXT_CMD_AC       NOT FOUND in js/** (no export, no local function/const).
availableAcNames NOT FOUND in js/** (no export, no local function/const).
dosuspend_core   js/cmd.js:1376   ASYNC — await required
dosh_core        js/cmd.js:1400   ASYNC — await required
extcmds_getentry js/getline.js:1377   sync
```

`--can` on both touched edges: ALREADY (names added to pre-existing
static imports) — no TDZ question.

## C ↔ JS fidelity (per function)

**`dosuspend_core`** — C `cmd.c:5661–5678`. SUSPEND verified defined
(`unixconf.h:291`), so the capability branch is live in C; JS takes it
with `win_can_suspend()`=false → `Norep(cmdnotavail,'#suspend')`, exact
string (verified `cmd.c:160`). Suspend arm keeps C order: getnow →
`realtime+=delta` → `start_timing=now` → named `dosuspend()` →
retime → ECMD_OK. Caller C `:1878` table row → JS runner `:1260`. Confirm.

**`dosh_core`** — C `cmd.c:5681–5696`. SHELL verified defined
(`unixconf.h:322`); accounting + named `dosh()` + retime + ECMD_OK in C
order, with C's own !SHELL Norep text as the honest fallback. Caller C
`:1860` → JS runner `:1247`. Confirm.

**`extcmds_getentry`** — C `cmd.c:2100–2106`. Bounds check + row return
exact; the `i==length` terminator-vs-null difference is unreachable
(callers pass only match indices) and documented in place. Caller
`getline.c:278` → JS `:1398`. Confirm.

**`extcmds_match`** — C `cmd.c:2518–2558`. JS body verified arm-by-arm:
NOT_AVAILABLE/INTERNAL skip, wizard gate, AUTOCOMPLETE gate, NO1CHARCMD,
null→all / exact→strcmpi / prefix→strncmpi — all exact (prefix via
case-folded `startsWith` ≡ `strncmpi(fslen)`). The rewire deletes a real
C-wrong I confirmed in C: `travel` `:1909–1910` carries only
`CMD_M_PREFIX` (no AUTOCOMPLETE, any build) yet sat in the hand list.
Confirm.

**Extractor DEBUG fix** — verified, not trusted: `patchlevel.h:36`
defines DEBUG unconditionally; no `-UDEBUG` in `build-recorder.sh`;
`config.h:620–621` auto-defines DEBUG_MIGRATING_MONS from DEBUG; the 4
added rows sit under `#ifdef DEBUG` / `#if DEVEL||DEBUG` (`:1944`,
`:1955`, `:1976`, `:1984`) and migratemons' long desc under
`DEBUG_MIGRATING_MONS` (`:1765`). The regen is C-faithful. seed4500's
`#wizm`→`wizmondiff` completion now matches the C side. Confirm.

**`cmdbind_remove`** (stale) — C `cmd.c:2157–2177` unlink+free+return
ported into the established slots/Map adaptation (D-1657 null-marker);
callers wired (`:1598`/`:1624`/`:1683`/`:2201`/`:2233`). Confirm.

No RNG in any C body; none added. Diff grep: no `FORCE`/`DIAG`/
`getRngLog`/seed/step/coordinate reads, `fastforward`, or hardcoded
coordinates. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. The "4 hand-list C-wrongs" claim resolves to 1 deleted-list wrong
(travel) + 3 extractor compiled-out rows now live — verified each against
C guards. "Dispatch ported, callee stubbed" does not occur.

## Density

- Whole-function verdicts: all five whole — every arm, every callee live
  or Rule-#2-named, every C caller wired.
- Cluster: one C file (+ its generated table + extractor), 5 functions ≤
  10, no Must-fix bundled. One `Ledger:` entry + one Verify sub-bullet
  per function — present.
- The mid-iteration seed4500 regression was found and fixed inside the
  iteration (44/44 claimed); the audit overlay below re-measures it.

## Verification

Re-measured myself (`--base 40d1154a3~1 --reach-all`, all 5):

```text
verify <each of 5>: baseline 40d1154a3~1 — 0 session(s) blocked on it
smoke <each of 5>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. `node --test
scripts/extcmd-debug-completion.test.mjs` → 4 pass, 0 fail (re-ran).
No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
