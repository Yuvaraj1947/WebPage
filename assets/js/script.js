// Simple interactivity: mobile nav, gallery modal, form handling
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', ()=> {
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
  document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  closeBtn && closeBtn.addEventListener('click', ()=> {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });
  modal && modal.addEventListener('click', (e)=> {
    if(e.target === modal) { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
  });
});

// Simple contact form handler (no backend) => uses mailto: as fallback
function submitForm(e){
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const service = f.service.value;
  const message = f.message.value.trim();
  const subject = encodeURIComponent('Booking enquiry from website: ' + name);
  const body = encodeURIComponent('Name: '+name+'\nPhone: '+phone+'\nService: '+service+'\nMessage: '+message);
  window.location.href = 'mailto:balajistudio120@gmail.com?subject='+subject+'&body='+body;
  return false;
}
