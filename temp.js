// Tirar o relator
// Problema: Está focando na input do relator e fechando as outras inputs
try{
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

// Causa impacto financeiro?
[...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")].find(el => el.textContent.includes("Causa impacto financeiro*")).parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].children[3].click()

// Há processo alternativo?
[...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")].find(el => el.textContent.includes("Há processo alternativo*")).parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].children[1].click()

// Este problema afeta mais de um usuário?
[...document.querySelectorAll("[id='main']")[0].querySelectorAll("span")].find(el => el.textContent.includes("Este problema afeta mais de um usuário*")).parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].children[1].click()