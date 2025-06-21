// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all account cards
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        observer.observe(card);
    });

    // Observe stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        observer.observe(stat);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add click tracking for account buttons
    const accountButtons = document.querySelectorAll('.btn-account');
    accountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Track click (you can add analytics here)
            const platform = this.closest('.account-card').querySelector('h3').textContent;
            console.log(`Clicked on ${platform} account`);
        });
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    }

    // Animate counters when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat h3');
                    counters.forEach(counter => {
                        const target = parseInt(counter.textContent.replace(/\D/g,''));
                        if (target) {
                            animateCounter(counter, target);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Mobile menu toggle (if needed)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }

    // Copy contact info on click
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('تم نسخ المعلومات');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('تم نسخ المعلومات');
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
                document.body.removeChild(textArea);
            }
            
            // Visual feedback
            this.style.background = '#e3f2fd';
            setTimeout(() => {
                this.style.background = '#f8f9fa';
            }, 200);
        });
    });

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            z-index: 10000;
            font-family: 'Cairo', Arial, sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading state for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            
            // Reset after 2 seconds (in case the page doesn't actually navigate)
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Add click tracking for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add subtle animation on click
            this.style.transform = 'translateX(10px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track click (you can add analytics here)
            const platform = this.querySelector('.platform-name').textContent;
            console.log(`Clicked on: ${platform}`);
        });
    });

    // Smooth fade-in animation for elements
    const observerOptionsSmooth = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observerSmooth = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptionsSmooth);

    // Observe social links for animation
    socialLinks.forEach(link => {
        observerSmooth.observe(link);
    });

    // Observe profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        observerSmooth.observe(profileImage);
    }

    // Add hover effect for profile image
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Simple loading animation for ads
    const adSections = document.querySelectorAll('.ad-section');
    adSections.forEach(ad => {
        ad.addEventListener('click', function() {
            console.log('Ad section clicked');
        });
    });

    // Add subtle loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add ripple effect CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.btn-account {
    position: relative;
    overflow: hidden;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.contact-item {
    cursor: pointer;
    transition: all 0.2s ease;
}

.contact-item:hover {
    transform: translateX(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.header {
    transition: transform 0.3s ease;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Add loading styles
const loadingCSS = `
body {
    opacity: 0;
    transition: opacity 0.3s ease;
}

body.loaded {
    opacity: 1;
}

.social-link {
    transition: all 0.3s ease;
}

.profile-image {
    transition: all 0.3s ease;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject CSS
const styleLoading = document.createElement('style');
styleLoading.textContent = loadingCSS;
document.head.appendChild(styleLoading);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events if needed
const debouncedScrollHandler = debounce(() => {
    // Additional scroll handling if needed
}, 10);