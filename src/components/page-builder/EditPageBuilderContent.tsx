import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { XMarkIcon } from "@heroicons/react/24/outline";
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

  const removeElement = (index: number) => {
    setElements((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={`w-full h-full p-4 ${
        isOver ? "bg-gray-800" : ""
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
              className="p-4 border border-gray-700 rounded bg-gray-800 relative group"
            >
              <button
                onClick={() => removeElement(index)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove element"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              {element.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditPageBuilderContent;
