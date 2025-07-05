import React from "react";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type Props = {
  href: string;
  title: string;
};

const LinkItem = (props: Props) => {
  const { href, title } = props;
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={href}>{title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default LinkItem;
