/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_parts_template_parts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../template-parts/template-parts */ "./template-parts/template-parts.js");


/***/ }),

/***/ "./assets/less/styles.less":
/*!*********************************!*\
  !*** ./assets/less/styles.less ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./template-parts/components/modals/add-to-basket-modal/add-to-basket-modal.js":
/*!*************************************************************************************!*\
  !*** ./template-parts/components/modals/add-to-basket-modal/add-to-basket-modal.js ***!
  \*************************************************************************************/
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  initLoadProductToModal();
});
var initLoadProductToModal = function initLoadProductToModal() {
  var products = document.querySelectorAll('.call-basket');
  callBasketButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      var card = e.target.closest('.category-card');
      if (!card) return;
      var productId = card.getAttribute('data-product_id');
      console.log(productId);
      //
      //
      // const hiddenInfo = card.querySelector('.category-card-hidden-info')
      // const modal = document.querySelector('.add-to-basket-modal')
      //
      // if (hiddenInfo && modal) {
      //     modal.querySelector('h3').textContent = hiddenInfo.querySelector('h4').textContent
      //     modal.querySelector('.modal-basket-texts').innerHTML = hiddenInfo.querySelector('.category-hidden-texts').innerHTML
      //     modal.querySelector('.modal-basket-price .item-price').textContent = hiddenInfo.querySelector('.category-hidden-price span').textContent
      //     modal.querySelector('.modal-basket-weight .item-weight').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent
      //     modal.querySelector('.calc-value').textContent = hiddenInfo.querySelector('.category-hidden-weight span').textContent
      //
      //     const cardImg = card.querySelector('.category-card-img img')
      //     if (cardImg) {
      //         modal.querySelector('.modal-basket-img img').src = cardImg.src
      //         modal.querySelector('.modal-basket-img img').alt = cardImg.alt
      //     }
      //
      //     const incrButton = modal.querySelector('.incr')
      //     const decrButton = modal.querySelector('.decr')
      //     const priceElement = modal.querySelector('.modal-basket-price .item-price')
      //     const weightElement = modal.querySelector('.modal-basket-weight .item-weight')
      //
      //     const initialPrice = parseFloat(priceElement.textContent)
      //     const initialWeight = parseFloat(weightElement.textContent)
      //
      //     incrButton.addEventListener('click', () => {
      //         const currentPrice = parseFloat(priceElement.textContent)
      //         const currentWeight = parseFloat(weightElement.textContent)
      //
      //         priceElement.textContent = (currentPrice + initialPrice).toFixed(2)
      //         weightElement.textContent = (currentWeight + initialWeight).toFixed(2)
      //     })
      //
      //     decrButton.addEventListener('click', () => {
      //         const currentPrice = parseFloat(priceElement.textContent)
      //         const currentWeight = parseFloat(weightElement.textContent)
      //
      //         if (currentPrice <= initialPrice || currentWeight <= initialWeight) return
      //
      //         priceElement.textContent = (currentPrice - initialPrice).toFixed(2)
      //         weightElement.textContent = (currentWeight - initialWeight).toFixed(2)
      //     })
      // }
    });
  });
};

/***/ }),

/***/ "./template-parts/template-parts.js":
/*!******************************************!*\
  !*** ./template-parts/template-parts.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modals_add_to_basket_modal_add_to_basket_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/modals/add-to-basket-modal/add-to-basket-modal */ "./template-parts/components/modals/add-to-basket-modal/add-to-basket-modal.js");
/* harmony import */ var _components_modals_add_to_basket_modal_add_to_basket_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_modals_add_to_basket_modal_add_to_basket_modal__WEBPACK_IMPORTED_MODULE_0__);


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 	__webpack_require__.O(undefined, ["styles"], function() { return __webpack_require__("./assets/js/app.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["styles"], function() { return __webpack_require__("./assets/less/styles.less"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map