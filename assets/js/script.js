document.addEventListener('DOMContentLoaded', function(){

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  /* ---------- GALLERY BUTTON REDIRECT (AWS S3) ---------- */
  const tabs = document.querySelectorAll('.gallery-tabs button');
  const s3BaseUrl = "https://balaji-studio.s3.us-east-1.amazonaws.com/";

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const folder = btn.dataset.folder;

      if(folder){
        window.location.href = s3BaseUrl + folder + "/";
      }
    });
  });

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

