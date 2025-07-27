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

                modal.querySelector('input[name="price"]').value = hiddenInfo.querySelector('.category-hidden-price span').textContent
                modal.querySelector('input[name="weight"]').value = hiddenInfo.querySelector('.category-hidden-weight span').textContent
                modal.querySelector('input[name="quantity"]').value = 1

                const cardImg = card.querySelector('.category-card-img img')
                if (cardImg) {
                    modal.querySelector('.modal-basket-img img').src = cardImg.src
                    modal.querySelector('.modal-basket-img img').alt = cardImg.alt
                }
            }
        })
    })

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button')
        if (!btn) return

        if (!btn.classList.contains('incr') && !btn.classList.contains('decr')) return

        const modal = btn.closest('.add-to-basket-modal');
        if (!modal) return

        let quantityInp = modal.querySelector('input[name="quantity"]');
        if (!quantityInp) return;

        let priceInp = modal.querySelector('input[name="price"]');
        if (!priceInp) return;

        let weightInp = modal.querySelector('input[name="weight"]');
        if (!weightInp) return;

        const priceElement = modal.querySelector('.modal-basket-price .item-price');
        const weightElement = modal.querySelector('.modal-basket-weight .item-weight');
        const price = parseFloat(priceInp.value);
        const weight = parseFloat(weightInp.value);

        if (btn.classList.contains('incr')) {
            let quantity = parseFloat(quantityInp.value) + 1;

            weightElement.textContent = (weight * quantity).toFixed(2);
            priceElement.textContent = (price * quantity).toFixed(0);
            quantityInp.value = quantity;
        }

        if (btn.classList.contains('decr')) {
            let quantity = parseFloat(quantityInp.value) - 1;
            if (0 >= quantity) return;

            weightElement.textContent = (weight * quantity).toFixed(2);
            priceElement.textContent = (price * quantity).toFixed(0);
            quantityInp.value = quantity;
        }
    });

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