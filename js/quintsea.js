/*!
 * Quintsea CSS v0.2.1 (https://quintsea.nanraizen.me)
 * (c) 2025 | MIT License
 */
document.querySelectorAll('a[href="#"]').forEach(e => {
    e.addEventListener("click", e => e.preventDefault())
});
const currentPage = new URL(window.location.href);

function stickyNavbar(e, t = {}) {
    let a = Object.assign({}, {
            offset: 0,
            leftOffset: "unset"
        }, t),
        l = "string" == typeof e ? document.querySelector(e) : e,
        o = l.parentElement,
        r = document.createElement("div");

    function s(e) {
        Object.assign(l.style, e)
    }

    function n() {
        let e = window.scrollY,
            t = l.offsetHeight,
            n = o.offsetTop,
            c = o.offsetHeight;
        e + a.offset > n && e + a.offset + t < n + c ? "fixed" !== l.style.position && (s({
            position: "fixed",
            top: a.offset + "px",
            left: a.leftOffset + "px",
            right: "0",
            zIndex: 99993
        }), r.style.display = "block", l.classList.add("sticky")) : e + a.offset + t >= n + c ? (s({
            position: "absolute",
            top: c - t + "px",
            left: a.leftOffset + "px",
            right: "0",
            zIndex: 99993
        }), r.style.display = "block", l.classList.remove("sticky")) : (s({
            position: "relative",
            top: "auto",
            left: "unset",
            right: "0",
            zIndex: 99993
        }), r.style.display = "none", l.classList.remove("sticky"))
    }
    r.style.width = l.offsetWidth + "px", r.style.height = l.offsetHeight + "px", r.style.display = "none", o.insertBefore(r, l), window.addEventListener("scroll", n), n()
}

function showCopyToast(e, t = null) {
    navigator.clipboard.writeText(e).then(() => {
        let e = document.createElement("div");
        e.className = "copy-notif", e.innerHTML = '<span class="glyph color green">done_all</span><span>Copied to Clipboard</span>', document.body.appendChild(e), setTimeout(() => e.classList.add("show"), 100), setTimeout(() => {
            e.classList.remove("show"), setTimeout(() => e.remove(), 500)
        }, 1500), t && ("INPUT" === t.tagName || "TEXTAREA" === t.tagName) && (t.focus(), t.select())
    })
}
document.querySelectorAll("a[href]").forEach(e => {
    let t = e.getAttribute("href"),
        a = new URL(t, window.location.origin),
        l = a.hostname === currentPage.hostname && a.pathname + a.search === currentPage.pathname + currentPage.search;
    l && e.addEventListener("click", e => e.preventDefault())
}), document.querySelectorAll(".upup").forEach(e => {
    e.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}), document.querySelectorAll(".floating-label").forEach(e => {
    let t = e.querySelector("input, select, textarea"),
        a = e.querySelector("label");
    if (t && a) {
        let l = a.cloneNode(!0);
        l.classList.add("clone"), t.insertAdjacentElement("afterend", l), a.className || t.insertAdjacentElement("afterend", a)
    }
}), document.querySelectorAll("textarea.auto-height").forEach(e => {
    let t = () => {
        e.style.height = "auto", e.style.height = Math.max(e.scrollHeight, 48) + "px"
    };
    e.addEventListener("input", t), t()
}), document.querySelectorAll("fieldset").forEach(e => {
    let t = e.querySelector("input[type=range]");
    if (t) {
        let a = document.createElement("p");
        a.className = "range-value", e.appendChild(a);
        let l = () => {
            let e = +t.min || 0,
                l = +t.max || 100,
                o = +t.value,
                r = (o - e) / (l - e),
                s = t.offsetWidth,
                n = r * (s - 16) + 8;
            a.textContent = o, a.style.left = n + "px"
        };
        t.addEventListener("input", l), l()
    }
}), document.querySelectorAll('[data-collapse="toggle"]').forEach(e => {
    e.addEventListener("click", t => {
        t.preventDefault();
        let a = e.getAttribute("href").substring(1),
            l = document.getElementById(a);
        l && (l.classList.contains("expand") ? (l.style.maxHeight = "0", l.classList.remove("expand")) : (l.style.maxHeight = l.scrollHeight + "px", l.classList.add("expand")))
    })
}), document.querySelectorAll(".accordion").forEach(e => {
    e.querySelectorAll("[data-accordion=toggle]").forEach(t => {
        let a = t.nextElementSibling;
        a && "content" === a.getAttribute("data-accordion") && (a.style.maxHeight = t.classList.contains("expand") ? a.scrollHeight + "px" : "0", t.addEventListener("click", () => {
            e.querySelectorAll("[data-accordion=toggle].expand").forEach(e => {
                if (e === t) return;
                e.classList.remove("expand");
                let a = e.nextElementSibling;
                a && "content" === a.getAttribute("data-accordion") && (a.style.maxHeight = "0")
            });
            let l = t.classList.contains("expand");
            l ? (t.classList.remove("expand"), a.style.maxHeight = "0") : (t.classList.add("expand"), a.style.maxHeight = a.scrollHeight + "px")
        }))
    })
}), document.querySelectorAll(".navtabs[data-tab-name]").forEach(e => {
    let t = document.querySelector('.navtabs-content[data-tab-name="' + e.getAttribute("data-tab-name") + '"]'),
        a = Array.from(e.children),
        l = Array.from(t.children);
    if (!t) return;
    let o = e => {
        a.forEach(e => e.classList.remove("active")), e.classList.add("active"), l.forEach(e => e.classList.remove("active"));
        let o = e.getAttribute("href").substring(1),
            r = t.querySelector("#" + o);
        r && r.classList.add("active")
    };
    a.forEach(e => {
        e.addEventListener("click", t => {
            t.preventDefault(), o(e)
        })
    });
    let r = a.find(e => e.classList.contains("active")) || a[0];
    r && o(r)
}), document.querySelectorAll('[data-modal="content"]').forEach(e => {
    if (e.querySelector(".modal-card")) return;
    let t = document.createElement("div"),
        a = document.createElement("div"),
        l = e.getAttribute("data-modal-size");
    t.setAttribute("data-modal", "close"), t.className = "close-overlay", a.className = "modal-card", l && (a.style.maxWidth = l + "px"), [...e.children].forEach(e => a.appendChild(e)), e.appendChild(t), e.appendChild(a)
}), document.querySelectorAll('[data-modal="toggle"]').forEach(e => {
    e.addEventListener("click", t => {
        t.preventDefault();
        let a = e.getAttribute("href").substring(1),
            l = document.getElementById(a);
        l && l.classList.add("open")
    })
}), document.querySelectorAll('[data-modal="close"]').forEach(e => {
    e.addEventListener("click", () => {
        document.querySelectorAll('[data-modal="content"]').forEach(e => e.classList.remove("open"))
    })
}), document.querySelectorAll('[data-dropdown="toggle"]').forEach(e => {
    e.addEventListener("click", t => {
        t.preventDefault();
        let a = e.nextElementSibling;
        a && "content" === a.getAttribute("data-dropdown") && (document.querySelectorAll('[data-dropdown="content"]').forEach(e => {
            e !== a && e.classList.remove("open")
        }), a.classList.toggle("open"))
    })
}), document.addEventListener("click", e => {
    e.target.closest('[data-dropdown="toggle"], [data-dropdown="content"]') || document.querySelectorAll('[data-dropdown="content"]').forEach(e => e.classList.remove("open"))
}), document.addEventListener("keydown", e => {
    "Escape" === e.key && (document.querySelectorAll('[data-modal="content"]').forEach(e => e.classList.remove("open")), document.querySelectorAll('[data-dropdown="content"]').forEach(e => e.classList.remove("open")))
}), document.querySelectorAll("[data-tooltip-text]").forEach(e => {
    let t, a;
    e.addEventListener("mouseenter", () => {
        clearTimeout(t), clearTimeout(a);
        let l = e.querySelector(".tooltip-text");
        l || ((l = document.createElement("div")).className = "tooltip-text", l.textContent = e.getAttribute("data-tooltip-text"), e.appendChild(l), l.offsetHeight), l.classList.add("show")
    }), e.addEventListener("mouseleave", () => {
        let l = e.querySelector(".tooltip-text"),
            o = l.textContent.startsWith("Copied"),
            r = o ? 1500 : 0;
        l && (a = setTimeout(() => {
            l.classList.remove("show"), t = setTimeout(() => {
                l.remove()
            }, 150)
        }, r))
    })
}), document.querySelectorAll(".copyBtn").forEach(e => {
    let t = e.getAttribute("data-copy-text") || "";
    e.addEventListener("click", () => {
        navigator.clipboard.writeText(t).then(() => {
            let a = e.querySelector(".tooltip-text");
            a || ((a = document.createElement("div")).className = "tooltip-text", e.appendChild(a)), a.textContent = "Copied" + (e.classList.contains("text-copied") ? " : " + t : ""), a.classList.add("show"), setTimeout(() => {
                a.classList.remove("show"), setTimeout(() => a.remove(), 300)
            }, 1500)
        })
    })
}), document.querySelectorAll('.copyGroup [data-copy="trigger"]').forEach(e => {
    e.addEventListener("click", () => {
        let t = e.closest(".copyGroup").querySelector('[data-copy="content"]');
        if (t) showCopyToast("INPUT" === t.tagName || "TEXTAREA" === t.tagName ? t.value : t.textContent, t)
    })
}), document.querySelectorAll(".copyToast").forEach(e => {
    let t = e.getAttribute("data-copy-text") || "";
    e.addEventListener("click", () => showCopyToast(t))
}), document.addEventListener("DOMContentLoaded", () => {
    let e = document.documentElement,
        t = document.querySelectorAll("[data-theme-trigger]"),
        a = window.matchMedia("(prefers-color-scheme: dark)");

    function l(l) {
        let o = l;
        if ("light" === l) e.setAttribute("data-theme", "light");
        else if ("dark" === l) e.setAttribute("data-theme", "dark");
        else {
            let r = a.matches ? "dark" : "light";
            e.setAttribute("data-theme", r), o = "system"
        }
        t.forEach(e => {
            e.classList.toggle("active", e.dataset.themeTrigger === o)
        })
    }
    l(localStorage.getItem("theme") || "system"), t.forEach(t => {
        t.addEventListener("click", () => {
            let o = t.dataset.themeTrigger;
            if ("toggle" === o) {
                let r = e.getAttribute("data-theme") || (a.matches ? "dark" : "light"),
                    s = "dark" === r ? "light" : "dark";
                localStorage.setItem("theme", s), l(s)
            } else localStorage.setItem("theme", o), l(o)
        })
    }), a.addEventListener("change", () => {
        "system" === localStorage.getItem("theme") && l("system")
    })
});