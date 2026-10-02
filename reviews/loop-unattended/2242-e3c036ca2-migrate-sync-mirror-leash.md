# Review 2242 — e3c036ca2 — migrate sync mirror + leash arm

Metadata: SHA `e3c036ca2f0307bb4a4c24d2e3350b86a3c73aa8` (D-3281,
2026-10-02). `js/teleport.js` (~100 ins: leash arm +
:906 sync mirror + 2 clone deletions) and `js/apply.js`
(+mhis_leash export). One function: `migrate_to_level`
(C dog.c:886–932).

Intent vs deliverable: subject promises the relmon
take-off sync mirror + leash arm. The diff wires the
`:898–901` leash arm (message-first + sync FALSE
clear), the `:906` mirror in C mon.c:2559–2594 /
:2694–2730 order, deletes both ledger clones for
canonical imports, and exports mhis_leash. Delivers
what it promises; threads D-3280's sync wall without
contradicting it (nothing floats except message
delivery — verified below).

Inventory:

- Leash arm (teleport.js): `mtame--`, canseemon-gated
  TRUE message initiated (`void pline_mon` /
  `void pline`), then `void m_unleash(mtmp, false)`.
- `:906` sync mirror: fire-and-forget panics
  (:2565–2566, :2583) + take-off core (onmap via
  aliased canonical m_at; mtrapped=0; worm ?
  remove_worm : flag-free remove_monster_xy;
  mundetected=0; M_AP_TYPE-gated seemimic; fill_pit;
  newsym; polearm=null) + fmon unlink + migrating_mons
  prepend with nmon link.
- Deleted: ledger_to_dnum/dlev clones → canonical
  dungeon.js imports (single import statements :92/:94
  — edges genuinely new; post-commit `--can` ALREADY
  ×2 ✓).
- `mhis_leash` (apply.js:1468): local → export.
- Required `sym.mjs` paste (deleted clones):
  `ledger_to_dnum js/dungeon.js:1128 sync`,
  `ledger_to_dlev js/dungeon.js:1144 sync` — single
  exports, zero clones. Deleted bodies ≡ canonical
  (and the deletion fixes a latent divergence: clones
  looped `duns.length`, C/canonical loop `n_dgns`).

**C ↔ JS fidelity — leash arm**: C dog.c:898–901 is
`mtame--; m_unleash(TRUE)`; C m_unleash
(apply.c:725–742) prints first (canseemon →
"pulls free of %s leash!" / else "leash falls
slack.") then clears (leashmon=0 + update_inventory
+ mleashed=0, :736–741). JS: message strings
identical, initiation order identical, state clear
via FALSE call ✓. Sync-ness verified: `m_unleash`
with feedback=false reaches no await (get_mleash +
update_inventory both sync) so `void` runs it to
completion synchronously — no floated physics ✓.
Caveat (noted, unqueued): C `mhis` draws rn2 under
hallucination (PRONOUN_HALLU); JS mhis_leash defers
it — named in the helper's doc before this SHA, now
on a live path; fires only under hallu + leashed
migrant + canseemon.
**`:906` mirror**: relmon order verbatim (panics →
take-off → unlink → nmon-link insert) ✓; take-off
core matches C mon.c:2694–2730 arm-for-arm except
the two NAMED items (unstuck :2703 async-only;
`#if 0` :2711–2713, which C also excludes) ✓. Every
state callee verified sync: seemimic, fill_pit,
newsym, remove_worm, mon_m_at (mon.js:1739 sync —
the gate compares correctly), M_AP_TYPE; local isok
clone ≡ C bounds ✓. Only `void impossible` /
message delivery floats (replmon/D-1914 shape) ✓.
Local steed-finding m_at clone kept for its 7 sites,
disclosed in D-log Next — no new clone ✓.

Hallucinations / overclaim: none. "Runs fully sync
(no await reached)" verified by reading the callee.
"17 C sites pre-wired" re-verified with JS lines.

Density: single-function completion (~100 ins),
below-200 exception documented (D-3280 measured the
closure empty). `Ledger: migrate_to_level partial`
+ Verify ✓.

Verification: D-log Verify shows VERIFY: PASS +
smoke REACH-OK + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify
migrate_to_level --base e3c036ca2~1 --reach-all`): 0
blocked (rows cited none — honest) + smoke 24/24 →
REACH-OK. Zero regressed. Banned-pattern grep:
clean. Rule #2 clean (2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
