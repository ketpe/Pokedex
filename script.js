const MAIN_PATH_API = "https://pokeapi.co/api/v2/pokemon/";
const API_LOAD_LIMITER = "?limit=100000&offset=0";
let pokemon_List = "";
let test1 = "?limit=100000&offset=21"
let firstload = true;
let displayedPokemon = 20;
let pokemonData = {
    names: [],
    types: [],
    Id: []
};


function init() {
    loadPokemonListFromServer();
}

async function loadPokemonListFromServer() {
    let response = await fetch(MAIN_PATH_API + API_LOAD_LIMITER);
    let responseToJson = await response.json();
    pokemon_List = responseToJson.results;
    // console.log(pokemon_List);
    renderFirstTwentyPokemon();
}
async function renderFirstTwentyPokemon() {
    const refContent = document.getElementById('pokemonCards');
    refContent.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        let response = await fetch(pokemon_List[i].url);
        responsePokemon = await response.json();
        await getGermanPokemon(responsePokemon)
        // console.log(pokemonData);
        refContent.innerHTML += getPokemonCardTemplate(responsePokemon, pokemonData);
    }
    refContent.innerHTML += getTempEmptyCard();
}