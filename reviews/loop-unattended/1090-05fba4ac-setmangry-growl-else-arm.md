# Review 1090 — 05fba4ac — setmangry victim growl else-arm (D-2124)

Metadata: SHA `05fba4ac`, `js/mon.js` +9/−4 only. Queue row `uhitm.c`
missum, scen-poly-Knight-92220 step 118/206: C «You miss it. It screams!
It kicks! It kicks again!--More--» vs JS «You miss it. It kicks! It kicks
again! It is frozen by you.». Hero (polymorphed gelatinous cube, blind)
misses the peaceful ki-rin. No prior review claimed closed.

## Intent vs deliverable

Subject promises: the peaceful non-humanoid victim growl else-arm, reached
via missum → `wakeup(mon, TRUE)` → `setmangry`. Diff actually adds:
`else { await growl(mtmp); }` in `setmangry` plus a header comment retiring
growl from the named omits. Promise matches diff exactly; nothing else
touched — the C delta is literally this 3-line arm.

## Inventory

Changed JS: `setmangry` (mon.js) — one new arm. Callee closure:

| Symbol | Status | Evidence |
|---|---|---|
| `growl` | LIVE (`sounds.js:707`, ASYNC, awaited) | `sym.mjs` confirms export; corpus movement proves it prints |
| `humanoid` / `couldsee` / `pline_mon` / `Monnam` | LIVE, pre-existing | untouched |
| `peacefuls_respond` / `adjalign` / `p_coaligned` | LIVE, pre-existing | untouched |

No new import (pre-existing `./sounds.js` edge), no clone, no stub, no
`--can` needed. The `wakeup` was-sleeping growl was already ported; the
ki-rin was peaceful-not-sleeping, so only this arm fires — consistent
with the D-log's path analysis.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/mon.c:4260-4318` (`csym.mjs setmangry`,
59 lines). Guard chain matches arm-for-arm against the C text:

1. Elbereth hypocrite arm (`:4267-4283`, `adjalign` + `rnd(5)` +
   `del_engr`) — still named-omitted (pre-existing, header + map).
2. `STRAT_WAITMASK` clear → `!mpeaceful` return → `mtame` return →
   `mpeaceful = 0` — JS identical, same order.
3. Priest coalign `adjalign(-5)/adjalign(2)` else `adjalign(-1)` — JS
   `adjalign(p_coaligned(mtmp) ? -5 : 2)` / `-1`, identical.
4. `if (humanoid(data) || isshk || isgd) { couldsee → pline_mon("%s
   gets angry!") } else { growl(mtmp); }` — the new `else` sits in exact
   C position (`:4307-4309` region), verified by reading `js/mon.js`
   post-change.
5. `qst_guardians_respond` (quest-leader only) — still named-omitted,
   no corpus reach.
6. `!mon_moving → peacefuls_respond` — unchanged.

No RNG in this arm on either side (`growl` → `growl_sound` default
scream «It screams!» for the blind hero + `wake_nearto`, per the D-log's
`sounds.c:351-427` read). The freeze red-herring analysis is sound:
step-118 C RNG shows `passiveum` `rn2(3)=2` on the second kick, so C
freezes too — behind `--More--`; JS's missing scream shifted the queue
one slot and pulled «It is frozen by you.» into the topline.

## Hallucinations / overclaim

None. The D-log transparently notes the proxy labels the step-136
residual "js-throw" with null owner, then proves no throw exists
(`error` null, raw runner deterministic ×3: RNG 6847/6857, screens
203/206). That disclosure is the opposite of overclaim.

## Density

+9/−4 looks thin under §2b, but the C delta is literally this 3-line
arm — "C is that small", the stated exception. One falsifier, one
locus, no padding. Acceptable.

## Verification

D-log Verify bullet: `verify.mjs --fn missum` → PASS syntax + PASS
rule2 + hidden PROGRESS + green 2/2 + strict ×2 + cohort 7/7 (full
skipped, no shared file). Re-measured myself:
`hidden-proxy.mjs verify missum --base 05fba4ac~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Knight-92220 moved 118 → 136). Grep: no FORCE/DIAG/seed/fastforward/
coordinates. Queue row archived with D-2124 stamp; map header retires
growl from named omits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
