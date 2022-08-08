
const modal = document.querySelector('.modal');
const modalButton = document.getElementById('modal-button');

modalButton.onclick = (modalButtonAction) => {
  modalButtonAction.preventDefault();
  modal.classList.remove('visible');
};
