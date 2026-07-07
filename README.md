# project_019_开学期末本地工作台

## 项目目标

将原本的宣传式首页调整为真正用于工作的「不想加班工作宝」分类工作系统。页面围绕 `H:\1中南办公室` 的真实工作内容设计，固定包含：首页、待办页、文件模板库、工作台、我的；主要工作分为办公室、安全稳定、副班主任工作三块。

## 当前功能

- 首页：查看三块主要工作、近期待办、最近材料记录。
- 待办页：新增待办、按工作类别筛选、勾选完成，本地浏览器保存。
- 文件模板库：按办公室、安全稳定、副班主任工作分类，登记上传文件、图片佐证和链接。
- 工作台：按三大类展示具体工作入口。
- 我的：查看资料源、待办数量、材料记录数量和后续个人设置入口。

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## 本地地址

```text
http://127.0.0.1:8019
```

## 使用方式

双击或右键运行：

```powershell
.\启动本地工作台.ps1
```

首次运行会自动执行依赖安装；每次启动前会扫描 `H:\1中南办公室` 生成资料索引并构建页面，随后启动本地文件服务并打开网页。

停止服务：

```powershell
.\停止本地工作台.ps1
```

## 常用命令

```powershell
npm install
npm run dev
npm run build
node scripts\generate-library-index.cjs
node local-server.cjs
```

## 文件说明

- `src/App.tsx`：页面主组件、五大主页面、三类工作入口、待办和材料记录逻辑。
- `src/index.css`：Tailwind 入口和自定义动画。
- `index.html`：Vite 页面入口。
- `启动本地工作台.ps1`：构建页面、启动本地预览服务并打开浏览器。
- `停止本地工作台.ps1`：停止本地服务。
- `scripts\generate-library-index.cjs`：扫描 U 盘资料并生成 `data\library-index.json`。
- `local-server.cjs`：本地网页与 H 盘文件下载服务。
- `data\library-index.json`：自动生成的资料索引，不复制原文件。
