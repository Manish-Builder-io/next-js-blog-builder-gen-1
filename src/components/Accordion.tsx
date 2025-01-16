import React, { useState } from "react";

// Define the structure of the accordion data.
interface AccordionItem {
  title: string;
  body: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {


  // State to track which item is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Toggle the expanded state when an item is clicked
  const handleToggle = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion">
      {items?.map((item, index) => (
        <div key={index} className="accordion-item">
          <div className="accordion-title" onClick={() => handleToggle(index)}>
            <h2>{item.title}</h2>
            <span>{expandedIndex === index ? "-" : "+"}</span>
          </div>
          {expandedIndex === index && (
            <div className="accordion-body">
              <p>{item.body}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
