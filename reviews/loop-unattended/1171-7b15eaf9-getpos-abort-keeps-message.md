# Review 1171 — 7b15eaf9 — getpos !force abort keeps message (D-2205)

Metadata: SHA `7b15eaf9`, `js/getpos.js` only (1 line deleted +
2-line comment), D-2205. Queue row `getpos`
(scen-normal-Healer-91124 step 36/65, 0 blocked RNG, 29 blocked
screens: C «Unknown direction: 'r' (aborted). Done.» vs JS «»).

Intent vs deliverable: subject promises the C `msg_given = FALSE;
/* suppress clear */` tail on the unknown-key !force abort path.
Diff actually deletes exactly one clear (`g._pending_message = '';`)
on that path and cites the C line. Promise == diff.

Inventory: no new/changed functions, no helpers, no imports.
Deletion-only fix — the smallest possible diff for this C line.

**C ↔ JS fidelity**: exact confirm vs `getpos.c:1117–1141` plus the
`exitgetpos` tail `:1151–1167` (ranges from CURRENT; bodies read).
The unknown-key path with `!force`:

```c
pline("Unknown direction: '%s' (%s).", visctrl((char) c), note);
msg_given = TRUE;
...
if (force)
    goto nxtc;
pline("Done.");
msg_given = FALSE; /* suppress clear */
cx = -1;
cy = 0;
result = 0; /* not -1 */
```

and `exitgetpos` clears the message window only `if (msg_given)`
(`:1156–1157`), so the "Unknown direction ... Done." text survives
— that is the whole bug (JS cleared it). JS `_pending_message = ''`
is the clear equivalent, so removing it on this path reproduces C
exactly. Scoping verified by grep: two other clears remain
(`js/getpos.js:1285,1498`), so ESC / pick / mouse paths still clear
per C, and the space/CR `Done.` path already left the message.
Return 0 + `ccp = (-1, 0)` already matched C and is untouched.
Caller parity (commit-message cited, not re-read): `do_name.c:213–215`
returns silently on `!isok`, matching `js/do_name.js:490–493` — so
the post-`r` screen is exactly what getpos left on both sides. No RNG
drawn on this path either side.

Hallucinations / overclaim: none. No callee involved; nothing is
stubbed or deferred. No FORCE/DIAG/seed/coordinate reads in the diff.

Density: one-line deletion for one C statement — minimal and
complete; there is nothing more C has to offer on this path.

Verification: D-log Verify bullet shows hidden 1 PASS + green 2/2 +
strict ×2 + cohort 7/7. Re-measured myself:

```text
verify getpos: baseline 7b15eaf9~1 — 1 session(s) blocked
  scen-normal-Healer-91124: PASS
verify getpos: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Genuine PASS on the blocked session at the recorded step, not a
vacuous "no session blocked" note.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
