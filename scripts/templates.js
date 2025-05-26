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
                            <img src="${pokemon.sprites.front_default}"
                                alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="pokemon-tabs">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-tab="tab1">Info</button>
                    <button class="tab-btn" data-tab="tab2">Stats</button>
                    <button class="tab-btn" data-tab="tab3">Moves</button>
                    <button class="tab-btn" data-tab="tab4">Evolution</button>
                </div>
                <div class="tab-content active" id="tab1">
                    <!-- Inhalt für Info -->
                    <p>Basisinformationen zum Pokémon.</p>
                </div>
                <div class="tab-content" id="tab2">
                    <!-- Inhalt für Stats -->
                    <p>Statuswerte und Fähigkeiten.</p>
                </div>
                <div class="tab-content" id="tab3">
                    <!-- Inhalt für Moves -->
                    <p>Attacken und Bewegungen.</p>
                </div>
                <div class="tab-content" id="tab4">
                    <!-- Inhalt für Evolution -->
                    <p>Entwicklungsschritte.</p>
                </div>
            </div>

        </div>`
}
