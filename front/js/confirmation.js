const url = window.location.search;
const params = new URLSearchParams(url);
const id = params.get("id");

let orderId = document.getElementById("orderId");
orderId.textContent = id; // Affiche l'id qu'on nous a renvoyé à l'utilisateur sur la page de confirmation.
