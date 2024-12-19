document.addEventListener("keydown", function(event) {
    if (event.keyCode === 113) { // F2 para iniciar
        console.log("F2 pressionado, numerando as linhas da coluna D...");

        const planilhaUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA1YNzHggx374b2qLpbtPvOxpHLn_B3JVB2yKj413BI1FIjWslKCiOWnTDpT30kTRpXANPhKkOUV2e/pub?output=csv';

        fetch(planilhaUrl)
            .then(response => response.text())
            .then(data => {
                // Dividir o CSV em linhas
                const linhas = data.split('\n');

                // Usar a primeira linha (índice 0) como título da coluna D
                const colunasPrimeiraLinha = linhas[0].split(',');
                let resultado = `${colunasPrimeiraLinha[3]}\n\n`;

                // Numerar as linhas da coluna D
                const valoresColunaD = [];
                linhas.forEach((linha, index) => {
                    if (index > 0) { // Ignorar a primeira linha (título)
                        const colunas = linha.split(',');
                        valoresColunaD.push(`${index} - ${colunas[3]}`);
                    }
                });

                // Determinar o tamanho máximo de cada item para ajustar as colunas
                const tamanhoMaximo = Math.max(...valoresColunaD.map(item => item.length));
                const numeroDeColunas = Math.ceil(valoresColunaD.length / 15);
                const colunasFormatadas = Array.from({ length: numeroDeColunas }, () => []);

                valoresColunaD.forEach((valor, index) => {
                    const colunaIndex = Math.floor(index / 15);
                    colunasFormatadas[colunaIndex].push(valor.padEnd(tamanhoMaximo, ' '));
                });

                // Formatar o resultado em linhas com colunas
                for (let i = 0; i < 20; i++) {
                    let linha = '';
                    colunasFormatadas.forEach(coluna => {
                        if (coluna[i]) {
                            linha += coluna[i] + '\t';
                        }
                    });
                    if (linha.trim()) {
                        resultado += linha.trim() + '\n';
                    }
                }

                // Criar e exibir a modal
                showModal(resultado, linhas);
            })
            .catch(error => {
                console.error("Erro ao processar a planilha:", error);
            });
    }
});

// Função para criar e exibir a modal
function showModal(resultado, linhas) {
    // Criar elementos da modal
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fundo escurecido

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white'; // Fundo branco do painel
    modalContent.style.color = 'black'; // Texto preto
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.width = '80vw';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';

    // Criar a caixa de texto
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Digite o número da opção e dê Enter';
    inputBox.style.display = 'block';
    inputBox.style.width = '100%';
    inputBox.style.marginBottom = '10px';
    inputBox.style.padding = '10px';
    inputBox.style.border = '1px solid #ccc';
    inputBox.style.borderRadius = '5px';
    inputBox.style.backgroundColor = 'white';
    inputBox.style.color = 'black';

    // Aguardar o modal ser carregado antes de focar no inputBox
    setTimeout(() => {
        inputBox.focus();
    }, 0); // Definir um timeout de 0 para garantir que o foco ocorra após a criação da modal

    inputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Verificar se o valor digitado é um número
            const numeroEscolhido = parseInt(inputBox.value.trim(), 10);
            if (!isNaN(numeroEscolhido)) {
                // Verificar se o número escolhido é válido
                if (numeroEscolhido > 0 && numeroEscolhido < linhas.length) {
                    document.body.removeChild(modal);
                    // Pega o valor da linha escolhida e da coluna G (índice 6)
                    const colunas = linhas[numeroEscolhido].split(',');

                    // Armazena o valor da coluna G junto com o número escolhido
                    const valoresColunaG = [];
                    valoresColunaG.push(`${colunas[6]}`);
                    setTimeout(()=>{
                        // Acionar o clique para tela inicial
                        document.querySelectorAll("[aria-current='page']")[0].click();
                        setTimeout(()=>{
                    console.log("Valor da Coluna G: ", valoresColunaG);
                    if(valoresColunaG[0].includes("Incidente")){
                        console.log("Script inicia como incidente")
                        document.querySelectorAll("[data-test-id='request-group:Estou com problema ou dificuldade']")[0].click()
                    }else if (valoresColunaG[0].includes("Requisição")){
                        console.log("Script inicia como requisição")
                        document.querySelectorAll("[data-test-id='request-group:Estou com uma dúvida ou preciso fazer uma solicitação']")[0].click()
                    }
                    },2000)
                },1000)
                } else {
                    console.log("Número inválido.");
                }
            }
        }
    });

    modalContent.innerHTML = `<pre>${resultado}</pre>`;
    modalContent.insertBefore(inputBox, modalContent.firstChild);

    // Criar o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Adicionar a modal à página
    document.body.appendChild(modal);
}
