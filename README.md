# Shivangi Singh — Personal Portfolio & Engineering Showcase

[![Live Demo](https://img.shields.io/badge/Live%20Demo-shivangi--portfolio.vercel.app-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://shivangi-portfolio.vercel.app)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-99%20%7C%20100%20%7C%20100%20%7C%20100-success?style=for-the-badge&logo=lighthouse&logoColor=white)](https://shivangi-portfolio.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A production-grade, high-performance personal portfolio built for **Shivangi Singh** (Frontend & Full-Stack Developer). Designed from the ground up for authenticity, recruiter clarity, zero layout shift, seamless keyboard accessibility, and a modern developer aesthetic.

---

## 🌟 Highlights & Key Features

- **⚡ Blazing Fast (99/100/100/100 Lighthouse)**: Optimized bundle sizes, preloaded fonts (`Geist Sans` & `Geist Mono`), zero layout shift, and instant sub-second rendering.
- **♿ Inclusive Accessibility (WCAG 2.2 AA)**: Fully accessible landmarks, visible keyboard focus rings, skip-to-content navigation, and native support for `prefers-reduced-motion`.
- **⌨️ Command Palette (`⌘K` / `Ctrl+K`)**: Rapid keyboard-driven navigation across sections, direct contact actions, and quick resume downloads.
- **💻 Interactive Developer Terminal (`>_`)**: Authentic Unix-style CLI terminal supporting interactive commands (`help`, `skills`, `projects`, `contact`, `theme`, `clear`, `resume`).
- **🌓 Dynamic Theme Engine**: Smooth dark/light mode toggle with system preference detection and persistent local storage state.
- **🏗️ Data-Driven Architecture**: Clean separation between presentation components and domain content (`src/data/*.ts`), ensuring zero hardcoded data duplication.
- **📬 Dual-Dispatch Contact System**: Optional EmailJS direct messaging paired with an automatic, pre-formatted client mailto fallback.

---

## 🛠️ Tech Stack & Architecture

### Frontend Architecture
| Layer | Technologies |
| :--- | :--- |
| **Framework & Runtime** | [React 18](https://react.dev/) + [TypeScript 5.6](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 5](https://vitejs.dev/) with SWC compiler |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/) with `@tailwindcss/typography` |
| **Typography** | Vercel [`Geist Sans`](https://vercel.com/font/sans) & [`Geist Mono`](https://vercel.com/font/mono) via Fontsource |
| **Icons & Micro-interactions** | [Lucide React](https://lucide.dev/) + [Framer Motion](https://www.framer.com/motion/) |
| **Form Dispatch** | [@emailjs/browser](https://www.emailjs.com/) with native mailto fallback |

### Project Directory Structure
```
Shivangi_Portfolio/
├── public/                     # Static assets (Favicon suite, Resume PDF)
│   ├── Shivangi_Singh_Resume.pdf
│   ├── favicon.svg
│   ├── favicon-32x32.png
│   └── site.webmanifest
├── src/
│   ├── components/             # Modular UI components
│   │   ├── layout/             # Navigation, Footer, Mobile Drawer
│   │   ├── sections/           # Hero, About, Skills, Projects, DSA, Contact
│   │   ├── stretch/            # CommandPalette (⌘K), InteractiveTerminal
│   │   └── ui/                 # Accessible buttons, modals, badges, cards
│   ├── data/                   # Single source of truth for portfolio content
│   │   ├── profile.ts          # Bio, contact, headlines, status
│   │   ├── skills.ts           # Categorized tech skills with proficiency
│   │   ├── projects.ts         # Full-stack projects with live demo links
│   │   ├── experience.ts       # Work experience & internships
│   │   ├── education.ts        # Degrees & verified certifications
│   │   ├── dsa.ts              # Problem solving statistics & profiles
│   │   └── links.ts            # Canonical link registry
│   ├── types/                  # Strict TypeScript interfaces & definitions
│   ├── index.css               # Tailwind directives, theme variables, focus styles
│   ├── App.tsx                 # Root application layout
│   └── main.tsx                # Application entrypoint
├── .gitignore                  # Security-first ignore rules (.env protected)
├── tailwind.config.ts          # Custom design system tokens & colors
├── tsconfig.json               # Strict TypeScript configuration
└── vite.config.ts              # Optimized Vite build configuration
```

---

## 🚀 Featured Projects

### 1. HospCare — Healthcare Management System
*Full-Stack Healthcare & Appointment Platform*
- **Stack**: React.js, Node.js, Express.js, MongoDB, JWT, bcrypt, REST APIs
- **Features**: Patient and doctor appointment booking, scheduling, medical record management, and secure role-based access control.
- **Links**: [GitHub Repository](https://github.com/shivangi792004/HospCare) · [Live Demo](https://hosp-care-qoov.vercel.app/)

### 2. MERN Blog — Full-Stack Publishing Platform
*Responsive Blogging & Content Management System*
- **Stack**: React.js, Tailwind CSS, Node.js, Express.js, MongoDB Atlas, JWT
- **Features**: Full CRUD post management, real-time search, protected routes with React Router, and secure password hashing.
- **Links**: [GitHub Repository](https://github.com/shivangi792004/mern-blog) · [Live Demo](https://mern-blog-jn6u.onrender.com)

---

## 📊 Problem Solving & Algorithms

- **Total Solved**: 200+ Data Structures & Algorithms challenges
- **Profiles**:
  - [LeetCode Profile (@shivangi792004)](https://leetcode.com/u/shivangi792004/)
  - [HackerRank Profile (@shivangi792004)](https://www.hackerrank.com/profile/shivangi792004)
- **Core Topics**: Arrays, Two Pointers, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, and C++ STL.

---

## 💻 Local Development & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivangi792004/Shivangi_Portfolio.git
   cd Shivangi_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🔒 Security & Privacy

- **Zero Secret Commits**: Environment files containing sensitive API tokens (`.env`) are strictly ignored via `.gitignore` to protect privacy and maintain enterprise security standards.
- **Authenticity First**: Every metric, link, education record, and project corresponds strictly to verified work without synthetic data.

---

## 📬 Contact & Connect

- **Name**: Shivangi Singh
- **Email**: [shivangisingh8688@gmail.com](mailto:shivangisingh8688@gmail.com)
- **Phone**: [+91 8688128210](tel:+918688128210)
- **LinkedIn**: [linkedin.com/in/shivangisingh04](https://linkedin.com/in/shivangisingh04/)
- **GitHub**: [github.com/shivangi792004](https://github.com/shivangi792004)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
