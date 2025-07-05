import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ListItem from "./ListItem";

type Props = {
  components: { title: string; href: string; description: string }[];
};

const GridDropdown = ({ components }: Props) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Grid Dropdown</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {components.map((component) => (
            <ListItem
              key={component.title}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default GridDropdown;
