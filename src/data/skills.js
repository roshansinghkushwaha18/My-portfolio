/**
 * SKILLS & TECH STACK DATA
 * Edit this file to add, modify, or reorder your skills and proficiency levels.
 */
export const skillsData = {
  categories: [
    { id: "all", name: "All Capabilities" },
    { id: "ai", name: "AI & Automation" },
    { id: "digital", name: "Digital Marketing & SEO" },
    { id: "ads", name: "Paid Advertising & CRO" },
    { id: "content", name: "Content & Design" },
    { id: "analytics", name: "Analytics & Tools" }
  ],
  skills: [
    // AI Tools & Automation
    {
      id: "ai-prompting",
      name: "ChatGPT & Prompt Engineering",
      category: "ai",
      proficiency: 95,
      level: "Advanced",
      icon: "Bot",
      color: "#00f0ff",
      description: "Crafting structured multi-step prompts for research, copy generation, and strategy synthesis."
    },
    {
      id: "make-zapier",
      name: "Make.com & Zapier Automation",
      category: "ai",
      proficiency: 88,
      level: "Proficient",
      icon: "Zap",
      color: "#8b5cf6",
      description: "Building automated marketing pipelines, webhook routers, and auto-publishing sequences."
    },
    {
      id: "midjourney-claude",
      name: "Midjourney & Claude AI",
      category: "ai",
      proficiency: 92,
      level: "Advanced",
      icon: "Sparkles",
      color: "#ec4899",
      description: "High-impact visual asset generation and deep long-form analytical copy auditing."
    },
    {
      id: "ai-workflows",
      name: "Generative AI Search (GEO/SGE)",
      category: "ai",
      proficiency: 85,
      level: "Proficient",
      icon: "Cpu",
      color: "#38bdf8",
      description: "Optimizing brand presence for AI answer engines (Perplexity, ChatGPT Search, Gemini)."
    },

    // Digital Marketing & SEO
    {
      id: "seo-strategy",
      name: "Search Engine Optimization (SEO)",
      category: "digital",
      proficiency: 94,
      level: "Expert",
      icon: "Search",
      color: "#10b981",
      description: "Comprehensive Technical SEO, On-page semantics, Core Web Vitals, and backlink architectures."
    },
    {
      id: "smm",
      name: "Social Media Marketing (SMM)",
      category: "digital",
      proficiency: 92,
      level: "Expert",
      icon: "Share2",
      color: "#f59e0b",
      description: "Viral distribution systems, community management, and Instagram/LinkedIn growth blueprints."
    },
    {
      id: "semrush-ahrefs",
      name: "Semrush & Ahrefs Research",
      category: "digital",
      proficiency: 89,
      level: "Advanced",
      icon: "Compass",
      color: "#f97316",
      description: "Competitor gap analysis, keyword intent clustering, and SERP volatility tracking."
    },

    // Paid Ads & Performance
    {
      id: "google-ads",
      name: "Google Ads (Search & PMax)",
      category: "ads",
      proficiency: 91,
      level: "Advanced",
      icon: "Target",
      color: "#00f0ff",
      description: "Precision bidding, negative keyword trees, Performance Max automation, and high Quality Scores."
    },
    {
      id: "meta-ads",
      name: "Meta Ads Manager (FB & IG)",
      category: "ads",
      proficiency: 93,
      level: "Expert",
      icon: "TrendingUp",
      color: "#3b82f6",
      description: "Advantage+ creative scaling, custom audience retargeting, and full-funnel video ads."
    },
    {
      id: "cro-ab",
      name: "Conversion Rate Optimization (CRO)",
      category: "ads",
      proficiency: 86,
      level: "Proficient",
      icon: "CheckCircle",
      color: "#ec4899",
      description: "A/B testing landing pages, heatmaps analysis, copy hooks, and friction point reduction."
    },

    // Content & Design
    {
      id: "canva-pro",
      name: "Canva Pro & Visual Branding",
      category: "content",
      proficiency: 96,
      level: "Master",
      icon: "Palette",
      color: "#06b6d4",
      description: "High-converting ad creatives, infographics, carousels, and complete visual branding kits."
    },
    {
      id: "copywriting",
      name: "Copywriting & Storytelling",
      category: "content",
      proficiency: 90,
      level: "Advanced",
      icon: "PenTool",
      color: "#a855f7",
      description: "Psychological framing (AIDA, PAS), high-converting email sequences, and punchy ad headlines."
    },

    // Analytics & Tools
    {
      id: "ga4",
      name: "Google Analytics 4 (GA4)",
      category: "analytics",
      proficiency: 89,
      level: "Advanced",
      icon: "BarChart3",
      color: "#eab308",
      description: "Custom event telemetry, conversion funnels, attribution modeling, and user journey tracking."
    },
    {
      id: "looker-studio",
      name: "Looker Studio & Data Dashboards",
      category: "analytics",
      proficiency: 87,
      level: "Proficient",
      icon: "PieChart",
      color: "#6366f1",
      description: "Automated executive client reporting combining Google Ads, Meta Ads, and Organic Search."
    }
  ],

  // 3D Orbital Floating Highlights for Hero & Skill Orbit
  orbitHighlights: [
    { title: "SEO", icon: "Search", color: "#10b981", tag: "Organic Dominance" },
    { title: "Google Ads", icon: "Target", color: "#00f0ff", tag: "High Intent" },
    { title: "Meta Ads", icon: "TrendingUp", color: "#3b82f6", tag: "Paid Scaling" },
    { title: "AI Tools", icon: "Bot", color: "#a855f7", tag: "Next-Gen Automation" },
    { title: "Canva Pro", icon: "Palette", color: "#06b6d4", tag: "Creative Studio" },
    { title: "GA4", icon: "BarChart3", color: "#eab308", tag: "Predictive Analytics" },
    { title: "Content", icon: "PenTool", color: "#ec4899", tag: "Brand Story" }
  ]
};
