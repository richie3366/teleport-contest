# Review 2327 — 348c0ffa4 — choose_classes_menu whole port

Metadata: SHA `348c0ffa4`, D-3372, missing-arm row. C
`windows.c:1643–1761` (csym range), sole caller
options.c:3360. Stat: js/options.js only (+80/−74,
restart).

Intent vs deliverable: subject promises
"choose_classes_menu whole port (generic
prompt/category/way + monclass arm, exported)". Diff
actually: 5-arg exported restart + monclass arm +
panics + PICK_ONE + caller rewire + 2 dead tables
removed. Matches promise.

Inventory: 1 restarted **C callee**
(js/options.js:5543, was autopickup-only local) + 1
caller rewired (:5727, awaited ✓, sole JS caller
verified by grep). Callees all LIVE:
DEF_CHAR_TO_MLET/mlet_class_explain (mondata.js:886/
940, brace extension, --can ALREADY),
def_char_to_objclass/def_oc_syms (objects.js:109/85,
pre-imported :204). OC_EXPLAIN/DEFAULT_PICKUP_CLASS_
SYMS deleted, zero references remain. Named: the
window-system calls (create/add/select/start/end/
destroy — seed by-design, no scored window system);
the tty key loop is the pre-existing analogue,
behavior-identical for the sole caller.

C ↔ JS fidelity: branch-by-branch confirm. Null guard
(:1660–1661, buffer untouched) → return classSelect
unchanged ✓ (sole caller discards ret via `(void)`,
uses the buffer — projection sound). Cat-0 arm:
DEF_CHAR_TO_MLET covers the 60 monclass chars,
mlet_class_explain = def_monsyms[idx].explain via the
same 1..60 index scheme (spot: a→S_ANT→'ant or other
insect'); row-0 '\0' unreachable in C strings, absent
in JS → throw both ✓. Cat-1 arm: JS
`idx<1||idx>=18` ≡ C `!IndexOk` (mapper range
1..18, valid 1..17 both; invalid 18 → panic/throw
both; def_oc_syms.length=18 executed ✓); text
`"%c  %s"` ✓; deleted OC_EXPLAIN values match
def_oc_syms row-for-row on all checked rows ✓.
Preselect `way && *select && strchr` ✓. a–z/A–Z
advance + 'Z' post-add break ✓ exact. All-classes row
`category==1 && next<='z'` + separator + 'A' + the
`!strcmp(prompt)` notes ✓. PICK_ONE: accelerator
finishes with the pick ✓, Enter → '' (no preselect
under !way, toggles unreachable) = C n==0 ✓; Esc →
unchanged = C n==-1/eos ✓; 'A' → '' = C ' '-collapse
✓; items-before-'A' precedence = C add order under
duplicate accelerators ✓. Panics → throw with the C
message (throw≡panic precedent dungeon.js:548 ✓).
No RNG.

Hallucinations / overclaim: none. "'A'-before-items
reordered to C tty order" is accurate (add order);
"identical while ≤ 26 classes" correctly bounds it.

Density: single-function cluster with stated exception
(file holds nothing more Open) ✓. One `Ledger:`
entry, one Verify line, full 44/44 (shared file) ✓.

Verification: re-measured — `verify
choose_classes_menu --base 348c0ffa4~1 --reach-all` →
"0 blocked" + "smoke 24/24 → REACH-OK". Matches the
D-log. Diff grep: 0 banned hits. `sym.mjs` (required
paste; local → export, no clone involved):

```text
choose_classes_menu js/options.js:5543   ASYNC — await required
```

Single definer.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
