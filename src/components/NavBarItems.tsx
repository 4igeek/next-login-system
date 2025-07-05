"use client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import WithIcon from "./NavBarItems/WithIcon";
import Simple from "./NavBarItems/Simple";
import List from "./NavBarItems/List";
import LinkItem from "./NavBarItems/Link";
import GridDropdown from "./NavBarItems/Grid";
import Feature from "./NavBarItems/Feature";
import featureContent from "./NavBarItems/content/feature-content";
import components from "./NavBarItems/content/grid-content";
import listContents from "./NavBarItems/content/list-content";
import simpleContent from "./NavBarItems/content/simple-content";
import iconsContent from "./NavBarItems/content/with-icons-content";

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <Feature content={featureContent} />
        <GridDropdown components={components} />
        <LinkItem href="/docs" title="Link Item" />
        <List listContents={listContents} />
        <Simple simpleContent={simpleContent} />
        <WithIcon {...iconsContent} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
