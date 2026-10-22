<script lang="ts">
  import Badge from "./Badge.svelte";

  interface Props {
    rank: number;
    planType: string | null;
    planYear: number | null;
  }

  let { rank, planType, planYear }: Props = $props();

  const COLORS: Record<number, { bg: string; fg: string }> = {
    0: { bg: "var(--cd-red--aaa)", fg: "var(--cd-white)" },
    1: { bg: "var(--cd-orange--aa)", fg: "var(--cd-white)" },
    2: { bg: "var(--cd-orange)", fg: "var(--cd-grey--900)" },
    3: { bg: "var(--cd-yellow)", fg: "var(--cd-grey--900)" },
    4: { bg: "var(--cd-grey--400)", fg: "var(--cd-grey--900)" },
    5: { bg: "var(--cd-grey--300)", fg: "var(--brand-grey--text)" },
  };

  // Exactly 2 letters, to match OfficeTypeBadge's 2-letter badges — first
  // 2 chars, except HNRP/HRP which'd otherwise collide on "HR".
  const LETTERS: Record<string, string> = {
    HNRP: "HN",
    HRP: "HR",
    FA: "FA",
    REG: "RE",
    Other: "OT",
  };

  let color = $derived(COLORS[rank] ?? COLORS[5]);
  let letters = $derived(
    planType ? (LETTERS[planType] ?? planType.slice(0, 2).toUpperCase()) : null,
  );
  let label = $derived(planType ? `${planType}${planYear ? ` ${planYear}` : ""}` : "No plan");
</script>

<Badge text={letters} bg={color.bg} fg={color.fg} tooltip={label} />
