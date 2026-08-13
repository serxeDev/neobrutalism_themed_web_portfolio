/* ============================================================
   DATA.JS - Centralized site data for the Neo-Brutalism Portfolio
   ============================================================ */

const siteData = {
  // ---------- Brand / Header / Footer ----------
  brand: {
    title: "TITLE",
    subtitle: "HERE",
  },

  // ---------- Navigation ----------
  nav: [
    { label: "Home", href: "#layer-hero" },
    { label: "Projects", href: "#layer-projects" },
    { label: "Services", href: "#layer-services" },
    { label: "Certifications", href: "#layer-certifications" },
    { label: "Contact Me", href: "#layer-contact", isContact: true },
  ],

  // ---------- Hero Section ----------
  hero: {
    title: "TITLE",
    titleHighlight: "HERE",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    email: "YOUREMAIL@COMPANY.COM",
    heroImage: "assets/img/person2.png",
  },

  // ---------- Stats counters ----------
  stats: [
    { label: "Services", target: 30, color: "var(--accent-pink)" },
    { label: "Projects", target: 25, color: "var(--accent-blue)" },
    { label: "Clients", target: 500, color: "var(--accent-green, #00ff00)" },
  ],

  // ---------- Sellable Projects ----------
  // Each project is a "product" available for purchase.
  // `images` is an array so the modal can cycle with a Next button.
  projects: [
    {
      id: "p1",
      title: "PROJECT 1",
      date: "01/04/2026",
      price: "$49",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description:
        "A complete pixel-perfect landing page template built with modern HTML5, CSS3 and vanilla JavaScript. Includes responsive layouts, smooth animations, and a fully working contact form. Perfect for indie creators who want a bold, brutalist aesthetic.",
      languages: ["HTML5", "CSS3", "JavaScript"],
      images: [
        "assets/img/pixel1.jpg",
        "assets/img/pixel2.jpg",
        "assets/img/pixel3.jpg",
      ],
    },
    {
      id: "p2",
      title: "PROJECT 2",
      date: "01/04/2026",
      price: "$79",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description:
        "A bold neo-brutalist dashboard template featuring bold borders, hard shadows, and a strong color palette. Includes a sidebar navigation, data tables, charts, and a notifications panel. Ideal for SaaS startups that want to stand out.",
      languages: ["React", "Bootstrap", "SCSS"],
      images: [
        "assets/img/pixel2.jpg",
        "assets/img/pixel3.jpg",
        "assets/img/pixel1.jpg",
      ],
    },
    {
      id: "p3",
      title: "PROJECT 3",
      date: "01/04/2026",
      price: "$99",
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description:
        "A full-stack e-commerce starter built for speed and character. Comes with product listing pages, cart functionality, checkout flow and an admin dashboard. Hard-edged brutalist design that converts visitors into buyers.",
      languages: ["Next.js", "Node.js", "MongoDB"],
      images: [
        "assets/img/pixel3.jpg",
        "assets/img/pixel1.jpg",
        "assets/img/pixel2.jpg",
      ],
    },
  ],

  // ---------- Why Choose Me (Reasons) ----------
  reasons: [
    {
      num: 1,
      title: "Reason 1",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam eos placeat inventore quia assumenda beatae?",
      color: "var(--accent-pink)",
    },
    {
      num: 2,
      title: "Reason 2",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam eos placeat inventore quia assumenda beatae?",
      color: "var(--accent-blue)",
    },
    {
      num: 3,
      title: "Reason 3",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam eos placeat inventore quia assumenda beatae?",
      color: "var(--accent-green)",
    },
    {
      num: 4,
      title: "Reason 4",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam eos placeat inventore quia assumenda beatae?",
      color: "var(--accent-green)",
    },
    {
      num: 5,
      title: "Reason 5",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam eos placeat inventore quia assumenda beatae?",
      color: "var(--bg-yellow)",
    },
    {
      num: 6,
      title: "Reason 6",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam eos placeat inventore quia assumenda beatae?",
      color: "#b0a4f1",
    },
  ],

  // ---------- Services ----------
  services: [
    {
      title: "SERVICE 1",
      icon: "fas fa-cubes",
      price: "$25",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sapiente ducimus doloribus veritatis similique doloremque reiciendis, consequatur dignissimos rerum.",
      features: [
        "Consequatur dignissimos",
        "Repellat sapiente",
        "Doloribus veritatis",
      ],
      badge: { text: "STARTER", bg: "bg-dark", color: "text-white" },
    },
    {
      title: "SERVICE 2",
      icon: "fas fa-draw-polygon",
      price: "$80",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sapiente ducimus doloribus veritatis similique doloremque reiciendis.",
      features: [
        "Consequatur dignissimos",
        "Repellat sapiente",
        "Doloribus veritatis",
      ],
      badge: { text: "PREMIUM", bg: "bg-danger", color: "text-white" },
      cardStyle: { background: "var(--bg-yellow)", border: "4px solid #000" },
      priceBadgeStyle: { background: "var(--accent-blue)" },
    },
  ],

  // ---------- Certifications ----------
  certifications: [
    {
      id: "c1",
      title: "Frontend Developer Certificate",
      issuer: "Meta / Coursera",
      date: "2025",
      badge: "assets/img/pixel1.jpg",
      desc: "Completed professional certification covering HTML, CSS, JavaScript and React.",
      tags: ["HTML", "CSS", "React"],
    },
    {
      id: "c2",
      title: "JavaScript Algorithms",
      issuer: "freeCodeCamp",
      date: "2024",
      badge: "assets/img/pixel2.jpg",
      desc: "Validated understanding of ES6, data structures, and functional programming.",
      tags: ["JavaScript", "Algorithms"],
    },
    {
      id: "c3",
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2025",
      badge: "assets/img/pixel3.jpg",
      desc: "Foundational knowledge of AWS cloud architecture, billing and core services.",
      tags: ["Cloud", "AWS"],
    },
  ],

  // ---------- Contact / Socials ----------
  contact: {
    title: "READY TO BUILD",
    subtitle: "Tell me about your next idea, project, or collaboration. Let's bring it to life together.",
    email: "YOUREMAIL@COMPANY.COM",
    socials: [
      {
        platform: "discord",
        label: "Discord",
        icon: "fab fa-discord",
        url: "#",
      },
      {
        platform: "telegram",
        label: "Telegram",
        icon: "fab fa-telegram-plane",
        url: "#",
      },
      {
        platform: "twitter",
        label: "Twitter",
        icon: "fab fa-x-twitter",
        url: "#",
      },
    ],
  },

  // ---------- Footer ----------
  footer: {
    brandTitle: "TITLE",
    brandSubtitle: "HERE",
    aboutTitle: "ABOUT TITLE HERE",
    aboutText: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    copyright: "© 2026 TITLE HERE",
    socials: [
      { icon: "fab fa-discord", className: "icon-discord", url: "#" },
      { icon: "fab fa-telegram-plane", className: "icon-telegram", url: "#" },
      { icon: "fab fa-x-twitter", className: "icon-x", url: "#" },
    ],
  },
};

/* ============================================================
   Language / technology color palette used for badges
   ============================================================ */
const langColors = {
  HTML5: "#e34c26",
  HTML: "#e34c26",
  CSS3: "#2965f1",
  CSS: "#2965f1",
  SCSS: "#cc6699",
  JavaScript: "#f7df1e",
  React: "#61dafb",
  Bootstrap: "#7952b3",
  "Next.js": "#000000",
  "Node.js": "#3c873a",
  MongoDB: "#4ea94b",
  Cloud: "#ff9900",
  AWS: "#ff9900",
  Algorithms: "#0a0a23",
};
