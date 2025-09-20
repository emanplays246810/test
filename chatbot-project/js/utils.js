// ===== UTILITY FUNCTIONS =====

const Utils = {
  
  // ===== DOM UTILITIES =====
  
  /**
   * Get element by ID with error handling
   */
  getElementById: (id) => {
    const element = document.getElementById(id);
    if (!element && CONFIG.dev.debug) {
      console.warn(`Element with ID '${id}' not found`);
    }
    return element;
  },

  /**
   * Get elements by class name
   */
  getElementsByClass: (className) => {
    return Array.from(document.getElementsByClassName(className));
  },

  /**
   * Create element with attributes
   */
  createElement: (tag, attributes = {}, textContent = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (textContent) {
      element.textContent = textContent;
    }
    
    return element;
  },

  /**
   * Add event listener with error handling
   */
  addEventListener: (element, event, handler, options = {}) => {
    if (!element) {
      console.error('Cannot add event listener: element is null');
      return;
    }
    
    try {
      element.addEventListener(event, handler, options);
    } catch (error) {
      console.error('Error adding event listener:', error);
    }
  },

  /**
   * Remove event listener safely
   */
  removeEventListener: (element, event, handler) => {
    if (element) {
      element.removeEventListener(event, handler);
    }
  },

  // ===== STRING UTILITIES =====

  /**
   * Sanitize HTML to prevent XSS
   */
  sanitizeHtml: (str) => {
    if (!CONFIG.security.xssProtection) return str;
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Escape HTML entities
   */
  escapeHtml: (str) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, m => map[m]);
  },

  /**
   * Format text with line breaks
   */
  formatText: (text) => {
    return text
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  },

  /**
   * Truncate text to specified length
   */
  truncateText: (text, maxLength, suffix = '...') => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  },

  /**
   * Clean up text response
   */
  cleanupText: (text, originalMessage = '') => {
    if (!text) return '';
    
    let cleaned = text.trim();
    
    // Remove original message if repeated
    if (originalMessage && cleaned.includes(originalMessage)) {
      cleaned = cleaned.replace(new RegExp(originalMessage, 'gi'), '').trim();
    }
    
    // Remove common API artifacts
    const artifacts = [
      /^(Human:|AI:|Assistant:|Bot:)/gi,
      /^[:\-\s]+/,
      /\n{3,}/g,
      /\s{3,}/g
    ];
    
    artifacts.forEach(pattern => {
      cleaned = cleaned.replace(pattern, pattern.source.includes('\n') ? '\n\n' : ' ');
    });
    
    return cleaned.trim();
  },

  /**
   * Check if text contains specific keywords
   */
  containsKeywords: (text, keywords) => {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
  },

  // ===== LOCAL STORAGE UTILITIES =====

  /**
   * Set item in localStorage with error handling
   */
  setStorage: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  /**
   * Get item from localStorage with error handling
   */
  getStorage: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeStorage: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all localStorage for the app
   */
  clearStorage: () => {
    try {
      Object.values(CONFIG.storage).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // ===== VALIDATION UTILITIES =====

  /**
   * Validate message input
   */
  validateMessage: (message) => {
    if (!message || typeof message !== 'string') {
      return { valid: false, error: 'Message must be a non-empty string' };
    }
    
    if (message.trim().length === 0) {
      return { valid: false, error: 'Message cannot be empty' };
    }
    
    if (message.length > CONFIG.app.maxMessageLength) {
      return { 
        valid: false, 
        error: `Message too long (max ${CONFIG.app.maxMessageLength} characters)` 
      };
    }
    
    return { valid: true };
  },

  /**
   * Validate API key format
   */
  validateApiKey: (key) => {
    if (!key || typeof key !== 'string') {
      return false;
    }
    
    // Basic DeepAI API key format validation
    return key.length >= 10 && key.includes('-');
  },

  /**
   * Validate email format
   */
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // ===== TIME UTILITIES =====

  /**
   * Format timestamp
   */
  formatTimestamp: (date = new Date()) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  /**
   * Get relative time string
   */
  getRelativeTime: (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  },

  /**
   * Sleep/delay utility
   */
  sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // ===== PERFORMANCE UTILITIES =====

  /**
   * Debounce function calls
   */
  debounce: (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  /**
   * Throttle function calls
   */
  throttle: (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  },

  /**
   * Measure performance
   */
  measurePerformance: (name, func) => {
    if (!CONFIG.dev.performanceMonitoring) {
      return func();
    }
    
    const start = performance.now();
    const result = func();
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  },

  // ===== RANDOM UTILITIES =====

  /**
   * Generate random ID
   */
  generateId: (prefix = 'id') => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Get random item from array
   */
  getRandomItem: (array) => {
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * Shuffle array
   */
  shuffleArray: (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // ===== DEVICE DETECTION =====

  /**
   * Check if device is mobile
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Check if device is touch enabled
   */
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  /**
   * Get device type
   */
  getDeviceType: () => {
    const width = window.innerWidth;
    if (width <= 575) return 'mobile';
    if (width <= 768) return 'tablet';
    if (width <= 992) return 'laptop';
    return 'desktop';
  },

  // ===== CLIPBOARD UTILITIES =====

  /**
   * Copy text to clipboard
   */
  copyToClipboard: async (text) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  },

  // ===== ANIMATION UTILITIES =====

  /**
   * Add CSS class with animation
   */
  animateElement: (element, className, duration = 300) => {
    if (!element || !CONFIG.animations.enabled) return Promise.resolve();
    
    return new Promise(resolve => {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
        resolve();
      }, duration);
    });
  },

  /**
   * Smooth scroll to element
   */
  scrollToElement: (element, behavior = 'smooth') => {
    if (element) {
      element.scrollIntoView({ behavior, block: 'end' });
    }
  },

  // ===== ERROR HANDLING =====

  /**
   * Log error with context
   */
  logError: (error, context = '') => {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context,
      message: error.message || error,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    if (CONFIG.dev.debug) {
      console.error('Application Error:', errorInfo);
    }
    
    // In production, you might want to send this to an error tracking service
    return errorInfo;
  },

  /**
   * Safe function execution with error handling
   */
  safeExecute: (func, fallback = null, context = '') => {
    try {
      return func();
    } catch (error) {
      Utils.logError(error, context);
      return fallback;
    }
  }
};

// Make Utils globally available
if (typeof window !== 'undefined') {
  window.Utils = Utils;
}

// Export for modules
if (typeof module !== 'undefined') {
  module.exports = Utils;
}