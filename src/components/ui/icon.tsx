// Line icons (geometry from Lucide, ISC licence), inlined so no icon library ships to the browser.
const ICONS = {
  menu: [
    <path key="1" d="M4 6h16" />,
    <path key="2" d="M4 12h16" />,
    <path key="3" d="M4 18h10" />,
  ],
  x: [<path key="1" d="M18 6 6 18" />, <path key="2" d="m6 6 12 12" />],
  search: [
    <path key="1" d="m21 21-4.34-4.34" />,
    <circle key="2" cx="11" cy="11" r="8" />,
  ],
  "shopping-bag": [
    <path key="1" d="M16 10a4 4 0 0 1-8 0" />,
    <path key="2" d="M3.103 6.034h17.794" />,
    <path
      key="3"
      d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"
    />,
  ],
  minus: [<path key="1" d="M5 12h14" />],
  plus: [<path key="1" d="M5 12h14" />, <path key="2" d="M12 5v14" />],
  trash: [
    <path key="1" d="M10 11v6" />,
    <path key="2" d="M14 11v6" />,
    <path key="3" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />,
    <path key="4" d="M3 6h18" />,
    <path key="5" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  ],
  check: [<path key="1" d="M20 6 9 17l-5-5" />],
  "arrow-right": [
    <path key="1" d="M5 12h14" />,
    <path key="2" d="m12 5 7 7-7 7" />,
  ],
  "arrow-up-right": [
    <path key="1" d="M7 7h10v10" />,
    <path key="2" d="M7 17 17 7" />,
  ],
  "chevron-down": [<path key="1" d="m6 9 6 6 6-6" />],
  phone: [
    <path
      key="1"
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    />,
  ],
  mail: [
    <path key="1" d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />,
    <rect key="2" x="2" y="4" width="20" height="16" rx="2" />,
  ],
  "map-pin": [
    <path
      key="1"
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    />,
    <circle key="2" cx="12" cy="10" r="3" />,
  ],
  users: [
    <path key="1" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />,
    <circle key="2" cx="9" cy="7" r="4" />,
    <path key="3" d="M22 21v-2a4 4 0 0 0-3-3.87" />,
    <path key="4" d="M16 3.13a4 4 0 0 1 0 7.75" />,
  ],
  "message-circle": [<path key="1" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />],
  "shield-check": [
    <path
      key="1"
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    />,
    <path key="2" d="m9 12 2 2 4-4" />,
  ],
  ruler: [
    <path
      key="1"
      d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
    />,
    <path key="2" d="m14.5 12.5 2-2" />,
    <path key="3" d="m11.5 9.5 2-2" />,
    <path key="4" d="m8.5 6.5 2-2" />,
    <path key="5" d="m17.5 15.5 2-2" />,
  ],
};

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** Decorative icon; give the surrounding control its accessible name. */
export function Icon({
  name,
  size = 24,
  strokeWidth = 1.6,
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}

/** The four-point star from the Cultured Cowboy mark. */
export function Sparkle({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 1.5 14.3 9.7 22.5 12l-8.2 2.3L12 22.5l-2.3-8.2L1.5 12l8.2-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}
