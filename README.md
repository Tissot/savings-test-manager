# savings-test-manager

> 一个基于Vue.js的后台管理系统。

## 页面加载速度优化

### 已实现

- 使用 webpack 对代码进行压缩混淆，利用其 Tree Shaking 去除冗余代码，并提取公共代码，在减小打包文件的体积的同时提高了缓存命中率。
- 对 html、css、js 开启 gzip 压缩。（图片开启 gzip 压缩效果适得其反）。
- 图片格式采用体积相对较小的 jpeg 并对体积较大的背景图进行压缩，体积由原来的超过 1MB 压缩到 200KB 左右。同时为优化用户体验，对 jpeg 图片进行了 progressive 处理。
- 背景图的随机切换采用动态导入，即未随机到的背景图不会发起请求。
- 使用 http1.1 缓存减少后续访问时间，配置 nginx 使得 index.html 进行协商缓存，而 css、js 以及其他图片等文件采用强制缓存与共享缓存，极限地减少了 rtt 并提高了缓存利用率。如果需要更新缓存，只需要变更文件名以及 index.html 中对于该文件的引用即可。

### 待实现

- http 协议版本升级为 2，使用其二进制协议、多路复用、http 头部压缩以及服务端推送的特性进行进一步优化。

## 截图

<img src="./client/src/assets/screenshots/1.jpeg" />
<img src="./client/src/assets/screenshots/2.jpeg" />
<img src="./client/src/assets/screenshots/3.jpeg" />
<img src="./client/src/assets/screenshots/4.jpeg" />
<img src="./client/src/assets/screenshots/5.jpeg" />

## 许可

GNU General Public License v3.0
