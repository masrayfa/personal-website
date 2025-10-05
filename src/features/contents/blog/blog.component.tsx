import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const listOfblogs = [
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
  {
    title: 'judul',
    desc: 'deskripsi',
  },
];

const BlogComponent = () => {
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
            <Card className="rounded-none cursor-pointer">
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.desc}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogComponent;
