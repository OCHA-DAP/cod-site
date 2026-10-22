<script lang="ts">
  let { dir = "forward" }: { dir?: "forward" | "back" } = $props();
</script>

<svg class="arrow {dir}" viewBox="0 0 16 16" aria-hidden="true">
  <path
    d={dir === "back" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style>
  .arrow {
    flex: none;
    width: 0.95em;
    height: 0.95em;
    transition: transform var(--dur-leave) var(--ease-out);
  }
  /* Nudges toward where the link goes when its parent link is hovered or focused. */
  @media (hover: hover) and (pointer: fine) {
    :global(a:hover) > .forward {
      transform: translateX(3px);
    }
    :global(a:hover) > .back {
      transform: translateX(-3px);
    }
  }
  :global(a:focus-visible) > .forward {
    transform: translateX(3px);
  }
  :global(a:focus-visible) > .back {
    transform: translateX(-3px);
  }
</style>
