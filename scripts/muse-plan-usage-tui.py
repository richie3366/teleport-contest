#!/usr/bin/env python3
"""Drive an interactive Muse TUI, send /usage, capture the pane, Ctrl-C out.

Stdout: ANSI-stripped TUI text. Stderr: progress. Exit 0 if Current/Weekly
percent lines appeared, else 2. Used by scripts/muse-plan-usage.mjs so the
loop does not POST to api.meta.ai itself.

The sandbox directory is written into ~/.config/muse/trust.json *before*
spawn so the TUI never asks "Do you trust this workspace?" — answering
that prompt in-band ate /usage. The extra trust keys are removed on exit.
"""
from __future__ import annotations

import fcntl
import json
import os
import pathlib
import pty
import re
import select
import struct
import subprocess
import sys
import tempfile
import termios
import time

ROWS = int(os.environ.get("MUSE_PLAN_USAGE_ROWS", "48"))
COLS = int(os.environ.get("MUSE_PLAN_USAGE_COLS", "140"))
TIMEOUT = float(os.environ.get("MUSE_PLAN_USAGE_TIMEOUT_SEC", "50"))
MUSE_BIN = os.environ.get("MUSE_BIN", "muse")
TRUST_CFG = pathlib.Path.home() / ".config" / "muse" / "trust.json"


def log(msg: str) -> None:
    print(f"muse-plan-usage-tui: {msg}", file=sys.stderr, flush=True)


def set_winsize(fd: int, rows: int, cols: int) -> None:
    fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", rows, cols, 0, 0))


def strip_ansi(s: str) -> str:
    s = re.sub(r"\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)", "", s)
    s = re.sub(r"\x1b\[[0-9;?=]*[A-Za-z]", "", s)
    s = re.sub(r"\x1b[PX^_].*?\x1b\\", "", s, flags=re.S)
    s = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", s)
    return s


def compact(plain: str) -> str:
    return re.sub(r"\s+", "", plain).lower()


def usage_visible(plain: str) -> bool:
    return bool(
        re.search(r"Current\s*\d+(?:\.\d+)?%\s*used", plain, re.I)
        and re.search(r"Weekly\s*\d+(?:\.\d+)?%\s*used", plain, re.I)
    )


def composer_ready(plain: str) -> bool:
    c = compact(plain)
    return "voiceinput" in c and "doyoutrustthisworkspace" not in c


def trust_prompt_visible(plain: str) -> bool:
    return "doyoutrustthisworkspace" in compact(plain)


def workspace_aliases(path: pathlib.Path) -> set[str]:
    aliases = {str(path), os.path.realpath(path)}
    try:
        aliases.add(str(path.resolve()))
    except OSError:
        pass
    return {a for a in aliases if a}


def load_trust() -> dict:
    if not TRUST_CFG.is_file():
        return {"schema_version": 1, "projects": {}}
    try:
        obj = json.loads(TRUST_CFG.read_text())
    except (OSError, json.JSONDecodeError):
        return {"schema_version": 1, "projects": {}}
    if not isinstance(obj, dict):
        return {"schema_version": 1, "projects": {}}
    obj.setdefault("schema_version", 1)
    if not isinstance(obj.get("projects"), dict):
        obj["projects"] = {}
    return obj


def save_trust(obj: dict) -> None:
    TRUST_CFG.parent.mkdir(parents=True, exist_ok=True)
    TRUST_CFG.write_text(json.dumps(obj, indent=2) + "\n")


def pretrust_workspace(path: pathlib.Path) -> None:
    obj = load_trust()
    for key in workspace_aliases(path):
        obj["projects"][key] = {"decision": "trusted"}
    save_trust(obj)
    log(f"pre-trusted {path}")


def untrust_workspace(path: pathlib.Path) -> None:
    if not TRUST_CFG.is_file():
        return
    obj = load_trust()
    projects = obj["projects"]
    drop = workspace_aliases(path)
    changed = False
    for key in list(projects):
        if key in drop or "muse-usage-pty-" in key:
            projects.pop(key, None)
            changed = True
    if changed:
        save_trust(obj)


def reply_queries(master: int, data: bytes) -> None:
    if b"\x1b[6n" in data or b"\x1b[?6n" in data:
        os.write(master, f"\x1b[{ROWS};{COLS}R".encode())
    if b"\x1b[c" in data or b"\x1b[0c" in data:
        os.write(master, b"\x1b[?1;2c")
    if b"\x1b[>c" in data:
        os.write(master, b"\x1b[>0;95;0c")
    if b"\x1b[18t" in data:
        os.write(master, f"\x1b[8;{ROWS};{COLS}t".encode())


def main() -> int:
    workdir = pathlib.Path(tempfile.mkdtemp(prefix="muse-usage-pty-"))
    (workdir / "README").write_text("sandbox for Muse TUI /usage probe\n")
    log(f"workspace {workdir}")
    pretrust_workspace(workdir)

    master, slave = pty.openpty()
    set_winsize(master, ROWS, COLS)
    set_winsize(slave, ROWS, COLS)

    env = os.environ.copy()
    env["TERM"] = "xterm-256color"
    env["COLUMNS"] = str(COLS)
    env["LINES"] = str(ROWS)
    env.pop("MUSE_CURRENT_SESSION_LOG", None)
    env.pop("TMUX", None)

    proc = subprocess.Popen(
        [MUSE_BIN],
        cwd=str(workdir),
        stdin=slave,
        stdout=slave,
        stderr=slave,
        env=env,
        close_fds=True,
    )
    os.close(slave)
    os.set_blocking(master, False)

    buf = bytearray()
    rc = 2

    def plain() -> str:
        return strip_ansi(buf.decode("utf-8", "replace"))

    def pump(seconds: float) -> None:
        end = time.time() + seconds
        while time.time() < end and proc.poll() is None:
            r, _, _ = select.select(
                [master], [], [], min(0.08, max(0.0, end - time.time()))
            )
            if not r:
                continue
            try:
                chunk = os.read(master, 65536)
            except OSError:
                return
            if not chunk:
                return
            buf.extend(chunk)
            reply_queries(master, chunk)

    deadline = time.time() + TIMEOUT
    try:
        # Wait for the composer. "muse-spark" appears in the boot banner
        # before input is live; Voice input is the real ready signal.
        ready = False
        while time.time() < deadline and proc.poll() is None:
            pump(0.2)
            p = plain()
            if trust_prompt_visible(p):
                log("trust prompt still appeared; aborting (pre-trust missed)")
                break
            if composer_ready(p):
                log("composer ready")
                ready = True
                break
        if proc.poll() is not None:
            log("muse exited during boot")
        elif not ready and time.time() >= deadline:
            log("boot timeout")

        if ready and proc.poll() is None:
            pump(0.8)
            log("typing /usage")
            os.write(master, b"/")
            pump(0.8)
            for ch in "usage":
                os.write(master, ch.encode())
                pump(0.08)
            pump(1.0)
            os.write(master, b"\r")
            pump(1.2)
            os.write(master, b"\r")
            # Plan percents ride an async subscription snapshot; session
            # token counts often paint first.
            log("sent /usage; waiting for Current/Weekly")
            wait_end = min(deadline - 2.5, time.time() + 22.0)
            saw_session = False
            while time.time() < wait_end and proc.poll() is None:
                pump(0.3)
                p = plain()
                if not saw_session and re.search(r"Session\s*usage", p, re.I):
                    saw_session = True
                    log("session panel up; waiting for Subscription percents")
                if usage_visible(p):
                    rc = 0
                    log("saw Current/Weekly percents")
                    break
            if rc != 0:
                log("timeout waiting for Current/Weekly")
            os.write(master, b"\x03")
            pump(1.0)
            os.write(master, b"\x03")
            pump(0.5)

        sys.stdout.write(plain())
        if not sys.stdout.isatty():
            sys.stdout.write("\n")
        sys.stdout.flush()
    finally:
        try:
            if proc.poll() is None:
                proc.terminate()
                try:
                    proc.wait(timeout=2)
                except subprocess.TimeoutExpired:
                    proc.kill()
                    proc.wait(timeout=2)
        except Exception:
            pass
        try:
            os.close(master)
        except OSError:
            pass
        untrust_workspace(workdir)
        log(f"exit {proc.poll()} capture_ok={rc == 0}")
    return rc


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(2)
