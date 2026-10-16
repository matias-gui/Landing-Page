/* Animações com GSAP: título do hero, rolagem (ScrollTrigger) e barra de progresso.
   Se o GSAP não carregar, ou se o usuário pedir menos movimento, o conteúdo aparece normalmente. */
(() => {
    const html = document.documentElement;
    const liberar = () => html.classList.remove('anim-aguardando');
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const h1 = document.getElementById('titulo-principal');

    if (!window.gsap || reduzir || !h1) { liberar(); return; }
    const gsap = window.gsap;
    const temScroll = !!window.ScrollTrigger;
    if (temScroll) gsap.registerPlugin(window.ScrollTrigger);
    html.classList.add('gsap-ativo');

    /* ---------- Título: divide em palavras e letras (o texto original fica para leitores de tela) ---------- */
    const texto = h1.textContent.trim();
    const palavras = texto.split(/\s+/).map((p) =>
        `<span class="palavra">${[...p].map((l) => `<span class="letra">${l}</span>`).join('')}</span>`).join(' ');
    h1.innerHTML = `<span class="sr">${texto}</span><span aria-hidden="true">${palavras}</span>`;
    const letras = h1.querySelectorAll('.letra');

    /* ---------- Entrada do hero ---------- */
    gsap.set('.hero [data-anim]:not(#titulo-principal)', { autoAlpha: 0, y: 18 });
    gsap.set(letras, { yPercent: 115 });
    gsap.set(h1, { autoAlpha: 1 });
    liberar(); // a partir daqui o GSAP controla o estado inicial

    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero__rotulo', { autoAlpha: 1, y: 0, duration: 0.8 })
        .to(letras, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.04 }, '-=0.5')
        .to('.hero__cargo', { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.6')
        .fromTo('.hero__cargo', { letterSpacing: '0.6em' }, { letterSpacing: '0.3em', duration: 1.4, ease: 'power2.out' }, '<')
        .to('.hero__resumo', { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.9')
        .to('.hero .acoes, .hero__redes, .hero__rolar', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=0.5');

    if (!temScroll) return;

    /* ---------- Rolagem ---------- */
    const gatilho = (el, inicio = 'top 82%') => ({ trigger: el, start: inicio, once: true });

    gsap.to('.progresso', { scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: html, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

    gsap.to('.hero__conteudo', { y: -90, opacity: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.raios', { opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    document.querySelectorAll('.secao__cabecalho').forEach((cab) => {
        gsap.from(cab.children, { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: gatilho(cab, 'top 88%') });
    });

    document.querySelectorAll('.projeto').forEach((projeto) => {
        const quadro = projeto.querySelector('.projeto__imagem');
        const img = quadro.querySelector('img');
        gsap.set(img, { scale: 1.15 });
        gsap.fromTo(quadro, { clipPath: 'inset(0% 0% 100% 0% round 12px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath', scrollTrigger: gatilho(projeto) });
        gsap.from(projeto.querySelectorAll('.projeto__info > *'),
            { autoAlpha: 0, y: 28, duration: 0.8, stagger: 0.1, delay: 0.25, ease: 'power3.out', scrollTrigger: gatilho(projeto) });
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none',
            scrollTrigger: { trigger: projeto, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    gsap.from(gsap.utils.toArray('.sobre__foto, .sobre .texto-leitura p'),
        { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: gatilho('.sobre') });
    gsap.from('.habilidades li',
        { autoAlpha: 0, y: 20, scale: 0.95, duration: 0.6, stagger: 0.07, ease: 'power3.out', scrollTrigger: gatilho('.habilidades', 'top 88%') });
    gsap.from('.contato > *',
        { autoAlpha: 0, y: 30, duration: 0.9, stagger: 0.18, ease: 'power3.out', scrollTrigger: gatilho('.contato') });

    window.addEventListener('load', () => window.ScrollTrigger.refresh());
})();