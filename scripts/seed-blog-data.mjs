/**
 * Sample blog for the Ropel development store.
 *
 * Follows the seed-data.mjs conventions: English is the primary content
 * language, `uk` blocks hold the Ukrainian translations. Article images
 * reuse the catalog photography from seed-data.mjs (matched by product
 * handle) so every hotlink is already known to resolve.
 */

import { PRODUCTS } from './seed-data.mjs';

export const AUTHOR = 'Ropel';

export const BLOG = {
  handle: 'journal',
  title: 'Journal',
  uk: { title: 'Журнал' },
};

const imageOf = (productHandle) => {
  const product = PRODUCTS.find((p) => p.handle === productHandle);
  if (!product) throw new Error(`seed-blog-data: no product with handle "${productHandle}"`);
  return { url: product.image, altText: product.imageAlt };
};

export const ARTICLES = [
  {
    handle: 'wool-coat-care',
    title: 'How to Care for a Wool Coat',
    tags: ['care', 'wool'],
    publishDate: '2026-02-05T09:00:00Z',
    image: imageOf('wool-coat-forma-01'),
    summary:
      'A good coat is a ten-year purchase. Most of that decade is decided not by the mill but by how you treat it between wears.',
    body: `<p>A good coat is a ten-year purchase. Most of that decade is decided not by the mill that wove the cloth but by how the coat is treated between wears.</p>
<h2>After each wear</h2>
<p>Hang it on a wide wooden hanger the moment you take it off — the shoulders of a coat hold its entire architecture. Leave it outside the wardrobe for an hour: wool needs to release moisture before being shut in the dark. Brush it down with a natural-bristle brush, always in the direction of the nap.</p>
<h2>Once a season</h2>
<p>Dry-clean at most once or twice a year; solvents wash the natural lanolin out of the fibre and the cloth goes flat. For local marks, a damp cloth and patience beat the machine. Air the coat outdoors on a dry, overcast day instead.</p>
<h2>In summer</h2>
<p>Clean it before storing — moths are drawn to what you can't see, not the wool itself. Use a breathable garment bag, never plastic, and a block of cedar rather than mothballs. Fold nothing; a coat lives on its hanger.</p>`,
    uk: {
      title: 'Як доглядати за вовняним пальтом',
      summary:
        'Гарне пальто — покупка на десять років. Більшість цього десятиліття вирішує не фабрика, а те, як ви поводитеся з ним між носіннями.',
      body: `<p>Гарне пальто — покупка на десять років. Більшість цього десятиліття вирішує не фабрика, що виткала тканину, а те, як ви поводитеся з пальтом між носіннями.</p>
<h2>Після кожного носіння</h2>
<p>Повісьте його на широкі дерев'яні плечики, щойно зняли: плечі пальта тримають усю його архітектуру. Залиште на годину поза шафою — вовна має віддати вологу, перш ніж опинитися в темряві. Пройдіться щіткою з натуральним ворсом, завжди за напрямком ворсу тканини.</p>
<h2>Раз на сезон</h2>
<p>Хімчистка — щонайбільше раз-два на рік: розчинники вимивають із волокна природний ланолін, і тканина «сідає». Локальні плями краще прибрати вологою серветкою і терпінням. Замість чистки провітрюйте пальто надворі в сухий похмурий день.</p>
<h2>Влітку</h2>
<p>Перед зберіганням почистіть: міль приваблює не вовна, а те, чого не видно. Використовуйте чохол, що дихає, — ніколи не поліетилен, — і брусок кедра замість нафталіну. Нічого не складайте: пальто живе на плечиках.</p>`,
    },
  },
  {
    handle: 'trench-history',
    title: 'The Trench: A Hundred Years of One Cut',
    tags: ['history', 'outerwear'],
    publishDate: '2026-02-19T09:00:00Z',
    image: imageOf('cotton-trench-linia'),
    summary:
      'Few garments survive a century without redesign. The trench did it by being finished from the start.',
    body: `<p>Few garments survive a century without a redesign. The trench coat did it by being, in a sense, finished from the start: a working garment where every detail had a job.</p>
<p>The storm flap shed rain off the shoulders. The D-rings on the belt carried equipment. The deep back vent let a man walk fast through mud. When the coat left the trenches for the street in the 1920s, nothing needed to be added — only the context changed.</p>
<p>That is the quiet lesson of the trench: ornament ages, function does not. The coats that look dated today are the ones that decorated the pattern; the ones that still look right kept the original logic and simply refined the cloth.</p>
<p>Our «Line» trench follows that reading. No epaulettes, no gun flap — the details that carried meaning only in uniform — just the clean shoulder, the detachable belt and a dense cotton with a water-repellent finish. A hundred years on, the cut needs no explaining.</p>`,
    uk: {
      title: 'Тренч: сто років одного крою',
      summary:
        'Мало який одяг проживає століття без редизайну. Тренчу це вдалося, бо він від початку був завершеним.',
      body: `<p>Мало який одяг проживає століття без редизайну. Тренчу це вдалося, бо він у певному сенсі від початку був завершеним: робочий одяг, де кожна деталь мала функцію.</p>
<p>Кокетка-навіс відводила дощ із плечей. D-кільця на поясі тримали спорядження. Глибока шлиця ззаду дозволяла швидко йти багнюкою. Коли у 1920-х пальто перейшло з окопів на вулицю, додавати нічого не довелося — змінився лише контекст.</p>
<p>У цьому тихий урок тренча: орнамент старіє, функція — ні. Застарілими сьогодні виглядають ті пальта, що декорували лекало; досі доречні ті, що зберегли первісну логіку й просто вдосконалили тканину.</p>
<p>Наш тренч «Лінія» йде за цим прочитанням. Без погонів, без стрілецького клапана — деталей, що мали сенс лише в уніформі, — тільки чиста лінія плеча, знімний пояс і щільна бавовна з водовідштовхувальним просоченням. Через сто років цей крій не потребує пояснень.</p>`,
    },
  },
  {
    handle: 'overshirt-third-layer',
    title: 'The Overshirt: A Layer Between Shirt and Jacket',
    tags: ['wardrobe', 'outerwear'],
    publishDate: '2026-03-05T09:00:00Z',
    image: imageOf('overshirt-robocha'),
    summary:
      'The most useful piece in a transitional wardrobe is the one that refuses to be either a shirt or a jacket.',
    body: `<p>The most useful piece in a transitional wardrobe is the one that refuses to pick a side. The overshirt is cut like a shirt, weighs like a light jacket, and does the work of both from March to May and again from September to November.</p>
<p>Its origin is workwear: a hard-wearing cotton layer thrown over the shirt to keep it clean, with patch pockets sized for tools rather than phones. The proportions that made it practical — a straight hem you can leave untucked, a collar that sits flat, room through the shoulders — are exactly what make it easy to wear now.</p>
<p>Worn open over a tee, it reads as a jacket. Buttoned to the top under a coat, it behaves like a shirt. The heavier the twill, the further it moves toward outerwear; ours is dense enough to hold its shape yet soft enough to roll the sleeves.</p>
<p>One rule keeps it right: the overshirt should be the roughest layer you are wearing. Put it over fine knitwear or a crisp poplin shirt and the contrast does the styling for you.</p>`,
    uk: {
      title: 'Куртка-сорочка: шар між сорочкою і курткою',
      summary:
        'Найкорисніша річ міжсезонного гардероба — та, що відмовляється бути або сорочкою, або курткою.',
      body: `<p>Найкорисніша річ міжсезонного гардероба — та, що відмовляється обирати сторону. Куртка-сорочка скроєна як сорочка, важить як легка куртка і працює за обох із березня по травень і знову з вересня по листопад.</p>
<p>Її походження — робочий одяг: зносостійкий бавовняний шар поверх сорочки, щоб та лишалася чистою, з накладними кишенями під інструменти, а не телефони. Пропорції, що робили її практичною, — прямий низ, який можна не заправляти, комір, що лежить пласко, простір у плечах — саме те, що робить її зручною тепер.</p>
<p>Розстебнута поверх футболки, вона читається як куртка. Застебнута до верху під пальтом — поводиться як сорочка. Що щільніший твіл, то ближче вона до верхнього одягу; наш достатньо щільний, щоб тримати форму, і достатньо м'який, щоб підкотити рукави.</p>
<p>Одне правило тримає все на місці: куртка-сорочка має бути найгрубішим шаром на вас. Одягніть її поверх тонкого трикотажу чи хрусткої поплінової сорочки — і контраст зробить стилістику за вас.</p>`,
    },
  },
  {
    handle: 'merino-no-itch',
    title: "Merino: Why It Doesn't Itch",
    tags: ['fabric', 'wool'],
    publishDate: '2026-03-19T09:00:00Z',
    image: imageOf('merino-sweater-okruhlyi'),
    summary:
      'The itch of a bad sweater is not an allergy and not the wool. It is geometry.',
    body: `<p>The itch of a bad sweater is not an allergy, and it is not «the wool». It is geometry. A wool fibre behaves like a tiny beam: past a certain thickness it does not bend when it touches skin — it pokes. The threshold sits around 30 microns.</p>
<p>Merino sheep grow fibre at 16–24 microns. At that diameter the fibre buckles on contact instead of pressing in, and the nerve endings register nothing. This is the whole secret: not softeners, not treatments — just a fibre too fine to stand its ground against skin.</p>
<p>Fineness is graded: anything under 19.5 microns is sold as extra-fine, and that is the yarn we knit our «Round» sweater from. The trade-off is real — finer fibre means a gentler garment but asks for gentler washing.</p>
<ul>
<li>Wash cold on the wool cycle, or by hand, with wool detergent.</li>
<li>Never tumble-dry; dry flat on a towel, reshaped by hand.</li>
<li>Pilling in the first weeks is loose fibre ends, not a defect — a cashmere comb removes them for good.</li>
</ul>`,
    uk: {
      title: 'Меринос: чому він не колеться',
      summary:
        'Колючість поганого светра — не алергія і не «вовна». Це геометрія.',
      body: `<p>Колючість поганого светра — не алергія і не «вовна як така». Це геометрія. Вовняне волокно поводиться як крихітна балка: після певної товщини воно не згинається від дотику до шкіри, а тисне. Поріг — близько 30 мікронів.</p>
<p>Мериносові вівці дають волокно 16–24 мікрони. За такого діаметра волокно при контакті прогинається, а не впирається, і нервові закінчення нічого не реєструють. У цьому весь секрет: не пом'якшувачі й не обробки — просто волокно, надто тонке, щоб протистояти шкірі.</p>
<p>Тонкість має градації: усе, що тонше за 19,5 мікрона, продається як extra-fine — саме з такої пряжі ми в'яжемо светр «Округлий». Компроміс реальний: тонше волокно означає делікатнішу річ і делікатніше прання.</p>
<ul>
<li>Періть у холодній воді на режимі «вовна» або руками, засобом для вовни.</li>
<li>Ніколи не сушіть у машині; сушіть горизонтально на рушнику, розправивши руками.</li>
<li>Катишки в перші тижні — це вільні кінці волокон, не брак: гребінець для кашеміру прибирає їх назавжди.</li>
</ul>`,
    },
  },
  {
    handle: 'knitwear-care',
    title: 'Knitwear Care: Washing, Drying, Storing',
    tags: ['care', 'wool'],
    publishDate: '2026-04-02T09:00:00Z',
    image: imageOf('wool-cardigan-ramka'),
    summary:
      'Knitwear rarely wears out. It gets washed out. Three habits decide how a sweater looks in year five.',
    body: `<p>Knitwear rarely wears out — it gets washed out. Wool cleans itself better than most fabrics: it resists odour and sheds dirt once aired. Three habits decide how a sweater looks in its fifth year.</p>
<h2>Wash less, air more</h2>
<p>After wearing, give a sweater a night on a flat surface or over a chair back near an open window. Wash only when it is actually dirty — for most people that is every eighth to tenth wear, not every second.</p>
<h2>Wash like it matters</h2>
<p>Cold water, wool detergent, minimal spin. Skip fabric softener entirely: it coats the fibre and kills its loft. Press the water out in a rolled towel — never wring, never hang wet knitwear, or the shoulders will remember it forever.</p>
<h2>Store folded</h2>
<p>Knitwear is the one category that never goes on a hanger. Fold it on a shelf, heaviest pieces at the bottom. Off-season, add cedar and make sure everything is clean before it goes away — moths choose worn wool over washed every time.</p>`,
    uk: {
      title: 'Догляд за трикотажем: прання, сушіння, зберігання',
      summary:
        'Трикотаж рідко зношується. Його запирають. Три звички вирішують, як светр виглядатиме на п’ятий рік.',
      body: `<p>Трикотаж рідко зношується — його запирають. Вовна чиститься сама краще за більшість тканин: вона не тримає запахів і віддає бруд після провітрювання. Три звички вирішують, як светр виглядатиме на п'ятий рік.</p>
<h2>Періть рідше, провітрюйте частіше</h2>
<p>Після носіння дайте светру ніч на рівній поверхні або на спинці стільця біля відчиненого вікна. Періть лише тоді, коли він справді брудний — для більшості це кожне восьме-десяте носіння, а не кожне друге.</p>
<h2>Періть як слід</h2>
<p>Холодна вода, засіб для вовни, мінімальний віджим. Кондиціонер для білизни — ніколи: він обволікає волокно і вбиває його пружність. Воду віддавіть у згорнутому рушнику; не викручуйте і не вішайте мокрий трикотаж — плечі запам'ятають це назавжди.</p>
<h2>Зберігайте складеним</h2>
<p>Трикотаж — єдина категорія, якій не місце на плечиках. Складайте на полицю, найважче — донизу. У міжсезоння додайте кедр і переконайтеся, що все чисте, перш ніж прибрати: міль завжди обирає ношену вовну, а не випрану.</p>`,
    },
  },
  {
    handle: 'second-layer-principle',
    title: 'The Second Layer: How Layering Actually Works',
    tags: ['wardrobe'],
    publishDate: '2026-04-16T09:00:00Z',
    image: imageOf('turtleneck-druhyi-shar'),
    summary:
      'Layering fails when every layer wants attention. It works when each one has a defined job.',
    body: `<p>Layering fails when every layer wants attention. It works when each layer has one defined job: the first manages skin, the second manages warmth, the third manages weather. Confuse the jobs and you get bulk; respect them and three thin pieces outperform one heavy one.</p>
<p>The second layer is where most wardrobes are thinnest. It must be warm without volume, close-fitting without squeezing, and quiet enough to disappear under a coat's lapel. This is precisely the brief a fine merino turtleneck answers — which is why ours is literally named «Second Layer».</p>
<p>The mechanics are simple: warmth lives in trapped air, not in fabric thickness. Two fine layers hold an insulating gap between them that one thick layer cannot create. This is why a turtleneck under an unlined coat often beats a heavy sweater under the same coat.</p>
<p>A practical order for a cold day: heavy tee, fine turtleneck, wool coat. Each layer slides over the previous one without bunching, and each can be removed indoors without the outfit falling apart.</p>`,
    uk: {
      title: 'Другий шар: як насправді працює багатошаровість',
      summary:
        'Багатошаровість не вдається, коли кожен шар хоче уваги. Вона працює, коли в кожного є чітка робота.',
      body: `<p>Багатошаровість не вдається, коли кожен шар хоче уваги. Вона працює, коли в кожного шару одна чітка робота: перший відповідає за шкіру, другий — за тепло, третій — за погоду. Переплутайте ролі — отримаєте об'єм; поважайте їх — і три тонкі речі переграють одну важку.</p>
<p>Другий шар — найтонше місце більшості гардеробів. Він має бути теплим без об'єму, прилеглим без тиску і достатньо тихим, щоб зникнути під лацканом пальта. Це саме те завдання, на яке відповідає тонкий мериносовий гольф — тому наш буквально називається «Другий шар».</p>
<p>Механіка проста: тепло живе в затриманому повітрі, а не в товщині тканини. Два тонкі шари тримають між собою ізолюючий прошарок, якого один товстий створити не може. Ось чому гольф під пальтом без підкладки часто гріє краще, ніж важкий светр під тим самим пальтом.</p>
<p>Практичний порядок для холодного дня: щільна футболка, тонкий гольф, вовняне пальто. Кожен шар ковзає по попередньому, не збираючись у складки, і кожен можна зняти в приміщенні так, що образ не розсиплеться.</p>`,
    },
  },
  {
    handle: 'heavyweight-cotton',
    title: 'Why 220 gsm: Heavyweight Cotton, Explained',
    tags: ['fabric'],
    publishDate: '2026-04-30T09:00:00Z',
    image: imageOf('heavy-tee-bazys'),
    summary:
      'Grams per square metre is the one number on a tee that predicts how it will look in a year.',
    body: `<p>Grams per square metre — gsm — is the one number on a t-shirt that predicts how it will look in a year. It measures the density of the knit: how much cotton is actually packed into the fabric you are wearing.</p>
<p>Fast-fashion tees sit at 130–160 gsm. They feel soft in the shop and lose the argument at the first wash: the collar waves, the hem twists, the white turns translucent. There is simply not enough material for the garment to hold an opinion.</p>
<p>At 220 gsm, the fabric changes category. The tee drapes instead of clinging, the collar keeps its line, and the shoulder seam sits where the pattern put it. It does not need an undershirt, because it is opaque on its own. This is the weight we knit «Basis» at.</p>
<p>The honest trade-offs: a heavy tee costs more, dries slower, and in real heat a lighter jersey is more comfortable. But as the foundation a wardrobe stands on — under an overshirt, a cardigan, a coat — density is what separates a garment from an expendable.</p>`,
    uk: {
      title: 'Чому 220 г/м²: щільна бавовна без міфів',
      summary:
        'Грами на квадратний метр — єдине число на футболці, яке передбачає, як вона виглядатиме за рік.',
      body: `<p>Грами на квадратний метр — г/м² — єдине число на футболці, яке передбачає, як вона виглядатиме за рік. Воно вимірює щільність полотна: скільки бавовни насправді вкладено у тканину, яку ви носите.</p>
<p>Футболки мас-маркету — це 130–160 г/м². У магазині вони м'які, але програють суперечку першому ж пранню: комір хвилями, низ перекручений, білий колір просвічує. Матеріалу просто замало, щоб річ мала власну думку.</p>
<p>На 220 г/м² тканина змінює категорію. Футболка спадає, а не липне, комір тримає лінію, плечовий шов сидить там, де його поклало лекало. Їй не потрібна білизна під низ — вона непрозора сама по собі. Саме з такою щільністю ми в'яжемо «Базис».</p>
<p>Чесні компроміси: щільна футболка дорожча, довше сохне, а в справжню спеку легше джерсі комфортніше. Але як фундамент, на якому стоїть гардероб, — під курткою-сорочкою, кардиганом, пальтом — саме щільність відрізняє річ від витратного матеріалу.</p>`,
    },
  },
  {
    handle: 'oxford-shirt-fit',
    title: 'How an Oxford Shirt Should Fit',
    tags: ['fit'],
    publishDate: '2026-05-14T09:00:00Z',
    image: imageOf('oxford-shirt-standart'),
    summary:
      'An oxford is not a dress shirt. Judging it by dress-shirt rules ruins both.',
    body: `<p>An oxford is not a dress shirt, and judging it by dress-shirt rules ruins both. The dress shirt is cut to disappear under tailoring; the oxford was cut for sport and is meant to stand on its own. Its fit rules are its own.</p>
<p>Four checkpoints, in order of importance:</p>
<ul>
<li><strong>Shoulder seam</strong> — at the edge of the shoulder bone, or a centimetre past it. This is the one measurement no wash or tailor will fix.</li>
<li><strong>Body</strong> — a full fist of fabric at the waist. An oxford that follows the torso like a knit reads as a size too small.</li>
<li><strong>Sleeve</strong> — cuff at the wrist bone with the arm down, enough length to bend the elbow without the cuff riding up.</li>
<li><strong>Length</strong> — covering the belt when untucked, mid-fly when tucked. Ours is cut to work both ways.</li>
</ul>
<p>One more thing dress-shirt logic gets wrong here: the button-down collar is not meant to be starched flat. Its roll — the soft curve between button and collar point — is the whole point. Wash the shirt, skip the iron on the collar, and let the cotton do what oxford cloth has done since the 1890s: get better.</p>`,
    uk: {
      title: 'Як має сидіти оксфордська сорочка',
      summary:
        'Оксфорд — не класична сорочка. Судити його за правилами класики — зіпсувати обидві.',
      body: `<p>Оксфорд — не класична сорочка, і судити його за правилами класики означає зіпсувати обидві. Класичну сорочку кроять так, щоб вона зникала під костюмом; оксфорд кроїли для спорту, і він має стояти сам по собі. Його правила посадки — власні.</p>
<p>Чотири контрольні точки, за важливістю:</p>
<ul>
<li><strong>Плечовий шов</strong> — на краю плечової кістки або на сантиметр далі. Це єдиний вимір, який не виправить ні прання, ні кравець.</li>
<li><strong>Корпус</strong> — повний кулак тканини на талії. Оксфорд, що облягає торс, як трикотаж, читається як розмір замалий.</li>
<li><strong>Рукав</strong> — манжет на кістці зап'ястя з опущеною рукою, довжини достатньо, щоб зігнути лікоть і манжет не поповз угору.</li>
<li><strong>Довжина</strong> — закриває ремінь навипуск, до середини гульфика заправленою. Наша скроєна так, щоб працювали обидва варіанти.</li>
</ul>
<p>Ще одне, у чому логіка класики тут помиляється: комір button-down не треба прасувати в площину. Його «рол» — м'яка дуга між ґудзиком і кінчиком коміра — і є сенс. Виперіть сорочку, омініть комір праскою і дайте бавовні робити те, що оксфордська тканина робить із 1890-х: ставати кращою.</p>`,
    },
  },
  {
    handle: 'wide-trousers-length',
    title: 'Wide Trousers: Length, Break and Footwear',
    tags: ['fit'],
    publishDate: '2026-05-28T09:00:00Z',
    image: imageOf('wide-trousers-krii-02'),
    summary:
      'A wide trouser lives or dies by one decision: where the hem stops. Everything else is negotiable.',
    body: `<p>A wide trouser lives or dies by one decision: where the hem stops. A slim trouser forgives a centimetre either way — the taper hides it. A wide leg hangs like a plumb line, and the eye reads its length instantly.</p>
<p>The break — how the fabric settles on the shoe — has three honest options. No break: the hem floats just above the shoe, the line stays razor-clean, best with loafers and in warm months. Quarter break: the hem kisses the shoe with a single soft fold; this is the default we cut «Cut 02» to. Full break: a deliberate stack, workable only when the fabric is heavy enough not to crumple.</p>
<p>What a wide leg cannot survive is indecision — a hem hovering between lengths reads as a mistake rather than a choice. When in doubt, go shorter: a clean stop above the shoe always looks intentional.</p>
<p>Footwear follows volume. The trouser needs mass underneath it: a substantial leather shoe, a chunky loafer, a clean wide sneaker. A narrow, pointed shoe under a wide hem makes the silhouette collapse at the ankle — the one place it should stand firm.</p>`,
    uk: {
      title: 'Широкі штани: довжина, злам і взуття',
      summary:
        'Широкі штани живуть або вмирають через одне рішення: де закінчується край. Решта — предмет переговорів.',
      body: `<p>Широкі штани живуть або вмирають через одне рішення: де закінчується край холоші. Вузькі штани прощають сантиметр в обидва боки — звуження його ховає. Широка холоша висить, як висок, і око зчитує її довжину миттєво.</p>
<p>Злам — те, як тканина лягає на взуття, — має три чесні варіанти. Без зламу: край зависає одразу над взуттям, лінія лишається бездоганно чистою; найкраще з лоферами й у теплі місяці. Чверть зламу: край торкається взуття однією м'якою складкою — це той стандарт, під який ми кроїмо «Крій 02». Повний злам: свідоме нагромадження, яке працює лише тоді, коли тканина достатньо важка, щоб не жмакатися.</p>
<p>Чого широка холоша не переживе — це нерішучості: край, що завис між довжинами, читається як помилка, а не вибір. Сумніваєтеся — беріть коротше: чиста зупинка над взуттям завжди виглядає навмисною.</p>
<p>Взуття йде за об'ємом. Штанам потрібна маса під ними: ґрунтовне шкіряне взуття, масивний лофер, чистий широкий кросівок. Вузький гострий черевик під широким краєм змушує силует осісти на щиколотці — єдиному місці, де він має стояти твердо.</p>`,
    },
  },
  {
    handle: 'canvas-no-logos',
    title: 'Canvas: One Material, No Logos',
    tags: ['fabric'],
    publishDate: '2026-06-11T09:00:00Z',
    image: imageOf('canvas-bag-polotno'),
    summary:
      'Undyed cotton canvas does something leather and nylon cannot: it records its owner.',
    body: `<p>Undyed cotton canvas does something neither leather nor nylon can: it records its owner. Every crease, every softened edge, every shade the fabric takes on is a note about where the bag has been. A canvas tote at year three is a document; a nylon one is just older.</p>
<p>The material earned its keep at sea. Sailcloth had to be woven so densely that wind could not pass through it — the same tight plain weave that now lets a tote carry a week of groceries without complaint. Density, not treatment, is what makes good canvas: ours is heavy enough to stand upright empty.</p>
<p>We leave it undyed for the same reason we skip the logo. Natural cotton is not a colour so much as a starting point — it darkens at the handles, fades on the flat, and ends up a shade no dye house could specify. A print would only interrupt the process.</p>
<p>Care is nearly nothing: brush off dry dirt, spot-clean with cold water and soap, air-dry. A full machine wash once a year at most — and expect the bag to come out a little softer and a little more yours.</p>`,
    uk: {
      title: 'Канвас: один матеріал, жодних логотипів',
      summary:
        'Нефарбований бавовняний канвас уміє те, чого не вміють шкіра й нейлон: він записує свого власника.',
      body: `<p>Нефарбований бавовняний канвас уміє те, чого не вміють ні шкіра, ні нейлон: він записує свого власника. Кожна складка, кожен пом'якшений край, кожен відтінок, якого набирає тканина, — нотатка про те, де побувала сумка. Канвасна сумка на третій рік — документ; нейлонова — просто старша.</p>
<p>Матеріал заробив собі репутацію в морі. Парусину ткали так щільно, щоб крізь неї не проходив вітер, — те саме щільне полотняне переплетення тепер дозволяє сумці нести тижневий запас продуктів без нарікань. Саме щільність, а не просочення, робить канвас добрим: наш достатньо важкий, щоб порожня сумка стояла.</p>
<p>Ми лишаємо його нефарбованим з тієї ж причини, з якої обходимося без логотипа. Натуральна бавовна — не так колір, як відправна точка: вона темніє на ручках, вигорає на площинах і зрештою набуває відтінку, якого не пропише жодна фарбувальня. Принт лише перервав би цей процес.</p>
<p>Догляд майже нульовий: струсіть сухий бруд, локально почистіть холодною водою з милом, висушіть на повітрі. Повне прання в машині — щонайбільше раз на рік; і чекайте, що сумка вийде трохи м'якшою і трохи більше вашою.</p>`,
    },
  },
  {
    handle: 'palette-without-accent',
    title: 'A Palette Without an Accent Colour',
    tags: ['wardrobe'],
    publishDate: '2026-06-25T09:00:00Z',
    image: imageOf('wool-scarf-smuha'),
    summary:
      'Remove the accent colour and a wardrobe does not go silent. It starts speaking in texture.',
    body: `<p>Remove the accent colour and a wardrobe does not go silent — it starts speaking in texture. This is the premise our whole palette is built on: black, ecru, camel, grey, sand. Five notes, no chorus.</p>
<p>A limited palette works because it moves the contrast elsewhere. When nothing shouts in colour, the eye starts reading surfaces: the grain of wool flannel against smooth merino, the dry hand of canvas against dense cotton jersey. An outfit in three shades of grey can carry more information than one built around a red scarf — it is just written in a quieter alphabet.</p>
<p>The practical benefit is combinatorial. Every piece in a five-colour system matches every other piece; a wardrobe of twenty items yields more working outfits than a colourful wardrobe of forty. Getting dressed stops being a matching problem.</p>
<p>Two rules keep a neutral outfit from going flat. Vary temperature: camel and sand are warm, grey and black are cool, and one of each gives the eye a seam to hold onto. And vary depth — pairing a light layer over a dark one, or the reverse, does the structural work an accent colour used to do.</p>`,
    uk: {
      title: 'Палітра без акцентного кольору',
      summary:
        'Приберіть акцентний колір — і гардероб не замовкне. Він заговорить фактурою.',
      body: `<p>Приберіть акцентний колір — і гардероб не замовкне. Він заговорить фактурою. На цьому засновано всю нашу палітру: чорний, екрю, кемел, сірий, пісочний. П'ять нот, жодного приспіву.</p>
<p>Обмежена палітра працює, бо переносить контраст в інше місце. Коли ніщо не кричить кольором, око починає читати поверхні: зерно вовняної фланелі проти гладкого мериносу, суху фактуру канвасу проти щільного бавовняного джерсі. Образ у трьох відтінках сірого може нести більше інформації, ніж образ, побудований навколо червоного шарфа, — просто він написаний тихішою абеткою.</p>
<p>Практична вигода — комбінаторна. У системі з п'яти кольорів кожна річ пасує до кожної; гардероб із двадцяти речей дає більше робочих образів, ніж строкатий із сорока. Одягання перестає бути задачею на підбір.</p>
<p>Два правила рятують нейтральний образ від пласкості. Змінюйте температуру: кемел і пісочний — теплі, сірий і чорний — холодні, і по одному з кожних дає оку шов, за який можна зачепитися. І змінюйте глибину: світлий шар поверх темного чи навпаки виконує ту структурну роботу, яку раніше робив акцентний колір.</p>`,
    },
  },
  {
    handle: 'six-panel-history',
    title: 'Six Panels: The Cap That Outlived Trends',
    tags: ['history'],
    publishDate: '2026-07-02T09:00:00Z',
    image: imageOf('six-panel-cap'),
    summary:
      'The six-panel cap has kept the same pattern for over a century. What changed is everything around it.',
    body: `<p>The six-panel cap has kept essentially the same pattern for over a century: six triangular panels meeting at a button, a stiffened brim, a strap at the back. What changed is everything around it — the fabrics, the context, and who was allowed to wear one indoors.</p>
<p>The construction is why it survived. Six panels follow the curve of a head more honestly than any moulded shape; the crown breaks in like a shoe, taking the wearer's form within weeks. A five-panel sits flatter and sportier, a trucker cap adds mesh and noise — the six-panel remains the quiet default.</p>
<p>Its migration mirrors the trench's: from pure function — sun out of a fielder's eyes — through decades of team branding, to a plain object that finishes an outfit. The version that aged best is the least specific one: dense cotton, no embroidery, hardware doing the only talking.</p>
<p>That is the version we make. A metal buckle instead of plastic snaps, a brim you can shape by hand, and nothing on the front panel at all. A cap, it turns out, does not need to say anything to say enough.</p>`,
    uk: {
      title: 'Шість клинів: кепка, що пережила тренди',
      summary:
        'Шестиклинка тримає те саме лекало понад століття. Змінилося все навколо неї.',
      body: `<p>Шестиклинка тримає по суті те саме лекало понад століття: шість трикутних клинів, що сходяться до ґудзика, жорсткий козирок, ремінець ззаду. Змінилося все навколо — тканини, контекст і те, кому дозволено було не знімати її в приміщенні.</p>
<p>Конструкція — причина її виживання. Шість клинів повторюють криву голови чесніше за будь-яку формовану модель; наголовок розношується, як взуття, і за кілька тижнів набирає форму власника. П'ятиклинка сидить пласкіше і спортивніше, кепка-тракер додає сітку й галас — шестиклинка лишається тихим стандартом.</p>
<p>Її міграція повторює шлях тренча: від чистої функції — сонце з очей польового гравця — через десятиліття командного брендингу до простого предмета, який завершує образ. Найкраще постаріла найменш конкретна версія: щільна бавовна, без вишивки, говорить лише фурнітура.</p>
<p>Саме таку ми й робимо. Металева пряжка замість пластикових кнопок, козирок, якому можна надати форму руками, і геть нічого на передньому клині. Виявляється, кепці не треба нічого казати, щоб сказати достатньо.</p>`,
    },
  },
];
