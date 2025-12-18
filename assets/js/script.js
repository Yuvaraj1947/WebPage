document.addEventListener('DOMContentLoaded', () => {

  /* ------------ CONFIG ------------ */
  const cloudName = "dqi98hqac"; // 🔴 CHANGE
  const maxImages = 150;

  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
  const tabs = document.querySelectorAll('.gallery-tabs button');

  let currentImages = [];
  let currentIndex = 0;

  /* ------------ LOAD GALLERY ------------ */
  function loadGallery(folder){
    gallery.innerHTML = '';
    currentImages = [];

    for(let i = 1; i <= maxImages; i++){
      const img = document.createElement('img');
      img.src = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/${folder}/${i}.jpg`;
      img.className = 'gallery-item';
      img.loading = 'lazy';

      img.onerror = () => img.remove();

      img.addEventListener('click', () => {
        openModal(img.src.replace('w_600', 'w_1600'), currentImages.indexOf(img));
      });

      gallery.appendChild(img);
      currentImages.push(img);
    }
  }

  /* ------------ MODAL ------------ */
  function openModal(src, index){
    modalImg.src = src;
    currentIndex = index;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  }

  function closeModal(){
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
  }

  function showNext(step){
    currentIndex += step;
    if(currentIndex < 0) currentIndex = currentImages.length - 1;
    if(currentIndex >= currentImages.length) currentIndex = 0;

    modalImg.src = currentImages[currentIndex].src.replace('w_600','w_1600');
  }

  /* ------------ EVENTS ------------ */
  closeBtn.onclick = closeModal;
  modal.onclick = e => e.target === modal && closeModal();

  // Keyboard
  document.addEventListener('keydown', e => {
    if(modal.style.display !== 'flex') return;
    if(e.key === 'Escape') closeModal();
    if(e.key === 'ArrowRight') showNext(1);
    if(e.key === 'ArrowLeft') showNext(-1);
  });

  // Swipe (Mobile)
  let startX = 0;
  modalImg.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  modalImg.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if(endX < startX - 50) showNext(1);
    if(endX > startX + 50) showNext(-1);
  });

  /* ------------ CATEGORY SWITCH ------------ */
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadGallery(btn.dataset.folder);
    });
  });

  /* ------------ DEFAULT LOAD ------------ */
  loadGallery('wedding');
});


/* ------------ CONTACT FORM ------------ */
function submitForm(e){
  e.preventDefault();
  const f = e.target;

  const subject = encodeURIComponent(
    'Booking enquiry from website: ' + f.name.value
  );

  const body = encodeURIComponent(
    `Name: ${f.name.value}
Phone: ${f.phone.value}
Service: ${f.service.value}
Message: ${f.message.value}`
  );

  window.location.href =
    `mailto:balajistudio120@gmail.com?subject=${subject}&body=${body}`;
}
