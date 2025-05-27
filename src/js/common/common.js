import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './global'

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
		setTargetElement(document.querySelector('#hidden-menu'))

		if(!header.classList.contains('opened')) {
			disableBodyScroll(getTargetElement(), { reserveScrollBarGap: true })
			header.classList.add('opened')
		} else {
			enableBodyScroll(getTargetElement())
			header.classList.remove('opened')
		}
	})
}