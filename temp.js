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