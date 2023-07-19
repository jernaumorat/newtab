<script lang="ts">
  export let className: string | undefined = undefined;
</script>

<div class={className}><slot /></div>

<style lang="scss">
  @import '!global';

  div {
    width: 100%;
    height: 100%;
    min-height: 0;
    background-color: $background__panel;
    padding: 30px;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
