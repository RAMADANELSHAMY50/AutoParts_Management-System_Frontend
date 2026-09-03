import { useState } from "react";

export default function ProductTabs({
  description,
  specifications,
  installation,
  reviews,
}) {
  const tabs = [
    "Description",
    "Specifications",
    "Installation",
    "Reviews",
  ];

  const [activeTab, setActiveTab] = useState("Description");

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <div className="space-y-4 text-zinc-300 leading-8">
            {description}
          </div>
        );

      case "Specifications":
        return (
          <div className="space-y-3">
            {specifications}
          </div>
        );

      case "Installation":
        return (
          <div className="space-y-4 text-zinc-300 leading-8">
            {installation}
          </div>
        );

      case "Reviews":
        return (
          <div className="space-y-4">
            {reviews}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="mt-10">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-5 py-4 text-sm font-medium transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-500"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-b-2xl border border-t-0 border-zinc-800 bg-[#171717] p-6">
        {renderContent()}
      </div>
    </section>
  );
}