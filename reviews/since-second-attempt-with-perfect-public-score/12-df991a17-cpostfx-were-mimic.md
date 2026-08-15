# Review 12 — `df991a17` — cpostfx were* / mimic / attrcurse (D-0945)

## Métadonnées
- Hash complet / court : `df991a17947baa81769447d35d5b62d0d9c6341b` / `df991a17`
- Parent : `81c74930b9396758d17b7020a2aa449fbb0de9d1`
- Auteur, date : Raphaël Hervier, 2026-07-21 22:48:19 +0200
- D-id : **D-0945**
- Stats : 10 files, +356 / −94
- Fichiers JS / map / cadence : `js/eat.js` (+110), `js/sit.js` (+155 `attrcurse`), `js/were.js` (`set_ulycn`) ; rotation journal i1213 (bruit archive, pas un score #)

## Intention vs livrable
Promet le reste des specials post-cadavre : `set_ulycn`, mimic gold `eatmdone`, `attrcurse`. Le diff remplit les trois `break` vides de D-0943 et pose les helpers. Rotation journal dans le même commit : bruit docs, pas un mélange cadence+port de suite (CURRENT ne change pas le #1210).

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/were.js` | Port C `set_ulycn` → `u.ulycn` + `set_uasmon` |
| `js/sit.js` | Port C `attrcurse` (`rnd(11)` FALLTHROUGH) |
| `js/eat.js` | Wiring cpostfx + `eatmdone` + `catch_lycanthropy` |
| map / D-log | D-0945 ; `retouch_equipment` / `set_mimic_blocking` / `curs_on_u` / `eatmupdate` nommés |
| Journal + archive i1213 | Cohort eat ; rotation hors sujet |

## Fidélité C ↔ JS

### `set_ulycn` — C `were.c:232` / JS `js/were.js:168`
C : `u.ulycn = which; set_uasmon();` (Drain_resistance FROM_LYCN). JS identique. **Pas de shape change** — C non plus. Caller C après le switch `cpostfx` : `if (ismnum(catch_lycanthropy)) { set_ulycn(...); retouch_equipment(2); }`.

JS : `ismnum` + `set_ulycn` ; **`retouch_equipment(2)` omis** (nommé). Conséquence : lycanthropie sans retouch rust/artéfact/matériau — divergence équipement, pas le flag `ulycn`.

Mapping human-were → beast : C `HUMAN_WERERAT→WERERAT` etc. JS au commit pose `catch_lycanthropy = PM_WERERAT` dans les `case` (plus de `break` vide). **OK.**

### `eatmdone` — C `eat.c:163` / JS `eat.js:1351`
C : libère `eatmbuf` si `nomovemsg` pointe dessus ; si `U_AP_TYPE` → `M_AP_NOTHING` + `newsym`. JS : même test buffer ; reset `m_ap_type`/`mappearance` + `newsym`. C ne zéros pas explicitement `mappearance` ; JS si. Inoffensif.

Tête de `cpostfx` C : `if (ge.eatmbuf) eatmdone();` — **absent en D-0943, ajouté ici.** Correct.

`eatmupdate` (hallu toggle pendant mimicry) : C existe (`eat.c:181`) ; JS nommé omis. Immobilisé gold-pile + hallu : message de fin faux.

### Mimic gold — C `eat.c:1184-1226`
FALLTHROUGH `tmp += 10` (giant) / `+20` (large) / `+20` (small) → giant **50**, large **40**, small **20**. JS `tmp +=` dans le même ordre. **OK.**

Garde C : `youmonst.data->mlet != S_MIMIC && !Unchanging`. Si déjà mimic ou Unchanging : pas de gold-pile. JS doit avoir la même garde (commit : `youdata` / `Unchanging`).

C `u.uconduct.polyselfs++` + `livelog` first-time. JS incrémente conduct, **livelog omis** (nommé). RNG : `nomul(-tmp)` pas un `rn2`. `Hallucination` choisit orange vs gold **sans** RNG.

C : `curs_on_u(); display_nhwindow(WIN_MAP, TRUE);` JS : `more()`. **Pas équivalent.** `display_nhwindow(..., TRUE)` force un `--More--` carte ; `more()` peut consommer une frappe différente / un autre topline. Nommé. Risque écran si un seed mange un mimic.

`afternmv = eatmdone` : JS `game.afternmv = eatmdone`. Dépend que le moteur d’occupation appelle `afternmv` comme C `ga.afternmv`.

### `attrcurse` — C `sit.c:644` / JS `js/sit.js:196`
`switch (rnd(11))` cases 1…11 FALLTHROUGH si le bit `INTRINSIC` n’est pas là. RNG : **un** `rnd(11)` puis des tests de bits, **pas** de `rn2` supplémentaire. JS : même cascade FIRE→TELEPORT→POISON→TELEPAT→COLD→INVIS→SEE_INVIS→FAST→STEALTH→PROTECTION→AGGRAVATE.

SEE_INVIS C : `set_mimic_blocking(); see_monsters(); newsym`. JS : `set_mimic_blocking` **omis** (nommé), `see_monsters` + `newsym` présents. Télépat C : `Blind && !Blind_telepat` → `see_monsters`. JS helper local `Blind_telepat()`. Messages : C `You("%s!", Hallu ? "tawt…" : "thought you saw something")` → « You thought you saw something! » ; JS `pline` avec le même texte.

`default:` si aucun bit : return 0, silence — C « no feedback if hero already lacks ». **OK.**

Callers : `cpostfx` `PM_DISENCHANTER` → `await attrcurse()`. C `(void) attrcurse();`. `dosit` C peut aussi appeler `attrcurse` (trône ?) — hors cluster, pas branché depuis `dosit` JS (préexistant).

## Constitution / playbook
Grep JS : RAS FORCE/fs/fastforward. `await more()` dans mimic = prompt utilisateur, pas un second `nhgetch` de mouvement. Frozen intacts. `attrcurse` vit dans `sit.js` (1:1 `sit.c`) plutôt que d’être fourré dans `eat.js` — bon.

## Densité (§2b)
**Right size.** Les trois `break` vides de D-0943 + leurs callees C (`were.c`/`sit.c`/`eatmdone`). Pas de PAPER/potion. Journal rotation = bruit, pas de densité JS.

## Documentation
D-0945 « retire remaining post-corpse specials » : vrai pour le switch, **faux** si on lit « lycanthropie complète » (`retouch_equipment` manquant). D-log nomme les deferrals. Map OK. Overclaim du sujet plus fort que le D-log.

## Vérification
Journal : green+eat/role 12/12. Rotation i1213 n’est pas une preuve suite. Mimic `more()` / were `retouch` probablement hors cohort. Fortress non re-cadencée.

## `ismnum` / `NON_PM`

C `catch_lycanthropy = NON_PM` init ; were human pose PM_WERE*. `ismnum` est vrai pour un PM valide, faux pour `NON_PM` (-1). JS doit importer `NON_PM` / `ismnum` (generated ou monsters). Si `catch_lycanthropy` reste `0` (giant ant) par oubli d’init, `set_ulycn(0)` infecte. Commit : `let catch_lycanthropy = NON_PM`. **OK.**

Were **beast** corpses (PM_WERERAT non human) : C n’a **pas** de `case` dédié — tombent dans `default` check_intrinsics, **pas** de lycanthropie. Lycanthropie = manger la forme **humaine**. JS idem (seuls HUMAN_WERE* posent catch). **OK.**

## Mimic : `nomul` / `multi_reason` / `afternmv`

C `nomul(-tmp)` immobilise `tmp` tours. JS `nomul(-tmp)` + `game.multi_reason = 'pretending to be a pile of gold'` (C string identique). `gn.nomovemsg = ge.eatmbuf`. Si JS `nomovemsg` n’est pas affiché à la fin de multi comme C, le joueur rate « You now prefer mimicking a human again. »

`dismount_steed(DISMOUNT_FELL)` si `u.usteed`. JS `await dismount_steed(...)` — callee préexistant. Steed + mimic : rare.

`youmonst.m_ap_type = M_AP_OBJECT` ; `mappearance = Hallu ? ORANGE : GOLD_PIECE`. Constantes otyp : `ORANGE_OTYP` vs C `ORANGE`. Si l’index fruit orange JS ≠ C `ORANGE`, glyphe faux (écran). À greper : le commit utilise `ORANGE_OTYP` / `GOLD_PIECE`.

`S_MIMIC` : si `youdata.mlet` n’est pas peuplé, la garde `!= S_MIMIC` est toujours vraie → gold-pile en forme mimic. Divergence poly.

## `attrcurse` hors eat

C `sit.c` l’appelle aussi depuis le trône (`sit.c:283` grep). JS `dosit` n’a pas gagné d’appel. Cluster = callee pour `cpostfx` seulement. Map sit.js ne dit pas « dosit attrcurse porté ». Honnête si on ne prétend pas #sit.

`rnd(11)` : C `rnd` = 1..n. JS `rnd` de `rng.js` doit être 1..11 pas 0..10. Si `rnd` JS est 0-based, `case 0` tombe default immédiat (aucun strip) trop souvent, `case 11` jamais. **Hypothèse à tenir : `rnd` déjà aligné C ailleurs.** Fortress RNG 100% suggère que oui.

Helpers Blind / Blind_telepat / See_invisible / Hallucination **locaux** dans `sit.js` : duplication vs `youprop` JS. SEE_INVIS strip : C `You("%s!", …)` ajoute `!` ; JS `pline('You thought you saw something!')` — même caractère.

## `set_uasmon`

`set_ulycn` → `set_uasmon` pour FROM_LYCN. Si `set_uasmon` JS ne pose pas `Drain_resistance` lycan, l’infection est un int `ulycn` cosmétique. D-log : « Updates u.ulycn then set_uasmon so Drain_resistance FROM_LYCN tracks » — **prétention** sur un callee non montré dans le diff (import seulement). Non vérifié ici.

## Journal rotation i1213

+61 lignes archive, −70 journal live. Bruit. Ne pas le compter comme preuve eat. Le live journal du cluster : green+eat/role 12/12.

## Risques / dette
1. **`retouch_equipment(2)` absent** après `set_ulycn` — C toujours.
2. **`display_nhwindow(WIN_MAP,TRUE)` → `more()`** — input/écran.
3. `eatmupdate` hallu pendant mimicry.
4. `set_mimic_blocking` sur SEE_INVIS strip.
5. `curs_on_u` omis.
6. `dosit` n’appelle toujours pas `attrcurse` (trône C).
7. `set_uasmon` FROM_LYCN non relu ; `mlet` / `ORANGE` glyphe.
8. `rnd(11)` 1-based : dépend de `rng.js`.

## Extraots C were / mimic / attrcurse

```232:237:nethack-c/upstream/src/were.c
void
set_ulycn(int which)
{
    u.ulycn = which;
    set_uasmon();
}
```

C après le switch, **toujours** `retouch_equipment(2)` si lycan :

```1323:1326:nethack-c/upstream/src/eat.c
    if (ismnum(catch_lycanthropy)) {
        set_ulycn(catch_lycanthropy);
        retouch_equipment(2);
    }
```

Mimic tmp FALLTHROUGH C :

```1184:1193:nethack-c/upstream/src/eat.c
    case PM_GIANT_MIMIC:
        tmp += 10;
        FALLTHROUGH;
    case PM_LARGE_MIMIC:
        tmp += 20;
        FALLTHROUGH;
    case PM_SMALL_MIMIC:
        tmp += 20;
        if (gy.youmonst.data->mlet != S_MIMIC && !Unchanging) {
```

`eatmdone` C (reset apparence si **n’importe quel** `U_AP_TYPE`, pas seulement gold) :

```163:176:nethack-c/upstream/src/eat.c
eatmdone(void)
{
    if (ge.eatmbuf) {
        if (gn.nomovemsg == ge.eatmbuf)
            gn.nomovemsg = 0;
        free((genericptr_t) ge.eatmbuf), ge.eatmbuf = 0;
    }
    if (U_AP_TYPE) {
        gy.youmonst.m_ap_type = M_AP_NOTHING;
        newsym(u.ux, u.uy);
    }
    return 0;
}
```

`attrcurse` tête C :

```644:655:nethack-c/upstream/src/sit.c
attrcurse(void)
{
    int ret = 0;
    switch (rnd(11)) {
    case 1:
        if (HFire_resistance & INTRINSIC) {
            HFire_resistance &= ~INTRINSIC;
            You_feel("warmer.");
            ret = FIRE_RES;
            break;
        }
        FALLTHROUGH;
```

JS `sit.js` `export async function attrcurse` : même `rnd(11)` + FALLTHROUGH commentés. `await You_feel` / `pline` n’ajoutent pas de RNG. SEE_INVIS C `set_mimic_blocking()` entre `HSee_invisible &= ~INTRINSIC` et `see_monsters` — JS saute l’appel, garde see_monsters/newsym.

Tête `cpostfx` D-0945 : `if (game.eatmbuf) eatmdone();` aligne C `eat.c:1137`. Absent en D-0943.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note /10 : **7.5**
- Une phrase : were/mimic/`rnd(11)` sont branchés dans le bon `case` avec les bons `tmp` 50/40/20, mais vendre ça comme « remaining specials » alors que `retouch_equipment` et la fenêtre carte C sont stubbés, c’est un cluster fini en docs et partiel en C.
