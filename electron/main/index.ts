// 导入 Electron 核心模块
import { app, BrowserWindow, shell, ipcMain } from "electron";
// 导入 Node.js 模块工具
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
// 导入自定义更新模块
import { update } from "./update";

// 创建 require 函数以支持 ES 模块
createRequire(import.meta.url);
// 获取当前文件所在目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 构建后的目录结构
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron 主进程
// │ └─┬ preload
// │   └── index.mjs   > 预加载脚本
// ├─┬ dist
// │ └── index.html    > Electron 渲染进程
//

// 设置应用根目录
process.env.APP_ROOT = path.join(__dirname, "../..");

// 主进程构建输出目录
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
// 渲染进程构建输出目录
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
// Vite 开发服务器 URL
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

// 设置公共资源目录：开发环境使用 public 目录，生产环境使用构建输出目录
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

// 为 Windows 7 禁用 GPU 硬件加速（兼容性处理）
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// 为 Windows 10+ 设置应用程序名称用于系统通知
if (process.platform === "win32") app.setAppUserModelId(app.getName());

// 确保应用只能运行一个实例
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// 主窗口实例
let win: BrowserWindow | null = null;
// 预加载脚本路径
const preload = path.join(__dirname, "../preload/index.mjs");
// 主页面 HTML 文件路径
const indexHtml = path.join(RENDERER_DIST, "index.html");

// 创建主窗口函数
async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    icon: path.join(process.env.VITE_PUBLIC!, "favicon.ico"),
    webPreferences: {
      preload
      // 警告：在生产环境中启用 nodeIntegration 和禁用 contextIsolation 是不安全的
      // nodeIntegration: true,

      // 建议使用 contextBridge.exposeInMainWorld
      // 更多信息请参考：https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    }
  });

  if (VITE_DEV_SERVER_URL) {
    // 开发环境：加载 Vite 开发服务器 URL
    win.loadURL(VITE_DEV_SERVER_URL);
    // 如果应用未打包，则打开开发者工具
    win.webContents.openDevTools();
  } else {
    // 生产环境：加载本地 HTML 文件
    win.loadFile(indexHtml);
  }

  // 测试：主动向渲染进程发送消息
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // 让所有链接都用浏览器打开，而不是在应用内打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // 启用自动更新功能
  update(win);
}

// 应用准备就绪时创建主窗口
app.whenReady().then(createWindow);

// 当所有窗口都关闭时的处理
app.on("window-all-closed", () => {
  win = null;
  // 在 macOS 上，应用通常保持活跃状态，即使没有打开的窗口
  if (process.platform !== "darwin") app.quit();
});

// 当用户尝试打开第二个应用实例时的处理
app.on("second-instance", () => {
  if (win) {
    // 如果用户尝试打开另一个实例，则聚焦到主窗口
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

// macOS 特有：当应用被激活时的处理（例如点击 dock 图标）
app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    // 如果有窗口存在，则聚焦第一个窗口
    allWindows[0].focus();
  } else {
    // 如果没有窗口，则创建新窗口
    createWindow();
  }
});

// 新窗口示例：处理打开新窗口的 IPC 请求
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (VITE_DEV_SERVER_URL) {
    // 开发环境：加载带有路由参数的 URL
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    // 生产环境：加载带有 hash 参数的本地文件
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
