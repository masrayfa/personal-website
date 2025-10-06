import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { FaHeart } from 'react-icons/fa';
import { listOfblogs, shortStories } from '../constants';

const ShortStoriesComponent = () => {
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
        <h2 className="text-4xl">Short Stories</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents */}
      <ul className="flex flex-col gap-5">
        {shortStories.map((story) => (
          <li className="">
            <Link
              id={String(story.id)}
              to={'/$widgetId/$contentId'}
              params={{ widgetId: 'blog', contentId: String(story.id) }}
            >
              <Card className="rounded-none cursor-pointer border-black">
                <CardHeader>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>{story.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-end gap-2">
                  <span>
                    <FaHeart />
                  </span>
                  <span>{story.likes}</span>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortStoriesComponent;
