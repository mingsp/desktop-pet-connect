(() => {
  const DEFAULT_STATES = {
    idle: { row: 0, frames: 6, durations: [900, 420, 420, 520, 520, 1100], loop: true },
    "running-right": { row: 1, frames: 8, durations: [120, 120, 120, 120, 120, 120, 120, 220], loop: true, walk: 95 },
    "running-left": { row: 2, frames: 8, durations: [120, 120, 120, 120, 120, 120, 120, 220], loop: true, walk: -95 },
    waving: { row: 3, frames: 4, durations: [140, 140, 140, 280], loop: false },
    jumping: { row: 4, frames: 5, durations: [140, 140, 140, 140, 280], loop: false },
    failed: { row: 5, frames: 8, durations: [140, 140, 140, 140, 140, 140, 140, 240], loop: false },
    waiting: { row: 6, frames: 6, durations: [150, 150, 150, 150, 150, 260], loop: true },
    running: { row: 7, frames: 6, durations: [120, 120, 120, 120, 120, 220], loop: true },
    review: { row: 8, frames: 6, durations: [150, 150, 150, 150, 150, 280], loop: false },
  };

  const RANDOM_ACTIONS = [
    ["idle", 44],
    ["waving", 12],
    ["jumping", 6],
    ["sleepy", 8],
    ["running", 8],
    ["dragged", 3],
    ["running-left", 4],
    ["running-right", 4],
  ];

  const RAPID_CLICK_SPEECHES = [
    ["诶，别戳我！", "你干嘛啦～", "别老点我嘛 >_<"],
    ["哎哎，轻点轻点～", "好啦好啦，我知道你在！", "手别那么快嘛！"],
    ["坏坏的～不许戳我！", "诶！知道你想我了！", "嘻嘻，知道了知道了 💕"],
  ];

  const STARTUP_SPEECHES = [
    "你好呀，我在这里。",
    "今天也来了！一起加油吧 ✨",
    "呀，是你！我等你好久了 💕",
  ];

  const DRAG_RELEASE_SPEECHES = [
    ["好好好，放我下来了。", "嗯，这里不错。"],
    ["带我去哪里了～", "这里视野不错！"],
    ["每次都带我到处飞...", "嘻，就知道你舍不得让我走。"],
  ];

  const ANIMATION_SPEED_MULTIPLIER = 1.18;
  const pet = document.getElementById("pet");
  const actionGrid = document.getElementById("actionGrid");
  const quickPanel = document.getElementById("quickPanel");
  const speechBubble = document.getElementById("speechBubble");
  const speechText = document.getElementById("speechText");
  const stage = document.getElementById("stage");
  const nameText = document.getElementById("nameText");
  let columns = 8;
  let rows = 9;
  let states = DEFAULT_STATES;
  let scale = 1;
  let emotionFrequency = 0.35;
  let greeting = { text: "你好呀，我在这里。" };
  let petName = "";
  let showName = true;
  let state = "idle";
  let frame = 0;
  let frameStartedAt = performance.now();
  let lastTickAt = performance.now();
  let nextBehaviorAt = performance.now() + 5000;
  let oneShotReturnAt = 0;
  let walkUntil = 0;
  let manualHold = false;
  let behaviorEnabled = true;
  let inputReactions = true;
  let isDragging = false;
  let pointerIsDown = false;
  let dragActivated = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragStartScreenX = 0;
  let dragStartScreenY = 0;
  let dragLastScreenX = 0;
  let dragLastAt = 0;
  let speechTimer = 0;
  let intimacyCount = 0;
  let recentClickTimes = [];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function chooseWeightedAction() {
    const availableActions = RANDOM_ACTIONS.filter(([name]) => states[name]);
    const total = availableActions.reduce((sum, [, weight]) => sum + weight, 0);
    let cursor = Math.random() * total;
    for (const [name, weight] of availableActions) {
      cursor -= weight;
      if (cursor <= 0) return name;
    }
    return "idle";
  }

  function setScale(nextScale) {
    scale = nextScale;
  }

  function nextBehaviorDelay() {
    const frequency = clamp(Number(emotionFrequency) || 0, 0, 1);
    const min = 18000 - frequency * 12000;
    const span = 12000 - frequency * 6000;
    return min + Math.random() * span;
  }

  function setPetName(nextName) {
    petName = nextName || "";
    nameText.textContent = petName;
  }

  function setNameDisplay(config) {
    if (Object.prototype.hasOwnProperty.call(config, "petName")) {
      setPetName(config.petName);
    }
    showName = config.showName !== false;
    stage.classList.toggle("no-name", !showName);
  }

  function setState(nextState, now = performance.now(), options = {}) {
    if (!states[nextState]) return;
    if (state === nextState && !options.restart) return;
    if (options.manual) {
      manualHold = true;
    } else if (options.auto || options.drag || options.clearManual || nextState === "idle") {
      manualHold = false;
    }
    state = nextState;
    frame = 0;
    frameStartedAt = now;

    if (state === "running-left" || state === "running-right") {
      walkUntil = options.drag ? 0 : now + 500 + Math.random() * 700;
    } else {
      walkUntil = 0;
    }

    if (!states[state].loop && !manualHold) {
      oneShotReturnAt = now + totalDuration(states[state]) + 80;
    } else {
      oneShotReturnAt = 0;
    }

    renderFrame(now);
  }

  function renderFrame(now) {
    const spec = states[state];
    const x = frame % columns;
    const y = spec.row % rows;
    const horizontal = columns <= 1 ? 0 : (x / (columns - 1)) * 100;
    const vertical = rows <= 1 ? 0 : (y / (rows - 1)) * 100;
    pet.style.backgroundPosition = `${horizontal}% ${vertical}%`;
    pet.style.transform = "translate3d(0, 0, 0)";
  }

  function frameDuration(spec, frameIndex) {
    const duration = spec.durations?.[frameIndex] || 140;
    return Math.round(duration * ANIMATION_SPEED_MULTIPLIER);
  }

  function totalDuration(spec) {
    let total = 0;
    for (let index = 0; index < spec.frames; index += 1) {
      total += frameDuration(spec, index);
    }
    return total;
  }

  function advanceAnimation(now) {
    const spec = states[state];
    const duration = frameDuration(spec, frame);
    if (now - frameStartedAt >= duration) {
      frameStartedAt = now;
      frame += 1;

      if (frame >= spec.frames) {
        if (spec.loop || manualHold) {
          frame = 0;
        } else {
          setState("idle", now, { clearManual: true });
          return;
        }
      }
    }
  }

  function advanceBehavior(now) {
    if (!behaviorEnabled) return;
    if (isDragging) return;
    if (manualHold) return;
    if (oneShotReturnAt && now >= oneShotReturnAt) {
      setState("idle", now, { clearManual: true });
      return;
    }
    if (walkUntil && now >= walkUntil) {
      setState("idle", now, { clearManual: true });
      return;
    }
    if (now >= nextBehaviorAt && state === "idle") {
      setState(chooseWeightedAction(), now, { auto: true });
      nextBehaviorAt = now + nextBehaviorDelay();
    }
  }

  function advanceMovement(now) {
    const spec = states[state];
    const elapsed = Math.min(40, now - lastTickAt);
    if (behaviorEnabled && !isDragging && spec.walk) {
      const direction = spec.walk < 0 ? -1 : 1;
      const dx = (direction * 42 * elapsed) / 1000;
      window.desktopPet.moveBy(dx, 0);
    }
  }

  function say(message, duration = 4200) {
    const text = String(message || "").trim();
    if (!text) return;
    speechText.textContent = text;
    speechBubble.classList.add("visible");
    if (speechTimer) window.clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => {
      speechTimer = 0;
      speechBubble.classList.remove("visible");
    }, Math.max(1200, Number(duration) || 4200));
  }

  function loadIntimacy() {
    try {
      const stored = JSON.parse(localStorage.getItem("pet_intimacy") || "{}");
      intimacyCount = Math.max(0, Math.min(9999, Number(stored.count) || 0));
    } catch (_error) {
      intimacyCount = 0;
    }
  }

  function saveIntimacy() {
    try {
      localStorage.setItem("pet_intimacy", JSON.stringify({ count: intimacyCount }));
    } catch (_error) {
      // localStorage may be unavailable in some Electron contexts.
    }
  }

  function addIntimacy(amount = 1) {
    intimacyCount = Math.min(9999, intimacyCount + amount);
    saveIntimacy();
  }

  function getIntimacyTier() {
    if (intimacyCount < 30) return 0;
    if (intimacyCount < 120) return 1;
    return 2;
  }

  function updateStatusDot(isOnline) {
    const dot = document.getElementById("statusDot");
    if (!dot) return;
    dot.classList.remove("hidden");
    dot.classList.toggle("online", Boolean(isOnline));
  }

  function getStartupSpeech() {
    const tier = getIntimacyTier();
    return STARTUP_SPEECHES[Math.min(tier, STARTUP_SPEECHES.length - 1)] || greeting.text;
  }

  function receiveConnectMessage(message) {
    const now = performance.now();
    const friend = String(message?.friendPetName || message?.friendName || "朋友的桌宠").trim();
    const text = String(message?.text || "").trim();
    if (!text) return;
    if (states.waving) {
      setState("waving", now, { restart: true, auto: true });
    }
    say(`${friend}：${text}`, 6800);
    nextBehaviorAt = now + nextBehaviorDelay();
  }

  function hideQuickPanel() {
    quickPanel.classList.remove("visible");
  }

  function toggleQuickPanel() {
    quickPanel.classList.toggle("visible");
  }

  function sendQuickCommand(command, payload = {}) {
    hideQuickPanel();
    window.desktopPet.quickCommand(command, payload);
  }

  function actionShortLabel(label, stateName) {
    const map = {
      idle: "🧍",
      "running-right": "→",
      "running-left": "←",
      waving: "👋",
      jumping: "⬆",
      dragged: "🌊",
      sleepy: "😴",
      running: "🏃",
      failed: "😵",
      waiting: "⏳",
      review: "📝",
    };
    return map[stateName] || String(label || stateName).slice(0, 2);
  }

  function renderQuickActions(actions = []) {
    actionGrid.replaceChildren();
    const autoButton = document.createElement("button");
    autoButton.type = "button";
    autoButton.textContent = "自动";
    autoButton.title = "恢复自动动作";
    autoButton.addEventListener("click", () => sendQuickCommand("action", { state: "__auto" }));
    actionGrid.appendChild(autoButton);

    for (const action of actions) {
      if (!states[action.state]) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = actionShortLabel(action.label, action.state);
      button.title = action.label;
      button.addEventListener("click", () => sendQuickCommand("action", { state: action.state }));
      actionGrid.appendChild(button);
    }
  }

  function tick(now) {
    advanceMovement(now);
    advanceAnimation(now);
    advanceBehavior(now);
    renderFrame(now);
    lastTickAt = now;
    requestAnimationFrame(tick);
  }

  function bindPointerEvents() {
    pet.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      const now = performance.now();
      pointerIsDown = true;
      dragActivated = false;
      dragOffsetX = event.clientX;
      dragOffsetY = event.clientY;
      dragStartScreenX = event.screenX;
      dragStartScreenY = event.screenY;
      dragLastScreenX = event.screenX;
      dragLastAt = now;
      nextBehaviorAt = now + 2000;
      if (!inputReactions) hideQuickPanel();
      pet.setPointerCapture(event.pointerId);
    });

    pet.addEventListener("pointermove", (event) => {
      if (!pointerIsDown) return;
      const now = performance.now();
      const dx = event.screenX - dragLastScreenX;
      const totalDx = event.screenX - dragStartScreenX;
      const totalDy = event.screenY - dragStartScreenY;
      const elapsed = Math.max(1, now - dragLastAt);
      const velocityX = (dx / elapsed) * 1000;

      if (!dragActivated && Math.hypot(totalDx, totalDy) >= 5) {
        dragActivated = true;
        isDragging = true;
        manualHold = false;
        hideQuickPanel();
        pet.classList.add("dragging");
      }

      if (!dragActivated) return;

      if (inputReactions && (Math.abs(velocityX) > 80 || Math.abs(dx) >= 2)) {
        setState(dx < 0 ? "running-left" : "running-right", now, { drag: true });
      }

      dragLastScreenX = event.screenX;
      dragLastAt = now;
      window.desktopPet.moveTo(event.screenX, event.screenY, dragOffsetX, dragOffsetY);
    });

    pet.addEventListener("pointerup", (event) => {
      const wasDragging = dragActivated;
      pointerIsDown = false;
      dragActivated = false;
      isDragging = false;
      if (wasDragging) {
        setState("idle", performance.now(), { restart: true, clearManual: true });
        window.desktopPet.setHome();
        nextBehaviorAt = performance.now() + nextBehaviorDelay();
        addIntimacy(1);
        if (Math.random() < 0.35) {
          const tier = getIntimacyTier();
          const speeches = DRAG_RELEASE_SPEECHES[Math.min(tier, DRAG_RELEASE_SPEECHES.length - 1)];
          const text = speeches[Math.floor(Math.random() * speeches.length)];
          window.setTimeout(() => say(text, 3500), 200);
        }
      } else {
        const now = performance.now();
        recentClickTimes = recentClickTimes.filter((t) => now - t < 1000);
        recentClickTimes.push(now);
        addIntimacy(1);
        if (recentClickTimes.length >= 5) {
          recentClickTimes = [];
          hideQuickPanel();
          const tier = getIntimacyTier();
          const speeches = RAPID_CLICK_SPEECHES[tier];
          say(speeches[Math.floor(Math.random() * speeches.length)], 3200);
          if (states.waving) {
            setState("waving", performance.now(), { restart: true, auto: true });
          }
          nextBehaviorAt = performance.now() + nextBehaviorDelay();
        } else if (inputReactions) {
          toggleQuickPanel();
        } else {
          hideQuickPanel();
        }
      }
      pet.classList.remove("dragging");
      try {
        pet.releasePointerCapture(event.pointerId);
      } catch (_error) {
        // Pointer capture may already be released when the window loses focus.
      }
    });

    pet.addEventListener("pointercancel", () => {
      pointerIsDown = false;
      dragActivated = false;
      isDragging = false;
      setState("idle", performance.now(), { restart: true, clearManual: true });
      window.desktopPet.setHome();
      pet.classList.remove("dragging");
    });

    window.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      window.desktopPet.showMenu();
    });

    pet.addEventListener("pointerenter", () => {
      window.desktopPet.hoverStart();
    });

    pet.addEventListener("pointerleave", () => {
      window.desktopPet.hoverEnd();
    });

    quickPanel.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-command]");
      if (!button) return;
      const command = button.dataset.command;
      if (command === "mood") {
        sendQuickCommand("mood", { mood: button.dataset.mood });
        return;
      }
      sendQuickCommand(command);
    });
  }

  function applyPetConfig(config) {
    setScale(config.scale);
    emotionFrequency = clamp(Number(config.emotionFrequency ?? emotionFrequency), 0, 1);
    greeting = config.greeting || greeting;
    setPetName(config.petName || config.pet?.displayName || "");
    setNameDisplay({ petName, showName: config.showName });
    behaviorEnabled = config.behaviorEnabled !== false;
    inputReactions = config.inputReactions !== false;
    columns = config.pet?.grid?.columns || columns;
    rows = config.pet?.grid?.rows || rows;
    states = config.pet?.states || DEFAULT_STATES;
    stage.style.setProperty("--top-ui-height", `${Math.max(72, Number(config.topUiHeight) || 92)}px`);
    renderQuickActions(config.pet?.actions || []);
    pet.style.backgroundSize = `${columns * 100}% ${rows * 100}%`;
    pet.style.backgroundImage = `url("${config.spritesheetUrl}")`;
    setState("idle", performance.now(), { restart: true, clearManual: true });
    pet.classList.remove("dragging");
    window.desktopPet.setHome();
    if (config.friendsOnline) {
      updateStatusDot(config.friendsOnline.count > 0);
    }
  }

  async function boot() {
    loadIntimacy();
    const config = await window.desktopPet.getConfig();
    applyPetConfig(config);
    bindPointerEvents();
    window.desktopPet.onAction((nextState) => {
      const now = performance.now();
      if (nextState === "__auto") {
        setState("idle", now, { restart: true, clearManual: true });
        nextBehaviorAt = now + 1200;
        return;
      }
      setState(nextState, now, { restart: true, manual: true });
    });
    window.desktopPet.onAsset((nextConfig) => applyPetConfig(nextConfig));
    window.desktopPet.onBehaviorEnabled((enabled) => {
      behaviorEnabled = enabled;
      if (!behaviorEnabled && (state === "running-left" || state === "running-right")) {
        setState("idle", performance.now(), { restart: true });
      }
    });
    window.desktopPet.onConnectMessage((message) => receiveConnectMessage(message));
    window.desktopPet.onEdgeHit((side) => {
      const now = performance.now();
      if (side === "left" && states["running-right"]) {
        setState("running-right", now, { auto: true });
      } else if (side === "right" && states["running-left"]) {
        setState("running-left", now, { auto: true });
      }
    });
    window.desktopPet.onFriendsOnline((payload) => {
      updateStatusDot(payload?.count > 0);
    });
    window.desktopPet.onInputReactions((enabled) => {
      inputReactions = enabled !== false;
      if (!inputReactions) hideQuickPanel();
    });
    window.desktopPet.onName((nextName) => setPetName(nextName));
    window.desktopPet.onNameDisplay((config) => setNameDisplay(config));
    window.desktopPet.onRuntimeSettings((config) => {
      emotionFrequency = clamp(Number(config?.emotionFrequency ?? emotionFrequency), 0, 1);
      greeting = config?.greeting || greeting;
    });
    window.desktopPet.onScale((nextScale) => setScale(nextScale));
    window.desktopPet.onSpeech((payload) => say(payload?.text, payload?.duration));
    window.setTimeout(() => {
      const text = getStartupSpeech();
      if (text) say(text, 5000);
    }, 2500);
    requestAnimationFrame(tick);
  }

  boot();
})();
