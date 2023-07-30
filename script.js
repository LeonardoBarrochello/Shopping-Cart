


var catalogProducts = [
    {
        id : 1,
        name : "Blue shirt",
        img : "./assets/shirt.jpg"
    },
    {
        id : 2,
        name : "nike sneakers",
        img : "./assets/tenis.jpg"
    },
    {
        id : 3,
        name : "watch",
        img : "./assets/relogio.jpg"
    }
]

function addToCart(product){
     var addCartEvent = new CustomEvent("addItemToCart" , { detail : { product }});
     window.dispatchEvent(addCartEvent);
}

function removeFromCart(item){
    var removeFromCartEvent = new CustomEvent("removeItemFromCart" , { detail : { item }});
    window.dispatchEvent(removeFromCartEvent);
}


function closeCart(){
     var cart = document.querySelector(".cart");
     cart.classList.remove("expanded")
}
function openCart(){
    var cart = document.querySelector(".cart");
    cart.classList.add("expanded")
}


function renderProducts(){
    var productContainer = document.querySelector(".product-container");
    catalogProducts.forEach((product) => {
        var productDiv = document.createElement("div");
        var productTitle = document.createElement("h1");
        var productImage = document.createElement("img");
        var productButton = document.createElement("button");

        productTitle.innerText = product.name;
        productImage.src = product.img;
        productButton.innerText = "Add to cart";
        productButton.onclick = ()  => { addToCart(product) };

        productDiv.classList.add("product");
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productImage);
        productDiv.appendChild(productButton);
        productContainer.appendChild(productDiv)
    })
}


function updateCartItemsCount(){
    var productsInCart = document.querySelectorAll(".cart .cart-item").length;
    var cartButtonCount = document.querySelector(".cart-button-item-count span");
    cartButtonCount.innerText = productsInCart;
}


window.addEventListener("load", () => {
    renderProducts()
})

window.addEventListener("addItemToCart" , (e) => {
    var product = e.detail.product;
    var cart = document.querySelector(".cart");
    var cartItem = document.createElement("div");
    var cartItemTitle = document.createElement("p");
    var cartItemRemove = document.createElement("button");

    cartItemTitle.innerText = product.name;
    cartItem.appendChild(cartItemTitle);
    cartItem.classList.add("cart-item")
    cartItemRemove.innerText = "X";
    cartItemRemove.onclick = () => { removeFromCart(cartItem) }
    cartItem.appendChild(cartItemRemove);
    cart.appendChild(cartItem);

    updateCartItemsCount();
})

window.addEventListener("removeItemFromCart" , (e) => {
    var cart = document.querySelector(".cart");
    cart.removeChild(e.detail.item);
    updateCartItemsCount()
})