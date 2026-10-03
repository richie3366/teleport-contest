# Review 2350 — 2a53139d7 — dummyfunction + redraw_cmd generic-bind arm

**SHA:** `2a53139d7` — "cmd.c dummyfunction + redraw_cmd generic-bind arm (D-3395)."
**Scope:** js/cmd.js +10 (1 export), js/getpos.js +8/−5 (re-port + import), js/display.js doc-only. Two functions, one C file.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: (a) exported `dummyfunction`, whole 1-line body in C order; (b) `redraw_cmd` re-ported against the live bind table with the C-l analysis showing default behavior unchanged. Code delivered exactly; the C-l analysis conclusions are correct but two cited "Measured" facts are false (see Hallucinations). No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | `dummyfunction` js/cmd.js:1528 (sync export; C staticfn) | whole body, 0 callees | cmd.c:5698–5702 |
| 2 | `redraw_cmd` js/getpos.js:124 re-port | clone → live-table port | cmd.c:3910–3918 |
| 3 | `cmdbind_get` added to dokeylist import :65 | import extension, no new edge | — |
| 4 | doredraw doc :5818–5821 | stale-note retirement | — |

No deletion/re-point; no re-point sym owed. Callee sym: `ECMD_CANCEL 0x02` both sides (const.js:1964 ≡ hack.h:1458) ✓; `cmdbind_get :386 sync` LIVE ✓. Exporting a C staticfn with zero callers (vs local `only_here`) is pragmatic — a local would be unreferenced dead code; harmless pure return.

## C ↔ JS fidelity

**dummyfunction — Confirm.** `return ECMD_CANCEL;` verbatim, C-order placement after dosh_core ✓. Decl-only C ref :151, no wiring owed ✓. Value proof: `js/const.js:1964 ECMD_CANCEL = 0x02` ≡ `hack.h:1458 #define ECMD_CANCEL 0x02` ✓. (D-log cites :5699–5702; csym starts at :5698 — trivial, JS comment has it right.)

**redraw_cmd — Confirm.** C body (`cmd.c:3910–3918`):

```c
uchar uc = (uchar) c;
struct Cmd_bind *bind = cmdbind_get(uc);
return (boolean) (bind && bind->cmd
                  && bind->cmd->ef_funct == doredraw);
```

C `:3913–3917` ≡ JS `key & 0xff` + `cmdbind_get(uc)` + `bind && bind.txt === 'redraw'` ✓. The collapsed null check is sound (JS slots store the extcmd itself, dokeylist :393–395). The txt 1:1 holds: C has exactly one doredraw row (:1818–1819; only other `doredraw` hit is the :3917 test itself) and the generated table has exactly one `redraw` entry (extcmdlist_data.js:67, key 18) ✓. Predicate identical to lock.js `getdir_is_redraw` (`cmdbind_get(code & 0xff)?.txt === 'redraw'`, :184) covering the `:4013` site ✓; getpos.c:945 site wired at :1509 with the numeric key ✓. Under final default binds C-l→rush (see below), so C-l false / C-r true matches C; rebound keys now follow the table toward C. At the getpos site C-l never reaches the test anyway (CTRL_DIR :244 `12:'l'` → walk block → `continue` before :1509, verified). No RNG.

## Hallucinations / overclaim

Two, in the "Measured" narrative (conclusions right, evidence wrong — saying so explicitly): **(1)** "no `C('l')` anywhere in cmd.c" is false — cmd.c:2762 `(void) bind_key(C('l'), "redraw", FALSE);` sits in `commands_init`. **(2)** "a false comment claiming commands_init binds C-l" is backwards — the retired comment was *true* about commands_init; what defeats C-l→redraw is `reset_commands` later rebinding `C(dirchars[i])`→MV_RUSH for all 8 dirs incl. 'l' (verified :3436–3460), exactly like the JS sdir loop overwriting :315. The shipped JS comment inherits the imprecision ("C never bound it to redraw" — commands_init did; reset_commands unbound it). Behavior conclusions (sole redraw key 18, defaults unchanged, rebounds toward C) all verified true. Debt item below for the comment.

## Density

Two functions, one C file (cmd.c; JS keeps the pre-existing getpos.js home for the getpos-site body). Small (+18 js/) but each is a complete omit resolution. One `Ledger:` entry per function. No Must-fix bundled. Per-function verdicts: dummyfunction ACCEPT · redraw_cmd ACCEPT-WITH-DEBT (shipped comment imprecision, Actionable 1).

## Verification

Re-measured (`verify dummyfunction,redraw_cmd --base 2a53139d7~1 --reach-all`): both 0 blocked + vacuous note + REACH-OK — matches the D-log. Verbatim:

```text
smoke dummyfunction: no RNG-tagged reach; fixed smoke spread (24 run, 11.2s): 24 PASS, 0 regressed → REACH-OK
smoke redraw_cmd: no RNG-tagged reach; fixed smoke spread (24 run, 10.6s): 24 PASS, 0 regressed → REACH-OK
```

Bind-table proof: C `commands_init` :2762 binds C-l→redraw, then `reset_commands` (:3436–3460) rebinds `C(dirchars)`→MV_RUSH under !num_pad — final table has sole redraw key 18, exactly like the JS sdir loop overwriting :315; getpos CTRL_DIR :244 maps 12→walk with a `continue` before :1509, so C-l never reaches the test at that site. D-log shows green/strict/cohort/full gates (full auto on shared file; post-run comment reword covered by `node --check` on all 3 files). Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed hits. Rule #2: clean (iteration-wide run).

## Actionable C-wrongs

1. **Shipped redraw_cmd comment misstates C bind history (docs-only debt).** js/getpos.js:119–122 "(C never bound it to redraw" is imprecise: C `commands_init` cmd.c:2762 *does* bind C-l→redraw; `reset_commands` (cmd.c:3436–3460) later overwrites it with MV_RUSH under !num_pad. Behavior described is correct; the history is not. Fix in one iter: reword to "reset_commands rebinds C-l to rush (!num_pad)" + `node --check` (comment-only, no verify needed beyond syntax). Source: reviews/loop-unattended/2350-2a53139d7-… (debt, not Must-fix).

Verdict: **ACCEPT-WITH-DEBT**
