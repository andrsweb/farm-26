import { openModal } from "./modal"

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	initBasketModal()
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
