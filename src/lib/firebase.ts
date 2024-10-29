import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Custom analytics events
export const logCustomEvent = (eventName: string, eventParams?: Record<string, any>) => {
  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Predefined analytics events
export const analyticsEvents = {
  pageView: (pageName: string) => logCustomEvent('page_view', { page_name: pageName }),
  signUpStart: () => logCustomEvent('sign_up_start'),
  signUpComplete: () => logCustomEvent('sign_up_complete'),
  emailVerificationSent: () => logCustomEvent('email_verification_sent'),
  emailVerified: () => logCustomEvent('email_verified'),
  loginSuccess: () => logCustomEvent('login_success'),
  downloadLogo: () => logCustomEvent('logo_download'),
  featureClick: (featureName: string) => logCustomEvent('feature_click', { feature_name: featureName }),
  faqExpand: (question: string) => logCustomEvent('faq_expand', { question }),
};