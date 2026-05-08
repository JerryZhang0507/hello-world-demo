/**
 * Vanilla Counter - replaces CounterUp + Waypoints (old-library-dependent)
 * Uses Intersection Observer + requestAnimationFrame for number counting animation
 * 
 * Usage: initCounters('[data-toggle="counter-up"]')
 */
(function () {
    'use strict';

    function initCounters(selector) {
        var elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        function animateCounter(el) {
            var target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
            if (isNaN(target)) return;

            var startVal = 0;
            var duration = 2000; // ms
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease-out: faster at start, slow at end
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(startVal + (target - startVal) * eased);
                el.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target.toLocaleString();
                    el.classList.add('counted');
                }
            }

            requestAnimationFrame(step);
        }

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            elements.forEach(function (el) { observer.observe(el); });
        } else {
            // Fallback: animate all immediately
            elements.forEach(function (el) { animateCounter(el); });
        }
    }

    window.initCounters = initCounters;
})();

