const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopPet", {
  getConfig: () => ipcRenderer.invoke("pet:get-config"),
  moveTo: (screenX, screenY, offsetX, offsetY) => ipcRenderer.send("pet:move-to", screenX, screenY, offsetX, offsetY),
  moveBy: (dx, dy) => ipcRenderer.send("pet:move-by", dx, dy),
  hoverEnd: () => ipcRenderer.send("pet:hover-end"),
  hoverStart: () => ipcRenderer.send("pet:hover-start"),
  quickCommand: (command, payload) => ipcRenderer.send("pet:quick-command", command, payload),
  setHome: () => ipcRenderer.send("pet:set-home"),
  showMenu: () => ipcRenderer.send("pet:show-menu"),
  onAction: (callback) => ipcRenderer.on("pet:action", (_event, state) => callback(state)),
  onAsset: (callback) => ipcRenderer.on("pet:asset", (_event, config) => callback(config)),
  onBehaviorEnabled: (callback) => ipcRenderer.on("pet:behavior-enabled", (_event, enabled) => callback(enabled)),
  onConnectMessage: (callback) => ipcRenderer.on("pet:connect-message", (_event, payload) => callback(payload)),
  onEdgeHit: (callback) => ipcRenderer.on("pet:hit-edge", (_event, side) => callback(side)),
  onFriendsOnline: (callback) => ipcRenderer.on("pet:friends-online", (_event, payload) => callback(payload)),
  onInputReactions: (callback) => ipcRenderer.on("pet:input-reactions", (_event, enabled) => callback(enabled)),
  onName: (callback) => ipcRenderer.on("pet:name", (_event, petName) => callback(petName)),
  onNameDisplay: (callback) => ipcRenderer.on("pet:name-display", (_event, config) => callback(config)),
  onRuntimeSettings: (callback) => ipcRenderer.on("pet:runtime-settings", (_event, config) => callback(config)),
  onScale: (callback) => ipcRenderer.on("pet:scale", (_event, scale) => callback(scale)),
  onSpeech: (callback) => ipcRenderer.on("pet:say", (_event, payload) => callback(payload)),
});

contextBridge.exposeInMainWorld("renamePet", {
  getConfig: () => ipcRenderer.invoke("rename:get-config"),
  submit: (petName) => ipcRenderer.send("rename:submit", petName),
  cancel: () => ipcRenderer.send("rename:cancel"),
});

contextBridge.exposeInMainWorld("preferencesPet", {
  acceptConnectInvite: (code) => ipcRenderer.invoke("preferences:connect-accept-invite", code),
  clearConnectMessages: () => ipcRenderer.invoke("preferences:connect-clear-messages"),
  connectNow: () => ipcRenderer.invoke("preferences:connect-now"),
  copyConnectInvite: () => ipcRenderer.invoke("preferences:connect-copy-invite"),
  copyText: (text) => ipcRenderer.invoke("preferences:copy-text", text),
  createConnectInvite: () => ipcRenderer.invoke("preferences:connect-create-invite"),
  createConnectTestFriend: (payload) => ipcRenderer.invoke("preferences:connect-create-test-friend", payload),
  getConfig: () => ipcRenderer.invoke("preferences:get-config"),
  blockConnectFriend: (payload) => ipcRenderer.invoke("preferences:connect-block-friend", payload),
  importGeneratedActions: (payload) => ipcRenderer.invoke("preferences:import-generated-actions", payload),
  importGeneratedImage: (payload) => ipcRenderer.invoke("preferences:import-generated-image", payload),
  importPackage: () => ipcRenderer.invoke("preferences:import-pet"),
  openPetsFolder: () => ipcRenderer.invoke("preferences:open-pets-folder"),
  previewOpacity: (value) => ipcRenderer.invoke("preferences:preview-opacity", value),
  previewScale: (value) => ipcRenderer.invoke("preferences:preview-scale", value),
  registerConnect: () => ipcRenderer.invoke("preferences:connect-register"),
  removeConnectFriend: (payload) => ipcRenderer.invoke("preferences:connect-remove-friend", payload),
  save: (patch) => ipcRenderer.invoke("preferences:save", patch),
  sendConnectMessage: (payload) => ipcRenderer.invoke("preferences:connect-send-message", payload),
  sendConnectTestFriendMessage: (payload) => ipcRenderer.invoke("preferences:connect-test-friend-message", payload),
  testGreeting: () => ipcRenderer.invoke("preferences:test-greeting"),
  testWeather: () => ipcRenderer.invoke("preferences:test-weather"),
  onChanged: (callback) => ipcRenderer.on("preferences:changed", (_event, config) => callback(config)),
});

contextBridge.exposeInMainWorld("petImportPreview", {
  cancel: () => ipcRenderer.send("import-preview:cancel"),
  confirm: () => ipcRenderer.send("import-preview:confirm"),
  getConfig: () => ipcRenderer.invoke("import-preview:get-config"),
});
