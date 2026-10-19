# Review 2916 — 99b6f0974 — list_genocided/list_vanquished accept the hidden 'a'

- SHA: `99b6f0974` (cliff, owner `list_genocided`)
- D-entry: D-4075; Ledger: insight.c (`list_genocided`, D-4075)
- `js/` diff: `js/insight.js` +7 −7

## Intent vs deliverable

Promise: C passes `"ynq\033a"` when there is a single entry. tty shows
`[ynq]` but still accepts 'a'. JS had simplified this to `'ynq'`, so 'a'
rang the bell and the prompt stayed up (5 sessions, e.g.
scen-kit-Wizard-50552014 s74). Diff: both sites pass `'ynq\x1ba'`, and
the two "simplified (named)" notes are removed. Promise = diff.

## Inventory

- `list_genocided` yn — insight.js:1512–1516; C insight.c:3040–3041.
- `list_vanquished` allow_yn — insight.js:1309–1316; C :2834–2843.

## C ↔ JS fidelity

```c
c = ask ? yn_function(buf, (ngone > 1) ? "ynaq" : "ynq\033a", defquery, TRUE)
...
Strcpy(allow_yn, ynqchars); /* don't include 'a', but */
Strcat(allow_yn, "\033a");  /* allow user to answer 'a' */
if (defquery == 'a') defquery = 'y';
```

JS matches both, including the `dq === 'a' → 'y'` default remap. The
claim rests on the consumer, so I checked it. JS `tty_yn_function`
(getline.js:2140) does `shown = resp.replace(/\x1b[\s\S]*$/, '')` for the
bracket text (C wintty's `strchr(choicebuf, '\033')` cut). Acceptance
tests `resp.includes(ch)` over the full string, and the ESC key maps to
'q' then 'n' (getline.js ~:2201). With the hidden 'a' this matches C's
tty_yn_function. The 'q' → `done_stopprint++` arm is unchanged.

## Hallucinations / overclaim

None. The removed "named" notes described exactly the simplification
that was fixed. The header comment no longer lists it as an omission.

## Density

Two string literals at the C call sites, plus doc text. One Ledger
bullet. list_vanquished is a sibling call-site edit.

## Verification

```text
verify list_genocided: 5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-kit-Wizard-50552014, scen-sweep-Priest-587210, scen-sweep-Rogue-50156011,
  scen-sweep-Valkyrie-50362010, scen-chain-Wizard-51150058: PASS
verify list_vanquished: 0 blocked (vacuous; the D-log claims none)
```

This is an exact match with the D-log. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
