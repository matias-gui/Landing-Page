
const itens = document.querySelectorAll('.item-carrossel');
    let img = 0;

    // Função para mostrar a imagem com base no índice
    function mostrarimg(index) {
        itens.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    // Função para ir para a próxima imagem, vai somar o índice atual mais 1, % itens.length garante que o índice fique dentro dos limites, se passar do último item, volta para o primeiro
    function next() {
        img = (img + 1) % itens.length;
        mostrarimg(img);
        console.log('clicou')
    }

    // Função para ir para a imagem anterior, vai subtrair o índice atual menos 1
    function prev() {
        img = (img - 1 + itens.length) % itens.length;
        mostrarimg(img);
        console.log('clicou')
    }

    mostrarimg(img);