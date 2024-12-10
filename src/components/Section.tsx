import React from 'react';

// Define the type for the Section component
type SectionProps = {
  content: string; // Only content is received as a prop
};

const Section: React.FC<SectionProps> = ({ content }) => {
  return (
    <section className="relative py-12 px-6 text-white">
      <div
        className="relative z-10"
        dangerouslySetInnerHTML={{
          __html: content, // Render the rich text HTML content
        }}
      />
    </section>
  );
};

export default Section;
