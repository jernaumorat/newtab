<script lang="ts">
  import type { TLink } from '../LINKS';
  import Panel from './Panel.svelte';

  export let links: Omit<TLink, 'category'>[];

  const getFaviconPath = (hostname: string) =>
    `https://t3.gstatic.com/faviconV2?client=SOCIAL&fallback_opts=TYPE,SIZE,URL&url=http://${hostname}&size=128`;
</script>

<Panel className="link-panel">
  {#each links as link}
    <a href={link.url}>
      <img src={link.icon ?? getFaviconPath(new URL(link.url).hostname)} />
      <span class="link">
        {link.name}
      </span>
    </a>
  {/each}
</Panel>

<style lang="scss">
  @import '!global';

  :global(.link-panel) {
    grid-column: 3 / 5;
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: 100px;
    /* grid-auto-flow: column dense; */
    gap: 30px;
    overflow-y: auto;
    overflow-x: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    display: flex;
    gap: 6px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 100px;
    height: 100px;
    background-color: rgb(49, 49, 59);
    transition: background-color 100ms ease-in-out;
    text-align: center;
    text-decoration: none;

    img {
      width: 40px;
      height: 40px;
      margin: 10px 30px 0px 30px;
    }

    span {
      font-size: 11px;
      width: fit-content;
    }

    &:hover {
      background-color: rgb(59, 59, 69);
    }
  }
</style>
