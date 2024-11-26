// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Replace with your Public API Key
// builder.init('e53fe4ab5eb241c2a15fa2e40c8f2502');
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export default async function Page(props: PageProps) {
  // Await params to resolve the promise
  const resolvedParams = await props.params;

  const model = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (resolvedParams?.page?.join("/") || ""),
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();
    console.log(content);

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={model} />
    </>
  );
}