/**
 * Registers Ukrainian translations for the sample catalog: enables and
 * publishes the `uk` locale, then translates product/collection titles and
 * descriptions plus the main menu items using the `uk` blocks in seed-data.mjs.
 *
 * Usage: node scripts/translate.mjs
 * Requires the app scopes: write_translations, read_locales, write_locales.
 * Idempotent: re-registering the same translation is a no-op.
 */

import { gql, userErrors, sleep, findByHandle, requireScopes, registerTranslations as registerFor } from './lib.mjs';
import { COLLECTIONS, PRODUCTS, MENU_TITLES_UK } from './seed-data.mjs';

requireScopes(['write_translations', 'write_locales']);

const LOCALE = 'uk';

// --- locale ----------------------------------------------------------------

async function ensureLocale() {
  const data = await gql(`{ shopLocales { locale name primary published } }`);
  const primary = data.shopLocales.find((l) => l.primary);
  console.log(`Primary language: ${primary.locale} (${primary.name})`);
  if (primary.locale !== 'en') {
    console.log('  ⚠ Primary language is not English — change it in admin: Settings → Languages.');
  }

  const existing = data.shopLocales.find((l) => l.locale === LOCALE);
  if (existing?.published) {
    console.log(`Locale "${LOCALE}" already enabled and published.`);
    return;
  }
  if (!existing) {
    const enabled = await gql(
      `mutation enable($locale: String!) {
        shopLocaleEnable(locale: $locale) {
          shopLocale { locale }
          userErrors { field message }
        }
      }`,
      { locale: LOCALE }
    );
    if (userErrors(enabled.shopLocaleEnable, `enable ${LOCALE}`)) return;
    console.log(`Locale "${LOCALE}" enabled.`);
  }
  const published = await gql(
    `mutation publish($locale: String!, $shopLocale: ShopLocaleInput!) {
      shopLocaleUpdate(locale: $locale, shopLocale: $shopLocale) {
        shopLocale { locale published }
        userErrors { field message }
      }
    }`,
    { locale: LOCALE, shopLocale: { published: true } }
  );
  if (!userErrors(published.shopLocaleUpdate, `publish ${LOCALE}`)) {
    console.log(`Locale "${LOCALE}" published.`);
  }
}

// --- translations ------------------------------------------------------------

const registerTranslations = (resourceId, values, label) =>
  registerFor(resourceId, LOCALE, values, label);

// --- run ---------------------------------------------------------------------

await ensureLocale();

console.log('\nProducts:');
for (const product of PRODUCTS) {
  if (!product.uk) continue;
  const found = await findByHandle('products', product.handle);
  if (!found) {
    console.log(`  ⚠ not found: ${product.handle} — run seed.mjs first`);
    continue;
  }
  await registerTranslations(
    found.id,
    { title: product.uk.title, body_html: `<p>${product.uk.description}</p>` },
    product.handle
  );
  await sleep(200);
}

console.log('\nCollections:');
for (const collection of COLLECTIONS) {
  if (!collection.uk) continue;
  const found = await findByHandle('collections', collection.handle);
  if (!found) {
    console.log(`  ⚠ not found: ${collection.handle} — run seed.mjs first`);
    continue;
  }
  await registerTranslations(
    found.id,
    { title: collection.uk.title, body_html: `<p>${collection.uk.description}</p>` },
    collection.handle
  );
  await sleep(200);
}

console.log('\nMain menu:');
const menus = await gql(`{ menus(first: 20) { nodes { id handle title items { id title } } } }`);
const menu = menus.menus.nodes.find((m) => m.handle === 'main-menu') ?? menus.menus.nodes[0];
if (menu) {
  for (const item of menu.items) {
    const uk = MENU_TITLES_UK[item.title];
    if (!uk) continue;
    // Menu items are translated as Link resources (same numeric id).
    const linkId = item.id.replace('/MenuItem/', '/Link/');
    await registerTranslations(linkId, { title: uk }, `menu: ${item.title} → ${uk}`);
    await sleep(150);
  }
} else {
  console.log('  ⚠ no menus found');
}

console.log('\nDone.');
