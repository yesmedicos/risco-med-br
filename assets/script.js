// ====================================
// Mobile Navigation Toggle
// ====================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ====================================
// Smooth Scroll Enhancement
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Header Scroll Effect
// ====================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        header.style.padding = '16px 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '20px 0';
    }

    lastScroll = currentScroll;
});

// ====================================
// FAQ Accordion
// ====================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Toggle clicked item
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ====================================
// Intersection Observer for Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInElements = document.querySelectorAll('.feature-card, .stat-card, .index-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ====================================
// Risk Bar Animation
// ====================================

const riskBars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
            
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

riskBars.forEach(bar => {
    barObserver.observe(bar);
});

// ====================================
// Form Validation (if needed)
// ====================================

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Remove error class on input
                field.addEventListener('input', () => {
                    field.classList.remove('error');
                }, { once: true });
            }
        });

        if (!isValid) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});

// ====================================
// CTA Button Click Tracking
// ====================================

const ctaButtons = document.querySelectorAll('.btn-primary, .btn-large');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Google Analytics event tracking (if GA is configured)
        if (typeof gtag !== 'undefined') {
            const buttonText = button.textContent.trim();
            const href = button.getAttribute('href');
            
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': buttonText,
                'value': href
            });
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.transition = 'transform 0.6s, opacity 0.6s';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(20)';
            ripple.style.opacity = '0';
        });
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ====================================
// Lazy Loading for Images
// ====================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ====================================
// Copy to Clipboard (for API examples if needed)
// ====================================

const copyButtons = document.querySelectorAll('[data-copy]');

copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const textToCopy = button.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            const originalText = button.textContent;
            button.textContent = 'Copiado!';
            button.style.background = 'var(--success)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// ====================================
// Performance Monitoring
// ====================================

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            'name': 'load',
            'value': Math.round(loadTime),
            'event_category': 'performance'
        });
    }
});

// ====================================
// Keyboard Navigation Enhancement
// ====================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.getElementById('mobileToggle').classList.remove('active');
        }
        
        // Close any open FAQ
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
    }
});

// ====================================
// WhatsApp Click Tracking
// ====================================

const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');

whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'contact',
                'event_label': 'WhatsApp Contact'
            });
        }
    });
});

// ====================================
// Email Click Tracking
// ====================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            const email = link.getAttribute('href').replace('mailto:', '');
            gtag('event', 'email_click', {
                'event_category': 'contact',
                'event_label': email
            });
        }
    });
});

// ====================================
// Download Tracking
// ====================================

const downloadLinks = document.querySelectorAll('a[download]');

downloadLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            const filename = link.getAttribute('href');
            gtag('event', 'file_download', {
                'event_category': 'downloads',
                'event_label': filename
            });
        }
    });
});

// ====================================
// Console Message
// ====================================

console.log('%c🏥 Risco Med', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cSistema de Laudos de Risco Cirúrgico', 'font-size: 14px; color: #6b7280;');
console.log('%cDesenvolvido por YES Médicos', 'font-size: 12px; color: #9ca3af;');
console.log('%chttps://yesmedicos.com.br', 'font-size: 12px; color: #2563eb;');

// ====================================
// Service Worker Registration (Optional PWA)
// ====================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
