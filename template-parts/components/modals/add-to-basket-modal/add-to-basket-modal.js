import {openModal} from "../../../../src/js/modal";

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    initAddToBasketForm();
    initAddToBasketModal();
});

const initAddToBasketModal = () => {
    const callBasketButtons = document.querySelectorAll('.call-basket')

    callBasketButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.category-card')
            if (!card) return

            const hiddenInfo = card.querySelector('.category-card-hidden-info')
            const modal = document.querySelector('.add-to-basket-modal')

            if (hiddenInfo && modal) {
                const productId = card.getAttribute('data-product_id');
                const productIdInp = modal.querySelector('input[name="product_id"]');

                productIdInp.value = productId;

                modal.querySelector('h3').textContent = hiddenInfo.querySelector('h4').textContent
                modal.querySelector('.modal-basket-texts').innerHTML = hiddenInfo.querySelector('.category-hidden-texts').innerHTML
                modal.querySelector('.modal-basket-price .item-price').textContent = hiddenInfo.querySelector('.category-hidden-price span').textContent
                modal.querySelector('.modal-basket-weight .item-weight').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent
                modal.querySelector('.calc-value').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent

                const cardImg = card.querySelector('.category-card-img img')
                if (cardImg) {
                    modal.querySelector('.modal-basket-img img').src = cardImg.src
                    modal.querySelector('.modal-basket-img img').alt = cardImg.alt
                }

                const incrButton = modal.querySelector('.incr')
                const decrButton = modal.querySelector('.decr')
                const priceElement = modal.querySelector('.modal-basket-price .item-price')
                const weightElement = modal.querySelector('.modal-basket-weight .item-weight')
                const quantityInp = modal.querySelector('input[name="quantity"]')
                let quantity = 1
                quantityInp.value = quantity

                const initialPrice = parseFloat(priceElement.textContent)
                const initialWeight = parseFloat(weightElement.textContent)

                incrButton.addEventListener('click', () => {
                    const currentPrice = parseFloat(priceElement.textContent)
                    const currentWeight = parseFloat(weightElement.textContent)

                    priceElement.textContent = (currentPrice + initialPrice).toFixed(2)
                    weightElement.textContent = (currentWeight + initialWeight).toFixed(2)
                    quantity++
                    quantityInp.value = quantity;
                })

                incrButton.addEventListener('click', () => {
                    quantity = parseFloat(quantity + 1)

                    weightElement.textContent = (weight * quantity).toFixed(2)
                    priceElement.textContent = (price * quantity).toFixed(0)

                    item.dataset.quantity = quantity

                    quantityInp.value = quantity;
                })

                decrButton.addEventListener('click', () => {
                    const currentPrice = parseFloat(priceElement.textContent)
                    const currentWeight = parseFloat(weightElement.textContent)


                    if (currentPrice <= initialPrice || currentWeight <= initialWeight) return

                    priceElement.textContent = (currentPrice - initialPrice).toFixed(2)
                    weightElement.textContent = (currentWeight - initialWeight).toFixed(2)

                    quantity--
                    quantityInp.value = 1 < quantity ? quantity : 1
                })
            }
        })
    })

    openModal('.call-basket', '.add-to-basket-modal-wrapper', '#add-to-basket-modal-wrapper')
}

const initAddToBasketForm = () => {
    const addToBasketForm = document.querySelector('form[name="add_to_basket_form"]');

    if (addToBasketForm) {
        addToBasketForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const productId = e.target.querySelector('input[name="product_id"]').value;
            const quantity = e.target.querySelector('input[name="quantity"]').value;
            const nonce = e.target.querySelector('input[name="nonce"]').value;

            fetch(ajax_object.ajax_url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({
                    action: 'add_product_to_cart',
                    product_id: productId,
                    quantity: quantity,
                    nonce: nonce
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert('Added to cart! Cart count: ' + data.data.cart_count);
                    } else {
                        alert(data.data.message || 'Error adding to cart');
                    }
                });

            return false;
        });
    }
}