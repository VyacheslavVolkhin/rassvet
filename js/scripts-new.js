document.addEventListener('DOMContentLoaded', function () {

	//header menu submenu toogle and position
	const submenus = document.querySelectorAll('.header-menu-wrap .submenu');
	function checkAndFixSubmenuPosition() {
	  submenus.forEach(function (submenu) {
		submenu.classList.remove('pos-right');
  
		const rect = submenu.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		if (rect.right > windowWidth) {
		  submenu.classList.add('pos-right');
		}
	  });
	}
	checkAndFixSubmenuPosition();
	let resizeTimer;
	window.addEventListener('resize', function () {
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function () {
		checkAndFixSubmenuPosition();
	  }, 100); 
	});
	const menuItemsWithSubmenu = document.querySelectorAll('.header-menu-wrap .menu-main > li');
	menuItemsWithSubmenu.forEach(function (item) {
		const submenu = item.querySelector('.submenu');
		const btnMenu = item.querySelector('.btn-menu');

		if (submenu && btnMenu) {
		const toggle = document.createElement('span');
		toggle.className = 'menu-toggle';
		btnMenu.appendChild(toggle);
		}
	});
	menuItemsWithSubmenu.forEach(function (item) {
	  item.addEventListener('mouseenter', function () {
		const sub = this.querySelector('.submenu');
		if (sub) {
		  requestAnimationFrame(function () {
			checkAndFixSubmenuPosition();
		  });
		}
	  });
	});

	//header menu mobile toggle
	const menuButton = document.querySelectorAll('.header-menu-wrap li .menu-toggle');
	for (i = 0; i < menuButton.length; i++) {
	  menuButton[i].addEventListener('click', function(e) {
		if (innerWidth < 1024) {
		  if (this.parentElement.tagName === 'A') {
			e.preventDefault();
			e.stopPropagation();
			const li = this.parentElement.parentElement;
			const submenu = li.querySelector('ul');
			if (submenu) {
			  li.classList.toggle('menu-open');
			}
			return false;
		  }
		}
	  });
	}



	//new 12.09.2026

	//copy tooltip function
	function showCopyTooltip() {
		let tip = document.querySelector('.copy-tooltip');
		if (!tip) {
			tip = document.createElement('div');
			tip.className = 'copy-tooltip';
			tip.textContent = 'Ссылка скопирована в буфер обмена';
			document.body.appendChild(tip);
		}
		tip.classList.add('show');
	
		clearTimeout(showCopyTooltip._t);
		showCopyTooltip._t = setTimeout(() => tip.classList.remove('show'), 2000);
	}
	function fallbackCopy(text) {
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.style.position = 'fixed';
		ta.style.opacity = '0';
		document.body.appendChild(ta);
		ta.select();
		let ok = false;
		try { ok = document.execCommand('copy'); } catch (e) {}
		document.body.removeChild(ta);
		return ok;
	}
	document.addEventListener('click', (e) => {
		const btn = e.target.closest('.js-copy-link');
		if (!btn) return;
		e.preventDefault();
	
		navigator.clipboard.writeText(window.location.href)
			.then(showCopyTooltip)
			.catch(() => {
				if (fallbackCopy(window.location.href)) showCopyTooltip();
			});
	});
	
	
  });