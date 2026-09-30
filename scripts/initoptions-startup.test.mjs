// Regression for options.c initoptions_init defaults → sysconf → user rc.
import assert from 'node:assert/strict';
import { NethackGame } from '../js/jsmain.js';
import { game, resetGame } from '../js/gstate.js';
import { GameDisplay } from '../js/game_display.js';
import { initoptions_init, initoptions } from '../js/options.js';
import { decl_globals_init } from '../js/decl.js';
import { sys_early_init } from '../js/sys.js';
import { config_error_init, config_error_done } from '../js/cfgfiles.js';
import { scores_only } from '../js/earlyarg.js';
import { setStorageForTesting } from '../js/storage.js';
const selection = 'OPTIONS=role:Tourist,race:human,gender:male,align:neutral,!legacy,!tutorial\n';
async function start(sysconf, rc='', selectionRc=selection) {
 const files = new Map([['vfs:sysconf', sysconf]]);
 const storage = {getItem:k=>files.get(k)??null,setItem:(k,v)=>files.set(k,String(v)),removeItem:k=>files.delete(k),key:i=>[...files.keys()][i]??null,get length(){return files.size}};
 const ng=new NethackGame({seed:27,storage,nethackrc:selectionRc+rc});
 const display=new GameDisplay(null);display.onEmptyQueue=()=>{throw Error('Input queue empty')};ng._pendingDisplay=display;
 try { await ng.start(); } catch(e) {if(!e.message.includes('Input queue empty')) throw e;}
 return game;
}
const system='WIZARDS=*\nEXPLORERS=*\nOPTIONS=!autopickup,name:SysName,menuinvertmode:2,msghistory:9\n';
let g=await start(system);
assert.equal(g.flags.pickup,false);assert.equal(g.plname,'SysName');assert.equal(g.iflags.menuinvertmode,2);assert.equal(g.iflags.msg_history,9);assert.equal(g.iflags.wc2_petattr,7);
console.log('PASS system pickup/name/iflags retained');
g=await start(system,'OPTIONS=autopickup,name:UserName,menuinvertmode:0,msghistory:3\n');
assert.equal(g.flags.pickup,true);assert.equal(g.plname,'UserName');assert.equal(g.iflags.menuinvertmode,0);assert.equal(g.iflags.msg_history,3);
console.log('PASS user rc overrides system settings');
g=await start('UNRECOGNIZED_DIRECTIVE=1\n','OPTIONS=name:MustNotRun\n');
assert.equal(g.program_state.gameover,true);assert.equal(g.program_state.exit_status,1);assert.equal(g._parsed_rc,undefined);assert.equal(g.plname,undefined);assert.equal(g.program_state.config_error_ready,false);
console.log('PASS invalid sysconf terminates before user rc');
g=await start('WIZARDS=*\nEXPLORERS=*\n','OPTIONS=name:Fresh\n');
assert.equal(g.flags.pickup,false);assert.equal(g.plname,'Fresh');assert.equal(g.iflags.menuinvertmode,1);assert.equal(g.iflags.msg_history,20);
console.log('PASS reused process restores builtin defaults');

// C :7295 drains errors before checking the nontermination override.
resetGame();
decl_globals_init();
sys_early_init();
setStorageForTesting({ getItem: () => 'UNRECOGNIZED_DIRECTIVE=1\n' });
game.iflags.initoptions_noterminate = true;
initoptions_init();
assert.equal(game.program_state.gameover, undefined);
assert.equal(game.program_state.config_error_ready, false);
console.log('PASS sysconf failure honors initoptions_noterminate');

// Startup's role-selection adapter must inherit the system phase strings.
g = await start(system + selection, '', '');
assert.equal(g._parsed_rc.role, 'Tourist');
assert.equal(g._parsed_rc.race, 'human');
assert.equal(g._parsed_rc.gender, 'male');
assert.equal(g._parsed_rc.align, 'neutral');
console.log('PASS system role settings retained without user overrides');

// The direct C caller must not continue after assure_syscf_file exits.
resetGame();
decl_globals_init();
sys_early_init();
setStorageForTesting({ getItem: () => null });
initoptions();
assert.equal(game.program_state.gameover, true);
assert.equal(game.program_state.exit_status, 1);
assert.equal(game.program_state.config_error_ready, undefined);
assert.equal(game.go.opt_phase, 1); // still builtin, never reached sysconf
console.log('PASS initoptions caller propagates fatal missing-file exit');

// Exercise the outer :7093–7114 pass with builtin_opt already reached.
// Keep a caller-owned error bracket: a forbidden second drain would pop it.
function outerPass(sysconf, { noterminate = false, showpaths = false } = {}) {
 resetGame();
 decl_globals_init();
 sys_early_init();
 setStorageForTesting({ getItem: () => 'WIZARDS=*\nEXPLORERS=*\n' });
 initoptions_init();
 game.go.opt_phase = 1; // C builtin_opt: bypass :7088, exercise second pass
 game.go.opt_initial = true;
 game.iflags.initoptions_noterminate = noterminate;
 game.gd.deferred_showpaths = showpaths;
 const files = new Map(sysconf === null ? [] : [['vfs:sysconf', sysconf]]);
 setStorageForTesting({getItem:k=>files.get(k)??null,setItem:(k,v)=>files.set(k,String(v)),removeItem:k=>files.delete(k)});
 config_error_init(true, 'caller', false);
 initoptions();
}
function assertFinishUnreachable(status, errorReady = true) {
 assert.equal(game.program_state.gameover, true);
 assert.equal(game.program_state.exit_status, status);
 assert.equal(game.go.opt_initial, true);
 assert.equal(game.ffruit, undefined);
 assert.equal(game.program_state.config_error_ready, errorReady);
 config_error_done();
}
outerPass('UNRECOGNIZED_DIRECTIVE=1\n');
assertFinishUnreachable(1);
console.log('PASS second sysconf fatal error preserves caller bracket and skips finish');
outerPass(null);
assertFinishUnreachable(1);
assert.equal(game.go.opt_phase, 1);
console.log('PASS builtin-phase missing sysconf skips error setup and finish');
outerPass('WIZARDS=*\nEXPLORERS=*\n', { showpaths: true });
assertFinishUnreachable(0, false); // showpaths' opt_terminate drains caller errors
assert.equal(game.gd.deferred_showpaths, false);
console.log('PASS deferred showpaths skips finish');
outerPass('UNRECOGNIZED_DIRECTIVE=1\n', { noterminate: true });
assert.equal(game.program_state.gameover, undefined);
assert.equal(game.program_state.config_error_ready, false);
assert.equal(game.go.opt_initial, false);
assert.equal(game.ffruit.fid, 1);
console.log('PASS second sysconf nontermination override continues through finish');
outerPass('WIZARDS=*\nEXPLORERS=*\n');
assert.equal(game.program_state.gameover, undefined);
assert.equal(game.program_state.config_error_ready, true);
assert.equal(game.go.opt_initial, false);
assert.equal(game.ffruit.fid, 1);
config_error_done();
console.log('PASS successful second sysconf pass drains once and finishes');

resetGame();
decl_globals_init();
sys_early_init();
setStorageForTesting({ getItem: () => null });
await scores_only(2, ['nethack', '-s'], null);
assert.equal(game.program_state.exit_status, 1);
assert.equal(game.iflags.initoptions_noterminate, true);
assert.notEqual(game.go.opt_initial, false);
assert.equal(game.ffruit, undefined);
console.log('PASS scores_only caller preserves fatal initoptions exit');
