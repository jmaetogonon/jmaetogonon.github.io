// Smooth sliding word animation
function startWordAnimation() {
    const animatedWord = document.getElementById('animatedWord');

    if (!animatedWord) {
        console.log('Element not found, retrying...');
        setTimeout(startWordAnimation, 100);
        return;
    }

    const words = ['Web Developer', 'Mobile Developer'];
    let currentIndex = 0;
    let isAnimating = false;

    function animateWord() {
        if (isAnimating) return;
        isAnimating = true;

        // Slide current word up and out
        animatedWord.style.opacity = '0';
        animatedWord.style.transform = 'translateY(-30px)';

        setTimeout(() => {
            // Change to next word
            currentIndex = (currentIndex + 1) % words.length;
            animatedWord.textContent = words[currentIndex];

            // Position new word below (ready to slide up)
            animatedWord.style.transform = 'translateY(30px)';
            animatedWord.style.opacity = '0';

            // Force reflow
            void animatedWord.offsetWidth;

            // Slide new word up from bottom
            setTimeout(() => {
                animatedWord.style.opacity = '1';
                animatedWord.style.transform = 'translateY(0)';

                setTimeout(() => {
                    isAnimating = false;
                }, 600);
            }, 50);

        }, 600);
    }

    // Start animation and repeat every 3 seconds
    setInterval(animateWord, 3000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
// Prevent body scroll when modal is open
function preventBodyScroll() {
    document.body.style.overflow = 'hidden';
}

function allowBodyScroll() {
    document.body.style.overflow = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollAnimations();
});

// Export functions for Blazor
window.startWordAnimation = startWordAnimation;
window.scrollToElement = scrollToElement;
window.initializeScrollAnimations = initializeScrollAnimations;
window.preventBodyScroll = preventBodyScroll;
window.allowBodyScroll = allowBodyScroll;