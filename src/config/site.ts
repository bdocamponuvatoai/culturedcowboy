// Business details and navigation. Safe to import from client components.
// Every fact here comes from the store's existing website (see docs/sources.md).

export const site = {
  name: "Cultured Cowboy",
  defaultTitle: "Cultured Cowboy | Western Soul. Independent Spirit.",
  description:
    "Explore Western boots, Stetson hats, Schott leather and Western wear. Personal service from Cultured Cowboy in Greenwood, South Carolina.",
  themeColor: "#f6f2eb",
  phone: { display: "(864) 223-3700", tel: "+18642233700" },
  email: "cowboy@culturedcowboy.com",
  address: {
    street: "1521 Bypass 72 NE",
    cityLine: "Greenwood, SC",
    locality: "Greenwood",
    region: "SC",
    country: "US",
  },
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cultured+Cowboy+1521+Bypass+72+NE+Greenwood+SC",
  originalCatalogueUrl: "https://culturedcowboy.com/",
} as const;

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Shop all", href: "/shop/" },
  { label: "Western", href: "/collections/western/" },
  { label: "Biker", href: "/collections/leather/" },
  { label: "Our story", href: "/about/" },
  { label: "Visit us", href: "/visit/" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "The collection",
    links: [
      { label: "Western boots", href: "/collections/boots/" },
      { label: "Hats & shaping", href: "/collections/hats/" },
      { label: "Leather & biker", href: "/collections/leather/" },
      { label: "Western wear", href: "/collections/western-wear/" },
    ],
  },
  {
    heading: "A little guidance",
    links: [
      { label: "How to order", href: "/how-to-order/" },
      { label: "Finding your fit", href: "/fit-guide/" },
      { label: "Your picks", href: "/bag/" },
      { label: "Our story", href: "/about/" },
    ],
  },
];

export const searchHref = "/shop/#search";
