fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {
    for (product of products) // Boucle qui permet d'afficher de manière dynamique tous les articles disponibles à la vente sur la page d'acceuil.
    {
      const lien = document.createElement("a");
      lien.href = "./front/html/product.html?id=" + product._id;
      
      const title = document.createElement("h3");
      title.classList.add("productName");
      
      const description = document.createElement("p");
      description.classList.add("productDescription");
      
      const image = document.createElement("img");
      image.src = product.imageUrl;
      image.alt = product.altTxt;
      
      const article = document.createElement("article");
      
      const items = document.getElementById("items");

      
      items.appendChild(lien);
      lien.appendChild(article);
      article.appendChild(image);
      article.appendChild(title);
      article.appendChild(description);

      title.innerHTML = product.name;
      description.innerHTML = product.description;   
    } 
  })
  .catch(function(err) {
    console.error("Une erreur est survenue");
  });