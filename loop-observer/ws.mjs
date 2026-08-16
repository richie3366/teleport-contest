/**
 * Minimal RFC 6455 WebSocket (text + ping/pong/close). Local observer only.
 */
import { createHash } from "node:crypto";

const MAGIC = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

export function upgradeWebSocket(req, socket, head) {
  const key = req.headers["sec-websocket-key"];
  if (!key || String(req.headers.upgrade || "").toLowerCase() !== "websocket") {
    socket.destroy();
    return null;
  }
  const accept = createHash("sha1").update(key + MAGIC).digest("base64");
  socket.write(
    "HTTP/1.1 101 Switching Protocols\r\n" +
      "Upgrade: websocket\r\n" +
      "Connection: Upgrade\r\n" +
      `Sec-WebSocket-Accept: ${accept}\r\n` +
      "\r\n",
  );
  if (head?.length) socket.unshift(head);
  socket.setNoDelay(true);
  return new WsConn(socket);
}

export class WsConn {
  constructor(socket) {
    this.socket = socket;
    this.alive = true;
    this.buf = Buffer.alloc(0);
    this.onMessage = null;
    this.onClose = null;
    socket.on("data", (chunk) => this._data(chunk));
    socket.on("close", () => this._die());
    socket.on("end", () => this._die());
    socket.on("error", () => this._die());
  }

  send(text) {
    if (!this.alive) return;
    try {
      this.socket.write(encodeFrame(0x1, Buffer.from(String(text), "utf8")));
    } catch {
      this._die();
    }
  }

  ping() {
    if (!this.alive) return;
    try {
      this.socket.write(encodeFrame(0x9, Buffer.alloc(0)));
    } catch {
      this._die();
    }
  }

  close() {
    if (!this.alive) return;
    try {
      this.socket.write(encodeFrame(0x8, Buffer.alloc(0)));
    } catch {
      /* ignore */
    }
    this._die(true);
  }

  _die(end = false) {
    if (!this.alive) return;
    this.alive = false;
    if (end) {
      try {
        this.socket.end();
      } catch {
        /* ignore */
      }
    }
    this.onClose?.();
  }

  _data(chunk) {
    this.buf = Buffer.concat([this.buf, chunk]);
    while (this.alive) {
      const frame = decodeFrame(this.buf);
      if (!frame) break;
      this.buf = this.buf.subarray(frame.consumed);
      this._handle(frame);
    }
  }

  _handle(frame) {
    if (frame.opcode === 0x8) {
      this.close();
      return;
    }
    if (frame.opcode === 0x9) {
      try {
        this.socket.write(encodeFrame(0xa, frame.payload));
      } catch {
        this._die();
      }
      return;
    }
    if (frame.opcode === 0xa) return;
    if (frame.opcode === 0x1) {
      this.onMessage?.(frame.payload.toString("utf8"));
    }
  }
}

function encodeFrame(opcode, payload) {
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = 0x80 | opcode;
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x80 | opcode;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x80 | opcode;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  return Buffer.concat([header, payload]);
}

function decodeFrame(buf) {
  if (buf.length < 2) return null;
  const opcode = buf[0] & 0x0f;
  const masked = (buf[1] & 0x80) !== 0;
  let len = buf[1] & 0x7f;
  let off = 2;
  if (len === 126) {
    if (buf.length < 4) return null;
    len = buf.readUInt16BE(2);
    off = 4;
  } else if (len === 127) {
    if (buf.length < 10) return null;
    const big = buf.readBigUInt64BE(2);
    if (big > BigInt(Number.MAX_SAFE_INTEGER)) return { opcode, payload: Buffer.alloc(0), consumed: buf.length };
    len = Number(big);
    off = 10;
  }
  const maskLen = masked ? 4 : 0;
  if (buf.length < off + maskLen + len) return null;
  let payload = buf.subarray(off + maskLen, off + maskLen + len);
  if (masked) {
    const mask = buf.subarray(off, off + 4);
    const out = Buffer.alloc(len);
    for (let i = 0; i < len; i++) out[i] = payload[i] ^ mask[i % 4];
    payload = out;
  }
  return { opcode, payload, consumed: off + maskLen + len };
}
