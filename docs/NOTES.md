# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Leaderboard gap (primary this session):** local **27/44** vs judge
  **23/44** ([data.json](https://mazesofmenace.ai/leaderboard/data.json)
  `lastScored` ~2026-07-16T06:59Z). Exactly **14** cell misses:
  seed0002 **5**, seed0004 **2**, seed0012 **3**, seed0030 **4**.
  All four: **full RNG + full cursors** on judge.
- **Falsifier already run:** `ps_test_runner` PASS 100% on local
  `sessions/` **and** hub `https://mazesofmenace.ai/sessions/…`
  (Node 22+24). Hub SHA ≠ github template; screens visually equal.
  Hoimar/kevinjosethomas/serteal/xeophon PASS those four on judge.
- **Hypothesis left:** judge private corpus or verifier ≠ public
  `frozen/ps_test_runner` + hub `/sessions/` (issue #5 class). Cannot
  reproduce the 14 misses offline.
- **Don’t:** SO-wrap `{`/`\`` in serialize (C mixes encodings; `` ` ``
  is pool+ROCK); invent frame-align; re-check version-banner as sole
  cause (miss counts ≠ 8×chargen; seed0030 has 0 version screens).
- **Just fixed (D-0481):** `makemon` `!in_mklev` → `newsym` (water
  demon map `&` appeared). seed0006 Scr **106→110**/123.
- **Next gameplay:** seed0006 @110 disclose invent after possessions
  yn — C `Weapons` / `Gems/Stones` pages; JS jumps to attributes ynq.
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0006-wizard-water-demon.session.json
  ```
- **Parked:** D-0006; seed2200 @158 RC path (`/Users/davidbau/…` vs
  hardcoded `/home/nethack/…`).

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t SO-wrap `{` or `` ` `` without per-cell decgfx (D-0480 dead end).
- D-0471…D-0481 done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 RNG full; screens @110 disclose invent next.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
