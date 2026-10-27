# Request: Azure hosting for the COD website

This request is for an Azure Static Web App to host the site at
`cod.unocha.org`, and a storage account that serves public geodata to it, both
in an OCHA Azure subscription.

## What the app is

The site covers Common Operational Datasets (CODs). It has guidance, standards,
a status dashboard and tools for cleaning and checking the data. Everything
runs in the user's browser: there is no server, database, user account or
personal data, and files that users load into the tools stay on their machine. Maps and examples read public geodata from
object storage.

## 1. Static Web App

| Item          | Request                                                                                                                  | Why                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Plan          | Standard                                                                                                                 | Comes with an SLA. The site (about 100 MB) fits well within the 500 MB limit.        |
| Custom domain | `cod.unocha.org`, which currently redirects to the COD Global Information Dashboard page on Confluence, pointed to the app | A stable OCHA address                                                                |
| Deployment    | The app's deployment token, stored as a GitHub secret                                                                    | The site publishes from GitHub automatically, so nobody needs an Azure role to do it |
| Previews      | Preview environments (included in Standard)                                                                              | Changes can be checked on a preview link before they go live                         |

## 2. Storage account for public geodata

| Item         | Request                                                                                                                                                                                           | Why                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Account      | A dedicated account in West Europe, Hot tier, holding only public geodata (planned at 50 GB to allow for growth)                                                                                  | Public read access can't expose anything else                             |
| Public read  | Anonymous read on one container at blob level, so files open by URL but can't be listed. Needs "Allow blob anonymous access" on the account, plus a policy exemption if a tenant policy blocks it | Visitors' browsers load the files directly, without signing in            |
| Account keys | "Allow storage account key access" off                                                                                                                                                            | Every upload is tied to a named Entra identity                            |
| CORS         | Allow GET and HEAD from `https://cod.unocha.org` and the app's default `azurestaticapps.net` address, including the `Range` header                                                                | Browsers read only the parts of large files they need                     |
| Upload       | Storage Blob Data Contributor on that container only, for two named maintainers, PIM-eligible if the tenant uses PIM                                                                              | Maintainers can add, replace and remove geodata but can't change settings |

The request does not include Owner or Contributor on the account or resource
group, account keys, or the right to give roles to others.

## How data gets updated

Maintainers upload new or changed geodata from their own machines with Azure's
command-line tools, signed in with their own Azure accounts, so no credentials
are stored anywhere.

A scheduled Azure Container Apps Job could later run the data pipeline and
upload its output automatically. That would need a Container Apps
environment, a container registry and Log Analytics for run logs. The job's
managed identity would get the same upload role on the same container, so it
would need no keys either. A separate request would cover it once the pipeline
is ready.

## Cost

West Europe list prices from the Azure Retail Prices API, October 2026:

| Item                         | Price                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| Static Web App, Standard     | $9 a month, with 100 GB of bandwidth a month per subscription included, then $0.20 per GB |
| Storage                      | About $1 a month for 50 GB, at $0.0196 per GB                                             |
| Data transfer out of storage | First 100 GB a month per subscription free, then $0.087 per GB                            |

The fixed cost is about $10 a month, and bandwidth and data transfer add to it
as traffic grows. The site has no visitor analytics, but Azure's free built-in
metrics for the app and the storage account (requests and data sent) will show
real traffic after a month or two, with no change to the site. Until then, the
average and busy scenarios assume about 15 MB of site bandwidth and 10 MB of
geodata per visit, rounded up:

| Scenario   | Traffic in a month                                                      | Monthly    | Yearly                             |
| ---------- | ----------------------------------------------------------------------- | ---------- | ---------------------------------- |
| Average    | About 1,000 visits                                                      | $10        | $120                               |
| Busy       | About 10,000 visits (150 GB site, 100 GB geodata)                       | $20 to $30 | $240 to $360                       |
| Worst case | A misconfigured bot downloading all 50 GB of geodata every day (1.5 TB) | About $140 | About $1,700 if it lasted all year |

The ranges depend on whether other apps in the subscription already use the
free 100 GB allowances. An Azure budget alert at $30 a month would catch
unusual traffic early. If scraping becomes a problem, Azure Front Door Standard
with a per-IP rate-limit rule can sit in front of the storage for about $41 a
month more. It caps scrapers, but its per-GB price is about the same, so it
doesn't make heavy legitimate traffic cheaper.
