"use client";

import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { Sheet } from "@/components/ui/sheet";
import { footerNav, mainNav, site } from "@/config/site";

type MobileMenuProps = { open: boolean; onClose: () => void; pathname: string };

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const guidance = footerNav[1].links;
  return (
    <Sheet
      id="mobile-navigation"
      open={open}
      onClose={onClose}
      side="left"
      label="Menu"
      title={<Brand />}
    >
      <nav className="menu-nav" aria-label="Mobile navigation">
        {mainNav.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="menu-nav__link"
            aria-current={pathname === href ? "page" : undefined}
            onClick={onClose}
          >
            <span>{label}</span>
            <Icon name="arrow-right" size={20} />
          </Link>
        ))}
      </nav>
      <div className="menu-secondary">
        <p className="micro">A little guidance</p>
        {guidance.map(({ label, href }) => (
          <Link key={href} href={href} onClick={onClose}>
            {label}
          </Link>
        ))}
      </div>
      <div className="menu-contact">
        <a href={`tel:${site.phone.tel}`}>
          <Icon name="phone" size={18} />
          {site.phone.display}
        </a>
        <a href={`mailto:${site.email}`}>
          <Icon name="mail" size={18} />
          {site.email}
        </a>
        <a href={site.directionsUrl} target="_blank" rel="noreferrer">
          <Icon name="map-pin" size={18} />
          {`${site.address.street}, ${site.address.cityLine}`}
        </a>
      </div>
    </Sheet>
  );
}
