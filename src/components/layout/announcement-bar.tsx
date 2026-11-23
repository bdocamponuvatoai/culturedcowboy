import { Icon, Sparkle } from "@/components/ui/icon";
import { site } from "@/config/site";

export function AnnouncementBar() {
  return (
    <aside className="announcement" aria-label="Store information">
      <div className="announcement__inner">
        <p>
          <Sparkle size={10} />
          Independent spirit. Personal service.
          <span className="announcement__place">
            {" Greenwood, South Carolina."}
          </span>
        </p>
        <a href={`tel:${site.phone.tel}`}>
          <Icon name="phone" size={13} />
          {site.phone.display}
        </a>
      </div>
    </aside>
  );
}
