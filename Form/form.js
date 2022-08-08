const faqSelect = document.getElementById('faq-select');
const faqOptions = document.getElementById('faq-select__options');
const sectionsToHide = document.getElementsByClassName('not-member-fields');

faqSelect.onclick = (faqEvent) => {
  faqEvent.preventDefault();
  faqOptions.classList.toggle('visible');
};

document.onclick = (docEvent) =>{
  if(docEvent.defaultPrevented === false)
    faqOptions.classList.remove('visible');
}

function isMember() {
  if (document.getElementById('member-status-2').checked){
    
    for(let section of sectionsToHide){
      section.style.display = 'block';
    }
  } else {
    for(let section of sectionsToHide){
      console.log(section.style.display);
      section.style.display = 'none';
      console.log(section.style.display, section.style, section);
    }    
  }
}

const membershipStatus = document.querySelectorAll('input[name="member-status"]');
membershipStatus.forEach( radio => {
  radio.addEventListener('click', isMember);
});