/* ============================================================
   MAIN.JS - Renders siteData into the DOM and wires interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const esc = (s) => {
  const MAP = {
    38: "&amp;",
    60: "&lt;",
    62: "&gt;",
    34: "&quot;",
    39: "&#39;"
  };
  return String(s).replace(/[&<>"']/g, (c) => MAP[c.charCodeAt(0)]);
};

  /* ============================================================
     NAV
     ============================================================ */
  function renderNav() {
    // Logo
    const logo = $("#navLogo");
    if (logo && siteData.brand) {
      logo.innerHTML = `<span style="background: var(--bg-yellow); color: black; padding: 4px 10px; border: 3px solid #000;">${esc(
        siteData.brand.title
      )}</span> ${esc(siteData.brand.subtitle)}`;
    }

    // Nav links
    const wrap = $("#navLinksInner");
    if (wrap && Array.isArray(siteData.nav)) {
      wrap.innerHTML = siteData.nav
        .map((item) => {
          const cls = item.isContact
            ? "nav-link-custom link-contact"
            : "nav-link-custom";
          return `<a href="${esc(item.href)}" class="${cls}" onclick="toggleMenu()">${esc(
            item.label
          )}</a>`;
        })
        .join("");
    }
  }

  /* ============================================================
     HERO
     ============================================================ */
  function renderHero() {
    const h = siteData.hero || {};
    const titleEl = $("#heroTitle");
    if (titleEl) {
      titleEl.innerHTML = `<span class="highlight" style="background: var(--bg-yellow); padding: 0 10px; border: 4px solid #000; box-shadow: 6px 6px 0px #000;">${esc(
        h.title || ""
      )}</span> ${esc(h.titleHighlight || "")}`;
    }
    const subEl = $("#heroSubtitle");
    if (subEl) subEl.textContent = h.subtitle || "";

    const img = $("#heroImage");
    if (img && h.heroImage) img.src = h.heroImage;

    // Page title
    const pt = $("#pageTitle");
    if (pt && siteData.brand) {
      pt.textContent = `${siteData.brand.title} ${siteData.brand.subtitle} — Neo Brutalism Portfolio`;
    }
  }

  /* ============================================================
     STATS (count-up)
     ============================================================ */
  function renderStats() {
    const row = $("#statsRow");
    if (!row || !Array.isArray(siteData.stats)) return;
    row.innerHTML = siteData.stats
      .map(
        (s, i) => `
      <div class="col-auto me-4 reveal">
        <div class="display-4 fw-black lh-1"><span class="count-up" data-target="${s.target}">0</span>${
          i === siteData.stats.length - 1 ? "+" : ""
        }</div>
        <div class="fw-black text-uppercase small tracking-widest" style="color: ${s.color}">${esc(
          s.label
        )}</div>
      </div>`
      )
      .join("");
  }

  /* ============================================================
     LANGUAGE BADGE
     ============================================================ */
  function langBadge(name) {
    const color = langColors[name] || "#000";
    // Pick text color based on background luminance
    const txt = isLightColor(color) ? "#000" : "#fff";
    return `<span class="lang-badge" style="background:${color}; color:${txt};">${esc(name)}</span>`;
  }

  function isLightColor(hex) {
    const c = hex.replace("#", "");
    if (c.length !== 6) return true;
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.65;
  }

  /* ============================================================
     PROJECTS (cards)
     ============================================================ */
  function renderProjects() {
    const row = $("#projectsRow");
    if (!row || !Array.isArray(siteData.projects)) return;

    row.innerHTML = siteData.projects
      .map(
        (p, i) => `
      <div class="col-md-4 reveal">
        <div class="card p-0 position-relative">
          <div class="price-badge">${esc(p.price)}</div>
          <div class="p-3">
            <img src="${esc(p.images[0])}" class="img-fluid neo-asset-img border border-4 border-dark" alt="${esc(
          p.title
        )}" />
          </div>
          <div class="card-body p-4 pt-0">
            <span class="fw-bold mb-2 d-block">${esc(p.date)}</span>
            <h3 class="fw-black">${esc(p.title)}</h3>
            <p>${esc(p.shortDesc)}</p>

            <div class="lang-badges mb-3">
              ${p.languages.map(langBadge).join("")}
            </div>

            <button class="btn btn-warning w-100 mt-auto"
              data-bs-toggle="modal"
              data-bs-target="#projectModal"
              onclick="openProjectModal(${i})">
              VIEW PROJECT
            </button>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  /* ============================================================
     REASONS (split left/right of the central hub)
     ============================================================ */
  function renderReasons() {
    const left = $("#reasonsLeft");
    const right = $("#reasonsRight");
    if (!left || !right || !Array.isArray(siteData.reasons)) return;

    // first three go left, last three go right (matches original layout)
    const l = siteData.reasons.slice(0, 3);
    const r = siteData.reasons.slice(3);

    const card = (reason) => `
      <div class="neo-card reveal d-flex border border-4 border-dark bg-white shadow-flat" style="--accent: ${reason.color}">
        <div class="neo-num">${reason.num}</div>
        <div class="p-3">
          <h4 class="fw-black mb-1 text-uppercase">${esc(reason.title)}</h4>
          <p class="small mb-0 fw-bold">${esc(reason.desc)}</p>
        </div>
      </div>`;

    left.innerHTML = l.map(card).join("");
    right.innerHTML = r.map(card).join("");

    const totalEl = $("#reasonsTotal");
    if (totalEl) totalEl.textContent = siteData.reasons.length;
  }

  /* ============================================================
     SERVICES
     ============================================================ */
  function renderServices() {
    const row = $("#servicesRow");
    if (!row || !Array.isArray(siteData.services)) return;

    row.innerHTML = siteData.services
      .map((s, i) => {
        const cardStyle = s.cardStyle
          ? `style="background:${s.cardStyle.background}; border:${s.cardStyle.border};"`
          : "style='background:#fff;'";
        const pbStyle = s.priceBadgeStyle
          ? `style="background:${s.priceBadgeStyle.background};"`
          : "";
        return `
      <div class="col-md-5 reveal">
        <div class="card p-4 h-100" ${cardStyle}>
          <div class="service-price-badge" ${pbStyle}>${esc(s.price)}</div>
          <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
              <i class="${esc(s.icon)} fa-3x text-dark"></i>
              <h3 class="fw-black text-uppercase mt-2 mb-0">${esc(s.title)}</h3>
            </div>
          </div>
          <p class="fw-bold small mb-4 text-uppercase">${esc(s.desc)}</p>
          <hr style="border-top: 2px dashed #000; opacity: 1;">
          <ul class="list-unstyled mb-4 flex-grow-1">
            ${s.features
              .map(
                (f) =>
                  `<li class="mb-2 fw-bold"><i class="fas fa-check-square me-2"></i> ${esc(
                    f
                  )}</li>`
              )
              .join("")}
            <div class="badge ${esc(s.badge.bg)} ${esc(
          s.badge.color
        )} p-2">${esc(s.badge.text)}</div>
          </ul>
          <div class="mt-auto">
            <button class="btn btn-dark w-100 py-3 fw-black text-uppercase shadow-flat"
              onclick="document.getElementById('layer-contact').scrollIntoView({behavior:'smooth'})">
              <i class="fas fa-envelope me-2"></i>CONTACT ME
            </button>
          </div>
        </div>
      </div>`;
      })
      .join("");
  }

  /* ============================================================
     CERTIFICATIONS
     ============================================================ */
  function renderCertifications() {
    const row = $("#certificationsRow");
    if (!row || !Array.isArray(siteData.certifications)) return;

    row.innerHTML = siteData.certifications
      .map(
        (c) => `
      <div class="col-md-4 reveal">
        <div class="cert-card">
          <div class="cert-badge">
            <img src="${esc(c.badge)}" alt="${esc(c.title)}" />
          </div>
          <div class="cert-body">
            <span class="cert-date">${esc(c.date)}</span>
            <h3 class="cert-title">${esc(c.title)}</h3>
            <p class="cert-issuer"><i class="fas fa-award me-1"></i>${esc(
              c.issuer
            )}</p>
            <p class="cert-desc">${esc(c.desc)}</p>
            <div class="cert-tags">
              ${(c.tags || []).map(langBadge).join("")}
            </div>
          </div>
          <div class="cert-ribbon">VERIFIED</div>
        </div>
      </div>`
      )
      .join("");
  }

  /* ============================================================
     CONTACT
     ============================================================ */
  function renderContact() {
    const c = siteData.contact || {};

    const titleEl = $("#contactTitle");
    if (titleEl && c.title) {
      // "READY TO <CLAIM> THIS PROJECT?" with span styling
      const parts = c.title.split("CLAIM");
      titleEl.innerHTML = parts
        .map((p, i) =>
          i === 0
            ? `${esc(p)} `
            : `<span style="background: var(--accent-pink, #ff00ff);
                              color: #fff;
                              padding: 5px 15px;
                              border: 6px solid #000;
                              box-shadow: 8px 8px 0px #000;
                              display: inline-block;
                              transform: rotate(-1deg);
                              margin: 10px 0;">CLAIM</span> `
        )
        .join("");
      // remove trailing " THIS PROJECT?" wrapping
      const tail = c.title.includes("THIS PROJECT?")
        ? `<br>THIS PROJECT?`
        : "";
      titleEl.innerHTML += tail;
    }

    const subEl = $("#contactSubtitle");
    if (subEl) subEl.textContent = c.subtitle || "";

    const emailEl = $("#contactEmail");
    if (emailEl && c.email) {
      emailEl.textContent = c.email;
      emailEl.href = `mailto:${c.email}`;
    }

    const socialsEl = $("#contactSocials");
    if (socialsEl && Array.isArray(c.socials)) {
      socialsEl.innerHTML = c.socials
        .map(
          (s) => `
        <a href="${esc(s.url)}" class="social-box ${esc(
            s.platform
          )}-hover d-flex flex-column align-items-center text-decoration-none">
          <div class="icon-frame border border-4 border-dark bg-white shadow-flat d-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
            <i class="${esc(s.icon)} fa-3x text-dark"></i>
          </div>
          <span class="fw-black text-dark text-uppercase mt-3 tracking-widest">${esc(
            s.label
          )}</span>
        </a>`
        )
        .join("");
    }
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function renderFooter() {
    const f = siteData.footer || {};
    const brandEl = $("#footerBrand");
    if (brandEl) {
      brandEl.innerHTML = `<span class="brand-badge">${esc(
        f.brandTitle
      )}</span> ${esc(f.brandSubtitle)}`;
    }

    const socialsEl = $("#footerSocials");
    if (socialsEl && Array.isArray(f.socials)) {
      socialsEl.innerHTML = f.socials
        .map(
          (s) => `
        <a href="${esc(s.url)}" class="social-icon ${esc(s.className)}">
          <i class="${esc(s.icon)} fa-lg"></i>
        </a>`
        )
        .join("");
    }

    if ($("#footerAboutTitle"))
      $("#footerAboutTitle").textContent = f.aboutTitle || "";
    if ($("#footerAboutText"))
      $("#footerAboutText").textContent = f.aboutText || "";
    if ($("#footerCopyright"))
      $("#footerCopyright").textContent = f.copyright || "";
  }

  /* ============================================================
     PROJECT MODAL (with Next image button)
     ============================================================ */
  let currentProjectIndex = 0;
  let currentImageIndex = 0;

  function openProjectModal(index) {
    currentProjectIndex = index;
    currentImageIndex = 0;

    const p = siteData.projects[index];
    if (!p) return;

    $("#modalTitle").textContent = p.title;
    $("#modalDescription").textContent = p.description || p.shortDesc || "";
    $("#modalPrice").textContent = p.price;

    // populate tech badges in modal
    const techsEl = $("#modalTechs");
    if (techsEl) techsEl.innerHTML = (p.languages || []).map(langBadge).join("");

    updateModalImage();
  }

  function updateModalImage() {
    const p = siteData.projects[currentProjectIndex];
    if (!p || !p.images || !p.images.length) return;

    const imgEl = $("#modalImage");
    imgEl.src = p.images[currentImageIndex];

    const counterEl = $("#modalImageCounter");
    if (counterEl) {
      counterEl.textContent = `${currentImageIndex + 1} / ${p.images.length}`;
    }
  }

  function nextImage() {
    const p = siteData.projects[currentProjectIndex];
    if (!p || !p.images.length) return;
    currentImageIndex = (currentImageIndex + 1) % p.images.length;
    updateModalImage();
  }

  function prevImage() {
    const p = siteData.projects[currentProjectIndex];
    if (!p || !p.images.length) return;
    currentImageIndex =
      (currentImageIndex - 1 + p.images.length) % p.images.length;
    updateModalImage();
  }

  /* expose globally for inline onclick="" handlers */
  window.openProjectModal = openProjectModal;
  window.nextImage = nextImage;
  window.prevImage = prevImage;

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function toggleMenu() {
    const nav = $("#navLinks");
    const overlay = $("#navOverlay");
    if (!nav || !overlay) return;
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "auto";
  }
  window.toggleMenu = toggleMenu;

  /* ============================================================
     COUNT-UP ANIMATION
     ============================================================ */
  function animateCount(el) {
    const target = +el.getAttribute("data-target");
    const count = +el.innerText;
    const speed = 2000;
    const increment = target / (speed / 16);
    if (count < target) {
      el.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCount(el), 16);
    } else {
      el.innerText = target;
    }
  }

  /* ============================================================
     REVEAL OBSERVER
     ============================================================ */
  function setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        let delay = 0;
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("active")
          ) {
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add("active");
            const counters = entry.target.querySelectorAll(".count-up");
            counters.forEach((counter) => animateCount(counter));
            delay += 0.15;
          }
        });
      },
      { threshold: 0.1 }
    );
    $$(".reveal").forEach((el) => observer.observe(el));
  }

  /* ============================================================
     WIRE MODAL BUTTONS
     ============================================================ */
  function wireModalButtons() {
    const next = $("#modalNextBtn");
    const prev = $("#modalPrevBtn");
    if (next) next.addEventListener("click", nextImage);
    if (prev) prev.addEventListener("click", prevImage);
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    renderNav();
    renderHero();
    renderStats();
    renderProjects();
    renderReasons();
    renderServices();
    renderCertifications();
    renderContact();
    renderFooter();
    wireModalButtons();
    setupObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
