#!/usr/bin/env node
/**
 * scenario-gen.mjs — scenario-style corpus sessions for the hidden-score
 * proxy, authored the way the contest's own sessions were: a driver plays
 * the pinned C recorder key by key, reads the screen after every key, and
 * composes short scenarios (wish → use, genesis → fight/chat/look, polyself,
 * #wizintrinsic timeouts, deaths and disclosure, level tours by name, role
 * kits in normal mode, travel/engrave/pray/kick). The public 44 are exactly
 * this genre (`seed0398-wizard-wandpoly-pile`, `seed0006-wizard-water-demon`,
 * `seed0030-ten-diverse-deaths`, `seed2200-wizard-quaff-zap-read`); random
 * keystroke mutants never reach these paths, which is why the old corpus
 * saturated at 96 % while held-out sat at 7/44.
 *
 *   node scripts/scenario-gen.mjs --n 60 [--seed 91000] [--jobs 6]
 *        [--family mixed|wish|genesis|poly|intrinsic|death|kit|tour|normal]
 *        [--family broad|terrain|trap|town|sokoban|ride|pet|container|descend|
 *                  ranged|caster|impaired|options|engulf|hazard|longrun|dig]
 *        [--out hidden-corpus/recipes] [--probe [--index i]]
 *
 * `broad` rotates evenly through the second-wave families (terrain … dig);
 * about a quarter of those save mid-game and restore in a second segment.
 *
 * Output: one `scen-<family>-<Role>-<seed>.recipe.json` per session in
 * hidden-corpus/recipes (only the recipe is committed) plus the canonical
 * `.cache/hidden/sessions/<id>.session.json` re-recorded from that recipe by
 * record-session.mjs, so the session is byte-identical to what
 * `hidden-proxy record` would rebuild. `--probe` prints every screen of one
 * session instead of writing anything.
 *
 * The driver is a policy, not a spec: it only chooses keys. C decides what
 * happens; the recording is the expectation. Nothing here reads js/.
 */
import { spawn, spawnSync } from 'node:child_process';
import { promises as fs, existsSync, mkdirSync, cpSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    MarkerParser, payloadToLines, encodeScreenAnsiRle, clearStaleState, parseNethackrcName,
} from './record-session.mjs';
import { decodeScreen, renderCell, ROWS_24, COLS_80 } from '../frozen/screen-decode.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const DEFAULT_INSTALL = path.join(ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir');
const RECORD = path.join(SCRIPT_DIR, 'record-session.mjs');
const SESSIONS = path.join(ROOT, '.cache', 'hidden', 'sessions');
const WORKER_ROOT = process.env.NHSG_ROOT || '/tmp/nhsg';
const PIN_TZ = 'America/New_York';
const ESC = '\x1b', CTRL = (c) => String.fromCharCode(c.toUpperCase().charCodeAt(0) - 64);
const K_WISH = CTRL('w'), K_GENESIS = CTRL('g'), K_LEVPORT = CTRL('v'), K_KICK = CTRL('d'), K_TELE = CTRL('t');
const MAX_KEYS = 320;

const args = process.argv.slice(2);
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 && args[i + 1] != null ? args[i + 1] : d; };
const flag = (k) => args.includes(`--${k}`);

/* ------------------------------------------------------------------ RNG */
function mulberry32(a) {
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const chance = (rng, p) => rng() < p;
const shuffle = (rng, arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ------------------------------------------------------------------ roles */
const ROLES = [
    ['Indiana', 'Archeologist', ['human', 'dwarf', 'gnome'], ['lawful', 'neutral']],
    ['Conan', 'Barbarian', ['human', 'orc'], ['neutral', 'chaotic']],
    ['Grok', 'Caveman', ['human', 'dwarf', 'gnome'], ['lawful', 'neutral']],
    ['Hippocrates', 'Healer', ['human', 'gnome'], ['neutral']],
    ['Florian', 'Knight', ['human'], ['lawful']],
    ['Kira', 'Monk', ['human'], ['lawful', 'neutral', 'chaotic']],
    ['Caspar', 'Priest', ['human', 'elf'], ['lawful', 'neutral', 'chaotic']],
    ['ricky', 'Ranger', ['human', 'elf', 'gnome', 'orc'], ['neutral', 'chaotic']],
    ['robin', 'Rogue', ['human', 'orc'], ['chaotic']],
    ['Musashi', 'Samurai', ['human'], ['lawful']],
    ['Touristo', 'Tourist', ['human'], ['neutral']],
    ['Astrid', 'Valkyrie', ['human', 'dwarf'], ['lawful', 'neutral']],
    ['merlin', 'Wizard', ['human', 'elf', 'gnome', 'orc'], ['neutral', 'chaotic']],
];
const DATETIMES = ['20000110090000', '20001013090000', '20000121000000', '20000206000000', '20000704150000'];

function makeRc(rng, role, { debug, pet }) {
    const [name, r, races, aligns] = role;
    const race = pick(rng, races), align = pick(rng, aligns), gender = pick(rng, ['male', 'female']);
    const lines = [
        `OPTIONS=name:${name},role:${r},race:${race},gender:${gender},align:${align}`,
        'OPTIONS=!legacy,!splash_screen,!tutorial',
        'OPTIONS=suppress_alert:3.4.3',
        'OPTIONS=symset:DECgraphics',
    ];
    if (chance(rng, 0.5)) lines.push('OPTIONS=!autopickup');
    if (pet === 'none') lines.push('OPTIONS=pettype:none');
    if (chance(rng, 0.3)) lines.push('OPTIONS=showexp,time');
    if (debug) lines.push('OPTIONS=playmode:debug');
    return lines.join('\n') + '\n';
}

/* ------------------------------------------------------------------ wish tables
   Each entry: [name, class]. The class picks the verb. Names are pinned-C
   object names (objects.h) as `readobjnam` accepts them. */
const WANDS = ['light', 'secret door detection', 'enlightenment', 'create monster', 'striking', 'make invisible', 'slow monster', 'speed monster', 'undead turning', 'polymorph', 'cancellation', 'teleportation', 'opening', 'locking', 'probing', 'digging', 'magic missile', 'fire', 'cold', 'sleep', 'death', 'lightning', 'nothing', 'stasis'].map((n) => [`wand of ${n}`, 'wand']);
const POTIONS = ['gain ability', 'restore ability', 'confusion', 'blindness', 'paralysis', 'speed', 'levitation', 'hallucination', 'invisibility', 'see invisible', 'healing', 'extra healing', 'gain level', 'enlightenment', 'monster detection', 'object detection', 'gain energy', 'sleeping', 'full healing', 'polymorph', 'booze', 'sickness', 'fruit juice', 'acid', 'oil', 'water'].map((n) => [`potion of ${n}`, 'potion']);
const SCROLLS = ['enchant armor', 'destroy armor', 'confuse monster', 'scare monster', 'remove curse', 'enchant weapon', 'create monster', 'taming', 'genocide', 'light', 'teleportation', 'gold detection', 'food detection', 'identify', 'magic mapping', 'amnesia', 'fire', 'earth', 'punishment', 'charging', 'stinking cloud', 'blank paper'].map((n) => [`scroll of ${n}`, 'scroll']);
const RINGS = ['adornment', 'gain strength', 'gain constitution', 'increase accuracy', 'increase damage', 'protection', 'regeneration', 'searching', 'stealth', 'sustain ability', 'levitation', 'hunger', 'aggravate monster', 'conflict', 'warning', 'poison resistance', 'fire resistance', 'cold resistance', 'shock resistance', 'free action', 'slow digestion', 'teleportation', 'teleport control', 'polymorph', 'polymorph control', 'invisibility', 'see invisible', 'protection from shape changers'].map((n) => [`ring of ${n}`, 'ring']);
const AMULETS = ['amulet of ESP', 'amulet of life saving', 'amulet of strangulation', 'amulet of restful sleep', 'amulet versus poison', 'amulet of change', 'amulet of unchanging', 'amulet of reflection', 'amulet of magical breathing', 'amulet of guarding', 'amulet of flying', 'cheap plastic imitation of the Amulet of Yendor'].map((n) => [n, 'amulet']);
const TOOLS = ['large box', 'chest', 'ice box', 'sack', 'oilskin sack', 'bag of holding', 'bag of tricks', 'skeleton key', 'lock pick', 'credit card', 'tallow candle', 'wax candle', 'brass lantern', 'oil lamp', 'magic lamp', 'expensive camera', 'mirror', 'crystal ball', 'lenses', 'blindfold', 'towel', 'saddle', 'leash', 'stethoscope', 'tinning kit', 'tin opener', 'can of grease', 'figurine of a newt', 'magic marker', 'land mine', 'beartrap', 'tin whistle', 'magic whistle', 'wooden flute', 'magic flute', 'tooled horn', 'frost horn', 'fire horn', 'horn of plenty', 'wooden harp', 'magic harp', 'bell', 'bugle', 'leather drum', 'drum of earthquake', 'pick-axe', 'grappling hook', 'unicorn horn'].map((n) => [n, 'tool']);
const ARMOR = ['elven leather helm', 'dunce cap', 'helm of brilliance', 'helm of opposite alignment', 'helm of telepathy', 'gray dragon scale mail', 'silver dragon scale mail', 'red dragon scale mail', 'black dragon scale mail', 'plate mail', 'crystal plate mail', 'dwarvish mithril-coat', 'elven mithril-coat', 'chain mail', 'leather armor', 'Hawaiian shirt', 'T-shirt', 'mummy wrapping', 'oilskin cloak', 'alchemy smock', 'cloak of protection', 'cloak of invisibility', 'cloak of magic resistance', 'cloak of displacement', 'shield of reflection', 'gauntlets of fumbling', 'gauntlets of power', 'gauntlets of dexterity', 'speed boots', 'water walking boots', 'jumping boots', 'kicking boots', 'fumble boots', 'levitation boots'].map((n) => [n, 'armor']);
const WEAPONS = ['dagger', 'silver dagger', 'athame', 'axe', 'long sword', 'two-handed sword', 'katana', 'tsurugi', 'dwarvish mattock', 'lance', 'mace', 'silver saber', 'morning star', 'war hammer', 'bullwhip', 'aklys', 'flail', 'bow', 'crossbow', 'sling', 'trident', 'spear', 'javelin', 'quarterstaff', 'rubber hose', 'unicorn horn'].map((n) => [n, 'weapon']);
const AMMO = ['20 arrows', '20 elven arrows', '20 darts', '20 shuriken', '10 daggers', '15 crossbow bolts', '20 flint stones', '5 boomerangs'].map((n) => [n, 'ammo']);
const SPELLBOOKS = ['dig', 'magic missile', 'fireball', 'cone of cold', 'sleep', 'finger of death', 'light', 'detect monsters', 'healing', 'knock', 'force bolt', 'confuse monster', 'cure blindness', 'drain life', 'slow monster', 'wizard lock', 'create monster', 'detect food', 'cause fear', 'clairvoyance', 'cure sickness', 'charm monster', 'haste self', 'detect unseen', 'levitation', 'extra healing', 'restore ability', 'invisibility', 'detect treasure', 'remove curse', 'magic mapping', 'identify', 'turn undead', 'polymorph', 'teleport away', 'create familiar', 'cancellation', 'protection', 'jumping', 'stone to flesh', 'chain lightning'].map((n) => [`spellbook of ${n}`, 'spellbook']);
const FOOD = ['lizard corpse', 'cockatrice corpse', 'newt corpse', 'floating eye corpse', 'wraith corpse', 'tin of spinach', 'tin of lizard meat', 'lembas wafer', 'cram ration', 'food ration', 'egg', 'cockatrice egg', 'lump of royal jelly', 'eucalyptus leaf', 'sprig of wolfsbane', 'clove of garlic', 'fortune cookie', 'cream pie', 'candy bar', 'slime mold', 'glob of green slime', 'kelp frond', 'tripe ration', 'meatball', 'huge chunk of meat', 'apple', 'banana'].map((n) => [n, 'food']);
const GEMS = ['diamond', 'ruby', 'luckstone', 'loadstone', 'touchstone', 'flint stone', 'worthless piece of red glass', 'dilithium crystal', 'gray stone'].map((n) => [n, 'gem']);
const ARTIFACTS = ['Excalibur', 'Stormbringer', 'Mjollnir', 'Cleaver', 'Grimtooth', 'Orcrist', 'Sting', 'Magicbane', 'Frost Brand', 'Fire Brand', 'Dragonbane', 'Demonbane', 'Werebane', 'Grayswandir', 'Giantslayer', 'Ogresmasher', 'Trollsbane', 'Vorpal Blade', 'Snickersnee', 'Sunsword', 'the Orb of Detection', 'the Heart of Ahriman', 'the Sceptre of Might', 'the Staff of Aesculapius', 'the Magic Mirror of Merlin', 'the Eyes of the Overworld', 'the Mitre of Holiness', 'the Longbow of Diana', 'the Master Key of Thievery', 'the Tsurugi of Muramasa', 'the Platinum Yendorian Express Card', 'the Orb of Fate', 'the Eye of the Aethiopica', 'the Bell of Opening', 'the Candelabrum of Invocation', 'the Book of the Dead'].map((n) => [n, 'artifact']);
const MISC = ['boulder', 'statue of a newt', 'heavy iron ball', 'iron chain', '200 gold pieces', 'splash of acid venom', 'figurine of an Archon', 'magic lamp', 'chest'].map((n) => [n, 'misc']);
const WISH_POOL = [...WANDS, ...WANDS, ...POTIONS, ...POTIONS, ...SCROLLS, ...SCROLLS, ...RINGS, ...AMULETS, ...TOOLS, ...ARMOR, ...WEAPONS, ...AMMO, ...SPELLBOOKS, ...FOOD, ...GEMS, ...ARTIFACTS, ...MISC];

/* monsters worth meeting: one of every attack/passive/special family */
const MONSTERS = ['newt', 'jackal', 'grid bug', 'lichen', 'floating eye', 'gas spore', 'yellow light', 'acid blob', 'blue jelly', 'gelatinous cube', 'cockatrice', 'chickatrice', 'pyrolisk', 'soldier ant', 'killer bee', 'giant beetle', 'werejackal', 'wererat', 'werewolf', 'little dog', 'kitten', 'pony', 'rock piercer', 'leprechaun', 'water nymph', 'wood nymph', 'homunculus', 'imp', 'quasit', 'tengu', 'hill orc', 'Uruk-hai', 'orc shaman', 'kobold shaman', 'gnome lord', 'gnomish wizard', 'dwarf', 'dwarf lord', 'hobbit', 'bugbear', 'rothe', 'giant spider', 'scorpion', 'lurker above', 'trapper', 'fog cloud', 'dust vortex', 'fire vortex', 'energy vortex', 'baby long worm', 'long worm', 'xan', 'black light', 'raven', 'vampire bat', 'plains centaur', 'baby red dragon', 'red dragon', 'silver dragon', 'black dragon', 'stalker', 'air elemental', 'fire elemental', 'earth elemental', 'water elemental', 'brown mold', 'yellow mold', 'green mold', 'red mold', 'shrieker', 'violet fungus', 'fire giant', 'frost giant', 'ettin', 'minotaur', 'lich', 'master lich', 'human mummy', 'red naga', 'guardian naga', 'ogre king', 'gray ooze', 'brown pudding', 'green slime', 'black pudding', 'quantum mechanic', 'genetic engineer', 'rust monster', 'disenchanter', 'cobra', 'pit viper', 'troll', 'umber hulk', 'vampire', 'vampire lord', 'wraith', 'barrow wight', 'Nazgul', 'xorn', 'ape', 'owlbear', 'yeti', 'ghoul', 'skeleton', 'straw golem', 'paper golem', 'gold golem', 'flesh golem', 'iron golem', 'doppelganger', 'nurse', 'watchman', 'soldier', 'sergeant', 'lieutenant', 'captain', 'aligned cleric', 'shopkeeper', 'guard', 'Oracle', 'prisoner', 'ghost', 'shade', 'water demon', 'succubus', 'incubus', 'horned devil', 'erinys', 'marilith', 'vrock', 'hezrou', 'bone devil', 'ice devil', 'nalfeshnee', 'pit fiend', 'balrog', 'sandestin', 'djinni', 'mind flayer', 'master mind flayer', 'jellyfish', 'piranha', 'giant eel', 'electric eel', 'kraken', 'gecko', 'chameleon', 'crocodile', 'salamander', 'couatl', 'Aleax', 'Angel', 'ki-rin', 'Archon', 'Keystone Kop', 'Kop Kaptain', 'mail daemon', 'Croesus', 'Medusa', 'Wizard of Yendor', 'Juiblex', 'Yeenoghu', 'Orcus', 'Demogorgon', 'Death', 'Pestilence', 'Famine', 'green-elf', 'Elvenking', 'elf-lord', 'giant mimic', 'large mimic', 'small mimic', 'grey-elf', 'wumpus', 'purple worm', 'baby purple worm', 'baluchitherium', 'mastodon', 'titanothere', 'mumak', 'winter wolf', 'hell hound', 'warg', 'rabid rat', 'giant rat', 'sewer rat', 'centipede', 'cave spider'];
const POLY_FORMS = ['newt', 'grid bug', 'floating eye', 'cockatrice', 'gelatinous cube', 'fog cloud', 'fire vortex', 'xorn', 'vampire lord', 'vampire', 'werewolf', 'green slime', 'black dragon', 'gold dragon', 'silver dragon', 'red dragon', 'air elemental', 'earth elemental', 'water elemental', 'fire elemental', 'stalker', 'master mind flayer', 'mind flayer', 'purple worm', 'giant spider', 'black light', 'yellow light', 'gas spore', 'nurse', 'succubus', 'incubus', 'Archon', 'ki-rin', 'couatl', 'dust vortex', 'energy vortex', 'lich', 'human mummy', 'wraith', 'ghoul', 'iron golem', 'fire giant', 'titan', 'minotaur', 'umber hulk', 'rust monster', 'disenchanter', 'leprechaun', 'water nymph', 'chameleon', 'doppelganger', 'sandestin', 'trapper', 'lurker above', 'rock piercer', 'long worm', 'cobra', 'yeti', 'owlbear', 'hobbit', 'dwarf', 'gnome', 'elf', 'human', 'giant eel', 'electric eel', 'kraken', 'piranha', 'jellyfish', 'raven', 'vampire bat', 'crocodile', 'baby crocodile', 'salamander', 'lizard', 'pony', 'warhorse', 'dog', 'kitten', 'jackal', 'soldier ant', 'killer bee', 'queen bee', 'acid blob', 'blue jelly', 'shrieker', 'violet fungus', 'lichen', 'brown mold', 'stone golem', 'paper golem', 'straw golem', 'rope golem', 'gold golem', 'shade', 'ghost', 'djinni', 'balrog', 'pit fiend', 'marilith', 'nalfeshnee', 'imp', 'quasit', 'tengu', 'homunculus', 'mail daemon', 'Angel', 'Aleax'];
/* #wizintrinsic menu letters (cmd.c wiz_intrinsic, order of `intrinsics[]`) */
const INTRINSICS = [['a', 'invulnerable', 6], ['b', 'petrifying', 8], ['c', 'becoming slime', 12], ['d', 'strangling', 8], ['e', 'fatally sick', 12], ['f', 'stunned', 8], ['g', 'confused', 8], ['h', 'hallucinating', 12], ['i', 'blinded', 10], ['j', 'deafness', 8], ['k', 'vomiting', 20], ['l', 'slippery fingers', 8], ['m', 'wounded legs', 8], ['n', 'sleepy', 30], ['o', 'teleporting', 20], ['p', 'polymorphing', 20], ['q', 'levitating', 12], ['r', 'very fast', 8], ['s', 'clairvoyant', 10]];
const LEVEL_NAMES = ['oracle', 'bigrm', 'rogue', 'medusa', 'castle', 'valley', 'sanctum', 'wizard1', 'wizard2', 'wizard3', 'fakewiz1', 'fakewiz2', 'juiblex', 'orcus', 'asmodeus', 'baalz', 'minetn', 'minend', 'soko1', 'soko2', 'soko3', 'soko4', 'knox', 'tower1', 'tower2', 'tower3', 'earth', 'air', 'fire', 'water', 'astral', '-strt', '-loca', '-goal', '-fila', '-filb', 'Stair to The Gnomish Mines', 'Stair to Sokoban', 'Portal to The Quest', 'tut-1', 'tut-2'];
const ENGRAVINGS = ['Elbereth', 'Elbereth Elbereth', 'ad aerarium', 'X marks the spot', 'Vlad was here', 'I am a fish'];

/* ------------------------------------------------------------------ screen */
function analyze(payload, cx, cy) {
    const enc = encodeScreenAnsiRle(payloadToLines(payload));
    const grid = decodeScreen(enc);
    const rows = grid.map((r) => r.map(renderCell).join('').replace(/\s+$/, ''));
    const top = rows[0];
    const head = rows.slice(0, 3).join(' ');
    const menu = rows.some((r) => /\(end\)\s*$|\(\d+ of \d+\)\s*$/.test(r));
    return { grid, rows, top, more: /--More--/.test(head) || rows.some((r) => /--More--\s*$/.test(r)), menu, cx, cy };
}
const MON_CH = /[a-zA-Z&';:~@]/;
function neighbors(s) {
    const out = [];
    const dirs = [['h', -1, 0], ['j', 0, 1], ['k', 0, -1], ['l', 1, 0], ['y', -1, -1], ['u', 1, -1], ['b', -1, 1], ['n', 1, 1]];
    for (const [k, dx, dy] of dirs) {
        const x = s.cx + dx, y = s.cy + dy;
        if (y < 1 || y > 21 || x < 0 || x >= COLS_80) continue;
        out.push({ k, ch: renderCell(s.grid[y][x]) });
    }
    return out;
}
function monsterDir(s, rng) {
    if (s.cy < 1 || s.cy > 21) return null;
    const m = neighbors(s).filter((n) => MON_CH.test(n.ch));
    return m.length ? pick(rng, m).k : null;
}
function menuItems(s) {
    const items = [];
    for (const r of s.rows) { const m = /^\s*([a-zA-Z$#])\s-\s(.+)$/.exec(r); if (m) items.push({ letter: m[1], text: m[2] }); }
    return items;
}
function bracketLetters(top) {
    const m = /\[([^\]]*)\]/.exec(top);
    if (!m) return [];
    const spec = m[1].replace(/ or [?*]+/, '').replace(/[?*]/g, '');
    const out = [];
    if (/^-\s/.test(spec)) out.push('-');
    for (let i = 0; i < spec.length; i++) {
        const c = spec[i];
        if (c === '-' && i > 0 && i + 1 < spec.length) { for (let x = spec.charCodeAt(i - 1) + 1; x <= spec.charCodeAt(i + 1); x++) out.push(String.fromCharCode(x)); i++; continue; }
        if (/[a-zA-Z$]/.test(c)) out.push(c);
    }
    return [...new Set(out)];
}

/* ------------------------------------------------------------------ game */
class Game {
    constructor({ seg, binary, installDir, homeDir, rngLogPath, tz, maxKeys = MAX_KEYS, trace = false, wipeSave = true }) {
        Object.assign(this, { seg, binary, installDir, homeDir, rngLogPath, tz, maxKeys, trace, wipeSave });
        this.moves = ''; this.steps = 0; this.ended = false; this.s = null; this.lastMap = null;
    }
    async start() {
        await fs.mkdir(this.homeDir, { recursive: true });
        await fs.writeFile(path.join(this.homeDir, '.nethackrc'), this.seg.nethackrc || '');
        await fs.writeFile(this.rngLogPath, '');
        await clearStaleState(this.installDir, { wipeSave: this.wipeSave });
        const env = {
            ...process.env, NETHACKDIR: this.installDir, HACKDIR: this.installDir, HOME: this.homeDir,
            TERM: 'xterm-256color', TZ: this.tz, NETHACK_NO_DELAY: '1', NETHACK_SEED: String(this.seg.seed),
            NETHACK_FIXED_DATETIME: this.seg.datetime, NETHACK_RNGLOG: this.rngLogPath, NOMUX_MARKERS: '1', NETHACK_RAW_KEYS: '1',
        };
        this.child = spawn(this.binary, ['-u', parseNethackrcName(this.seg.nethackrc) ?? ''], { env, stdio: ['pipe', 'pipe', 'ignore'] });
        this.child.stdin.on('error', () => {});
        this.waiters = [];
        this.parser = new MarkerParser((m) => {
            if (m.kind !== 'input') return;
            const s = analyze(m.payload, m.cx, m.cy);
            this.steps++;
            const w = this.waiters.shift();
            if (w) w(s); else this.pending = s;
        });
        this.child.stdout.on('data', (b) => { try { this.parser.push(b); } catch {} });
        this.child.on('close', (code, signal) => { this.ended = true; this.exit = { code, signal }; const w = this.waiters.shift(); if (w) w(null); });
        this.s = await this._next();
        if (this.trace) this._print('(start)');
        return this.s;
    }
    _next() {
        if (this.pending) { const s = this.pending; this.pending = null; return Promise.resolve(s); }
        if (this.ended) return Promise.resolve(null);
        return new Promise((res, rej) => {
            const t = setTimeout(() => { rej(new Error(`marker timeout after ${this.moves.length} keys`)); }, 15000);
            this.waiters.push((s) => { clearTimeout(t); res(s); });
        });
    }
    get full() { return this.ended || this.moves.length >= this.maxKeys; }
    async send(keys) {
        for (const k of keys) {
            if (this.full) return this.s;
            this.moves += k;
            this.child.stdin.write(Buffer.from(k === '\r' ? '\n' : k, 'utf8'));
            const s = await this._next();
            if (!s) { this.ended = true; return this.s; }
            this.s = s;
            if (s.cy >= 1 && s.cy <= 21 && !s.more && !s.menu) this.lastMap = s;
            if (this.trace) this._print(k);
        }
        return this.s;
    }
    _print(k) {
        console.log(`\n--- key ${JSON.stringify(k)} #${this.moves.length} cursor=${this.s.cx},${this.s.cy} more=${this.s.more} menu=${this.s.menu} nb=${neighbors(this.s).map((n) => n.k + n.ch).join(' ')}`);
        this.s.rows.forEach((r, i) => { if (r) console.log(String(i).padStart(2) + '|' + r); });
    }
    async stop() {
        try { this.child.stdin.end(); } catch {}
        try { this.child.kill('SIGTERM'); } catch {}
        setTimeout(() => { try { this.child.kill('SIGKILL'); } catch {} }, 500).unref();
    }
}

/* ------------------------------------------------------------------ policy primitives */
const PROMPT_RE = /\?\s*(\[[^\]]*\]\s*(\([^)]*\))?)?\s*$|\]\s*$|:\s*$/;
function isPrompt(s) { return !s.more && !s.menu && (PROMPT_RE.test(s.top) || /For instructions type a/.test(s.top)); }

/* answer whatever C is asking until the map is quiet again */
async function answer(g, rng, ctx = {}) {
    for (let i = 0; i < 40 && !g.full; i++) {
        const s = g.s, top = s.top;
        if (s.more) { await g.send(' '); continue; }
        if (s.menu) {
            if (ctx.menuPick && /\(1 of|\(end\)/.test(s.rows.join('\n')) && i < 3) {
                const items = menuItems(s).filter((it) => !/^\(/.test(it.text));
                if (items.length) { await g.send(pick(rng, items).letter + '\n'); continue; }
            }
            await g.send(ESC); continue;
        }
        if (/in what direction/i.test(top)) { await g.send(ctx.dir || monsterDir(g.lastMap || s, rng) || pick(rng, 'hjklyubn.')); continue; }
        if (/Really attack|Are you sure you want to pray|Really quit|Die\?|Really |Continue\?|Are you sure/.test(top) && /\[yn/.test(top)) { await g.send(ctx.yn || (chance(rng, 0.7) ? 'y' : 'n')); continue; }
        if (/Which ring-finger/.test(top)) { await g.send(pick(rng, 'rl')); continue; }
        if (/type the name|what kind of monster|genocide|What monster do you want/i.test(top)) { await g.send((ctx.name || pick(rng, MONSTERS)) + '\n'); continue; }
        if (/To what (level|experience level)/.test(top)) { await g.send((ctx.level || String(2 + Math.floor(rng() * 12))) + '\n'); continue; }
        if (/Do you want to add to the current engraving/.test(top)) { await g.send(pick(rng, 'nny')); continue; }
        if (/What do you want to (write|engrave|burn|scribble|scrawl|melt|add) .*here\?\s*$/.test(top)) { await g.send(pick(rng, ENGRAVINGS) + '\n'); continue; }
        if (/What do you want to call|What do you want to name|Call .* :|What do you want to say/.test(top)) { await g.send(pick(rng, ['Fido', 'foo', 'blessed', 'shiny']) + '\n'); continue; }
        if (/For instructions type a|Where do you want to|Pick an object|Pick a monster|Select a position|Move cursor to|Please move the cursor/.test(top)) { await g.send(pick(rng, ['.', ',', ';', ':', 'm.', 'm,', '<.', '>.', '@.'])); continue; }
        if (/\[yn/.test(top) || /\[ynq/.test(top)) { await g.send(ctx.yn || pick(rng, 'yyn')); continue; }
        if (/For what do you wish/.test(top)) { await g.send(pick(rng, WISH_POOL)[0] + '\n'); continue; }
        if (/How much will you offer/.test(top)) { await g.send(pick(rng, ['0', '50', '200', '400', '600', '1000', '2500']) + '\n'); continue; }
        if (/How many|how much|Amount|count/i.test(top) && /\?\s*$/.test(top)) { await g.send(String(1 + Math.floor(rng() * 5)) + '\n'); continue; }
        if (/^Set \S+ to what\?/.test(top)) { await g.send(optionValue(rng, /^Set (\S+)/.exec(top)[1]) + '\n'); continue; }
        if (/What new (autopickup exception|menucolor|message) pattern\?/.test(top)) { await g.send(pick(rng, ['<*arrow', '>*corpse', '"blessed"=green', '"cursed"=red', 'You hear*', '"uncursed"=cyan']) + '\n'); continue; }
        if (/What type of (scroll|spellbook) do you want to write/.test(top)) { await g.send(pick(rng, /scroll/.test(top) ? SCROLLS : SPELLBOOKS)[0].replace(/^(scroll|spellbook) of /, '') + '\n'); continue; }
        const letters = bracketLetters(top);
        if (letters.length && /\?\s*\[/.test(top)) { await g.send(ctx.letter && letters.includes(ctx.letter) ? ctx.letter : pick(rng, letters)); ctx.letter = null; continue; }
        if (/\?\s*\[[^\]]*\]\s*(\([^)]*\))?\s*$/.test(top)) { await g.send(ESC); continue; }
        if (/\?\s*$|:\s*$/.test(top) && !/^You |^The |^It |^A |^An |^Your /.test(top)) { await g.send(ESC); continue; }
        break;
    }
}
async function settle(g, rng) { await answer(g, rng); }

async function typeCmd(g, rng, text, ctx) { await settle(g, rng); await g.send(text); await answer(g, rng, ctx); }
async function ext(g, rng, name, ctx) { await typeCmd(g, rng, `#${name}\n`, ctx); }
async function wait(g, rng, n) {
    for (let i = 0; i < n && !g.full; i++) {
        await g.send(pick(rng, ['s', 's', '.', '20s']));
        if (/doesn't feel like a good idea|Are you waiting to get hit|already found a monster/.test(g.s.top)) {
            await g.send(pick(rng, ['m.', 'm.', pick(rng, 'hjklyubn')]));
            if (/doesn't feel like a good idea/.test(g.s.top)) await g.send(pick(rng, 'hjklyubn'));
        }
        await settle(g, rng);
    }
}

/* wish: returns the inventory letter of what arrived (null if it hit the floor / failed) */
async function wish(g, rng, text) {
    await settle(g, rng);
    await g.send(K_WISH);
    if (!/For what do you wish/.test(g.s.top)) { await settle(g, rng); return null; }
    await g.send(text + '\n');
    let letter = null;
    for (let i = 0; i < 8 && !g.full; i++) {
        const m = /^([a-zA-Z$]) - /.exec(g.s.top) || /(?:^|  )([a-zA-Z$]) - [^-]/.exec(g.s.top);
        if (m) { letter = m[1]; }
        if (/For what do you wish/.test(g.s.top)) { await g.send(ESC); break; }
        if (g.s.more) { await g.send(' '); continue; }
        if (isPrompt(g.s)) { await answer(g, rng); continue; }
        break;
    }
    await settle(g, rng);
    return letter;
}

async function useItem(g, rng, letter, cls, name) {
    const d = () => monsterDir(g.s, rng) || pick(rng, 'hjklyubn');
    switch (cls) {
    case 'wand': {
        let dir = d();
        if (/digging/.test(name)) dir = pick(rng, ['>', '>', d()]);
        else if (/polymorph|teleportation|speed monster|make invisible|probing|light|enlightenment|create monster|nothing|secret door|opening|locking|undead/.test(name)) dir = pick(rng, ['.', d(), d()]);
        else if (/death|fire|cold|lightning|sleep|magic missile|striking|cancellation|slow|stasis/.test(name)) dir = chance(rng, 0.12) ? '.' : d();
        await typeCmd(g, rng, 'z', { letter, dir });
        if (chance(rng, 0.5)) await typeCmd(g, rng, 'z', { letter, dir: d() });
        break;
    }
    case 'potion': await typeCmd(g, rng, 'q', { letter, yn: 'n' }); if (chance(rng, 0.3)) await ext(g, rng, 'dip', { letter }); break;
    case 'scroll': await typeCmd(g, rng, 'r', { letter, menuPick: true }); break;
    case 'spellbook':
        await typeCmd(g, rng, 'r', { letter, yn: 'y' });
        await wait(g, rng, 2);
        await typeCmd(g, rng, 'Z', { menuPick: true, dir: d() });
        if (chance(rng, 0.6)) await typeCmd(g, rng, 'Z', { menuPick: true, dir: d() });
        break;
    case 'ring': await typeCmd(g, rng, 'P', { letter }); await wait(g, rng, 3); if (chance(rng, 0.4)) await typeCmd(g, rng, 'R', { letter }); break;
    case 'amulet': await typeCmd(g, rng, 'P', { letter }); await wait(g, rng, 4); if (chance(rng, 0.3)) await typeCmd(g, rng, 'R', { letter }); break;
    case 'armor': await typeCmd(g, rng, 'W', { letter }); await wait(g, rng, 3); if (chance(rng, 0.4)) await typeCmd(g, rng, 'T', { letter }); break;
    case 'weapon': case 'artifact':
        await typeCmd(g, rng, 'w', { letter, yn: 'y' });
        await fight(g, rng, 3);
        if (cls === 'artifact' && chance(rng, 0.7)) await ext(g, rng, 'invoke', { letter, menuPick: true });
        if (chance(rng, 0.3)) await typeCmd(g, rng, 'X');
        break;
    case 'ammo': await typeCmd(g, rng, 'Q', { letter }); for (let i = 0; i < 3; i++) await typeCmd(g, rng, 'f', { dir: d() }); break;
    case 'tool':
        await typeCmd(g, rng, 'a', { letter, menuPick: true, dir: d(), yn: 'y' });
        if (/lamp|candle|lantern/.test(name)) await ext(g, rng, 'rub', { letter });
        if (/box|chest|sack|bag/.test(name)) { await typeCmd(g, rng, 'a', { letter, menuPick: true }); await ext(g, rng, 'tip', { letter, menuPick: true }); }
        if (/pick-axe|mattock/.test(name)) await typeCmd(g, rng, 'a', { letter, dir: pick(rng, ['>', d(), '<']) });
        if (/saddle/.test(name)) await ext(g, rng, 'ride', { dir: d() });
        if (/whistle|horn|flute|harp|drum|bugle|bell/.test(name)) await typeCmd(g, rng, 'a', { letter, dir: d(), yn: 'y' });
        break;
    case 'food': await typeCmd(g, rng, 'e', { letter, yn: 'y' }); await wait(g, rng, 2); break;
    case 'gem': await typeCmd(g, rng, chance(rng, 0.5) ? 't' : 'a', { letter, dir: d() }); break;
    case 'misc': await wait(g, rng, 1); if (/ball|chain/.test(name)) await typeCmd(g, rng, 'w', { letter }); break;
    default: break;
    }
    await settle(g, rng);
}

async function genesis(g, rng, name) {
    await settle(g, rng);
    await g.send(K_GENESIS);
    if (!/Create what kind of monster/.test(g.s.top)) { await settle(g, rng); return false; }
    await g.send(name + '\n');
    await settle(g, rng);
    return true;
}
async function fight(g, rng, n) {
    for (let i = 0; i < n && !g.full; i++) {
        await settle(g, rng);
        const dir = monsterDir(g.s, rng);
        if (dir) { await g.send('F' + dir); await answer(g, rng, { yn: pick(rng, 'yyn') }); }
        else await wait(g, rng, 1);
    }
}
async function chat(g, rng) { await ext(g, rng, 'chat', { dir: monsterDir(g.s, rng) || pick(rng, 'hjklyubn'), menuPick: true }); }
async function look(g, rng) {
    await settle(g, rng);
    const dir = monsterDir(g.s, rng);
    await g.send(';');
    if (dir) await g.send(dir + pick(rng, ['.', ',', ';', ':']));
    else await g.send(pick(rng, ['m.', 'm,', '<.', '>.', '_.', '.']));
    await settle(g, rng);
}
async function intrinsic(g, rng, letters, turns) {
    await settle(g, rng);
    await g.send('#wizintrinsic\n');
    if (!/Which intrinsics/.test(g.s.rows.join(' '))) { await settle(g, rng); return; }
    await g.send(letters.join('') + '\n');
    await settle(g, rng);
    await wait(g, rng, turns);
}
async function polyself(g, rng, form) {
    await settle(g, rng);
    await g.send('#polyself\n');
    if (/Become what kind of monster/.test(g.s.top)) await g.send(form + '\n');
    await settle(g, rng);
    if (chance(rng, 0.7)) await ext(g, rng, 'monster', { dir: monsterDir(g.s, rng) || pick(rng, 'hjklyubn'), menuPick: true });
    await wait(g, rng, 2);
}
async function levelport(g, rng, target) {
    await settle(g, rng);
    await g.send(K_LEVPORT);
    if (!/To what level/.test(g.s.top)) { await settle(g, rng); return false; }
    if (typeof target === 'number') { await g.send(String(target) + '\n'); await settle(g, rng); return true; }
    await g.send('?\n');
    for (let page = 0; page < 4 && g.s.menu; page++) {
        const hit = menuItems(g.s).find((it) => it.text.toLowerCase().includes(target.toLowerCase()));
        if (hit) { await g.send(hit.letter); await settle(g, rng); return true; }
        if (/\(\d+ of \d+\)/.test(g.s.rows.join('\n')) && !/\((\d+) of \1\)/.test(g.s.rows.join('\n'))) { await g.send('>'); continue; }
        break;
    }
    await settle(g, rng);
    return false;
}
async function inventory(g, rng) {
    await settle(g, rng);
    await g.send('i');
    const items = [];
    for (let page = 0; page < 3 && g.s.menu; page++) {
        let cls = '?';
        for (const r of g.s.rows) {
            const m = /^\s*([a-zA-Z$])\s-\s(.+)$/.exec(r);
            if (m) items.push({ letter: m[1], text: m[2], cls });
            else if (/^\s*(Weapons|Armor|Rings|Amulets|Tools|Comestibles|Potions|Scrolls|Spellbooks|Wands|Coins|Gems\/Stones|Boulders\/Statues|Iron balls|Chains)\s*$/.test(r)) cls = r.trim();
        }
        if (/\(\d+ of \d+\)/.test(g.s.rows.join('\n')) && !/\((\d+) of \1\)/.test(g.s.rows.join('\n'))) { await g.send('>'); continue; }
        break;
    }
    await settle(g, rng);
    return items;
}
const KIT_CLS = { Weapons: 'weapon', Armor: 'armor', Rings: 'ring', Amulets: 'amulet', Tools: 'tool', Comestibles: 'food', Potions: 'potion', Scrolls: 'scroll', Spellbooks: 'spellbook', Wands: 'wand', 'Gems/Stones': 'gem' };
async function kit(g, rng) {
    const items = shuffle(rng, await inventory(g, rng));
    for (const it of items.slice(0, 6)) {
        if (g.full) break;
        const cls = KIT_CLS[it.cls];
        if (!cls) continue;
        await useItem(g, rng, it.letter, cls, it.text);
    }
}
async function travel(g, rng) {
    await settle(g, rng);
    await g.send('_');
    if (/travel|Where do you want/.test(g.s.top)) await g.send(pick(rng, ['<', '>', '_', 'm']) + pick(rng, ['.', ',']));
    await settle(g, rng);
    await wait(g, rng, 1);
}
async function ordinary(g, rng, n) {
    for (let i = 0; i < n && !g.full; i++) {
        await settle(g, rng);
        const k = pick(rng, ['hjkl', 'yubn', 'HJKL', 's', '20s', ':', ',', 'i', '>', '<', 'kick', 'search', 'engrave', 'pray', 'travel', 'look', 'chat', 'sit', 'attributes', 'overview', 'conduct', 'terrain', 'enhance', 'discover', 'name', 'throw', 'drop', 'pickup', 'open', 'close', 'force', 'loot', 'untrap', 'jump', 'turn', 'offer', 'wipe', 'twoweapon', 'ride', 'fire', 'apply', 'read', 'quaff', 'zap', 'wear', 'puton', 'wield', 'eat', 'cast', 'teleport', 'invoke', 'rub', 'tip', 'dip', 'monster']);
        switch (k) {
        case 'hjkl': case 'yubn': case 'HJKL': await g.send(pick(rng, k)); break;
        case 'kick': await typeCmd(g, rng, K_KICK, { dir: pick(rng, 'hjklyubn') }); break;
        case 'search': await g.send('10s'); break;
        case 'engrave': await typeCmd(g, rng, 'E', { letter: '-' }); break;
        case 'pray': await ext(g, rng, 'pray', { yn: 'y' }); break;
        case 'travel': await travel(g, rng); break;
        case 'look': await look(g, rng); break;
        case 'chat': await chat(g, rng); break;
        case 'attributes': await typeCmd(g, rng, CTRL('x')); break;
        case 'overview': await typeCmd(g, rng, CTRL('o')); break;
        case 'discover': await typeCmd(g, rng, '\\'); break;
        case 'throw': await typeCmd(g, rng, 't', { dir: pick(rng, 'hjklyubn') }); break;
        case 'drop': await typeCmd(g, rng, 'd'); break;
        case 'pickup': await typeCmd(g, rng, ',', { menuPick: true }); break;
        case 'open': await typeCmd(g, rng, 'o', { dir: pick(rng, 'hjkl') }); break;
        case 'close': await typeCmd(g, rng, 'c', { dir: pick(rng, 'hjkl') }); break;
        case 'fire': await typeCmd(g, rng, 'f', { dir: pick(rng, 'hjklyubn') }); break;
        case 'apply': await typeCmd(g, rng, 'a', { menuPick: true }); break;
        case 'read': await typeCmd(g, rng, 'r', { menuPick: true }); break;
        case 'quaff': await typeCmd(g, rng, 'q', { yn: 'y' }); break;
        case 'zap': await typeCmd(g, rng, 'z'); break;
        case 'wear': await typeCmd(g, rng, 'W'); break;
        case 'puton': await typeCmd(g, rng, 'P'); break;
        case 'wield': await typeCmd(g, rng, 'w'); break;
        case 'eat': await typeCmd(g, rng, 'e', { yn: 'y' }); break;
        case 'cast': await typeCmd(g, rng, 'Z', { menuPick: true }); break;
        case 'teleport': await typeCmd(g, rng, K_TELE); break;
        case 'i': await typeCmd(g, rng, 'i'); break;
        case ':': case ',': case 's': case '20s': case '>': case '<': await g.send(k); break;
        default: await ext(g, rng, k, { menuPick: true, yn: 'y' }); break;
        }
        await settle(g, rng);
    }
}
async function die(g, rng) {
    /* let the disclosure / DYWYPI sequence run; the game exits by itself */
    for (let i = 0; i < 40 && !g.full; i++) {
        const top = g.s.top;
        if (g.s.more) { await g.send(' '); continue; }
        if (g.s.menu) { await g.send(chance(rng, 0.5) ? ESC : '\n'); continue; }
        if (/Die\?/.test(top)) { await g.send(pick(rng, 'yyn')); continue; }
        if (/\[ynq\]|\[yn\]|\[ynaq\]/.test(top)) { await g.send(pick(rng, ['y', 'n', 'q', 'y'])); continue; }
        if (/\?\s*$/.test(top)) { await g.send(ESC); continue; }
        break;
    }
}

/* ------------------------------------------------------------------ scenarios */
const FAMILIES = ['wish', 'genesis', 'poly', 'intrinsic', 'death', 'kit', 'tour', 'normal'];
function planFamily(rng, family) {
    if (family !== 'mixed') return family;
    return pick(rng, ['wish', 'wish', 'wish', 'genesis', 'genesis', 'poly', 'intrinsic', 'death', 'kit', 'tour', 'normal', 'normal']);
}
async function runScenario(g, rng, family) {
    const strong = () => ext(g, rng, 'levelchange', { level: String(pick(rng, [8, 12, 20, 30])) });
    switch (family) {
    case 'wish': {
        if (chance(rng, 0.5)) await strong();
        const n = 3 + Math.floor(rng() * 4);
        for (let i = 0; i < n && !g.full; i++) {
            const [name, cls] = pick(rng, WISH_POOL);
            const deco = cls === 'armor' || cls === 'weapon' || cls === 'ring' ? pick(rng, ['', '', 'blessed +3 ', 'cursed -1 ', 'uncursed +0 ', 'blessed ']) : pick(rng, ['', '', 'blessed ', 'cursed ', 'uncursed ', '3 ']);
            const letter = await wish(g, rng, deco + name);
            if (chance(rng, 0.35)) await genesis(g, rng, pick(rng, MONSTERS));
            if (letter) await useItem(g, rng, letter, cls, name);
            else if (chance(rng, 0.5)) { await typeCmd(g, rng, ',', { menuPick: true }); await settle(g, rng); }
            if (chance(rng, 0.4)) await fight(g, rng, 2);
        }
        await wait(g, rng, 2);
        break;
    }
    case 'genesis': {
        if (chance(rng, 0.6)) await strong();
        if (chance(rng, 0.5)) { const [name, cls] = pick(rng, [...WEAPONS, ...ARTIFACTS, ...ARMOR]); const l = await wish(g, rng, name); if (l) await useItem(g, rng, l, cls, name); }
        const n = 2 + Math.floor(rng() * 3);
        for (let i = 0; i < n && !g.full; i++) {
            const m = pick(rng, MONSTERS);
            await genesis(g, rng, m);
            const verb = pick(rng, ['fight', 'fight', 'chat', 'look', 'wait', 'fight']);
            if (verb === 'fight') await fight(g, rng, 2 + Math.floor(rng() * 5));
            else if (verb === 'chat') { await chat(g, rng); await fight(g, rng, 2); }
            else if (verb === 'look') { await look(g, rng); await wait(g, rng, 3); }
            else await wait(g, rng, 4 + Math.floor(rng() * 6));
        }
        break;
    }
    case 'poly': {
        if (chance(rng, 0.7)) await strong();
        const l = await wish(g, rng, 'blessed ring of polymorph control');
        if (l) await typeCmd(g, rng, 'P', { letter: l });
        if (chance(rng, 0.4)) { const [name, cls] = pick(rng, ARMOR); const a = await wish(g, rng, name); if (a) await useItem(g, rng, a, cls, name); }
        const n = 2 + Math.floor(rng() * 3);
        for (let i = 0; i < n && !g.full; i++) {
            await polyself(g, rng, pick(rng, POLY_FORMS));
            if (chance(rng, 0.5)) { await genesis(g, rng, pick(rng, MONSTERS)); await fight(g, rng, 3); }
            await wait(g, rng, 3);
        }
        if (chance(rng, 0.5)) { const [w, cls] = pick(rng, [['wand of polymorph', 'wand'], ['potion of polymorph', 'potion'], ['amulet of unchanging', 'amulet']]); const x = await wish(g, rng, w); if (x) await useItem(g, rng, x, cls, w); }
        break;
    }
    case 'intrinsic': {
        if (chance(rng, 0.5)) await strong();
        const rows = shuffle(rng, INTRINSICS).slice(0, 1 + Math.floor(rng() * 3));
        await intrinsic(g, rng, rows.map((r) => r[0]), Math.max(...rows.map((r) => r[2])) + 2);
        if (chance(rng, 0.5)) { const [name, cls] = pick(rng, [...POTIONS, ...SCROLLS, ...TOOLS]); const l = await wish(g, rng, name); if (l) await useItem(g, rng, l, cls, name); }
        await ordinary(g, rng, 6);
        await wait(g, rng, 6);
        break;
    }
    case 'death': {
        const how = pick(rng, ['monster', 'monster', 'stone', 'slime', 'sick', 'strangle', 'quit', 'zapself', 'fall', 'starve']);
        if (how === 'monster') { await genesis(g, rng, pick(rng, ['soldier ant', 'master mind flayer', 'cockatrice', 'Demogorgon', 'minotaur', 'black dragon', 'pit fiend', 'green slime', 'purple worm', 'Death', 'werewolf', 'electric eel', 'nurse'])); await fight(g, rng, 25); }
        else if (how === 'stone') await intrinsic(g, rng, ['b'], 40);
        else if (how === 'slime') await intrinsic(g, rng, ['c'], 45);
        else if (how === 'sick') await intrinsic(g, rng, ['e'], 45);
        else if (how === 'strangle') await intrinsic(g, rng, ['d'], 40);
        else if (how === 'quit') await ext(g, rng, 'quit', { yn: 'y' });
        else if (how === 'zapself') { const l = await wish(g, rng, pick(rng, ['wand of death', 'wand of fire', 'wand of lightning', 'wand of cold'])); if (l) await typeCmd(g, rng, 'z', { letter: l, dir: '.' }); await wait(g, rng, 3); }
        else if (how === 'fall') { const l = await wish(g, rng, 'wand of digging'); for (let i = 0; i < 6 && l && !g.full; i++) { await typeCmd(g, rng, 'z', { letter: l, dir: '>' }); await wait(g, rng, 1); } await fight(g, rng, 10); }
        else { await intrinsic(g, rng, ['a'], 2); await g.send('20s20s20s20s20s20s'); await settle(g, rng); await wait(g, rng, 20); }
        await die(g, rng);
        break;
    }
    case 'kit': await kit(g, rng); await ordinary(g, rng, 8); if (chance(rng, 0.5)) await kit(g, rng); break;
    case 'tour': {
        await strong();
        const stops = shuffle(rng, LEVEL_NAMES).slice(0, 3 + Math.floor(rng() * 3));
        for (const name of stops) {
            if (g.full) break;
            const ok = await levelport(g, rng, chance(rng, 0.25) ? 2 + Math.floor(rng() * 40) : name);
            if (!ok) continue;
            await ordinary(g, rng, 3);
            if (chance(rng, 0.5)) await look(g, rng);
            if (chance(rng, 0.3)) await typeCmd(g, rng, CTRL('f'));
            await wait(g, rng, 2);
        }
        break;
    }
    case 'normal': default:
        await ordinary(g, rng, 14 + Math.floor(rng() * 12));
        if (chance(rng, 0.5)) await kit(g, rng);
        await ordinary(g, rng, 6);
        break;
    }
    await settle(g, rng);
    if (chance(rng, 0.25)) await die(g, rng);
}

/* ------------------------------------------------------------------ second-wave families
   Each one aims at a subsystem the first eight only brush by chance:
   dungeon features and traps built by wizard wishes, Minetown shops and
   temple, Sokoban boulders, riding, pets, containers, stair descents that
   generate levels in sequence, launchers and thrown objects, spellcasting,
   acting while confused/stunned/hallucinating/blind, the options menus,
   engulfers, special monster attacks, long hunger-driven games, digging.
   They also vary the rc the way the public sessions do, and a quarter of
   them save and restore in a second segment. */
const WAVE2 = ['terrain', 'trap', 'town', 'sokoban', 'ride', 'pet', 'container', 'descend', 'ranged', 'caster', 'impaired', 'options', 'engulf', 'hazard', 'longrun', 'dig', 'quest', 'special', 'engrave', 'tutorial'];
const NORMAL_OK = new Set(['descend', 'longrun', 'pet', 'options']);
const ROLE_BIAS = {
    caster: ['Wizard', 'Priest', 'Healer', 'Monk'],
    ride: ['Knight', 'Knight', 'Valkyrie', 'Samurai'],
    ranged: ['Ranger', 'Samurai', 'Rogue'],
    dig: ['Archeologist', 'Valkyrie'],
    town: ['Tourist', 'Healer', 'Priest'],
};
const DIRS = { h: [-1, 0], j: [0, 1], k: [0, -1], l: [1, 0], y: [-1, -1], u: [1, -1], b: [-1, 1], n: [1, 1] };
const OPP = { h: 'l', l: 'h', j: 'k', k: 'j', y: 'n', n: 'y', u: 'b', b: 'u' };
const WALL_CH = /[│─┌┐└┘├┤┬┴┼]/;
const FEATURES = ['fountain', 'magic fountain', 'sink', 'throne', 'lawful altar', 'neutral altar', 'chaotic altar', 'unaligned altar', 'altar', 'grave', 'tree', 'pool', 'moat', 'ice', 'melting ice', 'iron bars', 'cloud'];
const TRAPS = ['arrow trap', 'dart trap', 'falling rock trap', 'squeaky board', 'rolling boulder trap', 'sleeping gas trap', 'rust trap', 'fire trap', 'pit', 'spiked pit', 'hole', 'trap door', 'teleportation trap', 'level teleporter', 'magic portal', 'web', 'statue trap', 'magic trap', 'anti-magic field', 'polymorph trap'];
const STEEDS = ['pony', 'pony', 'horse', 'warhorse', 'white unicorn', 'gray unicorn', 'black unicorn', 'baby red dragon', 'red dragon', 'mumak', 'titanothere', 'jackal', 'little dog'];
const PETS = ['kitten', 'little dog', 'pony', 'housecat', 'large dog', 'jackal', 'wolf', 'dingo', 'gnome lord', 'soldier ant', 'lichen', 'winter wolf cub', 'hill orc'];
const PREY = ['newt', 'jackal', 'grid bug', 'sewer rat', 'kobold', 'lichen', 'gnome', 'giant rat', 'acid blob', 'yellow mold'];
const CONTAINERS = ['sack', 'bag of holding', 'oilskin sack', 'large box', 'chest', 'ice box', 'bag of tricks', 'cursed bag of holding', 'locked large box', 'locked chest', 'blessed bag of holding'];
const LAUNCH = [['bow', '20 arrows'], ['elven bow', '20 elven arrows'], ['orcish bow', '20 orcish arrows'], ['yumi', '20 ya'], ['crossbow', '15 crossbow bolts'], ['sling', '20 flint stones'], [null, '10 daggers'], [null, '20 darts'], [null, '15 shuriken'], [null, '5 boomerangs'], [null, '8 spears'], [null, '6 javelins'], [null, '4 cream pies'], [null, '6 eggs'], [null, '8 rocks']];
const POLEARMS = ['glaive', 'halberd', 'bardiche', 'ranseur', 'spetum', 'lance', 'bullwhip', 'grappling hook'];
const ENGULFERS = ['fog cloud', 'dust vortex', 'ice vortex', 'energy vortex', 'steam vortex', 'fire vortex', 'purple worm', 'lurker above', 'trapper', 'air elemental', 'Juiblex', 'ochre jelly'];
const HAZARDS = ['floating eye', 'cockatrice', 'chickatrice', 'water nymph', 'wood nymph', 'mountain nymph', 'leprechaun', 'succubus', 'incubus', 'rust monster', 'disenchanter', 'gray ooze', 'black pudding', 'brown pudding', 'mind flayer', 'gelatinous cube', 'werewolf', 'wererat', 'quantum mechanic', 'chameleon', 'cobra', 'yellow light', 'gas spore', 'green slime', 'lich', 'soldier ant', 'giant mimic', 'nurse', 'Medusa', 'green mold', 'gremlin', 'owlbear', 'vampire lord', 'shrieker', 'ape'];
const DIG_TOOLS = ['pick-axe', 'dwarvish mattock', 'wand of digging'];
const FOOD_TOSS = ['tripe ration', 'meatball', 'food ration', 'apple', 'carrot', 'huge chunk of meat', 'lichen corpse', 'newt corpse', 'banana', 'fortune cookie'];
const IMPAIR = [['g', 'confused'], ['f', 'stunned'], ['h', 'hallucinating'], ['i', 'blinded'], ['j', 'deafness'], ['l', 'slippery fingers'], ['m', 'wounded legs']];
const OPTION_WORDS = { fruit: ['mango', 'durian', 'kumquat', 'slime mold', 'lychee'], dogname: ['Rex', 'Fido'], catname: ['Tom', 'Morris'], horsename: ['Silver', 'Trigger'] };

function optionValue(rng, name) {
    if (OPTION_WORDS[name]) return pick(rng, OPTION_WORDS[name]);
    if (/limit|amount|margin|history|lines|size|width|height|turns|threshold|count/.test(name)) return String(1 + Math.floor(rng() * 9));
    if (/pickup_types/.test(name)) return pick(rng, ['$?!/="+', '$', '%', 'all', '?!']);
    if (/packorder/.test(name)) return '$")[%?+!=/(*`0_';
    return pick(rng, ['on', 'off', 'yes', '1', 'mango']);
}

function makeRc2(rng, role, { mode, pet, tutorial = false }) {
    const [name, r, races, aligns] = role;
    const race = pick(rng, races), align = pick(rng, aligns), gender = pick(rng, ['male', 'female']);
    const lines = [
        `OPTIONS=name:${name},role:${r},race:${race},gender:${gender},align:${align}`,
        tutorial ? 'OPTIONS=!legacy,!splash_screen' : 'OPTIONS=!legacy,!splash_screen,!tutorial',
        `OPTIONS=suppress_alert:${chance(rng, 0.85) ? '3.4.3' : '3.3.1'}`,
        'OPTIONS=symset:DECgraphics',
    ];
    const opts = [];
    if (chance(rng, 0.55)) opts.push('!autopickup');
    else if (chance(rng, 0.5)) opts.push('autopickup', `pickup_types:${pick(rng, ['$', '$?!/="+', '%', '$?'])}`);
    if (chance(rng, 0.35)) opts.push('showexp', 'time');
    if (chance(rng, 0.2)) opts.push('pushweapon');
    if (chance(rng, 0.25)) opts.push('lit_corridor');
    if (chance(rng, 0.1)) opts.push('showrace');
    if (chance(rng, 0.1)) opts.push('!verbose');
    if (chance(rng, 0.1)) opts.push('mention_walls');
    if (chance(rng, 0.1)) opts.push('autodig');
    if (chance(rng, 0.1)) opts.push(`sortloot:${pick(rng, ['full', 'loot', 'none'])}`);
    if (chance(rng, 0.12)) opts.push(`runmode:${pick(rng, ['walk', 'crawl', 'run', 'teleport'])}`);
    if (chance(rng, 0.12)) opts.push(`fruit:${pick(rng, OPTION_WORDS.fruit)}`);
    if (chance(rng, 0.2)) opts.push(`disclose:${pick(rng, ['-i -a -v -g -c -o', 'yi ya yv yg yc yo', '+i +a -v -g +c -o'])}`);
    if (chance(rng, 0.1)) opts.push('msg_window:reversed');
    if (pet) opts.push(`pettype:${pet}`);
    if (mode === 'debug') opts.push('playmode:debug');
    if (mode === 'explore') opts.push('playmode:explore');
    for (const o of opts) lines.push(`OPTIONS=${o}`);
    if (chance(rng, 0.06)) lines.push('SYMBOLS=S_pool:~,S_fountain:{');
    return lines.join('\n') + '\n';
}

function dirWhere(s, rng, re) {
    if (!s || s.cy < 1 || s.cy > 21) return null;
    const m = neighbors(s).filter((n) => re.test(n.ch));
    return m.length ? pick(rng, m).k : null;
}
/* direction of a monster up to 8 squares away in a straight line */
function lineMonsterDir(s, rng) {
    if (!s || s.cy < 1 || s.cy > 21) return null;
    const hits = [];
    for (const [k, [dx, dy]] of Object.entries(DIRS)) {
        for (let r = 1; r <= 8; r++) {
            const x = s.cx + dx * r, y = s.cy + dy * r;
            if (y < 1 || y > 21 || x < 0 || x >= COLS_80) break;
            const ch = renderCell(s.grid[y][x]);
            if (MON_CH.test(ch)) { hits.push(k); break; }
            if (WALL_CH.test(ch) || ch === ' ') break;
        }
    }
    return hits.length ? pick(rng, hits) : null;
}
const screenText = (g) => g.s.rows.join('\n');
async function steps(g, rng, n, re = /[·#]/) {
    for (let i = 0; i < n && !g.full; i++) {
        await settle(g, rng);
        await g.send(dirWhere(g.s, rng, re) || pick(rng, 'hjklyubn'));
        await answer(g, rng);
    }
}
/* step to an adjacent floor square; returns the direction back */
async function stepAway(g, rng) {
    await settle(g, rng);
    const d = dirWhere(g.s, rng, /[·#]/);
    if (!d) return null;
    await g.send(d);
    await answer(g, rng);
    return OPP[d];
}
/* travel with getpos jumps; `_` + `.` again resumes toward the remembered
   destination when a monster interrupted the first leg */
async function travelTo(g, rng, jumps, again = 1) {
    for (let leg = 0; leg <= again && !g.full; leg++) {
        await settle(g, rng);
        await g.send('_');
        for (let i = 0; i < 3 && g.s.more && !g.full; i++) await g.send(' ');
        if (!/instructions|travel|Where/i.test(g.s.top)) { await settle(g, rng); return; }
        await g.send((leg ? '' : jumps) + pick(rng, ['.', '.', ',']));
        await settle(g, rng);
        if (/already here|Can't find dungeon feature/.test(g.s.top)) return;
        if (monsterDir(g.s, rng)) await fight(g, rng, 1);
    }
}
async function mapLevel(g, rng) { await settle(g, rng); await g.send(CTRL('f')); await settle(g, rng); }
async function shoot(g, rng, verb, ctx = {}) {
    const dir = lineMonsterDir(g.s, rng) || monsterDir(g.s, rng) || pick(rng, 'hjklyubn');
    await typeCmd(g, rng, verb, { ...ctx, dir });
}
function statusRows(g) { return g.s.rows.slice(22).join(' '); }
function lowHp(g) { const m = /HP:(\d+)\((\d+)\)/.exec(statusRows(g)); return m && Number(m[1]) * 3 < Number(m[2]); }
async function sit(g, rng) { await ext(g, rng, 'sit', { menuPick: true }); }
async function goDown(g, rng, { mapped }) {
    if (mapped) await mapLevel(g, rng);
    const jumps = '>'.repeat(1 + (chance(rng, 0.25) ? 1 : 0));
    for (let t = 0; t < 3 && !g.full; t++) {
        await travelTo(g, rng, jumps);
        await typeCmd(g, rng, '>');
        if (!/can't go down here/.test(g.s.top)) break;
        if (monsterDir(g.s, rng)) await fight(g, rng, 2);
    }
}

async function runWave2(g, rng, family, { debug }) {
    const strong = () => ext(g, rng, 'levelchange', { level: String(pick(rng, [6, 10, 14, 20, 30])) });
    switch (family) {
    case 'terrain': {
        if (chance(rng, 0.4)) await strong();
        await steps(g, rng, 2);
        for (const feat of shuffle(rng, FEATURES).slice(0, 2 + Math.floor(rng() * 3))) {
            if (g.full) break;
            await steps(g, rng, 1 + Math.floor(rng() * 2));
            await wish(g, rng, feat);
            if (/fountain/.test(feat)) {
                for (let i = 0; i < 1 + Math.floor(rng() * 3); i++) await typeCmd(g, rng, 'q', { yn: 'y' });
                if (chance(rng, 0.6)) {
                    if (chance(rng, 0.4)) { const l = await wish(g, rng, 'long sword'); if (l) await typeCmd(g, rng, '#dip\n', { letter: l, yn: 'y' }); }
                    else await ext(g, rng, 'dip', { yn: 'y' });
                }
            } else if (feat === 'sink') {
                await typeCmd(g, rng, 'q', { yn: 'y' });
                if (chance(rng, 0.5)) { const [rn] = pick(rng, RINGS); const l = await wish(g, rng, rn); if (l) await typeCmd(g, rng, 'd', { letter: l }); }
                const back = await stepAway(g, rng);
                for (let i = 0; back && i < 1 + Math.floor(rng() * 4); i++) await typeCmd(g, rng, K_KICK, { dir: back });
            } else if (feat === 'throne') {
                for (let i = 0; i < 1 + Math.floor(rng() * 4); i++) await sit(g, rng);
            } else if (/altar/.test(feat)) {
                for (let i = 0; i < 1 + Math.floor(rng() * 2); i++) await typeCmd(g, rng, 'd');
                const corpse = pick(rng, ['newt corpse', 'jackal corpse', 'lichen corpse', 'floating eye corpse', 'human corpse', 'dwarf corpse', 'elf corpse', 'gnome corpse']);
                const l = await wish(g, rng, corpse);
                if (l) await ext(g, rng, 'offer', { letter: l, yn: 'n' });
                if (chance(rng, 0.5)) await ext(g, rng, 'pray', { yn: 'y' });
            } else if (feat === 'grave') {
                await typeCmd(g, rng, ':');
                const tool = pick(rng, ['wand of digging', 'pick-axe']);
                const l = await wish(g, rng, tool);
                if (l) await typeCmd(g, rng, tool === 'pick-axe' ? 'a' : 'z', { letter: l, dir: '>' });
                await wait(g, rng, 2);
            } else if (feat === 'tree') {
                const back = await stepAway(g, rng);
                for (let i = 0; back && i < 1 + Math.floor(rng() * 3); i++) await typeCmd(g, rng, K_KICK, { dir: back });
                if (back && chance(rng, 0.4)) { const l = await wish(g, rng, 'axe'); if (l) await typeCmd(g, rng, 'a', { letter: l, dir: back, yn: 'y' }); }
            } else if (/pool|moat/.test(feat)) {
                if (chance(rng, 0.5)) await ext(g, rng, 'dip', { yn: 'y' });
                const back = await stepAway(g, rng);
                if (back) { await g.send(back); await answer(g, rng); }
            } else if (/ice|cloud|bars/.test(feat)) {
                const back = await stepAway(g, rng);
                for (let i = 0; back && i < 3; i++) { await g.send(pick(rng, [back, back, OPP[back]])); await answer(g, rng); }
            }
            if (chance(rng, 0.3)) await typeCmd(g, rng, ':');
        }
        if (chance(rng, 0.4)) await ext(g, rng, 'terrain', { menuPick: true });
        await ordinary(g, rng, 3);
        break;
    }
    case 'trap': {
        if (chance(rng, 0.4)) await strong();
        await steps(g, rng, 2);
        for (const tr of shuffle(rng, TRAPS).slice(0, 2 + Math.floor(rng() * 3))) {
            if (g.full) break;
            await steps(g, rng, 1 + Math.floor(rng() * 2));
            await wish(g, rng, tr);
            const back = await stepAway(g, rng);
            if (!back) continue;
            if (chance(rng, 0.3)) await typeCmd(g, rng, '^', { dir: back });
            const act = pick(rng, ['step', 'step', 'step', 'untrap', 'lure']);
            if (act === 'untrap') await ext(g, rng, 'untrap', { dir: back, yn: 'y' });
            else if (act === 'lure') { await genesis(g, rng, pick(rng, PREY)); await wait(g, rng, 4); }
            else { await g.send(back); await answer(g, rng, { yn: 'y' }); await wait(g, rng, 2); }
        }
        if (chance(rng, 0.3)) { const t = pick(rng, ['beartrap', 'land mine']); const l = await wish(g, rng, t); if (l) { await typeCmd(g, rng, 'a', { letter: l, yn: 'y' }); await steps(g, rng, 2); } }
        if (chance(rng, 0.4)) await ext(g, rng, 'terrain', { menuPick: true });
        await ordinary(g, rng, 3);
        break;
    }
    case 'town': {
        if (chance(rng, 0.5)) await strong();
        if (chance(rng, 0.75)) await wish(g, rng, pick(rng, ['2000 gold pieces', '500 gold pieces', '5000 gold pieces']));
        if (!(await levelport(g, rng, 'minetn'))) await levelport(g, rng, 5 + Math.floor(rng() * 4));
        await mapLevel(g, rng);
        if (chance(rng, 0.9)) { const l = await wish(g, rng, 'blessed potion of object detection'); if (l) await typeCmd(g, rng, 'q', { letter: l }); }
        for (let i = 0; i < 4 + Math.floor(rng() * 4) && !g.full; i++) {
            const what = pick(rng, ['shop', 'shop', 'shop', 'shop', 'temple', 'fountain', 'watch', 'door']);
            if (what === 'shop') {
                await travelTo(g, rng, 'o'.repeat(2 + Math.floor(rng() * 8)));
                if (chance(rng, 0.3)) await travelTo(g, rng, 'o'.repeat(1 + Math.floor(rng() * 3)));
                await typeCmd(g, rng, ',', { menuPick: true, yn: 'y' });
                const after = pick(rng, ['pay', 'pay', 'sell', 'chat', 'look', 'steal', 'price']);
                if (after === 'pay') await typeCmd(g, rng, 'p', { yn: 'y' });
                else if (after === 'sell') await typeCmd(g, rng, 'd', { yn: pick(rng, 'yn') });
                else if (after === 'chat') await chat(g, rng);
                else if (after === 'look') await typeCmd(g, rng, ':');
                else if (after === 'price') await typeCmd(g, rng, '$');
                else await typeCmd(g, rng, K_TELE, { yn: 'n' });
            } else if (what === 'temple') {
                await travelTo(g, rng, '_');
                await chat(g, rng);
                if (chance(rng, 0.4)) await ext(g, rng, 'pray', { yn: 'y' });
                if (chance(rng, 0.4)) await typeCmd(g, rng, 'd');
            } else if (what === 'fountain') {
                await travelTo(g, rng, '{');
                await typeCmd(g, rng, 'q', { yn: 'y' });
                if (chance(rng, 0.4)) await ext(g, rng, 'dip', { yn: 'y' });
            } else if (what === 'watch') {
                await travelTo(g, rng, 'm'.repeat(1 + Math.floor(rng() * 4)));
                await chat(g, rng);
            } else {
                await travelTo(g, rng, 'd'.repeat(1 + Math.floor(rng() * 5)));
                await typeCmd(g, rng, K_KICK, { dir: pick(rng, 'hjkl') });
            }
        }
        await ordinary(g, rng, 3);
        break;
    }
    case 'sokoban': {
        if (chance(rng, 0.3)) await strong();
        await levelport(g, rng, pick(rng, ['soko4', 'soko4', 'soko3', 'soko2', 'soko1']));
        if (chance(rng, 0.15)) { const l = await wish(g, rng, 'blessed ring of levitation'); if (l) await typeCmd(g, rng, 'P', { letter: l }); }
        for (let i = 0; i < 60 && !g.full; i++) {
            await settle(g, rng);
            const r = rng();
            const mon = monsterDir(g.s, rng);
            if (mon && r < 0.5) { await g.send('F' + mon); await answer(g, rng); continue; }
            const boulder = dirWhere(g.s, rng, /`/);
            if (boulder && r < 0.7) { await g.send(boulder); await answer(g, rng, { yn: 'y' }); continue; }
            if (r < 0.74) {
                const item = pick(rng, ['scroll of earth', 'wand of striking', 'wand of digging']);
                const l = await wish(g, rng, item);
                if (l && item.startsWith('scroll')) await typeCmd(g, rng, 'r', { letter: l });
                else if (l) await typeCmd(g, rng, 'z', { letter: l, dir: boulder || pick(rng, 'hjkl>') });
                continue;
            }
            if (r < 0.78) { await g.send('10s'); await settle(g, rng); continue; }
            await g.send(dirWhere(g.s, rng, /[·^]/) || pick(rng, 'hjklyubn'));
            await answer(g, rng, { yn: pick(rng, 'yyn') });
        }
        break;
    }
    case 'ride': {
        if (chance(rng, 0.5)) await strong();
        const steed = pick(rng, STEEDS);
        const own = g.seg.nethackrc.includes('pettype:horse') || (g.seg.nethackrc.includes('role:Knight') && !g.seg.nethackrc.includes('pettype:'));
        const tameBy = async (name) => {
            await genesis(g, rng, name);
            const t = await wish(g, rng, 'scroll of taming');
            if (t) await typeCmd(g, rng, 'r', { letter: t });
        };
        const saddleUp = async () => {
            const l = await wish(g, rng, 'saddle');
            if (l) await typeCmd(g, rng, 'a', { letter: l, yn: 'y' });
        };
        if (own && chance(rng, 0.6)) await saddleUp();
        else if (chance(rng, 0.5)) { await tameBy(steed); await saddleUp(); }
        else if (chance(rng, 0.5)) await genesis(g, rng, `tame saddled ${steed}`);
        else { await genesis(g, rng, `tame ${steed}`); await saddleUp(); }
        if (chance(rng, 0.3)) { const l = await wish(g, rng, 'lance'); if (l) await typeCmd(g, rng, 'w', { letter: l, yn: 'y' }); }
        await ext(g, rng, 'ride', { yn: 'y' });
        for (let t = 0; t < 2 && !/You mount|riding/.test(screenText(g)) && !g.full; t++) {
            const horse = pick(rng, ['pony', 'horse', 'warhorse']);
            if (chance(rng, 0.5)) { await tameBy(horse); await saddleUp(); } else await genesis(g, rng, `tame saddled ${horse}`);
            await ext(g, rng, 'ride', { yn: 'y' });
        }
        for (let i = 0; i < 4 + Math.floor(rng() * 4) && !g.full; i++) {
            const act = pick(rng, ['walk', 'walk', 'fight', 'kick', 'pickup', 'stairs', 'dismount', 'wait']);
            if (act === 'walk') await steps(g, rng, 2 + Math.floor(rng() * 4));
            else if (act === 'fight') { await genesis(g, rng, pick(rng, PREY)); await fight(g, rng, 3); }
            else if (act === 'kick') await typeCmd(g, rng, K_KICK, { dir: pick(rng, 'hjklyubn') });
            else if (act === 'pickup') await typeCmd(g, rng, ',', { menuPick: true });
            else if (act === 'stairs') await goDown(g, rng, { mapped: true });
            else if (act === 'dismount') { await ext(g, rng, 'ride', { yn: 'y' }); await wait(g, rng, 1); await ext(g, rng, 'ride', { yn: 'y' }); }
            else await wait(g, rng, 2);
        }
        break;
    }
    case 'pet': {
        if (debug) {
            for (let i = 0; i < 1 + Math.floor(rng() * 2); i++) {
                if (chance(rng, 0.5)) { await genesis(g, rng, `tame ${pick(rng, PETS)}`); continue; }
                /* domestic animals are tamed by thrown food (dogfood/tamedog) */
                await genesis(g, rng, pick(rng, ['kitten', 'little dog', 'pony', 'housecat', 'large dog', 'horse']));
                const l = await wish(g, rng, pick(rng, FOOD_TOSS));
                if (l) await typeCmd(g, rng, 't', { letter: l, dir: monsterDir(g.s, rng) || pick(rng, 'hjklyubn') });
            }
        }
        for (let i = 0; i < 5 + Math.floor(rng() * 4) && !g.full; i++) {
            const act = pick(rng, debug
                ? ['feed', 'feed', 'leash', 'chat', 'name', 'swap', 'hunt', 'drop', 'whistle', 'tame', 'stairs', 'rest']
                : ['swap', 'swap', 'drop', 'chat', 'name', 'rest', 'rest', 'walk', 'throw']);
            if (act === 'feed') { const f = pick(rng, FOOD_TOSS); const l = await wish(g, rng, f); if (l) await typeCmd(g, rng, 't', { letter: l, dir: monsterDir(g.s, rng) || pick(rng, 'hjklyubn') }); }
            else if (act === 'leash') { const l = await wish(g, rng, 'leash'); if (l) { await typeCmd(g, rng, 'a', { letter: l }); await steps(g, rng, 4); await typeCmd(g, rng, 'a', { letter: l }); } }
            else if (act === 'chat') await chat(g, rng);
            else if (act === 'name') await ext(g, rng, 'name', { menuPick: true });
            else if (act === 'swap') { const d = monsterDir(g.s, rng); if (d) { await g.send(d); await answer(g, rng); } else await steps(g, rng, 2); }
            else if (act === 'hunt') { await genesis(g, rng, pick(rng, PREY)); await wait(g, rng, 6); }
            else if (act === 'drop') { await typeCmd(g, rng, 'd'); await wait(g, rng, 3); }
            else if (act === 'whistle') { const l = await wish(g, rng, pick(rng, ['magic whistle', 'tin whistle'])); if (l) { await steps(g, rng, 3); await typeCmd(g, rng, 'a', { letter: l }); } }
            else if (act === 'tame') { await genesis(g, rng, pick(rng, PREY)); const l = await wish(g, rng, 'scroll of taming'); if (l) await typeCmd(g, rng, 'r', { letter: l }); }
            else if (act === 'stairs') await goDown(g, rng, { mapped: true });
            else if (act === 'throw') await typeCmd(g, rng, 't', { dir: monsterDir(g.s, rng) || pick(rng, 'hjklyubn') });
            else if (act === 'walk') await steps(g, rng, 4);
            else { await g.send(pick(rng, ['10s', '20s'])); await settle(g, rng); }
        }
        break;
    }
    case 'container': {
        const held = [];
        for (const c of shuffle(rng, CONTAINERS).slice(0, 1 + Math.floor(rng() * 3))) { const l = await wish(g, rng, c); if (l) held.push([l, c]); }
        for (let i = 0; i < 1 + Math.floor(rng() * 3); i++) { const [n] = pick(rng, [...POTIONS, ...SCROLLS, ...GEMS, ...WANDS, ...RINGS]); await wish(g, rng, n); }
        if (chance(rng, 0.15)) await wish(g, rng, 'wand of cancellation');
        for (let i = 0; i < 4 + Math.floor(rng() * 4) && !g.full && held.length; i++) {
            const [l, c] = pick(rng, held);
            const act = pick(rng, ['apply', 'apply', 'apply', 'floor', 'tip', 'unlock', 'force', 'kick']);
            if (act === 'apply') await typeCmd(g, rng, 'a', { letter: l, menuPick: true, yn: 'y' });
            else if (act === 'tip') await ext(g, rng, 'tip', { letter: l, menuPick: true, yn: 'y' });
            else if (act === 'floor') { await typeCmd(g, rng, 'd', { letter: l }); await ext(g, rng, 'loot', { menuPick: true, yn: 'y' }); await typeCmd(g, rng, ',', { menuPick: true }); }
            else if (act === 'unlock') { const k = await wish(g, rng, pick(rng, ['skeleton key', 'lock pick', 'credit card'])); await typeCmd(g, rng, 'd', { letter: l }); if (k) { await typeCmd(g, rng, 'a', { letter: k, dir: '.', yn: 'y' }); await wait(g, rng, 3); } await ext(g, rng, 'loot', { menuPick: true, yn: 'y' }); }
            else if (act === 'force') { const w = await wish(g, rng, pick(rng, ['dagger', 'long sword', 'mace'])); if (w) await typeCmd(g, rng, 'w', { letter: w }); await typeCmd(g, rng, 'd', { letter: l }); await ext(g, rng, 'force', { yn: 'y' }); await wait(g, rng, 3); }
            else { await typeCmd(g, rng, 'd', { letter: l }); const back = await stepAway(g, rng); if (back) await typeCmd(g, rng, K_KICK, { dir: back }); }
            if (/bag of tricks/.test(c) && chance(rng, 0.5)) await fight(g, rng, 2);
        }
        if (chance(rng, 0.4)) await typeCmd(g, rng, 'i');
        break;
    }
    case 'descend': {
        const levels = 3 + Math.floor(rng() * 5);
        for (let i = 0; i < levels && !g.full; i++) {
            if (debug) await goDown(g, rng, { mapped: true });
            else {
                for (let j = 0; j < 4 && !g.full; j++) { await g.send(pick(rng, 'HJKLYUBN')); await answer(g, rng); }
                await travelTo(g, rng, '>');
                await typeCmd(g, rng, '>');
            }
            const mon = monsterDir(g.s, rng);
            if (mon) await fight(g, rng, 3);
            if (chance(rng, 0.3)) await ordinary(g, rng, 2);
            if (chance(rng, 0.1)) await typeCmd(g, rng, '<');
        }
        if (chance(rng, 0.4)) await typeCmd(g, rng, CTRL('o'));
        break;
    }
    case 'ranged': {
        if (chance(rng, 0.4)) await strong();
        const [launcher, ammo] = pick(rng, LAUNCH);
        if (launcher) { const l = await wish(g, rng, launcher); if (l) await typeCmd(g, rng, 'w', { letter: l, yn: 'y' }); }
        const a = await wish(g, rng, ammo);
        if (a) await typeCmd(g, rng, 'Q', { letter: a, yn: 'y' });
        for (let r = 0; r < 1 + Math.floor(rng() * 3) && !g.full; r++) {
            await genesis(g, rng, (chance(rng, 0.15) ? `${2 + Math.floor(rng() * 3)} ` : '') + pick(rng, [...PREY, 'hill orc', 'soldier', 'gnome lord', 'dwarf', 'owlbear', 'troll']));
            await steps(g, rng, 1 + Math.floor(rng() * 2));
            for (let i = 0; i < 2 + Math.floor(rng() * 4) && !g.full; i++) await shoot(g, rng, 'f', { yn: 'y' });
            if (chance(rng, 0.4)) await fight(g, rng, 2);
            if (chance(rng, 0.3)) { const [p] = pick(rng, POTIONS); const l = await wish(g, rng, p); if (l) await shoot(g, rng, 't', { letter: l }); }
        }
        if (chance(rng, 0.4)) { const p = pick(rng, POLEARMS); const l = await wish(g, rng, p); if (l) { await typeCmd(g, rng, 'w', { letter: l, yn: 'y' }); await genesis(g, rng, pick(rng, PREY)); await steps(g, rng, 1); await typeCmd(g, rng, 'a', { letter: l, dir: monsterDir(g.s, rng) || pick(rng, 'hjkl') }); } }
        if (chance(rng, 0.3)) { await typeCmd(g, rng, 'x'); await ext(g, rng, 'twoweapon'); await fight(g, rng, 2); }
        await steps(g, rng, 3, /[·#)(]/);
        await typeCmd(g, rng, ',', { menuPick: true });
        if (chance(rng, 0.5)) await ext(g, rng, 'enhance', { menuPick: true });
        break;
    }
    case 'caster': {
        if (chance(rng, 0.6)) await strong();
        for (const [book] of shuffle(rng, SPELLBOOKS).slice(0, 2 + Math.floor(rng() * 3))) {
            if (g.full) break;
            const l = await wish(g, rng, (chance(rng, 0.7) ? 'blessed ' : '') + book);
            if (l) { await typeCmd(g, rng, 'r', { letter: l, yn: 'y' }); await wait(g, rng, 1); }
        }
        await typeCmd(g, rng, '+', { menuPick: chance(rng, 0.3) });
        for (let i = 0; i < 4 + Math.floor(rng() * 5) && !g.full; i++) {
            if (chance(rng, 0.3)) await genesis(g, rng, pick(rng, [...PREY, 'hill orc', 'zombie', 'ghoul', 'gnome lord']));
            await typeCmd(g, rng, 'Z', { menuPick: true, dir: lineMonsterDir(g.s, rng) || monsterDir(g.s, rng) || pick(rng, 'hjklyubn.'), yn: 'y' });
            if (chance(rng, 0.2)) await fight(g, rng, 1);
        }
        if (chance(rng, 0.4)) await ext(g, rng, 'turn', { yn: 'y' });
        if (chance(rng, 0.4)) await ext(g, rng, 'pray', { yn: 'y' });
        if (chance(rng, 0.4)) await ext(g, rng, 'enhance', { menuPick: true });
        break;
    }
    case 'impaired': {
        const pickd = shuffle(rng, IMPAIR).slice(0, 1 + Math.floor(rng() * 2));
        await intrinsic(g, rng, pickd.map((r) => r[0]), 0);
        if (chance(rng, 0.3)) { const l = await wish(g, rng, pick(rng, ['blindfold', 'towel'])); if (l) await typeCmd(g, rng, 'a', { letter: l }); }
        for (let i = 0; i < 3 + Math.floor(rng() * 4) && !g.full; i++) {
            const kind = pick(rng, ['scroll', 'scroll', 'scroll', 'potion', 'wand', 'walk', 'look', 'engrave', 'eat', 'spell']);
            if (kind === 'walk') await steps(g, rng, 3);
            else if (kind === 'look') await look(g, rng);
            else if (kind === 'engrave') await typeCmd(g, rng, 'E', { letter: '-' });
            else if (kind === 'eat') { const [f] = pick(rng, FOOD); const l = await wish(g, rng, f); if (l) await typeCmd(g, rng, 'e', { letter: l, yn: 'y' }); }
            else if (kind === 'spell') await typeCmd(g, rng, 'Z', { menuPick: true, dir: pick(rng, 'hjkl.') });
            else {
                const [n, cls] = pick(rng, kind === 'scroll' ? SCROLLS : kind === 'potion' ? POTIONS : WANDS);
                const l = await wish(g, rng, pick(rng, ['', '', 'blessed ', 'cursed ']) + n);
                if (l) await useItem(g, rng, l, cls, n);
            }
        }
        await wait(g, rng, 3);
        break;
    }
    case 'options': {
        for (let i = 0; i < 4 + Math.floor(rng() * 4) && !g.full; i++) {
            await settle(g, rng);
            const full = chance(rng, 0.4);
            await g.send(full ? 'mO' : 'O');
            if (!g.s.menu) { await settle(g, rng); continue; }
            for (let p = Math.floor(rng() * (full ? 7 : 2)); p > 0 && g.s.menu; p--) await g.send('>');
            const items = menuItems(g.s).filter((it) => !/number_pad|symset|statuslines|^\?/.test(it.text) && it.letter !== '?');
            for (const it of shuffle(rng, items).slice(0, 1 + Math.floor(rng() * 3))) await g.send(it.letter);
            await g.send('\n');
            await answer(g, rng, { menuPick: true });
            await ordinary(g, rng, 1 + Math.floor(rng() * 2));
        }
        await wait(g, rng, 2);
        break;
    }
    case 'engulf': {
        if (chance(rng, 0.6)) await strong();
        if (chance(rng, 0.3)) {
            await polyself(g, rng, pick(rng, ['fog cloud', 'purple worm', 'air elemental', 'dust vortex', 'fire vortex', 'trapper', 'ochre jelly']));
            for (let i = 0; i < 2 && !g.full; i++) { await genesis(g, rng, pick(rng, PREY)); await fight(g, rng, 4); }
        } else {
            await genesis(g, rng, `${chance(rng, 0.3) ? 'hostile ' : ''}${pick(rng, ENGULFERS)}`);
            for (let i = 0; i < 12 && !g.full; i++) {
                const inside = /engulf|swallow|You are (surrounded|hit)|stomach|pulsating|whirling/.test(screenText(g));
                const r = rng();
                if (inside && r < 0.2) { const [n, cls] = pick(rng, [['wand of digging', 'wand'], ['wand of fire', 'wand'], ['scroll of fire', 'scroll'], ['potion of acid', 'potion']]); const l = await wish(g, rng, n); if (l) await useItem(g, rng, l, cls, n); }
                else if (r < 0.7) { await g.send('F' + (monsterDir(g.s, rng) || pick(rng, 'hjklyubn'))); await answer(g, rng); }
                else if (r < 0.8) await ext(g, rng, 'pray', { yn: 'y' });
                else await wait(g, rng, 1);
            }
        }
        break;
    }
    case 'hazard': {
        if (chance(rng, 0.5)) await strong();
        if (chance(rng, 0.4)) { const [n, cls] = pick(rng, [...ARMOR, ...WEAPONS]); const l = await wish(g, rng, n); if (l) await useItem(g, rng, l, cls, n); }
        for (const m of shuffle(rng, HAZARDS).slice(0, 2 + Math.floor(rng() * 2))) {
            if (g.full) break;
            if (/cockatrice|chickatrice/.test(m) && chance(rng, 0.4)) {
                if (chance(rng, 0.5)) { const gl = await wish(g, rng, 'leather gloves'); if (gl) await typeCmd(g, rng, 'W', { letter: gl }); }
                const c = await wish(g, rng, `${m} corpse`);
                if (c) await typeCmd(g, rng, 'w', { letter: c, yn: 'y' });
                await genesis(g, rng, pick(rng, PREY));
                await fight(g, rng, 3);
                continue;
            }
            if (/leprechaun/.test(m)) await wish(g, rng, '300 gold pieces');
            await genesis(g, rng, m);
            await fight(g, rng, 3 + Math.floor(rng() * 5));
            await wait(g, rng, 2);
            if (lowHp(g)) await ext(g, rng, 'pray', { yn: 'y' });
        }
        break;
    }
    case 'longrun': {
        const deep = debug && chance(rng, 0.5);
        if (deep) await levelport(g, rng, 2 + Math.floor(rng() * 6));
        for (let i = 0; i < 40 && !g.full; i++) {
            await settle(g, rng);
            const st = statusRows(g);
            if (/Weak|Fainting|Fainted/.test(st) && chance(rng, 0.5)) { await ext(g, rng, 'pray', { yn: 'y' }); continue; }
            if (/Hungry|Weak/.test(st)) { await typeCmd(g, rng, 'e', { yn: 'y' }); continue; }
            if (lowHp(g) && chance(rng, 0.5)) { await ext(g, rng, 'pray', { yn: 'y' }); continue; }
            const mon = monsterDir(g.s, rng);
            if (mon) { await fight(g, rng, 3); continue; }
            const r = rng();
            if (r < 0.5) { await g.send(pick(rng, ['50s', '100s', '100s', '150s'])); await settle(g, rng); }
            else if (r < 0.7) await steps(g, rng, 3);
            else if (r < 0.8) await ordinary(g, rng, 1);
            else if (r < 0.88) { await travelTo(g, rng, '>'); await typeCmd(g, rng, '>'); }
            else await typeCmd(g, rng, pick(rng, [CTRL('x'), 'i', CTRL('o'), '\\']));
        }
        break;
    }
    case 'dig': {
        const tool = pick(rng, DIG_TOOLS);
        const l = await wish(g, rng, tool);
        if (!l) { await ordinary(g, rng, 6); break; }
        const verb = tool.startsWith('wand') ? 'z' : 'a';
        if (chance(rng, 0.3)) await levelport(g, rng, pick(rng, ['minetn', 'oracle', 'bigrm', 5, 9]));
        for (let i = 0; i < 3 + Math.floor(rng() * 4) && !g.full; i++) {
            const act = pick(rng, ['down', 'down', 'wall', 'wall', 'stairs', 'grave', 'up', 'shop']);
            if (act === 'down') { await typeCmd(g, rng, verb, { letter: l, dir: '>', yn: 'y' }); await wait(g, rng, 1); if (verb === 'a' && chance(rng, 0.6)) await typeCmd(g, rng, verb, { letter: l, dir: '>', yn: 'y' }); }
            else if (act === 'wall') { const d = dirWhere(g.s, rng, /[│─┌┐└┘├┤┬┴┼ ]/) || pick(rng, 'hjkl'); await typeCmd(g, rng, verb, { letter: l, dir: d, yn: 'y' }); await g.send(d); await answer(g, rng); }
            else if (act === 'stairs') { await travelTo(g, rng, pick(rng, ['<', '>'])); await typeCmd(g, rng, verb, { letter: l, dir: '>' }); }
            else if (act === 'grave') { await steps(g, rng, 1); await wish(g, rng, 'grave'); await typeCmd(g, rng, verb, { letter: l, dir: '>' }); await wait(g, rng, 2); }
            else if (act === 'up') await typeCmd(g, rng, verb, { letter: l, dir: '<' });
            else { await mapLevel(g, rng); await travelTo(g, rng, 'o'.repeat(1 + Math.floor(rng() * 4))); await typeCmd(g, rng, verb, { letter: l, dir: '>', yn: 'y' }); }
            if (chance(rng, 0.3)) await steps(g, rng, 2);
        }
        break;
    }
    case 'quest': {
        if (chance(rng, 0.7)) await ext(g, rng, 'levelchange', { level: String(pick(rng, [14, 16, 20])) });
        if (!(await levelport(g, rng, '-strt'))) await levelport(g, rng, 14);
        for (let i = 0; i < 3 + Math.floor(rng() * 3) && !g.full; i++) {
            await travelTo(g, rng, 'm'.repeat(1 + Math.floor(rng() * 5)));
            await chat(g, rng);
            if (chance(rng, 0.3)) await look(g, rng);
        }
        if (chance(rng, 0.4)) await goDown(g, rng, { mapped: true });
        if (chance(rng, 0.3)) await levelport(g, rng, pick(rng, ['-loca', '-goal', '-fila']));
        await ordinary(g, rng, 3);
        break;
    }
    case 'special': {
        if (chance(rng, 0.6)) await strong();
        const where = pick(rng, ['oracle', 'oracle', 'castle', 'castle', 'bigrm', 'valley', 'medusa']);
        if (where === 'oracle') await wish(g, rng, pick(rng, ['2000 gold pieces', '800 gold pieces', '60 gold pieces']));
        if (where === 'medusa' && chance(rng, 0.6)) { const l = await wish(g, rng, pick(rng, ['blindfold', 'shield of reflection', 'towel'])); if (l) await typeCmd(g, rng, /shield/.test(g.s.top) ? 'W' : 'P', { letter: l }); }
        const tune = await levelportTune(g, rng, where);
        await mapLevel(g, rng);
        if (where === 'oracle') {
            for (let i = 0; i < 3 && !g.full; i++) { await travelTo(g, rng, 'm'.repeat(1 + Math.floor(rng() * 3))); await chat(g, rng); }
            await travelTo(g, rng, '{');
            await typeCmd(g, rng, 'q', { yn: 'y' });
        } else if (where === 'castle') {
            const inst = pick(rng, ['wooden flute', 'magic flute', 'tooled horn', 'wooden harp', 'bugle', 'leather drum']);
            const l = await wish(g, rng, inst);
            if (l) {
                for (let i = 0; i < 2 && !g.full; i++) {
                    await typeCmd(g, rng, 'a', { letter: l, yn: 'n' });
                    if (/What tune are you playing/.test(g.s.top)) { await g.send((tune && chance(rng, 0.6) ? tune : shuffle(rng, 'ABCDEFG'.split('')).slice(0, 5).join('')) + '\n'); await settle(g, rng); }
                    await steps(g, rng, 2);
                }
            }
            if (chance(rng, 0.5)) { const w = await wish(g, rng, pick(rng, ['wand of striking', 'wand of opening', 'wand of locking'])); if (w) await typeCmd(g, rng, 'z', { letter: w, dir: pick(rng, 'hjkl') }); }
        } else if (where === 'valley') {
            await travelTo(g, rng, '_');
            await chat(g, rng);
            await wait(g, rng, 3);
        } else {
            await fight(g, rng, 6);
            await steps(g, rng, 4);
        }
        await ordinary(g, rng, 3);
        break;
    }
    case 'engrave': {
        await steps(g, rng, 2);
        const tools = shuffle(rng, [...WANDS.map((w) => w[0]), 'athame', 'diamond', 'ruby', 'magic marker', 'towel', '-']).slice(0, 3 + Math.floor(rng() * 3));
        for (const t of tools) {
            if (g.full) break;
            const l = t === '-' ? '-' : await wish(g, rng, t);
            if (!l) continue;
            await typeCmd(g, rng, 'E', { letter: l, yn: pick(rng, 'nny') });
            if (chance(rng, 0.6)) await typeCmd(g, rng, ':');
            if (chance(rng, 0.3)) await steps(g, rng, 1);
        }
        if (chance(rng, 0.6)) {
            await typeCmd(g, rng, 'E', { letter: '-', yn: 'n' });
            await genesis(g, rng, pick(rng, ['jackal', 'hill orc', 'gnome lord', 'soldier ant', 'minotaur']));
            await wait(g, rng, 3);
            if (chance(rng, 0.5)) await fight(g, rng, 2);
        }
        break;
    }
    case 'tutorial': {
        for (let i = 0; i < 12 && !g.full; i++) {
            if (/Do you want a tutorial/.test(screenText(g))) { await g.send(chance(rng, 0.85) ? 'y' : 'n'); break; }
            if (g.s.more) await g.send(' '); else break;
        }
        for (let i = 0; i < 28 && !g.full; i++) {
            const r = rng();
            if (r < 0.4) await steps(g, rng, 3);
            else if (r < 0.55) await typeCmd(g, rng, ':');
            else if (r < 0.65) { await travelTo(g, rng, pick(rng, ['>', '<', '_', 'd'])); }
            else if (r < 0.75) await typeCmd(g, rng, pick(rng, ['>', '<']));
            else await ordinary(g, rng, 1);
        }
        break;
    }
    default: await ordinary(g, rng, 10);
    }
    await settle(g, rng);
}

/* ^V ? by name; returns the castle tune when the menu shows one */
async function levelportTune(g, rng, target) {
    await settle(g, rng);
    await g.send(K_LEVPORT);
    if (!/To what level/.test(g.s.top)) { await settle(g, rng); return null; }
    await g.send('?\n');
    let tune = null;
    for (let page = 0; page < 4 && g.s.menu; page++) {
        for (const r of g.s.rows) { const m = /\(tune ([A-G]{5})\)/.exec(r); if (m) tune = m[1]; }
        const hit = menuItems(g.s).find((it) => it.text.toLowerCase().includes(target.toLowerCase()));
        if (hit) { await g.send(hit.letter); await settle(g, rng); return tune; }
        if (/\(\d+ of \d+\)/.test(g.s.rows.join('\n')) && !/\((\d+) of \1\)/.test(g.s.rows.join('\n'))) { await g.send('>'); continue; }
        break;
    }
    await settle(g, rng);
    return tune;
}

/* ------------------------------------------------------------------ driver */
async function authorWave2({ seed, family, inst, trace }) {
    const rng = mulberry32(seed ^ 0x5eed2);
    const fam = family;
    const bias = ROLE_BIAS[fam];
    const want = bias && chance(rng, 0.6) ? pick(rng, bias) : null;
    const role = want ? ROLES.find((r) => r[1] === want) : pick(rng, ROLES);
    const mode = fam === 'tutorial' ? 'normal'
        : !NORMAL_OK.has(fam) ? 'debug'
            : pick(rng, fam === 'longrun' ? ['normal', 'normal', 'explore', 'debug'] : ['debug', 'debug', 'normal', 'explore']);
    let pet = chance(rng, 0.3) ? pick(rng, ['none', 'cat', 'dog', 'horse']) : null;
    if (fam === 'pet' && pet === 'none') pet = null;
    if (fam === 'ride' && chance(rng, 0.5)) pet = 'horse';
    const nethackrc = makeRc2(rng, role, { mode, pet, tutorial: fam === 'tutorial' });
    const datetime = pick(rng, DATETIMES);
    const seg = { seed, datetime, timezone: PIN_TZ, nethackrc, moves: '' };
    const split = fam !== 'options' && chance(rng, 0.25);
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'nh-sg-'));
    const segs = [];
    const mk = (s, opts) => new Game({ seg: s, binary: inst.binary, installDir: inst.installDir, homeDir: path.join(tmp, 'home'), rngLogPath: path.join(tmp, 'rng.log'), tz: PIN_TZ, trace, ...opts });
    const g = mk(seg, { maxKeys: split ? 230 : MAX_KEYS });
    let saved = false;
    try {
        await g.start();
        await runWave2(g, rng, fam, { debug: mode === 'debug' });
        if (!g.full && g.moves.length < 160 && chance(rng, 0.75)) await runWave2(g, rng, fam, { debug: mode === 'debug' });
        if (split && !g.ended) {
            g.maxKeys += 16;
            await settle(g, rng);
            await g.send('S');
            if (/Really save/.test(g.s.top)) await g.send('y');
            for (let i = 0; i < 4 && !g.ended; i++) await g.send(g.s.more ? ' ' : ESC);
            saved = g.ended && /S.*y/.test(g.moves.slice(-6));
        } else if (chance(rng, 0.2)) await die(g, rng);
    } catch (e) {
        if (trace) console.error('driver stopped:', e.message);
    } finally {
        await g.stop();
    }
    segs.push({ ...seg, moves: g.moves });
    let steps2 = 0;
    if (saved) {
        const seg2 = { seed: seed + 500000, datetime: pick(rng, DATETIMES), timezone: PIN_TZ, nethackrc, moves: '' };
        const g2 = mk(seg2, { maxKeys: 110, wipeSave: false });
        try {
            await g2.start();
            await settle(g2, rng);
            await ordinary(g2, rng, 6 + Math.floor(rng() * 6));
            if (chance(rng, 0.5)) await runWave2(g2, rng, pick(rng, ['terrain', 'trap', 'ranged', 'hazard', 'pet']), { debug: mode === 'debug' });
        } catch (e) {
            if (trace) console.error('driver stopped (restore):', e.message);
        } finally {
            await g2.stop();
        }
        if (g2.moves.length) segs.push({ ...seg2, moves: g2.moves });
        steps2 = g2.steps;
    }
    await fs.rm(tmp, { recursive: true, force: true }).catch(() => {});
    const moves = segs.map((s) => s.moves).join('');
    return { id: `scen-${fam}-${role[1]}-${seed}`, fam, role: role[1], moves, steps: g.steps + steps2, ended: g.ended, exit: g.exit, segs };
}

async function author({ seed, family, inst, trace }) {
    const rng = mulberry32(seed);
    const fam = planFamily(rng, family);
    const debug = fam !== 'normal' && fam !== 'kit' ? true : chance(rng, 0.2);
    const role = pick(rng, ROLES);
    const nethackrc = makeRc(rng, role, { debug, pet: chance(rng, 0.55) ? 'none' : 'default' });
    const datetime = pick(rng, DATETIMES);
    const seg = { seed, datetime, timezone: PIN_TZ, nethackrc, moves: '' };
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'nh-sg-'));
    const g = new Game({ seg, binary: inst.binary, installDir: inst.installDir, homeDir: path.join(tmp, 'home'), rngLogPath: path.join(tmp, 'rng.log'), tz: PIN_TZ, trace });
    try {
        await g.start();
        await runScenario(g, rng, fam);
    } catch (e) {
        if (trace) console.error('driver stopped:', e.message);
    } finally {
        await g.stop();
        await fs.rm(tmp, { recursive: true, force: true }).catch(() => {});
    }
    return { id: `scen-${fam}-${role[1]}-${seed}`, fam, role: role[1], moves: g.moves, steps: g.steps, ended: g.ended, exit: g.exit, seg: { ...seg, moves: g.moves } };
}

function prepareInstalls(jobs) {
    rmSync(WORKER_ROOT, { recursive: true, force: true });
    mkdirSync(WORKER_ROOT, { recursive: true });
    return Array.from({ length: jobs }, (_, i) => {
        const d = path.join(WORKER_ROOT, `w${i}`);
        cpSync(DEFAULT_INSTALL, d, { recursive: true });
        return { installDir: d, binary: path.join(d, 'nethack') };
    });
}
function recordCanonical(recipePath, sessionPath, inst) {
    const r = spawnSync(process.execPath, [RECORD, recipePath, sessionPath], {
        env: { ...process.env, NETHACK_INSTALL: inst.installDir, NETHACK_BINARY: inst.binary, RERECORD_TZ: PIN_TZ },
        encoding: 'utf8',
    });
    return { ok: r.status === 0, err: (r.stderr || '').trim().split('\n').pop() };
}
async function pool(items, jobs, fn) {
    const out = new Array(items.length);
    let next = 0;
    await Promise.all(Array.from({ length: Math.max(1, Math.min(jobs, items.length)) }, async (_, wid) => {
        for (;;) { const i = next++; if (i >= items.length) return; out[i] = await fn(items[i], i, wid); }
    }));
    return out;
}

async function main() {
    const n = Number(val('n', 60));
    const base = Number(val('seed', 91000));
    const jobs = Number(val('jobs', 6));
    const family = val('family', 'mixed');
    const outDir = path.resolve(ROOT, val('out', 'hidden-corpus/recipes'));
    const known = ['mixed', 'broad', ...FAMILIES, ...WAVE2];
    if (!known.includes(family)) { console.error(`unknown family ${family}; one of ${known.join('|')}`); process.exit(2); }
    /* `broad` rotates through the second-wave families so each gets n/16 */
    const famFor = (i) => (family === 'broad' ? WAVE2[i % WAVE2.length] : family);
    const run = (seed, i, inst, trace) => (WAVE2.includes(famFor(i))
        ? authorWave2({ seed, family: famFor(i), inst, trace })
        : author({ seed, family, inst, trace }));
    const installs = prepareInstalls(flag('probe') ? 1 : jobs);
    try {
        if (flag('probe')) {
            const r = await run(base, Number(val('index', 0)), installs[0], true);
            console.log(`\n${r.id}: ${r.moves.length} keys, ${r.steps} steps, ended=${r.ended} exit=${JSON.stringify(r.exit)}\nmoves: ${JSON.stringify(r.moves)}`);
            return;
        }
        mkdirSync(outDir, { recursive: true });
        mkdirSync(SESSIONS, { recursive: true });
        const seeds = Array.from({ length: n }, (_, i) => base + i);
        const t0 = Date.now();
        const res = await pool(seeds, jobs, async (seed, i, wid) => {
            const r = await run(seed, i, installs[wid], false);
            if (r.moves.length < 12) return { ...r, skipped: 'too short' };
            const recipePath = path.join(outDir, `${r.id}.recipe.json`);
            const sessionPath = path.join(SESSIONS, `${r.id}.session.json`);
            if (existsSync(recipePath)) return { ...r, skipped: 'exists' };
            const segments = r.segs || [r.seg];
            const recipe = { version: 5, timezone: PIN_TZ, fuzz: { mode: 'scenario', family: r.fam, role: r.role, prefixMoves: '', suffix: r.moves, ...(segments.length > 1 ? { restore: true } : {}) }, segments };
            writeFileSync(recipePath, JSON.stringify(recipe, null, 1) + '\n');
            const rec = recordCanonical(recipePath, sessionPath, installs[wid]);
            if (!rec.ok) { rmSync(recipePath, { force: true }); return { ...r, skipped: `record failed: ${rec.err}` }; }
            return r;
        });
        const kept = res.filter((r) => !r.skipped);
        const byFam = {};
        for (const r of kept) byFam[r.fam] = (byFam[r.fam] || 0) + 1;
        console.log(`scenario-gen: ${kept.length}/${n} recipes written to ${path.relative(ROOT, outDir)} in ${((Date.now() - t0) / 1000).toFixed(0)}s; families ${JSON.stringify(byFam)}; mean keys ${(kept.reduce((a, r) => a + r.moves.length, 0) / Math.max(1, kept.length)).toFixed(0)}`);
        for (const r of res.filter((r) => r.skipped)) console.log(`  skip ${r.id}: ${r.skipped}`);
        console.log('next: node scripts/hidden-proxy.mjs score --jobs 8');
    } finally {
        rmSync(WORKER_ROOT, { recursive: true, force: true });
    }
}

main().catch((e) => { console.error(e); process.exit(1); });
