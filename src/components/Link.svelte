<script lang="ts">
  import type { TLink } from '../LINKS';

  export let link: TLink;
</script>

<span>
  <a href={link.url}>
    {#if link.icon}
      <img src={link.icon} alt={link.name} />
    {/if}
    {link.name}
  </a>
</span>

<style lang="scss">
  span {
    display: block;
    margin-block: 0.5rem;
  }

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    font-size: 11pt;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 1rem;
    height: 1rem;
  }
</style>
