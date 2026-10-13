import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { nav, app, site } from "../content/site";
import { img } from "../utils/img";
import Btn from "./Btn";

/** Cream bar with logo, nav and Download — pinned to the top, never hides. */
export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`header${pathname === "/app" ? " header--white" : ""}`}>
        <div className="header__bar container container--wide">
          <Link to="/" className="logo" aria-label={`${site.brand} home`}>
            <img src={img("/images/app-icon.png")} alt="" width={40} height={40} />
            <span>{site.brand}</span>
          </Link>
          <nav className="header__nav" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} className={({ isActive }) => `navlink${isActive ? " is-active" : ""}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <Btn href={app.url} variant="dark" size="sm" className="header__cta">Download</Btn>
          <button
            className={`burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mmenu"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="mmenu" className={`mmenu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="mmenu__link" tabIndex={open ? 0 : -1}>
            {n.label}
          </Link>
        ))}
        <Btn href={app.url} variant="dark">Download on the App Store</Btn>
      </div>
    </>
  );
}
