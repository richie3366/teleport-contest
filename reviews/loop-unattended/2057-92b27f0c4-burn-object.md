# Review 2057 — 92b27f0c4 — burn_object whole-body restart (D-3097)

Metadata: SHA `92b27f0c4`, D-3097, single-function coverage cluster
(C 209 code L). js/timeout.js (+281/−~100), js/objnam.js doc touch.

## Intent vs deliverable

Promise: restart burn_object in C order — need_invupdate arms +
update_inventory tail, impossible default, extract+obfree at the
three deletion sites, live Yname2 import (clone deleted), Shk_Your
one-liner over live shk_your, live Hallucination() test,
The/delobj imports removed. Diff delivers all of that. Promise kept.

## Inventory

- `burn_object` (restarted js/timeout.js:1939): away catch-up,
  POT_OIL / lamp / candle-menorah switch nests, impossible
  default, newsym + update_inventory tail. Callees: end_burn /
  begin_burn / get_obj_location / Is_candle / carried /
  lantern_message / see_lamp_flicker file-local ✓; weight /
  obj_extract_self mkobj.js ✓; obfree shk.js:4090 sync LIVE (no
  RNG in body — verified) ✓; maybe_unhide_at async, awaited at
  both sites ✓; pline/You_see/impossible/Hallucination/Blind
  display.js ✓; useupall/update_inventory sync, called sync ✓;
  Yname2/shk_your/xname/an objnam.js ✓; m_at mon.js ✓; cansee
  vision.js ✓.
- Deleted: local `Yname2` clone → live import (all 4 use sites
  incl. see_lamp_flicker :1890 resolve to the import — no shadow
  remains ✓). Rewritten: local `Shk_Your` → `upstart(shk_your(obj))`
  one-liner. Removed imports The/delobj — zero remaining uses ✓.

## C ↔ JS fidelity

C timeout.c:1382–1680 (csym range; no in-repo caller — timer
callback via table; JS dispatcher mkobj.js:1818 unchanged).
Arm-by-arm against the full C text (all three switch nests read):

- Away `:1394–1416`: how_long/age-0/end_burn/menorah-spe+weight/
  candle-oil extract+obfree+null+maybe_unhide, else age-= + begin_burn
  ✓ (incl. the `begin_burn` else — verified in file).
- get_obj_location/canseeit/whose/bytouch/flags ✓. JS always
  computes whose where C leaves it unset on loc-fail — unread
  there (messages need canseeit|bytouch, both false) ✓ harmless.
- POT_OIL: INVENT flag + FALLTHRU, messages (`%spotion of oil has
  burnt away.` / `a burning potion of oil go out.`) ✓; end_burn;
  carried→useupall else migrating-clear + extract + obfree ✓.
- Lamps: 150/100/50 (lantern vs flicker + ' considerably' at 50)
  ✓; 25 ✓; 0 with INVENT flag + FALLTHRU + end_burn ✓; default
  comment ✓; `if (age) begin_burn` without null check — matches C
  (obj never nulled in lamp arms) ✓.
- Candles 75/15: all four message templates verified arg-for-arg
  incl. the FLOOR 15 fixed `flicker low!` (no 5th arg) ✓.
- Candle-0: menorah flag + messages ✓; non-menorah flagless
  FALLTHRU with C's useupall→freeinv comment ✓; `%s%s consumed!`
  + need_newsym ✓; post-message Hallucination/Blind/plain arms ✓;
  end_burn; menorah spe/owt/carried-flag ✓; carried→useupall else
  onfloor + migrating-clear + extract + maybe_unhide + obfree ✓.
- default: `impossible('burn_object: unexpected obj %s',
  xname(obj))` ≡ C (JS impossible does %s substitution — verified)
  ✓. Tail newsym + update_inventory ✓.
- RNG: no direct draws either side; the restart REMOVES the old
  delobj→obj_resists spurious draw (mkobj.js:4018 gate; obfree
  body RNG-free) — C-faithful direction ✓.
- Retained guards (both verbatim in the parent — not introduced):
  `if (msg)` around pline('') (vpline('') early-returns after an
  idempotent a11y reset; C-side equivalent no-op) and `&& loc`
  on the tail newsym (need_newsym implies canseeit implies loc —
  both set-sites require it; the guard can never fire) ✓.

Shk_Your one-liner: C shk.c:5876–5882 = shk_your + highc(*buf);
JS = upstart(shk_your(obj)) with upstart ≡ highc-first (incl.
empty passthrough) ✓. The old clone's MINVENT possessive gap is
retired (live shk_your does s_suffix) ✓.

`sym.mjs` output (Method §3 — deleted Yname2 clone → import):

```text
obfree           js/shk.js:4090   sync
Yname2           js/objnam.js:2813   sync (do/music clones: pre-existing)
shk_your         js/objnam.js:2765   sync
useupall / update_inventory  sync; maybe_unhide_at ASYNC (awaited)
end_burn / begin_burn / get_obj_location  file-local sync
```

`imports.mjs --can timeout→shk obfree` → ALREADY (edge
pre-exists; the D-log's "new edge / SAFE" was overcautious but
harmless).

## Hallucinations / overclaim

None. "Whole body, every callee live" verified arm-for-arm. The
two retained guards are disclosed with sound justification.

## Density

Single-function cluster, C 209 code L, ~200 js insertions ✓ (no
same-file Open row; minion.c monster_census stale-ported alongside
is the allowed ≤3-call detour, not a second cluster member).
`Ledger:` ported ✓. SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify burn_object --base
  92b27f0c4~1 --reach-all`: `0 blocked (0/0)` + `smoke 24/24, 0
  regressed → REACH-OK`. Matches; honestly vacuous.
- Ban-grep: 0. Rule #2 clean. (D-log's forced 44/44 noted; the
  audit's own full rescore re-covers this at iteration end.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
