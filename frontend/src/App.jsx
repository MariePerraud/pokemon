import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Pokedex</h1>
        <p>
          Indique le nom de ton pokemon en anglais et en minuscule (ex :
          pikachu)
        </p>
        <div className="HeaderContener">
          <div className="HeaderSearchbar">
            <input
              type="text"
              onChange={(event) => {
                setPokemonName(event.target.value);
              }}
            />
            <button type="button" onClick={() => window.location.reload()}>
              &#128472;
            </button>
          </div>
          <button
            className="researchButton"
            type="button"
            onClick={searchPokemon}
          >
            Rechercher
          </button>
        </div>
      </header>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          ""
        ) : (
          <>
            <h2 style={{ textTransform: "uppercase" }}>{pokemon.name}</h2>
            <img src={pokemon.img} alt={pokemon.name} />
            <ul>
              <li style={{ textTransform: "capitalize" }}>
                Type: {pokemon.type}
              </li>
              <li>Hp: {pokemon.hp}</li>
              <li>Attack: {pokemon.attack}</li>
              <li>Defense: {pokemon.defense}</li>
            </ul>
          </>
        )}
      </div>
      <footer />
    </div>
  );
}

export default App;
