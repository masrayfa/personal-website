import AllTimeFavMDsCollections from "@/features/contents/all-time-fav/md";
import blogMDsCollections from "@/features/contents/blog/md";
import FilmographyMDsCollections from "@/features/contents/filmography/md";
import LoveMDsCollections from "@/features/contents/love/md";
import PeripheralsMDsCollections from "@/features/contents/peripherals/md";
import ReviewsMDsCollections from "@/features/contents/reviews/md";
import ShortStoriesMDsCollections from "@/features/contents/short-stories/md";
import WorkContentsCollections from "@/features/contents/work/md";

export function ContentsCollections(collectionKey: string) {
  const widgetId = collectionKey.split("_")[0] as WidgetType;
  const contentId = collectionKey.split("_")[1];

  switch (widgetId) {
    case "all-time-fav": {
      const selectedContent = AllTimeFavMDsCollections.find(
        (content) => content.id === Number(contentId),
      );

      return selectedContent?.component;
    }
    case "blog": {
      const collections = blogMDsCollections();
      const selectedContent = collections.find(
        (content) => content.id === Number(contentId),
      );

      return selectedContent?.component;
    }
    case "filmography": {
      const selectedContent = FilmographyMDsCollections.find(
        (content) => content.id === Number(contentId),
      );
      return selectedContent?.component;
    }
    case "love": {
      const selectedContent = LoveMDsCollections.find(
        (content) => content.id === Number(contentId),
      );
      return selectedContent?.component;
    }
    case "peripherals": {
      const selectedContent = PeripheralsMDsCollections.find(
        (content) => content.id === Number(contentId),
      );
      return selectedContent?.component;
    }
    case "reviews": {
      const selectedContent = ReviewsMDsCollections.find(
        (content) => content.id === Number(contentId),
      );
      return selectedContent?.component;
    }
    case "short-stories": {
      const selectedContent = ShortStoriesMDsCollections.find(
        (content) => content.id === Number(contentId),
      );
      return selectedContent?.component;
    }
    case "work": {
      const selectedContent = WorkContentsCollections.find(
        (content) => content.id === Number(contentId),
      );
      return selectedContent?.component;
    }
    default:
      return;
  }
}
