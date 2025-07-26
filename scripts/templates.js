function getPokemonCardTemplate(pokemon, pokemonData) {
    return `<div onclick="renderDetailCard(${pokemon.id})" class="main-view-pokemon c-${pokemonData.types[0]}">
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
        result += `<img src="./assets/icons/${typeResult}.svg" alt="${typeResult}" title="${typeResult}-Typ" class="ic-${typeResult}">`
    }
    return result;
}

function getTempEmptyCard() {
    return `<div onclick="loadMorePokemon()" id="load_More_Pokemon" class="main-view-pokemon-plus">
                <img src="./assets/img/plus.svg">
            </div>`
}

function getDetailViewPokemonCard(pokemon, pokemonData, evolutionData) {
    return `<div onclick="stopEventBubbeling(event)" class="detail-view-pokemon c-${pokemonData.types[0]}">
    <div class="detail-card-view" id="pokemonDetail${pokemon.id}">
        <div class="arrow-container">
            <button onclick="getPrevPokemon(${pokemon.id})" class="arrow left" id="prevPokemon">&#8592;</button>
            <button onclick="getNextPokemon(${pokemon.id})" class="arrow right" id="nextPokemon">&#8594;</button>
        </div>
        <div class="pokemon-id">#${pokemon.id}</div>
        <h2 class="pokemon-name">${pokemonData.name}</h2>
        <div class="detail-img-container">
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
        <div class="pokemon-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="tab1">Status Werte</button>
                <button class="tab-btn" data-tab="tab2">Entwicklung</button>

            </div>
            <div class="tab-content active" id="tab1">
                <table class="table-stats">
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
                <p>Mögliche Entwicklungen</p>
                <div class="evolution-container">
                    ${getEvolutionTemplate(pokemonData, evolutionData)}
                </div>
            </div>
        </div>
    </div>
</div>

</div>`
}

function evolutionCardTemplate(evolutionData) {
    return `<div onclick="renderDetailCard(${evolutionData.id},toggleOverlay = false)" class="evolution-view-pokemon c-${evolutionData.types[0]}">
        <div class="mini-card-view" id="pokemon${evolutionData.id}">
            <div class="pokemon-id"> # ${evolutionData.id}</div>
            <div class="mini-pokemon-img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionData.id}.png"
                    alt="">
            </div>
            <h5 class="pokemon-name">${evolutionData.name}</h5>
        </div>
    </div>`
}

function evolutionCardTemplateActiv(evolutionData) {
    return `<div class="evolution-view-pokemon-aktiv c-${evolutionData.types[0]}">
        <div class="mini-card-view" id="pokemon${evolutionData.id}">
            <div class="pokemon-id"> # ${evolutionData.id}</div>
            <div class="mini-pokemon-img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionData.id}.png"
                    alt="">
            </div>
            <h5 class="pokemon-name">${evolutionData.name}</h5>
        </div>
    </div>`
}

function getTemplateEvo(idOfnextEvoPokemon) {
    return `<img src=""https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idOfnextEvoPokemon}.png"," alt="" srcset="">`
}

function renderItemTemplate(item, mode) {
    return `
    <div onclick="renderDetailCard(${item.id})" class="result-item">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png" alt="${item.name}">
      <span>ID:  ${item.id}</span>
      <span>Name: ${item.name}</span>
    </div>
  `;
}
