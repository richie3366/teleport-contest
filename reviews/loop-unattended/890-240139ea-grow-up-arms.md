# Review 890 — 240139ea — grow_up remaining arms (D-1920)

Metadata: SHA `240139ea`, D-1920. Files: `js/mhitm.js` (+84/−59:
full `grow_up` rewrite). Map-driven Open row, 0 corpus blocks
cited. Next index 890.

Intent vs deliverable: subject promises `little_to_big`
promotion, golem/home-elemental thresholds, the `lev_limit` chain,
49-via-undo cap, unconditional 400/`mhp` clamps, `mleashed`
inventory update, and two clone deletions. The diff delivers all
of it and touches no other function. Promise ≡ diff.

Inventory: two local clones re-pointed to canonical imports —
`sym.mjs mhe` → `js/mondata.js:739 sync`, `sym.mjs YMonnam` →
`js/do_name.js:1180 sync`; `sym.mjs YMonnam_grow` / `mhe_grow` →
NOT FOUND anywhere after (clean deletion, pasted as required).
`little_to_big`/`is_home_elemental` ride existing imports; new edge
`update_inventory` from `invent.js` → `--can` ALREADY (no new
cycle). No stub, no new omit (`monsndx`/`DEADMONSTER` idioms are
pre-existing and named).

**C ↔ JS fidelity** (`csym grow_up` →
`makemon.c:2049-2178`, read in full): victim thresholds
(normal/`!m_lev`→4/golem/home-elem×3) exact; `lev_limit`
base (`Math.trunc(3*mlevel/2)` ≡ C left-to-right integer
division) and raise-to-new-form exact; single shared `rnd` then
`rn2` (RNG order kept); unconditional HP add; early `return ptr`
exact; mplayer-30/min-5/max-49(50) chain exact; unconditional
`++m_lev` before the conditional form-change test exact
(C short-circuit order); GENOD message/`set_mon_data`/`mondied`
order exact (`Mgender` ≡ `female?FEMALE:MALE`); gender hack,
cham/newsym/`lev_limit=m_lev`/female/mleashed exact; sanity-undo +
400 cap + `mhp` clamp + `return ptr` exact. Golem
`Math.trunc(mhpmax/10)*10+10-1` ≡ C `((mhpmax/10)+1)*10-1` for
non-negative HP. The probe note about a `rnd(21)≤12` no-gain run
is legitimate C behavior (threshold arm), not a dodge — and the
pre-fix code could never promote at all (`newtype` was always
`oldtype`), so the form-change arms are covered by inspection plus
the kitten→HOUSECAT / gnome→LEADER probe hits.

Hallucinations / overclaim: none. No corpus claim is made; the
probe is honestly labeled, including the seed-dependent no-gain
observation.

Density: ~143 changed lines, one function — right-sized per §2b.

Verification: re-measured `hidden-proxy verify grow_up --base
240139ea~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
