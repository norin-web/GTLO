import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { site } from "../content/site";
import { legalUpdated, type Doc } from "../content/legal";
import Split from "./Split";
import Reveal from "./Reveal";
import Btn from "./Btn";

type Section = { id: string; n: number; title: string; blocks: string[] };

// turn plain email addresses into mailto links, text otherwise untouched
const linkify = (text: string, q = "") => {
  const parts = text.split(/(\S+@\S+\.[a-z]{2,})/i);
  return parts.map((part, i) =>
    /@/.test(part) ? <a key={i} href={`mailto:${part}`}>{part}</a> : <Fragment key={i}>{mark(part, q)}</Fragment>,
  );
};

// highlight search matches inside a run of text
const mark = (text: string, q: string): ReactNode => {
  if (q.length < 2) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  return text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
};

/** Split the verbatim text into "## " sections; wording is never changed. */
function parse(body: string): Section[] {
  const sections: Section[] = [];
  for (const block of body.split(/\n{2,}/)) {
    if (block.startsWith("## ")) {
      const n = sections.length + 1;
      sections.push({ id: `s${n}`, n, title: block.slice(3), blocks: [] });
    } else sections[sections.length - 1]?.blocks.push(block);
  }
  return sections;
}

function Block({ text, q }: { text: string; q: string }): ReactNode {
  if (text.startsWith("### ")) return <h3>{mark(text.slice(4), q)}</h3>;
  if (text.startsWith("- "))
    return (
      <ul>
        {text.split("\n").map((li, j) => <li key={j}>{linkify(li.replace(/^- /, ""), q)}</li>)}
      </ul>
    );
  return (
    <p>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linkify(line, q)}
        </Fragment>
      ))}
    </p>
  );
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12.5 12.5 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/**
 * Reader layout: Privacy | Terms switch, sticky sidebar with search, reading
 * progress and "Jump to" groups; every section is its own card.
 */
export default function LegalPage({ doc }: { doc: Doc }) {
  const sections = useMemo(() => parse(doc.body), [doc.body]);
  const [active, setActive] = useState(1);
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const hits = useMemo(
    () => (query.length < 2 ? null : sections.filter((s) => (s.title + " " + s.blocks.join(" ")).toLowerCase().includes(query)).map((s) => s.n)),
    [query, sections],
  );

  // the section whose card last passed the upper third of the viewport
  useEffect(() => {
    const onScroll = () => {
      let cur = 1;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.35) cur = s.n;
      }
      setActive(cur);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [sections]);

  const go = (n: number) => {
    const el = document.getElementById(`s${n}`);
    if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 110, behavior: "smooth" });
  };

  const group = doc.groups.find(([, a, b]) => active >= a && active <= b) ?? doc.groups[0];
  const visible = hits ? sections.filter((s) => hits.includes(s.n)) : sections;

  return (
    <>
      <section className="dhero">
        <div className="container">
          <Reveal className="dswitch" role="tablist" aria-label="Legal documents">
            <Link to="/privacy" role="tab" aria-selected={doc.current === "privacy"} className={doc.current === "privacy" ? "is-on" : ""}>
              Privacy Policy
            </Link>
            <Link to="/terms" role="tab" aria-selected={doc.current === "terms"} className={doc.current === "terms" ? "is-on" : ""}>
              Terms of Use
            </Link>
          </Reveal>
          <Split as="h1" className="dhero__title" parts={[[doc.title]]} />
          <Reveal className="dhero__meta" delay={200}>
            <span>Effective {legalUpdated}</span>
            <span>{sections.length} sections</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </Reveal>
        </div>
      </section>

      <section className="doc">
        <div className="container doc__grid">
          <aside className="doc__side" aria-label="Document tools">
            <label className="dsearch">
              <SearchIcon />
              <input type="search" placeholder={doc.searchLabel} value={q} onChange={(e) => setQ(e.target.value)} aria-label={doc.searchLabel} />
            </label>
            {hits && <p className="doc__hits">{hits.length ? `${hits.length} section${hits.length > 1 ? "s" : ""} match` : "No matches"}</p>}
            <div className="dprogress">
              <span>Section {active} of {sections.length}</span>
              <i><b style={{ width: `${(active / sections.length) * 100}%` }} /></i>
            </div>
            <div className="djump">
              <span className="eyebrow">Jump to</span>
              {doc.groups.map(([label, a, b]) => (
                <button key={label} onClick={() => go(a)} className={group[0] === label ? "is-on" : ""}>
                  <span>{label}</span>
                  <small>{a === b ? a : `${a}–${b}`}</small>
                </button>
              ))}
            </div>
            <div className="doc__tools">
              <button onClick={() => print()}>Print</button>
            </div>
          </aside>

          {/* mobile: a single sticky "Jump to" select instead of the sidebar */}
          <label className="djump-m">
            <span className="sr">Jump to</span>
            <select value={group[1]} onChange={(e) => go(+e.target.value)}>
              {doc.groups.map(([label, a, b]) => (
                <option key={label} value={a}>Jump to · {label} {a === b ? a : `${a}–${b}`}</option>
              ))}
            </select>
          </label>

          <article className="doc__body">
            {!hits && (
              <Reveal className="glance">
                <span className="eyebrow">At a glance</span>
                <div className="glance__grid">
                  {doc.glance.map(([h, t]) => (
                    <div className="glance__card" key={h}>
                      <b>{h}</b>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <p className="glance__note">A short summary for convenience — the full text below is what applies.</p>
              </Reveal>
            )}

            {visible.map((s) => (
              <section className={`dsec${doc.plates.includes(s.n) ? " dsec--plate" : ""}`} id={s.id} key={s.id}>
                <h2>
                  <span className="dsec__n">{s.n}</span>
                  {mark(s.title, query)}
                </h2>
                {s.blocks.map((b, j) => <Block key={j} text={b} q={query} />)}
              </section>
            ))}

            <div className="dask">
              <div>
                <b>Questions?</b>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <Btn href={`mailto:${site.email}`} variant="white">Email us ↗</Btn>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
