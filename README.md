# ⚔️ Avalon Assistant (阿瓦隆助手)

专为经典桌游《抵抗组织：阿瓦隆》(The Resistance: Avalon) 打造的现代化数字助手。

这是一个渐进式 Web 应用 (PWA)，旨在替代传统的卡牌分发和法官（上帝）流程。通过一部手机即可组织 5-10 人的完整游戏，支持全流程引导、身份分配、投票记录及逻辑判定。

## ✨ 主要特性

*   **📱 移动端优先体验**：专为 iOS 和 Android 设计的自适应布局，支持动态视口高度 (Dynamic Viewport Height)，提供类似原生 App 的全屏沉浸体验。
*   **⚡ PWA 离线支持**：支持安装到手机主屏幕。内置 Service Worker 缓存策略，**即使在没有网络（离线）的环境下也能完整运行**。
*   **🎭 灵活的角色配置**：
    *   支持 5-10 人局的标准配置。
    *   可选特殊角色：梅林、派西维尔、刺客、莫甘娜、莫德雷德、奥伯伦。
    *   智能检测阵营平衡性。
*   **🤫 传手机模式 (Pass-and-Play)**：
    *   安全的身份查看环节。
    *   匿名的任务执行环节。
    *   防止屏幕反光泄露信息的 UI 设计。
*   **📊 自动化流程**：
    *   自动计算任务所需人数。
    *   自动判定任务成败（支持 7 人局第 4 轮双失败规则）。
    *   投票次数（Vote Track）追踪。
    *   刺杀梅林环节引导。
*   **🎨 沉浸式 UI**：暗黑风格设计，高质感材质背景与流畅的交互动画。

## 🛠️ 技术栈

本项目基于现代前端技术栈构建：

*   **核心框架**: [React 18](https://react.dev/)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **语言**: [TypeScript](https://www.typescriptlang.org/)
*   **样式**: [Tailwind CSS](https://tailwindcss.com/)
*   **PWA**: [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)
*   **部署**: GitHub Actions

## 🚀 快速开始

### 本地开发

1.  **克隆仓库**
    ```bash
    git clone https://github.com/your-username/Avalon.git
    cd Avalon
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    访问 `http://localhost:5173` 即可预览。

### 构建生产版本

```bash
npm run build
```
构建产物将输出到 `dist` 目录。

## 📦 部署 (GitHub Pages)

本项目已配置自动化部署流程。

1.  在 `vite.config.ts` 中，确认 `base` 路径已设置为你的仓库名称（当前为 `/Avalon/`）。
2.  将代码推送到 GitHub 的 `main` 或 `master` 分支。
3.  GitHub Actions 会自动触发构建并部署到 `gh-pages` 环境。
4.  在 GitHub 仓库的 **Settings -> Pages** 中，确保 Source 设置为 `GitHub Actions`。

部署完成后，应用地址通常为：`https://<your-username>.github.io/Avalon/`

## 🎮 游戏规则简介

本应用遵循标准的阿瓦隆游戏规则：

1.  **正义阵营 (蓝方)**：需成功完成 3 个任务，并在游戏结束时保护梅林不被刺杀。
2.  **邪恶阵营 (红方)**：需促使 3 个任务失败，或者在任务失败数不足时，通过刺杀梅林窃取胜利。
3.  **组队与投票**：如果连续 5 次组队方案被否决，邪恶阵营直接获胜。

## 📄 许可证

MIT License
