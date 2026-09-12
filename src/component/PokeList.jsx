import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { useGetPokemonQuery } from "../store/pokemonApi";

function PokeList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: pokemon = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPokemonQuery();

  const pageSize = 12;

  if (isLoading) {
    return (
      <main className="status-screen">
        <div className="loading-pulse" aria-hidden="true">●</div>
        <h1>Loading your Pokédex...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="status-screen">
        <p className="eyebrow">Connection interrupted</p>
        <h1>We couldn&apos;t load the Pokédex.</h1>
        <p>{error?.error || "Please check your connection and try again."}</p>
        <button type="button" className="retry-button" onClick={refetch}>
          Try again
        </button>
      </main>
    );
  }
  const searchData=pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(searchData.length / pageSize);
  const pageStart = (currentPage - 1) * pageSize;
  const visiblePokemon = searchData.slice(pageStart, pageStart + pageSize);

  const changeSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="container">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Pokédex / Explorer</p>
          <h1>Find your next <em>favorite.</em></h1>
          <p className="hero-text">
            Discover the original 124 Pokémon and learn what makes each one special.
          </p>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>●</span></div>
      </section>

      <section className="toolbar" aria-label="Pokémon search">
        <label className="search-label">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={changeSearch}
          />
        </label>
        <p className="result-count"><strong>{searchData.length}</strong> specimens found</p>
      </section>

      <section>
        <ul className="cards">
          {visiblePokemon.map((curPokemon) => (
            <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
          ))}
        </ul>
        {searchData.length === 0 && (
          <p className="empty-state">No Pokémon matched that search.</p>
        )}
        {totalPages > 1 && (
          <nav className="pagination" aria-label="Pokémon pages">
            <button
              type="button"
              className="page-button page-arrow"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ←
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  className={`page-button ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  key={page}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="page-button page-arrow"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              →
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}

export default PokeList;
