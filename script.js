(() => {
  "use strict";
  const config = window.CROCHET_CONFIG || {};
  const patterns = Array.isArray(config.patterns) ? config.patterns : [];
  const grid = document.getElementById("patternGrid");
  const search = document.getElementById("patternSearch");
  const emptyState = document.getElementById("emptyState");
  let activeFilter = "all";

  const categoryLabels = {
    beginner: "Beginner",
    home: "Home décor",
    accessories: "Accessories",
    flowers: "Flowers"
  };

  function safeUrl(value, fallback) {
    const candidate = (value || "").trim();
    if (!candidate) return fallback || "#blog";
    try {
      const url = new URL(candidate, window.location.href);
      return ["https:", "http:"].includes(url.protocol) ? url.href : (fallback || "#blog");
    } catch (_) {
      return fallback || "#blog";
    }
  }

  function patternUrl(pattern) {
    return safeUrl(pattern.articleUrl, safeUrl(config.blogUrl, "#blog"));
  }

  function renderPatterns() {
    const query = (search.value || "").trim().toLowerCase();
    const filtered = patterns.filter(p => {
      const matchesFilter = activeFilter === "all" || p.category === activeFilter;
      const searchable = [p.title, p.category, p.level, p.description].join(" ").toLowerCase();
      return matchesFilter && searchable.includes(query);
    });
    grid.innerHTML = "";
    filtered.forEach(pattern => {
      const card = document.createElement("article");
      card.className = "pattern-card";
      const visual = document.createElement("div");
      visual.className = "pattern-visual";
      const img = document.createElement("img");
      img.src = pattern.image;
      img.alt = pattern.alt || pattern.title;
      img.loading = "lazy";
      img.onerror = () => {
        img.remove();
        visual.style.background = "linear-gradient(135deg,#e7dfd2,#dfe6d8)";
        visual.insertAdjacentHTML("beforeend", '<span style="display:grid;place-items:center;height:100%;font-size:64px;color:#819274">✿</span>');
      };
      visual.appendChild(img);
      const tag = document.createElement("span");
      tag.className = "pattern-tag";
      tag.textContent = categoryLabels[pattern.category] || "Crochet idea";
      visual.appendChild(tag);
      const save = document.createElement("button");
      save.className = "save-mark";
      save.type = "button";
      save.setAttribute("aria-label", "Copy pattern link");
      save.title = "Copy link to this project";
      save.textContent = "↗";
      save.addEventListener("click", async () => {
        const url = patternUrl(pattern);
        try {
          await navigator.clipboard.writeText(url);
          save.textContent = "✓";
          save.setAttribute("aria-label", "Link copied");
          setTimeout(() => { save.textContent = "↗"; save.setAttribute("aria-label", "Copy pattern link"); }, 1600);
        } catch (_) {
          window.open(url, "_blank", "noopener");
        }
      });
      visual.appendChild(save);
      const meta = document.createElement("div");
      meta.className = "pattern-meta";
      const level = document.createElement("span");
      level.textContent = pattern.level || "All levels";
      const time = document.createElement("span");
      time.textContent = pattern.time || "Project idea";
      meta.append(level, time);
      const title = document.createElement("h3");
      title.textContent = pattern.title;
      const desc = document.createElement("p");
      desc.textContent = pattern.description;
      const link = document.createElement("a");
      link.className = "text-link";
      link.href = patternUrl(pattern);
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Visit AffichFoot (football) ↗";
      card.append(visual, meta, title, desc, link);
      grid.appendChild(card);
    });
    emptyState.hidden = filtered.length > 0;
  }

  document.getElementById("filterPills").addEventListener("click", event => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("active", p === button));
    renderPatterns();
  });
  search.addEventListener("input", renderPatterns);

  const form = document.getElementById("calculatorForm");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const width = Number(document.getElementById("width").value);
    const gaugeStitches = Number(document.getElementById("gaugeStitches").value);
    const gaugeWidth = Number(document.getElementById("gaugeWidth").value);
    const multiple = Number(document.getElementById("multiple").value);
    if (!(width > 0 && gaugeStitches > 0 && gaugeWidth > 0)) {
      document.getElementById("resultNumber").textContent = "Check your values";
      document.getElementById("resultText").textContent = "Enter numbers greater than zero in each field.";
      return;
    }
    const raw = width * gaugeStitches / gaugeWidth;
    const estimate = Math.max(multiple, Math.round(raw / multiple) * multiple);
    document.getElementById("resultNumber").textContent = `${estimate} stitches`;
    document.getElementById("resultText").textContent =
      `Raw estimate: ${raw.toFixed(1)} stitches. Rounded to a multiple of ${multiple}.`;
  });

  const blogUrl = safeUrl(config.blogUrl, "#blog");
  ["mainBlogLink", "footerBlogLink"].forEach(id => {
    const link = document.getElementById(id);
    link.href = blogUrl;
  });
  document.querySelectorAll(".blog-link").forEach(link => {
    const articleKey = link.dataset.article;
    link.href = safeUrl((config.articleLinks || {})[articleKey], blogUrl);
    link.target = "_blank";
    link.rel = "noopener";
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));

  renderPatterns();
  form.dispatchEvent(new Event("submit", { cancelable: true }));
})();