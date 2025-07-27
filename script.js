// Theme manager
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // Apply saved theme
        this.applyTheme();
        
        // Add event listener to toggle button
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        });
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleButton();
    }
    
    updateToggleButton() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', 
                this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
    }
    
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Track theme toggle in analytics
        if (window.blogAnalytics) {
            window.blogAnalytics.trackThemeToggle(this.theme);
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Simple markdown parser
class MarkdownParser {
    constructor() {
        this.rules = [
            // Headers
            { pattern: /^### (.*$)/gm, replacement: '<h3>$1</h3>' },
            { pattern: /^## (.*$)/gm, replacement: '<h2>$1</h2>' },
            { pattern: /^# (.*$)/gm, replacement: '<h1>$1</h1>' },
            
            // Bold and italic
            { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
            { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
            
            // Code blocks
            { pattern: /```([\s\S]*?)```/g, replacement: '<pre><code>$1</code></pre>' },
            { pattern: /`(.*?)`/g, replacement: '<code>$1</code>' },
            
            // Links
            { pattern: /\[([^\]]+)\]\(([^\)]+)\)/g, replacement: '<a href="$2">$1</a>' },
            
            // Lists
            { pattern: /^\* (.*$)/gm, replacement: '<li>$1</li>' },
            { pattern: /^- (.*$)/gm, replacement: '<li>$1</li>' },
            
            // Blockquotes
            { pattern: /^> (.*$)/gm, replacement: '<blockquote>$1</blockquote>' },
            
            // Line breaks
            { pattern: /\n\n/g, replacement: '</p><p>' },
        ];
    }
    
    parse(markdown) {
        let html = markdown;
        
        // Apply all rules
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        // Wrap in paragraphs
        html = '<p>' + html + '</p>';
        
        // Fix empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        
        // Fix list wrapping
        html = html.replace(/<p>(<li>.*<\/li>)<\/p>/g, '<ul>$1</ul>');
        html = html.replace(/<\/li><li>/g, '</li><li>');
        
        return html;
    }
}

// Blog post manager
class BlogManager {
    constructor() {
        this.parser = new MarkdownParser();
        this.posts = [];
        this.learningPosts = [];
        this.currentPage = this.getCurrentPage();
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('blog.html')) return 'blog';
        if (path.includes('learning.html')) return 'learning';
        if (path.includes('post.html')) return 'post';
        return 'home';
    }
    
    async loadPosts() {
        try {
            const response = await fetch('vault/scripts/posts.json');
            if (!response.ok) throw new Error('Could not load posts');
            const allPosts = await response.json();

            // Separate blog and learning posts
            this.posts = allPosts.filter(post => post.type === 'blog');
            this.learningPosts = allPosts.filter(post => post.type === 'learning');

            // Sort posts by date (newest first)
            this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.learningPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Error loading posts:', error);
            this.posts = [];
            this.learningPosts = [];
        }
    }
    
    async loadMarkdownContent(postId) {
        try {
            const response = await fetch(`vault/posts/${postId}.md`);
            if (!response.ok) {
                throw new Error('Post not found');
            }
            let markdown = await response.text();

            markdown = markdown.replace(/---[\s\S]*?---\s*/, '');

            return this.parser.parse(markdown);
        } catch (error) {
            console.error('Error loading post:', error);
            return '<p>Sorry, this post could not be loaded.</p>';
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    createPostCard(post) {
        return `
            <article class="post-card">
                <div class="post-meta">${this.formatDate(post.date)}</div>
                <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                <p>${post.excerpt}</p>
            </article>
        `;
    }
    
    async renderHomePage() {
        const recentPostsContainer = document.getElementById('recent-posts-container');
        if (!recentPostsContainer) return;
        
        // Show 3 most recent blog posts
        const recentPosts = this.posts.slice(0, 3);
        const postsHTML = recentPosts.map(post => this.createPostCard(post)).join('');
        recentPostsContainer.innerHTML = postsHTML;
    }
    
    async renderBlogPage() {
        const blogPostsContainer = document.getElementById('blog-posts-container');
        if (!blogPostsContainer) return;
        
        const postsHTML = this.posts.map(post => this.createPostCard(post)).join('');
        blogPostsContainer.innerHTML = postsHTML;
    }
    
    async renderLearningPage() {
        const learningPostsContainer = document.getElementById('learning-posts-container');
        if (!learningPostsContainer) return;
        
        const postsHTML = this.learningPosts.map(post => this.createPostCard(post)).join('');
        learningPostsContainer.innerHTML = postsHTML;
    }
    
    async renderPostPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        
        if (!postId) {
            document.body.innerHTML = '<p>Post not found</p>';
            return;
        }
        
        // Find the post
        const post = [...this.posts, ...this.learningPosts].find(p => p.id === postId);
        
        if (!post) {
            document.body.innerHTML = '<p>Post not found</p>';
            return;
        }
        
        // Create the post page HTML
        const postHTML = `
            <header>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="learning.html">Learning</a></li>
                        <li><button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">🌙</button></li>
                    </ul>
                </nav>
            </header>
            
            <main>
                <a href="${post.type === 'blog' ? 'blog.html' : 'learning.html'}" class="back-btn">← Back to ${post.type === 'blog' ? 'Blog' : 'Learning'}</a>
                
                <article class="article">
                    <h1>${post.title}</h1>
                    <div class="article-meta">${this.formatDate(post.date)}</div>
                    <div class="article-content" id="article-content">
                        Loading...
                    </div>
                </article>
            </main>
            
            <footer>
                <p>&copy; 2025</p>
            </footer>
        `;
        
        document.body.innerHTML = postHTML;
        
        // Re-initialize theme manager for the new page
        themeManager.init();
        
        // Load and render the markdown content
        const content = await this.loadMarkdownContent(postId);
        const contentContainer = document.getElementById('article-content');
        if (contentContainer) {
            contentContainer.innerHTML = content;
        }
    }
    
    async init() {
        await this.loadPosts();
        
        switch (this.currentPage) {
            case 'home':
                await this.renderHomePage();
                break;
            case 'blog':
                await this.renderBlogPage();
                break;
            case 'learning':
                await this.renderLearningPage();
                break;
            case 'post':
                await this.renderPostPage();
                break;
        }
    }
}

// Initialize the blog when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const blog = new BlogManager();
    blog.init();
});
