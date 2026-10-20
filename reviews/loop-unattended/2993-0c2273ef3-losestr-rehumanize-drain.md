# Review 2993 — 0c2273ef3 — losestr drains losehp's rehumanize before its Upolyd reads

- SHA: `0c2273ef3` (cliff; board head mcast_weaken_you,
  scen-worldtour-Healer-50950064 s411; writer attrib.c losestr)
- D-entry: D-4153; Ledger: losestr ported
- `js/` diff: js/attrib.js +6 −1

## Intent vs deliverable

Promise: C losehp runs `rehumanize()` inline when a polymorphed hero's
`u.mh` drops below 1. losestr's `if (Upolyd)` max-HP arm and its
`(Upolyd || !waspolyd)` Str gate therefore see the natural form. JS
deferred the rehumanize and drained it only on the death path, so a
weaken spell that broke a polymorph cut the dead form's mhmax, took Str,
and let m_lined_up roll `Upolyd && rn2(25)`. Diff: one `await
finish_maybe_wail()` right after `losehp`. The promise matches the diff.

## Inventory

- `losestr` — attrib.js:376–430; C attrib.c:220–270.
- Callee `finish_maybe_wail` — hack.js:1970 (exported, LIVE): it runs
  finish_losehp_showdamage, then finish_losehp_rehumanize (hack.js:1951),
  then the deferred maybe_wail.
- Callers unchanged: mcast_weaken_you, poisoned / poison_strdmg.

## C ↔ JS fidelity

C losehp's Upolyd arm (hack.c:4266–4277 pinned) does `u.mh -= n;
showdamage(n);` and the mhmax raise. Then `if (u.mh < 1) rehumanize();
else if (… Unchanging) maybe_wail();` and returns. Its natural-form arm
does showdamage, then the `uhp < 1` done(DIED) or maybe_wail. Back in
losestr (:244–269) C does: losehp, then `if (Upolyd)`
setuhpmax(mhmax − dmg), else `if (!waspolyd)` the uhpmax cut, then
`num > 0 && (Upolyd || !waspolyd)` → adjattrib.

JS now runs the same sequence: losehp; showdamage, rehumanize and
maybe_wail drained in that order; the done/gameover drain, which only
fires on a fatal natural-form hit, where C never set the wail; then the
same arms. The order matches C call for call. losestr's own RNG,
`rn1(4, 3)` per point, is unchanged. Two more checks: `!knam` in JS
covers C's `!knam || !*knam`, because `''` is falsy, and
finish_losehp_rehumanize clears the pending done/wail flags when
rehumanize itself ends the game (Unchanging death), so no double done.

Citation drift: the comment and D-log cite hack.c `:4314–4315`. That is
the recorder tree (`nethack-c/recorder/src/hack.c`); pinned upstream has
the rehumanize at :4271–4272. The code is the same.

## Hallucinations / overclaim

None. The D-log's Next ("other losehp callers that read `Upolyd` right
after the call have the same exposure") is a lead, not a claim, and the
review does not queue it, because no session is named.

## Density

A one-call fix on the head's writer, with a second session (sweep-Knight)
healed by the same cause.

## Verification

```text
verify mcast_weaken_you,losestr --base 0c2273ef3~1 --no-reach
  mcast_weaken_you: 1 PASS (scen-worldtour-Healer-50950064) → PROGRESS
  losestr: 0 blocked (vacuous; owner is mcast_weaken_you)
```

This reproduces the claim. scen-sweep-Knight-50156023 (owner
do_statusline2) is re-checked by the full rescore.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
