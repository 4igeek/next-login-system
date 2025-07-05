import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type Props = {
  title: string;
  items: { title: string; href: string; icon: React.ReactNode }[];
};
const WithIcon = (props: Props) => {
  const { title, items } = props;
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          <li>
            {items.map((item, index) => (
              <NavigationMenuLink key={item.title + "-" + index} asChild>
                <Link href={item.href} className="flex-row items-center gap-2">
                  {item.icon}
                  {item.title}
                </Link>
              </NavigationMenuLink>
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default WithIcon;
