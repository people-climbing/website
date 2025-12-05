# Design Document

## Overview

This design adds two new content pages to the peopleclimbing.com website: an About page and a Blog page. Both pages will maintain the PS2 menu aesthetic while providing readable content areas. The implementation follows Next.js App Router patterns with static export compatibility and consistent styling with existing pages.

## Architecture

The feature follows the existing Next.js App Router structure:

```
/src/app
  /about
    page.jsx          - About page component
    page.module.css   - About page styles
  /blog
    page.jsx          - Blog listing page
    page.module.css   - Blog listing styles
    /[slug]
      page.jsx        - Individual blog post page
      page.module.css - Blog post styles
/src/lib
  blog.js             - Blog post utilities (markdown parsing)
/content
  /blog
    *.md              - Blog post markdown files
```

Both pages will be statically exportable and use client-side rendering where needed. Navigation will be added to connect these pages with the existing site structure.

## Components and Interfaces

### About Page Component
- **Location**: `src/app/about/page.jsx`
- **Type**: React functional component (can be server component since no interactivity needed)
- **Props**: None
- **Responsibilities**:
  - Render descriptive content about the site/creator
  - Maintain PS2 aesthetic with consistent styling
  - Provide navigation back to main pages

### Blog Page Component
- **Location**: `src/app/blog/page.jsx`
- **Type**: React functional component (can be server component since no interactivity needed)
- **Props**: None
- **Responsibilities**:
  - List all blog posts with title, date, and excerpt
  - Link to individual blog post pages
  - Maintain PS2 aesthetic with consistent styling
  - Provide navigation back to main pages

### Individual Blog Post Page
- **Location**: `src/app/blog/[slug]/page.jsx`
- **Type**: Dynamic route component
- **Props**: `{ params: { slug: string } }`
- **Responsibilities**:
  - Render individual blog post content from markdown
  - Display post metadata (title, date)
  - Maintain PS2 aesthetic with consistent styling
  - Provide navigation back to blog list

### Blog Utilities
- **Location**: `src/lib/blog.js`
- **Type**: Utility functions
- **Exports**:
  - `getAllPosts()`: Returns array of all blog posts with metadata
  - `getPostBySlug(slug)`: Returns single post with full content
  - `generateStaticParams()`: For Next.js static generation

### Navigation Component (Optional Enhancement)
- **Location**: `src/components/Navigation.jsx`
- **Type**: React functional component
- **Props**: None
- **Responsibilities**:
  - Provide consistent navigation links across pages
  - Style links with PS2 aesthetic
  - Can be added to layout or individual pages

## Data Models

### Blog Post Structure

Blog posts will be managed as markdown files with frontmatter metadata:

**File Location**: `/content/blog/[slug].md`

**Frontmatter Schema**:
```yaml
---
title: "Post Title"
date: "2024-12-05"
excerpt: "Brief description of the post"
---
```

**Blog Post Interface**:
```typescript
interface BlogPost {
  slug: string;        // Derived from filename
  title: string;       // From frontmatter
  date: string;        // ISO date string from frontmatter
  excerpt: string;     // Short description from frontmatter
  content: string;     // Parsed markdown content as HTML
}
```

**Markdown Processing**:
- Use a markdown parser (e.g., `gray-matter` for frontmatter, `marked` or `remark` for content)
- Parse markdown files at build time for static export
- Generate static pages for each blog post



## Error Handling

Error handling for this feature is minimal since the pages are static:

- **404 Handling**: Next.js handles missing routes automatically
- **Build Failures**: If pages don't export properly, the build will fail with clear error messages
- **Asset Loading**: If fonts or images fail to load, fallback to system fonts and alt text

## Testing Strategy

Testing will be manual for this feature:

- Verify pages render correctly in development
- Test navigation between pages
- Verify static build generates all pages correctly
- Check that markdown posts are parsed and displayed properly

## Implementation Notes

### Styling Approach

Both pages will use CSS modules following the existing pattern:
- Dark background consistent with PS2 aesthetic
- White text with text-shadow for readability
- Blur filter effects where appropriate
- Responsive padding and layout

### Content Structure

**About Page**:
- Simple centered layout
- Brief description of the site
- Creator information
- Navigation links

**Blog Page**:
- List of blog posts sorted by date (newest first)
- Each post shows title, date, and excerpt
- Links to individual post pages at /blog/[slug]
- Navigation links back to home

**Individual Blog Post Page**:
- Full markdown content rendered as HTML
- Post title and date displayed
- Navigation back to blog list and home

### Navigation Implementation

Two approaches:
1. **Inline Navigation**: Add navigation links directly to each page component
2. **Shared Component**: Create a Navigation component and include it in the layout or each page

Recommendation: Start with inline navigation for simplicity, refactor to shared component if needed.

### Static Export Compatibility

- Use standard Next.js Link component for navigation
- Avoid Image component optimization (use unoptimized prop or standard img tags)
- Parse markdown files at build time using `fs` in server components
- Use `generateStaticParams` to pre-render all blog post pages
- All blog posts will be statically generated at build time

### Markdown Dependencies

Required npm packages:
- `gray-matter`: Parse frontmatter from markdown files
- `marked` or `remark`: Convert markdown to HTML
- Both packages work at build time, compatible with static export
