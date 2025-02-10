import React from "react";

type Author = {
  image?: string;
  jobTitle?: string;
  authorName?: string;
  authorIntro?: string;
  imageAltText?: string;
};

type AuthorHeroProps = {
  authors?: Author;
  builderState?: any;
};

const AuthorHero: React.FC<AuthorHeroProps> = ({ authors = {}, builderState }) => {
  const fullName = builderState?.state?.author?.data?.authorName || authors?.authorName;
  const avatarImage = builderState?.state?.author?.data?.image || authors?.image;
  const jobTitle = builderState?.state?.authors?.jobTitle || authors?.jobTitle;
  const imageAltText = builderState?.state?.author?.data?.imageAltText || authors?.imageAltText;
  const quickSummary = builderState?.state?.author?.data?.authorIntro || authors?.authorIntro;

  return (
    <section className="max-w-3xl lg:max-w-5xl mx-auto hidden md:block py-12 lg:py-24">
      <div className="flex flex-col items-start px-4 xl:px-0">
        <div className="flex items-center justify-center gap-12">
          <img src={avatarImage} alt={imageAltText} className="w-24 h-24 rounded-full" />
          <div className="flex flex-col justify-center gap-8 p-0 m-0">
            <h2 className="uppercase text-lg font-bold m-0">Meet The Author</h2>
            <div className="flex flex-col justify-center gap-2">
              <p className="text-primary font-semibold text-lg m-0">{fullName}</p>
              <p className="text-secondary text-base m-0">{jobTitle}</p>
            </div>
            {quickSummary && (
              <p className="text-gray-700 text-base m-0">{quickSummary}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorHero;
