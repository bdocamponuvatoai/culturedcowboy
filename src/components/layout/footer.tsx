import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { footerNav, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer on-night">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="display footer-statement">
              Western roots. <em>A spirit all your own.</em>
            </p>
            <div className="footer-contact">
              <a href={`tel:${site.phone.tel}`}>
                <Icon name="phone" size={18} />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={18} />
                {site.email}
              </a>
            </div>
          </div>
          <div className="footer-cols">
            {footerNav.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="micro">{column.heading}</h2>
                {column.links.map(({ label, href }) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </nav>
            ))}
            <div>
              <h2 className="micro">Make yourself at home</h2>
              <address>
                {site.address.street}
                <br />
                {site.address.cityLine}
              </address>
              <p>Call ahead for current hours.</p>
              <a
                className="text-link"
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>Get directions</span>
                <Icon name="arrow-up-right" size={14} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cultured Cowboy</span>
          <Link href="/privacy/">Privacy</Link>
          <a href={site.originalCatalogueUrl} target="_blank" rel="noreferrer">
            Original catalogue
          </a>
          <span className="footer-credit">Design concept by Nuvato</span>
        </div>
      </div>
      {/* Decorative: the text comes from CSS, so it is not read out or contrast-checked. */}
      <div
        className="footer-wordmark"
        aria-hidden="true"
        data-text="Cultured Cowboy"
      />
    </footer>
  );
}
