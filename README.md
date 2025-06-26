# 💰 ww记账 - 现代化个人财务管理应用

一个采用iOS毛玻璃风格设计的现代化记账应用，基于React + TypeScript + Electron构建，提供流畅的用户体验和优雅的界面设计。

## ✨ 特性

- 🎨 **iOS毛玻璃风格UI** - 半透明背景、模糊效果、精美边框
- 🚀 **流畅动画效果** - GSAP + Framer Motion双重动画加持
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 💾 **本地数据存储** - 使用LocalStorage进行数据持久化
- 📊 **数据可视化** - 月度趋势图和分类统计
- 🔍 **智能搜索** - 快速查找和过滤交易记录
- 📤 **数据导出** - 支持JSON格式数据备份

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **路由管理**: React Router DOM 7
- **动画库**: GSAP 3 + Framer Motion 12
- **样式方案**: Tailwind CSS 4
- **图标库**: Lucide React
- **桌面应用**: Electron 37
- **构建工具**: Vite 7
- **包管理器**: pnpm

## 📁 项目结构

```
ww-bookkeeping/
├── public/                          # 静态资源
│   └── vite.svg
├── electron/                        # Electron主进程和预加载脚本
│   ├── main/
│   └── preload/
├── src/                            # 源代码目录
│   ├── components/                 # 组件目录
│   │   ├── Layout/                # 布局组件
│   │   │   ├── Layout.tsx         # 主布局组件
│   │   │   └── Sidebar.tsx        # 侧边栏导航
│   │   └── UI/                    # UI基础组件
│   │       ├── GlassCard.tsx      # 毛玻璃卡片组件
│   │       ├── GlassButton.tsx    # 毛玻璃按钮组件
│   │       ├── GlassInput.tsx     # 毛玻璃输入框组件
│   │       ├── AnimatedContainer.tsx # 动画容器组件
│   │       ├── AnimatedNumber.tsx # 数字动画组件
│   │       ├── LoadingSpinner.tsx # 加载动画组件
│   │       └── ErrorBoundary.tsx  # 错误边界组件
│   ├── context/                   # React Context
│   │   ├── AppContextDefinition.ts # Context类型定义
│   │   └── AppContext.tsx         # Context Provider组件
│   ├── hooks/                     # 自定义Hooks
│   │   ├── useApp.ts             # 应用状态Hook
│   │   └── useLocalStorage.ts    # 本地存储Hook
│   ├── pages/                     # 页面组件
│   │   ├── Dashboard.tsx         # 仪表板页面
│   │   ├── AddTransaction.tsx    # 添加交易页面
│   │   ├── History.tsx           # 历史记录页面
│   │   ├── Statistics.tsx        # 统计分析页面
│   │   └── Settings.tsx          # 设置页面
│   ├── router/                    # 路由配置
│   │   └── index.tsx             # 路由定义
│   ├── types/                     # TypeScript类型定义
│   │   └── index.ts              # 应用类型定义
│   ├── utils/                     # 工具函数
│   │   ├── constants.ts          # 常量定义
│   │   └── animations.ts         # 动画工具函数
│   ├── App.tsx                   # 根组件
│   ├── App.css                   # 全局样式
│   ├── main.tsx                  # 应用入口
│   └── vite-env.d.ts            # Vite类型声明
├── dist-electron/                # Electron构建输出
├── node_modules/                 # 依赖包
├── package.json                  # 项目配置
├── pnpm-lock.yaml               # 依赖锁定文件
├── tsconfig.json                # TypeScript配置
├── vite.config.ts               # Vite配置（Electron版本）
├── vite.config.simple.ts        # Vite配置（Web版本）
├── eslint.config.js             # ESLint配置
└── README.md                    # 项目说明文档
```

## 🏗️ 架构设计

### 组件架构
- **Layout组件**: 提供应用整体布局和导航
- **UI组件库**: 可复用的毛玻璃风格基础组件
- **页面组件**: 各功能模块的主要页面
- **动画组件**: 封装动画逻辑的容器组件

### 状态管理
- **Context API**: 全局状态管理
- **LocalStorage**: 数据持久化
- **自定义Hooks**: 业务逻辑封装

### 路由设计
```
/ (Dashboard)           # 仪表板 - 财务概览
├── /add               # 添加记录 - 收支录入
├── /history           # 历史记录 - 交易列表
├── /statistics        # 统计分析 - 数据可视化
└── /settings          # 设置页面 - 应用配置
```

### 数据模型
```typescript
// 交易记录
interface Transaction {
  id: string;           // 唯一标识
  amount: number;       // 金额
  category: string;     // 分类图标
  description: string;  // 描述
  date: string;        // 日期
  type: 'income' | 'expense'; // 类型
  tags?: string[];     // 标签（可选）
}

// 分类定义
interface Category {
  id: string;          // 分类ID
  name: string;        // 分类名称
  icon: string;        // 图标
  color: string;       // 颜色
  type: 'income' | 'expense'; // 类型
}
```

## 🚀 快速开始

### 环境要求
- Node.js >= 20.19
- pnpm >= 8.0

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
# 启动Web版本（推荐用于开发）
pnpm dev

# 或启动Electron版本
pnpm dev:electron
```

### 构建应用
```bash
pnpm build
```

## 🎨 设计系统

### 毛玻璃效果
- **背景**: `backdrop-blur-xl bg-white/10`
- **边框**: `border border-white/20`
- **阴影**: `shadow-xl`
- **内发光**: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`

### 颜色方案
- **主背景**: 紫色到蓝色渐变
- **收入**: 绿色系 (`text-green-400`)
- **支出**: 红色系 (`text-red-400`)
- **中性**: 白色半透明 (`text-white/60`)

### 动画效果
- **页面切换**: GSAP页面进入/退出动画
- **组件交互**: Framer Motion悬停和点击效果
- **数据展示**: 数字计数和进度条动画
- **列表渲染**: 交错动画效果

## 📱 功能模块

### 1. 仪表板 (Dashboard)
- 月度收支统计
- 余额显示
- 最近交易记录
- 快速操作按钮

### 2. 添加记录 (Add Transaction)
- 收入/支出类型选择
- 金额输入
- 分类选择（12个预设分类）
- 描述和日期设置

### 3. 历史记录 (History)
- 交易列表展示
- 搜索和过滤功能
- 删除操作
- 统计信息

### 4. 统计分析 (Statistics)
- 月度趋势图
- 分类支出统计
- 收支对比
- 数据可视化

### 5. 设置 (Settings)
- 数据导出
- 应用信息
- 数据清理

## 🔧 开发指南

### 添加新页面
1. 在 `src/pages/` 创建页面组件
2. 在 `src/router/index.tsx` 添加路由
3. 在 `src/utils/constants.ts` 添加路由常量
4. 在 `src/components/Layout/Sidebar.tsx` 添加导航项

### 创建新组件
1. 在 `src/components/UI/` 创建组件文件
2. 遵循毛玻璃设计风格
3. 使用TypeScript类型定义
4. 添加动画效果（可选）

### 状态管理
1. 在 `src/context/AppContextDefinition.ts` 添加类型
2. 在 `src/context/AppContext.tsx` 实现逻辑
3. 使用 `useApp()` Hook访问状态

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**ww记账** - 让财务管理变得简单而优雅 ✨