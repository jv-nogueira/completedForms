// Na coluna G da planilha que tem o título "Tipo", a linha corespondente vai estar com o valor incidente ou requisição, entao os script abaixo sao referentes a cada escolha
// Opção requisição 
document.querySelectorAll("[data-test-id='request-group:Estou com uma dúvida ou preciso fazer uma solicitação']")[0]
// Opção incidente
document.querySelectorAll("[data-test-id='request-group:Estou com problema ou dificuldade']")[0]

// Na coluna F da planilha tem o título "Categoria". Se algum da lista incluir a mesma palavra, entao dar Enter
document.querySelectorAll("[for='request-type-select']")[0].parentElement.parentElement.children[1].children[i].children[0].children[0].children[1].children[0].textContent

// Na coluna D da planilha que tem o título "Assunto" setar o mesmo da planilha no script
document.querySelector('#pf-undefined-tl-1').value = 'Ola'

// Nesse script abaixo, manter como está
document.querySelector('#ak-editor-textarea').value = 'Ola'