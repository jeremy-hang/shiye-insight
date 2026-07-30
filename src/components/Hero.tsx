import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, X, User } from 'lucide-react'

const easeCurve = [0.16, 1, 0.3, 1] as const

// 旋转双圆角矩形 Logo
function BrandIcon() {
  return (
    <span className="brand-icon" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(-35 14 14)">
          <rect x="5" y="5" width="18" height="18" rx="6" fill="#000000" />
          <rect x="11" y="11" width="6" height="6" rx="3" fill="#000000" fillOpacity="0.5" />
        </g>
      </svg>
    </span>
  )
}

// 4-dot 网格图标（识野传送门按钮，已改为「保持联系」）
// 已随右侧按钮一起删除，如需再启用复制此函数恢复

const tagPills = ['洞察', '成长', '旷野']

const menuItems = [
  { label: '首页', target: '#top' },
  { label: '项目', target: '#projects' },
  { label: '关于识野', target: '#about' },
  { label: '联系', target: '#about-grid' },
]

// 滚动到指定锚点
function scrollTo(target: string) {
  const el = document.querySelector(target)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (target: string) => {
    setMenuOpen(false)
    // 等菜单关闭动画完成再滚动
    setTimeout(() => {
      scrollTo(target)
    }, 250)
  }

  return (
    <section className="hero" id="top">
      {/* 背景视频层 */}
      <motion.div
        className="video-wrapper"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: easeCurve }}
      >
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* 顶部固定导航 */}
      <motion.header
        className="navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeCurve }}
      >
        <div className="nav-left">
          <div className="nav-brand">
            <BrandIcon />
            <span className="brand-text">识野 Insight</span>
          </div>

          {/* 衍生菜单组：白色面板包住菜单胶囊 + 弹出链接，合在一起长出来 */}
          <div className="menu-wrap">
            <motion.div
              className="menu-shell"
              animate={{
                paddingLeft: menuOpen ? 4 : 0,
                paddingRight: menuOpen ? 4 : 0,
              }}
              transition={{ duration: 0.3, ease: easeCurve }}
            >
              <button
                className="menu-btn"
                aria-label="菜单"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span className="menu-circle">
                  {menuOpen ? <X size={12} strokeWidth={3} color="#000000" /> : <Plus size={12} strokeWidth={3} color="#000000" />}
                </span>
                <span className="menu-label">菜单</span>
              </button>

              {/* 菜单链接从胶囊右边长出来 */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    className="menu-links"
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -8, opacity: 0 }}
                    transition={{ duration: 0.25, ease: easeCurve }}
                    aria-label="快捷菜单"
                  >
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        className="menu-link"
                        initial={{ x: -4, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -4, opacity: 0 }}
                        transition={{ delay: 0.02 * (index + 1), duration: 0.2, ease: easeCurve }}
                        onClick={() => handleNav(item.target)}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* 右上角：认识我 → 平滑滚到 About 黑底板块 */}
        <button
          className="know-btn"
          onClick={() => scrollTo('#about')}
          aria-label="认识我"
        >
          <span className="know-circle">
            <User size={12} strokeWidth={2.5} color="#000000" />
          </span>
          <span className="know-label">认识我</span>
        </button>
      </motion.header>

      {/* 底部内容区 */}
      <motion.footer
        className="footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: easeCurve }}
      >
        <div className="footer-gradient">
          <div className="gradient-bg" aria-hidden="true" />
          <div className="footer-content">
            <div className="footer-left">
              <motion.div
                className="subtitle-row"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: easeCurve }}
              >
                <span className="subtitle-dot" aria-hidden="true" />
                <span className="subtitle-text">Jeremy 的个人旷野 · 持续建设中</span>
              </motion.div>

              <motion.h1
                className="hero-heading"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: easeCurve }}
              >
                <span className="line">识破表象，</span>
                <span className="line">
                  <span className="line-accent">向野生长。</span>
                </span>
              </motion.h1>

              <motion.div
                className="actions-row"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8, ease: easeCurve }}
              >
                <a className="btn-primary" href="#projects">看看项目</a>
                <a className="btn-outline" href="#about">关于识野</a>
              </motion.div>
            </div>

            <div className="footer-right">
              {tagPills.map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}
