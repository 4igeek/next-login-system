import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { BuilderElement } from "@/components/page-builder/types";

type PageElement = BuilderElement & {
  children?: PageElement[];
  _colSpan?: string;
};

type Props = {};

const EditPageBuilderContent = (props: Props) => {
  const [elements, setElements] = useState<PageElement[]>([]);

  const [{ isOver }, dropRef] = useDrop<
    BuilderElement,
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: "builder-element",
    drop: (item: BuilderElement) => {
      if (item.type !== "layout" || item.id === "row") {
        const [span] = getColumnSpans("one-one");
        setElements((prev) => [
          ...prev,
          {
            ...item,
            children: [
              {
                id: "one-one",
                label: "1/1",
                type: "layout",
                icon: "Square2StackIcon",
                _colSpan: span,
              },
            ],
          },
        ]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const removeElement = (index: number) => {
    setElements((prev) => prev.filter((_, i) => i !== index));
  };

  const getColumnSpans = (ratio: string) => {
    switch (ratio) {
      case "one-one":
        return ["col-span-12"];
      case "one-half":
        return ["col-span-6", "col-span-6"];
      case "two-thirds":
        return ["col-span-8", "col-span-4"];
      case "three-fourths":
        return ["col-span-9", "col-span-3"];
      case "four-fifths":
        return ["col-span-10", "col-span-2"];
      case "three-halves":
        return ["col-span-4", "col-span-8"];
      case "four-thirds":
        return ["col-span-3", "col-span-9"];
      case "five-fourths":
        return ["col-span-2", "col-span-10"];
      default:
        return ["col-span-12"];
    }
  };

  const columnLayouts = [
    { id: "one-one", label: "1/1", icon: "Square2StackIcon" },
    { id: "one-half", label: "1/2", icon: "Square2StackIcon" },
    { id: "two-thirds", label: "2/3", icon: "Square2StackIcon" },
    { id: "three-fourths", label: "3/4", icon: "Square2StackIcon" },
    { id: "four-fifths", label: "4/5", icon: "Square2StackIcon" },
    { id: "three-halves", label: "3/2", icon: "Square2StackIcon" },
    { id: "four-thirds", label: "4/3", icon: "Square2StackIcon" },
    { id: "five-fourths", label: "5/4", icon: "Square2StackIcon" },
  ];

  const handleRowLayoutChange = (rowIdx: number, newLayoutId: string) => {
    setElements((prev) => {
      const updated = [...prev];
      const row = updated[rowIdx];
      const layout = columnLayouts.find((l) => l.id === newLayoutId);
      if (row && layout) {
        const [span1, span2] = getColumnSpans(layout.id);
        row.children = [
          {
            id: layout.id,
            label: `${layout.label} (1)`,
            type: "layout",
            icon: layout.icon,
            _colSpan: span1,
          },
          {
            id: layout.id,
            label: `${layout.label} (2)`,
            type: "layout",
            icon: layout.icon,
            _colSpan: span2,
          },
        ];
      }
      return updated;
    });
  };

  const RowElement = ({
    element,
    index,
  }: {
    element: PageElement;
    index: number;
  }) => {
    const [{ isOver }, dropRef] = useDrop<
      BuilderElement,
      unknown,
      { isOver: boolean }
    >(() => ({
      accept: "builder-element",
      drop: (item: BuilderElement) => {
        if (item.type === "layout" && item.id !== "row") {
          setElements((prev) => {
            const newElements = [...prev];
            if (!newElements[index].children) {
              newElements[index].children = [];
            }
            const [span1, span2] = getColumnSpans(item.id);
            newElements[index].children = [
              { ...item, label: `${item.label} (1)`, _colSpan: span1 },
              { ...item, label: `${item.label} (2)`, _colSpan: span2 },
            ];
            return newElements;
          });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
        className={`p-4 pt-8 border-2 border-gray-600 rounded-xl bg-gray-800 relative group ${
          isOver ? "bg-gray-700" : ""
        }`}
      >
        <button
          onClick={() => removeElement(index)}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Remove element"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
        <select
          className="mb-2 w-full bg-gray-800 text-white text-xs rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={
            element.children && element.children[0]
              ? element.children[0].id
              : "one-one"
          }
          onChange={(e) => handleRowLayoutChange(index, e.target.value)}
        >
          {columnLayouts.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="min-h-[50px]">
          {element.children && element.children.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              {element.children.map((child, childIndex) => (
                <div
                  key={`${child.id}-${childIndex}`}
                  className={`p-2 bg-gray-900 rounded-lg ${child._colSpan}`}
                >
                  {child.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
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
          {elements.map((element, index) =>
            element.id === "row" ? (
              <RowElement
                key={`${element.id}-${index}`}
                element={element}
                index={index}
              />
            ) : (
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
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EditPageBuilderContent;
