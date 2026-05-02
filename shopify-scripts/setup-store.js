import { createCollections } from './create-collections.js';
import { tagProducts } from './tag-products.js';
import { createNavigation } from './create-navigation.js';
import { createPages, policies } from './create-pages.js';
import { updateDescriptions } from './update-descriptions.js';
import { addPersonalization } from './add-personalization.js';

console.log(`
╔══════════════════════════════════════════════════════════════╗
║           MIL APPAREL SHOPIFY STORE BUILDER                  ║
║                                                              ║
║   Premium Military Apparel for Those Who Serve               ║
║   Veteran-Owned & Operated                                   ║
╚══════════════════════════════════════════════════════════════╝
`);

async function runAllPhases() {
  const results = {
    phase1Collections: null,
    phase1Tags: null,
    phase2Navigation: null,
    phase3Pages: null,
    phase4Descriptions: null,
    phase5Personalization: null,
  };

  try {
    // ===== PHASE 1: COLLECTIONS =====
    console.log('\n' + '═'.repeat(60));
    console.log('PHASE 1: COLLECTIONS & TAGS');
    console.log('═'.repeat(60));

    results.phase1Collections = await createCollections();
    results.phase1Tags = await tagProducts();

    // ===== PHASE 2: NAVIGATION =====
    console.log('\n' + '═'.repeat(60));
    console.log('PHASE 2: NAVIGATION');
    console.log('═'.repeat(60));

    results.phase2Navigation = await createNavigation();

    // ===== PHASE 3: PAGES =====
    console.log('\n' + '═'.repeat(60));
    console.log('PHASE 3: PAGES');
    console.log('═'.repeat(60));

    results.phase3Pages = await createPages();

    // ===== PHASE 4: PRODUCT DESCRIPTIONS =====
    console.log('\n' + '═'.repeat(60));
    console.log('PHASE 4: PRODUCT DESCRIPTIONS');
    console.log('═'.repeat(60));

    results.phase4Descriptions = await updateDescriptions();

    // ===== PHASE 5: PERSONALIZATION =====
    console.log('\n' + '═'.repeat(60));
    console.log('PHASE 5: PERSONALIZATION');
    console.log('═'.repeat(60));

    results.phase5Personalization = await addPersonalization();

    // ===== FINAL SUMMARY =====
    console.log('\n' + '═'.repeat(60));
    console.log('BUILD COMPLETE - SUMMARY');
    console.log('═'.repeat(60));

    console.log(`
✅ Phase 1 - Collections: ${results.phase1Collections.created.length} created, ${results.phase1Collections.existing.length} existed
✅ Phase 1 - Product Tags: ${results.phase1Tags.updated} updated, ${results.phase1Tags.unchanged} unchanged
✅ Phase 2 - Navigation: Main menu, Footer Help, Footer Legal menus created
✅ Phase 3 - Pages: About, FAQ, Contact pages created
✅ Phase 4 - Descriptions: ${results.phase4Descriptions.updated} products updated
✅ Phase 5 - Personalization: ${results.phase5Personalization.updated} products marked
`);

    // Manual steps required
    console.log('\n' + '═'.repeat(60));
    console.log('MANUAL STEPS REQUIRED');
    console.log('═'.repeat(60));

    console.log(`
📋 POLICY PAGES (Shopify Admin → Settings → Policies):

1. SHIPPING POLICY:
${policies.shipping.body}

2. REFUND POLICY:
${policies.refund.body}

---

📋 PHASE 6: HOMEPAGE SECTIONS (Shopify Admin → Online Store → Customize):

1. KEEP the existing Hero section exactly as-is
2. Replace placeholder collection sections with Branch Collections grid:
   - Army, Navy, Air Force, Marines, Coast Guard
3. ADD Featured Collection: "Best Sellers" → /collections/all
4. ADD Gifts section: "Gifts for Service Members" → /collections/gifts
5. ADD 3-column trust section:
   - "Veteran-Owned" / "Founded and operated by those who served."
   - "Operator-Grade Quality" / "Built to the standard you hold yourself to."
   - "Ships Fast" / "Free shipping over $50. Fast fulfillment, every time."
6. UPDATE email capture section:
   - Heading: "Join the Ranks."
   - Subtext: "Get early access to new drops and veteran-exclusive offers. No spam — ever."

---

📋 PERSONALIZATION THEME CODE:
Add the Liquid code output above to your product form template.
Location: sections/main-product.liquid (before Add to Cart button)

---

🎉 AUTOMATED PHASES COMPLETE!
`);

    return results;

  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the setup
runAllPhases()
  .then(() => {
    console.log('\n✅ Setup script completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Setup script failed:', error);
    process.exit(1);
  });
