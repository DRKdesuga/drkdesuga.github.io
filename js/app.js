window.addEventListener('DOMContentLoaded', () => {
    const cards   = document.querySelectorAll('.project-card');
    const modal   = document.getElementById('projectModal');
    const dialog  = modal.querySelector('.modal-dialog');
    const closeBtn= dialog.querySelector('.close');

    function clearDynamicContent () {
        dialog.querySelectorAll('.dynamic').forEach(n => n.remove());
    }

    function openModal (projectId) {
        clearDynamicContent();
        const tpl  = document.getElementById(`${projectId}-template`);
        const wrap = document.createElement('div');
        wrap.classList.add('dynamic');
        wrap.appendChild(tpl ? tpl.content.cloneNode(true)
            : document.createTextNode('Coming soon…'));
        dialog.appendChild(wrap);

        bindLightbox(wrap);

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal () {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        clearDynamicContent();
    }

    cards.forEach(card =>
        card.addEventListener('click', () => openModal(card.dataset.project))
    );
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    const styleText = `
    .img-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);opacity:0;pointer-events:none;transition:opacity .3s ease;z-index:2000;}
    .img-overlay.open{opacity:1;pointer-events:auto;}
    .img-overlay img{max-width:90%;max-height:90%;border-radius:var(--radius-lg);transform:scale(.8);animation:zoomIn .4s forwards;cursor:zoom-out;}
    @keyframes zoomIn{to{transform:scale(1);}}
  `;
    const cssEl = document.createElement('style');
    cssEl.textContent = styleText;
    document.head.appendChild(cssEl);

    const overlay = document.createElement('div');
    overlay.className = 'img-overlay';
    overlay.innerHTML = '<img />';
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector('img');

    overlay.addEventListener('click', () => overlay.classList.remove('open'));

    function bindLightbox (scope = document) {
        scope.querySelectorAll('.modal-screenshot').forEach(img => {
            img.addEventListener('click', () => {
                overlayImg.src = img.src;
                overlay.classList.add('open');
            });
        });
    }

    bindLightbox();
});
