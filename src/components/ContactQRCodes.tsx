export default function ContactQRCodes() {
  return (
    <div className="contact-qr-pair">
      <figure className="contact-qr-item">
        <img src="/wechat-qr.jpeg" alt="识野 Insight 微信公众号二维码" width="160" height="160" loading="lazy" />
        <figcaption>识野 Insight · 微信公众号<span>关注项目进展与实践记录</span></figcaption>
      </figure>
      <figure className="contact-qr-item">
        <img src="/host-wechat.jpg" alt="主理人 Jeremy 的个人微信二维码" width="160" height="160" loading="lazy" />
        <figcaption>主理人 Jeremy · 微信<span>项目咨询 · 使用交流 · 合作想法</span></figcaption>
      </figure>
    </div>
  )
}
