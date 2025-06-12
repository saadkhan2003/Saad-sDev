/**
 * Storage utility for handling local storage operations safely
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

/**
 * Utility for managing user preferences
 */
export const userPreferences = {
  theme: {
    get: (): 'light' | 'dark' | 'system' => {
      return storage.get<'light' | 'dark' | 'system'>('saad-dev-theme', 'system');
    },
    set: (theme: 'light' | 'dark' | 'system'): void => {
      storage.set('saad-dev-theme', theme);
    }
  },

  newsletterDismissed: {
    get: (): boolean => {
      return storage.get<boolean>('saad-dev-newsletter-dismissed', false);
    },
    set: (dismissed: boolean): void => {
      storage.set('saad-dev-newsletter-dismissed', dismissed);
    }
  }
};

/**
 * Helper functions for date formatting
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Calculate reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export const calculateReadingTime = (text: string, wordsPerMinute = 200): number => {
  const plainText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return minutes;
};
