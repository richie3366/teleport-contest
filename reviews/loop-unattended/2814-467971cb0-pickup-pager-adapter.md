# Review 2814 — 467971cb0 — floor pickup restarted over the ported pager

- **SHA:** `467971cb0` (Thu 2026-10-15) — cliffs-head writer (D-3968).
- **D-entry:** D-3968. **Ledger:** `pickup` split + `query_objlist` ported (digit-flow omit closed).
- **Diff size:** `js/pickup.js` −124/+52 net (clone deleted, adapter + 3 call sites); +1 test.
- **Method:** cliff (1 restart) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: questtour-Barbarian-50361008 s518 diverges
because the 18-object floor pile paginates in C («(1 of 2)») while the
`query_objlist_pickup` clone painted all entries and dropped the Tools
page. Geom-probe proved C's page 2 (wand + Tools + whistle, restarted
accelerators) and a JS probe proved the whistle is correctly on the
floor — the menu list, not state, was the writer. The fix restarts the
clone as a thin qflags adapter over the ported `query_objlist` →
ported tty pager, with `{n, pick_list}` counts flowing to
`pickup_object` at all three call sites. 1 moved (518→609).

The diff is exactly the deletion + adapter + 3 call-site rewires.
Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | adapter: `BY_NEXTHERE \| AUTOSELECT? \| INVORDER? \| FEEL_COCK?` → `query_objlist(prompt, objList, qflags, how, allow)` | pickup.c :741–759 (BY_NEXTHERE; traverse_how assembly), :774–776 (FEEL only on PICK_ANY), :828–835 (via_menu: INVORDER iff selective, no AUTOSELECT/FEEL) | C-exact per arm |
| 2 | count-N site: `pickup_object(pick_list[0].obj, count)` | :761–772 (PICK_ONE keeps traverse_how; force every count to N) — n≤1 so [0]-only ≡ C's loop | C-exact |
| 3 | menu + traditional sites: `pickup_object(obj, pi.count)`, `n_tried = qr.n`, break on `res < 0` | menu_pickup :779–795 | C-exact |
| 4 | ledger: digit-flow omit closed; `query_objlist` note kept | — | accurate (see Fidelity) |
| 5 | `query-objlist-pickup-pager.test.mjs` (3/3) | 50361008 s518 pile | test-only |

Callee closure (all LIVE, verified): `query_objlist`
js/pickup.js:783 ASYNC ✓ (full :1024–1216 port: AUTOSELECT arms,
SIGNAL_NOMENU, :1189–1190 count fixup in `finish_picks` —
re-read); `select_menu_pick_any` js/options.js:10226 ASYNC ✓
(count −1 init, pending-digit, ESC-during-count — re-read);
`allow_all` js/pickup.js:287 sync ✓. `sym.mjs query_objlist_pickup`
reports the adapter as a local same-name function — a delegating
adapter, not clone drift. No STUB in any arm. Diff grep: no banned
patterns. Rule #2 clean (2808).

## C ↔ JS fidelity

**Flag assembly (confirmed arm by arm).** C :743
(`traverse_how = BY_NEXTHERE`), :757–759 (`|= AUTOSELECT_SINGLE |
(sortpack ? INVORDER_SORT : 0)`), :769 (`PICK_ONE` keeps traverse_how
— AUTOSELECT applies ✓), :774–776 (PICK_ANY adds FEEL_COCKATRICE),
:828–835 (via_menu: INVORDER iff selective, no other augmentation,
`allow_all` iff via_menu == −2) — the adapter's four lines plus the
three call sites' opts (`autoselect: true` on menu/count-N only;
`sortpack: !!one_at_a_time, feel_cockatrice: false` on via_menu;
`extraAllow \|\| allow_all`) reproduce every arm exactly ✓.

**Counts genuinely flow (not just plumbing).** The pager produces
real digit counts (count −1 init per wintty.c:2611 + pending-digit
:1332–1345), `finish_picks` applies the :1189–1190 fixup
(`null/−1/>quan → quan`), and `pickup_object` splits partial piles
(`splitobj` when `0 < count < quan`) — so "digit-count menu picks
take partial piles" is true end to end. With no digits typed,
`!count → quan` in `pickup_object` makes new (quan) ≡ old (0) ✓ —
behavior-preserving where C is silent.

**Old named omits (all covered or inherited).** INCLUDE_VENOM live in
generic (:471) ✓, SKIPINVERT (:573) ✓, BUCX canonical tally (D-2388)
✓, page invert/search in the ported pager ✓ (pagination + restarted
accelerators proven by the moved session), doloot Blind feel
doloot-scoped (untouched path) ✓. The inherited engulfer
mon_to_glyph omit (:1157–1158, Hallu display-RNG) is named with its
no-floor-evidence scope ✓. One nit (not a C-wrong, not queueable): the
ledger note still "keeps omit select_menu digit-count entry" while the
pager now implements digit entry — possibly stale text; a future port
iter may fold one `ledger.mjs set` into real work.

## Hallucinations / overclaim

None. The two-probe diagnosis (geom-probe for C's page 2, state probe
for the whistle) is measurement-grade, and "the floor menu list, not
state, was the writer" is exactly what the fix ports.

## Density

One writer, whole (all 3 call sites take the C contract — a partial
rewire would have left mixed `{n, pick_list}`/array shapes), restart
over patching per the playbook, Ledger re-tagged. No bundled work.
The old clone's 124 deleted lines leave no orphaned imports (same-file
helpers stay for the generic path).

## Verification

Re-measured myself (`verify do_statusline2 --base 467971cb0~1
--reach-all`) on HEAD code:

```
verify do_statusline2: 0 PASS, 2 moved past, 14 unchanged, 0 worse → PROGRESS
smoke do_statusline2: fixed smoke spread (24 run, 19.3s): 24 PASS, 0 regressed → REACH-OK
```

vs the claimed 0/1/15. The committed board *at* `467971cb0` shows
questtour-Barbarian already at xname_flags@609 (the claimed move,
exact) with shop-Monk still @384 — the 2nd move is D-3969, reviewed
next. This SHA's deliverable verifies exactly; 0 worse.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
