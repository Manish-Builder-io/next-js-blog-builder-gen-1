import { useRouter } from "next/router";
import { builder } from "@builder.io/react";

import { showTime } from "@/utils/dateUtils";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import Eyebrow from "@/components/EyeBrow";
import AuthorBlock from "@/components/AuthorBlock";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define types for the article data structure
type Author = {
  value: {
    data: {
      authorName: string;
    };
  };
};

type BlogPost = {
  title: string;
  blurb: string;
  image: string;
  author: Author;
  date: number; // timestamp
  slug: string;
};

type BlogLandingPageProps = {
  posts: BlogPost[];
};

const BlogLandingPage = ({ posts }: BlogLandingPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!posts) {
    return <h1>No blog posts found</h1>;
  }

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Title */}
        <Title>Blog</Title>

        {/* Eyebrow */}
        <Eyebrow>Latest posts and articles</Eyebrow>

        {/* Blog Posts Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {post.title}
                </h2>

                {/* Blurb */}
                <p className="text-gray-600 mb-4">{post.blurb}</p>

                {/* Author Block */}
                <AuthorBlock>
                  <div className="text-gray-400">
                    By {post.author?.value?.data?.authorName}
                  </div>
                  <div className="text-gray-400">{showTime(post.date)}</div>
                </AuthorBlock>

                {/* Read More Button */}
                <button
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

// Example of Static Props
export const getStaticProps = async () => {
  const postsData = await builder.getAll("blog-articles", {
    cachebust: true,
    options: { noTargeting: true, enrich: true },
    fields: "data",
    includeRefs: true,
    enrich: true,
    query: {
            'data.slug': {$eq: 'fashion-2025'},
    },
  });

  // Map the posts data to match the required format
  const posts = postsData.map((post) => ({
    title: post.data.title,
    blurb: post.data.blurb,
    image: post.data.image,
    author: post.data.author,
    date: post.data.date,
    slug: post.data.slug,
  }));

  return {
    props: {
      posts,
    },
    revalidate: 60, // Optional: if you want to revalidate the page every 60 seconds
  };
};

export default BlogLandingPage;
