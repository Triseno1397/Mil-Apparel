# Phase 2: Navigation Menus

Go to: **Shopify Admin → Online Store → Navigation**

---

## Main Menu

Click on **"Main menu"** to edit it.

### Delete existing items first (if any placeholder items exist)

### Add these menu items in order:

#### 1. Shop (Dropdown)
- Click **"Add menu item"**
- **Name:** `Shop`
- **Link:** Click "Collections" → Select "All products" (or type `/collections/all`)
- Click **Add**
- Now add nested items under Shop:
  - Click **"Add menu item"** and drag it under "Shop" to indent it
  - **Name:** `All Products` | **Link:** `/collections/all`
  - **Name:** `T-Shirts` | **Link:** `/collections/t-shirts`
  - **Name:** `Hoodies` | **Link:** `/collections/hoodies`
  - **Name:** `Hats` | **Link:** `/collections/hats`
  - **Name:** `Accessories` | **Link:** `/collections/accessories`

#### 2. Branches (Dropdown)
- Click **"Add menu item"**
- **Name:** `Branches`
- **Link:** `#` (just type a hash symbol)
- Click **Add**
- Add nested items:
  - **Name:** `Army` | **Link:** `/collections/army`
  - **Name:** `Navy` | **Link:** `/collections/navy`
  - **Name:** `Air Force` | **Link:** `/collections/air-force`
  - **Name:** `Marines` | **Link:** `/collections/marines`
  - **Name:** `Coast Guard` | **Link:** `/collections/coast-guard`

#### 3. Gifts
- Click **"Add menu item"**
- **Name:** `Gifts`
- **Link:** `/collections/gifts`
- Click **Add**

#### 4. About
- Click **"Add menu item"**
- **Name:** `About`
- **Link:** `/pages/about`
- Click **Add**

#### 5. Contact
- Click **"Add menu item"**
- **Name:** `Contact`
- **Link:** `/pages/contact`
- Click **Add**

### Click **Save menu**

---

## Footer Menu: Help

Go back to **Navigation** and click **"Add menu"**

- **Title:** `Help`
- **Handle:** `footer-help`

Add these items:
| Name | Link |
|------|------|
| Shipping Policy | `/policies/shipping-policy` |
| Returns & Refunds | `/policies/refund-policy` |
| FAQ | `/pages/faq` |
| Contact Us | `/pages/contact` |

Click **Save menu**

---

## Footer Menu: Legal

Click **"Add menu"**

- **Title:** `Legal`
- **Handle:** `footer-legal`

Add these items:
| Name | Link |
|------|------|
| Privacy Policy | `/policies/privacy-policy` |
| Terms of Service | `/policies/terms-of-service` |

Click **Save menu**

---

## Assign Footer Menus to Theme

1. Go to **Online Store → Customize**
2. Scroll down to the **Footer** section
3. In footer settings, assign:
   - First footer menu → `Help`
   - Second footer menu → `Legal`
4. Click **Save**

---

## Checklist

- [ ] Updated Main menu with Shop dropdown
- [ ] Added Branches dropdown with all 5 branches
- [ ] Added Gifts, About, Contact links
- [ ] Created Help footer menu
- [ ] Created Legal footer menu
- [ ] Assigned footer menus in theme
