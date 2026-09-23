# Review 1718 — 22b0e07c3 — lookaround whole-body restart (D-2759)

- SHA: `22b0e07c3` (`hack.c` lookaround: whole-body restart, D-2759)
- Files: `js/cmd.js` (+162), `js/hack.js` (2× local→export)
- D-log: D-2759; queue row: Open (`lookaround` PARTIAL), 0 corpus blocks
- Banned grep: 5 raw hits, all the C macro name `NODIAG` — 0 real hits

## Intent vs deliverable

Subject promises the whole 163-line body with `stop:` as `nomul(0)`. Diff
delivers exactly that in C order, plus exporting the two `avoid_*`
helpers and awaiting at `continue_run`. Promise kept.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `lookaround` (cmd.js local, async) | C body | `hack.c:3897–4059` (csym range) |
| `avoid_moving_on_trap/liquid` (now exported) | C callee, was local | `hack.c:2443–2490` |

`sym.mjs`: every callee live — `nomul`, `closed_door`, `Blind`,
`mon_visible`, `is_safemon`, `mon_at`, `dist2` (both JS variants return
`dx²+dy²` ≡ C, so cmd.js's mon.js import is safe), `set_msg_xy`,
`pline_xy`/`pline_The` (async, awaited), `upstart`/`a_monnam` (the
exports — no new clones), `IS_AIR`, `ICE`, `S_hcdoor/vcdoor`.
Required re-point output: the two `avoid_*` are single exports in
hack.js with no remaining local clones; nothing deleted.

## C ↔ JS fidelity

Walked the full body call-for-call: NODIAG head (macro verified
`hack.h:1414` ≡ `umonnum==PM_GRID_BUG`), `Blind() || run==0` gate,
per-cell `infront`/`isok`/`u_at`/diagonal skips, monster arm (M_AP
furniture/object exclusion, `mon_visible`, run≠1/safemon vs
infront/!travel, mention-gated `pline_xy`), STONE/away skips, trap arm
with the exact three-way (run==1→bcorr, infront→stop, else fall through
to the terrain chain — not continue), else-chain (OBSTRUCTED/ROOM/AIR/
ICE; closed-door-or-mimic with diagonal skip, mention `set_msg_xy` +
"You stop in front of the door.", stop/bcorr; CORR; pool/lava with
infront-liquid stop; objects-else run==1/8/mtmp/diagonally-behind with
fall-through stop), bcorr counting (`i>2`, noturn, closest-wins, m0),
run==2 widen pline, auto-turn with `last_str_turn` ±2 clamp. Inlined
macros verified against pinned headers: `is_door_mappear`
(`monst.h:240`, exactly the hcdoor/vcdoor disjunct), `is_pool_or_lava`
(`dbridge.c:77`, exactly is_pool||is_lava), `closed_door` (JS export ≡
`monmove.c:2181`). `stop:` → `nomul(0)`: JS nomul matches C statement
for statement (multi guard, botl, uinvulnerable, usleep, multi=nval,
reason clear, end_running, cmdq clear). No RNG. Sole C caller
`allmain.c:516` ≡ JS `continue_run` (awaited; the D-log "sole caller"
line is correct — `dolookaround` calls `lookaround_known_room`, a
different function).

## Hallucinations / overclaim

None. "C-identical on this path" for nomul checks out; the full-score
insurance claim (501/540, 0 PASS→FAIL) is re-checked by this audit's own
re-score below.

## Density

162 insertions for a 163-line C body: exactly right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify lookaround --base 22b0e07c3~1
--reach-all` → 0 blocked, smoke 24/24 REACH-OK. Matches the bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
