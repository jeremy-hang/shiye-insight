import { motion } from 'motion/react'

const easeCurve = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <motion.div
          className="about-left"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeCurve }}
        >
          <span className="section-eyebrow">关于识野</span>
          <h2 className="about-name">Jeremy</h2>
          <p className="about-role">识野 Insight 的主理人。</p>
        </motion.div>

        <motion.div
          className="about-mid"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8, ease: easeCurve }}
        >
          <p className="about-para">
            热点是表象，成长是主线。这个站点既是导航站，也是笔记本——把 AI 工具、市场信号与个人方法放进同一片旷野，看它们彼此长在一起。
          </p>
        </motion.div>

        <motion.div
          className="about-qr"
          id="about-grid"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8, ease: easeCurve }}
        >
          <img className="qr-image" src="/wechat-qr.jpeg" alt="识野 Insight 微信公众号二维码" />
          <span className="qr-caption">识野 Insight · 微信公众号</span>
        </motion.div>
      </div>
    </section>
  )
}
