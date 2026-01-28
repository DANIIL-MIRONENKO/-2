let cart_list = document.querySelector('.cart-items-list')
let cart_total = document.querySelector('.cart-total')
let orderBtn = document.querySelector("#orderBtn")
let orderSection = document.querySelector(".order")


function get_item(item) {
    return `<div class = "cart-item">
        <h4 class="cart-item-title">${item.title}</h4>
        
        <div class="cart-item-quantity">Кількість: 
        <input data-item="${item.title}" class="form-control quantity-input" type="number" name="quantity" min="1" value="${item.quantity}">
        </div>
        <div class="cart-item-price" data-price="${item.price}">${item.price * item.quantity} грн</div>
        </div>`
}

function showCartList() {
    cart_list.innerHTML = ''
    for (let key in cart.items) { // проходимося по всіх ключах об'єкта cart.items
        cart_list.innerHTML += get_item(cart.items[key])
    }
    cart_total.innerHTML = cart.calculateTotal()


}

showCartList()

cart_list.addEventListener('change', (event) => {
    let target = event.target
    const itemTitle = target.getAttribute('data-item')
    const newQuantity = +target.value
    if (newQuantity > 0) {
        cart.updateQuantity(itemTitle, newQuantity)
        showCartList() // Оновити список товарів у кошику
    }
});

//анімація появи кошика поступова поява кошика
anime({
    targets: '.cart',
    opacity: 1, // Кінцева прозорість (1 - повністю видимий)
    duration: 500, // Тривалість анімації в мілісекундах
    easing: 'easeInOutQuad'
})
function completeOrder() {
    alert("Ваше замовлення прийде за 30 хвилин 🕒")

    // очищаємо кошик
    cart.items = {}

    // оновлюємо лічильник
    cart.updateCounter()

    // очищаємо cookies
    document.cookie = `cart={}; max-age=${60 * 60 * 24 * 7}; path=/`

    // оновлюємо відображення
    showCartList()
}

orderBtn.addEventListener("click", function () {
    completeOrder()

    orderBtn.style.display = "none"
    orderSection.style.display = "none"
})

