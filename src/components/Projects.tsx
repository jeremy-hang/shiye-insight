import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, ExternalLink, X } from 'lucide-react'

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
  link?: string
  details: DetailBlock[]
}

const projects: Project[] = [
  {
    title: '识野 Hub',
    en: 'AI Discovery Center',
    tag: 'Web',
    status: '开发中',
    hook: 'AI 生态与生产力工具矩阵。',
    desc: '深度筛选、结构化分类与智能推荐全球前沿 AI 学习资源、应用生态与效率工具。按实际工作场景精准打标，提供真实评测与上手门槛评估，打造高价值的智能生产力导航入口。',
    preview: '/preview-mindscape-hub.jpg',
    link: 'https://hub.jeremyhang.online',
    details: [
      {
        label: '为什么做',
        body: 'AI 工具爆炸式增长，但 90% 是噪音。大多数人卡在两个问题上：不知道有什么能用，更不知道哪个值得花时间。识野 Hub 把「发现成本」打到最低——你负责提效，它负责过滤。',
      },
      {
        label: '功能范围',
        body: '按真实工作场景组织：写作、编程、研究、设计、数据分析、自动化。每个条目附带真实评测、上手门槛评级（开箱即用 / 轻度学习 / 需要折腾）、适用人群与替代方案。',
      },
      {
        label: '技术路线',
        body: '前端 React + Vite，数据源聚合公开 API 与社区榜单，结构化打标后人工抽检。后续引入高质量社区投稿与版本追踪，让工具库自我进化。',
      },
      {
        label: '当前状态',
        body: '信息架构与打标体系已定，站点骨架开发中。预计优先上线工具导航与场景推荐两个核心模块。',
      },
    ],
  },
  {
    title: '脉动雷达',
    en: 'PulseRadar',
    tag: '商业情报',
    status: '开发中',
    hook: '高定制化产业与竞品情报系统。',
    desc: '自动化全网扫描行业上下游动态、商业热点与竞品厂商全景变化。基于多维模型进行实时降噪与价值萃取，帮助企业与决策者实时掌握市场脉搏，实现数据驱动的敏捷决策。',
    preview: '/preview-pulseradar.png',
    link: 'https://jeremy-hang.github.io/ai-daily/',
    details: [
      {
        label: '为什么做',
        body: '决策质量取决于信息质量。但碎片化的资讯流里，信号和噪音的比例持续恶化——真正值得看的 5%，被 95% 的重复和注水内容淹没。脉动雷达的目标是把信噪比翻过来。',
      },
      {
        label: '核心能力',
        body: '全网持续扫描行业上下游动态、竞品厂商产品/定价/人事变化，多维打分模型做第一轮降噪，萃取后的情报按「影响程度 × 时效性」排序推送，拒绝平均用力。',
      },
      {
        label: '多维模型',
        body: '来源可信度、传播热度、业务相关性、时效衰减、竞争影响——五个维度加权评分，输出分级关注清单，而不是一份流水账。',
      },
      {
        label: '当前状态',
        body: '评分模型与数据源管线设计中，先做垂直行业 MVP 验证价值密度，再泛化。',
      },
    ],
  },
  {
    title: '识野空间',
    en: 'MindScape Space',
    tag: '知识操作系统',
    status: '规划中',
    hook: '基于 LLM Wiki 架构的新一代 AI 知识操作系统。',
    desc: '通过智能感知、理解与结构化组织个人及企业知识资产，构建可持续进化的智能知识大脑。打破信息孤岛，赋能个体与组织实现深度知识沉淀、价值挖掘与高质决策。',
    details: [
      {
        label: '为什么做',
        body: '笔记软件解决了「存」，没解决「用」。知识进了 Notion 就再没出来过——信息孤岛的本质不是找不到，而是系统不理解你存了什么。LLM 让机器第一次有可能真正「读懂」你的知识资产。',
      },
      {
        label: '核心理念',
        body: 'LLM Wiki：每条知识不是静态文本，而是可被智能体持续阅读、关联、重组的活节点。你用自然语言提问，系统自动从你的知识库里组织答案——带引用、有脉络。',
      },
      {
        label: '关键特性',
        body: '双链网络可视化、自然语言召回、自动知识聚簇、个人与团队双模式。知识不再依赖你记住「放在哪个文件夹」——它自己长出来。',
      },
      {
        label: '当前状态',
        body: '概念验证阶段。先在个人知识管理场景跑通最小闭环，验证「AI 重组知识」的实际价值后再产品化。',
      },
    ],
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
        className="modal-panel"
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

        {project.link && (
          <a
            className="modal-live-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>访问在线预览</span>
            <ExternalLink size={13} strokeWidth={2} />
          </a>
        )}

        {project.details.map((d) => (
          <div className="modal-block" key={d.label}>
            <h4 className="modal-block-label">{d.label}</h4>
            <p className="modal-block-body">{d.body}</p>
          </div>
        ))}

        <p className="modal-foot">More soon · 持续建设中</p>
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
        <span>查看详情</span>
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
        <h2 className="section-title">三件正在发酵的事</h2>
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
