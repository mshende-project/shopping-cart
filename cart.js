let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart")
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");
    let total =  basket.map((x) => x.item).reduce((x,y) => x + y, 0);

    cartAmount.innerHTML = total;
}
// load calculation when page loads
calculation();

let generateCartItem = () => {
    if(basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((cartItem) => {
            let {id, item} = cartItem;
            let search = shopItems.find((x) => x.id === id);
        
            return `
                    <div class="cart-item">
                        <img src=${search.img} width="100" alt=${search.name}>
                        <div class="details">
                            <div class="title-price-x">
                                <h4 class="title-price">
                                    <p>${search.name}</p>
                                    <p class="cart-item-price">$ ${search.price}</p>
                                </h4>
                                <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
                            </div>
                            <div class="buttons">
                                <i class="bi bi-plus-lg" onclick="increement(${id})"></i>
                                <div class="quantity" id=${id} onclick="update()">
                                    ${item}
                                </div>
                                <i class="bi bi-dash" onclick="decreement(${id})"></i>
                            </div>
                            <div class="item-total-price">$ ${item * search.price}</div>
                        </div>
                    </div>
                `
        }).join("");
    } else {
        shoppingCart.innerHTML = "";
        label.innerHTML = `
            <h2>Cart is empty</h2>
            <a href="index.html">
                <button class="homeBtn">Back to home</button>
            </a>
        `;
    }
}
generateCartItem();

let increement = (selectedItem) => {
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    update(selectedItem.id);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket))
}

let decreement = (selectedItem) => {
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation(search.item); 
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((item) => item.id !== selectedItem.id);
    generateCartItem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount()
}

let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItems.find((x) => x.id === id);
            return item * search.price
        }).reduce((x,y) => x + y, 0);
        // console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
}
totalAmount()

let clearCart = () => {
    basket = [];
    generateCartItem()
    calculation();
    localStorage.setItem("data", JSON.stringify(basket))
}