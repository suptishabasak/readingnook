# The Reading Nook 📚

The Reading Nook is a beginner-friendly, responsive book-discovery website made with HTML, CSS, and vanilla JavaScript. It gives readers a cosy place to explore books, search by title or author, filter by genre, and keep a list of favourites.

## Project idea

**Purpose:** Help readers discover their next book through a simple, attractive collection.

**Target audience:** Students, casual readers, book lovers, and anyone looking for their next read.

## Features

- Responsive layout for desktop, tablet, and mobile screens
- Search books by title, author, or description
- Filter books by genre
- Add and remove books from favourites
- Save favourites in the browser with `localStorage`
- Surprise-me button to choose a random book
- Mobile navigation menu
- Accessible labels and keyboard focus styles
- No backend, authentication, or database required

## Technology stack

- HTML5 — page structure
- CSS3 — styling, grid layouts, and responsive design
- Vanilla JavaScript — search, filtering, favourites, and interactive controls
- Google Fonts — Playfair Display and DM Sans
- Open Library Covers and Unsplash — externally hosted images

## Getting started

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in your browser.

For a convenient development workflow, open the folder in Visual Studio Code and use the Live Server extension. The project does not require a build step or package installation.

## Project structure

```text
the-reading-nook/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Deployment with GitHub Pages

1. Create a new repository on GitHub, for example `the-reading-nook`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open the repository's **Settings**.
4. Select **Pages** from the sidebar.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose the `main` branch and the `/ (root)` folder, then save.
7. Wait for GitHub Pages to publish the site. Your live URL will look like `https://YOUR-USERNAME.github.io/the-reading-nook/`.

## Deployment with Vercel

1. Push the project to GitHub.
2. Sign in to Vercel and import the repository.
3. Since this is a static HTML project, no framework or build command is needed.
4. Deploy and use the live URL provided by Vercel.

## Notes

- Book favourites are saved locally in the browser that you use. They do not sync between devices because this is a frontend-only project.
- Fonts and images are loaded from external services, so those assets require an internet connection.
- Book descriptions are short introductory summaries for this demo project.

## Future improvements

- Add more books and genres
- Add a book-details modal
- Add sorting by title or author
- Add a reading-list export feature

---

Made with ♡ and a little too much coffee.
