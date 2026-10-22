<script lang="ts">
  import SegmentedControl from "$lib/components/SegmentedControl.svelte";

  // COD-AB names on the left, OpenStreetMap (geoBoundaries) names on the right.
  const rows = [
    { a: "Amoron I Mania", b: "Amoron’i Mania", code: "MDG.022" },
    { a: "Haute Matsiatra", b: "Matsiatra Ambony", code: "MDG.021" },
  ];

  let by = $state<"name" | "pcode" | null>("name");
  const ok = $derived(by === "pcode");
</script>

<figure class="joins">
  <div class="control">
    <span class="label">Join by</span>
    <SegmentedControl
      label="Join by"
      bind:value={by}
      options={[
        { value: "name", label: "Name" },
        { value: "pcode", label: "P-code" },
      ]}
    />
  </div>
  <div class="join" class:ok>
    <span class="src">Assessment</span>
    <span></span>
    <span class="src">Partner activities</span>
    {#each rows as r (r.code)}
      <div class="rec"><span class="name">{r.a}</span><code>{r.code}</code></div>
      <span class="mark" aria-hidden="true">{ok ? "✓" : "✕"}</span>
      <div class="rec"><span class="name">{r.b}</span><code>{r.code}</code></div>
    {/each}
  </div>
  <figcaption aria-live="polite">
    {ok ? "Joined by P-code: both rows match." : "Joined by name: no rows match, because the names are written differently."}
  </figcaption>
</figure>

<style>
  .joins {
    margin: 2rem 0;
  }
  .control {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .label,
  .src {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--brand-grey--text);
    white-space: nowrap;
  }
  .control :global(.segmented) {
    flex: 1;
  }
  .join {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 3rem minmax(0, 1fr);
    gap: 0.5rem 1rem;
    align-items: center;
  }
  .rec {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.25rem 0.75rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--cd-grey--500);
    border-radius: var(--brand-radius--sm);
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;
  }
  .rec code {
    font-family: inherit;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    color: var(--cd-grey--500);
    transition: color 0.2s ease;
  }
  .name {
    font-weight: 700;
    transition: color 0.2s ease;
  }
  .ok .name {
    font-weight: 400;
    color: var(--brand-grey--text);
  }
  .ok .rec {
    border-color: var(--brand-success);
  }
  .ok .rec code {
    color: var(--brand-primary--text);
  }
  .mark {
    font-size: 1.3rem;
    text-align: center;
    color: var(--brand-error);
  }
  .ok .mark {
    color: var(--brand-success);
  }
  figcaption {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--brand-grey--text);
  }
  @media (prefers-reduced-motion: reduce) {
    .rec,
    .rec code,
    .name {
      transition: none;
    }
  }
</style>
