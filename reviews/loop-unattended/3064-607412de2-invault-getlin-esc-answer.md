# Review 3064 — 607412de2 — invault keeps tty getlin's ESC as the answer

- SHA: `607412de2` (cliffs head at the parent: `vault.c` invault, 35/773
  corpus sessions, first at step 156, 1.08M RNG / 13,275 screens lost,
  @3b74ec586; Grow #26 `vault` calibration family)
- D-entry: D-4224; Ledger: invault ported
- `js/` diff: vault.js +2 −1 (the rest of the 861-line stat is
  hidden-corpus / docs)

## Intent vs deliverable

Promise: vault.c invault asks «"Hello stranger, who are you?" -» with
getlin in `do { … } while (!buf[0] && --trycount > 0)` (`:501–505`).
tty getlin returns "\033" on ESC. That is non-empty, so C leaves the
loop and the guard goes on («"I don't know you."»). JS mapped the ESC
to `''` and re-asked up to five times.

Diff: the JS-only `if (buf === '\x1b') buf = '';` is deleted and
replaced by a C-cite comment. The loop is now getlin → mungspaces →
`!buf && --trycount > 0`. The promise matches the diff.

## Inventory

- invault — js/vault.js:631–927, getlin loop `:787–798`; C vault.c
  `:380–620`, loop `:499–505`.
- Callees in the hunk: getlin (getline.js:262, ASYNC, LIVE),
  mungspaces (hacklib.js:718, LIVE), and Deaf (local vault.js:113
  clone, unchanged).
- Deleted / re-pointed symbols: none. One statement was removed.

```text
$ node scripts/sym.mjs getlin
getlin           js/getline.js:262   ASYNC — await required
$ node scripts/sym.mjs mungspaces
mungspaces       js/hacklib.js:718   sync
```

## C ↔ JS fidelity

C win/tty/getline.c hooked_tty_getlin `:85–100`:

```c
if (c == '\033' || c == EOF) {
    ...
    if (c == '\033' && obufp[0] != '\0') {
        obufp[0] = '\0'; ... /* clear and keep reading */
    } else {
        obufp[0] = '\033';
        obufp[1] = '\0';
        break;
    }
```

JS getlin's own doc says it returns `"\033" on ESC with empty buf`, and
the nonempty-ESC clear-and-continue arm is at getline.js `:87–90`.
That matches the tty source.

C mungspaces (hacklib.c `:141–160`) changes only ' ' / '\t' / '\n'. JS
hacklib.js:718 follows it step for step, so "\x1b" survives as a
1-character string. `!buf` is then false and the loop ends, as C's
`!buf[0]` does.

After the loop (unchanged JS, checked against C `:507–548`):

- Lawful hero: `strncmpi(buf, plname, strlen(plname)) != 0` →
  `adjalign(-1)`. With "\033" this now fires in JS too. Before the fix,
  JS reached it only after five empty answers.
- The Croesus / Kroisos / Creosote test cannot match "\033".
- Then the Deaf / «"I don't know you."» arm and the umoney follow-up.

No RNG in the hunk. The RNG gained is the 35 sessions' later play,
which is no longer desynced at the question.

Deaf in the prompt is vault.js's local clone, which reads `HDeaf ||
EDeaf || uroleplay.deaf || u.Deaf`. Nothing writes `u.Deaf` (grep of
`u.Deaf =` finds no writer), so the extra term is dead. It is not
touched here.

## Hallucinations / overclaim

The fix claim is correct. The D-entry's named-omission line is not:

> The 1 unchanged session (scen-vault-Tourist-53456001 step 387) is
> another writer … That is the moveloop interrupt order, not invault.

D-4229 (`1f9aec9ab`, same window) measured that row. The cause *was*
in invault: its `makemon(PM_GUARD, …, MM_EGD | MM_NOMSG)` (`:500`) did
not run makemon's async tail (makemon_appear_msg → `dochugw` when
occupied, makemon.c `:1502–1504`). So «You stop searching.» came after
the entry line. "Ledger: invault ported / Named omissions: none in
invault" was therefore wrong when this commit shipped: invault had a
silent missing callee. It has since been closed in this window by
D-4229. My re-measure on HEAD shows the Tourist row PASS, so no
Must-fix is needed. I record it as a misattribution, not as open debt.

## Density

A one-statement removal that unblocked a 35-session family. The
deletion is the C port (C has no such mapping). Highest leverage per
line in this window; right-sized.

## Verification

```text
$ node scripts/hidden-proxy.mjs verify invault --base 607412de2~1 --no-reach
verify invault: baseline 607412de2~1 (scoreboard at 3b74ec586) — 35 session(s) blocked on it
  scen-vault-Archeologist-53455012: PASS … scen-vault-Tourist-53456001: PASS … scen-vault-Wizard-53456040: PASS
verify invault: 35 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

This runs HEAD's code, so it includes the later in-window vault fixes
(D-4226 parkguard, D-4229 makemon tail). At the commit, the D-log
recorded 19 PASS, 15 moved, 1 unchanged. The 15 "moved" rows are
consistent with the next cliffs rows the D-log names (m_move / newsym /
gd_letknow / impossible). D-log gates: frozen runner PASS on
Priest-53456019 (RNG 50144/50144, Screen 423/423), REACH-OK, green 2/2,
strict ×2, cohort 7/7, full 44/44, sweep 716 baseline-PASS 0 regressed.
The end-of-audit rescore re-checks the window.

## Actionable C-wrongs

None open. The named-omission misattribution (invault's missing
makemon_appear_msg) was fixed in-window by D-4229 (`1f9aec9ab`).

Verdict: **ACCEPT**
