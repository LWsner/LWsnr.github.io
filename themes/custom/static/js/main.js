// Dark Mode Toggle
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = this.themeToggle?.querySelector('.sun-icon');
        this.moonIcon = this.themeToggle?.querySelector('.moon-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);

        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateIcons();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateIcons() {
        if (this.sunIcon && this.moonIcon) {
            if (this.currentTheme === 'dark') {
                this.sunIcon.style.display = 'none';
                this.moonIcon.style.display = 'block';
            } else {
                this.sunIcon.style.display = 'block';
                this.moonIcon.style.display = 'none';
            }
        }
    }
}

// Image Modal
class ImageModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImage');
        this.modalCaption = document.getElementById('modalCaption');
        this.closeBtn = this.modal?.querySelector('.close');
        this.gallery = [];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Add click listeners to all clickable images
        const clickableImages = document.querySelectorAll('.clickable-image');
        clickableImages.forEach(img => {
            img.addEventListener('click', (e) => this.openModal(e.target));
        });

        // Add close listeners
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal?.style.display !== 'block') return;
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowRight' && this.gallery.length > 1) this.navigate(1);
            if (e.key === 'ArrowLeft' && this.gallery.length > 1) this.navigate(-1);
        });

        // Create nav buttons
        this.createNavButtons();
    }

    createNavButtons() {
        if (!this.modal) return;
        const content = this.modal.querySelector('.modal-content');
        if (!content) return;

        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'modal-nav modal-prev';
        this.prevBtn.innerHTML = '&#10094;';
        this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.navigate(-1); });

        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'modal-nav modal-next';
        this.nextBtn.innerHTML = '&#10095;';
        this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.navigate(1); });

        content.appendChild(this.prevBtn);
        content.appendChild(this.nextBtn);
    }

    openModal(img) {
        if (!this.modal || !this.modalImg || !this.modalCaption) return;

        // Check if clicked image is part of a slideshow
        const slideshow = img.closest('.image-slideshow');
        if (slideshow) {
            this.gallery = Array.from(slideshow.querySelectorAll('.slideshow-image'));
            this.currentIndex = this.gallery.indexOf(img);
            if (this.currentIndex === -1) this.currentIndex = 0;
        } else {
            this.gallery = [img];
            this.currentIndex = 0;
        }

        this.showImage();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Show/hide nav buttons
        const showNav = this.gallery.length > 1;
        if (this.prevBtn) this.prevBtn.style.display = showNav ? 'block' : 'none';
        if (this.nextBtn) this.nextBtn.style.display = showNav ? 'block' : 'none';
    }

    showImage() {
        const img = this.gallery[this.currentIndex];
        if (img && this.modalImg && this.modalCaption) {
            this.modalImg.src = img.src;
            this.modalImg.alt = img.alt;
            this.modalCaption.textContent = img.alt || img.title || '';
        }
    }

    navigate(direction) {
        if (this.gallery.length <= 1) return;
        this.currentIndex = (this.currentIndex + direction + this.gallery.length) % this.gallery.length;
        this.showImage();
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.gallery = [];
        }
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.toggleBtn = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggleBtn.contains(e.target) && !this.navMenu?.contains(e.target)) {
                this.close();
            }
        });

        // Close menu on window resize if it gets too wide
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.navMenu) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '100%';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.backgroundColor = 'var(--header-bg)';
            this.navMenu.style.padding = '1rem';
            this.navMenu.style.boxShadow = '0 2px 4px var(--shadow-color)';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.gap = '1rem';
            this.navMenu.style.zIndex = '99';
        }

        if (this.toggleBtn) {
            this.toggleBtn.classList.add('active');
        }

        this.isOpen = true;
    }

    close() {
        if (this.navMenu) {
            this.navMenu.style.display = '';
            this.navMenu.style.position = '';
            this.navMenu.style.top = '';
            this.navMenu.style.left = '';
            this.navMenu.style.right = '';
            this.navMenu.style.backgroundColor = '';
            this.navMenu.style.padding = '';
            this.navMenu.style.boxShadow = '';
            this.navMenu.style.flexDirection = '';
            this.navMenu.style.gap = '';
            this.navMenu.style.zIndex = '';
        }

        if (this.toggleBtn) {
            this.toggleBtn.classList.remove('active');
        }

        this.isOpen = false;
    }
}

// Smooth scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Loading animations
class LoadingAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Add fade-in animation to content sections
        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe content sections
        const sections = document.querySelectorAll('.content-box, .blog-item, .research-item, .project-item, .hobby-item, .news-item');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// Utility functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Back to top button
class BackToTop {
    constructor() {
        this.button = null;
        this.init();
    }

    init() {
        this.createButton();
        this.addScrollListener();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.innerHTML = '↑';
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border: none;
            border-radius: 50%;
            background-color: var(--accent-color);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 8px var(--shadow-color);
        `;

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'scale(1.1)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'scale(1)';
        });

        document.body.appendChild(this.button);
    }

    addScrollListener() {
        const showButton = Utils.throttle(() => {
            if (window.scrollY > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        }, 100);

        window.addEventListener('scroll', showButton);
    }
}

// Copy to clipboard functionality
class ClipboardManager {
    constructor() {
        this.init();
    }

    init() {
        // Add copy buttons to code blocks
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => this.addCopyButton(block));
    }

    addCopyButton(codeBlock) {
        const pre = codeBlock.parentElement;
        if (pre && pre.tagName === 'PRE') {
            const button = document.createElement('button');
            button.textContent = 'Copy';
            button.className = 'copy-button';
            button.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: var(--accent-color);
                color: white;
                border: none;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            pre.style.position = 'relative';

            pre.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });

            pre.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });

            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });

            pre.appendChild(button);
        }
    }
}

// GIF Synchronization for Physics Blog
class GifSynchronizer {
    constructor() {
        this.init();
    }

    init() {
        // Find all GIF grids
        const gifGrids = document.querySelectorAll('.gif-grid-3x3-nospace, .gif-grid-4x2-nospace, .gif-grid-3x2-nospace');

        gifGrids.forEach(grid => {
            this.setupGridSync(grid);
        });
    }

    setupGridSync(grid) {
        const images = grid.querySelectorAll('img[src$=".gif"]');

        if (images.length === 0) return;

        // Store original sources
        const originalSources = Array.from(images).map(img => img.src);

        // Function to sync all GIFs in this grid
        const syncGifs = () => {
            images.forEach((img, index) => {
                // Force reload by adding timestamp
                const timestamp = new Date().getTime();
                const separator = originalSources[index].includes('?') ? '&' : '?';
                img.src = originalSources[index] + separator + 't=' + timestamp;
            });
        };

        // Sync on hover removed - automatic sync only

        // Also sync when grid becomes visible (using Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay to ensure images are loaded
                    setTimeout(syncGifs, 100);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the grid is visible
        });

        observer.observe(grid);

        // Initial sync after a short delay to let page load
        setTimeout(syncGifs, 500);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    new ThemeManager();
    new ImageModal();
    new MobileMenu();
    new SmoothScroll();
    new LoadingAnimations();
    new BackToTop();
    new ClipboardManager();
    new GifSynchronizer();

    // Add any additional initialization here
    console.log('Personal website initialized successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}