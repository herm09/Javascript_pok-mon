fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const ul = document.querySelector('#produits');
        data.results.forEach((pokemon) => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((pokemonData) => {
                    const li = document.createElement('li');
                    const h3 = document.createElement('h3');
                    const img = document.createElement('img');
                    const p = document.createElement('p');
                    const button = document.createElement('button');
                    const a = document.createElement('a');
                    a.classList.add('btn-infos');
                    button.textContent = 'Buy';
                    p.classList.add('price');
                    button.classList.add('buy-btn');
                    a.href = '#'; // Set the link to '#'
                    a.textContent = pokemonData.name; // Set the link text to the Pokemon's name

                    a.onclick = function(event) {
                        event.preventDefault();
                        const pokemonName = pokemonData.name;
                        window.location.href = 'produit.html?name=' + pokemonName;
                    };

                    button.onclick = function(event) {
                        event.preventDefault();
                        window.location.href = 'panier.html';
                        // Add the new Pokemon to the cart
                        cart.push(pokemonData);
                    
                        // Save the updated cart back to localStorage
                        localStorage.setItem('cart', JSON.stringify(cart));
                    };

                    h3.appendChild(a); // Add the link to the h3 element
                    img.src = pokemonData.sprites.front_default;
                    img.style.width = '150px'; // Set the image width
                    img.style.height = '150px'; // Set the image height
                    p.textContent = 'Price: ₽' + Math.floor(Math.random() * 100); // Set a random price between $0 and $100
                    li.appendChild(h3); // Add the Pokemon's name to the li element
                    li.appendChild(img); // Add the Pokemon's image to the li element
                    li.appendChild(p); // Add the price to the li element
                    li.appendChild(button);
                    ul.appendChild(li); // Add the li element to the ul element
                });
        });
    });

    // Ajouter le nouveau Pokémon au panier
    button.onclick = function(event) {
        event.preventDefault();

        // Créer un objet Pokemon avec les informations nécessaires
        const pokemon = {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            price: Math.floor(Math.random() * 100),
        };

        // Récupérer le panier actuel depuis le localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ajouter le nouveau Pokemon au panier
        cart.push(pokemon);

        // Sauvegarder le panier mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Rediriger vers la page panier.html
        window.location.href = 'panier.html';
    };


    window.onload = function() {
        // Get the cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Get the cart container
        const cartContainer = document.querySelector('#cartContainer');
    
        // For each Pokemon in the cart...
        cart.forEach((pokemon) => {
            // Create a new div element for the Pokemon
            const cartItem = document.createElement('div');
    
            // Create a new h3 element for the Pokemon's name
            const h3 = document.createElement('h3');
            h3.textContent = pokemon.name;
    
            // Create a new img element for the Pokemon's image
            const img = document.createElement('img');
            img.src = pokemon.image;
    
            // Create a new p element for the Pokemon's price
            const p = document.createElement('p');
            p.textContent = pokemon.price;
    
            // Add the h3, img, and p elements to the cartItem
            cartItem.appendChild(h3);
            cartItem.appendChild(img);
            cartItem.appendChild(p);
    
            // Add the cartItem to the cart container
            cartContainer.appendChild(cartItem);

            updateCartDisplay();
        });
    };
    
    






    // document.addEventListener('DOMContentLoaded', function() {
    //     const button = document.getElementById('buyButton');
    
    //     button.onclick = function(event) {
    //         event.preventDefault();
    
    //         // Get the current list of Pokemon in the cart
    //         let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    //         // Add the new Pokemon to the cart
    //         cart.push(pokemonData);
    
    //         // Save the updated cart back to localStorage
    //         localStorage.setItem('cart', JSON.stringify(cart));
    
    //         // Redirect to the cart page
    //         window.location.href = 'panier.html';
    //     };
    // });
    

    // document.addEventListener('DOMContentLoaded', function () {
    //     // Afficher les éléments du panier sur la page panier.html
    //     const cartContainer = document.getElementById('cartContainer');
    
    //     // Fonction pour mettre à jour l'affichage du panier
    //     function updateCartDisplay() {
    //         cartContainer.innerHTML = '';
        
    //         cart.forEach((item) => {
    //             const cartItem = document.createElement('div');
    //             cartItem.innerHTML = `
    //                 <img src="${item.sprites.front_default}" alt="${item.name}" style="width: 50px; height: 50px;">
    //                 <span>${item.name} - Price: ₽${item.price.toFixed(2)}</span>
    //                 <span>Quantity: ${item.quantity}</span>
    //             `;
    //             cartContainer.appendChild(cartItem);
    //         });
    //     }
            
        
    //     // Écouter le clic sur le bouton "buy" sur la page d'accueil
    //     document.getElementById('produits').addEventListener('click', function (event) {
    //         if (event.target.classList.contains('buy-btn')) {
    //             const pokemonData = JSON.parse(event.target.getAttribute('data-pokemon'));
    
    //             // Ajouter le nouveau Pokémon au panier
    //             addToCart(pokemonData);
    
    //             // Mettre à jour le panier dans le local storage
    //             localStorage.setItem('cart', JSON.stringify(cart));
    
    //             // Mettre à jour l'affichage du panier sur la page panier.html
    //             updateCartDisplay();
    //         }
    //     });
        
    //         // Fonction pour ajouter un Pokémon au panier
    //         function addToCart(pokemonData) {
    //             const existingPokemon = cart.find((item) => item.name === pokemonData.name);
        
    //             if (existingPokemon) {
    //                 existingPokemon.quantity += 1;
    //             } else {
    //                 cart.push({
    //                     name: pokemonData.name,
    //                     sprites: pokemonData.sprites,
    //                     price: Math.floor(Math.random() * 100),
    //                     quantity: 1,
    //                 });
    //             }
    //         }
        
    //         // Mettre à jour l'affichage initial du panier
    //         updateCartDisplay();
    //     }); 