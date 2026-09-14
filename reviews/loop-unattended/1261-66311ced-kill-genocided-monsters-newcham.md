# Review 1261 — 66311ced — kill_genocided_monsters chameleon newcham arm (D-2295)

Metadata: SHA `66311ced`, D-2295, queue row `cmd.c makemap_prepost kill_genocided_monsters` (D-1097/D-1190 residual). Next index per `00-INDEX.md` tail (1260 = e6f16d72). Method: `git show` stat + `js/` hunks; `csym.mjs kill_genocided_monsters` body + `--callers`; `sym.mjs` on `newcham`/`kill_eggs`/`kill_genocided_monsters`; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: the chameleon reshape arm of `kill_genocided_monsters` — a cham imitating a genocided species takes a new form instead of sitting in an empty if-body, restoring C's reshaping RNG.
Diff actually adds (`git show 66311ced -- js/`, 4 files): in `js/mon.js`, `kill_eggs` becomes exported (one word); `kill_genocided_monsters` becomes `async` with `await newcham(mtmp, null, NC_SHOW_MSG)` replacing the `// newcham … deferred` comment; `await` added at all four call sites (`js/do.js:1854` goto_level, `js/read.js:2405` do_class_genocide, `js/read.js:2599` do_genocide, `js/wizcmds.js:595` makemap_prepost post). No other JS behavior touched. Promise kept, no scope creep.

## Inventory

- `kill_genocided_monsters` (js/mon.js:3219, now async) — changed arm.
- `kill_eggs` (js/mon.js:3187) — linkage only (local → exported).
- Four call sites — `await` ripple only.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/mon.c:5638–5677` (`csym.mjs` body + `--callers`: exactly four C call sites — `cmd.c:1048`, `do.c:1817`, `read.c:2749`, `read.c:2993` — matching the four JS await sites one-for-one). Branch walk in C order:

| C (`mon.c`) | JS (`js/mon.js`) | Match |
|---|---|---|
| `mtmp2 = mtmp->nmon` snapshot | `[...(game.fmon \|\| [])]` snapshot | equivalent |
| `DEADMONSTER` skip | `(mhp\|0) < 1` skip | yes (`DEADMONSTER ≡ mhp<1`, pre-existing) |
| `mndx = monsndx(data)` | `data?.mndx ?? mnum` | yes (pre-existing idiom) |
| `kill_cham = ismnum(cham) && mvitals[cham] & G_GENOD` | identical expression | verbatim |
| `if (G_GENOD(mndx) \|\| kill_cham)` | identical | verbatim |
| `if (ismnum(cham) && !kill_cham) (void) newcham(mtmp, NULL, NC_SHOW_MSG)` | `await newcham(mtmp, null, NC_SHOW_MSG)` | yes (new arm) |
| `else mondead(mtmp)` | `mondead(mtmp)` fire-and-forget | pre-existing debt, named |
| per-mon `kill_eggs(minvent)` + four trailing `kill_eggs` calls in C order | same five calls in C order | verbatim |

C's `(void)` cast means the return is unused, so awaiting-or-not is display-timing only; `newcham` returns `boolean|Promise` and a bare `await` on the sync path is a no-op. The four awaited callers are all already `async` (verified in the hunks: `export async function goto_level`, `async function do_class_genocide`, `export async function do_genocide`, `export async function makemap_prepost`) — no ripple beyond the four lines.
RNG: C's reshape draws (`select_newcham_form`) now burn where before they never did — directionally correct (previously guaranteed desync on any genocide+cham-imitator path).
Callee evidence (`sym.mjs`):

```text
newcham          js/makemon.js:1870   sync
kill_eggs        js/mon.js:3187   sync
kill_genocided_monsters js/mon.js:3219   ASYNC — await required
```

`newcham` is LIVE (already imported, `js/mon.js:70` import list; sole definition). `kill_eggs` has a sole copy — the export kills the clone-drift flag with no second copy. No STUB in the arm; `mondead` fire-and-forget is pre-existing review-1197 debt, named in the D-log Named line, not introduced here.

## Hallucinations / overclaim

None. D-log says "no corpus divergence — C-wrong omission" and labels the hidden verify "vacuous … NOT a corpus PASS". The `kill_eggs` TIN/CORPSE `#if 0` note is correct (the C `kill_eggs` body has no TIN/CORPSE arms). JS comment cites `:5639–5677`/`:5665` vs csym's `5638–5677` — one-line header drift, cosmetic.

## Density

Small diff (~28 JS insertions) but it closes the queued row with the only live arm the row owned, plus the mandatory async ripple. §2b's "~40 insertions" floor targets invented thin work; a queue-row arm port with real RNG surface is the denser alternative to leaving the row open. No padding, no unrelated subsystem. OK.

## Verification

D-log Verify: syntax PASS, rule2 PASS, hidden vacuous (honestly labeled), green 2/2, strict ×2, cohort 7/7, full 44/44. Re-measured by this review:

```text
verify kill_genocided_monsters: baseline 66311ced~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches the D-log's "row cited no N blocks", so no `--base` debt and no vacuous-PASS lie (nothing was claimed PASS). Hand probe (out of tree) exercised the arm: cham imitator reshaped 116 → 111, mhp intact, bystander untouched, async return confirmed, no hangs. Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads. Rule #2: await-only diff, no imports added (`imports.mjs --rulecheck` clean at iteration end).

## Actionable C-wrongs

None. (mondead fire-and-forget stays review-1197 debt; makemap_prepost pre package stays review-250 debt.)

Verdict: **ACCEPT**
