import { openModal } from "./modal"

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	initBasketModal()
	initAddToBasketModal()
})

const initBasketModal = () => {
	const basketCount = document.querySelector('.basket-count')
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

				const initialPrice = parseFloat(priceElement.textContent)
				const initialWeight = parseFloat(weightElement.textContent)

				incrButton.addEventListener('click', () => {
					const currentPrice = parseFloat(priceElement.textContent)
					const currentWeight = parseFloat(weightElement.textContent)
					
					priceElement.textContent = (currentPrice + initialPrice).toFixed(2)
					weightElement.textContent = (currentWeight + initialWeight).toFixed(2)
				})

				decrButton.addEventListener('click', () => {
					const currentPrice = parseFloat(priceElement.textContent)
					const currentWeight = parseFloat(weightElement.textContent)
					
					if (currentPrice <= initialPrice || currentWeight <= initialWeight) return
					
					priceElement.textContent = (currentPrice - initialPrice).toFixed(2)
					weightElement.textContent = (currentWeight - initialWeight).toFixed(2)
				})
			}
		})
	})

	openModal('.call-basket', '.add-to-basket-modal-wrapper', '#add-to-basket-modal-wrapper')
}