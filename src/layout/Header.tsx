import React, { Fragment, useState } from "react";
import { NAV_ITEMS } from "../data/Navitems";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lt-header">
      <div className="lt-bar">
        <a href="/" className="lt-brand">
          <span className="lt-brand-name">Resizer</span>
        </a>

        <nav className="lt-nav">
          {NAV_ITEMS.map((item, i) => (
            <Fragment key={item.href}>
              <a href={item.href} className="lt-nav-link">
                {item.label}
              </a>
              {i < NAV_ITEMS.length - 1 && (
                <span className="lt-divider" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </nav>

        <div className="lt-right">
          <a href="#premium" className="lt-cta">
            Get premium
          </a>

          <button
            type="button"
            aria-label="Otevřít menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lt-burger"
          >
            <span className={`lt-burger-line ${menuOpen ? "is-open" : ""}`} />
            <span className={`lt-burger-line ${menuOpen ? "is-open" : ""}`} />
            <span className={`lt-burger-line ${menuOpen ? "is-open" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lt-mobile-menu">
          <nav className="lt-mobile-nav">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="lt-mobile-link"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#premium"
              onClick={() => setMenuOpen(false)}
              className="lt-cta lt-cta--mobile"
            >
              Získat Premium
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;
