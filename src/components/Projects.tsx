import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const easeCurve = [0.16, 1, 0.3, 1] as const

interface Project {
  title: string
  desc: string
  status: string
  tag: string
}

const projects: Project[] = [
  {
    title: '识野导航',
    desc: 'AI 工具导航站。收集、分类和推荐各类人工智能应用与效率工具，按写作、编程、图像、视频、语音等场景组织，附真实使用评价与上手门槛标注。',
    status: '开发中',
    tag: 'Web 产品',
  },
  {
    title: '热点雷达',
    desc: '每日市场与科技热点扫描。自动聚合主线题材动态，六维度打分模型输出关注清单，帮你在开盘前 10 分钟抓到今天值得看的东西。',
    status: '开发中',
    tag: '数据分析',
  },
  {
    title: '旷野笔记',
    desc: '个人成长记录系统。结构化存放读书笔记、投资复盘与工作方法论，支持全文检索与双链引用——向野生长，但每一步都有迹可循。',
    status: '规划中',
    tag: '知识管理',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      <h3 className="card-title">{project.title}</h3>
      <p className="card-desc">{project.desc}</p>
      <div className="card-link">
        <span>查看详情</span>
        <ArrowUpRight size={14} strokeWidth={2} />
      </div>
    </motion.article>
  )
}

export default function Projects() {
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
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
