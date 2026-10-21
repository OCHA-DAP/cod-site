import { PMTiles, Protocol, findTile, zxyToTileId } from "pmtiles";

let protocol: Protocol | undefined;

// One shared pmtiles:// protocol per page, so archives added by any map stay readable by all.
export function pmtilesProtocol(maplibregl: typeof import("maplibre-gl")): Protocol {
  if (!protocol) {
    protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
  }
  return protocol;
}

// Warms the archive's header, root and leaf directories for zoom z, so the first tiles cost one round trip.
export async function prefetchDirectories(archive: PMTiles, z: number): Promise<void> {
  const header = await archive.getHeader();
  const zoom = Math.min(Math.max(Math.floor(z), header.minZoom), header.maxZoom);
  const { cache, source } = archive;
  const root = await cache.getDirectory(
    source,
    header.rootDirectoryOffset,
    header.rootDirectoryLength,
    header,
  );
  const leaves = new Map<number, number>();
  for (let x = 0; x < 2 ** zoom; x++)
    for (let y = 0; y < 2 ** zoom; y++) {
      const entry = findTile(root, zxyToTileId(zoom, x, y));
      if (entry?.runLength === 0) leaves.set(entry.offset, entry.length);
    }
  await Promise.all(
    [...leaves].map(([offset, length]) =>
      cache.getDirectory(source, header.leafDirectoryOffset + offset, length, header),
    ),
  );
}
