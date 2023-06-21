<script lang="ts">
  import { onMount } from 'svelte';
  import type { TCategory } from '../CATEGORIES';
  import { categoriseLinks, type TLink } from '../LINKS';
  import Link from './Link.svelte';
  import Panel from './Panel.svelte';

  export let category: TCategory;
  export let links: TLink[] | undefined = undefined;
  export let fetchUrl: string = '';

  const groupLinks = (links: TLink[]) =>
    links?.some((v) => 'group' in v) ? categoriseLinks(links ?? [], 'group') : undefined;

  let groupedLinks: ReturnType<typeof groupLinks> = undefined;

  onMount(async () => {
    links = links ?? Object.values(await (await fetch(fetchUrl)).json());
    groupedLinks = groupLinks(links);
  });
</script>

<Panel>
  <span class="title">
    <h2>{category.label}</h2>
    <img src={category.image} alt={category.label} />
  </span>

  {#if links === undefined}
    <span>loading...</span>
  {:else}
    <div class="links">
      {#if groupedLinks}
        {#each Object.entries(groupedLinks) as [group, links]}
          <h5>{group}</h5>
          {#each links as link}
            <Link {link} />
          {/each}
        {/each}
      {:else}
        {#each links as link}
          <Link {link} />
        {/each}
      {/if}
    </div>
  {/if}
</Panel>

<style lang="scss">
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
      font-size: 14pt;
    }
    img {
      min-height: 32px;
      max-height: 32px;
      height: 32px;
    }
  }

  .links {
    overflow-y: auto;
  }
</style>
