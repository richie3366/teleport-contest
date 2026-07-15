#!/usr/bin/env python3
"""Regenerate js/generated/optlist_data.js from pinned optlist.h.

Contest MacOS tty feature flags mirror the seed2200 option_help list
(no SCORE_ON_BOTL / TIMED_DELAY; ALTMETA; tty wincap WC/WC2 subset).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c/upstream/include/optlist.h"
OUT = ROOT / "js/generated/optlist_data.js"

# Contest MacOS tty build (matches public option_help screens).
FLAGS = {
    "WIN32": False,
    "MSDOS": False,
    "AMIGA": False,
    "TOS": False,
    "VMS": False,
    "WINCHAIN": False,
    "MICRO": False,
    "ANDROID": False,
    "THREADED": False,
    "ALTMETA": True,
    "CHECKPOINT": True,
    "MAIL": True,
    "NEWS": True,
    "SCORE_ON_BOTL": False,
    "STATUS_HILITES": True,
    "TIMED_DELAY": False,
    "INSURANCE": True,
    "SND_LIB_PORTAUDIO": False,
    "TTY_GRAPHICS": True,
    "CURSES_GRAPHICS": False,
    "TILES_IN_GLYPHMAP": False,
    "USE_TILES": False,
    "BACKWARD_COMPAT": True,
    "SELECTSAVED": True,
    "DUMPLOG": False,
    "PREV_MSGS": True,
    "NO_TERMS": False,
    "WIN32CON": False,
    "TTY_PERM_INVENT": False,
    "CRASHREPORT": True,
    "NHOPT_PARSE": True,
    "NHOPT_PROTO": False,
    "NHOPT_ENUM": False,
}

# C ref: win/tty/wintty.c tty_procs.wincap / wincap2 (non-MSDOS/MacOS).
WC_SUPPORTED = {"color", "hilite_pet", "use_inverse", "eight_bit_tty"}
WC2_SUPPORTED = {
    "hilite_status",
    "hitpointbar",
    "use_darkgray",
    "statuslines",
    "petattr",
    "armorstatus",
    "terrainstatus",
    "weaponstatus",
    "statushilites",
}

WC_NAMES = {
    "ascii_map",
    "color",
    "eight_bit_tty",
    "hilite_pet",
    "perm_invent",
    "perminv_mode",
    "popup_dialog",
    "player_selection",
    "preload_tiles",
    "tiled_map",
    "tile_file",
    "tile_width",
    "tile_height",
    "align_message",
    "align_status",
    "font_map",
    "font_menu",
    "font_message",
    "font_size_map",
    "font_size_menu",
    "font_size_message",
    "font_size_status",
    "font_size_text",
    "font_status",
    "font_text",
    "map_mode",
    "scroll_amount",
    "scroll_margin",
    "splash_screen",
    "use_inverse",
    "vary_msgcount",
    "windowcolors",
    "mouse_support",
}
WC2_NAMES = {
    "armorstatus",
    "fullscreen",
    "guicolor",
    "hilite_status",
    "hitpointbar",
    "menu_shift",
    "petattr",
    "softkeyboard",
    "status hilite rules",
    "statushilites",
    "statuslines",
    "term_cols",
    "term_rows",
    "terrainstatus",
    "use_darkgray",
    "weaponstatus",
    "windowborders",
    "wraptext",
}


def eval_expr(expr: str) -> bool:
    expr = expr.strip()
    # C: #if PREV_MSGS /* tty or curses */ — strip comments or eval fails → False
    expr = re.sub(r"/\*.*?\*/", " ", expr)
    expr = re.sub(r"//.*$", " ", expr)

    def repl_def(m: re.Match[str]) -> str:
        return "True" if FLAGS.get(m.group(1), False) else "False"

    e = re.sub(r"defined\s*\(\s*(\w+)\s*\)", repl_def, expr)

    def tok(m: re.Match[str]) -> str:
        t = m.group(0)
        if t in FLAGS:
            return str(FLAGS[t])
        if t in ("True", "False", "and", "or", "not"):
            return t
        if t.isdigit():
            return t
        return "False"

    e = re.sub(r"\b[A-Za-z_][A-Za-z0-9_]*\b|\b\d+\b", tok, e)
    e = e.replace("||", " or ").replace("&&", " and ").replace("!", " not ")
    try:
        return bool(eval(e, {"__builtins__": {}}, {}))
    except Exception:
        return False


def preprocess(src: str) -> str:
    lines = src.splitlines(True)
    out: list[str] = []
    stack: list[tuple[bool, bool]] = []

    def parent_active() -> bool:
        return all(a for a, _ in stack) if stack else True

    for line in lines:
        m = re.match(r"^\s*#\s*(if|ifdef|ifndef|elif|else|endif)\b(.*)$", line)
        if m:
            kind, rest = m.group(1), m.group(2).strip()
            if kind == "ifdef":
                v = FLAGS.get(rest.split()[0], False)
                stack.append((parent_active() and v, v))
            elif kind == "ifndef":
                v = not FLAGS.get(rest.split()[0], False)
                stack.append((parent_active() and v, v))
            elif kind == "if":
                v = eval_expr(rest)
                stack.append((parent_active() and v, v))
            elif kind == "elif":
                pa = all(a for a, _ in stack[:-1]) if len(stack) > 1 else True
                _, seen = stack.pop()
                v = False if seen else eval_expr(rest)
                stack.append((pa and v, seen or v))
            elif kind == "else":
                pa = all(a for a, _ in stack[:-1]) if len(stack) > 1 else True
                _, seen = stack.pop()
                stack.append((pa and (not seen), True))
            elif kind == "endif":
                if stack:
                    stack.pop()
            continue
        if parent_active():
            out.append(line)
    return "".join(out)


def split_args(argstr: str) -> list[str]:
    args: list[str] = []
    cur: list[str] = []
    depth = 0
    in_str = False
    quote = ""
    i = 0
    while i < len(argstr):
        c = argstr[i]
        if in_str:
            cur.append(c)
            if c == "\\" and i + 1 < len(argstr):
                cur.append(argstr[i + 1])
                i += 2
                continue
            if c == quote:
                in_str = False
            i += 1
            continue
        if c in "\"'":
            in_str = True
            quote = c
            cur.append(c)
            i += 1
            continue
        if c == "(":
            depth += 1
            cur.append(c)
            i += 1
            continue
        if c == ")":
            depth -= 1
            cur.append(c)
            i += 1
            continue
        if c == "," and depth == 0:
            args.append("".join(cur).strip())
            cur = []
            i += 1
            continue
        cur.append(c)
        i += 1
    if cur:
        args.append("".join(cur).strip())
    return args


def find_macros(body: str, name: str) -> list[list[str]]:
    out: list[list[str]] = []
    i = 0
    while True:
        j = body.find(name + "(", i)
        if j < 0:
            break
        k = j + len(name) + 1
        depth = 1
        in_str = False
        quote = ""
        while k < len(body) and depth:
            c = body[k]
            if in_str:
                if c == "\\":
                    k += 2
                    continue
                if c == quote:
                    in_str = False
                k += 1
                continue
            if c in "\"'":
                in_str = True
                quote = c
                k += 1
                continue
            if c == "(":
                depth += 1
            elif c == ")":
                depth -= 1
            k += 1
        out.append(split_args(body[j + len(name) + 1 : k - 1]))
        i = k
    return out


def unquote(s: str) -> str:
    s = s.strip()
    if len(s) >= 2 and s[0] == '"' and s[-1] == '"':
        return s[1:-1].replace('\\"', '"')
    return s


def has_addr(bp: str) -> bool:
    return not re.search(r"\(boolean\s*\*\)\s*0", bp)


def ok_wc(name: str) -> bool:
    if name in WC_NAMES and name not in WC_SUPPORTED:
        return False
    if name in WC2_NAMES and name not in WC2_SUPPORTED:
        return False
    return True


SETWHERE_ORDER = [
    "set_in_sysconf",
    "set_in_config",
    "set_via_cmdline",
    "set_gameview",
    "set_in_game",
    "set_wizonly",
    "set_wiznofuz",
]
SIMPLE_SECTIONS = ("General", "Behavior", "Map", "Status")
# C: doset_simple_menu suffixes for these idx names
AUTOPICKUP_SUFFIX = {
    "pickup_types",
    "pickup_thrown",
    "pickup_stolen",
    "dropped_nopick",
}


def parse_bool_addr(bp: str) -> dict[str, str] | None:
    """Map C `&flags.foo` / `&iflags.wc_color` to JS game.flags / game.iflags."""
    m = re.match(r"&(\w+)\.(\w+)", bp.strip())
    if not m:
        return None
    obj, key = m.group(1), m.group(2)
    if obj not in ("flags", "iflags", "a11y"):
        return None
    return {"obj": obj, "key": key}


def main() -> int:
    body = preprocess(SRC.read_text())
    body = "\n".join(
        l for l in body.splitlines() if not re.match(r"\s*#\s*define\b", l)
    )

    bools = find_macros(body, "NHOPTB")
    comps = find_macros(body, "NHOPTC")
    prefs = find_macros(body, "NHOPTP")
    othrs = find_macros(body, "NHOPTO")

    bool_names: list[str] = []
    for a in bools:
        if len(a) < 11:
            continue
        name, setwhere, bp = a[0], a[4], a[10]
        if not has_addr(bp):
            continue
        if setwhere in ("set_wizonly", "set_wiznofuz"):
            continue
        if not ok_wc(name):
            continue
        bool_names.append(name)

    compound: list[dict[str, str]] = []
    for a in comps:
        if len(a) < 11:
            continue
        name, setwhere, descr = a[0], a[4], unquote(a[10])
        if setwhere in ("set_wizonly", "set_wiznofuz"):
            continue
        if not ok_wc(name):
            continue
        if not descr or descr in ("(char *)0", "0"):
            continue
        compound.append({"name": name, "descr": descr})
    for a in prefs:
        if len(a) < 11:
            continue
        name, setwhere, descr = a[0], a[4], unquote(a[10])
        if setwhere in ("set_wizonly", "set_wiznofuz"):
            continue
        if not ok_wc(name):
            continue
        compound.append({"name": name, "descr": descr})

    others = [unquote(a[0]) for a in othrs if len(a) >= 1]

    # C ref: options.c longest_option_name(set_gameview, set_in_game)
    start_i = SETWHERE_ORDER.index("set_gameview")
    end_i = SETWHERE_ORDER.index("set_in_game")
    longest = 0
    for a in bools:
        if len(a) < 11:
            continue
        name, setwhere, bp = a[0], a[4], a[10]
        if setwhere not in SETWHERE_ORDER:
            continue
        if not has_addr(bp):
            continue
        if not (start_i <= SETWHERE_ORDER.index(setwhere) <= end_i):
            continue
        if not ok_wc(name):
            continue
        longest = max(longest, len(name))
    for a in comps + prefs:
        if len(a) < 5:
            continue
        name, setwhere = a[0], a[4]
        if setwhere not in SETWHERE_ORDER:
            continue
        if not (start_i <= SETWHERE_ORDER.index(setwhere) <= end_i):
            continue
        if not ok_wc(name):
            continue
        longest = max(longest, len(name))
    for a in othrs:
        if len(a) < 6:
            continue
        name, setwhere = unquote(a[0]), a[5]
        if setwhere not in SETWHERE_ORDER:
            continue
        if not (start_i <= SETWHERE_ORDER.index(setwhere) <= end_i):
            continue
        if not ok_wc(name):
            continue
        longest = max(longest, len(name))

    # C ref: options.c doset_simple_menu — walk allopt[] declaration order
    # within each OptS_* section (macros interleaved in optlist.h).
    simple: list[dict] = []
    events: list[tuple[int, str, list[str]]] = []
    for kind, macro in (
        ("Bool", "NHOPTB"),
        ("Comp", "NHOPTC"),
        ("Othr", "NHOPTO"),
    ):
        i = 0
        while True:
            j = body.find(macro + "(", i)
            if j < 0:
                break
            k = j + len(macro) + 1
            depth = 1
            in_str = False
            quote = ""
            while k < len(body) and depth:
                c = body[k]
                if in_str:
                    if c == "\\" and k + 1 < len(body):
                        k += 2
                        continue
                    if c == quote:
                        in_str = False
                    k += 1
                    continue
                if c in "\"'":
                    in_str = True
                    quote = c
                    k += 1
                    continue
                if c == "(":
                    depth += 1
                elif c == ")":
                    depth -= 1
                k += 1
            events.append((j, kind, split_args(body[j + len(macro) + 1 : k - 1])))
            i = k
    events.sort(key=lambda e: e[0])

    for _pos, kind, a in events:
        if kind == "Bool":
            if len(a) < 13:
                continue
            name, sec, init, bp = a[0], a[1], a[5], a[10]
            if sec not in SIMPLE_SECTIONS:
                continue
            if not has_addr(bp) or not ok_wc(name):
                continue
            addr = parse_bool_addr(bp)
            if not addr:
                continue
            simple.append(
                {
                    "name": name,
                    "section": sec,
                    "opttyp": "Bool",
                    "init": init == "On",
                    "addr": addr,
                    "autopickupSuffix": name in AUTOPICKUP_SUFFIX,
                }
            )
        elif kind == "Comp":
            if len(a) < 11:
                continue
            name, sec, has_h = a[0], a[1], a[8]
            if sec not in SIMPLE_SECTIONS or not ok_wc(name):
                continue
            simple.append(
                {
                    "name": name,
                    "section": sec,
                    "opttyp": "Comp",
                    "hasHandler": has_h == "Yes",
                    "autopickupSuffix": name in AUTOPICKUP_SUFFIX,
                }
            )
        else:
            if len(a) < 6:
                continue
            name, sec = unquote(a[0]), a[1]
            if sec not in SIMPLE_SECTIONS or not ok_wc(name):
                continue
            simple.append(
                {
                    "name": name,
                    "section": sec,
                    "opttyp": "Othr",
                    "hasHandler": True,
                    "autopickupSuffix": False,
                }
            )

    OUT.write_text(
        "// AUTO-GENERATED from nethack-c/upstream/include/optlist.h\n"
        "// Regenerate: python3 scripts/extract-optlist.py\n"
        "// C ref: options.c option_help / allopt[] / doset_simple_menu.\n"
        f"export const optionHelpBools = {json.dumps(bool_names, indent=2)};\n"
        f"export const optionHelpCompounds = {json.dumps(compound, indent=2)};\n"
        f"export const optionHelpOthers = {json.dumps(others, indent=2)};\n"
        f"export const dosetSimpleNameWidth = {longest};\n"
        f"export const dosetSimpleOpts = {json.dumps(simple, indent=2)};\n"
        f"export const dosetSimpleSections = {json.dumps(list(SIMPLE_SECTIONS))};\n"
    )
    print(
        f"wrote {OUT.relative_to(ROOT)} "
        f"({len(bool_names)} bools, {len(compound)} compounds, {len(others)} others, "
        f"{len(simple)} simple-menu, nameWidth={longest})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
