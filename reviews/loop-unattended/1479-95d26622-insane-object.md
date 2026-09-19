# Review 1479 — 95d26622 — mkobj.c insane_object + where_name (D-2520)

Metadata: SHA `95d26622`, `js/mkobj.js` (+67 L). Coverage MISSING → live. NN 1479.

## Intent vs deliverable

Subject promises whole-body `insane_object` (`:3314–3339`) + `where_name` (`:3299–3308`) with helpers (`OBJ_STATE_NAMES`, `fmt_ptr`, `OFMT0_SANITY`) and wiring the one JS-live C caller (`check_glob :3440–3441`). Diff actually adds all of that and replaces `check_glob`'s inline-impossible stand-in. Matches the promise.

## Inventory

New JS: `OBJ_STATE_NAMES`, `where_name` (sync), `fmt_ptr` (file-local), `OFMT0_SANITY`, `insane_object` (async — `sym`: `js/mkobj.js:1565 ASYNC`; async only because JS `impossible()` can reach --More--). Same-edge import words (`x_monnam`, `strstri`, `NOBJ_STATES`/`ARTICLE_A`/`EXACT_NAME`). No symbols deleted or re-pointed.

## C ↔ JS fidelity

Checked against pinned C `mkobj.c:3313–3339`, `:3295–3309`, `:3289–3293`, `:3436–3442`:

- Table verified verbatim in OBJ_* order (10 entries; `NOBJ_STATES = 10` at `js/const.js:1359`) ✓.
- `where_name`: null → `nowhere`, range/empty-slot → `unknown[${where}]` (= C `unknown[%d]`), else table ✓.
- `insane_object`: `override_ID++/doname/--` on `game.iflags` ✓; mon-or-minvent-mesg arm appends ` held by mon %s (%s)` with `x_monnam(mon, ARTICLE_A, null, EXACT_NAME, true)` ✓; impossible arg order both arms ✓. `fmt_ptr` renders `o_id ?? m_id ?? 0` as 0x-hex (no heap pointers in JS; `fmt_timer_arg` precedent cited) ✓.
- Caller: `check_glob` now calls `insane_object(obj, OFMT0_SANITY, strsubst(mesg,' obj ',globbuf), MINVENT ? ocarry : null)` — matches C `:3440–3441` (`OBJ_MINVENT` already in scope); `%ld`/`%u` → plain ints is identical text on this path; `#if 0` weight arm stays out like C ✓.

Callee closure: `doname`, `x_monnam`, `strstri`, `impossible` all LIVE. The 7 other C callers (`obj_sanity_check`, `objlist_sanity`, `shop_obj_sanity`, `mon_obj_sanity`, `insane_obj_bits`, `check_contained`, `sanity_check_worn`) do not exist in `js/` — verified the claim by absence (no same-named exports to wire); named with the rule that each wires up when it ships. No clones, no stubs, no FORCE/DIAG/coords/seeds.

## Evidence detail

Required `sym` outputs: `insane_object — js/mkobj.js:1565 ASYNC`, `where_name — js/mkobj.js:1534 sync`. `OBJ_MINVENT` already in scope at the `check_glob` call site (`js/mkobj.js:60` const import; used at `:260`, `:474`); `NOBJ_STATES = 10` at `js/const.js:1359`.

C call site (`mkobj.c:3436–3442`): `Sprintf(globbuf, " glob %d,quan=%ld,owt=%u ", obj->otyp, obj->quan, obj->owt)` then `insane_object(obj, ofmt0, mesg, (obj->where == OBJ_MINVENT) ? obj->ocarry : 0)`. JS renders `` ` glob ${otyp},quan=${quan ?? 1},owt=${owt} ` `` — plain-int rendering of `%d/%ld/%u` is byte-identical for the values that reach here (the gate above already rejected quan ≠ 1 and owt == 0; a negative owt would differ under `%u`, but that value is itself the insanity being reported). The `#if 0` multiple-of-20 arm stays out on both sides.

`fmt_ptr` vs C `alloc.c:125–135` (`%p` into a rotating static buffer): JS renders `o_id ?? m_id ?? 0` as 0x-hex. The rotating-buffer aspect has no JS analogue (the caller consumes the string synchronously inside one `impossible` call, so no aliasing hazard exists); the stable-identity substitution follows the `fmt_timer_arg` precedent and is disclosed in the header comment.

Stale-comment hygiene: `check_glob`'s header previously read "C reports via insane_object (no JS port — own row when a falsifier fires)"; now cites `:3440–3441` with the ofmt0/subst/carrier detail. The 7 unported callers are named in both the message and the `insane_object` header intent (wire-up-on-ship rule), not Must-fix.

## Hallucinations / overclaim

None. "0 blocked" presented as a coverage gap with the vacuous note. The D-log's import-smoke claims (`where_name` floor/nowhere/unknown[42], `insane_object` exported function) are consistent with the bodies re-checked above; `sym` confirms both exports resolve at the cited lines.
RNG audit: neither body draws (`where_name` is a pure table lookup; `insane_object` is `doname` + `x_monnam` + `impossible`, all RNG-free on this path) — the port cannot shift any keystream, which is consistent with the vacuous verify and the full-44 hold.
Async note: C is sync throughout, but JS `impossible()` can reach --More-- (await point), so `insane_object` is async and the `check_glob` call site (already async) awaits it. No other caller exists in `js/` yet, so no sync/async mismatch is introduced anywhere.

## Density

Right-sized: two small related C functions + one caller wire, one module.

## Verification

- Re-ran `hidden-proxy.mjs verify insane_object --base 95d26622~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + fixed smoke 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log.
- D-log cites green 2/2, strict ×2, cohort 7/7, plus `node --check` + import smoke.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
