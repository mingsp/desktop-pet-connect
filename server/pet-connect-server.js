const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { WebSocket, WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT || 8787);
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");
const STORE_PATH = path.join(DATA_DIR, "pet-connect-store.json");
const MAX_TEXT_LENGTH = 140;
const MAX_QUEUE_LENGTH = 50;
const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const clients = new Map();
let saveTimer = null;
let store = {
  friends: {},
  invites: {},
  queuedMessages: {},
  users: {},
};

function now() {
  return Date.now();
}

function randomToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function randomInviteCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < 8; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function sanitizeText(value, maxLength, fallback = "") {
  const cleaned = String(value ?? "")
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return (cleaned || fallback).slice(0, maxLength);
}

function loadStore() {
  try {
    store = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  } catch (_error) {
    store = {
      friends: {},
      invites: {},
      queuedMessages: {},
      users: {},
    };
  }
}

function saveStoreSoon() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  }, 150);
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(body);
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8192) {
        request.destroy();
        reject(new Error("Body too large"));
      }
    });
    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function publicUser(userId) {
  const user = store.users[userId];
  if (!user) return null;
  const online = clients.has(userId);
  return {
    displayName: user.displayName,
    lastSeen: user.lastSeen || 0,
    online,
    petName: user.petName,
    status: online ? user.status || "online" : "offline",
    userId,
  };
}

function friendIds(userId) {
  return Array.from(new Set(store.friends[userId] || []));
}

function friendList(userId) {
  return friendIds(userId).map(publicUser).filter(Boolean);
}

function areFriends(a, b) {
  return friendIds(a).includes(b);
}

function addFriendship(a, b) {
  store.friends[a] = Array.from(new Set([...(store.friends[a] || []), b]));
  store.friends[b] = Array.from(new Set([...(store.friends[b] || []), a]));
}

function notifyFriends(userId) {
  const payload = {
    friend: publicUser(userId),
    type: "friend-status",
  };
  for (const friendId of friendIds(userId)) {
    sendToUser(friendId, payload);
  }
}

function sendToUser(userId, payload) {
  const client = clients.get(userId);
  if (!client || client.readyState !== WebSocket.OPEN) return false;
  client.send(JSON.stringify(payload));
  return true;
}

function queueMessage(userId, message) {
  const queue = store.queuedMessages[userId] || [];
  queue.push(message);
  store.queuedMessages[userId] = queue.slice(-MAX_QUEUE_LENGTH);
  saveStoreSoon();
}

function authenticate(userId, authToken) {
  const user = store.users[userId];
  return Boolean(user && user.authToken === authToken);
}

function createUser(profile = {}) {
  const userId = crypto.randomUUID();
  const authToken = randomToken();
  const createdAt = now();
  store.users[userId] = {
    authToken,
    createdAt,
    displayName: sanitizeText(profile.displayName, 32, "桌宠用户"),
    lastSeen: createdAt,
    petName: sanitizeText(profile.petName, 32, "我的桌宠"),
    status: "online",
  };
  store.friends[userId] = [];
  saveStoreSoon();
  return { authToken, userId };
}

async function handleHttp(request, response) {
  const url = new URL(request.url, "http://pet-connect.local");
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
    sendJson(response, 200, { ok: true, service: "pet-connect" });
    return;
  }

  if (request.method === "POST" && url.pathname === "/v1/register") {
    try {
      const body = await readJsonBody(request);
      const credentials = createUser(body);
      sendJson(response, 200, {
        ok: true,
        ...credentials,
      });
    } catch (_error) {
      sendJson(response, 400, { error: "Invalid JSON", ok: false });
    }
    return;
  }

  sendJson(response, 404, { error: "Not found", ok: false });
}

function wsSend(ws, payload) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function wsError(ws, requestId, message) {
  wsSend(ws, {
    error: message,
    ok: false,
    requestId,
    type: "error",
  });
}

function createInvite(userId) {
  let code = randomInviteCode();
  while (store.invites[code]) code = randomInviteCode();
  const expiresAt = now() + INVITE_TTL_MS;
  store.invites[code] = {
    code,
    createdAt: now(),
    expiresAt,
    fromUserId: userId,
  };
  saveStoreSoon();
  return { code, expiresAt };
}

function acceptInvite(userId, code) {
  const normalized = sanitizeText(code, 16).toUpperCase().replace(/[^A-Z0-9]/g, "");
  const invite = store.invites[normalized];
  if (!invite || invite.expiresAt < now()) {
    return { error: "邀请码不存在或已过期。" };
  }
  if (invite.fromUserId === userId) {
    return { error: "不能添加自己的邀请码。" };
  }
  if (!store.users[invite.fromUserId]) {
    return { error: "邀请人不存在。" };
  }
  addFriendship(userId, invite.fromUserId);
  delete store.invites[normalized];
  saveStoreSoon();
  return {
    friend: publicUser(invite.fromUserId),
  };
}

function deliverQueuedMessages(userId) {
  const queue = store.queuedMessages[userId] || [];
  delete store.queuedMessages[userId];
  if (queue.length) saveStoreSoon();
  for (const message of queue) {
    sendToUser(userId, {
      message,
      type: "message",
    });
  }
}

function handleAuthedMessage(ws, data) {
  const requestId = data.requestId;
  const userId = ws.userId;

  switch (data.type) {
    case "update-profile": {
      const user = store.users[userId];
      user.displayName = sanitizeText(data.profile?.displayName, 32, user.displayName);
      user.petName = sanitizeText(data.profile?.petName, 32, user.petName);
      user.status = sanitizeText(data.profile?.status, 16, user.status);
      user.lastSeen = now();
      saveStoreSoon();
      notifyFriends(userId);
      wsSend(ws, {
        ok: true,
        requestId,
        self: publicUser(userId),
        type: "profile-updated",
      });
      break;
    }
    case "create-invite": {
      const invite = createInvite(userId);
      wsSend(ws, {
        invite,
        ok: true,
        requestId,
        type: "invite-created",
      });
      break;
    }
    case "accept-invite": {
      const result = acceptInvite(userId, data.code);
      if (result.error) {
        wsError(ws, requestId, result.error);
        break;
      }
      wsSend(ws, {
        friend: result.friend,
        friends: friendList(userId),
        ok: true,
        requestId,
        type: "friend-added",
      });
      sendToUser(result.friend.userId, {
        friend: publicUser(userId),
        friends: friendList(result.friend.userId),
        type: "friend-added",
      });
      notifyFriends(userId);
      notifyFriends(result.friend.userId);
      break;
    }
    case "list-friends": {
      wsSend(ws, {
        friends: friendList(userId),
        ok: true,
        requestId,
        type: "friend-list",
      });
      break;
    }
    case "send-message": {
      const toUserId = sanitizeText(data.toUserId, 80);
      if (!store.users[toUserId] || !areFriends(userId, toUserId)) {
        wsError(ws, requestId, "只能给好友发送消息。");
        break;
      }
      const message = {
        from: publicUser(userId),
        id: crypto.randomUUID(),
        sentAt: now(),
        text: sanitizeText(data.text, MAX_TEXT_LENGTH),
        toUserId,
      };
      if (!message.text) {
        wsError(ws, requestId, "消息不能为空。");
        break;
      }
      const delivered = sendToUser(toUserId, {
        message,
        type: "message",
      });
      if (!delivered) queueMessage(toUserId, message);
      wsSend(ws, {
        delivered,
        message,
        ok: true,
        requestId,
        type: "message-sent",
      });
      break;
    }
    default:
      wsError(ws, requestId, "未知消息类型。");
      break;
  }
}

function handleWsMessage(ws, raw) {
  let data;
  try {
    data = JSON.parse(raw.toString());
  } catch (_error) {
    wsError(ws, undefined, "消息不是有效 JSON。");
    return;
  }

  if (data.type === "hello") {
    if (!authenticate(data.userId, data.authToken)) {
      wsError(ws, data.requestId, "身份验证失败。");
      ws.close(1008, "Unauthorized");
      return;
    }

    if (ws.userId && clients.get(ws.userId) === ws) {
      clients.delete(ws.userId);
    }

    ws.userId = data.userId;
    clients.set(data.userId, ws);

    const user = store.users[data.userId];
    user.displayName = sanitizeText(data.profile?.displayName, 32, user.displayName);
    user.petName = sanitizeText(data.profile?.petName, 32, user.petName);
    user.status = sanitizeText(data.profile?.status, 16, "online");
    user.lastSeen = now();
    saveStoreSoon();

    wsSend(ws, {
      friends: friendList(data.userId),
      ok: true,
      requestId: data.requestId,
      self: publicUser(data.userId),
      type: "welcome",
    });
    notifyFriends(data.userId);
    deliverQueuedMessages(data.userId);
    return;
  }

  if (!ws.userId) {
    wsError(ws, data.requestId, "请先发送 hello。");
    return;
  }

  handleAuthedMessage(ws, data);
}

function handleWsClose(ws) {
  if (!ws.userId) return;
  if (clients.get(ws.userId) === ws) {
    clients.delete(ws.userId);
  }
  const user = store.users[ws.userId];
  if (user) {
    user.lastSeen = now();
    saveStoreSoon();
  }
  notifyFriends(ws.userId);
}

loadStore();

const server = http.createServer((request, response) => {
  handleHttp(request, response).catch(() => {
    sendJson(response, 500, { error: "Internal server error", ok: false });
  });
});

const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (ws) => {
  ws.on("message", (raw) => handleWsMessage(ws, raw));
  ws.on("close", () => handleWsClose(ws));
  ws.on("error", () => handleWsClose(ws));
});

server.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url, "http://pet-connect.local");
  if (url.pathname !== "/ws") {
    socket.destroy();
    return;
  }
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`pet-connect listening on ${PORT}`);
});
