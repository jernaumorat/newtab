import type CATEGORIES from './CATEGORIES';
import { inboxLinks } from './inbox';

import mainLinks from './mainLinks.json';
import restLinks from './links.json';

export type TLink = {
  category: keyof typeof CATEGORIES | 'main';
  name: string;
  url: string;
  icon?: string;
  group?: string;
};

// map((v) => ({ ...v, category: 'main' }));

const LINKS: Readonly<TLink>[] = [
  ...(mainLinks.map((v) => ({ ...v, category: 'main' })) as TLink[]),
  ...(restLinks as TLink[])
];

export const categoriseLinks = <K = keyof TLink>(links: TLink[], key: K) =>
  //@ts-expect-error this works, so silence ERROR
  links.reduce<Partial<Record<TLink[K], TLink[]>>>(
    (acc, link) => ({
      ...acc,
      //@ts-expect-error this works, so silence ERROR
      [link[key]]: [...(acc[link[key]] ?? []), link]
    }),
    {}
  );

const categoriedLinks = categoriseLinks(LINKS, 'category');
export default categoriedLinks;
