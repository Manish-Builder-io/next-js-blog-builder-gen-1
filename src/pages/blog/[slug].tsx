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
      .get("blog-article", {
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
  const articles = await builder.getAll("blog-article", {
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
      <h1>{articleData?.data?.title}</h1>
      <img src={articleData?.data?.image} alt={articleData?.data?.title}/>
      <BuilderContent
        model="blog-article"
        content={articleData}
        options={{ enrich: true}}
      >
        {(data, loading, fullContent) => (
          //pass the template to the content prop for server-side rendering, but pass the article data to the data prop to access within our template
          <>
            <div>Hello blog</div>
            <h1>{data?.title}</h1>
            <BuilderComponent
              model="blog-article"
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
