import { menuArray } from "./data.js"

const main = document.querySelector("main div.main")

const menu = menuArray.map(item => {
    return `
    <div id="${item.id}" class="item">
        <span class="icon">${item.emoji}</span>
        <div class="description">
            <span class="name">${item.name}</span>
            <span class="ingredients">${item.ingredients.join(", ")}</span>
            <span class="price">$${item.price}</span>
        </div>
        <button class="add">
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
    `
}).join("")

console.log(menu)

main.innerHTML = menu