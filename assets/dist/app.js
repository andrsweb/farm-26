/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js_source/app.js":
/*!*********************************!*\
  !*** ./assets/js_source/app.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_parts_template_parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../template-parts/template-parts.js */ "./template-parts/template-parts.js");


/***/ }),

/***/ "./assets/less/styles.less":
/*!*********************************!*\
  !*** ./assets/less/styles.less ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearAllBodyScrollLocks: function() { return /* binding */ clearAllBodyScrollLocks; },
/* harmony export */   disableBodyScroll: function() { return /* binding */ disableBodyScroll; },
/* harmony export */   enableBodyScroll: function() { return /* binding */ enableBodyScroll; }
/* harmony export */ });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};

var clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  } else if (!locks.length) {
    restoreOverflowSetting();
  }
};



/***/ }),

/***/ "./src/js/common/global.js":
/*!*********************************!*\
  !*** ./src/js/common/global.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTargetElement: function() { return /* binding */ getTargetElement; },
/* harmony export */   setTargetElement: function() { return /* binding */ setTargetElement; }
/* harmony export */ });
var targetElement;
var getTargetElement = function getTargetElement() {
  return targetElement;
};
var setTargetElement = function setTargetElement(element) {
  return targetElement = element;
};

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   openModal: function() { return /* binding */ openModal; }
/* harmony export */ });
/* harmony import */ var body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-scroll-lock */ "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js");
/* harmony import */ var _common_global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/global.js */ "./src/js/common/global.js");


var openModal = function openModal(callButtonSelector, wrapperSelector, lockId) {
  var callModalButtons = document.querySelectorAll(callButtonSelector);
  var modalWrapper = document.querySelector(wrapperSelector);
  var closeButton = modalWrapper ? modalWrapper.querySelector('.close') : null;
  if (!callModalButtons.length || !modalWrapper) return;
  callModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var targetElement = document.querySelector(lockId);
      (0,_common_global_js__WEBPACK_IMPORTED_MODULE_1__.setTargetElement)(targetElement);
      if (!modalWrapper.classList.contains('opened')) {
        (0,body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__.disableBodyScroll)((0,_common_global_js__WEBPACK_IMPORTED_MODULE_1__.getTargetElement)(), {
          reserveScrollBarGap: true
        });
        modalWrapper.classList.add('opened');
      }
    });
  });
  var closeModal = function closeModal() {
    var targetElement = document.querySelector(lockId);
    (0,_common_global_js__WEBPACK_IMPORTED_MODULE_1__.setTargetElement)(targetElement);
    if (modalWrapper.classList.contains('opened')) {
      (0,body_scroll_lock__WEBPACK_IMPORTED_MODULE_0__.enableBodyScroll)((0,_common_global_js__WEBPACK_IMPORTED_MODULE_1__.getTargetElement)());
      modalWrapper.classList.remove('opened');
    }
  };
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      closeModal();
    });
  }
  modalWrapper.addEventListener('click', function (e) {
    if (e.target === modalWrapper) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalWrapper.classList.contains('opened')) {
      closeModal();
    }
  });
};

/***/ }),

/***/ "./template-parts/components/checkout/checkout.js":
/*!********************************************************!*\
  !*** ./template-parts/components/checkout/checkout.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/js/modal.js */ "./src/js/modal.js");

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  initShippingZones();
  initAcceptPublicOffer();
  initSubmitCheckoutForm();
  initValidationErrors();
  console.log('loaded checkout.js');
});
var initShippingZones = function initShippingZones() {
  var shippingSelect = document.getElementById('shipping_zone');
  if (!shippingSelect) return;
  shippingSelect.addEventListener('change', function (e) {
    var selectedOption = e.target.selectedOptions[0];
    if (!selectedOption) return;
    var fieldset = document.getElementById('shipping_methods_fieldset');
    var title = fieldset.querySelector('legend');
    var labels = fieldset.querySelectorAll('label');
    var preloader = document.createElement('div');
    preloader.className = 'preloader';
    labels.forEach(function (label) {
      return label.remove();
    });
    fieldset.appendChild(preloader);
    fetch(ajax_object.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'get_city_shipping_methods',
        shipping_zone_id: selectedOption.value
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success) {
        preloader.remove();
        fieldset.insertAdjacentHTML('beforeend', data.data.html);
        updateTotalCost();
      }
    });
  });
  shippingSelect.dispatchEvent(new Event('change', {
    bubbles: true
  }));
  document.addEventListener('change', function (e) {
    if (e.target.closest('input[name="shipping_method"]')) {
      updateTotalCost();
    }
  });
};
var initAcceptPublicOffer = function initAcceptPublicOffer() {
  var acceptPublicOfferCheckbox = document.getElementById('accept_public_offer');
  if (!acceptPublicOfferCheckbox) return;
  acceptPublicOfferCheckbox.addEventListener('change', function (e) {
    var submitButton = document.querySelector('form[name="checkout"] button[type="submit"]');
    if (!submitButton) return;
    submitButton.disabled = !e.target.checked;
  });
};
var initSubmitCheckoutForm = function initSubmitCheckoutForm() {
  var checkoutForm = document.querySelector('form[name="checkout"]');
  if (!checkoutForm) return;
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateFields(checkoutForm)) {
      return false;
    }
    var formData = new FormData(checkoutForm);
    formData.append('action', 'submit_checkout_form');
    fetch(ajax_object.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success) {
        (0,_src_js_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)('.open-thank-you-modal', '.thank-you-modal-wrapper', '#thank-you-modal-wrapper');
        var openThankYouModal = document.querySelector('.open-thank-you-modal');
        if (openThankYouModal) {
          var orderNumberElement = document.querySelector('.thank-you-modal .order-num');
          orderNumberElement.innerHTML = data.data.order_text;
          openThankYouModal.click();
          document.addEventListener('click', function (e) {
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
};
var initValidationErrors = function initValidationErrors() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('label.error-label')) {
      var errorLabel = e.target.closest('label.error-label');
      errorLabel.classList.remove('error-label');
    }
  });
  var phoneInput = document.getElementById('userphone');
  phoneInput === null || phoneInput === void 0 || phoneInput.addEventListener('input', function (e) {
    var _parts$;
    var value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.startsWith('8')) {
      value = value.slice(1);
    } else if (!value.startsWith('7')) {
      value = '7' + value;
    }
    var parts = [value.slice(1, 4), value.slice(4, 7), value.slice(7, 9), value.slice(9, 11)];
    var out = '+7';
    if (parts[0]) out += ' (' + parts[0];
    if (((_parts$ = parts[0]) === null || _parts$ === void 0 ? void 0 : _parts$.length) === 3) out += ')';
    if (parts[1]) out += ' ' + parts[1];
    if (parts[2]) out += '-' + parts[2];
    if (parts[3]) out += '-' + parts[3];
    e.target.value = out;
  });
};
var updateTotalCost = function updateTotalCost() {
  var checkedShippingMethod = document.querySelector('input[name="shipping_method"]:checked');
  var shippingZone = document.getElementById('shipping_zone');
  var orderAsideInner = document.querySelector('.order-aside-inner');
  if (!checkedShippingMethod || !orderAsideInner || !shippingZone) {
    return;
  }
  fetch(ajax_object.ajax_url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'update_total_cost',
      shipping_method_id: checkedShippingMethod.value,
      shipping_zone_id: shippingZone.value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.success) {
      var oldAsideInfo = orderAsideInner.querySelector('.order-aside-info');
      if (oldAsideInfo) {
        oldAsideInfo.remove();
      }
      orderAsideInner.insertAdjacentHTML('afterbegin', data.data.aside_info);
    }
  });
};
var validateFields = function validateFields(checkoutForm) {
  var errors = false;
  var fields = checkoutForm.querySelectorAll('input[required], select[required], textarea[required]');
  fields === null || fields === void 0 || fields.forEach(function (field) {
    var label = field.closest('label');
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
};
var validateRussianPhone = function validateRussianPhone(phone) {
  var regex = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  return regex.test(phone.trim());
};

/***/ }),

/***/ "./template-parts/components/modals/add-to-basket-modal/add-to-basket-modal.js":
/*!*************************************************************************************!*\
  !*** ./template-parts/components/modals/add-to-basket-modal/add-to-basket-modal.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/js/modal.js */ "./src/js/modal.js");

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  initAddToBasketForm();
  initAddToBasketModal();
});
var initAddToBasketModal = function initAddToBasketModal() {
  var callBasketButtons = document.querySelectorAll('.call-basket');
  callBasketButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      var card = e.target.closest('.category-card');
      if (!card) return;
      var hiddenInfo = card.querySelector('.category-card-hidden-info');
      var modal = document.querySelector('.add-to-basket-modal');
      if (hiddenInfo && modal) {
        var productId = card.getAttribute('data-product_id');
        var unit = card.getAttribute('data-unit');
        var productIdInp = modal.querySelector('input[name="product_id"]');
        productIdInp.value = productId;
        modal.querySelector('h3').textContent = hiddenInfo.querySelector('h4').textContent;
        modal.querySelector('.modal-basket-texts').innerHTML = hiddenInfo.querySelector('.category-hidden-texts').innerHTML;
        modal.querySelector('.modal-basket-price .item-price').textContent = hiddenInfo.querySelector('.category-hidden-price span').textContent;
        modal.querySelector('.modal-basket-weight .item-weight').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent;
        modal.querySelector('.calc-value').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent;
        modal.querySelector('input[name="price"]').value = hiddenInfo.querySelector('.category-hidden-price span').textContent;
        modal.querySelector('input[name="weight"]').value = hiddenInfo.querySelector('.category-hidden-weight span').textContent;
        modal.querySelector('input[name="quantity"]').value = 1;
        modal.querySelectorAll('.unit').forEach(function (unitElem) {
          unitElem.textContent = unit;
        });
        var cardImg = card.querySelector('.category-card-img img');
        if (cardImg) {
          modal.querySelector('.modal-basket-img img').src = cardImg.src;
          modal.querySelector('.modal-basket-img img').alt = cardImg.alt;
        }
      }
    });
  });
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    if (!btn.classList.contains('incr') && !btn.classList.contains('decr')) return;
    var modal = btn.closest('.add-to-basket-modal');
    if (!modal) return;
    var quantityInp = modal.querySelector('input[name="quantity"]');
    if (!quantityInp) return;
    var priceInp = modal.querySelector('input[name="price"]');
    if (!priceInp) return;
    var weightInp = modal.querySelector('input[name="weight"]');
    if (!weightInp) return;
    var priceElement = modal.querySelector('.modal-basket-price .item-price');
    var weightElement = modal.querySelector('.modal-basket-weight .item-weight');
    var price = parseFloat(priceInp.value);
    var weight = parseFloat(weightInp.value);
    var quantity = parseFloat(quantityInp.value) || 1;
    if (btn.classList.contains('incr')) {
      quantity = quantity + 1;
    }
    if (btn.classList.contains('decr')) {
      quantity = quantity - 1;
      if (0 >= quantity) return;
    }
    var weightTotal = weight * quantity;
    var rounded = Math.round(weightTotal * 10) / 10;
    var weightText = Math.abs(rounded - Math.round(rounded)) < 1e-9 ? String(Math.round(rounded)) : rounded.toFixed(1);
    weightElement.textContent = weightText;
    priceElement.textContent = (price * quantity).toFixed(0);
    quantityInp.value = quantity;
  });
  (0,_src_js_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)('.call-basket', '.add-to-basket-modal-wrapper', '#add-to-basket-modal-wrapper');
};
var initAddToBasketForm = function initAddToBasketForm() {
  var addToBasketForm = document.querySelector('form[name="add_to_basket_form"]');
  if (addToBasketForm) {
    addToBasketForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var productId = e.target.querySelector('input[name="product_id"]').value;
      var quantity = e.target.querySelector('input[name="quantity"]').value;
      var nonce = e.target.querySelector('input[name="nonce"]').value;
      var modalBasketItemsInner = document.querySelector('.modal-basket-items-inner');
      fetch(ajax_object.ajax_url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          action: 'add_product_to_cart',
          product_id: productId,
          quantity: quantity,
          nonce: nonce
        })
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.success) {
          updateBasket();
          showEmptyBasket(data.data.cart_count);
          modalBasketItemsInner.innerHTML = data.data.items_html;
          updateBasketCount(data.data.cart_count);
          updateTotalPrice();
          var closeModalButton = document.querySelector('.add-to-basket-modal .close');
          if (closeModalButton) {
            closeModalButton.click();
          }
        }
      });
      return false;
    });
  }
};
window.updateBasket = function () {
  var openBasketButton = document.querySelector('.open-basket');
  if (!openBasketButton) return;
  openBasketButton.click();
};
window.updateBasketCount = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var openBasketElement = document.querySelector('.open-basket');
  if (!openBasketElement) return;
  var basketWrapper = openBasketElement.querySelector('.basket-wrapper');
  if (!basketWrapper) return;
  var basketCountElement = basketWrapper.querySelector('.basket-count');
  if (!basketCountElement && 0 < count) {
    openBasketElement.classList.remove('open-empty-basket');
    openBasketElement.classList.add('open-full-basket');
    basketCountElement = document.createElement('span');
    basketCountElement.classList.add('basket-count');
    basketWrapper.prepend(basketCountElement);
  }
  if (basketCountElement && 0 >= count) {
    openBasketElement.classList.add('open-empty-basket');
    openBasketElement.classList.remove('open-full-basket');
    basketCountElement.remove();
    return;
  }
  basketCountElement.textContent = count;
};

/***/ }),

/***/ "./template-parts/components/modals/basket-items-modal/basket-items-modal.js":
/*!***********************************************************************************!*\
  !*** ./template-parts/components/modals/basket-items-modal/basket-items-modal.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/js/modal.js */ "./src/js/modal.js");

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  initBasketModal();
});
var initBasketModal = function initBasketModal() {
  (0,_src_js_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)('.open-basket', '.basket-items-modal-wrapper', '#basket-items-wrapper');
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    if (!btn.classList.contains('incr') && !btn.classList.contains('decr')) return;
    var item = btn.closest('.modal-basket-item');
    if (!item) return;
    var quantity = item.dataset.quantity ? parseFloat(item.dataset.quantity) : 1;
    var weight = item.dataset.weight ? parseFloat(item.dataset.weight) : 1;
    var price = item.dataset.price ? parseFloat(item.dataset.price) : 1;
    var priceElement = item.querySelector('.modal-basket-item-price span');
    var weightElement = item.querySelector('.modal-basket-item-weight span');
    if (btn.classList.contains('incr')) {
      quantity = quantity + 1;
    }
    if (btn.classList.contains('decr')) {
      quantity = quantity - 1;
      if (0 >= quantity) return;
    }
    var weightTotal = weight * quantity;
    var rounded = Math.round(weightTotal * 10) / 10;
    var weightText = Math.abs(rounded - Math.round(rounded)) < 1e-9 ? String(Math.round(rounded)) : rounded.toFixed(1);
    weightElement.textContent = weightText;
    priceElement.textContent = (price * quantity).toFixed(0);
    item.dataset.quantity = quantity;
    updateBasketQuantity(item.dataset.cart_item_key, quantity);
    updateTotalPrice();
  });
  document.addEventListener('click', function (e) {
    var deleteBtn = e.target.closest('button.delete');
    if (deleteBtn) {
      var basketItem = deleteBtn.closest('.modal-basket-item');
      if (!basketItem) {
        return;
      }
      var cartItemKey = basketItem.dataset.cart_item_key;
      var nonce = document.querySelector('input[name="delete_nonce"]').value;
      fetch(ajax_object.ajax_url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          action: 'delete_product_from_cart',
          cart_item_key: cartItemKey,
          nonce: nonce
        })
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.success) {
          basketItem.remove();
          updateTotalPrice();
          showEmptyBasket(data.data.cart_count);
          updateBasketCount(data.data.cart_count);
        }
      });
    }
  });
};
window.updateTotalPrice = function () {
  var basketItems = document.querySelectorAll('.modal-basket-item');
  var totalPrice = 0;
  basketItems.forEach(function (item) {
    var priceElement = item.querySelector('.modal-basket-item-price span');
    totalPrice += parseFloat(priceElement.textContent);
  });
  var totalElement = document.querySelector('.modal-basket-total-price span');
  if (totalElement) {
    totalElement.textContent = totalPrice.toFixed(0);
  }
};
window.showEmptyBasket = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var emptyBasketModal = document.querySelector('.empty-basket-modal');
  var itemsBasketModal = document.querySelector('.basket-items-modal');
  if (!emptyBasketModal || !itemsBasketModal) return;
  if (0 >= count) {
    emptyBasketModal.classList.remove('hided');
    itemsBasketModal.classList.add('hided');
  } else {
    emptyBasketModal.classList.add('hided');
    itemsBasketModal.classList.remove('hided');
  }
};
var updateBasketQuantity = function updateBasketQuantity(cartItemKey, quantity) {
  var nonce = document.querySelector('input[name="delete_nonce"]').value;
  fetch(ajax_object.ajax_url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'update_product_quantity',
      cart_item_key: cartItemKey,
      quantity: quantity,
      nonce: nonce
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.success) {}
  });
};
document.addEventListener('click', function (e) {
  var closeBtn = e.target.closest('button.close');
  if (!closeBtn) {
    return;
  }
  var modal = closeBtn.closest('.basket-items-modal-wrapper');
  if (!modal) {
    return;
  }
  modal.classList.remove('opened');
});

/***/ }),

/***/ "./template-parts/components/search/search.js":
/*!****************************************************!*\
  !*** ./template-parts/components/search/search.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  initSearchBar();
});
var initSearchBar = function initSearchBar() {
  var searchBar = document.querySelector('.search-bar');
  var searchInput = document.getElementById('search-bar-input');
  var searchLabel = document.querySelector('.search-bar-label');
  if (!searchInput || !searchLabel) return;
  searchInput.addEventListener('change', function (e) {
    var query = e.target.value.trim();
    if (!query) {
      searchLabel.classList.remove('show-clear');
    } else {
      searchLabel.classList.add('show-clear');
    }
  });
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('search-bar-clear')) {
      searchInput.value = '';
      searchLabel.classList.remove('show-clear');
      searchBar.classList.remove('active');
      searchInput.dispatchEvent(new Event('change', {
        bubbles: true
      }));
    }
    if (e.target.classList.contains('mobile-search')) {
      searchBar.classList.toggle('active');
    }
  });
};

/***/ }),

/***/ "./template-parts/template-parts.js":
/*!******************************************!*\
  !*** ./template-parts/template-parts.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modals_add_to_basket_modal_add_to_basket_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/modals/add-to-basket-modal/add-to-basket-modal.js */ "./template-parts/components/modals/add-to-basket-modal/add-to-basket-modal.js");
/* harmony import */ var _components_modals_basket_items_modal_basket_items_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modals/basket-items-modal/basket-items-modal.js */ "./template-parts/components/modals/basket-items-modal/basket-items-modal.js");
/* harmony import */ var _components_checkout_checkout_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/checkout/checkout.js */ "./template-parts/components/checkout/checkout.js");
/* harmony import */ var _components_search_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/search/search.js */ "./template-parts/components/search/search.js");





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/app": 0,
/******/ 			"styles": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgulp"] = self["webpackChunkgulp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["styles"], function() { return __webpack_require__("./assets/js_source/app.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["styles"], function() { return __webpack_require__("./assets/less/styles.less"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map