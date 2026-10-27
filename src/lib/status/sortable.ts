// A header click sorts every table[data-sortable] on the page by that column, blanks last.
// Clicks cycle ascending, descending, then the order the page was built in.
const EMPTY = String.fromCharCode(0x2014);

function cellValue(row: HTMLTableRowElement, col: number): string {
  const cell = row.cells[col];
  const value = (cell?.dataset.sort ?? cell?.textContent ?? "").trim();
  return value === EMPTY ? "" : value;
}

function compare(a: string, b: string): number {
  const na = Number(a);
  const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b);
}

export function initSortable() {
  const tables = [...document.querySelectorAll<HTMLTableElement>("table[data-sortable]")];
  const headers = (table: HTMLTableElement) => [...(table.tHead?.rows[0]?.cells ?? [])];
  for (const table of tables) {
    for (const body of table.tBodies)
      [...body.rows].forEach((row, i) => (row.dataset.index = String(i)));
  }

  const sort = (col: number) => {
    const current = headers(tables[0])[col]?.getAttribute("aria-sort");
    const reset = current === "descending";
    const dir = reset ? "none" : current === "ascending" ? "descending" : "ascending";
    for (const table of tables) {
      for (const th of headers(table))
        th.setAttribute("aria-sort", th.cellIndex === col ? dir : "none");
      for (const body of table.tBodies) {
        const rows = [...body.rows].sort((a, b) => {
          if (reset) return Number(a.dataset.index) - Number(b.dataset.index);
          const va = cellValue(a, col);
          const vb = cellValue(b, col);
          if (!va || !vb) return va ? -1 : vb ? 1 : 0;
          return dir === "ascending" ? compare(va, vb) : compare(vb, va);
        });
        body.append(...rows);
      }
    }
  };

  for (const table of tables)
    for (const th of headers(table)) {
      th.tabIndex = 0;
      th.setAttribute("aria-sort", "none");
      th.addEventListener("click", () => sort(th.cellIndex));
      th.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        sort(th.cellIndex);
      });
    }
}
