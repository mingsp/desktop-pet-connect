const elements = {
  cancelButton: document.getElementById("cancelButton"),
  cellText: document.getElementById("cellText"),
  confirmButton: document.getElementById("confirmButton"),
  displayName: document.getElementById("displayName"),
  gridText: document.getElementById("gridText"),
  issueList: document.getElementById("issueList"),
  packageId: document.getElementById("packageId"),
  previewCaption: document.getElementById("previewCaption"),
  previewImage: document.getElementById("previewImage"),
  sourceDir: document.getElementById("sourceDir"),
  spritesheetName: document.getElementById("spritesheetName"),
  stateText: document.getElementById("stateText"),
  statusBadge: document.getElementById("statusBadge"),
};

function valueOrDash(value) {
  return value || "—";
}

function setText(element, value) {
  element.textContent = valueOrDash(value);
}

function addIssue(text, className = "") {
  const item = document.createElement("li");
  item.className = className;
  item.textContent = text;
  elements.issueList.appendChild(item);
}

function renderIssues(config) {
  elements.issueList.replaceChildren();
  for (const error of config.errors || []) addIssue(error, "error");
  for (const warning of config.warnings || []) addIssue(warning, "warning");
  if (!config.errors?.length && !config.warnings?.length) {
    addIssue("校验通过，可以导入。");
  }
}

function render(config) {
  const grid = config.grid || {};
  const cell = config.cell || {};
  const spriteSize = config.spriteSize;
  elements.displayName.textContent = valueOrDash(config.displayName);
  setText(elements.sourceDir, config.sourceDir);
  setText(elements.packageId, config.packageIdCandidate);
  setText(elements.spritesheetName, config.spritesheetName);
  setText(elements.gridText, grid.columns && grid.rows ? `${grid.columns} 列 x ${grid.rows} 行` : "");
  setText(elements.cellText, cell.width && cell.height ? `${cell.width} x ${cell.height}` : "");
  setText(
    elements.stateText,
    config.stateNames?.length
      ? `${config.stateNames.length} 个：${config.stateNames.join("、")}`
      : "",
  );

  if (config.previewUrl) {
    elements.previewImage.src = config.previewUrl;
    elements.previewCaption.textContent = spriteSize
      ? `预览来源：${spriteSize.width} x ${spriteSize.height}`
      : "预览图";
  } else {
    elements.previewCaption.textContent = "没有可用预览";
  }

  elements.statusBadge.textContent = config.ok ? "可导入" : "需要修复";
  elements.statusBadge.classList.toggle("ok", Boolean(config.ok));
  elements.statusBadge.classList.toggle("error", !config.ok);
  elements.confirmButton.disabled = !config.ok;
  renderIssues(config);
}

async function boot() {
  const config = await window.petImportPreview.getConfig();
  render(config || { errors: ["没有可用的导入信息。"], warnings: [] });
  elements.cancelButton.addEventListener("click", () => window.petImportPreview.cancel());
  elements.confirmButton.addEventListener("click", () => window.petImportPreview.confirm());
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") window.petImportPreview.cancel();
  });
}

boot();
