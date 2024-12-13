document.addEventListener("keydown", function(event) {
    if (event.keyCode === 113) { // F2 para iniciar
      console.log("F2 pressionado, numerando as linhas da coluna D...");
  
      const planilhaUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA1YNzHggx374b2qLpbtPvOxpHLn_B3JVB2yKj413BI1FIjWslKCiOWnTDpT30kTRpXANPhKkOUV2e/pub?output=csv';
  
      fetch(planilhaUrl)
        .then(response => response.text())
        .then(data => {
          // Dividir o CSV em linhas
          const linhas = data.split('\n');
          
          // Usar a primeira linha (índice 0) como título da coluna D
          const colunasPrimeiraLinha = linhas[0].split(',');
          let resultado = `${colunasPrimeiraLinha[3]}\n\n`;

          // A partir da segunda linha, numerar as linhas da coluna D
          linhas.forEach((linha, index) => {
            if (index > 0) { // Ignorar a primeira linha (título)
              const colunas = linha.split(',');

              // Verificar se a linha tem uma coluna D (índice 3)
              if (colunas[3] !== undefined) {
                // Adicionar a numeração e o valor da célula da coluna D ao resultado
                resultado += `${index} - ${colunas[3]}\n`;
              }
            }
          });
  
          // Criar e exibir a modal
          showModal(resultado);
        })
        .catch(error => {
          console.error("Erro ao processar a planilha:", error);
        });
    }
  });
  
  // Função para criar e exibir a modal
  function showModal(resultado) {
    // Criar elementos da modal
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
  
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'black';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.width = '80vw';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    modalContent.innerHTML = `<pre>${resultado}</pre>`;
  
    // Criar o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    
    closeButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
  
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
  
    // Adicionar a modal à página
    document.body.appendChild(modal);
  }
