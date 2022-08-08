
const modal = document.querySelector('.modal');
const modalButton = document.getElementById('modal-button');

modalButton.onclick = (closeModal) => {
  closeModal.preventDefault();
  modal.classList.remove('visible');
};

document.onclick = (e) => {
  if (e.defaultPrevented === false && !e.target.closest(".modal-wrapper"))
    modal.classList.remove('visible');
};