// animation
const animationItems = document.querySelectorAll('.animation-item')
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach(e => {
			e.isIntersecting && e.target.classList.add('animation-active')
		})
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options)
	for (let e of animationItems) observer.observe(e)
}

/* hide plashka */
let scrollWidthFunc = () => {
	let scrollWidth = window.innerWidth - document.body.clientWidth
	document.querySelector('html').style.paddingRight = scrollWidth + 'px'
	document.querySelector('header').style.paddingRight = scrollWidth + 'px'
}
const scrollTop = document.querySelector('.scroll-top')
if (scrollTop)
	scrollTop.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
;['load', 'resize'].forEach(event => {
	window.addEventListener(event, function () {
		let headerHeight = header.clientHeight
		const plashka = header.querySelector('.header__plashka')
		if (plashka) {
			var originalHeightPlashka = plashka.offsetHeight
		}
		window.onscroll = function (e) {
			if (window.scrollY > headerHeight) {
				if (!plashka.classList.contains('hide')) {
					plashka.classList.add('hide')
					plashka.style.height = '0px'
				}
			} else {
				plashka.style.height = originalHeightPlashka + 'px'
				plashka.classList.remove('hide')
			}
		}
	})
})
/* end hide plashka */

document.addEventListener('DOMContentLoaded', function () {
	/* burger menu */
	const burgerMenu = document.querySelector('.burger__menu')
	if (burgerMenu) {
		const headerMobile = document.querySelector('.header__bottom')
		const header = document.querySelector('.header')
		const plashka = document.querySelector('.header__plashka')
		burgerMenu.addEventListener('click', () => {
			if (burgerMenu.classList.contains('burger__menu--active')) {
				plashka.style.display = 'block'
				document.body.classList.remove('lock')
			} else {
				plashka.style.display = 'none'
			}
			headerMobile.classList.toggle('header__bottom--active')
			burgerMenu.classList.toggle('burger__menu--active')
			header.classList.toggle('header--active')

			document.querySelector('html').classList.toggle('burger-lock')
		})
	}
	/* end burger menu */

	/* Mask phone */
	;[].forEach.call(
		document.querySelectorAll('input[type=tel]'),
		function (input) {
			let keyCode
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode)
				let pos = this.selectionStart
				if (pos < 3) event.preventDefault()
				let matrix = '+7 (___) ___ ____',
					i = 0,
					def = matrix.replace(/\D/g, ''),
					val = this.value.replace(/\D/g, ''),
					new_value = matrix.replace(/[_\d]/g, function (a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					})
				i = new_value.indexOf('_')
				if (i != -1) {
					i < 5 && (i = 3)
					new_value = new_value.slice(0, i)
				}
				let reg = matrix
					.substr(0, this.value.length)
					.replace(/_+/g, function (a) {
						return '\\d{1,' + a.length + '}'
					})
					.replace(/[+()]/g, '\\$&')
				reg = new RegExp('^' + reg + '$')
				if (
					!reg.test(this.value) ||
					this.value.length < 5 ||
					(keyCode > 47 && keyCode < 58)
				)
					this.value = new_value
				if (event.type == 'blur' && this.value.length < 5) this.value = ''
			}

			input.addEventListener('input', mask, false)
			input.addEventListener('focus', mask, false)
			input.addEventListener('blur', mask, false)
			input.addEventListener('keydown', mask, false)
		}
	)
	/* End Mask phone */


	/* Mask name */
	function handleNameInput(event) {
		let input = event.target;
		let value = input.value;
		let errorMessage = input.nextElementSibling;

		let regex = /^[а-яёА-ЯЁ\s]*$/;
		
		if (!regex.test(value)) {
			input.value = value.replace(/[^а-яёА-ЯЁ\s]/g, '');
			errorMessage.style.display = 'block'; 
		} else {
			errorMessage.style.display = 'none'; 
		}
	}
	document.querySelectorAll('.name-input').forEach(function(input) {
		input.addEventListener('input', handleNameInput);
	});
	/* End mask name */

	function isValidPhoneNumber(phoneNumber) {
		phoneNumber = phoneNumber.replace(/\D/g, '');
		if (phoneNumber.length !== 11) {
			return false;
		}
		for (let i = 0; i <= 2; i++) {
			const segment = phoneNumber.substring(i, i + 9);
			if (/^(\d)\1{8}$/.test(segment)) {
				return false;
			}
		}
		return true;
	}

	function isValidName(name) {
		const letterCount = (name.match(/[a-zA-Zа-яА-Я]/g) || []).length;
		return letterCount >= 2;
	}



	/* Form popup  */
	document.querySelectorAll('.send-btn').forEach(button => {
		button.addEventListener('click', function(event) {
			const form = this.closest('form');

			const phoneInput = form.querySelector('input[type=tel]');
			const phoneNumber = phoneInput ? phoneInput.value : '';

			const nameInput = form.querySelector('.name-input');
			const name = nameInput ? nameInput.value : '';

			if (isValidPhoneNumber(phoneNumber) && isValidName(name)) {
				this.setAttribute('data-path', 'popup-ok');
			} else {
				this.setAttribute('data-path', 'popup-error');
			}

			const popupPath = this.getAttribute('data-path');
			const popup = document.querySelector(`.${popupPath}`);
			event.preventDefault();
		});
	});
	/* End form popup  */



	/*  Popups  */
	function popupClose(popupActive) {
		popupActive.classList.remove('open')
		document.body.classList.remove('lock')
		document.querySelector('html').removeAttribute('style')
		document.querySelector('html').classList.remove('lock')
		document.querySelector('header').removeAttribute('style')
	}

	const popupOpenBtns = document.querySelectorAll('.popup-btn')
	const popups = document.querySelectorAll('.popup')
	const closePopupBtns = document.querySelectorAll('.close-popup')
	closePopupBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			popupClose(e.target.closest('.popup'))
		})
	})

	popupOpenBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault()
			const path = e.currentTarget.dataset.path
			const currentPopup = document.querySelector(`[data-target="${path}"]`)
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup)
					popup.addEventListener('click', function (e) {
						if (!e.target.closest('.popup__content')) {
							popupClose(e.target.closest('.popup'))
						}
					})
				})
				currentPopup.classList.add('open')
				document.querySelector('html').classList.add('lock')
			}
		})
	})
	/*  end popups  */


	/* yandex map */
	const mapPlaceholder = document.getElementById('map-placeholder');
	if (mapPlaceholder) {
		mapPlaceholder.addEventListener('mouseenter', loadMap, { once: true });
		mapPlaceholder.addEventListener('click', loadMap, { once: true });
	}

	
	function loadMap() {
		if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
			script.onload = initMap;
			document.head.appendChild(script);
		} else {
			initMap();
		}
	}
	
	function initMap() {
		const mapPlaceholder = document.getElementById('map-placeholder');
		if (mapPlaceholder) {
			mapPlaceholder.remove();
		}
	
		ymaps.ready(function () {
			const myMap = new ymaps.Map('map', {
				center: [54.698291, 56.001927],
				zoom: 15,
				controls: []
			});
	
			const myPlacemark = new ymaps.Placemark(
				[54.696382, 56.004505],
				{
					hintContent: 'г. Уфа, ул Авроры, дом 5/12',
					balloonContent: 'г. Уфа, ул Авроры, дом 5/12'
				},
			);
	
			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable(['scrollZoom']);
		});
	}
	/* end yandex map */


	/*  FAQ  */
	const acc = document.getElementsByClassName('faq__accordion')
	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function () {
			const faqBtn = this.querySelector('.faq__more')
			faqBtn.classList.toggle('faq__more--active')

			const faqItem = this.closest('.faq__item');
			faqItem.classList.toggle('faq__item--active');

			const panel = this.nextElementSibling
			if (panel.style.display === 'block') {
				panel.style.display = 'none'
			} else {
				panel.style.display = 'block'
			}
		})
	}
	/*  End FAQ   */

	/*  accordion price  */
	const priceAcc = document.getElementsByClassName('price__accordion')
	for (let i = 0; i < priceAcc.length; i++) {
		priceAcc[i].addEventListener('click', function () {
			if (window.innerWidth < 1020) {
				const faqBtn = this.querySelector('.price__more')
				faqBtn.classList.toggle('price__more--active')

				const faqText = this.nextElementSibling
				faqText.classList.toggle('price__content--active')
			}
		})
	}
	/* end accordion price  */


	/*  footer accordion  */
	const footerNav = document.getElementsByClassName('footer__nav')
	for (let i = 0; i < footerNav.length; i++) {
		footerNav[i].addEventListener('click', function () {
			if (window.innerWidth < 1000) {
				const footerBtn = this.querySelector('.footer__nav_title')
				footerBtn.classList.toggle('footer__nav_title--active')

				const panel = this.querySelector('.footer__nav_list')
				if (panel.style.display === 'flex') {
					panel.style.display = 'none'
				} else {
					panel.style.display = 'flex'
				}
			}
		})
	}
	/*  end footer accordion  */



	/*  Slaider  */

	const doctorsSwiper = new Swiper('.doctorsSwiper', {
		slidesPerView: 1.2,
		spaceBetween: 8,
		freeMode: true,
		pagination: {
			el: '.doctors__swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.doctors__swiper-button-next',
			prevEl: '.doctors__swiper-button-prev',
		},
		breakpoints: {
			1150: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			860: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			550: {
				slidesPerView: 2,
				spaceBetween: 13,
			},
		},
	})

	const commentsSwiper = new Swiper('.commentsSwiper', {
		slidesPerView: 1.14,
		spaceBetween: 10,
		navigation: {
			nextEl: '.comments__swiper-button-next',
			prevEl: '.comments__swiper-button-prev',
		},
		breakpoints: {
			830: {
				slidesPerView: 2,
			},
			650: {
				slidesPerView: 1.44,
			},
		},
	})

	const stocksSwiper = new Swiper('.stocksSwiper', {
		slidesPerView: 1.14,
		spaceBetween: 10,
		navigation: {
			nextEl: '.stocks__swiper-button-next',
			prevEl: '.stocks__swiper-button-prev',
		},
		breakpoints: {
			830: {
				slidesPerView: 2,
			},
			650: {
				slidesPerView: 1.44,
			},
		},
	})

	const articlesSwiper = new Swiper('.articlesSwiper', {
		slidesPerView: 1.14,
		spaceBetween: 10,
		navigation: {
			nextEl: '.articles__swiper-button-next',
			prevEl: '.articles__swiper-button-prev',
		},
		breakpoints: {
			1060: {
				slidesPerView: 3,
			},
			760: {
				slidesPerView: 2,
			},
		},
	})

	const centersSwiper = new Swiper('.centersSwiper', {
		slidesPerView: 1.15,
		spaceBetween: 10,
		navigation: {
			nextEl: '.centers__swiper-button-next',
			prevEl: '.centers__swiper-button-prev',
		},
		breakpoints: {
			600: {
				slidesPerView: 1,
			},
		},
	})

	const doctorLicensesSwiper = new Swiper('.doctorLicensesSwiper', {
		slidesPerView: 1.2,
		spaceBetween: 10,
		freeMode: true,
		navigation: {
			nextEl: '.doctor-licenses__swiper-button-next',
			prevEl: '.doctor-licenses__swiper-button-prev',
		},

		breakpoints: {
			1070: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
			640: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			500: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
		},
	})
	/*  End slaider  */



	/* navigation  */
	// service Navigation
	const serviceNavigation = document.querySelector('.navigation')
	if (serviceNavigation) {
		const jsScrollBlockList = document.querySelectorAll(
			'.text__content h1, .text__content h2, .text__content h3'
		)

		if (jsScrollBlockList.length > 0) {
			for (let i = 0; i < jsScrollBlockList.length; i += 1) {
				const jsScrollBlock = jsScrollBlockList[i]
				const titleBlock = jsScrollBlock.textContent
				const serviceNavigationList = document.querySelector(
					'.navigation__item ul'
				)
				const serviceNavigationItem = document.createElement('li')
				const serviceNavigationLink = document.createElement('a')
				serviceNavigationItem.classList.add('navigation__list-item')
				serviceNavigationLink.classList.add('navigation__link')
				jsScrollBlock.setAttribute('id', `${i}`)
				serviceNavigationLink.setAttribute('href', `$${i}`)
				serviceNavigationLink.textContent = ' ' + titleBlock
				serviceNavigationItem.append(serviceNavigationLink)
				serviceNavigationList.append(serviceNavigationItem)
			}
			document.querySelectorAll('a[href^="$"').forEach(link => {
				link.addEventListener('click', function (e) {
					e.preventDefault()
					let href = this.getAttribute('href').substring(1)
					const scrollTarget = document.getElementById(href)
					const topOffset = 280
					const elementPosition = scrollTarget.getBoundingClientRect().top
					const offsetPosition = elementPosition - topOffset
					window.scrollBy({
						top: offsetPosition,
						behavior: 'smooth',
					})
				})
			})
		} else {
			serviceNavigation.querySelector('.navigation__item').remove()
		}
	}

	//article navigation
	const articleNavigation = document.querySelector('.article__navigation');
	if (articleNavigation) {
    const jsScrollBlockList = document.querySelectorAll(
        '.text__content h1, .text__content h2, .text__content h3'
    );

    if (jsScrollBlockList.length > 0) {
        let currentH2List = null;
        for (let i = 0; i < jsScrollBlockList.length; i += 1) {
            const jsScrollBlock = jsScrollBlockList[i];
            const titleBlock = jsScrollBlock.textContent;
            const articleNavigationList = document.querySelector('.article__navigation_item ul');
            const articleNavigationItem = document.createElement('li');
            const articleNavigationLink = document.createElement('a');
            articleNavigationItem.classList.add('navigation__list-item');
            articleNavigationLink.classList.add('navigation__link');
            jsScrollBlock.setAttribute('id', `${i}`);
            articleNavigationLink.setAttribute('href', `#${i}`);
            articleNavigationLink.textContent = ' ' + titleBlock;
            articleNavigationItem.append(articleNavigationLink);

            if (jsScrollBlock.tagName === 'H2') {
                currentH2List = document.createElement('ul');
				currentH2List.classList.add('article__subnavigation_list');  
                articleNavigationItem.append(currentH2List);
                articleNavigationList.append(articleNavigationItem);
            } else if (jsScrollBlock.tagName === 'H3' && currentH2List) {
                const subListItem = document.createElement('li');
                subListItem.classList.add('navigation__sublist-item');
                subListItem.append(articleNavigationLink);
                currentH2List.append(subListItem);
            } else {
                articleNavigationList.append(articleNavigationItem);
            }
        }
        
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let href = this.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = 280;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            });
        });
    } else {
        articleNavigation.querySelector('.navigation__item').remove();
    }
}
	/* end navigation  */



	/*  pop-up menu  */
	const list = document.querySelectorAll('.hide-item');
	const tabButtons = document.querySelectorAll('.tab__btn');
	const header = document.querySelector('.header');

	function accordion(e) {
		e.stopPropagation();
		const isActive = this.classList.contains('hide-item--active');
		list.forEach(item => item.classList.remove('hide-item--active'));

		if (!isActive) {
			this.classList.add('hide-item--active');
			document.body.classList.add('lock');
			document.querySelector('html').classList.add('burger-lock');
		} else {
			document.body.classList.remove('lock');
			document.querySelector('html').classList.remove('burger-lock');
		}
		header.classList.toggle('header--active', !isActive);
	}

	list.forEach(item => {
		item.addEventListener('click', accordion);
	});

	document.addEventListener('click', function (e) {
		if (!e.target.closest('.header__bottom_nav') && !e.target.closest('.tab__btn')) {
			list.forEach(item => item.classList.remove('hide-item--active'));
			header.classList.remove('header--active');
			document.body.classList.remove('lock');
			document.querySelector('html').classList.remove('burger-lock');
		}
	});
	/*  end pop-up menu  */



	/*  tab  */
	const showTab = elTabBtn => {
		const elTab = elTabBtn.closest('.tab');
		if (elTabBtn.classList.contains('tab__btn--active')) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tabcontent[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector('.tab__btn--active');
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove('tab__btn--active');
		}

		const elTabPaneShow = elTab.querySelectorAll('.tabcontent--active');
		elTabPaneShow.forEach(pane => pane.classList.remove('tabcontent--active'));

		elTabBtn.classList.add('tab__btn--active');
		elTabPanes.forEach(pane => pane.classList.add('tabcontent--active'));
	};

	tabButtons.forEach(btn => {
		btn.addEventListener('click', function (e) {
			e.stopPropagation(); 
			showTab(this);


			document.querySelectorAll('.menu__sublist_btn').forEach(button => {
				const sublist = button.previousElementSibling;
				if (sublist.scrollHeight <= maxHeight) {
					button.style.display = 'none';
				} else {
					button.style.display = 'block';
				}
			});
		});
	});
	/*  end tab */


	/* open more submenu  */

	const maxHeight = 138; 
	document.querySelector('.hide-item_service').addEventListener('click', () => {
		document.querySelectorAll('.menu__sublist_btn').forEach(button => {
			const sublist = button.previousElementSibling;
			if (sublist.scrollHeight <= maxHeight) {
				button.style.display = 'none';
			} else {
				button.style.display = 'block';
			}
		});
	});

	document.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', function(event) {
			event.stopPropagation();
			const sublist = this.nextElementSibling;
			if (sublist && sublist.classList.contains('menu__sublist')) {
				sublist.classList.toggle('open');
			}
		});
	});

	document.querySelectorAll('.menu__sublist_btn').forEach(button => {
		button.addEventListener('click', function(event) {
			event.stopPropagation();
			const sublist = this.previousElementSibling; 
			if (sublist && sublist.classList.contains('menu__sublist')) {
				sublist.classList.toggle('open'); 
				
				if (sublist.classList.contains('open')) {
					this.textContent = 'Скрыть';
				} else {
					this.textContent = 'Еще';
				}
			}
		});
	});
	/* end open more submenu  */


	/*  show/hide other services */
    const otherServicesBtn = document.querySelector('.other-services__btn');
    const extraItems = document.querySelectorAll('.other-services__list .extra');

    function handleButtonClick() {
        const isVisible = extraItems[0].style.display === 'block';

        extraItems.forEach(item => {
            item.style.display = isVisible ? 'none' : 'block';
        });
        otherServicesBtn.querySelector('span').textContent = isVisible ? 'Весь список' : 'Скрыть';
        if (!isVisible) {
            otherServicesBtn.classList.add('active');
        } else {
            otherServicesBtn.classList.remove('active');
        }
    }

    function updateView() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 760) {
            extraItems.forEach(item => {
                item.style.display = 'none';
            });
            otherServicesBtn.querySelector('span').textContent = 'Весь список';
            otherServicesBtn.classList.remove('active');
            otherServicesBtn.style.display = 'block';
        } else {
            extraItems.forEach(item => {
                item.style.display = 'block';
            });
            otherServicesBtn.style.display = 'none';
        }
    }
	if (otherServicesBtn) {
		otherServicesBtn.addEventListener('click', handleButtonClick);
	}
    window.addEventListener('resize', updateView);
    updateView();
	/*  end other services */

})



/*  read more text-block  */
function checkBlockHeight() {
    const maxBlockHeight = window.innerHeight; 
    const contentBlocks = document.querySelectorAll('.text-block__contant');
    
    for (let i = 0; i < contentBlocks.length; i++) {
        const contentBlock = contentBlocks[i];
		const button = contentBlock.nextElementSibling;

        if (contentBlock.scrollHeight <= maxBlockHeight) {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    }
}
window.addEventListener('resize', checkBlockHeight);
window.addEventListener('load', checkBlockHeight);


function checkCommentBlockHeight() {
	const maxCommentBlockHeight = 110; 
    const commentContentBlocks = document.querySelectorAll('.comment__content');
    const commentButtons = document.querySelectorAll('.comment__more-btn');
    
    for (let i = 0; i < commentContentBlocks.length; i++) {
        const contentBlock = commentContentBlocks[i];
        const button = commentButtons[i];
        
        if (contentBlock.scrollHeight <= maxCommentBlockHeight) {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    }
}
window.addEventListener('resize', checkCommentBlockHeight);
window.addEventListener('load', checkCommentBlockHeight);


const buttons = document.querySelectorAll('.text-block__more-btn');
for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener('click', function () {
        const contentBlock = button.previousElementSibling;
        contentBlock.classList.toggle('text-block__contant--active');
        button.classList.toggle('text-block__more-btn--active');
        button.innerText = button.innerText === 'Скрыть' ? 'Читать полностью' : 'Скрыть';
    });
}
/*  end read more text-block  */



/*  search */
document.addEventListener('DOMContentLoaded', function () {
	let inputSearch = document.querySelectorAll('input[type=search]')
	if (inputSearch.length > 0) {
		inputSearch.forEach(elem => {
			const wrapper = elem.closest('.search-wrapper')
			if (wrapper) {
				const searchResultBlock = wrapper.querySelector('.popup__search-result')
				const popularCitiesBlock = wrapper.querySelector('.popup__search-city')
				const noResultsMessage = searchResultBlock.querySelector('.no-results-message')
				const resultCount = searchResultBlock.querySelector('.no-results-message span');

				function search() {
					let filter = elem.value.toUpperCase()
					let ul = wrapper.querySelectorAll('.search-list')
					let totalResults = 0

					ul.forEach(item => {
						let li = item.getElementsByTagName('li')
						for (let i = 0; i < li.length; i++) {
							let a = li[i].querySelector('.search-name')
							if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
								li[i].classList.remove('none')
								totalResults++
							} else {
								li[i].classList.add('none')
							}
						}
					})
					if(totalResults !== 0) {
						noResultsMessage.innerHTML = 'По вашему запросу найдено: <span>' + totalResults + '</span>';
					}
					else {
						noResultsMessage.innerText = 'По вашему запросу ничего не найдено'
					}
					

					if (elem.value.trim() === '') {
						searchResultBlock.classList.add('none')
						popularCitiesBlock.classList.remove('none')
					} else {
						searchResultBlock.classList.remove('none')
						popularCitiesBlock.classList.add('none')
					}
				}
				elem.addEventListener('input', search)
			}
		})
	}
})
/*  end search  */



/* Select  */
const selectSingle = document.querySelectorAll('.select');
for (let i = 0; i < selectSingle.length; i++) {
	const selectSingle_title = selectSingle[i].querySelector('.select__title');
	selectSingle_title.addEventListener('click', () => {
		if ('active' === selectSingle[i].getAttribute('data-state')) {
			selectSingle[i].setAttribute('data-state', '');
		} else {
			selectSingle[i].setAttribute('data-state', 'active');
		}
	});
	const selectSingle_labels = selectSingle[i].querySelectorAll('.select__label');
	for (let j = 0; j < selectSingle_labels.length; j++) {
		selectSingle_labels[j].addEventListener('click', (evt) => {
		selectSingle_title.textContent = evt.target.textContent;
		selectSingle_title.style.color = "#292929";
		selectSingle[i].setAttribute('data-state', '');
		});
	}
}
/* End select  */

