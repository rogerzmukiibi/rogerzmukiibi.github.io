# Back to Square one...

A simple, minimalistic blog built with HTML, CSS, and JavaScript, designed to be hosted on GitHub Pages.

## Features

- **Minimalistic Design** - Clean, simple layout focused on content
- **Responsive** - Works on all devices
- **Markdown Support** - Write posts in Markdown format
- **Static Site** - No backend required, perfect for GitHub Pages
- **Three Main Sections**:
  - Home - Bio and recent posts
  - Blog - All blog posts
  - Learning - Things I'm currently learning

## Structure

```
Blog/
├── index.html          # Home page
├── blog.html           # Blog posts page
├── learning.html       # Learning posts page
├── post.html           # Individual post viewer
├── styles.css          # CSS styles
├── script.js           # JavaScript for markdown parsing and rendering
├── config.js           # Blog configuration
├── assets/             # Static assets (CV, images)
│   ├── Rogers_Mukiibi_CV.pdf  # CV file (you need to add this)
│   └── README.md       # Assets documentation
├── posts/              # Markdown files for blog posts
│   ├── getting-started-with-web-development.md
│   ├── understanding-javascript-closures.md
│   ├── css-grid-vs-flexbox.md
│   ├── learning-react.md
│   ├── exploring-nodejs.md
│   └── template.md     # Template for new posts
└── README.md           # This file
```

## How to Use

### Adding New Posts

1. Create a new `.md` file in the `posts/` directory
2. Write your content in Markdown format
3. Add the post metadata to the `script.js` file in the appropriate array (`posts` for blog posts, `learningPosts` for learning posts)

### Post Metadata Format

```javascript
{
    id: 'your-post-filename-without-extension',
    title: 'Your Post Title',
    date: 'YYYY-MM-DD',
    excerpt: 'Brief description of your post',
    type: 'blog' // or 'learning'
}
```

### Markdown Format

Each markdown file should follow this structure:

```markdown
# Your Post Title

Your post content here...

## Subheading

More content...

### Sub-subheading

Even more content...

- List item 1
- List item 2

**Bold text** and *italic text*

```code
Code blocks are supported
```

[Links](https://example.com) work too.

> Blockquotes are also supported
```

## GitHub Pages Setup

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your blog will be available at `https://yourusername.github.io/repository-name`

## Customization

### Changing the Bio

Edit the bio section in `index.html`:

```html
<div class="bio">
    <p>Your bio here...</p>
</div>
```

### Adding New Navigation Items

1. Add the link to all HTML files in the navigation:

```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="learning.html">Learning</a></li>
        <li><a href="new-page.html">New Page</a></li>
    </ul>
</nav>
```

2. Create the new HTML file
3. Update the JavaScript if needed

### Styling

All styles are in `styles.css`. The design is intentionally minimal, but you can customize:

- Colors
- Fonts
- Spacing
- Layout

## Browser Support

- Chrome/Edge/Safari: Full support
- Firefox: Full support
- IE11: Limited support (markdown parsing may not work)

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

## Contributing

Feel free to fork this repository and make it your own! Some ideas for improvements:

- Add search functionality
- Include tags for posts
- Add RSS feed
- Include comment system
- Add dark mode
- Include social sharing buttons

## License

This project is open source and available under the MIT License.
