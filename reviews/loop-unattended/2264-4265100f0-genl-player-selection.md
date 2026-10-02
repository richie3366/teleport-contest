# Review 2264 — 4265100f0 — role genl_player_selection + 4 stale mates

Metadata: SHA
`4265100f0c616c22f47e97a402c41bca8471d98f`
(D-3306, 2026-10-02).
`js/player_selection.js` only
(+18/−0): one new async
export + two import names.
1 port + 4 stale-complete,
all role.c.

Intent vs deliverable:
subject promises the head
port + 4 stale-complete
closure mates. The diff adds
`genl_player_selection`
before `genl_player_setup`
(C file order) with
`nh_terminate` (./end.js)
and `EXIT_SUCCESS`
(./const.js) imports. The
four mates are D-log +
ledger bookings of
pre-existing bodies.
Delivers what it promises.

Inventory (per-function):

- `export async function
  genl_player_selection()`
  (js/player_selection.js:1324):
  `if (await
  genl_player_setup(0))
  return;` then
  `nh_terminate(EXIT_SUCCESS)`.
- `randrole`: pre-existing
  export js/roles.js:1090
  (stale-complete booking).
- `validrace`: pre-existing
  export
  js/player_selection.js:396
  (stale-complete booking).
- `gotrolefilter`:
  pre-existing local
  js/player_selection.js:73
  (stale-complete booking).
- `character_race`:
  pre-existing local
  js/polyself.js:631
  (stale-complete booking).
- No symbol deleted; no
  clone added.

**C ↔ JS fidelity**
(per-function):

`genl_player_selection` (C
role.c:2176–2185): `if
(genl_player_setup(0))
return;` +
`nh_terminate(EXIT_SUCCESS)`
+ NOTREACHED. JS is the
whole body in C order ✓.
Async: callee
`genl_player_setup` is async
in JS (:1341, `sym.mjs`
ASYNC) so `await` is
required, truthiness kept ✓.
Arg 0: the callee maps
`screenheight == null` to
display rows, so 0 → rows 0,
C-exact ✓. `nh_terminate`
LIVE (js/end.js:1039):
sets in_moveloop 0, exiting
1, exit_status, gameover —
the documented C-`exit`
collapse idiom; EXIT_SUCCESS
= 0 (js/const.js:943) ✓.
New edge player_selection →
end.js: IN-SCC but both
ends hoisted function decls,
no top-level TDZ read
(suite loads; verify syntax
PASS) ✓. Zero C references
(confirmed) — window-port
entry, stands unwired like
its siblings ✓. No RNG ✓.

`randrole` (C role.c:718–728):
`res = SIZE(roles)-1`, then
`rn2_on_display_rng(res)` if
for_display else `rn2(res)`.
JS :1090 has both arms with
the same branch order and
the same single draw each ✓.
`roles.length ≡
SIZE(roles)-1`: verified —
js/roles.js:83–619 ends with
a real entry, no C `{0}`
terminator ✓. Callers (all
5 C refs re-checked): :743
→ randrole_filtered :1107
`randrole(false)` ✓; :2069
→ role_init :1371 ✓; :2303/
:2364 → genl_player_setup
:1401/:1434 ✓; pray.c:2591
`randrole(TRUE)` → pray.js
:2809–2812 C-exact inline
(`rn2_on_display_rng(roles.length)`
in the `do…while(lgod)`
loop) — named, D-3297
precedent ✓.

`validrace` (C role.c:777–784):
IndexOkT + allow-mask test,
assumes validrole. JS :396:
bounds check ≡ IndexOkT,
identical mask conjunction,
rolenum unguarded like C ✓.
Callers: :2004 → role_init
:1298 ✓; :2378/:2397 → the
`validrace_checked` wrapper
(:420–423, documented
negative-role guard — C
would read off-table) called
at :1446/:1468 in the genl
flow ✓.

`gotrolefilter` (C
role.c:1302–1313): mask test
then roles scan. JS :73
identical (rfilter.mask +
roles loop, `roles.length` ≡
SIZE-1 per above) ✓. Both C
callers same-file:
:1944 → :1184 (`?
'Reset' : 'Set'` verbatim) ✓;
:2755 → :218 (title carries
“and/or unpick any that no
longer apply” verbatim) ✓.
`sym.mjs` “LOCAL CLONE”
label: this local IS the
C-matched body, verified
here — not drift ✓.

`character_race` (C
role.c:2160–2171): races[]
walk to noun-NULL, mnum
match, NULL fallthrough. JS
:631: `for..of races` (no
terminator in js/races —
verified :621–713 ends real
— so the walk is the same
set), `|0` short compare,
null fallthrough ✓. Sole
caller polyself.c:1098 →
:654 (`const R =
character_race(mndx)`) ✓.

Hallucinations / overclaim:
none. The “ existing
player_selection() is the tty
variant” distinction is
accurate (passes rows,
throws on quit — the new
generic entry passes 0 and
terminates). No dispatch
over stubs: both head
callees live.

Density: 5 functions, one C
file, ≤10 ✓. 18 insertions,
below ~80 — defense holds:
role.c now 47 = 24
unknown-ok + 19 ported +
1 split + 3 partial, zero
absent rows left (the head
was the last), every
remaining unknown
measured-ok (re-checked).
Five `Ledger:` entries
(re-read: js paths correct),
one Verify line covering
all five ✓. (randrole reads
C 6/JS 2 THIN — a
line-count artifact; both
RNG arms verified live.)

Verification: D-log claims
hidden note ×5 + REACH-OK
×5 (randrole real reach
69/69, others smoke 24/24),
green 2/2, strict ×2,
cohort 7/7, full skipped
(no shared file — correct:
only player_selection.js
changed). Re-measured in
one call: all five print “0
blocked” + vacuous note;
`reach randrole: 69
baseline-PASS session(s)
reach it (69 run): 69 PASS,
0 regressed → REACH-OK`;
other four smoke 24/24 →
REACH-OK. Every line
matches the D-log,
including the real reach
count ✓. Diff grep: no
FORCE/DIAG/getRngLog/seed/
fastforward/coords ✓.
Rule #2: ESM imports only ✓.

**Actionable C-wrongs**:
none.

Verdict: **ACCEPT**
