const fs = require('fs');
const path = require('path');
const postsDir = path.join(__dirname, '..', 'posts'); 
const outputFile = path.join(__dirname, 'posts.json'); 

// Read existing posts.json if it exists
let existingPosts = [];
if (fs.existsSync(outputFile)) {
    try {
        existingPosts = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    } catch (e) {
        existingPosts = [];
    }
}

function extractFrontmatter(content) {
    const match = content.match(/---([\s\S]*?)---/);
    if (!match) return null;
    const lines = match[1].split('\n').map(line => line.trim()).filter(Boolean);
    const meta = {};
    lines.forEach(line => {
        const keyMatch = line.match(/^\*\*(.+?)\*\*: (.+)$/);
        if (keyMatch) {
            const key = keyMatch[1].toLowerCase();
            const value = keyMatch[2];
            meta[key] = value;
        }
    });
    return meta;
}

function getTitle(meta, filename) {
    return meta.title ? meta.title : filename.replace('.md', '');
}

function getExcerpt(content, meta) {
    // Use subtitle if available, else first paragraph after title
    if (meta.subtitle) return meta.subtitle;
    const body = content.split('\n').slice(1).join('\n');
    const paraMatch = body.match(/(?:^# .+\n+)?(.+?)(?:\n|$)/);
    return paraMatch ? paraMatch[1].trim().slice(0, 120) + '...' : '';
}

// Build new posts from markdown files
const newPosts = [];

fs.readdirSync(postsDir).forEach(file => {
    if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const meta = extractFrontmatter(content);
        if (meta && meta.type && meta.status === 'post') {
            const id = file.replace('.md', '');
            newPosts.push({
                id,
                title: getTitle(meta, file), // Get title from meta
                date: meta.date,
                excerpt: getExcerpt(content, meta),
                type: meta.type
            });
        }
    }
});

// Merge: update existing or add new
const mergedPosts = [...newPosts];
existingPosts.forEach(existing => {
    if (!mergedPosts.find(post => post.id === existing.id)) {
        mergedPosts.push(existing);
    }
});

fs.writeFileSync(outputFile, JSON.stringify(mergedPosts, null, 2));
console.log('posts.json updated!');