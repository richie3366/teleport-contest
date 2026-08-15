# Review 15 — `3b2f75a4` — zap_over_floor shop door/bars + dobuzz pay (D-0948)

## Métadonnées
- Hash complet / court : `3b2f75a4a08d868057aca477595b035d4f06820b` / `3b2f75a4`
- Parent : `9fc68ca2be157a4087f64eb660a21a9a9561c448`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:00:46 +0200
- D-id : **D-0948**
- Stats : 8 files, +264 / −48
- Fichiers JS / map / cadence : `js/zap.js` +236, `js/lock.js` export `picking_at`/`reset_pick` ; pas de full sessions (next #1220)

## Intention vs livrable
Promet : destruction ray de portes/barreaux boutique → `add_damage` + `dobuzz` `pay_for_damage` via `shopdamage`. Diff : `zap_over_floor` n’est plus un stub fire-pool/gas ; door/SDOOR/bars + out-param `{v}` ; trailing pay dans `dobuzz`. Aligné. Ice/fountain/WEB/POOL→PIT **restent** omis (nommés).

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/zap.js` | Port C `zap_over_floor` door/bars + `dobuzz` pay strings |
| `js/lock.js` | Wiring : `picking_at` / `reset_pick` pour occupation picklock |
| map zap.js | D-0948 ; explode/apply encore deferred |
| D-log | green+zap/shop + seed0116/0398/0108 |

## Fidélité C ↔ JS

### `zap_over_floor` — C `zap.c:5141` / JS `zap.js:546`
Signature C : `(x,y,type, boolean *shopdamage, ignoremon, exploding_wand_typ)`. JS : `shopdamage` objet `{v}` (pas un bool JS muté). `PHYS_EXPL_TYPE === -1` early `return -1000` : match `hack.h`.

#### Bars `ZT_LIGHTNING`/`ZT_ACID` — C `zap.c:5344-5370`
C : lightning `rn2(10)` → break (rien) ; `wall_info & W_NONDIGGABLE` → message intact ; sinon `rangemod -= 3`, dissolve, shop `add_damage(..., type>=0 ? SHOP_BARS_COST : 0)` + `*shopdamage=TRUE` si `type>=0`.

JS : même `rn2(10)` lightning. Coût 300 = `SHOP_BARS_COST`. **Écart :** `rm_wall_info` = `(lev.wall_info\|0) \| (lev.flags\|0)`. C ne teste que `lev->wall_info`. Si `flags` partage des bits avec `W_NONDIGGABLE`, barreaux **indissolubles** à tort (rangemod/RNG de longueur de rayon).

#### SDOOR / porte — C `zap.c:5376-5487`
`yourzap` / `zapverb` bolt vs spell vs blast : JS `ZT_SPELL_0=10` = `ZT_SPELL(0)`. POT_OIL/SCR_FIRE : clear `exploding_wand_typ`, leave blast — C.

SDOOR : `cvt_sdoor_to_door` + recalc + newsym ; see → « Your/The {zapverb} reveals… » ; rogue → C `draft_message(FALSE)` vs JS `You_feel('a draft.')`. **Texte peut diverger** sur niveau rogue.

Porte fermée : `rangemod = -1000`. FIRE/COLD/DEATH-breath/LIGHTNING new_doormask. C DEATH non-breath : **`goto def_case`**. JS fallthrough `ZT_LIGHTNING` avec `if (damgtype===ZT_LIGHTNING)` skip puis `default` — **équivalent goto**.

`def_case` : WAN_STRIKING exploding → `D_BROKEN` « crashes open » ; else absorb / « remains intact » / vibrations. Shop : `type>=0` cost 400 + `shopdamage.v=true` ; monster `add_damage(...,0)`. `picking_at` → `stop_occupation` + `reset_pick`. **OK si `picking_at` est fidèle.**

#### Omis (nommés, mais impact RNG)
C ZT_FIRE : WEB burn, `melt_ice`, **POOL→ROOM + `maketrap(PIT)` + `rangemod -= 3`**, fountain `dryup`. JS garde le hissing/gas **sans** conversion POOL ni `rangemod -= 3`. Un rayon feu sur pool C est plus court / crée une fosse (RNG `maketrap`) ; JS continue. Dette **géométrie de buzz**, pas seulement cosmétique.

`burn_floor_objects` omis. `ignoremon` false → `wakeup(mon, type>=0)` ajouté — C.

### `dobuzz` pay — C `zap.c:5028-5035` / JS fin de `dobuzz`
C `boolean shopdamage` ; JS `{v:false}` initialisé (vu dans `dobuzz` courant). Strings : FIRE « burn away », COLD « shatter », ACID « damage », DEATH « disintegrate », else « destroy ». JS copie. `cant_mollify=false`.

**Call site C non porté :** `zap.c:4130` `bhit` `if (shopdoor) pay_for_damage("destroy")`. D-log ne le liste pas clairement (parle explode/apply/pickaxe). **Caller C encore mort.**

### `picking_at` — C `lock.c` / JS `lock.js`
JS : `occupation === picklock` et `xlock.door === lev`. C compare le `rm*` de la case. Fragile si `xlock.door` n’est pas la même référence d’objet cellule.

## Constitution / playbook
Grep JS : RAS FORCE/fs/fastforward. `zap_over_floor` pas encore exporté ici (D-0949 l’exporte). `await` messages / `pay_for_damage` / `wakeup`. Rule #2 RAS.

## Densité (§2b)
**Right size.** Un locus `zap_over_floor` + le trailing `dobuzz` qui en dépend. lock.js = callee C. Pas too-wide.

## Documentation
D-0948 nomme ice/WEB/POOL/fountain/`burn_floor_objects`/explode-apply. CURRENT keep. NOTES compacte la liste « don’t re-stub » (ellipsis) — moins de landmarks, OK Notes. Overclaim : « ray destruction of shop doors and iron bars bills » vrai **si** le rayon passe par `dobuzz`/`zap_over_floor`, pas via `bhit` missile.

## Vérification
Journal : green ; zap/shop 12/12 ; seed0116/0398/0108 PASS ; « fortress held (no full cadence) ». Plus honnête que #1210/#1215 : pas de faux 44/44 collé. Les trois seeds extra sont des extras shop, pas une preuve `rn2(10)` bars.

## `shopdamage` out-param

C `boolean *` ; `dobuzz` passe `&shopdamage`. JS `{ v: false }` muté. `zap_over_floor(..., shopdamage, ...)` : `if (shopdamage) shopdamage.v = true` — si un caller passe `undefined`, **pas de throw**, pas de bill. Avant D-0948 les args étaient `_shopdamage` ignorés. `dobuzz` doit construire l’objet (commit : oui). `ubuzz` / autres wrappers : s’ils appellent `dobuzz`, OK ; s’ils appelaient `zap_over_floor` direct avec `_`, encore morts.

`type >= 0` = faute du héros. Monster zap `type<0` : `add_damage(..., 0)` sans `shopdamage.v` — C. Pas de yn shk pour un dragon. **OK.**

## Door messages vs `You1` / `You_hear1`

C unseen FIRE : `You1("smell smoke.")` → « You smell smoke. » JS `pline(\`You ${sense_txt}\`)` avec `sense_txt = 'smell smoke.'` — même chose.

Unseen COLD : `You_hear1("a deep cracking sound.")`. JS helper `You_hear` = `pline('You hear '+line)` sauf si `Deaf()`. C `You_hear1` est déjà Deaf-aware. Si JS `You_hear` skip Deaf, **OK** ; si `Deaf` JS ≠ C `Deaf`, silence vs message.

See : `pline1(see_txt)` vs `pline(see_txt)` — pas de « The » ajouté (les see_txt C incluent déjà « The door … »). JS `pline(see_txt)`. **OK.**

## `rangemod` bars vs door

Bars : `-3` et le buzz **continue** (C). Door : `-1000` stop. JS door `-1000`. Bars `-3`. Lightning `rn2(10)` **break** sort du `case` bars, **pas** du door code plus bas — C `break` du `if (IRONBARS)` inner, puis `break` du switch damgtype, puis SDOOR/door **quand même**. JS `if (lightning && rn2(10)) break;` **dans** le case LIGHTNING/ACID : ce `break` sort du `switch (damgtype)` entier, puis exécute SDOOR/door. **Identique C** (le break bars n’empêche pas la porte). **OK — piège facile, ils ont bon.**

## `cvt_sdoor_to_door`

Rogue SDOOR : C note « except on rogue level » pour `closed_door` après convert. JS appelle `cvt_sdoor_to_door` + maybe « You feel a draft. » `Is_rogue_level`. Non relu `cvt_*`. Si rogue convertit en `DOOR` ouverte, `closed_door` faux — pas de destroy. C.

## `bhit` 4130

Missile / kick à travers une porte boutique : C `pay_for_damage("destroy")` **sans** passer par `dobuzz`. JS non. Wand directed = `dobuzz` (ce commit). Wand breaking = explode (D-0949). **Kick de porte = dokick D-0947, pas bhit.** Le trou restant est projectile/`bhitm` shopdoor.

## NOTES ellipsis

« Do not re-stub TIN … kick_door … or zap door/bars ». Compacte agressive (cap 100 lignes Notes). Landmarks drop D-0935/0936. Process Notes OK, un peu opaque pour le loop.

## Risques / dette
1. **`wall_info \| flags`** vs C `wall_info` seul — barreaux.
2. **POOL feu sans `rangemod -= 3` / PIT** — longueur de rayon.
3. **`bhit` `pay_for_damage("destroy")` non branché.**
4. `draft_message` rogue.
5. `picking_at` identité d’objet `rm`.
6. explode/apply encore (D-0949).
7. Callers `zap_over_floor` sans `{v}` : bill silencieuse.
8. WEB/ice/fountain toujours hors switch — `rangemod` fountain C `-1` absent.

## Extraots C `zap_over_floor` door / bars / dobuzz

```5344:5368:nethack-c/upstream/src/zap.c
    case ZT_LIGHTNING:
        FALLTHROUGH;
        /*FALLTHRU*/
    case ZT_ACID:
        if (lev->typ == IRONBARS) {
            if (damgtype == ZT_LIGHTNING && rn2(10))
                break;
            if ((lev->wall_info & W_NONDIGGABLE) != 0) {
                if (see_it)
                    Norep("The %s %s somewhat but remain intact.",
                          defsyms[S_bars].explanation,
                          (damgtype == ZT_ACID) ? "corrode" : "melt");
                /* but nothing actually happens... */
            } else {
                rangemod -= 3;
                if (see_it)
                    Norep("The %s %s.", defsyms[S_bars].explanation,
                          (damgtype == ZT_ACID) ? "corrode away" : "melt");
                dissolve_bars(x, y);
                if (*in_rooms(x, y, SHOPBASE)) {
                    add_damage(x, y, (type >= 0) ? SHOP_BARS_COST : 0L);
                    if (type >= 0)
                        *shopdamage = TRUE;
                }
            }
```

JS `rm_wall_info` (OR `flags` — pas C) :

```327:329:js/zap.js
function rm_wall_info(lev) {
    return ((lev.wall_info | 0) | (lev.flags | 0));
}
```

C door DEATH goto :

```5428:5435:nethack-c/upstream/src/zap.c
        case ZT_DEATH:
            if (abs(type) != ZT_BREATH(ZT_DEATH))
                goto def_case;
            new_doormask = D_NODOOR;
            see_txt = "The door disintegrates!";
            hear_txt = "crashing wood.";
            break;
```

`dobuzz` pay C :

```5028:5035:nethack-c/upstream/src/zap.c
    if (shopdamage)
        pay_for_damage(damgtype == ZT_FIRE ? "burn away"
                       : damgtype == ZT_COLD ? "shatter"
                         : damgtype == ZT_ACID ? "damage"
                           : damgtype == ZT_DEATH ? "disintegrate"
                             : "destroy",
                       FALSE);
```

`bhit` encore mort :

```4129:4130:nethack-c/upstream/src/zap.c
    if (shopdoor)
        pay_for_damage("destroy", FALSE);
```

POOL feu C (omis JS, **rangemod**) :

```5197:5201:nethack-c/upstream/src/zap.c
            } else {
                rangemod -= 3;
                lev->typ = ROOM, lev->flags = 0;
                t = maketrap(x, y, PIT);
```

`picking_at` JS : `game.occupation !== picklock` / `xlock.door === lev`. C `lock.c` compare le `struct rm *` occupé. Si JS stocke des coords pas la ref cellule, occupation picklock ne s’arrête pas quand le zap détruit la porte — C `stop_occupation` + `reset_pick`.

`PHYS_EXPL_TYPE -1` : explode PHYS no-op floor (C return -1000). JS identique. D-0949 s’appuie dessus : explode PHYS ne facture pas de porte via zap_over_floor.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note /10 : **7.5**
- Une phrase : door/bars + strings `dobuzz` collent au C (y compris le `goto def_case` DEATH), mais OR-er `flags` dans `W_NONDIGGABLE` et laisser le PIT-pool hors rangemod, c’est une facture boutique posée sur un buzz encore géométriquement faux.
