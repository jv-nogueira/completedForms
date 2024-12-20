chrome.runtime.onInstalled.addListener(function () {
    chrome.commands.onCommand.addListener(function (command) {
      console.log(command);
    });
  });
  
  // Escutar o pressionamento da tecla F2
  document.addEventListener('keydown', function (e) {
    if (event.keyCode === 113) {
      chrome.action.openPopup(); // Abre o pop-up ao pressionar F2
    }
  });
  