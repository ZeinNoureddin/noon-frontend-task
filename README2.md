# The Film Fanatic

The Film Fanatic is a Next.js-based film discovery and management application that enables users to browse, search, and favorite movies using The Movie Database (TMDB) API. It is

## Key Technologies Used

- Framework: [Next.js](https://nextjs.org/)
- Lang: TypeScript
- State Management: Zustand
- Styling: SCSS Modules
- API: The Movie Database (TMDB)
- Package Manager: [Bun](https://bun.sh/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (used as the package manager)
- TMDB API Key. To register for an API key, click the [API link](https://www.themoviedb.org/settings/api) from within your account settings page.

### Installation

1. **Navigate into the directory**

```bash
cd path/to/the/project
```

2. **Add your `.env` file:**
   Create a `.env` file in the root directory and add your TMDB API key:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

3. **Install dependencies:**
   Use Bun to install the required packages:

```bash
bun install
```

4. **Run the dev server:**

```bash
bun dev
```

Now, you can access the application at `http://localhost:3000` in your web browser.

## Design Decisions

### State Management

Zustand was chosen for its simplicity and minimal boilerplate, and was used in two key places:

1. Search Store `(useSearchStore)`
   - Handles the search query, results, loading, and error state.
   - Allows for centralizing search logic and reusing across pages.
2. Favorites Store `(useFavoritesStore)`
   - Manages the user's favorite movies and syncs them with `localStorage`.

Regular React state management was used for local component state, such as form inputs and UI states that don't require global access.

### SSR

According to the [Next.js documentation](https://nextjs.org/docs/app/getting-started/server-and-client-components), layouts and pages are server components by default, unless specified otherwise via the `use client` directive. So, pages that required interactivity were marked with `use client` to enable client-side rendering. In particular, the following pages and components are server-rendered:

- `app/page.tsx` (Landing page)
- `app/movie/[id]/page.tsx` (Movie details page)
- Components like `<BackdropHeader>`, `<InfoCard>`, and `<CastSection>` are also server components
- Movie ribbons and other presentational elements rendered server-side by default
  These components explicitly use `use client`, and thus are rendered only in the browser:
- `Navbar.tsx`
- `SearchBar.tsx`
- `app/search/page.tsx`
- `app/favorites/page.tsx`
- Zustand stores:
  - `useSearchStore`
  - `useFavoritesStore`

### Overall Architecture

The application is structured around Next.js's file-based routing system, with the following key directories:

- `app/`: Contains the main application pages. Also includes the styles for the corresponding pages.
- `components/`: Contains reusable components like `Navbar`, `SearchBar`, and others. Also includes the styles for the corresponding components.
- `stores/`: Contains Zustand stores for managing global state.
- `styles/`: Contains global styles and commonly used SCSS modules.

### Routing

The application uses Next.js's file-based routing system. The main routes are:

- `/`: The landing page that displays popular movies.
- `/search?query=...`: The search results page that displays movies matching the user's query.
- `/favourites`: The favorites page that displays the user's favorite movies.
- `/movie/[id]`: The movie details page that displays detailed information about a specific movie.

## Challenges

- Learning curve with Zustand: It took some time to get used to Zustand, but with documentation, videos, and the help of AI tools, it wasn't too hard to become accustomed to it.
- Responsive design: Ensuring the application is responsive across different devices and screen sizes required a lot of testing and adjustments. I relied a lot on development tools and trial and error to get the layout right.
- There was nothing particularly crazy, but there was still a lot of debugging as with any project that uses tools you're not particularly fluent with.

## Additional/Bonus Features:

- As mentioned above, SSR was used by default for pages and components that didn't require interactivity.
- Animations were used for the loading spinners that appear before the data gets loaded.
- Animations were also used on the heart icon when the user clicks to favorite a movie, whether on the move poster or inside the movie details page.
- There is an animated, auto-scrolling carousel of top movies on the home page.

That's it! I hope you like The Film Fanatic.
