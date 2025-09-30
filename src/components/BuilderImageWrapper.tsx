import React from 'react';

interface BuilderImageWrapperProps {
  [key: string]: any;
}

const BuilderImageWrapper: React.FC<BuilderImageWrapperProps> = (props) => {
  // Extract fetchPriority and convert it to lowercase for DOM
  const { fetchPriority, image, altText, ...otherProps } = props;
  
  // Handle image prop (can be string or object)
  let src = '';
  if (typeof image === 'string') {
    src = image;
  } else if (image && typeof image === 'object' && image.secure_url) {
    src = image.secure_url;
  }
  
  // Create the props object with proper fetchpriority handling
  const imageProps = {
    ...otherProps,
    src,
    alt: altText || '',
    ...(fetchPriority && { fetchpriority: fetchPriority })
  };

  // Return an img element with corrected props
  return React.createElement('img', imageProps);
};

export default BuilderImageWrapper;
