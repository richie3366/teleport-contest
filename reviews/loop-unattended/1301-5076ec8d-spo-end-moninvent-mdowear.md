# Review 1301 — 5076ec8d — sp_lev.c spo_end_moninvent m_dowear ×3 leaders (D-2335)

Metadata: SHA `5076ec8d`, D-2335, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/mklev.js` +17/−8); C `spo_end_moninvent sp_lev.c:3030-3036` body + `sp_lev.c:2184` setter + `:3392` Lua call site + all C `m_dowear(` callers (grep, not csym — global `invent_carrying_monster` has no csym definition); `sym.mjs` on `m_dowear`; `imports.mjs --can` (mklev→worn edge) + `--rulecheck`; full `m_dowear`/`m_dowear_type` (`worn.js:815-969,978-1012`) await/RNG audit; added-lines banned-pattern grep (0 hits); `hidden-proxy verify m_dowear --base 5076ec8d~1` re-run.

## Intent vs deliverable

Subject promises `m_dowear(mtmp, TRUE)` after the Pelias / Lord Carnarvon / Arch Priest custom invents, matching C's wear-after-custom-invent. Diff delivers the three calls in C position (after invent, before chest/guard spawns) + import. Kni/Mon (King Arthur / Grand Master) stay named-deferred. Promise kept exactly.

## Inventory

- One import: `m_dowear` from worn.js. Three `m_dowear(mtmp, true)` calls (mklev.js:4433/5358/5851). Docstring omits updated per loader.

## C ↔ JS fidelity

C mechanism verified: `create_monster` sets `invent_carrying_monster = mtmp` on CUSTOM_INVENT (`sp_lev.c:2184`); after the Lua custom-invent function runs, `spo_end_moninvent()` (`:3392`) calls `m_dowear(mon, TRUE)` (`:3033-3034`) and clears the global. JS has no Lua layer, so calling `m_dowear(mtmp, true)` directly after each leader's invent loop is the faithful structural equivalent — same function, same creation flag, same position relative to invent. `if (mtmp)` guards untouched. ✓

Sync-through audit (the commit's riskiest claim): `m_dowear` is `async` with 8 unconditional `await m_dowear_type(...)`, so "takes no awaits" is loose phrasing — but the conclusion holds. All 7 awaits inside `m_dowear_type` sit under `!creation` gates (puts-on pline `:921` block, autocurse glow, artifact-light shines, suddenly-cannot-see); in creation mode each call completes synchronously and only `m_dowear`'s own continuations defer to microtasks. Creation path is RNG-free (no `rn2`/`rnd`/`d(` in either body; `extra_pref` pure, `ARM_BONUS` arithmetic) and message-free, and nothing later in the same sync stacks reads the leaders' worn state (chest/guard spawns only). End state converges to C before any observable boundary. Same shape as the established `makemon.js:3472` precedent. CLONE-free: single LIVE callee (`worn.js:978` ASYNC, un-awaited by design here).

Cited C mechanism (grep, since the global has no csym definition):

```c
/* sp_lev.c:198 */  static struct monst *invent_carrying_monster = 0;
/* sp_lev.c:2183-2185 (create_monster) */
        if (m->has_invent & CUSTOM_INVENT) {
            invent_carrying_monster = mtmp;
        }
/* sp_lev.c:3030-3036 */
spo_end_moninvent(void)
{
    if (invent_carrying_monster)
        m_dowear(invent_carrying_monster, TRUE);
    invent_carrying_monster = NULL;
}
/* sp_lev.c:3390-3393 (Lua monster path, after the custom-invent fn) */
        nhl_pcall_handle(L, 0, 0, "lspo_monster", NHLpa_panic);
        spo_end_moninvent();
```

So C wears exactly once per custom-invent monster, after invent, with creation=TRUE. JS has no Lua layer; the three direct `m_dowear(mtmp, true)` calls (mklev.js:4433 Pelias / 5358 Arch Priest / 5851 Lord Carnarvon) sit after their invent loops and before subsequent spawns — the faithful structural equivalent. Kni/Mon leaders keep their `spo_end_moninvent → m_dowear deferred` comments (6 remaining sites) as named omits with own-row triggers ✓.

`m_dowear` gate walk (`worn.js:978-1012`, read in full): `!mon?.data` / verysmall-nohands-animal / mindless-non-mummy gates run first (all sync, RNG-free), then one `await m_dowear_type` per slot (AMUL/ARMU/ARMC/ARMH/ARMS/ARMG/ARMF/ARM). In creation mode each `m_dowear_type` walks the invent, picks best by `ARM_BONUS + extra_pref` (pure arithmetic; `extra_pref` returns 20 only for SPEED_BOOTS-on-slow, else 0 — read at `worn.js:672`), applies wornmask + `mfrozen`/`mcanmove`, and returns without hitting any await. The floating promise therefore always resolves; the only hazard would be a throw mid-chain (unhandled rejection), and the creation path has no throwing operations on these three invents (plain armor/weapons, no autocurse otyps, no artifact light).

`--can mklev.js worn.js m_dowear` reports ALREADY (message says SAFE — same conclusion, edge pre-exists). `sym.mjs m_dowear`: `js/worn.js:978 ASYNC` ✓ awaited nowhere on this path by design, documented in the import comment.

Adjacent pre-existing (not this SHA, not queued): `m_dowear_type` calls async `curse(best)` without await — unreachable from these three invents (no HELM_OF_OPPOSITE_ALIGNMENT/DUNCE_CAP) and untouched by this diff.

## Hallucinations / overclaim

One trivial imprecision: message says `--can` → SAFE (new edge); live `--can` reports ALREADY (mklev.js already imports worn.js). Same safety conclusion, no new edge either way. "No session can observe them yet" is accurate (creation-mode, RNG/message-free).

## Density

+17/−8, one 7-line C function ×3 sibling sites, one falsifier. Good.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44, final verify after last `js/` edit). Re-measured:

```text
verify m_dowear: baseline 5076ec8d~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
