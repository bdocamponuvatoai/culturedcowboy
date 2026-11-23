import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

/** Internal paths use client-side navigation; tel:, mailto: and external URLs stay plain anchors. */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/") && !href.startsWith("//"))
    return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}

const cx = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(" ");

type ButtonLinkProps = SmartLinkProps & {
  variant?: "solid" | "light" | "outline";
  arrow?: boolean;
  block?: boolean;
  children: ReactNode;
};

/** Call-to-action link styled as a button, optionally with a sliding arrow. */
export function ButtonLink({
  variant = "solid",
  arrow = false,
  block,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <SmartLink
      className={cx("btn", `btn--${variant}`, block && "btn--block", className)}
      {...props}
    >
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" size={16} />}
    </SmartLink>
  );
}

/** Small uppercase text link with an underline that draws away on hover. */
export function TextLink({
  className,
  children,
  ...props
}: SmartLinkProps & { children: ReactNode }) {
  return (
    <SmartLink className={cx("text-link", className)} {...props}>
      <span>{children}</span>
      <Icon name="arrow-right" size={14} />
    </SmartLink>
  );
}
