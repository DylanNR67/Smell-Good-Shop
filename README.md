# Odore Perla+ | Haute Parfumerie

A premium, responsive Single Page Application (SPA) for a luxury fragrance boutique, designed based on brand design specifications.

## ✨ Features
*   **Hero Section**: Immersive heading styling, background orbit animations, and a floating interactive "30% OFF" spinning circle badge.
*   **Featured Collection**: Carousel highlighting the core catalog items:
    *   *Celestial Blossom* ($250) - Pink elixir floral scent.
    *   *Noir Elixir* ($299) - Matte black warm amber scent.
    *   *Mystic Dawn* ($175) - Fresh blue oceanic scent.
*   **Olfactive Detail Modal**: Deep look into the olfactive pyramid structure:
    *   *Top Notes* (initial impression)
    *   *Heart Notes* (core body)
    *   *Base Notes* (long-lasting trace)
    *   Selectable size selectors (50ml / 100ml) with real-time pricing updates.
*   **Scent Profile Quiz**: Personalized scent recommending wizard based on mood, wearing scenario, and preferred intensity.
*   **Slide-out Cart**: Slide drawer showing items, quantity controls, and coupon inputs. Typing `ODORE30` applies a 30% reduction.
*   **Checkout Simulator**: Multi-step checkout (Shipping Form -> Credit Card form) showing live credit card text overlays. Concludes with canvas confetti celebration.

## 🚀 Setup & Local Execution
The project uses vanilla HTML, CSS, and JS. 

To run it locally using Python's built-in server:
```bash
python -m http.server 8000
```
Then visit:
[http://localhost:8000](http://localhost:8000)

## 📂 File Directory
*   `index.html` - Site structure and modal elements.
*   `style.css` - Custom styling, glassmorphism filters, animations.
*   `app.js` - Database, state manager, search filters, and checkout events.
*   `design.md` - Design specifications.
*   `assets/` - High-quality generated bottle and layout images.
