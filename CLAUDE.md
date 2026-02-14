# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal website for Lea Maria Wiesner built with a custom theme. The site serves as a portfolio showcasing research, blog posts, hobbies, and news updates.

## Development Commands

### Local Development
```bash
hugo server -D
# Serve site with drafts at http://localhost:1313

hugo server --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313 --buildDrafts --buildFuture
# Development server accessible from other devices on network
```

### Building
```bash
hugo --minify
# Build optimized static site to public/ directory

hugo
# Build without minification
```

### Content Creation
```bash
# Create new content using archetypes
hugo new about/entry-title.md
hugo new blog/post-title.md
hugo new research/paper-title.md
hugo new news/announcement.md
hugo new hobbies/hobby-name.md
```

## Architecture

### Directory Structure
- `content/` - Markdown content organized by section (blog, research, hobbies, news)
- `themes/custom/` - Custom Hugo theme with layouts and static assets
  - `layouts/` - HTML templates for different content types
  - `static/` - CSS, images, and other static files
- `archetypes/` - Content templates for different post types
- `hugo.toml` - Site configuration with navigation menu and parameters
- `public/` - Generated static site (gitignored)

### Content Types
Each content section has its own archetype with specific front matter:
- **About**: Education & career timeline entries with position, organization, location, date range, and type (education/career)
- **Research**: Academic papers with abstracts, authors, publication details
- **Blog**: Standard blog posts with tags and categories
- **News**: Brief announcements and updates
- **Hobbies**: Personal interests and activities

### Theme System
The site uses a custom Hugo theme (`themes/custom/`) rather than an external theme. Key components:
- Section-specific layouts for different content types
- Shared partials for header/footer
- Custom CSS with CSS custom properties for theming
- Responsive design optimized for personal portfolio use

## Configuration Notes

- Site uses custom theme located in `themes/custom/`
- Navigation menu defined in `hugo.toml` with weighted ordering
- Social links (GitHub, LinkedIn, Google Scholar) configured in site params
- Markup configured to allow unsafe HTML for enhanced content flexibility
- Profile image and site metadata configured in `[params]` section

## Key Files to Edit

- `hugo.toml` - Site configuration, navigation, social links
- `content/_index.md` - Homepage content
- `themes/custom/static/css/style.css` - Site styling and colors
- `themes/custom/layouts/` - Template modifications