// Menu mobile: abre/fecha e informa o estado ao leitor de tela
const botao = document.querySelector('.menu-botao');
const menu = document.getElementById('menu-principal');

function alternarMenu(abrir) {
    menu.classList.toggle('aberto', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
    botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}

botao.addEventListener('click', () => {
    alternarMenu(botao.getAttribute('aria-expanded') !== 'true');
});
menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) alternarMenu(false);
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) {
        alternarMenu(false);
        botao.focus();
    }
});

if ('IntersectionObserver' in window) {
    // Destaca no menu a seção que está na tela
    const links = [...menu.querySelectorAll('a')];
    const secoes = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            links.forEach((a) => {
                if (a.hash === '#' + entrada.target.id) a.setAttribute('aria-current', 'true');
                else a.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach((a) => {
        const alvo = document.querySelector(a.hash);
        if (alvo) secoes.observe(alvo);
    });

    // Aparição suave das seções: acontece uma vez e nunca esconde de novo
    const revelar = new IntersectionObserver((entradas, obs) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                obs.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.revelar').forEach((el) => revelar.observe(el));
} else {
    document.querySelectorAll('.revelar').forEach((el) => el.classList.add('visivel'));
}