"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Props = {
  listContents: {
    items: { title: string; description: string; href: string }[];
    title: string;
  };
};

const List = ({ listContents }: Props) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{listContents.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] gap-4">
          <li>
            {listContents.items.map((item, index) => (
              <NavigationMenuLink key={item.title + "-" + index} asChild>
                <Link href={item.href}>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground">
                    {item.description}
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default List;
