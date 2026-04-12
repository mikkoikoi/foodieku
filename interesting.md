# Implementation Prompt: Foodie Choice — UMKM F&B Discovery

---

## Context & Mission

**Project Name:** Foodie Choice
**Type:** Static React + Tailwind Frontend — backend-ready architecture
**Domain:** F&B UMKM marketplace for Purwokerto, Banyumas, Central Java
**Goal:** Help local residents discover F&B sellers — from established restaurants down to the smallest warung — through a warm, trustworthy, artisan-style web experience.

> Phase 1 is static. But every line of code must assume Phase 2 (backend integration) is coming.

---

## Design Tone

> **Artisan Shopfront.** Not corporate minimalist. Not busy marketplace.
> Warm · Trustworthy · Slightly Elevated.

Target user: local residents, likely older demographic, scanning on mobile. Generous spacing. Readable text. Zero visual noise.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 | Functional components + hooks only. No class components. |
| Styling | Tailwind CSS v3 | Custom color tokens in `tailwind.config.js`. No inline styles. |
| Routing | React Router v6 | `<BrowserRouter>` with `<Routes>`. |
| State | React Context | For cart/filter state. Keep it simple for now. |
| Mock Data | Local JS/JSON files | Structured to mirror future API response shape. |
| Icons | Lucide React | Thin-stroke, consistent with design tone. |
| Fonts | Google Fonts | `Playfair Display` (headlines) + `Plus Jakarta Sans` (body). |

**Do not** use Redux, Zustand, or any external state library at this stage.

---

## 2. Color System

Define these as Tailwind custom colors in `tailwind.config.js`. Never hardcode hex values in components — always use Tailwind classes.

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      base:      '#FFFDF1',  // Parchment — main backgrounds
      container: '#FFCE99',  // Warm Sand — sections, footer, hover
      action:    '#FF9644',  // Harvest Orange — buttons, prices, active
      ink:       '#562F00',  // Espresso Brown — all text, icons, borders
    }
  }
}
```

| Token | Hex | Tailwind Class | Rule |
|---|---|---|---|
| `base` | `#FFFDF1` | `bg-base` | All page backgrounds. Never on interactive elements. |
| `container` | `#FFCE99` | `bg-container` | Sections, footer, inactive pills, card hover bg. |
| `action` | `#FF9644` | `bg-action` / `text-action` | Buttons, prices, active states only. Use sparingly. |
| `ink` | `#562F00` | `text-ink` / `border-ink` | All text, icons, borders. Replaces black entirely. |

**Contrast rules (hard constraints):**
- `text-action` on `bg-container` = **illegible. Rejected.**
- `bg-container` → only `text-ink` allowed on top.
- `bg-action` → only `text-ink` on top, resting on `bg-base` or white cards.
- Shadows: `shadow` using `#562F00` at low opacity only. No grays. No blacks.

---

## 3. Typography

```js
// tailwind.config.js
fontFamily: {
  heading: ['"Playfair Display"', 'serif'],
  body:    ['"Plus Jakarta Sans"', 'sans-serif'],
}
```

- Headlines: `font-heading font-bold` — feels like a printed coffee roaster label.
- Body: `font-body font-normal` — open, readable at small sizes. Never `font-light`.
- Minimum body size on mobile: `text-sm` (14px).

---

## 4. Project Structure

Organized for scalability — Phase 2 (backend) should only require changes inside `services/` and `hooks/`, not touching components or pages.

```
src/
├── assets/
│   └── icons/            # SVG placeholder icons (bag, cup, fork, leaf)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── ProductCard.jsx       # Core reusable card
│       ├── SellerCard.jsx
│       ├── CategoryPill.jsx
│       ├── Button.jsx            # Variants: solid, outline
│       ├── PriceTag.jsx
│       ├── RatingStars.jsx
│       ├── Badge.jsx             # "UMKM Binaan" pill
│       ├── Avatar.jsx            # Monogram circle
│       └── ImagePlaceholder.jsx  # Palette-consistent, no gray boxes
│
├── pages/
│   ├── Landing.jsx
│   ├── Products.jsx
│   ├── Detail.jsx
│   └── Seller.jsx
│
├── hooks/                        # ← Backend-swap happens HERE
│   ├── useProducts.js            # Returns products (mock now, API later)
│   ├── useSellers.js
│   └── useProductDetail.js
│
├── services/                     # ← Wire real API calls here in Phase 2
│   └── api.js                    # Currently: just re-exports mock data
│
├── data/                         # Mock data — shaped like API responses
│   ├── products.js
│   └── sellers.js
│
├── router/
│   └── index.jsx                 # All route definitions in one place
│
└── main.jsx
```

---

## 5. Backend-Ready Data Pattern

This is the key architectural decision. Mock data must be structured exactly like a future REST API would return it.

### Mock Data Shape

```js
// data/products.js
export const products = [
  {
    id: "prod-001",
    name: "Mendoan Crispy",
    price: 15000,
    category: "Makanan",
    sellerId: "seller-001",
    sellerName: "Warung Bu Siti",
    location: "Purwokerto Timur",
    rating: 4.8,
    description: "Mendoan khas Banyumas, tipis dan gurih.",
    imageIcon: "food",         // maps to SVG icon variant
    badge: "UMKM Binaan",
  },
  // ...
]

// data/sellers.js
export const sellers = [
  {
    id: "seller-001",
    name: "Warung Bu Siti",
    category: "Makanan",
    location: "Purwokerto Timur",
    bio: "Masakan rumahan khas Banyumas sejak 2010.",
    monogram: "WS",
    whatsapp: "08xxxxxxxxxx",
    productIds: ["prod-001", "prod-002", "prod-003"],
  },
  // ...
]
```

### Hook Pattern (swap-ready)

```js
// hooks/useProducts.js  ← Phase 1 (static)
import { products } from '../data/products'
export function useProducts(filters) {
  // filter logic on mock data
  return { data: products, loading: false, error: null }
}

// hooks/useProducts.js  ← Phase 2 (just replace the internals)
export function useProducts(filters) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.getProducts(filters).then(setData).finally(() => setLoading(false))
  }, [filters])
  return { data, loading, error: null }
}
```

Components never import from `data/` directly — only through hooks. This makes the backend swap a 1-file change per entity.

---

## 6. Component Specs

### Button

```jsx
// Variants
<Button variant="solid">Beli Langsung</Button>       // bg-action text-ink
<Button variant="outline">Tambah ke Keranjang</Button> // border-ink text-ink
```

- `solid`: `bg-action text-ink font-semibold rounded-full px-6 py-3`
- `outline`: `border-2 border-ink text-ink font-semibold rounded-full px-6 py-3`
- Hover solid: `hover:bg-container transition-colors duration-200`
- Hover outline: `hover:bg-container transition-colors duration-200`

### ProductCard

```
┌─────────────────────┐
│  ImagePlaceholder   │  ← bg-container + SVG icon in text-ink
│  (aspect-[4/3])     │
├─────────────────────┤
│  Product Name       │  ← text-ink font-semibold
│  Rp 15.000          │  ← text-action font-bold text-lg
│  Warung Bu Siti     │  ← text-ink text-sm opacity-70
│  [UMKM Binaan]      │  ← Badge component
└─────────────────────┘
```

Tailwind shell: `bg-white border border-container rounded-2xl overflow-hidden
hover:shadow-md hover:bg-container/20 transition-all duration-200 cursor-pointer`

Selected state (one card on listing): `ring-2 ring-action`

### CategoryPill

- Inactive: `bg-container text-ink rounded-full px-4 py-2 text-sm`
- Active: `bg-action text-ink rounded-full px-4 py-2 text-sm font-semibold`

### Badge ("UMKM Binaan")

`bg-ink/10 text-ink text-xs px-2 py-0.5 rounded-full`

### ImagePlaceholder

`bg-container flex items-center justify-center` with SVG icon in `text-ink`.
Never use gray. Always palette-consistent.

### Avatar (Monogram)

`w-12 h-12 rounded-full bg-container text-ink font-bold flex items-center justify-center`

---

## 7. Pages

### A. Navbar *(layout/Navbar.jsx)*

```
[Foodie Choice logo]          [🔍] [☰]
```

- `sticky top-0 z-50 bg-container border-b border-ink/10`
- Logo: `font-heading font-bold text-ink`
- Icons: Lucide `Search` + `Menu`, `text-ink`, size 22

### B. Landing Page *(pages/Landing.jsx)*

Sections in order:
1. **Hero** — centered, `py-20 px-6`, headline `font-heading text-4xl text-ink`, orange blob `absolute` behind with `opacity-5`
2. **Category Carousel** — `flex gap-3 overflow-x-auto px-6 py-4 scrollbar-hide`
3. **Featured Grid** — section title row + 2×2 `ProductCard` grid (`grid grid-cols-2 gap-4`)

### C. Products Page *(pages/Products.jsx)*

- Filter bar: `flex flex-wrap gap-2 px-4 py-3 bg-base border-b border-container`
- Sort row: `flex justify-end px-4 py-2`
- Grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4`

### D. Detail Page *(pages/Detail.jsx)*

- Image: `aspect-[4/3] border-2 border-container rounded-2xl overflow-hidden`
- Info block: `px-4 py-6 space-y-2`
- Seller card: `border border-dashed border-action bg-base rounded-2xl p-4 mx-4`
- Sticky bar: `fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_12px_rgba(86,47,0,0.08)] flex gap-3 p-4`

### E. Seller Profile Page *(pages/Seller.jsx)*

- Cover: `h-36 bg-container w-full`
- Avatar: `w-20 h-20 rounded-full border-4 border-white -mt-10 ml-4` (overlaps cover)
- Bio section: `px-4 pt-4 pb-6`
- Product grid: `grid grid-cols-3 gap-3 px-4`

---

## 8. Routing

```jsx
// router/index.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout><Landing /></Layout>} />
    <Route path="/products" element={<Layout><Products /></Layout>} />
    <Route path="/products/:id" element={<Layout><Detail /></Layout>} />
    <Route path="/seller/:id" element={<Layout><Seller /></Layout>} />
  </Routes>
</BrowserRouter>
```

`Layout` wraps all routes with `<Navbar />` and `<Footer />`.

---

## 9. Mock Data — Sellers

```js
// Minimum 4 sellers to populate the static demo
[
  { id: "seller-001", name: "Warung Bu Siti",      category: "Makanan",  location: "Purwokerto Timur", monogram: "WS" },
  { id: "seller-002", name: "Kedai Kopi Aruay",    category: "Minuman",  location: "Kembaran",         monogram: "KA" },
  { id: "seller-003", name: "Dapur Banyumas",       category: "Makanan",  location: "Purwokerto Utara", monogram: "DB" },
  { id: "seller-004", name: "Snack Homemade Rini",  category: "Makanan",  location: "Sokaraja",         monogram: "SR" },
]
// Products per seller: 3–6 items. Price range: Rp 5.000 – Rp 75.000
```

---

## 10. Footer

All pages. `bg-container text-ink`.

| Field | Value |
|---|---|
| Logo | "Foodie Choice" — `font-heading font-bold text-ink` |
| Instagram | @foodie.choice |
| TikTok | @foodie.choice |
| WhatsApp | 085649441482 |
| Menu | Reviews |
| Address | Dukuhwaluh, Kembaran, Banyumas Regency, Central Java 53182 |

---

## 11. Acceptance Criteria

### Phase 1 (Static) — Done when:

- [ ] All 4 pages render without errors via React Router.
- [ ] `tailwind.config.js` has the 4 custom color tokens. No hardcoded hex anywhere.
- [ ] `text-action` never appears on `bg-container`.
- [ ] Price (`text-action font-bold`) is the primary scan target on every card.
- [ ] Hover state visible on product cards (`hover:shadow-md`).
- [ ] One card on listing page has `ring-2 ring-action` (selected state demo).
- [ ] Footer with correct contact info on all pages.
- [ ] All placeholders are `bg-container` + SVG icon. No gray boxes.
- [ ] Mobile layout uncrammed, touch targets ≥ 44px.
- [ ] Components never import from `data/` directly — only through `hooks/`.

### Phase 2 Readiness — Verified when:

- [ ] Replacing `hooks/useProducts.js` internals with a real `fetch()` call requires **zero changes** in any page or component.
- [ ] Mock data shape matches expected REST response structure (`id`, `name`, `price`, `sellerId`, etc.).
- [ ] All routes use `:id` params — ready for dynamic data fetching.

---

*Document owner: SA / PM — Foodie Choice*
*Stack: React 18 + Tailwind CSS v3 + React Router v6*
*Last updated: April 2026*
