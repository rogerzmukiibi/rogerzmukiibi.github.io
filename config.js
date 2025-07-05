// Blog configuration
const blogConfig = {
    // Site information
    siteName: "My Blog",
    siteDescription: "A simple blog of me ranking my mind to the world",
    author: "Rogers Mukiibi",
    
    // Posts configuration
    postsPerPage: 10,
    recentPostsCount: 3,
    
    // Date format
    dateFormat: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    },
    
    // Social links (optional)
    social: {
        github: "https://github.com/rogerzmukiibi",
        twitter: "https://twitter.com/rogersmukiibi",
        linkedin: "https://linkedin.com/in/rogersmukiibi"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = blogConfig;
}
