---
title: Change management
summary: How each kind of boundary or name change affects P-codes, and when a change produces a new dataset version.
order: 3
---

| Change type | Example | P-Codes Retained | New P-Codes | Notes |
| :---- | :---- | :---- | :---- | :---- |
| **Geometry Unchanged** | Minor geometry correction within a threshold | ✓ |  | Geometry updated; threshold is determined by human judgement and recorded in the changelog |
| **Name / Metadata correction** | Typo in a recorded unit name | ✓ |  | Corrected in-place; version number unchanged |
| **Renamed** | Government renames a district or changes its official code | ✓ |  | Name or national code updated |
| **Geometry Modified** | Significant boundary shift affecting unit extent |  | ✓ |  |
| **Geometry Relocated** | Unit has moved beyond the modification threshold but is conceptually the same entity |  | ✓ | Changelog records link to predecessor |
| **Geometry Merge** | Two districts combined into one |  | ✓ | All original P-codes dropped |
| **Geometry Split** | One district divided into two |  | ✓ | One new P-code per resulting unit |
| **Geometry Complex** | Multiple simultaneous changes (e.g. partial split with reallocation to existing units) |  | ✓ | All affected P-codes dropped |
| **Geometry Created** | New administrative unit or level introduced |  | ✓ |  |
| **Geometry Removed** | Administrative unit abolished |  |  | Not reissued |

**P-codes are never reused.** Each dataset version is a complete snapshot; codes not carried forward do not appear in the new version. Unchanged and Renamed units retain their P-code across versions; all other change types result in the old P-code being dropped, a new one being assigned, or both. A changelog is published alongside every new dataset version.

Name corrections (fixing typos in recorded unit names) are applied directly to the current dataset, overwriting the latest major version immediately. The version number does not change and the *last\_updated* is recorded as the current date. All corrections are logged in the changelog and documented in publications.

This means a government that renumbers its districts, or a partner agency that revises its IDs, it does not trigger a re-keying of COD-AB. The P-code identifies the administrative unit; *adm[N]\_srcid* records what the originating source calls it. New dataset versions are primarily triggered whenever there are geometry changes (this should be done with sensitivity to humanitarian programming cycles). This means that new intentional geometry changes result in new versions released, which will typically have new P-Codes but may not always if these are minor refinements such as coastline improvements.

A change in the number of admin levels (for example, consolidating from three levels to two) is a structural change to the dataset and always constitutes a new dataset version, regardless of what happens to individual units.
