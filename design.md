# Design Specifications: Odore Perla+

This document outlines the design identity, style guidelines, and visual structure for the **Odore Perla+** website, recreated from the provided screenshot.

---

## 1. Visual Identity & Brand System

### Brand Name
**Odore Perla+** (with a small gold plus sign, suggesting premium quality or custom blends).

### Color Palette
The color palette uses soft, elegant earth tones combined with deep dark contrast and warm golds to convey organic luxury.

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Vanilla Sand** | `#FDFBF7` | Primary Background (Light, warm, clean) |
| **Champagne Cream** | `#F5EBE0` | Section background, containers, cards |
| **Warm Ochre** | `#DDA15E` | Accent color, "Shop Now" buttons, active state indicators |
| **Deep Obsidian** | `#1A1A1A` | Headings, secondary "View Details" buttons, footer text |
| **Dusty Charcoal** | `#555555` | Body copy, secondary text, labels |
| **Gold Highlight** | `#C5A880` | Borders, badge accents, icons |

### Typography
- **Headings (Brand & Hero)**: *Cinzel* or *Playfair Display* (Serif). Elegant, luxury feel, high contrast weight, slightly organic curves.
- **Body & Controls**: *Inter* or *Montserrat* (Sans-serif). Clean, high readability, professional.

### Border Radius & Shadows
- **Buttons / Inputs**: Fully rounded pill shapes (`border-radius: 50px`).
- **Cards & Visual Containers**: Soft corners (`border-radius: 12px` to `20px`).
- **Shadows**: Soft, blurry, diffuse shadows (`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05)`) to make elements lift gracefully.
- **Hero Image Shadows**: A dark reflection style or a very smooth drop shadow beneath the glass bottles.

---

## 2. Layout & Section Guide

The page is designed as a smooth, multi-sectional scrolling landing page with lazy animations and interactive carousels.

```
+-------------------------------------------------------------+
| [Logo]                 Home  Collection  Deals  Reviews  Contact  [Search] [Cart] |
+-------------------------------------------------------------+
|                                                             |
|   A Symphony                   +------------------------+   |
|   of Scent                     |                        |   |
|                                |   Perfume Bottle       |   |
|   [Shop Now] [View Details]    |      (SUITS)           |   |
|                                |                        |   |
|   Our Experts                  +------------------------+   |
|   Explore More ->                  <  o o o o  >            |
|                                                             |
+-------------------------------------------------------------+
|  140+ Products   |   1M+ Sales   |  80+ Franchises  | 1.01m Connections |
+-------------------------------------------------------------+
|                                                             |
|      +---------------+       About Us                       |
|      |               |       "Our Legacy Of Luxury"         |
|      | Hand & Bottle |       At Odore Perla...              |
|      |               |                                      |
|      +---------------+       [Learn More]                   |
|                                                             |
+-------------------------------------------------------------+
|                     Featured Collection                     |
|    <  [Celestial Blossom]   [Noir Elixir]   [Mystic Dawn]  >|
|          $250                  $299             $175        |
+-------------------------------------------------------------+
|  Why Choose Us                                              |
|  [Images Grid]              01 Artistic Design              |
|                             02 Organic Ingredients          |
|                             03 Sustainable Elegance         |
|                             04 Exclusive Collections        |
+-------------------------------------------------------------+
|                    What Our Customers Say                   |
|                  +--------------------------+               |
|                  | "Great Service!..."      |               |
|                  | Sophia L. (Verified)     |               |
|                  +--------------------------+               |
+-------------------------------------------------------------+
|  +---------------+      A Commitment To Purity              |
|  | Bottle on     |      We believe in sustainable luxury... |
|  | Pedestal      |                                          |
|  +---------------+      [Learn More]                        |
+-------------------------------------------------------------+
|            Stay Connected with Odore Perla                  |
|            [ Enter email address ]  [Subscribe Now]         |
+-------------------------------------------------------------+
```

### Hero Section Specs
- **Left Column**: Title, subtitle, CTAs, and a small secondary feature block ("Our Experts" with text and a custom arrow link).
- **Right Column**: Giant mockup of the signature fragrance bottle ("SUITS") with a golden liquid fill, clear glass cap.
- **Accents**:
  - Dotted circular orbits around the bottle.
  - A hanging circular discount tag: "30% OFF".
  - A slide indicator (`< 1 2 3 >` format with orange active color).

### Stats Bar
- Flex/grid row, light cream background.
- Simple, high-contrast typography emphasizing the numbers (e.g. `140+`, `1M+`).

### About Us Specs
- Split layout (Left: Image of hand holding bottle, Right: Text block).
- Clean margins, serif main heading, elegant sub-quote in italic gold.

### Featured Collection Specs
- Carousel grid layout showcasing 3 fragrances.
- Hover zoom animations on the card images.
- Distinct color profiles:
  - **Celestial Blossom**: Pink elixir (Floral, romantic vibe).
  - **Noir Elixir**: Dark black bottle (Spicy, night-out vibe).
  - **Mystic Dawn**: Ocean blue elixir (Fresh, aquatic vibe).

### Why Choose Us Specs
- Left side: A neat grid collage of 4 lifestyle/ingredient images.
- Right side: Vertical listing of 4 core advantages with numeric labels (`01`, `02`, `03`, `04`) in light gold.

### Review Section Specs
- Central carousel slide containing a portrait of a reviewer, gold quote mark icon, text, name, and role.
- Dynamic transition when switching slides.

### Purity Specs
- Split layout (Left: Bottle on a luxury stone platform, Right: Editorial column explaining sustainable sourcing).

### Newsletter Footer Card
- Styled as a glassmorphic container with deep padding, absolute center alignment, text fields, and gold button.

---

## 3. Interactive States & Micro-interactions

- **Navbar Hover**: Links transition from dark charcoal to Warm Ochre with a delicate bottom underline.
- **Primary Buttons**: Hovering over a Warm Ochre button causes a scale-up effect (`scale(1.05)`) and increases the intensity of a soft shadow.
- **Secondary Buttons ("View Details", "Learn More")**: Hovering causes the black background to slide to a deep gold or outline style, or applies a sleek lift.
- **Product Cards**: Elevate slightly on hover; image zooms in slightly. Clicking "Shop Now" initiates an animated cart add (e.g., flying particle to the cart icon).
- **Cart & Slide Drawers**: Smooth sliding transition from the right side.
