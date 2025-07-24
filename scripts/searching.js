
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('searchResults');
const clearBtn = document.getElementById('clearSearch');
const overlay = document.getElementById('searchOverlay');


input.addEventListener('input', () => {
    const datalist = JSON.parse(localStorage.getItem("pokemonDataSearchList"));
    onSearchInput(datalist, input, resultsDiv, overlay);

});

function onSearchInput(data, input, container, overlay) {
    const mode = getSearchMode();
    const query = input.value.trim();

    const results = filterData(data, mode, query);
    if (results.length === 0) {
        hideResults(container);
    } else {
        renderResults(results, container, mode, overlay);
    }
}

function getSearchMode() {
    const selected = document.querySelector('input[name="searchMode"]:checked');
    return selected ? selected.value : 'name';
}

function filterData(data, mode, query) {
    if (!query) return [];
    query = query.toLowerCase();
    if (mode === 'name' && query.length < 3) return [];

    return data.filter(item => {
        if (mode === 'name')
            return item.name.toLowerCase().includes(query);
        else
            return String(item.id).includes(query);
    });
}

function renderResults(results, container, mode,) {
    clearBtn.style.display = 'inherit';
    overlay.style.display = 'inherit';
    if (results.length === 0) {
        container.innerHTML = '<div>Keine Treffer</div>';
    } else {
        container.innerHTML = results.map(item => renderItemTemplate(item, mode)).join('');
    }
    container.style.display = 'block';
    document.body.classList.toggle('overflow-hide');
}

function hideResults(container) {
    container.style.display = 'none';
    container.innerHTML = '';
    clearBtn.style.display = 'none';
    overlay.style.display = 'none';
    document.body.classList.toggle('overflow-hide');
}

function clearSearch() {
    input.value = '';
    clearBtn.style.display = 'none';
    overlay.style.display = 'none';
    hideResults(resultsDiv);
    input.focus();
}