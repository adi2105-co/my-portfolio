// ✏️ EDIT THIS FILE to change your content. Drop your photo at public/photo.jpg
export const config = {
  name: "Aditya Singh",
  initials: "AS",
  photo: "/photo.png", // transparent cutout PNG in /public/photo.png
  roles: [
    "SOC Analyst Aspirant",
    "Cybersecurity & Cryptography Honors",
    "Full-Stack Developer",
    "Ethical Hacking Enthusiast",
  ],
  tagline:
    "Securing networks & building defense. I explore vulnerabilities, learn how attackers think, and craft secure software.",
  status: "Open to SOC Analyst (L1) internships & roles",
  orbit: ["SIEM", "MITRE ATT&CK", "AES-256", "nmap", "Wireshark", "OWASP", "MERN", "Python"],
  marquee: [
    ["Cybersecurity", "Cryptography", "Threat Detection", "Incident Response", "Ethical Hacking", "SIEM", "Network Security"],
    ["React", "Node.js", "Python", "MongoDB", "Three.js", "C++", "DSA", "Machine Learning"],
  ],
  terminal: [
    "$ whoami",
    "aditya_singh — cybersecurity student & full-stack dev",
    "$ cat focus.txt",
    "SOC monitoring · threat detection · incident response",
    "$ ls skills/",
    "cryptography/  network-sec/  python/  react/  dsa/",
    "$ status --hiring",
    "open to SOC Analyst L1 internships  [ OK ]",
  ],
  resume: "", // e.g. "/resume.pdf" (put the file in /public). Leave empty to hide the button.

  about: {
    text: "Final-year Computer Engineering student at Universal College of Engineering, Mumbai. I completed the Cyber Security Honors program with a focus on cryptography, and I'm building toward a SOC Analyst (L1) role — monitoring, triage and incident response. I also build full-stack products with the MERN stack and Python.",
    stats: [
      { value: "9.13", label: "Sem 6 Result" },
      { value: "2027", label: "B.E. Graduation" },
      { value: "6 mo", label: "Industry Internship" },
    ],
  },

  experience: [
    {
      when: "Mar 2026 — Sep 2026",
      title: "Service Management Intern",
      org: "Faxonics Technologies",
      points: [
        "Worked on IT service management processes: ticket handling, incident tracking and escalation workflows.",
        "Built a habit of structured documentation and clear communication under SLA-style deadlines.",
      ],
    },
    {
      when: "2023 — 2027",
      title: "B.E. Computer Engineering",
      org: "Universal College of Engineering, Vasai",
      points: [
        "Cyber Security Honors (Semesters 5 & 6) — cryptography, network security, ethical hacking.",
        "Strong foundation in C++, Data Structures & Algorithms, ML, NLP and Big Data.",
      ],
    },
  ],

  projects: [
    {
      title: "HopeScan",
      desc: "AI-assisted breast cancer diagnostics platform: MERN frontend/back-end with a Python ML model for prediction.",
      tags: ["MongoDB", "Express", "React", "Node.js", "Python", "ML"],
      live: "",
      code: "",
    },
    {
      title: "Digital Flora",
      desc: "A 3D virtual herbal garden of AYUSH medicinal plants with an immersive, interactive experience.",
      tags: ["Three.js", "3D", "JavaScript", "Vercel"],
      live: "https://digital-flora-main.vercel.app/",
      code: "",
    },
    {
      title: "YouTube Hub",
      desc: "Multi-level playlist and study-resource manager for structured learning path tracking.",
      tags: ["JavaScript", "Tailwind CSS", "oEmbed API", "Vercel"],
      live: "https://youtube-hub-fawn.vercel.app/",
      code: "https://github.com/adi2105-co/YOUTUBE-HUB",
    },
    {
      title: "CommerceLens",
      desc: "E-commerce analytics dashboard built as a Big Data Analysis group project.",
      tags: ["Big Data", "Analytics", "Dashboard"],
      live: "",
      code: "",
    },
    {
      title: "Fininclusive",
      desc: "Financial-inclusion web app that evaluates loan creditworthiness for under-served users.",
      tags: ["Web App", "ML", "FinTech"],
      live: "https://fininclusive.vercel.app/",
      code: "",
    },
  ],

  skills: [
    { group: "Security", items: ["Cryptography", "Ethical Hacking", "Network Security", "SIEM Basics", "Incident Response"] },
    { group: "Languages", items: ["C++", "Python", "JavaScript", "SQL"] },
    { group: "Web", items: ["React / Next.js", "Node.js", "Express", "Tailwind CSS", "REST APIs"] },
    { group: "Core CS", items: ["DSA", "DBMS", "OS", "Machine Learning", "NLP"] },
    { group: "Tools", items: ["Git & GitHub", "Vercel", "Linux", "Postman"] },
  ],

  // ✏️ Replace the placeholders (email, LinkedIn) with your real ones.
  contact: [
    { label: "Email", handle: "adityasingh9970443690@gmail.com", href: "mailto:adityasingh9970443690@gmail.com", icon: "mail" },
    { label: "LinkedIn", handle: "linkedin.com/in/aditya-singh-47915520b", href: "https://www.linkedin.com/in/aditya-singh-47915520b", icon: "linkedin" },
    { label: "GitHub", handle: "adi2105-co", href: "https://github.com/adi2105-co", icon: "github" },
    { label: "Instagram", handle: "@its_adityasingh21", href: "https://www.instagram.com/its_adityasingh21/", icon: "instagram" },
    { label: "LeetCode", handle: "fdJtgFM2LO", href: "https://leetcode.com/u/fdJtgFM2LO/", icon: "code" },
  ],
};
