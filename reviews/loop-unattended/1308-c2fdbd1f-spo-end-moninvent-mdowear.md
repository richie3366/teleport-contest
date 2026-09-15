# Review 1308 — c2fdbd1f — spo_end_moninvent m_dowear ×2 loaders (D-2342)

Metadata: SHA `c2fdbd1f`, D-2342, C-fidelity residual (queue row cited 0 blocks; D-2335 follow-up). Method: full `js/` hunks read (`mklev.js` only, +14/−4); C `spo_end_moninvent sp_lev.c:3030-3036` full body + `m_dowear_type worn.c:798-830` entry (via `csym.mjs`/read); `sym.mjs` on `m_dowear` (single def, async); JS `m_dowear`/`m_dowear_type` creation-path await audit; added-lines banned grep (0 hits); `imports.mjs --rulecheck` (clean, iteration-wide run); `hidden-proxy verify m_dowear --base c2fdbd1f~1` re-run.

## Intent vs deliverable

Subject promises `m_dowear(mon, TRUE)` after the King Arthur (Kni-strt) and Grand Master (Mon-strt) custom invents, retiring two deferred comments. Diff delivers exactly two guarded `m_dowear(mtmp, true)` calls in C position (after invent, before chest/abbot spawns) + two docstring updates. Promise kept exactly.

## Inventory

- `load_kni_strt` (`mklev.js:6469`): one call after Excalibur + plate mail `mpickobj`, inside the live `if (mtmp)` guard.
- `load_mon_strt` (`mklev.js:10176`): one call after robe +6 `mpickobj`, same guard shape.
- No new imports (`m_dowear` already statically imported — `--can` ALREADY, no new edge), no deleted clones (nothing to `sym.mjs` beyond the callee itself).

## C ↔ JS fidelity

C locus (`sp_lev.c:3030-3036`):

```c
spo_end_moninvent(void)
{
    if (invent_carrying_monster)
        m_dowear(invent_carrying_monster, TRUE);
    invent_carrying_monster = NULL;
}
```

Null-guard + `TRUE` both match (`if (mtmp)` + `true`). Callee closure: `m_dowear` LIVE (async export `worn.js:978`). Creation-path await audit: every `await` in `m_dowear_type` sits inside a `!creation` gate — the wear-pline block (`:897`, `if (!creation)`), the autocurse pline (inside that block), the artifact-shine plines (`!creation && ...`), the visibility pline (`!creation && ...`). With `creation=true` zero awaits fire, so the un-awaited call runs fully synchronously — same shape as the D-2335 sites (review 1301). Entry naming unconditional both sides (C `worn.c:818-819` `Strcpy(nambuf, ...)` before the loop; JS `Monnam`/`mon_nam` before the loop, D-0855 idiom) — no display-RNG delta. `mindless`/`verysmall`/`nohands` gates pre-existing, untouched here.

One mechanism note (not queued): C defers through the `invent_carrying_monster` global to end-of-level while JS dresses immediately after each invent loop. Single-carrier levels make this observationally identical — nothing between (chest/abbot spawns) reads the leader's worn state — and it matches the D-2335 precedent.

## Hallucinations / overclaim

None. "Sync-through without await" verified above (stronger than claimed: no await fires at all on this path). "RNG-free and message-free" holds. "No session can observe them yet" is honest about coverage.

## Density

+14/−4 for a 7-line C locus across two loaders — small because C is that small. Good.

## Verification

D-log tail PASS (syntax/rule2/green/strict/cohort/full, after last `js/` edit) with the hidden bullet honestly labeled vacuous. Re-measured:

```text
verify m_dowear: baseline c2fdbd1f~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches: vacuous note, NOT a corpus PASS, no `--base` owed since the row cited 0 blocks. Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
