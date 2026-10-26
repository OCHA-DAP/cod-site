import { getCollection, render } from "astro:content";
import { aboutBase } from "$lib/utils/paths";

export async function loadAbout() {
  const entries = (await getCollection("about")).sort((a, b) => a.data.order - b.data.order);
  return Promise.all(
    entries.map(async (entry) => {
      const { Content, headings } = await render(entry);
      return {
        entry,
        href: `${aboutBase}${entry.id}/`,
        Content,
        headings: headings.filter((h) => h.depth === 2),
      };
    }),
  );
}
