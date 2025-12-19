document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            const isOpen = sidebar.style.left === '0px';
            sidebar.style.left = isOpen ? '-320px' : '0px';
        });
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => sidebar.style.left = '-320px');
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
                setTimeout(type, 30);
            }
        }
        type();
    }

    // 3. Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // 4. Lightbox (Fully Functional)
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-image');
    const lbTitle = document.getElementById('lb-title');
    const lbDesc = document.getElementById('lb-desc');
    const lbCode = document.getElementById('lb-code');
    const lbVideo = document.getElementById('lb-video');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            lbImg.src = card.dataset.img;
            lbTitle.textContent = card.dataset.title;
            lbDesc.textContent = card.dataset.desc;
            lbCode.href = card.dataset.code || '#';
            lbVideo.href = card.dataset.video || '#';
            
            // Hide video button if no link
            lbVideo.style.display = card.dataset.video ? 'inline-block' : 'none';
            
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 5. Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();
});