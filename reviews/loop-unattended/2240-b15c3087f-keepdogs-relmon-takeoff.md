# Review 2240 — b15c3087f — keepdogs relmon + flag-free take-off

Metadata: SHA `b15c3087f87a99a645840a06b09236e1d4518317` (D-3279,
2026-10-02). `js/dog.js`, `js/mon.js`, `js/worm.js`,
`js/steed.js` (~30 ins). Two functions: `keepdogs` (C
dog.c:788–884) + `mon_leaving_level` (C mon.c:2694–2730);
`relmon` (C mon.c:2559–2594) is the wired callee.

Intent vs deliverable: subject promises the keepdogs
follower-arm relmon wiring + flag-free take-off. The
diff awaits canonical `relmon` in the follower arm,
exports worm.js's pure `remove_monster_xy`, swaps
mon_leaving_level onto it (dropping the steed flagging
import), and doc-guards steed.js. Delivers what it
promises; the measured-delta demand from the queue row
is met in the message (naive 5 smoke + 3 cohort
regressed → bisected to the OFFMAP-set).

Inventory:

- `keepdogs` follower arm (dog.js:526): inline
  splice+unshift → `await relmon(mtmp, game.mydogs)`;
  mx/my=0 + wormno + mlstmv tail kept after, in C
  order. Import pre-existed (mon_arrive).
- `remove_monster_xy` (worm.js:53): local → `export`
  (pure `Map.delete`, no mstate touch) + doc.
- `mon_leaving_level` (mon.js:2150): steed
  `remove_monster` → `remove_monster_xy`; steed import
  dropped (sole use was this site).
- steed.js: doc guard only (flagging variant kept for
  D-1231 gulpmm callers).
- `sym.mjs relmon remove_monster_xy`: single ASYNC
  relmon export, single sync remove_monster_xy —
  awaited ✓. No clone deleted or re-pointed (inline
  splice was never a named clone).

**C ↔ JS fidelity — `keepdogs`**: whole body vs C
dog.c:788–884 — DEADMONSTER skip, pets_only block,
chase/helpless/waiting gate, mintrap, steed / eating /
amulet / stay_behind arms, leash-loose + steed-
impossible, mon_leave → relmon → mx=my=0 →
wormno=numSegs → mlstmv=moves, elif
keep_mon_accessible → migrate_to_level, elif mleashed
→ slack — all present in C order ✓ (JS `else{if}`
≡ C `elif mleashed` — same behavior). Callers: all 3
C sites wired (do.c:1624→do.js:1759,
end.c:1298→end.js:1193, wizcmds.c:116→wizcmds.js:786)
— spot-checked ✓.
**`relmon`**: matches C mon.c:2559–2594 (fmon-empty
+ absent-mon panics → impossible idiom; take-off,
unlink, nmon-link insert / orphan null) ✓.
**`mon_leaving_level`**: matches C mon.c:2694–2730
(mtrapped=0, unstuck, worm/remove branch,
mundetected, seemimic gate, fill_pit, newsym,
polearm.hitmon) ✓; onmap is a documented mixed-mode
superset (m_at ∥ raw grid ∥ fmon-membership) that
converges to C's `grid==mon` as the grid goes exact
— fires fill_pit/newsym only in C-impossible stacked
states, disclosed in-code, not a C-wrong. The
MON_OFFMAP 2-site claim verified by grep (mon.c:4051
+ wizcmds.c:99 only) ✓ — take-off must not flag, and
now doesn't. No RNG in any hunk.

Hallucinations / overclaim: none. "Whole C body
live" for both functions is earned (read both bodies
fully). The pet-id=52 arrival trace claim is
JS-internal forensics for a C-mandated fix (rm.h:534
pure clear) — direction verified against C.

Density: ~30 insertions, below-80 exception with
cause (coverage block empty; migrate_to_level's 13
call-site async propagation correctly deferred to
its own row). `Ledger: keepdogs ported;
mon_leaving_level ported` + per-function Verify ✓.

Verification: D-log Verify shows VERIFY: PASS +
smoke REACH-OK ×2 + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify
keepdogs,mon_leaving_level --base b15c3087f~1
--reach-all`): both 0 blocked (rows cited none —
honest) + smoke 24/24 each → REACH-OK. Zero
regressed. Banned-pattern grep: clean. Rule #2 clean
(2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
