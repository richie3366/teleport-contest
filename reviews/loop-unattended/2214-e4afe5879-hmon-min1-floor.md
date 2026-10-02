# Review 2214 — e4afe5879 — hmon_hitmon min-1 floor

Metadata: SHA `e4afe58791edd67317ee8716c91bf69d83f90d09` (D-3253, 2026-10-02).
js/ delta +8/−5 in `js/uhitm.js` only. No new imports, no symbols
deleted or re-pointed (single-expression change over in-scope locals).

Intent vs deliverable: subject promises "`hmon_hitmon` :1812 min-1
floor ships D-1384 omit". The diff delivers exactly one semantic line
(`dmg = 0` → the C :1817 ternary) plus comment/doc sync. The `abuse_dog`
row is archived with no body change — correctly, since the writer was
the caller's dmg, and D-3251's "body whole" call for abuse_dog is thus
confirmed. Honest framing throughout.

Inventory:

- `hmon_hitmon` (:1812 floor consumer, `js/uhitm.js:2070`): unconditional
  `dmg = 0` → `dmg = (get_dmg_bonus && !mon_is_shade) ? 1 : 0` with C's
  :1815–1816 comment. Shade `shade_miss` gate below untouched. No new
  callees (all locals), so no LIVE/CLONE/STUB classification applies.

**C ↔ JS fidelity**

- C `uhitm.c:1753–1935` (`hmon_hitmon`), floor at :1812–1823:
  `mon_is_shade = (mon->data == &mons[PM_SHADE])`,
  `hmd.dmg = (hmd.get_dmg_bonus && !mon_is_shade) ? 1 : 0`,
  shade-only `shade_miss` gate skipping HMON_THROWN/HMON_KICKED.
  JS :2070–2078 matches all three lines, including the thrown/kicked
  skip and the `hittxt` guard.
- Flag threading (the subtle part) verified, not trusted: C inits
  `hmd.get_dmg_bonus = TRUE` at :1778, the do_hit helper may clear it
  at :1137/:1190/:1316/:1339/:1349, consumer at :1817. JS mirrors:
  `let get_dmg_bonus = true` (:1980, cites :1778) →
  `hmdHit.get_dmg_bonus: true` (:2013) →
  `await hmon_hitmon_do_hit(hmdHit…)` (:2029 = C :1795) →
  re-sync `get_dmg_bonus = !!hmdHit.get_dmg_bonus` (:2039) →
  recalc (:2046 = C :1806, flag passed through, gated at :1086 = C
  :1447) → poison (:2051 = C :1809) → floor (:2073 = C :1817).
  Order exact; the 5 clears live in the do_hit helper (:1288/:1329/
  :1428/:1447/:1456) as D-log claims. The thrown-dagger path keeps the
  flag TRUE on both sides — empirically confirmed by the mover (a
  wrongly-cleared flag would leave dmg 0 and the session unmoved).
- `mon_is_shade`: C pointer-compare vs JS `mon.data?.mndx === PM_SHADE`
  — the file's standard equivalent, used identically by neighbors.
- No RNG in the arm on either side. Behavior delta is exactly the
  documented one: non-shade + flag-TRUE + dmg<1 goes 0→1; all other
  arms byte-identical.
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. The D-log's measurement section
(rng-diff lockstep, JS invent probe showing cursed spe −2, same-target
proof falsifying D-3251's targeting guess) is evidence-graded and the
conclusion follows. "Ships D-1384 named omit" is accurate — the omit
was named in D-1384 and the consumer is what's added.

Density (§2b): +8/−5, one semantic line — far under the floor. Escape
clause documented (dog.c closure fully live: m_unleash/yelp/growl/
newsym/redraw_worm; coverage 0, queue tagged). The D-log's Next even
names the follow-ups (silver plumbing, stagger mhurtle) as own-rows.
Precedent-consistent; the line it ships unblocks +161 steps. ACCEPT.

Verification: re-measured:
`verify abuse_dog,hmon_hitmon --base e4afe5879~1 --reach-all` →
abuse_dog: Ranger-94128 `moved → yn_function at step 223 (was 62)` →
PROGRESS; `reach abuse_dog: 122 run, 122 PASS → REACH-OK` (full, no
sample); hmon_hitmon vacuous (D-log says "no blocked session") +
smoke 24/24 REACH-OK. 0 regressed. Every D-log number reproduced.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
