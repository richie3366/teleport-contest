# Review 965 — f8079012 — insight.c enlightenment family + wiz_intrinsic SLIMED (D-1995)

- SHA: `f8079012` — "insight.c enlightenment family: status arms, resistance/from_what catalogue, corner-vs-fullscreen menu + wiz_intrinsic SLIMED arm (D-1995)."
- D-id: D-1995. JS: `js/invent.js`, `js/attrib.js`, `js/wizcmds.js` (+436/−49). C loci: `insight.c` `status_enlightenment` `:939–1266`, `enlightenment` resistance/disclosure arms, `doattributes` `^X` arms; `attrib.c` `dwa_abil` `:91`, `gno_abil` `:98`, `from_what` `:904–1001`; `wizcmds.c` `wiz_intrinsic` SLIMED `:953,1040–1043` — all fetched this review.
- Verdict: **QUALITY-RISK** (one fortress-breaking missing import; Must-fix queued)

## Intent vs deliverable

Subject promises status arms in C order, the resistance `from_what` catalogue, corner-vs-fullscreen menu, attrib infra, and the SLIMED arm. Diff actually adds all of those plus `^X` midnight/night, Sleep/Infravision/spell-cast rows, Luck/death/bones disclosure rows. Promise matches deliverable.

## Inventory

- Changed: `status_core_lines` (Stoned→Hunger block), `enlightenment` (wizard record, Invulnerable→Lifesaved, Luck, death suffix, debug/bones rows), `doattributes` (^X clock, Sleep/Infravision/spell-cast rows, corner menu branch), `wiz_intrinsic` SLIMED branch.
- `js/invent.js` +441/−~45: eight status arms, ~twenty catalogue rows, two disclosure paths, corner menu branch.
- `js/attrib.js` +23/−2: `dwa_abil`/`gno_abil`, three `PROP_HFIELD` rows, two race imports.
- `js/wizcmds.js` +21/−2: SLIMED branch, `make_slimed` import name, comment update.
- Blind arm note: JS gate `((H|E blinded) && !B) || roleplay.blind` ≡ C `if (Blind)`; reason ladder (OUTSIDE→FORM→blindfold-only→timed) and the `haseyes` no-eyes guard both verified verbatim.
- Deaf arm note: the one-liner `wrap('deaf', from_what(DEAF))` matches C `you_are("deaf", from_what(DEAF))`; only the binding is missing.
- New: `hero_Sleep_resistance`, `dwa_abil`/`gno_abil`, three `PROP_HFIELD` rows, `nhw_menu_geometry` consumer branch (helper itself pre-existing in-file).
- No deletions/re-points, so no `sym.mjs` delete audit owed. `sym.mjs`: `from_what`/`ordin`/`make_slimed`/`nhw_menu_geometry` all resolve to single live exports (one stale `ordin` clone in dothrow.js predates this commit, untouched).

## C ↔ JS fidelity

Status arms walked against C `:1006–1074`: Stoned-before-Slimed prayer order ✓, `& I_SPECIAL` final gates preserved (`enl_bits` returns the numeric flat/intrinsic so the bit test works; `I_SPECIAL=0x20000000` verified) ✓, Strangled buried→final→wizard-timeout order with `from_what(STRANGLED)` ✓, Sick lumped-death vs split-troubles via `usick_type` ✓, Blind permanently/innately/deliberately/temporarily reason order + wizard-timeout + `haseyes` no-eyes gate ✓, swallowed-vs-engulfed via live `dmgtype(AD_DGST)` ✓, Fumbling-magic/Sleepy+`from_what`/wizard-HSleepy/Hunger-magic ✓. No RNG on these paths.
Resistances: Invulnerable head, Sleep, Poison, See_invisible 3-way blind arms, telepathic, warned, Searching, Infravision race-mons fallback, Stealth, spell-cast suit/robe (`spellid(0)>NO_SPELL`, metallic+robe matrix), Fast/Very_fast, Reflecting, Lifesaved, Luck count/zero wizard row, Nth-death `ordin` suffix, debug/explore line, bones count — each with its `from_what` ps where C passes one. `dwa_abil`/`gno_abil` infravision@1 confirmed at C `:91`/`:98` (lookup-only, grants flow through untouched `set_uasmon` path) ✓. SLIMED: clamp (`oldtimeout>0 && newtimeout>oldtimeout` hold) verified present at wizcmds.js:205, `!Slimed?"":" still"` wording, `make_slimed` awaited (async export) with no generic Timeout line ✓ — matches C `:953,1040–1043`.
Menu: corner branch (offx≠0, single page) clears only row 0, paints items verbatim at offx with `(end)` morestr; fullscreen branch keeps the old paged path. No grid snapshot/restore — D-1831 compliant ✓.

Catalogue walk (gameover `enlightenment` path): wizard alignment-record row after piousness (`:1515–1518`) ✓; Invulnerable heads resistances (`:1521–1522`) with flat/H/E/intrinsic/extrinsic disjunction ✓; Antimagic→Sleep (`:1531–1532`, Cold/item-cold named-deferred before it) →Poison→See_invisible 3-way blind arms (`:1571–1580`: see / will-see-when-not-blind / would-see-if-not-blind) →telepathic→warned→Searching (`:1581–1584`, Warn_of_mon/Clairvoyant gap named between) →Infravision (same race-mons fallback as the `^X` path) →Stealth (blocked-Stealth arm named) →spell-cast suit/robe matrix (`:1816–1832`: metallic suit ± robe mitigation/enhancement, skipped when `spellid(0)<=NO_SPELL`) →Fast/Very_fast→Reflecting→Lifesaved (`:1897–1906`, shape/Hate_silver/Free/Fixed_abil gap named) →Luck count/zero wizard row (`:1909–1918`) →death `ordin` suffix (`:1987–2000`, final<2 arms named) →debug/explore line (`:431–434`) →bones count (`:443–446`, past-slot `""`) ✓. `doattributes` `^X` path mirrors Sleep/Infravision/spell-cast rows with `final=0` ("is") wording, plus live `midnight()/night()` (`:647–651`, not gameover-captured iflags) ✓.
SLIMED (`wizcmds.c:953,1040–1043`): the SICK/SLIMED/STONED clamp (`oldtimeout>0 && newtimeout>oldtimeout` → hold) verified present above the switch (wizcmds.js:205–207) ✓; `!Slimed?"":" still"` + `"turning into slime"` via `fmt`, `make_slimed` awaited (async export) with no generic Timeout line ✓ — matches C exactly.

Callee closure: `a_monnam`, `from_what`, `ordin`, `haseyes`, `dmgtype`, `spellid`, `is_metallic`, `night`/`midnight`, `make_slimed` all LIVE (same-edge extends or lazy in-body). No STUBs, no clones. Named omits (held-by non-swallow arms, Cold/halfdmg, Warn/Clairvoyant gap, shape/Hate_silver/Free/Fixed_abil, blocked-Stealth, final<2 arms, five wiz arms) are stated in message + map + code — dispatch live, callees named, not stubbed.

## Hallucinations / overclaim

One real overclaim-by-omission: the D-log's "Verify: PASS green 2/2 + strict ×2 / PASS cohort 7/7" never ran the full suite (unlike D-1994's auto full-suite gate), so the fortress regression below shipped unnoticed. The per-arm "Match C" claims themselves verify clean — the bug is a missing import binding, not a misread C arm.
Corpus-side evidence the port is otherwise sound: 92150's enlightenment header now matches (still blocked at step 92 on a later row), and all six moved enlightenment sessions land on strictly later owners (`one_characteristic`, `armoroff`, `m_search_items`, `readobjnam`, `hmonas`) — forward motion on every session the arm reaches.
Lesson for the next port iter: shared display files (`invent.js`) must run the full 44-session gate even when the D-log's focused verifiers are green — the green pair never plays a deaf hero.
No seed, RNG-index, or coordinate reads anywhere in the hunk; the menu branch keys off `offx` (a layout value C computes the same way), not a recorded position.
Cycle check: the module graph at HEAD is unchanged in shape (one large SCC, no new edges — every new name extends an already-imported same-edge list or a lazy in-body import), and the touched bindings are hoisted declarations or lazy reads, so no top-level TDZ read is possible.

## Density

+436/−49 across three files, one C family plus its one-line-called SLIMED arm. Over the 250-insertion line so the review ceiling (not the port) rises to 450; the port itself is a single falsifier family with closed callee closure — right-size per §2b. Per-file: invent +441/−~45 (status arms, resistance catalogue, both disclosure paths, corner menu branch), attrib +23/−2 (two lookup tables, three H-fields, two race imports), wizcmds +21/−2 (SLIMED arm + one import name + comment). The menu branch reuses the in-file `nhw_menu_geometry` (no new helper, no new edge); spell/metallic/clock callees are lazy in-body imports. The one stale `ordin` clone (dothrow.js) predates this commit and is out of scope — the commit itself imports the live export.

## Verification

D-log cites four verifiers with per-session first divergences. Re-measured this review at `--base f8079012~1`: enlightenment "0 PASS, 6 moved past, 1 unchanged, 0 worse → PROGRESS" ✓ exact (92150 still enlightenment@92 with header now matching); one_characteristic "5 PASS, 8 moved past (2 still at a later step) → PROGRESS" ✓ exact; status_enlightenment "0 PASS, 4 moved past (all four → exercise) → PROGRESS" ✓ exact; wiz_intrinsic "0/0/9 → NO MOVEMENT" ✓ exact and honestly labeled (SLIMED unreached, no regression). `imports.mjs --rulecheck` clean (re-run at HEAD — it checks banned specifiers, not missing bindings, so it cannot catch this class). Added-line identifier cross-check: all 46 ALL-CAPS tokens in the invent.js hunk resolve (static imports, `objectNames.indexOf` strings, lazy-import bindings, or comments) except `DEAF` — the single real gap. Added-line grep: no FORCE/DIAG/RNG-log/seed/coordinate tokens. Cadence full `sessions` this review: **43/44** (RNG 765680/792838, Scr 10810/11405) — `seed0002` throws `DEAF is not defined` (the C-wrong above); all four corpus re-measures still hold.

## Actionable C-wrongs

1. Missing `DEAF` import in `js/invent.js` (D-1995 hunk): `status_core_lines` calls `from_what(DEAF)` (invent.js:4882) but `DEAF` (`const.js:2561`, `export const DEAF = 16`) was not added to the const.js import list. Any deaf hero running `^X`/death disclosure throws `ReferenceError: DEAF is not defined` — fortress 43/44 (`seed0002-healer-reflection-drummer`). Fix: add `DEAF` to the existing `./const.js` import (same edge, no cycle risk); sibling added identifiers all checked (comments, `objectNames.indexOf` strings, or lazy-import bindings — `DEAF` is the only real gap). Source: reviews/loop-unattended/965-f8079012-enlightenment-family-slimed.md.

Verdict: **QUALITY-RISK**
