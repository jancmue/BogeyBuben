// ========================================
// Language Switcher
// ========================================

let currentLanguage = 'en'; // Default: English

function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data-attributes
    document.querySelectorAll('[data-en][data-de]').forEach(el => {
        if (lang === 'en') {
            el.textContent = el.getAttribute('data-en');
        } else {
            el.textContent = el.getAttribute('data-de');
        }
    });
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Save preference
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Language button listeners
document.getElementById('langEN')?.addEventListener('click', () => setLanguage('en'));
document.getElementById('langDE')?.addEventListener('click', () => setLanguage('de'));

// Load saved language on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
});

// ========================================
// Navigation Active State
// ========================================

function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if ((currentPath === '/' && href === '/') || 
            (currentPath.includes(href) && href !== '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavigation();

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Sammle Formular-Daten
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validierung
        if (!name || !email || !message) {
            showFormMessage('Bitte fülle alle Felder aus.', 'error');
            return;
        }
        
        // Email-Validierung
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Bitte gib eine gültige Email-Adresse ein.', 'error');
            return;
        }
        
        // Erfolgsmeldung (da das Formular nur eine Demo ist)
        showFormMessage(
            '✅ Danke für deine Nachricht! Bitte schreib uns eine DM auf Instagram, damit wir schneller antworten können.',
            'success'
        );
        
        // Formular zurücksetzen
        contactForm.reset();
        
        // Optional: Später könnte man hier einen API-Call machen
        // axios.post('/api/contact', { name, email, message })
        //     .then(...)
        //     .catch(...)
    });
}

function showFormMessage(text, type) {
    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = text;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
    
    // Nach 5 Sekunden ausblenden
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// ========================================
// Smooth Scrolling für Ankfer-Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Apparel Card - Coming Soon Alert
// ========================================

document.querySelector('.coming-soon-btn')?.addEventListener('click', function() {
    const message = currentLanguage === 'en' 
        ? 'Coming soon! Stay tuned for awesome gear! 🚀' 
        : 'Kommt bald! Bleib dran für großartige Produkte! 🚀';
    alert(message);
});

// ========================================
// Dark Mode Support (Optional, via System-Einstellungen)
// ========================================

function checkDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.style.backgroundColor = '#111827';
        document.body.style.color = '#f3f4f6';
    }
}

// Uncomment wenn Dark Mode implementiert werden soll:
// checkDarkMode();

// ========================================
// Performance & Analytics
// ========================================

// Optional: Einfaches Page-View Tracking
function trackPageView() {
    const page = window.location.pathname;
    console.log('Page viewed:', page);
    // Könnte später zu Google Analytics gesendet werden
}

trackPageView();
