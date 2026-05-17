const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const frontendDistPath = path.join(__dirname, '../frontend/dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

app.use(express.json());
app.use(express.static(frontendDistPath));

async function resolveXhsLink(shortUrl) {
  try {
    const response = await fetch(shortUrl, {
      method: 'GET',
      redirect: 'follow',
    });

    return response.url || shortUrl;
  } catch (error) {
    console.error('解析短链失败:', error);
    return shortUrl;
  }
}

app.get('/api/resolve', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: '请提供 url 参数' });
  }

  try {
    const realUrl = await resolveXhsLink(url);

    return res.json({
      success: true,
      shortUrl: url,
      realUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  if (fs.existsSync(frontendIndexPath)) {
    return res.sendFile(frontendIndexPath);
  }

  return res.status(500).send('Frontend build not found. Run npm run build first.');
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`
🚀 xhs-redirect React 服务已启动

访问地址:
  本地: http://localhost:${PORT}

默认首页:
  http://localhost:${PORT}/

示例跳转:
  http://localhost:${PORT}/redirect?param=https://xhslink.com/m/AZybE6hgByh

API 接口:
  GET /api/resolve?url=短链地址
  GET /health
    `);
  });
}