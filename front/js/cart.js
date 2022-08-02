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
    let tabPrice = [];
    for(let i in cart) // Boucle qui permet d'afficher chaque élement du panier sur la page panier.
    {
        const searchValue = data.filter(element => element._id == cart[i].id);
        
        if(searchValue) // Vérifie que l'id est bien dans le panier et s'il y est ajoute les détails du produit.
        {
            const cartItems = document.getElementById("cart__items");

            const article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", searchValue[0]._id);
            article.setAttribute("data-color", cart[i].color);  
            cartItems.appendChild(article);

            const itmImage = document.createElement("div");
            itmImage.classList.add("cart__item__img");
            article.appendChild(itmImage);

            const image = document.createElement("img");
            image.setAttribute("src", searchValue[0].imageUrl);
            image.setAttribute("alt", searchValue[0].altTxt);
            itmImage.appendChild(image);

            const itemContent = document.createElement("div");
            itemContent.classList.add("cart__item__content");
            article.appendChild(itemContent);

            const contentDescription = document.createElement("div");
            contentDescription.classList.add("cart__item__content__description");
            itemContent.appendChild(contentDescription);
            
            const nameProduct = document.createElement("h2");
            nameProduct.innerHTML = searchValue[0].name;
            contentDescription.appendChild(nameProduct);

            const colorProduct = document.createElement("p");
            colorProduct.innerHTML = cart[i].color;       
            contentDescription.appendChild(colorProduct);

            const priceProduct = document.createElement("p");
            let totalPriceByProduct = searchValue[0].price * cart[i].value;
            const internationalNumberFormat = new Intl.NumberFormat('en-US');
            priceProduct.innerHTML = internationalNumberFormat.format(totalPriceByProduct) + " €";
            contentDescription.appendChild(priceProduct);

            const settingsContent = document.createElement("div");
            settingsContent.classList.add("cart__item__content__settings");
            itemContent.appendChild(settingsContent);

            const settingsQuantity = document.createElement("div");
            settingsQuantity.classList.add("cart__item__content__settings__quantity");
            settingsContent.appendChild(settingsQuantity);

            const quantity = document.createElement("p");
            quantity.innerHTML = "Qté : ";
            settingsQuantity.appendChild(quantity);

            const input = document.createElement("input");
            input.setAttribute("type", "number");
            input.classList.add("itemQuantity");
            input.setAttribute("name", "itemQuantity");
            input.setAttribute("min", "1");
            input.setAttribute("max", "100");
            input.setAttribute("value", cart[i].value);
            settingsQuantity.appendChild(input);

            const settingsDelete = document.createElement("div");
            settingsDelete.classList.add("cart__item__content__settings__delete");
            settingsContent.appendChild(settingsDelete);

            const deleteItem = document.createElement("p");
            deleteItem.classList.add("deleteItem"); 
            deleteItem.innerHTML = "Supprimer";
            deleteItem.dataset.indice = i; 
            settingsDelete.appendChild(deleteItem);
           
            const totalQuantity = document.getElementById("totalQuantity"); 
           
            const totalPrice = document.getElementById("totalPrice");
            let initialValue = 0 ;
            
            
            
            input.addEventListener("change", (e) => // Fait en sorte que le prix s'ajuste lorsque le nombre de produit se modifie.
            {
                let newValue = e.target.value;
                input.setAttribute("value", newValue);
                let modifiedPriceProduct = newValue * searchValue[0].price;
                priceProduct.innerHTML = internationalNumberFormat.format(modifiedPriceProduct) + " €";
                cart[i].value = parseInt(newValue);
                localStorage.setItem("cart", JSON.stringify(cart));

                if(modifiedPriceProduct > tabPrice[i])
                {
                    tabPrice[i] = modifiedPriceProduct;

                    totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
                    initialValue));
                }

                else if(modifiedPriceProduct < tabPrice[i])
                {
                    tabPrice[i] = modifiedPriceProduct; 
                    totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
                    initialValue));
                    
                    if (modifiedPriceProduct < 0)
                    {
                        tabPrice[i] = 0;
                        totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
                        initialValue));
                    }
                }
           
                if(cart[i].value <= 0) // Si valeur inférieur ou égal à 0 supprime l'élément concerner.
                {
                    const removeArticle = e.target.closest("article");
                    const button = removeArticle.querySelector(".deleteItem");
                    cartItems.removeChild(removeArticle);
                    let indice = button.dataset.indice;
                    cart.splice(indice, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    totalQuantity.innerText = cart.length;
                }
            })
            
            deleteItem.addEventListener("click", (e) =>  //Lors du clique sur le texte "supprimer" supprime l'élément concerner.
            {
                let data = article.dataset;
                if(data)
                {   
                    let removeArticle = e.target.closest("article");
                    const button = removeArticle.querySelector(".deleteItem");
                    cartItems.removeChild(removeArticle);
                    let indice = button.dataset.indice;
                    cart.splice(indice, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    totalQuantity.innerText = cart.length;
                    tabPrice[i] = 0; 
                    totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
                    initialValue));                
                }
            })
  
            totalQuantity.innerText = cart.length;
            
            tabPrice.push(totalPriceByProduct); 
            totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
            initialValue));
        }
    }
    
    // Champs qui constituent le formulaire.
    const inputFirstName = document.getElementById("firstName");
    const firstNameError = document.getElementById("firstNameErrorMsg");
    let testFirstName = false;

    const inputLastName = document.getElementById("lastName");
    const lastNameError = document.getElementById("lastNameErrorMsg");
    let testLastName = false;

    const inputAddress = document.getElementById("address");
    const addressError = document.getElementById("addressErrorMsg");
    let testAddress = false;

    const inputCity = document.getElementById("city");
    const cityError = document.getElementById("cityErrorMsg");
    let testCity = false;

    const inputEmail = document.getElementById("email");
    const emailError = document.getElementById("emailErrorMsg");
    let testEmail = false;

    const submit = document.getElementById("order");
    submit.disabled = true;
    
    let contact = {};
    
    /* Pour chaque champ du formulaire une fois le champ remplit et que l'on change de champ appel 2 fonctions
     la 1ère qui est une régle différente pour chaque champ et la 2ème vérifie que les élements sont remplis avec leur régles respecter. */
     inputFirstName.addEventListener("change", () =>
    {
        validFirstName(); 
        order(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    inputLastName.addEventListener("change", () =>
    {
        validLastName(); 
        order(testFirstName, testLastName, testAddress, testCity, testEmail);
    });
    
    inputAddress.addEventListener("change", () =>
    {
        validAddress(); 
        order(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    inputCity.addEventListener("change", () =>
    {
        validCity(); 
        order(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    inputEmail.addEventListener("change", () =>
    {
        validEmail(); 
        order(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    const validFirstName = function () // Régle qui concerne la validation du "Prénom".
    {                              
        const regFirstName = new RegExp("^[A-Za-z][A-Za-zéçèàûîôïüä-]+$");
        testFirstName = regFirstName.test(inputFirstName.value); 

        if(testFirstName == false)
        {
            firstNameError.textContent = "Ceci est un message d'erreur";
        }
        else
        {
            firstNameError.textContent = "";
        };
    }
    
    const validLastName = function () // Régle qui concerne la validation du "Nom".
    {                              
        
        const regLastName = new RegExp("^[A-Za-z][A-Za-zéçèàûîôïüä-]+$");
        testLastName = regLastName.test(inputLastName.value); 
       
        if(testLastName == false)
        {
            lastNameError.textContent = "Ceci est un message d'erreur";
        }
        else
        {
            lastNameError.textContent = "";
        };
    }

    const validAddress = function () // Régle qui concerne la validation de "l'adresse".
    {                              
        const regAddress = new RegExp("^[0-9][-A-Za-z0-9éçèàûîôïüä._ ]+$");
        testAddress = regAddress.test(inputAddress.value); 
 
        if(testAddress == false)
        {
            addressError.textContent = "Ceci est un message d'erreur";
        }
        else
        {
            addressError.textContent = "";
        };
    }

    const validCity = function () // Régle qui concerne la validation de la "Ville".
    {                              
        const regCity = new RegExp("^[A-Za-z][A-Za-zéçèàûîôïüä-]+$");
        testCity = regCity.test(inputCity.value); 

        if(testCity == false)
        {
            cityError.textContent = "Ceci est un message d'erreur";
        }
        else
        {
            cityError.textContent = "";
        }
    }

    const validEmail = function () // Régle qui concerne la validation du "Mail".
    {                              
    
        const regEmail = new RegExp("^[A-Za-z][-a-z0-9._]+[-a-z0-9]@[-a-z0-9]+[.]{1}[a-z]{2,5}$");
        testEmail = regEmail.test(inputEmail.value); 
   
        if(testEmail == false)
        {
            emailError.textContent = "Ceci est un message d'erreur";
        }
        else
        {
            emailError.textContent = "";
        };
    }
 
    let order = (testFirstName, testLastName, testAddress, testCity, testEmail) => /* Vérifie que les champs du formulaire sont bon et que le panier contient un produit
     pour débloquer le bouton qui permet de confirmer la commande. */
    {
        console.log(cart)
        if(testFirstName && testLastName && testAddress && testCity && testEmail & cart.length >= 1)
        {
            submit.disabled = false;  
            
            let firstNameValue = inputFirstName.value;
            let lastNameValue = inputLastName.value;
            let addressValue = inputAddress.value;
            let cityValue = inputCity.value;
            let emailValue = inputEmail.value;
            contact = {"firstName" : firstNameValue, "lastName" : lastNameValue, "address" : addressValue, "city" : cityValue, "email" : emailValue};
            
            let products = [];
            while(products.length != cart.length)
            {
                let i = 0;
                products.push(cart[i++].id);
            }

            let commande = {contact, products}  
           
            fetch("http://localhost:3000/api/products/order", // Envoie la commande au back.
            {
                method: "POST",
                headers: 
                {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(commande)
            }).then((response) => 
            {
                return response.json();
            }).then((data) => 
            {   
                let orderId = "http://127.0.0.1:5500/front/html/confirmation.html?id=" + data.orderId; // Pour la page confirmation dans l'url on ajoute l'id que le back nous a renvoyé.
                    submit.addEventListener("click", (e) =>
                    {
                        e.preventDefault();
                        window.location.href = orderId;
                    })
            }).catch((error) => 
            {
                console.error("Erreur confirmation");
            })
        }
        else
        {
            submit.disabled = true;
        }
    } 
 })    
.catch(function (err) 
{
    console.error("Une erreur est survenue");
});