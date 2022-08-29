const header = document.getElementById('carousell');
const switchButtonContainer = document.getElementById('switch-btn-cont');
const defaultGradColor1 = '#1759f0';
const defaultGradColor2 = '#00d1a933';

const carousellArray = [
  {
    bgImg: 'assets/carousell-images/carousellImg1.png',
    overlayImg: 'assets/carousell-images/carousellOverlay1.png',
    title: 'Meet our specialists',
    description:
      'Commodo elit at imperdiet dui accumsan sit amet nulla facilisi.',
    button: 'Doctors',
  },
  {
    bgImg: 'assets/carousell-images/carousellImg2.png',
    title: 'Our locations',
    description:
      'Commodo elit at imperdiet dui accumsan sit amet nulla facilisi.',
    button: 'Locations',
  },
  {
    bgImg: 'assets/carousell-images/carousellImg3.png',
    title: 'Our specialisations',
    description:
      'Commodo elit at imperdiet dui accumsan sit amet nulla facilisi.',
    button: 'Specialisations',
  },
];
const NUMBER_OF_SLIDES = carousellArray.length;

const getSlideElementContainer = (
  bgImgSrc,
  gradColor1 = defaultGradColor1,
  gradColor2 = defaultGradColor2
) => {
  const slideEl = document.createElement('div');
  slideEl.classList.add('carousell', 'position-relative');
  slideEl.style.backgroundImage = `linear-gradient(90deg,  ${gradColor1} 0%, ${gradColor2} 100%) , url('${bgImgSrc}')`;
  slideEl.setAttribute('draggable', true);

  return slideEl;
};

const getOverlayImg = (overlayImgSrc) => {
  const overlayImgEl = document.createElement('img');
  overlayImgEl.classList.add('overlay');
  overlayImgEl.src = overlayImgSrc;
  return overlayImgEl;
};

const getSlideContent = (slideData) => {
  const slideContentEl = document.createElement('div');
  slideContentEl.classList.add('column', 'slide-content');

  const slideTitle = document.createElement('h3');
  slideTitle.classList.add('slide-header');
  slideTitle.innerText = slideData.title;
  slideContentEl.appendChild(slideTitle);

  const slideDescription = document.createElement('span');
  slideDescription.classList.add('slide-span');
  slideDescription.innerText = slideData.description;
  slideContentEl.appendChild(slideDescription);

  const slideButton = document.createElement('button');
  slideButton.classList.add('primary-button', 'carousell-button');
  slideButton.innerText = slideData.button;
  slideContentEl.appendChild(slideButton);

  return slideContentEl;
};

const clearDots = (switchBetweenSlidesDot) => {
  switchBetweenSlidesDot.forEach((dot) => {
    if (dot.classList.contains('carousell-switch-button-pressed'))
      dot.classList.remove('carousell-switch-button-pressed');
  });
  return switchBetweenSlidesDot;
};

const switchBetweenSlidesDot = [];
for (let i = 0; i < NUMBER_OF_SLIDES; i++) {
  switchBetweenSlidesDot[i] = document.createElement('button');
  switchBetweenSlidesDot[i].classList.add('carousell-switch-button');
  switchBetweenSlidesDot[i].onclick = (e) => {
    e.preventDefault();
    clearDots(switchBetweenSlidesDot);
    switchBetweenSlidesDot[i].classList.add('carousell-switch-button-pressed');
    activeSlide = i;
    displaySlide(i);
    clearInterval(refreshInterval);
    refreshInterval = setInterval(switchSlide, 10000);
  };
  switchButtonContainer.appendChild(switchBetweenSlidesDot[i]);
}

header.style.transform = 'translateX(0)';
switchBetweenSlidesDot[0].classList.add('carousell-switch-button-pressed');

let activeSlide = 0;
const switchSlide = (slideNr) => {
  if (isNaN(slideNr)) slideNr = activeSlide + 1;
  if (slideNr < 0) {
    slideNr = NUMBER_OF_SLIDES - 1;
  }
  activeSlide = slideNr % NUMBER_OF_SLIDES;
  displaySlide(activeSlide);
};

const displaySlide = (slideNumber) => {
  clearDots(switchBetweenSlidesDot);
  switchBetweenSlidesDot[slideNumber].classList.add(
    'carousell-switch-button-pressed'
  );
  header.style.transform = `translateX(${-100 * slideNumber}vw)`;
  header.style.transitionDuration = '2s';
};

let refreshInterval = setInterval(switchSlide, 10000);

carousellArray.forEach((slideData, index) => {
  const slideEl = getSlideElementContainer(slideData.bgImg);
  let overlayImgEl;
  if (slideData.overlayImg?.length) {
    overlayImgEl = getOverlayImg(slideData.overlayImg);
    slideEl.appendChild(overlayImgEl);
  }
  const slideContentEl = getSlideContent(slideData);
  slideEl.appendChild(slideContentEl);

  header.appendChild(slideEl);
});

let offsetX, coordX, drag;
function handleDragStart(e) {
  if (e.target.classList.contains('carousell-switch-button')) return;
  drag = true;
  offsetX = e.clientX;
  if (!e.target.style.transform) {
    e.target.style.transform = '0px';
  }
  coordX = `${-100 * activeSlide}vw`;
  header.onmousemove = handleDrag;
  clearInterval(refreshInterval);
}

function handleDragEnd(e) {
  if (!drag) return;
  refreshInterval = setInterval(switchSlide, 10000);

  const offsetVal = e.clientX - offsetX;
  if (offsetVal > 50) {
    switchSlide(activeSlide - 1);
  } else if (offsetVal < -50) {
    switchSlide(activeSlide + 1);
  } else {
    displaySlide(activeSlide);
  }
  drag = false;
}
function handleDrag(e) {
  if (!drag) return;
  const offsetVal = e.clientX - offsetX;
  const calcSign = offsetVal > 0 ? '+' : '-';
  const transformVal = `calc(${coordX} ${calcSign} ${Math.abs(offsetVal)}px)`;
  header.style.transform = `translateX(${transformVal})`;
  return false;
}

window.onload = function () {
  header.onmousedown = handleDragStart;
  header.onmouseup = handleDragEnd;
};
