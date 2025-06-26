// 导入 Electron 的 IPC 渲染进程模块和上下文桥接模块
import { ipcRenderer, contextBridge } from "electron";

// --------- 向渲染进程暴露一些 API ---------
// 使用 contextBridge 安全地将 ipcRenderer 功能暴露给渲染进程
contextBridge.exposeInMainWorld("ipcRenderer", {
  // 监听来自主进程的消息
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  // 移除事件监听器
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  // 向主进程发送异步消息
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  // 向主进程发送同步请求并等待响应
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  }

  // 你可以在这里暴露其他需要的 API
  // ...
});

// --------- 预加载脚本加载相关功能 ---------
// DOM 就绪状态检测函数
function domReady(condition: DocumentReadyState[] = ["complete", "interactive"]) {
  return new Promise(resolve => {
    // 如果当前文档状态已满足条件，直接解析 Promise
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      // 否则监听文档状态变化
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

// 安全的 DOM 操作工具对象
const safeDOM = {
  // 安全地添加子元素（避免重复添加）
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child);
    }
  },
  // 安全地移除子元素（确保元素存在才移除）
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child);
    }
  }
};

/**
 * 加载动画相关资源链接：
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
// 创建加载动画的函数
function createLoading() {
  // 加载动画的 CSS 类名
  const className = `loaders-css__square-spin`;
  // 加载动画的 CSS 样式内容
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  // 创建样式元素
  const oStyle = document.createElement("style");
  // 创建加载动画容器元素
  const oDiv = document.createElement("div");

  // 设置样式元素的 ID 和内容
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  // 设置加载动画容器的类名和内容
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    // 添加加载动画到页面
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    // 从页面移除加载动画
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    }
  };
}

// ----------------------------------------------------------------------

// 获取加载动画的控制方法
const { appendLoading, removeLoading } = createLoading();
// 等待 DOM 就绪后显示加载动画
domReady().then(appendLoading);

// 监听来自渲染进程的消息，用于手动移除加载动画
window.onmessage = (ev: MessageEvent) => {
  if (ev.data.payload === "removeLoading") {
    removeLoading();
  }
};

// 设置超时自动移除加载动画（5秒后）
setTimeout(removeLoading, 4999);
