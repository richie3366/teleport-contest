# Review 2055 — cf7eb9a6b — fix_curse_trouble whole-body restart (D-3095)

Metadata: SHA `cf7eb9a6b`, D-3095, single-function coverage cluster.
js/pray.js (+39/−29 incl. a clone deletion).

## Intent vs deliverable

Promise: restart fix_curse_trouble in C order — impossible-on-null,
live Glib test, Your/gloves_simple_name, Yobjnam2 glow, last_msg,
int bknown, uncurse + update_inventory; delete the pray-local Your
clone. Diff delivers exactly that (+3 live imports on existing
edges). Promise kept.

## Inventory

- `fix_curse_trouble` (restarted js/pray.js:528, still file-local
  like C's staticfn): null→impossible; Glib arm (make_glib(0) +
  Your/gloves_simple_name + early return); glow gate with
  what-or-Yobjnam2 + hcolor amber, last_msg, int bknown; uncurse;
  update_inventory.
- Deleted: pray-local `Your` clone → live display.js import.
  Callees all LIVE, sync/async correct: impossible/Your/pline
  async (awaited ✓), Yobjnam2/gloves_simple_name/Glib/hcolor sync
  (called sync ✓), uncurse async (awaited ✓), update_inventory
  sync ✓, Blind/Blindfolded_only/Hallucination local readers
  (unchanged). No new clones/stubs.

## C ↔ JS fidelity

C pray.c:348–370 (csym range), call-for-call:

- null: `impossible("fix_curse_trouble: nothing to uncurse.")`
  string-exact ✓, awaited (async house form) ✓.
- Glib arm: `otmp==uarmg && Glib` — JS `Glib()` is potion.js:793,
  uprops-first ✓ (old flat-leftover read retired). make_glib(0) ✓;
  `Your("%s are no longer slippery.", gloves_simple_name(uarmg))`
  — live Your is `vpline('Your '+fmt, ...args)` (display.js:7866),
  the printf form C uses ✓; early `if (!cursed) return` ✓.
- Your-clone deletion safe: the 4 remaining sites (:1370, :1792,
  :1814, :1838) pass single nonempty strings, and the old clone
  already funneled through pline→vpline — same composed string,
  same sink, identical output ✓.
- Glow gate `!Blind || (otmp==ublindf && Blindfolded_only)` ✓;
  `pline("%s %s.", what||Yobjnam2(otmp,'softly glow'),
  hcolor('amber'))` ≡ C ✓ — the `||` vs `?:` edge (empty-string
  what) cannot fire: C and JS both carry what ∈ {null, glow
  string} from the same fix_worst_trouble sites ✓. NH_AMBER ≡
  'amber' (established precedent) ✓.
- `last_msg = PLNMSG_OBJ_GLOWS` ✓ (import pre-exists :149);
  `bknown = Hallucination()?0:1` ≡ C `!Hallucination` int ✓;
  uncurse ✓; update_inventory ✓ (sync, pre-imported :78).
- Callers: C's 7 fix_worst_trouble sites (pray.c:456/489/494/503/
  512/531/539) ≡ 7 JS sites (:739/:763/:767/:777/:785/:801/:807),
  unchanged this iteration ✓. No RNG. Confirm.

`sym.mjs` output (Method §3 — deleted clone → import):

```text
Your             js/display.js:7866   ASYNC — await required
Yobjnam2         js/objnam.js:2845   sync
gloves_simple_name js/objnam.js:1352   sync
Glib             js/potion.js:793   sync
uncurse          js/mkobj.js:734   ASYNC — await required
update_inventory js/invent.js:4742   sync
```

(Remaining Your/Yobjnam2/gloves/Glib clones sym flags are in
untouched files — pre-existing, out of this SHA's scope.)

## Hallucinations / overclaim

None. "Whole body, every callee live" verified; the %-safety and
Your-identity claims both check out.

## Density

Single-function cluster, sole pray.c row ✓. `Ledger:` ported ✓.
SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify fix_curse_trouble --base
  cf7eb9a6b~1 --reach-all`: `0 blocked (0/0)` + `smoke 24/24, 0
  regressed → REACH-OK`. Matches; honestly vacuous.
- Ban-grep: 0. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
