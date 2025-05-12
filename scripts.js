document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.slice(1);
            const targetElement = document.getElementById(targetId || '');
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 40,
                    behavior: 'smooth',
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const pathDiv = document.querySelector('.path-dir');

    const handleScroll = () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id') || '';
            }
        });

        if (pathDiv) {
            pathDiv.textContent = current ? `~/${current}` : '~';
        }
    };

    window.addEventListener('scroll', handleScroll);

    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('open');
    });

    
});
