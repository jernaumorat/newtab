<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faCopy, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
  import { inboxLinks } from '../inbox';
  import type { TLink } from '../LINKS';

  let icon = faCopy;
  let links: TLink[] = [];

  inboxLinks.subscribe((newLinks) => (links = newLinks));

  const handleCopy = () => {
    //@ts-ignore
    navigator.clipboard.writeText(
      ',' +
        JSON.stringify(
          links.map((v) => ({
            name: v.name,
            url: v.url,
            category: ''
          }))
        ).slice(1, -1)
    );
    icon = faCheck;
    setTimeout(() => (icon = faCopy), 1000);
  };

  const handleClear = () => {
    inboxLinks.set([]);
  };
</script>

<button class="copy" title="Copy links as JSON" on:click={handleCopy}><Fa {icon} /></button>
<button class="clear" title="Clear all inbox links" on:click={handleClear}><Fa icon={faX} /></button>

<style lang="scss">
  .clear {
    bottom: 50px;
    right: 10px;
  }

  .copy {
    bottom: 10px;
    right: 10px;
  }

  button {
    position: absolute;

    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 25px;
    height: 25px;

    font-size: 20px;

    cursor: pointer;
  }
  :global(button > svg) {
    color: darken(blue, 10%) !important;
    transition: color 50ms ease-in-out;

    &:hover {
      color: white;
    }
  }
</style>
