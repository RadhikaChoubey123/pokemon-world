import { useEffect, useState } from "react";
import "./pokemon.css";
import PokemonCards from "./PokemonCards";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const details = await res.json();
        return details;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // ✅ Search + Filter by type
  const filteredData = pokemon.filter((currPokemon) => {
    const matchesSearch = currPokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = filterType
      ? currPokemon.types.some((t) => t.type.name === filterType)
      : true;
    return matchesSearch && matchesType;
  });

  // ✅ Pagination (20 per page)
  const itemsPerPage = 15;
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ✅ Loading State
  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Pokémons...</h2>
        <img
          src="https://i.gifer.com/origin/7a/7a47a3d6a1c95bb1e905aebef7cc0d6f.gif"
          alt="Loading"
        />
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <section className={darkMode ? "dark" : ""}>
      <header>
        <h1>Let’s Catch Pokémon</h1>
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* ✅ Search and Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* ✅ Cards */}
      <ul className="card-demo">
        {paginatedData.map((currPokemon) => {
          return (
            <PokemonCards key={currPokemon.id} PokemonData={currPokemon} />
          );
        })}
      </ul>

      {/* ✅ Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Prev
        </button>
        <span>
          Page {page} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          disabled={page * itemsPerPage >= filteredData.length}
          onClick={() => setPage(page + 1)}
        >
          Next ➡
        </button>
      </div>
    </section>
  );
};

export default Pokemon;
