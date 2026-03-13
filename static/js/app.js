/**
 * CampusEvents - Shared Application JavaScript
 * Handles common functionality across all pages
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Safely parse JSON with error handling
 */
function safeJSONParse(str, defaultValue = null) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error('JSON Parse Error:', e);
        return defaultValue;
    }
}

/**
 * Debounce function to prevent excessive function calls
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (e) {
        return dateString;
    }
}

/**
 * Format time to readable string
 */
function formatTime(timeString) {
    try {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    } catch (e) {
        return timeString;
    }
}

/**
 * Check if event is upcoming or completed
 */
function isEventUpcoming(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, duration);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle API errors
 */
function handleError(error) {
    console.error('Error:', error);
    showNotification('An error occurred. Please try again.', 'error');
}

// ============================================
// MODAL MANAGEMENT
// ============================================

/**
 * Get or create modal element
 */
function getModal(modalId) {
    return document.getElementById(modalId);
}

/**
 * Open modal with animation
 */
function openModal(modalId) {
    const modal = getModal(modalId);
    if (modal) {
        modal.style.display = 'block';
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

/**
 * Close modal with animation
 */
function closeModal(modalId) {
    const modal = getModal(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

/**
 * Add click outside to close modal functionality
 */
function setupModalClickOutside(modalId) {
    const modal = getModal(modalId);
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

/**
 * Close modal on Escape key
 */
function setupModalEscapeClose(modalId) {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = getModal(modalId);
            if (modal && modal.style.display === 'block') {
                closeModal(modalId);
            }
        }
    });
}

// ============================================
// NAVIGATION HANDLING
// ============================================

/**
 * Setup navigation links with active state
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const nav = this.getAttribute('data-nav');
            
            // Allow logout to proceed normally
            if (nav === 'logout') {
                return;
            }
            
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Handle navigation
            handleNavigation(nav);
        });
    });
}

/**
 * Handle navigation actions
 */
function handleNavigation(navType) {
    switch(navType) {
        case 'home':
            window.location.href = '/student-dashboard/';
            break;
        case 'events':
            showNotification('My Events section coming soon!', 'info');
            break;
        case 'profile':
            showNotification('Profile section coming soon!', 'info');
            break;
        default:
            console.log('Unknown navigation type:', navType);
    }
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Setup form submission with validation
 */
function setupFormSubmission(formSelector, onSubmit) {
    const form = document.querySelector(formSelector);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            onSubmit(new FormData(form));
        });
    }
}

/**
 * Get form data as object
 */
function getFormData(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return null;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

/**
 * Set form field error
 */
function setFieldError(fieldName, errorMessage) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = errorMessage;
        field.parentNode.appendChild(errorEl);
    }
}

/**
 * Clear form field errors
 */
function clearFieldErrors(formSelector) {
    const form = document.querySelector(formSelector);
    if (form) {
        form.querySelectorAll('.field-error').forEach(el => el.remove());
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
}

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

/**
 * Save data to localStorage
 */
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('LocalStorage save error:', e);
        return false;
    }
}

/**
 * Get data from localStorage
 */
function getFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('LocalStorage get error:', e);
        return defaultValue;
    }
}

/**
 * Remove data from localStorage
 */
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('LocalStorage remove error:', e);
        return false;
    }
}

// ============================================
// IMAGE HANDLING
// ============================================

/**
 * Setup image error fallback
 */
function setupImageFallback(selector, fallbackSrc = null) {
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (fallbackSrc) {
                this.src = fallbackSrc;
            } else {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #9ca3af;
                `;
                placeholder.innerHTML = '<i class="fas fa-image"></i>';
                this.parentNode.appendChild(placeholder);
            }
        });
    });
}

/**
 * Lazy load images
 */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// ANIMATION UTILITIES
// ============================================

/**
 * Scroll to element smoothly
 */
function scrollToElement(elementSelector, offset = 0) {
    const element = document.querySelector(elementSelector);
    if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

/**
 * Add entrance animation to elements
 */
function animateElements(selector, animationClass = 'fade-in') {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add(animationClass);
        }, index * 100);
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all common functionality on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Setup navigation if it exists
    if (document.querySelector('.nav-link')) {
        setupNavigation();
    }

    // Setup image fallbacks
    setupImageFallback('img[data-fallback]');

    // Setup lazy loading
    setupLazyLoading();

    // Create style tag for animations
    if (!document.getElementById('app-animations-style')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'app-animations-style';
        styleTag.innerHTML = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .slide-in {
                animation: slideIn 0.3s ease;
            }

            .fade-in {
                animation: fadeIn 0.3s ease;
            }

            .field-error {
                color: #ef4444;
                font-size: 12px;
                margin-top: 4px;
                display: block;
            }

            input.error,
            textarea.error,
            select.error {
                border-color: #ef4444 !important;
                background-color: #fef2f2;
            }

            @media (max-width: 768px) {
                .notification {
                    right: 10px !important;
                    left: 10px !important;
                }
            }
        `;
        document.head.appendChild(styleTag);
    }
});

// ============================================
// EXPORT FOR MODULE SYSTEMS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        safeJSONParse,
        debounce,
        formatDate,
        formatTime,
        isEventUpcoming,
        showNotification,
        isValidEmail,
        handleError,
        getModal,
        openModal,
        closeModal,
        setupModalClickOutside,
        setupModalEscapeClose,
        setupNavigation,
        handleNavigation,
        setupFormSubmission,
        getFormData,
        setFieldError,
        clearFieldErrors,
        saveToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage,
        setupImageFallback,
        setupLazyLoading,
        scrollToElement,
        animateElements
    };
}
