document.addEventListener("DOMContentLoaded", function() {


	


	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
		backFocus: false,
  		placeFocusBack: false,
		Carousel: {
			Thumbs: {
				type: "classic",
				Carousel: {
					center: (ref) => {
						return (
						!ref.isVertical() || ref.getTotalSlideDim() > ref.getViewportDim()
						);
					},
					vertical: false,
					breakpoints: {
						"(min-width: 1024px)": {
						vertical: true,
						},
					},
				},
			},
		},
	});


	//datepicker
	flatpickr(".frm-field-input.field-datepicker .form-input", {
		firstDayOfWeek: 0,
		disableMobile: "true",
		minDate: "today",
		dateFormat: "Y-m-d",
		locale: "ru",
		disable: [
			function(date) {
				// disable every multiple of 8
				//return !(date.getDate() % 8);
			}
		]
	});


	//files add
	const fileBlocks = document.querySelectorAll('.js-field-file');
	
	fileBlocks.forEach(fileBlock => {
		const fileInput = fileBlock.querySelector('.js-field-input');
		const fileAttachButton = fileBlock.querySelector('.js-file-button-attach');
		const fileDeleteButton = fileBlock.querySelector('.js-file-button-del');
		const fileName = fileBlock.querySelector('.file-name');
	
		fileAttachButton.addEventListener('click', function() {
			fileInput.click();
		});
	
		fileInput.addEventListener('change', function() {
			if (fileInput.files.length > 0) {
				fileName.textContent = fileInput.files[0].name;
				fileBlock.classList.add('file-active');
			} else {
				fileName.textContent = '';
				fileBlock.classList.remove('file-active');
			}
		});
	
		fileDeleteButton.addEventListener('click', function(e) {
			e.preventDefault();
			fileName.textContent = '';
			fileBlock.classList.remove('file-active');
			fileInput.value = null;
		});
	});

	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});

	//mask phone
	let telInputs = document.querySelectorAll('input[type="tel"]:not(.frm-field-phone input[type="tel"])');
	if (telInputs.length > 0) {
		let im = new Inputmask("+7 (999) 999-99-99");
		im.mask(telInputs);
	}
    const phoneInput = document.querySelector('input[type="tel"]');
	const emailInput = document.querySelector('input[type="email"]');
    if (phoneInput) {
        const phoneContainer = phoneInput.closest('.frm-field-input');

        phoneInput.addEventListener('input', function() {
            const digits = this.value.replace(/\D/g, '');
            const isValid = digits.length === 11;
            updateValidationClass(phoneContainer, isValid);
        });
    }
    if (emailInput) {
        const emailContainer = emailInput.closest('.frm-field-input');
        
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
        
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
    }
	function updateValidationClass(container, isValid) {
		const input = container.querySelector('input');
		const hasValue = input.value.trim().length > 0;
		const isAutofilled = input.matches(':-webkit-autofill');
		const shouldBeVerified = isValid || isAutofilled;
		if (shouldBeVerified) {
			container.classList.add('inp-verify');
			container.classList.remove('inp-error');
			if (isAutofilled) {
				container.classList.add('inp-autofilled');
			} else {
				container.classList.remove('inp-autofilled');
			}
		} else {
			container.classList.remove('inp-verify', 'inp-autofilled');
			
			if (hasValue) {
				container.classList.add('inp-error');
			} else {
				container.classList.remove('inp-error');
			}
		}
	}
    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

	//search toggle
	const searchToggleButton = document.getElementById('searchToggleButton')
	const searchButton = document.getElementById('searchButton')
	searchToggleButton.addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		searchButton.click();
		return false;
	});
	

	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')

	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')

			// select phone country
			// function updatePhoneInputPlaceholder(selectElement) {
			// 	const phoneFieldWrapper = selectElement.closest('.frm-field-phone');
				
			// 	if (phoneFieldWrapper) {
			// 		const activeButton = selectElement.querySelector('.js-popup-block .active');
					
			// 		if (activeButton) {
			// 			const placeholderElement = activeButton.querySelector('.button-placeholder');
						
			// 			if (placeholderElement) {
			// 				const phoneInput = phoneFieldWrapper.querySelector('.form-input');
							
			// 				if (phoneInput) {
			// 					phoneInput.placeholder = placeholderElement.textContent;
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)

				//updatePhoneInputPlaceholder(element);
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					const currentSelect = this.closest('.js-popup-select');
					
					currentSelect.closest('.js-popup-wrap').classList.add('select-active');
					
					if (currentSelect.querySelector('.js-popup-block .active')) {
						currentSelect.querySelector('.js-popup-block .active').classList.remove('active');
					}
					
					this.classList.add('active');
					
					let popupElementActive = currentSelect.querySelector('.js-popup-block .active').innerHTML;
					let popupElementButton = currentSelect.querySelector('.js-btn-popup-toggle');
					popupElementButton.innerHTML = '';
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive);
					
					// updatePhoneInputPlaceholder(currentSelect);
					
					popupElementsClear();
					popupElementsClose();
					
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				});
			}
		}
	})
	function popupElementsContentPositionClass() {
		const wrapEl = document.querySelector('.wrap')
		const wrapWidth = wrapEl ? wrapEl.offsetWidth : 0
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (let i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			return false
		})
	}
	for (let i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block') && !event.target.closest('.js-btn-popup-toggle')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (let i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						return false
					}
				})
			}
		}
	})
	// time select → form-input
	document.querySelectorAll('.frm-field-select.js-popup-wrap').forEach(function(wrap) {
		const input = wrap.querySelector('.form-input');
		const radios = wrap.querySelectorAll('.frm-field-time input[type="radio"]');

		if (!input || !radios.length) return;

		function syncTimeInput() {
			const checked = wrap.querySelector('.frm-field-time input[type="radio"]:checked');
			input.value = checked ? checked.value : '';
		}

		syncTimeInput(); // при загрузке, если есть checked

		radios.forEach(function(radio) {
			radio.addEventListener('change', syncTimeInput);
		});
	});


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().split(' ').indexOf(tabsNavElementActive) > -1) {
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			//e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				//e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box');
	let popupTimer = null;

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
		element.addEventListener("click", function (e) {
			document.querySelector(".popup-outer-box")?.classList.remove("active");
			document.body.classList.add("popup-open");
			if (popupTimer) {
			clearTimeout(popupTimer);
			popupTimer = null;
			}
			
			for (let i = 0; i < popupsList.length; i++) {
			popupsList[i].classList.remove("active");
			}

			popupCurrent = this.getAttribute("data-popup");
			const popupElement = document.querySelector(`.popup-outer-box[id="${popupCurrent}"]`);
			popupElement.classList.add("active");

			const timerValue = this.getAttribute("data-popup-timer");
			if (timerValue) {
			const timerMs = parseInt(timerValue);
			if (!isNaN(timerMs) && timerMs > 0) {
				popupTimer = setTimeout(function() {
				document.body.classList.remove("popup-open");
				document.body.classList.remove("popup-open-scroll");
				popupElement.classList.remove("active");
				popupTimer = null;
				}, timerMs);
			}
			}

			e.preventDefault();
			//e.stopPropagation();
			return false;
		});
	});

	document.querySelectorAll(".js-popup-close").forEach(function (element) {
		element.addEventListener("click", function (event) {
			if (popupTimer) {
			clearTimeout(popupTimer);
			popupTimer = null;
			}
			
			document.body.classList.remove("popup-open");
			for (let i = 0; i < popupsList.length; i++) {
			popupsList[i].classList.remove("active");
			}
			event.preventDefault();
			//event.stopPropagation();
		});
	});
	window.openPopupMessage = function(selector) {
		const popupElement = document.querySelector(selector);
		if (!popupElement) return;
	  
		document.body.classList.add('popup-open');
		popupElement.classList.add('active');
	};

	// document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	// 	element.addEventListener("click", function (event) {
	// 		if (!event.target.closest(".popup-box")) {
	// 		if (popupTimer) {
	// 			clearTimeout(popupTimer);
	// 			popupTimer = null;
	// 		}
			
	// 		document.body.classList.remove("popup-open");
	// 		document.body.classList.remove("popup-open-scroll");
	// 		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
	// 			e.classList.remove("active");
	// 		});
	// 		return false;
	// 		}
	// 	});
	// });


	//slider
	const sliderstiles = document.querySelectorAll(".slider-tiles");
	
	sliderstiles.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tiles-pagination");
		const nextEl = container.querySelector(".button-slider-tiles-next");
		const prevEl = container.querySelector(".button-slider-tiles-prev");
	
		if (!swiperEl) return;
		const hasAutoHeight = container.dataset.height === "auto";
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: hasAutoHeight,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextMBtn = container.querySelector('.button-slider-photos-main-next');
		const prevMBtn = container.querySelector('.button-slider-photos-main-prev');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			threshold: 5,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: {
				nextEl: nextTBtn,
				prevEl: prevTBtn,
			},
			breakpoints: {
				1024: {
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: nextMBtn,
				prevEl: prevMBtn,
			},
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});



	//slider
	const sliderstest = document.querySelectorAll(".slider-test");
	
	sliderstest.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-test-pagination");
		const nextEl = container.querySelector(".button-slider-test-next");
		const prevEl = container.querySelector(".button-slider-test-prev");
		const valueEl = container.querySelector(".slider-pagination-value");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: false,
				type: 'progressbar',
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			simulateTouch: false,
			allowTouchMove: false,
			mousewheel: false,
			keyboard: {
				enabled: false,
			},
			on: {
				init: function() {
					updateProgress(this, valueEl);
				},
				slideChange: function() {
					updateProgress(this, valueEl);
				},
				progress: function(swiper, progress) {
					updateProgress(swiper, valueEl);
				}
			},
		});
	});
	function updateProgress(swiper, valueEl) {
		if (!valueEl) return;
		
		const progress = swiper.progress;
		// Преобразуем в проценты (от 0 до 100)
		const percentage = Math.round(progress * 100);
		
		// Выводим процент
		valueEl.textContent = percentage + '%';
	}

})

