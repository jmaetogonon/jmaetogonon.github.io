// Header functionality
let dotNetHelper;
let scrollTimeout = null;
let lastStickyState = false;
let lastScrolledState = false;
let lastSectionState = '';

// Initialize header with DotNetHelper
function initializeHeader(helper) {
    dotNetHelper = helper;
    initializeHeaderScroll();
    initializeSectionObserver();
}

// Optimized Header Scroll Functionality
function initializeHeaderScroll() {
    let lastScrollTop = 0;
    const stickyOffset = 100;
    const scrollThrottle = 16; // ~60fps

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isSticky = scrollTop > stickyOffset;
        const isScrolled = scrollTop > lastScrollTop && scrollTop > 100;

        // Only update if state changed
        if (isSticky !== lastStickyState || isScrolled !== lastScrolledState) {
            lastStickyState = isSticky;
            lastScrolledState = isScrolled;

            if (dotNetHelper) {
                dotNetHelper.invokeMethodAsync('OnScroll', isSticky, isScrolled);
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Throttled scroll handler
    function throttledScrollHandler() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                handleScroll();
                scrollTimeout = null;
            }, scrollThrottle);
        }
    }

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Initial check on page load
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const initialIsSticky = initialScrollTop > stickyOffset;
    lastStickyState = initialIsSticky;
    if (dotNetHelper) {
        dotNetHelper.invokeMethodAsync('OnScroll', initialIsSticky, false);
    }
}

// Optimized Section Observer
function initializeSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const options = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;

                // Only update if section changed
                if (sectionId !== lastSectionState) {
                    lastSectionState = sectionId;

                    if (dotNetHelper) {
                        dotNetHelper.invokeMethodAsync('OnSectionChange', sectionId);
                    }
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Close mobile menu when clicking outside
function closeMobileMenu() {
    if (dotNetHelper) {
        dotNetHelper.invokeMethodAsync('CloseMobileMenu');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Close mobile menu when clicking on a link or outside
    document.addEventListener('click', function (event) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        if (mobileMenu && mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
});

// Make functions available globally
window.initializeHeader = initializeHeader;
window.scrollToSection = scrollToSection;
window.closeMobileMenu = closeMobileMenu;