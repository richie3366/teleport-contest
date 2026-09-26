# Review 1793 — 236be808b — youhiding (D-2834)

- SHA: `236be808b` (coverage; `insight.c` `youhiding`)
- Files: `js/polyself.js` menu return and topline `You`; `js/invent.js` `status_core_lines` caller
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the enlightenment arm returns ` You are/were <buf>.` and the `#monster` arm calls `You("are %s %s.", already|now, buf)`, with `status_core_lines` awaiting that line. The diff is those two changes plus the caller. The hiding-place `buf` was already the body.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `youhiding` | `polyself.js:2506` | `insight.c:2021–2077` |
| menu return | string | `you_are` → `enl_msg` (`:105–107`) → `enlght_line` (`:148`) |
| `You` | LIVE `display.js:7671` | topline `:2072` |
| `status_core_lines` | `invent.js:5690` | caller `insight.c:1002–1003` |
| `M_AP_TYPE` | LIVE `const.js:3218` | `U_AP_TYPE` |

The diff does not delete a symbol. `sym.mjs`:

```
youhiding        js/polyself.js:2506   ASYNC — await required
You              js/display.js:7671   ASYNC — await required
M_AP_TYPE        js/const.js:3218   sync
```

`imports.mjs --can invent.js polyself.js youhiding`: `ALREADY`.

## C ↔ JS fidelity

`csym --callers`: `insight.c:1003` is `youhiding(TRUE, final)` when `Upolyd && (u.uundetected || U_AP_TYPE != M_AP_NOTHING)`. That guard is `invent.js:5732–5736`, after the transformed line and before Stoned. `polyself.c:1861` and `:1872` are `dohide` (`youhiding(false, 1)` and `(false, 0)` at `polyself.js:2640` and `:2652`). `:1857` is a comment.

`buf` starts as `"hiding"`. A non-nothing `U_AP_TYPE` becomes `"mimicking"`, then object (`an(simple_typename(mappearance))`), furniture (`" something"`), or monster (`" someone"`). `uundetected`: eel in a pool, else `hides_under` and the pile head (`objects_at`), else clinger or `Flying` on `ceiling`, else a pit (`SPIKED_PIT` is 12, `trap.h:71`) or `surface`. That order matches `:2027–2064`. No `rn2`.

`you_are(buf, "")` is `enlght_line("You ", final ? "were " : "are ", buf, "")` (`insight.c:44` `You_`, `are`, `were`). `enlght_line` prints ` %s%s%s%s.` (`:148`), so the line is ` You are <buf>.` or ` You were <buf>.`. A nonzero `msgflag` selects "were". The string has no `" not "`, so the contraction table does not run. `^X` pushes `` ` ${line}` ``; final enlightenment (`overlay: false`) pushes `line`. That is the same extra space `wrap` already adds for the other status lines.

The topline was a hand-built `pline`. It is now `You('are %s %s.', msgflag ? 'already' : 'now', buf)`. `You` prefixes `You ` and `vpline_expand` fills both `%s` (`display.js:7833`). `msgflag` 1 is "already"; 0 is "now".

Riding, Levitation, Flying, Underwater, and `walking_on_water` (`insight.c:982–1001`) are still absent. The subject says so. The hiding line is in C's place relative to the next live arm (Stoned).

## Hallucinations / overclaim

The subject does not claim those movement arms were ported. The menu string matches `enlght_line`, not a second format. `You` is the C macro, and the previous template produced the same characters.

## Density

The missing arm of `youhiding` and its enlightenment caller. `dohide`'s two calls were already live and now share the `You` path.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify youhiding --base 236be808b~1 --reach-all`.

```
verify youhiding: baseline 236be808b~1 (scoreboard at 53a5e85c8) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke youhiding: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2834's green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
