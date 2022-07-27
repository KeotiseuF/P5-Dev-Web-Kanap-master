fetch("http://localhost:3000/api/products")
.then(function(res)
{
    if (res.ok)
    {
        return res.json();
    }
})
.then(function(data)
{   
    let cart = JSON.parse(localStorage.getItem("cart")); 
    
    for(let i in cart)
    {
        let searchValue = data.filter(element => element._id == cart[i].id);
        
        if(searchValue)
        {
            let cartItems = document.getElementById("cart__items");

            let article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", searchValue[0]._id);
            article.setAttribute("data-color", searchValue[0].color);  
            cartItems.appendChild(article);

            let itmImage = document.createElement("div");
            itmImage.classList.add("cart__item__img");
            article.appendChild(itmImage);

            let image = document.createElement("img");
            image.setAttribute("src", searchValue[0].imageUrl);
            image.setAttribute("alt", searchValue[0].altTxt);
            itmImage.appendChild(image);

            let itemContent = document.createElement("div");
            itemContent.classList.add("cart__item__content");
            article.appendChild(itemContent);

            let contentDescription = document.createElement("div");
            contentDescription.classList.add("cart__item__content__description");
            itemContent.appendChild(contentDescription);
            
            let nameProduct = document.createElement("h2");
            nameProduct.innerHTML = searchValue[0].name;
            contentDescription.appendChild(nameProduct);

            let colorProduct = document.createElement("p");
            colorProduct.innerHTML = cart[i].color;       
            contentDescription.appendChild(colorProduct);

            let priceProduct = document.createElement("p");
            let totalPriceByProduct = searchValue[0].price * cart[i].value;
            let internationalNumberFormat = new Intl.NumberFormat('en-US');
            priceProduct.innerHTML = internationalNumberFormat.format(totalPriceByProduct) + " €";
            contentDescription.appendChild(priceProduct);

            let settingsContent = document.createElement("div");
            settingsContent.classList.add("cart__item__content__settings");
            itemContent.appendChild(settingsContent);

            let settingsQuantity = document.createElement("div");
            settingsQuantity.classList.add("cart__item__content__settings__quantity");
            settingsContent.appendChild(settingsQuantity);

            let quantity = document.createElement("p");
            quantity.innerHTML = "Qté : ";
            settingsQuantity.appendChild(quantity);

            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.classList.add("itemQuantity");
            input.setAttribute("name", "itemQuantity");
            input.setAttribute("min", "1");
            input.setAttribute("max", "100");
            input.setAttribute("value", cart[i].value);
            settingsQuantity.appendChild(input);

            let settingsDelete = document.createElement("div");
            settingsDelete.classList.add("cart__item__content__settings__delete");
            settingsContent.appendChild(settingsDelete);

            let deleteItem = document.createElement("p");
            deleteItem.classList.add("deleteItem"); 
            deleteItem.innerHTML = "Supprimer";
            settingsDelete.appendChild(deleteItem)
        }
    }  
})
.catch(function (err) 
{
    console.log("Une erreur est survenue");
});