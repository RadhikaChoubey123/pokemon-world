const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    bug: "#A8B820",
    normal: "#A8A878",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    poison: "#A040A0",
    flying: "#A890F0",
};

const PokemonCards = ({ PokemonData }) => {
    return (
        <li className="pokemon-card">
            {/* ✅ Image */}
            <figure>
                <img
                    src={PokemonData.sprites.other["official-artwork"].front_default}
                    alt={PokemonData.name}
                />
            </figure>

            {/* ✅ Name */}
            <h1>{PokemonData.name.toUpperCase()}</h1>

            {/* ✅ Types */}
            <div className="types-container">
                {PokemonData.types.map((t, index) => (
                    <span
                        key={index}
                        className="type-badge"
                        style={{ backgroundColor: typeColors[t.type.name] }}
                    >
                        {t.type.name}
                    </span>
                ))}
            </div>

            {/* ✅ Abilities */}
            <div className="abilities" >
                <h3>Abilities</h3>
                <ul>
                    {PokemonData.abilities.map((a, index) => (
                        <li key={index}>{a.ability.name}</li>
                    ))}
                </ul>
            </div>

            {/* ✅ Stats */}
            <div className="grid-three-cols">
                <span>HP: {PokemonData.stats[0].base_stat}</span>
                <span>ATK: {PokemonData.stats[1].base_stat}</span>
                <span>DEF: {PokemonData.stats[2].base_stat}</span>
            </div>
        </li>
    );
};

export default PokemonCards;
