const faqSelect = document.getElementById('faq-select');
const faqOptions = document.getElementById('faq-select__options');
const sectionsToHide = document.getElementsByClassName('not-member-fields');

faqSelect.onclick = (faqEvent) => {
  faqEvent.preventDefault();
  faqOptions.classList.toggle('visible');
};

document.onclick = (docEvent) => {
  if (docEvent.defaultPrevented === false)
    faqOptions.classList.remove('visible');
};

function onMembershipChange() {
  formValidator();
  const isMember = document.getElementById('member-status-1').checked;

  for (let section of sectionsToHide) {
    section.style.display = isMember ? 'none' : 'block';
  }
}

const membershipStatus = document.querySelectorAll(
  'input[name="member-status"]'
);
membershipStatus.forEach((radio) => {
  radio.addEventListener('click', onMembershipChange);
});
