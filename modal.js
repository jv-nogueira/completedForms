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
                console.log("Primeira linha do CSV (títulos):", colunasPrimeiraLinha);

                const valoresColunaD = [];
                linhas.forEach((linha, index) => {
                    if (index > 0) {
                        const colunas = linha.split(',');
                        valoresColunaD.push(`${index} - ${colunas[3]}`);
                    }
                });
                console.log("Valores da coluna D com numeração:", valoresColunaD);

                function formatarResultado(filtro = '') {
                    console.log("Formatando resultado com filtro:", filtro);
                    let resultadoFiltrado = `${colunasPrimeiraLinha[3]}\n\n`;
                    const valoresFiltrados = valoresColunaD.filter(item => item.toLowerCase().includes(filtro.toLowerCase()));
                    console.log("Valores filtrados:", valoresFiltrados);

                    const tamanhoMaximoFiltrado = Math.max(...valoresFiltrados.map(item => item.length));
                    console.log("Tamanho máximo dos valores filtrados:", tamanhoMaximoFiltrado);

                    const numeroDeColunasFiltradas = Math.ceil(valoresFiltrados.length / 15);
                    console.log("Número de colunas filtradas:", numeroDeColunasFiltradas);

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
                console.log("Modal existente verificada:", modal);
                if (!modal) {
                    showModal(formatarResultado(), linhas);
                    console.log("Nova modal criada.");
                }

                const inputBox = document.querySelector('#inputBox');
                console.log("InputBox selecionado:", inputBox);
                inputBox.addEventListener('input', function() {
                    const filtro = inputBox.value;
                    console.log("Valor do filtro digitado na inputBox:", filtro);

                    // Atualizar a modal existente com o novo filtro
                    const modal = document.querySelector('#modal');
                    console.log("Modal encontrada para atualização:", modal);
                    const modalContent = modal.querySelector('.modal-content pre');
                    modalContent.innerHTML = formatarResultado(filtro);
                    console.log("Modal atualizada com novos resultados.");
                });
            })
            .catch(error => {
                console.error("Erro ao processar a planilha:", error);
            });
    }
});

function loadCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('modal.css');
    document.head.appendChild(link);
}

function showModal(resultado, linhas) {
    console.log("Criando modal com resultado:", resultado);
    loadCSS();

    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.id = 'inputBox';
    inputBox.autocomplete = 'off';
    inputBox.placeholder = 'Digite o número da opção e dê Enter';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    setTimeout(() => {
        inputBox.focus();
    }, 1);

    inputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            console.log("Enter pressionado.");
            console.log("Processando seleção com base na linha:", linhas[inputBox.value]);
            processarSelecao(inputBox.value, linhas);
        }
    });

    modalContent.innerHTML = `<pre>${resultado}</pre>`;
    modalContent.insertBefore(inputBox, modalContent.firstChild);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    console.log("Conteúdo adicionado à modal.");

    document.body.appendChild(modal);
    console.log("Modal adicionada ao body.");
}
