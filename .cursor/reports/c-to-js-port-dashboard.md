# NetHack C→JS port — dashboard

**Purpose:** One-page snapshot of **score baseline**, **milestone status**, and **harness vs real C** so agents do not rely on stale narratives (for example pre–May-2023 assumptions about a large `fastforward.js` replay).

**Related:** thin handoff [`c-to-js-port-current.md`](c-to-js-port-current.md), gap inventory [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md), deep history [`c-to-js-port-progress.md`](c-to-js-port-progress.md) + [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md).

---

## As of (refresh)

Regenerate the **session table** and `frozen/port-score-snapshot.json` after meaningful RNG or scoring changes:

```bash
node tools/port-score-snapshot.mjs --update-dashboard
```

That runs `bash frozen/score.sh` (~20s), then splices the markdown block below.

**Static header** (update manually when the narrative shifts):

- **Strategic focus:** TTY chargen + `u_init` / `ini_inv` toward C `wintty.c` / `role.c` / `u_init.c`; then `game.invent` + `mkobj`; peel `monmove` / `moveloop_aux` harness only when per-path RNG matches C ([`port-from-c-not-score.mdc`](../rules/port-from-c-not-score.mdc)).

---

## Public session score table (generated)

<!-- PORT_SCORE_SNAPSHOT_START -->

| Session | P | RNG matched/total | Screen matched/total | Buckets |
|---------|---|-------------------|------------------------|---------|
| `seed0002-healer-reflection-drummer.session.json` | N | 2216/27158 | 7/595 | screens>0 |
| `seed0004-feeding-pony.session.json` | N | 540/12084 | 7/409 | screens>0 |
| `seed0006-wizard-water-demon.session.json` | N | 1241/6736 | 24/123 | screens>0 |
| `seed0007-rogue-snake-swamp.session.json` | N | 1146/16373 | 8/302 | screens>0 |
| `seed0009-swimmer-mforce.session.json` | N | 530/3713 | 9/73 | screens>0 |
| `seed0012-monk-vault-escort.session.json` | N | 1272/13878 | 12/308 | screens>0 |
| `seed0013-friday13-save-then-fullmoon-restore.session.json` | N | 520/4804 | 0/99 | — |
| `seed0013-rogue-friday13-combat.session.json` | N | 516/4838 | 0/59 | — |
| `seed0014-dequa-fountain-explore.session.json` | N | 177/59178 | 10/714 | early-diverge, screens>0 |
| `seed0015-valk-level2-pit-dog-wait.session.json` | N | 359/8563 | 0/44 | early-diverge |
| `seed0016-healer-newmoon-eat-zap.session.json` | N | 2128/3656 | 0/36 | rng>50% |
| `seed0017-samurai-altar-pray.session.json` | N | 2431/3465 | 8/67 | rng>50%, screens>0 |
| `seed0030-ten-diverse-deaths.session.json` | N | 5131/105529 | 0/1953 | — |
| `seed0060-orc-rogue-kick-search.session.json` | N | 1051/3626 | 0/41 | — |
| `seed0077-rogue-chargen.session.json` | Y | 3242/3242 | 33/33 | full-pass |
| `seed0101-ranger-quiver-throw-travel-engrave.session.json` | N | 1003/2371 | 0/27 | — |
| `seed0102-ranger-name-cancel.session.json` | N | 1250/4485 | 0/25 | — |
| `seed0103-knight-ride-pony.session.json` | N | 2018/2640 | 0/60 | rng>50% |
| `seed0104-knight-ride-combat.session.json` | N | 2378/3223 | 0/43 | rng>50% |
| `seed0105-valk-chat-lamp-ration.session.json` | N | 958/2499 | 0/30 | — |
| `seed0106-priest-extcmd-sweep.session.json` | N | 1207/4194 | 0/267 | — |
| `seed0107-samurai-twoweapon-enhance.session.json` | N | 2497/2902 | 0/98 | rng>50% |
| `seed0108-wizard-extcmd-wishlist.session.json` | N | 469/16958 | 0/303 | early-diverge |
| `seed0116-wizard-wear-shop.session.json` | N | 744/12562 | 0/127 | — |
| `seed0200-monk-north-search.session.json` | N | 572/3822 | 0/40 | — |
| `seed0360-wizard-world-tour.session.json` | N | 460/120639 | 0/833 | early-diverge |
| `seed0361-archeologist-tour.session.json` | N | 1177/53865 | 0/366 | — |
| `seed0367-priest-quest-tour.session.json` | N | 273/50125 | 0/324 | early-diverge |
| `seed0373-barbarian-quest-tour.session.json` | N | 279/35386 | 0/124 | early-diverge |
| `seed0383-wizard-hallucinate.session.json` | N | 1321/16915 | 0/219 | — |
| `seed0398-wizard-wandpoly-pile.session.json` | N | 966/3026 | 0/87 | — |
| `seed0399-wizard-hallu-actions.session.json` | N | 247/11409 | 0/532 | early-diverge |
| `seed0501-priest-cast-read-turn.session.json` | N | 1141/2238 | 0/28 | rng>50% |
| `seed0700-samurai-explore-descend.session.json` | N | 1739/3230 | 0/51 | rng>50% |
| `seed0900-tourist-explore-actions.session.json` | N | 359/2983 | 0/84 | early-diverge |
| `seed1150-caveman-explore-move.session.json` | N | 335/3137 | 0/51 | early-diverge |
| `seed1500-rogue-explore-move.session.json` | N | 1060/2768 | 0/40 | — |
| `seed1800-tourist-eat-throw.session.json` | N | 1984/2458 | 0/26 | rng>50% |
| `seed2200-wizard-quaff-zap-read.session.json` | N | 2384/3018 | 0/230 | rng>50% |
| `seed2600-wizard-custom-binds.session.json` | N | 260/11647 | 0/38 | early-diverge |
| `seed4500-knight-coverage.session.json` | N | 222/108275 | 0/1814 | early-diverge |
| `seed5002-wizard-coverage-pair.session.json` | N | 628/12167 | 0/410 | — |
| `seed5006-tourist-stress-disaster.session.json` | N | 374/13923 | 0/249 | early-diverge |
| `seed8000-tourist-starter.session.json` | Y | 3130/3130 | 23/23 | full-pass |

**Summary:** 2/44 passing · commit `79e2cec` · `2026-05-25T22:14:13.773Z`

<!-- PORT_SCORE_SNAPSHOT_END -->

---

## Milestone matrix (C port milestones, not “maximize score”)

| Milestone | Status | Notes |
|-----------|--------|--------|
| Shrink [`js/fastforward.js`](../../js/fastforward.js) | **Mostly done** | Startup replay largely replaced by [`js/o_init.js`](../../js/o_init.js), [`js/dungeon_init.js`](../../js/dungeon_init.js), [`js/role_init.js`](../../js/role_init.js); post-mklev continues in [`js/u_init_post_mklev.js`](../../js/u_init_post_mklev.js). |
| `game.invent` + `mkobj` + real `ini_inv` | **Stub / not wired** | [`js/ini_inv_stub.js`](../../js/ini_inv_stub.js) for overlays; unlocks skills, traps, most item semantics. |
| Real `movemon` / `dochug` | **Partial / high risk** | Real `distfleeck` / `m_move` slices in [`js/monmove.js`](../../js/monmove.js), [`js/m_move_mon.js`](../../js/m_move_mon.js); still uses **stepNum** / geometry gates tuned for canary paths — generalize by porting C order, not new session finders. |
| [`js/moveloop_aux.js`](../../js/moveloop_aux.js) end-of-turn tail | **Partial** | Real `gethungry` / `exerchk` / `newuhs` pieces; harness `rn2` blocks remain until `allmain.c` tail matches. |
| TTY chargen (`wintty.c` / pickers) | **In progress** | [`js/chargen_tty.js`](../../js/chargen_tty.js); many sessions need full menus when `nethackrc` omits identity in OPTIONS. |
| Combat (`uhitm` / AC / damage) | **Stub** | [`js/attack.js`](../../js/attack.js) bump damage placeholder. |
| Branches / `sp_lev` / Lua | **Stub / partial** | [`js/sp_levchn.js`](../../js/sp_levchn.js); [`js/mklev.js`](../../js/mklev.js) is large but not full branch graph. |
| Save / bones / multi-segment | **Deferred** | API in frozen [`js/storage.js`](../../js/storage.js); C parity later per [`08-save-bones-persistence.md`](../plans/nethack-port/08-save-bones-persistence.md). |

---

## Harness inventory (what still shapes RNG vs C)

| Location | Role |
|----------|------|
| [`js/fastforward.js`](../../js/fastforward.js) | **Startup:** `fastforward_pre_mklev` empty; `fastforward_post_mklev` → `runUInitRoleRngAfterMklevLikeC` (remainder of `u_init` ordering vs full C). |
| [`js/monmove.js`](../../js/monmove.js) | **Per-turn:** `movemon` harness / `stepNum` sequencing vs full `monmove.c` `dochug` — peel rows only when draw counts match C on exercised paths. |
| [`js/moveloop_aux.js`](../../js/moveloop_aux.js) | **End-of-turn:** conditional replay blocks vs full `allmain.c` tail. |
| [`js/makemon.js`](../../js/makemon.js) (and callers) | **Land eel / `rndmonst`:** `skipLandEelRn2` and related guards documented in changelog until full `rndmonst_adj` + geno parity. |

---

## Execution tiers (from retrospective plan)

**Tier A — unlock many sessions:** `seed0077` rogue `u_init_role` / `mksobj_init` RNG; TTY chargen for rc without embedded role; start `ini_inv` + `mkobj` → `game.invent`.

**Tier B — generalize moveloop:** port `monmove.c` / `allmain.c` slices; **delete** harness branches when measured parity holds — do not add session-specific replay.

**Tier C — deferred:** tutorial / `goto_level` / `tut-1`, full trap/zap/shop long tail (see [`c-to-js-port-current.md`](c-to-js-port-current.md) deferred sections).

### Anti-patterns (do not forget)

- New `stepNum` / coordinate special cases **without** a mapped C call site.
- Extending `fastforward` or harness rows to chase **1/44** without porting the matching C function.
- Treating **screen** divergence as primary before **RNG** alignment at the first mismatch index.

---

## Contest integrity (short)

- Port from **`nethack-c/upstream/`** semantics; do not memorize the 44 public session traces into code.
- **Frozen (do not edit):** `js/isaac64.js`, `js/terminal.js`, `js/storage.js`.
- Submodule search: IDE search may skip nested `nethack-c/upstream/` — use explicit paths or `rg --no-ignore-vcs` (see [`teleport-contest.mdc`](../rules/teleport-contest.mdc)).

---

## Machine-readable snapshot

Committed copy of last run: [`frozen/port-score-snapshot.json`](../../frozen/port-score-snapshot.json) (regenerate with `node tools/port-score-snapshot.mjs`).
