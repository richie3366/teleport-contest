# Review 594 — e476fe74 — files.c read_tribute / choose_passage / SPE_NOVEL (D-1633)

## Metadata
- Full / short hash: `e476fe7449a8510c721d0e2a6a3d465d1ef07fee` / `e476fe74`
- Parent: `20fa20b3` (D-1632). This file audits **this SHA only** (fourth of nine `js/` commits since review **590**). Archive **Addressed:** D-1633 `e476fe74`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 07:35:50 +0200
- D-id: **D-1633**
- Stats: `js/files.js` +292/−3, `js/spell.js` +43/−8, `js/generated/tribute_data.js` +4, `js/mkobj.js` +2/−1. Band **200–450** (js/ insertions **330** >250; id >454).
- Claims to close: Open files.c tribute after D-1632. Not putmsghistory body. Not `lookup_novel`. `reviews/loop-2026-08-15/` has no unpaid tribute Must-fix.
- JS / map: `files.js` `read_tribute` / `choose_passage`; `spell.js` `study_book` SPE_NOVEL; embed `js/generated/tribute_data.js`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **589** named files.c tribute; **549** `putmsghistory` already LIVE.

## Intent vs deliverable

Git subject promises: SPE_NOVEL opens the named tribute passage (`choose_passage` reservoir, NHW_MENU + `putmsghistory`) instead of stubbing the novel after D-1632.

Pinned C `files.c` `read_tribute` `:3473–3645` (`node scripts/csym.mjs read_tribute`). `choose_passage` `:3429–3470`. `Death_quote` `:3647–3653`. `--callers read_tribute`: `spell.c:517`, `files.c:3652`. `--callers Death_quote`: `sounds.c:1210` (named). `spell.c` `study_book` SPE_NOVEL `:512–534`. `do_name.c` `noveltitle` `:1610–1623`. `context.h:116` `pasg[30]` — MAXPASSAGES 30 (C comment `/* 20 */` stale). `putmsghistory` is D-1588. dlb `TRIBUTEFILE` → Rule #2 embed.

```512:534:nethack-c/upstream/src/spell.c
        if (booktype == SPE_NOVEL) {
            const char *tribtitle = noveltitle(&spellbook->novelidx);

            if (read_tribute("books", tribtitle, 0, (char *) 0, 0,
                             spellbook->o_id)) {
                if (!u.uconduct.literate++)
                    livelog_printf(LL_CONDUCT,
                                   "became literate by reading %s",
                                   tribtitle);
                check_unpaid(spellbook);
                makeknown(booktype);
                if (!u.uevent.read_tribute) {
                    record_achievement(ACH_NOVL);
                    more_experienced(20, 0);
                    newexplevel();
                    u.uevent.read_tribute = 1;
                }
            }
            return 1;
        }
```

Old JS: `study_book` SPE_NOVEL stub `"That novel is not implemented yet."` / `return 0`. `files.js` wizkit-only.

The diff **does** embed `dat/tribute` (`extract-tribute.py`, one compact line), `choose_passage` unused-shuffle + reservoir `rn2` when `passagecnt>30`, `read_tribute` `%section`/`%title`/`%passage`/`%e` walk, window path `show_nhw_menu_text` + `putmsghistory` attribution, nowin_buf first-line `Death_quote`, `study_book` success conduct/ACH_NOVL/XP + **always `return 1`**, latebound `import('./files.js')` (files→u_init→spell TDZ). It **does not** port `sounds.c` `Death_quote` caller, `lookup_novel`, save/rest `context.novel`, or dlb `fopen`. Named. Persist is not used; no `fs`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `read_tribute` | C `:3473–3645`, **LIVE this SHA** | embed not dlb |
| `choose_passage` | C `:3429–3470` staticfn, **LIVE this SHA** | local; MAXPASSAGES=30 |
| `Death_quote` | C `:3647–3653`, **LIVE this SHA** | export; sounds.c caller named |
| `noveltitle` | C `:1610–1623`, **LIVE this SHA** | export mkobj.js |
| `study_book` SPE_NOVEL | C `:512–534`, **LIVE this SHA** | |
| `putmsghistory` | C, **LIVE** | D-1588 import |
| `show_nhw_menu_text` | C NHW_MENU display, **CLONE** | pager.js |
| `TRIBUTE_TEXT` | C dlb file, **LIVE embed** | generated |
| `tribute_ncmpi` | C `strncmpi`/`strcmpi`, **CLONE #4** | insight/vault/write already |
| `tribute_copynchars` | C `copynchars`, **CLONE #2** | topten.js has #1 |
| `livelog_printf` / `check_unpaid` / `record_achievement` | C, **LIVE** | |
| sounds.c `Death_quote` | C `:1210`, **OMIT named** | |
| `lookup_novel` / save novel | **OMIT named** | |

`node scripts/csym.mjs read_tribute` → `files.c:3473-3645`. `choose_passage` → `:3429-3470`. `Death_quote` → `:3647-3653`. `noveltitle` → `do_name.c:1610-1623`. `--callers read_tribute` `:517`. `--callers Death_quote` `sounds.c:1210`.

RNG: `choose_passage` `rn2(range)` in the reservoir loop then `rn2(count)` to pick. **Match C call-for-call.** `noveltitle` `rn2(k)` already existed. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
read_tribute     js/files.js:287   ASYNC — await required
choose_passage   NOT EXPORTED — 1 LOCAL js/files.js:250
Death_quote      js/files.js:417   ASYNC — await required
noveltitle       js/mkobj.js:1642   sync
strncmpi         NOT EXPORTED — 3 LOCAL CLONES (insight, vault, write)
             => Do NOT write clone #4 (tribute_ncmpi is #4)
copynchars       NOT EXPORTED — 1 LOCAL js/topten.js:30
             => tribute_copynchars is clone #2
show_nhw_menu_text js/pager.js:408   ASYNC — await required
putmsghistory    js/display.js:1524   sync
TRIBUTE_TEXT     js/generated/tribute_data.js:4   sync
study_book       js/spell.js:789   ASYNC — await required
check_unpaid     js/shk.js:2894   ASYNC — await required
```

`--can spell.js files.js read_tribute`: NEW-CYCLE but **VERDICT: SAFE** (hoisted function). This SHA used **dynamic** `import('./files.js')` anyway because files→u_init→spell TDZ on a *static* edge. Do **not** stamp “cycle-forced clone” for `read_tribute`. `--can spell.js shk.js check_unpaid`: SAFE (dynamic import is extra caution, not required). `--can files.js display.js putmsghistory` / `pager.js show_nhw_menu_text` / `getline.js mungspaces`: ALREADY. Do **not** add `read_tribute` #2. Do **not** add `strncmpi` #5. Do **not** `dlb_fopen` / `fs`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. Embed not runtime dat/.

## C ↔ JS fidelity

Parser. C `%` tags via `strncmpi(&line[1], …)`; section `strcmpi`. JS `tribute_ncmpi` after stripping `%`. Offsets: `%section ` → rest.slice(8); `%title ` → slice(6); `%passage ` → slice(8); `%e ` n=2. **Match C `&line[9]` / `[7]` / `[9]` / `"e "` sizeof-1.** Title `(n)` atoi + `mungspaces` before strcmpi. **Match.** `%e` with `foundpassage` cleanup; else pop scope. **Match.** `#` comments. **Match.**

```3534:3552:nethack-c/upstream/src/files.c
        case '%':
            if (!strncmpi(&line[1], "section ", sizeof "section " - 1)) {
                char *st = &line[9]; /* 9 from "%section " */

                scope = SECTIONSCOPE;
                matchedsection = !strcmpi(st, tribsection) ? TRUE : FALSE;
            } else if (!strncmpi(&line[1], "title ", sizeof "title " - 1)) {
                char *st = &line[7]; /* 7 from "%title " */
                ...
                        if (matchedsection && !strcmpi(st, tribtitle)) {
                            matchedtitle = TRUE;
```

SPE_NOVEL section string is `"books"` (C `:517`). Death Quotes is `"Death"` / `"Death Quotes"`. JS matches those literals. `strcmpi` is case-insensitive; tribute file `%section books` matches. **Match.**

Window vs nowin. C on first matching passage line: `create_nhwindow(NHW_MENU)` then `putstr`; nowin `copynchars` + goto. JS buffers `winLines` then `show_nhw_menu_text`; nowin `tribute_copynchars`. Empty lastline → grasped false. Attribution: `[` in lastline → mungspaces else construct Pratchett; `strrchr ']'` → `; passage #N]`. `putmsghistory(..., false)`. **Match `:3618–3634`.** `display_nhwindow(FALSE)` is the pager clone — do **not** stamp “Match C `create_nhwindow` pixel-for-pixel.”

```3429:3470:nethack-c/upstream/src/files.c
    if (oid != svc.context.novel.id || svc.context.novel.count == 0) {
        int i, range = passagecnt, limit = MAXPASSAGES;
        ...
        } else {
            svc.context.novel.count = MAXPASSAGES;
            for (idx = i = 0; i < passagecnt; ++i, --range)
                if (range > 0 && rn2(range) < limit) {
                    svc.context.novel.pasg[idx++] = (xint16) (i + 1);
                    --limit;
                }
        }
    }
    idx = rn2(svc.context.novel.count);
```

Reservoir. `pasg[30]`. Death Quotes 31 passages → 30-slot sample. **Match.** Same book + count>0 reuses leftover. **Match.** `tribpassage==0` chooses; else clamp. SPE_NOVEL passes 0. **Match.**

`noveltitle`. C `noveltitle(&spellbook->novelidx)`; JS `noveltitle(spellbook)` stores `otmp.novelidx`. `rn2(k)` then pin. **Match `:1610–1623`.**

`study_book`. Success: literate++ with livelog on 0→1, `check_unpaid`, `makeknown`, first `ACH_NOVL` + `more_experienced(20,0)` + `newexplevel`. Fail tribute: skip that, **still return 1**. Old stub returned 0. **Match `:517–534`.**

Callee closure (SPE_NOVEL arm). LIVE: `noveltitle`, `read_tribute`, `choose_passage`, `putmsghistory`, `livelog_printf`, `check_unpaid`, `makeknown`, `record_achievement`, `more_experienced`, `newexplevel`. CLONE: `tribute_ncmpi` (#4), `tribute_copynchars` (#2), `show_nhw_menu_text`. OMIT named: sounds.c caller, `lookup_novel`, save novel, dlb. STUB: none. The arm may ship. Not “dispatch ported, callee is a stub.”

`Death_quote` export is LIVE and unwired. Do **not** stamp “Match C `sounds.c:1210`.”

```3647:3653:nethack-c/upstream/src/files.c
boolean
Death_quote(char *buf, int bufsz)
{
    unsigned death_oid = 1; /* chance of oid #1 being a novel is negligible */

    return read_tribute("Death", "Death Quotes", 0, buf, bufsz, death_oid);
}
```

JS `Death_quote({s}, bufsz)` uses a string holder. C writes `char *`. nowin_buf path copies the first non-empty passage line via `copynchars`. **Match the export.** sounds.c `ms_Death && rn2(3)` still named.

`mksobj` already sets `novelidx = -1` (`mkobj.js:1727` ≡ `mkobj.c:1247`) so first `noveltitle` pins `rn2(k)` rather than treating missing as 0.

dlb vs embed. C `dlb_fopen(TRIBUTEFILE,"r")` / `dlb_fgets`. JS `TRIBUTE_TEXT.split('\n')`. Same `%` grammar. Missing embed ≡ `!fp` → `You_feel too overwhelmed`. **Match the fail arm.** Do **not** add `fs.readFileSync('dat/tribute')`.

## Hallucinations / overclaim

Subject SPE_NOVEL named passage via reservoir + NHW_MENU + `putmsghistory` instead of stub: **true.** Always `return 1`: **true.** Rule #2 embed: **true** (`tribute_data.js` 4 lines, not indent=2 dump). D-log MAXPASSAGES 30: **true.** Do **not** stamp “Match C `dlb_fopen`.” Do **not** stamp “Match C `Death_quote` at `sounds.c:1210`.” Do **not** stamp “Match C `lookup_novel` / save `context.novel`.” Do **not** stamp “Match C `putmsghistory` body” (D-1588). Do **not** static-import `files.js` from `spell.js`. Public SPE_NOVEL is **public-unhit**; canary is private.

## Density

+330: C `read_tribute` 173 + `choose_passage` 42 + SPE_NOVEL 23 plus embed + parser helpers. §2b one tribute family. Did not glue `lookup_novel`. Above a one-`if` peel.

## Verification

Wired: `study_book` SPE_NOVEL; `choose_passage` rng; window attribution; miss translation pline; `Death_quote` nowin path (export). Unwired C: sounds.c. Conf: reservoir `rn2` as C. No seed gate.

D-log tribute canary (Colour of Magic / Death Quotes / miss / reservoir 29→28); `allmain`/`spell` load; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for SPE_NOVEL. Fortress does not prove the new rng.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): sounds.c `Death_quote` (`:1210`); `lookup_novel`; save/rest `context.novel`; dlb. Clone debt: `tribute_ncmpi` is `strncmpi` #4 — export hacklib once, do not add #5; `tribute_copynchars` is `copynchars` #2. Do not add `read_tribute` in `spell.js`. Do not static-import `files.js` from `spell.js` (TDZ). Do not dump `dat/tribute` indent=2. Do not re-port `putmsghistory` (D-1588).

Verdict: **ACCEPT-WITH-DEBT**
