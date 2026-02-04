// 1. 定义版本号：每次修改图标或代码后，手动把这个数字加 1
const cacheName = 'lumber-v27';

// 2. 离线缓存清单：必须包含所有核心文件，特别是 icon.png
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 3. 安装阶段：下载所有资源到手机本地存储
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('正在缓存 V27 资源...');
      return cache.addAll(assets);
    })
  );
});

// 4. 激活阶段：自动清理掉老板手机里旧的 v6, v16, v22 等旧版本缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

// 5. 运行阶段：老板在林子里没信号时，App 优先从本地读取缓存
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
