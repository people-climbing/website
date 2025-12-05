---
inclusion: always
---

# Project Structure

## Directory Organization

```
/src
  /app              - Next.js App Router pages and layouts
    /[route]        - Route-specific pages (e.g., /thanks, /testshirtnotforsalehehe)
    *.ttf, *.otf    - Custom fonts
    globals.css     - Global styles
    page.module.css - CSS modules for pages
  /components       - Reusable React components
  /config           - Configuration files (e.g., models.js)

/public
  /models           - 3D model assets (GLTF format)
    /[model-name]   - Each model has its own directory
      scene.gltf    - GLTF scene file
      scene.bin     - Binary data
      license.txt   - Attribution/license
      /textures     - Model textures
  *.gif, *.jpg      - Static images
  emotion-engine.json - 3D font data
```

## Key Files

- `src/config/models.js` - Configuration array for 3D models in the grid (name, scale, position, YouTube hash)
- `src/components/Model.jsx` - Individual 3D model component with interaction handlers
- `src/components/Camera.jsx` - Orthographic camera setup
- `src/components/Background.jsx` - Starfield and background elements
- `next.config.js` - Next.js configuration (static export, image settings)

## Conventions

- **Client Components**: All interactive 3D components use `"use client"` directive
- **CSS Modules**: Page-specific styles use CSS modules (`.module.css`)
- **3D Assets**: Models stored in `/public/models/[name]/` with consistent structure
- **Model Config**: New models added via `src/config/models.js` with properties:
  - `name` - matches directory name in `/public/models/`
  - `relativeScale` - size multiplier
  - `relativeOffsetY` - vertical position adjustment
  - `text` - display text on hover
  - `hash` - YouTube video ID
  - `row`, `column` - grid position

## Component Patterns

- Three.js components use React Three Fiber hooks (`useFrame`, `useThree`, `useLoader`)
- State management via React hooks (useState, useRef)
- Event handlers passed as props for model interactions (select, toggleOverlay, setHash)
