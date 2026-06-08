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
  homeConnect: document.getElementById("homeConnectButton"),
  homeConnectionBadge: document.getElementById("homeConnectionBadge"),
  homeConnectionDetail: document.getElementById("homeConnectionDetail"),
  homeCopyInvite: document.getElementById("homeCopyInviteButton"),
  homeCreateInvite: document.getElementById("homeCreateInviteButton"),
  homeFriend: document.getElementById("homeFriendSelect"),
  homeImportAvatar: document.getElementById("homeImportAvatarButton"),
  homeInviteCode: document.getElementById("homeInviteCodeInput"),
  homeMakeAvatar: document.getElementById("homeMakeAvatarButton"),
  homeMessage: document.getElementById("homeMessageInput"),
  homeMessageCount: document.getElementById("homeMessageCount"),
  homeOpenMessages: document.getElementById("homeOpenMessagesButton"),
  homeQuiet: document.getElementById("homeQuietInput"),
  homeQuickMessages: document.getElementById("homeQuickMessages"),
  homeRecentMessage: document.getElementById("homeRecentMessageText"),
  homeRelationDetail: document.getElementById("homeRelationDetail"),
  homeSend: document.getElementById("homeSendButton"),
  homeSyncText: document.getElementById("homeSyncText"),
  importPet: document.getElementById("importPetButton"),
  inputReactions: document.getElementById("inputReactionsInput"),
  keepInScreen: document.getElementById("keepInScreenInput"),
  messagesClear: document.getElementById("messagesClearButton"),
  messagesFriend: document.getElementById("messagesFriendSelect"),
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
  privacyClearMessages: document.getElementById("privacyClearMessagesButton"),
  privacyDoNotDisturb: document.getElementById("privacyDoNotDisturbInput"),
  privacyFriend: document.getElementById("privacyFriendSelect"),
  privacyFriendMute: document.getElementById("privacyFriendMuteInput"),
  privacyStatus: document.getElementById("privacyStatusSelect"),
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
let diyPromptMode = "single";
let advancedMode = false;
let scalePreviewTimer = 0;

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
  const friend = message.friendPetName || message.friendName || "朋友的桌宠";
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

function relationshipLabel(friend) {
  return friend.relationshipLabel || "好友";
}

function packageById(packageId) {
  return latestPackages.find((item) => item.id === packageId) || null;
}

function friendTitle(friend) {
  return friend.localAlias || friend.petName || friend.displayName || "朋友的桌宠";
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
  elements.privacyFriendMute.checked = Boolean(friend?.muted);
}

function selectedDiyFriend() {
  return latestConnectFriends.find((friend) => friend.userId === elements.diyFriend.value) || null;
}

function selectedDiyPackage() {
  return packageById(elements.diyPet.value) || latestPackages[0] || null;
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
  setImageSource(elements.diyBindingPreviewImage, petPackage?.previewUrl || petPackage?.spriteUrl);
  elements.diyBindingStatus.textContent = hasBinding ? "已绑定" : "未绑定";
  elements.diyBindingStatus.dataset.state = hasBinding ? "connected" : "disconnected";
  elements.diyBindingTitle.textContent = friend
    ? `${friendTitle(friend)} (${elements.diyRelationshipLabel.value || relationshipLabel(friend)})`
    : "请选择一个关系对象";
  elements.diyBindingMeta.textContent = friend && petPackage
    ? `${petPackage.displayName} 将作为这个关系对象在界面中的桌宠形象。`
    : "选择关系对象和宠物包后，点击绑定并保存。";
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
  setStatus("关系桌宠形象已绑定，点击保存后生效。");
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
    "Commercial product quality, warm refined color palette, crisp silhouette, readable at small desktop-pet size.",
    "",
    "Strict constraints:",
    "No animals, no pets, no paw prints, no cats, no dogs, no animal ears, no mascot creature.",
    "No heart shape, no hugging, no computer, no monitor, no phone, no app screen.",
    "No text, no logo lettering, no watermarks, no chat bubbles, no busy background.",
    "Do not use scripts or non-gpt-image generation. The images must be generated by gpt-image2.",
    "",
    "Import requirement:",
    "After generation, place the files in one folder with the names above. The app will import that folder, compose a validated multi-action pet package, and bind it to this relationship object.",
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
    empty.textContent = "还没有关系桌宠，先生成邀请码或输入对方的邀请码。";
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
      elements.connectFriendList.querySelectorAll(".friend-row").forEach((item) => {
        item.classList.toggle("active", item === row);
      });
      setStatus(`已选择 ${friendTitle(friend)}，可以发送短消息。`);
    });
    return row;
  });
  elements.connectFriendList.replaceChildren(...rows);
}

function updateHomeCompanionPreview() {
  const friend = selectedHomeFriend() || latestConnectFriends[0] || null;
  const activePackage = packageById(elements.activePetSelect.value) || latestPackages[0] || null;
  const boundPackage = friend?.boundPetId ? packageById(friend.boundPetId) : null;
  const previewUrl = boundPackage?.previewUrl || boundPackage?.spriteUrl || activePackage?.previewUrl || activePackage?.spriteUrl;

  elements.homeCompanionName.textContent = friend ? friendTitle(friend) : "还没有添加关系对象";
  elements.homeCompanionMeta.textContent = friend
    ? `${relationshipLabel(friend)} · ${friendStatusLabel(friend)} · ${boundPackage ? boundPackage.displayName : "未制作专属形象"}`
    : "先和朋友互换邀请码，把对方做成桌面陪伴。";
  elements.homeCompanionNote.textContent = friend?.localNote
    || (friend ? "可以给对方发一句轻量消息，也可以把 TA 的形象绑定到桌面上。" : "默认页只保留朋友最常用的动作，其它配置放进高级设置。");
  elements.homeRelationDetail.textContent = friend ? relationshipLabel(friend) : "等待添加";
  elements.homeAvatarDetail.textContent = boundPackage ? "已制作" : "未制作";
  setImageSource(elements.homeCompanionImage, previewUrl);
}

function updateRelationshipHome(activePackage, connect, selectedFriendId) {
  elements.homeConnectionBadge.textContent = connectionStateLabel(connect.connectionState);
  elements.homeConnectionBadge.dataset.state = connectionStateTone(connect.connectionState);
  elements.homeConnectionDetail.textContent = connectionStateLabel(connect.connectionState);
  elements.homeSyncText.textContent = connect.userId
    ? "可以用桌面陪伴传话，不需要打开聊天窗口。"
    : "先连接服务，再和对方互换邀请码。";
  elements.homeConnect.textContent = connect.userId ? "重新连接" : "开始连接";
  elements.homeInviteCode.value = connect.inviteCode || "尚未生成";
  elements.homeAcceptInvite.value = connect.pendingInviteCode || "";
  elements.homeMessage.value = connect.outgoingMessage || "想你啦，来看看我的桌面。";
  elements.homeQuiet.checked = Boolean(connect.doNotDisturb);
  elements.homeRecentMessage.textContent = formatRecentMessage(connect.recentMessages?.[0]);

  const selectedId = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
  elements.homeFriend.value = selectedId;
  updateHomeMessageCount();
  updateHomeCompanionPreview(activePackage);
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
  elements.homeSend.disabled = !latestConnectFriends.length;
  elements.homeFriend.value = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
  updateHomeCompanionPreview();
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
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系桌宠", relationshipLabel: "好友" }]).map((friend) => {
      const option = document.createElement("option");
      option.value = friend.userId;
      option.textContent = friendLabel(friend);
      return option;
    }),
  );
  elements.messagesFriend.disabled = !latestConnectFriends.length;
  elements.messagesSend.disabled = !latestConnectFriends.length;
  elements.messagesFriend.value = latestConnectFriends.some((friend) => friend.userId === selectedFriendId)
    ? selectedFriendId
    : latestConnectFriends[0]?.userId || "";
}

function refreshPrivacyFriendOptions() {
  const selectedFriendId = elements.privacyFriend.value || elements.connectFriend.value;
  elements.privacyFriend.replaceChildren(
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系桌宠", relationshipLabel: "好友" }]).map((friend) => {
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
    const row = document.createElement("article");
    row.className = "message-row";
    row.dataset.direction = message.direction === "outgoing" ? "outgoing" : "incoming";

    const meta = document.createElement("div");
    meta.className = "message-meta";
    const name = document.createElement("strong");
    name.textContent = message.friendPetName || message.friendName || "关系桌宠";
    const tag = document.createElement("span");
    tag.textContent = message.muted ? "静默" : (message.direction === "outgoing" ? "已发送" : "来信");
    meta.append(name, tag);

    const text = document.createElement("p");
    text.textContent = message.text || "";

    const time = document.createElement("small");
    time.textContent = formatMessageTime(message.receivedAt);

    row.append(meta, text, time);
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
  document.querySelectorAll(".sidebar-item[data-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === name);
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === name);
  });
}

function setAdvancedMode(enabled) {
  advancedMode = enabled;
  document.body.classList.toggle("advanced-mode", enabled);
  elements.advancedMode.textContent = enabled ? "简洁模式" : "高级设置";
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
  elements.connectOutgoingMessage.value = connect.outgoingMessage || "你好，我的桌宠来传话。";
  elements.connectFriend.replaceChildren(
    ...(latestConnectFriends.length ? latestConnectFriends : [{ userId: "", petName: "还没有关系桌宠", online: false }]).map((friend) => {
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
  elements.connectSendMessage.disabled = !latestConnectFriends.length;
  elements.messagesQuickReply.value = connect.outgoingMessage || "";
  elements.privacyAllowIncoming.checked = connect.allowIncoming !== false;
  elements.privacyDoNotDisturb.checked = Boolean(connect.doNotDisturb);
  elements.privacyStatus.value = connect.status || "online";
  elements.connectTestFriendPetName.value = connect.testFriend?.petName || "测试朋友桌宠";
  elements.connectTestFriendMessageInput.value = connect.testFriend?.outgoingMessage || "我是真实测试朋友桌宠，这条消息走的是服务器。";
  elements.connectRecentMessageText.textContent = formatRecentMessage(connect.recentMessages?.[0]);
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
    setStatus("已保存，并已同步到桌宠。");
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
      displayName: friend ? `${friendTitle(friend)} 关系桌宠` : "gpt-image2 关系桌宠",
      friendId: elements.diyFriend.value,
      relationshipLabel: elements.diyRelationshipLabel.value,
    });
    fillForm(nextConfig);
    if (nextConfig.generatedImportResult?.ok) {
      setStatus("gpt-image2 结果已导入为宠物包，并已绑定到关系桌宠。");
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
      displayName: friend ? `${friendTitle(friend)} 多动作关系桌宠` : "gpt-image2 多动作关系桌宠",
      friendId: elements.diyFriend.value,
      relationshipLabel: elements.diyRelationshipLabel.value,
    });
    fillForm(nextConfig);
    if (nextConfig.generatedActionImportResult?.ok) {
      setStatus("gpt-image2 多动作结果已打包、校验，并绑定到关系桌宠。");
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

function connectFromHome() {
  return runConnectAction(
    elements.homeConnect,
    "正在连接桌面陪伴服务...",
    () => window.preferencesPet.registerConnect(),
    "已连接，可以生成邀请码或等待来信。",
  );
}

function createHomeInvite() {
  return runConnectAction(
    elements.homeCreateInvite,
    "正在生成邀请码...",
    () => window.preferencesPet.createConnectInvite(),
    "邀请码已生成，可以发给对方。",
  );
}

function copyHomeInvite() {
  return runConnectAction(
    elements.homeCopyInvite,
    "正在复制邀请码...",
    () => window.preferencesPet.copyConnectInvite().then(() => window.preferencesPet.getConfig()),
    "邀请码已复制。",
  );
}

function acceptHomeInvite() {
  return runConnectAction(
    elements.homeAcceptInviteButton,
    "正在添加对方...",
    () => window.preferencesPet.acceptConnectInvite(elements.homeAcceptInvite.value),
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

function syncPrivacyToConnect() {
  elements.connectAllowIncoming.checked = elements.privacyAllowIncoming.checked;
  elements.connectDoNotDisturb.checked = elements.privacyDoNotDisturb.checked;
  elements.homeQuiet.checked = elements.privacyDoNotDisturb.checked;
  elements.connectStatus.value = elements.privacyStatus.value;
}

function syncConnectToPrivacy() {
  elements.privacyAllowIncoming.checked = elements.connectAllowIncoming.checked;
  elements.privacyDoNotDisturb.checked = elements.connectDoNotDisturb.checked;
  elements.homeQuiet.checked = elements.connectDoNotDisturb.checked;
  elements.privacyStatus.value = elements.connectStatus.value;
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
  updateHomeCompanionPreview();
  setStatus("已切换桌面陪伴对象。");
}

function toggleHomeQuiet() {
  elements.connectDoNotDisturb.checked = elements.homeQuiet.checked;
  elements.privacyDoNotDisturb.checked = elements.homeQuiet.checked;
  setStatus(elements.homeQuiet.checked ? "已开启安静模式，点击保存后生效。" : "已关闭安静模式，点击保存后生效。");
}

function useHomeQuickMessage(event) {
  const button = event.target.closest("button[data-message]");
  if (!button) return;
  elements.homeMessage.value = button.dataset.message;
  elements.connectOutgoingMessage.value = elements.homeMessage.value;
  elements.messagesQuickReply.value = elements.homeMessage.value;
  updateHomeMessageCount();
  updateMessageCount();
  updateQuickReplyCount();
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
  setStatus("已填入快捷消息，可以直接发送。");
}

async function boot() {
  const config = await window.preferencesPet.getConfig();
  fillForm(config);

  document.querySelectorAll(".sidebar-item[data-tab]").forEach((tab) => {
    tab.addEventListener("click", () => showPanel(tab.dataset.tab));
  });
  elements.advancedMode.addEventListener("click", () => setAdvancedMode(!advancedMode));
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
  elements.homeCopyInvite.addEventListener("click", copyHomeInvite);
  elements.homeCreateInvite.addEventListener("click", createHomeInvite);
  elements.homeFriend.addEventListener("change", selectHomeFriend);
  elements.homeImportAvatar.addEventListener("click", importPetPackage);
  elements.homeMakeAvatar.addEventListener("click", () => {
    selectHomeFriend();
    showPanel("diy");
  });
  elements.homeMessage.addEventListener("input", () => {
    updateHomeMessageCount();
    elements.connectOutgoingMessage.value = elements.homeMessage.value;
    elements.messagesQuickReply.value = elements.homeMessage.value;
  });
  elements.homeOpenMessages.addEventListener("click", () => showPanel("messages"));
  elements.homeQuiet.addEventListener("change", toggleHomeQuiet);
  elements.homeQuickMessages.addEventListener("click", useHomeQuickMessage);
  elements.homeSend.addEventListener("click", sendHomeMessage);
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
  elements.connectAllowIncoming.addEventListener("change", syncConnectToPrivacy);
  elements.connectCopyInvite.addEventListener("click", copyConnectInvite);
  elements.connectCreateInvite.addEventListener("click", createConnectInvite);
  elements.connectCreateTestFriend.addEventListener("click", createConnectTestFriend);
  elements.connectDoNotDisturb.addEventListener("change", syncConnectToPrivacy);
  elements.connectFriend.addEventListener("change", () => {
    elements.homeFriend.value = elements.connectFriend.value;
    fillRelationshipEditor(selectedConnectFriend());
    renderFriendList(latestConnectFriends, elements.connectFriend.value);
    updateHomeCompanionPreview();
    setStatus("已切换关系桌宠。");
  });
  elements.connectFriendAlias.addEventListener("input", refreshFriendPresentation);
  elements.connectFriendMute.addEventListener("change", refreshFriendPresentation);
  elements.connectFriendNote.addEventListener("input", syncRelationshipEditorToSelectedFriend);
  elements.connectNow.addEventListener("click", connectNow);
  elements.connectOutgoingMessage.addEventListener("input", updateMessageCount);
  elements.connectRegister.addEventListener("click", registerConnect);
  elements.connectRelationshipLabel.addEventListener("input", refreshFriendPresentation);
  elements.connectSendMessage.addEventListener("click", sendConnectMessage);
  elements.connectStatus.addEventListener("change", syncConnectToPrivacy);
  elements.connectTestFriendMessage.addEventListener("click", sendConnectTestFriendMessage);
  elements.messagesClear.addEventListener("click", clearMessagesFromMessagesPanel);
  elements.messagesQuickMessages.addEventListener("click", useMessagesQuickMessage);
  elements.messagesQuickReply.addEventListener("input", updateQuickReplyCount);
  elements.messagesSend.addEventListener("click", sendQuickReply);
  elements.privacyAllowIncoming.addEventListener("change", syncPrivacyToConnect);
  elements.privacyApply.addEventListener("click", save);
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
      // Esc closes the preferences window (handled by main process via window.close())
      window.close();
    }
  });
}

boot();
