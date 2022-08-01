const url = window.location.search;
let params = new URLSearchParams(url);
let id = params.get("id");
console.log(id)
fetch("http://localhost:3000/api/products/")
  .then(function(res) 
  {
    if (res.ok) {
      return res.json();
    }
  }).then((data) => 
  {
    orderId.textContent = id;
  })