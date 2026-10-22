import { getCollection, type CollectionEntry } from "astro:content";
import { standardsBase } from "$lib/utils/paths";

type Entry = CollectionEntry<"standards">;

export interface StandardsPage {
  entry: Entry;
  slug: string;
  href: string;
}

export interface StandardsDoc {
  slug: string;
  href: string;
  index: Entry;
  /** The document's own index first, then its pages by `order`. */
  pages: StandardsPage[];
}

const page = (entry: Entry): StandardsPage => {
  const slug = entry.id.replace(/\/index$/, "");
  return { entry, slug, href: `${standardsBase}${slug}/` };
};

export async function loadStandards(): Promise<StandardsDoc[]> {
  const byDoc = new Map<string, Entry[]>();
  for (const entry of await getCollection("standards")) {
    const doc = entry.id.split("/")[0];
    byDoc.set(doc, [...(byDoc.get(doc) ?? []), entry]);
  }
  const docs = [...byDoc].map(([slug, entries]) => {
    const isIndex = (e: Entry) => e.id === slug || e.id === `${slug}/index`;
    const index = entries.find(isIndex);
    if (!index) throw new Error(`standards/${slug} has no index page`);
    const rest = entries.filter((e) => !isIndex(e)).sort((a, b) => a.data.order - b.data.order);
    return { slug, href: `${standardsBase}${slug}/`, index, pages: [index, ...rest].map(page) };
  });
  return docs.sort((a, b) => a.index.data.order - b.index.data.order);
}
