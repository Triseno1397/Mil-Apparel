# Phase 5: Add Personalization Fields

This adds optional Name, Rank, and Unit fields to t-shirts, hoodies, and long sleeves.

---

## Option A: Use a Shopify App (Easiest)

Install one of these free/low-cost apps from the Shopify App Store:

1. **Infinite Options** (free)
2. **Product Options & Customizer** (free tier available)
3. **Globo Product Options**

After installing, create these fields for apparel products:

| Field Label | Type | Max Length | Required |
|-------------|------|------------|----------|
| Name or Nickname (optional) | Text | 20 | No |
| Rank (optional) | Text | 20 | No |
| Unit / Branch (optional) | Text | 30 | No |

Add helper text: `Leave blank to skip personalization. Personalized orders ship in 3–5 business days.`

---

## Option B: Edit Theme Code (Advanced)

If you prefer not to use an app, add this code to your theme:

### Step 1: Open Theme Editor

1. Go to **Online Store → Themes**
2. Click **"..."** on your Horizon theme → **Edit code**

### Step 2: Find the Product Form

Look for one of these files:
- `sections/main-product.liquid`
- `snippets/product-form.liquid`
- `sections/product-template.liquid`

### Step 3: Add This Code

Find the "Add to cart" button section and paste this code **BEFORE** it:

```liquid
{% comment %} Mil Apparel Personalization Fields {% endcomment %}
{% if product.type == 'T-Shirts' or product.type == 'Hoodies' or product.type == 'Long Sleeve Shirts' %}
<div class="personalization-fields" style="margin: 1.5rem 0; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
  <h4 style="margin-bottom: 1rem; font-weight: 600; font-size: 1rem;">Personalize It (Optional)</h4>

  <div style="margin-bottom: 1rem;">
    <label for="properties[Name]" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
      Name or Nickname (optional)
    </label>
    <input
      type="text"
      id="properties[Name]"
      name="properties[Name]"
      maxlength="20"
      placeholder="Max 20 characters"
      style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
    >
  </div>

  <div style="margin-bottom: 1rem;">
    <label for="properties[Rank]" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
      Rank (optional)
    </label>
    <input
      type="text"
      id="properties[Rank]"
      name="properties[Rank]"
      maxlength="20"
      placeholder="Max 20 characters"
      style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
    >
  </div>

  <div style="margin-bottom: 1rem;">
    <label for="properties[Unit]" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
      Unit / Branch (optional)
    </label>
    <input
      type="text"
      id="properties[Unit]"
      name="properties[Unit]"
      maxlength="30"
      placeholder="Max 30 characters"
      style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;"
    >
  </div>

  <p style="font-size: 0.75rem; color: #666; margin: 0;">
    Leave blank to skip personalization. Personalized orders ship in 3–5 business days.
  </p>
</div>
{% endif %}
```

### Step 4: Save

Click **Save** in the code editor.

---

## How It Works

- The `name="properties[Name]"` format automatically adds the value to the cart line item
- When an order comes in, you'll see the personalization details in the order notes
- Customers see their personalization in the cart and order confirmation

---

## Checklist

- [ ] Installed personalization app OR added theme code
- [ ] Fields appear on t-shirt product pages
- [ ] Fields appear on hoodie product pages
- [ ] Fields appear on long sleeve product pages
- [ ] Test: Add a product with personalization to cart and verify it shows
