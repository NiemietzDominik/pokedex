let colors = {
    'normal': 'lightgrey',
    'fighting': 'lightbrown',
    'flying': 'lightblue',
    'poison': 'blueviolet',
    'ground': 'brown',
    'rock': 'grey',
    'bug': 'lightgreen',
    'ghost': 'white',
    'steel': 'darkgrey',
    'fire': 'red',
    'water': 'blue',
    'grass': 'green',
    'electric': 'yellow',
    'psychic': '#430030',
    'ice': 'lightblue',
    'dragon': 'lightred',
    'dark': 'lightblack',
    'fairy': 'daryellow',
    'unknown': 'lila',
    'shadow': 'lightblack'
}

let pagination;
let PokemonSprites;
let allPokemon = [];
let pokemonArray = [];
let pokemonSpecies = [];
let pokeData = [];
let pokeData2 = [];
let loadContent = 0;
let limit = 20;
let offset = 0;
let start = 0;



async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let pagination = await response.json();
    pokemonArray.push(pagination);
    console.log(pokemonArray);
    renderPokemonInfo(pagination);
    loadAllPokeDataForSearchbar(pagination);
};

async function renderPokemonInfo(pagination) {

    for (let loadcontent = 1; loadcontent < limit + 1; loadcontent++) {
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${loadcontent}/`;
        let response2 = await fetch(url2);
        let pokemon2 = await response2.json();
        pokemonSpecies.push(pokemon2);
    }
    console.log(pokemonSpecies);


    for (let i = start; i < limit; i++) {

        let url = pagination["results"][i]["url"];
        let response = await fetch(url);
        let pokemon = await response.json();
        allPokemon.push(pokemon);
        

        let type = pokemon["types"];

        document.getElementById('pokedex').innerHTML +=
            `
            <div id="close${i}" class="d-none"><button class="closeBtn" onClick="closePokedex(${i})">close</button></div>
            
            <div id="pokedexSmall${i}" onclick="openPokedex(${pokemon, i})" class="pokedexSmall">
        
                <div id="pokeId" class="pokeId">Nr. ${pokemon["id"]}</div>

                <div id="pagination${i}" class="pagination">
                ${pagination[`results`][i]["name"]}

                <div id="typContainer${i}" class="typeContainer"></div>
               
                </div>
                    <div class"pokeSprite"><img id="pokeImg${i}" class="imgSize" src="${pokemon["sprites"]["other"]["dream_world"]["front_default"]}">
                    </div>
                </div>
            </div>
            `
        for (let j = 0; j < type.length; j++) {
            document.getElementById(`typContainer${i}`).innerHTML += `<span class="type">${pokemon["types"][j]["type"]["name"]}</span>`
        }
        checkForPokeType(i);
    }console.log(allPokemon);
}

window.onscroll = function (){
    if(window.scrollY + window.innerHeight >= document.body.clientHeight){
        loadContent += 20;
        start += 20;
        limit += 20;
        offset += 20;

        console.log(loadContent);
        console.log(start);
        console.log(limit);
        console.log(offset);
        loadPokemon();
    }
}

async function loadAllPokeDataForSearchbar(pagination) {
    loadInfoSource1(pagination);
    loadInfoSource2(pagination);
};

async function loadInfoSource1() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`;
    let response = await fetch(url);
    let pagination = await response.json();
    for (let i = 0; i < pagination["results"].length; i++) {
        let url = pagination["results"][i]["url"];
        let response = await fetch(url);
        let pokemon = await response.json();
        pokeData.push(pokemon);
    }
}
async function loadInfoSource2(pagination) {
    for (let j = 1; j < pagination["results"].length + 1; j++) {
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${j}/`;
        let response2 = await fetch(url2);
        let pokemon2 = await response2.json();
        pokeData2.push(pokemon2);
    }
};

function checkForPokeType(i) {
    let poketype = `${pokemonSpecies[i]['color']['name']}`;
    document.getElementById(`pokedexSmall${i}`).style.backgroundColor = poketype;
}

function openPokedex(i) {
    removeCssList();
    loadHeaderInfo(i);
    loadAboutContainer(i);
    addOpenPokedexStyle(i);

}

function addOpenPokedexStyle(i) {

    document.getElementById(`pokeImg${i}`).src = pokeData[i]["sprites"]["other"]["official-artwork"]["front_default"];

    document.getElementById(`openPokedexData`).classList.add(`openPokedexData`);
    document.getElementById(`openPokedexData`).classList.remove(`d-none`);

    document.getElementById(`close${i}`).classList.add(`close`);
    document.getElementById(`close${i}`).classList.remove(`d-none`);

    document.getElementById(`pokedexSmall${i}`).classList.add(`openPokedex`);
    document.getElementById(`pokedexSmall${i}`).classList.remove(`pokedexSmall`);

    document.getElementById(`pagination${i}`).classList.remove(`pagination`);
    document.getElementById(`pagination${i}`).classList.add(`paginationOpenPokedex`);

    document.getElementById(`pokeImg${i}`).classList.remove(`imgSize`);
    document.getElementById(`pokeImg${i}`).classList.add(`imgSizeOpenPokedex`);

    document.getElementById(`greyBackground`).className += ` higherIndex`;
    document.getElementById(`background`).className += ` brightness`;

}

function closePokedex(i) {
    document.getElementById(`headerInfoId`).innerHTML = ``;

    document.getElementById(`openPokedexData`).classList.remove(`openPokedexData`);
    document.getElementById(`openPokedexData`).classList.add(`d-none`);

    document.getElementById(`close${i}`).classList.remove(`close`);
    document.getElementById(`close${i}`).classList.add(`d-none`);

    document.getElementById(`pokedexSmall${i}`).classList.remove(`openPokedex`);
    document.getElementById(`pokedexSmall${i}`).classList.add(`pokedexSmall`);

    document.getElementById(`pagination${i}`).classList.add(`pagination`);
    document.getElementById(`pagination${i}`).classList.remove(`paginationOpenPokedex`);

    document.getElementById(`pokeImg${i}`).classList.add(`imgSize`);
    document.getElementById(`pokeImg${i}`).classList.remove(`imgSizeOpenPokedex`);

    document.getElementById(`greyBackground`).classList.remove(`higherIndex`);
    document.getElementById(`background`).classList.remove(`brightness`);

}

function searchPokemon() {
    let search = document.getElementById(`search`).value;
    search = search.toLowerCase();

    let list = document.getElementById(`list`);
    list.innerHTML = ``;

    for (let i = 0; i < pokeData.length; i++) {
        let searchedPokemon = pokeData[i]["name"];

        if (searchedPokemon.toString().toLowerCase().includes(search)) {

            list.innerHTML += `<li onclick="openPokedex(${i})" class="list" id="list">
        <div class="listDiv">
        <img  class="miniImg" src=${pokeData[i]["sprites"]["other"]["official-artwork"]["front_default"]}>
         ${searchedPokemon}
         </div>
        </li>`
        }

        if (search == 0) {
            list.innerHTML = ``;
        }
    }
}

function addCssList() {
    document.getElementById(`list`).classList.add(`list`);
    document.getElementById(`list`).classList.remove(`d-none`);
}

function removeCssList() {
    document.getElementById(`list`).classList.remove(`list`);
    document.getElementById(`list`).classList.add(`d-none`);
}

function loadHeaderInfo(i) {
    document.getElementById(`headerInfoId`).innerHTML = `
    <div><button onclick="loadAboutContainer(${i})" class="headerInfo">About</button></div>
    <div><button onclick="loadBaseStatsContainer(${i})" class="headerInfo">Base Stats</button></div>
    <div><button onclick="loadMovesContainer(${i})" class="headerInfo">Moves</button></div>
    `;
}

function loadAboutContainer(i) {
    let height = pokeData[i]["height"];
    let weight = pokeData[i]["weight"];
    let ability = pokeData[i]["abilities"];
    let growth_rate = pokeData2[i]["growth_rate"]["name"];
    let base_happiness = pokeData2[i]["base_happiness"];
    let capture_rate = pokeData2[i]["capture_rate"];
    let aboutText = pokeData2[i]["flavor_text_entries"][10]["flavor_text"];

    loadStatsVariable(height, weight, growth_rate, base_happiness, capture_rate, aboutText);
    loadAbilityStats(ability, i);
}

function loadStatsVariable(height, weight, growth_rate, base_happiness, capture_rate, aboutText) {
    document.getElementById('infoContainer').innerHTML = `
    <div class="aboutContainer">

    <div class="aboutContainer">
    <div class="aboutHeader"><b>ABOUT:</b></div>
    <div class="aboutText">${aboutText}</div>
    </div>

    <div class="underHalfAboutContainer">
        <div class="generelInfoContainer">
            <div class="generelInfo">Height</div>
            <div class="generelInfo">Weight</div>
            <div class="generelInfo">Abilities</div>
            <div class="generelInfo">Growth Rate</div>
            <div class="generelInfo">Base Happiness</div>
            <div class="generelInfo">Capture Rate</div>
            
        </div>
        <div class="specificInfoContainer">
            <div class="specificInfo">${height} decimeter</div>
            <div class="specificInfo">${weight} lb</div>
            <div id="ability" class="specificInfo"></div>
            <div class="specificInfo">${growth_rate}</div>
            <div class="specificInfo">${base_happiness}</div>
            <div class="specificInfo">${capture_rate}</div>
        </div>
    </div>
</div>`;
}

function loadAbilityStats(ability) {
    for (let i = 0; i < ability.length; i++) {
        document.getElementById('ability').innerHTML += `${ability[i]["ability"]["name"]}`;
    }
}

function loadBaseStatsContainer(i) {

    let hp = allPokemon[i]["stats"][0]["base_stat"];
    let attack = allPokemon[i]["stats"][1]["base_stat"];
    let defense = allPokemon[i]["stats"][2]["base_stat"];
    let specialAttack = allPokemon[i]["stats"][3]["base_stat"];
    let specialDefense = allPokemon[i]["stats"][4]["base_stat"];
    let speed = allPokemon[i]["stats"][5]["base_stat"];


    document.getElementById('infoContainer').innerHTML = `
    <div class="baseStatsContainer">

    <div class="baseStats">
    <span class="stats">
    <div class="statsName">hp</div> ${hp}</span>
    <div class="baseStatsBarCover">
    <div id="statsBarHp"></div>
    </div>
    
    </div>
    <div class="baseStats">
    <span class="stats">
    <div class="statsName">attack</div> ${attack}</span>
    <div class="baseStatsBarCover">
    <div id="statsBarAttack"></div>
    </div>
    
    </div>
    <div class="baseStats">
    <span class="stats">
    <div class="statsName">defense</div> ${defense}</span>
    <div class="baseStatsBarCover">
    <div id="statsBarDefense"></div>
    </div>
    
    </div>
    <div class="baseStats">
    <span class="stats">
    <div class="statsName">special-attack</div> ${specialAttack}</span>
    <div class="baseStatsBarCover">
    <div id="statsBarSpecialAttack"></div>
    </div>
    
    </div>

    <div class="baseStats">
    <span class="stats">
    <div class="statsName">special-defense</div> ${specialDefense}</span>
    <div class="baseStatsBarCover">
    <div id="statsBarSpecialDefense"></div>
    </div>
    
    </div>
    <div class="baseStats">
    <span class="stats">
    <div class="statsName">speed</div> ${speed}</span>
    <div class="baseStatsBarCover">
    <div id="statsBarSpeed"></div>
    </div>
    
    </div>    
    </div>
    `
    loadStatsBar(hp, attack, defense, specialAttack, specialDefense, speed);
}

function loadStatsBar(hp, attack, defense, specialAttack, specialDefense, speed) {
    if (hp > 100) {
        hp = 100;
    }
    if (attack > 100) {
        attack = 100;
    }
    if (defense > 100) {
        defense = 100;
    }
    if (specialAttack > 100) {
        specialAttack = 100;
    }
    if (specialDefense > 100) {
        specialDefense = 100;
    }
    if (speed > 100) {
        speed = 100;
    }
    document.getElementById('statsBarHp').style.width = `${hp}%`;
    document.getElementById('statsBarAttack').style.width = `${attack}%`;
    document.getElementById('statsBarDefense').style.width = `${defense}%`;
    document.getElementById('statsBarSpecialAttack').style.width = `${specialAttack}%`;
    document.getElementById('statsBarSpecialDefense').style.width = `${specialDefense}%`;
    document.getElementById('statsBarSpeed').style.width = `${speed}%`;
}

function loadMovesContainer(i) {
    let moves = allPokemon[i]["moves"];

    document.getElementById('infoContainer').innerHTML = `
    <div id="moves" class="movesContainer">
    </div>
    `
    for (let i = 0; i < moves.length; i++) {
        document.getElementById('moves').innerHTML += `
        <div class="move">${moves[i]["move"]["name"]}</div>
        `
    };
}



