import { shopifyREST, delay } from './shopify-client.js';

// Page definitions with full content
const pages = [
  {
    title: 'About Mil Apparel',
    handle: 'about',
    body_html: `
<div class="about-page">
  <p>We built Mil Apparel because we couldn't find gear that felt worthy of the people wearing it.</p>

  <p>We're a veteran-owned brand founded on a simple idea: those who serve deserve apparel that reflects the standard they hold themselves to. No cheap prints. No mass-market logos. Just premium, intentional gear for active duty, veterans, military families, and everyone who stands behind them.</p>

  <p>Every product is designed with purpose. Every purchase supports a veteran-owned business.</p>

  <p><strong>Mil Apparel. Built for the mission.</strong></p>
</div>
    `.trim(),
  },
  {
    title: 'Frequently Asked Questions',
    handle: 'faq',
    body_html: `
<div class="faq-page">
  <h2>Shipping</h2>

  <div class="faq-item">
    <h3>How long does shipping take?</h3>
    <p>Standard shipping takes 5–7 business days. Expedited options available at checkout. Free shipping on all orders over $50.</p>
  </div>

  <div class="faq-item">
    <h3>Do you ship internationally?</h3>
    <p>Currently we ship within the United States, including APO/FPO military addresses.</p>
  </div>

  <h2>Sizing</h2>

  <div class="faq-item">
    <h3>How do your products fit?</h3>
    <p>Our apparel runs true to size. Check the size guide on each product page. When in doubt, size up for a relaxed fit.</p>
  </div>

  <h2>Returns</h2>

  <div class="faq-item">
    <h3>What is your return policy?</h3>
    <p>We accept returns within 30 days of delivery on unworn, unwashed items in original condition. Personalized items are final sale.</p>
  </div>

  <div class="faq-item">
    <h3>How do I start a return?</h3>
    <p>Email us at <a href="mailto:support@milapparel.com">support@milapparel.com</a> with your order number and we'll take care of you.</p>
  </div>

  <h2>Personalization</h2>

  <div class="faq-item">
    <h3>Which products can be personalized?</h3>
    <p>Select apparel items offer optional personalization (Name, Rank, Unit). Look for the "Personalize It" fields on the product page.</p>
  </div>

  <div class="faq-item">
    <h3>How long do personalized orders take?</h3>
    <p>Personalized orders ship within 3–5 business days.</p>
  </div>
</div>
    `.trim(),
  },
  {
    title: 'Contact Us',
    handle: 'contact',
    body_html: `
<div class="contact-page">
  <p>Have a question, bulk order inquiry, or just want to connect? We respond within 1 business day.</p>

  <p><strong>Email:</strong> <a href="mailto:support@milapparel.com">support@milapparel.com</a></p>

  <p>For unit or group orders (10+ items), email us directly for custom pricing.</p>
</div>
    `.trim(),
  },
];

// Policy pages (handled separately in Shopify)
const policies = {
  shipping: {
    title: 'Shipping Policy',
    body: `Free standard shipping on all U.S. orders over $50. Orders under $50 ship for a flat rate of $5.99.

Standard Shipping: 5–7 business days
Expedited Shipping: 2–3 business days (available at checkout)

We ship to all 50 states and APO/FPO/DPO military addresses. Orders are processed within 1–2 business days. You will receive a tracking number once your order ships.`
  },
  refund: {
    title: 'Refund Policy',
    body: `We stand behind every product we make. If you're not satisfied, we'll make it right.

RETURNS: We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached.

EXCHANGES: Need a different size? Email us at support@milapparel.com and we'll sort it out fast.

PERSONALIZED ITEMS: All personalized/custom items are final sale and cannot be returned or exchanged.

TO START A RETURN: Email support@milapparel.com with your order number and reason for return. We'll reply within 1 business day.`
  }
};

export async function createPages() {
  console.log('\n=== PHASE 3: Creating Pages ===\n');

  const created = [];
  const updated = [];
  const failed = [];

  // Get existing pages
  const existingPagesRes = await shopifyREST('/pages.json');
  const existingPages = existingPagesRes.pages || [];
  const existingHandles = existingPages.reduce((acc, p) => {
    acc[p.handle] = p.id;
    return acc;
  }, {});

  for (const page of pages) {
    try {
      if (existingHandles[page.handle]) {
        // Update existing page
        await shopifyREST(`/pages/${existingHandles[page.handle]}.json`, 'PUT', {
          page: {
            id: existingHandles[page.handle],
            title: page.title,
            body_html: page.body_html,
          }
        });
        console.log(`✅ Updated page: ${page.title}`);
        updated.push(page.title);
      } else {
        // Create new page
        await shopifyREST('/pages.json', 'POST', {
          page: {
            title: page.title,
            handle: page.handle,
            body_html: page.body_html,
            published: true,
          }
        });
        console.log(`✅ Created page: ${page.title}`);
        created.push(page.title);
      }
      await delay(300);
    } catch (error) {
      console.error(`❌ Failed: ${page.title} - ${error.message}`);
      failed.push(page.title);
    }
  }

  // Note about policies - these need to be updated through Shopify Admin settings
  console.log('\n📋 Policy Pages (update in Shopify Admin → Settings → Policies):');
  console.log('---');
  console.log('SHIPPING POLICY:');
  console.log(policies.shipping.body);
  console.log('---');
  console.log('REFUND POLICY:');
  console.log(policies.refund.body);
  console.log('---');

  console.log('\n--- Pages Summary ---');
  console.log(`Created: ${created.length}`);
  console.log(`Updated: ${updated.length}`);
  console.log(`Failed: ${failed.length}`);
  console.log('\n⚠️  Shipping & Refund policies must be updated manually in Shopify Admin → Settings → Policies');

  return { created, updated, failed, policies };
}

// Export policy content for manual update
export { policies };

// Run if called directly
if (process.argv[1].includes('create-pages')) {
  createPages()
    .then(() => console.log('\nDone!'))
    .catch(console.error);
}
