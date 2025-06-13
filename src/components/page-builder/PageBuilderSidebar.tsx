import React from "react";
import { useDrag } from "react-dnd";
import {
  RectangleStackIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
  DocumentTextIcon,
  PhotoIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import builderElements from "../../data/builder-elements.json";
import type { BuilderElement } from "./types";

type BuilderElements = {
  rowElements: BuilderElement[];
  columnElements: BuilderElement[];
  textElements: BuilderElement[];
  headingElements: BuilderElement[];
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RectangleStackIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
  DocumentTextIcon,
  PhotoIcon,
  HashtagIcon,
};

type Props = {
  onElementSelect?: (element: BuilderElement) => void;
};

const DraggableButton = ({ element }: { element: BuilderElement }) => {
  const [{ isDragging }, dragRef] = useDrag<
    BuilderElement,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: "builder-element",
    item: { ...element },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = iconMap[element.icon];
  if (!Icon) return null;

  return (
    <button
      ref={dragRef as unknown as React.RefObject<HTMLButtonElement>}
      className={`p-2 border rounded hover:bg-gray-800 flex flex-col items-center transition-colors duration-150 ${
        element.id === "row" ? "col-span-3" : ""
      } ${isDragging ? "opacity-50" : ""}`}
      title={`Add ${element.label}`}
    >
      <Icon className={`${element.id === "row" ? "w-full" : "w-6"} h-6`} />
      <span className="text-xs mt-1">{element.label}</span>
    </button>
  );
};

const PageBuilderSidebar: React.FC<Props> = ({ onElementSelect }) => {
  const elements = builderElements as BuilderElements;

  return (
    <div className="w-[400px] border-l p-4">
      <h2 className="text-lg font-semibold mb-4">Page Builder Elements</h2>
      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Rows</h3>
          <div className="grid grid-cols-3 gap-2">
            {elements.rowElements.map((element) => (
              <DraggableButton key={element.id} element={element} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Columns</h3>
          <div className="grid grid-cols-3 gap-2">
            {elements.columnElements.map((element) => (
              <DraggableButton key={element.id} element={element} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Content</h3>
          <div className="grid grid-cols-3 gap-2">
            {elements.textElements.map((element) => (
              <DraggableButton key={element.id} element={element} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Headings</h3>
          <div className="grid grid-cols-3 gap-2">
            {elements.headingElements.map((element) => (
              <DraggableButton key={element.id} element={element} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PageBuilderSidebar;
