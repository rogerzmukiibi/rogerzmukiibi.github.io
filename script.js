document.addEventListener("DOMContentLoaded", function () {
    fetch("posts.json")
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById("posts-list");
            posts.forEach(post => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="blog.html?post=${post.file}">${post.title} - ${post.date}</a>`;
                postList.appendChild(li);
            });
        });
});
