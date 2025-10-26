import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Outlet, useMatches } from '@tanstack/react-router';
import { peripherals, wallOfFavs } from '../constants';

const AllTimeFavComponent = () => {
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
        <h2 className="text-4xl">Wall of Fav</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents */}
      <ul className="grid grid-cols-4 gap-5">
        {wallOfFavs.map((fav) => (
          <li key={fav.id}>
            <Card className="rounded-none cursor-pointer border-black">
              <CardHeader>
                <CardTitle>{fav.name}</CardTitle>
                <CardDescription>{fav.category}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTimeFavComponent;
