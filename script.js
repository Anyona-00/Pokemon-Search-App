const pokemonDataUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const fetchMainData = async () => {
  try {
    const responseMain = await fetch(pokemonDataUrl);
    const mainData = await responseMain.json();
    handleSearch(mainData);
  } catch (error) {
    console.error(error);
  }
};

const handleSearch = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  /*Constructs a new URL by appending the searchTerm to the pokemonDataUrl. */
  const specificDataUrl = `${pokemonDataUrl}/${searchTerm}`;
  fetchSpecificData(specificDataUrl);
};

const fetchSpecificData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const pokemonDetails = await response.json();
    displayPokemon(pokemonDetails);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const displayPokemon = (pokemonDetails) => {
  pokemonName.textContent = pokemonDetails.name.toUpperCase();
  pokemonId.textContent = `#${pokemonDetails.id}`;
  weight.textContent = pokemonDetails.weight;
  height.textContent = pokemonDetails.height;

  pokemonDetails.stats.forEach((stat) => {
    const statName = stat.stat.name;
    const baseStat = stat.base_stat;

    switch (statName) {
      case "hp":
        hp.textContent = baseStat;
        break;
      case "attack":
        attack.textContent = baseStat;
        break;
      case "defense":
        defense.textContent = baseStat;
        break;
      case "special-attack":
        specialAttack.textContent = baseStat;
        break;
      case "special-defense":
        specialDefense.textContent = baseStat;
        break;
      case "speed":
        speed.textContent = baseStat;
        break;
    }
  });
  const spriteContainer = document.querySelector(".size");
  const existingSprite = document.getElementById("sprite");
  if (existingSprite) {
    existingSprite.remove();
  }
  const spriteImg = document.createElement("img");
  spriteImg.id = "sprite";
  spriteImg.src = pokemonDetails.sprites.front_default;
  spriteContainer.appendChild(spriteImg);

  types.innerHTML = "";
  pokemonDetails.types.forEach((typeObj) => {
    const typeElem = document.createElement("span");
    typeElem.textContent = typeObj.type.name.toUpperCase();
    types.appendChild(typeElem);
  });
};

searchButton.addEventListener("click", handleSearch);
fetchMainData();
