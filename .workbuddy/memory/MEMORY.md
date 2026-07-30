# 识野 Insight 个人网站 · 项目长期记忆

## 项目锚点
- 站点：识野 Insight（jeremyhang.online，Netlify 部署自 GitHub jeremy-hang/shiye-insight，main 分支自动构建）
- 技术栈：React 18 + Vite 5 + TS + motion v12 + lucide-react + 纯 CSS（禁 Tailwind，已全删）
- 隐私红线：全站只出现 "Jeremy" 一个名字，无公司/城市/职业信息

## 工作流约定（Jeremy 定的规矩）
- **2026-07-30 起：不主动同步线上。** 改完本地构建验证即停，等 Jeremy 明确说「同步/上线」才 commit + push。之前的模式是改完就推，已作废。
- 设计风格：极简黑白，Inter 字体，动画统一 ease [0.16,1,0.3,1]，响应式断点 768px。
- Jeremy 说不满意时先问清是宽度还是高度、是布局还是视觉——别瞎猜（第五轮「太宽」教训）。

## 关键教训
- flex-basis 会跟随 flex-direction 双向生效（第十轮移动端空白 bug 根因）：固定宽度必须放桌面 media query 内。
- motion v12 的 ease 数组必须 `as const`，否则 TS2322。
- 长中文 Write 后要 grep 抽查乱码字符（第二十二轮混入过「可��续」）。
- 沙箱代理会间歇拦截 git push（CONNECT tunnel 502）：用 ~/.workbuddy/skills/git-push-via-api 兜底走 REST API。
- dev/preview 服务器必须 run_in_background=true 起，(cmd &) 会被沙箱回收。

## 部署链路
- 上线流程：改代码 → npm run build 验证 → Jeremy 确认 → git commit + push → Netlify 自动重建（1-2 分钟生效）。
- DNS：DNSPod 托管，@ A 75.2.60.5 + www CNAME jade-tulumba-9fd16c.netlify.app。
- Token 卫生：PAT 不留在 .git/config remote URL；对话中暴露过的 token 提醒 Jeremy 吊销。
