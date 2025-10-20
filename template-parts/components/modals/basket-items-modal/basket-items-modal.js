import {openModal} from "../../../../src/js/modal.js";

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    initBasketModal();
});

const initBasketModal = () => {
    openModal('.open-basket', '.basket-items-modal-wrapper', '#basket-items-wrapper')

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button')
        if (!btn) return

        if (!btn.classList.contains('incr') && !btn.classList.contains('decr')) return

        let item = btn.closest('.modal-basket-item');
        if (!item) return

        let quantity = item.dataset.quantity ? parseFloat(item.dataset.quantity) : 1

        const weight = item.dataset.weight ? parseFloat(item.dataset.weight) : 1
        const price = item.dataset.price ? parseFloat(item.dataset.price) : 1

        const priceElement = item.querySelector('.modal-basket-item-price span')
        const weightElement = item.querySelector('.modal-basket-item-weight span')

        if (btn.classList.contains('incr')) {
            quantity = quantity + 1;
        }

        if (btn.classList.contains('decr')) {
            quantity = quantity - 1;
            if (0 >= quantity) return;
        }

        weightElement.textContent = (weight * quantity).toFixed(0);
        priceElement.textContent = (price * quantity).toFixed(0);
        item.dataset.quantity = quantity;
        updateBasketQuantity(item.dataset.cart_item_key, quantity);

        updateTotalPrice()
    });

    document.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('button.delete')
        if (deleteBtn) {
            const basketItem = deleteBtn.closest('.modal-basket-item')
            if (!basketItem) {
                return;
            }

            const cartItemKey = basketItem.dataset.cart_item_key;
            const nonce = document.querySelector('input[name="delete_nonce"]').value;

            fetch(ajax_object.ajax_url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({
                    action: 'delete_product_from_cart',
                    cart_item_key: cartItemKey,
                    nonce: nonce
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        basketItem.remove();
                        updateTotalPrice();
                        showEmptyBasket(data.data.cart_count);
                        updateBasketCount(data.data.cart_count);
                    }
                });
        }
    });
}

window.updateTotalPrice = () => {
    const basketItems = document.querySelectorAll('.modal-basket-item')
    let totalPrice = 0

    basketItems.forEach(item => {
        const priceElement = item.querySelector('.modal-basket-item-price span')
        totalPrice += parseFloat(priceElement.textContent)
    })

    const totalElement = document.querySelector('.modal-basket-total-price span')
    if (totalElement) {
        totalElement.textContent = totalPrice.toFixed(0)
    }
}

window.showEmptyBasket = (count = 0) => {
    const emptyBasketModal = document.querySelector('.empty-basket-modal')
    const itemsBasketModal = document.querySelector('.basket-items-modal')
    if (!emptyBasketModal || !itemsBasketModal) return

    if (0 >= count) {
        emptyBasketModal.classList.remove('hided')
        itemsBasketModal.classList.add('hided')
    } else {
        emptyBasketModal.classList.add('hided')
        itemsBasketModal.classList.remove('hided')
    }
}

const updateBasketQuantity = (cartItemKey, quantity) => {
    const nonce = document.querySelector('input[name="delete_nonce"]').value;

    fetch(ajax_object.ajax_url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            action: 'update_product_quantity',
            cart_item_key: cartItemKey,
            quantity: quantity,
            nonce: nonce
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {

            }
        });
}

document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('button.close')
    if (!closeBtn) {
        return;
    }

    const modal = closeBtn.closest('.basket-items-modal-wrapper')
    if (!modal) {
        return;
    }

    modal.classList.remove('opened')
});
