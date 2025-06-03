function getPokemonCardTemplate(pokemon, pokemonData) {
    return `<div onclick="renderdetailCard(${pokemon.id})" class="main-view-pokemon c-${pokemonData.types[0]}">
    <div class="card-view" id="pokemon${pokemon.id}">
        <div class="pokemon-id"> # ${pokemon.id}</div>
        <h2 class="pokemon-name">${pokemonData.name}</h2>
        <div>
            <div class="pokemon-type-and-img">
                <div class="pokemon-types ">
                    ${getTypesTemplate(pokemonData.types)}
                </div>
                <div class="pokemon-img">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="">
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
        result += `<img src="../assets/icons/${typeResult}.svg" alt="" class="ic-${typeResult}">`
    }
    return result;
}

function getTempEmptyCard() {
    return `<div onclick="loadMorePokemon()" id="load_More_Pokemon" class="main-view-pokemon-plus">
                <img src="./assets/img/plus.svg">
            </div>`
}

function getDetailViewPokemonCard(pokemon, pokemonData) {
    return `<div onclick="stopEventBubbeling(event)" class="detail-view-pokemon ${pokemonData.types[0]}">
    <div class="detail-card-view" id="pokemonDetail${pokemon.id}">
        <div class="arrow-container">
            <button onclick="getPrevPokemon(${pokemon.id})" class="arrow left" id="prevPokemon">&#8592;</button>
            <button onclick="getNextPokemon(${pokemon.id})" class="arrow right" id="nextPokemon">&#8594;</button>
        </div>
        <div class="pokemon-id">#${pokemon.id}</div>
        <h2 class="pokemon-name">${pokemonData.name}</h2>
        <div>
            <div class="pokemon-type-and-img">
                <div class="pokemon-types ">
                    ${getTypesTemplate(pokemonData.types)}
                </div>
                <div class="pokemon-img">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                        alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="pokemon-tabs">
        <div class="tab-buttons">
            <button class="tab-btn active" data-tab="tab1">Stats</button>
            <button class="tab-btn" data-tab="tab2">Moves</button>
            <button class="tab-btn" data-tab="tab3">Evolution</button>

        </div>
        <div class="tab-content active" id="tab1">
            <table border="1">
                <tr>
                    <td>Größe:</td>
                    <td>${(pokemon.height) * 10} cm</td>
                </tr>
                <tr>
                    <td>Typen:</td>
                    <td>${pokemonData.types}</td>
                </tr>
                <tr>
                    <td>Lebenspunkte:</td>
                    <td>${pokemon.stats[0].base_stat}</td>
                </tr>
                <tr>
                    <td>Angriff:</td>
                    <td>${pokemon.stats[1].base_stat}</td>
                </tr>
                <tr>
                    <td>Verteidigung:</td>
                    <td>${pokemon.stats[2].base_stat}</td>
                </tr>
                <tr>
                    <td>Spezialangriff</td>
                    <td>${pokemon.stats[3].base_stat}</td>
                </tr>
                <tr>
                    <td>Spezialverteidigung:</td>
                    <td>${pokemon.stats[4].base_stat}</td>
                </tr>
                <tr>
                    <td>Geschwindigkeit:</td>
                    <td>${pokemon.stats[5].base_stat}</td>
                </tr>
        </table>

        </div>
        <div class="tab-content" id="tab2">
            <!-- Inhalt für Moves -->
            <p>Attacken und Bewegungen.</p>
        </div>
        <div class="tab-content" id="tab3">
            <!-- Inhalt für Evolution -->
            <p>Entwicklungsschritte.</p>
        </div>
    </div>

</div>`
}
