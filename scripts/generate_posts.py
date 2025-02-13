import os
import json

posts_dir = "posts"
posts = []

for filename in sorted(os.listdir(posts_dir), reverse=True):
    if filename.endswith(".md"):
        file_path = os.path.join(posts_dir, filename)

        # Extract title and date from the filename (fallbacks)
        file_parts = filename.rsplit(".", 1)[0]  # Remove .md extension
        file_parts = file_parts.split("_", 1)  # Split at the first underscore
        file_date = file_parts[0] if len(file_parts) > 1 else "Unknown Date"
        file_title = file_parts[1].replace("-", " ").title() if len(file_parts) > 1 else "Untitled"

        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

            # Extract title from the file (if present)
            content_title = lines[0].strip("# ").strip() if len(lines) > 0 and lines[0].startswith("#") else None

            # Extract date from the file (if present)
            content_date = lines[1].strip() if len(lines) > 1 and lines[1].strip() else None

        create_time = os.path.getctime(file_path)
        # Use the file content first, fallback to filename
        title = content_title if content_title else file_title
        date = content_date if content_date else file_date

        posts.append({"title": title, "date": date, "file": file_path, "create_time": create_time})

posts.sort(key=lambda x: x["create_time"], reverse=True)

# Write the updated posts list to JSON
with open("posts.json", "w", encoding="utf-8") as json_file:
    json.dump(posts, json_file, indent=4)

print("posts.json updated!")
