// Differential regression for the reviews 2127/2129/2131 error closure.
// C handlers and both cfgfiles varargs wrappers are extracted verbatim;
// only the final config_erradd collector and unrelated callees are doubled.
import { beforeEach, afterEach, after, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as options from '../js/options.js';
import { game, resetGame } from '../js/gstate.js';
import { config_error_add, config_error_init, config_error_done,
    l_get_config_errors, parse_conf_str, parse_config_line, read_config_file } from '../js/cfgfiles.js';
import { config_error_add as botlSink } from '../js/botl.js';
import { BUFSZ } from '../js/const.js';
import { setStorageForTesting } from '../js/storage.js';

const names = ['menuinvertmode', 'msghistory', 'name', 'glyph', 'tile_height',
    'tile_width', 'vary_msgcount', 'crash_urlmax', 'pile_limit',
    'player_selection', 'scroll_amount', 'scroll_margin', 'crash_email',
    'crash_name', 'versinfo'];
const dir = mkdtempSync(join(tmpdir(), 'nethack-config-errors-'));
after(() => rmSync(dir, { recursive: true, force: true }));
function body(file, name, type) {
    const source = readFileSync(new URL('../nethack-c/upstream/src/' + file, import.meta.url), 'utf8');
    const match = source.match(new RegExp('\\n' + name + '\\([^]*?\\n}\\n'));
    assert.ok(match, name + ' has a pinned C definition');
    return type + match[0];
}
const c = `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <stdarg.h>
#define BUFSZ ${BUFSZ}
#define BIGBUFSZ (5*BUFSZ)
#define QBUFSZ 128
#define PL_NSIZ 32
#define TRUE 1
#define FALSE 0
#define UNUSED
#define staticfn static
#define NH_STATUS_RELEASED 0
#define NH_DEVEL_STATUS NH_STATUS_RELEASED
#define nhUse(x) ((void)(x))
#define Sprintf sprintf
#define Strcpy strcpy
#define VI_NUMBER 1
#define VI_NAME 2
#define VI_BRANCH 4
#define VIA_DIALOG 0
#define VIA_PROMPTS 1
#define PILE_LIMIT_DFLT 5
typedef int boolean;
typedef void *genericptr_t;
enum { do_init=1, do_set, do_handler, get_val, get_cnf_val };
enum { optn_silenterr=-1, optn_err=0, optn_ok=1 };
char empty_optstr[]="", *defopt="default", *to_be_done="to be done";
struct { const char *name; } allopt[1];
struct { int menuinvertmode, wc_tile_height, wc_tile_width, wc_vary_msgcount,
    wc_scroll_amount, wc_scroll_margin, wc_player_selection; unsigned msg_history; } iflags;
struct { int pile_limit; unsigned versinfo; } flags;
struct { char *crash_email, *crash_name; int crash_urlmax; } gc;
struct { int opt_initial, opt_need_redraw; } go;
struct { char plname[PL_NSIZ]; } svp;
struct { char *git_branch; } nomakedefs;
void config_erradd(const char *s) {
    for (const unsigned char *p=(const unsigned char *)s; *p; ++p) printf("%02x",*p);
    puts("");
}
static void vconfig_error_add(const char *, va_list);
char *dupstr(const char *s) { return strdup(s); }
void rejectoption(const char *s) { (void)s; }
void nmcpy(char *d,const char *s,int n) { snprintf(d,n,"%s",s); }
void mungspaces(char *s) { (void)s; }
int glyphrep_to_custom_map_entries(char *s,int *g) { (void)s;(void)g;return 1; }
int strncmpi(const char *a,const char *b,size_t n) { return strncasecmp(a,b,n); }
void handler_versinfo(void) {}
void pline(const char *s,...) { (void)s; }
const char *status_version(char *s,size_t n,int b) { (void)b;snprintf(s,n,"test");return s; }
${body('cfgfiles.c', 'config_error_add', 'void')}
${body('cfgfiles.c', 'vconfig_error_add', 'static void')}
${body('options.c', 'string_for_opt', 'static char *')}
${body('options.c', 'string_for_env_opt', 'static char *')}
${body('options.c', 'bad_negation', 'static void')}
${names.map(n => body('options.c', 'optfn_' + n, 'static int')).join('\n')}
int main(int argc,char **argv) {
    if(argc==1) {
        config_error_add("literal %% %s", "100% done");
        config_error_add("%.5s|%.0s|%c", "abcdef", "hidden", 65);
        config_error_add("%+06d|%#08x|%#.0o|%-8.3s", -12, 42u, 0u, "abcdef");
        config_error_add("%ld|%lu|%zu", 4294967296L, 4294967297UL, (size_t)4294967298ULL);
        config_error_add("%u|%hhd|%hu", (unsigned)-1, 255, 65537);
        config_error_add("%*.*s|%.*d", -7, 3, "abcdef", 4, 12);
        char s[2001];memset(s,'x',2000);s[2000]=0;config_error_add("%s",s);
        return 0;
    }
    allopt[0].name=argv[1]; go.opt_initial=1;
    nomakedefs.git_branch=argc>4 ? "branch" : NULL;
    char opts[BUFSZ];snprintf(opts,sizeof opts,"%s",argv[2]);
    char *op=strchr(opts,':');op=op&&op[1] ? op+1 : empty_optstr;
    int result=999,neg=atoi(argv[3]);
    ${names.map(n => `if(!strcmp(argv[1],"${n}")) result=optfn_${n}(0,do_set,neg,opts,op);`).join('\n')}
    printf("R%d\\n",result);
}
`;
writeFileSync(join(dir, 'oracle.c'), c);
const build = spawnSync('cc', ['-std=gnu99', '-w', join(dir, 'oracle.c'), '-o', join(dir, 'oracle')], { encoding: 'utf8' });
assert.equal(build.status, 0, build.stderr);
function oracle(args = []) {
    const r = spawnSync(join(dir, 'oracle'), args, { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
    const lines = r.stdout.trimEnd().split('\n');
    const last = lines.at(-1);
    const result = last?.startsWith('R') ? Number(lines.pop().slice(1)) : undefined;
    return { result, errors: lines.map(s => Buffer.from(s, 'hex').toString('latin1')) };
}
beforeEach(() => {
    resetGame(); game.iflags = { in_lua: true }; game.go = { opt_initial: true };
    game.flags = {}; game.gc = {}; game.nomakedefs = {};
    options.reset_duplicate_opt_detection();
    l_get_config_errors(); config_error_init(false, 'oracle', false);
});
afterEach(() => { l_get_config_errors(); config_error_done(); });

test('both export paths use the real sink; formatting agrees with C vsnprintf', () => {
    assert.equal(botlSink, config_error_add);
    const vectors = [
        ['literal %% %s', '100% done'], ['%.5s|%.0s|%c', 'abcdef', 'hidden', 65],
        ['%+06d|%#08x|%#.0o|%-8.3s', -12, 42, 0, 'abcdef'],
        ['%ld|%lu|%zu', 4294967296, 4294967297, 4294967298],
        ['%u|%hhd|%hu', -1, 255, 65537], ['%*.*s|%.*d', -7, 3, 'abcdef', 4, 12],
        ['%s', 'x'.repeat(2000)],
    ];
    for (const args of vectors) config_error_add(...args);
    assert.deepEqual(l_get_config_errors().map(x => x.error).reverse(), oracle().errors);
});
for (const name of names) {
    const inputs = name === 'menuinvertmode' ? [[name+':-1', false], [name+':3', false], [name+':2', false]]
        : name === 'versinfo' ? [[name+':2', true], [name, false], [name+':0', false], [name+':8', false], [name+':7', false]]
        : name === 'player_selection' ? [[name+':bogus', false], [name, false], [name+':prompts', false]]
        : name === 'crash_urlmax' ? [[name+':74', false], [name, false], [name+':75', false]]
        : name === 'glyph' ? [[name+':2', true], [name, false]]
        : [[name+':2', true], [name, false], [name+':2', false]];
    test(name + ' error arms and controls match the extracted C handler', () => {
        for (const [opts, negated] of inputs) {
            const idx = options.allopt_idx(name);
            assert.ok(idx >= 0, name);
            const op = opts.includes(':') ? opts.slice(opts.indexOf(':')+1) : '';
            const result = options['optfn_'+name](idx, 2, negated, opts, op);
            const errors = l_get_config_errors().map(x => x.error).reverse();
            assert.deepEqual({result, errors}, oracle([name, opts, String(Number(negated))]), opts);
        }
    });
}
test('non-Lua config errors increment the count; secure sysconf stops after one', () => {
    game.iflags.in_lua = false;
    config_error_add('first %d', 1); botlSink('second %s', 'two');
    assert.equal(config_error_done(), 2);
    config_error_init(true, 'sysconf', true);
    const lines = 'OPTIONS=menuinvertmode:3\nOPTIONS=menuinvertmode:2\n';
    assert.equal(parse_config_line('OPTIONS=menuinvertmode:3'), false);
    assert.equal(config_error_done(), 1);
    game.iflags.menuinvertmode = 1;
    // parse_conf_str owns a nonsecure frame: both physical lines get parsed.
    parse_conf_str(lines, parse_config_line);
    assert.equal(game.iflags.menuinvertmode, 2);
    options.reset_duplicate_opt_detection();
    game.iflags.menuinvertmode = 1;
    setStorageForTesting({getItem: () => lines});
    assert.equal(read_config_file('sysconf', 0), false);
    assert.equal(game.iflags.menuinvertmode, 1); // second physical line was skipped
});
test('fruit and petattr report missing values once through string_for_opt', () => {
    for (const [name, result] of [['fruit', 0], ['petattr', 1]]) {
        assert.equal(options['optfn_'+name](options.allopt_idx(name), 2, false, name, ''), result);
        assert.deepEqual(l_get_config_errors(), [{line: 0, error: `Missing parameter for '${name}'`}]);
    }
});
test('Lua config errors retain physical line numbers and newest-first drain order', () => {
    parse_conf_str('OPTIONS=menuinvertmode:3\nOPTIONS=crash_name\n', parse_config_line);
    assert.deepEqual(l_get_config_errors(), [
        {line: 2, error: "Missing parameter for 'crash_name'"},
        {line: 1, error: "Illegal menuinvertmode parameter '3'"},
    ]);
    assert.deepEqual(l_get_config_errors(), []);
});
