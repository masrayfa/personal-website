import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Outlet, useMatches } from "@tanstack/react-router";
import { BlogMDsCollections } from "./md";
import { filterCollections } from "@/lib/utils/filter-collections";
import { useFilterStore } from "@/stores/filter-store";

const BlogComponent = () => {
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes("$contentId"),
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();
  const activefilters = getActiveFilters("blog");

  const filteredCollections = filterCollections(
    BlogMDsCollections,
    activefilters,
  );

  const blogs = filteredCollections.length > 0 ? filteredCollections : null;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents */}
      <ul className="flex flex-col gap-5">
        {(blogs ?? []).length > 0 ? (
          blogs?.map((blog) => (
            <li className="">
              <Link
                id={String(blog.id)}
                to={"/$widgetId/$contentId"}
                params={{ widgetId: "blog", contentId: String(blog.id) }}
              >
                <Card className="rounded-none cursor-pointer border-black">
                  <CardHeader>
                    <CardTitle>{blog.metadata.title}</CardTitle>
                    <CardDescription>{blog.metadata.date} • {blog.metadata.desc}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2">
                      {blog.metadata.year && (
                        <span className="text-xs bg-gray-100 border border-gray-300 px-2 py-1">
                          {blog.metadata.year}
                        </span>
                      )}
                      {blog.metadata.genre &&
                        blog.metadata.genre.map((b: string) => (
                          <span
                            key={b}
                            className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                          >
                            {b}
                          </span>
                        ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          ))
        ) : (
          <div>
            <p>No content found</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default BlogComponent;
