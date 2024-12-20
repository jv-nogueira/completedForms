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
            // Verificar se o valor digitado é um número
            const numeroEscolhido = parseInt(inputBox.value.trim(), 10);
            if (!isNaN(numeroEscolhido)) {
                // Verificar se o número escolhido é válido
                if (numeroEscolhido > 0 && numeroEscolhido < linhas.length) {
                    document.body.removeChild(modal);
                    // Pega o valor da linha escolhida e da coluna G (índice 6)
                    const colunas = linhas[numeroEscolhido].split(',');

                    // Armazena os valores das colunas da planilha 
                    const valoresColunaG = [];
                    valoresColunaG.push(`${colunas[6]}`);
                    const valoresColunaF = [];
                    valoresColunaF.push(`${colunas[5]}`);
                    const valoresColunaD = [];
                    valoresColunaD.push(`${colunas[3]}`);

                    setTimeout(()=>{
                        // Acionar o clique para tela inicial
                        document.querySelectorAll("[aria-label='Trilhas']")[0].children[0].children[1].children[0].click()
                        setTimeout(()=>{
                            console.log("Valor da Coluna G: ", valoresColunaG);
                            if(valoresColunaG[0].includes("Incidente")){
                                console.log("Script inicia como incidente")
                                document.querySelectorAll("[data-test-id='request-group:Estou com problema ou dificuldade']")[0].click()
                            }else if (valoresColunaG[0].includes("Requisição")){
                                console.log("Script inicia como requisição")
                                document.querySelectorAll("[data-test-id='request-group:Estou com uma dúvida ou preciso fazer uma solicitação']")[0].click()
                            };
                            setTimeout(()=>{
                                console.log("Valor da Coluna F: ", valoresColunaF);
                                var indexCategoryList = 0
                                listaCategoria()
                                function listaCategoria(){
                                    var categoryList = document.querySelectorAll("[for='request-type-select']")[0].parentElement.parentElement.children[1].children[indexCategoryList].children[0].children[0].children[1].children[0]
                                    if(categoryList.textContent.includes(valoresColunaF[0])){
                                    console.log("O valor da coluna F é true")
                                    categoryList.click()
                                    } else {
                                        console.log("O valor da linha da coluna F é falso")
                                        indexCategoryList++
                                        listaCategoria()
                                    }
                                };
                                setTimeout(()=>{
                                    // Na coluna D da planilha que tem o título "Assunto" setar o mesmo da planilha no script
                                    let elementAssunto = document.querySelector('#pf-undefined-tl-1')
                                    // Adicionar manipulador de evento para manter o atributo
                                    elementAssunto.addEventListener('blur', (e) => {
                                        e.preventDefault(); // Previne o comportamento padrão de remoção do atributo
                                        elementAssunto.setAttribute('data-focus-visible-added', '');
                                    });
                                    setTimeout(()=>{
                                    elementAssunto.setAttribute('value', valoresColunaD[0]);
                                    // Assunto da planilha
                                    elementAssunto.value = valoresColunaD[0]+" " 
                                    },2000)

                                    // Nesse script abaixo, manter como está
                                    document.querySelector('#ak-editor-textarea').textContent = 'Prezados, colaborador(a) entra em contato por telefone e solicita'
                                },3000)
                            },2000)
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
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Adicionar a modal à página
    document.body.appendChild(modal);
}
