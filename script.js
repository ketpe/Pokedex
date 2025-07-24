const MAIN_PATH_API = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECI_URL = "https://pokeapi.co/api/v2/pokemon-species/"
const API_LOAD_LIMITER = "?limit=100000&offset=0";
let pokemon_List = "";
let test1 = "?limit=100000&offset=21"
let firstload = true;
let displayedPokemon = 20;

function init() {
    loadPokemonListFromServer();
}

async function loadPokemonListFromServer() {
    let response = await fetch(MAIN_PATH_API + API_LOAD_LIMITER);
    let responseToJson = await response.json();
    pokemon_List = responseToJson.results;
    localStorage.setItem('pokemon_List', JSON.stringify(pokemon_List));
    renderFirstTwentyPokemon();
}

async function renderFirstTwentyPokemon() {
    toggleloadingSpinner()
    const refContent = document.getElementById('pokemonCards');
    refContent.innerHTML = "";
    let pokemonDataSearchList = [];
    for (let i = 0; i < 20; i++) {
        await prepartionAndRenderingCards(i, refContent, pokemonDataSearchList,)
    }
    localStorage.setItem('pokemonDataSearchList', JSON.stringify(pokemonDataSearchList));
    refContent.innerHTML += getTempEmptyCard();
    toggleloadingSpinner()
}

async function loadMorePokemon() {
    toggleloadingSpinner()
    const refContent = document.getElementById('pokemonCards');
    let loadMorePokemon = document.getElementById('load_More_Pokemon');
    loadMorePokemon.remove();
    let pokemonDataSearchList = JSON.parse(localStorage.getItem("pokemonDataSearchList"));
    for (let i = displayedPokemon; i < displayedPokemon + 20; i++) {
        await prepartionAndRenderingCards(i, refContent, pokemonDataSearchList,)
    }
    localStorage.setItem('pokemonDataSearchList', JSON.stringify(pokemonDataSearchList));
    displayedPokemon += 20;
    refContent.innerHTML += getTempEmptyCard();
    toggleloadingSpinner();
}

async function prepartionAndRenderingCards(i, refContent, pokemonDataSearchList,) {
    let response = await fetch(pokemon_List[i].url);
    responsePokemon = await response.json();
    pokemonData = await getGermanPokemon(responsePokemon);
    pokemonDataSearchList.push(pokemonData);
    refContent.innerHTML += getPokemonCardTemplate(responsePokemon, pokemonData);
}

async function renderDetailCard(pokemon, toggleOverlay = true) {
    let contentRef = toggleClassListsByChangeView(toggleOverlay);
    contentRef.innerHTML = "";
    let response = await fetch(pokemon_List[pokemon - 1].url);
    responsePokemon = await response.json();
    evolutionData = await getEvolutionChain(pokemon);
    pokemonData = await getGermanPokemon(responsePokemon);
    contentRef.innerHTML += getDetailViewPokemonCard(responsePokemon, pokemonData, evolutionData);
    deactivateBtnPreviousPokemonOnOne(responsePokemon.id);
    initTabSwitching();
}

function toggleClassListsByChangeView(toggleOverlay) {
    let contentRef = document.getElementById("pokemonDetailOverlay");
    if (toggleOverlay) {
        document.body.classList.toggle('overflow-hide');
        contentRef.classList.toggle('d-none');
        contentRef.classList.toggle('d-flex');
    }
    return contentRef;
}

function stopEventBubbeling(event) {
    event.stopPropagation();
}

function closeDetailOverlay() {
    let overlay = toggleClassListsByChangeView(true);
    overlay.innerHTML = "";
}

function initTabSwitching() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}

function deactivateBtnPreviousPokemonOnOne(pokemonid) {
    if (pokemonid < 2) {
        document.getElementById("prevPokemon").disabled = true;
        document.getElementById("prevPokemon").classList.add('disable-arrow');
    } else if (pokemonid > 2) {
        document.getElementById("prevPokemon").disabled = false;
        document.getElementById("prevPokemon").classList.remove('disable-arrow');

    }
}

function getNextPokemon(pokemon) {
    renderDetailCard(pokemon + 1, false)
}

function getPrevPokemon(pokemon) {
    renderDetailCard(pokemon - 1, false)
}

async function getEvolutionChain(pokemon) {
    let specialPokemonUrl = await fetch(POKEMON_SPECI_URL + pokemon + '/')
    specialPokemonUrl = await specialPokemonUrl.json();
    let evoChainUrl = await fetch(specialPokemonUrl.evolution_chain.url);
    let evoChain = await evoChainUrl.json();
    let evolutionList = getAllSpecies(evoChain.chain);
    let evolutionPokemon = [];
    evolutionList = getIdOfEvolutionPok(evolutionList, evolutionPokemon);
    let evoPokemonArray = await getEvolutionPokemonData(evolutionPokemon);
    let evolutionData = getEvolutionList(evoPokemonArray)
    return evolutionData
}

function getIdOfEvolutionPok(evolutionList, evolutionPokemon) {
    for (let i = 0; i < evolutionList.length; i++) {
        evolutionPokemon.push(getIdFromUrl(evolutionList[i].url))
    }
    return evolutionPokemon;
}

function getIdFromUrl(url) {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : null;
}

async function getEvolutionPokemonData(evolutionList) {
    let pokemon_List = JSON.parse(localStorage.getItem('pokemon_List'));
    let evolutionPokemon = [];
    for (let i = 0; i < evolutionList.length; i++) {
        let response = await fetch(pokemon_List[evolutionList[i] - 1].url);
        evolutionPokemon.push(await response.json());
    }
    return evolutionPokemon;
}

function getAllSpecies(chain) {
    let speciesList = [];
    if (chain.species) {
        speciesList.push(chain.species);
    }
    if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(evo => {
            speciesList = speciesList.concat(getAllSpecies(evo));
        });
    }
    return speciesList;
}

async function getEvolutionList(evoPokemonArray) {
    let evolutionData = []
    for (let i = 0; i < evoPokemonArray.length; i++) {
        evolutionData.push(await getGermanPokemon(evoPokemonArray[i]));
    }
    return evolutionData
}

function getEvolutionTemplate(pokemonData, evolutionData) {
    let result = "";
    for (let i = 0; i < evolutionData.length; i++) {
        if (pokemonData.id === evolutionData[i].id) {
            singleResult = evolutionCardTemplateActiv(evolutionData[i])
        } else {
            singleResult = evolutionCardTemplate(evolutionData[i])
        }
        result += singleResult
    }
    return result
}

function toggleloadingSpinner() {
    document.getElementById("loadingSpinnerOverlay").classList.toggle('d-none');
    document.body.classList.toggle('overflow-hide');
}

