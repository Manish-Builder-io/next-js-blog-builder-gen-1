import { useRouter } from "next/router";
import {
  builder,
  useIsPreviewing,
  BuilderContent,
  BuilderComponent,
} from "@builder.io/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      .get("blog-articles", {
        query: {
          "data.slug": params?.slug,
        },
        //enrich the data to make sure our author reference includes all content
        options: {
          enrich: true,
          includeUnpublished: true,
        },
        includeUnpublished: true,
        cacheSeconds: 0
      })
      .toPromise()) || null;

    
  // const articleTemplate =
  //   (await builder
  //     .get("blog-article-template", {
  //       //enrich the data to make sure our author reference includes all content
  //       options: {
  //         enrich: true,
  //       },
  //     })
  //     .toPromise()) || null;

  return {
    props: {
      articleData,
      // articleTemplate,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 1,
  };
}

// Define static paths return type
export async function getStaticPaths() {
  const articles = await builder.getAll("blog-articles", {
    options: { noTargeting: true,  includeUnpublished: true },
    includeUnpublished: true,
    fields: "data.slug",
    // query: {
    //   'data.slug': {$ne: 'using-builder-to-create-blog'},
    // },
  });

  return {
    paths: articles.map((article) => `/blog/${article.data?.slug}`),
    fallback: true,
  };
}

export default function BlogArticle({ articleData }) {
  const router = useRouter();
  const isPreviewingInBuilder = useIsPreviewing();
  const show404 = !articleData && !isPreviewingInBuilder;

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header />
      
      {/* Hero Section with Image and Overlay Text */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        {/* Background Image */}
        <img 
          src={articleData?.data?.image} 
          alt={articleData?.data?.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {articleData?.data?.title}
            </h1>
            {/* Article Content */}
            <div className="container mx-auto px-4 py-8 text-lg md:text-xl drop-shadow-md">
              <div dangerouslySetInnerHTML={{ __html: articleData?.data?.content || '' }} />
            </div>
          </div>
        </div>
      </section>

      <BuilderContent
        model="blog-articles"
        content={articleData}
        options={{ enrich: true}}
      >
        {(data, loading, fullContent) => (
          //pass the template to the content prop for server-side rendering, but pass the article data to the data prop to access within our template
          <>
            <BuilderComponent
              model="blog-articles"
              content={articleData}
              data={{ article: fullContent }}
              options={{ enrich: true }}
            />
          </>
        )}
      </BuilderContent>
      <Footer />
    </>
  );
}
