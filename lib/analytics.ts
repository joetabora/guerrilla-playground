/**
 * Analytics utilities - stubbed for future implementation
 * Add Google Analytics, Plausible, or other analytics providers here
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Stub implementation
  if (typeof window !== 'undefined' && window.gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gtag('event', eventName, properties);
  }
  console.log('Analytics event:', eventName, properties);
};

export const trackPageView = (path: string) => {
  // Stub implementation
  if (typeof window !== 'undefined' && window.gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: path
    });
  }
  console.log('Page view:', path);
};

