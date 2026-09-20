# Review 1664 — 51e65db7 — `dungeon.c` query_annotation restart + trimspaces (D-2705)

Metadata: commit `51e65db7`, D-2705, `js/dungeon.js` (restart) + `js/hacklib.js` (`trimspaces` export) + committed `scripts/trimspaces.test.mjs`. Pops the head Open-coverage row (PARTIAL). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body restart of `query_annotation` on live callees + `trimspaces` port. Diff actually does both, replacing three inline clones (whole-string ESC check, regex trim, inline Dlvl replace) with live calls. Promise matches deliverable.

## Inventory

Changed JS: `query_annotation` restarted file-local (C staticfn — correctly unexported); `trimspaces` new export at its C home (`js/hacklib.js:340`); static hacklib import extended on an already-present edge; `mungspaces` joins the existing dynamic `getline.js` import. No deleted/re-pointed symbols. Committed test: 5 cases, all passing (re-ran: 5/5).

## Callee closure

Required `sym.mjs` outputs pasted verbatim (no symbol deleted or
re-pointed — `trimspaces` is an addition at its C home):

```text
on_level         js/dungeon.js:1269   sync
find_mapseen     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:1184
strsubst         js/hacklib.js:322   sync
```

| JS callee | Class |
|---|---|
| `find_mapseen` | pre-existing same-file local (default-to-`u.uz` confirmed at `:1184`) |
| `on_level` | LIVE same-file (12 pre-existing clones elsewhere — untouched) |
| `getlin` / `mungspaces` | LIVE (`getline.js`, dynamic import, awaited) |
| `describe_level` | LIVE (`display.js`, dynamic import) |
| `strsubst` / `trimspaces` | LIVE (`hacklib.js`; latter new this commit at C home) |

No STUB in any live arm. No `--can` needed: no clone kept, no new edge
(the static hacklib import line pre-existed; `mungspaces` joins the
existing dynamic `getline.js` import). `mungspaces`' pre-existing `\n`
gap is line-input-irrelevant on this path and owned by its own row —
disclosed, not re-litigated.

## C ↔ JS fidelity

C loci: `query_annotation` `dungeon.c:2498–2567` (csym, 70 L) + `trimspaces` `hacklib.c:163–176` (csym, 14 L) + `describe_level` `botl.c:440–476` (csym, 37 L, read to check the trim claim) — all whole bodies read. RNG: none on this path either side. Branch walk:

- `find_mapseen(lev ? lev : &u.uz)` miss→return ✓ (same-file local, default confirmed at `js/dungeon.js:1184`).
- EDIT_GETLIN-off arm: custom → `Replace annotation "%.30s…" with?` (`slice(0,30)` ≡ `%.30s` ✓) else this-level vs describe_level prompt ✓.
- `!lev || on_level` → "this dungeon level" ✓ (`on_level` same-file live).
- dflgs same-dnum→0 else 2 ✓; whole-`d_level` save/restore via two fields — exact since `d_level` is exactly `{dnum, dlevel}` (`dungeon.h:9–12`, range read) ✓.
- `strsubst(lbuf,"Dlvl:","level ")` live ✓, then the subtle one: C discards `trimspaces`' return (leading skip unobservable; only the trailing in-place strip matters). JS uses the return — identical **iff** `describe_level` never emits leading space/tab. Verified from the C formats: every arm starts with `%s`/`%d`/literal (`dname`, `Home %d`, element name, `Dlvl:%-2d`/`Tutorial:`, `level %d`) with only mid-string substitutions after. The in-comment justification holds. `trimspaces` itself is a faithful port (space/tab only, both ends; C's buffer semantics adapted to immutable strings with the observable behavior preserved).
- First-char ESC check fixes the old whole-string nit ✓; live `mungspaces` ✓ (its pre-existing `\n` gap is line-input-irrelevant here and owned by its own row — disclosed); free→null/0, `dupstr`→assign (GC idiom, named), `custom_lth = length` (NUL excluded) ✓; post-mungspaces `" "` unreachable but kept as C's belt-and-braces ✓.

Callee closure: `find_mapseen` (same-file local), `on_level`, `getlin`, `mungspaces`, `describe_level`, `strsubst`, `trimspaces` — all LIVE or verified. Callers: `:2575 donamelevel` (`query_annotation(null)`) and `:3336 show_overview` (ledger→`{dnum,dlevel}`) both wired; no C caller left, none invented. No `--can` needed: no clone kept, no new edge (static import line pre-existed).

## Hallucinations / overclaim

None. The three fixed nits are quoted exactly as the old code was.

## Density

Breadth phase: one C-function restart + one 14 L helper at its home + committed test, two modules. Right-sized.

## Verification

Full verify transcript (both summary lines cited):

```text
verify query_annotation: baseline 51e65db7~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify query_annotation: no corpus session is blocked on it at 51e65db7~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke query_annotation: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, as disclosed. No REGRESSED. Committed
`scripts/trimspaces.test.mjs` re-ran green (5/5: leading, trailing, both
ends, non-space/tab kept, all-space→empty). `describe_level` leading-byte
audit: every C arm's `Sprintf` starts with `%s`/`%d`/literal
(`dname`, `Home %d`, element name, `Dlvl:%-2d`, `level %d`) with only
mid-string substitutions after — so consuming `trimspaces`' return is
observably identical to C's discard. Diff grep: no FORCE/DIAG/seed/
fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
