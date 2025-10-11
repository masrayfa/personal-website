import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { FaHeart } from 'react-icons/fa';
import BlogMDsCollections from './md';

const BlogComponent = () => {
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes('$contentId')
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

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
        {BlogMDsCollections.map((md) => (
          <li className="">
            <Link
              id={String(md.id)}
              to={'/$widgetId/$contentId'}
              params={{ widgetId: 'blog', contentId: String(md.id) }}
            >
              <Card className="rounded-none cursor-pointer border-black">
                <CardHeader>
                  <CardTitle>{md.metadata.title}</CardTitle>
                  <CardDescription>{md.metadata.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-end gap-2">
                  <span>
                    <FaHeart />
                  </span>
                  <span>{md.metadata.likes ?? 30}</span>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogComponent;
