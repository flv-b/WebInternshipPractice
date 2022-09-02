const reviewContainer = document.getElementById('reviews-carousell');
const reviewWrapper = document.getElementById('reviews-wrapper');
let firstDisplayedCard = 0;

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
  {
    avatar: 'assets/review-icons/avatar5.jpg',
    score: 5,
    date: 'August, 27, 2020',
    comment: '"Best clinic ever!"',
  },
  {
    avatar: 'assets/review-icons/avatar6.jpg',
    score: 3.5,
    date: 'March, 7, 2022',
    comment: '"Keep up the good work!"',
  },
  {
    avatar: 'assets/review-icons/avatar7.jpg',
    score: 4,
    date: 'August, 30, 2022',
    comment: '"Awweee!"',
  },
  {
    avatar: 'assets/review-icons/avatar8.jpg',
    score: 4.5,
    date: 'October, 3, 2021',
    comment: '"Nice staff!"',
  },
  {
    avatar: 'assets/review-icons/avatar9.jpg',
    score: 3.5,
    date: 'March, 7, 2022',
    comment: '"Keep up the good work!"',
  },
];

const NUMBER_OF_REVIEWS = reviewsArray.length;

const getNumberOfReviewsToShow = () => {
  const screenWidth = window.screen.width;
  if (screenWidth > 1000) return 3;
  else if (screenWidth > 578) return 2;
  else return 1;
};

const getRatingStars = () => {
  const ratingStars = document.createElement('div');
  ratingStars.classList.add('row', 'justify-center');
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('img');
    star.src = 'assets/review-icons/star.svg';
    star.classList.add('review-star');
    ratingStars.appendChild(star);
  }
  return ratingStars;
};

const getReviewElementContainer = (index) => {
  const reviewEl = document.createElement('div');
  reviewEl.classList.add('review-card', 'd-none');
  reviewEl.setAttribute('id', `review-card-${index}`);
  return reviewEl;
};

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
  dateOfReviewEl.classList.add('review-date', 'row', 'd-block');
  dateOfReviewEl.innerText = reviewData.date;
  reviewSlideContentEl.appendChild(dateOfReviewEl);

  const commentOfReviewEl = document.createElement('span');
  commentOfReviewEl.classList.add('review-comment', 'row', 'd-block');
  commentOfReviewEl.innerText = reviewData.comment;
  reviewSlideContentEl.appendChild(commentOfReviewEl);

  return reviewSlideContentEl;
};

const hideCard = (index) => {
  document.getElementById(`review-card-${index}`).classList.add('d-none');
};

const showCard = (index) => {
  document.getElementById(`review-card-${index}`).classList.remove('d-none');
};

const getCardButtons = (back, next) => {
  document.querySelectorAll(".cards-button").forEach(el => el.remove())
  if (back) {
    const backButton = document.createElement('img');
    backButton.classList.add('cards-back-button', 'cards-button');
    backButton.src = 'assets/review-icons/back.svg';
    backButton.onclick = (e) => {
      firstDisplayedCard--;
      hideCard(firstDisplayedCard + numberOfCardsToShow);
      showCard(firstDisplayedCard);
      displayCardButtons();
    };
    reviewContainer.appendChild(backButton);
  }

  if (next) {
    const nextButton = document.createElement('img');
    nextButton.classList.add('cards-next-button', 'cards-button');
    nextButton.src = 'assets/review-icons/next.svg';
    nextButton.onclick = (e) => {
      hideCard(firstDisplayedCard);
      showCard(firstDisplayedCard + numberOfCardsToShow);
      firstDisplayedCard++;
      displayCardButtons();
    };
    reviewContainer.appendChild(nextButton);
  }

};

const displayCardButtons = () => {
  if (firstDisplayedCard == 0) {
    getCardButtons(false, true);
  } else if (firstDisplayedCard == NUMBER_OF_REVIEWS - numberOfCardsToShow) {
    getCardButtons(true, false);
  } else {
    getCardButtons(true, true);
  }
};

const numberOfCardsToShow = getNumberOfReviewsToShow();
reviewsArray.forEach((reviewData, index) => {
  const reviewEl = getReviewElementContainer(index);
  const reviewContentEl = getReviewContent(reviewData);
  reviewEl.appendChild(reviewContentEl);
  reviewContainer.appendChild(reviewEl);
});

for (let i = 0; i < numberOfCardsToShow; i++) {
  showCard(i);
}
displayCardButtons();
