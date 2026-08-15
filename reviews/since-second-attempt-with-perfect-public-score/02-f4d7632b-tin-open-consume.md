# Review 02 — `f4d7632bcf74769163f1297cd9bc6102f71a0385` — TIN open/consume + rations multi-tour

## Métadonnées
- Hash complet / court : `f4d7632bcf74769163f1297cd9bc6102f71a0385` / `f4d7632b`
- Parent : `8f96d5b67b1c1103ecf1b541bd1a1635f3c32f1a`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 21:47:35 +0200
- D-id : **D-0935**
- Stats : 11 files, +599/−79 (dont `js/` : 3 files, +512/−26)
- Fichiers JS / map / cadence : `js/eat.js`, `js/attrib.js`, `js/potion.js` ; `docs/c-js-map/debt.md` + `turns.md` ; journal #1203 ; pas de suite cadence (reste 44/44 @#1200).

## Intention vs livrable
Promet : porter `start_tin` / `opentin` / `consume_tin` plus `gainstr` et `make_vomiting` / `make_glib`, et cesser de stubber les tins et la nourriture `reqtime>1`.

Livrable réel :
- **Tins** : port substantiel (`tintxts`, `tin_variety`, occupation, consume meat/spinach).
- **Rations multi-tour** : ce n’est **pas** un port. Suppression du garde `otyp !== CORPSE && reqtime > 1 → "not implemented yet"` pour laisser `start_eating` / `eatfood` déjà présents. Le D-log le dit (« enable via existing eatfood ») ; le titre de commit **survend**.
- **Pas `is_edible` poly** : le diff ne touche pas les prédicats metallivore/ghoul/cube. Correct pour ce cluster (D-0936 le fera).

Écarts : `costly_tin` identité ; `cprefx` no-op alors que `consume_tin` l’appelle ; `b_trapped` partiel (kaboom+`losehp` sans wake/stun/half-phys). Nommés dans le D-log — mais le statut **fixed** reste trop fort pour un consume encore branché sur des no-ops.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/eat.js` | Port C `start_tin`/`opentin`/`consume_tin`/`tin_variety`/`use_up_tin` ; destub rations ; helpers locaux (`cantwield`, `the_unique_pm`, `yobjnam` subset) |
| `js/attrib.js` | Port C `gainstr` |
| `js/potion.js` | Port C `make_vomiting` / `make_glib` (inventory polish différé) |
| `docs/c-js-map/debt.md` | Retire TIN+rations ; nomme `costly_tin` / `use_tin_opener` / `cprefx` |
| `docs/c-js-map/turns.md` | Touche mineure |
| D-INDEX/LOG, CURRENT, NOTES, journal, archive | Cadence docs D-0935 |

## Fidélité C ↔ JS

### `tin_variety` — C `eat.c:1489` / JS `eat.js:tin_variety`
Branches portées, **ordre C** : `spe==1` → SPINACH ; `cursed` → ROTTEN ; `spe<0` → `-(spe)-1` ; sinon `rn2(TTSZ-1)` ; puis homemade→rotten `!displ && !blessed && !rn2(7)` ; puis lizard `nonrotting_corpse` remap ROTTEN→HOMEMADE.

RNG : `rn2(TTSZ-1)` puis éventuellement `rn2(7)`. Clang LTR respecté (appels séquentiels, pas d’arguments imbriqués). `TTSZ` = longueur de `tintxts` avec sentinelle vide — aligné sur C `SIZE(tintxts)`.

### `start_tin` — C `eat.c:1723` / JS `eat.js:start_tin`
Branches portées : metallivore `tmp=0` ; `cantwield` early-return ; blessed `rn2(2)` sauf opener béni ; `switch(uwep.otyp)` opener `rn2(cursed?3:!blessed?2:1)`, dagues 3, hache/pick 6 ; `no_opener` glib `splitobj`+`dropx`/`stackobj` ; sinon `rn1(1+500/(DEX+STR), 10)`.

Écarts concrets :
- `yobjnam(uwep, NULL)` C vs `` `your ${xname(obj)}` `` — possessif/béni/plus absents.
- `fingers_or_gloves(FALSE)` : JS ignore `_capitalize`.
- `set_occupation(opentin, "opening the tin", 0)` : JS omet le 3ᵉ arg C (0) — dépend de `set_occupation` JS.
- Early-return `cantwield` / glib : C `start_tin` puis `return ECMD_TIME` dans `doeat` **quand même**. JS `doeat` `return 1` après `start_tin` — **fidèle** (tour consommé sans ouvrir).

Callers : `doeat` TIN branché (stub retiré). `use_tin_opener` **non** — apply reste « don't know how to use that » (D-0940).

### `opentin` — C `eat.c:1703`
`usedtime++ >= 50` post-inc, puis `< reqtime` continue, sinon `consume_tin("You succeed…")`. JS incrémente puis compare — même sémantique. Garde `carried` / `obj_here` / `can_reach_floor` portée.

### `consume_tin` — C `eat.c:1528` / JS `eat.js:consume_tin`
Porté : `tin_variety(tin,FALSE)` ; piège `otrapped \|\| (cursed && r!=HOMEMADE && !rn2(8))` **brûle le rn2** ; vide `NON_PM` + hallu `rn2(2)` ; smell + `y_n` ; `eating_conducts` ; homemade `nutamt = min(tintxt.nut, cnutrit)` ; metallivore `+5` ; greasy `rn1(11,5)` ; spinach nutrition `600 / 400+rnd(200) / 200+rnd(400)` ; `gainstr(tin,0,FALSE)`.

Écarts **branch-par-branch** :
- **Piège** : C `b_trapped("tin", NO_PART)` (wake, `Maybe_Half_Phys`, exercise, stun). JS inline `rnd(5+(lvl<5?lvl:2+lvl/2))` + `pline('KABOOM!!  The tin was booby-trapped!')` + `losehp` **sans** half-phys, wake, STR/CON, `make_stunned`. Le D-log dit « b_trapped subset » — c’est un **autre** kaboom, pas `trap.c`.
- **`cprefx` / `cpostfx`** : C les appelle après `costly_tin(COST_OPEN)` (cockatrice tin → pierre). JS appelle un `cprefx` **no-op** (`async function cprefx(_mnum) { // no-op }`). Manger un tin de cockatrice ne pétrifie pas encore. Nommés « full cprefx » — le consume **fait semblant** d’être branché.
- **`costly_tin`** : C split `quan>1` + `costly_alteration`. JS `return game.context?.tin?.tin` — identité. Magasin : jamais facturé.
- **Spinach cursed** : C `hcolor(NH_GREEN)` (hallu). JS `'green'` littéral.
- **Popeye** : C `!Fixed_abil ? "Popeye" : female ? "Olive Oyl" : "Bluto"`. JS toujours Popeye. Nommé.
- **`use_up_tin`** : C `carried ? useup : useupf(tin,1)`. JS `useup` des deux côtés ; le `useup` local d’`eat.js` a déjà un bras floor type `useupf` — pas un no-op, mais le commentaire « floor path via useup's OBJ_FLOOR arm » masque le 1:1.

### `gainstr` — C `attrib.c:203` / JS `attrib.js:gainstr`
`incr==0` : `ABASE<18` → `rn2(4)?1:rnd(6)` ; `<STR18(85)` → `rnd(10)` ; sinon 1. Puis `adjattrib(A_STR, cursed?-num:num, givemsg?-1:1)`. RNG et ordre identiques. Callers : spinach `gainstr(tin,0,false)` — branché.

### `make_vomiting` / `make_glib` — C `potion.c:243` / `461`
Vomiting : `Unaware` coupe `talk` ; `set_itimeout` ; clear-talk seulement si `!xtime && old && talk`. Fidèle.
Glib : `botl` sur transition ; **pas** `update_inventory()` si `uarmg`. Nommé.

Callers `cprefx`/`cpostfx` tin : **non branchés** (stubs). Occupation `opentin` : branchée via `set_occupation`.

## Constitution / playbook
Grep du diff JS : pas de `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `fs`, `node:`, `fastforward`, coords/seeds en contrôle. Frozen intacts. `await` sur `pline`/`yn_function`/`adjattrib` — pas d’await hors `nhgetch` inventé. Rule #2 RAS.

1:1 : `gainstr` dans `attrib.js`, potions dans `potion.js` — correct. Helpers `the_unique_pm` / `yobjnam` **dupliqués en local** dans `eat.js` au lieu d’`objnam.js`.

## Densité (§2b)
Right size. ~512 LOC JS, un locus famille (`start_tin`→`opentin`→`consume_tin` + 3 helpers). Pas `is_edible`. Le destub rations est un sibling légitime du même `doeat`, pas un second sous-système.

Pas too small (ce n’est pas un `if` isolé). Pas too big.

## Documentation
D-0935 **fixed** + deferrals `costly_tin`, `use_tin_opener`, Fixed_abil, b_trapped wake/stun, full `cprefx`. Honnête sur la liste, **trop « complete »** sur le statut : `consume_tin` appelle encore un no-op pour les effets cadavre.
`debt.md` nomme les restes. NOTES 55 lignes. CURRENT Keep D-0935 « do not re-stub ».
Titre commit vs D-log : rations = destub, pas port.

## Vérification
Journal : « green+strict PASS ; eat cohort 15/15 (1800/0016/0105) ». Pas de transcript de commande dans le commit. Forteresse non re-mesurée (cadence @#1205). Affirmation, pas artefact. Cohort eat est le bon sous-système.

## Preuves C supplémentaires

`tintxts[]` C (`eat.c:143`) : rotten −50, homemade 50 fodder, french fried greasy, …, pureed 500, sentinelle `""`. JS copie les 16 lignes. Un décalage d’index casserait `HOMEMADE_TIN`/`ROTTEN_TIN`/`SPINACH_TIN` (constantes `const.js`). Pas d’écart observé.

`start_tin` opener béni : C `tmp = rn2(uwep->cursed ? 3 : !uwep->blessed ? 2 : 1)` — `rn2(1)` toujours 0, ouverture immédiate. JS identique. Blessed tin sans opener : `rn2(2)` puis soit « opens like magic » (`consume_tin` immédiat) soit « seems easy to open » + occupation 1 tour. Interruption + retry re-tire `rn2(2)` — C documente le non-déterminisme ; JS aussi (pas de mémorisation du delay).

`opentin` : C `if (usedtime++ >= 50)` — la 50ᵉ incrémentation abandonne. JS `usedtime = usedtime+1; if (usedtime >= 50)`. Premier tick : C usedtime passe 0→1, compare 0>=50 faux ; JS 1>=50 faux. Au tick où usedtime devient 50 : les deux abandonnent. OK.

`consume_tin` empty tin hallu : C `rn2(2) ? "air elemental souffle" : "dehydrated water"`. JS identique. Metallivore `always_eat` : skip smell/yn, `lesshungry(5)` sur vide. JS `metallivorous(hero_form_data())`. Si la forme n’est pas à jour, un mole mange le yn — faux positif d’occupation.

`eating_conducts` : C food/unvegan/unvegetarian + livelog. JS incrémente sans livelog (nommé). Appelé **après** le yn meat, **avant** `cprefx` — ordre C.

`doeat` TIN **avant** le conduct KMH du chemin food : C aussi (`start_tin` puis return, conduct dans `consume_tin`). JS D-0935 place TIN avant le bloc conduct cookie/ration. Fidèle. Au D-0936, worn/slow/nonfood s’inséreront **avant** TIN — alors aligné sur `eat.c:2867–2958`.

Destub `reqtime>1` : l’ancien garde évitait `start_eating` pour apple/ration multi-bite. `eatfood` occupation existait pour CORPSE. Activer le même occupation pour `FOOD_RATION` est le C (`reqtime` calculé plus haut dans `doeat`). Ce n’est pas « porter eatfood » ; c’est cesser de mentir. Le titre « Port … and multi-turn rations » reste trop large.

Helpers locaux :
- `cantwield` = `nohands \|\| verysmall` — macro `mondata.h`. OK.
- `the_unique_pm` : G_UNIQ, exceptions high priest / worm-tail / Wizard — C `objnam.c`. Porté pour l’article « the » du smell. Hors tin unique, peu exercé.
- `carried` / `obj_here` : invent includes / pile `nexthere`. OK.
- `yobjnam` : sous-ensemble dangereux si l’arme a un artifact name.

`losehp` du kaboom tin est **sync** (`hack.js`). Pas de bug await. Le bug est sémantique (pas `b_trapped`).

`make_glib` : C `disp.botl |= (!Glib ^ !!xtime)` puis timeout puis `if (uarmg) update_inventory()`. JS timeout + botl sur `was!==now`. Gants « slippery » dans l’inventaire : pas mis à jour. Held-out visuel.

## Callers non branchés
- `use_tin_opener` / `apply.c` `TIN_OPENER` — D-0940.
- `set_tin_variety` / `tin_details` / `tin_variety_txt` — wish/xname tin. Non portés. Un tin wishé `spe` déjà négatif passe par `spe<0` dans `tin_variety` (pas de `rn2`) — le chemin display `displ=TRUE` n’est jamais appelé (JS n’a pas `tin_details`).
- `cprefx` réel — D-0939. Ici l’appel existe, le corps non.

## Risques / dette
1. `cprefx` no-op derrière un appel réel → tin petrify/cannibal/slime absents jusqu’à D-0939 ; le RNG du consume avance sans ces effets.
2. `costly_tin` identité → tins unpaid gratuits (D-0940).
3. Kaboom tin ≠ `b_trapped` (half-phys / wake / stun) — D-0938.
4. `hcolor` spinach + `yobjnam` + `Fixed_abil` : écrans held-out.
5. `use_tin_opener` non câblé : apply TIN_OPENER toujours stub.
6. `the_unique_pm` / `yobjnam` dupliqués : drift vs `objnam.js`.
7. Destub rations : si `start_eating` a des bras CORPSE-only non lus, une ration `reqtime>1` peut encore diverger (choke messages nommés ailleurs dans eat.js).

## Extraite C — `tin_variety` + piège + spinach nutrition

```1488:1512:nethack-c/upstream/src/eat.c
staticfn int
tin_variety(struct obj *obj, boolean displ)
{
    int r, mnum = obj->corpsenm;
    if (obj->spe == 1) {
        r = SPINACH_TIN;
    } else if (obj->cursed) {
        r = ROTTEN_TIN;
    } else if (obj->spe < 0) {
        r = -(obj->spe);
        --r;
    } else {
        r = rn2(TTSZ - 1);
    }
    if (!displ && r == HOMEMADE_TIN && !obj->blessed && !rn2(7))
        r = ROTTEN_TIN;
    if (r == ROTTEN_TIN && (ismnum(mnum) && nonrotting_corpse(mnum)))
        r = HOMEMADE_TIN;
    return r;
}
```

JS D-0935 recopie ce graphe. Le `rn2(7)` homemade et le remap lizard sont les deux RNG de variété. Confirmé présents.

```1536:1541:nethack-c/upstream/src/eat.c
    r = tin_variety(tin, FALSE);
    if (tin->otrapped || (tin->cursed && r != HOMEMADE_TIN && !rn2(8))) {
        b_trapped("tin", NO_PART);
        tin = costly_tin(COST_DSTROY);
        use_up_tin(tin);
        return;
    }
```

JS brûle `!rn2(8)` puis un kaboom maison, **pas** `b_trapped`. `costly_tin(0)` no-op. C’est l’écart le plus cher du commit : un tin piégé n’a ni half-phys, ni stun, ni facture destroy.

```1686:1694:nethack-c/upstream/src/eat.c
        gainstr(tin, 0, FALSE);
        tin = svc.context.tin.tin = costly_tin(COST_OPEN);
        nutamt = (tin->blessed ? 600
                  : !tin->cursed ? (400 + rnd(200))
                    : (200 + rnd(400)));
        if (always_eat)
            nutamt += 5;
        use_up_tin(tin), tin = NULL;
        lesshungry(nutamt);
```

JS : mêmes `rnd(200)`/`rnd(400)` **après** `gainstr` (qui a déjà pu tirer `rn2(4)`/`rnd(6)`/`rnd(10)`). Ordre clang : gainstr RNG puis nutrition RNG — JS séquentiel identique. `costly_tin` C peut `splitobj` **entre** gainstr et le test `tin->blessed` ; si le split copie mal `blessed`, la nutrition change. JS identité : pas de split, `tin` est le même pointeur. Moins de bugs split, plus de tins unpaid gratuits.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : `tin_variety`/`start_tin`/`opentin` suivent l’ordre des `if` et des `rn2` de `eat.c`, mais `consume_tin` est vendu « porté » tout en déléguant petrify/shop/trap à des no-ops et en réduisant les rations multi-tour à un destub.
