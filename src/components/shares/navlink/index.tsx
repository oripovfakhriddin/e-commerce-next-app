"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Children from "@/types";

import "./style.scss";

const NavLink = ({ href, children }: { href: string } & Children) => {
  const pathname = usePathname();
  return (
    <Link href={href} className={pathname === href ? "navlink__active" : ""}>
      {children}
    </Link>
  );
};

export default NavLink;
