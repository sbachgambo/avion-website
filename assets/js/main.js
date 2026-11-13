/* Avion Partners Limited — site script (no dependencies) */
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    var closeMenu = function () { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("is-open") && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Background images: loaded only when they come near the screen (saves mobile data),
  // and only applied once the file has loaded, so the gradient stays if an image is missing
  function loadBg(el) {
    var src = el.getAttribute("data-bg");
    var img = new Image();
    img.onload = function () {
      var current = getComputedStyle(el).backgroundImage;
      el.style.backgroundImage = 'url("' + src + '")' + (el.hasAttribute("data-bg-keep") && current !== "none" ? ", " + current : "");
    };
    img.src = src;
  }
  var bgs = document.querySelectorAll("[data-bg]");
  if ("IntersectionObserver" in window) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loadBg(e.target); bo.unobserve(e.target); } });
    }, { rootMargin: "300px 0px" });
    bgs.forEach(function (el) { bo.observe(el); });
  } else {
    bgs.forEach(loadBg);
  }

  // Image fallback: if a logo/certificate image is missing, show its name as text instead of a broken icon
  function fallback(img) {
    if (img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = "1";
    if (img.hasAttribute("data-hide-on-error")) { img.style.display = "none"; var m = img.parentNode.querySelector(".brand__mark"); if (m) m.style.display = "grid"; return; }
    var span = document.createElement("span");
    span.className = "fallback-text";
    span.textContent = img.getAttribute("data-fallback") || img.alt || "";
    img.replaceWith(span);
  }
  document.querySelectorAll("img[data-fallback], img[data-hide-on-error]").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) fallback(img);
    img.addEventListener("error", function () { fallback(img); });
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Animated counters
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10), start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { co.observe(c); });
  }

  // Certificate lightbox
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img"), lbCap = lb.querySelector(".lightbox__caption"), lbClose = lb.querySelector(".lightbox__close"), lbOpener = null;
    document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        if (!img) return; // image missing
        lbImg.src = btn.getAttribute("data-lightbox");
        lbImg.alt = img.alt;
        lbCap.textContent = (btn.getAttribute("data-title") || "") + " · Copy from year of issue; current certificate available on request";
        lbOpener = btn;
        lb.classList.add("is-open");
        if (lbClose) lbClose.focus();
      });
    });
    function closeLb() {
      if (!lb.classList.contains("is-open")) return;
      lb.classList.remove("is-open");
      if (lbOpener) lbOpener.focus();
    }
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lightbox__close")) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
      if (e.key === "Tab" && lb.classList.contains("is-open") && lbClose) { e.preventDefault(); lbClose.focus(); } // keep focus inside the viewer
    });
  }

  // Back to top
  var top = document.querySelector(".to-top");
  if (top) {
    window.addEventListener("scroll", function () { top.classList.toggle("is-visible", window.scrollY > 600); }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
})();
