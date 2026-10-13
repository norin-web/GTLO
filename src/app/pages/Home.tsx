import { useState } from "react";
import { Link } from "react-router";
import { app, faq, homeFeatures, promises, requestRows, stageTabs, steps } from "../content/site";
import { img } from "../utils/img";
import Btn from "../components/Btn";
import Reveal from "../components/Reveal";
import Split from "../components/Split";
import Faq from "../components/Faq";

const Sparkle = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M17 6c1.2 6.5 4.5 9.8 11 11-6.5 1.2-9.8 4.5-11 11-1.2-6.5-4.5-9.8-11-11 6.5-1.2 9.8-4.5 11-11Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M31 4c.5 2.6 1.9 4 4.5 4.5-2.6.5-4 1.9-4.5 4.5-.5-2.6-1.9-4-4.5-4.5 2.6-.5 4-1.9 4.5-4.5Z" fill="currentColor" />
  </svg>
);

export default function Home() {
  const [tab, setTab] = useState(0);
  const [req, setReq] = useState(0);
  return (
    <>
      {/* S01 Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <Reveal as="span" className="eyebrow">Messaging for iPhone</Reveal>
          <Split as="h1" className="h-hero" parts={[["Stay close."], ["\n"], ["Even from here."]]} />
          <Reveal as="p" className="lead hero__sub" delay={150}>
            Find your person, send a connection request and keep the conversation going with your incarcerated loved one.
          </Reveal>
          <Reveal className="hero__cta" delay={220}>
            <Btn href={app.url} variant="black">Download on the App Store</Btn>
            <a className="textlink" href="#how">How it works ↓</a>
          </Reveal>
          <Reveal as="p" className="small muted" delay={260}>Download on the App Store · iPhone</Reveal>
        </div>
      </section>

      {/* S02 Product stage */}
      <section className="container container--wide">
        <Reveal className="stage">
          <div className="stage__copy">
            <span className="eyebrow eyebrow--soft">Everything in one place</span>
            <h2 className="h2 h2--light">Your people.<br />Your words.</h2>
            <p className="stage__text">Your last conversation, new replies and an AI helper for the days you’re not sure what to say.</p>
            <div className="stage__tabs" role="tablist">
              {stageTabs.map((t, i) => (
                <button key={t.title} role="tab" aria-selected={tab === i} className={tab === i ? "is-on" : ""} onClick={() => setTab(i)}>
                  <small>0{i + 1}</small>{t.title}
                </button>
              ))}
            </div>
          </div>
          <div className="stage__phones">
            {stageTabs.map((t, i) => (
              <img
                key={t.title}
                src={img(t.img)}
                alt={t.alt}
                width={"tilted" in t ? 1162 : 636}
                height={"tilted" in t ? 1400 : 1300}
                className={`stage__phone${"tilted" in t ? " stage__phone--tilted" : ""}${i === tab ? " is-on" : i < tab ? " is-before" : ""}`}
                aria-hidden={i !== tab}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* S04 Features */}
      <section className="section">
        <div className="container">
          <div className="heading-row">
            <Split as="h2" className="h2" parts={[["Everything you need"], ["\n"], ["to stay in touch."]]} />
            <Reveal as="p" className="heading-row__aside">Search, request, message.<br />And a little help with the words.</Reveal>
          </div>
          <div className="bento">
            <Reveal className="bento__main card card--white">
              <div className="bento__text">
                <span className="tag">{homeFeatures.main.tag}</span>
                <h3 className="h3">{homeFeatures.main.title}</h3>
                <p className="muted">{homeFeatures.main.text}</p>
              </div>
              <div className="bento__shot">
                <img src={img(homeFeatures.main.img)} alt="Conversation with Danielle Brooks in Getting Out" loading="lazy" />
              </div>
            </Reveal>
            <div className="bento__side">
              {homeFeatures.side.map((f, i) => (
                <Reveal key={f.tag} className={`card ${i === 0 ? "card--sage" : "card--white"} bento__card`} delay={i * 100}>
                  <div className="bento__head">
                    <span className="tag">{f.tag}</span>
                    {f.icon === "ai" ? (
                      <span className="bento__icon"><Sparkle /></span>
                    ) : (
                      <span className="avatars" aria-hidden="true"><i>A</i><i>J</i><i>＋</i></span>
                    )}
                  </div>
                  <h3 className="h4">{f.title}</h3>
                  <p className="muted">{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S05 Request status */}
      <section className="section">
        <div className="container reqs">
          <div className="reqs__copy">
            <Reveal as="span" className="eyebrow eyebrow--olive">Connection requests</Reveal>
            <Split as="h2" className="h2" parts={[["Always know"], ["\n"], ["where you stand."]]} />
            <Reveal as="p" className="lead">Tell us how you know them and send a request. Every request shows its status, so you never have to guess.</Reveal>
            <Reveal as="p" className="small muted">Approval is decided by the facility, the communication provider or your contact.</Reveal>
          </div>
          <Reveal className="reqs__list card card--white">
            {requestRows.map((r, i) => (
              <button key={r.name} className={`reqs__row${req === i ? " is-on" : ""}`} onClick={() => setReq(i)} aria-expanded={req === i}>
                <span className={`reqs__av reqs__av--${r.status}`}>{r.initials}</span>
                <span className="reqs__who">
                  <b>{r.name}</b>
                  <small>{r.meta}</small>
                  {req === i && <em>{r.note}</em>}
                </span>
                <span className={`status status--${r.status}`}><i />{r.status[0].toUpperCase() + r.status.slice(1)}</span>
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* S06 What you get */}
      <section className="section section--tight">
        <div className="container promises">
          {promises.map((p, i) => (
            <Reveal key={p.title} className="promise" delay={i * 60}>
              <h3>{p.title}</h3>
              <p className="muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* S07 How to start */}
      <section className="steps-band" id="how">
        <div className="container steps-band__grid">
          <div className="steps-band__copy">
            <span className="eyebrow eyebrow--soft">From download to hello</span>
            <Split as="h2" className="h2 h2--light" parts={[["Three steps."], ["\n"], ["One connection."]]} />
            <Btn href={app.url} variant="black">Download on the App Store</Btn>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} className="step" delay={i * 80}>
                {i === 0 ? <img className="step__icon" src={img("/images/app-icon.png")} alt="" width={44} height={44} /> : <span className="step__n">{s.n}</span>}
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* S08 Why it matters */}
      <section className="why" style={{ ["--why" as string]: `url(${img("/images/why-it-matters.webp")})`, ["--why-m" as string]: `url(${img("/images/why-it-matters-m.webp")})` }}>
        <Reveal className="why__copy">
          <span className="eyebrow eyebrow--green">Why it matters</span>
          <h2 className="h2">Every hello makes<br />the way home shorter.</h2>
          <p className="lead">Birthdays, good news, a quick “how was your day.” A few words can keep a family close while someone is away.</p>
        </Reveal>
      </section>

      {/* S09 FAQ */}
      <section className="section section--white">
        <div className="container faqwrap">
          <div className="faqwrap__copy">
            <span className="eyebrow eyebrow--olive">A little clarity</span>
            <h2 className="h2">Before you<br />get started.</h2>
            <p className="lead">Questions about Getting Out?<br />Find the answers in Support.</p>
            <Link className="textlink" to="/support">Go to Support →</Link>
          </div>
          <Faq items={[faq[1], faq[2], faq[3], faq[7]]} />
        </div>
      </section>

      {/* S10 Final CTA */}
      <section className="cta">
        <img src={img("/images/app-icon.png")} alt="" width={72} height={72} className="cta__icon" />
        <Split as="h2" className="h-display" parts={[["Be part of their day."]]} />
        <Reveal as="p" className="lead">Start with a hello. Take Getting Out with you.</Reveal>
        <Reveal><Btn href={app.url} variant="black">Download on the App Store</Btn></Reveal>
        <p className="small muted">Download on the App Store · iPhone</p>
      </section>
    </>
  );
}
