# 小红书短链跳转服务

React 前端 + Express 后端的短链跳转服务，默认首页是 index 快链页，根路径直接进入页面导航。

## 快速开始

### 1. 安装依赖

```bash
cd xhs-redirect
npm install
```

### 2. 启动服务

```bash
npm start
```

`npm start` 会先构建前端，再启动后端服务。

服务将在 http://localhost:3000 启动

### 开发模式

```bash
npm run dev
```

前端在 `frontend/`，后端在 `backend/`。

## 使用方法

### 方式 1：直接访问首页快链

```
http://localhost:3000/
```

### 方式 2：直接访问跳转页面

```
http://localhost:3000/redirect?param=https://xhslink.com/m/AZybE6hgByh
```

### 方式 3：使用 API 解析短链

```bash
curl "http://localhost:3000/api/resolve?url=https://xhslink.com/m/AZybE6hgByh"
```

返回：
```json
{
  "success": true,
  "shortUrl": "https://xhslink.com/m/AZybE6hgByh",
  "realUrl": "https://www.xiaohongshu.com/miniapp/qrcode?..."
}
```

### 上传 Logo

访问 `http://localhost:3000/logo`，上传或填写一张 Logo 图片地址后保存到本站，`/weapp` 页面会自动加载这个 Logo。

### 扫描二维码图片

访问 `http://localhost:3000/scan`，上传一张二维码图片后，页面会识别二维码内容，并自动生成本站可用的 `redirect?param=...` 链接和对应二维码。

## 部署到生产环境

### 使用 Vercel 部署（推荐）

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
vercel --prod
```

### 使用 Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

构建并运行：
```bash
docker build -t xhs-redirect .
docker run -p 3000:3000 xhs-redirect
```

## 功能特性

- ✅ React 前端页面重写
- ✅ 前后端分离目录结构
- ✅ 解析小红书短链
- ✅ 自动唤起小红书 APP（iOS/Android）
- ✅ 微信内跳转提示
- ✅ 浏览器中打开选项
- ✅ 上传二维码图片并生成本站参数链接
- ✅ RESTful API 接口

## 文件说明

| 文件 | 说明 |
|------|------|
| `frontend/` | React 前端源码 |
| `backend/` | Express 后端服务 |
| `package.json` | 根目录脚本和依赖 |
| `vercel.json` | Vercel 部署配置 |

## 注意事项

1. 小红书 APP 需要安装才能唤起
2. iOS 和 Android 的唤起方式不同
3. 微信内需要使用「在浏览器打开」功能

## 自定义配置

如果要改首页快链或功能页文案，修改 `frontend/src/App.jsx` 即可。
