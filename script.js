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
const totalStats = document.getElementById("total-stats");
const sprite = document.getElementById("sprite");

// Get stat bar elements
const hpBar = document.getElementById("hp-bar");
const attackBar = document.getElementById("attack-bar");
const defenseBar = document.getElementById("defense-bar");
const specialAttackBar = document.getElementById("special-attack-bar");
const specialDefenseBar = document.getElementById("special-defense-bar");
const speedBar = document.getElementById("speed-bar");

// Type colors map
const typeColors = {
  normal: "var(--type-normal)",
  fire: "var(--type-fire)",
  water: "var(--type-water)",
  grass: "var(--type-grass)",
  electric: "var(--type-electric)",
  ice: "var(--type-ice)",
  fighting: "var(--type-fighting)",
  poison: "var(--type-poison)",
  ground: "var(--type-ground)",
  flying: "var(--type-flying)",
  psychic: "var(--type-psychic)",
  bug: "var(--type-bug)",
  rock: "var(--type-rock)",
  ghost: "var(--type-ghost)",
  dragon: "var(--type-dragon)",
  dark: "var(--type-dark)",
  steel: "var(--type-steel)",
  fairy: "var(--type-fairy)",
};

const maxStatValue = 255; // Maximum possible stat value

const handleSearch = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    alert("Please enter a Pokémon name or ID!");
    return;
  }
  const specificDataUrl = `${pokemonDataUrl}/${searchTerm}`;
  fetchSpecificData(specificDataUrl);
};

const fetchSpecificData = async (url) => {
  try {
    document.querySelector(".pokedex-container").classList.add("loading");

    // Remove empty state styling
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("empty-state");
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "Pokémon not found! Check the spelling or try a different Pokémon."
      );
    }
    const pokemonDetails = await response.json();
    displayPokemon(pokemonDetails);
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    document.querySelector(".pokedex-container").classList.remove("loading");
  }
};

const displayPokemon = (pokemonDetails) => {
  // Update name and ID
  pokemonName.textContent = pokemonDetails.name.toUpperCase();
  pokemonId.textContent = `#${pokemonDetails.id.toString().padStart(3, "0")}`;

  // Update physical attributes
  weight.textContent = (pokemonDetails.weight / 10).toFixed(1);
  height.textContent = (pokemonDetails.height / 10).toFixed(1);

  // Update sprite
  sprite.src = pokemonDetails.sprites.front_default;
  sprite.alt = pokemonDetails.name;

  // Reset total stats
  let total = 0;

  // Update stats and stat bars
  pokemonDetails.stats.forEach((stat) => {
    const statName = stat.stat.name;
    const baseStat = stat.base_stat;
    total += baseStat;

    // Calculate percentage for stat bars, cap at 100%
    const percentage = Math.min((baseStat / maxStatValue) * 100, 100).toFixed(
      0
    );

    switch (statName) {
      case "hp":
        hp.textContent = baseStat;
        hpBar.style.width = `${percentage}%`;
        break;
      case "attack":
        attack.textContent = baseStat;
        attackBar.style.width = `${percentage}%`;
        break;
      case "defense":
        defense.textContent = baseStat;
        defenseBar.style.width = `${percentage}%`;
        break;
      case "special-attack":
        specialAttack.textContent = baseStat;
        specialAttackBar.style.width = `${percentage}%`;
        break;
      case "special-defense":
        specialDefense.textContent = baseStat;
        specialDefenseBar.style.width = `${percentage}%`;
        break;
      case "speed":
        speed.textContent = baseStat;
        speedBar.style.width = `${percentage}%`;
        break;
    }
  });

  // Update total stats
  totalStats.textContent = total;

  // Update types
  types.innerHTML = "";
  pokemonDetails.types.forEach((typeObj) => {
    const typeElem = document.createElement("span");
    const typeName = typeObj.type.name;
    typeElem.textContent = typeName.toUpperCase();
    typeElem.style.backgroundColor = typeColors[typeName] || "#999";
    types.appendChild(typeElem);
  });
};

// Event Listeners
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// Initialize with empty state
const initializeEmptyState = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("empty-state");
  });

  pokemonName.textContent = "POKÉMON";
  pokemonId.textContent = "#000";
  weight.textContent = "?";
  height.textContent = "?";
  sprite.src = "/api/placeholder/200/200";
  sprite.alt = "Pokemon placeholder";
  hp.textContent = "0";
  attack.textContent = "0";
  defense.textContent = "0";
  specialAttack.textContent = "0";
  specialDefense.textContent = "0";
  speed.textContent = "0";
  totalStats.textContent = "0";
  hpBar.style.width = "0%";
  attackBar.style.width = "0%";
  defenseBar.style.width = "0%";
  specialAttackBar.style.width = "0%";
  specialDefenseBar.style.width = "0%";
  speedBar.style.width = "0%";
  types.innerHTML = "";
};

// Initialize the app
initializeEmptyState();
