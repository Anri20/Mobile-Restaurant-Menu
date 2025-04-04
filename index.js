import { menuArray } from "./data.js"

const main = document.querySelector("main div.main")

// display menu
const menu = menuArray.map(item => {
    return `
    <div id="${item.id}" class="item">
        <span class="icon">${item.emoji}</span>
        <div class="description">
            <span class="name">${item.name}</span>
            <span class="ingredients">${item.ingredients.join(", ")}</span>
            <span class="price">$${item.price}</span>
        </div>
        <button class="add" data-add=${item.id}>
            <i class="fa-solid fa-plus" data-add=${item.id}></i>
        </button>
    </div>
    `
}).join("")

console.log(menu)

main.innerHTML = menu



const orderContainer = document.querySelector("div.order")
const orderDetail = document.querySelector("div.order-detail")

let orderList = []

const modal = document.querySelector("form.modal")
const thanks = document.querySelector("div.thanks")

// default the display to none
orderContainer.style.display = "none"
modal.style.display = "none"
thanks.style.display = "none"

document.addEventListener("click", function (e) {
    if (e.target.dataset.add) {
        const food = menuArray.find(item =>
            item.id === parseInt(e.target.dataset.add)
        )
        console.log(food)

        orderList.push(food)
    }

    if (e.target.dataset.remove) {
        orderList.splice(e.target.dataset.remove, 1)
    }

    const totalPrice = orderList.reduce((sum, number) => sum + number.price, 0)

    let orderHTML = orderList.map((item, index) => {
        return `
            <p>
                <span class="name">${item.name}</span>
                <span class="remove" data-remove=${index}>remove</span>
                <span class="price">$${item.price}</span>
            </p>`
    }).join("")

    orderHTML += `
        <hr>
        <p>
            <span class="name">Total Price:</span>
            <span class="price">$${totalPrice}</span>
        </p>`

    orderDetail.innerHTML = orderHTML

    if (orderList.length != 0) {
        orderContainer.style.display = "flex"
    } else {
        orderContainer.style.display = "none"
    }

    if(!modal.contains(e.target)){
        modal.style.display = "none"
    }
    
    if (e.target.id === "complete") {
        modal.style.display = "flex"
    }    
})

modal.addEventListener("submit", function (e) {
    e.preventDefault()
    const formData = new FormData(modal)
    const card = Object.fromEntries(formData.entries())
    
    modal.style.display = "none"
    orderContainer.style.display = "none"
    orderDetail.innerHTML = ""
    orderList.length = 0

    thanks.innerHTML = `Thanks, ${card.name}!<br>Your order is on its way!`
    thanks.style.display = "block"
})