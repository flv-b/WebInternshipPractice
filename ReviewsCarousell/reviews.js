const reviewContainer = document.getElementById('reviews-carousell');
const reviewWrapper = document.getElementById('reviews-wrapper');

const reviewsArray = [
  {
    avatar: 'assets/review-icons/avatar1.jpg',
    score: 5,
    date: 'August, 27, 2020',
    comment: '"Best clinic ever!"',
  },
  {
    avatar: 'assets/review-icons/avatar2.jpg',
    score: 4.5,
    date: 'October, 3, 2021',
    comment: '"Nice staff!"',
  },
  {
    avatar: 'assets/review-icons/avatar3.jpg',
    score: 3.5,
    date: 'March, 7, 2022',
    comment: '"Keep up the good work!"',
  },
  {
    avatar: 'assets/review-icons/avatar4.jpg',
    score: 4,
    date: 'August, 30, 2022',
    comment: '"Awweee!"',
  },
];

const NUMBER_OF_REVIEWS = reviewsArray.length;

const getRatingStars = () => {
  const ratingStars = document.createElement('div');
  ratingStars.classList.add('row', 'justify-center');
  for(let i=0; i<5; i++){
    const star = document.createElement('img');
    star.src = 'assets/review-icons/star.svg';
    star.classList.add('review-star');
    ratingStars.appendChild(star);
  }
  return ratingStars;
}

const getReviewElementContainer = () => {
  const reviewEl = document.createElement('div');
  reviewEl.classList.add('review-card', 'd-none');
  return reviewEl;
}

const getReviewContent = (reviewData) => {
  const reviewSlideContentEl = document.createElement('div');
  reviewSlideContentEl.classList.add('review-content');

  const avatarEl = document.createElement('img');
  avatarEl.classList.add('align-center', 'row', 'avatar');
  avatarEl.src = reviewData.avatar;
  reviewSlideContentEl.appendChild(avatarEl);
  
  const ratingEl = getRatingStars();
  reviewSlideContentEl.appendChild(ratingEl);

  const dateOfReviewEl = document.createElement('span');
  dateOfReviewEl.classList.add('review-date','row', 'd-block');
  dateOfReviewEl.innerText = reviewData.date;
  reviewSlideContentEl.appendChild(dateOfReviewEl);

  const commentOfReviewEl = document.createElement('span');
  commentOfReviewEl.classList.add('review-comment', 'row', 'd-block');
  commentOfReviewEl.innerText = reviewData.comment;
  reviewSlideContentEl.appendChild(commentOfReviewEl);

  return reviewSlideContentEl;
  
}


const getCardButtons = (back, next) => {
  if(back){
    const backButton = document.createElement('img');
    backButton.classList.add('cards-back-button', 'cards-button');
    backButton.src = 'assets/review-icons/back.svg';
    reviewContainer.appendChild(backButton);
  }

  if(next){
    const nextButton = document.createElement('img');
    nextButton.classList.add('cards-next-button', 'cards-button');
    nextButton.src = 'assets/review-icons/next.svg';
    reviewContainer.appendChild(nextButton);
  }

}

const displayCard = (cardToDisplay, index) => {
  cardToDisplay.classList.remove('d-none');
  if(index == 0){
    getCardButtons(false, true);
  }else if(index == NUMBER_OF_REVIEWS-1){
    getCardButtons(true, false);
  }else getCardButtons(true, true);

  activeCard = index;
  return cardToDisplay;
};

reviewsArray.forEach((reviewData, index) => {
  const reviewEl = getReviewElementContainer();
  const reviewContentEl = getReviewContent(reviewData);
  reviewEl.appendChild(reviewContentEl);
  if(index == 0){
    displayCard(reviewEl, index);
  }

  reviewContainer.appendChild(reviewEl);
});
