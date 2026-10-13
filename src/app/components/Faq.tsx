import { useState } from "react";

const Chevron = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/** Accordion with large chevrons; one item open at a time. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div className={`faq__item${on ? " is-open" : ""}`} key={f.q}>
            <button className="faq__q" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? -1 : i)}>
              <span>{f.q}</span>
              <Chevron />
            </button>
            <div className="faq__a" id={`faq-${i}`} role="region" aria-hidden={!on} {...({ inert: on ? undefined : "" } as object)}>
              <div className="faq__inner">
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
