        // Mobile menu functionality
        const menuBtn = document.getElementById('menu-btn');
        const menu = document.getElementById('menu');
        const menuContainer = menu.querySelector('.mobile-nav-items-container');
        const menuItems = [
            { text: 'Template HTML', href: 'hal/template.html' },
            { text: 'Galery', href: 'hal/galeri.html' },
            { text: 'Team', href: 'hal/team.html' },
            { text: 'Contact', href: 'hal/kontak.html' },
            { text: 'Yang penting tutorial', href: 'hal/mulai.html', isButton: true }
        ];

        function buildMenu() {
            menuContainer.innerHTML = '';
            menuItems.forEach((item, index) => {
                const a = document.createElement('a');
                a.href = item.href;
                a.textContent = item.text;
                a.classList.add('mobile-nav-item', 'menu-item');
                if (item.isButton) {
                    a.classList.add('mobile-nav-button');
                }
                a.style.animationDelay = `${index * 100}ms`;
                menuContainer.appendChild(a);
            });
        }

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            menu.classList.toggle('is-open');
            if (menu.classList.contains('is-open')) {
                buildMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                menu.classList.remove('is-open');
                menuBtn.classList.remove('open');
            }
        });