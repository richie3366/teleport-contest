# Review 1089 — d43bbc14 — canwearobj polyform/weld/trap gates (D-2123)

Metadata: SHA `d43bbc14`, `js/do_wear.js` +133/−17, `js/worn.js` +4/−3
(137 insertions). Queue row `invent.c` getobj, scen-poly-Wizard-92169 step
61/280: C «What do you want to wear? [*]» vs JS «What do you want to wear?
[q or ?*]». No prior review claimed closed.

## Intent vs deliverable

Subject promises: "poly-unwearable armor DOWNPLAY makes wear prompt `[*]`"
via polyform/weld/trap gates in `canwearobj`. Diff actually adds: (1)
`cantweararm` export in `worn.js` (import-the-export, `breakarm`/`sliparm`
stay private); (2) full C-order gate ports in noisy `canwearobj`; (3) the
same gates in `canwearobj_silent` (equip_ok DOWNPLAY path); (4) same-edge
import extensions only (`worn.js`, `wield.js`, `monsters.js`, `const.js` —
no new module edge). Promise matches diff; no scope creep, no drive-by.

## Inventory

New/changed JS: `cantweararm` (worn.js, export keyword only),
`canwearobj` noisy gates, `canwearobj_silent` gates. Callee closure:

| Symbol | Status | Evidence |
|---|---|---|
| `cantweararm` | LIVE (`worn.js:160` sync) | `sym.mjs` sync; body `breakarm \|\| sliparm` untouched |
| `bimanual` | LIVE (`wield.js:951` sync) | diff imports the export — correctly not a 10th clone |
| `racial_exception` | LIVE (`worn.js:675` sync) | pre-existing import extended |
| `WrappingAllowed` | LIVE (`worn.js:177` sync) | same |
| `is_flimsy` | LIVE (`worn.js:142` sync) | same |
| `has_horns` / `num_horns` | LIVE (`worn.js:187/195` sync) | same |
| `slithy` | LIVE (`monsters.js:511` sync) | diff imports from monsters, not the worn.js:155 clone |
| `Upolyd` / `TT_LAVA` / `TT_BURIEDBALL` / `MZ_SMALL` | LIVE consts | same-edge const import |

`hero_glib` / `already_wearing` local clones in do_wear.js are
pre-existing, untouched by this diff. No STUB in a live arm, no new cycle
(`imports.mjs --rulecheck` clean tree-wide).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/do_wear.c:2029-2206` (`csym.mjs
canwearobj`, 178 lines). Branch-by-branch confirm against the C text:

1. verysmall/nohands `:2036-2042` — C `if (verysmall(...) ||
   nohands(...)) { noisy → You("can't wear any armor..."); return 0; }`.
   JS verbatim, message included.
2. cantweararm `:2043-2057` — C computes `which` from `is_cloak /
   is_shirt / is_suit` (else 0), then `which && cantweararm(...) &&
   (which != c_cloak || (otyp != MUMMY_WRAPPING ? msize != MZ_SMALL :
   !WrappingAllowed)) && racial_exception(...) < 1`. JS uses string
   tags ('cloak'/'shirt'/'suit'/null) for the C constants — equivalent,
   categories exclusive in practice — and reproduces the ternary
   exactly. C `else if (owornmask & W_ARMOR)` becomes a second `if`
   after an early `return 0`: control-flow equivalent.
3. Worn mask — C `already_wearing(c_that_)`; JS now calls the same
   `already_wearing('that')` helper (behavior change from the old
   inline pline, aligning toward C).
4. Welded-bimanual suit/shirt `:2065-2072` — C noun `is_sword ?
   c_sword : c_weapon`; JS `sword/weapon` identical.
5. Helm `:2074-2084` — `Upolyd && has_horns && !is_flimsy`, horn
   plural via `num_horns`; JS matches including the flimsy exception.
   Helm-occupied keeps the pre-existing generic message (C
   `an(helm_simple_name)`) — pre-existing gap, D-log-named, untouched
   by this diff.
6. Shield `:2085-2103` — bimanual with the BATTLE_AXE→axe noun arm +
   twoweap; JS matches all three branches.
7. Boots `:2104-2134` — slithy ("no feet..."), centaur (hardcoded
   "boots", C `c_boots` — identical text), 4-trap utrap gate; JS
   matches. Message approximations only: infloor/lava drops C's
   `surface()` terrain name, buried-ball uses FOOT (C LEG).
8. Gloves `:2135-2153` — welded, then Glib with
   `fingers_or_gloves(false)`; JS matches, hardcoding
   `gloves_simple_name` as "gloves" (display-only).
9. Shirt/cloak/suit occupancy + `silly_thing` tail — pre-existing,
   unchanged.

No RNG in C, none added. Wiring verified by read: `equip_ok`
(do_wear.js:2058) calls `canwearobj_silent` → DOWNPLAY, which is exactly
the `[*]` mechanism (empty `buf` → ` [*]` at `invent.c:1914-1919`).
Silent twin mirrors every gate return-for-return with no messages, so
all message approximations are noisy-only and functionally exact.

## Hallucinations / overclaim

None. "Full C-order ports" is accurate per the branch walk above;
"Named: none new" is accurate (approximations are message text, listed
in the entry, not new omits). No dispatch-vs-stub mismatch: every callee
in both live arms is LIVE.

## Density

137 js insertions, one C function family, code + map + verify in one
handoff. Inside the §2b 80–400 band. Right-sized.

## Verification

D-log Verify bullet: `verify.mjs --fn getobj` → PASS syntax + PASS
rule2 + hidden PROGRESS + green 2/2 + strict ×2 + cohort 7/7 (full
skipped, no shared file changed). Re-measured myself:
`hidden-proxy.mjs verify getobj --base d43bbc14~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Wizard-92169 moved 61 → `collect_coords`@164). Scoreboard diff
corroborates independently (owner getobj@61 → collect_coords@164, rngM
3123→6234, kind screen→rng). Grep: no FORCE/DIAG/seed/fastforward/
hardcoded coordinates. Queue row archived with D-2123 stamp; map
retires the named omit.

## Actionable C-wrongs

None. Message-text approximations are display-only debt, already named
in D-2123; functional returns exact in both variants.

Verdict: **ACCEPT**
