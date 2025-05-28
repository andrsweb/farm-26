import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'

export const openModal = (callButton, wrapper, lockId) => {
	const callModalButton = document.querySelector(callButton)
	const modalWrapper = document.querySelector(wrapper)
	const closeButton = modalWrapper.querySelector('.close')

	if (!callModalButton || !modalWrapper) return

	callModalButton.addEventListener('click', () => {
		setTargetElement(document.querySelector(lockId))
		console.log('click')

		if (!modalWrapper.classList.contains('opened')) {
			disableBodyScroll(getTargetElement(), { reserveScrollBarGap: true })
			modalWrapper.classList.add('opened')
		}
	})

	if (closeButton) {
		closeButton.addEventListener('click', () => {
			closeModal()
		})
	}

	modalWrapper.addEventListener('click', (e) => {
		if (e.target === modalWrapper) {
			closeModal()
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalWrapper.classList.contains('opened')) {
			closeModal()
		}
	})

	const closeModal = () => {
		setTargetElement(document.querySelector(lockId))

		if (modalWrapper.classList.contains('opened')) {
			enableBodyScroll(getTargetElement())
			modalWrapper.classList.remove('opened')
		}
	}
}
