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

	// table added wrapper
	const tables = document.querySelectorAll('table');
  
	tables.forEach(function(table) {
	  const parent = table.parentElement;
	  const hasWrapper = parent && parent.classList.contains('table-inner-wrap');
	  
	  if (!hasWrapper) {
		const wrapper = document.createElement('div');
		wrapper.className = 'table-inner-wrap';
		table.parentNode.insertBefore(wrapper, table);
		wrapper.appendChild(table);
	  }
	});

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
		const box = btn.closest('.popup-share-box');
	
		const url   = (box && box.dataset.shareUrl)   || window.location.href;
		const title = (box && box.dataset.shareTitle) || document.title;
		const text  = (box && box.dataset.shareText)  || '';
		
		const payload = url;
	
		//  title + link
		// const payload = `${title}\n${url}`;
	
		navigator.clipboard.writeText(payload)
			.then(showCopyTooltip)
			.catch(() => {
				if (fallbackCopy(payload)) showCopyTooltip();
			});
	});
	
	
  });


  //share script
  (function () {
    'use strict';
    const SHARE_BUILDERS = {
        whatsapp: ({ url, text }) =>
            `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,

        telegram: ({ url, text }) =>
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,

        vk: ({ url, title }) =>
            `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,

        ok: ({ url, title }) =>
            `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,

        max: ({ url, text }) =>
            `https://max.ru/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };

    // VK и OK popup 600x400
    const POPUP_SHARE = new Set(['vk', 'ok']);

    function getShareData(block) {
        return {
            url:   block.dataset.shareUrl   || location.href,
            title: block.dataset.shareTitle || document.title,
            text:  block.dataset.shareText  || document.title
        };
    }

    function openShare(link, network, shareUrl) {
        if (POPUP_SHARE.has(network)) {
            const w = 600, h = 400;
            const left = (screen.width  - w) / 2;
            const top  = (screen.height - h) / 2;
            const popup = window.open(
                shareUrl, 'share_' + network,
                `width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`
            );
            if (popup) popup.focus();
            // Если попап заблокирован — фолбэк на новую вкладку
            else window.open(shareUrl, '_blank', 'noopener');
        } else {
            // Для остальных — обычная новая вкладка через href+target="_blank"
            link.href = shareUrl;
        }
    }
    document.addEventListener('click', function (e) {
        const link = e.target.closest('[data-share]');
        if (!link) return;

        const block   = link.closest('[data-share-url]');
        if (!block) return;

        const network = link.dataset.share;
        const builder = SHARE_BUILDERS[network];
        if (!builder) return;

        const shareUrl = builder(getShareData(block));

        if (POPUP_SHARE.has(network)) {
            e.preventDefault();
            openShare(link, network, shareUrl);
        } else {
            // Просто подставляем href — браузер откроет в новой вкладке (target="_blank")
            link.href = shareUrl;
        }
    });

    // Опционально: проставить href заранее (для SEO/доступности и preflight)
    function hydrate(root = document) {
        root.querySelectorAll('[data-share-url]').forEach(block => {
            const data = getShareData(block);
            block.querySelectorAll('[data-share]').forEach(link => {
                const builder = SHARE_BUILDERS[link.dataset.share];
                if (builder) link.href = builder(data);
            });
        });
    }

    hydrate();

    // Если контент подгружается динамически — можно вызвать window.initShareBlocks(container)
    window.initShareBlocks = hydrate;
})();