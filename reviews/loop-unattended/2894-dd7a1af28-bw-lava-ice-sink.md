# Review 2894 — dd7a1af28 — BW lava/ice/sink inverse chain

- SHA: `dd7a1af28` (cliff, writer port: 1 flag chain at the paint choke)
- D-entry: D-4053; Ledger: display.c (`show_glyph split`,
  D-4053 appended)
- `js/` diff: `js/display.js` (helper + 1 call-site line + doc
  refresh); new `scripts/bw-lava-ice-sink-inverse.test.mjs` (2 its)

## Intent vs deliverable

Promise (subject + D-log): port the BW chain as
`lava_ice_sink_map_attr` beside the D-3674 ENGR twin, OR-ed at
the paint choke; probe Samurai-50455026 s270→FULL PASS. Delivers
exactly that: same-module helper, no new imports, doc note
updated where the old Named omission lived. Promise = diff.

## Inventory

- `lava_ice_sink_map_attr(gid)` — display.js:560.
  C: display.c:2884–2917 + wintty.c
  (win/tty/wintty.c):3930–3936.
- Call site: `attr |= lava_ice_sink_map_attr(gid)` in
  `show_glyph_cell` (display.js:5257).

## C ↔ JS fidelity

C (display.c:2884–2917, line-numbered read — verified verbatim):

```c
} else if ((offset = (glyph - GLYPH_CMAP_B_OFF)) >= 0) {  /* :2884 */
    int cmap = S_grave + offset;                          /* :2885 */
    int sym = gs.showsyms[cmap + SYM_OFF_P];              /* :2886 */
    ...
    if (!iflags.use_color) {                              /* :2890 */
        unsigned spec_cmap = 0;
        switch (cmap) {                                   /* :2897 */
        case S_lava:                                      /* :2898 */
        case S_lavawall:                                  /* :2899 */
            if (sym == gs.showsyms[S_pool + SYM_OFF_P]
                || sym == gs.showsyms[S_water + SYM_OFF_P])
                spec_cmap = MG_BW_LAVA;                   /* :2902 */
            break;
        case S_ice:                                       /* :2904 */
            if (sym == gs.showsyms[S_room + SYM_OFF_P]
                || sym == gs.showsyms[S_darkroom + SYM_OFF_P])
                spec_cmap = MG_BW_ICE;                    /* :2907 */
            break;
        case S_sink:                                      /* :2909 */
            if (sym == gs.showsyms[S_fountain + SYM_OFF_P])
                spec_cmap = MG_BW_SINK;                   /* :2911 */
            break;
        }
        gmap->glyphflags |= spec_cmap;                    /* :2914 */
    } else if (has_rogue_color) {                         /* :2915 */
        color = cmap_to_roguecolor(cmap);                 /* :2916 */
    }
}
```

JS matches arm-for-arm: :2886 own-sym read (lavawall reads its
own slot) → `live_showsyms(cmap + SYM_OFF_P)`; :2890 gate →
`wc_color !== false` (use_color ≡ wc_color, flag.h:507 verified;
house shape shared with the ENGR twin); lava/lavawall vs
pool/water; ice vs room/darkroom; sink vs fountain. The
:2915–2917 `has_rogue_color` else-arm is named in the D-entry and
jsdoc — true omission, contest-tty-inactive per the twin
precedent.
Constant check: all 9 cmap ids verified against defsym.h PCHAR
indices (room 19, darkroom 20, sink 36, fountain 37, pool 38, ice
39, lava 40, lavawall 41, water 48) — JS matches C exactly;
primary sink+fountain both `{` (defsym.h:133–134) as claimed.
Inverse gate: wintty.c:3930–3936 (`special & (MG_DETECT |
MG_BW_LAVA | MG_BW_ICE | MG_BW_SINK | MG_BW_ENGR)` + `use_inverse`
→ ATR_INVERSE) → JS `use_inverse_opt() ? ATR_INVERSE : 0`.
The per-paint-derivation equivalence argument (C re-stamps on
every color/symset mutation path; JS derives from live state) is
the established D-3674 twin shape, and the probe's exact
one-cell symptom (SGR `[7m{` vs plain `{` at row 13 col 60) is
healed behaviorally. No RNG in the C span; none added.
`reset_glyphmap`'s call sites need no wiring (fortress-guard
by-design ledger) — correct, derivation is at the choke.
Nit: the ledger note still reads "audited D-3403: whole vs C"
for `show_glyph` while a (named, tty-inactive) else-arm stays
out — pre-existing note, D-4053 appended to history without
refreshing it. Prose only.

## Hallucinations / overclaim

None. The D-log states the verify is vacuous for `show_glyph`
and puts movement on the `score --ids` rescore (D-3674/D-4015
precedent) — honest framing, and my re-run below confirms the
rescore claim. The D-3674 falsifier-firing narrative checks out
(the old doc omission is the one this commit deletes).

## Density

Cliff writer with movement: first live row past 10 re-verified
parks + 1 stale, shipped whole (all three firing-capable arms
live; the inactive ROGUESET arm named). One `Ledger:` entry
(`show_glyph split`, D-4053 appended). No unreached work.

## Verification

- `verify show_glyph --base dd7a1af28~1 --no-reach` → vacuous
  (0 blocked), as the D-log states.
- Rescore: `show scen-symset-Samurai-50455026` at HEAD → PASS,
  14163/14163 RNG, 901/901 screens — the claimed FULL PASS,
  exact counts. Healer-50055044 also PASS (stale recorded).
- No new module edge. No FORCE/DIAG/seed strings. Rule #2 clean
  (window rulecheck). Sibling suites claimed green (engrcorr 2/2,
  showsyms 8/8, description 8/8).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
