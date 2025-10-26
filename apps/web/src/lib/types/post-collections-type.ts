import { MDXProps } from 'mdx/types';
import { JSX } from 'react';

type ContentCollectionsMetadata = {
  title: string;
  desc: string;
  date: string;
  likes: number;
};

export type ContentsCollectionsType = {
  id: number;
  component: (props: MDXProps) => JSX.Element;
  metadata: ContentCollectionsMetadata;
};
