# Review 897 — 35d8be59 — getobj takeoff live filter (D-1927)

Metadata: SHA `35d8be59`, D-1927. Files: `js/do_wear.js`
only (+16/−57: `takeoff_ok` added, `takeoff_lets` +
`getobj_takeoff` deleted, `dotakeoff` gate + live call).
Map-driven Open row, 0 corpus blocks cited. Next index 897.

Intent vs deliverable: subject promises replacing the
`getobj_takeoff` clone with live `getobj("take off",
takeoff_ok, GETOBJ_NOFLAGS)` plus the missing
`item_action_in_progress` gate. The diff delivers exactly
that; nothing else. Promise ≡ diff.

Inventory: one new file-local `takeoff_ok(obj)` delegating
to file-local `equip_ok(obj, true, false)`; two deleted
file-local symbols (`takeoff_lets`, `getobj_takeoff` —
`sym.mjs` confirms NOT FOUND anywhere post-commit, no
dangling callers). `getobj` → `js/invent.js:6976` ASYNC,
awaited at the call site; import block pre-exists (line 29),
so no new cross-module edge. `equip_ok`/`takeoff_ok` are
file-local in JS exactly like C's `staticfn` pair — local
shape mirrors C, not drift.

**C ↔ JS fidelity** (csym ranges cited): `takeoff_ok`
`do_wear.c:3471–3475` is `equip_ok(obj, TRUE, FALSE)` —
JS passes `(obj, true, false)`; `equip_ok(obj, removing,
accessory)` per `do_wear.c:3403–3447`, so arg order is
exact (removing, non-accessory filter). `dotakeoff`
`do_wear.c:1832–1855`: the gate `Narmorpieces != 1 ||
ParanoidRemove || gi.item_action_in_progress` is now
position-exact (`!== 1 || paranoid ||
game.item_action_in_progress`), fixing the dropped third
disjunct. The clone's enumerated C-wrongs (charCode sort vs
SORTLOOT_INVLET, dropped DOWNPLAY accessories, missing
EXCLUDE_INACCESS `else`, no readchar/split_otmp arms) are
all properties of the live `getobj` port, not re-proved
here — correctly out of scope. No RNG in either arm.
Named in-commit: uskin merged-with-skin (`:1840–1845`),
display_pickinv body, sibling getobj_* clones.

Hallucinations / overclaim: none. The sujet's long list of
clone defects reads as verified because each names the live
`getobj` arm that now owns it; the D-log claims no corpus
movement.

Density: net-negative single-locus clone removal closing a
named row — small but justified per §2b (deletes divergence,
adds 16 faithful lines).

Verification: re-measured `hidden-proxy verify getobj --base
35d8be59~1` → `0 session(s) blocked on it (0 at baseline, 0
in the working scoreboard)` — vacuous as stated, nothing
owed. Rule #2 clean (single-file, no imports touched).
D-log gates: green 2/2 + strict ×2, cohort 7/7; full suite
skipped (no shared file) — legitimate. Added/removed lines
grep: zero FORCE/DIAG/getRngLog/fastforward hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
