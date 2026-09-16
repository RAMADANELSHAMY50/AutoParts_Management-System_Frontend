import { useState } from "react";

import Description from "./Description";
import Specifications from "./Specifications";
import Features from "./Features";

export default function ProductTabs({
  description,
  specifications = {},
  features = [],
  packageIncludes = [],
}) {
  const [activeTab, setActiveTab] =
    useState("description");

  const tabs = [
    {
      id: "description",
      label: "الوصف",
    },
    {
      id: "specifications",
      label: "المواصفات",
    },
    {
      id: "features",
      label: "المميزات",
    },
  ];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-5 flex w-full overflow-x-auto border-b border-zinc-800 sm:mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`shrink-0 border-b-2 px-4 py-3 text-xs font-medium transition sm:px-6 sm:text-sm ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-500"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "description" && (
        <Description
          description={description}
          features={features}
          packageIncludes={
            packageIncludes
          }
        />
      )}

      {activeTab === "specifications" && (
        <Specifications
          specifications={
            specifications
          }
        />
      )}

      {activeTab === "features" && (
        <Features />
      )}
    </div>
  );
}