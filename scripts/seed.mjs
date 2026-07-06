/**
 * Seeds the development store with the sample catalog from seed-data.mjs:
 * products with variants, smart collections, publishing to the Online Store
 * channel and the main navigation menu.
 *
 * Usage: node scripts/seed.mjs
 * Requires .env with SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID and
 * SHOPIFY_CLIENT_SECRET of a Dev Dashboard app installed on the store;
 * they are exchanged for a 24h Admin API token (client credentials grant).
 * Idempotent: existing products/collections (matched by handle) are updated.
 */

import { gql, userErrors, sleep, findByHandle, requireScopes } from './lib.mjs';
import { COLLECTIONS, PRODUCTS, VENDOR, MAIN_MENU_ITEMS } from './seed-data.mjs';

requireScopes(['write_products', 'write_publications', 'write_online_store_navigation']);

// --- steps ---------------------------------------------------------------

async function getShop() {
  const data = await gql(`{ shop { name currencyCode url } }`);
  return data.shop;
}

async function ensureCollection(def) {
  const existing = await findByHandle('collections', def.handle);
  const fields = {
    title: def.title,
    descriptionHtml: `<p>${def.description}</p>`,
    ruleSet: {
      appliedDisjunctively: false,
      rules: [{ column: 'TYPE', relation: 'EQUALS', condition: def.productType }],
    },
  };
  if (existing) {
    const data = await gql(
      `mutation update($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection { id }
          userErrors { field message }
        }
      }`,
      { input: { id: existing.id, ...fields } }
    );
    if (!userErrors(data.collectionUpdate, def.title)) {
      console.log(`  = collection updated: ${def.title}`);
    }
    return existing.id;
  }
  const data = await gql(
    `mutation create($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle }
        userErrors { field message }
      }
    }`,
    { input: { handle: def.handle, ...fields } }
  );
  if (userErrors(data.collectionCreate, def.title)) return null;
  console.log(`  + collection created: ${def.title}`);
  return data.collectionCreate.collection.id;
}

function buildProductInput(product, currency) {
  const pick = (prices) => prices?.[currency] ?? prices?.USD;
  const colorCode = (color, index) =>
    color
      .split(/\s+/)[0]
      .slice(0, 3)
      .toUpperCase()
      .replace(/[^A-ZА-ЯІЇЄ]/g, '') + index;

  const productOptions = [];
  if (product.sizes) {
    productOptions.push({
      name: 'Size',
      position: 1,
      values: product.sizes.map((name) => ({ name })),
    });
  }
  productOptions.push({
    name: 'Color',
    position: productOptions.length + 1,
    values: product.colors.map((name) => ({ name })),
  });

  const variants = [];
  const sizes = product.sizes ?? [null];
  for (const size of sizes) {
    for (const [colorIndex, color] of product.colors.entries()) {
      const optionValues = [];
      if (size) optionValues.push({ optionName: 'Size', name: size });
      optionValues.push({ optionName: 'Color', name: color });
      variants.push({
        optionValues,
        price: pick(product.price),
        compareAtPrice: pick(product.compareAtPrice) ?? null,
        sku: [product.sku, size, colorCode(color, colorIndex)].filter(Boolean).join('-'),
        inventoryPolicy: 'CONTINUE',
      });
    }
  }

  return {
    title: product.title,
    handle: product.handle,
    descriptionHtml: `<p>${product.description}</p>`,
    productType: product.productType,
    vendor: VENDOR,
    tags: product.tags,
    status: 'ACTIVE',
    productOptions,
    variants,
  };
}

async function ensureProduct(product, currency) {
  const existing = await findByHandle('products', product.handle);
  const input = buildProductInput(product, currency);
  const data = await gql(
    `mutation set($input: ProductSetInput!, $identifier: ProductSetIdentifiers) {
      productSet(synchronous: true, input: $input, identifier: $identifier) {
        product { id handle variantsCount { count } }
        userErrors { field message }
      }
    }`,
    { input, identifier: existing ? { id: existing.id } : null }
  );
  if (userErrors(data.productSet, product.title)) return null;
  const result = data.productSet.product;
  const action = existing ? '=' : '+';
  console.log(`  ${action} ${product.title} (${result.variantsCount.count} variants)`);
  return result.id;
}

async function ensureProductImage(productId, product) {
  if (!product.image) return;
  const existing = await gql(`query media($id: ID!) { product(id: $id) { mediaCount { count } } }`, {
    id: productId,
  });
  if (existing.product.mediaCount.count > 0) return;
  const data = await gql(
    `mutation media($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media { id }
        mediaUserErrors { field message }
      }
    }`,
    {
      productId,
      media: [
        {
          originalSource: product.image,
          alt: product.imageAlt ?? product.title,
          mediaContentType: 'IMAGE',
        },
      ],
    }
  );
  const errors = data.productCreateMedia.mediaUserErrors ?? [];
  if (errors.length) {
    console.error(`  ⚠ image for ${product.handle}: ${errors.map((e) => e.message).join('; ')}`);
  } else {
    console.log('    ↳ image attached');
  }
}

async function getOnlineStorePublicationId() {
  const data = await gql(`{ publications(first: 10) { nodes { id name } } }`);
  const onlineStore = data.publications.nodes.find((p) => p.name === 'Online Store');
  if (!onlineStore) fail('Online Store publication not found — check publications scopes.');
  return onlineStore.id;
}

async function publish(id, publicationId) {
  const data = await gql(
    `mutation publish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) { userErrors { field message } }
    }`,
    { id, input: [{ publicationId }] }
  );
  userErrors(data.publishablePublish, `publish ${id}`);
}

async function updateMainMenu(collectionIds) {
  const data = await gql(`{ menus(first: 20) { nodes { id handle title } } }`);
  const menu =
    data.menus.nodes.find((m) => m.handle === 'main-menu') ?? data.menus.nodes[0];
  if (!menu) {
    console.log('  ⚠ no menus found, skipping navigation');
    return;
  }
  const result = await gql(
    `mutation update($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) {
      menuUpdate(id: $id, title: $title, items: $items) {
        menu { id items { title } }
        userErrors { field message }
      }
    }`,
    { id: menu.id, title: menu.title, items: MAIN_MENU_ITEMS(collectionIds) }
  );
  if (!userErrors(result.menuUpdate, 'menu')) {
    console.log(`  ✓ menu "${menu.handle}" updated (${result.menuUpdate.menu.items.length} items)`);
  }
}

// --- run -----------------------------------------------------------------

const shop = await getShop();
console.log(`Store: ${shop.name} (${shop.url}), currency: ${shop.currencyCode}\n`);

console.log('Collections:');
const collectionIds = {};
for (const def of COLLECTIONS) {
  const id = await ensureCollection(def);
  if (id) collectionIds[def.handle] = id;
  await sleep(200);
}

console.log('\nProducts:');
const productIds = [];
for (const product of PRODUCTS) {
  const id = await ensureProduct(product, shop.currencyCode);
  if (id) {
    productIds.push(id);
    await ensureProductImage(id, product);
  }
  await sleep(300);
}

console.log('\nPublishing to Online Store:');
const publicationId = await getOnlineStorePublicationId();
for (const id of [...productIds, ...Object.values(collectionIds)]) {
  await publish(id, publicationId);
  await sleep(150);
}
console.log(`  ✓ ${productIds.length} products, ${Object.keys(collectionIds).length} collections`);

console.log('\nNavigation:');
await updateMainMenu(collectionIds);

console.log('\nDone.');
