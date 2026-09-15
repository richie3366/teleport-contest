# Review 1272 — 29aedc7f — cmd.c `-`→fight binding in rhack dispatch (D-2306)

Metadata: SHA `29aedc7f`, D-2306, corpus-backed fix (session named, ownerless step). Method: `git show` stat + full `js/cmd.js` diff; C `cmd.c:1621–1634` (`do_fight`) + `:2750–2785` (`commands_init`) read directly; `csym.mjs do_fight --callers` / `bind_key` body; grep of all `'F'` sites in `js/cmd.js`; `sym.mjs do_fight`; direct replay of the cited session re-run by this review; `hidden-proxy verify rhack --base 29aedc7f~1`; added-lines-only banned-pattern grep.

## Intent vs deliverable

Subject promises: `-` shares the `F` fight arm at every key-inspecting site because C binds `-` to the fight command.
Diff actually changes (`git show 29aedc7f -- js/cmd.js`, 6 lines across 5 sites + repeat maps): `rhack_repeat_command`/`rhack_repeat_txt` map `-`→`do_fight`/`fight`; the forcefight follow-up, rush-prefix, and `menu_requested`-preserve guards exempt `-` like `F`; the main arm becomes `ch === 'F' || ch === '-'`. Promise kept.

## Inventory

- `rhack` `-` handling (js/cmd.js) — no new function; `do_fight` (cmd.js:300, same-module ASYNC, awaited) reused.

## C ↔ JS fidelity

C locus confirmed in pinned source. `do_fight` (`cmd.c:1621–1634`) sets `forcefight` / cancels on double prefix — no output, no RNG, matching the recorded C behavior (empty topline, matched RNG):

```c
int
do_fight(void)
{
    if (svc.context.forcefight) {
        Norep("Double fight prefix, canceled.");
        svc.context.forcefight = 0;
        gd.domove_attempting = 0;
        return ECMD_CANCEL;
    }

    svc.context.forcefight = 1;
    gd.domove_attempting |= DOMOVE_WALK;
    return ECMD_OK;
}
```

And the binding sits in the unconditional section of `commands_init` (`:2761–2772`, straight-line sequence, no runtime guard despite the `/* number_pad */` comment label):

```c
    (void) bind_key('5',    "run", FALSE);
    (void) bind_key(M('5'), "rush", FALSE);
    (void) bind_key('-',    "fight", FALSE);
``` `commands_init` (`:2750–2785`) runs unconditionally and its `/* number_pad */` section is a comment label, not a runtime guard — the straight-line `bind_key` sequence including `(void) bind_key('-', "fight", FALSE)` (`:2772`) executes on every boot, so the D-log/CURRENT "unconditional" claim holds. `F` itself comes from the extcmd table default key; both keys resolve to the same fight command before any prefix logic, so C treats `-` ≡ `F` at every downstream site — the JS approach of exempting `-` alongside `F` at each key-inspecting site is the faithful equivalent. Completeness checked: every `'F'` key site in `js/cmd.js` now carries `-` (repeat 2304-2305, forcefight guard 2527, rush guard 2553, menu gate 2588, main arm 2679; only a doc comment at 297 remains). The double-prefix consequence also holds: F-then-`-` reaches `do_fight`'s "Double fight prefix, canceled." exactly as C. `!`→doshell and other layouts stay named omits — correctly, separate rows.

## Hallucinations / overclaim

None. The D-log does not dress the vacuous `verify --fn rhack` (rhack is not a C owner; 0 blocked both sides) as a PASS — it names the direct replay as the proof. Sibling `!` sessions honestly reported unmoved and out of scope.

Shared-arm consequences verified in JS rather than assumed from the message: `prefix_seen = ext_func_tab_from_txt('fight')` + `key = 0` + `continue` (`js/cmd.js:2688–2690`) sit inside the shared arm, so `-` records the fight prefix exactly like `F` (F-then-`-` therefore reaches `do_fight`'s double-prefix cancel, and the forcefight/rush/menu guards treat the pending prefix identically). Ctrl-A repeat parity holds through `cmdq_add_ec(CQ_REPEAT, …)` (`:2599–2605`), which now resolves `-` via both repeat maps. User-BIND precedence holds: `rhack_user_overlay_key` (`:2598`) gates before dispatch, so a BIND= overlay on `-` still wins — same as `F`. Before-state follows from the diff itself: every `-` mention is a `+` line, so the parent tree fell through to the Unknown-command tail, matching the recorded JS topline byte-for-byte.

## Density

Six lines for a one-binding omission with a corpus witness. OK.

## Verification

Re-measured by this review (strongest claim in this batch — a real corpus move, independently confirmed):

```text
PASS: random-seed0015-valk-level2-pit-dog-wait-eb7e90ad.session.json
(RNG 8547/8547, Screen 72/72) — 1/1 passing
```

at HEAD (commit `ef75880a`), matching the claimed after-state (70/72 → 72/72; the before-state follows from the diff itself — no `-` arm existed, so `-` fell to the Unknown-command tail). `verify rhack --base 29aedc7f~1` → 0 blocked both sides, as disclosed. Added-lines-only grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward` reads. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
