# 🌌 Roshan Singh Kushwaha — 3D AI Portfolio

A modern, responsive 3D personal portfolio website crafted for **Roshan Singh Kushwaha**, BBA in Digital Marketing & Artificial Intelligence student at **Lovely Professional University (LPU), Phagwara, Punjab**.

---

## ⚡ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (v3.4), PostCSS, Custom Cyberpunk Glassmorphism
- **3D Spatial Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Animations**: GSAP (ScrollTrigger), Framer Motion
- **Smooth Scrolling**: Lenis Smooth Scroll
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti, Custom Spring Cursor, 3D Tilt Cards, 3D Flip Cards

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/` to view the live site.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
d:/My Portfolio 1/
├── public/
│   ├── favicon.svg             # Glowing cyber emblem favicon
│   └── resume.pdf              # (Optional) Drop your PDF resume here
├── src/
│   ├── components/             # UI Components (One per section)
│   │   ├── LoadingScreen.jsx   # Boot sequence loader with progress bar
│   │   ├── CustomCursor.jsx    # Smooth spring cyber cursor
│   │   ├── ThemeToggle.jsx     # Dark/Light mode switcher with persistence
│   │   ├── ThreeHeroCanvas.jsx # 3D Three.js neural core & particle field
│   │   ├── Navbar.jsx          # Sticky glassmorphism header & mobile menu
│   │   ├── Hero.jsx            # Hero banner with typing effect & quick stats
│   │   ├── About.jsx           # Bio, cyber photo frame & journey timeline
│   │   ├── Education.jsx       # LPU degree details & prior studies
│   │   ├── Skills.jsx          # 3D orbital highlights & category filter
│   │   ├── Experience.jsx      # Chronological career & internship timeline
│   │   ├── Projects.jsx        # 3D tilt cards with results & case study modal
│   │   ├── ProjectModal.jsx    # In-depth case study popup modal
│   │   ├── Certificates.jsx    # 3D flip cards & credential zoom modal
│   │   ├── CertificateModal.jsx# Full certificate inspection modal
│   │   ├── Achievements.jsx    # Animated number counters & honor badges
│   │   ├── Testimonials.jsx    # Auto-sliding review carousel (pause on hover)
│   │   ├── Blog.jsx            # Marketing & AI insights card grid
│   │   ├── Contact.jsx         # Direct form, copy-email, WhatsApp & socials
│   │   └── Footer.jsx          # Navigation quick-links & back-to-top button
│   ├── data/                   # ⭐️ ALL EDITABLE CONTENT (No JSX edits needed!)
│   │   ├── personal.js         # Name, bio, phone, email, socials, stats
│   │   ├── education.js        # LPU details, grades, coursework, honors
│   │   ├── skills.js           # Skills categories, proficiencies, 3D orbit
│   │   ├── experience.js       # Internships, responsibilities, quantifiable impact
│   │   ├── projects.js         # Case studies, ROAS numbers, problem/solution
│   │   ├── certificates.js     # Google, Meta, HubSpot, Semrush credentials
│   │   ├── achievements.js     # Counter stats and award badges
│   │   ├── testimonials.js     # Mentor, professor & client recommendations
│   │   └── blogs.js            # Published articles & thought-leadership posts
│   ├── App.jsx                 # Root layout with Lenis & GSAP orchestration
│   ├── main.jsx                # React DOM root entry
│   └── index.css               # Tailwind directives, cyber grid & animations
├── index.html                  # SEO meta tags, Google Fonts, Open Graph
├── tailwind.config.js          # Custom colors, glows, keyframes
├── vite.config.js              # Vite bundler configuration
└── package.json
```

---

## ✏️ How to Customize Your Portfolio

All text, links, stats, and images are stored in `src/data/`:

| File | What you can edit |
|------|-------------------|
| `src/data/personal.js` | Your name, tagline, email, phone, WhatsApp number, LinkedIn/GitHub/Instagram URLs, bio, and profile photo. |
| `src/data/education.js` | LPU CGPA, semester updates, coursework, earlier school marks. |
| `src/data/skills.js` | Add or adjust skills, percentages, tools (SEO, Google Ads, AI, Canva). |
| `src/data/experience.js` | Add new internships, dates, bullet points, and impact metrics. |
| `src/data/projects.js` | Add case studies, client names, ROAS/traffic numbers, demo links. |
| `src/data/certificates.js` | Add verification links, credential IDs, and certificate images. |
| `src/data/achievements.js` | Update counter numbers and competition wins. |
| `src/data/testimonials.js` | Add quotes from your professors or internship supervisors. |
| `src/data/blogs.js` | Add your LinkedIn articles, medium posts, or marketing breakdowns. |

---

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial 3D AI portfolio commit"
   git remote add origin https://github.com/<your-username>/my-portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and import your GitHub repository.
4. Framework Preset: **Vite** (detected automatically).
5. Click **"Deploy"**. Vercel will build and assign you a free HTTPS `.vercel.app` URL!

### Option 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Click **"Add new site"** &rarr; **"Import an existing project"**.
3. Connect your GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **"Deploy Site"**.
