import { useEffect } from "react";
import Btn from "../components/Btn";
import { site } from "../content/site";

export default function NotFound() {
  useEffect(() => {
    document.title = `${site.brand} — Page not found`;
  }, []);
  return (
    <section className="notfound">
      <div className="container">
        <span className="eyebrow eyebrow--olive">404</span>
        <h1 className="h-page">This page took<br />a different route.</h1>
        <p className="lead">The link may be old or mistyped. Everything you need is one tap away.</p>
        <div className="notfound__cta">
          <Btn to="/" variant="dark">Back to Home</Btn>
          <Btn to="/support" variant="white">Visit Support</Btn>
        </div>
      </div>
    </section>
  );
}
