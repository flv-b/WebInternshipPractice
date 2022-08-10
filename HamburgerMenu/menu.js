const hamburgerMenuButton = document.querySelector('#menu-icon');
const sideBarMenu = document.querySelector('#sidebar');
const closeMenuButton = document.querySelector('#close-menu');

const category2Subitems = [
  { label: 'Category 2.1' },
  { label: 'Category 2.2' },
  { label: 'Category 2.3' },
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
      { label: 'Category 4' },
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
  expandIconEl.src = iconSrc;
  expandIconEl.width = 35;
  expandIconEl.height = 35;
  expandIconEl.classList.add('ml-auto');
  parentEl.appendChild(expandIconEl);
};

const getSubitems = (subitems, depth = 1) => {
  const subitemsContainer = document.createElement('div');
  subitemsContainer.classList.add('column');
  subitems.forEach((item) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item', 'row', 'align-center');
    const itemLabelEl = document.createTextNode(item.label);
    itemEl.appendChild(itemLabelEl);
    itemEl.classList.add(`menu-depth-${depth}`);
    subitemsContainer.appendChild(itemEl);
    if (item.subitems?.length) {
      addItemExpandIcon(itemEl, 'assets/menu-icons/open-accordion.svg');
      let subitemsEl = getSubitems(item.subitems, 2);
      subitemsContainer.appendChild(subitemsEl);
    }
  });
  return subitemsContainer;
};

menuItems.forEach((item) => {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item', 'row', 'align-center');
  const itemImgEl = document.createElement('img');
  itemImgEl.src = item.imageSrc;
  itemEl.appendChild(itemImgEl);
  const itemLabelEl = document.createTextNode(item.label);
  itemEl.appendChild(itemLabelEl);
  let extraItem;
  if (item.subitems?.length) {
    addItemExpandIcon(itemEl, 'assets/menu-icons/open-accordion-white.svg');
    extraItem = getSubitems(item.subitems);
  }

  menuItemsEl.appendChild(itemEl);
  if (extraItem) menuItemsEl.appendChild(extraItem);
});
