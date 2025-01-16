// import React from "react";
// import { useRouter } from "next/router";
// import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
// import { setPixelProperties } from '@builder.io/utils';

// import DefaultErrorPage from "next/error";
// import Head from "next/head";
// import { BuilderContent } from "@builder.io/sdk";
// import "../builder-registry";

// builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// const accordionData = [
//   {
//     title: "Accordion Item 1",
//     body: "This is the content for the first accordion item. It can contain text, images, or any HTML content."
//   },
//   {
//     title: "Accordion Item 2",
//     body: "This is the content for the second accordion item. You can also add more detailed information or sections here."
//   },
//   {
//     title: "Accordion Item 3",
//     body: "This is the content for the third accordion item. It's the final section, and you can close or collapse it."
//   }
// ];

// export async function getServerSideProps({ params }) {
//   const mode = 'page'; // Define your model name here
//   const page = await builder
//       .get(mode, { userAttributes: { urlPath: "/" + ((params?.page as string[])?.join("/") || "") } }) // Define your query parameters properly
//       .toPromise() || null;

//   setPixelProperties(page, { alt: 'pixel tag from builder' });

//   return {
//     props: {
//       page,
//     },
//   }
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
//       <BuilderComponent model="page" content={page || undefined} data={{ accordionData }} />
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

builder.setUserAttributes({users: 'admin'});

const accordionData = [
  {
    title: "Accordion Item 1",
    body: "This is the content for the first accordion item. It can contain text, images, or any HTML content.",
  },
  {
    title: "Accordion Item 2",
    body: "This is the content for the second accordion item. You can also add more detailed information or sections here.",
  },
  {
    title: "Accordion Item 3",
    body: "This is the content for the third accordion item. It's the final section, and you can close or collapse it.",
  },
];

export async function getServerSideProps({ params }) {
  const mode = "page"; // Define your model name here
  const page =
    (await builder
      .get(mode, {
        userAttributes: {
          urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
        },
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
        data={{ accordionData }}
      />
    </>
  );
}
