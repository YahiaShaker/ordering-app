import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const menuSection = document.getElementById("menu")

let cart = []

document.addEventListener("click", function(e){
    if (e.target.id === "add") {
        addToCheckout(e.target.dataset.menuId)
    } else if (e.target.id === "remove") {
        const uuid = e.target.parentElement.dataset.uuid
        e.target.parentElement.remove()
        removeFromCheckout(uuid)
    } else if (e.target.id === "complete-btn") {
        checkout()
    } else if (e.target.id === "card-submit") {
        const username = document.getElementById("username").value
        const cardNumber = document.getElementById("card-number").value
        const cardCvv = document.getElementById("card-cvv").value
        if (username && cardNumber && cardCvv) {confirm()}
    }
})

function render() {
    let menuHtml = ""
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="item">

            <h1 class="item-icon">${item.emoji}</h1>
            <div class="item-details">
                <h2 class="item-name">${item.name}</h2>
                <p class="item-ingredients">${item.ingredients.toString()}</p>
                <h3 class="item-price">$${item.price}</h3>
            </div>
            <h1 class="add-icon" id="add" data-menu-id="${item.id}">+</h1>
        </div>
        `
    })

    menuHtml += `
    <div class="checkout" id="checkout">

    </div>`

    menuSection.innerHTML = menuHtml

    if (cart.length > 0) {
        const checkoutDiv = document.getElementById("checkout")
        let checkoutHtml = "<h2 class='checkout-title'>Your order</h2>"
        let totalPrice = 0
        cart.forEach(function(item){
            checkoutHtml += `
            <div class="checkout-item" data-uuid="${item.uuid}">
                <h2 class="item-name">${item.name}</h2>
                <h3 class="checkout-remove" id="remove">remove</h3>
                <h3 class="item-price">$${item.price}</h3>
            </div>`
            totalPrice += item.price
        })

        checkoutHtml += `
        <div class="checkout-total">
            <h2 class="item-name">Total price:</h2>
            <h3 class="item-price">$${totalPrice}</h3>
        </div>

        <btn class="checkout-btn" id="complete-btn">Complete order</btn>
        `

        checkoutDiv.innerHTML = checkoutHtml
    }
}


function addToCheckout(menuId) {
    const itemObj = menuArray.filter(function(item) {
        return (menuId == item.id)
    })[0]

    cart.push({name: itemObj.name, price: itemObj.price, uuid: uuidv4()})
    render()

}


function removeFromCheckout(itemId) {
    cart = cart.filter(function(item){
        return !(item.uuid == itemId)
    })
    render()
}

function checkout() {
    const checkoutModal = document.getElementById("checkout-modal")
    checkoutModal.style.display = "block"
}

function confirm() {
    const name = document.getElementById("username").value
    const section = document.getElementById("menu")

    const confirmHtml = `
    <div class="order-confirmation">

        <h1 class="order-confirmation-text">Thanks, ${name}! Your order is on its way!</h1>

    </div>`

    menu.insertAdjacentHTML( 'beforeend', confirmHtml )
    document.getElementById("checkout-modal").style.display = "none"
    document.getElementById("checkout").style.display = "none"



}

render()