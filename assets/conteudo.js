// Risco MED - páginas de conteúdo: tabelas expansíveis e rastreamento de CTA.
// Sem JavaScript, as tabelas aparecem completas (o conteúdo está sempre no HTML).
(function () {
    document.querySelectorAll('.def-expand').forEach(function (box) {
        var visible = parseInt(box.getAttribute('data-visible') || '3', 10);
        var items = box.querySelectorAll('tbody > tr, ul > li');
        var button = box.querySelector('.def-toggle');
        if (!button || items.length <= visible) {
            if (button) button.remove();
            return;
        }
        items.forEach(function (item, i) {
            if (i >= visible) item.classList.add('def-extra');
        });
        box.classList.add('is-collapsed');
        var openLabel = button.textContent;
        button.hidden = false;
        button.addEventListener('click', function () {
            var collapsed = box.classList.toggle('is-collapsed');
            button.setAttribute('aria-expanded', String(!collapsed));
            button.textContent = collapsed ? openLabel : 'Recolher definição';
            if (!collapsed && typeof gtag !== 'undefined') {
                gtag('event', 'definition_expand', { 'event_category': 'engagement', 'event_label': location.pathname });
            }
        });
    });

    document.querySelectorAll('a[href*="#cadastro"], a.btn-primary').forEach(function (link) {
        link.addEventListener('click', function () {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': link.getAttribute('data-cta') || link.textContent.trim(),
                    'value': link.getAttribute('href'),
                    'page_path': location.pathname
                });
            }
        });
    });
})();
