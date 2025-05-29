import { openModal } from "./modal"

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	initBasketModal()
	initAddToBasketModal()
})

const initBasketModal = () => {
	const basketCount = document.querySelector('.busket-count')
	if (!basketCount) return

	const basketCountContent = Number(basketCount.textContent)
	console.log(typeof(basketCountContent))

	if (basketCountContent < 1) {
		openModal('.open-basket', '.basket-modal-wrapper', '#empty-basket-modal-wrapper')
	}
}

const initAddToBasketModal = () => {
	openModal('.call-basket', '.add-to-basket-modal-wrapper', '#add-to-basket-modal-wrapper')
}
