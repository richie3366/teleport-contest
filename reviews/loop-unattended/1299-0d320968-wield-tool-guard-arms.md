# Review 1299 — 0d320968 — wield.c wield_tool guard arms (D-2333)

Metadata: SHA `0d320968`, D-2333, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/wield.js` +39/−8); C `wield_tool wield.c:682-758` full body + C `cantwield mondata.h:123` (macro) + JS `strstri hacklib.js:261` body (via `csym.mjs`); `sym.mjs` on `yname`/`strstri`/`nohands`/`verysmall`/`bimanual`/`cantwield`; `imports.mjs --can` (strstri edge — ALREADY) + `--rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify wield_tool --base 0d320968~1` re-run.

## Intent vs deliverable

Subject promises the four deferred `wield_tool` guard arms (worn-armor yname/them-it, verbose welded, cantwield, shield+bimanual) with `what`/`more_than_1` hoisted in C order. Diff delivers all four in C position; quiver/swap/will_weld→ready_weapon/pushweapon/untwoweapon/unweapon tail untouched. Promise kept exactly.

## Inventory

- `what = xname(obj)` + `more_than_1` (quan>1 / "pair of " / "s of ") hoisted before guards, C `:689-692` order.
- Armor arm: `yname` + them/it (`:694-698`); welded arm: verbose branch under `verbose !== false` with `body_part_latebound(HAND)` + bimanual plural + pair-of reset + those/that (`:699-717`), else quiet can't; `cantwield` gate (`:718-721`); shield+bimanual with weapon/tool noun (`:722-727`).
- Imports: `yname`/`nohands`/`verysmall` join existing edges (ALREADY); `strstri` joins the existing hacklib.js edge (ALREADY — not a new edge despite the message's "newly" wording).

## C ↔ JS fidelity

Branch-by-branch confirm against `:682-758`: already-wielded early TRUE ✓; `!verb → 'wield'` ✓; armor `You_cant("%s %s while wearing %s.")` template text-identical via pline ✓; welded verbose template (`welded to your %s, you cannot %s %s %s`, hand pluralized off `u.uwep` bimanual, pair-of reset off `what`) ✓ with the file's `body_part_latebound` standing in for C `body_part(HAND)` (established weldmsg convention); quiet `You_cant("do that.")` under verbose-off ✓; `cantwield` local is char-for-char the C macro (`nohands || verysmall`, `mondata.h:123`) — CLONE-verified; shield arm noun select (`oclass === WEAPON_CLASS ? 'weapon' : 'tool'`) ✓.

`strstri(...) != null` ≡ C `!= 0`: JS `strstri` returns tail-string-or-null (`hacklib.js:261`), so the null check is the exact C predicate, not a truthiness shortcut ✓. `You_cant`/`You` render via `pline` text-identical (no JS `You` export; zap.js precedent cited, no new clone written) ✓.

Cited C arms (`wield.c:682-758`, via `csym.mjs wield_tool`):

```c
what = xname(obj);
more_than_1 = (obj->quan > 1L || strstri(what, "pair of ") != 0
               || strstri(what, "s of ") != 0);
if (obj->owornmask & (W_ARMOR | W_ACCESSORY)) {
    You_cant("%s %s while wearing %s.", verb, yname(obj),
             more_than_1 ? "them" : "it");
    return FALSE;
}
if (uwep && welded(uwep)) {
    if (flags.verbose) {
        const char *hand = body_part(HAND);
        if (bimanual(uwep)) hand = makeplural(hand);
        if (strstri(what, "pair of ") != 0) more_than_1 = FALSE;
        pline("Since your weapon is welded to your %s, you cannot %s %s %s.",
              hand, verb, more_than_1 ? "those" : "that", xname(obj));
    } else { You_cant("do that."); }
    return FALSE;
}
if (cantwield(gy.youmonst.data)) {           /* mondata.h:123 macro */
    You_cant("hold %s strongly enough.", more_than_1 ? "them" : "it");
    return FALSE;
}
if (uarms && bimanual(obj)) {                /* check shield */
    You("cannot %s a two-handed %s while wearing a shield.", verb,
        (obj->oclass == WEAPON_CLASS) ? "weapon" : "tool");
    return FALSE;
}
```

JS mirrors every line: `!verb → 'wield'` default ✓; `what`/`more_than_1` hoisted before the guards in C order ✓; armor arm uses `yname` (first use in this function — the old `xname`+`"it"` was the C-wrong) ✓; welded arm keys off `u.uwep && welded(u.uwep)` with the house `verbose !== false` default-on idiom ✓; `bimanual` is the file-local `wield.js:1024` (pre-existing, 9 unrelated clones elsewhere untouched) ✓; `body_part_latebound(HAND)` is the file's weldmsg convention for C `body_part(HAND)` (probe anecdote confirms the polyform-aware path prints C's "hand" once the fixture sets M1_HUMANOID) ✓; shield arm noun select ✓. Quiver/swap/will_weld→ready_weapon/pushweapon/untwoweapon/unweapon tail byte-identical to parent (diff shows no hunks there) ✓.

One note (not a C-wrong): the local `cantwield` is clone #4 (`sym.mjs`: eat/polyself/uhitm/wield, none exported). It matches the 1-line C macro exactly and follows three sibling precedents; a shared home would be nicer but nothing contradicts C. Not queueable.

## Hallucinations / overclaim

None. "ALREADY ×3" checks out (all three names join existing static imports; `--can` confirms the hacklib edge pre-existed). "No site" claims N/A. The probe anecdote (M1_HUMANOID fixture fault) is disclosed as fixture, not code — honest.

## Density

+39/−8, one C function, one falsifier. Good.

## Verification

D-log tail PASS (`--fn dorub` and `--fn wield_tool`: syntax/rule2/green 2/2/strict ×2/cohort 7/7, final verifies after last `js/` edit). Re-measured:

```text
verify wield_tool: baseline 0d320968~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
