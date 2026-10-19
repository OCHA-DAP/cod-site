<script lang="ts" generics="T extends string">
  let {
    value = $bindable(),
    options,
    label,
    disabled = false,
  }: {
    value: T | null;
    options: { value: T; label: string }[];
    label: string;
    disabled?: boolean;
  } = $props();
</script>

<div class="segmented" role="radiogroup" aria-label={label}>
  {#each options as opt (opt.value)}
    <button
      type="button"
      role="radio"
      aria-checked={value === opt.value}
      class="btn"
      class:active={value === opt.value}
      {disabled}
      onclick={() => (value = opt.value)}>{opt.label}</button
    >
  {/each}
</div>

<style>
  .segmented {
    display: flex;
    border: 1px solid var(--cd-grey--500);
    border-radius: var(--brand-radius--sm);
    overflow: hidden;
    background: var(--cd-white);
  }
  .btn {
    appearance: none;
    -webkit-appearance: none;
    flex: 1 1 0;
    padding: 0.3rem 0.6rem;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 500;
    border: none;
    background: var(--cd-white);
    color: var(--cd-grey--800);
    cursor: pointer;
    border-left: 1px solid var(--cd-grey--400);
    text-align: center;
  }
  .btn:first-child {
    border-left: none;
  }
  .btn:hover:not(:disabled) {
    background: var(--cd-grey--300);
    color: var(--cd-grey--800);
  }
  .btn.active {
    background: var(--brand-primary--text);
    color: var(--cd-white);
  }
  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>
