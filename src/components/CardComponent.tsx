// CardComponent.tsx
import React from 'react';

interface CardComponentProps {
  borderRadius: string;
  showBorder: boolean;
  darkMode: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ borderRadius, showBorder, darkMode, children }) => {
  const style = {
    borderRadius: borderRadius + 'px',
    border: showBorder ? '1px solid #ccc' : 'none',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return <div style={style}>{children}</div>;
};

export default CardComponent;