import { useEffect, useRef, useState } from "react";
import { app, appScreens, specs } from "../content/site";
import { img } from "../utils/img";
import Btn from "../components/Btn";
import Reveal from "../components/Reveal";
import Split from "../components/Split";

const STEP = 5000;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function OurApp() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(0);
  const n = appScreens.length;

  // auto-advance; the progress line under the active tab runs on the same clock (CSS)
  useEffect(() => {
    if (paused || reduced()) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), STEP);
    return () => clearTimeout(t);
  }, [i, paused, n]);

  const next = (i + 1) % n;
  const prev = (i - 1 + n) % n;

  return (
    <>
      {/* S01 Hero with photo */}
      <section className="ahero">
        <img className="ahero__photo" src={img("/images/hero-family.webp")} alt="A father and daughter touching foreheads and laughing" width={1030} height={494} />
        <div className="ahero__copy">
          <Reveal as="span" className="eyebrow">The Getting Out app</Reveal>
          <Split as="h1" className="h-page" parts={[["A little closer."], ["\n"], ["In your pocket."]]} />
          <Reveal as="p" className="lead" delay={150}>
            Search, connection requests, messages and an AI writing helper. Everything you need to stay in touch, on your iPhone.
          </Reveal>
          <Reveal className="hero__cta" delay={220}>
            <Btn href={app.url} variant="black">Download on the App Store</Btn>
            <span className="small muted">Download on the App Store · iPhone</span>
          </Reveal>
        </div>
      </section>

      {/* S02 Feature switcher */}
      <section className="section switcher-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="container switcher">
          <div className="switcher__tabs">
            <span className="eyebrow eyebrow--olive">Inside the app</span>
            <Split as="h2" className="h2" parts={[["Five screens."], ["\n"], ["Everything you need."]]} />
            <div className="switcher__list" role="tablist" aria-label="App screens">
              {appScreens.map((s, k) => (
                <button key={s.title} role="tab" aria-selected={k === i} className={`stab${k === i ? " is-on" : ""}`} onClick={() => setI(k)}>
                  <span className="stab__head">
                    <small>0{k + 1}</small>
                    <b>{s.title}</b>
                  </span>
                  <span className="stab__body">
                    <span className="stab__text">{s.text}</span>
                    <i className="stab__bar"><b key={`${i}-${paused}`} style={{ animationDuration: `${STEP}ms`, animationPlayState: paused ? "paused" : "running" }} /></i>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="switcher__stage"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 40) setI((v) => (v + (dx < 0 ? 1 : n - 1)) % n);
            }}
          >
            {appScreens.map((s, k) => (
              <img
                key={s.title}
                src={img(s.img)}
                alt={`${s.title} screen`}
                width={636}
                height={1300}
                loading={k < 2 ? "eager" : "lazy"}
                className={`sphone${k === i ? " is-on" : k === next ? " is-next" : k === prev ? " is-prev" : ""}`}
              />
            ))}
          </div>

          <div className="switcher__mobile">
            <div className="dots" aria-hidden="true">
              {appScreens.map((s, k) => <i key={s.title} className={k === i ? "is-on" : ""} />)}
            </div>
            <p><small>0{i + 1} / 0{n}</small><b>{appScreens[i].title}</b></p>
            <p className="muted">{appScreens[i].text}</p>
          </div>
        </div>
      </section>

      {/* S03 Specs */}
      <section className="section section--white specs-wrap">
        <div className="container">
          <Reveal as="h2" className="h3">Details</Reveal>
          <p className="muted specs__lead">The basics, straight from the App Store listing and our Terms.</p>
          <dl className="specs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
