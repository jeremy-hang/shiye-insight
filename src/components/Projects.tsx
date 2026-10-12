import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'

import ContactHost from './ContactHost'
import ContactQRCodes from './ContactQRCodes'

const easeCurve = [0.16, 1, 0.3, 1] as const

interface DetailBlock {
  label: string
  body: string
}

interface Project {
  title: string
  en: string
  tag: string
  status: string
  hook: string
  desc: string
  preview?: string
  follow?: boolean
  details: DetailBlock[]
}

const projects: Project[] = [
  {
    title: '识野 AI 团队空间', en: 'Mindscape', tag: 'AI 团队协作', status: '持续迭代',
    hook: '让数字员工与真人，在同一个空间协同工作。',
    desc: '把数字员工、团队任务、知识资源与工作流程放进一个协作空间。从需求提出、岗位分工到成果交接，让 AI 能力进入团队日常工作，让执行过程和责任更清楚。',
    preview: '/projects/ai-team-space.png',
    details: [
      { label: '数字员工', body: '为不同岗位配置职责、资料、技能与标准流程，让研究、分析、会议整理、内容制作等工作有合适的协作伙伴。' },
      { label: '团队协作', body: '在同一个空间查看成员、任务与工作动态，跟进执行进度、交接成果，并通过日报周报整理团队工作。' },
    ],
  },
  {
    title: '业务罗盘', en: 'Business Compass', tag: '经营分析', status: '持续迭代',
    hook: '看清业务进度，让经营判断有据可依。',
    desc: '把任务达成、回款进度、区域表现、伙伴档案、政策跟进与库存情况汇聚成统一的经营视图。从全国概览到具体业务问题，帮助团队识别差距、明确重点、跟进行动。',
    preview: '/projects/business-compass.png',
    details: [
      { label: '经营视图', body: '按季度或全年查看任务达成，结合区域分布、趋势与回款缺口，掌握经营进展与需要优先关注的问题。' },
      { label: '业务跟进', body: '串联伙伴档案、政策跟进与库存管理，让数据分析回到具体业务场景；支持本机数据处理与离线导出。' },
    ],
  },
  {
    title: 'Insight Hub', en: 'AI Discovery Center', tag: 'AI 资源导航', status: '持续迭代',
    hook: '发现工具，连接知识，探索智能世界。',
    desc: '按领域与实际场景组织 AI 工具、智能体、Skills、学习资料和行业资讯。通过分类导航、站点筛选与智能生态地图，缩短寻找资源的路径，让探索与日常使用更顺手。',
    preview: '/projects/insight-hub.png',
    details: [
      { label: '场景导航', body: '覆盖对话与智能体、文本与办公、图像与设计、音视频、编程与算力等领域，从实际需求出发发现适合的工具。' },
      { label: '发现与收藏', body: '结合完整导航图谱、站点筛选、多入口搜索与常用站点收藏，把分散的资源整理成自己的使用路径。' },
    ],
  },
  {
    title: '墨台', en: 'Motai', tag: 'AI 内容创作', status: '持续迭代',
    hook: '从一份灵感，写出自己的判断。',
    desc: '把选题灵感、写手风格与文章创作放在同一个工作台。选择热点、搜索新闻或输入主题，结合写手样本与账号定位辅助创作，并整理待发布与已发布内容，让写作形成持续的工作流程。',
    preview: '/projects/motai.png',
    details: [
      { label: '从灵感开始', body: '收藏热点与新闻，或直接输入想写的主题。在灵感与创作之间建立连接，也能从上次停下的地方继续编辑。' },
      { label: '保留自己的表达', body: '结合账号定位、目标读者与写手样本，提炼结构和语气，再通过试写与编辑确认风格，整理文章的创作和发布状态。' },
    ],
  },
  {
    title: '识野 Link', en: 'Private Workspace', tag: '私密连接管理', status: '持续迭代',
    hook: '独立授权，清楚掌握每份连接的使用。',
    desc: '面向个人使用的私密连接管理工作台，把设备授权、连接用量与操作记录集中管理。通过本机入口访问，按需分配连接，减少零散配置带来的管理成本。',
    preview: '/projects/shiye-link.png',
    details: [
      { label: '设备与授权', body: '为设备独立分配连接，管理使用者备注、授权期限与用量额度，按需调整授权状态。' },
      { label: '用量与记录', body: '集中查看本月与每日用量、连接状态和最近活动，通过管理记录追踪授权与配置变更。' },
    ],
  },
  {
    title: '更多项目，持续生长', en: 'More to Come', tag: '探索与实践', status: '持续更新',
    hook: '更多尝试，正在从想法走向日常。',
    desc: '围绕 AI 协作、业务效率与个人创作，持续探索并打磨新的工具。更多项目进展与实践记录，请关注「识野 Insight」微信公众号。',
    follow: true,
    details: [],
  },
]

// ---------- 详情弹窗 ----------
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
        className="modal-panel project-modal"
        initial={{ y: 32, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: easeCurve }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div className="modal-head">
          <div className="modal-title-block">
            <h3 className="modal-title">{project.title}</h3>
            <span className="modal-en">{project.en}</span>
          </div>
          <div className="modal-head-right">
            <span className="card-tag">{project.tag}</span>
            <span className="card-status">{project.status}</span>
            <button className="modal-close" onClick={onClose} aria-label="关闭">
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        <p className="modal-hook">{project.hook}</p>
        <p className="modal-desc">{project.desc}</p>

        {project.preview && (
          <div className="modal-preview">
            <img src={project.preview} alt={`${project.title} 预览`} loading="lazy" />
          </div>
        )}

        {project.details.map((d) => (
          <div className="modal-block" key={d.label}>
            <h4 className="modal-block-label">{d.label}</h4>
            <p className="modal-block-body">{d.body}</p>
          </div>
        ))}

        {project.follow ? <ContactQRCodes /> : <ContactHost intro="想进一步了解或使用这个项目？" />}
      </motion.div>
    </motion.div>
  )
}

// ---------- 卡片 ----------
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  return (
    <motion.article
      className="project-card"
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: easeCurve }}
    >
      <div className="card-top">
        <span className="card-tag">{project.tag}</span>
        <span className="card-status">{project.status}</span>
      </div>
      <h3 className="card-title">
        {project.title}
        <span className="card-en">{project.en}</span>
      </h3>
      <p className="card-hook">{project.hook}</p>
      <p className="card-desc">{project.desc}</p>
      <button className="card-link" onClick={onOpen}>
        <span>{project.follow ? '关注项目动态' : '查看详情'}</span>
        <ArrowUpRight size={14} strokeWidth={2} />
      </button>
    </motion.article>
  )
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="projects" id="projects">
      <motion.div
        className="section-head"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeCurve }}
      >
        <span className="section-eyebrow">在做的项目</span>
        <h2 className="section-title">把想法，做成可用的工具</h2>
      </motion.div>

      <div className="project-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ProjectModal project={projects[openIndex]} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
