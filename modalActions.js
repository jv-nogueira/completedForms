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
                        // Aguarda a página carregar
                        setTimeout(() => {
                            // Inicia de baixo para cima
                            setTimeout(() => {
                                try{
                                    var startWork = [...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")].find(el => el.textContent.includes("Hora de Início do trabalho*")).parentElement.parentElement.parentElement.children[1].children[0].children[2].children[0]
    
                                    startWork.scrollIntoView()
    
                                    startWork.dispatchEvent(
                                        new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true })
                                      );
                                    setTimeout(() => {
                                        startWork.dispatchEvent(
                                            new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true })
                                        );
                                        
                                    },1000)                                  
                                }catch{
                                    console.log("Erro ao setar horario de inicio")
                                }
    
                                try {
                                    var endWork = [...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")].find(el => el.textContent.includes("Hora de Fim do trabalho*")).parentElement.parentElement.parentElement.children[1].children[0].children[2].children[0]
    
                                    endWork.scrollIntoView()
    
                                    endWork.dispatchEvent(
                                        new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true })
                                      );
                                    endWork.dispatchEvent(
                                    new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true })
                                    );
                                    setTimeout(() => {
                                        endWork.dispatchEvent(
                                            new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true })
                                        );
                                        
                                    },1000)         
                                } catch {
                                    console.log("Erro ao setar horario de fim")
                                }
                                setTimeout(() => {
                                    // Descrição
                                    if (valoresColunaG[0].includes("Incidente")) {
                                        let description = document.querySelector('#ak-editor-textarea')
                                        description.scrollIntoView()
                                        // .value não funciona
                                        description.textContent = 'Prezados, colaborador(a) entra em contato por telefone e relata';
                                    } else if (valoresColunaG[0].includes("Requisição")) {
                                        let description = document.querySelector('#ak-editor-textarea')
                                        description.scrollIntoView()
                                        // .value não funciona
                                        description.textContent = 'Prezados, colaborador(a) entra em contato por telefone e solicita';
                                    }
                                    setTimeout(() => {
                                        try{
                                            let elementAssunto = document.querySelectorAll("[title='long text']")[0];
                                            elementAssunto.scrollIntoView()
                                            // Assunto da planilha
                                            elementAssunto.value = valoresColunaD[0] + " ";
                                        } catch {
                                            console.log("Assunto falhou")
                                        }
                                    },1000)
                                },1000)
                            },1000)
                        }, 3000);
                    }, 2000);
                }, 2000);
            }, 1000);
        } else {
            console.log("Número inválido.");
        }
    }
}
