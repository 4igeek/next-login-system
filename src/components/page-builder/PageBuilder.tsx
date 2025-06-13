"use client";

import React, { useState } from "react";
import PostTitleBar from "@/components/page-builder/PostTitleBar";
import EditPageBuilderContent from "./EditPageBuilderContent";
import PreviewPageBuilderContent from "./PreviewPageBuilderContent";
import PageBuilderSidebar from "./PageBuilderSidebar";

type Props = {};

const PageBuilder = (props: Props) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [pageTitle, setPageTitle] = useState("Untitled Page");

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 p-4">
        {/* Main content area */}
        <div className="h-full border rounded-lg relative">
          <PostTitleBar
            setPageTitle={setPageTitle}
            pageTitle={pageTitle}
            setIsPreviewMode={setIsPreviewMode}
            isPreviewMode={isPreviewMode}
          />
          <div className="h-full pt-14 flex items-center justify-center">
            {isPreviewMode ? (
              <PreviewPageBuilderContent />
            ) : (
              <EditPageBuilderContent />
            )}
          </div>
        </div>
      </div>

      {/* Sidebar  */}
      <PageBuilderSidebar />
    </div>
  );
};

export default PageBuilder;
