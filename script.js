document.getElementById('searchBtn').addEventListener('click', function(event) {
    let searchInput = document.getElementById('search').value;
    if (searchInput.trim() === "") {
        event.preventDefault();
        alert("Please enter a Pokémon name or ID to search for.");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById('pokemonImg').src = data.sprites.front_default;
        document.getElementById('pokemonName').innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById('pokemonId').innerHTML = 'Dex #: ' + data.id;
        document.getElementById('pokemonType').innerHTML = 'Type: ' + data.types[0].type.name;
        if (data.types[1]) {
            document.getElementById('pokemonType2').innerHTML = 'Type: ' + data.types[1].type.name;
        } else {
            document.getElementById('pokemonType2').innerHTML = '';
        }
        document.getElementById('pokemonHeight').innerHTML = 'Height: ' + data.height;
        document.getElementById('pokemonWeight').innerHTML = 'Weight: ' + data.weight;
        let abilities = [];
        for (let i = 0; i < data.abilities.length; i++) {
            let abilityName = data.abilities[i].ability.name.replace(/-/g, ' ');
            abilities.push(abilityName);
        }
        abilities = abilities.join(', ');
        document.getElementById('pokemonAbilities').innerHTML = 'Abilities: ' + abilities;
    })
    .catch(error => {
        console.error(error);
        alert('Pokémon not found. Please try again.');
    });
});

document.getElementById('search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});