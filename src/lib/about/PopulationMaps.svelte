<script lang="ts">
  import SegmentedControl from "$lib/components/SegmentedControl.svelte";
  import { base } from "$lib/utils/paths";
  import data from "./populationMaps.json";

  const names = data.countries.map((c) => c.name);
  const listed = `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;

  let iso3 = $state<string | null>(data.countries[0].iso3);
  let key = $state<string | null>(data.metrics[0].key);
  const country = $derived(data.countries.find((c) => c.iso3 === iso3) ?? data.countries[0]);
  const metric = $derived(data.metrics.find((m) => m.key === key) ?? data.metrics[0]);
</script>

<figure class="popmaps">
  <div class="controls">
    <span class="label">Country</span>
    <SegmentedControl
      label="Country"
      bind:value={iso3}
      options={data.countries.map((c) => ({ value: c.iso3, label: c.name }))}
    />
    <span class="label">Map</span>
    <SegmentedControl
      label="Map"
      bind:value={key}
      options={data.metrics.map((m) => ({ value: m.key, label: m.title }))}
    />
  </div>
  <img
    src={`${base}about/population-${country.iso3.toLowerCase()}-${metric.key}.webp`}
    alt={`${metric.title} in ${country.name} by administrative level 2 unit, from COD-PS ${country.year} joined to COD-AB by P-code`}
    width={country.width}
    height={country.height}
  />
  <ul class="legend" aria-label={`Legend, ${metric.unit}`}>
    {#each metric.labels as l, k (l)}
      <li><span class="swatch" style:background={metric.ramp[k]}></span>{l}</li>
    {/each}
    <li class="unit">{metric.unit}</li>
  </ul>
  <figcaption>
    <p>
      COD-PS population estimates joined to COD-AB administrative level 2 boundaries by P-code, for {listed},
      where every unit has a figure broken down by age and sex. Most COD-PS figures are projections
      from the last census, and in many countries they are published only at a higher level or use
      P-codes from an older version of the boundaries. Sources: <a href="https://data.humdata.org/dataset/cod-ab-global">COD-AB</a>,
      <a href="https://data.humdata.org/dataset/cod-ps-global">COD-PS</a>.
    </p>
    <p class="disclaimer">
      The boundaries and names shown and the designations used on this map do not imply official
      endorsement or acceptance by the United Nations.
    </p>
  </figcaption>
</figure>

<style>
  .popmaps {
    margin: 2rem 0;
  }
  .controls {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.6rem 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 30rem) {
    .controls {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.4rem;
    }
    .controls :global(.segmented:last-child) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .controls :global(.segmented:last-child .btn:nth-child(odd)) {
      border-left: none;
    }
    .controls :global(.segmented:last-child .btn:nth-child(n + 3)) {
      border-top: 1px solid var(--cd-grey--400);
    }
  }
  .label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--brand-grey--text);
  }
  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 36rem;
    margin: 0 auto;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1rem;
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--cd-grey--800);
  }
  .legend li {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0;
  }
  .swatch {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.08);
  }
  .legend .unit {
    color: var(--brand-grey--text);
  }
  figcaption {
    margin-top: 1rem;
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--cd-grey--800);
  }
  figcaption p {
    margin: 0 0 0.5rem;
  }
  .disclaimer {
    font-style: italic;
    color: #a7a9ac;
  }
</style>
