//Selecciono el nodo ol donde van a desplegarse todos los Pokemon

const ol$$ = document.getElementById("pokedex");
//console.log(ol$$);

// Creo el array donde voy a guardar la información de los pokemon

const arrayPokemons = [];
// let numPokemon;

const get = async (numPokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numPokemon}`);
    //console.log(response);
    const resp = await response.json();
    //console.log(resp)
    return resp;
};

const mappedPokemons = (pokemons) => {
    return pokemons.map((pokemon) => ({
        nombre: pokemon.name,
        imagen: pokemon.sprites.front_default,
        type: pokemon.types.map((type) => type.type.name),
        id: pokemon.id,

    }))
}

const drawCards = (pokemons) => {
    ol$$.innerHTML = "";

    for (let pokemon of pokemons) {
        //Primero creo cada Card.
        const liCard$$ = document.createElement("li");
        ol$$.appendChild(liCard$$);
        liCard$$.className = "card";
        //liCard$$.style.backgroundImage = 'url("pokemon.imagen")';

        //Añado color de fondo en función del tipo principal
        for (let tipo of pokemon.type) {
            if (pokemon.type[0] === "grass") {
                liCard$$.style.backgroundColor = "green";
            }
            if (pokemon.type[0] === "fire") {
                liCard$$.style.backgroundColor = "rgb(245,99,25)";
            }
            if (pokemon.type[0] === "water") {
                liCard$$.style.backgroundColor = "#81b0e2";
            }
            if (pokemon.type[0] === "bug") {
                liCard$$.style.backgroundColor = "rgb(125,179,16)";
            }
            if (pokemon.type[0] === "poison") {
                liCard$$.style.backgroundColor = "rgba(0,252,172,0.75)";
            }
            if (pokemon.type[0] === "electric") {
                liCard$$.style.backgroundColor = "yellow";
            }
            if (pokemon.type[0] === "ground") {
                liCard$$.style.backgroundColor = "rgba(100,36,36,0.65)";
            }
            if (pokemon.type[0] === "fairy") {
                liCard$$.style.backgroundColor = "rgb(243,194,194)";
            }
            if (pokemon.type[0] === "fighting") {
                liCard$$.style.backgroundColor = "rgba(255,0,0,0.5)";
            }
            if (pokemon.type[0] === "psychic") {
                liCard$$.style.backgroundColor = "rgb(254,59,254)";
            }
            if (pokemon.type[0] === "rock") {
                liCard$$.style.backgroundColor = "rgb(99,99,99)";
            }
            if (pokemon.type[0] === "ghost") {
                liCard$$.style.backgroundColor = "rgba(255,255,255,0.75)";
            }
            if (pokemon.type[0] === "ice") {
                liCard$$.style.backgroundColor = "rgb(179,240,251)";
            }
            if (pokemon.type[0] === "dragon") {
                liCard$$.style.backgroundColor = "rgb(255,183,0)";
            }
            if (pokemon.type[0] === "normal") {
                liCard$$.style.backgroundColor = "black";
            }
        }

        //A continuación el Id
        const h2Id$$ = document.createElement("h2");
        h2Id$$.textContent = pokemon.id;
        liCard$$.appendChild(h2Id$$);
        h2Id$$.className = "card-id";


        //A continuación, la imagen
        const img$$ = document.createElement("img");
        img$$.setAttribute("src", pokemon.imagen);
        liCard$$.appendChild(img$$);
        img$$.className = "card-img";

        //Lo siguiente, el nombre
        const h2Name$$ = document.createElement("h2");
        h2Name$$.textContent = pokemon.nombre;
        liCard$$.appendChild(h2Name$$);
        h2Name$$.className = "card-name";

        //Por fin, creamos una ul en la que desplegaremos los tipos
        const ulTipo$$ = document.createElement("ul");
        ulTipo$$.className = "ul_card-tipo";
        ulTipo$$.textContent = pokemon.type[0];
        liCard$$.appendChild(ulTipo$$);
        //console.log(pokemon.type[0]);

        /*for (let tipo of pokemon.type) {
            const liTipo$$ = document.createElement("li");
            console.log(tipo)
            liTipo$$.textContent = pokemon.type[0];
            ulTipo$$.appendChild(liTipo$$);
            liTipo$$.className = "li_card-tipo";
        }*/
    }

}

const takeInputName = (pokemons) => {
    //console.log(pokemons);
    const inputName$$ = document.getElementById("inputName");
    //console.log(inputName$$);
    inputName$$.addEventListener("input", () =>
        searchPokemonName(pokemons, inputName$$.value)
    );
    //console.log(inputName$$.value);
};

const searchPokemonName = (arrPokemons, filtro) => {

    //console.log(arrPokemons);
    //console.log(filtro);

    let pokemonsFiltrados = arrPokemons.filter((pokemon) =>
        pokemon.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    drawCards(pokemonsFiltrados);
}

const takeInputType = (pokemons) => {
    //console.log(pokemons);
    const inputType$$ = document.getElementById("inputType");
    //console.log(inputType$$);
    inputType$$.addEventListener("input", () =>
        searchPokemonType(pokemons, inputType$$.value)
    );
    //console.log(inputType$$.value);
};

const searchPokemonType = (arrPokemons, filtro) => {

    // console.log(arrPokemons);
    // console.log(filtro);

    let pokemonsFiltrados = arrPokemons.filter((pokemon) =>
        pokemon.type[0].toLowerCase().includes(filtro.toLowerCase())
    );

    drawCards(pokemonsFiltrados);
}



const inicio = async () => {

    // let pokSelect = await get(1);
    // console.log(pokSelect);

    //Incluyo los Pokemon en el array
    for (let i = 1; i <= 150; i++) {

        let pokSelect = await get([i]);
        arrayPokemons.push(pokSelect);
        //console.log(arrayPokemons);
    }

    //Envío el array para su mapeo. La función map, nos devolverá otro array de objetos
    const pokemonsMapeados = mappedPokemons(arrayPokemons);
    //console.log(pokemonsMapeados);


    //Ahora pintaré las Cards
    drawCards(pokemonsMapeados);

    //Al final, ejecutamos las funciones de búsqueda
    takeInputName(pokemonsMapeados);
    takeInputType(pokemonsMapeados);

}
inicio()