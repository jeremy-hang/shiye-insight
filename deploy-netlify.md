# Netlify 部署指南 — jeremyhang.online

代码已初始化为 git 仓库并提交了当前完整版本（`main` 分支，`aa8f3da 识野 Insight 个人主页`），`.gitignore` 已经排除了 `node_modules/` 和 `dist/`。

---

## 第一步：把代码推到 GitHub

前提：你有 GitHub 账号（如果没有，先去 github.com 注册，记一下用户名）。

1. 打开 GitHub → 右上角 **+** → **New repository**
2. Repository name：`shiye-insight`（或你喜欢的其他名）
3. **不要**勾选 "Add a README"、"Add .gitignore"、"Choose a license"
4. 点 **Create repository**
5. 创建后页面顶部会显示推送命令，类似：
   ```
   git remote add origin https://github.com/你的用户名/shiye-insight.git
   git branch -M main
   git push -u origin main
   ```
6. 打开终端，把命令中的「你的用户名」替换成实际 GitHub 用户名，然后逐条粘贴运行：
   ```bash
   git remote add origin https://github.com/你的用户名/shiye-insight.git
   git push -u origin main
   ```
7. 第一次 push 会弹 prompt 要你登录 GitHub —— 用浏览器确认，授权 WorkBuddy 推送。

先例：我的 GitHub 用户名是 jeremyhang，所以命令会是：
```
git remote add origin https://github.com/jeremyhang/shiye-insight.git
git push -u origin main
```
（把 `jeremyhang` 换成你自己的实际用户名）

---

## 第二步：Netlify 部署

1. 打开 https://www.netlify.com/ → 右上角 **Log in** → **Sign up with GitHub**（用你刚才的 GitHub 账号直接登）
2. 登录后到达 dashboard，点 **"Add new site" → "Import an existing project" → "Deploy with GitHub"**
3. Netlify 会弹窗让你授权，让它访问你的 GitHub 仓库 —— 授权即可
4. 找到 **shiye-insight** 仓库，点进去
5. 构建配置 Netlify 会自动识别 Vite，保持默认就行：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 点 **Deploy site** 开始部署
7. 等 1-3 分钟，部署成功后进入 site-overview，顶部会显示临时访问地址，形如：
   ```
   https://gleaming-phoenix-abc123.netlify.app
   ```
8. 打开这个地址，确认能看到完整的识野 Insight 页面（含背景视频、项目、关于、公众号二维码）

如果看不到或者报错，先别慌，把报错截图/failed log 交给我看看，我现场诊断。

---

## 第三步：绑域名 jeremyhang.online

回到 Netlify site-overview → **Domain settings** → **Add a domain** → 输入 `jeremyhang.online` → Add

Netlify 会显示两种 DNS 记录要你配置（两种模式二选一）：

### 方案 A（最简单且推荐）：Netlify DNS
DNS 托管也交给 Netlify，你要做的事是在 DNSPod 把域名的解析服务器换成 Netlify 给的 nameserver（通常类似 `dns16.p08.nsone.net` / `dns26.p08.nsone.net` / `dns36.p08.nsone.net` / `dns46.p08.nsone.net`，以 Netlify Domains 页面显示的为准）。

**如何操作：**
1. 登录 dnspod.cn（或腾讯云控制台 → DNSPod）
2. 找到域名 jeremyhang.online → 点进去 → **域名设置 / DNS 修改**
3. 把 DNS 服务器改为 Netlify 提示的那 4 个 NS 记录（一般用逗号或换行分隔）
4. 保存

然后回 Netlify Domain settings 页面，几分钟到 30 分钟内它会检测到 nameserver 生效，把 jeremyhang.online 和 www.jeremyhang.online 都接受，HTTPS 证书自动签发。

### 方案 B（DNS 继续留 DNSPod）：A 记录 + CNAME
如果不想换 nameserver，就保持 DNSPod 管理 DNS，到 DNSPod 添加两条记录：

- **A 记录**：主机记录 `@`，记录值 `75.2.60.5`（Netlify 的根 IP；先检查 Netlify 提示的最新 IP，如果不一样以 Netlify Domains 页面为准）
- **CNAME 记录**：主机记录 `www`，记录值 你临时分配到的那个 netlify.app 子域名（比如 `gleaming-phoenix-abc123.netlify.app`）

保存后等 1-30 分钟 DNS 生效，Netlify 检测通过就会正式上线。

---

## 验证（几分钟到 30 分钟）

- https://jeremyhang.online 能打开，是你的识野 Insight 页面
- https://www.jeremyhang.online 能打开，同样内容
- Netlify Domains 页面 jeremyhang.online 状态是 **Active**（不再是 Pending）
- HTTPS 可用（Netlify 自动给申请，几分钟后生效）

---

## 出问题了告诉我

- 推送失败：GitHub 拒绝 / 权限错误
- Netlify 构建失败：log 里报错
- 打不开预览网站
- DNS 改了 1 小时还没生效

我都能快速诊断。现在开始第一步，完成到第3步卡哪步喊我。
