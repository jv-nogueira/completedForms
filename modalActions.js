 function processarSelecao(inputBoxValue, linhas) {
    // Verificar se o valor digitado é um número
    const numeroEscolhido = parseInt(inputBoxValue.trim(), 10);
    console.log("Numero escolhido: "+numeroEscolhido)
    if (!isNaN(numeroEscolhido)) {
        // Verificar se o número escolhido é válido
        if (numeroEscolhido > 0 && numeroEscolhido < linhas.length) {
            document.body.removeChild(document.getElementById('modal'));

            // Pega o valor da linha escolhida e da coluna G (índice 6)
            const colunas = linhas[numeroEscolhido].split(',');
            console.log("var colunas "+colunas)

            // Armazena os valores das colunas da planilha
            const valoresColunaG = [colunas[6]];
            const valoresColunaF = [colunas[5]];
            const valoresColunaD = [colunas[3]];

            setTimeout(() => {
                // Acionar o clique para tela inicial
                document.querySelectorAll("[aria-label='Trilhas']")[0].children[0].children[1].children[0].click();

                setTimeout(() => {
                    console.log("Valor da Coluna G: ", valoresColunaG);
                    if (valoresColunaG[0].includes("Incidente")) {
                        console.log("Script inicia como incidente");
                        document.querySelectorAll("[data-test-id='request-group:Estou com problema ou dificuldade']")[0].click();
                    } else if (valoresColunaG[0].includes("Requisição")) {
                        console.log("Script inicia como requisição");
                        document.querySelectorAll("[data-test-id='request-group:Estou com uma dúvida ou preciso fazer uma solicitação']")[0].click();
                    }

                    setTimeout(() => {
                        console.log("Valor da Coluna F: ", valoresColunaF);
                        let indexCategoryList = 0;
                        listaCategoria();

                        function listaCategoria() {
                            const categoryList = document.querySelectorAll("[for='request-type-select']")[0].parentElement.parentElement.children[1].children[indexCategoryList].children[0].children[0].children[1].children[0];
                            if (categoryList.textContent.includes(valoresColunaF[0])) {
                                console.log("O valor da coluna F é true");
                                categoryList.click();
                            } else {
                                console.log("O valor da linha da coluna F é falso");
                                indexCategoryList++;
                                listaCategoria();
                            }
                        }

                        setTimeout(() => {
                            try{
                            setTimeout(() => {
                                // Na coluna D da planilha que tem o título "Assunto" setar o mesmo da planilha no script
                                let elementAssunto = document.querySelectorAll("[title='long text']")[0];
                                // Assunto da planilha
                                elementAssunto.value = valoresColunaD[0] + " ";
                            }, 1000);
                            } catch {
                                console.log("Assunto falhou")
                            }
                            try{
                                // Telefone
                                setTimeout(() => {document.querySelectorAll("[title='long text']")[1].value = "0 "}, 1000);
                            }catch{
                                console.log("Não tem telefone")
                            }
                            try{
                                // Patrimonio
                                setTimeout(() => {document.querySelectorAll("[title='short text']")[0].value = 'nao perguntado '}, 1000);
                            }catch{
                            console.log("Não tem patrimonio")
                            }
                            try{
                                // Está focando na input do relator e fechando as outras inputs
                                /*
                                setTimeout(() => {
                                const elemento = document.querySelector("[aria-label='clear']").parentElement;
                                if (elemento) {
                                    const evento = new MouseEvent('mousedown', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    elemento.dispatchEvent(evento); // Dispara o evento
                                    console.log('Evento pointerdown simulado no elemento:', elemento);
                                } else {
                                    console.error('Elemento não encontrado!');
                                }
                                }, 1000);
                                */
                            } catch{
                                console.log("Falhou ao clicar para tirar o relator")
                            }
                            // Descrição
                            if (valoresColunaG[0].includes("Incidente")) {
                                // .value não funciona
                                document.querySelector('#ak-editor-textarea').textContent = 'Prezados, colaborador(a) entra em contato por telefone e relata';
                            } else if (valoresColunaG[0].includes("Requisição")) {
                                // .value não funciona
                                document.querySelector('#ak-editor-textarea').textContent = 'Prezados, colaborador(a) entra em contato por telefone e solicita';
                            }


                        }, 3000);
                    }, 2000);
                }, 2000);
            }, 1000);
        } else {
            console.log("Número inválido.");
        }
    }
}
