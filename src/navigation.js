// Navigation and Scroll Management
document.addEventListener('DOMContentLoaded', function() {
    // Scroll management for overlay menu using bodyScrollLock plugin
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const closeBtn = document.querySelector('.close-btn');
    
    // Handle menu open/close using plugin
    if (navbarCollapse && window.bodyScrollLock) {
        navbarCollapse.addEventListener('show.bs.collapse', function() {
            window.bodyScrollLock.disableBodyScroll(navbarCollapse);
        });
        
        navbarCollapse.addEventListener('hide.bs.collapse', function() {
            window.bodyScrollLock.enableBodyScroll(navbarCollapse);
        });
    }
    
    // Close button functionality
    if (closeBtn && navbarCollapse) {
        closeBtn.addEventListener('click', function() {
            navbarCollapse.classList.remove('show');
            if (window.bodyScrollLock) {
                window.bodyScrollLock.enableBodyScroll(navbarCollapse);
            }
        });
    }
    
    // Handle screen resize to close menu and restore scroll
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        
        // If screen width is above 1210px (lg breakpoint), ensure overlay is hidden
        if (width >= 1210) {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                if (window.bodyScrollLock) {
                    window.bodyScrollLock.enableBodyScroll(navbarCollapse);
                }
            }
        }
        
        // Bootstrap lg breakpoint handling
        if (width >= 992) {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click(); // Close the menu
                if (window.bodyScrollLock) {
                    window.bodyScrollLock.enableBodyScroll(navbarCollapse);
                }
            }
        }
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
                if (window.bodyScrollLock) {
                    window.bodyScrollLock.enableBodyScroll(navbarCollapse);
                }
            }
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                    if (window.bodyScrollLock) {
                        window.bodyScrollLock.enableBodyScroll(navbarCollapse);
                    }
                }
            }
        });
    });
    
    // Close nav and restore scroll when a nav link is clicked (overlay nav specific)
    if (navbarCollapse && window.bodyScrollLock) {
        document.querySelectorAll('.overlay-nav .nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
                window.bodyScrollLock.enableBodyScroll(navbarCollapse);
            });
        });
    }
}); 