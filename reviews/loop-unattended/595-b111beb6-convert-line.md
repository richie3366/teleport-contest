# Review 595 — b111beb6 — questpgr.c convert_line / qtext_pronoun %Xh (D-1634)

## Metadata
- Full / short hash: `b111beb6248f526c8ef3f3a758378edf5eb5f941` / `b111beb6`
- Parent: `e476fe74` (D-1633). This file audits **this SHA only** (fifth of nine `js/` commits since review **590**). Archive **Addressed:** D-1634 `b111beb6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 07:49:07 +0200
- D-id: **D-1634**
- Stats: `js/questpgr.js` +123/−39, `js/u_init.js` +25/−2, `js/roles.js` +8/−2. Band **150–350** (js/ insertions **156**; id >454 so 200-floor).
- Claims to close: Open `convert_line` pronoun `%Xh` after D-1622 / D-1633. Not `com_pager_core`. Not convert_arg `%c`/`%G`. `reviews/loop-2026-08-15/` has no unpaid pronoun Must-fix.
- JS / map: `questpgr.js` `convert_line` / `qtext_pronoun`; `roles.js` `genders[]`; `u_init.js` `godgend`/`ldrgend`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **583** named `qtext_pronoun` / `%dI` leftover letter.

## Intent vs deliverable

Git subject promises: `%Xh`/`%Xi`/`%Xj` pronouns go through `qtext_pronoun` (dlno who, Eyes/plural they) instead of leaving a literal letter after the name after D-1633.

Pinned C `questpgr.c` `convert_line` `:327–420` (`node scripts/csym.mjs convert_line`). `qtext_pronoun` `:197–233`. `--callers convert_line`: `:433` pline, `:450` window, `:606` synopsis. `--callers qtext_pronoun`: `:369`. `role.c` `genders[]` `:688–694`. `role_init` `ldrgend` `:2036–2041`, `godgend` `:2084–2085`. `com_pager_core` is D-1622.

```360:373:nethack-c/upstream/src/questpgr.c
                case 'h': case 'H':
                case 'i': case 'I':
                case 'j': case 'J':
                    if (strchr("dlno", lowc(*(c - 1))))
                        qtext_pronoun(*(c - 1), *c);
                    else
                        --c; /* default action */
                    break;
```

```197:232:nethack-c/upstream/src/questpgr.c
    if (who == 'o'
        && (strstri(gc.cvt_buf, "Eyes ")
            || strcmpi(gc.cvt_buf, makesingular(gc.cvt_buf)))) {
        pnoun = (lwhich == 'h') ? "they" : (lwhich == 'i') ? "them"
                : (lwhich == 'j') ? "their" : "?";
    } else {
        godgend = (who == 'd') ? svq.quest_status.godgend
            : (who == 'l') ? svq.quest_status.ldrgend
            : (who == 'n') ? svq.quest_status.nemgend
            : 2;
        pnoun = ... genders[godgend] ...
    }
    Strcpy(gc.cvt_buf, pnoun);
    if (lwhich != which)
        gc.cvt_buf[0] = highc(gc.cvt_buf[0]);
```

Old JS (D-1622): convert_line `a/A/C/p/P/s/S` only; `%dI` left a literal `I`; `genders[]` male/female only; `role_init` set `nemgend` only.

The diff **does** local `qtext_pronoun` (Eyes/`makesingular` they; else `genders[godgend/ldrgend/nemgend]`; `%O` who not `'o'` → 2), convert_line h/H/i/I/j/J with `dlno` else `--i`, `%Xt` strip `the `, `An`/`an` continue, `genders[2]`/`[3]`, `godgend` from `align_gtitle==goddess`, `ldrgend` same rn2 as C. It **does not** port convert_arg `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`, qt_pager common, array `rn2`, pauper_legacy. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `convert_line` | C `:327–420`, **LIVE this SHA** | export |
| `qtext_pronoun` | C `:197–233` staticfn, **LIVE this SHA** | local; do not #2 |
| `convert_arg` | C, **LIVE** (partial) | local; catalogue named |
| `genders[]` | C `:688–694`, **LIVE this SHA** | +neuter+group |
| `godgend` / `ldrgend` | C `:2085` / `:2036`, **LIVE this SHA** | |
| `nemgend` | C `:2059`, **LIVE** | pre-existing |
| `highc` / `strstri` / `makesingular` / `An` | C, **LIVE** | imported |
| convert_arg `%c`/`%G`/… | **OMIT named** | |
| array `rn2` / common fallback | **OMIT named** | |

`node scripts/csym.mjs convert_line` → `:327-420`. `qtext_pronoun` → `:197-233`. `--callers convert_line` `:433`/`:450`/`:606`.

RNG: `ldrgend` `rn2(100)<50` when PM is not m/f/n. **Match `:2036–2040`.** `godgend` no rng. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
convert_line     js/questpgr.js:586   sync
qtext_pronoun    NOT EXPORTED — 1 LOCAL js/questpgr.js:552
genders          js/roles.js:627   sync
highc            js/hacklib.js:94   sync  (+ dokeylist clone; imported export)
strstri          js/hacklib.js:205   sync
makesingular     js/objnam.js:1436   sync
An               js/objnam.js:1614   sync
convert_arg      NOT EXPORTED — 1 LOCAL js/questpgr.js:478
role_init_godgend NOT EXPORTED — 1 LOCAL js/u_init.js:1776
```

`--can questpgr.js roles.js genders` / `hacklib.js highc` / `objnam.js An`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `qtext_pronoun` #2. Do **not** add `highc` #3 in questpgr. Do not add `strstri` #4.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Modifier scan. C `convert_arg(*(++c))` then `switch(*(++c))`. Invalid pronoun who `--c` so the letter is copied as literal. JS `i++` into mod; if not dlno `i--`. **Match `:367–372`.** `%A`/`%a` `continue` after An/an (do not also strcat cvt_buf). JS `out += An/an; continue`. **Match `:347–354`.** Old JS capitalized `an()` for `%A` — C uses `An()`. This SHA **fixes** that.

`%C` highc first char. `%P`/`%S` highc then plural/possessive. `%p`/`%s` without. **Match.** `%t` `strncmpi(..., "the ", 4)` then strcat rest + continue. JS `/^the /i` + `slice(4)` + continue. **Match `:394–400`.** default `--c`. **Match.**

`qtext_pronoun`. who `'o'` + (`strstri` Eyes or name ≠ makesingular) → they/them/their. Else genders[d/l/n] or 2. Capitalize if which was upper. JS `who === 'o'` is **not** `'O'`; `%Oh` uses who `'O'` → default 2. C `lowc(*(c-1))` is `'o'` so `%Oh` **does** enter qtext_pronoun, with who==`'O'` (not `'o'`) → else branch gend 2. JS `'dlno'.includes('O'.toLowerCase())` true, `qtext_pronoun('O',…)` → not `who==='o'`, gend 2. **Match D-log `%O` default 2.**

```688:694:nethack-c/upstream/src/role.c
const struct Gender genders[] = {
    { "male", "he", "him", "his", "Mal", ROLE_MALE },
    { "female", "she", "her", "her", "Fem", ROLE_FEMALE },
    { "neuter", "it", "it", "its", "Ntr", ROLE_NEUTER },
    { "group", "they", "them", "their", "Grp", 0 },
};
```

JS four rows. ROLE_GENDERS remains 2 for chargen. **Match.**

`godgend`. C `!strcmpi(align_gtitle(alignmnt), "goddess")`. JS `align_gtitle(urole, alignmnt)==='goddess'?1:0`. **Match `:2084–2085`** if `align_gtitle` is the live roles.js export (it is).

`ldrgend`. C `is_neuter?2:is_female?1:is_male?0:(rn2(100)<50)`. JS same. **Match `:2036–2040`.** `nemgend` unchanged this SHA.

Callee closure (pronoun arm). LIVE: `qtext_pronoun`, `genders`, `strstri`, `makesingular`, `highc`, `An`/`an`, `makeplural`, `s_suffix`, `convert_arg` for d/l/n/o. CLONE: none new (`qtext_pronoun` is the C static). OMIT named: convert_arg catalogue, array rn2, common fallback. STUB: none. The arm may ship. Not “dispatch ported, callee is a stub.”

`\r`/`\n` early return. **Match `:337–340`.** BUFSZ panic named omit (JS string).

```327:358:nethack-c/upstream/src/questpgr.c
staticfn void
convert_line(char *in_line, char *out_line)
{
    char *c, *cc;

    cc = out_line;
    for (c = in_line; *c; c++) {
        *cc = 0;
        switch (*c) {
        case '\r':
        case '\n':
            *(++cc) = 0;
            return;

        case '%':
            if (*(c + 1)) {
                convert_arg(*(++c));
                switch (*(++c)) {
                case 'A':
                    Strcat(cc, An(gc.cvt_buf));
                    cc += strlen(cc);
                    continue;
                case 'a':
                    Strcat(cc, an(gc.cvt_buf));
                    cc += strlen(cc);
                    continue;
                case 'C':
                    gc.cvt_buf[0] = highc(gc.cvt_buf[0]);
                    break;
```

`convert_arg` still only the firsttime/goal/leader/assign subset (`%d` deity, `%l` leader, `%n` nemesis, `%o` artifact, `%p` player, `%r` rank, …). `%c` character class / `%G` god / `%A` align / `%D` `%C` `%N` `%L` `%Z` stay named. Pronouns need `%d`/`%l`/`%n`/`%o` pieces — those convert_arg arms were already live for synopsis (D-1622). This SHA does not silently stub them.

C `godgend` uses `align_gtitle(alignmnt)` with the hero’s starting align. JS passes `game.urole` into `align_gtitle` — the live roles.js helper already takes (role, align). **Match the C strcmpi goddess test.**

## Hallucinations / overclaim

Subject `%Xh`/`%Xi`/`%Xj` via `qtext_pronoun` instead of leftover letter: **true** for dlno. D-log `%dI` Him/Her, Eyes they, `%O` neuter: **true.** `genders[]` + godgend/ldrgend: **true.** Do **not** stamp “Match C convert_arg `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`.” Do **not** stamp “Match C `qt_pager` common fallback.” Do **not** stamp “Match C array `rn2` angel/demon_cuss.” Do **not** stamp “Match C `com_pager_core`” (D-1622). Public quest pronouns are **role-hit** on live Arc/Bar/Pri/Wiz/Kni messages; other-role bodies remain embed-unhit.

## Density

+156: C `convert_line` pronoun cases + `qtext_pronoun` + `genders[2..3]` + the two role_init fields those pronouns read. §2b one `%X` modifier family. Did not glue convert_arg catalogue. Above a one-`if` peel.

## Verification

Wired: convert_line h/i/j; qtext_pronoun Eyes/plural; godgend/ldrgend; An vs an. Unwired C: convert_arg catalogue; common fallback. Conf: `ldrgend` `rn2(100)` only when PM gender is random. No seed gate.

D-log pronoun canary (`%dI` Him/Her, `%ni` him, `%ph` name+h, Nalzok `%ns`/`%nh`); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `%o` Eyes they and `%Xt` on roles without those tokens. Fortress Pri `%dI` leftover was the old C-wrong this SHA names.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): convert_arg `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`; qt_pager common; array `rn2`; pauper_legacy; rawtext. Do not add `qtext_pronoun` #2. Do not add `highc` in questpgr. Do not re-port `com_pager_core` (D-1622). Do not treat `genders[2]` as a chargen sex.

Verdict: **ACCEPT-WITH-DEBT**
