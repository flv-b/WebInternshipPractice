const faqSelect = document.getElementById('faq-select');
const faqOptions = document.getElementById('faq-select__options');

faqSelect.onclick = (faqEvent) => {
  faqEvent.preventDefault();
  faqOptions.classList.toggle('visible');
};

document.onclick = (docEvent) =>{
  if(docEvent.defaultPrevented === false)
    faqOptions.classList.remove('visible');
}


