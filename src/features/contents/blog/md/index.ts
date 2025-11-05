import Why from "./why-people-misunderstood-us.mdx";
import Luck from "./luck-came-when-im-ready.mdx";
import { ContentsCollectionsType } from "@/lib/types/post-collections-type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { engagementsQueryOptions } from "@/queries/engagements";

export const BlogMDsCollectionsData: ContentsCollectionsType[] = [
  {
    id: 1,
    component: Why,
    metadata: {
      title: "Why People",
      desc: "unravel why people misunderstood us",
      date: "2025-10-20",
      likes: 30,
    },
  },
  {
    id: 2,
    component: Luck,
    metadata: {
      title: "Why People",
      desc: "unravel why people being shyt to us",
      date: "2025-10-21",
      likes: 18,
    },
  },
];

function blogMDsCollections(): ContentsCollectionsType[] {
  return BlogMDsCollectionsData;
}

export default blogMDsCollections;
