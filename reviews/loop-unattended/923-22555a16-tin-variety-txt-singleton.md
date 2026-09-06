# Review 923 — 22555a16 — eat.c tin_variety_txt tin-variety text singleton (D-1953)

Metadata: SHA `22555a16`, D-1953, `js/eat.js` +33/−1 (header comment
+ import + one function). Reviewer re-ran C locus, callers, sym, banned
grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the `tin_variety_txt`
wish-text singleton. Diff actually adds exactly that: exported
`tin_variety_txt(s, out)` in `js/eat.js`, a `str_start_is` import, and
a header-list line. No more, no less. Promise kept.

Inventory: one new JS function (`tin_variety_txt`, `js/eat.js:2245`,
sync, per `sym.mjs`). One helper touched: `str_start_is`
(`js/hacklib.js:97`, pre-existing C-home import — LIVE, not a clone).

C ↔ JS fidelity: C locus `nethack-c/upstream/src/eat.c:1404–1421`
(18 lines, via `csym.mjs`). Branch-by-branch confirm:

- `if (s && tinvariety)` → `if (s != null && out)` — same guard
  (C non-null pointer; JS also rejects `undefined`). No write on
  null args either side; fallthrough returns 0 both.
- `*tinvariety = -1` default → `out.tinvariety = -1`. `{tinvariety}`
  out-idiom matches the `artifact_name` convention; fine.
- `for (k = 0; k < TTSZ - 1; ++k)` sentinel skip → identical; `TTSZ`
  is `tintxts.length` with trailing `""` sentinel (`js/eat.js:325`).
- `l = strlen(txt)` → `tintxts[k].txt.length`. Same.
- `!strncmpi(s, txt, l)` → `str_start_is(s, txt, true)` — the C-home
  helper (ASCII caseblind prefix); equivalent since `txt.length == l`.
- `(int) strlen(s) > l && s[l] == ' '` → `s.length > l && s[l] === ' '`
  — explicit, so bare `"rotten"` and `"rottenx …"` miss exactly as in C.
- `return (l + 1)` on match, `return 0` otherwise — identical.

No RNG in C; none in JS. Sole C caller is `objnam.c:4386`
`tin_variety_txt(d->p + 7, &d->tinv)` (via `--callers`, 1 reference);
the readobjnam "tin of " arm has no JS counterpart and is named as a
map omit in this commit — correctly not smuggled into this singleton.

Hallucinations / overclaim: none. D-log claims C order and names the
unwired caller; both check out. No "Match C" dispatch-over-stub shape —
this is a leaf predicate, callee `str_start_is` is LIVE.

Density: §2b right size — one C function, one JS module, ~30 lines of
C-faithful JS. Map deferral (caller wiring) named in-envelope. OK.

Verification: D-log Verify shows `verify.mjs --fn tin_variety_txt` →
PASS syntax/rule2/green 2/2/strict/cohort 7/7, and explicitly says the
hidden check is vacuous (0 blocks, no corpus-PASS claim). Reviewer
re-measured: `hidden-proxy verify tin_variety_txt --base 22555a16~1`
→ "0 session(s) blocked on it (0 at baseline, 0 in the working
scoreboard)". Honest vacuous check; matches the HELDOUT Tier C
singleton premise. Diff-body grep for FORCE/DIAG/getRngLog/
fastforward/seed/coords: clean (the only "seed" hit is the commit
message's prose). Rule #2: import added is intra-`js/` ESM only.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
