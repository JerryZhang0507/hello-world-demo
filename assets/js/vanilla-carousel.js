/**
 * Vanilla Carousel - replaces OwlCarousel (old-library-dependent)
 * Uses CSS transform + setInterval for sliding
 * 
 * Usage: initCarousel('.my-carousel', { items: { 0: 2, 768: 3, 992: 4 }, loop: true, center: true })
 */
(function () {
    'use strict';

    function initCarousel(containerSelector, options) {
        var opts = Object.assign({
            autoplay: true,
            autoplaySpeed: 5000,
            smartSpeed: 1000,
            loop: true,
            center: false,
            dots: false,
            nav: true,
            items: { 0: 1 },
            navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>']
        }, options);

        var containers = document.querySelectorAll(containerSelector);
        containers.forEach(function (container) {
            buildCarousel(container, opts);
        });
    }

    function buildCarousel(container, opts) {
        var track = container.querySelector('.carousel-track');
        if (!track) {
            // Auto-wrap children in track
            var items = Array.from(container.children).filter(function (el) {
                return !el.classList.contains('carousel-nav') && !el.classList.contains('carousel-dots');
            });
            track = document.createElement('div');
            track.className = 'carousel-track';
            track.style.cssText = 'display:flex;transition:transform ' + (opts.smartSpeed / 1000) + 's ease;will-change:transform;';
            items.forEach(function (item) { track.appendChild(item); });
            container.appendChild(track);
        }

        var slides = Array.from(track.children);
        var totalSlides = slides.length;
        if (totalSlides === 0) return;

        var currentIndex = 0;
        var visibleItems = getVisibleItems(opts.items);
        var autoPlayTimer = null;
        var isTransitioning = false;

        // Calculate item width
        function getItemWidth() {
            if (opts.center && visibleItems > 1) {
                return (100 / visibleItems) + '%';
            }
            return (100 / visibleItems) + '%';
        }

        // Apply widths to slides
        slides.forEach(function (slide) {
            slide.style.flex = '0 0 ' + getItemWidth();
            slide.style.maxWidth = getItemWidth();
        });

        // Get visible items count based on viewport
        function getVisibleItems(breakpoints) {
            var w = window.innerWidth;
            var keys = Object.keys(breakpoints).map(Number).sort(function (a, b) { return b - a; });
            for (var i = 0; i < keys.length; i++) {
                if (w >= keys[i]) return breakpoints[keys[i]];
            }
            return breakpoints[0] || 1;
        }

        // Move to slide
        function goTo(index, instant) {
            if (isTransitioning && !instant) return;
            isTransitioning = true;

            var offset;
            if (opts.center) {
                var centerOffset = (visibleItems - 1) / 2;
                offset = -(index - centerOffset) * (100 / visibleItems);
            } else {
                offset = -(index * (100 / visibleItems));
            }

            if (instant) {
                track.style.transition = 'none';
            } else {
                track.style.transition = 'transform ' + (opts.smartSpeed / 1000) + 's ease';
            }

            track.style.transform = 'translateX(' + offset + '%)';
            currentIndex = index;
            updateDots();
            updateActiveSlide();

            setTimeout(function () {
                isTransitioning = false;
            }, instant ? 0 : opts.smartSpeed);
        }

        function next() {
            var nextIdx = currentIndex + 1;
            if (nextIdx >= totalSlides) {
                if (opts.loop) {
                    goTo(0);
                }
            } else {
                goTo(nextIdx);
            }
        }

        function prev() {
            var prevIdx = currentIndex - 1;
            if (prevIdx < 0) {
                if (opts.loop) {
                    goTo(totalSlides - 1);
                }
            } else {
                goTo(prevIdx);
            }
        }

        function updateActiveSlide() {
            slides.forEach(function (s, i) {
                s.classList.remove('active', 'center');
                if (i === currentIndex) s.classList.add('active');
                if (opts.center && i === currentIndex) s.classList.add('center');
            });
        }

        // Navigation buttons
        if (opts.nav) {
            var navEl = document.createElement('div');
            navEl.className = 'carousel-nav';
            navEl.style.cssText = 'position:absolute;width:100%;height:45px;top:50%;left:0;transform:translateY(-50%);display:flex;justify-content:space-between;z-index:1;pointer-events:none;';
            
            var prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-prev';
            prevBtn.innerHTML = opts.navText[0];
            prevBtn.style.cssText = 'margin:0 15px;width:45px;height:45px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;background:var(--accent, #c4922e);border:none;border-radius:45px;font-size:22px;cursor:pointer;pointer-events:auto;transition:.5s;';
            prevBtn.addEventListener('click', function (e) { e.preventDefault(); prev(); });

            var nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-next';
            nextBtn.innerHTML = opts.navText[1];
            nextBtn.style.cssText = prevBtn.style.cssText;
            nextBtn.addEventListener('click', function (e) { e.preventDefault(); next(); });

            navEl.appendChild(prevBtn);
            navEl.appendChild(nextBtn);
            container.style.position = 'relative';
            container.appendChild(navEl);
        }

        // Dots
        if (opts.dots) {
            var dotsEl = document.createElement('div');
            dotsEl.className = 'carousel-dots';
            dotsEl.style.cssText = 'display:flex;justify-content:center;gap:8px;padding:15px 0;';

            for (var i = 0; i < totalSlides; i++) {
                (function (idx) {
                    var dot = document.createElement('button');
                    dot.className = 'carousel-dot';
                    dot.style.cssText = 'width:12px;height:12px;border-radius:50%;border:none;background:#ccc;cursor:pointer;transition:.3s;padding:0;';
                    if (idx === 0) dot.style.background = 'var(--accent, #c4922e)';
                    dot.addEventListener('click', function () { goTo(idx); });
                    dotsEl.appendChild(dot);
                })(i);
            }
            container.appendChild(dotsEl);
        }

        function updateDots() {
            if (!opts.dots) return;
            var dots = container.querySelectorAll('.carousel-dot');
            dots.forEach(function (dot, i) {
                dot.style.background = (i === currentIndex) ? 'var(--accent, #c4922e)' : '#ccc';
            });
        }

        // Auto-play
        function startAutoPlay() {
            if (!opts.autoplay) return;
            stopAutoPlay();
            autoPlayTimer = setInterval(next, opts.autoplaySpeed);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
        container.addEventListener('touchstart', stopAutoPlay);
        container.addEventListener('touchend', function () {
            setTimeout(startAutoPlay, 3000);
        });

        // Responsive handling
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                var newVisible = getVisibleItems(opts.items);
                if (newVisible !== visibleItems) {
                    visibleItems = newVisible;
                    slides.forEach(function (slide) {
                        slide.style.flex = '0 0 ' + getItemWidth();
                        slide.style.maxWidth = getItemWidth();
                    });
                    goTo(0, true);
                }
            }, 250);
        });

        // Init
        goTo(0, true);
        updateActiveSlide();
        startAutoPlay();
    }

    window.initCarousel = initCarousel;
})();

