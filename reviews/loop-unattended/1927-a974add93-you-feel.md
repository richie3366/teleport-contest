# Review 1927 — a974add93 — You_feel (D-2968)

- SHA: `a974add93` (coverage; `pline.c` `You_feel`, plus `livelog_printf` / `livelog_add`)
- Files: `js/display.js` `You_feel`; `js/pline.js` chronicle helpers; baked `pline("You feel …")` sites in `apply.js`, `attrib.js`, `dothrow.js`, `eat.js`, `exper.js`, `music.js`, `polyself.js`, `pray.js`, `read.js`, `shk.js`, `trap.js`, `uhitm.js`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
You_feel         js/display.js:7735   ASYNC — await required
Unaware          js/eat.js:513   sync
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export
livelog_printf   js/pline.js:44   sync
livelog_add      js/pline.js:30   sync
strNsubst        js/hacklib.js:564   sync
```

`imports.mjs --can js/display.js js/eat.js Unaware` prints `ALREADY` (the commit message recorded SAFE before the import line). `Unaware` is read only inside `You_feel`, so the `display.js` ↔ `eat.js` cycle is not a top-level TDZ read. The eight local `Unaware` copies are not this function.

## Intent vs deliverable

Subject: `You_feel` always printed `You feel `; C uses `You dream that you feel ` when `Unaware`. Baked `pline` sites never took the prefix. `livelog_printf` formatted `%s`/`%d`/`%ld` and skipped `strNsubst` and `livelog_add`.

The diff adds the `Unaware` branch, points those baked sites at `You_feel` with C's format, and makes `livelog_printf` cap, record, substitute tabs, then call `livelog_add`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `You_feel` | live async `display.js:7735` | `pline.c:387–400` |
| `Unaware` | live sync `eat.js:513` | `youprop.h:399` |
| `vpline` | live async | `pline.c:398` after `strcat` |
| `livelog_printf` | live sync `pline.js:44` | `pline.c:513–526` (`CHRONICLE`, `config.h:660`) |
| `livelog_add` | mask, then return | compiled stub `files.c:3712–3716` (`LIVELOG` is off, `config.h:663`) |
| `strNsubst` | live sync | `n == 0` replaces every tab |
| `You_buf` | JS string | `pline.c:338–348` growth is unused |

## C ↔ JS fidelity

`YouPrefix` (`pline.c:359–360`) copies the prefix; `strcat` appends `line`; `vpline` prints that format. JS builds `` `${prefix}${line}` `` and awaits `vpline` with the same args. `Unaware` is `multi < 0 && (unconscious() || is_fainted())`, and the `multi` test is first. No `rn2`.

Rewired formats match the C calls: `attrib.c:1052` `"%s!"` and `:1058–1060` `"%s!"` / `"less %s!"` after the intrinsic bit is cleared; `dothrow.c:785` and `:1091`; `eat.c:1819–1821` (hallucination, else `body_part(LIGHT_HEADED)`) and `:1941` `"%ssick."`; `exper.c:315`; `music.c:560` and `:566`; `polyself.c:744`; `pray.c:728`; `read.c:1410`, `:1801`, `:1804`; `shk.c:5029` and `:5058`; `trap.c:6430`; `uhitm.c:6070`, `:6093`, `:6106`. `apply` mirror and the hurtle lines are the same substitution of a baked sentence.

`livelog_printf`: `vsnprintf` into `BUFSZ * 2` (stored length `BUFSZ * 2 - 1`), `gamelog_add` of that text, then `strNsubst` of tabs to `_`, then `livelog_add`. The chronicle entry keeps the tabs. `%c` and `%lu` are in the replacer. Caller lines have no `%%`.

`LIVELOG` is not defined, so the linked `livelog_add` is empty. JS checks `sysopt.livelog` (`files.c:3673`). `sys.c:63` sets that mask to `LL_NONE`, so the function returns before the file arm. The host-file write (`:3676–3704`) stays a named omit under Rule #2.

## Hallucinations / overclaim

The subject does not say every one of the 231 C references was visited. Leftover `"You feel"` strings in the edited files are other calls: `eat.c:1014` is `You("feel a momentary chill.")`, `eat.c:1261` is `You("feel a change coming over you")`, `pray.c:383` passes the whole sentence to `make_stoned`, `polyself.c:443` passes it to `polyman`. `trap.js` already called `You_feel` for `trap.c:2488` and `:2494`. `dig.c:2217` and `timeout.c:877` are the named sites with no JS.

## Density

The 14-line `You_feel` body is both arms. The baked sites in this diff go through it, so an asleep hero gets the dream prefix. The two missing C sites are named.

## Verification

```
verify You_feel: baseline a974add93~1 (scoreboard at b43d2c68f, 2026-09-27T12:42:07.674Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify You_feel: no corpus session is blocked on it at a974add93~1 — a vacuous verify is NOT a corpus PASS. ...
smoke You_feel: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2968 records green 2/2, strict ×2, cohort 7/7, and full 44/44 because `display.js` is shared. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
