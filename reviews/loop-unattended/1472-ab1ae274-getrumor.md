# Review 1472 — ab1ae274 — rumors.c getrumor whole body (D-2513)

Metadata: SHA `ab1ae274`, `js/rumors.js` only. Coverage THIN → live. NN 1472.

## Intent vs deliverable

Subject promises a whole-body restart of `getrumor` closing five thin-body gaps (failed-open guard, first-call init + error arm, default-truth arm, cookie-exhaustion arm, empty-retry vs cookie-test, unconditional WIS). Diff actually adds exactly that restart with `:line` cites. Matches the promise; single module, no scope creep.

## Inventory

Changed JS: `getrumor` restarted; imports add `impossible` (display edge) and `RUMORFILE` (const edge) — same-edge words, no new edge claimed.

## C ↔ JS fidelity

Checked against pinned C `rumors.c:116–191` (`csym` range), branch by branch:

- `:125` buf init → `let rumor = ''`. ✓
- `:129` failed-open guard on new transient `game.true_rumor_size` (`?? 0` for decl.c `:752` zero-init). ✓
- `:132` dlb open = embed present; `:139–143` first-call sizes from split buffers; error string `` `Error reading "${RUMORFILE.slice(0,80)}".` `` reproduces C `"Error reading \"%.80s\"."` truncation. ✓
- `:149–163` adjtruth switch: 2/1 true, 0/−1 false, default `impossible('strange truth value for rumor')` + `return 'Oops...'` (= C `strcpy` return). C-order RNG (`rn2(2)` per iteration, then `get_rnd_line` draws). ✓
- `:164–166` live buf-section `get_rnd_line` (established embed analogue). ✓
- `:168–170` loop test is now cookie-prefix (`startsWith`), not empty-retry — the old C-wrong fixed. ✓
- `:171` close no-op; `:172–173` `count>=50` impossible; `:174–175` `else if (!in_mklev)` exercise — the old unconditional-WIS C-wrong fixed. ✓
- `:176–178` open-fail else records `-1` (message differs from C `couldnt_open_file`, but the arm is unreachable under embed — named). ✓
- `:180–190` cookie strip as slice = C memmove loop. ✓

Callee closure: every callee LIVE (`rn2`, `get_rnd_line`, `exercise`, `impossible`); `dlb_fopen`/`dlb_fclose`/`init_rumors` named (Rule #2 embed / build-time split — legitimate OMITs). Callers: C sites are `artifact.c:2289` (named — `arti_speak` unported), `engrave.c:57` → `js/engrave.js:210` wired, `rumors.c:551` → `js/rumors.js:169` wired. No clones, no stubs, no FORCE/DIAG/coords/seeds in the diff.

## Evidence detail

Full C caller list (`csym --callers`, 5 refs): `artifact.c:2289` (`getrumor(bcsign(obj), buf, TRUE)` — named, `arti_speak` unported), `engrave.c:57` (`getrumor(0, pristine_copy, TRUE)` inside the `!rn2(4) || !rumor || !*rumor` fall-through → `js/engrave.js:210` same shape), `rumors.c:551` (`getrumor(truth, buf, reading ? FALSE : TRUE)` → `js/rumors.js:169`), plus the prototype and the `:563` WIS comment. Both live JS call sites pass `exclude_cookie` positionally as C does.

Error-string byte check: C `Sprintf(rumor_buf, "Error reading \"%.80s\".", RUMORFILE)` — the `%.80s` truncates the filename, then a literal `".` closes. JS `` `Error reading "${RUMORFILE.slice(0, 80)}".` `` is the same bytes. The open-fail arm differs in mechanism (`couldnt_open_file` vs `impossible("Can't open …")`) but agrees in effect (`true_rumor_size = -1`, later calls hit the `:129` guard) — and is unreachable under the embed, so the difference never executes.

RNG: `adjtruth = truth + rn2(2)` draws once per loop iteration on both sides, followed by `get_rnd_line` draws — order preserved, including the retry iterations. The old empty-retry (`!rumor`) is gone; the loop now retries only on the cookie prefix, as C.

## Hallucinations / overclaim

None. "0 blocked" presented as a coverage gap with the vacuous note, not as a corpus PASS; reach 129/129 reproduced below.

## Density

Right-sized: one 76-line C function, whole body, one module — the §2b ideal.

## Verification

- Re-ran `hidden-proxy.mjs verify getrumor --base ab1ae274~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + reach 129 baseline-PASS sessions reach it, 129 PASS, 0 regressed → REACH-OK. Matches the D-log exactly.
- D-log cites green 2/2, strict ×2, cohort 7/7 — consistent with a data-file function.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
