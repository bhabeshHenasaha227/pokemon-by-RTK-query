# Pokemon RTK Query

A responsive Pokemon explorer built with React, Redux Toolkit Query, and Vite. Browse detailed Pokemon data, search by name, and move through a clean paginated Pokedex interface.

![Pokemon RTK Query preview](public/favicon.svg)

## Live Repository

[View the project on GitHub](https://github.com/bhabeshHenasaha227/pokemon-by-RTK-query)

## Features

- Fetches Pokemon data from the [PokeAPI](https://pokeapi.co/).
- Uses Redux Toolkit Query for API caching, request lifecycle state, and refetching.
- Loads the Pokemon list and detailed data through a single RTK Query endpoint.
- Searches Pokemon instantly by name.
- Displays 12 Pokemon per page with previous, next, and numbered pagination controls.
- Resets pagination when a new search begins.
- Includes loading, connection error, retry, and empty-search states.
- Responsive card grid for desktop, tablet, and mobile screens.
- Interactive card hover states and a polished dark explorer-style design.
- Accessible labels, pagination states, and keyboard-friendly controls.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based user interface |
| Redux Toolkit | Redux store configuration |
| RTK Query | API requests, caching, loading, and error state |
| React Redux | Connects React components to the Redux store |
| Vite | Development server and production bundler |
| ESLint | Code quality and linting |

## Project Structure

```text
src/
├── component/
│   ├── PokeList.jsx       # Search, filtering, pagination, and page states
│   ├── Pokemon.jsx        # Component wrapper
│   └── PokemonCard.jsx    # Pokemon details card
├── store/
│   ├── pokemonApi.js      # RTK Query API slice and endpoint
│   └── store.js           # Redux store configuration
├── App.jsx                # Application composition
├── index.css              # Global styles and responsive design
└── main.jsx               # React root and Redux Provider
```

## How It Works

1. `pokemonApi.js` creates an RTK Query API using `fetchBaseQuery`.
2. The API fetches the first 124 Pokemon names from PokeAPI.
3. It requests detailed data for each Pokemon and stores the result in the RTK Query cache.
4. `PokeList` reads the cached data with `useGetPokemonQuery()`.
5. Search filters the cached collection by Pokemon name.
6. Pagination slices the filtered collection into groups of 12.
7. Loading and error states are rendered from RTK Query request state.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- An internet connection for PokeAPI requests

### Installation

```bash
git clone https://github.com/bhabeshHenasaha227/pokemon-by-RTK-query.git
cd pokemon-by-RTK-query
npm install
```

### Start Development Server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Checks the project with ESLint |

## API

This project uses the public [PokeAPI](https://pokeapi.co/):

```text
https://pokeapi.co/api/v2/
```

The application requests 124 Pokemon and then retrieves their detailed records, including images, types, stats, abilities, height, weight, and base experience.

## Validation

Before committing changes, run:

```bash
npm run lint
npm run build
```

Both commands should complete successfully.

## Future Improvements

- Add Pokemon type filters.
- Add a favorites list using Redux state.
- Add a Pokemon detail route.
- Add skeleton loading cards.
- Add automated component and API tests.

## License

This project is intended for learning and portfolio use. Pokemon data is provided by PokeAPI.
