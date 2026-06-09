const elements = {
  activePetText: document.getElementById("activePetText"),
  activePetSelect: document.getElementById("activePetSelect"),
  advancedMode: document.getElementById("advancedModeButton"),
  behaviorEnabled: document.getElementById("behaviorEnabledInput"),
  birthday: document.getElementById("birthdayInput"),
  cityChips: document.getElementById("cityChips"),
  connectAcceptInvite: document.getElementById("connectAcceptInviteInput"),
  connectAcceptInviteButton: document.getElementById("connectAcceptInviteButton"),
  connectAllowIncoming: document.getElementById("connectAllowIncomingInput"),
  connectConnectionState: document.getElementById("connectConnectionStateInput"),
  connectCopyInvite: document.getElementById("connectCopyInviteButton"),
  connectCreateInvite: document.getElementById("connectCreateInviteButton"),
  connectCreateTestFriend: document.getElementById("connectCreateTestFriendButton"),
  connectDisplayName: document.getElementById("connectDisplayNameInput"),
  connectDoNotDisturb: document.getElementById("connectDoNotDisturbInput"),
  connectEnabled: document.getElementById("connectEnabledInput"),
  connectFriend: document.getElementById("connectFriendSelect"),
  connectFriendAlias: document.getElementById("connectFriendAliasInput"),
  connectFriendList: document.getElementById("connectFriendList"),
  connectFriendMute: document.getElementById("connectFriendMuteInput"),
  connectFriendNote: document.getElementById("connectFriendNoteInput"),
  connectInviteCode: document.getElementById("connectInviteCodeInput"),
  connectMessageCount: document.getElementById("connectMessageCount"),
  connectNow: document.getElementById("connectNowButton"),
  connectOutgoingMessage: document.getElementById("connectOutgoingMessageInput"),
  connectRecentMessageText: document.getElementById("connectRecentMessageText"),
  connectRegister: document.getElementById("connectRegisterButton"),
  connectRelationshipLabel: document.getElementById("connectRelationshipLabelInput"),
  connectSendMessage: document.getElementById("connectSendMessageButton"),
  connectServerBaseUrl: document.getElementById("connectServerBaseUrlInput"),
  connectStateBadge: document.getElementById("connectStateBadge"),
  connectStatus: document.getElementById("connectStatusSelect"),
  connectSummaryFriendCount: document.getElementById("connectSummaryFriendCount"),
  connectSummaryInvite: document.getElementById("connectSummaryInvite"),
  connectSummaryState: document.getElementById("connectSummaryState"),
  connectTestFriendMessage: document.getElementById("connectTestFriendMessageButton"),
  connectTestFriendMessageInput: document.getElementById("connectTestFriendMessageInput"),
  connectTestFriendPetName: document.getElementById("connectTestFriendPetNameInput"),
  connectUserId: document.getElementById("connectUserIdInput"),
  diyApplyBinding: document.getElementById("diyApplyBindingButton"),
  diyBindingMeta: document.getElementById("diyBindingMeta"),
  diyBindingPreviewImage: document.getElementById("diyBindingPreviewImage"),
  diyBindingStatus: document.getElementById("diyBindingStatus"),
  diyBindingTitle: document.getElementById("diyBindingTitle"),
  diyCopyImagePrompt: document.getElementById("diyCopyImagePromptButton"),
  diyFriend: document.getElementById("diyFriendSelect"),
  diyImageBrief: document.getElementById("diyImageBriefInput"),
  diyImagePromptOutput: document.getElementById("diyImagePromptOutput"),
  diyImageStyle: document.getElementById("diyImageStyleSelect"),
  diyImportGeneratedActions: document.getElementById("diyImportGeneratedActionsButton"),
  diyImportGeneratedImage: document.getElementById("diyImportGeneratedImageButton"),
  diyImportPet: document.getElementById("diyImportPetButton"),
  diyPet: document.getElementById("diyPetSelect"),
  diyPrepareActionPrompt: document.getElementById("diyPrepareActionPromptButton"),
  diyPrepareImagePrompt: document.getElementById("diyPrepareImagePromptButton"),
  diyRelationshipLabel: document.getElementById("diyRelationshipLabelInput"),
  emotionFrequency: document.getElementById("emotionFrequencyInput"),
  emotionFrequencyText: document.getElementById("emotionFrequencyText"),
  greeting: document.getElementById("greetingInput"),
  hideOnHover: document.getElementById("hideOnHoverInput"),
  hideOnHoverDelay: document.getElementById("hideOnHoverDelayInput"),
  hideOnHoverDelayText: document.getElementById("hideOnHoverDelayText"),
  homeAcceptInvite: document.getElementById("homeAcceptInviteInput"),
  homeAcceptInviteButton: document.getElementById("homeAcceptInviteButton"),
  homeAvatarDetail: document.getElementById("homeAvatarDetail"),
  homeCompanionImage: document.getElementById("homeCompanionImage"),
  homeCompanionMeta: document.getElementById("homeCompanionMeta"),
  homeCompanionName: document.getElementById("homeCompanionName"),
  homeCompanionNote: document.getElementById("homeCompanionNote"),
  homeCompanionStatus: document.getElementById("homeCompanionStatusText"),
  homeConnect: document.getElementById("homeConnectButton"),
  homeConnectionBadge: document.getElementById("homeConnectionBadge"),
  homeConnectionDetail: document.getElementById("homeConnectionDetail"),
  homeCopyInvite: document.getElementById("homeCopyInviteButton"),
  homeCreateInvite: document.getElementById("homeCreateInviteButton"),
  homeFriend: document.getElementById("homeFriendSelect"),
  homeFriendAvatar: document.getElementById("homeFriendAvatarImage"),
  homeFriendList: document.getElementById("homeFriendList"),
  homeFriendSearch: document.getElementById("homeFriendSearchInput"),
  homeImportAvatar: document.getElementById("homeImportAvatarButton"),
  homeInviteAccept: document.getElementById("homeInviteAcceptCodeInput"),
  homeInviteAcceptButton: document.getElementById("homeInviteAcceptCodeButton"),
  homeInviteBackdrop: document.getElementById("homeInviteBackdrop"),
  homeInviteClose: document.getElementById("homeInviteCloseButton"),
  homeInviteCodeDisplay: document.getElementById("homeInviteCodeDisplay"),
  homeInviteCopy: document.getElementById("homeInviteCopyButton"),
  homeInviteCreate: document.getElementById("homeInviteCreateButton"),
  homeInviteDialog: document.getElementById("homeInviteDialog"),
  homeInviteHint: document.getElementById("homeInviteHint"),
  homeInviteCode: document.getElementById("homeInviteCodeInput"),
  homeMakeAvatar: document.getElementById("homeMakeAvatarButton"),
  homeMessage: document.getElementById("homeMessageInput"),
  homeMessageCount: document.getElementById("homeMessageCount"),
  homeOpenMessages: document.getElementById("homeOpenMessagesButton"),
  homeQuiet: document.getElementById("homeQuietInput"),
  homeQuietAdjust: document.getElementById("homeQuietAdjustButton"),
  homeQuickMessages: document.getElementById("homeQuickMessages"),
  homeRecentMoments: document.getElementById("homeRecentMomentsList"),
  homeRecentMessage: document.getElementById("homeRecentMessageText"),
  homeRelationDetail: document.getElementById("homeRelationDetail"),
  homeSend: document.getElementById("homeSendButton"),
  homeStartAction: document.getElementById("homeStartActionButton"),
  homeStartHint: document.getElementById("homeStartHint"),
  homeStartStrip: document.getElementById("homeStartStrip"),
  homeStartTitle: document.getElementById("homeStartTitle"),
  homeSyncText: document.getElementById("homeSyncText"),
  homeMessageHelper: document.getElementById("homeMessageHelper"),
  importPet: document.getElementById("importPetButton"),
  inputReactions: document.getElementById("inputReactionsInput"),
  keepInScreen: document.getElementById("keepInScreenInput"),
  messagesClear: document.getElementById("messagesClearButton"),
  messagesFriend: document.getElementById("messagesFriendSelect"),
  messagesFriendAvatar: document.getElementById("messagesFriendAvatarImage"),
  messagesFriendMeta: document.getElementById("messagesFriendMeta"),
  messagesFriendName: document.getElementById("messagesFriendName"),
  messagesFriendStatus: document.getElementById("messagesFriendStatus"),
  messagesList: document.getElementById("messagesList"),
  messagesQuickReply: document.getElementById("messagesQuickReplyInput"),
  messagesQuickReplyCount: document.getElementById("messagesQuickReplyCount"),
  messagesQuickMessages: document.getElementById("messagesQuickMessages"),
  messagesSend: document.getElementById("messagesSendButton"),
  notes: document.getElementById("notesInput"),
  openPetsFolder: document.getElementById("openPetsFolderButton"),
  opacity: document.getElementById("opacityInput"),
  opacityText: document.getElementById("opacityText"),
  passThrough: document.getElementById("passThroughInput"),
  personality: document.getElementById("personalityInput"),
  petName: document.getElementById("petNameInput"),
  privacyAllowIncoming: document.getElementById("privacyAllowIncomingInput"),
  privacyApply: document.getElementById("privacyApplyButton"),
  privacyBlockFriend: document.getElementById("privacyBlockFriendButton"),
  privacyClearMessages: document.getElementById("privacyClearMessagesButton"),
  privacyDoNotDisturb: document.getElementById("privacyDoNotDisturbInput"),
  privacyFriend: document.getElementById("privacyFriendSelect"),
  privacyFriendMute: document.getElementById("privacyFriendMuteInput"),
  privacyHidePresence: document.getElementById("privacyHidePresenceInput"),
  privacyRemoveFriend: document.getElementById("privacyRemoveFriendButton"),
  privacyStatus: document.getElementById("privacyStatusSelect"),
  privacySummaryIncoming: document.getElementById("privacySummaryIncoming"),
  privacySummaryPresence: document.getElementById("privacySummaryPresence"),
  privacySummaryQuiet: document.getElementById("privacySummaryQuiet"),
  privacySummaryState: document.getElementById("privacySummaryState"),
  saveButton: document.getElementById("saveButton"),
  scale: document.getElementById("scaleInput"),
  scaleText: document.getElementById("scaleText"),
  showName: document.getElementById("showNameInput"),
  statusText: document.getElementById("statusText"),
  taskbarVisible: document.getElementById("taskbarVisibleInput"),
  testGreeting: document.getElementById("testGreetingButton"),
  testWeather: document.getElementById("testWeatherButton"),
  topmost: document.getElementById("topmostInput"),
  weatherCity: document.getElementById("weatherCityInput"),
  toastContainer: document.getElementById("toastContainer"),
};

let latestPackages = [];
let latestConnectFriends = [];
let latestConnectView = {};
let diyPromptMode = "single";
let advancedMode = false;
let scalePreviewTimer = 0;

const REPLICA_ASSET_BASE = "./assets/friend-hub";
const REPLICA_FRIEND_VISUALS = [
  {
    avatar: `${REPLICA_ASSET_BASE}/avatar-kai.png`,
    heroAvatar: `${REPLICA_ASSET_BASE}/hero-kai-avatar.png`,
    pet: `${REPLICA_ASSET_BASE}/pet-kai.png`,
    names: ["kai", "milo"],
    note: "Studying · might reply late",
  },
  {
    avatar: `${REPLICA_ASSET_BASE}/avatar-mina.png`,
    heroAvatar: `${REPLICA_ASSET_BASE}/avatar-mina.png`,
    pet: `${REPLICA_ASSET_BASE}/pet-mina.png`,
    names: ["mina", "nori"],
    note: "Online",
  },
  {
    avatar: `${REPLICA_ASSET_BASE}/avatar-noah.png`,
    heroAvatar: `${REPLICA_ASSET_BASE}/avatar-noah.png`,
    pet: `${REPLICA_ASSET_BASE}/pet-noah.png`,
    names: ["noah", "pudding"],
    note: "Away",
  },
  {
    avatar: `${REPLICA_ASSET_BASE}/avatar-haeun.png`,
    heroAvatar: `${REPLICA_ASSET_BASE}/avatar-haeun.png`,
    pet: `${REPLICA_ASSET_BASE}/pet-haeun.png`,
    names: ["haeun"],
    note: "Last seen 2h ago",
  },
  {
    avatar: `${REPLICA_ASSET_BASE}/avatar-jisoo.png`,
    heroAvatar: `${REPLICA_ASSET_BASE}/avatar-jisoo.png`,
    pet: `${REPLICA_ASSET_BASE}/pet-jisoo.png`,
    names: ["jisoo"],
    note: "Offline",
  },
];

function setStatus(text, level) {
  elements.statusText.textContent = text;
  if (level === "success" || level === "error" || level === "info") {
    showToast(text, level);
    return;
  }
  if (!text) return;
  // Auto-detect success/error from text patterns (terminal states only)
  if (text.includes("失败") || text.includes("无法") || text.includes("错误")) {
    showToast(text, "error");
  } else if (text.includes("已") || text.includes("成功") || text.includes("完成")) {
    showToast(text, "success");
  }
}

function showToast(text, type = "info") {
  if (!elements.toastContainer || !text) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = text;
  elements.toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast-visible"));
  const linger = type === "error" ? 4200 : 2800;
  window.setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-leaving");
    window.setTimeout(() => toast.remove(), 280);
  }, linger);
  // Cap stack at 4 most-recent toasts
  while (elements.toastContainer.children.length > 4) {
    elements.toastContainer.firstElementChild.remove();
  }
}

let dirty = false;
function markDirty() {
  if (dirty) return;
  dirty = true;
  elements.saveButton?.classList.add("btn-dirty");
}
function clearDirty() {
  dirty = false;
  elements.saveButton?.classList.remove("btn-dirty");
}

function sourceLabel(source) {
  return source === "custom" ? "自定义" : "内置";
}

function emotionLabel(value) {
  const number = Number(value);
  if (number < 0.25) return "安静";
  if (number < 0.6) return "普通";
  if (number < 0.85) return "活跃";
  return "很活跃";
}

function formatRecentMessage(message) {
  if (!message) return "暂无来信";
  const friend = message.friendPetName || message.friendName || "朋友的陪伴形象";
  const prefix = message.direction === "outgoing"
    ? "最近发送"
    : (message.muted ? "最近静默来信" : "最近来信");
  return `${prefix}：${friend} 说「${message.text || ""}」`;
}

function connectionStateLabel(state) {
  const map = {
    connected: "已连接",
    connecting: "连接中",
    disabled: "已关闭",
    disconnected: "未连接",
    error: "连接错误",
    unregistered: "未注册",
  };
  return map[state] || state || "未连接";
}

function connectionStateTone(state) {
  if (state === "connected" || state === "connecting" || state === "error") return state;
  return "disconnected";
}

function friendStatusLabel(friend) {
  const status = friend.online ? friend.status : "offline";
  const statusMap = {
    away: "离开",
    dnd: "勿扰",
    focus: "专注",
    offline: "离线",
    online: "在线",
  };
  return statusMap[status] || status;
}

function profileStatusLabel(status) {
  const statusMap = {
    away: "离开",
    dnd: "勿扰",
    focus: "专注",
    online: "在线",
  };
  return statusMap[status] || "在线";
}

function relationshipLabel(friend) {
  return friend.relationshipLabel || "好友";
}

function packageById(packageId) {
  return latestPackages.find((item) => item.id === packageId) || null;
}

function friendTitle(friend) {
  return friend.localAlias || friend.petName || friend.displayName || "朋友的陪伴形象";
}

function friendSubtitle(friend) {
  const presence = friend.online ? "在桌面上" : "暂时离线";
  const boundPackage = packageById(friend.boundPetId);
  const boundText = boundPackage ? `已绑定 ${boundPackage.displayName}` : "未绑定形象";
  const serverName = friend.localAlias && friend.petName ? friend.petName : friend.displayName;
  return serverName
    ? `${relationshipLabel(friend)} · ${serverName} · ${boundText} · ${presence}`
    : `${relationshipLabel(friend)} · ${boundText} · ${presence}`;
}

function friendLabel(friend) {
  return `${friendTitle(friend)} (${relationshipLabel(friend)}) · ${friendStatusLabel(friend)}`;
}

function friendInitial(friend) {
  const text = friendTitle(friend).trim();
  return text ? text.slice(0, 1).toUpperCase() : "友";
}

function updateMessageCount() {
  elements.connectMessageCount.textContent = `${elements.connectOutgoingMessage.value.length}/140`;
}

function updateQuickReplyCount() {
  elements.messagesQuickReplyCount.textContent = `${elements.messagesQuickReply.value.length}/140`;
}

function updateHomeMessageCount() {
  elements.homeMessageCount.textContent = `${elements.homeMessage.value.length}/140`;
}

function updateHomeMessageHelper() {
  if (!elements.homeMessageHelper) return;
  const friend = selectedHomeFriend();
  const text = elements.homeMessage.value.trim();
  if (!latestConnectFriends.length) {
    elements.homeMessageHelper.textContent = "One close person is enough to begin.";
    elements.homeMessageHelper.dataset.state = "empty";
    return;
  }
  if (!text) {
    elements.homeMessageHelper.textContent = `A small note for ${friend ? friendTitle(friend) : "your friend"}.`;
    elements.homeMessageHelper.dataset.state = "idle";
    return;
  }
  elements.homeMessageHelper.textContent = `Ready for ${friend ? friendTitle(friend) : "your friend"}.`;
  elements.homeMessageHelper.dataset.state = "ready";
}

function updateSendButtonStates() {
  const hasFriends = Boolean(latestConnectFriends.length);
  elements.homeSend.disabled = !hasFriends || !elements.homeMessage.value.trim();
  elements.connectSendMessage.disabled = !hasFriends || !elements.connectOutgoingMessage.value.trim();
  elements.messagesSend.disabled = !hasFriends || !elements.messagesQuickReply.value.trim();
  updateHomeMessageHelper();
}

function activePanelName() {
  return document.querySelector(".panel.active")?.dataset.panel || "home";
}

function selectedConnectFriend() {
  return latestConnectFriends.find((friend) => friend.userId === elements.connectFriend.value) || null;
}

function selectedHomeFriend() {
  return latestConnectFriends.find((friend) => friend.userId === elements.homeFriend.value) || null;
}

function selectedPrivacyFriend() {
  return latestConnectFriends.find((friend) => friend.userId === elements.privacyFriend.value) || null;
}

function setRelationshipEditorEnabled(enabled) {
  elements.connectRelationshipLabel.disabled = !enabled;
  elements.connectFriendAlias.disabled = !enabled;
  elements.connectFriendNote.disabled = !enabled;
  elements.connectFriendMute.disabled = !enabled;
}

function updateConnectAcceptInviteState() {
  const code = elements.connectAcceptInvite.value.trim();
  elements.connectAcceptInviteButton.disabled = code.length < 4;
}

function updateConnectSummary(connect = sanitizeConnectView()) {
  elements.connectSummaryState.textContent = connectionStateLabel(connect.connectionState);
  elements.connectSummaryFriendCount.textContent = String(latestConnectFriends.length);
  elements.connectSummaryInvite.textContent = connect.inviteCode ? "已生成" : "未生成";
}

function updatePrivacySummary() {
  elements.privacySummaryState.textContent = profileStatusLabel(elements.privacyStatus.value);
  elements.privacySummaryIncoming.textContent = elements.privacyAllowIncoming.checked ? "允许" : "关闭";
  elements.privacySummaryQuiet.textContent = elements.privacyDoNotDisturb.checked ? "开启" : "关闭";
  elements.privacySummaryPresence.textContent = elements.privacyHidePresence.checked ? "隐藏" : "可见";
}

function sanitizeConnectView() {
  return {
    connectionState: elements.connectStateBadge?.dataset.state || "disconnected",
    inviteCode: elements.connectInviteCode?.value && elements.connectInviteCode.value !== "尚未生成"
      ? elements.connectInviteCode.value
      : "",
  };
}

function updateHomeStartStrip(connect = latestConnectView) {
  if (!elements.homeStartStrip) return;
  latestConnectView = { ...latestConnectView, ...connect };
  const selectedFriend = selectedHomeFriend() || latestConnectFriends[0] || null;
  const connectionState = latestConnectView.connectionState || "disconnected";
  const tone = connectionStateTone(connectionState);
  elements.homeStartStrip.dataset.state = tone;

  if (!latestConnectView.userId) {
    elements.homeStartTitle.textContent = "Connect this computer";
    elements.homeStartHint.textContent = "Give this desktop a quiet place in your private circle.";
    elements.homeStartAction.textContent = "Connect";
    elements.homeStartAction.dataset.action = "connect";
    return;
  }

  if (connectionState !== "connected") {
    elements.homeStartTitle.textContent = `Service ${connectionStateLabel(connectionState)}`;
    elements.homeStartHint.textContent = "Bring your circle back online.";
    elements.homeStartAction.textContent = "Reconnect";
    elements.homeStartAction.dataset.action = "connect";
    return;
  }

  if (!latestConnectFriends.length) {
    elements.homeStartTitle.textContent = "Bring one person in";
    elements.homeStartHint.textContent = "A private code keeps this space intentional.";
    elements.homeStartAction.textContent = "Invite";
    elements.homeStartAction.dataset.action = "invite";
    return;
  }

  if (selectedFriend && !selectedFriend.boundPetId) {
    elements.homeStartTitle.textContent = `${friendTitle(selectedFriend)} is here`;
    elements.homeStartHint.textContent = "Shape the desktop presence so it feels unmistakably like them.";
    elements.homeStartAction.textContent = "Create look";
    elements.homeStartAction.dataset.action = "create";
    return;
  }

  elements.homeStartTitle.textContent = selectedFriend
    ? `${friendTitle(selectedFriend)} is close by`
    : "Your circle is close by";
  elements.homeStartHint.textContent = "Send something small when the moment feels right.";
  elements.homeStartAction.textContent = "Write note";
  elements.homeStartAction.dataset.action = "compose";
}

function fillRelationshipEditor(friend) {
  setRelationshipEditorEnabled(Boolean(friend));
  elements.connectRelationshipLabel.value = friend?.relationshipLabel || "好友";
  elements.connectFriendAlias.value = friend?.localAlias || "";
  elements.connectFriendNote.value = friend?.localNote || "";
  elements.connectFriendMute.checked = Boolean(friend?.muted);
}

function syncRelationshipEditorToSelectedFriend() {
  const selectedId = elements.connectFriend.value;
  if (!selectedId) return;
  latestConnectFriends = latestConnectFriends.map((friend) => {
    if (friend.userId !== selectedId) return friend;
    return {
      ...friend,
      localAlias: elements.connectFriendAlias.value.trim(),
      localNote: elements.connectFriendNote.value.trim(),
      muted: elements.connectFriendMute.checked,
      relationshipLabel: elements.connectRelationshipLabel.value.trim() || "好友",
    };
  });
}

function syncPrivacyMuteToSelectedFriend() {
  const selectedId = elements.privacyFriend.value;
  if (!selectedId) return;
  latestConnectFriends = latestConnectFriends.map((friend) => (
    friend.userId === selectedId
      ? { ...friend, muted: elements.privacyFriendMute.checked }
      : friend
  ));
}

function fillPrivacyFriendMute(friend) {
  elements.privacyFriendMute.disabled = !friend;
  elements.privacyRemoveFriend.disabled = !friend;
  elements.privacyBlockFriend.disabled = !friend;
  elements.privacyFriendMute.checked = Boolean(friend?.muted);
}

function selectedMessageFriend() {
  return latestConnectFriends.find((friend) => friend.userId === elements.messagesFriend.value) || null;
}

function selectedDiyFriend() {
  return latestConnectFriends.find((friend) => friend.userId === elements.diyFriend.value) || null;
}

function selectedDiyPackage() {
  return packageById(elements.diyPet.value) || latestPackages[0] || null;
}

function packagePortraitSource(petPackage) {
  return petPackage?.portraitUrl || petPackage?.previewUrl || petPackage?.spriteUrl || "";
}

function friendVisual(friend, index = 0) {
  const haystack = [
    friend?.localAlias,
    friend?.petName,
    friend?.displayName,
    friend?.relationshipLabel,
  ].filter(Boolean).join(" ").toLowerCase();
  return REPLICA_FRIEND_VISUALS.find((visual) =>
    visual.names.some((name) => haystack.includes(name))
  ) || REPLICA_FRIEND_VISUALS[index % REPLICA_FRIEND_VISUALS.length];
}

function visualForMessage(message) {
  if (message?.direction === "outgoing") {
    return {
      avatar: `${REPLICA_ASSET_BASE}/avatar-mina.png`,
      heroAvatar: `${REPLICA_ASSET_BASE}/avatar-mina.png`,
      pet: `${REPLICA_ASSET_BASE}/pet-mina.png`,
    };
  }
  const friend = latestConnectFriends.find((item) => {
    const text = `${item.localAlias || ""} ${item.petName || ""} ${item.displayName || ""}`.toLowerCase();
    const target = `${message?.friendPetName || ""} ${message?.friendName || ""}`.toLowerCase();
    return target && text && target.split(/\s+/).some((word) => word && text.includes(word));
  });
  const index = Math.max(0, latestConnectFriends.indexOf(friend));
  return friendVisual(friend, index);
}

function replicaStatusText(friend) {
  if (!friend?.online) {
    if (friend?.status === "away") return "Away";
    return "Last seen 2h ago";
  }
  if (friend.status === "focus") return "Focus";
  if (friend.status === "away") return "Away";
  return "On desktop";
}

function formatReplicaTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function setDiyControlsEnabled(enabled) {
  elements.diyFriend.disabled = !enabled;
  elements.diyPet.disabled = !enabled || !latestPackages.length;
  elements.diyRelationshipLabel.disabled = !enabled;
  elements.diyApplyBinding.disabled = !enabled || !latestPackages.length;
}

function updateDiyPreview() {
  const friend = selectedDiyFriend();
  const petPackage = selectedDiyPackage();
  const hasBinding = Boolean(friend?.boundPetId);
  setImageSource(elements.diyBindingPreviewImage, packagePortraitSource(petPackage));
  elements.diyBindingStatus.textContent = hasBinding ? "已绑定" : "未绑定";
  elements.diyBindingStatus.dataset.state = hasBinding ? "connected" : "disconnected";
  elements.diyBindingTitle.textContent = friend
    ? `${friendTitle(friend)} (${elements.diyRelationshipLabel.value || relationshipLabel(friend)})`
    : "请选择一个关系对象";
  elements.diyBindingMeta.textContent = friend && petPackage
    ? `${petPackage.displayName} 将作为这个关系对象在界面中的陪伴形象。`
    : "选择关系对象和形象包后，点击绑定并保存。";
}

function fillDiyControls(selectedFriendId, activePetId) {
  const hasFriends = Boolean(latestConnectFriends.length);
  elements.diyFriend.replaceChildren(
    ...(hasFriends ? latestConnectFriends : [{ userId: "", petName: "还没有关系对象", relationshipLabel: "好友" }]).map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.diyPet.replaceChildren(
    ...latestPackages.map((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.displayName} · ${sourceLabel(item.source)}`;
      return option;
    }),
  );
  const selectedFriend = latestConnectFriends.find((friend) => friend.userId === selectedFriendId) || latestConnectFriends[0];
  elements.diyFriend.value = selectedFriend?.userId || "";
  elements.diyRelationshipLabel.value = selectedFriend?.relationshipLabel || "好友";
  elements.diyPet.value = selectedFriend?.boundPetId || activePetId || latestPackages[0]?.id || "";
  setDiyControlsEnabled(hasFriends);
  updateDiyPreview();
}

function syncDiyRelationshipToSelectedFriend() {
  const selectedId = elements.diyFriend.value;
  if (!selectedId) return;
  latestConnectFriends = latestConnectFriends.map((friend) => (
    friend.userId === selectedId
      ? { ...friend, relationshipLabel: elements.diyRelationshipLabel.value.trim() || "好友" }
      : friend
  ));
}

function applyDiyBinding() {
  const selectedId = elements.diyFriend.value;
  const petPackage = selectedDiyPackage();
  if (!selectedId || !petPackage) return;
  latestConnectFriends = latestConnectFriends.map((friend) => (
    friend.userId === selectedId
      ? {
        ...friend,
        boundPetId: petPackage.id,
        relationshipLabel: elements.diyRelationshipLabel.value.trim() || friend.relationshipLabel || "好友",
      }
      : friend
  ));
  if (elements.connectFriend.value === selectedId) {
    fillRelationshipEditor(selectedConnectFriend());
  }
  refreshFriendPresentation();
  updateDiyPreview();
  setStatus("关系形象已绑定，点击保存后生效。");
}

function selectDiyFriend() {
  const friend = selectedDiyFriend();
  elements.diyRelationshipLabel.value = friend?.relationshipLabel || "好友";
  elements.diyPet.value = friend?.boundPetId || elements.activePetSelect.value || latestPackages[0]?.id || "";
  updateDiyPreview();
}

function imageStyleInstruction(style) {
  const map = {
    "app-asset": [
      "Create a polished commercial-grade app visual asset, not a mascot and not a random illustration.",
      "The image should feel warm, refined, relationship-centered, and suitable for a premium consumer software product.",
      "No text, no UI mockup, no computer, no phone, no chat bubble.",
    ],
    "premium-pixel": [
      "Create a beautiful premium pixel-art relationship desktop companion character.",
      "The character should be small-icon readable, emotionally warm, and suitable for a desktop companion sprite pipeline.",
      "Use a clean transparent-background-friendly composition with full body visible and no cropped edges.",
    ],
    "soft-avatar": [
      "Create a refined warm avatar-like relationship companion image.",
      "The visual should feel personal, calm, intimate, and high-end, with clear silhouette and polished lighting.",
      "No exaggerated cartoon style, no childish mascot, no animal features.",
    ],
  };
  return map[style] || map["premium-pixel"];
}

function buildGptImagePrompt() {
  const friend = selectedDiyFriend();
  const relation = elements.diyRelationshipLabel.value.trim() || friend?.relationshipLabel || "close friend";
  const name = friendTitle(friend || {});
  const brief = elements.diyImageBrief.value.trim() || "warm, elegant, clean, emotionally close, suitable as a long-term desktop companion";
  const styleLines = imageStyleInstruction(elements.diyImageStyle.value);
  return [
    "Use gpt-image2 to generate a single beautiful production-quality image.",
    "",
    "Product context:",
    "This image is for a relationship-based desktop companion app. The app lets a user turn someone important, such as a partner, close friend, or loved one, into a personalized connected desktop presence.",
    "",
    "Subject:",
    `Create a relationship companion visual for: ${name}.`,
    `Relationship label: ${relation}.`,
    `User-provided visual direction: ${brief}.`,
    "",
    "Art direction:",
    ...styleLines,
    "Warm color palette, refined details, commercial app quality, memorable silhouette, clean edges, balanced composition.",
    "The result should be beautiful enough for a real shipped product, not placeholder art.",
    "",
    "Strict constraints:",
    "No animals, no pets, no paw prints, no cats, no dogs, no animal ears, no mascot creature.",
    "No heart shape, no hugging, no computer, no monitor, no phone, no app screen.",
    "No text, no logo lettering, no watermarks, no clutter, no neon cyberpunk style.",
    "Avoid generic stock illustration. Keep it warm, intimate, polished, and relationship-centered.",
    "",
    "Output goal:",
    "A clean image that can later be imported, previewed, validated, and bound to this relationship object inside the app.",
  ].join("\n");
}

function buildGptActionPrompt() {
  const friend = selectedDiyFriend();
  const relation = elements.diyRelationshipLabel.value.trim() || friend?.relationshipLabel || "close friend";
  const name = friendTitle(friend || {});
  const brief = elements.diyImageBrief.value.trim() || "warm, elegant, clean, emotionally close, suitable as a long-term desktop companion";
  return [
    "Use gpt-image2 only. Generate a set of separate high-quality images for a relationship-based desktop companion app.",
    "",
    "Product context:",
    "The user turns someone important into a connected desktop presence. These images will be imported into the app as a multi-action relationship desktop companion package.",
    "",
    "Subject consistency:",
    `Character/person presence: ${name}.`,
    `Relationship label: ${relation}.`,
    `Visual direction: ${brief}.`,
    "Keep the same identity, outfit, colors, proportions, and silhouette across every generated image.",
    "",
    "Generate separate images for these actions and save them with these file names:",
    "1. idle.png - calm standing or gentle presence, neutral and warm.",
    "2. wave.png - greeting or saying hello, friendly and expressive.",
    "3. receive-message.png - receiving or delivering a short message, subtle excitement, no chat bubble.",
    "4. jump.png - small happy motion, joyful but not childish.",
    "5. sleep.png - quiet companionship, calm resting pose.",
    "",
    "Art direction:",
    "Beautiful premium pixel-art or clean app-character style, depending on the chosen visual direction.",
    "Transparent-background-friendly composition, full body visible, centered, no cropped edges.",
    "Commercial product quality, warm refined color palette, crisp silhouette, readable at small desktop companion size.",
    "",
    "Strict constraints:",
    "No animals, no pets, no paw prints, no cats, no dogs, no animal ears, no mascot creature.",
    "No heart shape, no hugging, no computer, no monitor, no phone, no app screen.",
    "No text, no logo lettering, no watermarks, no chat bubbles, no busy background.",
    "Do not use scripts or non-gpt-image generation. The images must be generated by gpt-image2.",
    "",
    "Import requirement:",
    "After generation, place the files in one folder with the names above. The app will import that folder, compose a validated multi-action companion package, and bind it to this relationship object.",
  ].join("\n");
}

function prepareGptImagePrompt() {
  diyPromptMode = "single";
  elements.diyImagePromptOutput.value = buildGptImagePrompt();
  setStatus("gpt-image2 提示词已生成。只能用 gpt-image2 生图，生成后请导入结果。");
}

function prepareGptActionPrompt() {
  diyPromptMode = "actions";
  elements.diyImagePromptOutput.value = buildGptActionPrompt();
  setStatus("gpt-image2 多动作提示词已生成。生成后请保存为指定文件名并导入文件夹。");
}

function refreshPreparedPrompt() {
  if (!elements.diyImagePromptOutput.value) return;
  if (diyPromptMode === "actions") {
    prepareGptActionPrompt();
  } else {
    prepareGptImagePrompt();
  }
}

async function copyGptImagePrompt() {
  if (!elements.diyImagePromptOutput.value.trim()) prepareGptImagePrompt();
  elements.diyCopyImagePrompt.disabled = true;
  try {
    await window.preferencesPet.copyText(elements.diyImagePromptOutput.value);
    setStatus("gpt-image2 提示词已复制。");
  } catch (_error) {
    setStatus("复制失败，请重新生成提示词。");
  } finally {
    elements.diyCopyImagePrompt.disabled = false;
  }
}

function setImageSource(image, source) {
  if (!image || !source) return;
  image.src = source;
}

function renderFriendList(friends, selectedFriendId) {
  if (!friends.length) {
    const empty = document.createElement("div");
    empty.className = "empty-list";
    empty.textContent = "还没有关系对象，先生成邀请码或输入对方的邀请码。";
    elements.connectFriendList.replaceChildren(empty);
    return;
  }

  const rows = friends.map((friend) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "friend-row";
    row.classList.toggle("active", friend.userId === selectedFriendId);
    row.setAttribute("role", "listitem");

    const avatar = document.createElement("span");
    avatar.className = "friend-avatar";
    avatar.textContent = friendInitial(friend);

    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.className = "friend-name";
    name.textContent = friendTitle(friend);
    const subtitle = document.createElement("span");
    subtitle.className = "friend-subtitle";
    subtitle.textContent = friendSubtitle(friend);
    copy.append(name, subtitle);

    const status = document.createElement("span");
    status.className = "friend-status";
    status.dataset.online = String(Boolean(friend.online));
    status.textContent = friendStatusLabel(friend);

    row.append(avatar, copy, status);
    row.addEventListener("click", () => {
      syncRelationshipEditorToSelectedFriend();
      elements.connectFriend.value = friend.userId;
      elements.homeFriend.value = friend.userId;
      fillRelationshipEditor(friend);
      updateHomeCompanionPreview();
      renderHomeFriendList(latestConnectFriends, friend.userId);
      elements.connectFriendList.querySelectorAll(".friend-row").forEach((item) => {
        item.classList.toggle("active", item === row);
      });
      setStatus(`已选择 ${friendTitle(friend)}，可以发送短消息。`);
    });
    return row;
  });
  elements.connectFriendList.replaceChildren(...rows);
}

function friendSearchText(friend) {
  return [
    friendTitle(friend),
    friend.petName,
    friend.displayName,
    relationshipLabel(friend),
    friend.localNote,
  ].filter(Boolean).join(" ").toLowerCase();
}

function friendPackagePreview(friend) {
  const activePackage = packageById(elements.activePetSelect.value) || latestPackages[0] || null;
  const boundPackage = friend?.boundPetId ? packageById(friend.boundPetId) : null;
  return packagePortraitSource(boundPackage) || packagePortraitSource(activePackage);
}

function createHomeEmptyState() {
  const card = document.createElement("article");
  card.className = "home-empty-card";

  const icon = document.createElement("img");
  icon.src = `${REPLICA_ASSET_BASE}/icon-invite-row.svg`;
  icon.alt = "";

  const title = document.createElement("strong");
  title.textContent = "Start with someone real";

  const copy = document.createElement("p");
  copy.textContent = "A private invite turns this space into something shared.";

  const actions = document.createElement("div");
  actions.className = "home-empty-actions";
  const invite = document.createElement("button");
  invite.type = "button";
  invite.className = "home-empty-primary";
  invite.textContent = "Add by Invite";
  invite.addEventListener("click", openHomeInviteDialog);

  const make = document.createElement("button");
  make.type = "button";
  make.className = "home-empty-secondary";
  make.textContent = "Create Companion";
  make.addEventListener("click", () => showPanel("diy"));

  actions.append(invite, make);
  card.append(icon, title, copy, actions);
  return card;
}

function renderHomeFriendList(friends, selectedFriendId) {
  const query = elements.homeFriendSearch?.value.trim().toLowerCase() || "";
  const visibleFriends = query
    ? friends.filter((friend) => friendSearchText(friend).includes(query))
    : friends;

  if (!friends.length) {
    elements.homeFriendList.replaceChildren(createHomeEmptyState());
    return;
  }

  if (!visibleFriends.length) {
    const empty = document.createElement("div");
    empty.className = "empty-list";
    empty.textContent = "没有匹配的朋友。";
    elements.homeFriendList.replaceChildren(empty);
    return;
  }

  const rows = visibleFriends.map((friend, index) => {
    const visual = friendVisual(friend, index);
    const row = document.createElement("button");
    row.type = "button";
    row.className = "home-friend-row";
    row.classList.toggle("active", friend.userId === selectedFriendId);
    row.setAttribute("role", "listitem");

    const avatar = document.createElement("img");
    avatar.className = "home-friend-avatar";
    avatar.alt = "";
    avatar.src = visual.avatar;

    const copy = document.createElement("span");
    copy.className = "home-friend-copy";
    const name = document.createElement("strong");
    name.textContent = friendTitle(friend);
    const status = document.createElement("small");
    status.dataset.online = String(Boolean(friend.online));
    status.innerHTML = `<i></i>${replicaStatusText(friend)}`;
    copy.append(name, status);

    const preview = document.createElement("img");
    preview.className = "home-friend-companion";
    preview.alt = "";
    preview.src = visual.pet;

    row.append(avatar, copy, preview);
    row.addEventListener("click", () => {
      elements.homeFriend.value = friend.userId;
      selectHomeFriend();
    });
    return row;
  });

  elements.homeFriendList.replaceChildren(...rows);
}

function createHomeRecentEmptyState() {
  const hasFriends = Boolean(latestConnectFriends.length);
  const friend = selectedHomeFriend() || latestConnectFriends[0] || null;
  const card = document.createElement("article");
  card.className = "home-recent-empty";

  const glow = document.createElement("span");
  glow.className = "home-recent-empty-mark";

  const copy = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = hasFriends
    ? `No moments with ${friend ? friendTitle(friend) : "this person"} yet`
    : "A quiet space for someone real";
  const text = document.createElement("p");
  text.textContent = hasFriends
    ? "The first small note will live here."
    : "Start with one person you actually care about.";
  copy.append(title, text);

  const action = document.createElement("button");
  action.type = "button";
  action.textContent = hasFriends ? "Write note" : "Invite";
  action.addEventListener("click", () => {
    if (hasFriends) {
      elements.homeMessage.focus();
      setStatus("可以写一句很短的话。", "info");
      return;
    }
    openHomeInviteDialog();
  });

  card.append(glow, copy, action);
  return card;
}

function renderHomeRecentMoments(messages = []) {
  const rows = messages.slice(0, 5).map((message) => {
    const visual = visualForMessage(message);
    const row = document.createElement("article");
    row.className = "home-recent-row";
    row.dataset.direction = message.direction === "outgoing" ? "outgoing" : "incoming";

    const avatar = document.createElement("img");
    avatar.className = "home-recent-avatar";
    avatar.alt = "";
    avatar.src = visual.avatar;

    const copy = document.createElement("div");
    copy.className = "home-recent-copy";

    const who = document.createElement("strong");
    who.textContent = message.direction === "outgoing" ? "You" : (message.friendPetName || message.friendName || "Kai");

    const text = document.createElement("p");
    text.textContent = message.text || "";
    copy.append(who, text);

    const meta = document.createElement("small");
    meta.className = "home-recent-meta";
    meta.textContent = formatReplicaTime(message.receivedAt);
    const marker = document.createElement("i");
    marker.className = "home-message-marker";
    meta.append(marker);

    row.append(avatar, copy, meta);
    return row;
  });

  if (!rows.length) {
    elements.homeRecentMoments.replaceChildren(createHomeRecentEmptyState());
    return;
  }

  elements.homeRecentMoments.replaceChildren(...rows);
}

function updateHomeCompanionPreview() {
  const friend = selectedHomeFriend() || latestConnectFriends[0] || null;
  const boundPackage = friend?.boundPetId ? packageById(friend.boundPetId) : null;
  const friendIndex = Math.max(0, latestConnectFriends.findIndex((item) => item.userId === friend?.userId));
  const visual = friendVisual(friend, friendIndex);
  elements.homeMakeAvatar.disabled = !friend;
  elements.homeImportAvatar.disabled = !friend;

  if (!friend) {
    elements.homeCompanionName.textContent = "Add someone close";
    elements.homeCompanionStatus.textContent = "to connect";
    elements.homeCompanionMeta.replaceChildren(
      Object.assign(document.createElement("i"), { className: "presence-dot" }),
      document.createTextNode(" Invite or enter a code"),
    );
    elements.homeCompanionNote.replaceChildren(
      Object.assign(document.createElement("i"), { className: "away-dot" }),
      document.createTextNode(" Their desktop companion will appear here."),
    );
    elements.homeRelationDetail.textContent = "Close friend";
    elements.homeAvatarDetail.textContent = "Waiting";
    setImageSource(elements.homeFriendAvatar, `${REPLICA_ASSET_BASE}/avatar-lena.png`);
    setImageSource(elements.homeCompanionImage, `${REPLICA_ASSET_BASE}/pet-kai.png`);
    elements.homeMessage.placeholder = "Connect a friend first...";
    return;
  }

  elements.homeCompanionName.textContent = friend ? friendTitle(friend) : "Kai";
  elements.homeCompanionStatus.textContent = friend?.online ? "is online" : "is away";
  elements.homeCompanionMeta.replaceChildren(
    Object.assign(document.createElement("i"), { className: "presence-dot" }),
    document.createTextNode(` ${friend?.online ? "On desktop" : replicaStatusText(friend)}`),
  );
  elements.homeCompanionNote.replaceChildren(
    Object.assign(document.createElement("i"), { className: "away-dot" }),
    document.createTextNode(` ${friend?.localNote || visual.note || "Studying · might reply late"}`),
  );
  elements.homeRelationDetail.textContent = friend ? relationshipLabel(friend) : "Partner";
  elements.homeAvatarDetail.textContent = boundPackage ? "On desktop" : "On desktop";
  setImageSource(elements.homeFriendAvatar, visual.heroAvatar);
  setImageSource(elements.homeCompanionImage, visual.pet);
  elements.homeMessage.placeholder = `Write a short note to ${friend ? friendTitle(friend) : "Kai"}...`;
}

function updateRelationshipHome(activePackage, connect, selectedFriendId) {
  latestConnectView = { ...connect };
  elements.homeConnectionBadge.textContent = connectionStateLabel(connect.connectionState);
  elements.homeConnectionBadge.dataset.state = connectionStateTone(connect.connectionState);
  elements.homeConnectionDetail.textContent = connectionStateLabel(connect.connectionState);
  elements.homeSyncText.textContent = connect.userId
    ? "可以用桌面陪伴传话，不需要打开聊天窗口。"
    : "先连接服务，再和对方互换邀请码。";
  elements.homeConnect.textContent = connect.userId ? "重新连接" : "开始连接";
  elements.homeInviteCode.value = connect.inviteCode || "尚未生成";
  elements.homeAcceptInvite.value = connect.pendingInviteCode || "";
  syncHomeInviteDialog(connect);
  elements.homeMessage.value = connect.outgoingMessage || "";
  elements.homeQuiet.checked = Boolean(connect.doNotDisturb);
  elements.homeRecentMessage.textContent = formatRecentMessage(connect.recentMessages?.[0]);
  renderHomeRecentMoments(connect.recentMessages || []);
  updateConnectSummary(connect);

  const selectedId = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
  elements.homeFriend.value = selectedId;
  renderHomeFriendList(latestConnectFriends, selectedId);
  updateHomeMessageCount();
  updateHomeCompanionPreview(activePackage);
  updateHomeStartStrip(connect);
}

function refreshHomeFriendOptions() {
  const selectedFriendId = elements.homeFriend.value || elements.connectFriend.value;
  elements.homeFriend.replaceChildren(
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系对象", relationshipLabel: "好友" }]).map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.homeFriend.disabled = !latestConnectFriends.length;
  elements.homeMessage.disabled = !latestConnectFriends.length;
  elements.homeQuickMessages.querySelectorAll("button").forEach((button) => {
    button.disabled = !latestConnectFriends.length;
  });
  elements.homeFriend.value = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
  renderHomeFriendList(latestConnectFriends, elements.homeFriend.value);
  updateHomeCompanionPreview();
  updateHomeStartStrip();
  updateSendButtonStates();
}

function refreshFriendPresentation() {
  syncRelationshipEditorToSelectedFriend();
  syncPrivacyMuteToSelectedFriend();
  const selectedFriendId = elements.connectFriend.value;
  elements.connectFriend.replaceChildren(
    ...latestConnectFriends.map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.connectFriend.value = selectedFriendId;
  renderFriendList(latestConnectFriends, selectedFriendId);
  refreshHomeFriendOptions();
  refreshDiyFriendOptions();
  refreshMessageFriendOptions();
  refreshPrivacyFriendOptions();
  updateConnectSummary(sanitizeConnectView());
}

function refreshDiyFriendOptions() {
  const selectedFriendId = elements.diyFriend.value;
  elements.diyFriend.replaceChildren(
    ...latestConnectFriends.map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.diyFriend.value = selectedFriendId;
}

function refreshMessageFriendOptions() {
  const selectedFriendId = elements.messagesFriend.value || elements.connectFriend.value;
  elements.messagesFriend.replaceChildren(
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系对象", relationshipLabel: "好友" }]).map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.messagesFriend.disabled = !latestConnectFriends.length;
  elements.messagesQuickReply.disabled = !latestConnectFriends.length;
  elements.messagesQuickMessages.querySelectorAll("button").forEach((button) => {
    button.disabled = !latestConnectFriends.length;
  });
  elements.messagesFriend.value = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
  updateMessagesFriendPreview();
  updateSendButtonStates();
}

function updateMessagesFriendPreview() {
  const friend = selectedMessageFriend();
  const friendIndex = Math.max(0, latestConnectFriends.findIndex((item) => item.userId === friend?.userId));
  const visual = friendVisual(friend, friendIndex);
  if (!friend) {
    setImageSource(elements.messagesFriendAvatar, `${REPLICA_ASSET_BASE}/avatar-lena.png`);
    elements.messagesFriendName.textContent = "先添加一个人";
    elements.messagesFriendMeta.textContent = "添加后即可发送桌面短消息";
    elements.messagesFriendStatus.textContent = "未连接";
    elements.messagesQuickReply.placeholder = "Connect a friend first...";
    return;
  }
  setImageSource(elements.messagesFriendAvatar, visual.avatar);
  elements.messagesFriendName.textContent = friendTitle(friend);
  elements.messagesFriendMeta.textContent = `${relationshipLabel(friend)} · ${replicaStatusText(friend)}`;
  elements.messagesFriendStatus.textContent = friendStatusLabel(friend);
  elements.messagesFriendStatus.dataset.online = String(Boolean(friend.online));
  elements.messagesQuickReply.placeholder = `写一句从你的桌面陪伴发给 ${friendTitle(friend)} 的回复`;
}

function refreshPrivacyFriendOptions() {
  const selectedFriendId = elements.privacyFriend.value || elements.connectFriend.value;
  elements.privacyFriend.replaceChildren(
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系对象", relationshipLabel: "好友" }]).map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.privacyFriend.disabled = !latestConnectFriends.length;
  elements.privacyFriend.value = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
  fillPrivacyFriendMute(selectedPrivacyFriend());
}

function formatMessageTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString("zh-CN", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
  });
}

function renderMessages(messages = []) {
  if (!messages.length) {
    const empty = document.createElement("div");
    empty.className = "empty-list";
    empty.textContent = "还没有消息。收到或发送短消息后，会出现在这里。";
    elements.messagesList.replaceChildren(empty);
    elements.messagesClear.disabled = true;
    elements.privacyClearMessages.disabled = true;
    return;
  }

  const rows = messages.slice(0, 12).map((message) => {
    const visual = visualForMessage(message);
    const row = document.createElement("article");
    row.className = "message-row";
    row.dataset.direction = message.direction === "outgoing" ? "outgoing" : "incoming";

    const avatar = document.createElement("img");
    avatar.className = "message-avatar";
    avatar.alt = "";
    avatar.src = visual.avatar;

    const body = document.createElement("div");
    body.className = "message-body";

    const meta = document.createElement("div");
    meta.className = "message-meta";
    const name = document.createElement("strong");
    name.textContent = message.direction === "outgoing"
      ? `You to ${message.friendPetName || message.friendName || "friend"}`
      : (message.friendPetName || message.friendName || "关系对象");
    const tag = document.createElement("span");
    tag.textContent = message.muted ? "静默" : (message.direction === "outgoing" ? "已发送" : "来信");
    meta.append(name, tag);

    const text = document.createElement("p");
    text.textContent = message.text || "";

    const time = document.createElement("small");
    time.textContent = formatMessageTime(message.receivedAt);

    body.append(meta, text, time);
    row.append(avatar, body);
    return row;
  });
  elements.messagesList.replaceChildren(...rows);
  elements.messagesClear.disabled = false;
  elements.privacyClearMessages.disabled = false;
}

function updateRangeText() {
  elements.emotionFrequencyText.textContent = emotionLabel(elements.emotionFrequency.value);
  elements.hideOnHoverDelayText.textContent = `${Number(elements.hideOnHoverDelay.value).toFixed(2).replace(/\.00$/, "")}s`;
  elements.opacityText.textContent = `${Math.round(Number(elements.opacity.value) * 100)}%`;
  elements.scaleText.textContent = `${Number(elements.scale.value).toFixed(2).replace(/\.00$/, "")}x`;
}

function showPanel(name) {
  const targetTab = document.querySelector(`.sidebar-item[data-tab="${name}"]`);
  if (targetTab?.dataset.advanced === "true" && !advancedMode) {
    setAdvancedMode(true);
  }
  document.body.dataset.activePanel = name;
  document.querySelectorAll(".sidebar-item[data-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === name && tab.dataset.advanced !== "true");
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === name);
  });
}

function setAdvancedMode(enabled) {
  advancedMode = enabled;
  document.body.classList.toggle("advanced-mode", enabled);
  const label = elements.advancedMode.querySelector(".sidebar-item-label");
  if (label) label.textContent = "Settings";
  if (!enabled && document.querySelector(".sidebar-item.active")?.dataset.advanced === "true") {
    showPanel("home");
  }
}

function fillForm(config) {
  const settings = config.settings;
  const connect = settings.petConnect || {};
  const friends = connect.friends || [];
  const selectedFriendId = connect.selectedFriendId || friends[0]?.userId || "";
  latestConnectFriends = friends.map((friend) => ({ ...friend }));
  latestPackages = config.packages;
  const activePackage = config.packages.find((item) => item.id === settings.activePetId);
  elements.activePetText.textContent = activePackage
    ? `${activePackage.displayName} · ${sourceLabel(activePackage.source)}`
    : settings.activePetId;
  elements.activePetSelect.replaceChildren(
    ...config.packages.map((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.displayName} · ${sourceLabel(item.source)}`;
      return option;
    }),
  );
  elements.activePetSelect.value = settings.activePetId;
  fillDiyControls(selectedFriendId, settings.activePetId);
  elements.behaviorEnabled.checked = Boolean(settings.behaviorEnabled);
  elements.birthday.value = settings.petProfile?.birthday || "";
  elements.emotionFrequency.value = String(settings.emotionFrequency ?? 0.35);
  elements.greeting.value = settings.greeting?.text || "";
  elements.hideOnHover.checked = Boolean(settings.hideOnHover);
  elements.hideOnHoverDelay.value = String(settings.hideOnHoverDelay ?? 0.25);
  elements.inputReactions.checked = Boolean(settings.inputReactions);
  elements.keepInScreen.checked = Boolean(settings.keepInScreen);
  elements.notes.value = settings.petProfile?.notes || "";
  elements.opacity.value = String(settings.opacity || 1);
  elements.passThrough.checked = Boolean(settings.passThrough);
  elements.connectEnabled.checked = connect.enabled !== false;
  elements.connectServerBaseUrl.value = connect.serverBaseUrl || "";
  elements.connectDisplayName.value = connect.displayName || "";
  elements.connectStatus.value = connect.status || "online";
  elements.connectAllowIncoming.checked = connect.allowIncoming !== false;
  elements.connectDoNotDisturb.checked = Boolean(connect.doNotDisturb);
  elements.connectConnectionState.value = connectionStateLabel(connect.connectionState);
  elements.connectStateBadge.textContent = connectionStateLabel(connect.connectionState);
  elements.connectStateBadge.dataset.state = connectionStateTone(connect.connectionState);
  elements.connectUserId.value = connect.userId || "尚未注册";
  elements.connectInviteCode.value = connect.inviteCode || "尚未生成";
  elements.connectAcceptInvite.value = connect.pendingInviteCode || "";
  updateConnectAcceptInviteState();
  elements.connectOutgoingMessage.value = connect.outgoingMessage || "你好，我的桌面陪伴来传话。";
  elements.connectFriend.replaceChildren(
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系对象", online: false }]).map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.connectFriend.disabled = !latestConnectFriends.length;
  elements.connectFriend.value = selectedFriendId;
  renderFriendList(latestConnectFriends, selectedFriendId);
  fillRelationshipEditor(latestConnectFriends.find((friend) => friend.userId === selectedFriendId));
  refreshHomeFriendOptions();
  updateRelationshipHome(activePackage, connect, selectedFriendId);
  refreshMessageFriendOptions();
  refreshPrivacyFriendOptions();
  elements.messagesQuickReply.value = connect.outgoingMessage || "";
  elements.privacyAllowIncoming.checked = connect.allowIncoming !== false;
  elements.privacyDoNotDisturb.checked = Boolean(connect.doNotDisturb);
  elements.privacyHidePresence.checked = Boolean(connect.hidePresence);
  elements.privacyStatus.value = connect.status || "online";
  elements.connectTestFriendPetName.value = connect.testFriend?.petName || "测试朋友";
  elements.connectTestFriendMessageInput.value = connect.testFriend?.outgoingMessage || "我是真实测试朋友，这条消息走的是服务器。";
  elements.connectRecentMessageText.textContent = formatRecentMessage(connect.recentMessages?.[0]);
  updateConnectSummary(connect);
  updatePrivacySummary();
  renderMessages(connect.recentMessages || []);
  elements.personality.value = settings.petProfile?.personality || "";
  elements.petName.value = settings.petName || "";
  elements.scale.value = String(settings.scale || 1);
  elements.showName.checked = Boolean(settings.showName);
  elements.taskbarVisible.checked = Boolean(settings.taskbarVisible);
  elements.topmost.checked = Boolean(settings.topmost);
  elements.weatherCity.value = settings.weather?.city || "Shanghai";
  updateMessageCount();
  updateQuickReplyCount();
  updateSendButtonStates();
  updateRangeText();
}

function syncHomeToConnectWhenActive() {
  if (activePanelName() !== "home") return;
  elements.connectAcceptInvite.value = elements.homeAcceptInvite.value.trim();
  elements.connectOutgoingMessage.value = elements.homeMessage.value;
  elements.messagesQuickReply.value = elements.homeMessage.value;
  elements.connectDoNotDisturb.checked = elements.homeQuiet.checked;
  elements.privacyDoNotDisturb.checked = elements.homeQuiet.checked;
  if (elements.homeFriend.value) {
    elements.connectFriend.value = elements.homeFriend.value;
    elements.messagesFriend.value = elements.homeFriend.value;
    elements.diyFriend.value = elements.homeFriend.value;
  }
}

function collectPatch() {
  const savingFromHome = activePanelName() === "home";
  syncHomeToConnectWhenActive();
  if (!savingFromHome) {
    syncRelationshipEditorToSelectedFriend();
    syncDiyRelationshipToSelectedFriend();
    syncPrivacyMuteToSelectedFriend();
  }
  return {
    activePetId: elements.activePetSelect.value,
    behaviorEnabled: elements.behaviorEnabled.checked,
    emotionFrequency: Number(elements.emotionFrequency.value),
    greeting: {
      text: elements.greeting.value,
    },
    hideOnHover: elements.hideOnHover.checked,
    hideOnHoverDelay: Number(elements.hideOnHoverDelay.value),
    inputReactions: elements.inputReactions.checked,
    keepInScreen: elements.keepInScreen.checked,
    opacity: Number(elements.opacity.value),
    passThrough: elements.passThrough.checked,
    petConnect: {
      allowIncoming: elements.privacyAllowIncoming.checked,
      displayName: elements.connectDisplayName.value,
      doNotDisturb: elements.privacyDoNotDisturb.checked,
      enabled: elements.connectEnabled.checked,
      friends: latestConnectFriends,
      hidePresence: elements.privacyHidePresence.checked,
      outgoingMessage: elements.connectOutgoingMessage.value,
      pendingInviteCode: elements.connectAcceptInvite.value,
      selectedFriendId: elements.connectFriend.value,
      serverBaseUrl: elements.connectServerBaseUrl.value,
      status: elements.privacyStatus.value,
      testFriend: {
        outgoingMessage: elements.connectTestFriendMessageInput.value,
        petName: elements.connectTestFriendPetName.value,
      },
    },
    petName: elements.petName.value,
    petProfile: {
      birthday: elements.birthday.value,
      notes: elements.notes.value,
      personality: elements.personality.value,
    },
    scale: Number(elements.scale.value),
    showName: elements.showName.checked,
    taskbarVisible: elements.taskbarVisible.checked,
    topmost: elements.topmost.checked,
    weather: {
      city: elements.weatherCity.value,
    },
  };
}

async function save() {
  elements.saveButton.disabled = true;
  elements.saveButton.dataset.loading = "true";
  setStatus("正在保存...");
  try {
    const nextConfig = await window.preferencesPet.save(collectPatch());
    fillForm(nextConfig);
    clearDirty();
    setStatus("已保存，并已同步到桌面陪伴。");
  } catch (_error) {
    setStatus("保存失败，请稍后再试。");
  } finally {
    elements.saveButton.disabled = false;
    delete elements.saveButton.dataset.loading;
  }
}

async function importPetPackage() {
  elements.importPet.disabled = true;
  setStatus("正在导入形象...");
  try {
    const nextConfig = await window.preferencesPet.importPackage();
    fillForm(nextConfig);
    if (nextConfig.importResult?.ok) {
      setStatus("形象已导入，并已切换为当前形象。");
    } else if (nextConfig.importResult?.error) {
      setStatus("导入失败，请检查形象包。");
    } else {
      setStatus("已取消导入。");
    }
  } catch (_error) {
    setStatus("导入失败，请检查形象包。");
  } finally {
    elements.importPet.disabled = false;
  }
}

async function importGeneratedImagePackage() {
  elements.diyImportGeneratedImage.disabled = true;
  setStatus("请选择 gpt-image2 生成的图片结果...");
  try {
    await save();
    const friend = selectedDiyFriend();
    const nextConfig = await window.preferencesPet.importGeneratedImage({
      displayName: friend ? `${friendTitle(friend)} 关系形象` : "gpt-image2 关系形象",
      friendId: elements.diyFriend.value,
      relationshipLabel: elements.diyRelationshipLabel.value,
    });
    fillForm(nextConfig);
    if (nextConfig.generatedImportResult?.ok) {
      setStatus("gpt-image2 结果已导入为形象包，并已绑定到关系对象。");
    } else if (nextConfig.generatedImportResult?.error) {
      setStatus("导入失败，请检查 gpt-image2 图片结果。");
    } else {
      setStatus("已取消导入 gpt-image2 结果。");
    }
  } catch (_error) {
    setStatus("导入失败，请确认选择的是有效图片。");
  } finally {
    elements.diyImportGeneratedImage.disabled = false;
  }
}

async function importGeneratedActionPackage() {
  elements.diyImportGeneratedActions.disabled = true;
  setStatus("请选择包含 gpt-image2 多动作图片的文件夹...");
  try {
    await save();
    const friend = selectedDiyFriend();
    const nextConfig = await window.preferencesPet.importGeneratedActions({
      displayName: friend ? `${friendTitle(friend)} 多动作关系形象` : "gpt-image2 多动作关系形象",
      friendId: elements.diyFriend.value,
      relationshipLabel: elements.diyRelationshipLabel.value,
    });
    fillForm(nextConfig);
    if (nextConfig.generatedActionImportResult?.ok) {
      setStatus("gpt-image2 多动作结果已打包、校验，并绑定到关系对象。");
    } else if (nextConfig.generatedActionImportResult?.error) {
      setStatus("导入失败，请确认文件夹内包含 idle、wave、receive-message 等图片。");
    } else {
      setStatus("已取消导入 gpt-image2 多动作结果。");
    }
  } catch (_error) {
    setStatus("导入失败，请确认选择的是有效多动作图片文件夹。");
  } finally {
    elements.diyImportGeneratedActions.disabled = false;
  }
}

async function runConnectAction(button, statusText, action, successText) {
  button.disabled = true;
  setStatus(statusText);
  try {
    await save();
    const nextConfig = await action();
    fillForm(nextConfig);
    setStatus(successText);
  } catch (_error) {
    setStatus("操作失败，请检查连接或稍后再试。");
  } finally {
    button.disabled = false;
  }
}

function registerConnect() {
  return runConnectAction(
    elements.connectRegister,
    "正在注册并连接...",
    () => window.preferencesPet.registerConnect(),
    "已注册并开始连接。",
  );
}

function connectNow() {
  return runConnectAction(
    elements.connectNow,
    "正在连接...",
    () => window.preferencesPet.connectNow(),
    "正在连接服务器。",
  );
}

function createConnectInvite() {
  return runConnectAction(
    elements.connectCreateInvite,
    "正在生成邀请码...",
    () => window.preferencesPet.createConnectInvite(),
    "邀请码已生成。",
  );
}

function copyConnectInvite() {
  return runConnectAction(
    elements.connectCopyInvite,
    "正在复制邀请码...",
    () => window.preferencesPet.copyConnectInvite().then(() => window.preferencesPet.getConfig()),
    "邀请码已复制。",
  );
}

function acceptConnectInvite() {
  return runConnectAction(
    elements.connectAcceptInviteButton,
    "正在添加好友...",
    () => window.preferencesPet.acceptConnectInvite(elements.connectAcceptInvite.value),
    "好友已添加。",
  );
}

function sendConnectMessage() {
  return runConnectAction(
    elements.connectSendMessage,
    "正在发送消息...",
    () => window.preferencesPet.sendConnectMessage({
      text: elements.connectOutgoingMessage.value,
      toUserId: elements.connectFriend.value,
    }),
    "消息已发送。",
  );
}

function sendQuickReply() {
  return runConnectAction(
    elements.messagesSend,
    "正在发送回复...",
    () => window.preferencesPet.sendConnectMessage({
      text: elements.messagesQuickReply.value,
      toUserId: elements.messagesFriend.value,
    }),
    "回复已发送。",
  );
}

function connectFromHome(button = elements.homeConnect) {
  return runConnectAction(
    button,
    "正在连接桌面陪伴服务...",
    () => window.preferencesPet.registerConnect(),
    "已连接，可以生成邀请码或等待来信。",
  );
}

function setHomeInviteDialogOpen(open) {
  elements.homeInviteDialog.hidden = !open;
  elements.homeInviteDialog.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("invite-dialog-open", open);
  if (open) {
    syncHomeInviteDialog({ inviteCode: elements.homeInviteCode.value, pendingInviteCode: elements.homeAcceptInvite.value });
    window.setTimeout(() => elements.homeInviteAccept.focus(), 40);
  } else {
    elements.homeCreateInvite.focus();
  }
}

function openHomeInviteDialog() {
  setHomeInviteDialogOpen(true);
}

function closeHomeInviteDialog() {
  setHomeInviteDialogOpen(false);
}

function runHomeStartAction() {
  const action = elements.homeStartAction.dataset.action;
  if (action === "connect") {
    connectFromHome(elements.homeStartAction);
    return;
  }
  if (action === "invite") {
    openHomeInviteDialog();
    return;
  }
  if (action === "create") {
    showPanel("diy");
    return;
  }
  elements.homeMessage.focus();
  setStatus("可以写一句很短的话。", "info");
}

function updateHomeInviteAcceptState() {
  const code = elements.homeInviteAccept.value.trim();
  elements.homeInviteAcceptButton.disabled = code.length < 4;
  elements.homeAcceptInvite.value = code;
  elements.connectAcceptInvite.value = code;
  elements.homeInviteHint.dataset.state = code && code.length < 4 ? "warn" : "idle";
  elements.homeInviteHint.textContent = code && code.length < 4
    ? "Invite code looks too short."
    : "Invite codes are temporary. Ask your friend for a fresh one if it does not work.";
}

function syncHomeInviteDialog(connect = {}) {
  if (elements.homeInviteCodeDisplay) {
    elements.homeInviteCodeDisplay.value = connect.inviteCode || elements.homeInviteCode.value || "尚未生成";
  }
  if (connect.pendingInviteCode !== undefined && elements.homeInviteAccept) {
    elements.homeInviteAccept.value = connect.pendingInviteCode || "";
  }
  updateHomeInviteAcceptState();
}

function createHomeInvite(button = elements.homeInviteCreate || elements.homeCreateInvite) {
  return runConnectAction(
    button,
    "正在生成邀请码...",
    () => window.preferencesPet.createConnectInvite(),
    "邀请码已生成，可以发给对方。",
  );
}

function copyHomeInvite(button = elements.homeInviteCopy || elements.homeCopyInvite) {
  return runConnectAction(
    button,
    "正在复制邀请码...",
    () => window.preferencesPet.copyConnectInvite().then(() => window.preferencesPet.getConfig()),
    "邀请码已复制。",
  );
}

function acceptHomeInvite(button = elements.homeInviteAcceptButton || elements.homeAcceptInviteButton) {
  const code = (elements.homeInviteAccept?.value || elements.homeAcceptInvite.value).trim();
  elements.homeAcceptInvite.value = code;
  elements.connectAcceptInvite.value = code;
  return runConnectAction(
    button,
    "正在添加对方...",
    () => window.preferencesPet.acceptConnectInvite(code),
    "已添加对方的桌面陪伴。",
  );
}

function sendHomeMessage() {
  return runConnectAction(
    elements.homeSend,
    "正在发送消息...",
    () => window.preferencesPet.sendConnectMessage({
      text: elements.homeMessage.value,
      toUserId: elements.homeFriend.value,
    }),
    "消息已发送。",
  );
}

async function clearMessages(button, successText) {
  button.disabled = true;
  setStatus("正在清空本地消息...");
  try {
    await save();
    const nextConfig = await window.preferencesPet.clearConnectMessages();
    fillForm(nextConfig);
    setStatus(successText);
  } catch (_error) {
    setStatus("清空失败，请稍后再试。");
  } finally {
    button.disabled = false;
  }
}

function clearMessagesFromMessagesPanel() {
  return clearMessages(elements.messagesClear, "本地消息记录已清空。");
}

function clearMessagesFromPrivacyPanel() {
  return clearMessages(elements.privacyClearMessages, "本地消息记录已清空。");
}

async function removeSelectedPrivacyFriend() {
  const friend = selectedPrivacyFriend();
  if (!friend) return;
  const ok = window.confirm(`确定删除和 ${friendTitle(friend)} 的连接吗？双方都会从关系列表中移除。`);
  if (!ok) return;
  elements.privacyRemoveFriend.disabled = true;
  elements.privacyRemoveFriend.dataset.loading = "true";
  setStatus("正在删除关系...");
  try {
    await save();
    const nextConfig = await window.preferencesPet.removeConnectFriend({ userId: friend.userId });
    fillForm(nextConfig);
    setStatus("关系已删除。");
  } catch (_error) {
    setStatus("删除失败，请确认连接服务在线后再试。");
  } finally {
    delete elements.privacyRemoveFriend.dataset.loading;
    fillPrivacyFriendMute(selectedPrivacyFriend());
  }
}

async function blockSelectedPrivacyFriend() {
  const friend = selectedPrivacyFriend();
  if (!friend) return;
  const ok = window.confirm(`确定屏蔽 ${friendTitle(friend)} 吗？这会删除连接，并阻止对方继续给你发消息。`);
  if (!ok) return;
  elements.privacyBlockFriend.disabled = true;
  elements.privacyBlockFriend.dataset.loading = "true";
  setStatus("正在屏蔽关系对象...");
  try {
    await save();
    const nextConfig = await window.preferencesPet.blockConnectFriend({ userId: friend.userId });
    fillForm(nextConfig);
    setStatus("已屏蔽并移除这个关系对象。");
  } catch (_error) {
    setStatus("屏蔽失败，请确认连接服务在线后再试。");
  } finally {
    delete elements.privacyBlockFriend.dataset.loading;
    fillPrivacyFriendMute(selectedPrivacyFriend());
  }
}

function syncPrivacyToConnect() {
  elements.connectAllowIncoming.checked = elements.privacyAllowIncoming.checked;
  elements.connectDoNotDisturb.checked = elements.privacyDoNotDisturb.checked;
  elements.homeQuiet.checked = elements.privacyDoNotDisturb.checked;
  elements.connectStatus.value = elements.privacyStatus.value;
  updatePrivacySummary();
}

function syncConnectToPrivacy() {
  elements.privacyAllowIncoming.checked = elements.connectAllowIncoming.checked;
  elements.privacyDoNotDisturb.checked = elements.connectDoNotDisturb.checked;
  elements.homeQuiet.checked = elements.connectDoNotDisturb.checked;
  elements.privacyStatus.value = elements.connectStatus.value;
  updatePrivacySummary();
}

function createConnectTestFriend() {
  return runConnectAction(
    elements.connectCreateTestFriend,
    "正在创建真实测试朋友...",
    () => window.preferencesPet.createConnectTestFriend({
      outgoingMessage: elements.connectTestFriendMessageInput.value,
      petName: elements.connectTestFriendPetName.value,
    }),
    "真实测试朋友已创建，并已发来一条消息。",
  );
}

function sendConnectTestFriendMessage() {
  return runConnectAction(
    elements.connectTestFriendMessage,
    "正在让测试朋友发送消息...",
    () => window.preferencesPet.sendConnectTestFriendMessage({
      outgoingMessage: elements.connectTestFriendMessageInput.value,
      petName: elements.connectTestFriendPetName.value,
    }),
    "测试朋友已发送真实消息。",
  );
}

function selectHomeFriend() {
  const selectedId = elements.homeFriend.value;
  elements.connectFriend.value = selectedId;
  elements.messagesFriend.value = selectedId;
  elements.diyFriend.value = selectedId;
  fillRelationshipEditor(selectedConnectFriend());
  selectDiyFriend();
  renderFriendList(latestConnectFriends, selectedId);
  renderHomeFriendList(latestConnectFriends, selectedId);
  updateHomeCompanionPreview();
  updateHomeStartStrip();
  updateHomeMessageHelper();
  setStatus("已切换桌面陪伴对象。");
}

function toggleHomeQuiet() {
  elements.connectDoNotDisturb.checked = elements.homeQuiet.checked;
  elements.privacyDoNotDisturb.checked = elements.homeQuiet.checked;
  setStatus(elements.homeQuiet.checked ? "已开启安静模式，点击保存后生效。" : "已关闭安静模式，点击保存后生效。");
}

function openQuietBoundarySettings() {
  showPanel("privacy");
  elements.privacyDoNotDisturb.focus();
  setStatus("已打开隐私与边界，可以调整来信勿扰。", "info");
}

function useHomeQuickMessage(event) {
  const button = event.target.closest("button[data-message]");
  if (!button) return;
  if (button.classList.contains("quick-plus")) {
    elements.homeMessage.focus();
    setStatus("可以直接输入自定义消息。");
    return;
  }
  elements.homeMessage.value = button.dataset.message;
  elements.connectOutgoingMessage.value = elements.homeMessage.value;
  elements.messagesQuickReply.value = elements.homeMessage.value;
  updateHomeMessageCount();
  updateMessageCount();
  updateQuickReplyCount();
  updateSendButtonStates();
  setStatus("已填入快捷消息，可以直接发送。");
}

function useMessagesQuickMessage(event) {
  const button = event.target.closest("button[data-message]");
  if (!button) return;
  elements.messagesQuickReply.value = button.dataset.message;
  elements.connectOutgoingMessage.value = elements.messagesQuickReply.value;
  elements.homeMessage.value = elements.messagesQuickReply.value;
  updateQuickReplyCount();
  updateMessageCount();
  updateHomeMessageCount();
  updateSendButtonStates();
  setStatus("已填入快捷消息，可以直接发送。");
}

async function boot() {
  const config = await window.preferencesPet.getConfig();
  fillForm(config);

  document.querySelectorAll(".sidebar-item[data-tab]").forEach((tab) => {
    tab.addEventListener("click", () => showPanel(tab.dataset.tab));
  });
  elements.advancedMode.addEventListener("click", () => showPanel("behavior"));
  elements.emotionFrequency.addEventListener("input", updateRangeText);
  elements.hideOnHoverDelay.addEventListener("input", updateRangeText);
  elements.opacity.addEventListener("input", () => {
    updateRangeText();
    window.preferencesPet.previewOpacity(Number(elements.opacity.value));
  });
  elements.activePetSelect.addEventListener("change", () => {
    const selectedPackage = latestPackages.find((item) => item.id === elements.activePetSelect.value);
    if (selectedPackage) {
      elements.petName.value = selectedPackage.displayName;
    }
    setStatus("形象已选择，点击保存后生效。");
  });
  elements.scale.addEventListener("input", () => {
    updateRangeText();
    window.clearTimeout(scalePreviewTimer);
    scalePreviewTimer = window.setTimeout(() => {
      window.preferencesPet.previewScale(Number(elements.scale.value));
    }, 100);
  });
  elements.saveButton.addEventListener("click", save);
  elements.homeAcceptInvite.addEventListener("input", () => {
    elements.connectAcceptInvite.value = elements.homeAcceptInvite.value.trim();
  });
  elements.homeAcceptInviteButton.addEventListener("click", acceptHomeInvite);
  elements.homeConnect.addEventListener("click", connectFromHome);
  elements.homeCopyInvite.addEventListener("click", openHomeInviteDialog);
  elements.homeCreateInvite.addEventListener("click", openHomeInviteDialog);
  elements.homeInviteBackdrop.addEventListener("click", closeHomeInviteDialog);
  elements.homeInviteClose.addEventListener("click", closeHomeInviteDialog);
  elements.homeInviteCreate.addEventListener("click", () => createHomeInvite(elements.homeInviteCreate));
  elements.homeInviteCopy.addEventListener("click", () => copyHomeInvite(elements.homeInviteCopy));
  elements.homeInviteAccept.addEventListener("input", updateHomeInviteAcceptState);
  elements.homeInviteAccept.addEventListener("blur", updateHomeInviteAcceptState);
  elements.homeInviteAcceptButton.addEventListener("click", () => acceptHomeInvite(elements.homeInviteAcceptButton));
  elements.homeFriend.addEventListener("change", selectHomeFriend);
  elements.homeFriendSearch.addEventListener("input", () => {
    renderHomeFriendList(latestConnectFriends, elements.homeFriend.value);
  });
  elements.homeImportAvatar.addEventListener("click", importPetPackage);
  elements.homeMakeAvatar.addEventListener("click", () => {
    selectHomeFriend();
    showPanel("diy");
  });
  elements.homeMessage.addEventListener("input", () => {
    updateHomeMessageCount();
    elements.connectOutgoingMessage.value = elements.homeMessage.value;
    elements.messagesQuickReply.value = elements.homeMessage.value;
    updateMessageCount();
    updateQuickReplyCount();
    updateSendButtonStates();
  });
  elements.homeOpenMessages.addEventListener("click", () => showPanel("messages"));
  elements.homeQuiet.addEventListener("change", toggleHomeQuiet);
  elements.homeQuietAdjust.addEventListener("click", openQuietBoundarySettings);
  elements.homeQuickMessages.addEventListener("click", useHomeQuickMessage);
  elements.homeSend.addEventListener("click", sendHomeMessage);
  elements.homeStartAction.addEventListener("click", runHomeStartAction);
  elements.homeMessage.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && !elements.homeSend.disabled) {
      event.preventDefault();
      sendHomeMessage();
    }
  });
  elements.diyApplyBinding.addEventListener("click", applyDiyBinding);
  elements.diyCopyImagePrompt.addEventListener("click", copyGptImagePrompt);
  elements.diyFriend.addEventListener("change", selectDiyFriend);
  elements.diyImageBrief.addEventListener("input", () => {
    refreshPreparedPrompt();
  });
  elements.diyImageStyle.addEventListener("change", refreshPreparedPrompt);
  elements.diyImportGeneratedActions.addEventListener("click", importGeneratedActionPackage);
  elements.diyImportGeneratedImage.addEventListener("click", importGeneratedImagePackage);
  elements.diyImportPet.addEventListener("click", importPetPackage);
  elements.diyPet.addEventListener("change", updateDiyPreview);
  elements.diyPrepareActionPrompt.addEventListener("click", prepareGptActionPrompt);
  elements.diyPrepareImagePrompt.addEventListener("click", prepareGptImagePrompt);
  elements.diyRelationshipLabel.addEventListener("input", () => {
    syncDiyRelationshipToSelectedFriend();
    refreshFriendPresentation();
    updateDiyPreview();
    refreshPreparedPrompt();
  });
  elements.importPet.addEventListener("click", importPetPackage);
  elements.openPetsFolder.addEventListener("click", async () => {
    await window.preferencesPet.openPetsFolder();
    setStatus("形象目录已打开。");
  });
  elements.connectAcceptInviteButton.addEventListener("click", acceptConnectInvite);
  elements.connectAcceptInvite.addEventListener("input", () => {
    updateConnectAcceptInviteState();
    elements.homeAcceptInvite.value = elements.connectAcceptInvite.value.trim();
    if (elements.homeInviteAccept) elements.homeInviteAccept.value = elements.connectAcceptInvite.value.trim();
  });
  elements.connectAllowIncoming.addEventListener("change", syncConnectToPrivacy);
  elements.connectCopyInvite.addEventListener("click", copyConnectInvite);
  elements.connectCreateInvite.addEventListener("click", createConnectInvite);
  elements.connectCreateTestFriend.addEventListener("click", createConnectTestFriend);
  elements.connectDoNotDisturb.addEventListener("change", syncConnectToPrivacy);
  elements.connectFriend.addEventListener("change", () => {
    elements.homeFriend.value = elements.connectFriend.value;
    fillRelationshipEditor(selectedConnectFriend());
    renderFriendList(latestConnectFriends, elements.connectFriend.value);
    renderHomeFriendList(latestConnectFriends, elements.connectFriend.value);
    updateHomeCompanionPreview();
    setStatus("已切换关系对象。");
  });
  elements.connectFriendAlias.addEventListener("input", refreshFriendPresentation);
  elements.connectFriendMute.addEventListener("change", refreshFriendPresentation);
  elements.connectFriendNote.addEventListener("input", syncRelationshipEditorToSelectedFriend);
  elements.connectNow.addEventListener("click", connectNow);
  elements.connectOutgoingMessage.addEventListener("input", () => {
    updateMessageCount();
    updateSendButtonStates();
  });
  elements.connectRegister.addEventListener("click", registerConnect);
  elements.connectRelationshipLabel.addEventListener("input", refreshFriendPresentation);
  elements.connectSendMessage.addEventListener("click", sendConnectMessage);
  elements.connectStatus.addEventListener("change", syncConnectToPrivacy);
  elements.connectTestFriendMessage.addEventListener("click", sendConnectTestFriendMessage);
  elements.messagesClear.addEventListener("click", clearMessagesFromMessagesPanel);
  elements.messagesFriend.addEventListener("change", updateMessagesFriendPreview);
  elements.messagesQuickMessages.addEventListener("click", useMessagesQuickMessage);
  elements.messagesQuickReply.addEventListener("input", () => {
    updateQuickReplyCount();
    updateSendButtonStates();
  });
  elements.messagesSend.addEventListener("click", sendQuickReply);
  elements.privacyAllowIncoming.addEventListener("change", syncPrivacyToConnect);
  elements.privacyApply.addEventListener("click", save);
  elements.privacyBlockFriend.addEventListener("click", blockSelectedPrivacyFriend);
  elements.privacyClearMessages.addEventListener("click", clearMessagesFromPrivacyPanel);
  elements.privacyDoNotDisturb.addEventListener("change", syncPrivacyToConnect);
  elements.privacyFriend.addEventListener("change", () => {
    fillPrivacyFriendMute(selectedPrivacyFriend());
    setStatus("已切换隐私设置对象。");
  });
  elements.privacyFriendMute.addEventListener("change", () => {
    syncPrivacyMuteToSelectedFriend();
    refreshFriendPresentation();
    setStatus("单个关系静默已更新，点击保存后生效。");
  });
  elements.privacyHidePresence.addEventListener("change", syncPrivacyToConnect);
  elements.privacyRemoveFriend.addEventListener("click", removeSelectedPrivacyFriend);
  elements.privacyStatus.addEventListener("change", syncPrivacyToConnect);
  elements.testGreeting.addEventListener("click", async () => {
    await save();
    await window.preferencesPet.testGreeting();
  });
  elements.testWeather.addEventListener("click", async () => {
    await save();
    await window.preferencesPet.testWeather();
  });
  elements.cityChips.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-city]");
    if (button) {
      elements.weatherCity.value = button.dataset.city;
      setStatus("城市已填入，点击保存后生效。");
    }
  });
  window.preferencesPet.onChanged((config) => {
    fillForm(config);
    clearDirty();
  });

  // Form-change detection → mark save button dirty
  const form = document.getElementById("settingsForm");
  if (form) {
    form.addEventListener("input", (event) => {
      // Ignore preview-only inputs and dynamic preview triggers
      if (event.target.closest(".sidebar, .toast-container")) return;
      markDirty();
    });
    form.addEventListener("change", (event) => {
      if (event.target.closest(".sidebar, .toast-container")) return;
      markDirty();
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      save();
    } else if (event.key === "Escape") {
      if (!elements.homeInviteDialog.hidden) {
        event.preventDefault();
        closeHomeInviteDialog();
        return;
      }
      // Esc closes the preferences window (handled by main process via window.close())
      window.close();
    }
  });
}

boot();
