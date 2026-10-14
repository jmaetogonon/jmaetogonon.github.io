window.portfolio = {
    observeSections: () => {
        const items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            items.forEach(item => item.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
        items.forEach(item => observer.observe(item));
    },
    showDialog: element => {
        if (element && !element.open) element.showModal();
    },
    closeDialog: element => {
        if (element && element.open) element.close();
    }
};
document.addEventListener('click', event => {
    if (event.target.closest('.dismiss')) document.getElementById('blazor-error-ui')?.classList.add('dismissed');
});
