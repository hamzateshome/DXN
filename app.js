const products = {
  reishi: { name: 'Reishi Mushroom Powder', category: 'Ganoderma · Supplement', image: 'HF040_ReishiMushroom22g.jpg', description: 'A blend of Ganoderma fruiting body and mycelium.', format: '22 g powder · bottle' },
  spirulina: { name: 'DXN Spirulina', category: 'Spirulina · Supplement', image: 'HF031_Spirulina120s.jpg', description: 'Cultivated Spirulina platensis in tablet form.', format: '120 tablets · 250 mg per tablet' },
  cordyceps: { name: 'DXN Cordyceps', category: 'Cordyceps · Supplement', image: 'HF024_Cordyceps60.jpg', description: 'Cordyceps sinensis powder in capsule form.', format: '60 capsules · bottle' },
  coffee: { name: 'Lingzhi Black Coffee', category: 'Coffee · Beverage', image: 'FB122_LingzhiBlackCoffee.jpg', description: 'Instant coffee with Lingzhi, with no added sugar.', format: '20 sachets × 4.5 g' },
  morinzhi: { name: 'DXN Morinzhi', category: 'Botanical · Beverage', image: 'FB007_Morinzhi285ml.jpg', description: 'A botanical beverage made with noni and roselle.', format: '285 ml · bottle' },
  cocozhi: { name: 'DXN Cocozhi', category: 'Cocoa · Beverage', image: 'FB124_Cocozhi.jpg', description: 'A powdered cocoa drink with Ganoderma extract.', format: '20 sachets × 32 g' }
};
const enquiryUrl = (name) => `https://wa.me/251946336289?text=${encodeURIComponent(`Hello Hamza, I found ${name} on your DXN website. Please let me know the current price, availability, and ordering options. Distributor code: 830273935.`)}`;
document.querySelectorAll('[data-enquiry]').forEach(link => { link.href = enquiryUrl(link.dataset.enquiry); });
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  document.querySelectorAll('.product-card').forEach(card => { const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter; card.hidden = !visible; if (visible) count++; });
  document.getElementById('product-count').textContent = `${count} products`;
}));
const dialog = document.getElementById('product-dialog');
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = products[button.dataset.product];
  if (!product) return;
  document.getElementById('dialog-title').textContent = product.name;
  document.getElementById('dialog-category').textContent = product.category;
  document.getElementById('dialog-description').textContent = product.description;
  document.getElementById('dialog-format').textContent = product.format;
  const image = document.getElementById('dialog-image'); image.src = `assets/${product.image}`; image.alt = product.name;
  document.getElementById('dialog-enquiry').href = enquiryUrl(product.name);
  dialog.showModal(); document.body.classList.add('modal-open');
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.getElementById('copy-code').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('830273935'); status.textContent = 'Distributor code copied: 830273935'; }
  catch { status.textContent = 'Please select and copy this code: 830273935'; }
});
