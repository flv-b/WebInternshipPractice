const hamburgerMenuButton = document.querySelector('#menu-icon');
const sideBarMenu = document.querySelector('#sidebar');
const closeMenuButton = document.querySelector('#close-menu');

const category2Subitems = [
  { label: 'Category 2.1' },
  { label: 'Category 2.2' },
  { label: 'Category 2.3' },
];

const category4Subitems = [
  { label: 'Category 4.1' },
  { label: 'Category 4.2' },
];

const menuItems = [
  { label: 'Doctors', imageSrc: 'assets/menu-icons/doctors.svg', subitems: [] },
  { label: 'Locations', imageSrc: 'assets/menu-icons/locations.svg' },
  {
    label: 'Specialisations',
    imageSrc: 'assets/menu-icons/specialisations.svg',
  },
  { label: 'Prices', imageSrc: 'assets/menu-icons/prices.svg' },
  {
    label: 'Useful',
    imageSrc: 'assets/menu-icons/help.svg',
    subitems: [
      { label: 'Category 1' },
      {
        label: 'Category 2',
        subitems: category2Subitems,
      },
      { label: 'Category 3' },
      { label: 'Category 4', subitems: category4Subitems },
    ],
  },
];

const menuItemsEl = document.getElementById('sidebar-menu-items');

hamburgerMenuButton.onclick = (e) => {
  e.preventDefault();
  sideBarMenu.classList.add('menu-open');
};

closeMenuButton.onclick = (closeEvent) => {
  closeEvent.preventDefault();
  sideBarMenu.classList.remove('menu-open');
};

sideBarMenu.onclick = (e) => e.preventDefault();

document.onclick = (event) => {
  if (
    event.defaultPrevented === false &&
    !event.target.closest('.sidebar-wrapper')
  )
    sideBarMenu.classList.remove('menu-open');
};

const addItemExpandIcon = (parentEl, iconSrc) => {
  const expandIconEl = document.createElement('img');
  expandIconEl.classList.add('open-close-icon');
  expandIconEl.src = iconSrc;
  expandIconEl.width = 35;
  expandIconEl.height = 35;
  expandIconEl.classList.add('ml-auto');
  parentEl.appendChild(expandIconEl);
  return expandIconEl;
};

const getSubitems = (subitems, depth = 1) => {
  const subitemsContainer = document.createElement('div');
  subitemsContainer.classList.add('column', 'd-none');
  subitems.forEach((item) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item', 'row', 'align-center');
    const itemLabelEl = document.createTextNode(item.label);
    itemEl.appendChild(itemLabelEl);
    itemEl.classList.add(`menu-depth-${depth}`);
    subitemsContainer.appendChild(itemEl);
    if (item.subitems?.length) {
      const openArrow = addItemExpandIcon(
        itemEl,
        'assets/menu-icons/open-accordion.svg'
      );
      const closeArrow = addItemExpandIcon(
        itemEl,
        'assets/menu-icons/close-accordion.svg'
      );
      closeArrow?.classList.add('d-none');
      let subitemsEl = getSubitems(item.subitems, depth + 1);
      itemEl.addEventListener('click', () => {
        toggleSubmenu(subitemsEl);
        openArrow?.classList.toggle('d-none');
        closeArrow?.classList.toggle('d-none');
      });
      subitemsContainer.appendChild(subitemsEl);
    }
  });
  return subitemsContainer;
};

const toggleSubmenu = (elementToToggle) =>
  elementToToggle?.classList.toggle('d-none');
menuItems.forEach((item) => {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item', 'row', 'align-center');
  const itemImgEl = document.createElement('img');
  itemImgEl.src = item.imageSrc;
  itemEl.appendChild(itemImgEl);
  const itemLabelEl = document.createTextNode(item.label);
  itemEl.appendChild(itemLabelEl);
  let subitemsContainer;
  if (item.subitems?.length) {
    const openArrow = addItemExpandIcon(itemEl, 'assets/menu-icons/open-accordion-white.svg');
    const closeArrow = addItemExpandIcon(
      itemEl,
      'assets/menu-icons/close-accordion.svg'
    );
    closeArrow?.classList.add('d-none');
    subitemsContainer = getSubitems(item.subitems);
    itemEl.addEventListener('click', () => {
      toggleSubmenu(subitemsContainer);
      openArrow?.classList.toggle('d-none');
      closeArrow?.classList.toggle('d-none');
    });
  }

  menuItemsEl.appendChild(itemEl);
  if (subitemsContainer) menuItemsEl.appendChild(subitemsContainer);
});
