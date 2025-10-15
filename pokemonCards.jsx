import "./pokemon.css"
const PokemonCards = ({ PokemonData }) => {
    return (
        <li className="pokemon-card">
            <figure>
                <img src={PokemonData.sprites.other.dream_world.front_default} alt="" />
            </figure>
            <h1>{PokemonData.name}</h1>

            <p className="types">
                {PokemonData.types.map((currType) => currType.type.name).join(", ")}
            </p>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                <span>Height:</span>
                    {PokemonData.height}
                   
                </p>
                <p className="pokemon-info">
                   <span> Weight:</span>
                    {PokemonData.weight}
                </p>
                <p className="pokemon-info">
                    <span>Speed:</span>
                    {PokemonData.stats[5].base_stat}
                </p>
                <p className="pokemon-info more-info">
                {PokemonData.base_experience}<br />
                    <span>Experience</span>
                   
                </p>
                <p className="pokemon-info more-info">
                {PokemonData.stats[1].base_stat}
                <br /><span>Atteck</span>
                </p>
                <p className="pokemon-info more-info">
                {PokemonData.abilities.map((currAbility) => currAbility.ability.name).slice(0, 1).join(", ")}
                   <br /> <span>Abilities</span>
                </p>
            </div>
        </li>
    );
}
export default PokemonCards