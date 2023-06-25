<script lang="ts">
  import LinkBox from '../components/LinkBox.svelte';
  import LinkPanel from '../components/LinkPanel.svelte';
  import LINKS, { type TLink } from '../LINKS';
  import CATEGORIES from '../CATEGORIES';
  import AddLink from '../components/AddLink.svelte';
  import { inboxLinks } from '../inbox';
  import CopyLinks from '../components/CopyLinks.svelte';

  let inLinks: TLink[] = [];

  inboxLinks.subscribe((newLinks) => (inLinks = newLinks));
</script>

<div class="container">
  <LinkPanel links={LINKS.main ?? []} />

  <LinkBox
    category={{
      label: 'Pull Requests',
      image: '/github.png',
      labelLink: 'https://github.com/pulls?q=is%3Aopen+is%3Apr+org%3Acloud-wave+-author%3Aapp%2Fdependabot'
    }}
    fetchUrl="/api/prs"
  />
  <LinkBox
    category={{
      label: 'Tickets',
      image: '/atlassian.svg',
      labelLink: 'https://cloud-wave.atlassian.net/jira/software/c/projects/NEON/boards/27'
    }}
    fetchUrl="/api/issues"
  />

  <LinkBox category={CATEGORIES['aws']} links={LINKS.aws ?? []} />
  <LinkBox category={CATEGORIES['github']} links={LINKS.github ?? []} />
  <LinkBox category={CATEGORIES['neon']} links={LINKS.neon ?? []} />
  <LinkBox category={CATEGORIES['inbox']} links={inLinks ?? []} />

  <AddLink />
  <CopyLinks />
</div>

<style lang="scss">
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    color: antiquewhite;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    z-index: 1;
  }

  :global(body, html) {
    overscroll-behavior-y: none;
  }

  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 40px;
    padding: 40px;
    background-color: rgb(43, 42, 51);
    overflow: none;
    overscroll-behavior-y: none;
  }
</style>
