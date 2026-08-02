# Adding a product to lionelitewellness.com

Written 2026-08-02 after adding ARA-290 exposed that the obvious-looking place to
add a product (`public/data/*.json`) is **not** what the site renders.

## Where product data actually lives

The storefront is a Next.js app in this repo. Product data is **hardcoded in two
TypeScript arrays**, and a product must be added to **both** or it will be
half-listed:

| File | Structure | Controls |
|---|---|---|
| `app/page.tsx` | `const products = [...]` | The catalog grid on the homepage |
| `app/products/[slug]/page.tsx` | `const base = {...}` | The product detail page at `/products/<slug>` |

Add to the grid only → the card links to a **404**.
Add to the detail map only → the page exists but **nothing links to it**.

### Slug convention
`<name>-<strength>`, lowercase, hyphenated — e.g. `kpv-10mg`, `ss31-10mg`,
`ara-290-10mg`. The slug in `page.tsx` must exactly match the key in `base`.

### Multi-strength products
Products sold in several strengths get one entry per strength plus a shared
`variants` array (see the three `retatrutide-*` entries). Each variant's `slug`
must exist as its own key in `base`.

## ⚠️ `public/data/*.json` is NOT read by the site

`grep -rn "current-inventory\|product-copy\|/data/" app/ lib/` returns nothing.
These files are inert with respect to rendering:

- `public/data/current-inventory.json` — unit counts and stock status. Written by
  the `order-inventory-sync` workflow, but **the site does not read it**, so
  editing it does not change what customers see. It also declares the Google
  Drive Inventory sheet the source of truth.
- `public/data/product-copy-*.json` — long-form RUO copy for three products only
  (retatrutide, tirzepatide, ara-290). **Not rendered anywhere.**

They are useful as an inventory/compliance record, but **adding a product there
does nothing on its own.** This is the trap that made the ARA-290 addition look
complete when it was not.

## Images

Product images are served from a **separate deployment**, not this repo:

```ts
const OLD = "https://peptide-science-animations-store-nqfz77bs7.vercel.app";
// rendered as: <img src={`${OLD}${p.image}`} />
```

If a product has no `image`, the detail page falls back to an `LE` placeholder
tile and the build still succeeds — so a missing image is silent. Omit `image`
rather than pointing at a file that does not exist on that deployment.

## Checklist

1. Add the entry to `products` in `app/page.tsx`.
2. Add the matching key to `base` in `app/products/[slug]/page.tsx`
   (`about`, `overview`, `benefits` are optional — `hydrate()` generates generic
   RUO-safe text when omitted, but bespoke copy is better).
3. If you have a real product photo, upload it to the asset deployment first,
   then set `image`. Otherwise omit `image`.
4. Add stock to the [Google Drive Inventory sheet](https://docs.google.com/spreadsheets/d/1kTq_vI7wZ_lkXByW5qOyoVGLMrAWz97nOzGpuPuReTE)
   (declared source of truth) and mirror it into `current-inventory.json`.
5. `npx next build` — must pass.
6. Open a PR. Merging to `main` fires `render-deploy.yml`, which POSTs the Render
   deploy hook. The workflow hard-fails if `RENDER_DEPLOY_HOOK_URL` is missing.
7. **Load the live product page.** A green deploy only proves the hook fired.

## Compliance (non-negotiable)

Lion Elite Wellness is Research Use Only. Copy must describe **research areas**,
never human use. No dosing, administration, reconstitution guidance, or
treatment/benefit claims. The detail page renders a fixed Research Use Only
notice, but that does not license non-compliant copy above it.

## Known drift risks

1. **Price is duplicated** in `app/page.tsx` and `app/products/[slug]/page.tsx`.
   Nothing keeps them in sync — they can silently disagree, showing one price on
   the card and another on the detail page. Worth collapsing into one shared
   module.
2. **Stock is not enforced.** `current-inventory.json` tracks units, but the site
   never reads it, so a product with `units: 0` still displays with an active
   "Add to Cart" button.
3. **Three sources of truth** for the catalog: these arrays (what renders), the
   inventory JSON, and the Google Sheet. Only the arrays affect customers.
