/*!
 * Quintsea CSS v0.5.3 (https://quintsea.nanraizen.me)
 * (c) 2025-2026 | MIT License
 */
!function(e, t) {
  "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? module.exports = t() : e.Quintsea = t();
}("undefined" != typeof self ? self : this, function() {
  "use strict";
  function e() {
    document.querySelectorAll('a[href="#"]').forEach(e => {
      e.addEventListener("click", e => e.preventDefault());
    });
    const e = new URL(window.location.href);
    function t(e, t = null, o = null) {
      navigator.clipboard.writeText(e).then(() => {
        const a = document.createElement("div");
        a.className = "copy-notif";
        const n = document.createElement("span");
        if (o && o.classList.contains("text-copied")) {
          n.textContent = "Copied: ";
          const t = document.createElement("u");
          t.textContent = e, n.appendChild(t);
        } else n.textContent = "Copied to Clipboard";
        a.appendChild(n), document.body.appendChild(a), setTimeout(() => a.classList.add("show"), 100), 
        setTimeout(() => {
          a.classList.remove("show"), setTimeout(() => a.remove(), 500);
        }, 2e3), !t || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName || (t.focus(), 
        t.select());
      });
    }
    document.querySelectorAll("a[href]").forEach(t => {
      const o = t.getAttribute("href"), a = new URL(o, window.location.origin);
      a.hostname === e.hostname && a.pathname + a.search === e.pathname + e.search && t.addEventListener("click", e => e.preventDefault());
    }), document.querySelectorAll(".upup").forEach(e => {
      e.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }), document.querySelectorAll(".floating-label").forEach(e => {
      const t = e.querySelector("input, select, textarea"), o = e.querySelector("label");
      if (t && o) {
        const e = o.cloneNode(!0);
        e.classList.add("clone"), t.insertAdjacentElement("afterend", e), o.className || t.insertAdjacentElement("afterend", o);
      }
    }), document.querySelectorAll("textarea.auto-height").forEach(e => {
      const t = () => {
        e.style.height = "auto", e.style.height = Math.max(e.scrollHeight, 48) + "px";
      };
      e.addEventListener("input", t), t();
    }), document.querySelectorAll("fieldset").forEach(e => {
      const t = e.querySelector("input[type=range]");
      if (t) {
        const o = document.createElement("p");
        o.className = "range-value", e.appendChild(o);
        const a = () => {
          const e = +t.min || 0, a = +t.max || 100, n = +t.value, c = (n - e) / (a - e) * (t.offsetWidth - 16) + 8;
          o.textContent = n, o.style.left = c + "px";
        };
        t.addEventListener("input", a), a();
      }
    }), document.querySelectorAll(".navbar.sticky").forEach(e => {
      const t = e.parentElement, o = document.createElement("div");
      function a() {
        const a = window.scrollY, n = e.offsetHeight, c = t.offsetTop, l = t.offsetHeight;
        a > c && a + n < c + l ? (e.classList.add("fix"), e.classList.remove("end"), o.style.display = "block") : a + n >= c + l ? (e.classList.remove("fix"), 
        e.classList.add("end"), o.style.display = "block") : (e.classList.remove("fix", "end"), 
        o.style.display = "none");
      }
      o.style.width = e.offsetWidth + "px", o.style.height = e.offsetHeight + "px", o.style.display = "none", 
      t.insertBefore(o, e), window.addEventListener("scroll", a), window.addEventListener("resize", a), 
      a();
    }), document.querySelectorAll('[data-collapse="toggle"]').forEach(e => {
      e.addEventListener("click", t => {
        t.preventDefault();
        const o = e.getAttribute("href").substring(1), a = document.getElementById(o);
        a && (a.classList.contains("expand") ? (a.style.maxHeight = "0", a.classList.remove("expand")) : (a.style.maxHeight = a.scrollHeight + "px", 
        a.classList.add("expand")));
      });
    }), document.querySelectorAll(".accordion").forEach(e => {
      e.querySelectorAll("[data-accordion=toggle]").forEach(t => {
        const o = t.nextElementSibling;
        o && "content" === o.getAttribute("data-accordion") && (o.style.maxHeight = t.classList.contains("expand") ? o.scrollHeight + "px" : "0", 
        t.addEventListener("click", () => {
          e.querySelectorAll("[data-accordion=toggle].expand").forEach(e => {
            if (e === t) return;
            e.classList.remove("expand");
            const o = e.nextElementSibling;
            o && "content" === o.getAttribute("data-accordion") && (o.style.maxHeight = "0");
          });
          t.classList.contains("expand") ? (t.classList.remove("expand"), o.style.maxHeight = "0") : (t.classList.add("expand"), 
          o.style.maxHeight = o.scrollHeight + "px");
        }));
      });
    }), document.querySelectorAll(".navtabs[data-tab-name]").forEach(e => {
      const t = document.querySelector('.navtabs-content[data-tab-name="' + e.getAttribute("data-tab-name") + '"]'), o = Array.from(e.children), a = Array.from(t.children);
      if (!t) return;
      const n = e => {
        o.forEach(e => e.classList.remove("active")), e.classList.add("active"), a.forEach(e => e.classList.remove("active"));
        const n = e.getAttribute("href").substring(1), c = t.querySelector("#" + n);
        c && c.classList.add("active");
      };
      o.forEach(e => {
        e.addEventListener("click", t => {
          t.preventDefault(), n(e);
        });
      });
      const c = o.find(e => e.classList.contains("active")) || o[0];
      c && n(c);
    }), document.querySelectorAll('[data-modal="content"]').forEach(e => {
      if (e.querySelector(".modal-card")) return;
      const t = document.createElement("div"), o = document.createElement("div"), a = e.getAttribute("data-modal-size");
      t.setAttribute("data-modal", "close"), t.className = "close-overlay", o.className = "modal-card", 
      a && (o.style.maxWidth = a + "px"), [ ...e.children ].forEach(e => o.appendChild(e)), 
      e.appendChild(t), e.appendChild(o);
    }), document.querySelectorAll('[data-modal="toggle"]').forEach(e => {
      e.addEventListener("click", t => {
        t.preventDefault();
        const o = e.getAttribute("href").substring(1), a = document.getElementById(o);
        a && a.classList.toggle("open");
      });
    }), document.querySelectorAll('[data-modal="close"]').forEach(e => {
      e.addEventListener("click", () => {
        document.querySelectorAll('[data-modal="content"]').forEach(e => e.classList.remove("open"));
      });
    }), document.querySelectorAll('[data-dropdown="toggle"]').forEach(e => {
      e.addEventListener("click", t => {
        t.preventDefault();
        const o = e.nextElementSibling;
        o && "content" === o.getAttribute("data-dropdown") && (document.querySelectorAll('[data-dropdown="content"]').forEach(e => {
          e !== o && e.classList.remove("open");
        }), o.classList.toggle("open"));
      });
    }), document.addEventListener("click", e => {
      e.target.closest('[data-dropdown="toggle"], [data-dropdown="content"]') || document.querySelectorAll('[data-dropdown="content"]').forEach(e => e.classList.remove("open"));
    }), document.addEventListener("keydown", e => {
      "Escape" === e.key && (document.querySelectorAll('[data-modal="content"]').forEach(e => e.classList.remove("open")), 
      document.querySelectorAll('[data-dropdown="content"]').forEach(e => e.classList.remove("open")));
    }), document.querySelectorAll("[data-tooltip-text]").forEach(e => {
      let t, o;
      e.addEventListener("mouseenter", () => {
        clearTimeout(t), clearTimeout(o);
        let a = e.querySelector(".tooltip-text");
        a || (a = document.createElement("div"), a.className = "tooltip-text", a.textContent = e.getAttribute("data-tooltip-text"), 
        e.appendChild(a), a.offsetHeight), a.classList.add("show");
      }), e.addEventListener("mouseleave", () => {
        const a = e.querySelector(".tooltip-text"), n = a && a.textContent.startsWith("Copied");
        a && (o = setTimeout(() => {
          a.classList.remove("show"), t = setTimeout(() => {
            a.remove();
          }, 150);
        }, n ? 1500 : 0));
      });
    }), document.querySelectorAll(".copyBtn").forEach(e => {
      const t = e.getAttribute("data-copy-text") || "";
      let o;
      e.addEventListener("click", () => {
        navigator.clipboard.writeText(t).then(() => {
          let a = e.querySelector(".tooltip-text");
          a || (a = document.createElement("div"), a.className = "tooltip-text", e.appendChild(a)), 
          clearTimeout(o), a.classList.remove("show"), a.offsetHeight, a.textContent = "Copied" + (e.classList.contains("text-copied") ? ": " + t : ""), 
          a.classList.add("show"), o = setTimeout(() => {
            a.classList.remove("show"), setTimeout(() => a.remove(), 300);
          }, 1500);
        });
      });
    }), document.querySelectorAll('.copyGroup [data-copy="trigger"]').forEach(e => {
      e.addEventListener("click", () => {
        const o = e.closest(".copyGroup").querySelector('[data-copy="content"]');
        if (!o) return;
        t("INPUT" === o.tagName || "TEXTAREA" === o.tagName ? o.value : o.textContent, o, e);
      });
    }), document.querySelectorAll(".copyToast").forEach(e => {
      const o = e.getAttribute("data-copy-text") || "";
      e.addEventListener("click", () => t(o, null, e));
    });
    const o = document.documentElement, a = document.querySelectorAll("[data-theme-trigger]"), n = window.matchMedia("(prefers-color-scheme: dark)");
    function c(e) {
      let t = e;
      if ("light" === e) o.setAttribute("data-theme", "light"); else if ("dark" === e) o.setAttribute("data-theme", "dark"); else {
        const e = n.matches ? "dark" : "light";
        o.setAttribute("data-theme", e), t = "system";
      }
      a.forEach(e => {
        e.classList.toggle("active", e.dataset.themeTrigger === t);
      });
    }
    c(localStorage.getItem("theme") || "system"), a.forEach(e => {
      e.addEventListener("click", () => {
        const t = e.dataset.themeTrigger;
        if ("toggle" === t) {
          const e = "dark" === (o.getAttribute("data-theme") || (n.matches ? "dark" : "light")) ? "light" : "dark";
          localStorage.setItem("theme", e), c(e);
        } else localStorage.setItem("theme", t), c(t);
      });
    }), n.addEventListener("change", () => {
      "system" === localStorage.getItem("theme") && c("system");
    });
  }
  return "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e(), 
  e;
});