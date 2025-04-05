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

const payment = document.querySelector("form.modal-payment")

const rating = document.querySelector("div.modal-rating")
const stars = document.querySelectorAll(".star")

const ratingText = document.getElementById("rating-value")

const thanks = document.querySelector("div.thanks")

// default the display to none
// orderContainer.style.display = "none"
// payment.style.display = "none"
// rating.style.display = "none"
// thanks.style.display = "none"

document.addEventListener("click", function (e) {
    if (e.target.dataset.add) {
        const food = menuArray.find(item =>
            item.id === parseInt(e.target.dataset.add)
        )
        console.log(food)
        thanks.style.display = "none"

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

    if (!payment.contains(e.target)) {
        payment.style.display = "none"
    }

    if (e.target.id === "complete") {
        payment.style.display = "flex"
    }

    if (!rating.contains(e.target)) {
        rating.style.display = "none"
    }

    if (e.target.id === "btn-confirm") {
        rating.style.display = "none"
    }
})

payment.addEventListener("submit", function (e) {
    e.preventDefault()
    const formData = new FormData(payment)
    const card = Object.fromEntries(formData.entries())

    payment.style.display = "none"
    orderContainer.style.display = "none"
    orderDetail.innerHTML = ""
    orderList.length = 0

    rating.style.display = "flex"

    thanks.innerHTML = `Thanks, ${card.name}!<br>Your order is on its way!`
    thanks.style.display = "block"
})

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-value');
        ratingText.textContent = `Rating: ${rating}`;

        stars.forEach(s => s.classList.remove('selected'));
        star.classList.add('selected');
        let prev = star.nextElementSibling;
        while (prev) {
            prev.classList.add('selected');
            prev = prev.nextElementSibling;
        }
    });

    star.addEventListener('mouseover', () => {
        stars.forEach(s => s.classList.remove('hover'));
        star.classList.add('hover');
        let prev = star.nextElementSibling;
        while (prev) {
            prev.classList.add('hover');
            prev = prev.nextElementSibling;
        }
    });

    star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hover'));
    });
});