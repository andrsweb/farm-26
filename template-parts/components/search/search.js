document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    initSearchBar();
});

const initSearchBar = () => {
    const searchInput = document.getElementById('search-bar-input');
    const searchLabel = document.querySelector('.search-bar-label');

    if (!searchInput || !searchLabel) return;

    searchInput.addEventListener('change', (e) => {
            const query = e.target.value.trim();
            if (!query) {
                searchLabel.classList.remove('show-clear');
            } else {
                searchLabel.classList.add('show-clear');
            }
        }
    );

    document.addEventListener('click', (e) => {

        if (e.target.classList.contains('search-bar-clear')) {
            searchInput.value = '';
            searchLabel.classList.remove('show-clear');
            searchInput.dispatchEvent(new Event('change', {bubbles: true}));
        }
    });

    return;

    searchInput.addEventListener('change', (e) => {
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
                    updateTotalCost();
                }
            });

    });

    shippingSelect.dispatchEvent(new Event('change', {bubbles: true}));

    document.addEventListener('change', (e) => {
        if (e.target.closest('input[name="shipping_method"]')) {
            updateTotalCost();
        }
    });
}