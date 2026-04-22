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
