import 'dotenv/config';

const SHOPIFY_STORE = process.env.SHOPIFY_STORE_DOMAIN; // e.g., 'milapparel.myshopify.com'
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!SHOPIFY_STORE || !ACCESS_TOKEN) {
  console.error('Missing environment variables. Please set:');
  console.error('  SHOPIFY_STORE_DOMAIN=your-store.myshopify.com');
  console.error('  SHOPIFY_ACCESS_TOKEN=shpat_xxxxx');
  process.exit(1);
}

const API_VERSION = '2024-01';
const BASE_URL = `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}`;

// REST API helper
export async function shopifyREST(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shopify API Error (${response.status}): ${error}`);
  }

  // Handle empty responses (like DELETE)
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// GraphQL API helper
export async function shopifyGraphQL(query, variables = {}) {
  const url = `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/graphql.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
  }

  return result.data;
}

// Helper to pause between API calls (rate limiting)
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { SHOPIFY_STORE, ACCESS_TOKEN };
