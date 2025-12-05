---
inclusion: always
---

# Tech Stack & Development Guidelines

## Core Technologies

- **Next.js 14** (App Router) with static export (`output: "export"`)
- **React 18** with client-side rendering for 3D components
- **Three.js 0.159** via React Three Fiber (R3F)
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - R3F utilities (OrthographicCamera, Stars, AsciiRenderer, Text3D, useGLTF, etc.)
- **@react-three/postprocessing** - Visual effects (Bloom, EffectComposer)

## Critical Constraints

**Static Export Mode**: This project uses Next.js static export for GitHub Pages deployment. When making changes:
- Never use Next.js Image component with default settings (use `unoptimized: true`)
- Avoid server-side features (API routes, server components with data fetching, middleware)
- All routes must be statically exportable
- Use `"use client"` directive for all interactive/3D components

**Development Server**: Runs on port **1337** (not 3000). Use `npm run dev` to start.

## Code Patterns

### Three.js Components
- Always use `"use client"` directive at the top of files with R3F components
- Use R3F hooks: `useFrame` for animations, `useThree` for scene access, `useLoader` for assets
- Load GLTF models with `useGLTF` from `@react-three/drei`
- Handle pointer events via R3F props: `onPointerOver`, `onPointerOut`, `onClick`

### Styling
- Use CSS Modules (`.module.css`) for page-specific styles
- Global styles in `src/app/globals.css`
- Custom fonts loaded via `@font-face` in CSS

### Model Configuration
- 3D models stored in `/public/models/[name]/` with structure: `scene.gltf`, `scene.bin`, `/textures/`, `license.txt`
- Model metadata in `src/config/models.js` as array of objects with: `name`, `relativeScale`, `relativeOffsetY`, `text`, `hash` (YouTube ID), `row`, `column`
- When adding models, update `models.js` and ensure assets follow directory structure

## Common Tasks

```bash
npm run dev    # Start dev server on localhost:1337
npm run build  # Generate static export in /out
npm run lint   # Run ESLint
```

## Testing Changes
- Test static export with `npm run build` before deploying
- Verify 3D models load correctly (check browser console for GLTF errors)
- Ensure YouTube overlay functionality works after model changes
