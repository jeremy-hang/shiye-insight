export default function ContactHost({ intro = '关于项目、使用或合作，都可以聊聊。' }: { intro?: string }) {
  return (
    <div className="contact-host">
      <p className="contact-intro">{intro}</p>
      <details className="contact-details">
        <summary>联系主理人 Jeremy <span aria-hidden="true">↗</span></summary>
        <div className="contact-wechat">
          <img src="/host-wechat.jpg" alt="主理人 Jeremy 的个人微信二维码" width="144" height="144" loading="lazy" />
          <p>微信扫码，与主理人交流<br /><span>项目咨询 · 使用交流 · 合作想法</span></p>
        </div>
      </details>
    </div>
  )
}
