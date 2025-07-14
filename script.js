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

    // Initialize all features
    initializeAnimations();
    initializeCopyFeature();
    initializeClickTracking();
    initializeLoadingStates();
    initializeHoverEffects();
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

// Smooth animations for elements
function initializeAnimations() {
    const container = document.querySelector('.container');
    const socialLinks = document.querySelectorAll('.social-link');
    const profileSection = document.querySelector('.profile-section');
    
    // Fade in container
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate social links with stagger effect
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Profile image animation
    if (profileSection) {
        profileSection.style.opacity = '0';
        profileSection.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            profileSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            profileSection.style.opacity = '1';
            profileSection.style.transform = 'scale(1)';
        }, 200);
    }
}

// Copy link functionality
function initializeCopyFeature() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.className = 'copy-btn';
        copyBtn.setAttribute('aria-label', 'نسخ الرابط');
        
        // Insert copy button
        link.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const url = link.getAttribute('href');
            copyToClipboard(url, copyBtn);
        });
    });
}

// Copy to clipboard function
function copyToClipboard(text, button) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyTextToClipboard(text, button);
        });
    } else {
        fallbackCopyTextToClipboard(text, button);
    }
}

// Fallback copy method
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#22c55e';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
    }, 2000);
    
    showToast('تم نسخ الرابط!', 'success');
}

// Show copy error feedback
function showCopyError(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-times"></i>';
    button.style.background = '#ef4444';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
    }, 2000);
    
    showToast('فشل في نسخ الرابط', 'error');
}

// Click tracking for analytics
function initializeClickTracking() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platformName = this.querySelector('.platform-name').textContent;
            
            // Track click event (you can integrate with Google Analytics here)
            console.log(`Clicked on: ${platformName}`);
            
            // Optional: Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'platform': platformName,
                    'url': this.getAttribute('href')
                });
            }
        });
    });
}

// Loading states for external links
function initializeLoadingStates() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            
            // Remove loading state after a delay
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });
}

// Enhanced hover effects
function initializeHoverEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Preload images for better performance
function preloadImages() {
    const images = ['my-profile.jpg'];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add responsive navigation for smaller screens
function initializeResponsiveFeatures() {
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts if needed
            window.scrollTo(0, 0);
        }, 100);
    });
    
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Optimize layout on resize
            const container = document.querySelector('.container');
            if (container) {
                container.style.minHeight = window.innerHeight + 'px';
            }
        }, 250);
    });
}

// Initialize responsive features
initializeResponsiveFeatures();

// Performance monitoring
function initializePerformanceMonitoring() {
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Optional: Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'value': loadTime
                });
            }
        }
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Handle Enter and Space for social links
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('social-link')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Service Worker registration (for PWA features - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
        */
    });
}

// Add dark mode toggle (optional feature)
function initializeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.classList.add('dark-mode');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    });
}

// Initialize dark mode
initializeDarkMode();

// Add toast notification functionality
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}