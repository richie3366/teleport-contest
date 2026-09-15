# Review 1342 — f4c8bef2 — mkobj.c shrink_glob full body + ice/eat/catch-up/messages

- SHA: `f4c8bef2`, D-2376. JS files: `js/mkobj.js` (cluster), `js/eat.js`
  (`eating_glob`), `js/objnam.js` (`partly_eaten_hack` arm).
- Prior reviews closed: none. Largest diff this audit (~230 js/ insertions).

## Intent vs deliverable

Subject promises: full `shrink_glob` body retiring the D-0993 thin port, plus
`curr.timeout` dispatch fix. Diff actually adds: file-local ice consts +
`item_on_ice`, `check_glob`, `shrinking_glob_gone`, exported async
`shrink_glob(obj, expire_time)`, `SHRINK_GLOB` dispatch passes `curr.timeout|0`,
`eating_glob` in eat.js, globby `partly_eaten_hack` arm in `pretty_base`. Matches
the promise; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `shrink_glob` (mkobj.js:1571) | C callee port (mkobj.c:1497–1669) | LIVE, exported async |
| `item_on_ice` | C staticfn port (:1442–1469) | LIVE, local |
| `check_glob` | C staticfn port (:3419–3443) | LIVE, local (async: `impossible` is async in JS) |
| `shrinking_glob_gone` | C staticfn port (:1672–1701) | LIVE, local |
| `eating_glob` (eat.js:1703) | C callee port (eat.c:2077–2081) | LIVE, exported sync |
| `pretty_base` globby arm | C objnam.c:775–781 arm | LIVE |
| `insane_object` | C callee, no JS port | named own row (not a stub in a live arm — diag-only tail) |

`sym.mjs shrink_glob` → `js/mkobj.js:1571 ASYNC`; `sym.mjs eating_glob` →
`js/eat.js:1703 sync`. No deleted export to re-point (thin version was file-local).

## C ↔ JS fidelity

`shrink_glob` vs C `:1497–1669` (173 lines), walked call-for-call: non-glob
`impossible` + return ✓ (`impossible(s,…args)` formats `%d/%s`, `display.js:7531`,
so the two-arg call renders correctly); `check_glob(obj,'shrink obj ')` ✓;
catch-up `delta=(moves-expire+24)/25`, `moddelta=25-(delta%25)` computed pre-ice-division
(JS `delta0` naming keeps exactly C's order) ✓, ice thirds `delta=(delta+2)/3` ✓,
gone (`owt=0` + destroy, no message) vs shrink (`owt-=delta`, `container_weight`,
reschedule `moddelta`) ✓; eat/buried/ice-`moves%3==1` skip + reschedule(0) ✓;
`partly_eaten_hack` Yname2 window (sync, no await inside — flag cannot leak) ✓;
`basewt`/`msgwt=(max(basewt,1)+1)/2`, pre-decrement `shrink` flag, `oeaten>1` decay,
`gone=!owt` ✓; invent / container-in-invent (`becomes/seems`, `slightly`, capacity
gate `near_capacity()!=oldcap`) / floor-`cansee` (`newsym`, `The→A` via return-value
`strsubst`, `fades away`) messages ✓; `update_inventory + encumber_msg` tail ✓.
No RNG in C body; none added (reschedule RNG stays in `start_glob_timeout`).
`item_on_ice` ≡ C `:1442–1469` (outermost-container walk + FLOOR/BURIED ice switch;
JS adds an `ocontainer`-null guard C lacks — safe superset on corrupt state only).
`shrinking_glob_gone` ≡ C `:1672–1701` arm-for-arm (INVENT unwear/stop/useupall;
MIGRATING clear; MINVENT wield clear; extract + floor unhide + obfree).
`eating_glob` ≡ C 5-liner (`occupation===eatfood && piece` identity) ✓.
Cal-lee closure: `is_ice`/`remove_worn_item`/`stop_occupation` all
`imports.mjs --can` ALREADY (no new edges at all — stronger than the D-log's SAFE);
`MON_WEP`/`setmnotwielded`/`simpleonames`/`strsubst`/`near_capacity`/`encumber_msg`/
`useupall`/`BURIED_TOO`/`container_weight`/`maybe_unhide_at`/`obfree` ride live edges.
Adaptations, all disclosed: `insane_object → impossible()` (C `insane_object` itself
ends in `impossible` with no state change — same observable class, diag detail named
own row); missing `quan`→1; `objs()?.… ?? 20` (headless guard, file idiom per `:261`;
`??` preserves a legitimate 0 through C's `max(…,1)` path).

## Hallucinations / overclaim

D-log "all `--can` SAFE (hoisted …)" — actually ALREADY, i.e. the claim understates
safety. Probe disclosures (13/13, unreached-ice/floor arms named as direct C mirrors
with no RNG) check out against the C text above. Verify bullet claims full
`sessions` 44/44 for the shared-file change — runbook-matrix-correct. No overclaim.

## Density

~230 js/ insertions for a 173-line C function + 3 staticfns + 2 cross-module arms:
one C locus family (§2b; ceiling 450 for >250-insert diffs not approached).

## Verification

- `imports.mjs --rulecheck` → Rule #2 clean (this review).
- Diff grep → 1 hit, commit-message prose ("FORCE" substring in message text), no code.
- Re-measured: `hidden-proxy verify shrink_glob --base f4c8bef2~1` → "0 at baseline,
  0 working" — row cited 0 blocks, vacuous note correctly labeled. No seed/step/
  coordinate reads in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
