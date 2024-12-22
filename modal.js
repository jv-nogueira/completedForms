

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

// Função para carregar o CSS dinamicamente
function loadCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('modal.css');
    document.head.appendChild(link);
}

// Função para criar e exibir a modal
function showModal(resultado, linhas) {
    loadCSS(); // Carregar o CSS dinamicamente

    // Criar elementos da modal
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content'); // Adiciona a classe para aplicar o estilo

    // Criar a caixa de texto
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Digite o número da opção e dê Enter';

    // Criar o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    // Aguardar o modal ser carregado antes de focar no inputBox
    setTimeout(() => {
        inputBox.focus();
    }, 1); // Definir um timeout de 0 para garantir que o foco ocorra após a criação da modal

    inputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Chamar a função para processar a seleção
            processarSelecao(inputBox.value, linhas);
        }
    });

    modalContent.innerHTML = `<pre>${resultado}</pre>`;
    modalContent.insertBefore(inputBox, modalContent.firstChild);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Adicionar a modal à página
    document.body.appendChild(modal);
}
