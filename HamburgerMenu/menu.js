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
  expandIconEl.src = `assets/menu-icons/${iconSrc}`;
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
    let itemEl = getItemElementContainer();
    itemEl = appendLabelToItem(itemEl, item.label);
    itemEl.classList.add(`menu-depth-${depth}`);
    subitemsContainer.appendChild(itemEl);
    if (item.subitems?.length) {
      const subitemsEl = getItemOpenCloseArrows(itemEl, item, depth + 1);
      subitemsContainer.appendChild(subitemsEl);
    }
  });
  return subitemsContainer;
};

const getItemOpenCloseArrows = (itemEl, item, depth) => {
  const arrowIconSufix = depth ? '' : '-white';
  const openArrow = addItemExpandIcon(
    itemEl,
    `open-accordion${arrowIconSufix}.svg`
  );
  const closeArrow = addItemExpandIcon(
    itemEl,
    `close-accordion${arrowIconSufix}.svg`
  );
  closeArrow?.classList.add('d-none');
  const subitemsEl = getSubitems(item.subitems, depth);
  itemEl.addEventListener('click', () => {
    toggleSubmenu(subitemsEl);
    openArrow?.classList.toggle('d-none');
    closeArrow?.classList.toggle('d-none');
  });
  return subitemsEl;
};

const getItemElementContainer = () => {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item', 'row', 'align-center');
  return itemEl;
};

const appendLabelToItem = (itemEl, label) => {
  const itemLabelEl = document.createTextNode(label);
  itemEl.appendChild(itemLabelEl);
  return itemEl;
};
const getItemElement = (item) => {
  let itemEl = getItemElementContainer();
  const itemImgEl = document.createElement('img');
  itemImgEl.src = item.imageSrc;
  itemEl.appendChild(itemImgEl);
  itemEl = appendLabelToItem(itemEl, item.label);
  return itemEl;
};

const toggleSubmenu = (elementToToggle) =>
  elementToToggle?.classList.toggle('d-none');

menuItems.forEach((item) => {
  const itemEl = getItemElement(item);
  let subitemsContainer;
  if (item.subitems?.length) {
    subitemsContainer = getItemOpenCloseArrows(itemEl, item);
  }

  menuItemsEl.appendChild(itemEl);
  if (subitemsContainer) menuItemsEl.appendChild(subitemsContainer);
});
