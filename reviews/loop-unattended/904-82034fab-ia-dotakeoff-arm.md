# Review 904 — 82034fab — ia_dotakeoff takeoff one-at-a-time arm (D-1934)

Metadata: SHA `82034fab`, D-1934. Files: `js/do_wear.js`
(+20: `ia_dotakeoff`), `js/iactions.js` (+5/−2:
`IA_TAKEOFF_OBJ` rewired to `alttakeoff`). Map-driven Open
row, 0 corpus blocks cited. Next index 904.

Intent vs deliverable: subject promises the item-action
`T` arm (flag-set wrapper + canned `alttakeoff` wiring).
The diff delivers exactly that; nothing else. Promise ≡
diff.

Inventory: one new export `ia_dotakeoff` →
`do_wear.js:1277` ASYNC (`sym.mjs`: single definition, no
collision). No new cross-module edge (same-module dynamic
import, mirroring the dip arm). No stub, no new omit.

**C ↔ JS fidelity** (`do_wear.c:1858–1870` via csym):
flag TRUE → `dotakeoff()` → flag FALSE → return res —
JS keeps C order with the reset in `finally`, the
async-faithful form of C's always-reset sequence
(strictly more robust on throw paths; identical on all
C-reachable paths). The flag's full causal chain is live:
`:1849` prompt-forcing gate (`do_wear.js:1261`, shipped
D-1927) and `:3439–3443` covered-armor SUGGEST gate
(`do_wear.js:1883` `removing &&
!item_action_in_progress → EXCLUDE_INACCESS`, else
falls to SUGGEST — verified against C `:3439–3445`
verbatim). Wiring: `iactions.c:230–232`
`cmdq_add_ec(CQ_CANNED, ia_dotakeoff)` + invlet key
becomes `cmdq_add_ec_entry('alttakeoff', ia_dotakeoff)` +
`cmdq_add_key(invlet)` — mirror-exact with the
`IA_DIP_OBJ`/`altdip` arm two cases above, and
`'alttakeoff'` is the `cmd.c:2064` INTERNALCMD name, so
the txt entry resolves like C's fn→`ext_func_tab`
lookup. C's own comment above `ia_dotakeoff` names the
suit-under-cloak scenario the D-log claims. No RNG
either side. Named: none new — correct; uskin stays
named at doremring.

Hallucinations / overclaim: none.

Density: 25 lines completing a two-commit chain (D-1927
gate + D-1934 setter) — minimal per §2b.

Verification: re-measured `hidden-proxy verify ia_dotakeoff
--base 82034fab~1` → `0 session(s) blocked on it (0 at
baseline, 0 in the working scoreboard)` — vacuous as
stated, nothing owed. Rule #2 clean. D-log gates:
preflight green 2/2 + strict before, post-change green
2/2 + strict ×2, cohort 7/7; full skipped (no new edge)
— legitimate. Added/removed lines grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
