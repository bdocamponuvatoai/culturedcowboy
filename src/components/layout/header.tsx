"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { BagDrawer } from "@/components/bag/bag-drawer";
import { bagCount, useBag } from "@/components/bag/use-bag";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchDialog } from "@/components/search/search-dialog";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { mainNav, site } from "@/config/site";
import { onOpenBagDrawer } from "@/lib/ui-events";

// Matches the stylesheet: the full navigation shows from 1101px.
const DESKTOP_QUERY = "(min-width: 1101px)";

type Panel = "menu" | "search" | "bag";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const pathname = usePathname();
  // Which panel is open, and on which page: navigating anywhere else closes it without an effect.
  const [panel, setPanel] = useState<{ name: Panel; path: string } | null>(
    null,
  );
  const openPanel = panel?.path === pathname ? panel.name : null;
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const bag = useBag();
  const count = bagCount(bag);

  const open = (name: Panel) => setPanel({ name, path: pathname });
  const close = () => setPanel(null);

  useEffect(
    () =>
      onOpenBagDrawer(() =>
        setPanel({ name: "bag", path: window.location.pathname }),
      ),
    [],
  );

  useEffect(() => {
    if (openPanel !== "menu") return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setPanel(null);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [openPanel]);

  // On the home page the header floats over the hero until the visitor scrolls.
  const overlay = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className="site-header"
        data-overlay={overlay ? "true" : undefined}
      >
        <div className="site-header__inner">
          <div className="site-header__start">
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-expanded={openPanel === "menu"}
              aria-controls="mobile-navigation"
              aria-label="Open menu"
              onClick={() => open("menu")}
            >
              <Icon name="menu" />
            </button>
            <nav className="primary-nav" aria-label="Main navigation">
              {mainNav.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/" className="wordmark-link">
            <Brand />
          </Link>
          <div className="site-header__end">
            <button
              type="button"
              className="icon-btn"
              aria-label="Search the collection"
              aria-expanded={openPanel === "search"}
              onClick={() => open("search")}
            >
              <Icon name="search" />
            </button>
            <a
              className="icon-btn header-phone"
              href={`tel:${site.phone.tel}`}
              aria-label={`Call the store, ${site.phone.display}`}
            >
              <Icon name="phone" />
            </a>
            <button
              type="button"
              className="icon-btn bag-btn"
              aria-label={`Your picks, ${count} ${count === 1 ? "item" : "items"}`}
              aria-expanded={openPanel === "bag"}
              aria-controls="bag-drawer"
              onClick={() => open("bag")}
            >
              <Icon name="shopping-bag" />
              <span
                className="bag-count"
                data-empty={count === 0 ? "true" : undefined}
              >
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={openPanel === "menu"}
        onClose={close}
        pathname={pathname}
      />
      <SearchDialog open={openPanel === "search"} onClose={close} />
      <BagDrawer open={openPanel === "bag"} onClose={close} />
    </>
  );
}
