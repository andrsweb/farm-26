import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'

export const openModal = (callButtonSelector, wrapperSelector, lockId) => {
    const callModalButtons = document.querySelectorAll(callButtonSelector)
    const modalWrapper = document.querySelector(wrapperSelector)
    const closeButton = modalWrapper ? modalWrapper.querySelector('.close') : null

    if (!callModalButtons.length || !modalWrapper) return

    callModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetElement = document.querySelector(lockId)
            setTargetElement(targetElement)

            if (!modalWrapper.classList.contains('opened')) {
                disableBodyScroll(getTargetElement(), { reserveScrollBarGap: true })
                modalWrapper.classList.add('opened')
            }
        })
    })

    const closeModal = () => {
        const targetElement = document.querySelector(lockId)
        setTargetElement(targetElement)

        if (modalWrapper.classList.contains('opened')) {
            enableBodyScroll(getTargetElement())
            modalWrapper.classList.remove('opened')
        }
    }

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
}