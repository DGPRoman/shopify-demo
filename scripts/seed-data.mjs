/**
 * Sample catalog for the Ropel development store.
 *
 * English is the store's primary content language; `uk` blocks hold the
 * Ukrainian translations registered by translate.mjs. Prices are defined
 * per currency; seed.mjs picks the one matching the shop currency.
 * Photos: Unsplash (free license), hotlinked via images.unsplash.com.
 */

export const VENDOR = 'Ropel';

export const COLLECTIONS = [
  {
    handle: 'outerwear',
    title: 'Outerwear',
    productType: 'Outerwear',
    description: 'Coats, trenches and jackets in straight silhouettes — the pieces an outfit starts with.',
    uk: {
      title: 'Верхній одяг',
      description: 'Пальта, тренчі та куртки прямих силуетів — речі, з яких починається образ.',
    },
  },
  {
    handle: 'knitwear',
    title: 'Knitwear',
    productType: 'Knitwear',
    description: 'Merino and wool with no prints or logos. Only shape, colour and texture.',
    uk: {
      title: 'Трикотаж',
      description: 'Меринос і вовна без принтів та логотипів. Тільки форма, колір і фактура.',
    },
  },
  {
    handle: 'essentials',
    title: 'Essentials',
    productType: 'Essentials',
    description: 'The everyday wardrobe base: tees, shirts and trousers.',
    uk: {
      title: 'Основа',
      description: 'Базові речі щоденного гардероба: футболки, сорочки, штани.',
    },
  },
  {
    handle: 'accessories',
    title: 'Accessories',
    productType: 'Accessories',
    description: 'Bags, scarves and caps made of natural materials.',
    uk: {
      title: 'Аксесуари',
      description: 'Сумки, шарфи та кепки з натуральних матеріалів.',
    },
  },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const img = (path) => `https://images.unsplash.com/${path}&w=1600&q=80&fm=jpg&fit=max`;

export const PRODUCTS = [
  {
    handle: 'wool-coat-forma-01',
    title: 'Form 01 Wool Coat',
    productType: 'Outerwear',
    tags: ['wool', 'new-collection'],
    description:
      'A single-breasted straight-cut coat in Italian wool. Minimal seams, a concealed placket, two inner pockets. Pieces in this line are made in small batches.',
    uk: {
      title: 'Пальто вовняне «Форма 01»',
      description:
        'Однобортне пальто прямого крою з італійської вовни. Мінімум швів, прихована застібка, два внутрішні відділення. Речі цієї лінії шиються малими партіями.',
    },
    sku: 'RPL-OUT-01',
    price: { EUR: '190', USD: '210', UAH: '7900' },
    sizes: SIZES,
    colors: ['Black', 'Camel'],
    image: img('photo-1619603364937-8d7af41ef206?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29hdCUyMGxvb2tib29rJTIwbmV1dHJhbHxlbnwwfDF8fHwxNzgzMzU0MjU5fDA&ixlib=rb-4.1.0'),
    imageAlt: 'Camel wool coat over a tonal turtleneck, studio shot',
  },
  {
    handle: 'cotton-trench-linia',
    title: 'Line Cotton Trench',
    productType: 'Outerwear',
    tags: ['cotton', 'new-collection'],
    description:
      'A classic trench with no extra details: a clean shoulder line, detachable belt, dense cotton with a water-repellent finish.',
    uk: {
      title: 'Тренч бавовняний «Лінія»',
      description:
        'Класичний тренч без зайвих деталей: чиста лінія плеча, знімний пояс, щільна бавовна з водовідштовхувальним просоченням.',
    },
    sku: 'RPL-OUT-02',
    price: { EUR: '150', USD: '165', UAH: '6200' },
    compareAtPrice: { EUR: '180', USD: '198', UAH: '7400' },
    sizes: SIZES,
    colors: ['Sand', 'Graphite'],
    image: img('photo-1716004354896-8b84c7f08b8b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8dHJlbmNoJTIwY29hdCUyMGJlaWdlJTIwZmFzaGlvbiUyMG1pbmltYWx8ZW58MHwxfHx8MTc4MzM1NDAyNnww&ixlib=rb-4.1.0'),
    imageAlt: 'Sand cotton trench coat worn open',
  },
  {
    handle: 'overshirt-robocha',
    title: 'Work Overshirt',
    productType: 'Outerwear',
    tags: ['cotton'],
    description:
      'An overshirt in dense cotton twill. Patch pockets, horn buttons, a relaxed cut — works both as a light jacket and as a shirt.',
    uk: {
      title: 'Куртка-сорочка «Робоча»',
      description:
        'Куртка-сорочка з щільного бавовняного твілу. Накладні кишені, рогові ґудзики, вільний крій — працює і як верхній шар, і як сорочка.',
    },
    sku: 'RPL-OUT-03',
    price: { EUR: '105', USD: '115', UAH: '4400' },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Olive', 'Black'],
    image: img('photo-1687102923144-325062a1087a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8b3ZlcnNoaXJ0JTIwb2xpdmUlMjBqYWNrZXQlMjBtZW5zd2VhcnxlbnwwfDF8fHwxNzgzMzU0MDI5fDA&ixlib=rb-4.1.0'),
    imageAlt: 'Olive cotton overshirt, studio portrait',
  },
  {
    handle: 'merino-sweater-okruhlyi',
    title: 'Round Merino Sweater',
    productType: 'Knitwear',
    tags: ['wool', 'bestseller'],
    description:
      'A sweater in extra-fine merino wool. Crew neck, dropped shoulder, ribbed trims. No itch, and it keeps its shape after washing.',
    uk: {
      title: 'Светр мериносовий «Округлий»',
      description:
        'Светр із мериносової вовни екстратонкого прядіння. Круглий виріз, спущене плече, кант у рубчик. Не колеться і тримає форму після прання.',
    },
    sku: 'RPL-KNT-01',
    price: { EUR: '78', USD: '85', UAH: '3200' },
    sizes: SIZES,
    colors: ['Ecru', 'Grey Melange', 'Black'],
    image: img('photo-1574201635302-388dd92a4c3f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y3JlYW0lMjBrbml0JTIwc3dlYXRlciUyMG1pbmltYWx8ZW58MHwxfHx8MTc4MzM1NDAzMXww&ixlib=rb-4.1.0'),
    imageAlt: 'Ecru knit sweater on a light background',
  },
  {
    handle: 'wool-cardigan-ramka',
    title: 'Frame Wool Cardigan',
    productType: 'Knitwear',
    tags: ['wool'],
    description:
      'A straight-silhouette cardigan with natural horn buttons. Deep pockets and a dense knit that holds warmth without bulk.',
    uk: {
      title: 'Кардиган вовняний «Рамка»',
      description:
        'Кардиган прямого силуету на ґудзиках з натурального рогу. Глибокі кишені, щільна в’язка — тримає тепло без об’єму.',
    },
    sku: 'RPL-KNT-02',
    price: { EUR: '88', USD: '95', UAH: '3600' },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Graphite'],
    image: img('photo-1683315565563-f72590773805?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y2FtZWwlMjBjYXJkaWdhbiUyMGtuaXR3ZWFyfGVufDB8MXx8fDE3ODMzNTQwMzR8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Camel wool cardigan flat lay',
  },
  {
    handle: 'turtleneck-druhyi-shar',
    title: 'Second Layer Turtleneck',
    productType: 'Knitwear',
    tags: ['wool', 'bestseller'],
    description:
      'A fine merino turtleneck — the base second layer under a shirt, sweater or coat. Fits close and keeps its stretch.',
    uk: {
      title: 'Гольф тонкий «Другий шар»',
      description:
        'Тонкий гольф із мериносу — базовий другий шар під сорочку, светр або пальто. Щільно прилягає, не втрачає еластичності.',
    },
    sku: 'RPL-KNT-03',
    price: { EUR: '58', USD: '64', UAH: '2400' },
    sizes: SIZES,
    colors: ['Black', 'Ecru'],
    image: img('photo-1758922584983-82ffd5720c6a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YmxhY2slMjB0dXJ0bGVuZWNrJTIwbWluaW1hbCUyMHBvcnRyYWl0fGVufDB8MXx8fDE3ODMzNTQwMzd8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Black merino turtleneck, minimal portrait',
  },
  {
    handle: 'heavy-tee-bazys',
    title: 'Basis Heavy Tee',
    productType: 'Essentials',
    tags: ['cotton', 'bestseller'],
    description:
      'A tee in 220 gsm organic cotton. The collar keeps its shape, the fabric doesn’t show through, and it settles to fit after the first wash.',
    uk: {
      title: 'Футболка щільна «Базис»',
      description:
        'Футболка з органічної бавовни щільністю 220 г/м². Тримає форму коміра, не просвічує, сідає по фігурі після першого прання.',
    },
    sku: 'RPL-ESS-01',
    price: { EUR: '24', USD: '26', UAH: '950' },
    sizes: SIZES,
    colors: ['White', 'Black', 'Grey Melange'],
    image: img('photo-1643104896927-813af6d10f8a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cGxhaW4lMjB0LXNoaXJ0JTIwbW9kZWwlMjBzdHVkaW8lMjBuZXV0cmFsfGVufDB8MXx8fDE3ODMzNTQxNTh8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Heavy cotton tee, studio shot with backdrop',
  },
  {
    handle: 'oxford-shirt-standart',
    title: 'Standard Oxford Shirt',
    productType: 'Essentials',
    tags: ['cotton'],
    description:
      'A relaxed-fit oxford shirt with a button-down collar. Dense textured cotton that only gets softer with time.',
    uk: {
      title: 'Сорочка оксфордська «Стандарт»',
      description:
        'Оксфордська сорочка вільного крою з ґудзиками на комірі. Щільна фактурна бавовна, яка з часом стає тільки м’якшою.',
    },
    sku: 'RPL-ESS-02',
    price: { EUR: '52', USD: '56', UAH: '2100' },
    sizes: SIZES,
    colors: ['White', 'Light Blue'],
    image: img('photo-1516429466290-d6aa21743434?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8YnV0dG9uJTIwc2hpcnQlMjBoYW5naW5nJTIwbWluaW1hbCUyMGxpZ2h0fGVufDB8MXx8fDE3ODMzNTQxNjB8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Light blue shirt on a hanger against a white wall',
  },
  {
    handle: 'wide-trousers-krii-02',
    title: 'Cut 02 Wide Trousers',
    productType: 'Essentials',
    tags: ['wool', 'new-collection'],
    description:
      'Wide trousers in wool flannel with a high waist and a single pleat. They hold the line and stay uncreased through the day.',
    uk: {
      title: 'Штани широкі «Крій 02»',
      description:
        'Широкі штани з вовняної фланелі, посадка на талії, одна защипка. Тримають лінію та не мнуться протягом дня.',
    },
    sku: 'RPL-ESS-03',
    price: { EUR: '68', USD: '74', UAH: '2800' },
    sizes: SIZES,
    colors: ['Black', 'Sand'],
    image: img('photo-1627130697816-4d71dbfe6a5b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YmVpZ2UlMjB0cm91c2VycyUyMG1pbmltYWwlMjBmYXNoaW9ufGVufDB8MXx8fDE3ODMzNTQwNDR8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Sand wide trousers, minimal street look',
  },
  {
    handle: 'canvas-bag-polotno',
    title: 'Canvas Tote',
    productType: 'Accessories',
    tags: ['cotton', 'bestseller'],
    description:
      'A roomy tote in undyed cotton canvas with webbing handles. Inner zip pocket, reinforced bottom.',
    uk: {
      title: 'Сумка «Полотно»',
      description:
        'Містка сумка з непофарбованого бавовняного канвасу з ремінними ручками. Внутрішня кишеня на блискавці, дно з посиленням.',
    },
    sku: 'RPL-ACC-01',
    price: { EUR: '60', USD: '65', UAH: '2450' },
    colors: ['Natural', 'Black'],
    image: img('photo-1544816155-12df9643f363?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y2FudmFzJTIwdG90ZSUyMGJhZyUyMG1pbmltYWx8ZW58MHwxfHx8MTc4MzM1NDA0N3ww&ixlib=rb-4.1.0'),
    imageAlt: 'Natural canvas tote bag on a light grey wall',
  },
  {
    handle: 'wool-scarf-smuha',
    title: 'Stripe Wool Scarf',
    productType: 'Accessories',
    tags: ['wool'],
    description:
      'A long scarf in soft wool with minimally finished edges. One colour, one texture — nothing extra.',
    uk: {
      title: 'Шарф вовняний «Смуга»',
      description:
        'Довгий шарф із м’якої вовни з мінімальною обробкою країв. Один колір, одна фактура — нічого зайвого.',
    },
    sku: 'RPL-ACC-02',
    price: { EUR: '32', USD: '35', UAH: '1300' },
    colors: ['Grey', 'Camel'],
    image: img('photo-1765100577037-dd0fa6f6c476?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8d29vbCUyMHNjYXJmJTIwbWluaW1hbCUyMGJlaWdlfGVufDB8MXx8fDE3ODMzNTQwNDl8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Cream wool scarf over a light coat',
  },
  {
    handle: 'six-panel-cap',
    title: 'Six-Panel Cap',
    productType: 'Accessories',
    tags: ['cotton'],
    description:
      'A six-panel cap in dense cotton with no embroidery or patches. Metal buckle, adjustable fit.',
    uk: {
      title: 'Кепка «Шість клинів»',
      description:
        'Шестиклинка з щільної бавовни без вишивок і нашивок. Металева пряжка, регулювання по обхвату.',
    },
    sku: 'RPL-ACC-03',
    price: { EUR: '27', USD: '29', UAH: '1100' },
    compareAtPrice: { EUR: '34', USD: '37', UAH: '1400' },
    colors: ['Black', 'Sand'],
    image: img('photo-1643308002690-4d7735999545?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cGxhaW4lMjBjYXAlMjBiZWlnZSUyMG1pbmltYWwlMjBoZWFkfGVufDB8MXx8fDE3ODMzNTQxNjN8MA&ixlib=rb-4.1.0'),
    imageAlt: 'Beige six-panel cap on a model, light background',
  },
];

/** Main navigation: catalog root + one item per collection. */
export const MAIN_MENU_ITEMS = (collectionIds) => [
  { title: 'Catalog', type: 'HTTP', url: '/collections/all' },
  ...COLLECTIONS.map((c) => ({
    title: c.title,
    type: 'COLLECTION',
    resourceId: collectionIds[c.handle],
  })),
];

/** Ukrainian titles for the main menu items, keyed by English title. */
export const MENU_TITLES_UK = {
  Catalog: 'Каталог',
  Outerwear: 'Верхній одяг',
  Knitwear: 'Трикотаж',
  Essentials: 'Основа',
  Accessories: 'Аксесуари',
};
