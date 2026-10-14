// The Reading Nook — interactive book collection

const books = [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classics",
    description: "A witty, warm-hearted story of first impressions, family, and finding love where you least expect it.",
    cover: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg"
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    genre: "Fantasy",
    description: "A quiet hobbit is swept into an extraordinary adventure full of riddles, dragons, and unexpected courage.",
    cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg"
  },
  {
    id: 3,
    title: "Little Women",
    author: "Louisa May Alcott",
    genre: "Classics",
    description: "Four sisters grow up, chase their dreams, and discover what home, friendship, and independence mean.",
    cover: "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg"
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery",
    description: "A gripping psychological mystery about an artist who stops speaking and the therapist determined to understand why.",
    cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg"
  },
  {
    id: 5,
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    description: "A mysterious circus appears without warning, bringing a magical competition and a love story with high stakes.",
    cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg"
  },
  {
    id: 6,
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Fiction",
    description: "In wartime Germany, a young girl finds comfort and courage in words, books, and the kindness of others.",
    cover: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg"
  },
  {
    id: 7,
    title: "And Then There Were None",
    author: "Agatha Christie",
    genre: "Mystery",
    description: "Ten strangers arrive on an isolated island, where a mysterious voice accuses them of terrible secrets.",
    cover: "https://covers.openlibrary.org/b/isbn/9780062073488-L.jpg"
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description: "A young shepherd follows a dream across the desert and learns to listen to the world and to himself.",
    cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg"
  }
];

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const genreFilters = document.getElementById("genreFilters");
const resultsMessage = document.getElementById("resultsMessage");
const emptyState = document.getElementById("emptyState");
const favouriteCount = document.getElementById("favouriteCount");
const toast = document.getElementById("toast");

let selectedGenre = "All";
let favouritesOnly = false;
let favourites = loadFavourites();
let toastTimer;

// Favourites are saved in this browser using localStorage.
function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem("readingNookFavourites")) || [];
  } catch {
    return [];
  }
}

function saveFavourites() {
  localStorage.setItem("readingNookFavourites", JSON.stringify(favourites));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function createBookCard(book) {
  const isFavourite = favourites.includes(book.id);
  const card = document.createElement("article");
  card.className = "book-card";

  const cover = document.createElement("img");
  cover.className = "book-cover";
  cover.src = book.cover;
  cover.alt = `Cover of ${book.title}`;
  cover.loading = "lazy";
  cover.onerror = () => {
    cover.onerror = null;
    cover.src = "https://placehold.co/300x440/f1eee5/43553f?text=Book+Cover";
  };

  const favButton = document.createElement("button");
  favButton.className = `favourite-button${isFavourite ? " is-favourite" : ""}`;
  favButton.textContent = isFavourite ? "♥" : "♡";
  favButton.setAttribute("aria-label", `${isFavourite ? "Remove" : "Add"} ${book.title} ${isFavourite ? "from" : "to"} favourites`);
  favButton.setAttribute("aria-pressed", String(isFavourite));
  favButton.addEventListener("click", () => toggleFavourite(book.id));

  const info = document.createElement("div");
  info.className = "book-info";

  const genre = document.createElement("span");
  genre.className = "book-genre";
  genre.textContent = book.genre;

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = `by ${book.author}`;

  const description = document.createElement("p");
  description.className = "book-description";
  description.textContent = book.description;

  const more = document.createElement("button");
  more.className = "read-more";
  more.textContent = "Why read it? ↗";
  more.addEventListener("click", () => showToast(`${book.title}: ${book.description}`));

  info.append(genre, title, author, description, more);
  card.append(cover, favButton, info);
  return card;
}

function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredBooks = books.filter(book => {
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    const matchesSearch = `${book.title} ${book.author} ${book.description}`.toLowerCase().includes(searchTerm);
    const matchesFavourites = !favouritesOnly || favourites.includes(book.id);
    return matchesGenre && matchesSearch && matchesFavourites;
  });

  bookGrid.replaceChildren(...filteredBooks.map(createBookCard));
  bookGrid.querySelectorAll(".book-card").forEach(card => {
  card.classList.add("reveal");
  revealObserver.observe(card);
});
  emptyState.hidden = filteredBooks.length !== 0;
  bookGrid.hidden = filteredBooks.length === 0;
  resultsMessage.textContent = favouritesOnly
    ? `${filteredBooks.length} favourite ${filteredBooks.length === 1 ? "book" : "books"}`
    : `${filteredBooks.length} ${filteredBooks.length === 1 ? "book" : "books"} to explore`;
  favouriteCount.textContent = favourites.length;
}

function toggleFavourite(bookId) {
  if (favourites.includes(bookId)) {
    favourites = favourites.filter(id => id !== bookId);
    showToast("Removed from your favourites.");
  } else {
    favourites.push(bookId);
    showToast("Added to your favourites ♡");
  }
  saveFavourites();
  renderBooks();
}

genreFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-genre]");
  if (!button) return;

  selectedGenre = button.dataset.genre;
  genreFilters.querySelectorAll(".filter-button").forEach(filter => {
    const active = filter === button;
    filter.classList.toggle("active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  renderBooks();
});

searchInput.addEventListener("input", renderBooks);

document.getElementById("showFavourites").addEventListener("click", () => {
  favouritesOnly = !favouritesOnly;
  const button = document.getElementById("showFavourites");
  button.setAttribute("aria-pressed", String(favouritesOnly));
  button.innerHTML = `${favouritesOnly ? "♥" : "♡"} ${favouritesOnly ? "All books" : "Favourites"} <span id="favouriteCount">${favourites.length}</span>`;
  if (favouritesOnly) {
    document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
  }
  renderBooks();
});

document.getElementById("surpriseMe").addEventListener("click", () => {
  const options = books.filter(book => !favouritesOnly || favourites.includes(book.id));
  if (!options.length) {
    showToast("Add a book to your favourites first, or switch back to all books.");
    return;
  }
  const randomBook = options[Math.floor(Math.random() * options.length)];
  searchInput.value = "";
  selectedGenre = "All";
  favouritesOnly = false;
  document.getElementById("showFavourites").innerHTML = `♡ Favourites <span id="favouriteCount">${favourites.length}</span>`;
  genreFilters.querySelectorAll(".filter-button").forEach(button => {
    const active = button.dataset.genre === "All";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderBooks();
  const card = [...bookGrid.querySelectorAll(".book-card")].find(item => item.querySelector("h3")?.textContent === randomBook.title);
  card?.scrollIntoView({ behavior: "smooth", block: "center" });
  card?.animate([{ outline: "3px solid #74866b" }, { outline: "0 solid transparent" }], { duration: 1200 });
  showToast(`Your next read: ${randomBook.title} ♡`);
});

document.getElementById("resetSearch").addEventListener("click", () => {
  searchInput.value = "";
  selectedGenre = "All";
  favouritesOnly = false;
  document.getElementById("showFavourites").innerHTML = `♡ Favourites <span id="favouriteCount">${favourites.length}</span>`;
  genreFilters.querySelectorAll(".filter-button").forEach(button => {
    const active = button.dataset.genre === "All";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderBooks();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

// Display the books as soon as the page loads.

/* Scroll-reveal observer */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

/* Sections and elements that reveal as you scroll */
document.querySelectorAll(
  ".hero-image, .welcome-strip, .section-heading, " +
  ".collection-tools, .results-message, .quote-section, " +
  ".about-image, .about-content, .site-footer"
).forEach(element => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

/* Typing animation that preserves the heading's styling */
const heroHeading = document.querySelector(".hero h1");

if (heroHeading) {
  let characterIndex = 0;

  function wrapTextNodes(element) {
    [...element.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();

        for (const character of node.textContent) {
          const span = document.createElement("span");
          span.className = "typing-char";
          span.textContent = character;
          span.style.animationDelay =
            `${characterIndex * 0.045}s`;

          characterIndex++;
          fragment.appendChild(span);
        }

        node.replaceWith(fragment);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        wrapTextNodes(node);
      }
    });
  }

  wrapTextNodes(heroHeading);
}

/* Display the books when the page loads */
renderBooks();

// ---------- Staff Picks carousel ----------
(function initCarousel() {
  const picks = books.slice(0, 5);          // first 5 books become staff picks
  const track = document.getElementById("carouselTrack");
  const dotsBox = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const pauseBtn = document.getElementById("carouselPause");
  const section = document.getElementById("picks");
  if (!track || picks.length === 0) return;

  let index = 0;
  let timer = null;
  let userPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build slides and dots
  track.innerHTML = picks.map((book, i) => `
    <article class="carousel-slide" aria-roledescription="slide"
             aria-label="${i + 1} of ${picks.length}">
      <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy">
      <div>
        <span class="slide-genre">${book.genre}</span>
        <h3>${book.title}</h3>
        <p class="slide-author">by ${book.author}</p>
        <p>${book.description}</p>
      </div>
    </article>`).join("");

  dotsBox.innerHTML = picks.map((book, i) =>
    `<button class="carousel-dot" aria-label="Go to ${book.title}" data-index="${i}"></button>`
  ).join("");

  const slides = track.querySelectorAll(".carousel-slide");
  const dots = dotsBox.querySelectorAll(".carousel-dot");

  function goTo(i) {
    index = (i + picks.length) % picks.length;   // wraps around
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, n) => s.setAttribute("aria-hidden", String(n !== index)));
    dots.forEach((d, n) => d.classList.toggle("active", n === index));
  }

  function start() {
    stop();
    if (!userPaused) timer = setInterval(() => goTo(index + 1), 5000);
  }
  function stop() { clearInterval(timer); }

  prevBtn.addEventListener("click", () => { goTo(index - 1); start(); });
  nextBtn.addEventListener("click", () => { goTo(index + 1); start(); });
  dots.forEach(dot => dot.addEventListener("click", () => { goTo(Number(dot.dataset.index)); start(); }));

  // Pause / play button
  function updatePauseButton() {
    pauseBtn.textContent = userPaused ? "▶ Play" : "❚❚ Pause";
    pauseBtn.setAttribute("aria-pressed", String(userPaused));
  }
  pauseBtn.addEventListener("click", () => { userPaused = !userPaused; updatePauseButton(); start(); });

  // Pause while the mouse is over it or keyboard focus is inside it
  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", start);
  section.addEventListener("focusin", stop);
  section.addEventListener("focusout", start);

  // Keyboard arrows
  section.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { goTo(index - 1); }
    if (e.key === "ArrowRight") { goTo(index + 1); }
  });

  // Swipe on touch screens
  let touchStartX = 0;
  track.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) { goTo(diff < 0 ? index + 1 : index - 1); start(); }
  });

  updatePauseButton();
  goTo(0);
  start();
})();