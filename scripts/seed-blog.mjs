/**
 * Seeds the development store with the sample blog from seed-blog-data.mjs:
 * the blog itself, the articles (published, with images and tags), a
 * "Journal" item in the main menu and Ukrainian translations for all of it.
 *
 * Usage: node scripts/seed-blog.mjs
 * Requires the same .env as seed.mjs and the app scopes write_content,
 * write_translations, write_online_store_navigation.
 * Idempotent: existing blog/articles (matched by handle) are updated.
 */

import { gql, userErrors, sleep, registerTranslations, requireScopes } from './lib.mjs';
import { BLOG, ARTICLES, AUTHOR } from './seed-blog-data.mjs';

requireScopes(['write_content', 'write_translations', 'write_online_store_navigation']);

const LOCALE = 'uk';

// --- blog ------------------------------------------------------------------

async function ensureBlog() {
  const data = await gql(`{ blogs(first: 50) { nodes { id handle } } }`);
  const existing = data.blogs.nodes.find((b) => b.handle === BLOG.handle);
  if (existing) {
    console.log(`  = blog exists: ${BLOG.handle}`);
    return existing.id;
  }
  const created = await gql(
    `mutation create($blog: BlogCreateInput!) {
      blogCreate(blog: $blog) {
        blog { id handle }
        userErrors { field message }
      }
    }`,
    { blog: { title: BLOG.title, handle: BLOG.handle } }
  );
  if (userErrors(created.blogCreate, BLOG.title)) process.exit(1);
  console.log(`  + blog created: ${BLOG.title} (/blogs/${BLOG.handle})`);
  return created.blogCreate.blog.id;
}

// --- articles ----------------------------------------------------------------

async function existingArticles(blogId) {
  const data = await gql(
    `query articles($id: ID!) {
      blog(id: $id) { articles(first: 250) { nodes { id handle } } }
    }`,
    { id: blogId }
  );
  return new Map(data.blog.articles.nodes.map((a) => [a.handle, a.id]));
}

function articleFields(article) {
  return {
    title: article.title,
    body: article.body,
    summary: article.summary,
    tags: article.tags,
    image: article.image,
    author: { name: AUTHOR },
    isPublished: true,
    publishDate: article.publishDate,
  };
}

async function ensureArticle(blogId, byHandle, article) {
  const existingId = byHandle.get(article.handle);
  if (existingId) {
    const data = await gql(
      `mutation update($id: ID!, $article: ArticleUpdateInput!) {
        articleUpdate(id: $id, article: $article) {
          article { id }
          userErrors { field message }
        }
      }`,
      { id: existingId, article: articleFields(article) }
    );
    if (userErrors(data.articleUpdate, article.title)) return null;
    console.log(`  = ${article.title}`);
    return existingId;
  }
  const data = await gql(
    `mutation create($article: ArticleCreateInput!) {
      articleCreate(article: $article) {
        article { id handle }
        userErrors { field message }
      }
    }`,
    { article: { blogId, handle: article.handle, ...articleFields(article) } }
  );
  if (userErrors(data.articleCreate, article.title)) return null;
  console.log(`  + ${article.title}`);
  return data.articleCreate.article.id;
}

// --- navigation ----------------------------------------------------------------

async function ensureMenuItem() {
  const data = await gql(`{ menus(first: 20) { nodes { id handle title items { id title type url resourceId } } } }`);
  const menu =
    data.menus.nodes.find((m) => m.handle === 'main-menu') ?? data.menus.nodes[0];
  if (!menu) {
    console.log('  ⚠ no menus found, skipping navigation');
    return null;
  }
  const journalUrl = `/blogs/${BLOG.handle}`;
  const existing = menu.items.find((i) => i.url === journalUrl);
  if (existing) {
    console.log(`  = menu item exists: ${existing.title}`);
    return existing.id;
  }
  const items = [
    ...menu.items.map((i) => ({
      id: i.id,
      title: i.title,
      type: i.type,
      ...(i.resourceId ? { resourceId: i.resourceId } : { url: i.url }),
    })),
    { title: 'Journal', type: 'HTTP', url: journalUrl },
  ];
  const result = await gql(
    `mutation update($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) {
      menuUpdate(id: $id, title: $title, items: $items) {
        menu { items { id title url } }
        userErrors { field message }
      }
    }`,
    { id: menu.id, title: menu.title, items }
  );
  if (userErrors(result.menuUpdate, 'menu')) return null;
  const added = result.menuUpdate.menu.items.find((i) => i.url === journalUrl);
  console.log(`  + menu item added: Journal (${menu.handle})`);
  return added?.id ?? null;
}

// --- run -----------------------------------------------------------------------

console.log('Blog:');
const blogId = await ensureBlog();

console.log('\nArticles:');
const byHandle = await existingArticles(blogId);
const articleIds = new Map();
for (const article of ARTICLES) {
  const id = await ensureArticle(blogId, byHandle, article);
  if (id) articleIds.set(article.handle, id);
  await sleep(250);
}

console.log('\nNavigation:');
const menuItemId = await ensureMenuItem();

console.log('\nTranslations (uk):');
await registerTranslations(blogId, LOCALE, { title: BLOG.uk.title }, `blog: ${BLOG.uk.title}`);
for (const article of ARTICLES) {
  const id = articleIds.get(article.handle);
  if (!id || !article.uk) continue;
  await registerTranslations(
    id,
    LOCALE,
    {
      title: article.uk.title,
      body_html: article.uk.body,
      summary_html: article.uk.summary,
    },
    article.handle
  );
  await sleep(200);
}
if (menuItemId) {
  // Menu items are translated as Link resources (same numeric id).
  const linkId = menuItemId.replace('/MenuItem/', '/Link/');
  await registerTranslations(linkId, LOCALE, { title: 'Журнал' }, 'menu: Journal → Журнал');
}

console.log(`\nDone: ${articleIds.size}/${ARTICLES.length} articles in /blogs/${BLOG.handle}.`);
