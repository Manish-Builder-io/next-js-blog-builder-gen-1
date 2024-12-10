import { useRouter } from "next/router";
import { builder, useIsPreviewing, BuilderContent, BuilderComponent } from "@builder.io/react";

import { showTime } from '@/utils/dateUtils';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroContainer from "@/components/HeroContainer";
import Title from "@/components/Title";
import Eyebrow from "@/components/EyeBrow";
import AuthorBlock from "@/components/AuthorBlock";
// import Section from "@/components/Section";


builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define types for the article data structure
type Author = {
  value: {
    data: {
      name: string;
    };
  };
};

type ArticleData = {
  title: string;
  blurb: string;
  image: string;
  author: Author;
  timestamp: string;
  content: Array<{
    banner: {
      backgroundImage: string;
    };
    content: string;
  }>;
};

type BlogArticleProps = {
  articleData: ArticleData | null;
};

// Define static props return type
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const articleData =
    (await builder
      .get("blog-article", {
        query: {
          "data.slug": params?.slug,
        },
        // Enrich the data to make sure our author reference includes all content
        options: {
          enrich: true,
        },
      })
      .toPromise()) || null;

  return {
    props: {
      articleData,
    },
    revalidate: 5, // Re-generate the page at most once every 5 seconds
  };
}

// Define static paths return type
export async function getStaticPaths() {
  const articles = await builder.getAll("blog-article", {
    options: { noTargeting: true },
    fields: "data.slug",
  });

  return {
    paths: articles.map((article) => `/blog/${article.data?.slug}`),
    fallback: true,
  };
}

const BlogArticle = ({ articleData }: BlogArticleProps) => {
  const router = useRouter();
  const isPreviewingInBuilder = useIsPreviewing();
  const show404 = !articleData && !isPreviewingInBuilder;

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (show404) {
    return <h1>Article Not Found</h1>;
  }

  return (
    <>
      <Header />
      {/* Use BuilderContent to get live editing and previewing of a data model */}
      <BuilderContent model="blog-article" content={articleData}>
        {(data, loading, fullContent) => (
          <div>
            <HeroContainer backgroundImage={data?.image}>
              <Title>{data?.title}</Title>
              <Eyebrow>{data?.blurb}</Eyebrow>
              <AuthorBlock>
                By {data?.author?.value?.data?.name}
                <div>{showTime(data?.timestamp)}</div>
              </AuthorBlock>
            </HeroContainer>
            <div>
            <div>
              <BuilderComponent model='blog-article' content={fullContent}/>
            </div>
            </div>
          </div>
        )}
      </BuilderContent>
      <Footer />
    </>
  );
};

export default BlogArticle;
