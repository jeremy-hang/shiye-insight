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
    title: '识野 AI 团队空间',
    en: 'Mindscape',
    tag: 'AI 协同平台',
    status: '开发中',
    hook: '让 AI 能力进入团队工作的全过程。',
    desc: '面向内部团队的 AI 协同工作平台。把具备岗位职责的数字员工、真人任务、企业知识、标准流程与执行记录放进同一个工作空间，让成员从提出需求开始，持续完成资料准备、分工执行、成果交接和人工验收。',
    preview: '/preview-team-space.jpg',
    details: [
      {
        label: '为什么做',
        body: 'AI 已经进入个人工作，但团队仍缺一套把需求、资料、责任和成果连接起来的方法。每人重复写提示词，背景与标准不一致；会议有纪要却没落实；模型说「完成」也不等于工具真的执行成功。识野要消掉的就是这部分组织成本。',
      },
      {
        label: '数字员工体系',
        body: '11 类内置岗位：识小野（协调）、产品经理、核价专员、政策助手、行政助手、市场资讯专员、会议助手、客户洞察专员、技术支持专员、数据分析专员、工作助理。每个岗位有明确职责、维护者、生效版本与授权资源——岗位名称本身不赋予任何工具或数据权限。',
      },
      {
        label: '技术路线',
        body: '持久化任务队列 + 后台执行器。数字工作与真人任务共用一套状态机，工作、事件、成果、动作回执分开保存；租约、请求键与取消检查共同降低重复执行与状态失真的风险。前端以办公室场景作为成员与工作状态的展示入口。',
      },
      {
        label: '当前状态',
        body: '产品 v0.8 / 发布构建 1.0.4，内部部署运行中。已跑通岗位配置、团队空间、会议纪要与行动项发布、日报周报、企业背景研究、服务器选型核价等流程闭环。会议音频直连转写与企业问数多数据源适配列为下一阶段。',
      },
    ],
  },
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
    title: 'Insight BI',
    en: '渠道经营决策中心',
    tag: 'BI 决策',
    status: '开发中',
    hook: '面向团队的轻量级 BI 决策支持系统。',
    desc: '面向团队的轻量级 BI 决策支持系统，也是团队数字化应用的统一入口。为日常经营监测、问题分析和管理决策提供支撑，覆盖经营概览、趋势洞察、区域分析、伙伴画像、库存监控、策略跟进六大核心模块。',
    preview: '/preview-insight-bi.jpg',
    details: [
      {
        label: '为什么做',
        body: '团队经营数据散落在不同报表和系统里，决策者要花大量时间拼凑碎片才能看清全局。Insight BI 把分散的数据聚合成统一的决策视图，让管理者一眼看到该看什么、该做什么。',
      },
      {
        label: '核心能力',
        body: '经营概览综合达成率、回款进度、项目转化、库存周转四大核心指标；趋势洞察打通收入与毛利率双维度；区域表现用热力图+能力雷达图可视化；伙伴画像按区域、业务结构、机会项目分层跟踪。',
      },
      {
        label: '统一入口',
        body: '不只是报表工具——作为团队数字化应用的统一入口，集成库存监控、重点任务进度、机会项目跟踪、区域经营概览，减少切换成本，把分析时间还给决策。',
      },
      {
        label: '当前状态',
        body: '核心看板与数据管线已完成，正接入真实业务数据做端到端验证。目标先跑通一个完整业务周期再做功能扩展。',
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
  {
    title: '识野 AI 会议纪要',
    en: 'Meeting Minutes AI',
    tag: '效率工具',
    status: '开发中',
    hook: 'AI 一键生成标准格式会议纪要。',
    desc: '上传会议转录文本或粘贴原文，通过 AI 大模型一键生成标准格式会议纪要。支持腾讯会议 GMT 格式转录、多种 AI 模型灵活切换（DeepSeek / 通义千问 / Kimi / 智谱），导出 Excel 结构化纪要。',
    preview: '/preview-meeting-minutes.png',
    link: 'https://jeremy-hang.github.io/meeting-minutes-ai/',
    details: [
      {
        label: '为什么做',
        body: '每次开完会都要手动整理纪要，格式不统一、重点不突出，花时间还容易漏。AI 会议纪要把「会议结束到可发出的纪要」压缩到 30 秒内。',
      },
      {
        label: '核心流程',
        body: '三步闭环：导入或粘贴转录文本 → 选择 AI 模型（API 直连或手动粘贴都可）→ 预览并可逐字编辑 → 一键导出标准格式 Excel。支持千人级大场转录，也能处理半小时内的简短例会。',
      },
      {
        label: '模型支持',
        body: '兼容 DeepSeek、通义千问、Kimi、智谱等主流大模型 API，支持自定义 base 地址或完整 chat/completions 端点，不锁定单一供应商。',
      },
      {
        label: '当前状态',
        body: '基础功能已可用，正优化长会议分段处理与多会话并行支持，计划加入说话人分离标注。',
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
        <h2 className="section-title">六件正在发酵的事</h2>
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
