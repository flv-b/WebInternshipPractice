const header = document.getElementById('carousell');

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

const getSlideElementContainer = (bgImgSrc) => {
  const slideEl = document.createElement('div');
  slideEl.classList.add('carousell', 'position-relative');
  slideEl.style.backgroundImage = `linear-gradient(90deg, #1759f0 0%, #00d1a933 100%) , url('${bgImgSrc}')`;
  return slideEl;
}

const getOverlayImg = (overlayImgSrc) => {
  const overlayImgEl = document.createElement('img');
  overlayImgEl.classList.add('overlay');
  overlayImgEl.src = overlayImgSrc;
  return overlayImgEl;
}

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
  slideButton.classList.add('primary-button','carousell-button');
  slideButton.innerText = slideData.button;
  slideContentEl.appendChild(slideButton);

  return slideContentEl;
}


carousellArray.forEach( (slideData, index) => {
  const slideEl = getSlideElementContainer(slideData.bgImg);
  let overlayImgEl;
  if(slideData.overlayImg?.length){
    overlayImgEl = getOverlayImg(slideData.overlayImg);
    slideEl.appendChild(overlayImgEl);
  }
  const slideContentEl = getSlideContent(slideData);
  slideEl.appendChild(slideContentEl);
  header.appendChild(slideEl);
});

