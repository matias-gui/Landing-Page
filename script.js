
const itens = document.querySelectorAll('.item-carrossel');
const projetolink = document.getElementById('projeto');
const gitlink = document.getElementById('github');

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
        atualizarLinks(img);

    }

    // Função para ir para a imagem anterior, vai subtrair o índice atual menos 1
    function prev() {
        img = (img - 1 + itens.length) % itens.length;
        mostrarimg(img);
        atualizarLinks(img);
    }
    // Mostrar a primeira imagem inicialmente
    mostrarimg(img);

     projetolink.href ='https://matias-gui.github.io/projeto-login/';
     projetolink.target = '_blank';
     gitlink.href = 'https://github.com/matias-gui/projeto-login';
     gitlink.target = '_blank';

    function atualizarLinks(imgn) {
        
     if(imgn === 0){
            projetolink.href = 'https://matias-gui.github.io/projeto-login';
            projetolink.target = '_blank';
            gitlink.href = 'https://github.com/matias-gui/projeto-login';
            gitlink
    }else if(imgn === 1){
            projetolink.href = 'https://matias-gui.github.io/site-android/';
            projetolink.target = '_blank';
            gitlink.href = 'https://github.com/matias-gui/site-android';
            gitlink.target = '_blank';
        } else if(imgn === 2){
            projetolink.href = 'https://matias-gui.github.io/projeto-cordel-moderno/';
            projetolink.target = '_blank';
            gitlink.href = 'https://github.com/matias-gui/projeto-cordel-moderno';
            gitlink.target = '_blank';
        }else if(imgn === 3){
            projetolink.href = 'https://matias-gui.github.io/projeto-redes-sociais/';
            projetolink.target = '_blank';
            gitlink.href = 'https://github.com/matias-gui/projeto-redes-sociais';
            gitlink.target = '_blank';
        }
    }
    const msg = "Entre em Contato";
    const digitarmsg = document.getElementById('mensagem');
    let i = 0;

    function digitar(){
        // Verifica se ainda há caracteres para digitar
        if(i < msg.length){
            // Adiciona o próximo caractere à mensagem
            digitarmsg.textContent += msg.charAt(i);
            i++;
            // Chama a função novamente após um atraso
            setTimeout(digitar, 200);

        }
    }

    digitar()

