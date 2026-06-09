# 迭代记录

## 2026-06-09：启动主页与关系主流程引导

- 修改 Windows 启动默认行为：正常打开 EXE 会自动弹出 Friends Hub 主页；仅在传入 `--background`、`--no-preferences` 或 `--no-startup-home` 时才跳过主页。
- 偏好主页窗口打开时会居中、聚焦并置顶到当前应用层级，避免用户误以为产品只启动了桌面角色或托盘。
- Friends Hub 左侧新增阶段化动作条：未注册时引导连接电脑，未添加朋友时引导邀请，已添加但未绑定形象时引导创建形象，完成后引导直接写短消息。
- 主页英雄区补齐 `Create look` 与 `Import...` 可见入口，直接连接到 DIY 形象制作和形象导入流程。
- 发送区新增帮助提示与 `Ctrl+Enter` 快捷发送，让“写一句轻量消息”成为更明确的主交互。
- 新增启动主页视觉 QA 截图：`docs/assets/qa/startup-home-polish-check.png`。
- 商业级首屏继续优化：把说明书式文案改为更贴近真实关系的表达，默认首屏不再展示假朋友在线状态。
- 为首屏增加默认空状态：朋友列表和 Recent moments 在数据加载前也有温柔、完整的视觉承接，避免大片空白。
- 强化状态条、Recent 空状态、输入框聚焦和按钮 hover 的质感，保持暖色深色方向，避免回到工具型后台界面。
- 新增商业级首页视觉 QA 截图：`docs/assets/qa/commercial-home-polish-check.png`。

## 2026-06-09：发布前后端自查与 VPS 更新

- 完成 Pet Connect 协议级 smoke test：注册、邀请码、好友列表、在线实时消息、离线队列、隐藏在线、删除关系、屏蔽关系、屏蔽后不可重新添加均通过。
- 完成公网 smoke test：通过 `https://app.qimozhu.abrdns.com/pet-connect` 注册临时用户、创建关系、发送消息、删除关系，并验证删除后不能继续发送。
- 更新 DigitalOcean VPS 上的 `/opt/services/pet-connect` 服务端代码与依赖清单，保留 `/opt/services/pet-connect/data` 数据卷，并重建/重启 `pet-connect` 容器。
- 部署后健康检查通过：公网 `/pet-connect/health` 返回服务正常。
- 清理未使用的旧 PNG 控件图标资产，保留 SVG 控件图标与真实头像/角色/房间视觉资产。

## 2026-06-09：关系边界与商业可用性补齐

- 按 Product Design 与 UI/UX 商业级检查标准继续收口：优先补足真实关系产品必需的边界、安全感和可恢复反馈。
- Pet Connect 服务端新增删除关系、屏蔽关系和隐藏在线状态；删除与屏蔽会移除双方好友关系，并阻止已删除/已屏蔽对象继续发送消息。
- 桌面客户端新增对应 IPC 与本地状态刷新：服务端返回后自动更新好友列表、当前选中对象、在线状态和桌面朋友在线广播。
- Privacy 页面升级为完整边界管理：新增在线可见摘要、隐藏在线开关、单个关系删除、屏蔽操作、危险区视觉层级和确认提示。
- 完成协议级验证：隐藏在线后朋友看到离线；删除关系后不能继续发消息；屏蔽后对方不能继续发消息。
- 更新朋友试用文档，把删除/屏蔽/隐藏在线加入两台电脑 smoke test 范围。

## 2026-06-09：图标裁剪与透明背景精修

- 对 Friends Hub 的 `brand-mark`、`chip-*`、`icon-*` 进行逐项裁剪审计，记录尺寸、透明内容边界、留白和边缘 alpha。
- 清理从原型截图切图时残留的深色方块背景，让侧栏、搜索、邀请、快捷消息、发送等图标恢复真正透明。
- 统一图标画布与留白：常规导航图标归一到稳定 24px 画布，快捷短语图标归一到 24px 画布，发送图标归一到 32px 画布。
- 针对 `icon-friends` 和 `icon-user-chevrons` 做二次缩放居中，修复左右贴边和视觉偏心。
- 重新生成 Windows 应用 `.ico`，确保安装包图标也使用清理后的品牌标记。
- 新增图标 QA 证据：before 审计图、final 审计图和页面渲染截图。
- 进一步根据视觉复查结果修正最终方案：截图切图类 PNG 在去底时容易误伤细线和边缘，因此 in-app 的品牌、导航、搜索、邀请、发送、快捷短语等控件图标最终改为 `lucide-static` SVG 资产，保证边缘完整、缩放清晰、不再出现半截或被裁掉的问题。
- 新增 SVG 页面渲染 QA 截图：`docs/assets/qa/icon-svg-page-check.png`。

## 2026-06-09：朋友试用发布链路打通

- 接通 Friends Hub 侧栏 Quiet boundary 的 Adjust 按钮，点击后进入 Privacy 边界设置并聚焦勿扰控制。
- 接通快捷消息里的自定义 `+` 入口，点击后聚焦输入框并进入手写短消息流程。
- 新增 Electron Builder 发布配置，支持 `npm run build:dir`、`npm run build:portable` 和 `npm run build:win`。
- 生成 Windows 应用图标 `build-resources/icon.ico`，让安装包和 portable 文件具备产品级应用入口。
- 成功生成真实朋友试用包：`release/Desktop Pet Connect 0.1.0.exe` 与 `release/Desktop Pet Connect Setup 0.1.0.exe`。
- 新增 `docs/friend-test-deployment.md`，记录两人真实电脑测试流程、VPS 默认服务、邀请码、消息验证和常见排错。
- 完成发布前基础验证：语法检查、偏好页按钮/ID 审计、解包构建、portable 构建和完整 Windows 构建均通过。

## 2026-06-09：核心模块产品化细节打磨

- 清理 Friends Hub 图标资源的深色不透明底块，并在后续图标裁剪复查中将侧边栏、搜索、邀请、设置、发送等控件改为更稳定的 SVG 图标呈现。
- 修复 Settings 入口：左侧 Settings 现在直接进入基础设置页，并在非首页模块显示可用的“保存更改”按钮。
- Invites 页新增连接状态摘要条，展示服务器状态、已添加关系对象数量和邀请码状态，并补齐邀请码输入的短码禁用态。
- Messages 页新增当前发送对象卡片，消息列表加入头像与收发方向层级，空消息禁用发送，有内容后才允许发送。
- Privacy 页新增当前边界摘要，状态、来信开关、勿扰状态会随控件实时更新。
- Create Companion、Messages、Invites、Privacy、Settings 的可见文案进一步从“宠物管理”收敛为“真实关系对象 + 桌面陪伴”表达。
- 用本地 mock 配置完成模块交互验证：导航切换、发送按钮状态、邀请码校验、隐私摘要同步、Settings 保存入口均通过。

## 2026-06-09：Friend Presence Hub 原型复刻与首页交互验收

- 按选中的第 2 张原型图重构偏好设置默认首页，目标变为朋友关系入口，而不是复杂设置中心。
- 将原型图中的品牌标记、侧边栏图标、人物头像、桌面陪伴形象、房间背景、发送按钮和快捷短语图标切成真实 raster 资产并接入页面。
- 将窗口尺寸、侧边栏宽度、朋友列表、右侧英雄区、最近动态和发送区调整到 `1487 x 1058` 原型布局。
- 修复发送区空态：默认显示 placeholder 和 `0/140`，不再预填默认中文消息。
- 修复最近动态与快捷短语的垂直节奏，确保目标视口下不裁切、不滚动。
- 验证首页基础交互：朋友搜索、快捷短语填充、发送后插入最近动态、Messages 导航切换。
- 新增最终设计 QA 证据：全页对比图、发送区局部对比图、最近动态局部对比图，并更新 `design-qa.md` 为 `final result: passed`。
- 继续补齐首次连接体验：新增 Add by Invite 弹窗，支持生成/复制自己的邀请码、输入朋友邀请码，并增加无好友空状态引导。

## 2026-06-08：V2 原型选择与 Friends Hub 落地

- 选定第 2 张 gpt-image-2 原型图作为 V2 正式方向：Friend Presence Hub。
- 将选中原型图沉淀到 `docs/assets/friend-presence-hub-v2.png`，并新增业务设计文档 `product-design-v2-friend-presence-hub.md`。
- 重新明确产品重心：朋友、情侣或重要的人互相把对方做成桌面陪伴，并通过真实连接保持轻量沟通。
- 默认偏好首页从“设置中心”改为 Friends Hub：左侧朋友列表与邀请入口，右侧选中朋友状态、桌面形象、最近来往和快速传话。
- 默认导航收敛为 Friends、Create Companion、Messages、Invites、Privacy，高级配置继续保留但不作为第一印象。
- 品牌表达从“宠物工具”进一步收敛为 Companion Connect，减少小动物和装饰符号暗示。

## 2026-05-11：向开源社区顶级项目看齐的全面 UI/UX 提升

参考 BongoCat（20.8k⭐）、VPet（6.1k⭐）、DyberPet（728⭐）等顶级开源桌宠项目，系统性吸收其优秀设计，本次迭代覆盖以下方面：

**视觉精细化（styles.css）**
- 悬停光标升级为爱心 SVG 自定义光标（参考 DyberPet 三态光标设计），拖拽保持 grabbing
- 对话气泡：圆角从 8px 升至 12px，添加毛玻璃 backdrop-filter，阴影更精致，底部尾巴箭头（::before/::after 双层三角），与 VPet/BongoCat 气泡设计对齐
- 名称标签升级：添加 backdrop-filter，改为 flex 布局以承接好友在线状态点
- Pet Connect 在线状态点：绑定好友在线状态，绿色圆点带 pulse 动画（参考 DyberPet 好感度徽章设计）
- 工具栏按钮改为 emoji 图标（👋✨🎯🌤⚙️），更直观

**互动深度（pet.js）**
- 亲密度系统：本地 localStorage 累计互动次数，分三档（陌生/熟悉/亲密），影响启动问候语和反应文案（参考 DyberPet 好感度系统）
- 点击频率检测：1 秒内连续点击 ≥5 次触发特殊反应（戳人台词 + waving 动画），参考 DyberPet 拍拍系统
- 启动问候：2.5 秒延迟后根据亲密度档位自动说话，三档文案各异
- 拖拽释放：35% 概率随机说一句话（位置评论），三档文案
- 边缘弹回：宠物自动漫游碰到左/右边缘时反转跑步方向

**架构扩展（main.js + preload.js）**
- 新增 `getOnlineFriends()` + `broadcastFriendsOnline()` — 好友上下线时实时广播到渲染层
- `getRendererPetConfig()` 包含初始 `friendsOnline` 状态，启动即同步
- `pet:move-by` 检测边缘碰撞，发送 `pet:hit-edge` 事件给渲染层
- preload.js 新增 `onEdgeHit` / `onFriendsOnline` 两个 IPC 回调通道

## 2026-05-11（续）：快捷面板 + 偏好设置UI + 实时预览

**快捷面板毛玻璃升级（styles.css）**
- `backdrop-filter: blur(14px)` + 渐变背景透明度调整，视觉层次更清晰
- `border-radius` 8 → 10px；`box-shadow` 增加顶部内高光 `inset 0 1px 0`
- 入场动画改为弹性缓动 `cubic-bezier(0.34, 1.4, 0.64, 1)`
- `#toolRail` 添加顶部分隔线 `border-top: 1px solid rgba(255,255,255,0.08)`
- 按钮 hover 改为白色半透明，比蓝色更协调

**偏好设置侧边栏升级（preferences.css）**
- `.side` 添加右边框 `border-right: 1px solid var(--ui-border)` 区分内容区
- `.side` / `.content` 统一细滚动条样式（`scrollbar-width: thin`）
- `.tab` 添加 `transition` 过渡，点击切换更流畅
- `.tab.active` 添加左侧粉色高亮条：`inset 3px 0 0 var(--ui-primary-light)`（box-shadow 技巧，保留圆角）
- 侧边导航图标从字母（H/D/M...）改为有意义的 Unicode 符号（♥/✦/✉/⇌/⊡/⊞/✿/↺/☁/⚙）

**偏好设置实时预览（main.js + preload.js + preferences.js）**
- 新增 `previewScaleForPreferences()` + `previewOpacityForPreferences()` 两个 preview 函数
- 对应 IPC handler：`preferences:preview-scale` / `preferences:preview-opacity`
- preload.js 暴露 `previewScale` / `previewOpacity` 到渲染层
- preferences.js 的 scale/opacity 滑块增加 `input` 事件监听（scale 有 100ms debounce）
- 关闭偏好设置窗口**未点击保存**时自动还原 scale 和 opacity 到打开前的值

## 2026-05-10

- 参考 OpenPets、VPet、BongoCat 和 Shimeji-Desktop 等社区桌宠项目后，修正产品默认方向：优先呈现真实关系连接，不再把复杂偏好设置作为第一入口。
- 新增默认关系主页：展示当前关系对象、连接状态、短消息发送、邀请码添加、制作形象和安静边界。
- 将 Connect、Privacy、Profile、Pet Library、Interaction、Weather、Behavior 等复杂页面收进高级设置模式，降低朋友试用时的理解成本。
- 更新产品蓝图、产品设计文档和项目路线图，明确“把一个真实的人做成桌面陪伴”是当前阶段的体验重心。
- 参考社区桌宠项目的精致界面表达，升级关系主页 UI：增加关系状态摘要、快捷消息、最近消息提示，并增强按钮、主卡和功能卡片的视觉层级。
- 进一步下钻开源项目源码，记录 BongoCat、VPet、OpenPets、Shijima-Qt 的真实 UI 结构、颜色、边框、圆角、按钮和偏好设置组织方式，新增 UI 参考项目代码调研文档。
- 基于源码调研重做偏好页视觉系统：引入主题变量化、固定侧栏、8px 卡片、1px 边框、16px 设置项内边距和更克制的高级设置入口。
- 从真实偏好设置窗口中移除桌面原型展示板和侧边产品预览，偏好设置回归社区项目式的左侧导航 + 右侧设置内容结构。
- 继续重构偏好设置页：制作形象、消息、连接细节、隐私以及高级设置基础页统一为 BongoCat/VPet 式单列分组设置项，减少旧控制台卡片感。
- 纠正视觉方向：不再采用蓝色工具风，改为深中性色底、温柔玫瑰/珊瑚主操作、鼠尾草绿在线状态，让 UI 更贴近朋友和情侣之间的真实陪伴产品。
- 继续重构制作形象与消息页：制作形象改为“关系对象、形象预览绑定、gpt-image2 提示词导入”的工作流；消息页改为真实关系消息时间线 + 快捷发送，并移除默认导航里的动物符号暗示。

## 2026-05-09

- 记录“桌宠连接”设想，作为未来社交层方向。
- 将宠物导入和角色切换提升为偏好设置中的一等体验。
- 将隐藏的运行时行为设置露出给用户，减少对右键菜单的依赖。
- 增加宠物包导入前预览和基础校验。
- 扩展桌宠连接的完整业务设计，包括好友、消息、在线状态、隐私、安全和分期。
- 拆分产品文档：总蓝图、宠物库、桌宠连接、迭代记录。
- 曾实现桌宠连接第一版本地模拟，用来验证连接设置、来信气泡和勿扰静默体验。
- 将桌宠连接升级为真实 WebSocket 链路：注册、本地身份、邀请码加好友、好友状态、实时消息和离线队列。
- 将 Pet Connect 服务部署到 VPS，并通过 Caddy 暴露 HTTPS/WSS 入口。
- 增加真实本地测试朋友桌宠：自动注册第二个服务器账号，通过邀请码成为好友，并用真实链路给当前桌宠发消息。
- 优化连接页按钮风格，区分主操作和次操作。
- 基于第一版视觉原型新增正式产品设计文档，明确“DIY 自定义 + 朋友桌宠连接”为核心方向，AI 作为后续增强能力。
- 将偏好设置的 Connect 页重构为卡片式连接控制台，覆盖服务器、个人状态、邀请码、添加好友、好友列表、发送消息、勿扰和真实测试朋友。
- 根据产品原型纠偏，将偏好设置窗口升级为三栏产品大画布：左侧桌面实景预览，中间真实连接控制台，右侧宠物包导入预览和朋友桌宠反馈。
- 明确产品方向为“关系型桌宠”：情侣、好友或重要的人可以互相把对方形象做成桌宠，并通过真实连接和短消息形成桌面陪伴。
- 新增项目规划与任务记录文档，用里程碑、任务看板和已完成记录管理后续实现进度。
- 实现关系桌宠管理第一版：本地关系称呼、备注名、关系备注、好友卡片关系展示，以及单个关系桌宠静默。
- 实现 DIY Avatar 第一版：可以把已导入或内置的桌宠包绑定到某个关系对象，作为这个人的关系桌宠形象。
- 将 Messages 和 Privacy 从占位页面升级为真实功能页：最近消息、快速回复、清空本地消息、入站开关、勿扰、状态和单人静默。
- 明确 gpt-image2 可用于生成商业级系统图像资产，但生成结果必须进入真实产品流程，而不是只作为展示图。
- 实现 gpt-image2 生成请求入口：生成高质量提示词、复制提示词、导入生成结果；明确禁止脚本生图。
- 实现 gpt-image2 图片结果导入为基础宠物包：选择生成图后自动创建单帧宠物包、进入预览校验，并绑定到关系对象。
- 实现 gpt-image2 多动作结果导入为宠物包：从动作图片文件夹识别并合成多行动作 spritesheet，继续走预览、校验和绑定流程。
