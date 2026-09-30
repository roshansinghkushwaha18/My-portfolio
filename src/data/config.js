/**
 * GLOBAL CONFIGURATION & EDITABLE PLACEHOLDERS
 * 
 * Edit this file to turn features on/off and update links, phone numbers,
 * Calendly booking, and social profile URLs without modifying components!
 */

export const siteConfig = {
  // 1. Internship Availability Badge
  // Toggle this boolean to show/hide the blinking green badge in Navbar & Hero
  availableForInternship: true,
  internshipBadgeText: "Available for Winter 2026/2027 Internships",

  // 2. Direct Channels
  // [EDITABLE PLACEHOLDER: Enter 10-12 digit WhatsApp number with country code, no +, no spaces]
  whatsappNumber: "917521911901",
  whatsappPrefilledMessage: "Hi Roshan! I came across your work and I am interested in working with you",

  // 3. Calendly / Book a Call
  // [EDITABLE PLACEHOLDER: Replace with your actual Calendly / Cal.com link]
  calendlyUrl: "https://calendly.com/roshanku7521/30min",

  // 4. Contact Information
  email: "roshanku7521@gmail.com",
  phone: "+91 7521911901",
  location: "Lovely Professional University, Phagwara, Punjab, India",
  resumePdfUrl: "/resume.pdf",

  // 5. Social Links
  socials: {
    linkedin: "https://www.linkedin.com/in/roshan-singh-kushwaha-4b0633429",
    github: "https://github.com/roshansinghkushwaha18",
    instagram: "https://www.instagram.com/rk_roshan_ji_?stkn=MTkyZHpwd3Q3dTR1Zw==",
    twitter: "https://x.com/roshan_sin85047",
  },

  // 6. Sound Effects
  soundEffects: {
    enabledByDefault: false, // OFF by default as per requirements
  },

  // 7. Easter Egg
  easterEgg: {
    logoClickThreshold: 5, // Number of rapid clicks on logo to trigger confetti blast
  },

  // 8. Analytics (uses environment variables with fallback safe placeholders)
  analytics: {
    gaId: import.meta.env.VITE_GA_ID || "",
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID || "",
  }
};
