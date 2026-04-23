// Velvet & Cradle — main.js

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Scroll reveal ---
const revealEls = document.querySelectorAll(
  '.editorial-card, .product-card, .collection-item, .article-hero-content, .spotlight-content'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// --- Toggle shop panel (mobile) ---
function toggleShop(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? '' : '';
}

// --- Subscribe form ---
function handleSubscribe(e) {
  e.preventDefault();
  const msg = document.getElementById('subscribe-msg');
  if (msg) {
    msg.textContent = 'Welcome to the Sanctuary. ✦';
    e.target.reset();
  }
}

// --- Sticky Shop Bar ---
function initStickyShopBar() {
  const stickyBar = document.querySelector('.sticky-shop-bar');
  const shopBarData = window.shopBarProducts;

  if (!stickyBar || !shopBarData) return;

  // Inject products data
  const productsContainer = stickyBar.querySelector('.sticky-shop-bar__products');
  if (productsContainer) {
    productsContainer.innerHTML = shopBarData.map(product => `
      <a href="${product.affiliate_link}" class="sticky-shop-bar__product" target="_blank" rel="noopener">
        <img src="${product.image_url}" alt="${product.name}" class="sticky-shop-bar__image">
        <div class="sticky-shop-bar__content">
          <h3 class="sticky-shop-bar__name">${product.name}</h3>
          <button type="button" class="sticky-shop-bar__button">View</button>
        </div>
      </a>
    `).join('');
  }

  // Scroll listener
  let lastScrollY = 0;
  let ticking = false;

  function updateStickyBar() {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.article-hero');
    const shopSection = document.querySelector('.shop-the-look');

    let shouldShow = false;

    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      shouldShow = scrollY > heroBottom;
    } else if (shopSection) {
      const shopTop = shopSection.offsetTop;
      shouldShow = scrollY > shopTop - window.innerHeight;
    }

    stickyBar.classList.toggle('sticky-shop-bar--visible', shouldShow);
    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateStickyBar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
}

// Initialize sticky shop bar when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStickyShopBar);
} else {
  initStickyShopBar();
}

// --- Search Functionality ---
const searchData = [
  {
    "title": "The Curator's Eye: Decorating with Intention",
    "url": "blog-curators-eye.html",
    "excerpt": "Every object in a room tells a story. Here's how to ensure yours is worth reading.",
    "keywords": [
      "access",
      "affiliate",
      "amp",
      "archival",
      "baby",
      "beautiful",
      "best",
      "bound",
      "brass",
      "brass picture frame set",
      "ceramic",
      "chosen",
      "classic",
      "commission",
      "cost",
      "countless",
      "cover",
      "cradle",
      "cream",
      "curated",
      "curation",
      "curator",
      "curators",
      "decisions",
      "decorating",
      "demonstrate",
      "designer",
      "directly",
      "each",
      "early",
      "earn",
      "effortless",
      "effortlessness",
      "ensure",
      "every",
      "exclusive",
      "explore",
      "eye",
      "family",
      "feel",
      "fine",
      "finish",
      "frame",
      "glaze",
      "guides",
      "handthrown",
      "handthrown ceramic vase set",
      "heights",
      "heirloom",
      "helps",
      "inbox",
      "inspiration",
      "intention",
      "intentional",
      "journal",
      "linen",
      "linen bound baby journal",
      "maple",
      "may",
      "modern",
      "natural",
      "nursery",
      "object",
      "own",
      "paper",
      "perfect",
      "picture",
      "pieces",
      "principles",
      "print",
      "pull",
      "purchases",
      "qualifying",
      "quality",
      "reading",
      "receive",
      "reserved",
      "result",
      "rights",
      "room",
      "sanctuary",
      "selections",
      "set",
      "shop",
      "sizes",
      "spaces",
      "story",
      "style",
      "support",
      "tells",
      "the",
      "these",
      "this",
      "thoughtfully",
      "three",
      "together",
      "toy",
      "unlacquered",
      "varying",
      "vase",
      "velvet",
      "vintage",
      "vintage style wooden pull toy",
      "warm",
      "weekly",
      "with",
      "wooden",
      "worth",
      "yours"
    ]
  },
  {
    "title": "Eco-Luxe: Sustainable Foundations",
    "url": "blog-eco-luxe.html",
    "excerpt": "Building a nursery that's both beautiful and kind to the world your child will inherit.",
    "keywords": [
      "access",
      "act",
      "affiliate",
      "air",
      "amp",
      "aren",
      "based",
      "beautiful",
      "both",
      "brands",
      "build",
      "building",
      "built",
      "certified",
      "chemicals",
      "child",
      "choices",
      "colors",
      "comfort",
      "commission",
      "compromises",
      "compromising",
      "content",
      "core",
      "cost",
      "cotton",
      "cradle",
      "create",
      "crib",
      "curated",
      "cushions",
      "derived",
      "designer",
      "directly",
      "durability",
      "each",
      "early",
      "earn",
      "eco",
      "ecoluxe",
      "ethical",
      "exclusive",
      "explore",
      "family",
      "fiber",
      "fine",
      "finish",
      "foams",
      "foundation",
      "foundations",
      "free",
      "fsc",
      "fsc certified oak crib",
      "gassing",
      "global",
      "gots",
      "guarantees",
      "guides",
      "hardwood",
      "harmful",
      "helps",
      "honors",
      "inbox",
      "indoor",
      "inherit",
      "inspiration",
      "kind",
      "latex",
      "luxe",
      "luxury",
      "manufacturing",
      "materials",
      "mattress",
      "mattresses",
      "may",
      "modern",
      "most",
      "natural",
      "natural rubber teether set",
      "neutrals",
      "non",
      "non-toxic paint tester set",
      "nontoxic",
      "nursery",
      "oak",
      "off",
      "offer",
      "organic",
      "organic cotton mattress",
      "paint",
      "paints",
      "pieces",
      "plant",
      "plantations",
      "print",
      "prove",
      "provides",
      "purchases",
      "pure",
      "qualifying",
      "quality",
      "receive",
      "reserved",
      "responsible",
      "revolutionary",
      "rich",
      "rights",
      "rival",
      "rubber",
      "sanctuary",
      "sap",
      "set",
      "shop",
      "softer",
      "sophisticated",
      "sourced",
      "spaces",
      "standard",
      "superior",
      "support",
      "sustainability",
      "sustainable",
      "sustainably",
      "synthetic",
      "teether",
      "tester",
      "textile",
      "textiles",
      "that",
      "these",
      "this",
      "toxic",
      "traditional",
      "tree",
      "velvet",
      "voc",
      "walls",
      "wash",
      "weekly",
      "with",
      "within",
      "without",
      "zero"
    ]
  },
  {
    "title": "Golden Hour Nursery: Chasing Light",
    "url": "blog-golden-hour.html",
    "excerpt": "Harnessing the warmth of golden light to craft a space that glows beautifully throughout the day.",
    "keywords": [
      "access",
      "adding",
      "affiliate",
      "amber",
      "amber glass mobile",
      "amp",
      "beautiful",
      "beautifully",
      "beauty",
      "blanket",
      "blown",
      "brass",
      "brass pendant light",
      "bright",
      "casting",
      "catches",
      "changing",
      "chasing",
      "choose",
      "choosing",
      "commission",
      "cost",
      "cotton",
      "cradle",
      "craft",
      "cream",
      "create",
      "creating",
      "curated",
      "decorative",
      "depth",
      "designer",
      "develop",
      "directly",
      "dresser",
      "early",
      "earn",
      "essentials",
      "everything",
      "evolves",
      "exclusive",
      "explore",
      "family",
      "filter",
      "fine",
      "finish",
      "finishes",
      "fixtures",
      "focal",
      "foundation",
      "glass",
      "glow",
      "glows",
      "golden",
      "grain",
      "guides",
      "hand",
      "hardware",
      "harnessing",
      "harsh",
      "helps",
      "honey",
      "honey oak dresser",
      "hour",
      "inbox",
      "inspiration",
      "into",
      "isn",
      "kind",
      "light",
      "linen",
      "magical",
      "makes",
      "materials",
      "may",
      "mobile",
      "modern",
      "more",
      "most",
      "movement",
      "natural",
      "nursery",
      "oak",
      "oatmeal",
      "objects",
      "organic",
      "overwhelming",
      "painting",
      "patina",
      "pendant",
      "pieces",
      "points",
      "print",
      "provides",
      "purchases",
      "qualifying",
      "receive",
      "reflects",
      "reserved",
      "respond",
      "responding",
      "responds",
      "rights",
      "sanctuary",
      "shade",
      "shadows",
      "shift",
      "shop",
      "softening",
      "solid",
      "something",
      "space",
      "speaks",
      "sun",
      "support",
      "texture",
      "that",
      "these",
      "this",
      "throughout",
      "together",
      "tones",
      "touches",
      "unlacquered",
      "velvet",
      "visible",
      "waffle",
      "waffle weave blanket",
      "warm",
      "warmth",
      "weave",
      "weekly",
      "with",
      "without",
      "work",
      "yellow"
    ]
  },
  {
    "title": "Modern Minimalist: Less is More",
    "url": "blog-modern-minimalist.html",
    "excerpt": "How to create a functional, growth-friendly space using the fundamentals of minimalist sustainable design.",
    "keywords": [
      "access",
      "affiliate",
      "ambient",
      "amp",
      "arc",
      "aren",
      "around",
      "attention",
      "bases",
      "bedroom",
      "blocks",
      "boucl",
      "bouclé nursing chair",
      "building",
      "carefully",
      "ceramic",
      "ceramic arc lamp",
      "certified",
      "chair",
      "changing",
      "child",
      "choose",
      "clean",
      "comfort",
      "commission",
      "competing",
      "consider",
      "convertible",
      "converts",
      "cost",
      "cradle",
      "create",
      "crib",
      "curated",
      "daily",
      "defines",
      "design",
      "designer",
      "directly",
      "double",
      "duty",
      "early",
      "earn",
      "embellishment",
      "embody",
      "ends",
      "ensuring",
      "ergonomic",
      "essential",
      "every",
      "exclusive",
      "explore",
      "family",
      "fibers",
      "fine",
      "fitted",
      "five",
      "form",
      "foundation",
      "friendly",
      "fsc",
      "functional",
      "fundamental",
      "fundamentals",
      "furniture",
      "gentle",
      "glow",
      "gots",
      "growing",
      "growth",
      "guides",
      "handthrown",
      "helps",
      "highest",
      "inbox",
      "inspiration",
      "into",
      "ivory",
      "lamp",
      "landing",
      "late",
      "less",
      "lighting",
      "linen",
      "linen fitted sheet set",
      "lines",
      "look",
      "maple",
      "may",
      "meets",
      "minimalist",
      "modern",
      "moments",
      "more",
      "most",
      "natural",
      "neutral",
      "night",
      "nighttime",
      "nurseries",
      "nursery",
      "nursing",
      "oak",
      "organic",
      "piece",
      "pieces",
      "principles",
      "print",
      "proportions",
      "provide",
      "purchases",
      "qualifying",
      "quality",
      "quiet",
      "receive",
      "reserved",
      "revolves",
      "rights",
      "rituals",
      "sanctuary",
      "scandi",
      "scandi oak crib",
      "seamlessly",
      "selected",
      "set",
      "shade",
      "shades",
      "sheet",
      "shop",
      "shouts",
      "soft",
      "solid",
      "sophisticated",
      "space",
      "speak",
      "storage",
      "support",
      "sustainable",
      "table",
      "texture",
      "that",
      "these",
      "this",
      "thoughtful",
      "tones",
      "transition",
      "treasure",
      "unnecessary",
      "upholstery",
      "using",
      "velvet",
      "visits",
      "visual",
      "warmth",
      "weekly",
      "weight",
      "whispers",
      "with",
      "without",
      "wood"
    ]
  },
  {
    "title": "The Architecture of Quiet: Luxury Nurseries",
    "url": "blog-quiet-nursery.html",
    "excerpt": "How to create a serene luxury nursery through architectural details, warm lighting, and sculptural relief walls that whisper rather than announce.",
    "keywords": [
      "access",
      "achieve",
      "achieves",
      "add",
      "affiliate",
      "amp",
      "announce",
      "announces",
      "applied",
      "architectural",
      "architecture",
      "architectureof",
      "art",
      "atmosphere",
      "backlit",
      "become",
      "beiges",
      "birds",
      "boucl",
      "branch",
      "brass",
      "bring",
      "busy",
      "calm",
      "carefully",
      "chair",
      "chandelier",
      "chandeliers",
      "changes",
      "clean",
      "clouds",
      "comfort",
      "commission",
      "competes",
      "considered",
      "consistent",
      "cost",
      "cradle",
      "cream",
      "cream bouclé lounge chair",
      "creams",
      "create",
      "creates",
      "creating",
      "crib",
      "crystal",
      "curated",
      "curved",
      "decorative",
      "defines",
      "delicate",
      "depth",
      "design",
      "designer",
      "detail",
      "details",
      "differently",
      "directly",
      "don",
      "early",
      "earn",
      "effortless",
      "electric",
      "elements",
      "elevated",
      "empty",
      "essential",
      "essentials",
      "every",
      "excess",
      "exclusive",
      "expensive",
      "explore",
      "family",
      "feel",
      "feels",
      "fine",
      "finish",
      "fixture",
      "fluted",
      "fluted white oak crib",
      "forms",
      "foundation",
      "foundational",
      "functionality",
      "gentle",
      "glow",
      "guides",
      "helps",
      "hidden",
      "inbox",
      "inevitable",
      "inspiration",
      "inspired",
      "installation",
      "integrated",
      "intentional",
      "interpreted",
      "into",
      "isn",
      "key",
      "layering",
      "led",
      "light",
      "lighting",
      "lines",
      "lounge",
      "luxury",
      "maintaining",
      "may",
      "metal",
      "minimal",
      "modern",
      "moments",
      "most",
      "motifs",
      "movement",
      "natural",
      "nature",
      "nurseries",
      "nursery",
      "oak",
      "objects",
      "organic",
      "palette",
      "paneling",
      "part",
      "pattern",
      "peace",
      "peaceful",
      "perfect",
      "personality",
      "pieces",
      "plaster",
      "print",
      "proportions",
      "provide",
      "purchases",
      "qualifying",
      "quiet",
      "rather",
      "receive",
      "reflects",
      "relief",
      "reliefs",
      "relies",
      "rendered",
      "repetition",
      "reserved",
      "restraint",
      "result",
      "rhythm",
      "rights",
      "room",
      "rustic",
      "rustic metal chandelier",
      "sacrificing",
      "same",
      "sanctuary",
      "sculptural",
      "serene",
      "serenity",
      "sets",
      "shadows",
      "shop",
      "side",
      "soft",
      "sources",
      "spaces",
      "sparkle",
      "statements",
      "strips",
      "subtle",
      "support",
      "supports",
      "surface",
      "table",
      "technique",
      "texture",
      "that",
      "the",
      "their",
      "this",
      "through",
      "throughout",
      "transform",
      "trees",
      "true",
      "truly",
      "turn",
      "unified",
      "variation",
      "velvet",
      "vertical",
      "wall",
      "walls",
      "warm",
      "warm brass side table",
      "weave",
      "weekly",
      "whimsy",
      "whisper",
      "whispers",
      "white",
      "whites",
      "with",
      "within",
      "without",
      "wonder"
    ]
  },
  {
    "title": "The Softest Linens: A Material Guide",
    "url": "blog-softest-linens.html",
    "excerpt": "A curation of the finest organic cotton and linen pieces from specialist brands across Europe.",
    "keywords": [
      "access",
      "across",
      "affiliate",
      "amp",
      "antimicrobial",
      "any",
      "baby",
      "balance",
      "bamboo",
      "blanket",
      "blend",
      "both",
      "boucl",
      "bouclé cushion cover",
      "brands",
      "breathability",
      "breathable",
      "brings",
      "carefully",
      "certified",
      "choose",
      "choosing",
      "comfort",
      "commission",
      "conscience",
      "conscious",
      "considered",
      "cost",
      "cotton",
      "count",
      "cover",
      "cradle",
      "cream",
      "create",
      "created",
      "curated",
      "curation",
      "cushion",
      "designer",
      "directly",
      "early",
      "earn",
      "elegance",
      "equal",
      "europe",
      "european",
      "exceptional",
      "exceptionally",
      "exclusive",
      "explore",
      "family",
      "fibers",
      "fine",
      "finest",
      "fitted",
      "flax",
      "functionality",
      "gentle",
      "giant",
      "gots",
      "gots organic fitted sheet",
      "guide",
      "guides",
      "helps",
      "honor",
      "immediate",
      "inbox",
      "incredibly",
      "inspiration",
      "isn",
      "ivory",
      "layers",
      "linen",
      "linens",
      "loose",
      "luxury",
      "management",
      "material",
      "materials",
      "may",
      "mind",
      "modern",
      "moisture",
      "multiple",
      "muslin",
      "muslin swaddle set",
      "natural",
      "naturally",
      "nursery",
      "oatmeal",
      "oeko",
      "offers",
      "options",
      "organic",
      "peace",
      "perfect",
      "pieces",
      "pinnacle",
      "print",
      "provides",
      "purchases",
      "qualifying",
      "ranking",
      "receive",
      "regulating",
      "relaxed",
      "represent",
      "reserved",
      "rights",
      "safety",
      "sanctuary",
      "set",
      "sheet",
      "shop",
      "silk",
      "smoothness",
      "soft",
      "softest",
      "softness",
      "specialist",
      "stonewashed",
      "stonewashed linen blanket",
      "style",
      "superior",
      "support",
      "sustainability",
      "swaddle",
      "swaddling",
      "temperature",
      "tex",
      "textiles",
      "texture",
      "textured",
      "that",
      "the",
      "these",
      "this",
      "thread",
      "three",
      "velvet",
      "warm",
      "weave",
      "weekly",
      "with"
    ]
  },
  {
    "title": "Museum-Grade Nursery Walls",
    "url": "blog-statement-walls.html",
    "excerpt": "A curated study of sculptural nursery walls, architectural reliefs, and museum-grade interiors that transform children's rooms into quietly luxurious spaces.",
    "keywords": [
      "absence",
      "abundance",
      "accent",
      "access",
      "across",
      "add",
      "adds",
      "affiliate",
      "allow",
      "allows",
      "amp",
      "architectural",
      "architecture",
      "around",
      "atmosphere",
      "attention",
      "beautiful",
      "beautifully",
      "because",
      "beige",
      "boucl",
      "brass",
      "breathe",
      "calming",
      "carousel",
      "certainty",
      "chair",
      "children",
      "choose",
      "chooses",
      "chosen",
      "clarity",
      "classical",
      "comfort",
      "commission",
      "compelling",
      "compete",
      "competing",
      "compose",
      "composition",
      "consistently",
      "conviction",
      "cost",
      "cradle",
      "cream",
      "cream bouclé chair",
      "creates",
      "crib",
      "crowded",
      "curated",
      "curation",
      "curator",
      "decorated",
      "decoration",
      "deeply",
      "design",
      "designer",
      "different",
      "directly",
      "disrupting",
      "distracting",
      "dominate",
      "drama",
      "dusty",
      "each",
      "early",
      "earn",
      "edited",
      "editorial",
      "elegant",
      "else",
      "emptiness",
      "enough",
      "every",
      "everything",
      "exclusive",
      "explain",
      "explore",
      "expressed",
      "extends",
      "eye",
      "fall",
      "family",
      "feature",
      "feel",
      "feels",
      "felt",
      "fine",
      "focal",
      "follows",
      "forms",
      "functional",
      "gallery",
      "gently",
      "gesture",
      "given",
      "gives",
      "grade",
      "gradenursery",
      "guides",
      "heirloom",
      "helps",
      "hero",
      "hidden",
      "idea",
      "ideas",
      "image",
      "inbox",
      "inspiration",
      "inspired",
      "instead",
      "interiors",
      "into",
      "knows",
      "land",
      "layer",
      "light",
      "lighting",
      "lines",
      "look",
      "luxurious",
      "luxury",
      "may",
      "modern",
      "mood",
      "more",
      "most",
      "museum",
      "museumgrade",
      "muted",
      "neutral",
      "never",
      "niche",
      "none",
      "nurseries",
      "nursery",
      "oak",
      "ornate",
      "others",
      "ottoman",
      "painted",
      "palette",
      "panel",
      "part",
      "performs",
      "piece",
      "pieces",
      "presence",
      "principles",
      "print",
      "product",
      "proportion",
      "purchases",
      "qualifying",
      "quality",
      "quiet",
      "quietly",
      "rather",
      "recede",
      "receive",
      "refined",
      "relief",
      "reliefs",
      "rely",
      "remembered",
      "repeats",
      "reserved",
      "restraint",
      "return",
      "rights",
      "room",
      "rooms",
      "rose",
      "rounded",
      "rounded oak crib",
      "same",
      "sanctuary",
      "saved",
      "sconce",
      "sconces",
      "sculptural",
      "sculpture",
      "seating",
      "selections",
      "sense",
      "shadow",
      "shared",
      "shop",
      "should",
      "shouts",
      "silence",
      "silent",
      "single",
      "six",
      "soft",
      "soften",
      "softness",
      "space",
      "spaces",
      "statement",
      "structure",
      "study",
      "support",
      "supports",
      "surface",
      "tactile",
      "taupe",
      "textural",
      "that",
      "these",
      "this",
      "thoughtfully",
      "tonal",
      "transform",
      "turn",
      "underfoot",
      "understated",
      "unforgettable",
      "united",
      "variation",
      "velvet",
      "velvet accent ottoman",
      "visual",
      "wall",
      "walls",
      "warm",
      "warm brass wall sconce",
      "weave",
      "weekly",
      "what",
      "why",
      "with",
      "without",
      "work",
      "yet"
    ]
  },
  {
    "title": "Beyond Beige: Tonal Palettes",
    "url": "blog-tonal-palettes.html",
    "excerpt": "Exploring the quiet richness that exists between white and warm — a guide to tonal dressing for rooms.",
    "keywords": [
      "accent",
      "access",
      "add",
      "affiliate",
      "amp",
      "anchor",
      "approachable",
      "architectural",
      "beige",
      "between",
      "beyond",
      "bone",
      "both",
      "brings",
      "calibrated",
      "carefully",
      "ceramic",
      "ceramic accent edit",
      "charcoal",
      "color",
      "commission",
      "complete",
      "complete tonal nursery look",
      "contrast",
      "contrasting",
      "cost",
      "cradle",
      "create",
      "creating",
      "crib",
      "curated",
      "definition",
      "depth",
      "designer",
      "detail",
      "details",
      "directly",
      "distraction",
      "dominance",
      "doses",
      "dramatic",
      "dressing",
      "each",
      "early",
      "earn",
      "earthiness",
      "edit",
      "elements",
      "exclusive",
      "exists",
      "explore",
      "exploring",
      "fabric",
      "family",
      "feel",
      "fine",
      "five",
      "frames",
      "freshness",
      "full",
      "furniture",
      "gradations",
      "greige",
      "grounded",
      "grounding",
      "guide",
      "guides",
      "hardware",
      "harmonious",
      "harmony",
      "heart",
      "heaviness",
      "helps",
      "ideal",
      "inbox",
      "inspiration",
      "interest",
      "ivory",
      "knit",
      "larger",
      "layered",
      "lightest",
      "look",
      "luxurious",
      "maintaining",
      "making",
      "may",
      "modern",
      "moves",
      "need",
      "neutrality",
      "neutrals",
      "nursery",
      "oak",
      "objects",
      "own",
      "palette",
      "palettes",
      "perfect",
      "personality",
      "pieces",
      "power",
      "presence",
      "print",
      "provides",
      "purchases",
      "putty",
      "qualifying",
      "quiet",
      "rather",
      "receive",
      "reserved",
      "richness",
      "rights",
      "room",
      "rooms",
      "sanctuary",
      "sculptural",
      "set",
      "shop",
      "shouts",
      "showcase",
      "signature",
      "softness",
      "sophisticated",
      "sophistication",
      "space",
      "starkness",
      "stone",
      "subtle",
      "support",
      "swatch",
      "swatches",
      "textile",
      "textiles",
      "texture",
      "that",
      "theory",
      "these",
      "this",
      "through",
      "throw",
      "tonal",
      "tonal fabric swatch set",
      "tonal texture edit",
      "tones",
      "treatments",
      "true",
      "velvet",
      "walls",
      "warm",
      "warmth",
      "weekly",
      "weight",
      "whispers",
      "white",
      "whole",
      "window",
      "with",
      "without"
    ]
  },
  {
    "title": "Luxury Neutral Nursery Ideas",
    "url": "editorial.html",
    "excerpt": "Discover the art of the curated sanctuary. We explore how soft textures and a restrained palette create a haven of calm for both parent and child.",
    "keywords": [
      "accent",
      "access",
      "ambient",
      "amp",
      "apartment",
      "armchair",
      "art",
      "artisan",
      "back",
      "base",
      "belongs",
      "beni",
      "blackout",
      "both",
      "brass",
      "brushed",
      "calacatta",
      "calm",
      "cartography",
      "ceiling",
      "century",
      "ceramic",
      "chair",
      "child",
      "collection",
      "considered",
      "convertible",
      "cottons",
      "cradle",
      "cream",
      "create",
      "crib",
      "curated",
      "curved",
      "deep",
      "designer",
      "details",
      "directly",
      "discover",
      "drapes",
      "dresser",
      "early",
      "elegance",
      "embracing",
      "environment",
      "exclusive",
      "explore",
      "family",
      "feels",
      "fine",
      "finish",
      "flower",
      "flower pendant lamp",
      "fosters",
      "generations",
      "globe",
      "glow",
      "glow wall sconce",
      "grand",
      "grounding",
      "guides",
      "hairpin",
      "hand",
      "haven",
      "heirloom",
      "heritage",
      "heritage ceramic lamp",
      "home",
      "honey",
      "ideal",
      "ideas",
      "inbox",
      "inspiration",
      "inspired",
      "lamp",
      "last",
      "legs",
      "light",
      "linen",
      "linen drapes",
      "little",
      "look",
      "loomed",
      "low",
      "lullabies",
      "luxury",
      "made",
      "marble",
      "marble & brass side table",
      "matte",
      "meets",
      "mid",
      "mid-modern crib",
      "midmodern",
      "modern",
      "neutral",
      "neutralnursery",
      "nursery",
      "nursing",
      "oak",
      "olive",
      "olive velvet armchair",
      "oval",
      "palette",
      "panelled",
      "parent",
      "parisian",
      "pendant",
      "piece",
      "pieces",
      "pine",
      "print",
      "quiet",
      "raw",
      "receive",
      "reserved",
      "restrained",
      "rights",
      "rug",
      "sahara",
      "sahara wool rug",
      "sanctuary",
      "scandi",
      "scandi oak crib",
      "sconce",
      "sculptural",
      "sculptural ceramic set",
      "set",
      "shelf",
      "shop",
      "side",
      "silhouette",
      "soft",
      "solid",
      "spaces",
      "stone",
      "stonewashed",
      "style",
      "styling",
      "sustainable",
      "table",
      "textures",
      "that",
      "this",
      "thoughtfully",
      "thrive",
      "timeless",
      "tones",
      "top",
      "unbleached",
      "velvet",
      "vintage",
      "vintage style globe",
      "wall",
      "walls",
      "walnut",
      "walnut oval crib",
      "warm",
      "weekly",
      "white",
      "wood",
      "wool"
    ]
  }
];

function initSearch() {
  const searchButton = document.querySelector('.nav-search');
  const body = document.body;

  if (!searchButton) return;

  // Create search overlay HTML
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.innerHTML = `
    <div class="search-container">
      <button class="search-close" aria-label="Close search">&times;</button>
      <div class="search-input-wrapper">
        <input type="text" class="search-input" placeholder="Search nursery ideas, products, and inspiration..." autocomplete="off">
      </div>
      <div class="search-results"></div>
    </div>
  `;

  body.appendChild(searchOverlay);

  const searchInput = searchOverlay.querySelector('.search-input');
  const searchResults = searchOverlay.querySelector('.search-results');
  const closeButton = searchOverlay.querySelector('.search-close');

  // Open search overlay
  function openSearch() {
    searchOverlay.classList.add('search-overlay--active');
    body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
  }

  // Close search overlay
  function closeSearch() {
    searchOverlay.classList.remove('search-overlay--active');
    body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  // Perform search
  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '';
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results = searchData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
      const excerptMatch = item.excerpt.toLowerCase().includes(normalizedQuery);
      const keywordMatch = item.keywords.some(keyword =>
        keyword.toLowerCase().includes(normalizedQuery) ||
        normalizedQuery.includes(keyword.toLowerCase())
      );

      return titleMatch || excerptMatch || keywordMatch;
    });

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <p>No results found for "${query}"</p>
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Try searching for "minimalist", "luxury", "nursery", or "lighting"</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = results.map(item => `
      <a href="${item.url}" class="search-result-item">
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-excerpt">${item.excerpt}</div>
      </a>
    `).join('');
  }

  // Event listeners
  searchButton.addEventListener('click', openSearch);
  closeButton.addEventListener('click', closeSearch);

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('search-overlay--active')) {
      closeSearch();
    }
  });

  // Close on overlay click (not on content)
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearch);
} else {
  initSearch();
}

// --- Cookie Consent ---
function initCookieConsent() {
  // Check if consent was already given within the last 30 days
  const consentData = localStorage.getItem('velvet-cradle-cookie-consent');
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

  if (consentData) {
    try {
      const consent = JSON.parse(consentData);
      if (consent.timestamp && (Date.now() - consent.timestamp) < thirtyDaysMs) {
        // Enable analytics if user previously accepted all cookies
        if (consent.analytics) {
          enableAnalytics();
        }
        return; // Don't show popup if consent was given within 30 days
      }
    } catch (e) {
      // Handle legacy format - if it's just a timestamp
      if (!isNaN(parseInt(consentData)) && (Date.now() - parseInt(consentData)) < thirtyDaysMs) {
        enableAnalytics(); // Legacy format assumed full consent
        return;
      }
    }
  }

  // Create cookie consent popup HTML
  const cookieConsent = document.createElement('div');
  cookieConsent.className = 'cookie-consent';
  cookieConsent.innerHTML = `
    <div class="cookie-consent__content">
      <h3 class="cookie-consent__title">Cookie Preferences</h3>
      <p class="cookie-consent__text">We use essential cookies for site functionality and analytical cookies to understand how you interact with our design sanctuary. You can choose to accept all or only the necessary cookies.</p>
    </div>
    <div class="cookie-consent__actions">
      <button class="cookie-consent__accept" type="button">Accept All</button>
      <button class="cookie-consent__essential" type="button">Accept Essential Only</button>
      <button class="cookie-consent__settings" type="button">Privacy Policy</button>
    </div>
  `;

  document.body.appendChild(cookieConsent);

  // Show popup with animation after a brief delay
  setTimeout(() => {
    cookieConsent.classList.add('show');
  }, 800);

  // Function to hide popup
  function hideCookiePopup() {
    cookieConsent.classList.add('hide');
    setTimeout(() => {
      if (cookieConsent.parentNode) {
        cookieConsent.parentNode.removeChild(cookieConsent);
      }
    }, 400);
  }

  // Handle Accept All button
  const acceptButton = cookieConsent.querySelector('.cookie-consent__accept');
  acceptButton.addEventListener('click', () => {
    // Store full consent (essential + analytics)
    const consentData = {
      timestamp: Date.now(),
      essential: true,
      analytics: true
    };
    localStorage.setItem('velvet-cradle-cookie-consent', JSON.stringify(consentData));

    // Enable analytics tracking
    enableAnalytics();

    hideCookiePopup();
  });

  // Handle Accept Essential Only button
  const essentialButton = cookieConsent.querySelector('.cookie-consent__essential');
  essentialButton.addEventListener('click', () => {
    // Store essential-only consent
    const consentData = {
      timestamp: Date.now(),
      essential: true,
      analytics: false
    };
    localStorage.setItem('velvet-cradle-cookie-consent', JSON.stringify(consentData));

    // Do NOT enable analytics - only essential cookies
    hideCookiePopup();
  });

  // Handle Privacy Policy link
  const settingsButton = cookieConsent.querySelector('.cookie-consent__settings');
  settingsButton.addEventListener('click', () => {
    // Navigate to privacy policy page
    window.open('privacy-policy.html', '_blank', 'noopener');
  });

  // Optional: Close on escape key (treat as essential only for privacy)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cookieConsent.classList.contains('show')) {
      essentialButton.click(); // Treat escape as essential only
    }
  });
}

// Function to enable analytics tracking
function enableAnalytics() {
  // Check if Google Analytics is already loaded
  if (typeof gtag !== 'undefined') {
    // Enable analytics data collection
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
}

// Initialize Google Analytics with consent denied by default
function initGDPRAnalytics() {
  if (typeof gtag !== 'undefined') {
    // Set default consent to denied for analytics
    gtag('consent', 'default', {
      'analytics_storage': 'denied'
    });
  }
}

// Initialize GDPR analytics and cookie consent when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initGDPRAnalytics();
    initCookieConsent();
  });
} else {
  initGDPRAnalytics();
  initCookieConsent();
}
