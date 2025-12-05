---
title: "The PS2 Aesthetic: Design Choices"
date: "2024-12-03"
excerpt: "Exploring the visual design decisions that bring PlayStation 2 nostalgia to the web."
---

# The PS2 Aesthetic: Design Choices

The PlayStation 2 had one of the most iconic user interfaces in gaming history. That starfield background, the floating icons, the subtle bloom effects - it all created a sense of wonder and possibility.

## Why PS2?

For many of us, the PS2 was our first real gaming console. Booting it up and seeing those stars drift by while the menu music played was magical. I wanted to capture that feeling and bring it to the web.

## Key Visual Elements

### The Starfield
The infinite starfield background is rendered using Three.js particles. Each star moves at a different speed, creating that classic parallax effect that made the PS2 menu feel so dynamic.

### Orthographic Camera
Unlike most 3D web experiences that use perspective cameras, this site uses an orthographic camera - just like the PS2 menu. This gives objects that distinctive "flat but 3D" look that's so characteristic of that era.

### Bloom Effects
The subtle glow around objects and text is achieved through post-processing bloom effects. It's that soft, dreamy quality that made PS2 graphics feel so atmospheric.

## Modern Meets Retro

While the aesthetic is retro, the technology is cutting-edge. React Three Fiber allows for smooth 60fps animations, and the static export means the entire experience loads instantly - no server required.

The challenge was balancing authenticity with usability. The PS2 menu was designed for a TV and controller, so adapting it for mouse and touch input required some creative thinking.
