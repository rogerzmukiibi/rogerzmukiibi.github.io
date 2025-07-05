// Google Analytics Configuration
class BlogAnalytics {
    constructor() {
        // Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
        this.measurementId = 'G-SNGSSHT0VN';
        this.init();
    }
    
    init() {
        // Only initialize if measurement ID is configured
        if (this.measurementId === 'G-XXXXXXXXXX') {
            console.log('Google Analytics not configured. Please add your Measurement ID to analytics.js');
            return;
        }
        
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        document.head.appendChild(script);
        
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.measurementId, {
            // Enhanced tracking options
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Make gtag available globally
        window.gtag = gtag;
        
        // Track initial page load
        this.trackPageView();
    }
    
    // Track page views
    trackPageView(pagePath = window.location.pathname) {
        if (window.gtag) {
            window.gtag('config', this.measurementId, {
                page_path: pagePath,
                page_title: document.title
            });
        }
    }
    
    // Track custom events
    trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            window.gtag('event', eventName, parameters);
        }
    }
    
    // Track blog post views
    trackBlogPost(postId, postTitle) {
        this.trackEvent('blog_post_view', {
            post_id: postId,
            post_title: postTitle,
            content_type: 'blog_post'
        });
    }
    
    // Track CV downloads
    trackCVDownload() {
        this.trackEvent('cv_download', {
            file_name: 'Rogers_Mukiibi_CV.pdf',
            content_type: 'cv'
        });
    }
    
    // Track theme toggle
    trackThemeToggle(theme) {
        this.trackEvent('theme_toggle', {
            theme_mode: theme
        });
    }
    
    // Track external link clicks
    trackExternalLink(url, linkText) {
        this.trackEvent('external_link_click', {
            link_url: url,
            link_text: linkText
        });
    }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics
    window.blogAnalytics = new BlogAnalytics();
    
    // Track blog post views on post pages
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        // Wait for post title to load, then track
        setTimeout(() => {
            const postTitle = document.querySelector('h1')?.textContent || 'Unknown Post';
            window.blogAnalytics.trackBlogPost(postId, postTitle);
        }, 1000);
    }
    
    // Track CV download clicks
    const cvButton = document.querySelector('a[href*="CV.pdf"]');
    if (cvButton) {
        cvButton.addEventListener('click', function() {
            window.blogAnalytics.trackCVDownload();
        });
    }
    
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            window.blogAnalytics.trackExternalLink(this.href, this.textContent);
        });
    });
});

// Instructions for setup
console.log(`
📊 Google Analytics Setup Instructions:

1. Go to https://analytics.google.com
2. Create a new property for your blog
3. Get your Measurement ID (starts with G-)
4. Replace 'G-XXXXXXXXXX' in analytics.js with your actual ID
5. Deploy to see analytics data!

Features enabled:
✅ Page views
✅ Blog post tracking
✅ CV download tracking
✅ Theme toggle tracking
✅ External link tracking
`);
