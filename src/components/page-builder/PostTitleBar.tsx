"use client";

import React from "react";
import { Eye, Pencil } from "lucide-react";

type Props = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (mode: boolean) => void;
};

const PostTitleBar = ({
  pageTitle,
  setPageTitle,
  isPreviewMode,
  setIsPreviewMode,
}: Props) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-14 border-b px-4 flex items-center justify-between">
      <input
        type="text"
        value={pageTitle}
        onFocus={() => setPageTitle("")}
        onChange={(e) => setPageTitle(e.target.value)}
        className="text-lg font-medium bg-transparent border-none outline-none w-[300px]"
        placeholder="Enter post title..."
      />
      <button
        onClick={() => setIsPreviewMode(!isPreviewMode)}
        className="p-2 rounded-md hover:bg-gray-900 transition-colors"
        title={isPreviewMode ? "Switch to Edit Mode" : "Switch to Preview Mode"}
      >
        {isPreviewMode ? (
          <Pencil className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default PostTitleBar;
