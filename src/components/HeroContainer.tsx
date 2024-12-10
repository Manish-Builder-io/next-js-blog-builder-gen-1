import React from 'react';

// Define types for the HeroContainer component props
type HeroContainerProps = {
  backgroundImage: string;
  children: React.ReactNode; // to support child components like Title, Eyebrow, AuthorBlock
};

// HeroContainer component
const HeroContainer: React.FC<HeroContainerProps> = ({ backgroundImage, children }) => {

console.log("🚀 ~ children:", children);


  console.log("🚀 ~ backgroundImage:", backgroundImage);

  return (
    <div
      className="relative h-[400px] bg-cover bg-center flex flex-col justify-center px-6 text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

export default HeroContainer;
