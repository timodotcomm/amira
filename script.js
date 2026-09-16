const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
}

// Gallery filtering
const filterBtns=[...document.querySelectorAll('.filter-btn')];
const galleryItems=[...document.querySelectorAll('.gallery-item')];
filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
  filterBtns.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const filter=btn.dataset.filter;
  galleryItems.forEach(item=>item.classList.toggle('hidden',filter!=='all' && item.dataset.category!==filter));
}));

// Lightweight lightbox
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox?.querySelector('img');
const lightboxClose=lightbox?.querySelector('.lightbox-close');
galleryItems.forEach(item=>item.addEventListener('click',()=>{
  if(!lightbox || !lightboxImg) return;
  const img=item.querySelector('img'); lightboxImg.src=img.src; lightboxImg.alt=img.alt; lightbox.classList.add('open');
}));
function closeLightbox(){lightbox?.classList.remove('open')}
lightboxClose?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

// Quote form -> WhatsApp message (no backend required)
const quoteForm=document.querySelector('#quote-form');
quoteForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(quoteForm);
  const msg=[
    'Halo Amira Tent, saya ingin konsultasi / request quotation.',
    '',
    `Nama: ${f.get('nama')||'-'}`,
    `Perusahaan: ${f.get('perusahaan')||'-'}`,
    `Jenis kebutuhan: ${f.get('layanan')||'-'}`,
    `Tanggal acara: ${f.get('tanggal')||'-'}`,
    `Lokasi: ${f.get('lokasi')||'-'}`,
    `Pesan: ${f.get('pesan')||'-'}`
  ].join('\n');
  window.open('https://wa.me/6287880018688?text='+encodeURIComponent(msg),'_blank','noopener');
});
