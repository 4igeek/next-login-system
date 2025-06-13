import React, { useState } from "react";
import { useDrop } from "react-dnd";
import type { BuilderElement } from "@/components/page-builder/types";

type Props = {};

const EditPageBuilderContent = (props: Props) => {
  const [elements, setElements] = useState<BuilderElement[]>([]);

  const [{ isOver }, dropRef] = useDrop<
    BuilderElement,
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: "builder-element",
    drop: (item: BuilderElement) => {
      setElements((prev) => [...prev, item]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={`w-full h-full p-4 ${
        isOver ? "bg-gray-100" : ""
      } transition-colors duration-150`}
    >
      {elements.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          Drag and drop elements here
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element, index) => (
            <div
              key={`${element.id}-${index}`}
              className="p-4 border rounded bg-white"
            >
              {element.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditPageBuilderContent;
