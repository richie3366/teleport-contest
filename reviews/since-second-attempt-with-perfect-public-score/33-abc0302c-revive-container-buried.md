# Review 33 — `abc0302c` — revive container/buried + `cant_revive`

## Métadonnées
- Hash complet / court : `abc0302c0b01867d377a37fbaa01bbb95bfed1e9` / `abc0302c`
- Parent : `e3c6cff4e55fa380ef92a89f438f7b9a10eca25c`
- Auteur, date : Raphaël Hervier, 2026-07-22T00:31:48+02:00
- D-id : **D-0964**
- Stats : 9 files, +350/−77
- Fichiers JS / map / cadence : `js/zap.js` (+279), `js/mkobj.js` (+17) ; `docs/c-js-map/debt.md` ; pas de cadence (prochain @#1235)

## Intention vs livrable
Le message : « Port revive container/buried and cant_revive under fortress (D-0964) ». Promet de retirer la dette zap nommée : cadavres contenus/enterrés, portes nesting/lock/BoH/statue, zombie buried dig-out, remaps `cant_revive`.

Le diff le fait, dans cet envelope. `revive` n’est plus un early-return `null` sur `OBJ_CONTAINED`/`OBJ_BURIED`. Helpers C-shaped (`cant_revive`, `get_obj_location_zap`, `get_container_location`, `zombie_can_dig`, `is_reviver`, `unique_corpstat`) + bras extract `OBJ_BURIED` + export `eaten_stat`.

Le D-log dit « fixed » pour **ce** cluster, tout en listant `montraits`/`omonst`/ghost/`stolen_value`/`cant_finish_meal`/Rider `delobj_core`. Ce n’est pas un overclaim « revive complete ». D-0982 (plus tard, hors revue) confirmera que le bras `OMONST` de **ce** commit est un `makemon` plat — palier assumé, nommé.

Pas de mélange cadence+port. D-id présent. Titre aligné avec le diff.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/zap.js` | Port C : `is_reviver`, `unique_corpstat`, `cant_revive`, `get_obj_location_zap`, `get_container_location`, `zombie_can_dig`, `obfree_corpse`, expansion `revive` |
| `js/mkobj.js` | Wiring : export `eaten_stat` ; bras `OBJ_BURIED` de `obj_extract_self` |
| `docs/c-js-map/debt.md` | Docs : retire container/buried/`cant_revive` de la ligne zap ; laisse montraits/ghost/shop |
| `docs/DIVERGENCE-LOG.md` / INDEX | D-0964 fixed + deferrals honnêtes |
| `docs/CURRENT.md` / `NOTES.md` | Next cluster ice/burn ; keep D-0964 |
| journal + rotate | Preuve green+cohort ; pas de suite 44/44 |

## Fidélité C ↔ JS

### `is_reviver` / `unique_corpstat` — `mondata.h` → `js/zap.js`
C `is_reviver` : `is_rider(ptr) || ptr->mlet == S_TROLL`. JS : `is_rider(ptr) || ptr.mlet === 'S_TROLL'`. Convention JS du port (`monsters.js` stocke `mlets[mndx]` comme token `'S_TROLL'`, pas le caractère `'T'`). **Confirmation** : même test que `js/mhitm.js` / `js/mkobj.js`. Pas un écart de type.

C `unique_corpstat` : `ptr && (ptr->geno & G_UNIQ)`. JS : `ptr && (ptr.geno & G_UNIQ)`. Identique.

### `cant_revive` — `read.c:3112` → `js/zap.js:cant_revive`
C (ordre exact) : `PM_GUARD` ; `(PM_SHOPKEEPER && !revival)` ; `PM_HIGH_CLERIC` ; `PM_ALIGNED_CLERIC` ; `PM_ANGEL` → `*mtype = PM_HUMAN_ZOMBIE` ; `PM_LONG_WORM_TAIL` → `PM_LONG_WORM` ; `unique_corpstat && (!from_obj || !has_omonst(from_obj))` → `PM_DOPPELGANGER`.

JS reprend les mêmes `if` dans le même ordre. `revival=true` depuis `revive`. `OMONST(from_obj)` (oextra.omonst) joue le rôle de `has_omonst`. Appel via `{ mtype }` pour mimer `int *`. **Confirmation branch-par-branch.**

Shopkeeper revival (`!revival`) n’est pas exercé ici (`create_particular` hors cluster). Statue `trap.c` n’importe pas `cant_revive` — dette map inchangée, pas un mensonge du titre.

### `get_obj_location` — `zap.c:654` → `get_obj_location_zap`
C switch : `OBJ_INVENT` (`u.ux/uy`) ; `OBJ_FLOOR` (`ox/oy`) ; `OBJ_MINVENT` (`ocarry.mx/my`) ; `OBJ_BURIED` si `BURIED_TOO` ; `OBJ_CONTAINED` si `CONTAINED_TOO` récursif sur `ocontainer` ; sinon false.

JS : même switch. **Écart :** dans `revive`, hors `OBJ_CONTAINED`, JS court-circuite encore :

```js
if (corpse.where === OBJ_INVENT
    || (game.invent || []).includes(corpse)) {
    x = u.ux; y = u.uy;
} else {
    const loc = get_obj_location_zap(corpse, is_zomb ? BURIED_TOO : 0);
    ...
}
```

C n’a que `get_obj_location(corpse, &x, &y, locflags)`. Le `.includes` est un workaround `where` mal tagué, **absent du C**. Sur objets correctement taggés, l’ordre des bras C est respecté. Sur invent orphelin (`where` faux, encore dans le tableau), JS revive comme invent ; C raterait la localisation (`!x`). Divergence défensive, pas une fidélité.

### `get_container_location` — `zap.c:841`
C :

```c
while (obj && obj->where == OBJ_CONTAINED) {
    *container_nesting += 1;
    obj = obj->ocontainer;
}
if (obj) {
    loc = obj->where;
    if (loc == OBJ_MINVENT) *mon = obj->ocarry;
}
```

JS identique. `revive` passe `corpse.ocontainer` (pas le cadavre) : nesting **ne compte pas** le cadavre lui-même, comme C. Seuil `nesting > 2` ⇒ 3+ contenants autour du cadavre. Carrier MINVENT : `ocarry`. **Confirmation.**

### `zombie_can_dig` — `zap.c:863`
`!isok` → false ; `t_at` → false ; `typ==ROOM || typ==CORR || typ==GRAVE` → true. JS identique. Pas de RNG. **Confirmation.**

### `revive` — `zap.c:884` → `js/zap.js:revive`

C ouvre par :

```c
    cant_finish_meal(corpse);

    x = y = 0;
    if (corpse->where != OBJ_CONTAINED) {
        int locflags = is_zomb ? BURIED_TOO : 0;
        container = 0;
        (void) get_obj_location(corpse, &x, &y, locflags);
    } else {
        container = corpse->ocontainer;
        carrier = get_container_location(container, &holder, &container_nesting);
        ...
    }
```

**Porté, ordre C (après le repas) :**
1. `otyp!=CORPSE` / `!ismnum(corpsenm)` → null (JS silencieux vs C `impossible` — early-return non-C, sans RNG).
2. `is_zomb = S_ZOMBIE || (OBJ_BURIED && is_reviver)` — même formule, donc troll/Rider buried est `is_zomb` pour `BURIED_TOO` + `zombie_can_dig`.
3. Localisation : non-contained → `BURIED_TOO` si zomb ; contained → `get_container_location` + switch MINVENT/INVENT/FLOOR+`CONTAINED_TOO`.
4. `ox/oy` si `x`.
5. Échec si `!x` **ou** container `olocked` / `nesting>2` / STATUE / `(BAG_OF_HOLDING && rn2(40))` **ou** zomb buried `!zombie_can_dig`. **RNG :** `rn2(40)` au même point, clang LTR (`otyp` d’abord, puis `rn2`). Pas de `rn2` inventé sur le `default` panic C.
6. `enexto` si `MON_AT` (préexistant).
7. `norevive` / eel hors pool → null (twitch pline préexistant).
8. Gender `CORPSTAT_*` → `MM_MALE`/`MM_FEMALE`. `mmflags` **sans** `MM_NOCOUNTBIRTH` sur le bras `cant_revive`, **avec** sur les deux autres — conforme C (`mmflags | MM_NOCOUNTBIRTH` seulement hors cant_revive).
9. `cant_revive` → makemon remap ; free omid/omonst ; doppel `newcham(mtmp, mptr, 0)` ; zombie `mhp=mhpmax=100` + MFAST. C : `mon_adjust_speed(mtmp, 2, NULL)`. JS pose `permspeed`/`mspeed = MFAST` sans helper — mêmes bits, **pas** les plines speed.
10. `oname` si `!unique_corpstat` ; `oeaten` → `eaten_stat` ; `mrevived=1`.
11. Consume : INVENT `useup` ; FLOOR `delobj` ; MINVENT `m_useup` ; CONTAINED extract+obfree ; BURIED zomb extract+obfree.

C consume (`zap.c` après `mrevived=1`) :

```c
    switch (corpse->where) {
    case OBJ_INVENT: useup(corpse); break;
    case OBJ_FLOOR: delobj_core(corpse, TRUE); break;
    case OBJ_MINVENT: m_useup(corpse->ocarry, corpse); break;
    case OBJ_CONTAINED: obj_extract_self(corpse); obfree(corpse, NULL); break;
    case OBJ_BURIED: obj_extract_self(corpse); obfree(corpse, NULL); break;
    default: panic("revive");
    }
```

JS : INVENT `useup` ; FLOOR `delobj` (pas `delobj_core(,TRUE)`) ; MINVENT `m_useup` ; CONTAINED/BURIED extract+`obfree_corpse`. **Confirmation** de la structure du switch ; **écart** Rider force + panic vs no-op.

**Sauté (nommé D-log / header `revive`) :**
- `cant_finish_meal(corpse)` **avant** la localisation (`zap.c:909`). C annule le repas même si revive échoue ensuite. JS ne l’appelle pas → occupation eat peut survivre un revive raté. Pas de RNG dans ce helper, mais sémantique repas.
- Bras `has_omonst` : C `montraits` + `wary_dog`. JS :

```js
} else if (OMONST(corpse)) {
    // C: montraits(...) — deferred (no oextra.omonst)
    mtmp = await makemon(mptr, x, y, mmflags | MM_NOCOUNTBIRTH);
} else {
    mtmp = await makemon(mptr, x, y, mmflags | MM_NOCOUNTBIRTH);
}
```

Les deux bras sont **identiques**. Branche morte. Unique **avec** omonst : C `cant_revive` est false (`has_omonst`) puis revive via traits ; JS `cant_revive` false puis `makemon` de l’espèce unique — faux jusqu’à D-0982.
- Ghost `has_omid` recorporealize (invent ghost, `tamedog`, `mongone`).
- Shop `stolen_value` (`by_hero` + `costly_spot`).
- FLOOR : C `delobj_core(corpse, TRUE)` force Rider ; JS `delobj` peut refuser. Nommé « Rider delobj_core force ».
- `default` : C `panic` ; JS no-op volontaire (évite un `delobj` RNG inventé). Correct pour un port, mais un `where` inattendu laisse le cadavre.

### `obj_extract_self` OBJ_BURIED — `mkobj.c:2582` → `js/mkobj.js`
C : `extract_nobj` sur `buriedobjlist`. JS : unlink head / walk `nobj`. Pas de `obj_timer_checks` (C non plus : timers ice = `remove_object` floor only). **Callers branchés :** `revive` CONTAINED/BURIED via extract+obfree.

### Callers
`unturn_dead` / autres `revive` existants bénéficient du nouvel envelope sans nouveau wiring. `cant_revive` n’est pas exporté vers `create_particular` / statue (`trap.c`) — hors cluster, dette map inchangée.

## Constitution / playbook
Grep JS du commit (`git show abc0302c -- js/`) : pas de `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward`, coordonnées/seeds en contrôle. Frozen (`isaac64.js`, `terminal.js`, `storage.js`) non touchés. Rule #2 OK.

`revive` déjà `async` (nhgetch via pline/makemon) — pas de nouvel await hors gameplay input. Modules 1:1 : helpers `zap.c` dans `zap.js` ; `cant_revive` vit en C dans `read.c` — colocation JS dans `zap.js` (seul caller porté) justifiable, à noter. Pas d’entrée `js/fastforward.js`. Pas de filet d’alignement / sparse frames.

Gender : C `CORPSTAT_GENDER` / `CORPSTAT_MALE` / `CORPSTAT_FEMALE` → `MM_MALE`/`MM_FEMALE`. JS copie les masques. `oeaten` via `eaten_stat` exporté de `mkobj.js` (C `mkobj.c`) — wiring caller/callee, pas un stub.

Omissions nommées dans le header `revive` + `debt.md`. **RAS** constitution après grep.

## Densité (§2b)
Right size. Une famille caller/callee : localisation + gates + remap + consume. ~279 lignes `zap.js` + 17 `mkobj.js`. Pas un `if` isolé. Pas de mélange ice/ring/pray. Le palier `OMONST` (makemon jumeau) n’est pas un shim docs-only : les gates contained/buried sont du C réel.

## Documentation
D-0964 « fixed » porte sur container/buried/`cant_revive`/`zombie_can_dig`/extract buried — **vrai**. Deferrals listés (montraits, ghost, shop, meal, Rider, ice). `debt.md` retire le bullet container et **garde** montraits/ghost/stolen_value. CURRENT/NOTES : next = ice melt. Pas d’overclaim « complete revive ». D-0982 prouvera que le D-log avait raison de nommer omonst.

## Vérification
Journal `#1234 D-0964` : green+strict ; zap/shared **16/16** (seed2200 wizard, seed0016 healer zap). « Fortress held (no full cadence ; next @#1235) ». Pas de `sessions` 44/44 dans ce commit — affirmation de forteresse, pas de preuve cadence. Cohorte zap pertinente pour revive (wizard/healer touchent `revive`/`unturn_dead`). Pas de focused session citée nommément hors green.

La forteresse publique casse plus tard (#1270 = 43/44, seed0009) — **pas causée par D-0964** ; à noter comme contexte de fenêtre, pas comme régression de ce hash.

## Risques / dette
1. **OMONST / `montraits`** — branche JS morte ; unique+omonst faux. Payé en D-0982, donc ce commit est un palier, pas revive-traits.
2. **`cant_finish_meal` absent** — repas vs revive raté (C le fait toujours, avant `x,y`).
3. **Invent `.includes` avant `get_obj_location`** — divergence `where`.
4. **Rider floor `delobj` vs `delobj_core(,TRUE)`**.
5. **Statue / `create_particular` `cant_revive`** non branchés.
6. Shop glow / `stolen_value` `by_hero` (RNG/pline si hero revive en boutique).
7. `mon_adjust_speed` stubbé en bits MFAST sans messages.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : le cluster container/lock/BoH/`cant_revive`/zombie-dig est fidèle (gates + `rn2(40)`), mais le `else if (OMONST)` est un `makemon` jumeau du `else` — D-0964 « fixed » ne porte pas les traits, D-0982 le dira.
