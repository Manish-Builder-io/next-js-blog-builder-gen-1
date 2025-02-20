import { Builder, BuilderBlocks, type BuilderElement } from "@builder.io/react";
import { useState } from "react";

// Define the component
type TabProps = {
  tabs: { text: string; content: React.ReactNode[] }[];
  builderBlock: BuilderElement;
};

const CustomTabs = ({ tabs, builderBlock }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs?.length) return null;

  return (
    <>
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button px-2 ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.text}
          </button>
        ))}
      </div>

      <BuilderBlocks
        parentElementId={builderBlock?.id}
        dataPath={`tabs.${activeTab}.content`}
        blocks={tabs[activeTab].content}
      />
    </>
  );
};

export default CustomTabs;
