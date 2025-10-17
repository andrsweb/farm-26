import {openModal} from "../../../src/js/modal.js";

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    initShippingZones();
    initAcceptPublicOffer();
    initSubmitCheckoutForm();
    initValidationErrors();
});

const initShippingZones = () => {
    const shippingSelect = document.getElementById('shipping_zone');
    if (!shippingSelect) return;

    shippingSelect.addEventListener('change', (e) => {
        const selectedOption = e.target.selectedOptions[0];
        if (!selectedOption) return;

        const fieldset = document.getElementById('shipping_methods_fieldset');
        const title = fieldset.querySelector('legend');
        const labels = fieldset.querySelectorAll('label');
        const preloader = document.createElement('div');
        preloader.className = 'preloader';

        labels.forEach(label => label.remove());

        fieldset.appendChild(preloader);

        fetch(ajax_object.ajax_url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                action: 'get_city_shipping_methods',
                shipping_zone_id: selectedOption.value,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    preloader.remove();
                    fieldset.insertAdjacentHTML('beforeend', data.data.html);
                }
            });

    });

    shippingSelect.dispatchEvent(new Event('change', {bubbles: true}));
}

const initAcceptPublicOffer = () => {
    const acceptPublicOfferCheckbox = document.getElementById('accept_public_offer');
    if (!acceptPublicOfferCheckbox) return;

    acceptPublicOfferCheckbox.addEventListener('change', (e) => {
        const submitButton = document.querySelector('button[type="submit"]');
        if (!submitButton) return;

        submitButton.disabled = !e.target.checked;
    });
}

const initSubmitCheckoutForm = () => {
    const checkoutForm = document.querySelector('form[name="checkout"]');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateFields(checkoutForm)) {
            return false;
        }

        const formData = new FormData(checkoutForm);
        formData.append('action', 'submit_checkout_form');

        fetch(ajax_object.ajax_url, {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    openModal('.open-thank-you-modal', '.thank-you-modal-wrapper', '#thank-you-modal-wrapper');
                    const openThankYouModal = document.querySelector('.open-thank-you-modal');
                    if (openThankYouModal) {
                        const orderNumberElement = document.querySelector('.thank-you-modal .order-num');
                        orderNumberElement.innerHTML = data.data.order_text;
                        openThankYouModal.click();

                        document.addEventListener('click', (e) => {
                            if (!e.target.closest('.thank-you-modal')) {
                                window.location.href = '/';
                            }
                        });

                    }

                    return false;
                }

                alert(data.data.message || 'Ошибка, повторите позже.');
            });
    });
}

const initValidationErrors = () => {
    document.addEventListener('click', (e) => {
        if (e.target.closest('label.error-label')) {
            const errorLabel = e.target.closest('label.error-label');
            errorLabel.classList.remove('error-label');
        }
    });

    const phoneInput = document.getElementById('userphone');
    phoneInput?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) value = value.slice(0, 11);

        if (value.startsWith('8')) {
            value = value.slice(1);
        } else if (!value.startsWith('7')) {
            value = '7' + value;
        }


        const parts = [
            value.slice(1, 4),
            value.slice(4, 7),
            value.slice(7, 9),
            value.slice(9, 11)
        ];

        let out = '+7';
        if (parts[0]) out += ' (' + parts[0];
        if (parts[0]?.length === 3) out += ')';
        if (parts[1]) out += ' ' + parts[1];
        if (parts[2]) out += '-' + parts[2];
        if (parts[3]) out += '-' + parts[3];

        e.target.value = out;
    });
}

const validateFields = (checkoutForm) => {
    let errors = false;
    let fields = checkoutForm.querySelectorAll('input[required], select[required], textarea[required]');

    fields?.forEach((field) => {
        const label = field.closest('label');
        if (3 >= field.value.trim().length) {
            label.classList.add('error-label');
            errors = true;
        }

        if ('tel' === field.type && !validateRussianPhone(field.value)) {
            label.classList.add('error-label');
            errors = true;
        }
    });

    return errors;
}

const validateRussianPhone = (phone) => {
    const regex = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    return regex.test(phone.trim());
}
