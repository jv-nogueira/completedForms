
// Na coluna D da planilha que tem o título "Assunto" setar o mesmo da planilha no script
document.querySelector('#pf-undefined-tl-1').value = 'Ola'

// Nesse script abaixo, manter como está
document.querySelector('#ak-editor-textarea').value = 'Ola'

try{
    // Está focando na input do relator e fechando as outras inputs
    
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
    
} catch{
    console.log("Falhou ao clicar para tirar o relator")
}

try{
    // Telefone
    //setTimeout(() => {document.querySelectorAll("[title='long text']")[1].value = "0 "}, 1000);
}catch{
    console.log("Não tem telefone")
}
try{
    // Patrimonio
    //setTimeout(() => {document.querySelectorAll("[title='short text']")[0].value = 'nao perguntado '}, 1000);
}catch{
console.log("Não tem patrimonio")
}