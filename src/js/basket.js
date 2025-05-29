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
	
	if (basketCountContent < 1) {
		openModal('.open-basket', '.basket-modal-wrapper', '#empty-basket-modal-wrapper')
	}
}

const initAddToBasketModal = () => {
	const callBasketButtons = document.querySelectorAll('.call-basket')
	
	callBasketButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			const card = e.target.closest('.category-card')
			if (!card) return
	
			const hiddenInfo = card.querySelector('.category-card-hidden-info')
			const modal = document.querySelector('.add-to-basket-modal')
			
			if (hiddenInfo && modal) {
				modal.querySelector('h3').textContent = hiddenInfo.querySelector('h4').textContent
				modal.querySelector('.modal-basket-texts').innerHTML = hiddenInfo.querySelector('.category-hidden-texts').innerHTML
				modal.querySelector('.modal-basket-price span:first-child').textContent = hiddenInfo.querySelector('.category-hidden-price span').textContent
				modal.querySelector('.modal-basket-weight span:first-child').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent
				modal.querySelector('.calc-value').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent
				
				const cardImg = card.querySelector('.category-card-img img')
				if (cardImg) {
					modal.querySelector('.modal-basket-img img').src = cardImg.src
					modal.querySelector('.modal-basket-img img').alt = cardImg.alt
				}
			}
		})
	})

	openModal('.call-basket', '.add-to-basket-modal-wrapper', '#add-to-basket-modal-wrapper')
}