# Rogers Blog Vault

This is an Obsidian vault containing all the content for Rogers Mukiibi's blog.

## Structure

### 📝 Posts
- **Location**: `posts/` folder
- **Purpose**: Published blog posts that appear on the website
- **Format**: Markdown files with frontmatter metadata

### 📋 Drafts
- **Location**: `drafts/` folder  
- **Purpose**: Work-in-progress posts and ideas
- **Format**: Markdown files (can be messy, notes, incomplete)

## Writing Workflow

1. **Start in Drafts**: Create new posts in the `drafts/` folder
2. **Use Obsidian Features**: 
   - Link between notes with `[[note name]]`
   - Add tags with `#tag`
   - Use templates for consistency
3. **Move to Posts**: When ready to publish, move from `drafts/` to `posts/`
4. **Update Blog**: The website will automatically load from `vault/posts/`

## Post Format

Each post should have this structure:

```markdown
---
title: "Your Post Title"
date: 2025-01-01
tags: [web-development, javascript]
excerpt: "Brief description of the post"
type: blog  # or "learning"
---

# Your Post Title

Your content here...
```

## Obsidian Tips

- **Daily Notes**: Great for capturing ideas
- **Graph View**: See connections between posts
- **Templates**: Create post templates for consistency
- **Plugins**: Consider plugins like Calendar, Templater, etc.

## Blog Integration

The blog's JavaScript automatically loads posts from `vault/posts/`. The file structure is:
- Website loads from: `vault/posts/filename.md`
- Post URLs become: `post.html?id=filename`

## Folder Organization

```
vault/
├── posts/           # Published posts
├── drafts/          # Work in progress
├── templates/       # Post templates (optional)
├── assets/          # Images, files (optional)
└── .obsidian/       # Obsidian configuration
```

## Getting Started

1. Open this vault in Obsidian
2. Create new posts in the `drafts/` folder
3. Use the existing posts as examples
4. Move completed posts to `posts/` folder
5. Your blog will automatically show the new posts

Happy writing! 🚀
