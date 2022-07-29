const url = window.location.search;
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
    let color_select = document.getElementById("colors");
    
    let addToCart = document.getElementById("addToCart");
    
    for (color of colors)
    {
        let createColor = document.createElement("option");
        createColor.setAttribute("value", color);
        createColor.innerHTML = color;
        color_select.appendChild(createColor);         
    } 

    addToCart.addEventListener("click", (e) => 
    {
      let choice_color = color_select.options[color_select.selectedIndex].value;
      
      let quantity = document.getElementById("quantity");
      
      let quantity_value = quantity.value;
      
      let product = {"id" : data._id, "color" : choice_color, "value" : parseInt(quantity_value)};
    
      let cart = JSON.parse(localStorage.getItem("cart"));

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
          let searchProduct = cart.find(element => (element.id == product.id && element.color == product.color));
          
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
