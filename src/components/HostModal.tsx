import { useEffect } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'

const easeCurve = [0.16, 1, 0.3, 1] as const

const letter = [
  '我始终相信在这个AI的时代不缺信息，不缺工具，缺的是帮助我们理解世界、形成判断、持续成长的方式。',
  '创立识野，是希望打造一个属于每个人的认知空间，让知识不再只是被收藏的信息，而是能够沉淀为洞察、转化为行动的力量。',
  '愿我们在变化的世界里保持好奇，向内扎根，向野生长。',
]

export default function HostModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="host-panel"
        initial={{ y: 32, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: easeCurve }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="主理人的话"
      >
        <button className="host-close" onClick={onClose} aria-label="关闭">
          <X size={14} strokeWidth={2} />
        </button>

        <div className="host-body">
          {/* 照片：桌面右侧边偏方，向右渐变白；移动端顶部横带向上渐变白 */}
          <div className="host-photo-wrap" aria-hidden="true">
            <img className="host-photo" src="/jeremy-photo.jpg" alt="" loading="lazy" />
            <div className="host-photo-fade" />
          </div>

          <div className="host-text">
            <span className="host-eyebrow">主理人的话</span>
            {letter.map((para, i) => (
              <p key={i} className="host-para">{para}</p>
            ))}
            <p className="host-sig">—— Jeremy</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
