import { Link } from "react-router";
import { app, nav, site } from "../content/site";
import { img } from "../utils/img";
import Btn from "./Btn";

const legal = [
  { to: "/feedback", label: "Feedback" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

/** Forest footer: big sign-off with the download, one line of links, legal line with a round "top" button. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__hero">
          <p className="footer__say">Stay close.<br />Even from here.</p>
          <div className="footer__get">
            <img src={img("/images/app-icon.png")} alt="" width={64} height={64} />
            <div>
              <b>{site.brand}</b>
              <span>Messaging for iPhone</span>
            </div>
            <Btn href={app.url} variant="white">Download on the App Store</Btn>
          </div>
        </div>

        <div className="footer__links">
          <nav aria-label="Footer">
            {nav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </nav>
          <nav aria-label="Help and legal">
            {legal.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </nav>
          <a className="footer__mail" href={`mailto:${site.email}`}>{site.email}</a>
        </div>

        <div className="footer__bottom">
          <p>© {site.year} {site.operator}. {site.disclaimer}</p>
          <button className="footer__up" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16V4M4.5 9.5 10 4l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
