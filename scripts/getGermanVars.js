async function getGermanPokemon(pokemon) {
    clearPokemonData();
    await getGermanPokemonNames(pokemon);
    await getGermanPokemonTypes(pokemon.types);
    pokemonData.Id = pokemon.id;
    // console.log(pokemonData);
}

async function getGermanPokemonNames(pokemon) {
    let responsePokemonName = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon.id)
    pokemonName = await responsePokemonName.json();
    pokemonName = pokemonName.names[5].name;
    pokemonData.name = pokemonName;

}

async function getGermanPokemonTypes(pokemon) {
    // console.log(pokemon);
    let pokemontypes = [];
    for (let index = 0; index < pokemon.length; index++) {
        pokemontypes = await fetch(pokemon[index].type.url)
        pokemontypes = await pokemontypes.json();
        pokemonData.types.push(pokemontypes.names[4].name)

    }
    return pokemonData;
}

function clearPokemonData() {
    return pokemonData = {
        name: [],
        types: [],
        Id: []
    };
}