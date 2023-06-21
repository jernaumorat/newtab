import { writable } from 'svelte/store';
import type { TLink } from './LINKS';

import { browser } from '$app/environment';

export const inboxLinks = writable((browser && JSON.parse(localStorage.getItem('inboxLinks') ?? '[]')) || []);
inboxLinks.subscribe((val) => {
  if (browser) return localStorage.setItem('inboxLinks', JSON.stringify(val));
});

export const addInboxLink = (link: TLink) => {
  inboxLinks.update((oldLinks) => [...oldLinks, link]);
};
