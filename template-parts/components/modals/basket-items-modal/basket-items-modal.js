import {openModal} from "../../../../src/js/modal";

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    initBasketModal();
});

const initBasketModal = () => {
    const basketCount = document.querySelector('.basket-count')
    if (!basketCount) return

    const basketCountContent = Number(basketCount.textContent)

    if (basketCountContent < 1) {
        openModal('.open-basket', '.basket-modal-wrapper', '#empty-basket-modal-wrapper')
    } else {
        openModal('.open-basket', '.basket-items-modal-wrapper', '#basket-items-wrapper')

        const basketItems = document.querySelectorAll('.modal-basket-item')
        basketItems.forEach(item => {
            const incrButton = item.querySelector('.incr')
            const decrButton = item.querySelector('.decr')
            const weight = item.dataset.weight ? parseFloat(item.dataset.weight) : 1
            const price = item.dataset.price ? parseFloat(item.dataset.price) : 1
            let quantity = item.dataset.quantity ? parseFloat(item.dataset.quantity) : 1
            const priceElement = item.querySelector('.modal-basket-item-price span')
            const weightElement = item.querySelector('.modal-basket-item-weight span')

            incrButton.addEventListener('click', () => {
                quantity = parseFloat(quantity + 1)

                weightElement.textContent = (weight * quantity).toFixed(2)
                priceElement.textContent = (price * quantity).toFixed(0)

                item.dataset.quantity = quantity

                updateTotalPrice()
            })

            decrButton.addEventListener('click', () => {
                quantity = parseFloat(quantity - 1)
                if (0 >= quantity) {
                    quantity = 1

                    return;
                }

                weightElement.textContent = (weight * quantity).toFixed(2)
                priceElement.textContent = (price * quantity).toFixed(0)
                console.log(weight);
                console.log(quantity);
                item.dataset.quantity = quantity

                updateTotalPrice()
            })
        })
    }
}

const updateTotalPrice = () => {
    const basketItems = document.querySelectorAll('.modal-basket-item')
    let totalPrice = 0

    basketItems.forEach(item => {
        const priceElement = item.querySelector('.modal-basket-item-price span')
        totalPrice += parseFloat(priceElement.textContent)
    })

    const totalElement = document.querySelector('.modal-basket-total-price span')
    if (totalElement) {
        totalElement.textContent = totalPrice.toFixed(2)
    }
}
