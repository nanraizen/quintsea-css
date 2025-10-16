// DISABLE HREF #
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
});

// DISABLE CURRENT LINK
const currentPage = new URL(window.location.href);

document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const url = new URL(href, window.location.origin);
    const page = url.hostname === currentPage.hostname && url.pathname + url.search === currentPage.pathname + currentPage.search;

    if (page) {
        link.addEventListener('click', event => event.preventDefault());
    }
});

// UPUP
document.querySelectorAll('.upup').forEach(btn => {
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// FLOATING LABEL
document.querySelectorAll('.floating-label').forEach(floating => {
    const field = floating.querySelector('input, select, textarea');
    const label = floating.querySelector('label');

    if (field && label) {
        const clone = label.cloneNode(true);

        clone.classList.add('clone');
        field.insertAdjacentElement('afterend', clone);

        if (!label.className) {
            field.insertAdjacentElement('afterend', label);
        }
    }
});

// TEXTAREA AUTO HEIGHT
document.querySelectorAll('textarea.auto-height').forEach(textarea => {
    const autoHeight = () => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(textarea.scrollHeight, 48) + 'px';
    };

    textarea.addEventListener('input', autoHeight);
    autoHeight();
});

// INPUT RANGE
document.querySelectorAll('fieldset').forEach(group => {
    const range = group.querySelector('input[type=range]');

    if (range) {
        const reader = document.createElement('p');
        reader.className = 'range-value';
        group.appendChild(reader);

        const update = () => {
            const min = +range.min || 0;
            const max = +range.max || 100;
            const val = +range.value;

            const percent = (val - min) / (max - min);
            const trackWidth = range.offsetWidth;
            const thumbWidth = 16;

            const pos = percent * (trackWidth - thumbWidth) + thumbWidth / 2;

            reader.textContent = val;
            reader.style.left = pos + 'px';
        };

        range.addEventListener('input', update);
        update();
    }
});

// STICKY
function stickyNavbar(el, options = {}) {
    const defaults = {
        offset: 0,
        leftOffset: 'unset',
    };

    const settings = Object.assign({}, defaults, options);
    const target = typeof el === 'string' ? document.querySelector(el) : el;
    const parent = target.parentElement;
    const placeholder = document.createElement('div');

    placeholder.style.width = target.offsetWidth + 'px';
    placeholder.style.height = target.offsetHeight + 'px';
    placeholder.style.display = 'none';

    parent.insertBefore(placeholder, target);

    function applyStyle(styles) {
        Object.assign(target.style, styles);
    }

    function checkScroll() {
        const scroll = window.scrollY;
        const height = target.offsetHeight;
        const parentTop = parent.offsetTop;
        const parentHeight = parent.offsetHeight;

        if (scroll + settings.offset > parentTop && scroll + settings.offset + height < parentTop + parentHeight) {
            if (target.style.position !== 'fixed') {
                applyStyle({
                    position: 'fixed',
                    top: settings.offset + 'px',
                    left: settings.leftOffset + 'px',
                    right: '0',
                    zIndex: 99993
                });
                placeholder.style.display = 'block';
                target.classList.add('sticky');
            }
        } else if (scroll + settings.offset + height >= parentTop + parentHeight) {
            applyStyle({
                position: 'absolute',
                top: (parentHeight - height) + 'px',
                left: settings.leftOffset + 'px',
                right: '0',
                zIndex: 99993
            });
            placeholder.style.display = 'block';
            target.classList.remove('sticky');
        } else {
            applyStyle({
                position: 'relative',
                top: 'auto',
                left: 'unset',
                right: '0',
                zIndex: 99993
            });
            placeholder.style.display = 'none';
            target.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

// COLLAPSE
document.querySelectorAll('[data-collapse="toggle"]').forEach(toggle => {
    toggle.addEventListener('click', event => {
        event.preventDefault();

        const target = toggle.getAttribute('href').substring(1);
        const collapse = document.getElementById(target);

        if (!collapse) return;

        if (collapse.classList.contains('expand')) {
            collapse.style.maxHeight = '0';
            collapse.classList.remove('expand');
        } else {
            collapse.style.maxHeight = collapse.scrollHeight + 'px';
            collapse.classList.add('expand');
        }
    });
});

// ACCORDION
document.querySelectorAll('.accordion').forEach(accordion => {
    accordion.querySelectorAll('[data-accordion=toggle]').forEach(toggle => {
        const content = toggle.nextElementSibling;
        if (!content || content.getAttribute('data-accordion') !== 'content') return;
        content.style.maxHeight = toggle.classList.contains('expand') ? content.scrollHeight + 'px' : '0';

        toggle.addEventListener('click', () => {
            accordion.querySelectorAll('[data-accordion=toggle].expand').forEach(otherToggle => {
                if (otherToggle === toggle) return;

                otherToggle.classList.remove('expand');

                const otherContent = otherToggle.nextElementSibling;
                if (otherContent && otherContent.getAttribute('data-accordion') === 'content') {
                    otherContent.style.maxHeight = '0';
                }
            });

            const expand = toggle.classList.contains('expand');
            if (!expand) {
                toggle.classList.add('expand');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                toggle.classList.remove('expand');
                content.style.maxHeight = '0';
            }
        });
    });
});

// NAVTABS
document.querySelectorAll('.navtabs[data-tab-name]').forEach(navtabs => {
    const content = document.querySelector('.navtabs-content[data-tab-name="' + navtabs.getAttribute('data-tab-name') + '"]');
    const links = Array.from(navtabs.children);
    const panels = Array.from(content.children);

    if (!content) return;

    const activate = link => {
        links.forEach(btn => btn.classList.remove('active'));
        link.classList.add('active');
        panels.forEach(panel => panel.classList.remove('active'));

        const target = link.getAttribute('href').substring(1);
        const tab = content.querySelector('#' + target);

        if (tab) tab.classList.add('active');
    };

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            activate(link);
        });
    });

    const active = links.find(link => link.classList.contains('active')) || links[0];
    if (active) activate(active);
});

// MODAL
document.querySelectorAll('[data-modal="content"]').forEach(modal => {
    if (modal.querySelector('.modal-card')) return;

    const overlay = document.createElement('div');
    const wrapper = document.createElement('div');
    const modalSize = modal.getAttribute('data-modal-size');

    overlay.setAttribute('data-modal', 'close');
    overlay.className = 'close-overlay';
    wrapper.className = 'modal-card';

    if (modalSize) {
        wrapper.style.maxWidth = modalSize + 'px';
    }

    [...modal.children].forEach(child => wrapper.appendChild(child));

    modal.appendChild(overlay);
    modal.appendChild(wrapper);
});

document.querySelectorAll('[data-modal="toggle"]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        const target = btn.getAttribute('href').substring(1);
        const modal = document.getElementById(target);

        if (modal) modal.classList.add('open');
    });
});

document.querySelectorAll('[data-modal="close"]').forEach(close => {
    close.addEventListener('click', () => {
        document.querySelectorAll('[data-modal="content"]').forEach(modal => modal.classList.remove('open'));
    });
});

// DROPDOWN TOGGLE
document.querySelectorAll('[data-dropdown="toggle"]').forEach(toggle => {
    toggle.addEventListener('click', event => {
        event.preventDefault();

        const dropdown = toggle.nextElementSibling;
        if (!dropdown || dropdown.getAttribute('data-dropdown') !== 'content') return;

        document.querySelectorAll('[data-dropdown="content"]').forEach(content => {
            if (content !== dropdown) content.classList.remove('open');
        });

        dropdown.classList.toggle('open');
    });
});

document.addEventListener('click', event => {
    if (!event.target.closest('[data-dropdown="toggle"], [data-dropdown="content"]')) {
        document.querySelectorAll('[data-dropdown="content"]').forEach(content => content.classList.remove('open'));
    }
});

// ESC KEYDOWN
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        document.querySelectorAll('[data-modal="content"]').forEach(modal => modal.classList.remove('open'));
        document.querySelectorAll('[data-dropdown="content"]').forEach(content => content.classList.remove('open'));
    }
});

// TOOLTIP
document.querySelectorAll('[data-tooltip-text]').forEach(tooltip => {
    let removeTooltip;
    let copyDelay;

    tooltip.addEventListener('mouseenter', () => {
        clearTimeout(removeTooltip);
        clearTimeout(copyDelay);

        let tooltipText = tooltip.querySelector('.tooltip-text');

        if (!tooltipText) {
            tooltipText = document.createElement('div');
            tooltipText.className = 'tooltip-text';
            tooltipText.textContent = tooltip.getAttribute('data-tooltip-text');
            tooltip.appendChild(tooltipText);
            void tooltipText.offsetHeight;
        }

        tooltipText.classList.add('show');
    });

    tooltip.addEventListener('mouseleave', () => {
        const tooltipText = tooltip.querySelector('.tooltip-text');
        const isCopied = tooltipText.textContent.startsWith('Copied');
        const delay = isCopied ? 1500 : 0;

        if (!tooltipText) return;

        copyDelay = setTimeout(() => {
            tooltipText.classList.remove('show');
            removeTooltip = setTimeout(() => {
                tooltipText.remove();
            }, 150);
        }, delay);
    });
});

// COPY BTN WITH TOOLTIP
document.querySelectorAll('.copyBtn').forEach(copyBtn => {
    const copyContent = copyBtn.getAttribute('data-copy-text') || '';

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyContent).then(() => {
            let tooltip = copyBtn.querySelector('.tooltip-text');

            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.className = 'tooltip-text';
                copyBtn.appendChild(tooltip);
            }

            tooltip.textContent = 'Copied' + (copyBtn.classList.contains('text-copied') ? ' : ' + copyContent : '');
            tooltip.classList.add('show');

            setTimeout(() => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }, 1500);
        });
    });
});

// COPY TOAST
function showCopyToast(text, target = null) {
    navigator.clipboard.writeText(text).then(() => {
        const notif = document.createElement('div');

        notif.className = 'copy-notif';
        notif.innerHTML = '<span class="glyph color green">done_all</span><span>Copied to Clipboard</span>';
        document.body.appendChild(notif);

        setTimeout(() => notif.classList.add('show'), 100);
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 500);
        }, 1500);

        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
            target.focus();
            target.select();
        }
    });
}

// COPY GROUP
document.querySelectorAll('.copyGroup [data-copy="trigger"]').forEach(copyGroup => {
    copyGroup.addEventListener('click', () => {
        const copyContent = copyGroup.closest('.copyGroup').querySelector('[data-copy="content"]');
        if (!copyContent) return;
        let copyText = (copyContent.tagName === 'INPUT' || copyContent.tagName === 'TEXTAREA') ? copyContent.value : copyContent.textContent;

        showCopyToast(copyText, copyContent);
    });
});

// COPY BTN TOAST
document.querySelectorAll('.copyToast').forEach(copyToast => {
    const copyContent = copyToast.getAttribute('data-copy-text') || '';
    copyToast.addEventListener('click', () => showCopyToast(copyContent));
});

// DARK MODE (minimalism only)
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const triggers = document.querySelectorAll('[data-theme-trigger]');
    const preference = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(mode) {
        let active = mode;

        if (mode === 'light') {
            root.setAttribute('data-theme', 'light');
        } else if (mode === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            const system = preference.matches ? 'dark' : 'light';
            root.setAttribute('data-theme', system);
            active = 'system';
        }

        triggers.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.themeTrigger === active);
        });
    }

    let savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.themeTrigger;

            if (mode === 'toggle') {
                let current = root.getAttribute('data-theme') || (preference.matches ? 'dark' : 'light');

                const next = current === 'dark' ? 'light' : 'dark';

                localStorage.setItem('theme', next);
                applyTheme(next);
            } else {
                localStorage.setItem('theme', mode);
                applyTheme(mode);
            }
        });
    });

    preference.addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
});