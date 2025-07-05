import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ListItem from "./ListItem";

type Link = {
  href: string;
  title: string;
};

type Props = {
  content: {
    LHSContent: {
      title: string;
      link: Link;
      description: string;
    };
    RHSContent: {
      listItems: {
        href: string;
        title: string;
        description: string;
      }[];
    };
  };
};

const Feature = ({ content }: Props) => {
  const { LHSContent, RHSContent } = content;
  const {
    title: LHSTitle,
    link: LHSLink,
    description: LHSDescription,
  } = LHSContent;
  const { listItems } = RHSContent;
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{LHSTitle}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link href={LHSLink.href}>
                <div className="mt-4 mb-2 text-lg font-medium">
                  {LHSLink.title}
                </div>
                <p className="text-muted-foreground text-sm leading-tight">
                  {LHSDescription}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          {listItems.map((item) => (
            <ListItem key={item.href} href={item.href} title={item.title}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Feature;
