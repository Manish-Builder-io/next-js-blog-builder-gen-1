type AuthorBlockProps = {
  children: React.ReactNode;
};

const AuthorBlock: React.FC<AuthorBlockProps> = ({ children }) => {
  return <div className="text-xl">{children}</div>;
};

export default AuthorBlock;
