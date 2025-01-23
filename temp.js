       /*
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
        */
        document.addEventListener("keydown", function(event) {
            if (event.ctrlKey && event.key === "k") { // Verifica se Ctrl e K minúsculo foram pressionados
                event.preventDefault(); // Previne qualquer comportamento padrão da combinação
                alert("Teste");
            }
        });
        