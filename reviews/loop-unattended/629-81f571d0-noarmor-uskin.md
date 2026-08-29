# Review 629 — 81f571d0 — invent.c noarmor uskin embedded-skin pline (D-1668)

## Metadata
- Full / short hash: `81f571d02b32f1f3cfc7ce68db9f6391c733b8ef` / `81f571d0`
- Parent: `0cc9e178` (D-1667). This file audits **this SHA only** (third of nine `js/` commits since review **626**). Archive **Addressed:** D-1668 `81f571d0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 17:28:26 +0200
- D-id: **D-1668**
- Stats: `js/invent.js` +22/−8. Band **150–350** (`js/` insertions **22** <250; id >454). Open map row; C body is 21 lines.
- Claims to close: Open `invent.c` `noarmor` uskin after D-1667. Not `doprarm` listing. Not polyself dragon-merge `uskin=`. `reviews/loop-2026-08-15/` has no unpaid noarmor Must-fix.
- JS / map: `invent.js` `noarmor`; imports `simpleonames`, `strstri`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: none of **618–628** Must-fix (those were InvOptOn / ECMD_TIME). Named omit after D-0340 / D-1589 `doprarm`.

## Intent vs deliverable

Git subject promises: `uskin` with `report_uskin` prints the `simpleonames` dragon-scale shorten and embedded-skin pline, instead of always "not wearing any armor".

Pinned C `noarmor` `:4577–4597` (`node scripts/csym.mjs noarmor`). `--callers`: prototype `:15`; `ggetobj` takeoff `:2310` `noarmor(FALSE)`; `doprarm` `:4610` `noarmor(TRUE)`; comment `polyself.c:641`. `simpleonames` `objnam.c:2427–2442`. `strstri` `hacklib.c:739–779`. `strncmpi` `hacklib.c:716–734`. `wearing_armor` `:2148–2153` (no `uskin`).

```4577:4596:nethack-c/upstream/src/invent.c
staticfn void
noarmor(boolean report_uskin)
{
    if (!uskin || !report_uskin) {
        You("are not wearing any armor.");
    } else {
        char *p, *uskinname, buf[BUFSZ];
        uskinname = strcpy(buf, simpleonames(uskin));
        if (!strncmpi(uskinname, "set of ", 7))
            uskinname += 7;
        if ((p = strstri(uskinname, " dragon ")) != 0)
            while ((p[1] = p[8]) != '\0')
                ++p;
        You("are not wearing armor but have %s embedded in your skin.",
            uskinname);
    }
}
```

Old JS: both arms printed the empty-armor line. The diff **does** the empty-armor early return, LIVE `simpleonames`, a 7-char `"set of "` fold (not `strncmpi` #4), imported `strstri` + `slice(0, at+1)+p.slice(8)` for the overlapping `p[1]=p[8]` loop, and the embedded-skin pline. It **does not** rewrite `doprarm`’s letter list, assign `uskin` in polyself, or `strsubst` scale-mail revert. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `noarmor` | C `:4577–4597`, **LIVE this SHA** | local; **do not add #2** |
| `simpleonames` | C `:2427–2442`, **LIVE** (import) | iactions/pickup clones — **do not add #3** |
| `strstri` | C `:739–779`, **LIVE** (import) | attrib/write clones — **do not add #3** |
| `"set of "` fold | C `strncmpi` `:4590–4591`, **CLONE** | `slice(0,7).toLowerCase()`; **do not add `strncmpi` #4** |
| `" dragon "` collapse | C `:4592–4594`, **CLONE** | `p.slice(8)` ≡ overlapping copy |
| `wearing_armor` | C `:2148–2153`, **LIVE** local | do_wear clone #2 — **do not add #3** |
| `doprarm` | C `:4600+`, **LIVE** caller | `noarmor(true)` already; listing is D-0340/D-1589 |
| `ggetobj` takeoff | C `:2310`, **LIVE** | `noarmor(false)` |
| polyself `uskin=` / scale-mail revert | C `:637–656`, **OMIT named** | |

`node scripts/csym.mjs noarmor` → `:4577-4597`. `simpleonames` → `:2427-2442`. `strstri` → `:739-779`. `strncmpi` → `hacklib.c:716-734`. `wearing_armor` → `:2148-2153`. `--callers noarmor`: `:2310` / `:4610`. `--callers doprarm` not required (already called `noarmor(TRUE)`).

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
noarmor          NOT EXPORTED — 1 LOCAL js/invent.js:5155
             => Do NOT write clone #2.
simpleonames     js/objnam.js:1945   sync
             !! ALSO 2 LOCAL CLONES — iactions.js pickup.js
             => Do NOT add clone #3.
strstri          js/hacklib.js:217   sync
             !! ALSO 2 LOCAL CLONES — attrib.js write.js
             => Do NOT add clone #3.
strncmpi         NOT EXPORTED — 3 LOCAL insight/vault/write
             => Do NOT write clone #4.
doprarm          js/invent.js:5182   ASYNC — await required
wearing_armor    NOT EXPORTED — 2 LOCAL do_wear.js invent.js
             => Do NOT write clone #3.
```

`--can invent.js objnam.js simpleonames`: ALREADY. `--can invent.js hacklib.js strstri`: ALREADY. Do **not** stamp “cycle-forced clone.”

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Empty arm. C `!uskin || !report_uskin` → `You("are not wearing any armor.")`. JS `game.u?.uskin` and the same predicate, `pline` with the You-text. **Match `:4580–4582`.** `wearing_armor` still ignores `uskin` (`uarm`…`uarmu` only). **Match `:2148–2153`.** So `[` with only merged scales still reaches `noarmor(TRUE)`.

`"set of "`. C `!strncmpi(uskinname, "set of ", 7)` then `uskinname += 7`. JS `slice(0,7).toLowerCase()==='set of '` then `slice(7)`. ASCII `lowc` vs `toLowerCase` for this literal. **Match `:4590–4591`.** Not a fourth `strncmpi` body.

`" dragon "`. C `strstri` then `while ((p[1]=p[8])!='\0') ++p` — overlapping copy that drops the seven letters of `"dragon"` and keeps the leading space, so `"gray dragon scales"` → `"gray scales"` and `"gray dragon scale mail"` → `"gray scale mail"` (comment `:4588–4589`). JS `strstri` returns `s.slice(i)` or `null` (`hacklib.js:217–223`, case-insensitive like C `lowc`). `at = uskinname.length - p.length` is the match index; `slice(0, at+1)+p.slice(8)` keeps `p[0]` and the tail from `p[8]`. **Match the loop’s string result.** Not a single `p[1]=p[8]` assignment (D-log’s “≡” is the full while, which the slice is).

Pline. C `You("… have %s embedded in your skin.", uskinname)`. JS template with the shortened name. **Match `:4595–4596`.**

`simpleonames`. Imported LIVE. JS `pretty_base` ARMOR already prefixes `"set of "` for `GRAY_DRAGON_SCALES`…`YELLOW_DRAGON_SCALES` (`objnam.js:685–686`), so the fold has something to strip. Scale mail uses the unprefixed `"gray dragon scale mail"` actualn; `strstri` still fires. C `simpleonames` `makeplural` when `quan!=1` (`:2432–2440`); JS `simpleonames` documents quan stays 1. `uskin` is one worn obj. **Not a noarmor C-wrong.** Do not treat that as this SHA inventing a clone of `simpleonames`.

Callee closure. LIVE: `simpleonames`, `strstri`, `pline`, `doprarm`/`ggetobj` callers. CLONE: `"set of "` prefixi (matched here). OMIT named: polyself merge / `strsubst` revert / steal skinback; `doprarm` letter list (pre-existing). STUB: **none** in the uskin arm. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject uskin + `simpleonames` shorten + embedded-skin pline: **true** (private canary scales/mail). D-log “not `strncmpi` clone #4”: **true**. Do **not** stamp “Match C `doprarm` armor letters.” Do **not** stamp “Match C polyself.c `uskin=` / scale-mail `strsubst`.” Do **not** stamp “Match C `simpleonames` `makeplural`.” Do **not** add `wearing_armor` #3. Public-unhit for dragon `uskin`; fortress does not prove `[` after poly-merge.

## Density

+22: whole C `noarmor` (21 lines). §2b one function. C is that small (Open ~40 floor does not apply). Did not glue wizweight.

## Verification

Wired: empty pline; scales → `"gray scales"`; mail → `"gray scale mail"`; `doprarm` pending message. Unwired C: `uskin=` in polyself; `doprarm` `obj_to_let` list. Conf: no RNG. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `uskin`. Fortress 44/44 does not hit dragon-merge `[`.

## Actionable C-wrongs

None. Named (map, not Must-fix): polyself.c dragon-merge `uskin=` / scale-mail revert `strsubst` (`:637–656`); steal skinback; `simpleonames` `makeplural` when `quan!=1`. Do **not** re-port `doprarm` listing (D-0340 / D-1589). Do **not** add `strncmpi` #4. Do **not** add `noarmor` / `simpleonames` / `strstri` / `wearing_armor` extra clones.

Verdict: **ACCEPT-WITH-DEBT**
