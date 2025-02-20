import React from 'react';

interface SimpleHeroWithCtaProps {
  Subtitle: string;
  Button1Url: string;
  Button1Text: string;
  Button2Url: string;
  Button2Text: string;
  title: string;
}

const SimpleHeroWithCta: React.FC<SimpleHeroWithCtaProps> = ({
  Subtitle,
  Button1Url,
  Button1Text,
  Button2Url,
  Button2Text,
  title,
}) => {
  return (
    <div className="simple-hero">
      <h1 className="title">Welcome to Our Website</h1>
      <h1 className="title">{title}</h1>
      <p className="subtitle">{Subtitle}</p>
      <div className="cta-buttons">
        <a href={Button1Url} className="button1">
          {Button1Text}
        </a>
        <a href={Button2Url} className="button2">
          {Button2Text}
        </a>
      </div>
    </div>
  );
};

export default SimpleHeroWithCta;
