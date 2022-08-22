const url = window.location.search;
const params = new URLSearchParams(url);
const id = params.get("id");
fetch("http://localhost:3000/api/products/")
  .then(function(res) 
  {
    if (res.ok) {
      return res.json();
    }
  }).then((data) => 
  {
    let orderId = document.getElementById("orderId");
    orderId.textContent = id; // Affiche l'id qu'on nous a renvoyé à l'utilisateur sur la page de confirmation.
  })