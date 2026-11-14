import { CategoryName, CustomerReview, Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_zyraa_editorial_1794637514882.jpg';
export const SPECIAL_OFFER_IMAGE = '/src/assets/images/offer_atelier_collection_1794637516097.jpg';

export interface CategoryMeta {
  name: CategoryName;
  subtitle: string;
  image: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    name: "Women's Fashion",
    subtitle: 'Tailored silk & outerwear',
    image: '/src/assets/images/prod_womens_trench_1794637515610.jpg',
  },
  {
    name: "Men's Fashion",
    subtitle: 'Structured wool & knitwear',
    image: '/src/assets/images/prod_mens_blazer_1794637516512.jpg',
  },
  {
    name: 'Shoes',
    subtitle: 'Italian leather & suede',
    image: '/src/assets/images/prod_shoes_loafers_1794637517822.jpg',
  },
  {
    name: 'Bags',
    subtitle: 'Architectural silhouettes',
    image: '/src/assets/images/prod_bag_tote_1794637518627.jpg',
  },
  {
    name: 'Accessories',
    subtitle: 'Timepieces & eyewear',
    image: '/src/assets/images/prod_acc_watch_1794637519231.jpg',
  },
  {
    name: 'Beauty and Skincare',
    subtitle: 'Botanical daily rituals',
    image: '/src/assets/images/prod_beauty_serum_1794637519904.jpg',
  },
  {
    name: 'Electronics',
    subtitle: 'Acoustic studio essentials',
    image: '/src/assets/images/prod_tech_headphones_1794637521089.jpg',
  },
  {
    name: 'Home and Lifestyle',
    subtitle: 'Travertine & ceramic objects',
    image: '/src/assets/images/prod_home_vase_1794637520601.jpg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'zyr-wf-01',
    name: 'Belted Silk-Blend Trench Coat',
    category: "Women's Fashion",
    description:
      'Cut for an effortless drape from water-repellent silk-cotton twill, this champagne trench features storm flaps, horn-toned buckles, and a breathable cupro lining for transitional weather.',
    details: [
      '62% Organic Cotton, 38% Mulberry Silk',
      'Detachable tonal waist belt with stitched loops',
      'Concealed welt pockets and storm-flap collar',
      'Dry clean only; tailored in Milan',
    ],
    originalPrice: 360,
    discountedPrice: 288,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 142,
    images: [
      '/src/assets/images/prod_womens_trench_1794637515610.jpg',
      '/src/assets/images/hero_zyraa_editorial_1794637514882.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Beige', hex: '#D8C5AD' },
      { name: 'Noir Black', hex: '#1C1B1A' },
      { name: 'Soft Stone', hex: '#E5DDD3' },
    ],
    collections: ['new-arrival', 'best-seller'],
    inStock: true,
    tag: 'New Season',
  },
  {
    id: 'zyr-wf-02',
    name: 'Satin Wrap Midi Dress',
    category: "Women's Fashion",
    description:
      'Fluid blush satin meets crisp French seam tailoring. Designed with an adjustable waist tie and elongated cuffs that move gracefully from gallery openings to evening dining.',
    details: [
      '100% Heavyweight Eco-Vero Satin',
      'True wrap silhouette with internal anchor button',
      'Lined bodice with fluid A-line skirt',
      'Delicate cold hand wash',
    ],
    originalPrice: 240,
    discountedPrice: 179,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 98,
    images: [
      '/src/assets/images/prod_womens_dress_1794637516858.jpg',
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Soft Blush', hex: '#E8C5BA' },
      { name: 'Warm Ivory', hex: '#F4EFE8' },
      { name: 'Espresso Noir', hex: '#231F1E' },
    ],
    collections: ['trending', 'special-offer'],
    inStock: true,
    tag: 'Atelier Edit',
  },
  {
    id: 'zyr-mf-01',
    name: 'Tailored Wool-Linen Blazer',
    category: "Men's Fashion",
    description:
      'An unlined, softly structured two-button jacket woven from breathable virgin wool and Belgian linen. Sharp lapels pair effortlessly with fine-gauge knitwear or crisp shirting.',
    details: [
      '70% Virgin Wool, 30% Belgian Linen',
      'Half-canvas chest construction for natural drape',
      'Dual rear vents and interior passport pockets',
      'Relaxed contemporary fit',
    ],
    originalPrice: 395,
    discountedPrice: 316,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 84,
    images: [
      '/src/assets/images/prod_mens_blazer_1794637516512.jpg',
      '/src/assets/images/prod_mens_overshirt_1794637517274.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Matte Black', hex: '#191919' },
      { name: 'Warm Sand', hex: '#CFC2B2' },
    ],
    collections: ['best-seller', 'new-arrival'],
    inStock: true,
    tag: 'Signature Fit',
  },
  {
    id: 'zyr-mf-02',
    name: 'Oatmeal Merino Wool Overshirt',
    category: "Men's Fashion",
    description:
      'Woven from brushed Australian merino wool in a lofty twill weave, this architectural overshirt works as a mid-layer under winter coats or as a standalone outer jacket.',
    details: [
      '100% Traceable Merino Wool (420gsm)',
      'Genuine corozo nut buttons',
      'Twin chest patch pockets with side seam handwarmers',
      'Soft brushed finish',
    ],
    originalPrice: 225,
    discountedPrice: 180,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 67,
    images: [
      '/src/assets/images/prod_mens_overshirt_1794637517274.jpg',
      '/src/assets/images/prod_mens_blazer_1794637516512.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Melange', hex: '#DDD3C4' },
      { name: 'Charcoal', hex: '#2B2927' },
    ],
    collections: ['new-arrival', 'trending'],
    inStock: true,
  },
  {
    id: 'zyr-sh-01',
    name: 'Calfskin Architectural Penny Loafers',
    category: 'Shoes',
    description:
      'Bench-made in Tuscany from full-grain box calfskin with a Blake-stitched leather sole and cushioned vegetable-tanned footbed for all-day urban poise.',
    details: [
      '100% Italian Box Calfskin upper',
      'Supple glove-leather lining',
      'Stacked leather heel with rubber grip inset',
      'Includes dust bags and cedar care card',
    ],
    originalPrice: 310,
    discountedPrice: 248,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 119,
    images: [
      '/src/assets/images/prod_shoes_loafers_1794637517822.jpg',
      '/src/assets/images/prod_shoes_sneakers_1794637518105.jpg',
    ],
    sizes: ['EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    colors: [
      { name: 'Obsidian Black', hex: '#141414' },
      { name: 'Warm Espresso', hex: '#4B362C' },
    ],
    collections: ['best-seller'],
    inStock: true,
    tag: 'Crafted in Italy',
  },
  {
    id: 'zyr-sh-02',
    name: 'Sand Suede Court Sneakers',
    category: 'Shoes',
    description:
      'Low-profile minimalist trainers combining water-resistant Italian suede with tonal nappa leather panels and a vulcanized cream cupsole.',
    details: [
      'Velvety calf suede and smooth nappa leather',
      'Waxed organic cotton laces',
      'Removable memory-foam orthotic insole',
      'Hand-stitched sidewall construction',
    ],
    originalPrice: 230,
    discountedPrice: 184,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 156,
    images: [
      '/src/assets/images/prod_shoes_sneakers_1794637518105.jpg',
      '/src/assets/images/prod_shoes_loafers_1794637517822.jpg',
    ],
    sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43'],
    colors: [
      { name: 'Sand & Ivory', hex: '#C7AF95' },
      { name: 'Chalk White', hex: '#F3EFEA' },
    ],
    collections: ['new-arrival', 'trending'],
    inStock: true,
  },
  {
    id: 'zyr-bg-01',
    name: 'Pebbled Leather Geometric Tote',
    category: 'Bags',
    description:
      'An architectural everyday carryall crafted from supple full-grain pebbled leather. Features structured top handles, magnetic bridge closure, and a padded 14-inch laptop sleeve.',
    details: [
      'Full-grain pebble-textured cowhide leather',
      'Microsuede interior with zippered security pocket',
      'Protective metal base studs',
      'Fits up to 14-inch laptop and daily essentials',
    ],
    originalPrice: 420,
    discountedPrice: 336,
    discountPercent: 20,
    rating: 5.0,
    reviewCount: 203,
    images: [
      '/src/assets/images/prod_bag_tote_1794637518627.jpg',
      '/src/assets/images/hero_zyraa_editorial_1794637514882.jpg',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Matte Black', hex: '#181818' },
      { name: 'Taupe Beige', hex: '#B8A898' },
    ],
    collections: ['best-seller', 'trending'],
    inStock: true,
    tag: 'Iconic Carry',
  },
  {
    id: 'zyr-bg-02',
    name: 'Blush Structured Crossbody Bag',
    category: 'Bags',
    description:
      'Compact yet spacious saddle-inspired silhouette in soft blush calfskin, finished with custom brushed champagne-gold clasp hardware and a detachable chain-link leather strap.',
    details: [
      'Smooth vegetable-tanned calf leather',
      'Brushed champagne-gold lock closure',
      'Dual internal compartments and card slot',
      'Adjustable drop length: 48cm to 56cm',
    ],
    originalPrice: 290,
    discountedPrice: 217,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 112,
    images: [
      '/src/assets/images/prod_bag_crossbody_1794637519701.jpg',
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Soft Blush', hex: '#DFB6AB' },
      { name: 'Cream Ivory', hex: '#EFE9E1' },
      { name: 'Classic Black', hex: '#1C1C1C' },
    ],
    collections: ['new-arrival', 'special-offer'],
    inStock: true,
  },
  {
    id: 'zyr-ac-01',
    name: 'Brushed Gold Dress Watch & Eyewear Set',
    category: 'Accessories',
    description:
      'A refined pairing of our 38mm Swiss-quartz dress watch on Italian pebbled leather and hand-finished tortoiseshell bio-acetate sunglasses with polarized UV400 lenses.',
    details: [
      'Sapphire crystal lens with 5ATM water resistance',
      'Italian calfskin quick-release strap',
      'Plant-based cellulose acetate sunglasses frame',
      'Presented in a travertine-toned gift box',
    ],
    originalPrice: 340,
    discountedPrice: 255,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 74,
    images: [
      '/src/assets/images/prod_acc_watch_1794637519231.jpg',
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
    ],
    sizes: ['38mm / Standard'],
    colors: [
      { name: 'Brushed Gold / Black', hex: '#B9985A' },
      { name: 'Silver / Sand', hex: '#B8B5B0' },
    ],
    collections: ['trending', 'special-offer'],
    inStock: true,
    tag: 'Collector Set',
  },
  {
    id: 'zyr-bs-01',
    name: 'Botanical Glow Serum & Barrier Cream Duo',
    category: 'Beauty and Skincare',
    description:
      'Cold-pressed rosehip, squalane, and niacinamide botanical facial serum paired with a ceramide-rich daily moisturizer. Formulated for luminous, calm skin without synthetic fragrance.',
    details: [
      '30ml Botanical Facial Serum + 50ml Daily Moisturizer',
      'Dermatologist tested, vegan, and cruelty-free',
      'Recyclable frosted glass and ceramic packaging',
      'Suitable for sensitive and dry skin types',
    ],
    originalPrice: 135,
    discountedPrice: 108,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 245,
    images: [
      '/src/assets/images/prod_beauty_serum_1794637519904.jpg',
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
    ],
    sizes: ['Full Set (30ml + 50ml)', 'Travel Duo'],
    colors: [{ name: 'Rosehip Botanical', hex: '#E3BCB3' }],
    collections: ['best-seller', 'new-arrival'],
    inStock: true,
    tag: 'Clean Formula',
  },
  {
    id: 'zyr-el-01',
    name: 'Studio ANC Wireless Headphones',
    category: 'Electronics',
    description:
      'Precision-milled anodized aluminum earcups wrapped in breathable lambskin memory foam. Delivers 40-hour battery life, adaptive noise cancellation, and studio-calibrated acoustic clarity.',
    details: [
      '40mm custom beryllium acoustic drivers',
      'Bluetooth 5.3 with multipoint pairing & USB-C lossless audio',
      'Up to 40 hours playback with quick 10-min charge',
      'Includes woven linen travel hardcase',
    ],
    originalPrice: 380,
    discountedPrice: 299,
    discountPercent: 21,
    rating: 4.8,
    reviewCount: 188,
    images: [
      '/src/assets/images/prod_tech_headphones_1794637521089.jpg',
      '/src/assets/images/prod_acc_watch_1794637519231.jpg',
    ],
    sizes: ['Standard'],
    colors: [
      { name: 'Warm Sand Aluminum', hex: '#D3C3AD' },
      { name: 'Anodized Obsidian', hex: '#202020' },
    ],
    collections: ['trending', 'best-seller'],
    inStock: true,
    tag: 'Studio Sound',
  },
  {
    id: 'zyr-hl-01',
    name: 'Sculptural Amphora Vase & Fig Candle',
    category: 'Home and Lifestyle',
    description:
      'Wheel-thrown stoneware amphora in matte limestone glaze paired with our Sanctuary soy wax candle scented with sandalwood, warm fig, and cedar.',
    details: [
      'Hand-finished matte stoneware vase (26cm height)',
      '240g pure soy wax candle (55-hour burn time)',
      'Brushed oak lid doubles as a coaster',
      'Handcrafted in small studio batches',
    ],
    originalPrice: 148,
    discountedPrice: 118,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 91,
    images: [
      '/src/assets/images/prod_home_vase_1794637520601.jpg',
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
    ],
    sizes: ['2-Piece Set'],
    colors: [
      { name: 'Raw Limestone', hex: '#EAE3D7' },
      { name: 'Warm Travertine', hex: '#D5C7B6' },
    ],
    collections: ['new-arrival', 'special-offer'],
    inStock: true,
  },
  {
    id: 'zyr-hl-02',
    name: 'Atelier Cashmere & Silk Travel Edit',
    category: 'Home and Lifestyle',
    description:
      'A curated 4-piece weekend ensemble combining an ultra-soft Mongolian cashmere knit, blush mulberry silk scarf, pebble leather cardholder, and Oak & Amber eau de parfum.',
    details: [
      '100% Grade-A Inner Mongolian Cashmere knit',
      'Hand-rolled 100% Mulberry Silk blush scarf',
      'Full-grain black leather bifold wallet',
      '50ml Oak & Amber Eau de Parfum',
    ],
    originalPrice: 480,
    discountedPrice: 360,
    discountPercent: 25,
    rating: 5.0,
    reviewCount: 64,
    images: [
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
      '/src/assets/images/prod_beauty_serum_1794637519904.jpg',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Camel & Blush Edit', hex: '#D4B9A5' }],
    collections: ['special-offer', 'trending'],
    inStock: true,
    tag: 'Save 25%',
  },
  {
    id: 'zyr-ac-02',
    name: 'Mulberry Silk Blush Atelier Scarf',
    category: 'Accessories',
    description:
      'Lustrous 16-momme mulberry silk square scarf finished with artisanal hand-rolled edges in ZYRAA’s signature soft blush tone.',
    details: [
      '100% Grade 6A Mulberry Silk (90cm × 90cm)',
      'Hand-rolled and stitched hems',
      'Breathable all-season drape',
      'Arrives in archival linen sleeve',
    ],
    originalPrice: 120,
    discountedPrice: 96,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 53,
    images: [
      '/src/assets/images/offer_atelier_collection_1794637516097.jpg',
      '/src/assets/images/prod_womens_dress_1794637516858.jpg',
    ],
    sizes: ['90cm × 90cm'],
    colors: [
      { name: 'Blush Rose', hex: '#E6C2B8' },
      { name: 'Champagne Ivory', hex: '#EDE5DA' },
    ],
    collections: ['new-arrival'],
    inStock: true,
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Ananya Deshmukh',
    location: 'Mumbai',
    productName: 'Belted Silk-Blend Trench Coat',
    rating: 5,
    comment:
      'Replaced three synthetic coats in my wardrobe with this single piece. The silk-cotton drape holds its tailored shape even after long flights.',
    date: 'October 2026',
  },
  {
    id: 'rev-2',
    author: 'Marcus Lindqvist',
    location: 'Copenhagen',
    productName: 'Studio ANC Wireless Headphones',
    rating: 5,
    comment:
      'Usually wireless headphones feel plasticky, but the warm sand aluminum finish and balanced acoustic profile match my studio monitors.',
    date: 'October 2026',
  },
  {
    id: 'rev-3',
    author: 'Claire Moreau',
    location: 'Lyon',
    productName: 'Pebbled Leather Geometric Tote',
    rating: 5,
    comment:
      'Carries my 14-inch laptop, sketchbook, and skincare pouch daily without losing its clean architectural silhouette. Truly timeless craft.',
    date: 'September 2026',
  },
];
