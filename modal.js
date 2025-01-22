document.addEventListener("keydown", function(event) {
    if (event.keyCode === 113) { // F2 para iniciar
        console.log("F2 pressionado, numerando as linhas da coluna D...");

        const planilhaUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA1YNzHggx374b2qLpbtPvOxpHLn_B3JVB2yKj413BI1FIjWslKCiOWnTDpT30kTRpXANPhKkOUV2e/pub?output=csv';

        fetch(planilhaUrl)
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log("Dados CSV recebidos:", data);
                const linhas = data.split('\n');
                console.log("Linhas do CSV divididas:", linhas);

                const colunasPrimeiraLinha = linhas[0].split(',');

                const valoresColunaD = [];
                linhas.forEach((linha, index) => {
                    if (index > 0) {
                        const colunas = linha.split(',');
                        valoresColunaD.push(`${index} - ${colunas[3]}`);
                    }
                });
                console.log("Valores da coluna D com numeração:", valoresColunaD);

                function formatarResultado(filtro = '') {
                    let resultadoFiltrado = `${colunasPrimeiraLinha[3]}\n\n`;
                    const valoresFiltrados = valoresColunaD.filter(item => item.toLowerCase().includes(filtro.toLowerCase()));
                    console.log("Valores filtrados:", valoresFiltrados);

                    // tamanho dos valores das células
                    const tamanhoMaximoFiltrado = Math.max(...valoresFiltrados.map(item => item.length)); 

                    // divisão entre cada coluna
                    const numeroDeColunasFiltradas = Math.ceil(valoresFiltrados.length / 15);

                    const colunasFormatadasFiltradas = Array.from({ length: numeroDeColunasFiltradas }, () => []);
                    valoresFiltrados.forEach((valor, index) => {
                        const colunaIndex = Math.floor(index / 15);
                        colunasFormatadasFiltradas[colunaIndex].push(valor.padEnd(tamanhoMaximoFiltrado, ' '));
                    });

                    console.log("Colunas formatadas filtradas:", colunasFormatadasFiltradas);

                    for (let i = 0; i < 20; i++) {
                        let linha = '';
                        colunasFormatadasFiltradas.forEach(coluna => {
                            if (coluna[i]) {
                                linha += coluna[i] + '\t';
                            }
                        });
                        if (linha.trim()) {
                            resultadoFiltrado += linha.trim() + '\n';
                        }
                    }
                    console.log("Resultado final formatado:", resultadoFiltrado);
                    return resultadoFiltrado;
                }

                // Verificar se a modal já existe
                let modal = document.querySelector('#modal');
                if (!modal) {
                    showModal(formatarResultado(), linhas);
                }
                // Atualiza a modal existente com o novo filtro
                const inputBox = document.querySelector('#inputBox');
                inputBox.addEventListener('input', function() {
                    const filtro = inputBox.value;
                    const modal = document.querySelector('#modal');
                    const modalContent = modal.querySelector('.modal-content pre');
                    modalContent.innerHTML = formatarResultado(filtro);
                });
            })
    }
});

// importa o CSS
function loadCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('modal.css');
    document.head.appendChild(link);
}

function showModal(resultado, linhas) {
    loadCSS();

    // Corpo da modal
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    // Conteúdo dentro do corpo da modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Caixa de texto da modal
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.id = 'inputBox';
    inputBox.autocomplete = 'off';
    inputBox.placeholder = 'Digite o número da opção e dê Enter';

    // Ao abrir a modal, foca na caixa de texto
    setTimeout(() => {inputBox.focus()}, 1);

    // Cria botão para fechar a modal
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

    modalContent.innerHTML = `<pre>${resultado}</pre>`;
    modalContent.insertBefore(inputBox, modalContent.firstChild); // caixa de texto
    modalContent.appendChild(closeButton); // botão de fechar
    modal.appendChild(modalContent); // conteúdo da modal
    document.body.appendChild(modal); // corpo da modal
}
