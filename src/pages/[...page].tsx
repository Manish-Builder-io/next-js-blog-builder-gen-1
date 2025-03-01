// // pages/[...page].tsx
// import React from "react";
// import { useRouter } from "next/router";
// import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
// import { BuilderContent } from "@builder.io/sdk";
// import DefaultErrorPage from "next/error";
// import Head from "next/head";
// import { GetStaticProps } from "next";
// import "@builder.io/widgets";
// // Replace with your Public API Key

// builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// // Define a function that fetches the Builder
// // content for a given page
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // Fetch the builder content for the given page
//   const page = await builder
//     .get("page", {
//       userAttributes: {
//         urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
//       },
//     })
//     .toPromise();

//   // Return the page content as props
//   return {
//     props: {
//       page: page || null,
//     },
//     // Revalidate the content every 5 seconds
//     revalidate: 5,
//   };
// };

// // Define a function that generates the
// // static paths for all pages in Builder
// export async function getStaticPaths() {
//   // Get a list of all pages in Builder
//   const pages = await builder.getAll("page", {
//     // We only need the URL field
//     fields: "data.url",
//     options: { noTargeting: true },
//   });

//   // Generate the static paths for all pages in Builder
//   return {
//     paths: pages
//       .map((page) => `${page.data?.url}`)
//       .filter((url) => url !== "/"),
//     fallback: "blocking",
//   };
// }

// // Define the Page component
// export default function Page({ page }: { page: BuilderContent | null }) {
//   const router = useRouter();
//   const isPreviewing = useIsPreviewing();

//   // If the page content is not available
//   // and not in preview mode, show a 404 error page
//   if (!page && !isPreviewing) {
//     return <DefaultErrorPage statusCode={404} />;
//   }

//   // If the page content is available, render
//   // the BuilderComponent with the page content
//   return (
//     <>
//       <Head>
//         <title>{page?.data?.title}</title>
//       </Head>
//       {/* Render the Builder page */}
//       <BuilderComponent
//         model="page"
//         content={page || undefined}
//         options={{ enrich: true }}
//         context={{
//           imgUrl:
//             "https://storage.googleapis.com/kopperfield-prod-public/single_line_diagrams/previews/1728683484880-Blank_Template_Screenshot.png",
//         }}
//       />
//     </>
//   );
// }

import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { setPixelProperties } from "@builder.io/utils";

import DefaultErrorPage from "next/error";
import Head from "next/head";
import { BuilderContent } from "@builder.io/sdk";
import "../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const tags = ["Non beauty"];

builder.setUserAttributes({productTags: tags, users: ['admin', 'designers']});

export async function getServerSideProps({ params }) {
  const mode = "page"; // Define your model name here
  const page =
    (await builder
      .get(mode, {
        userAttributes: {
          // productTags: ["Badge:New"],
          // users: ["admin", "developers"],
          urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
        },
        enrich: true,
      }) // Define your query parameters properly
      .toPromise()) || null;

  setPixelProperties(page, { alt: "pixel tag from builder" });

  return {
    props: {
      page,
    },
  };
}

// Define the Page component
export default function Page({ page }: { page: BuilderContent | null }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent
        model="page"
        content={page || undefined}
        options={{ enrich: true }}
        data={{ products: ["A", "B", "C"]}}
      />
    </>
  );
}
