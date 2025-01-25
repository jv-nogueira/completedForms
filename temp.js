
       // Telefone
        try{
            document.querySelectorAll("[title='long text']")[1].value = "0 "
        }catch{
            console.log("Não tem telefone")
        }
        // Patrimonio
        try{
            document.querySelectorAll("[title='short text']")[0].value = 'nao perguntado '
        }catch{
        console.log("Não tem patrimonio")
        }

        // Verifica o texto da coluna atividade
        [...document.querySelectorAll('span')].find(al => al.textContent == "Selecione a atividade*").parentElement.parentElement.parentElement.children[1].children[0].children[3].children[0].children[0].children[i].textContent

        // Abre coluna atividade
        elemento = [...document.querySelectorAll('span')].find(al => al.textContent == "Selecione a atividade*").parentElement.parentElement.parentElement.children[1].children[0].children[2].children[1]
            elemento.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true })
            );