const topbar = document.querySelector('.topbar');
const menuToggle = document.getElementById('menu-toggle');
let pastHero = false;

// Solid topbar once the hero has scrolled under it, or while the mobile menu is open
const updateTopbar = () => topbar.classList.toggle('scrolled', pastHero || menuToggle.checked);

// An observer instead of a scroll listener: no layout reads on every scroll frame
new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting;
    updateTopbar();
}, { rootMargin: '-64px 0px 0px 0px' }).observe(document.querySelector('.hero'));

menuToggle.addEventListener('change', updateTopbar);

// Close mobile menu on link click
document.querySelector('.mobile-nav').addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        menuToggle.checked = false;
        updateTopbar();
    }
});
