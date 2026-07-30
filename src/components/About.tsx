import { motion } from 'motion/react'

const easeCurve = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        {/* 左：大字品牌锚点 */}
        <motion.div
          className="about-left"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeCurve }}
        >
          <span className="about-eyebrow">关于</span>
          <h2 className="about-name">识野 Insight</h2>
        </motion.div>

        {/* 中：品牌宣言（唯一主体文字） */}
        <motion.div
          className="about-mid"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8, ease: easeCurve }}
        >
          <p className="about-para">
            识野拒绝信息噪音与碎片化认知，专注于洞察、连接与沉淀，让每一次输入都转化为更深的理解与思考。
          </p>
          <p className="about-para">
            在瞬息万变的世界里，保持清醒，向内扎根，向野生长，探索认知的无限边界。
          </p>
        </motion.div>

        {/* 右：公众号 */}
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
