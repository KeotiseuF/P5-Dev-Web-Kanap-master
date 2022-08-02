const url = window.location.search; // Permet d'afficher les paramètres de l'url. 
const params = new URLSearchParams(url); // Cherche dans les paramètres de l'url le premier paramètre.
const id = params.get("id"); // Renvoie le premier paramètre qui est pour le cas "l'id".
fetch("http://localhost:3000/api/products/" + id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  }).then((data) => {

    // Affiche les détails du produits sélectionner (Image, titre, prix, description, couleurs).

    const image = document.createElement("img");
    image.src = data.imageUrl;
    image.alt = data.altTxt;
    
    const item__img = document.getElementsByClassName("item__img");
    item__img[0].appendChild(image);

    const title = document.getElementById("title");
    title.textContent = data.name;
    
    const price = document.getElementById("price");
    price.textContent = data.price;

    const description = document.getElementById("description");
    description.textContent = data.description;

    let colors = data.colors;
    const color_select = document.getElementById("colors");
    
    const addToCart = document.getElementById("addToCart"); // Appel d'un élément qui est un bouton pour ajouter au panier.
    
    for (color of colors) // Boucle qui ajoute les couleurs du produit, qui permettra à un de choisir une couleur.
    {
        const createColor = document.createElement("option");
        createColor.setAttribute("value", color);
        createColor.innerHTML = color;
        color_select.appendChild(createColor);         
    } 

    addToCart.addEventListener("click", (e) => // Bouton pour ajouter au panier le produit ou les produits sélectionnés avec leur détails.
    {
      let choice_color = color_select.options[color_select.selectedIndex].value; 
      
      const quantity = document.getElementById("quantity");
      
      let quantity_value = quantity.value;
      
      const product = {"id" : data._id, "color" : choice_color, "value" : parseInt(quantity_value)};
    
      const cart = JSON.parse(localStorage.getItem("cart"));

      if( choice_color == "" || 0 >= quantity_value || quantity_value > 100)
      {
        window.alert("Information ci-dessous incorrecte");
      }

      else
      {
        if(cart == null)
        {
          cart = [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        else
        {
          localStorage.getItem("cart");
          const searchProduct = cart.find(element => (element.id == product.id && element.color == product.color));
          
          if(searchProduct)
          {          
            searchProduct.value += product.value;
          }
          else
          {
            cart.push(product);
          }
          
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    })
    
  }) 
  .catch(function(err) {
    console.error("Une erreur est survenue");
  });
