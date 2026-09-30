# Review 2108 — 8e8a996ab — spell remainder: impossible arm + 3 ports + 2 stale

- SHA: `8e8a996ab1cad5772d47d7c7378e63d61d4cd1c2` (D-3148)
- Date: 2026-09-30. `js/` delta: +86/−~8 (`js/spell.js` only).
- Cluster: 6 `spell.c` functions — `spelltypemnemonic` arm, new
  `show_spells`/`book_substitution`/`dowizcast`, stale `age_spells`/`spell_idx`.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "spelltypemnemonic impossible arm +
dowizcast/show_spells/book_substitution". Diff actually adds: the default
arm (`:508–512`), `SPELLMENU_DUMP = -3` + DUMP heading unindent in
dospellmenu, and the three new exports. Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `spelltypemnemonic` (spell.js:499, local — C `staticfn`) | +default impossible arm | whole |
| `show_spells` (spell.js:1645, async export — C extern) | new, C order | whole |
| `book_substitution` (spell.js:1805, export — C extern) | new, C order | whole |
| `dowizcast` (spell.js:1948, async export — C extern, dead) | new, C order | whole |
| `age_spells` (spell.js:1819, stale) | none | whole (verified) |
| `spell_idx` (spell.js:1464, stale) | none | whole (verified) |

Callee closure, all LIVE: `impossible` (`display.js:8483`, formats `%d`,
already imported `:125`), `spellid`/`dospellmenu`/`spellet` (same file),
`spelleffects` (`spell.js:2625`, async, returned not awaited — correct in
an async fn), `objectNameStrs` (`generated/objects_data.js:49`, oc_name
table, `spellname()` precedent), `pline`/`paint_corner_nhw_menu`/
`flush_screen`/`nhgetch`/`dismiss_nhw_menu` (standard menu kit). No clones,
no stubs, no omits. No import added → no `--can`/TDZ question.

`sym.mjs` (required — nothing deleted/re-pointed; new + touched symbols):

```text
spelltypemnemonic NOT EXPORTED — 1 LOCAL: js/spell.js:499
show_spells      js/spell.js:1645   ASYNC — await required
book_substitution js/spell.js:1805   sync
dowizcast        js/spell.js:1948   ASYNC — await required
spelleffects     js/spell.js:2625   ASYNC — await required
objectNameStrs   js/generated/objects_data.js:49 sync export const
```

## C ↔ JS fidelity (per function)

**`spelltypemnemonic`** — C `spell.c:831–853`. 7 cases unchanged; new
default runs `void impossible('Unknown spell skill, %d;', skill)` then
`return ''`. String is byte-exact incl. the `;`; live `impossible`
substitutes `%d` (`/%[%sd]/`); `void`-fire keeps the predicate sync.
Caller C `:2121` → JS dospellmenu row paint `:1698` wired. Confirm.

**`show_spells`** — C `spell.c:2058–2069`. `spellid(0)==NO_SPELL` → the
two plines verbatim; else `pline("Spells:")` + `dospellmenu("",DUMP)`
with the return ignored (nhUse). DUMP heading: C `:2104`
`splaction==SPELLMENU_DUMP ? "" : "    "` → JS `nameHead` — exact. The
"PICK_ONE key flow already DUMP-correct" claim is TRUE: C sets
`how=PICK_ONE` and only VIEW-with-≤1-spell flips to PICK_NONE, so C DUMP
is itself PICK_ONE with letter accelerators — exactly the JS flow.
Unwired correctly: sole C caller `end.c:601` is by-design D-1776. Confirm.

**`book_substitution`** — C `spell.c:655–665`. Pointer-identity compare →
`===`, assign, `o_id` refresh iff non-null — exact. The `!spbook` early
return is a JS-shape guard (C derefs a struct, never null). No C call
sites (extern decl only) → unwired correctly. Confirm.

**`dowizcast`** — C `spell.c:786–815`. `n=SPE_DIG+i` loop with the
`>=SPE_BLANK_PAPER` break, "Cast which spell?" menu over
`OBJ_NAME(objects[n])` ≡ `objectNameStrs[n]`, cancel → ECMD_OK, pick →
`spelleffects(i,FALSE,TRUE)` — all exact; corner-menu + `spellet` letters
is the file's established PICK_ONE adaptation (C passes accelerator 0 =
windowing-assigned letters). 0 C references → unwired correctly. Confirm.

**`age_spells`** (stale) — C `spell.c:668–682`: loop guard + `spellknow`
gate + `decrnknow(i)`; macro verified (`spell.h:31`
`svs.spl_book[spell].sp_know--`) and JS inlines exactly
(`game.spl_book[i].sp_know--`). Caller C `allmain.c:355` → JS
`allmain.js:1232`, in moveloop after `gethungry()`, before `exerchk()` —
C order. Confirm.

**`spell_idx`** (stale) — C `spell.c:2378–2387`: loop + match return +
`UNKNOWN_SPELL` — exact. Caller C `:1387`
`force ? spell_otyp : spell_idx(spell_otyp)` → JS `:2626` identical.
Confirm.

No RNG in any of the six C bodies; none added. Diff grep: no
`FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads, `fastforward`, or
hardcoded coordinates. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. Every "live callee" claim checked out as a real body; the subtle
DUMP-is-PICK_ONE claim verified against C rather than assumed.

## Density

- Whole-function verdicts: all six whole — every arm, every callee live,
  every C caller wired or correctly unwired (dead/by-design with citation).
- Cluster: one C file, 6 functions ≤ 10, no Must-fix bundled. One
  `Ledger:` entry + one Verify sub-bullet per function — present for all six.
- Size (+86) is light but the closure is complete as claimed.

## Verification

Re-measured myself (`--base 8e8a996ab~1 --reach-all`, all 6 in one call;
two lines re-captured after scroll-off):

```text
verify <each of 6>: baseline 8e8a996ab~1 — 0 session(s) blocked on it
smoke <each of 6>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log hidden-note + smoke claims match exactly. No
seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
