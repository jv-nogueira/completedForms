document.addEventListener("keydown", function(event) {
    if (event.keyCode === 113) { // F2 para iniciar
        console.log("F2 pressionado, numerando as linhas da coluna D...");

        const planilhaUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA1YNzHggx374b2qLpbtPvOxpHLn_B3JVB2yKj413BI1FIjWslKCiOWnTDpT30kTRpXANPhKkOUV2e/pub?output=csv';

        fetch(planilhaUrl)
            .then(response => response.text())
            .then(data => {
                const linhas = data.split('\n');
                const valoresColunaD = linhas.slice(1).map((linha, index) => {
                    const colunas = linha.split(',');
                    return `${index + 1} - ${colunas[3]}`;
                });

                // Calcula o tamanho máximo entre os valores filtrados
                const tamanhoMaximoFiltrado = Math.max(...valoresColunaD.map(item => item.length));

                function criarBotoes(filtro = '') {
                    const valoresFiltrados = valoresColunaD.filter(item => item.toLowerCase().includes(filtro.toLowerCase()));

                    const colunas = [];
                    for (let i = 0; i < valoresFiltrados.length; i++) {
                        const botao = document.createElement('button');
                        botao.innerText = valoresFiltrados[i];
                        botao.classList.add('botao-modal');
                        // Cursor muda para mãozinha
                        botao.style.cursor = 'pointer';
                        // Largura fixa com base no maior valor subtraindo por 5
                        botao.style.width = `${tamanhoMaximoFiltrado-5}ch`; 
                        // Alinhamento à esquerda
                        botao.style.textAlign = 'left'; 
                        botao.addEventListener('click', () => {
                            // Extrai o número antes do " - "
                            const numeroLinha = valoresFiltrados[i].split(' - ')[0]; 
                            // Chama a função com o número da linha e o array de linhas
                            processarSelecao(numeroLinha, linhas);
                        });

                        const colunaIndex = Math.floor(i / 15);
                        if (!colunas[colunaIndex]) colunas[colunaIndex] = [];
                        colunas[colunaIndex].push(botao);
                    }
                    return colunas;
                }

                let modal = document.querySelector('#modal');
                if (!modal) {
                    showModal(criarBotoes(), linhas);
                }

                const inputBox = document.querySelector('#inputBox');
                inputBox.addEventListener('input', function() {
                    const filtro = inputBox.value;
                    const modalContent = document.querySelector('.modal-content .botoes-container');
                    modalContent.innerHTML = '';

                    const novasColunas = criarBotoes(filtro);
                    novasColunas.forEach(coluna => {
                        const colunaDiv = document.createElement('div');
                        colunaDiv.classList.add('coluna');
                        coluna.forEach(botao => colunaDiv.appendChild(botao));
                        modalContent.appendChild(colunaDiv);
                    });
                });
            });
    }
});

function loadCSS() {
    const style = document.createElement('style');
    style.innerHTML = `
        #modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
            background-color: white;
            color: black;
            padding: 20px;
            border-radius: 10px;
            width: 80vw;
            max-height: 80vh;
            overflow-y: auto;
        }
        .botoes-container {
            display: flex;
            gap: 8px;
        }
        .coluna {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .close-button {
            margin-top: 10px;
            padding: 10px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

function showModal(botoes, linhas) {
    loadCSS();

    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const botoesContainer = document.createElement('div');
    botoesContainer.classList.add('botoes-container');
    botoes.forEach(coluna => {
        const colunaDiv = document.createElement('div');
        colunaDiv.classList.add('coluna');
        coluna.forEach(botao => colunaDiv.appendChild(botao));
        botoesContainer.appendChild(colunaDiv);
    });

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.id = 'inputBox';
    inputBox.autocomplete = 'off';
    inputBox.placeholder = 'Digite o número da opção e dê Enter';

    setTimeout(() => {
        inputBox.focus();
    }, 1);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    // Ao dar Enter executa o script conforme o número digitado
    inputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            console.log("Enter pressionado.");
            console.log("Processando seleção com base na linha:", linhas[inputBox.value]);
            processarSelecao(inputBox.value, linhas);
        }
    });

    modalContent.appendChild(inputBox);
    modalContent.appendChild(botoesContainer);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
