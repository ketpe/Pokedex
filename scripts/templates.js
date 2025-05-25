function getPokemonCardTemplate(pokemon, pokemonData) {
    return `<div onclick="renderdetailCard(${pokemon.id})" class="main-view-pokemon ${pokemonData.types[0]}">
    <div class="card-view" id="pokemon${pokemon.id}">
        <div class="pokemon-id"> # ${pokemon.id}</div>
        <h2 class="pokemon-name">${pokemonData.name}</h2>
        <div>
            <div class="pokemon-type-and-img">
                <div class="pokemon-types ">
                    ${getTypesTemplate(pokemonData.types)}
                </div>
                <div class="pokemon-img">
                    <img src="${pokemon.sprites.front_default}" alt="">
                </div>
            </div>
        </div>
    </div>
</div>`
}

function getTypesTemplate(pokemonTypes) {
    let result = "";
    for (let i = 0; i < pokemonTypes.length; i++) {
        let typeResult = pokemonTypes[i];
        result += `<span>${typeResult}</span>`
    }
    return result;
}

function getTempEmptyCard() {
    return `<div onclick="loadMorePokemon()" id="load_More_Pokemon" class="main-view-pokemon-plus">
                <img src="./assets/img/plus.svg">
            </div>`
}