document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = sidebar.style.left === '0px';
            sidebar.style.left = isOpen ? '-100%' : '0px';
        });

        // Close when clicking a link
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => sidebar.style.left = '-100%');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target)) sidebar.style.left = '-100%';
        });
    }

    // 2. Typing Effect
    const typedEl = document.getElementById('typed-line');
    if (typedEl) {
        const text = typedEl.textContent;
        typedEl.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                typedEl.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            }
        }
        type();
    }

    // 3. Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-image');
    const lbTitle = document.getElementById('lb-title');
    const lbDesc = document.getElementById('lb-desc');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            lbImg.src = card.dataset.img;
            lbTitle.textContent = card.dataset.title;
            lbDesc.textContent = card.dataset.desc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 5. Year Update
    document.getElementById('year').textContent = new Date().getFullYear();
});