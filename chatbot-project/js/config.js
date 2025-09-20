// ===== APPLICATION CONFIGURATION =====

const CONFIG = {
  // API Configuration
  api: {
    deepai: {
      key: '2c19e3fa-d74d-49c2-855b-810e61dcbff8',
      baseUrl: 'https://api.deepai.org/api',
      endpoints: {
        textGenerator: '/text-generator',
        chatbot: '/text-generator', // Using text generator for chat
      },
      timeout: 30000, // 30 seconds
      retryAttempts: 3,
      retryDelay: 1000, // 1 second
    }
  },

  // Application Settings
  app: {
    name: 'AI Chatbot Assistant',
    version: '1.0.0',
    author: 'AI Chatbot Project',
    maxMessageLength: 2000,
    maxResponseLength: 1000,
    typingDelay: 1000, // Minimum typing delay in ms
    welcomeMessage: true,
    soundEffects: false,
    animations: true,
    theme: 'auto', // 'light', 'dark', 'auto'
  },

  // UI Configuration
  ui: {
    messages: {
      maxWidth: '80%',
      animationDelay: 100,
      fadeInDuration: 400,
      typingIndicatorDelay: 500,
    },
    input: {
      placeholder: 'Type your message here... (Shift+Enter for new line)',
      autoResize: true,
      submitOnEnter: true,
    },
    features: [
      {
        icon: '📚',
        title: 'Creative Writing',
        description: 'Stories, poems, and creative content',
      },
      {
        icon: '❓',
        title: 'Q&A Sessions',
        description: 'Get answers to your questions',
      },
      {
        icon: '💬',
        title: 'Conversations',
        description: 'Natural, engaging dialogue',
      },
      {
        icon: '✨',
        title: 'Text Generation',
        description: 'Custom text for any purpose',
      },
    ],
    examples: [
      {
        text: 'Write a story about a magical forest',
        icon: '📖',
        label: 'Write a Story',
      },
      {
        text: 'What is artificial intelligence?',
        icon: '🤔',
        label: 'Ask a Question',
      },
      {
        text: 'Hello, how are you today?',
        icon: '👋',
        label: 'Say Hello',
      },
    ],
  },

  // Local Storage Keys
  storage: {
    apiKey: 'chatbot_api_key',
    settings: 'chatbot_settings',
    theme: 'chatbot_theme',
    chatHistory: 'chatbot_history',
    userPreferences: 'chatbot_preferences',
  },

  // Response Processing
  processing: {
    storyKeywords: [
      'story', 'tale', 'narrative', 'write', 'create', 
      'tell me about', 'once upon', 'fiction', 'adventure',
      'character', 'plot', 'chapter'
    ],
    questionKeywords: [
      'what', 'why', 'how', 'when', 'where', 'who',
      'explain', 'describe', 'tell me', '?'
    ],
    greetingKeywords: [
      'hello', 'hi', 'hey', 'greetings', 'good morning',
      'good afternoon', 'good evening', 'howdy'
    ],
    maxCleanupAttempts: 3,
    minResponseLength: 10,
  },

  // Error Messages
  errors: {
    network: 'Network error. Please check your connection and try again.',
    timeout: 'Request timed out. Please try again.',
    apiKey: 'Invalid API key. Please check your settings.',
    rateLimit: 'Rate limit exceeded. Please wait a moment before trying again.',
    serverError: 'Server error. The AI service is temporarily unavailable.',
    generic: 'An unexpected error occurred. Please try again.',
    noResponse: 'No response received from the AI. Please try again.',
    invalidResponse: 'Received an invalid response. Please try again.',
  },

  // Success Messages
  messages: {
    connected: 'Successfully connected to AI service',
    settingsSaved: 'Settings saved successfully',
    settingsReset: 'Settings reset to default',
    chatCleared: 'Chat history cleared',
    themeChanged: 'Theme changed successfully',
  },

  // Development Settings
  dev: {
    debug: false, // Set to true for console logging
    mockAPI: false, // Set to true to use mock responses
    logLevel: 'info', // 'debug', 'info', 'warn', 'error'
    performanceMonitoring: false,
  },

  // Feature Flags
  features: {
    darkMode: true,
    soundEffects: true,
    fileUpload: false, // Future feature
    voiceInput: false, // Future feature
    exportChat: true,
    settingsModal: true,
    characterCounter: true,
    typingIndicator: true,
    messageTimestamps: false,
    messageActions: false, // Copy, delete, etc.
  },

  // Animation Settings
  animations: {
    enabled: true,
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  // Security Settings
  security: {
    sanitizeInput: true,
    maxRequestsPerMinute: 20,
    inputValidation: true,
    xssProtection: true,
  },

  // Performance Settings
  performance: {
    debounceDelay: 300, // ms
    throttleDelay: 100, // ms
    maxConcurrentRequests: 3,
    cacheResponses: false, // Disable for now
    preloadAssets: true,
  }
};

// Validate configuration on load
(function validateConfig() {
  // Check required API key
  if (!CONFIG.api.deepai.key) {
    console.warn('DeepAI API key not configured');
  }

  // Validate feature flags
  if (typeof CONFIG.features !== 'object') {
    console.error('Feature flags configuration is invalid');
  }

  // Log configuration in development mode
  if (CONFIG.dev.debug) {
    console.log('Application configuration loaded:', CONFIG);
  }
})();

// Make CONFIG globally available but read-only
if (typeof window !== 'undefined') {
  window.CONFIG = Object.freeze(CONFIG);
} else if (typeof module !== 'undefined') {
  module.exports = CONFIG;
}

// Export for ES6 modules
if (typeof export !== 'undefined') {
  export default CONFIG;
}