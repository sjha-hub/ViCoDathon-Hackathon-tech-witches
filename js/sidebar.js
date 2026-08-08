// ============================================================
// SIDEBAR FUNCTIONALITY
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // SIDEBAR TOGGLE (Desktop only)
    // ============================================================
    
    const sidebar = document.getElementById('sidebarNav');
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        if (overlay) {
            overlay.classList.toggle('active');
        }
        document.body.classList.toggle('sidebar-open');
    }

    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.classList.remove('sidebar-open');
    }

    // Toggle button click (Desktop)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    // Overlay click (close sidebar)
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // ============================================================
    // ACTIVE LINK HIGHLIGHTING (Both Desktop & Mobile)
    // ============================================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const pageName = currentPage.replace('.html', '');
    
    // Desktop sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href ? href.replace('.html', '') : '';
        
        if (linkPage === pageName || 
            (pageName === '' && linkPage === 'dashboard') ||
            (currentPage === 'index.html' && linkPage === 'dashboard')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Close sidebar on link click (mobile)
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // ============================================================
    // MOBILE BOTTOM NAV ACTIVE HIGHLIGHTING
    // ============================================================
    
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const href = item.getAttribute('href');
        const linkPage = href ? href.replace('.html', '') : '';
        
        if (linkPage === pageName || 
            (pageName === '' && linkPage === 'dashboard') ||
            (currentPage === 'index.html' && linkPage === 'dashboard')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // ============================================================
    // LOGOUT FUNCTIONALITY
    // ============================================================
    
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('abtalks_user');
                window.location.href = 'login.html';
            }
        });
    }

    // ============================================================
    // UPDATE USER INFO
    // ============================================================
    
    const userData = localStorage.getItem('abtalks_user');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            const userNameEl = document.querySelector('.user-name');
            const userEmailEl = document.querySelector('.user-email');
            const userAvatarEl = document.querySelector('.user-avatar');
            
            if (userNameEl && user.name) {
                userNameEl.textContent = user.name;
            }
            if (userEmailEl && user.email) {
                userEmailEl.textContent = user.email;
            }
            if (userAvatarEl && user.name) {
                userAvatarEl.textContent = user.name.charAt(0).toUpperCase();
            }
        } catch (e) {
            console.log('Error parsing user data');
        }
    }

    // ============================================================
    // KEYBOARD SHORTCUT: ESC to close sidebar
    // ============================================================
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
});