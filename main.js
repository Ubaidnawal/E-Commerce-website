document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollTop = document.getElementById('scrollTop');
    const loader = document.getElementById('loader');
    
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page, hide others
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                    window.scrollTo(0, 0);
                }
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Scroll to top functionality
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });
    
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            // Simulate subscription
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-action-btn:last-child');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update cart badge
            const badge = document.querySelector('.badge');
            const currentCount = parseInt(badge.textContent);
            badge.textContent = currentCount + 1;
            
            // Show notification
            const productName = this.closest('.product-card').querySelector('.product-name').textContent;
            showNotification(`${productName} added to cart!`, 'success');
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.product-action-btn:first-child');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle heart icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            
            // Show notification
            const productName = this.closest('.product-card').querySelector('.product-name').textContent;
            const isAdded = icon.classList.contains('fas');
            showNotification(isAdded ? `${productName} added to wishlist!` : `${productName} removed from wishlist!`, 'info');
        });
    });
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Set notification color based on type
        let bgColor = 'var(--accent-color)';
        let textColor = 'var(--primary-color)';
        
        if (type === 'error') {
            bgColor = '#e74c3c';
            textColor = 'white';
        } else if (type === 'success') {
            bgColor = '#2ecc71';
            textColor = 'white';
        }
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: ${bgColor};
            color: ${textColor};
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: var(--shadow);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 300px;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Search functionality
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                showNotification(`Searching for "${searchTerm}"...`, 'info');
                // In a real application, this would trigger a search
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    showNotification(`Searching for "${searchTerm}"...`, 'info');
                    // In a real application, this would trigger a search
                }
            }
        });
    }
    
    // Footer link navigation
    const footerLinks = document.querySelectorAll('.footer-links a[data-page]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`.nav-link[data-page="${targetPage}"]`).classList.add('active');
            
            // Show target page, hide others
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                    window.scrollTo(0, 0);
                }
            });
        });
    });
    
    // Product quick view
    const quickViewButtons = document.querySelectorAll('.product-action-btn:nth-child(2)');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.closest('.product-card').querySelector('.product-name').textContent;
            showNotification(`Quick view for ${productName}`, 'info');
            // In a real application, this would open a modal with product details
        });
    });
});