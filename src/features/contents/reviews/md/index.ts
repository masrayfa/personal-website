import { ContentsCollectionsType } from "@/lib/types/post-collections-type";
import F1Movie from "./movies/f1-movie.mdx";
import NoCountryForOldMen from "./movies/no-country-for-old-men.mdx";

const ReviewsMDsCollections: ContentsCollectionsType[] = [
  {
    id: 1,
    component: F1Movie,
    metadata: {
      title: "F1 Movie",
      image_url: "/w-harry.jpg",
      reviewType: ["movie"],
      desc: "my most comfort movie 2025",
      date: "2025-10-20",
      likes: 30,
      genre: ["drama"],
    },
  },
  {
    id: 2,
    component: NoCountryForOldMen,
    metadata: {
      title: "No Country For Old Men",
      image_url: "/w-edna.jpg",
      reviewType: ["movie"],
      desc: "the best action thriller movie",
      date: "2025-10-21",
      likes: 18,
      genre: ["action", "thriller"],
    },
  },
];

export default ReviewsMDsCollections;
