document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	toggleBurgerMenu()
})

const toggleBurgerMenu = () => {
	const header = document.querySelector('.header')
	const burgerButton = header?.querySelector('.burger-button')
	const burgerMenu = header?.querySelector('.hidden-menu')

	if(!header || !burgerButton || !burgerMenu) return

	burgerButton.addEventListener('click', () => {
		header.classList.toggle('opened')
	})
}