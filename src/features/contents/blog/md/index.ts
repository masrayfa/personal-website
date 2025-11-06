import Why from "./why-people-misunderstood-us.mdx";
import Luck from "./luck-came-when-im-ready.mdx";
import PiedPiper from "./pied-piper-change-my-life.mdx";
import { ContentsCollectionsType } from "@/lib/types/post-collections-type";

export const BlogMDsCollections: ContentsCollectionsType[] = [
  {
    id: 1,
    component: Why,
    metadata: {
      title: "Why People",
      desc: "unravel why people misunderstood us",
      date: "2025-10-20",
      likes: 0,
      genre: ["mundane"],
    },
  },
  {
    id: 2,
    component: Luck,
    metadata: {
      title: "Luck Came When I'm Ready",
      desc: "Luck is real",
      date: "2025-10-21",
      likes: 0,
      genre: ["mundane"],
    },
  },
  {
    id: 3,
    component: PiedPiper,
    metadata: {
      title: "This Tv Show Change My Life",
      desc: "Shout out to Jimmy O Yang and Richard Hendricks",
      date: "2025-11-21",
      likes: 0,
      genre: ["tech"],
    },
  },
];
