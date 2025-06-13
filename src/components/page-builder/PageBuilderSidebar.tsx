import React from "react";

type Props = {};

const PageBuilderSidebar = (props: Props) => {
  return (
    <div className="w-[400px] border-l p-4">
      <h2 className="text-lg font-semibold mb-4">Page Builder Options</h2>
      <div className="space-y-4">
        <p>Options panel content will be added here</p>
      </div>
    </div>
  );
};

export default PageBuilderSidebar;
