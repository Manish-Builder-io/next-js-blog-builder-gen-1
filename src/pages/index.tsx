import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../components/builder";

// Initialize Builder.io with the public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Page props for dynamic routing
interface PageParams {
  page: string[];
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<JSX.Element> {
  // Define the Builder.io model name for the page
  const builderModelName = "page";

  // Await the params promise
  const resolvedParams = await params;

  // Extract locale and page segments
  // default to "en-us" locale if not provided
  // urlPath is the remaining segments after the locale
  const defaultLocale = "en-US";
  const [locale = defaultLocale, ...pageSegments] = resolvedParams?.page ?? [];
  const urlPath = "/" + (pageSegments.length > 0 ? pageSegments.join("/") : "");

  const index = locale.indexOf("-"); // Find the index of '0'
  const before = locale.slice(0, index + 1); // Get from start to include the hyphen
  const after = locale.slice(index + 1); // Everything after '0'

  // Make the part after '-' uppercase
  let updatedLocale = before + after.toUpperCase();

  // Fetch content dynamically from Builder.io
  // using the model name and user attributes
  // page content is fetched based on the locale and url path
  const content = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath,

      },
      options: {

      },
    })
    .toPromise();

  // Handle missing content or invalid locale
  // TODO - handle 404 status code & page not found
  if (!content) {
    return (
      <div>
        <h1>Page not found</h1>
        <p>
          The requested content could not be found for locale "{locale}" and
          path "{urlPath}".
        </p>
      </div>
    );
  }

  // Render the Builder.io page
  return (
    <>
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
