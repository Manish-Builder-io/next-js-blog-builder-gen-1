type EyebrowProps = {
  children: React.ReactNode;
};

const Eyebrow: React.FC<EyebrowProps> = ({ children }) => {
  return <h2 className="text-2xl font-light mb-2">{children}</h2>;
};

export default Eyebrow;
