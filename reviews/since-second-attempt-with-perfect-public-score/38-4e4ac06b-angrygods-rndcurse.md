# Review 38 — `4e4ac06b` — angrygods 4–8 + `rndcurse` (D-0969)

## Métadonnées
- Hash complet / court : `4e4ac06b59c3a3a44dcd6f574b12f24d4b646804` / `4e4ac06b`
- Parent : `64327f077ee2718fc49385dcce6bb6a73f5ee40a`
- Auteur, date : Raphaël Hervier, 2026-07-22T00:55:08+02:00
- D-id : **D-0969**
- Stats : 12 files, +295/−65
- Fichiers JS / map / cadence : `js/pray.js` (+91), `js/sit.js` (+144), `js/spell.js` (+13), `js/mkobj.js` `unbless` (+6) ; `docs/c-js-map/absent.md`, `turns.md` ; pas de cadence

## Intention vs livrable
Promet de compléter le `switch (rn2(maxanger))` : cases 4–8 + default, et de porter `sit.c` `rndcurse` (bras curse + `cursed_book` default).

Le diff le fait. Avant : 0–3 seulement, le reste stub pline. `god_zaps_you` existait (D-0963 desecrate) mais n’était pas câblé. **Il ne reste aucun case numérique C non porté.** Le reste (SetVoice, shieldeff, poly « creature », hcolor hallu) est du polish, pas un trou de switch. Pas de cadence mêlée. D-id présent.

Ne pas confondre « angrygods incomplet » et « polish restant ». Mission : flagger les cases restants — **il n’y en a plus**.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/pray.js` | Port C : cases 4–8 + default `angrygods` ; `gods_angry` |
| `js/sit.js` | Port C : `rndcurse` (+ copie locale `which_armor`) ; `attrcurse` |
| `js/spell.js` | Wiring : `cursed_book` default → `rndcurse` |
| `js/mkobj.js` | Wiring : export `unbless` |
| `absent.md` / D-log | Prayer 0–8 ; music earthquake encore absent |

## Fidélité C ↔ JS

### `angrygods` switch — `pray.c:704` → `js/pray.js:1156`
C `switch (rn2(maxanger))` avec `maxanger` clamp 1..15 :

| rn2 | C | JS ce hash |
|---|---|---|
| 0–1 | displeased / hallu bummed | identique (`pline` « You feel that… » vs C `You_feel`) |
| 2–3 | godvoice + arrogant/strayed + SetVoice + verbalize relearn + `adjattrib(WIS,-1)` + `losexp` | porté ; **SetVoice sauté** |
| 6 | si `!Punished` : `gods_angry`+`punish`+break ; sinon FALLTHROUGH 4–5 | **identique** (`Punished()` ≡ `uball`) |
| 4–5 | `gods_angry` ; glow si `!Blind && !Antimagic` ; `if (rn2(2) \|\| !attrcurse()) rndcurse()` | identique |
| 7–8 | godvoice + SetVoice + verbalize scorn/call-upon + « Then die, mortal/creature » + `summon_minion` | porté ; SetVoice sauté ; **mortal hardcodé** |
| default (9–14) | `gods_angry` + `god_zaps_you` | **câblé** (plus stub) |

**Confirmation : plus aucun case C manquant.** maxanger=15 ⇒ rn2 0..14 ; 9–14 = zap. JS `default` idem.

`rnz(300)` ublesscnt en fin — conservé. **RNG switch :** un seul `rn2(maxanger)` en tête. Pas de `rn2` inventé dans les cases.

maxanger C :

```c
    if (resp_god != u.ualign.type)
        maxanger = u.ualign.record / 2 + (Luck > 0 ? -Luck / 3 : -Luck);
    else
        maxanger = 3 * u.ugangr + ((Luck > 0 || u.ualign.record >= STRIDENT)
                                   ? -Luck / 3 : -Luck);
```

JS : `Math.trunc` sur record/2 et Luck/3. Division entière C vs trunc JS — **même signe** pour Luck positif. Inhell → `A_NONE` ; `ublessed=0`. **Confirmation** du préambule (préexistant 0–3, inchangé).

### Case 6 fallthrough
C :

```c
    case 6:
        if (!Punished) {
            gods_angry(resp_god);
            punish((struct obj *) 0);
            break;
        }
        FALLTHROUGH;
    case 4:
    case 5:
```

JS : `if (!Punished()) { await gods_angry; await punish(null); break; }` puis 4–5. **Pas de RNG extra** entre 6 et 4. Déjà Punished → curse path. **Confirmation.**

`punish(null)` dépend du port `ball.c` (hors revue). Si punish est stub, case 6 « success » sans boule — dette caller, pas le switch.

### Cases 4–5 curse
C glow : `An(hcolor(NH_BLACK))`. JS `An(hcolor('black'))` ; hallu synonyms **deferred** (`hcolor` sit.js return colorword). Glow hors hallu OK.

C : `if (rn2(2) || !attrcurse()) rndcurse();` — short-circuit : `rn2(2)==1` **n’appelle pas** `attrcurse` (donc pas `rnd(11)`). JS `if (rn2(2) || !(await attrcurse()))`. **Même ordre, même skip.** `attrcurse` retourne 0 si rien strippé → `!0` true → rndcurse. **Confirmation RNG.**

`attrcurse` C `switch (rnd(11))` fallthrough 1..11. JS sit.js recopie les fallthrough. Si un case JS break trop tôt, `rnd(11)` consomme mais strip faux — hors scope si inchangé ; D-0969 l’utilise comme prédicat 0/nonzero.

### Cases 7–8 minion
C scorn ssi `on_altar() && a_align(ux,uy) != resp_god`. JS identique. `summon_minion(resp_god, FALSE)`. **Callers branchés.**

C mortal : `youmonst.data->mlet == S_HUMAN ? "mortal" : "creature"`. JS `const mortal = 'mortal'` (commentaire « L1 roles »). Poly non-humain dit « mortal » au lieu de « creature ». **Named** D-log. Pas un case manquant.

SetVoice sauté : audio, pas RNG. `godvoice(resp_god, null)` porté.

### Default zap
`gods_angry` + `god_zaps_you` (D-0963). **Wiring**, pas un nouveau port zap. Un angrygods fort (rn2≥9) zappe enfin comme C au lieu d’un stub.

### `rndcurse` — `sit.c:569` → `js/sit.js`
**Porté :**
1. Magicbane `u_wield_art && rn2(20)` → aura blade + return. **RNG présent.**
2. Antimagic : C `shieldeff` ; JS skip (named).
3. Aura « surround you » (`You_feel` vs C `You(mal_aura,"you")` — même surface).
4. Compte invent non-COIN `nobj` ; `cnt = rnd(6 / ((!!AM)+(!!HSD)+1))`. Diviseurs 1/2/3 → 6/3/2/1 entiers. JS `/` flottant mais 6÷k exact. **Confirmation.**
5. `cnt` fois : `onum=rnd(nobj)` ; walk skip COIN ; skip déjà cursed ; artifact `SPFX_INTEL && rn2(10)<8` resist ; bless→`unbless` else `curse`.
6. Steed `!rn2(4)` + `which_armor(usteed, W_SADDLE)` + curse/unbless + glow.

**Invent :** C liste `nobj` ; JS `game.invent` **tableau**. Sampling `rnd(nobj)` + walk skip COIN équivalent **si l’ordre invent JS = ordre C**. Convention du port.

SPFX_INTEL : C `spec_ability(otmp, SPFX_INTEL)` ; JS `get_artifact(otmp).spfx & SPFX_INTEL`. Équivalent si table artifacts 1:1.

### `which_armor` local — **bug C-misread**
```js
function which_armor(mtmp, mask) {
    for (const o of mtmp?.minvent || []) {
        if ((o.owornmask || 0) & mask) return o;
    }
    return null;
}
```

C / `js/worn.js` canonique :

```js
for (let obj = mon.minvent; obj; obj = obj.nobj) {
```

`minvent` monstre est une **liste chaînée**, pas un Array. `for...of` sur un objet : TypeError (non-iterable) **ou** no-op si `minvent` falsy. Le bras selle **ne trouve jamais** la selle, ou **crash** si `usteed.minvent` est l’objet tête.

Impact : angrygods 4–5 + steed + `!rn2(4)` — rare en suite publique, **divergence C réelle**. `worn.js:which_armor` existe déjà et est correct. Copie locale fautive.

`Yobjnam2` local « Your xname » vs C `shk_your` — polish nommé.

### `cursed_book` default — `spell.c`
C default `rndcurse()`. JS passait un pline aura only ; maintenant `await rndcurse()`. **Caller branché.** Niveaux `rn2(lev)` case ≥6 (ou default si lev petit : `rn2(0)` C undefined behavior ; JS `rn2(0)` port-defined). Hors D-0969 si lev≥1 books.

### `unbless` export `mkobj.js`
Caller `rndcurse` bless→unbless. C `unbless` dans `mkobj.c`. Wiring 1:1. Sans export, bless→curse skip unbless.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/traces/fs/node:/fastforward/seeds. Frozen non touchés. Rule #2 OK. `angrygods`/`rndcurse` async via pline. `rndcurse` dans `sit.js` comme C `sit.c`. Copie `which_armor` au lieu d’importer `worn.js` : smell, pas Rule #2. **RAS** constitution stricte. Qualité : which_armor.

Hardcode `'mortal'` : pas un seed public, mais un raccourci rôle. Playbook « pas de constantes trace-derived » — ici c’est un assume L1 human. Debt, pas CONSTITUTION-RISK.

## Densité (§2b)
Right size. Switch angrygods restant + helper `rndcurse` + 2 callers (pray, cursed_book). 91+144. Pas un case isolé. Pas mêlé explode/ice.

## Documentation
D-0969 « fixed » pour cases 4–8+default+rndcurse — **vrai pour le switch**. Deferrals SetVoice/shieldeff/creature/hcolor/update_inventory/music earthquake. `absent.md` : prayer 0–8. **Pas d’overclaim polish.** Ne pas lire les deferrals comme des **cases** manquants.

## Vérification
Journal : green+strict ; pray/spell/shared **20/20** (seed0017/0501/0106/2200/0360). Cohorte prière pertinente. Pas de cadence. Le bras selle n’est probablement **pas** exercé par ces seeds — le bug which_armor peut passer vert. #1270 hors scope.

## Risques / dette
1. **`which_armor` `for...of minvent`** — selle no-op/throw. Importer `worn.js`.
2. `mortal` hardcodé vs `S_HUMAN`/`creature`.
3. SetVoice / shieldeff (affichage).
4. `hcolor` hallu.
5. Music `do_earthquake` desecrate (absent.md) — hors switch.
6. `Yobjnam2` polish ; `punish(null)` si ball stub.


## `gods_angry` vs `godvoice`
C cases 4–6 default : `gods_angry` (pline The <god> is angry). Cases 7–8 : `godvoice` puis verbalize (pas `gods_angry` avant summon). JS copie. **Ne pas** unifier les deux helpers — ordre C distinct. Cases 0–1 : ni angry ni voice, seulement You_feel displeased.

`losexp` cases 2–3 : C `losexp((char *)0)` divine. JS `losexp_divine()`. Hors D-0969 (préexistant). Cases 4–8 ne doivent **pas** losexp. JS break 4–5/6/7–8 OK.

`summon_minion(resp_god, FALSE)` : FALSE = pas tame. Si JS ignore le bool et tame le minion, angrygods 7–8 devient cadeau. Vérifier signature JS (hors diff profond). Caller nouveau.

## `rndcurse` invent vide
C `if (nobj)` skip boucle ; steed saddle **ensuite** indépendant. JS idem. Invent vide + steed : seul `!rn2(4)` selle. **Confirmation** que Magicbane return early **saute** aussi la selle (C return avant steed). JS return après blade — selle skip. **OK.**

`cnt = rnd(6/k)` : k=1 → rnd(6) = 1..6 curses attempts. Déjà cursed `continue` sans reroll — C idem (peut « rater » des slots). Pas un while until cursed.

`update_inventory` C après invent loop, **avant** selle. JS skip. Perm invent window only.

## Cases restants ?
maxanger 15, rn2 0..14. Cases 9–14 = default. **Pas de case 9 dédié C.** Question mission « angrygods remaining cases » : **zéro case numérique.** Restant = polish (SetVoice, creature, shieldeff) + which_armor bug.



## `An(hcolor('black'))`
C `An()` choisit A/An selon voyelle. « black » → « A black glow ». JS `An()` port pline. Si `An` JS est no-op, « black glow surrounds you » sans article. Polish. Hallu C `hcolor` synonyme ; JS identity — named.

`verbalize` vs `pline` « Then die » : C commente why not verbalize. JS `pline(\`"Then die, ${mortal}!")`. **Confirmation** du choix C bizarre.

`on_altar` + `a_align` : desecrate path vs prayer off-altar. Cases 7–8 scorn seulement autel mauvais align. JS `a_align(u.ux,u.uy) !== resp_god`. Si `a_align` stub 0, scorn toujours/jamais. Dépend mklev align. Hors revue.

## `cursed_book` rng
`rn2(lev)` lev=1 → rn2(1)=0 always case 0 (tele). Default rndcurse seulement si lev> cases. Books niveau 7+ hit default. Wiring D-0969 **change** high-level books. Cohorte spell seed2200 peut l’exercer. Vert = rndcurse C-shaped ou pas de book haut niveau.


## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : le switch 0–8+default est **complet vs C** (fallthrough 6, `rn2(2)||!attrcurse`, default zap) ; le trou restant n’est pas un case manquant, c’est `which_armor` qui itère `minvent` comme un tableau.
