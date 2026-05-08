/**
 * Cinray Metal - Main JavaScript
 * Vanilla JS (vanilla JS) - Bootstrap 5 native
 */
(function () {
    'use strict';

    // DOM ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function () {

        // === Spinner ===
        var spinner = document.getElementById('spinner');
        if (spinner) {
            setTimeout(function () {
                spinner.classList.remove('show');
            }, 1);
        }

        // === Initiate WOW.js (no external deps) ===
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }

        // === Sticky Navbar ===
        var stickyTop = document.querySelector('.sticky-top');
        if (stickyTop) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 300) {
                    stickyTop.classList.add('shadow-sm');
                    stickyTop.style.top = '0px';
                } else {
                    stickyTop.classList.remove('shadow-sm');
                    stickyTop.style.top = '-100px';
                }
            });
        }

        // === Back to Top Button ===
        var backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 300) {
                    backToTop.style.display = 'block';
                    backToTop.style.opacity = '1';
                } else {
                    backToTop.style.opacity = '0';
                    setTimeout(function () {
                        if (window.scrollY <= 300) {
                            backToTop.style.display = 'none';
                        }
                    }, 500);
                }
            });

            backToTop.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // === Modal Video ===
        var videoSrc = null;
        var btnPlay = document.querySelector('.btn-play');
        var videoModal = document.getElementById('videoModal');
        var videoEl = document.getElementById('video');

        if (btnPlay) {
            btnPlay.addEventListener('click', function () {
                videoSrc = this.getAttribute('data-src');
            });
        }

        if (videoModal && videoEl) {
            videoModal.addEventListener('shown.bs.modal', function () {
                videoEl.setAttribute('src', videoSrc + '?autoplay=1&modestbranding=1&showinfo=0');
            });
            videoModal.addEventListener('hide.bs.modal', function () {
                videoEl.setAttribute('src', videoSrc || '');
            });
        }

        // === Facts Counter ===
        initCounters('[data-toggle="counter-up"]');

        // === Project Carousel ===
        initCarousel('.project-carousel', {
            autoplay: true,
            autoplaySpeed: 5000,
            smartSpeed: 1000,
            loop: true,
            center: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            items: {
                0: 2,
                576: 2,
                768: 3,
                992: 4,
                1200: 5
            }
        });

        // === Testimonials Carousel ===
        initCarousel('.testimonial-carousel', {
            autoplay: true,
            autoplaySpeed: 5000,
            smartSpeed: 1000,
            loop: true,
            center: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
            items: {
                0: 1,
                768: 2
            }
        });

    });

})();

