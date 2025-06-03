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
    // test();
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
        // console.log(responsePokemon);
        refContent.innerHTML += getPokemonCardTemplate(responsePokemon, pokemonData);
    }
    refContent.innerHTML += getTempEmptyCard();
}

async function loadMorePokemon() {
    const refContent = document.getElementById('pokemonCards');
    let loadMorePokemon = document.getElementById('load_More_Pokemon');
    loadMorePokemon.remove();
    for (let i = displayedPokemon; i < displayedPokemon + 20; i++) {
        let response = await fetch(pokemon_List[i].url);
        responsePokemon = await response.json();
        await getGermanPokemon(responsePokemon);
        console.log(responsePokemon);
        console.log(pokemonData);

        refContent.innerHTML += getPokemonCardTemplate(responsePokemon, pokemonData);
    }
    displayedPokemon += 20;
    refContent.innerHTML += getTempEmptyCard();
}
async function renderdetailCard(pokemon, loadNew = true) {
    let contentRef = toggleClassListsByChangeView(loadNew);
    contentRef.innerHTML = "";
    let response = await fetch(pokemon_List[pokemon - 1].url);
    responsePokemon = await response.json();
    await getGermanPokemon(responsePokemon)
    contentRef.innerHTML += getDetailViewPokemonCard(responsePokemon, pokemonData);
    deactivateBtnPreviousPokemonOnOne(responsePokemon.id);
    initTabSwitching();
}

function toggleClassListsByChangeView(loadNew) {
    let contentRef = document.getElementById("pokemonDetailOverlay");
    if (loadNew) {
        document.body.classList.toggle('overflow-x-hide');
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
    renderdetailCard(pokemon + 1, false)
}
function getPrevPokemon(pokemon) {
    renderdetailCard(pokemon - 1, false)
}