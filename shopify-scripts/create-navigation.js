import { shopifyREST, shopifyGraphQL, delay } from './shopify-client.js';

// Navigation structure
const mainNavigation = {
  title: 'Main menu',
  handle: 'main-menu',
  items: [
    {
      title: 'Shop',
      type: 'HTTP',
      url: '/collections/all',
      items: [
        { title: 'All Products', url: '/collections/all' },
        { title: 'T-Shirts', url: '/collections/t-shirts' },
        { title: 'Hoodies', url: '/collections/hoodies' },
        { title: 'Hats', url: '/collections/hats' },
        { title: 'Accessories', url: '/collections/accessories' },
      ]
    },
    {
      title: 'Branches',
      type: 'HTTP',
      url: '#',
      items: [
        { title: 'Army', url: '/collections/army' },
        { title: 'Navy', url: '/collections/navy' },
        { title: 'Air Force', url: '/collections/air-force' },
        { title: 'Marines', url: '/collections/marines' },
        { title: 'Coast Guard', url: '/collections/coast-guard' },
      ]
    },
    { title: 'Gifts', url: '/collections/gifts' },
    { title: 'About', url: '/pages/about' },
    { title: 'Contact', url: '/pages/contact' },
  ]
};

const footerHelpMenu = {
  title: 'Help',
  handle: 'footer-help',
  items: [
    { title: 'Shipping Policy', url: '/policies/shipping-policy' },
    { title: 'Returns & Refunds', url: '/policies/refund-policy' },
    { title: 'FAQ', url: '/pages/faq' },
    { title: 'Contact Us', url: '/pages/contact' },
  ]
};

const footerLegalMenu = {
  title: 'Legal',
  handle: 'footer-legal',
  items: [
    { title: 'Privacy Policy', url: '/policies/privacy-policy' },
    { title: 'Terms of Service', url: '/policies/terms-of-service' },
  ]
};

// Using GraphQL for navigation (REST API doesn't support menu creation directly)
async function createOrUpdateMenu(menuDef) {
  // First, try to find existing menu
  const query = `
    query {
      menus(first: 50) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const result = await shopifyGraphQL(query);
  const existingMenu = result.menus.edges.find(
    edge => edge.node.handle === menuDef.handle
  );

  if (existingMenu) {
    console.log(`Menu "${menuDef.title}" exists. Updating...`);
    // Delete and recreate for simplicity
    await shopifyGraphQL(`
      mutation {
        menuDelete(id: "${existingMenu.node.id}") {
          deletedMenuId
        }
      }
    `);
    await delay(500);
  }

  // Build menu items for GraphQL
  const buildItems = (items) => {
    return items.map(item => {
      const menuItem = {
        title: item.title,
        type: 'HTTP',
        url: item.url,
      };

      if (item.items && item.items.length > 0) {
        menuItem.items = buildItems(item.items);
      }

      return menuItem;
    });
  };

  // Create new menu using GraphQL
  const createMutation = `
    mutation menuCreate($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
      menuCreate(title: $title, handle: $handle, items: $items) {
        menu {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    title: menuDef.title,
    handle: menuDef.handle,
    items: buildItems(menuDef.items)
  };

  const createResult = await shopifyGraphQL(createMutation, variables);

  if (createResult.menuCreate?.userErrors?.length > 0) {
    throw new Error(JSON.stringify(createResult.menuCreate.userErrors));
  }

  return createResult.menuCreate.menu;
}

export async function createNavigation() {
  console.log('\n=== PHASE 2: Creating Navigation Menus ===\n');

  try {
    // Create main menu
    console.log('Creating main navigation menu...');
    await createOrUpdateMenu(mainNavigation);
    console.log('✅ Main menu created/updated');
    await delay(500);

    // Create footer menus
    console.log('Creating footer Help menu...');
    await createOrUpdateMenu(footerHelpMenu);
    console.log('✅ Footer Help menu created');
    await delay(500);

    console.log('Creating footer Legal menu...');
    await createOrUpdateMenu(footerLegalMenu);
    console.log('✅ Footer Legal menu created');

    console.log('\n--- Navigation Summary ---');
    console.log('Main menu: Created with Shop, Branches, Gifts, About, Contact');
    console.log('Footer Help: Shipping, Returns, FAQ, Contact');
    console.log('Footer Legal: Privacy Policy, Terms of Service');

    return { success: true };
  } catch (error) {
    console.error(`❌ Navigation error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Run if called directly
if (process.argv[1].includes('create-navigation')) {
  createNavigation()
    .then(() => console.log('\nDone!'))
    .catch(console.error);
}
