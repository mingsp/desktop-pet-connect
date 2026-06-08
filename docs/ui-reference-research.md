# UI 参考项目代码调研

本文件记录社区开源项目的真实界面实现细节，用于约束 Desktop Pet Connect 的视觉和偏好设置设计。这里不记录完整源码，只记录可转化为产品规范的业务和 UI 结论。

## BongoCat

参考仓库：[ayangweb/BongoCat](https://github.com/ayangweb/BongoCat)

查看文件：

- `src/pages/preference/index.vue`
- `src/components/pro-list/index.vue`
- `src/components/pro-list-item/index.vue`
- `src/pages/preference/components/cat/index.vue`
- `src/pages/preference/components/general/index.vue`
- `uno.config.ts`

关键做法：

- 偏好设置使用固定侧栏 + 内容区：侧栏宽度约 `w-30`，菜单项是 `size-20` 的方形入口。
- 内容区不是大块营销卡片，而是分组列表：`ProList` 负责标题，`ProListItem` 负责每一行设置。
- 设置项样式核心是 `b-1 b-solid p-4 bg-elevated b-border-sec rounded-lg`，也就是 1px 边框、16px 内边距、8px 左右圆角、轻微抬高背景。
- 颜色体系使用 Ant Design Vue CSS 变量：背景、文字、边框、主色都走变量，而不是硬编码到每个组件。
- 偏好设置分类比较克制：角色设置、通用设置、模型、快捷键、关于。

可转化规则：

- 我们的默认页和高级设置都应该使用“分组 + 设置项”的结构，减少散乱卡片。
- 侧栏菜单要像产品导航，而不是一排普通按钮。
- 卡片边框保持 1px，圆角优先 8px，内边距 13-16px。

## VPet

参考仓库：[LorisYounger/VPet](https://github.com/LorisYounger/VPet)

查看文件：

- `VPet-Simulator.Core/Display/Theme.xaml`
- `VPet-Simulator.Core/Display/basestyle.xaml`
- `VPet-Simulator.Windows/WinDesign/winGameSetting.xaml`
- `VPet-Simulator.Windows/WinDesign/winCharacterPanel.xaml`

关键做法：

- 主题色非常明确：浅色主色 `#81D4FA`，深色主色 `#039BE5`，深色按钮 `#0286C6`，成功/警告/危险分别用 `#AACC6C`、`#FFCC4C`、`#FF4C4C`。
- 设置窗口是左侧 180px 菜单 + 右侧内容区，内容区容器有 15px 圆角。
- 常见按钮圆角是 4-5px，列表项选中态使用主色背景和白色文字。
- 搜索框、ComboBox、Switch、Slider 都有稳定尺寸：例如 Switch 常见 `35 x 18`，ToggleSize `14`。
- 内容密度偏高，但层级清楚：左侧菜单、顶部标签、右侧表单分区。

可转化规则：

- 我们只吸收 VPet 的主题变量化、控件尺寸和内容密度，不采用其蓝色主色。
- 本项目的主色应服务“真实关系陪伴”：深中性色底 + 温柔玫瑰/珊瑚主操作 + 鼠尾草绿在线状态。
- 默认页可以更精致，但高级页要保持高密度和可扫读。
- 控件圆角不要过大，按钮 5px 左右，卡片 8px 左右。

## OpenPets

参考仓库：[alterhq/openpets](https://github.com/alterhq/openpets)

查看文件：

- `Sources/OpenPetsMenuBar/OpenPetsInstallPreviewWindow.swift`
- `Sources/OpenPetsMenuBar/OpenPetsAgentOnboardingWindow.swift`

关键做法：

- 安装预览窗口使用原生克制布局：窗口约 `460 x 340`，整体 `padding 22`，主间距 `18`。
- 预览图固定在左侧，约 `148 x 160`；右侧是标题、ID、描述。
- 底部操作按钮右对齐，主按钮使用系统的 prominent 样式。
- 文案非常功能化，不堆概念。

可转化规则：

- 我们的导入/制作形象流程要采用固定预览区 + 信息区 + 底部操作，而不是堆满说明文字。
- 主操作必须靠右或位于清楚的操作区，普通用户能一眼知道下一步。

## Shijima-Qt

参考仓库：[pixelomer/Shijima-Qt](https://github.com/pixelomer/Shijima-Qt)

查看文件：

- `ShijimaManager.cc`
- `ShijimaContextMenu.cc`
- `ShimejiInspectorDialog.cc`

关键做法：

- 管理器主界面极简：`QListWidget` 展示角色，图标尺寸 `64 x 64`，双击生成。
- 导入是核心动作：菜单提供 Import，窗口支持拖拽导入。
- 设置藏在菜单里，包含 multiplication、windowed mode、scale 等，不把高级能力放到默认路径。
- Inspector 使用 `QFormLayout`，适合调试，不面向普通用户。

可转化规则：

- 普通用户默认只需要看到“导入/添加/双击或点击使用”这类动作。
- 高级诊断和内部状态应留在高级设置里。

## 对本项目的 UI 规范结论

- 偏好设置必须是固定侧栏 + 内容面板，不允许再把桌面原型图或产品展示板放在偏好设置左侧。
- 原型展示只适合独立的产品展示图或营销/设计稿，不进入真实设置窗口。
- 主色：不使用蓝色工具风，采用温柔玫瑰、珊瑚和鼠尾草绿，让界面更像关系陪伴产品而不是设备管理面板。
- 组件：参考 BongoCat 的列表项卡片结构，1px 边框、8px 卡片、16px 内边距。
- 导入与制作：参考 OpenPets，固定预览区 + 描述区 + 明确主操作。
- 高级功能：参考 Shijima，隐藏到高级模式，默认不抢主路径。
