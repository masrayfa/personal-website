import { MDXProps } from "mdx/types";
import { JSX } from "react";

type ContentCollectionsMetadata = {
  title: string;
  desc: string;
  date: string;
  image_url?: string;
  likes?: number;
  genre?: string[];
  mood?: string[];
  // Filmography specific fields
  status?: "dream" | "captured";
  region?: string[];
  subject?: string[];
  visualStyle?: string[];
  technical?: string[];
  year?: number;
};

export type ContentsCollectionsType = {
  id: number;
  component: (props: MDXProps) => JSX.Element;
  metadata: ContentCollectionsMetadata;
};
