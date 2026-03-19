/* ================================================================
   カニ山会 - Main JavaScript
   ================================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Mobile Navigation Toggle
     --------------------------------------------------------------- */

  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open');

      if (!isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && mobileNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
     2. "Load More" Button for Activity Grid
     --------------------------------------------------------------- */

  var loadMoreBtn = document.getElementById('load-more-btn');
  var hiddenCards = document.querySelectorAll('.activity-card.is-hidden');

  if (loadMoreBtn && hiddenCards.length > 0) {
    loadMoreBtn.addEventListener('click', function () {
      hiddenCards.forEach(function (card) {
        card.classList.remove('is-hidden');
        card.classList.add('fade-in');
        requestAnimationFrame(function () {
          card.classList.add('is-visible');
        });
      });
      this.style.display = 'none';
    });
  }

  /* ---------------------------------------------------------------
     3. Scroll Fade-in Animation (IntersectionObserver)
     --------------------------------------------------------------- */

  var fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------------------------------------------------------------
     4. Responsive Embedded Videos
     --------------------------------------------------------------- */

  var videos = document.querySelectorAll(
    '.article-content iframe, .article-content video'
  );

  function resizeVideos() {
    videos.forEach(function (video) {
      var parent = video.parentElement;
      if (!parent) return;

      var origW = video.getAttribute('data-orig-w') || video.getAttribute('width');
      var origH = video.getAttribute('data-orig-h') || video.getAttribute('height');

      if (origW && origH) {
        video.setAttribute('data-orig-w', origW);
        video.setAttribute('data-orig-h', origH);

        var parentW = parent.offsetWidth;
        var ratio = parseFloat(origH) / parseFloat(origW);
        video.style.width = parentW + 'px';
        video.style.height = Math.round(parentW * ratio) + 'px';
      }
    });
  }

  if (videos.length > 0) {
    resizeVideos();
    window.addEventListener('resize', resizeVideos);
  }
})();
