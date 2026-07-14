# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **21/44** PASS (#360 suite); Scr **3424**/11405; RNG
  **240657**/792838; speed `18+0.12/turn`.
- **Current unit:** seed0013-restore Scr **68**/99 RNG **4804**/4804 —
  first miss `@62` `)` → `You are bare handed.`
- **Fixed this iter:** D-0335 JSON `dosave`/`restore` + `S`; D-0336
  welcome-back align gate; D-0337 attributes quitchars; D-0338 `$` gold.
- **Alt:** seed0107 @2684. **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** early-return `dochug` on `msleeping` (D-0278);
  `can_make_bones` without `no_bones_level` (D-0279);
  `dodrink` CANCEL as time (D-0280); `#quit` AC-only (D-0281);
  `read_engr` maxelen from 80 (D-0282); botl `Dlvl` from `uz.dlevel` (D-0283);
  omit `m_throw` flash / potion `nn` (D-0284/85); skip AT_WEAP `mswings` /
  clamp fatal `uhp=0` / skip bot when `uhp==-1` / live-paint botl on more
  (D-0286/87/310/314/320); invent yn when `disclose:-i` (D-0288);
  omit RIP blank / topten (D-0290/91); true amulet/TOOL/WAND/SCROLL/SPBOOK/
  ARMOR name when `!nn` (D-0292/305/309/312/321/325); WAND `known` at create
  (D-0316); private `mon_nam` (D-0308); omit `paybill` (D-0311);
  bare isshk death (D-0313); omit Priest `bknown` (D-0315);
  vain-push behind boulder (D-0317); skip mon_wield pline (D-0318);
  fire-and-forget thitu pline (D-0319); bare hit period (D-0322);
  muse losehp without finish_done (D-0323); quit killer from prior death
  (D-0324); always paint Invisible `@` (D-0326); hard-code xkilled kill
  (D-0327); persist bones glyph memory (D-0328); bare MGIVENNAME ghost
  (D-0329); `;` unbound / forced more (D-0330); getlin no CO wrap (D-0331);
  drop letters without compactify (D-0332); friday13 one-space indent
  (D-0333); hand-roll checkfile yn (D-0334); treat `S` as unknown /
  skip VFS save (D-0335); always align on welcome-back (D-0336);
  advance attr pages on any key (D-0337); leave `$` unbound (D-0338);
  blanket `observe_object` in `xname` without `distantname`.
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC (D-0162/253).
- `goto_level` descend: `stairway_find_from(&u.uz0)` (D-0224).
- Session: `steps[i].key === moves[i-1]` (D-0238); `more()` space/CR/ESC.
- Save: VFS `save/<plname>` JSON; restore skips `rndencode`;
  `l_nhcore_init` still 2×rn2; farewell clears map no flush (D-0335).
- D-0274…D-0338: bones/disclose/RIP/topten/descr/botl/paybill/ghost/`;`/
  getlin/compactify/enl/checkfile/save/welcome/attr/`$`.
