import React from "react";
import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Props = {
  simpleContent: {
    title: string;
    items: { title: string; href: string }[];
  };
};

const Simple = ({ simpleContent }: Props) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{simpleContent.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          <li>
            {simpleContent.items.map((item, index) => (
              <NavigationMenuLink key={item.title + "-" + index} asChild>
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Simple;
