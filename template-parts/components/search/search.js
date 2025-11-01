document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    initSearchBar();
});

const initSearchBar = () => {
    const searchBar = document.querySelector('.search-bar');
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
            searchBar.classList.remove('active');
            searchInput.dispatchEvent(new Event('change', {bubbles: true}));
        }

        if (e.target.classList.contains('mobile-search')) {
            searchBar.classList.toggle('active');
        }

    });
}