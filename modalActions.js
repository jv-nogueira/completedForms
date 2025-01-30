 function processarSelecao(inputBoxValue, linhas) {
    // Verificar se o valor digitado é um número
    // .trim() exige que seja uma string para converter em número
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
            const valoresColunaE = [colunas[4]];

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
                                    // Remover o relator 
                                    const elemento = document.querySelector("[aria-label='clear']").parentElement;
                                    const evento = new MouseEvent('mousedown', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    elemento.dispatchEvent(evento); // Dispara o evento      
                                } catch{
                                    console.log("Falhou ao clicar para tirar o relator")
                                }
                                setTimeout(() => { 
                                    // Abre a lista de atividade
                                    var evento = new MouseEvent('mousedown', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    try{
                                        elementoAtividade = [...document.querySelectorAll('span')].find(al => al.textContent == "Selecione a atividade*").parentElement.parentElement.parentElement.children[1].children[0].children[2].children[1]

                                        if(elementoAtividade){
                                        elementoAtividade.dispatchEvent(evento); 
                                        }
                                    }catch{
                                        console.log("Erro ao clicar para selecionar atividades")
                                    }
                                    try{
                                        elementoNegocio = [...document.querySelectorAll('span')].find(al => al.textContent == "Processo de negócio*").parentElement.parentElement.parentElement.children[1].children[0].children[2].children[1]
                                    
                                        if(elementoNegocio){
                                            elementoNegocio.dispatchEvent(evento); 
                                        }
                                    }catch{
                                        console.log("Erro ao clicar para selecionar processe de negócio")
                                    }
                                    setTimeout(() => { 
                                        try{
                                            let indexActivityList = 0;
                                            listaAtividade();
                                            // Seleciona lista de atividades
                                            function listaAtividade() {
                                                const activityList = [...document.querySelectorAll('span')].find(al => al.textContent == "Selecione a atividade*").parentElement.parentElement.parentElement.children[1].children[0].children[3].children[0].children[0].children[indexActivityList];
                                                if (activityList.textContent.includes(valoresColunaE[0])) {
                                                    console.log("O valor da coluna E é true");
                                                    activityList.click();
                                                } else {
                                                    indexActivityList++;
                                                    listaAtividade();
                                                }
                                            }
                                        }catch{
                                            console.log("erro na lista de atividades")
                                        }
                                        try{
                                            let indexProcessList = 0;
                                            listaProcessoNegocio();
                                            // Seleciona lista de atividades
                                            function listaProcessoNegocio() {
                                                const processList = [...document.querySelectorAll('span')].find(al => al.textContent == "Processo de negócio*").parentElement.parentElement.parentElement.children[1].children[0].children[3].children[0].children[0].children[indexProcessList];
                                                if (processList.textContent.includes(valoresColunaE[0])) {
                                                    console.log("O valor da coluna E é true");
                                                    processList.click();
                                                } else {
                                                    indexProcessList++;
                                                    listaProcessoNegocio();
                                                }
                                            }
                                        }catch{
                                            console.log("erro na lista processo de negócio")                                           
                                        }
                                        setTimeout(() => {                             
                                            try {
                                                // Sem impacto financeiro
                                                [...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")]
                                                .find(el => el.textContent.includes("Causa impacto financeiro*"))
                                                .parentElement.parentElement.parentElement.children[1]
                                                .children[0].children[0].children[0].children[3].click();
                                            
                                                //Não
                                                [...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")]
                                                .find(el => el.textContent.includes("Há processo alternativo*"))
                                                .parentElement.parentElement.parentElement.children[1]
                                                .children[0].children[0].children[0].children[1].click();
                                            
                                                //Não
                                                [...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")]
                                                .find(el => el.textContent.includes("Este problema afeta mais de um usuário*"))
                                                .parentElement.parentElement.parentElement.children[1]
                                                .children[0].children[0].children[0].children[1].click();
                                            }catch{
                                                console.log("Erro ao selecionar a radio do SAP")
                                            }
                                            try{
                                                // Dropbox de inicio de trabalho
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
                                                // Dropbox de fim de trabalho
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
                                            try{
                                                // Dropbox de local unidade ou sede
                                                let local = [...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")].find(el => el.textContent.includes("Selecione o local")).parentElement.parentElement.parentElement.children[2].children[0].children[2].children[0]

                                                local.dispatchEvent(
                                                    new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true })
                                                );
                                                local.dispatchEvent(
                                                    new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true })
                                                );
                                                setTimeout(() => {
                                                    local.dispatchEvent(
                                                        new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true })
                                                    );   
                                                },1000)  
                                            }catch{
                                                console.log("Erro ao setar unidade")
                                            }
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
                                    },3000)
                                },3000)
                            },1000)
                        }, 1500);
                    }, 2000);
                }, 2000);
            }, 1000);
        } else {
            console.log("Número inválido.");
        }
    }
}
