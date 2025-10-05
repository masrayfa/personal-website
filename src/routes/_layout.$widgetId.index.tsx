import AllTimeFavComponent from '@/features/contents/all-time-fav/all-time-fav.component';
import BlogComponent from '@/features/contents/blog/blog.component';
import FilmographyComponent from '@/features/contents/filmography/filmography.component';
import LoveComponent from '@/features/contents/love/love.component';
import PeripheralsComponent from '@/features/contents/peripherals/peripherals.component';
import ReviewsComponent from '@/features/contents/reviews/reviews.component';
import ShortStoriesComponent from '@/features/contents/short-stories/short-stories.component';
import WorkComponent from '@/features/contents/work/work.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$widgetId/')({
  component: MainContent,
});

function MainContent() {
  const { widgetId } = Route.useParams();

  switch (widgetId) {
    case 'blog':
      return <BlogComponent />;
    case 'short-stories':
      return <ShortStoriesComponent />;
    case 'work':
      return <WorkComponent />;
    case 'peripherals':
      return <PeripheralsComponent />;
    case 'filmography':
      return <FilmographyComponent />;
    case 'reviews':
      return <ReviewsComponent />;
    case 'all-time-fav':
      return <AllTimeFavComponent />;
    case 'love':
      return <LoveComponent />;
    default:
      return <p>Not found</p>;
  }
}
