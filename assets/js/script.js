document.addEventListener('DOMContentLoaded', function(){

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  <script>
  document.querySelectorAll('.gallery-btn').forEach(button => {
    button.addEventListener('click', () => {
      const folder = button.dataset.folder;

      // Base S3 URL
      const baseUrl = "arn:aws:s3:::balaji-studio/";

      // Redirect to folder
      window.location.href = baseUrl + folder + "/";
    });
  });
</script>

  /* ---------- CLOUDINARY CONFIG ---------- */
  const cloudName = "dqi98hqac"; 
  const maxImages = 200;

  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
  const tabs = document.querySelectorAll('.gallery-tabs button');

  let images = [];

  function loadGallery(folder){
    gallery.innerHTML = '';
    images = [];

    for(let i = 1; i <= maxImages; i++){
      const img = document.createElement('img');

      img.src = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/${folder}/${i}.jpg`;
      img.className = 'gallery-item';
      img.loading = 'lazy';
      img.onerror = () => img.remove();

      img.addEventListener('click', () => {
        modalImg.src = img.src.replace('w_600', 'w_1600');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden','false');
      });

      gallery.appendChild(img);
      images.push(img);
    }
  }

  /* ---------- MODAL CLOSE ---------- */
  closeBtn && closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
  });

  modal && modal.addEventListener('click', e => {
    if(e.target === modal){
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden','true');
    }
  });

  /* ---------- CATEGORY SWITCH ---------- */
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadGallery(btn.dataset.folder);
    });
  });

  /* ---------- DEFAULT ---------- */
  loadGallery('wedding');
});

/* ---------- CONTACT FORM ---------- */
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

  return false;
}
