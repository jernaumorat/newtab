<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import { addInboxLink } from '../inbox';
  import type { TLink } from '../LINKS';
  import Panel from './Panel.svelte';

  let showModal = false;
  let name: string = '';
  let url: string = '';

  const normaliseURL = (url: string) => {
    if (/^[a-z0-9]+:\/\//.test(url)) {
      return new URL(url).toString();
    }

    return new URL(`https://${url}`).toString();
  };

  const handleClick = (save: boolean) => {
    showModal = false;
    const link = { name, url: normaliseURL(url), category: 'inbox' } as TLink;
    name = url = '';

    if (save) {
      addInboxLink(link);
    }
  };
</script>

<button class="add-button" title="Add new link" on:click={() => (showModal = true)}><Fa icon={faPlus} /></button>

{#if showModal}
  <div
    class="backdrop"
    on:click={() => {
      showModal = false;
    }}
  />
  <Panel className="modal">
    <h2>Add Bookmark</h2>
    <input bind:value={name} placeholder="Title" />
    <input bind:value={url} placeholder="URL" />
    <span>
      <button class="modal__button" on:click={() => handleClick(false)}>Cancel</button>
      <button class="modal__button" on:click={() => handleClick(true)}>Add Bookmark</button>
    </span>
  </Panel>
{/if}

<style lang="scss">
  @import '!global';

  .add-button {
    position: absolute;
    bottom: 10px;
    right: 50px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 25px;
    height: 25px;

    font-size: 25px;

    cursor: pointer;
  }
  :global(button > svg) {
    color: darken(blue, 10%) !important;
    transition: color 50ms ease-in-out;

    &:hover {
      color: white;
    }
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    background-color: black;
    opacity: 0.7;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal__button {
    color: black;
  }

  input {
    padding: 0.2rem;
    width: 100%;
    color: black;
  }

  $modal-size: 300px;
  :global(.modal) {
    position: fixed;
    top: calc(50vh - ($modal-size / 2));
    left: calc(50vw - ($modal-size / 2));
    width: $modal-size !important;
    height: $modal-size !important;
    z-index: 11;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
