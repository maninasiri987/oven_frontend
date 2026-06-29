document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();
  updateIcons(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  // Mobile menu
  var menuBtn = document.getElementById('menu-btn');
  var menuClose = document.getElementById('menu-close');
  var menuOverlay = document.getElementById('menu-overlay');
  var menuPanel = document.getElementById('menu-panel');
  var mobileMenu = document.getElementById('mobile-menu');
  var mainContent = document.getElementById('main-content');

  function openMenu() {
    menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
    menuOverlay.classList.add('opacity-100', 'pointer-events-auto');
    menuPanel.classList.remove('translate-x-full');
    menuPanel.classList.add('translate-x-0');
    mobileMenu.classList.remove('pointer-events-none');
    mobileMenu.classList.add('pointer-events-auto');
    mainContent.classList.add('blur-sm');
  }

  function closeMenu() {
    menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    menuOverlay.classList.add('opacity-0', 'pointer-events-none');
    menuPanel.classList.remove('translate-x-0');
    menuPanel.classList.add('translate-x-full');
    mobileMenu.classList.remove('pointer-events-auto');
    mobileMenu.classList.add('pointer-events-none');
    mainContent.classList.remove('blur-sm');
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  // Scroll reveal with staggered delays
  var revealElements = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function checkReveal() {
    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        var delay = el.dataset.delay || 0;
        setTimeout(function () {
          el.classList.add('visible');
        }, delay);
      }
    });
  }

  if (!prefersReducedMotion) {
    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal();
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // FAQ accordion — one open at a time, smooth height + opacity
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.faq-trigger');
    var content = item.querySelector('.faq-content');
    var chevron = item.querySelector('.faq-chevron');
    if (!trigger || !content) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        var c = i.querySelector('.faq-content');
        var ch = i.querySelector('.faq-chevron');
        if (c) { c.style.maxHeight = '0'; c.style.opacity = '0'; }
        if (ch) ch.style.transform = '';
      });
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Estimate calculator
  var estimatePrompt = document.getElementById('estimate-prompt');
  var estimateBody = document.getElementById('estimate-body');
  var planFast = document.getElementById('plan-fast');
  var planPro = document.getElementById('plan-pro');
  var featuresFast = document.querySelectorAll('.feature-fast');
  var featuresPro = document.querySelectorAll('.feature-pro');
  var featuresFastBox = document.getElementById('features-fast');
  var featuresProBox = document.getElementById('features-pro');
  var firstTime = document.getElementById('first-time');
  var estimateResult = document.getElementById('estimate-result');

  var prices = {
    fast: { base: 6900000, seo: 2490000, sections: 1490000, pages: 590000, blog: 990000, support: 790000, animation: 1190000 },
    pro: { base: 24900000, admin: 3900000, seo: 3900000, multilang: 2900000, animation: 2490000, custom: 6900000 }
  };

  function formatPrice(n) {
    return n.toLocaleString('fa-IR') + ' تومان';
  }

  function showEstimateBody() {
    if (estimatePrompt) estimatePrompt.classList.add('hidden');
    if (estimateBody) estimateBody.classList.remove('hidden');
  }

  function updateEstimate() {
    if (!estimateResult) return;
    var isFast = planFast && planFast.checked;
    var isPro = planPro && planPro.checked;
    if (!isFast && !isPro) {
      estimateResult.textContent = 'یک پلن انتخاب کنید';
      return;
    }
    var total = 0;
    if (isFast) {
      total = prices.fast.base;
      featuresFast.forEach(function (f) {
        if (f.checked && prices.fast[f.dataset.key]) total += prices.fast[f.dataset.key];
      });
      if (firstTime && firstTime.checked) total = Math.round(total * 0.85);
    } else {
      total = prices.pro.base;
      featuresPro.forEach(function (f) {
        if (f.checked && prices.pro[f.dataset.key]) total += prices.pro[f.dataset.key];
      });
    }
    estimateResult.textContent = formatPrice(total);
  }

  if (planFast) planFast.addEventListener('change', function () {
    showEstimateBody();
    if (featuresFastBox) featuresFastBox.classList.remove('hidden');
    if (featuresProBox) featuresProBox.classList.add('hidden');
    featuresPro.forEach(function (f) { f.checked = false; });
    updateEstimate();
  });
  if (planPro) planPro.addEventListener('change', function () {
    showEstimateBody();
    if (featuresProBox) featuresProBox.classList.remove('hidden');
    if (featuresFastBox) featuresFastBox.classList.add('hidden');
    featuresFast.forEach(function (f) { f.checked = false; });
    if (firstTime) firstTime.checked = false;
    updateEstimate();
  });

  featuresFast.forEach(function (f) { f.addEventListener('change', updateEstimate); });
  featuresPro.forEach(function (f) { f.addEventListener('change', updateEstimate); });
  if (firstTime) firstTime.addEventListener('change', updateEstimate);
});
