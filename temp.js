// Telefone
try{
    setTimeout(() => {document.querySelectorAll("[title='long text']")[1].value = "0 "}, 1000);
}catch{
    console.log("Não tem telefone")
}
// Patrimonio
try{
    setTimeout(() => {document.querySelectorAll("[title='short text']")[0].value = 'nao perguntado '}, 1000);
}catch{
console.log("Não tem patrimonio")
}


  