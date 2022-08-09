const hamburgerMenuButton = document.querySelector('#menu-icon');
const sideBarMenu = document.querySelector('#sidebar');
const closeMenuButton = document.querySelector('#close-menu');

hamburgerMenuButton.onclick = (e) => {
  e.preventDefault();
  sideBarMenu.classList.add('menu-open');
};

closeMenuButton.onclick = (closeEvent) => {
  closeEvent.preventDefault();
  sideBarMenu.classList.remove('menu-open');
};

sideBarMenu.onclick = e => e.preventDefault();

document.onclick = (event) => {
  if (event.defaultPrevented === false && !event.target.closest('.sidebar-wrapper'))
    sideBarMenu.classList.remove('menu-open');
};
