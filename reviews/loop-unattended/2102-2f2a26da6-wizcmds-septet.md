# Review 2102 — 2f2a26da6 — wizcmds.c wizard-debug septet

- SHA: `2f2a26da69790b35e7d30891f13fe4cb37ae205e` (D-3142)
- Parent: `6c8474344`
- Files: `js/wizcmds.js` (+171/−1), `js/getline.js` (+70), `js/mklev.js` (+2/−2 docs); docs + ledger otherwise
- Cluster: 7 whole C functions, one C file + 7 extcmd runners + 8 stale dispositions

## Intent vs deliverable

Subject promises: "telekinesis + detect/load_lua/load_splua/panic/fuzzer/nhuuid" with runners.
Diff actually adds: all 7 `export async` fns in C order, the 7 EXT_CMDS runners, import edges
(2 new static SAFE + 1 dynamic), and 2 mklev doc-line retargets. Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `wiz_detect` | new export | `wizcmds.c:228–236` |
| `wiz_load_lua` | new export | `wizcmds.c:352–372` |
| `wiz_load_splua` | new export | `wizcmds.c:375–395` |
| `wiz_telekinesis` | new export | `wizcmds.c:493–528` |
| `wiz_panic` | new export | `wizcmds.c:533–545` |
| `wiz_fuzzer` | new export | `wizcmds.c:548–564` |
| `wiz_show_nhuuid` | new export | `wizcmds.c:1781–1786` |

No clones; no deleted symbols. `sym.mjs`: `findit`/`getpos`/`getdir`/`mhurtle`/`hurtle`/
`load_special`/`lspo_finalize_level` all live async and awaited; `u_at` uses the const.js export
(pre-imported :29), not a local; `UTOTYPE_NONE`, `fuzzer_impossible_*` (0/1/2 ≡ flag.h:240–242 enum),
`UNAVAILCMD`, `ecname_from_fn`, `There` all live.

## C ↔ JS fidelity

**wiz_detect** — confirm: wizard gate (`debug||wizard`, file convention), `findit()` (`:232`),
`pline(UNAVAILCMD, ecname_from_fn('wizdetect'))` (`:234`), ECMD_OK.

**wiz_load_lua** — confirm: sbi rides with the named `load_lua` omit (ledger by-design, file IO);
getlin prompt exact; `buf[0] === '\x1b' || length === 0 → ECMD_CANCEL` (`:362–363`, getlin returns
`'\x1b'` on cancel — getline.js:277/1999); no-dot → `+= '.lua'` (`:364–365`); unavailcmd (`:370`).

**wiz_load_splua** — confirm: same prompt/cancel/suffix shape (`:381–386`); `:389`
lspo_reset_level named (no scored analogue); dynamic-import `load_special(buf)` (`:390`) +
`lspo_finalize_level(false)` (`:391`) — `false` ≡ C NULL form (`if (L)` guards at sp_lev.c:6018/6026
verified). Dynamic import justified: mklev.js:178 statically imports wizcmds (makemap_prepost).

**wiz_telekinesis** — confirm branch-by-branch: cc init (`:499–500`), pline (`:502`), getpos +
`ans < 0 || cc.x < 1 → ECMD_CANCEL` (`:504–506`), m_at-assign-ahead-of-test with
`(mtmp != null && canspotmon) || u_at` (`:508–509`, exact), getdir cancel (`:510–511`),
`mhurtle(mtmp, u.dx, u.dy, 6)` (`:514`), `(mhp|0) >= 1 && canspotmon` ≡ `!DEADMONSTER && …`
(`:515`, monst.h:214 precedent) with landing re-seed (`:516–517`), hero `hurtle(dx, dy, 6, false)` +
cc re-seed (`:520–521`), `while (utotype === UTOTYPE_NONE)` (`:524`), ECMD_OK. No RNG.

**wiz_panic** — confirm: fuzzer top-up 1000s (`:537–540`), `paranoid_query(true, …)` (`:542–543`),
`panic("Crash test (#panic).")` → house `throw new Error` (alloc.js:61/81 precedent — C abort
ends loud, never silent). ECMD_OK.

**wiz_fuzzer** — confirm: `FEATURE_NOTICE_VER(3,7,0)` inlined exactly
(`(3<<24)|(7<<16)|(0<<8)|0`, hack.h:1504–1506, `>>> 0` for unsigned); both notice plines
(`:553–554`); paranoid (`:556`); `y_n(...) === 'n'` → continue else panic (`:558–561`).
`game.iflags.debug_fuzzer = …` unguarded write is safe: askname.js:156 guarantees `game.iflags`
exists before any extcmd can run (C writes unconditionally too).

**wiz_show_nhuuid** — confirm: format string exact (`:1784`); value `game.svn?.nhuuid ?? ''` with
the value itself named (get_nhuuid is platform startup; CROSS pcmain.c:755 fills zeros → prints
empty — precedent verified).

**Callers:** all 7 C extcmd rows verified textually in cmd.c (names, fn pointers, flags):
AUTOCOMPLETE iff C (panic, wizshownhuuid, wiztelekinesis true; rest false) ✓; wiz:true on all ✓.
wizdetect's `C('e')` key is comment-noted but has no `key:` field — consistent: no EXT_CMDS row
repo-wide uses `key:` (the `extcmd.key` arm at cmd.js:1993 never fires), so this is file convention,
not a per-SHA miss.

**8 stale:** carry JS sites in the D-log (spot-checked `bind_key` js/cmd.js:1614-area live and
`getmailstatus` js/mail.js:539 live).

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. Ledger rightly marks the two load_ fns + nhuuid `partial` (named file-IO/value omits),
the other four `ported`.

## Density

Breadth-phase cluster: 7 whole C functions of one C file + same-closure dispatch rows, 245 js
insertions. Within §2b (≤10 fns, one file). Each function has its Ledger entry and Verify line.
Per-function verdicts: all ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify <all 7> --base 2f2a26da6~1 --reach-all` → all seven
`0 blocked` + `smoke 24 PASS, 0 regressed → REACH-OK`. No REGRESSED. Matches D-3142.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
