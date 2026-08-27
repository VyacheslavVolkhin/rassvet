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
	
	
  });