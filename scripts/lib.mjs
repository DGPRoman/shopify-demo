/**
 * Shared Admin API client for the seeding scripts.
 * Reads .env, exchanges the Dev Dashboard app credentials for a short-lived
 * access token (client credentials grant) and exposes a GraphQL helper.
 */

import { readFileSync } from 'node:fs';

const API_VERSION = '2026-04';

export function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function loadEnv() {
  const envPath = new URL('../.env', import.meta.url);
  let raw;
  try {
    raw = readFileSync(envPath, 'utf8');
  } catch {
    fail('.env not found. Copy .env.example to .env and fill in the credentials.');
  }
  const env = {};
  for (const line of raw.split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) env[match[1]] = match[2];
  }
  return env;
}

const env = loadEnv();
export const DOMAIN = env.SHOPIFY_STORE_DOMAIN;
if (!DOMAIN) fail('SHOPIFY_STORE_DOMAIN is missing in .env');
if (!env.SHOPIFY_CLIENT_ID) fail('SHOPIFY_CLIENT_ID is missing in .env');
if (!env.SHOPIFY_CLIENT_SECRET) fail('SHOPIFY_CLIENT_SECRET is missing in .env');

async function getAccessToken() {
  const response = await fetch(`https://${DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: env.SHOPIFY_CLIENT_ID,
      client_secret: env.SHOPIFY_CLIENT_SECRET,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    fail(
      `Token exchange failed (HTTP ${response.status}): ${body}\n` +
        '  The app must be installed on the store and belong to the same organization.'
    );
  }
  const json = await response.json();
  return { token: json.access_token, scopes: json.scope.split(',').map((s) => s.trim()) };
}

const { token: TOKEN, scopes: GRANTED_SCOPES } = await getAccessToken();

/** Exits with a clear message when the app token lacks any of the scopes. */
export function requireScopes(scopes) {
  const missing = scopes.filter((s) => !GRANTED_SCOPES.includes(s));
  if (missing.length) {
    fail(
      `App is missing scopes: ${missing.join(', ')}.\n` +
        '  Add them in a new app version in the Dev Dashboard, then re-approve the app in the store admin.'
    );
  }
}

export async function gql(query, variables = {}) {
  const response = await fetch(`https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    fail(`HTTP ${response.status} from Admin API. Check the app credentials and scopes.`);
  }
  const json = await response.json();
  if (json.errors) {
    fail(`GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data;
}

export function userErrors(payload, context) {
  const errors = payload?.userErrors ?? [];
  if (errors.length) {
    console.error(`  ⚠ ${context}: ${errors.map((e) => e.message).join('; ')}`);
  }
  return errors.length > 0;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Registers translations for a resource, matching `values` keys against the
 * resource's translatable content (skipping keys it doesn't expose).
 */
export async function registerTranslations(resourceId, locale, values, label) {
  const source = await gql(
    `query src($id: ID!) {
      translatableResource(resourceId: $id) {
        translatableContent { key value digest }
      }
    }`,
    { id: resourceId }
  );
  const content = source.translatableResource?.translatableContent ?? [];
  const translations = [];
  for (const [key, value] of Object.entries(values)) {
    const item = content.find((c) => c.key === key);
    if (!item) continue;
    translations.push({ locale, key, value, translatableContentDigest: item.digest });
  }
  if (!translations.length) {
    console.log(`  ⚠ ${label}: no translatable keys matched (${Object.keys(values).join(', ')})`);
    return;
  }
  const data = await gql(
    `mutation register($id: ID!, $translations: [TranslationInput!]!) {
      translationsRegister(resourceId: $id, translations: $translations) {
        translations { key locale }
        userErrors { field message }
      }
    }`,
    { id: resourceId, translations }
  );
  if (!userErrors(data.translationsRegister, label)) {
    console.log(`  ✓ ${label} (${translations.map((t) => t.key).join(', ')})`);
  }
}

export async function findByHandle(kind, handle) {
  const data = await gql(
    `query find($query: String!) {
      ${kind}(first: 1, query: $query) { nodes { id handle } }
    }`,
    { query: `handle:'${handle}'` }
  );
  return data[kind].nodes[0] ?? null;
}
