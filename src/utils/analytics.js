/**
 * Google Analytics 4 & Meta Pixel Tracker Utility
 * Dynamically injects tracking scripts based on VITE_GA_ID and VITE_META_PIXEL_ID
 */

import { siteConfig } from '../data/config';

let isInitialized = false;

export function initAnalytics() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  const gaId = siteConfig.analytics.gaId;
  const metaPixelId = siteConfig.analytics.metaPixelId;

  // 1. Initialize Google Analytics 4
  if (gaId && gaId.startsWith('G-')) {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId, { page_path: window.location.pathname });
      console.log(`[Analytics] Google Analytics 4 initialized with ID: ${gaId}`);
    } catch (err) {
      console.warn('[Analytics] Failed to initialize GA4:', err);
    }
  }

  // 2. Initialize Meta Pixel
  if (metaPixelId && metaPixelId.trim().length > 4) {
    try {
      /* eslint-disable */
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      if (window.fbq) {
        window.fbq('init', metaPixelId);
        window.fbq('track', 'PageView');
        console.log(`[Analytics] Meta Pixel initialized with ID: ${metaPixelId}`);
      }
    } catch (err) {
      console.warn('[Analytics] Failed to initialize Meta Pixel:', err);
    }
  }
}

/**
 * Universal Event Tracker for GA4 and Meta Pixel
 * @param {string} eventName - name of the event
 * @param {object} params - additional payload
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  // Google Analytics tracking
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel tracking
  if (window.fbq) {
    // Map standard events if applicable
    if (eventName === 'contact_form_submit') {
      window.fbq('track', 'Lead', params);
    } else if (eventName === 'hire_me_click' || eventName === 'book_a_call_click') {
      window.fbq('track', 'Contact', params);
    } else {
      window.fbq('trackCustom', eventName, params);
    }
  }

  // Console feedback in dev mode
  if (import.meta.env.DEV) {
    console.log(`[Analytics Track] ${eventName}:`, params);
  }
}
