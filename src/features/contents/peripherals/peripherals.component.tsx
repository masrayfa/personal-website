import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Outlet, useMatches } from '@tanstack/react-router';
import { peripherals } from '../constants';

const PeripheralsComponent = () => {
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
        <h2 className="text-4xl">Peripherals</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents */}
      <ul className="grid grid-cols-4 gap-5">
        {peripherals.map((item) => (
          <li key={item.id}>
            <Card className="rounded-none cursor-pointer border-black">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeripheralsComponent;
