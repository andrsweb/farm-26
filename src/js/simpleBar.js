import SimpleBar from 'simplebar'

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	initSimpleBar()
})

const initSimpleBar = () => {
	const scrollableElements = document.querySelectorAll('[data-simplebar]')
	scrollableElements.forEach(element => {
		new SimpleBar(element, {
			autoHide: false,
			scrollbarMinSize: 8
		})
	})
}