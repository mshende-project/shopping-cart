let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return shop.innerHTML = shopItems.map((item) => {

        let {id, img, name, price, desc} = item;
        let search = basket.find((x) => x.id === id) || [];

        return `<div class="item" id="id-${id}">
        <img src="${img}" alt="${name}" width="220" />
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i class="bi bi-plus-lg" onclick="increement(${id})"></i>
                    <div class="quantity" id=${id} onclick="update()">${search.item !== undefined ? search.item : 0}</div>
                    <i class="bi bi-dash" onclick="decreement(${id})"></i>
                </div>
            </div>
        </div>
    </div>`
    }).join("")
};

generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation(search.item); 
}

let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");
    let total =  basket.map((x) => x.item).reduce((x,y) => x + y, 0);

    cartAmount.innerHTML = total;
}
// load calculation when page loads
calculation();