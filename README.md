# Quintsea CSS

Quintsea is a CSS framework built around five aesthetics (4+1), which includes Minimalism (+ dark mode), Neubrutalism, ~~Flat~~ and ~~Retro~~ UI Design.

Check out the [live demo](https://quintsea.nanraizen.me) and detailed [documentation](https://quintsea.nanraizen.me/docs) to see Quintsea CSS in action, or explore the available components.

> This project is dedicated to [Nakano Nino](https://5hanayome.fandom.com/wiki/Nino_Nakano) 💜🥰

## Overview

- 🎭 **4+1 Aesthetics** -  four design aesthetics with Dark Mode available for Minimalism.
- 🎨 **Colors** - palettes that bring designs to life.  
- 🧩 **Components** - reusable building blocks.
- 🔤 **Formatting** - clean, readable text styling.
- ⚡ **States** - smooth interactions and feedback.

## Installation
### Install Manually
Download from the [Releases](../../releases), extract and link it to your project (e.g., `quintsea-css/`). 

```html
<!-- base css (default appearance) -->
<link rel="stylesheet" href="quintsea-css/css/quintsea.min.css">

<!-- additional appearance (e.g., neubrutalism) -->
<link rel="stylesheet" href="quintsea-css/css/themes/quintsea-neubrutalism.min.css">

<!-- js for interactive components-->
<script src="quintsea-css/js/quintsea.min.js"></script>
```

### Using CDN
You can also use the CDN for a quick setup. See the package on [jsDelivr](https://www.jsdelivr.com/package/npm/quintsea-css).
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quintsea-css@latest/css/quintsea.min.css">

<script src="https://cdn.jsdelivr.net/npm/quintsea-css@latest/js/quintsea.min.js"></script>
```

### Using NPM
```html
npm install quintsea-css
```

## Usage Example

```html
<!-- Button -->
<button class="btn primary">Click Me</button>

<!-- Card -->
<div class="card">
    <a href="#" class="img-th"><img src="img/nino.webp" alt="nino"></a>
    <h6><a href="#">Nakano Nino</a></h6>
    <p class="text-14 color secondary">Gotoubun no Hanayome</p>
</div>
```

### Layout Philosophy

Quintsea CSS is not a complete layout system. You'll still need to use additional css `grid`, `flex`, or other layout methods for advanced layouts. However, a set of starter `grid` and `flex` classes is included for convenience, and they remain intentionally minimal.

base example :
```html
<div class="grid grid-3 gap-12"> ... </div>
<!-- or -->
<div class="cardset grid-3 gap-12"> ... </div>
<!-- or -->
<div class="flex gap-12"> ... </div>
```
grid/cardset example :
```html
<div class="cardset grid-3 gap-12">
    <div class="card row-span-2">1 (row span 2)</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card col-span-2">4 (span 2)</div>
</div>
```
flex example :
```html
<nav class="flex gap-12">
    <a href="#" class="btn primary">1</a>
    <a href="#" class="btn primary">2</a>
    <a href="#" class="btn primary">3</a>
</nav>
```

## Dark Mode
Add the inline init script before `</head>`.
```html
<script>
    (function initTheme() {
        const root = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'system';
        const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let theme;

        if (savedTheme === 'system') {
            theme = preference ? 'dark' : 'light';
        } else {
            theme = savedTheme;
        }

        root.setAttribute('data-theme', theme);
    })();
</script>
```
There are three ways to switch between light and dark mode.
```html
<!-- set a specific theme -->
<button data-theme-trigger="dark">Dark</button>
<button data-theme-trigger="light">Light</button>

<!-- toggle between themes -->
<button data-theme-trigger="toggle">Toggle</button>

<!-- follow your system's theme -->
<button data-theme-trigger="system">System Default</button>
```

## Browser Support

Quintsea CSS also uses [normalize.css](https://necolas.github.io/normalize.css/) to reset default browser styles.

- Chromium-based, 2020 and newer (Chromium 85+).
- Firefox, 2020 and newer (Firefox 80+).
- Safari, untested. 🙏
- IE is dead, forget it. 🙏

## License

Code licensed under [MIT](https://github.com/nanraizen/quintsea-css/blob/main/LICENSE), documentation under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).