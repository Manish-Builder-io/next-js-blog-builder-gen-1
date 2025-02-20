import Link from 'next/link';

interface CtaItem {
  url: string;
  ctaLabel: string;
}

interface HeroSymbolProps {
  title: string;
  description: string;
  ctaText: CtaItem[];
}

const HeroSymbol: React.FC<HeroSymbolProps> = (props) => {
  return (
    <div>
      <h1 className="text-2xl mb-5">{props.title}</h1>
      <p>{props.description}</p>
      {props.ctaText.map((element, idx) => (
        <div key={idx} className="block pr-5 mt-5">
          <Link href={element.url}>{element.ctaLabel}</Link>
        </div>
      ))}
    </div>
  );
};

export default HeroSymbol;
