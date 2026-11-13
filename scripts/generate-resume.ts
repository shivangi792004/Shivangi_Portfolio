import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputPath = path.resolve('public/Shivangi_Singh_Resume.pdf');

const resumeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shivangi Singh - Resume</title>
  <style>
    @page {
      size: letter;
      margin: 0.45in 0.5in;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background: #ffffff;
      line-height: 1.35;
      font-size: 9.5pt;
    }
    header {
      border-bottom: 1.5px solid #4f46e5;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 18pt;
      font-weight: 700;
      color: #111827;
      letter-spacing: -0.5px;
    }
    .subtitle {
      font-size: 11pt;
      font-weight: 600;
      color: #4f46e5;
      margin-top: 2px;
    }
    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 8.5pt;
      color: #4b5563;
      margin-top: 4px;
    }
    .contact-bar a {
      color: #4b5563;
      text-decoration: none;
    }
    section {
      margin-bottom: 9px;
    }
    .section-title {
      font-size: 10.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 2px;
      margin-bottom: 5px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .item-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #111827;
    }
    .item-subtitle {
      font-size: 9pt;
      font-weight: 600;
      color: #4f46e5;
    }
    .item-date {
      font-size: 8.5pt;
      color: #6b7280;
      font-family: monospace;
    }
    ul {
      list-style-type: disc;
      padding-left: 15px;
      margin-top: 2px;
    }
    li {
      margin-bottom: 2px;
      color: #374151;
      font-size: 8.8pt;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 110px 1fr;
      row-gap: 3px;
      font-size: 8.8pt;
    }
    .skill-cat {
      font-weight: 600;
      color: #111827;
    }
    .skill-items {
      color: #374151;
    }
    .achievements-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .achieve-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      padding: 5px 8px;
    }
    .achieve-title {
      font-weight: 700;
      font-size: 9pt;
      color: #111827;
    }
    .achieve-desc {
      font-size: 8.2pt;
      color: #4b5563;
    }
  </style>
</head>
<body>

  <header>
    <h1>Shivangi Singh</h1>
    <div class="subtitle">Frontend Developer | Full-Stack Developer</div>
    <div class="contact-bar">
      <span>shivangisingh8688@gmail.com</span>
      <span>•</span>
      <span>linkedin.com/in/shivangisingh04</span>
      <span>•</span>
      <span>github.com/shivangi792004</span>
      <span>•</span>
      <span>India</span>
    </div>
  </header>

  <section>
    <div class="section-title">Professional Summary</div>
    <p style="font-size: 8.8pt; color: #374151; text-align: justify;">
      Computer Science graduate and Frontend Developer Intern passionate about building responsive, user-focused web applications with React.js, JavaScript, Node.js, Express.js, and MongoDB. Experienced in REST API integration, JWT authentication, and structured component architectures. Strong algorithmic foundation with 300+ LeetCode problems and 5-star ratings on HackerRank.
    </p>
  </section>

  <section>
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <div class="skill-cat">Languages:</div>
      <div class="skill-items">JavaScript, Python, C++, SQL</div>
      <div class="skill-cat">Frontend & Web:</div>
      <div class="skill-items">React.js, Tailwind CSS, HTML5, CSS3, REST APIs, Component Design</div>
      <div class="skill-cat">Backend & DB:</div>
      <div class="skill-items">Node.js, Express.js, MongoDB, MongoDB Atlas, MySQL, JWT Authentication, bcrypt</div>
      <div class="skill-cat">Tools & DevOps:</div>
      <div class="skill-items">Git, GitHub, Figma, Postman, Docker, Linux, VS Code, Render</div>
      <div class="skill-cat">Core CS:</div>
      <div class="skill-items">Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks</div>
    </div>
  </section>

  <section>
    <div class="section-title">Experience</div>
    <div class="item-header">
      <div>
        <span class="item-title">Triwize Journey Pvt. Ltd.</span>
        <span class="item-subtitle"> — Frontend Developer Intern</span>
      </div>
      <div class="item-date">Sep 2026 - Present</div>
    </div>
    <div style="font-size: 8.2pt; color: #6b7280; margin-bottom: 2px;">Gurugram (Remote) • Travel-Tech Startup</div>
    <ul>
      <li>Architecting and building responsive user interfaces for a trip-planning platform using React.js and Tailwind CSS.</li>
      <li>Converting Figma UI designs into modular, reusable components for complex itinerary and destination explorer pages.</li>
      <li>Integrating REST APIs to display live travel data and rigorously testing request/response cycles with Postman.</li>
      <li>Collaborating with backend and design teams via Git/GitHub workflows in an agile remote environment.</li>
    </ul>
  </section>

  <section>
    <div class="section-title">Featured Projects</div>

    <div style="margin-bottom: 6px;">
      <div class="item-header">
        <div>
          <span class="item-title">HospCare — Healthcare Management System</span>
          <span style="font-size: 8.5pt; color: #4f46e5; font-weight: 600;"> (MERN Stack Platform)</span>
        </div>
        <div class="item-date">May 2026</div>
      </div>
      <ul>
        <li>Co-developed a full-stack platform connecting patients and doctors for appointment booking, scheduling, and medical record access.</li>
        <li>Implemented JWT authentication, bcrypt password hashing, and role-based access control (RBAC) for patients and clinicians.</li>
        <li>Engineered 12+ REST API endpoints and designed a MongoDB schema with 4 collections indexed for rapid appointment queries.</li>
      </ul>
    </div>

    <div>
      <div class="item-header">
        <div>
          <span class="item-title">MERN Blog — Full-Stack Blogging Platform</span>
          <span style="font-size: 8.5pt; color: #4f46e5; font-weight: 600;"> (MERN Stack & Tailwind CSS)</span>
        </div>
        <div class="item-date">Oct 2025</div>
      </div>
      <ul>
        <li>Built an authenticated content platform allowing users to create, edit, delete, browse, and search articles.</li>
        <li>Integrated Express.js REST APIs with JWT authentication and protected routing via React Router.</li>
        <li>Deployed frontend and backend as a unified cloud service on Render with MongoDB Atlas for persistent storage.</li>
      </ul>
    </div>
  </section>

  <section>
    <div class="section-title">DSA & Achievements</div>
    <div class="achievements-grid">
      <div class="achieve-card">
        <div class="achieve-title">LeetCode: 300+ Solved</div>
        <div class="achieve-desc">200+ active days across Arrays, Trees, Graphs, and Dynamic Programming (Nov 2026).</div>
      </div>
      <div class="achieve-card">
        <div class="achieve-title">HackerRank: 5-Star Badges</div>
        <div class="achieve-desc">Gold badge level in C++, Python, and SQL with verified problem proficiency (Nov 2024).</div>
      </div>
      <div class="achieve-card">
        <div class="achieve-title">Board Infinity: C++ & DSA Training</div>
        <div class="achieve-desc">60+ hours, 100+ problems; built C++ Library Management System for 200+ records (Jul 2024).</div>
      </div>
      <div class="achieve-card">
        <div class="achieve-title">Industry Certifications</div>
        <div class="achieve-desc">Advanced SQL (HackerRank), DSA with C++ (Board Infinity), Programming in C++ (Coursera).</div>
      </div>
    </div>
  </section>

  <section>
    <div class="section-title">Education</div>
    <div class="item-header">
      <div>
        <span class="item-title">Lovely Professional University</span>
        <span style="font-size: 8.8pt; color: #374151;"> — B.Tech in Computer Science and Engineering</span>
      </div>
      <div class="item-date">Aug 2022 - Jun 2026</div>
    </div>
    <div style="font-size: 8.5pt; color: #4b5563;">Punjab, India • CGPA: 7.9 / 10</div>

    <div class="item-header" style="margin-top: 4px;">
      <div>
        <span class="item-title">Sri Chaitanya Junior College</span>
        <span style="font-size: 8.8pt; color: #374151;"> — Intermediate (Class XII), Science Stream</span>
      </div>
      <div class="item-date">Apr 2021 - Mar 2022</div>
    </div>
    <div style="font-size: 8.5pt; color: #4b5563;">Hyderabad, India • Score: 86%</div>
  </section>

</body>
</html>
`;

async function generatePdf() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(resumeHtml, { waitUntil: 'load' });
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.4in',
      right: '0.45in',
      bottom: '0.4in',
      left: '0.45in'
    }
  });

  await browser.close();
  console.log(`✅ Resume successfully generated at: ${outputPath}`);
}

generatePdf().catch(err => {
  console.error('Failed to generate resume:', err);
  process.exit(1);
});
