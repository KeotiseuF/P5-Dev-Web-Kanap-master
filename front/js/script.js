fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {
    for (product of products)
    {
      let lien = document.createElement("a");
      lien.href = "./product.html?id=" + product._id;
      
      let title = document.createElement("h3");
      title.classList.add("productName");
      
      let description = document.createElement("p");
      description.classList.add("productDescription");
      
      let image = document.createElement("img");
      image.src = product.imageUrl;
      image.alt = product.altTxt;
      
      let article = document.createElement("article");
      
      let items = document.getElementById("items");

      
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