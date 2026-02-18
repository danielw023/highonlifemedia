// General Site Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.textContent = 'Sending...';
            }
            
            // Simulate form submission (replace with actual submission)
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#28a745';
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        submitBtn.textContent = 'Send Message';
                        submitBtn.style.backgroundColor = '';
                    }, 2000);
                }
            }, 1500);
        });
    });
    
    // Enhanced date picker interaction
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        dateInput.addEventListener('blur', function() {
            this.style.transform = '';
        });
    }
    
    // Enhanced gallery interaction
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Flip card functionality
    document.querySelectorAll('.flip-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Only flip if clicking the front face
            if (e.target.closest('.flip-card-front')) {
                // Unflip any other flipped cards
                document.querySelectorAll('.flip-card.flipped').forEach(function(other) {
                    if (other !== card) other.classList.remove('flipped');
                });
                card.classList.add('flipped');
            }
            // If you want a close button on the back, handle it here
            if (e.target.classList.contains('flip-card-close')) {
                card.classList.remove('flipped');
            }
        });
    });
});