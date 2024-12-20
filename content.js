// Função para carregar e injetar HTML e CSS
function injectModal() {
    // Verifica se a modal já foi injetada
    if (document.getElementById('extension-modal')) return;
  
    // Carrega o HTML da modal
    fetch(chrome.runtime.getURL('modal.html'))
      .then((response) => response.text())
      .then((html) => {
        const modalElement = document.createElement('div');
        modalElement.innerHTML = html;
        document.body.appendChild(modalElement);
  
        // Carrega o CSS da modal
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = chrome.runtime.getURL('modal.css');
        document.head.appendChild(cssLink);
  
        // Adiciona evento para fechar a modal
        document
          .getElementById('close-modal')
          .addEventListener('click', () => {
            document.getElementById('extension-modal').style.display = 'none';
          });
      });
  }
  
  // Função para exibir a modal
  function showModal() {
    const modal = document.getElementById('extension-modal');
    if (modal) {
      modal.style.display = 'flex'; // Exibe a modal
    }
  }
  
  // Escuta o evento de tecla F2
  document.addEventListener('keydown', function (e) {
    if (e.key === 'F2') {
      injectModal(); // Injeta a modal, caso ainda não esteja na página
      showModal();   // Exibe a modal
    }
  });
  