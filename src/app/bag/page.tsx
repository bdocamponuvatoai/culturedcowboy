import type { Metadata } from "next";
import { Bag } from "@/components/bag/bag";
import { Eyebrow } from "@/components/ui/eyebrow";
import { isIndexable } from "@/config/deployment";
import { pageMetadata } from "@/lib/metadata";

const lead = "A starting point for a conversation. No payment required.";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Your picks", path: "/bag/", description: lead }),
  // A per-visitor list: never worth a search result, even after launch.
  robots: { index: false, follow: isIndexable },
};

export default function BagPage() {
  return (
    <div className="container bag-page">
      <div className="bag-page__head">
        <Eyebrow>A FEW GOOD CHOICES</Eyebrow>
        <h1 className="heading--inline">
          Your <em>picks.</em>
        </h1>
        <p className="lead">{lead}</p>
      </div>
      <Bag />
    </div>
  );
}
