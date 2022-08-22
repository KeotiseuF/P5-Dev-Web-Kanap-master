const internationalNumberFormat = new Intl.NumberFormat('en-US');

let cart = JSON.parse(localStorage.getItem("cart")); 
    
const totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerText = 0;
let tabQuantity = []; 

const totalPrice = document.getElementById("totalPrice");
totalPrice.innerText = 0;
let tabPrice = [];
         
let input;
let deleteItem;

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
    //Affiche les produit avec leur détails;
    createCartItem(data);

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
        unlockSubmit(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    inputLastName.addEventListener("change", () =>
    {
        validLastName(); 
        unlockSubmit(testFirstName, testLastName, testAddress, testCity, testEmail);
    });
    
    inputAddress.addEventListener("change", () =>
    {
        validAddress(); 
        unlockSubmit(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    inputCity.addEventListener("change", () =>
    {
        validCity(); 
        unlockSubmit(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    inputEmail.addEventListener("change", () =>
    {
        validEmail(); 
        unlockSubmit(testFirstName, testLastName, testAddress, testCity, testEmail);
    });

    // Règle qui concerne la validation du "Prénom".
    const validFirstName = function () 
    {                              
        const regFirstName = new RegExp("^[A-Za-z][A-Za-zéçèàûîôïüä-]+$");
        testFirstName = regFirstName.test(inputFirstName.value); 

        if(testFirstName == false)
        {
            firstNameError.textContent = "Prénom n'est pas valide !";
        }
        else
        {
            firstNameError.textContent = "";
        };
    };
    
    // Règle qui concerne la validation du "Nom".
    const validLastName = function () 
    {                              
        
        const regLastName = new RegExp("^[A-Za-z][A-Za-zéçèàûîôïüä-]+$");
        testLastName = regLastName.test(inputLastName.value); 
       
        if(testLastName == false)
        {
            lastNameError.textContent = "Nom n'est pas valide !";
        }
        else
        {
            lastNameError.textContent = "";
        };
    };

    // Règle qui concerne la validation de "l'adresse".
    const validAddress = function () 
    {                              
        const regAddress = new RegExp("^[0-9][-A-Za-z0-9éçèàûîôïüä._' ]+$");
        testAddress = regAddress.test(inputAddress.value); 
 
        if(testAddress == false)
        {
            addressError.textContent = "Adresse n'est pas valide !";
        }
        else
        {
            addressError.textContent = "";
        };
    };

    // Régle qui concerne la validation de la "Ville".
    const validCity = function ()
    {                              
        const regCity = new RegExp("^[A-Za-z][A-Za-zéçèàûîôïüä-]+$");
        testCity = regCity.test(inputCity.value); 

        if(testCity == false)
        {
            cityError.textContent = "Ville n'est pas valide !";
        }
        else
        {
            cityError.textContent = "";
        };
    };
    
    // Règle qui concerne la validation du "Mail".
    const validEmail = function () 
    {                              
    
        const regEmail = new RegExp("^[A-Za-z][-a-z0-9._]+[-a-z0-9]@[-a-z0-9]+[.]{1}[a-z]{2,5}$");
        testEmail = regEmail.test(inputEmail.value); 
   
        if(testEmail == false)
        {
            emailError.textContent = "Mail n'est pas valide !";
        }
        else
        {
            emailError.textContent = "";
        };
    };
 
     // Vérifie que les champs du formulaire sont bon et que le panier contient un produit pour débloquer le bouton qui permet de confirmer la commande.
    let unlockSubmit = (testFirstName, testLastName, testAddress, testCity, testEmail) => 
    {
        if(testFirstName && testLastName && testAddress && testCity && testEmail & cart.length >= 1)
        {
            submit.disabled = false;  
            
            let firstNameValue = inputFirstName.value;
            let lastNameValue = inputLastName.value;
            let addressValue = inputAddress.value;
            let cityValue = inputCity.value;
            let emailValue = inputEmail.value;
            contact = {"firstName" : firstNameValue, "lastName" : lastNameValue, "address" : addressValue, "city" : cityValue, "email" : emailValue};
            
            submit.addEventListener("click", (e) => // Lors du clique sur le bouton envoie la commande au back.
            {
                e.preventDefault();
                let products = [];
                let i = 0;
                
                while(products.length !== cart.length)
                {
                    products.push(cart[i++].id);
                }
                
                let commande = {contact, products};  
                
                fetch("http://localhost:3000/api/products/order", 
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
                    let orderId = "./confirmation.html?id=" + data.orderId; // Pour la page confirmation dans l'url on ajoute l'id que le back nous a renvoyé.      
                    window.location.href = orderId;
                }).catch((error) => 
                {
                    console.error("Erreur confirmation");
                });
            }); 
        }
        else
        {
            submit.disabled = true;
        };
    };
 })
.catch(function (err) 
{
    console.error("Une erreur est survenue");
});





//Affiche les produit avec leur détails;
const createCartItem = (data) =>
{
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

            createInputQuantity (i, settingsQuantity); 
            
            modifiedQuantityProduct(input, priceProduct, data);
            
            const settingsDelete = document.createElement("div");
            settingsDelete.classList.add("cart__item__content__settings__delete");
            settingsContent.appendChild(settingsDelete);

            createLinkDelete(i, settingsDelete); 
            
            deleteProduct(article, cartItems);

            total(cart, i, totalPriceByProduct); 
        };
        
    };
} 

// Crée l’input quantité de chaque produit du panier.
function createInputQuantity(i, settingsQuantity) 
{
    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("itemQuantity");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", cart[i].value);
    settingsQuantity.appendChild(input)
    input.onkeydown = () => {return false}; // Bloque la saisie dans le input.
}

// Calculer la valeur total du panier. 
const total = (cart, i, totalPriceByProduct) => 
{
    tabQuantity.push(cart[i].value);
    totalQuantity.innerText = tabQuantity.reduce((previousValue, currentValue) => previousValue + currentValue,
    0);
    
    tabPrice.push(totalPriceByProduct); 
    totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
    0));
}

// Fait en sorte que le prix s'ajuste lorsque le nombre de produit se modifie.
function modifiedQuantityProduct(input, priceProduct, data) 
{

    input.addEventListener("change", (e) => 
    {
        const article = e.target.closest("article");
        const idArticle = article.dataset ;
        const find = cart.find(element => element.id == idArticle.id && element.color == idArticle.color); // Retourne "l'élément" du tableau "cart" qui correspond à l'id et la couleur de la variable "idArticle". 
        const indice = cart.findIndex(element => element.id == idArticle.id && element.color == idArticle.color) // Retourne "l'indice" du tableau "cart" qui correspond à l'id et la couleur de la variable "idArticle".
        const searchValue = data.filter(element => element._id == idArticle.id);
        let modifiedPriceProduct = 0;
        let oldValue = find.value
        if(idArticle && find)
        {
            let newValue = e.target.value;
            input.setAttribute("value", newValue);
            modifiedPriceProduct = newValue * searchValue[0].price;
            priceProduct.innerHTML = internationalNumberFormat.format(modifiedPriceProduct) + " €";
            find.value = parseInt(newValue);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        if(find.value > oldValue)
        {
            recalculateTotal(indice, modifiedPriceProduct, find);
        }

        else
        {
            recalculateTotal(indice, modifiedPriceProduct, find);
        };
    });
}

// Crée un lien de suppression.
function createLinkDelete(i, settingsDelete) 
{ 
    deleteItem = document.createElement("p")
    deleteItem.classList.add("deleteItem"); 
    deleteItem.innerHTML = "Supprimer";
    deleteItem.dataset.indice = i; 
    settingsDelete.appendChild(deleteItem);
}

//Lors du clique sur le texte "supprimer" supprime l'élément concerner.
function deleteProduct(article, cartItems) 
{ 
    deleteItem.addEventListener("click", (e) =>  
    {
        let dataSet = article.dataset;
        if(dataSet)
        {
            const indice = cart.findIndex(element => element.id == dataSet.id && element.color == dataSet.color)
            let removeArticle = e.target.closest("article");
            cartItems.removeChild(removeArticle);
            cart.splice(indice, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            tabQuantity.splice(indice, 1);
            totalQuantity.innerText = tabQuantity.reduce((previousValue, currentValue) => previousValue + currentValue,
            0); 
            tabPrice.splice(indice, 1); 
            totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
            0));                
        };
    });
}

//Recalcule le total si la valeur d'un prouduit change.
const recalculateTotal = (indice, modifiedPriceProduct, find) => 
{
    tabQuantity[indice] = find.value;
    totalQuantity.innerText = tabQuantity.reduce((previousValue, currentValue) => previousValue + currentValue,
    0);

    tabPrice[indice] = modifiedPriceProduct;
    totalPrice.innerText = internationalNumberFormat.format(tabPrice.reduce((previousValue, currentValue) => previousValue + currentValue,
    0));
}