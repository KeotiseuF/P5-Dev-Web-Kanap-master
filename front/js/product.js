const url = window.location.search
let params = new URLSearchParams(url);
let id = params.get("id"); 

fetch("http://localhost:3000/api/products/" + id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  }).then((data) => {
    let image = document.createElement("img");
    image.src = data.imageUrl;
    image.alt = data.altTxt;
    
    let item__img = document.getElementsByClassName("item__img");
    item__img[0].appendChild(image);

    let title = document.getElementById("title");
    title.textContent = data.name;
    
    let price = document.getElementById("price");
    price.textContent = data.price;

    let description = document.getElementById("description");
    description.textContent = data.description;

    let colors = data.colors;
    
    for (color of colors)
    {
        let createColor = document.createElement("option");
        createColor.setAttribute("value", color);
        createColor.innerHTML = color;
        
        let color_select = document.getElementById("colors");
        color_select.appendChild(createColor); 
    } 
  }) 
  .catch(function(err) {
    // Une erreur est survenue
  });
