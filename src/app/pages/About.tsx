import { principles, site } from "../content/site";
import Btn from "../components/Btn";
import Reveal from "../components/Reveal";
import Split from "../components/Split";

export default function About() {
  return (
    <>
      <section className="dark-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow eyebrow--soft">About {site.brand}</Reveal>
          <Split as="h1" className="h-page h-page--light" parts={[["Connection matters."], ["\n"], ["Even from a distance."]]} />
          <Reveal as="p" className="lead lead--light" delay={150}>
            {site.brand} helps family and friends keep in touch with incarcerated loved ones through supported correctional communication services.
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Split as="h2" className="h2 h2--regular" parts={[["Small moments."], ["\n"], ["Meaningful connections."]]} />
          <ol className="principles">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} className="principle" line delay={i * 80}>
                <span className="principle__n">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p className="muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="container band__inner">
          <h2 className="h3 h3--regular">A closer look at {site.brand}.</h2>
          <Btn to="/app" variant="dark">Explore the app →</Btn>
        </div>
      </section>
    </>
  );
}
