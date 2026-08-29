# Review 614 — 7e407046 — sounds.c MS_RIDER Death tribute (D-1653)

## Metadata
- Full / short hash: `7e407046e70f65656e972849c30202e51b7914ec` / `7e407046`
- Parent: `105c91aa` (D-1652). This file audits **this SHA only** (sixth of nine `js/` commits since review **608**). Archive **Addressed:** D-1653 `7e407046`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 13:25:16 +0200
- D-id: **D-1653**
- Stats: `js/sounds.js` +61/−10, `js/invent.js` +14/−0, `js/hacklib.js` +12/−0, `js/files.js` +1/−1. Band **150–350** (`js/` insertions **88** <250; id >454).
- Claims to close: Open Death_quote / `u_have_novel` after D-1633. Not `read_tribute` body. Not lookup_novel (D-1651). `reviews/loop-2026-08-15/` has no unpaid rider Must-fix.
- JS / map: `sounds.js` MS_RIDER; `invent.js` `u_have_novel`; `hacklib.js` `ucase`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **594** named `Death_quote` at `sounds.c:1210`.

## Intent vs deliverable

Git subject promises: chatting Death uses `u_have_novel`, `Death_quote`, and `ucase` pline, instead of silent `ECMD_OK` after D-1633.

Pinned C `sounds.c` `domonnoise` MS_RIDER `:1193–1236` (`node scripts/csym.mjs` callers; body in `domonnoise`). `u_have_novel` `invent.c:1575–1584`. `ucase` `hacklib.c:101–110`. `Death_quote` `files.c:3647–3653` (D-1633). `--callers u_have_novel`: `sounds.c:1200`. `--callers Death_quote`: `:1210`. `--callers ucase`: `:1233`. `monflag.h` `MS_RIDER = 35`.

```1193:1217:nethack-c/upstream/src/sounds.c
    case MS_RIDER: {
        boolean ms_Death = (ptr == &mons[PM_DEATH]);
        if (ms_Death && !svc.context.tribute.Deathnotice
            && (book = u_have_novel()) != 0) {
            if ((tribtitle = noveltitle(&book->novelidx)) != 0) {
                Sprintf(verbuf, "Ah, so you have a copy of /%s/.", tribtitle);
                if (strcmpi(tribtitle, "Snuff")
                    && strcmpi(tribtitle, "The Wee Free Men"))
                    Strcat(verbuf, "  I may have been misquoted there.");
                verbl_msg = verbuf;
            }
            svc.context.tribute.Deathnotice = 1;
        } else if (ms_Death && rn2(3) && Death_quote(verbuf, sizeof verbuf)) {
            verbl_msg = verbuf;
        } else if (ms_Death && !rn2(10)) {
            pline_msg = "is busy reading a copy of Sandman #8.";
        } else
            verbl_msg = "Who do you think you are, War?";
```

Old JS: unknown msound → `ECMD_OK`; `Death_quote` existed with no caller. The diff **does** MS_RIDER 35, `u_have_novel`, `noveltitle`, `Death_quote` await, Sandman/`rn2(10)`, War else, Death `pline(ucase)` vs `verbalize`. It **does not** port save/rest `context.novel` / `Deathnotice`, SetVoice / `sound_speak`, or `verbl_msg_mcan`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| MS_RIDER arm | C `:1193–1218`, **LIVE this SHA** | `MS_RIDER = 35` **Match monflag.h** |
| `u_have_novel` | C `:1575–1584`, **LIVE this SHA** | invent array ≡ nobj, not cobj |
| `ucase` | C `:101–110`, **LIVE this SHA** | via `highc`; dokeylist highc clone — **do not add #2 ucase** |
| `Death_quote` | C `:3647–3653`, **LIVE** | **ASYNC**; await in `&&` |
| `noveltitle` | C do_name.c, **LIVE** | |
| `read_tribute` | C files.c, **LIVE** | D-1633; not re-ported |
| `strcmpi` Snuff/Wee | C `:1204–1206`, **CLONE** inline fold | **do not add strcmpi #3** |
| SetVoice / `sound_speak` | C `:1234–1238`, **OMIT named** | |
| `verbl_msg_mcan` | C `:1224–1226`, **OMIT named** | |
| save `Deathnotice` | C context, **OMIT named** | in-session flag live |

`node scripts/csym.mjs u_have_novel` → `invent.c:1575-1584`. `ucase` → `hacklib.c:101-110`. `Death_quote` → `files.c:3647-3653`. `--callers u_have_novel`: `:1200`. `--callers Death_quote`: `:1210`. `--callers ucase`: `:1233`.

RNG: `rn2(3)` then maybe `Death_quote` (tribute `rn2` inside); else `!rn2(10)` Sandman. **Same order as C.** `noveltitle` still `rn2` first (pre-existing). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
u_have_novel     js/invent.js:249   sync
ucase            js/hacklib.js:107   sync
Death_quote      js/files.js:417   ASYNC — await required
noveltitle       js/mkobj.js:1643   sync
highc            js/hacklib.js:94   sync
             !! ALSO 1 LOCAL CLONE(S) — js/dokeylist.js:25
strcmpi          NOT EXPORTED — 2 LOCAL js/vault.js:93  js/write.js:77
```

`--can sounds.js files.js Death_quote`: ALREADY. `--can sounds.js invent.js u_have_novel`: ALREADY. `--can sounds.js hacklib.js ucase`: ALREADY. `--can sounds.js mkobj.js noveltitle`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `strcmpi` #3. Do **not** add `ucase` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`u_have_novel`. C first `SPE_NOVEL` on `gi.invent` via `nobj`. JS `for (const otmp of game.invent || [])`. **Match `:1575–1584`** if invent is the nobj chain as an array (this port’s shape). Not cobj.

Tribute if. Death + !Deathnotice + book: `noveltitle(&novelidx)`; `/title/`; strcmpi skip misquoted for Snuff / Wee Free Men; set Deathnotice even if title null. JS `tlow !== 'snuff' && !== 'the wee free men'`. **Match `:1199–1209`.** `ms_Death` via `mndx === PM_DEATH` (C `&mons[PM_DEATH]`). Analogue.

`else if (ms_Death && rn2(3) && Death_quote)`. Short-circuit: `rn2(3)==0` skips quote. JS `await Death_quote(verbuf)` in the `&&`. **Match `:1210`.** `Death_quote` oid 1 `"Death"` / `"Death Quotes"`. **Match `:3647–3653`.**

`else if (ms_Death && !rn2(10))` Sandman pline_msg. **Match `:1214–1215`.** Else War. Non-Death riders (Famine/Pestilence) fall to War. **Match C else.**

Speak. C `pline1(ucase(strcpy(tmpbuf, verbl_msg)))` for Death; else `verbalize1`. JS `pline(ucase(verbl_msg))` vs `verbalize`. **Match `:1228–1238` minus SetVoice/sound_speak.** `ucase` a-z via `highc` (`~0x20` ≡ C `~040`). **Match `:101–110`.**

C `domonnoise` after the switch always `return ECMD_TIME` even if both messages empty. JS `ECMD_OK` if neither. Only hits if Death+book and `noveltitle` is falsy. Thin analogue, not a live-arm stub.

Callee closure (MS_RIDER). LIVE: `u_have_novel`, `noveltitle`, `Death_quote`, `ucase`, `rn2`, `pline`, `verbalize`. CLONE: inline strcmpi fold; `tribute_info`. OMIT named: SetVoice, save/rest. STUB: **none**. Combined-arm ships. Not “dispatch ported, callee stubbed.” `Death_quote` is live, not a TODO.

## Hallucinations / overclaim

Subject Death `u_have_novel` / `Death_quote` / `ucase`: **true.** D-log canary Mort misquoted / Snuff+Wee / Famine War: **claimed; this review does not re-run.** Do **not** stamp “Match C SetVoice / `sound_speak`.” Do **not** stamp “Match C save `Deathnotice`.” Do **not** stamp “Match C `read_tribute` body” (D-1633). Public `#chat` Death is **public-unhit**.

## Density

+88: C MS_RIDER ~25 + `u_have_novel` 10 + `ucase` 10 + speak arm. §2b one MS_RIDER family after D-1633. Did not glue save/rest. Above a one-`if` peel.

## Verification

Wired: MS_RIDER 35; `rn2(3)` then quote; `!rn2(10)`; Death ucase. Unwired C: SetVoice; save/rest. Conf: two `rn2` as C. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Death chat. Fortress does not prove `Deathnotice` once.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): save/rest `context.tribute.Deathnotice` / `context.novel`; SetVoice / `sound_speak`; `verbl_msg_mcan`. Do **not** add `strcmpi` #3. Do **not** add `ucase` #2. Do **not** re-port `read_tribute` (D-1633). Do **not** re-port lookup_novel (D-1651). Do **not** walk `cobj` in `u_have_novel`.

Verdict: **ACCEPT-WITH-DEBT**
