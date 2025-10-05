import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { FaHeart } from 'react-icons/fa';

const listOfblogs = [
  {
    id: 1,
    title: 'judul',
    desc: 'deskripsi',
    url: 'sukses',
    likes: 8,
  },
  {
    id: 2,
    title: 'judul',
    desc: 'deskripsi',
    url: 'lancar',
    likes: 19,
  },
  {
    id: 3,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki',
    likes: 27,
  },
  {
    id: 4,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 1',
    likes: 14,
  },
  {
    id: 5,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 2',
    likes: 11,
  },
  {
    id: 6,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 3',
    likes: 11,
  },
  {
    id: 7,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 4',
    likes: 11,
  },
  {
    id: 8,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 5',
    likes: 11,
  },
  {
    id: 9,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 6',
    likes: 11,
  },
  {
    id: 10,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 7',
    likes: 11,
  },
  {
    id: 11,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 8',
    likes: 11,
  },
  {
    id: 12,
    title: 'judul',
    desc: 'deskripsi',
    url: 'rejeki 9',
    likes: 11,
  },
];

const BlogComponent = (props: IContent) => {
  const { widgetId } = props;

  const matches = useMatches();

  // Cek apakah ada child route (contentId) yang aktif
  const hasChildRoute = matches.some((match) =>
    match.id.includes('$contentId')
  );

  // Jika ada child route, render Outlet (untuk detail page)
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
        {listOfblogs.map((blog) => (
          <li className="">
            <Link
              id={String(blog.id)}
              to={'/$widgetId/$contentId'}
              params={{ widgetId: 'blog', contentId: String(blog.id) }}
            >
              <Card className="rounded-none cursor-pointer border-black">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-end gap-2">
                  <span>
                    <FaHeart />
                  </span>
                  <span>{blog.likes}</span>
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
