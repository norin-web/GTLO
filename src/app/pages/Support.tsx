import { useState } from "react";
import { faq, site } from "../content/site";
import Btn from "../components/Btn";
import Faq from "../components/Faq";
import Reveal from "../components/Reveal";
import Split from "../components/Split";

export default function Support() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const items = query.length < 2 ? faq : faq.filter((f) => (f.q + " " + f.a).toLowerCase().includes(query));

  return (
    <>
      <section className="sage-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">Support</Reveal>
          <Split as="h1" className="h-page h-page--regular" parts={[["Let’s find an answer."]]} />
          <Reveal as="p" className="lead" delay={150}>Start with a question. We’ll point you in the right direction.</Reveal>
          <Reveal className="hsearch" delay={200}>
            <label htmlFor="hs">Search help topics</label>
            <div>
              <input id="hs" type="search" placeholder="e.g. requests or subscription" value={q} onChange={(e) => setQ(e.target.value)} />
              <span className="btn btn--dark btn--sm" aria-hidden="true">Search</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h3 h3--regular faq__title">A few common questions.</h2>
          {items.length ? <Faq key={query} items={items} /> : <p className="muted">Nothing matches “{q}”. Try another word or write to us.</p>}
        </div>
      </section>

      <section className="band">
        <div className="container band__inner">
          <div>
            <h2 className="h3 h3--regular">Still need a hand?</h2>
            <p className="muted">Email us at {site.email}</p>
          </div>
          <Btn href={`mailto:${site.email}`} variant="dark">Contact support →</Btn>
        </div>
      </section>
    </>
  );
}
