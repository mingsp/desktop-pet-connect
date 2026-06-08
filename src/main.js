const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  clipboard,
  dialog,
  globalShortcut,
  ipcMain,
  nativeImage,
  screen,
  shell,
} = require("electron");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const zlib = require("zlib");
const WebSocket = require("ws");

const MIN_SCALE = 0.75;
const MAX_SCALE = 3;
const MIN_OPACITY = 0.35;
const MAX_OPACITY = 1;
const DEFAULT_PET_DIR = path.join("assets", "pets", "pixel-girl");
const NAME_TAG_HEIGHT_PHYSICAL = 28;
const TOP_UI_HEIGHT_PHYSICAL = 116;
const ROAM_RADIUS_PHYSICAL = 96;
const GENERATED_ACTION_SPECS = [
  { aliases: ["idle", "stand", "standing", "default"], label: "站立", loop: true, state: "idle" },
  { aliases: ["wave", "waving", "receive", "message", "reply"], label: "打招呼", loop: false, state: "waving" },
  { aliases: ["jump", "jumping", "happy"], label: "跳跃", loop: false, state: "jumping" },
  { aliases: ["sleep", "sleepy", "calm", "quiet"], label: "安静陪伴", loop: true, state: "sleepy" },
];

const DEFAULT_SETTINGS = {
  activePetId: "builtin:pixel-girl",
  behaviorEnabled: true,
  bounds: null,
  hideOnHover: false,
  hideOnHoverDelay: 0.25,
  inputReactions: true,
  keepInScreen: true,
  opacity: 1,
  passThrough: false,
  petConnect: {
    allowIncoming: true,
    authToken: "",
    connectionState: "disconnected",
    displayName: "",
    doNotDisturb: false,
    friends: [],
    inviteCode: "",
    inviteExpiresAt: 0,
    lastError: "",
    outgoingMessage: "你好，我的桌宠来传话。",
    pendingInviteCode: "",
    enabled: true,
    recentMessages: [],
    selectedFriendId: "",
    serverBaseUrl: "https://app.qimozhu.abrdns.com/pet-connect",
    status: "online",
    testFriend: {
      authToken: "",
      displayName: "本地测试朋友",
      outgoingMessage: "我是真实测试朋友桌宠，这条消息走的是服务器。",
      petName: "测试朋友桌宠",
      userId: "",
    },
    userId: "",
  },
  petProfile: {
    birthday: "",
    notes: "",
    personality: "温柔、好奇、安静陪伴",
  },
  emotionFrequency: 0.35,
  greeting: {
    text: "你好呀，我在这里。",
  },
  scale: 1,
  petName: "",
  shortcuts: {
    openPreferences: "CommandOrControl+Alt+I",
    togglePassThrough: "CommandOrControl+Alt+O",
    toggleVisible: "CommandOrControl+Alt+P",
  },
  showName: true,
  taskbarVisible: false,
  topmost: true,
  visible: true,
  weather: {
    city: "Shanghai",
  },
};

let mainWindow = null;
let nameWindow = null;
let importPreviewWindow = null;
let preferencesWindow = null;
let tray = null;
let settings = { ...DEFAULT_SETTINGS };
let petManifest = null;
let petDir = null;
let activePetPackage = null;
let currentDisplayId = null;
let homeTopLeft = null;
let pendingImportPreview = null;
let resolveImportPreview = null;
let petConnectSocket = null;
let petConnectReconnectTimer = null;
let petConnectRequestId = 1;
let petConnectPendingRequests = new Map();
let petConnectTestFriendSocket = null;
let petConnectTestFriendRequestId = 1;
let saveSettingsTimer = null;
let hoverHideTimer = null;
let hoverPollTimer = null;
let hoverHidden = false;
let prefsPreviewOriginalScale = null;
let prefsPreviewOriginalOpacity = null;
let prefsWasSaved = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sanitizeText(value, maxLength, fallback = "") {
  const cleaned = String(value ?? "")
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return (cleaned || fallback).slice(0, maxLength);
}

function sanitizePetConnect(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const statuses = new Set(["online", "away", "focus", "dnd"]);
  const connectionStates = new Set(["disconnected", "connecting", "connected", "error", "disabled", "unregistered"]);
  const recentMessages = Array.isArray(source.recentMessages)
    ? source.recentMessages.slice(0, 12).map((message) => ({
      direction: message?.direction === "outgoing" ? "outgoing" : "incoming",
      friendName: sanitizeText(message?.friendName, 32, "朋友"),
      friendPetName: sanitizeText(message?.friendPetName, 32, "朋友的桌宠"),
      muted: Boolean(message?.muted),
      receivedAt: Number(message?.receivedAt) || Date.now(),
      text: sanitizeText(message?.text, 140, DEFAULT_SETTINGS.petConnect.outgoingMessage),
    }))
    : [];
  const friends = Array.isArray(source.friends)
    ? source.friends.slice(0, 100).map((friend) => ({
      displayName: sanitizeText(friend?.displayName, 32, "朋友"),
      boundPetId: sanitizeText(friend?.boundPetId, 80, ""),
      lastSeen: Number(friend?.lastSeen) || 0,
      localAlias: sanitizeText(friend?.localAlias, 32, ""),
      localNote: sanitizeText(friend?.localNote, 120, ""),
      muted: Boolean(friend?.muted),
      online: Boolean(friend?.online),
      petName: sanitizeText(friend?.petName, 32, "朋友的桌宠"),
      relationshipLabel: sanitizeText(friend?.relationshipLabel, 16, "好友"),
      status: statuses.has(friend?.status) || friend?.status === "offline" ? friend.status : "offline",
      userId: sanitizeText(friend?.userId, 80),
    })).filter((friend) => friend.userId)
    : [];
  const serverBaseUrl = sanitizeText(source.serverBaseUrl, 160, DEFAULT_SETTINGS.petConnect.serverBaseUrl).replace(/\/+$/, "");
  const testFriendSource = source.testFriend && typeof source.testFriend === "object" ? source.testFriend : {};
  const testFriend = {
    ...DEFAULT_SETTINGS.petConnect.testFriend,
    ...testFriendSource,
    authToken: sanitizeText(testFriendSource.authToken, 200, ""),
    displayName: sanitizeText(testFriendSource.displayName, 32, DEFAULT_SETTINGS.petConnect.testFriend.displayName),
    outgoingMessage: sanitizeText(testFriendSource.outgoingMessage, 140, DEFAULT_SETTINGS.petConnect.testFriend.outgoingMessage),
    petName: sanitizeText(testFriendSource.petName, 32, DEFAULT_SETTINGS.petConnect.testFriend.petName),
    userId: sanitizeText(testFriendSource.userId, 80, ""),
  };

  return {
    ...DEFAULT_SETTINGS.petConnect,
    ...source,
    allowIncoming: source.allowIncoming !== false,
    authToken: sanitizeText(source.authToken, 200, ""),
    connectionState: connectionStates.has(source.connectionState) ? source.connectionState : DEFAULT_SETTINGS.petConnect.connectionState,
    displayName: sanitizeText(source.displayName, 32, ""),
    doNotDisturb: Boolean(source.doNotDisturb),
    enabled: source.enabled !== false,
    friends,
    inviteCode: sanitizeText(source.inviteCode, 32, ""),
    inviteExpiresAt: Number(source.inviteExpiresAt) || 0,
    lastError: sanitizeText(source.lastError, 120, ""),
    outgoingMessage: sanitizeText(source.outgoingMessage, 140, DEFAULT_SETTINGS.petConnect.outgoingMessage),
    pendingInviteCode: sanitizeText(source.pendingInviteCode, 32, ""),
    recentMessages,
    selectedFriendId: sanitizeText(source.selectedFriendId, 80, ""),
    serverBaseUrl,
    status: statuses.has(source.status) ? source.status : DEFAULT_SETTINGS.petConnect.status,
    testFriend,
    userId: sanitizeText(source.userId, 80, ""),
  };
}

function sanitizeSettings(raw) {
  const profile = {
    ...DEFAULT_SETTINGS.petProfile,
    ...(raw?.petProfile ?? {}),
  };
  const shortcuts = {
    ...DEFAULT_SETTINGS.shortcuts,
    ...(raw?.shortcuts ?? {}),
  };
  const weather = {
    ...DEFAULT_SETTINGS.weather,
    ...(raw?.weather ?? {}),
  };
  const greeting = {
    ...DEFAULT_SETTINGS.greeting,
    ...(raw?.greeting ?? {}),
  };
  const petConnect = sanitizePetConnect(raw?.petConnect);

  return {
    ...DEFAULT_SETTINGS,
    ...raw,
    emotionFrequency: clamp(Number(raw?.emotionFrequency ?? DEFAULT_SETTINGS.emotionFrequency), 0, 1),
    greeting,
    hideOnHoverDelay: clamp(Number(raw?.hideOnHoverDelay ?? DEFAULT_SETTINGS.hideOnHoverDelay), 0, 5),
    opacity: clamp(Number(raw?.opacity ?? DEFAULT_SETTINGS.opacity), MIN_OPACITY, MAX_OPACITY),
    petConnect,
    petProfile: profile,
    scale: clamp(Number(raw?.scale ?? DEFAULT_SETTINGS.scale), MIN_SCALE, MAX_SCALE),
    shortcuts,
    weather,
  };
}

function sanitizePetName(name) {
  const cleaned = String(name ?? "")
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 24);
}

function sanitizeId(value) {
  return String(value ?? "pet")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "pet";
}

function getUserPetsDir() {
  return path.join(app.getPath("userData"), "pets");
}

function normalizePetManifest(manifest, dir, fallbackId) {
  const id = sanitizeId(manifest.id || fallbackId);
  const spritesheet = manifest.spritesheet || manifest.spritesheetPath || "spritesheet.png";
  return {
    ...manifest,
    id,
    displayName: manifest.displayName || id,
    spritesheet,
    spritesheetPath: spritesheet,
    grid: manifest.grid || { columns: 8, rows: 9 },
    cell: manifest.cell || { width: 192, height: 208 },
    states: manifest.states,
    dir,
  };
}

function resolvePackageFile(dir, filePath) {
  if (!filePath || path.isAbsolute(filePath)) return null;
  const base = path.resolve(dir);
  const resolved = path.resolve(dir, filePath);
  if (resolved !== base && !resolved.startsWith(`${base}${path.sep}`)) return null;
  return resolved;
}

function readPetPackage(dir, packageId) {
  const manifestPath = path.join(dir, "pet.json");
  if (!fs.existsSync(manifestPath)) return null;

  try {
    const raw = fs.readFileSync(manifestPath, "utf8");
    const manifest = normalizePetManifest(JSON.parse(raw), dir, path.basename(dir));
    const spritesheetPath = resolvePackageFile(dir, manifest.spritesheet);
    if (!spritesheetPath || !fs.existsSync(spritesheetPath)) return null;
    return {
      id: packageId,
      dir,
      displayName: manifest.displayName,
      manifest,
      spritesheetPath,
    };
  } catch (_error) {
    return null;
  }
}

function toPositiveInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function summarizeStateNames(states) {
  if (!states || typeof states !== "object") return [];
  return Object.keys(states).sort();
}

function validatePetPackage(dir) {
  const errors = [];
  const warnings = [];
  const manifestPath = path.join(dir, "pet.json");
  let rawManifest = null;
  let manifest = null;
  let spritesheetPath = null;
  let previewPath = null;
  let spriteSize = null;

  if (!fs.existsSync(manifestPath)) {
    errors.push("缺少 pet.json。");
  } else {
    try {
      rawManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""));
      manifest = normalizePetManifest(rawManifest, dir, path.basename(dir));
    } catch (_error) {
      errors.push("pet.json 不是有效的 JSON。");
    }
  }

  if (manifest) {
    if (!rawManifest.id) warnings.push("pet.json 未填写 id，将根据目录名生成。");
    if (!rawManifest.displayName) warnings.push("pet.json 未填写 displayName，将使用 id 作为显示名。");

    spritesheetPath = resolvePackageFile(dir, manifest.spritesheet);
    if (!spritesheetPath) {
      errors.push("spritesheet 必须是宠物包目录内的相对路径。");
    } else if (!fs.existsSync(spritesheetPath)) {
      errors.push(`找不到精灵图文件：${manifest.spritesheet}`);
    } else {
      const image = nativeImage.createFromPath(spritesheetPath);
      spriteSize = image.isEmpty() ? null : image.getSize();
      if (!spriteSize) {
        errors.push("精灵图无法读取，请确认它是有效 PNG。");
      }
    }

    const columns = toPositiveInteger(manifest.grid?.columns);
    const rows = toPositiveInteger(manifest.grid?.rows);
    const cellWidth = toPositiveInteger(manifest.cell?.width);
    const cellHeight = toPositiveInteger(manifest.cell?.height);

    if (!columns || !rows) errors.push("grid.columns 和 grid.rows 必须是正整数。");
    if (!cellWidth || !cellHeight) errors.push("cell.width 和 cell.height 必须是正整数。");
    if (!manifest.states || typeof manifest.states !== "object" || !Object.keys(manifest.states).length) {
      errors.push("states 至少需要包含一个动作状态。");
    }

    if (columns && rows && cellWidth && cellHeight && spriteSize) {
      const expectedWidth = columns * cellWidth;
      const expectedHeight = rows * cellHeight;
      if (spriteSize.width !== expectedWidth || spriteSize.height !== expectedHeight) {
        errors.push(`精灵图尺寸应为 ${expectedWidth}x${expectedHeight}，当前为 ${spriteSize.width}x${spriteSize.height}。`);
      }
    }

    if (manifest.states && typeof manifest.states === "object") {
      for (const [stateName, stateSpec] of Object.entries(manifest.states)) {
        const row = Number(stateSpec?.row);
        const frameCount = Number(stateSpec?.frames);
        if (!Number.isInteger(row) || row < 0 || (rows && row >= rows)) {
          errors.push(`${stateName} 的 row 超出 grid.rows 范围。`);
        }
        if (!Number.isInteger(frameCount) || frameCount <= 0) {
          errors.push(`${stateName} 的 frames 必须是正整数。`);
        } else if (columns && frameCount > columns) {
          errors.push(`${stateName} 的 frames 不能超过 grid.columns。`);
        }
        if (Array.isArray(stateSpec?.durations) && stateSpec.durations.length < frameCount) {
          warnings.push(`${stateName} 的 durations 少于 frames，缺失帧会使用默认时长。`);
        }
      }
    }

    if (Array.isArray(manifest.actions)) {
      for (const action of manifest.actions) {
        if (action?.state && !manifest.states?.[action.state]) {
          warnings.push(`动作「${action.label || action.state}」指向不存在的状态：${action.state}。`);
        }
      }
    }

    const explicitPreviewPath = resolvePackageFile(dir, rawManifest?.preview || "preview.png");
    if (explicitPreviewPath && fs.existsSync(explicitPreviewPath)) {
      previewPath = explicitPreviewPath;
    } else if (spritesheetPath && fs.existsSync(spritesheetPath)) {
      previewPath = spritesheetPath;
      warnings.push("未找到 preview.png，将使用精灵图作为预览。");
    }
  }

  const stateNames = summarizeStateNames(manifest?.states);
  const baseId = sanitizeId(manifest?.id || path.basename(dir));
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    sourceDir: dir,
    packageIdCandidate: baseId,
    displayName: manifest?.displayName || baseId,
    spritesheetName: manifest?.spritesheet || "",
    previewUrl: previewPath ? pathToFileURL(previewPath).href : "",
    grid: manifest?.grid || null,
    cell: manifest?.cell || null,
    spriteSize,
    stateNames,
    actionCount: Array.isArray(manifest?.actions) ? manifest.actions.length : 0,
  };
}

function listPetPackages() {
  const packages = [];
  const builtInRoot = path.join(app.getAppPath(), "assets", "pets");
  if (fs.existsSync(builtInRoot)) {
    for (const entry of fs.readdirSync(builtInRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const packageId = `builtin:${entry.name}`;
      const petPackage = readPetPackage(path.join(builtInRoot, entry.name), packageId);
      if (petPackage) {
        packages.push({ ...petPackage, source: "builtin" });
      }
    }
  }

  const userPetsDir = getUserPetsDir();
  if (fs.existsSync(userPetsDir)) {
    for (const entry of fs.readdirSync(userPetsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const packageId = `custom:${entry.name}`;
      const petPackage = readPetPackage(path.join(userPetsDir, entry.name), packageId);
      if (petPackage) {
        packages.push({ ...petPackage, source: "custom" });
      }
    }
  }

  return packages;
}

function getSettingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function loadSettings() {
  try {
    const raw = fs.readFileSync(getSettingsPath(), "utf8");
    settings = sanitizeSettings(JSON.parse(raw.replace(/^\uFEFF/, "")));
  } catch (_error) {
    settings = { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  const settingsPath = getSettingsPath();
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`, "utf8");
}

function scheduleSaveSettings() {
  if (saveSettingsTimer) clearTimeout(saveSettingsTimer);
  saveSettingsTimer = setTimeout(() => {
    saveSettingsTimer = null;
    saveSettings();
  }, 250);
}

function parseScaleArg() {
  const index = process.argv.indexOf("--scale");
  if (index >= 0 && process.argv[index + 1]) {
    const parsed = Number(process.argv[index + 1]);
    if (Number.isFinite(parsed)) {
      settings.scale = clamp(parsed, MIN_SCALE, MAX_SCALE);
    }
  }
}

function loadPetManifest() {
  const packages = listPetPackages();
  activePetPackage = packages.find((item) => item.id === settings.activePetId) ?? packages[0];
  if (!activePetPackage) {
    throw new Error("No valid pet package found.");
  }

  settings.activePetId = activePetPackage.id;
  petDir = activePetPackage.dir;
  petManifest = activePetPackage.manifest;

  if (!settings.petName) {
    settings.petName = sanitizePetName(petManifest.displayName || petManifest.id || "Desktop Pet");
  }
}

function getWindowSizeForDisplay(display) {
  const cellWidth = petManifest?.cell?.width ?? 192;
  const cellHeight = petManifest?.cell?.height ?? 208;
  const scaleFactor = display?.scaleFactor || 1;
  const topUiHeight = TOP_UI_HEIGHT_PHYSICAL;
  const nameHeight = settings.showName ? NAME_TAG_HEIGHT_PHYSICAL : 0;
  return {
    width: Math.round((cellWidth * settings.scale) / scaleFactor),
    height: Math.round(((cellHeight + topUiHeight + nameHeight) * settings.scale) / scaleFactor),
  };
}

function getTopUiHeightForDisplay(display) {
  return Math.round((TOP_UI_HEIGHT_PHYSICAL * settings.scale) / (display?.scaleFactor || 1));
}

function getWindowDisplay(bounds) {
  return screen.getDisplayNearestPoint({
    x: Math.round(bounds.x + bounds.width / 2),
    y: Math.round(bounds.y + bounds.height / 2),
  });
}

function clampBoundsToDisplay(bounds, display) {
  const workArea = display.workArea;
  const maxX = workArea.x + workArea.width - bounds.width;
  const maxY = workArea.y + workArea.height - bounds.height;
  return {
    ...bounds,
    x: Math.round(settings.keepInScreen ? clamp(bounds.x, workArea.x, maxX) : bounds.x),
    y: Math.round(settings.keepInScreen ? clamp(bounds.y, workArea.y, maxY) : bounds.y),
  };
}

function findDisplayForSavedBounds(bounds) {
  if (!bounds || !Number.isFinite(bounds.x) || !Number.isFinite(bounds.y)) {
    return screen.getPrimaryDisplay();
  }

  const displays = screen.getAllDisplays();
  const point = {
    x: Math.round(bounds.x + (bounds.width ?? 0) / 2),
    y: Math.round(bounds.y + (bounds.height ?? 0) / 2),
  };

  return displays.find((display) => {
    const area = display.workArea;
    return point.x >= area.x
      && point.x <= area.x + area.width
      && point.y >= area.y
      && point.y <= area.y + area.height;
  }) ?? screen.getDisplayNearestPoint(point);
}

function getInitialBounds() {
  const display = findDisplayForSavedBounds(settings.bounds);
  const size = getWindowSizeForDisplay(display);
  const workArea = display.workArea;
  const fallback = {
    x: workArea.x + workArea.width - size.width - 88,
    y: workArea.y + workArea.height - size.height - 96,
    ...size,
  };

  if (!settings.bounds) return clampBoundsToDisplay(fallback, display);

  return clampBoundsToDisplay(
    {
      x: settings.bounds.x,
      y: settings.bounds.y - Math.max(0, size.height - (settings.bounds.height ?? size.height)),
      ...size,
    },
    display,
  );
}

function ensureSizeForDisplay(display, preferredX, preferredY) {
  if (!mainWindow) return;

  const currentBounds = mainWindow.getBounds();
  const nextSize = getWindowSizeForDisplay(display);
  const changedDisplay = currentDisplayId !== display.id;
  const changedSize = currentBounds.width !== nextSize.width || currentBounds.height !== nextSize.height;

  if (!changedDisplay && !changedSize) return;

  const nextBounds = clampBoundsToDisplay(
    {
      x: Number.isFinite(preferredX) ? preferredX : currentBounds.x,
      y: Number.isFinite(preferredY) ? preferredY : currentBounds.y,
      width: nextSize.width,
      height: nextSize.height,
    },
    display,
  );

  mainWindow.setBounds(nextBounds, false);
  currentDisplayId = display.id;
}

function getRoamRange(bounds, display) {
  const workArea = display.workArea;
  const hardMinX = workArea.x;
  const hardMaxX = workArea.x + workArea.width - bounds.width;
  const hardMinY = workArea.y;
  const hardMaxY = workArea.y + workArea.height - bounds.height;

  if (!homeTopLeft) {
    return { minX: hardMinX, maxX: hardMaxX, minY: hardMinY, maxY: hardMaxY };
  }

  const radius = Math.round(ROAM_RADIUS_PHYSICAL / (display.scaleFactor || 1));
  return {
    minX: Math.max(hardMinX, homeTopLeft.x - radius),
    maxX: Math.min(hardMaxX, homeTopLeft.x + radius),
    minY: Math.max(hardMinY, homeTopLeft.y - Math.round(radius * 0.5)),
    maxY: Math.min(hardMaxY, homeTopLeft.y + Math.round(radius * 0.5)),
  };
}

function rememberCurrentBounds() {
  if (!mainWindow) return;
  settings.bounds = mainWindow.getBounds();
  scheduleSaveSettings();
}

function setHomeFromCurrentBounds() {
  if (!mainWindow) return;
  const bounds = mainWindow.getBounds();
  homeTopLeft = { x: bounds.x, y: bounds.y };
  rememberCurrentBounds();
}

function sendRenderer(channel, payload) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send(channel, payload);
}

function getOnlineFriends() {
  return sanitizePetConnect(settings.petConnect).friends.filter((friend) => friend.online);
}

function broadcastFriendsOnline() {
  const onlineFriends = getOnlineFriends();
  sendRenderer("pet:friends-online", {
    count: onlineFriends.length,
    firstName: onlineFriends[0]?.localAlias || onlineFriends[0]?.displayName || "",
    firstPetName: onlineFriends[0]?.petName || "",
  });
}

function sendSpeech(text, duration = 4200) {
  sendRenderer("pet:say", { text, duration });
}

function getRendererPetConfig() {
  const display = mainWindow && !mainWindow.isDestroyed()
    ? getWindowDisplay(mainWindow.getBounds())
    : screen.getPrimaryDisplay();

  const onlineFriends = getOnlineFriends();
  return {
    behaviorEnabled: settings.behaviorEnabled,
    emotionFrequency: settings.emotionFrequency,
    friendsOnline: {
      count: onlineFriends.length,
      firstName: onlineFriends[0]?.localAlias || onlineFriends[0]?.displayName || "",
      firstPetName: onlineFriends[0]?.petName || "",
    },
    greeting: settings.greeting,
    inputReactions: settings.inputReactions,
    petName: settings.petName,
    scale: settings.scale,
    showName: settings.showName,
    pet: petManifest,
    spritesheetUrl: pathToFileURL(path.join(petDir, petManifest.spritesheet)).href,
    topUiHeight: getTopUiHeightForDisplay(display),
  };
}

function sendSettingsChanged() {
  if (preferencesWindow && !preferencesWindow.isDestroyed()) {
    preferencesWindow.webContents.send("preferences:changed", getPreferencesConfig());
  }
}

function broadcastRuntimeSettings() {
  sendRenderer("pet:behavior-enabled", settings.behaviorEnabled);
  sendRenderer("pet:input-reactions", settings.inputReactions);
  sendRenderer("pet:runtime-settings", {
    emotionFrequency: settings.emotionFrequency,
    greeting: settings.greeting,
  });
  sendRenderer("pet:name-display", {
    petName: settings.petName,
    showName: settings.showName,
  });
  sendSettingsChanged();
}

function refreshTrayMenu() {
  if (!tray) return;
  tray.setContextMenu(Menu.buildFromTemplate(buildMenuTemplate("tray")));
  tray.setToolTip(settings.petName || "Desktop Pet");
}

function resizeWindowForCurrentDisplay() {
  if (!mainWindow) return;
  const current = mainWindow.getBounds();
  const display = getWindowDisplay(current);
  const size = getWindowSizeForDisplay(display);
  const y = current.y - Math.max(0, size.height - current.height);
  mainWindow.setBounds(clampBoundsToDisplay({ ...current, y, ...size }, display), false);
  setHomeFromCurrentBounds();
  sendRenderer("pet:asset", getRendererPetConfig());
}

function setScale(nextScale) {
  if (!mainWindow) return;
  const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  if (Math.abs(settings.scale - clamped) < 0.01) return;
  settings.scale = clamped;
  resizeWindowForCurrentDisplay();
  sendRenderer("pet:scale", settings.scale);
  refreshTrayMenu();
  sendSettingsChanged();
}

function setPetName(nextName) {
  const sanitized = sanitizePetName(nextName) || sanitizePetName(petManifest?.displayName || "Desktop Pet");
  settings.petName = sanitized;
  sendRenderer("pet:name", settings.petName);
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setShowName(nextShowName) {
  const showName = Boolean(nextShowName);
  if (settings.showName === showName) return;
  settings.showName = showName;
  resizeWindowForCurrentDisplay();
  sendRenderer("pet:name-display", {
    petName: settings.petName,
    showName: settings.showName,
  });
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function previewScaleForPreferences(nextScale) {
  const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  if (!mainWindow || mainWindow.isDestroyed()) return;
  settings.scale = clamped;
  resizeWindowForCurrentDisplay();
  sendRenderer("pet:scale", clamped);
}

function previewOpacityForPreferences(nextOpacity) {
  const opacity = clamp(nextOpacity, MIN_OPACITY, MAX_OPACITY);
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.setOpacity(opacity);
}

function setOpacity(nextOpacity) {
  const opacity = clamp(nextOpacity, MIN_OPACITY, MAX_OPACITY);
  if (Math.abs(settings.opacity - opacity) < 0.01) return;
  settings.opacity = opacity;
  if (mainWindow) mainWindow.setOpacity(settings.opacity);
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setTopmost(nextTopmost) {
  const topmost = Boolean(nextTopmost);
  if (settings.topmost === topmost) return;
  settings.topmost = topmost;
  if (mainWindow) mainWindow.setAlwaysOnTop(settings.topmost, "screen-saver");
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setPassThrough(nextPassThrough) {
  const passThrough = Boolean(nextPassThrough);
  if (settings.passThrough === passThrough) return;
  settings.passThrough = passThrough;
  if (mainWindow) mainWindow.setIgnoreMouseEvents(settings.passThrough, { forward: true });
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setTaskbarVisible(nextVisible) {
  const taskbarVisible = Boolean(nextVisible);
  if (settings.taskbarVisible === taskbarVisible) return;
  settings.taskbarVisible = taskbarVisible;
  if (mainWindow) mainWindow.setSkipTaskbar(!settings.taskbarVisible);
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setBehaviorEnabled(nextEnabled) {
  const behaviorEnabled = Boolean(nextEnabled);
  if (settings.behaviorEnabled === behaviorEnabled) return;
  settings.behaviorEnabled = behaviorEnabled;
  sendRenderer("pet:behavior-enabled", settings.behaviorEnabled);
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function restoreHoverHidden() {
  if (hoverHideTimer) {
    clearTimeout(hoverHideTimer);
    hoverHideTimer = null;
  }
  if (hoverPollTimer) {
    clearInterval(hoverPollTimer);
    hoverPollTimer = null;
  }
  hoverHidden = false;
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setOpacity(settings.opacity);
    mainWindow.setIgnoreMouseEvents(settings.passThrough, { forward: true });
  }
  sendRenderer("pet:hover-hidden", false);
}

function isCursorInsidePetWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) return false;
  const cursor = screen.getCursorScreenPoint();
  const bounds = mainWindow.getBounds();
  return cursor.x >= bounds.x
    && cursor.x <= bounds.x + bounds.width
    && cursor.y >= bounds.y
    && cursor.y <= bounds.y + bounds.height;
}

function startHoverHiddenPolling() {
  if (hoverPollTimer) clearInterval(hoverPollTimer);
  hoverPollTimer = setInterval(() => {
    if (!hoverHidden || isCursorInsidePetWindow()) return;
    restoreHoverHidden();
  }, 120);
}

function scheduleHoverHide() {
  if (!settings.hideOnHover || settings.passThrough || hoverHidden) return;
  if (hoverHideTimer) clearTimeout(hoverHideTimer);
  hoverHideTimer = setTimeout(() => {
    hoverHideTimer = null;
    if (!mainWindow || mainWindow.isDestroyed() || !isCursorInsidePetWindow()) return;
    hoverHidden = true;
    sendRenderer("pet:hover-hidden", true);
    mainWindow.setOpacity(0.04);
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
    startHoverHiddenPolling();
  }, Math.round(settings.hideOnHoverDelay * 1000));
}

function setInputReactions(nextEnabled) {
  settings.inputReactions = Boolean(nextEnabled);
  sendRenderer("pet:input-reactions", settings.inputReactions);
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setHideOnHover(nextEnabled, nextDelay = settings.hideOnHoverDelay) {
  settings.hideOnHover = Boolean(nextEnabled);
  settings.hideOnHoverDelay = clamp(Number(nextDelay), 0, 5);
  restoreHoverHidden();
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setKeepInScreen(nextEnabled) {
  settings.keepInScreen = Boolean(nextEnabled);
  resizeWindowForCurrentDisplay();
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function setPetProfile(profilePatch) {
  settings.petProfile = {
    ...settings.petProfile,
    ...profilePatch,
  };
  scheduleSaveSettings();
  sendSettingsChanged();
}

function setGreeting(greetingPatch) {
  const text = String(greetingPatch?.text ?? settings.greeting?.text ?? "")
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  settings.greeting = {
    ...settings.greeting,
    text: text || DEFAULT_SETTINGS.greeting.text,
  };
  sendRenderer("pet:runtime-settings", {
    emotionFrequency: settings.emotionFrequency,
    greeting: settings.greeting,
  });
  scheduleSaveSettings();
  sendSettingsChanged();
}

function setEmotionFrequency(nextFrequency) {
  settings.emotionFrequency = clamp(Number(nextFrequency), 0, 1);
  sendRenderer("pet:runtime-settings", {
    emotionFrequency: settings.emotionFrequency,
    greeting: settings.greeting,
  });
  scheduleSaveSettings();
  sendSettingsChanged();
}

function setWeatherCity(nextCity) {
  const city = String(nextCity ?? "")
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48);
  if (!city) return;
  const changed = settings.weather?.city !== city;
  settings.weather = {
    ...settings.weather,
    city,
  };
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
  if (changed) sendSpeech(`天气城市已切换到 ${city}`);
}

function setPetConnect(nextPetConnect) {
  const previous = sanitizePetConnect(settings.petConnect);
  settings.petConnect = sanitizePetConnect({
    ...settings.petConnect,
    ...nextPetConnect,
  });
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
  const changedServer = nextPetConnect?.serverBaseUrl && settings.petConnect.serverBaseUrl !== previous.serverBaseUrl;
  if (changedServer) {
    closePetConnectTestFriend();
    closePetConnect(settings.petConnect.enabled ? "disconnected" : "disabled");
    if (settings.petConnect.enabled) startPetConnect();
  } else if (nextPetConnect && Object.prototype.hasOwnProperty.call(nextPetConnect, "enabled")) {
    if (settings.petConnect.enabled) {
      startPetConnect();
    } else {
      closePetConnect("disabled");
    }
  } else if (petConnectSocket && petConnectSocket.readyState === WebSocket.OPEN) {
    sendPetConnect("update-profile", {
      profile: getPetConnectProfile(),
    });
  }
}

function recordPetConnectMessage(message) {
  const petConnect = sanitizePetConnect(settings.petConnect);
  const nextMessage = {
    direction: message.direction === "outgoing" ? "outgoing" : "incoming",
    friendName: sanitizeText(message.friendName, 32, "朋友"),
    friendPetName: sanitizeText(message.friendPetName, 32, "朋友的桌宠"),
    muted: Boolean(message.muted),
    receivedAt: Date.now(),
    text: sanitizeText(message.text, 140, DEFAULT_SETTINGS.petConnect.outgoingMessage),
  };
  settings.petConnect = {
    ...petConnect,
    recentMessages: [nextMessage, ...petConnect.recentMessages].slice(0, 12),
  };
  scheduleSaveSettings();
  sendSettingsChanged();
  return nextMessage;
}

function setPetConnectConnectionState(connectionState, lastError = "") {
  const petConnect = sanitizePetConnect(settings.petConnect);
  settings.petConnect = sanitizePetConnect({
    ...petConnect,
    connectionState,
    lastError,
  });
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
}

function getPetConnectBaseUrl() {
  return sanitizePetConnect(settings.petConnect).serverBaseUrl.replace(/\/+$/, "");
}

function getPetConnectApiUrl(pathname) {
  return `${getPetConnectBaseUrl()}/v1${pathname}`;
}

function getPetConnectWsUrl() {
  return `${getPetConnectBaseUrl().replace(/^http/i, "ws")}/ws`;
}

function getPetConnectProfile() {
  const petConnect = sanitizePetConnect(settings.petConnect);
  return {
    displayName: petConnect.displayName || settings.petName || "桌宠用户",
    petName: settings.petName || petManifest?.displayName || "我的桌宠",
    status: petConnect.doNotDisturb ? "dnd" : petConnect.status,
  };
}

function updatePetConnectFriends(friends = []) {
  const petConnect = sanitizePetConnect(settings.petConnect);
  const existingById = new Map(petConnect.friends.map((friend) => [friend.userId, friend]));
  const mergedFriends = friends.map((friend) => {
    const existing = existingById.get(friend.userId) || {};
    return {
      ...existing,
      ...friend,
      boundPetId: existing.boundPetId || friend.boundPetId || "",
      localAlias: existing.localAlias || friend.localAlias || "",
      localNote: existing.localNote || friend.localNote || "",
      muted: Boolean(existing.muted || friend.muted),
      relationshipLabel: existing.relationshipLabel || friend.relationshipLabel || "好友",
    };
  });
  const friendIds = new Set(mergedFriends.map((friend) => friend.userId));
  const selectedFriendId = friendIds.has(petConnect.selectedFriendId)
    ? petConnect.selectedFriendId
    : mergedFriends[0]?.userId || "";
  settings.petConnect = sanitizePetConnect({
    ...petConnect,
    friends: mergedFriends,
    selectedFriendId,
  });
  scheduleSaveSettings();
  sendSettingsChanged();
  broadcastFriendsOnline();
}

function upsertPetConnectFriend(friend) {
  if (!friend?.userId) return;
  const petConnect = sanitizePetConnect(settings.petConnect);
  const existing = petConnect.friends.find((item) => item.userId === friend.userId) || {};
  const friends = petConnect.friends.filter((item) => item.userId !== friend.userId);
  friends.push({
    ...existing,
    ...friend,
    boundPetId: existing.boundPetId || friend.boundPetId || "",
    localAlias: existing.localAlias || friend.localAlias || "",
    localNote: existing.localNote || friend.localNote || "",
    muted: Boolean(existing.muted || friend.muted),
    relationshipLabel: existing.relationshipLabel || friend.relationshipLabel || "好友",
  });
  updatePetConnectFriends(friends);
}

function getPetConnectRequestTimeout(requestId, reject) {
  return setTimeout(() => {
    petConnectPendingRequests.delete(requestId);
    reject(new Error("Pet Connect request timed out."));
  }, 9000);
}

function sendPetConnect(type, payload = {}) {
  if (!petConnectSocket || petConnectSocket.readyState !== WebSocket.OPEN) return false;
  petConnectSocket.send(JSON.stringify({ ...payload, type }));
  return true;
}

function requestPetConnect(type, payload = {}) {
  if (!petConnectSocket || petConnectSocket.readyState !== WebSocket.OPEN) {
    return Promise.reject(new Error("Pet Connect is not connected."));
  }
  const requestId = `req-${petConnectRequestId}`;
  petConnectRequestId += 1;
  return new Promise((resolve, reject) => {
    const timeout = getPetConnectRequestTimeout(requestId, reject);
    petConnectPendingRequests.set(requestId, { reject, resolve, timeout });
    petConnectSocket.send(JSON.stringify({ ...payload, requestId, type }));
  });
}

function resolvePetConnectRequest(payload) {
  if (!payload?.requestId) return false;
  const pending = petConnectPendingRequests.get(payload.requestId);
  if (!pending) return false;
  clearTimeout(pending.timeout);
  petConnectPendingRequests.delete(payload.requestId);
  if (payload.ok === false || payload.type === "error") {
    pending.reject(new Error(payload.error || "Pet Connect request failed."));
  } else {
    pending.resolve(payload);
  }
  return true;
}

function handleIncomingPetConnectMessage(serverMessage) {
  const petConnect = sanitizePetConnect(settings.petConnect);
  const from = serverMessage?.from || {};
  const localFriend = petConnect.friends.find((friend) => friend.userId === from.userId);
  const muted = !petConnect.allowIncoming || petConnect.doNotDisturb || petConnect.status === "dnd" || Boolean(localFriend?.muted);
  const message = recordPetConnectMessage({
    direction: "incoming",
    friendName: localFriend?.localAlias || from.displayName || "朋友",
    friendPetName: from.petName || "朋友的桌宠",
    muted,
    text: serverMessage?.text,
  });

  if (muted) {
    if (tray) {
      try {
        tray.displayBalloon({
          title: "桌宠连接",
          content: `已静默收到 ${message.friendPetName} 的来信`,
        });
      } catch (_error) {
        // Some platforms ignore tray balloons; the message is still recorded.
      }
    }
    return;
  }

  sendRenderer("pet:connect-message", message);
}

function handlePetConnectPayload(payload) {
  resolvePetConnectRequest(payload);
  switch (payload.type) {
    case "welcome":
    case "friend-list":
      updatePetConnectFriends(payload.friends || []);
      setPetConnectConnectionState("connected");
      break;
    case "friend-status":
      upsertPetConnectFriend(payload.friend);
      break;
    case "friend-added":
      updatePetConnectFriends(payload.friends || (payload.friend ? [payload.friend] : []));
      break;
    case "invite-created":
      settings.petConnect = sanitizePetConnect({
        ...settings.petConnect,
        inviteCode: payload.invite?.code || "",
        inviteExpiresAt: payload.invite?.expiresAt || 0,
      });
      scheduleSaveSettings();
      sendSettingsChanged();
      break;
    case "message":
      handleIncomingPetConnectMessage(payload.message);
      break;
    case "message-sent": {
      const targetFriend = sanitizePetConnect(settings.petConnect).friends.find((friend) => friend.userId === payload.message?.toUserId);
      recordPetConnectMessage({
        direction: "outgoing",
        friendName: targetFriend?.localAlias || targetFriend?.displayName || "朋友",
        friendPetName: targetFriend?.petName || "朋友的桌宠",
        muted: false,
        text: payload.message?.text,
      });
      break;
    }
    case "error":
      setPetConnectConnectionState("error", payload.error || "连接错误");
      break;
    default:
      break;
  }
}

function closePetConnect(nextState = "disconnected") {
  if (petConnectReconnectTimer) {
    clearTimeout(petConnectReconnectTimer);
    petConnectReconnectTimer = null;
  }
  if (petConnectSocket) {
    const socket = petConnectSocket;
    petConnectSocket = null;
    try {
      socket.close();
    } catch (_error) {
      // Socket may already be closed.
    }
  }
  setPetConnectConnectionState(nextState);
}

function closePetConnectTestFriend() {
  if (!petConnectTestFriendSocket) return;
  const socket = petConnectTestFriendSocket;
  petConnectTestFriendSocket = null;
  try {
    socket.close();
  } catch (_error) {
    // Socket may already be closed.
  }
}

function schedulePetConnectReconnect() {
  if (petConnectReconnectTimer || !sanitizePetConnect(settings.petConnect).enabled) return;
  petConnectReconnectTimer = setTimeout(() => {
    petConnectReconnectTimer = null;
    startPetConnect();
  }, 5000);
}

function startPetConnect() {
  const petConnect = sanitizePetConnect(settings.petConnect);
  if (!petConnect.enabled) {
    closePetConnect("disabled");
    return;
  }
  if (!petConnect.userId || !petConnect.authToken) {
    setPetConnectConnectionState("unregistered");
    return;
  }
  if (petConnectSocket && (petConnectSocket.readyState === WebSocket.OPEN || petConnectSocket.readyState === WebSocket.CONNECTING)) {
    return;
  }

  setPetConnectConnectionState("connecting");
  const socket = new WebSocket(getPetConnectWsUrl());
  petConnectSocket = socket;

  socket.on("open", () => {
    socket.send(JSON.stringify({
      authToken: petConnect.authToken,
      profile: getPetConnectProfile(),
      type: "hello",
      userId: petConnect.userId,
    }));
  });

  socket.on("message", (raw) => {
    try {
      handlePetConnectPayload(JSON.parse(raw.toString()));
    } catch (_error) {
      setPetConnectConnectionState("error", "连接消息解析失败");
    }
  });

  socket.on("close", () => {
    if (petConnectSocket === socket) {
      petConnectSocket = null;
      if (sanitizePetConnect(settings.petConnect).enabled) {
        setPetConnectConnectionState("disconnected");
        schedulePetConnectReconnect();
      }
    }
  });

  socket.on("error", () => {
    if (petConnectSocket === socket) {
      setPetConnectConnectionState("error", "连接服务器失败");
    }
  });
}

function waitForPetConnectReady(timeoutMs = 10000) {
  startPetConnect();
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      if (
        petConnectSocket
        && petConnectSocket.readyState === WebSocket.OPEN
        && sanitizePetConnect(settings.petConnect).connectionState === "connected"
      ) {
        clearInterval(timer);
        resolve();
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        clearInterval(timer);
        reject(new Error("Pet Connect is not ready."));
      }
    }, 100);
  });
}

function requestOnPetConnectSocket(socket, type, payload = {}) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return Promise.reject(new Error("Socket is not connected."));
  }
  const requestId = `test-${petConnectTestFriendRequestId}`;
  petConnectTestFriendRequestId += 1;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Pet Connect test friend request timed out."));
    }, 9000);

    function onMessage(raw) {
      let data = null;
      try {
        data = JSON.parse(raw.toString());
      } catch (_error) {
        return;
      }
      if (data.requestId !== requestId) return;
      clearTimeout(timeout);
      socket.off("message", onMessage);
      if (data.ok === false || data.type === "error") {
        reject(new Error(data.error || "Pet Connect request failed."));
      } else {
        resolve(data);
      }
    }

    socket.on("message", onMessage);
    socket.send(JSON.stringify({ ...payload, requestId, type }));
  });
}

function connectPetConnectIdentity(identity, profile) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(getPetConnectWsUrl());
    const timeout = setTimeout(() => {
      try {
        socket.close();
      } catch (_error) {
        // Ignore cleanup failure.
      }
      reject(new Error("Pet Connect identity connection timed out."));
    }, 10000);

    socket.on("open", () => {
      socket.send(JSON.stringify({
        authToken: identity.authToken,
        profile,
        type: "hello",
        userId: identity.userId,
      }));
    });

    socket.on("message", (raw) => {
      let payload = null;
      try {
        payload = JSON.parse(raw.toString());
      } catch (_error) {
        return;
      }
      if (payload.type === "welcome") {
        clearTimeout(timeout);
        resolve(socket);
      } else if (payload.type === "error") {
        clearTimeout(timeout);
        reject(new Error(payload.error || "Pet Connect identity failed."));
      }
    });

    socket.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

async function registerPetConnectProfile(profile) {
  const response = await fetch(getPetConnectApiUrl("/register"), {
    body: JSON.stringify(profile),
    headers: { "content-type": "application/json" },
    method: "POST",
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.ok || !data.userId || !data.authToken) throw new Error("Register failed");
  return {
    authToken: data.authToken,
    userId: data.userId,
  };
}

async function startPetConnectTestFriend() {
  const petConnect = sanitizePetConnect(settings.petConnect);
  const testFriend = petConnect.testFriend;
  if (!testFriend.userId || !testFriend.authToken) return null;
  if (
    petConnectTestFriendSocket
    && petConnectTestFriendSocket.readyState === WebSocket.OPEN
  ) {
    return petConnectTestFriendSocket;
  }
  closePetConnectTestFriend();
  petConnectTestFriendSocket = await connectPetConnectIdentity(
    testFriend,
    {
      displayName: testFriend.displayName,
      petName: testFriend.petName,
      status: "online",
    },
  );
  const socket = petConnectTestFriendSocket;
  petConnectTestFriendSocket.on("close", () => {
    if (petConnectTestFriendSocket === socket) {
      petConnectTestFriendSocket = null;
    }
  });
  return petConnectTestFriendSocket;
}

async function registerPetConnectAccount() {
  const existing = sanitizePetConnect(settings.petConnect);
  if (existing.userId && existing.authToken) {
    startPetConnect();
    return getPreferencesConfig();
  }
  const data = await registerPetConnectProfile(getPetConnectProfile());
  settings.petConnect = sanitizePetConnect({
    ...settings.petConnect,
    authToken: data.authToken,
    userId: data.userId,
  });
  scheduleSaveSettings();
  sendSettingsChanged();
  startPetConnect();
  return getPreferencesConfig();
}

async function connectPetConnectNow() {
  startPetConnect();
  return getPreferencesConfig();
}

async function createPetConnectInvite() {
  if (!settings.petConnect.userId || !settings.petConnect.authToken) {
    await registerPetConnectAccount();
  }
  await waitForPetConnectReady();
  const result = await requestPetConnect("create-invite");
  return {
    ...getPreferencesConfig(),
    invite: result.invite,
  };
}

async function acceptPetConnectInvite(code) {
  if (!settings.petConnect.userId || !settings.petConnect.authToken) {
    await registerPetConnectAccount();
  }
  await waitForPetConnectReady();
  const result = await requestPetConnect("accept-invite", { code });
  return {
    ...getPreferencesConfig(),
    friend: result.friend,
  };
}

async function sendPetConnectUserMessage(payload = {}) {
  const toUserId = sanitizeText(payload.toUserId || settings.petConnect.selectedFriendId, 80);
  const text = sanitizeText(payload.text || settings.petConnect.outgoingMessage, 140);
  if (!toUserId) throw new Error("请选择好友。");
  if (!text) throw new Error("消息不能为空。");
  await waitForPetConnectReady();
  const result = await requestPetConnect("send-message", { text, toUserId });
  return {
    ...getPreferencesConfig(),
    delivered: result.delivered,
  };
}

async function copyPetConnectInviteCode() {
  const code = sanitizePetConnect(settings.petConnect).inviteCode;
  if (!code) throw new Error("No invite code.");
  clipboard.writeText(code);
  return { ok: true };
}

function copyPreferenceText(text) {
  const value = String(text ?? "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, 4000);
  if (!value) throw new Error("No text to copy.");
  clipboard.writeText(value);
  return { ok: true };
}

function clearPetConnectMessages() {
  const petConnect = sanitizePetConnect(settings.petConnect);
  settings.petConnect = sanitizePetConnect({
    ...petConnect,
    recentMessages: [],
  });
  scheduleSaveSettings();
  sendSettingsChanged();
  return getPreferencesConfig();
}

async function createRealPetConnectTestFriend(payload = {}) {
  if (!settings.petConnect.userId || !settings.petConnect.authToken) {
    await registerPetConnectAccount();
  }
  await waitForPetConnectReady();

  const petConnect = sanitizePetConnect({
    ...settings.petConnect,
    testFriend: {
      ...settings.petConnect?.testFriend,
      displayName: payload.displayName,
      outgoingMessage: payload.outgoingMessage,
      petName: payload.petName,
    },
  });
  let testFriend = petConnect.testFriend;

  if (!testFriend.userId || !testFriend.authToken) {
    const identity = await registerPetConnectProfile({
      displayName: testFriend.displayName,
      petName: testFriend.petName,
    });
    testFriend = {
      ...testFriend,
      ...identity,
    };
    settings.petConnect = sanitizePetConnect({
      ...settings.petConnect,
      testFriend,
    });
    scheduleSaveSettings();
  }

  const invite = await requestPetConnect("create-invite");
  const socket = await startPetConnectTestFriend();
  await requestOnPetConnectSocket(socket, "accept-invite", { code: invite.invite.code });

  settings.petConnect = sanitizePetConnect({
    ...settings.petConnect,
    inviteCode: invite.invite.code,
    inviteExpiresAt: invite.invite.expiresAt,
    selectedFriendId: testFriend.userId,
    testFriend,
  });
  scheduleSaveSettings();
  sendSettingsChanged();

  try {
    await requestPetConnect("list-friends");
  } catch (_error) {
    // The server also pushes friend updates; this is only a refresh attempt.
  }

  await requestOnPetConnectSocket(socket, "send-message", {
    text: testFriend.outgoingMessage,
    toUserId: settings.petConnect.userId,
  });

  return getPreferencesConfig();
}

async function sendPetConnectTestFriendMessage(payload = {}) {
  const petConnect = sanitizePetConnect(settings.petConnect);
  if (!petConnect.userId) throw new Error("Current user is not registered.");
  if (!petConnect.testFriend.userId || !petConnect.testFriend.authToken) {
    return createRealPetConnectTestFriend(payload);
  }
  const socket = await startPetConnectTestFriend();
  const text = sanitizeText(
    payload.outgoingMessage || petConnect.testFriend.outgoingMessage,
    140,
    DEFAULT_SETTINGS.petConnect.testFriend.outgoingMessage,
  );
  await requestOnPetConnectSocket(socket, "send-message", {
    text,
    toUserId: petConnect.userId,
  });
  return getPreferencesConfig();
}

const WEATHER_LABELS = {
  0: "晴朗",
  1: "大致晴朗",
  2: "局部多云",
  3: "阴天",
  45: "有雾",
  48: "雾凇",
  51: "小毛毛雨",
  53: "毛毛雨",
  55: "较强毛毛雨",
  56: "冻毛毛雨",
  57: "较强冻毛毛雨",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  66: "冻雨",
  67: "强冻雨",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  77: "米雪",
  80: "小阵雨",
  81: "阵雨",
  82: "强阵雨",
  85: "小阵雪",
  86: "强阵雪",
  95: "雷暴",
  96: "雷暴伴小冰雹",
  99: "雷暴伴强冰雹",
};

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function geocodeWeatherCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh&format=json`;
  const data = await fetchJson(url);
  const place = data?.results?.[0];
  if (!place) {
    throw new Error("City not found");
  }
  return place;
}

async function announceWeather() {
  const city = settings.weather?.city || DEFAULT_SETTINGS.weather.city;
  sendSpeech(`我查一下 ${city} 的天气...`, 2200);

  try {
    const place = await geocodeWeatherCity(city);
    const params = new URLSearchParams({
      latitude: String(place.latitude),
      longitude: String(place.longitude),
      current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
      timezone: "auto",
    });
    const data = await fetchJson(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    const current = data?.current;
    const units = data?.current_units || {};
    if (!current) {
      throw new Error("Weather unavailable");
    }

    const temperature = Math.round(Number(current.temperature_2m));
    const apparent = Math.round(Number(current.apparent_temperature));
    const humidity = Math.round(Number(current.relative_humidity_2m));
    const wind = Math.round(Number(current.wind_speed_10m));
    const weather = WEATHER_LABELS[current.weather_code] || "天气稳定";
    const unit = units.temperature_2m || "°C";
    const placeName = place.name || city;
    sendSpeech(`${placeName}现在${temperature}${unit}，体感${apparent}${unit}，${weather}，湿度${humidity}%`, 6500);
    if (wind >= 20) {
      setTimeout(() => sendSpeech(`风有点大，约 ${wind} km/h，出门注意一下。`, 4200), 6800);
    }
  } catch (_error) {
    sendSpeech("天气暂时查不到，稍后我再试。", 4200);
  }
}

function openNameWindow() {
  if (nameWindow && !nameWindow.isDestroyed()) {
    nameWindow.show();
    nameWindow.focus();
    return;
  }

  nameWindow = new BrowserWindow({
    width: 380,
    height: 190,
    title: "给桌宠起名字",
    resizable: false,
    minimizable: false,
    maximizable: false,
    parent: mainWindow ?? undefined,
    modal: false,
    show: false,
    backgroundColor: "#111111",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  nameWindow.setMenu(null);
  nameWindow.loadFile(path.join(__dirname, "dialog", "name.html"));
  nameWindow.once("ready-to-show", () => nameWindow.show());
  nameWindow.on("closed", () => {
    nameWindow = null;
  });
}

function openPreferencesWindow() {
  if (preferencesWindow && !preferencesWindow.isDestroyed()) {
    preferencesWindow.show();
    preferencesWindow.focus();
    return;
  }

  prefsPreviewOriginalScale = settings.scale;
  prefsPreviewOriginalOpacity = settings.opacity;
  prefsWasSaved = false;

  preferencesWindow = new BrowserWindow({
    width: 1120,
    height: 760,
    title: "Desktop Pet Connect",
    minWidth: 920,
    minHeight: 640,
    show: false,
    backgroundColor: "#101010",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  preferencesWindow.setMenu(null);
  preferencesWindow.loadFile(path.join(__dirname, "preferences", "index.html"));
  preferencesWindow.once("ready-to-show", () => preferencesWindow.show());
  preferencesWindow.on("closed", () => {
    if (!prefsWasSaved) {
      if (prefsPreviewOriginalScale !== null && Math.abs(settings.scale - prefsPreviewOriginalScale) >= 0.01) {
        settings.scale = prefsPreviewOriginalScale;
        resizeWindowForCurrentDisplay();
        sendRenderer("pet:scale", settings.scale);
      }
      if (prefsPreviewOriginalOpacity !== null && Math.abs((mainWindow?.getOpacity?.() ?? settings.opacity) - prefsPreviewOriginalOpacity) >= 0.005) {
        settings.opacity = prefsPreviewOriginalOpacity;
        if (mainWindow && !mainWindow.isDestroyed()) mainWindow.setOpacity(settings.opacity);
      }
    }
    prefsPreviewOriginalScale = null;
    prefsPreviewOriginalOpacity = null;
    prefsWasSaved = false;
    preferencesWindow = null;
  });
}

function getDialogParentWindow() {
  if (preferencesWindow && !preferencesWindow.isDestroyed() && preferencesWindow.isVisible()) {
    return preferencesWindow;
  }
  if (mainWindow && !mainWindow.isDestroyed() && mainWindow.isVisible()) {
    return mainWindow;
  }
  return undefined;
}

function finishImportPreview(accepted) {
  const resolve = resolveImportPreview;
  resolveImportPreview = null;
  pendingImportPreview = null;
  if (importPreviewWindow && !importPreviewWindow.isDestroyed()) {
    const win = importPreviewWindow;
    importPreviewWindow = null;
    win.close();
  }
  if (resolve) resolve(Boolean(accepted));
}

function showImportPreviewWindow(validation) {
  if (importPreviewWindow && !importPreviewWindow.isDestroyed()) {
    importPreviewWindow.focus();
    return Promise.resolve(false);
  }

  pendingImportPreview = validation;
  return new Promise((resolve) => {
    resolveImportPreview = resolve;
    importPreviewWindow = new BrowserWindow({
      width: 740,
      height: 660,
      title: "导入桌宠角色",
      parent: getDialogParentWindow(),
      modal: Boolean(getDialogParentWindow()),
      show: false,
      backgroundColor: "#101214",
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    importPreviewWindow.setMenu(null);
    importPreviewWindow.loadFile(path.join(__dirname, "import-preview", "index.html"));
    importPreviewWindow.once("ready-to-show", () => importPreviewWindow.show());
    importPreviewWindow.on("closed", () => {
      importPreviewWindow = null;
      if (resolveImportPreview) finishImportPreview(false);
    });
  });
}

function getPreferencesConfig() {
  return {
    packages: listPetPackages().map((item) => ({
      id: item.id,
      displayName: item.displayName,
      actionCount: Array.isArray(item.manifest?.actions) ? item.manifest.actions.length : 0,
      cell: item.manifest?.cell || null,
      grid: item.manifest?.grid || null,
      previewUrl: (() => {
        const previewPath = resolvePackageFile(item.dir, item.manifest?.preview || "preview.png");
        if (previewPath && fs.existsSync(previewPath)) return pathToFileURL(previewPath).href;
        return pathToFileURL(item.spritesheetPath).href;
      })(),
      source: item.source,
      spriteUrl: pathToFileURL(item.spritesheetPath).href,
      stateNames: summarizeStateNames(item.manifest?.states),
    })),
    settings: {
      activePetId: settings.activePetId,
      behaviorEnabled: settings.behaviorEnabled,
      emotionFrequency: settings.emotionFrequency,
      greeting: settings.greeting,
      hideOnHover: settings.hideOnHover,
      hideOnHoverDelay: settings.hideOnHoverDelay,
      inputReactions: settings.inputReactions,
      keepInScreen: settings.keepInScreen,
      opacity: settings.opacity,
      passThrough: settings.passThrough,
      petConnect: settings.petConnect,
      petName: settings.petName,
      petProfile: settings.petProfile,
      scale: settings.scale,
      shortcuts: settings.shortcuts,
      showName: settings.showName,
      taskbarVisible: settings.taskbarVisible,
      topmost: settings.topmost,
      visible: settings.visible,
      weather: settings.weather,
    },
  };
}

function setActivePetPackage(nextPackageId) {
  const nextPackage = listPetPackages().find((item) => item.id === nextPackageId);
  if (!nextPackage) return false;

  activePetPackage = nextPackage;
  settings.activePetId = nextPackage.id;
  petDir = nextPackage.dir;
  petManifest = nextPackage.manifest;
  setPetName(nextPackage.displayName);
  resizeWindowForCurrentDisplay();
  sendRenderer("pet:asset", getRendererPetConfig());
  scheduleSaveSettings();
  refreshTrayMenu();
  sendSettingsChanged();
  return true;
}

function uniquePetTargetDir(baseId) {
  const userPetsDir = getUserPetsDir();
  fs.mkdirSync(userPetsDir, { recursive: true });
  let suffix = 0;
  while (true) {
    const id = suffix === 0 ? baseId : `${baseId}-${suffix + 1}`;
    const target = path.join(userPetsDir, id);
    if (!fs.existsSync(target)) return { id, target };
    suffix += 1;
  }
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function encodeRgbaPng(width, height, rgba) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    header,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(raw)),
    pngChunk("IEND"),
  ]);
}

function paethPredictor(left, up, upperLeft) {
  const estimate = left + up - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const upDistance = Math.abs(estimate - up);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= upDistance && leftDistance <= upperLeftDistance) return left;
  if (upDistance <= upperLeftDistance) return up;
  return upperLeft;
}

function decodeRgbaPng(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) throw new Error("Invalid PNG signature.");
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  if (bitDepth !== 8 || colorType !== 6 || !width || !height) {
    throw new Error("Only 8-bit RGBA PNG images are supported.");
  }

  const inflated = zlib.inflateSync(Buffer.concat(idat));
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const rgba = Buffer.alloc(stride * height);
  let inputOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[inputOffset];
    inputOffset += 1;
    for (let x = 0; x < stride; x += 1) {
      const raw = inflated[inputOffset + x];
      const left = x >= bytesPerPixel ? rgba[y * stride + x - bytesPerPixel] : 0;
      const up = y > 0 ? rgba[(y - 1) * stride + x] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel ? rgba[(y - 1) * stride + x - bytesPerPixel] : 0;
      let value = raw;
      if (filter === 1) value = raw + left;
      if (filter === 2) value = raw + up;
      if (filter === 3) value = raw + Math.floor((left + up) / 2);
      if (filter === 4) value = raw + paethPredictor(left, up, upperLeft);
      rgba[y * stride + x] = value & 0xff;
    }
    inputOffset += stride;
  }

  return { height, rgba, width };
}

function resizeGeneratedImage(image) {
  const size = image.getSize();
  const maxWidth = 192;
  const maxHeight = 208;
  const scale = Math.min(1, maxWidth / size.width, maxHeight / size.height);
  const width = Math.max(1, Math.round(size.width * scale));
  const height = Math.max(1, Math.round(size.height * scale));
  if (width === size.width && height === size.height) return image;
  return image.resize({ height, quality: "best", width });
}

function isGeneratedImageFile(fileName) {
  return /\.(png|jpe?g|webp)$/i.test(fileName);
}

function findGeneratedActionImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isGeneratedImageFile(entry.name))
    .map((entry) => ({
      baseName: path.basename(entry.name, path.extname(entry.name)).toLowerCase(),
      path: path.join(dir, entry.name),
    }));
  const used = new Set();
  const matches = [];

  for (const spec of GENERATED_ACTION_SPECS) {
    const match = entries.find((entry) => (
      !used.has(entry.path)
      && spec.aliases.some((alias) => entry.baseName.includes(alias))
    ));
    if (match) {
      used.add(match.path);
      matches.push({ ...spec, imagePath: match.path });
    }
  }

  if (!matches.some((match) => match.state === "idle") && entries[0]) {
    matches.unshift({ ...GENERATED_ACTION_SPECS[0], imagePath: entries[0].path });
  }

  return matches;
}

function prepareGeneratedActionImages(actionImages) {
  return actionImages.map((action) => {
    const image = nativeImage.createFromPath(action.imagePath);
    if (image.isEmpty()) throw new Error(`Invalid image: ${action.imagePath}`);
    const resized = resizeGeneratedImage(image);
    const decoded = decodeRgbaPng(resized.toPNG());
    return {
      ...action,
      height: decoded.height,
      rgba: decoded.rgba,
      width: decoded.width,
    };
  });
}

function composeGeneratedSpritesheet(preparedImages, outputPath) {
  const width = Math.max(...preparedImages.map((item) => item.width));
  const cellHeight = Math.max(...preparedImages.map((item) => item.height));
  const height = cellHeight * preparedImages.length;
  const canvas = Buffer.alloc(width * height * 4, 0);

  preparedImages.forEach((item, row) => {
    const offsetX = Math.floor((width - item.width) / 2);
    const offsetY = row * cellHeight + Math.floor((cellHeight - item.height) / 2);
    for (let y = 0; y < item.height; y += 1) {
      const sourceStart = y * item.width * 4;
      const sourceEnd = sourceStart + item.width * 4;
      const targetStart = ((offsetY + y) * width + offsetX) * 4;
      item.rgba.copy(canvas, targetStart, sourceStart, sourceEnd);
    }
  });

  fs.writeFileSync(outputPath, encodeRgbaPng(width, height, canvas));
  return { height: cellHeight, width };
}

function createSingleImagePetManifest({ cell, displayName, id }) {
  return {
    id,
    displayName,
    description: "A relationship desktop companion image generated with gpt-image2 and imported by the user.",
    spritesheet: "spritesheet.png",
    spritesheetPath: "spritesheet.png",
    preview: "preview.png",
    grid: {
      columns: 1,
      rows: 1,
    },
    cell,
    source: {
      generator: "gpt-image2",
      importedAt: new Date().toISOString(),
    },
    actions: [
      {
        label: "站立",
        state: "idle",
      },
    ],
    states: {
      idle: {
        row: 0,
        frames: 1,
        durations: [1000],
        loop: true,
      },
    },
  };
}

function createGeneratedActionPetManifest({ actionImages, cell, displayName, id }) {
  const states = {};
  actionImages.forEach((action, index) => {
    states[action.state] = {
      row: index,
      frames: 1,
      durations: [action.loop ? 1000 : 720],
      loop: action.loop,
    };
  });
  return {
    id,
    displayName,
    description: "A multi-action relationship desktop companion imported from gpt-image2 generated images.",
    spritesheet: "spritesheet.png",
    spritesheetPath: "spritesheet.png",
    preview: "preview.png",
    grid: {
      columns: 1,
      rows: actionImages.length,
    },
    cell,
    source: {
      generator: "gpt-image2",
      importedAt: new Date().toISOString(),
    },
    actions: actionImages.map((action) => ({
      label: action.label,
      state: action.state,
    })),
    states,
  };
}

function removeUserPetTarget(target) {
  const userPetsDir = path.resolve(getUserPetsDir());
  const resolved = path.resolve(target);
  if (resolved === userPetsDir || !resolved.startsWith(`${userPetsDir}${path.sep}`)) return;
  fs.rmSync(resolved, { force: true, recursive: true });
}

function bindPetPackageToFriend(friendId, packageId, relationshipLabel = "") {
  const petConnect = sanitizePetConnect(settings.petConnect);
  if (!friendId || !petConnect.friends.some((friend) => friend.userId === friendId)) return false;
  settings.petConnect = sanitizePetConnect({
    ...petConnect,
    friends: petConnect.friends.map((friend) => (
      friend.userId === friendId
        ? {
          ...friend,
          boundPetId: packageId,
          relationshipLabel: relationshipLabel || friend.relationshipLabel || "好友",
        }
        : friend
    )),
  });
  scheduleSaveSettings();
  sendSettingsChanged();
  return true;
}

async function importPetPackage() {
  const result = await dialog.showOpenDialog(getDialogParentWindow(), {
    title: "导入桌宠包",
    properties: ["openDirectory"],
  });

  if (result.canceled || !result.filePaths[0]) {
    return {
      ...getPreferencesConfig(),
      generatedImportResult: { cancelled: true, ok: false },
    };
  }

  const sourceDir = result.filePaths[0];
  const validation = validatePetPackage(sourceDir);
  const accepted = await showImportPreviewWindow(validation);
  if (!accepted) {
    return { ok: false, cancelled: true, validation };
  }
  if (!validation.ok) {
    return { ok: false, error: "Invalid pet package.", validation };
  }

  const baseId = validation.packageIdCandidate;
  const { id, target } = uniquePetTargetDir(baseId);
  fs.cpSync(sourceDir, target, { recursive: true });

  const packageId = `custom:${id}`;
  setActivePetPackage(packageId);
  return { ok: true, activePetId: packageId, validation };
}

async function importGeneratedPetImage(payload = {}) {
  const result = await dialog.showOpenDialog(getDialogParentWindow(), {
    title: "导入 gpt-image2 生成结果",
    filters: [
      { extensions: ["png", "jpg", "jpeg", "webp"], name: "Image Files" },
    ],
    properties: ["openFile"],
  });

  if (result.canceled || !result.filePaths[0]) return { ok: false, cancelled: true };

  const sourceImagePath = result.filePaths[0];
  const image = nativeImage.createFromPath(sourceImagePath);
  if (image.isEmpty()) {
    return {
      ...getPreferencesConfig(),
      generatedImportResult: { error: "Invalid generated image.", ok: false },
    };
  }

  const friendId = sanitizeText(payload.friendId, 80, "");
  const relationshipLabel = sanitizeText(payload.relationshipLabel, 16, "好友");
  const displayName = sanitizeText(
    payload.displayName || path.basename(sourceImagePath, path.extname(sourceImagePath)),
    32,
    "gpt-image2 关系桌宠",
  );
  const baseId = sanitizeId(`gpt-image2-${displayName}`);
  const { id, target } = uniquePetTargetDir(baseId);
  fs.mkdirSync(target, { recursive: true });

  const resized = resizeGeneratedImage(image);
  const size = resized.getSize();
  const png = resized.toPNG();
  fs.writeFileSync(path.join(target, "spritesheet.png"), png);
  fs.writeFileSync(path.join(target, "preview.png"), png);
  fs.writeFileSync(
    path.join(target, "pet.json"),
    `${JSON.stringify(createSingleImagePetManifest({
      cell: { height: size.height, width: size.width },
      displayName,
      id,
    }), null, 2)}\n`,
  );

  const validation = validatePetPackage(target);
  const accepted = await showImportPreviewWindow(validation);
  if (!accepted) {
    removeUserPetTarget(target);
    return {
      ...getPreferencesConfig(),
      generatedImportResult: { cancelled: true, ok: false, validation },
    };
  }
  if (!validation.ok) {
    removeUserPetTarget(target);
    return {
      ...getPreferencesConfig(),
      generatedImportResult: { error: "Invalid generated image package.", ok: false, validation },
    };
  }

  const packageId = `custom:${id}`;
  bindPetPackageToFriend(friendId, packageId, relationshipLabel);
  return {
    ...getPreferencesConfig(),
    generatedImportResult: {
      ok: true,
      packageId,
      validation,
    },
  };
}

async function importGeneratedActionFolder(payload = {}) {
  const result = await dialog.showOpenDialog(getDialogParentWindow(), {
    title: "导入 gpt-image2 多动作结果文件夹",
    properties: ["openDirectory"],
  });

  if (result.canceled || !result.filePaths[0]) {
    return {
      ...getPreferencesConfig(),
      generatedActionImportResult: { cancelled: true, ok: false },
    };
  }

  const sourceDir = result.filePaths[0];
  const actionImages = findGeneratedActionImages(sourceDir);
  if (!actionImages.length) {
    return {
      ...getPreferencesConfig(),
      generatedActionImportResult: { error: "No action images found.", ok: false },
    };
  }

  const friendId = sanitizeText(payload.friendId, 80, "");
  const relationshipLabel = sanitizeText(payload.relationshipLabel, 16, "好友");
  const displayName = sanitizeText(
    payload.displayName || path.basename(sourceDir),
    32,
    "gpt-image2 多动作关系桌宠",
  );
  const baseId = sanitizeId(`gpt-image2-actions-${displayName}`);
  const { id, target } = uniquePetTargetDir(baseId);
  fs.mkdirSync(target, { recursive: true });

  try {
    const preparedImages = prepareGeneratedActionImages(actionImages);
    const cell = composeGeneratedSpritesheet(preparedImages, path.join(target, "spritesheet.png"));
    const previewImage = resizeGeneratedImage(nativeImage.createFromPath(preparedImages[0].imagePath));
    fs.writeFileSync(path.join(target, "preview.png"), previewImage.toPNG());
    fs.writeFileSync(
      path.join(target, "pet.json"),
      `${JSON.stringify(createGeneratedActionPetManifest({
        actionImages: preparedImages,
        cell,
        displayName,
        id,
      }), null, 2)}\n`,
    );
  } catch (error) {
    removeUserPetTarget(target);
    return {
      ...getPreferencesConfig(),
      generatedActionImportResult: { error: error.message || "Invalid action images.", ok: false },
    };
  }

  const validation = validatePetPackage(target);
  const accepted = await showImportPreviewWindow(validation);
  if (!accepted) {
    removeUserPetTarget(target);
    return {
      ...getPreferencesConfig(),
      generatedActionImportResult: { cancelled: true, ok: false, validation },
    };
  }
  if (!validation.ok) {
    removeUserPetTarget(target);
    return {
      ...getPreferencesConfig(),
      generatedActionImportResult: { error: "Invalid generated action package.", ok: false, validation },
    };
  }

  const packageId = `custom:${id}`;
  bindPetPackageToFriend(friendId, packageId, relationshipLabel);
  return {
    ...getPreferencesConfig(),
    generatedActionImportResult: {
      ok: true,
      packageId,
      validation,
    },
  };
}

function openPetsFolder() {
  fs.mkdirSync(getUserPetsDir(), { recursive: true });
  shell.openPath(getUserPetsDir());
}

function applyPreferencesPatch(patch) {
  if (patch.activePetId) setActivePetPackage(patch.activePetId);
  if (Object.prototype.hasOwnProperty.call(patch, "petName")) setPetName(patch.petName);
  if (Object.prototype.hasOwnProperty.call(patch, "showName")) setShowName(patch.showName);
  if (Object.prototype.hasOwnProperty.call(patch, "scale")) setScale(Number(patch.scale));
  if (Object.prototype.hasOwnProperty.call(patch, "opacity")) setOpacity(Number(patch.opacity));
  if (Object.prototype.hasOwnProperty.call(patch, "behaviorEnabled")) setBehaviorEnabled(patch.behaviorEnabled);
  if (Object.prototype.hasOwnProperty.call(patch, "emotionFrequency")) setEmotionFrequency(patch.emotionFrequency);
  if (Object.prototype.hasOwnProperty.call(patch, "inputReactions")) setInputReactions(patch.inputReactions);
  if (Object.prototype.hasOwnProperty.call(patch, "hideOnHover")) setHideOnHover(patch.hideOnHover, settings.hideOnHoverDelay);
  if (Object.prototype.hasOwnProperty.call(patch, "hideOnHoverDelay")) setHideOnHover(settings.hideOnHover, patch.hideOnHoverDelay);
  if (Object.prototype.hasOwnProperty.call(patch, "keepInScreen")) setKeepInScreen(patch.keepInScreen);
  if (Object.prototype.hasOwnProperty.call(patch, "passThrough")) setPassThrough(patch.passThrough);
  if (Object.prototype.hasOwnProperty.call(patch, "topmost")) setTopmost(patch.topmost);
  if (Object.prototype.hasOwnProperty.call(patch, "taskbarVisible")) setTaskbarVisible(patch.taskbarVisible);
  if (patch.greeting) setGreeting(patch.greeting);
  if (patch.petConnect) setPetConnect(patch.petConnect);
  if (patch.petProfile) setPetProfile(patch.petProfile);
  if (patch.shortcuts) setShortcuts(patch.shortcuts);
  if (patch.weather?.city) setWeatherCity(patch.weather.city);
}

function registerShortcut(accelerator, callback) {
  if (!accelerator) return false;
  try {
    return globalShortcut.register(accelerator, callback);
  } catch (_error) {
    return false;
  }
}

function registerGlobalShortcuts() {
  globalShortcut.unregisterAll();
  registerShortcut(settings.shortcuts.toggleVisible, toggleVisible);
  registerShortcut(settings.shortcuts.togglePassThrough, () => setPassThrough(!settings.passThrough));
  registerShortcut(settings.shortcuts.openPreferences, openPreferencesWindow);
}

function setShortcuts(nextShortcuts) {
  settings.shortcuts = {
    ...settings.shortcuts,
    ...nextShortcuts,
  };
  registerGlobalShortcuts();
  scheduleSaveSettings();
  sendSettingsChanged();
}

function showPet() {
  if (!mainWindow) return;
  settings.visible = true;
  mainWindow.showInactive();
  scheduleSaveSettings();
  refreshTrayMenu();
}

function hidePet() {
  if (!mainWindow) return;
  settings.visible = false;
  mainWindow.hide();
  scheduleSaveSettings();
  refreshTrayMenu();
}

function toggleVisible() {
  if (!mainWindow || mainWindow.isVisible()) {
    hidePet();
  } else {
    showPet();
  }
}

function resetPosition() {
  if (!mainWindow) return;
  const display = screen.getPrimaryDisplay();
  const size = getWindowSizeForDisplay(display);
  const area = display.workArea;
  const bounds = clampBoundsToDisplay(
    {
      x: area.x + area.width - size.width - 88,
      y: area.y + area.height - size.height - 96,
      ...size,
    },
    display,
  );
  mainWindow.setBounds(bounds, false);
  currentDisplayId = display.id;
  setHomeFromCurrentBounds();
}

function buildScaleMenuItems() {
  return [0.75, 1, 1.25, 1.5, 2, 2.5, 3].map((value) => ({
    label: `${value}x`,
    type: "radio",
    checked: Math.abs(settings.scale - value) < 0.01,
    click: () => setScale(value),
  }));
}

function buildOpacityMenuItems() {
  return [1, 0.85, 0.7, 0.55, 0.4].map((value) => ({
    label: `${Math.round(value * 100)}%`,
    type: "radio",
    checked: Math.abs(settings.opacity - value) < 0.01,
    click: () => setOpacity(value),
  }));
}

function buildPetPackageMenuItems() {
  return listPetPackages().map((item) => ({
    label: `${item.displayName}${item.source === "custom" ? "（自定义）" : ""}`,
    type: "radio",
    checked: settings.activePetId === item.id,
    click: () => setActivePetPackage(item.id),
  }));
}

function buildPetLibraryMenuItems() {
  return [
    ...buildPetPackageMenuItems(),
    { type: "separator" },
    { label: "导入角色...", click: () => importPetPackage() },
    { label: "打开角色目录", click: openPetsFolder },
  ];
}

const DEFAULT_ACTIONS = [
  { label: "站立", state: "idle" },
  { label: "向右走", state: "running-right" },
  { label: "向左走", state: "running-left" },
  { label: "打招呼", state: "waving" },
  { label: "跳跃", state: "jumping" },
  { label: "滑行", state: "dragged" },
  { label: "睡觉", state: "sleepy" },
  { label: "跑步", state: "running" },
];

function buildActionMenuItems() {
  const availableStates = petManifest?.states ?? {};
  const actions = Array.isArray(petManifest?.actions) ? petManifest.actions : DEFAULT_ACTIONS;
  const items = actions
    .filter(({ state }) => availableStates[state])
    .map(({ label, state }) => ({
      label,
      click: () => sendRenderer("pet:action", state),
    }));

  if (!items.length) return [{ label: "当前角色没有可用动作", enabled: false }];
  return [
    { label: "恢复自动动作", click: () => sendRenderer("pet:action", "__auto") },
    { type: "separator" },
    ...items,
  ];
}

function triggerManualAction(state) {
  if (petManifest?.states?.[state]) {
    sendRenderer("pet:action", state);
  }
}

function triggerGreeting() {
  triggerManualAction("waving");
  sendSpeech(settings.greeting?.text || DEFAULT_SETTINGS.greeting.text);
}

function triggerMood(mood) {
  const moodMap = {
    happy: ["waving", "今天心情很好。"],
    focus: ["running", "进入专注模式。"],
    calm: ["idle", "我安静陪你一会儿。"],
    sleepy: ["sleepy", "有点困，我眯一下。"],
  };
  const [state, text] = moodMap[mood] || moodMap.calm;
  triggerManualAction(state);
  sendSpeech(text);
}

function buildWeatherCityMenuItems() {
  return ["Shanghai", "Beijing", "Hangzhou", "Shenzhen", "Guangzhou", "Chengdu"].map((city) => ({
    label: city,
    type: "radio",
    checked: (settings.weather?.city || DEFAULT_SETTINGS.weather.city) === city,
    click: () => setWeatherCity(city),
  }));
}

function buildInteractionMenuItems() {
  return [
    {
      label: "打招呼",
      click: () => {
        triggerGreeting();
      },
    },
    {
      label: "情绪",
      submenu: [
        {
          label: "开心",
          click: () => {
            triggerMood("happy");
          },
        },
        {
          label: "专注",
          click: () => {
            triggerMood("focus");
          },
        },
        {
          label: "放松",
          click: () => {
            triggerMood("calm");
          },
        },
        {
          label: "困了",
          click: () => {
            triggerMood("sleepy");
          },
        },
      ],
    },
    {
      label: `天气播报 (${settings.weather?.city || DEFAULT_SETTINGS.weather.city})`,
      click: () => announceWeather(),
    },
    {
      label: "天气城市",
      submenu: buildWeatherCityMenuItems(),
    },
  ];
}

function buildPetConnectMenuItems() {
  const petConnect = sanitizePetConnect(settings.petConnect);
  return [
    {
      label: `状态：${petConnect.connectionState}`,
      enabled: false,
    },
    {
      label: "开启连接",
      type: "checkbox",
      checked: petConnect.enabled,
      click: () => setPetConnect({ enabled: !petConnect.enabled }),
    },
    {
      label: "勿扰模式",
      type: "checkbox",
      checked: petConnect.doNotDisturb || petConnect.status === "dnd",
      click: () => setPetConnect({
        doNotDisturb: !(petConnect.doNotDisturb || petConnect.status === "dnd"),
        status: petConnect.status === "dnd" ? "online" : petConnect.status,
      }),
    },
    {
      label: "立即连接",
      click: () => startPetConnect(),
    },
    {
      label: "生成邀请码",
      click: () => createPetConnectInvite().catch(() => sendSpeech("生成邀请码失败。", 3200)),
    },
    {
      label: "连接设置...",
      click: openPreferencesWindow,
    },
  ];
}

function buildMenuTemplate(source) {
  return [
    {
      label: settings.petName || "Desktop Pet",
      enabled: false,
    },
    {
      label: mainWindow?.isVisible() ? "隐藏桌宠" : "显示桌宠",
      click: toggleVisible,
    },
    {
      label: "重命名桌宠...",
      click: openNameWindow,
    },
    {
      label: "偏好设置...",
      click: openPreferencesWindow,
    },
    {
      label: "显示名字",
      type: "checkbox",
      checked: settings.showName,
      click: () => setShowName(!settings.showName),
    },
    {
      label: "动作",
      submenu: buildActionMenuItems(),
    },
    {
      label: "互动",
      submenu: buildInteractionMenuItems(),
    },
    {
      label: "连接",
      submenu: buildPetConnectMenuItems(),
    },
    { type: "separator" },
    { label: "角色", submenu: buildPetLibraryMenuItems() },
    { type: "separator" },
    {
      label: "自动动作",
      type: "checkbox",
      checked: settings.behaviorEnabled,
      click: () => setBehaviorEnabled(!settings.behaviorEnabled),
    },
    {
      label: "点击穿透",
      type: "checkbox",
      checked: settings.passThrough,
      click: () => setPassThrough(!settings.passThrough),
    },
    {
      label: "窗口置顶",
      type: "checkbox",
      checked: settings.topmost,
      click: () => setTopmost(!settings.topmost),
    },
    {
      label: "任务栏显示",
      type: "checkbox",
      checked: settings.taskbarVisible,
      click: () => setTaskbarVisible(!settings.taskbarVisible),
    },
    { type: "separator" },
    { label: "尺寸", submenu: buildScaleMenuItems() },
    { label: "透明度", submenu: buildOpacityMenuItems() },
    { label: "重置位置", click: resetPosition },
    { type: "separator" },
    ...(source === "tray" ? [{ label: "退出", click: () => app.quit() }] : [{ label: "退出", click: () => app.quit() }]),
  ];
}

function showPetMenu() {
  if (!mainWindow) return;
  Menu.buildFromTemplate(buildMenuTemplate("pet")).popup({ window: mainWindow });
}

function handleQuickCommand(command, payload = {}) {
  switch (command) {
    case "action":
      if (payload.state === "__auto") {
        sendRenderer("pet:action", "__auto");
      } else {
        triggerManualAction(payload.state);
      }
      break;
    case "greeting":
      triggerGreeting();
      break;
    case "mood":
      triggerMood(payload.mood);
      break;
    case "weather":
      announceWeather();
      break;
    case "preferences":
      openPreferencesWindow();
      break;
    default:
      break;
  }
}

function createTray() {
  const iconPath = path.join(app.getAppPath(), "assets", "tray.png");
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);
  tray.setToolTip(settings.petName || "Desktop Pet");
  tray.on("click", toggleVisible);
  tray.on("right-click", refreshTrayMenu);
  refreshTrayMenu();
}

function applyWindowSettings() {
  if (!mainWindow) return;
  mainWindow.setOpacity(settings.opacity);
  mainWindow.setAlwaysOnTop(settings.topmost, "screen-saver");
  mainWindow.setIgnoreMouseEvents(settings.passThrough, { forward: true });
  mainWindow.setSkipTaskbar(!settings.taskbarVisible);
}

function createWindow() {
  const bounds = getInitialBounds();

  mainWindow = new BrowserWindow({
    ...bounds,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    hasShadow: false,
    skipTaskbar: !settings.taskbarVisible,
    backgroundColor: "#00000000",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  applyWindowSettings();
  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
  mainWindow.once("ready-to-show", () => {
    currentDisplayId = getWindowDisplay(mainWindow.getBounds()).id;
    setHomeFromCurrentBounds();
    if (settings.visible) {
      mainWindow.showInactive();
    }
  });
}

app.whenReady().then(() => {
  loadSettings();
  parseScaleArg();
  loadPetManifest();

  ipcMain.handle("pet:get-config", () => ({
    behaviorEnabled: settings.behaviorEnabled,
    emotionFrequency: settings.emotionFrequency,
    greeting: settings.greeting,
    inputReactions: settings.inputReactions,
    petName: settings.petName,
    scale: settings.scale,
    showName: settings.showName,
    pet: petManifest,
    spritesheetUrl: pathToFileURL(path.join(petDir, petManifest.spritesheet)).href,
    topUiHeight: getTopUiHeightForDisplay(mainWindow ? getWindowDisplay(mainWindow.getBounds()) : screen.getPrimaryDisplay()),
  }));

  ipcMain.handle("preferences:get-config", () => getPreferencesConfig());

  ipcMain.handle("import-preview:get-config", () => pendingImportPreview);

  ipcMain.on("import-preview:confirm", () => {
    finishImportPreview(Boolean(pendingImportPreview?.ok));
  });

  ipcMain.on("import-preview:cancel", () => {
    finishImportPreview(false);
  });

  ipcMain.handle("preferences:save", (_event, patch) => {
    prefsWasSaved = true;
    applyPreferencesPatch(patch || {});
    scheduleSaveSettings();
    return getPreferencesConfig();
  });

  ipcMain.handle("preferences:import-pet", async () => {
    const importResult = await importPetPackage();
    return {
      ...getPreferencesConfig(),
      importResult,
    };
  });

  ipcMain.handle("preferences:import-generated-image", (_event, payload) => importGeneratedPetImage(payload || {}));

  ipcMain.handle("preferences:import-generated-actions", (_event, payload) => importGeneratedActionFolder(payload || {}));

  ipcMain.handle("preferences:open-pets-folder", () => {
    openPetsFolder();
    return { ok: true };
  });

  ipcMain.handle("preferences:preview-scale", (_event, value) => {
    previewScaleForPreferences(Number(value));
    return { ok: true };
  });

  ipcMain.handle("preferences:preview-opacity", (_event, value) => {
    previewOpacityForPreferences(Number(value));
    return { ok: true };
  });

  ipcMain.handle("preferences:test-greeting", () => {
    triggerGreeting();
    return { ok: true };
  });

  ipcMain.handle("preferences:test-weather", async () => {
    await announceWeather();
    return { ok: true };
  });

  ipcMain.handle("preferences:connect-register", () => registerPetConnectAccount());

  ipcMain.handle("preferences:connect-now", () => connectPetConnectNow());

  ipcMain.handle("preferences:connect-create-invite", () => createPetConnectInvite());

  ipcMain.handle("preferences:connect-copy-invite", () => copyPetConnectInviteCode());

  ipcMain.handle("preferences:copy-text", (_event, text) => copyPreferenceText(text));

  ipcMain.handle("preferences:connect-clear-messages", () => clearPetConnectMessages());

  ipcMain.handle("preferences:connect-accept-invite", (_event, code) => acceptPetConnectInvite(code));

  ipcMain.handle("preferences:connect-send-message", (_event, payload) => sendPetConnectUserMessage(payload || {}));

  ipcMain.handle("preferences:connect-create-test-friend", (_event, payload) => createRealPetConnectTestFriend(payload || {}));

  ipcMain.handle("preferences:connect-test-friend-message", (_event, payload) => sendPetConnectTestFriendMessage(payload || {}));

  ipcMain.handle("rename:get-config", () => ({
    petName: settings.petName,
    showName: settings.showName,
  }));

  ipcMain.on("rename:submit", (_event, nextName) => {
    setPetName(nextName);
    if (nameWindow && !nameWindow.isDestroyed()) {
      nameWindow.close();
    }
  });

  ipcMain.on("rename:cancel", () => {
    if (nameWindow && !nameWindow.isDestroyed()) {
      nameWindow.close();
    }
  });

  ipcMain.on("pet:move-to", (event, _screenX, _screenY, offsetX, offsetY) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    const cursorDip = screen.getCursorScreenPoint();
    const display = screen.getDisplayNearestPoint(cursorDip);
    const preferredX = cursorDip.x - offsetX;
    const preferredY = cursorDip.y - offsetY;
    ensureSizeForDisplay(display, preferredX, preferredY);

    const bounds = win.getBounds();
    const nextBounds = clampBoundsToDisplay({ ...bounds, x: preferredX, y: preferredY }, display);
    win.setPosition(nextBounds.x, nextBounds.y, false);
  });

  ipcMain.on("pet:move-by", (event, dx, dy) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win || !settings.behaviorEnabled) return;

    const bounds = win.getBounds();
    const display = getWindowDisplay(bounds);
    ensureSizeForDisplay(display, bounds.x, bounds.y);

    const resizedBounds = win.getBounds();
    const range = getRoamRange(resizedBounds, display);
    const nextX = clamp(resizedBounds.x + dx, range.minX, range.maxX);
    const nextY = clamp(resizedBounds.y + dy, range.minY, range.maxY);
    win.setPosition(Math.round(nextX), Math.round(nextY), false);

    const hitLeft = dx < 0 && resizedBounds.x > range.minX && nextX <= range.minX;
    const hitRight = dx > 0 && resizedBounds.x < range.maxX && nextX >= range.maxX;
    if (hitLeft || hitRight) {
      win.webContents.send("pet:hit-edge", hitLeft ? "left" : "right");
    }
  });

  ipcMain.on("pet:set-home", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win || win !== mainWindow) return;
    setHomeFromCurrentBounds();
  });

  ipcMain.on("pet:hover-start", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win || win !== mainWindow) return;
    scheduleHoverHide();
  });

  ipcMain.on("pet:hover-end", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win || win !== mainWindow) return;
    restoreHoverHidden();
  });

  ipcMain.on("pet:show-menu", showPetMenu);

  ipcMain.on("pet:quick-command", (_event, command, payload) => {
    handleQuickCommand(command, payload);
  });

  createWindow();
  createTray();
  registerGlobalShortcuts();
  startPetConnect();

  screen.on("display-metrics-changed", () => {
    if (!mainWindow) return;
    const bounds = mainWindow.getBounds();
    const display = getWindowDisplay(bounds);
    ensureSizeForDisplay(display, bounds.x, bounds.y);
    setHomeFromCurrentBounds();
  });
});

app.on("before-quit", () => {
  closePetConnectTestFriend();
  closePetConnect("disconnected");
  if (mainWindow && !mainWindow.isDestroyed()) {
    settings.visible = mainWindow.isVisible();
    rememberCurrentBounds();
  }
  saveSettings();
});

app.on("window-all-closed", () => {
  app.quit();
});
