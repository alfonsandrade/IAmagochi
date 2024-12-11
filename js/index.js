$(document).ready(function() {
   const $chatDisplay = $('#chat-display');
   const $chatInput = $('#chat-input');
   const $chatSendButton = $('#chat-send-button');
   const $calendarToggleBtn = $('#calendar-toggle-button');

   // Carregar o conteúdo do calendar.html
   fetch('../calendar.html')
   .then(response => {
      if (response.ok) {
         return response.text();
      } else {
         throw new Error('Falha ao carregar o conteúdo');
      }
   })
   .then(data => {
      document.getElementById('calendar-content').innerHTML = data;

      const $calendar = $('#calendar');
      const $calendarOverlay = $('#calendar-overlay');

      // Alternar visibilidade do calendário
      $calendarToggleBtn.on('click', function() {
         $calendar.toggle();
         $calendarOverlay.toggle();
      });

      const calendarScript = document.createElement('script');
      calendarScript.src = 'js/calendar.js';  // Caminho para o seu arquivo calendar.js
      calendarScript.type = 'text/javascript';
      document.body.appendChild(calendarScript);
   })
   .catch(error => {
      console.error('Erro:', error);
   });

  

   // Função para adicionar mensagem ao chat
   function appendMessage(sender, message) {
       const messageElement = $('<p></p>').text(`${sender}: ${message}`);
       $chatDisplay.append(messageElement);
       $chatDisplay.scrollTop($chatDisplay[0].scrollHeight); // Rolar para a última mensagem
   }

   // Enviar mensagem ao clicar no botão
   $chatSendButton.on('click', async function() {
       const userMessage = $chatInput.val().trim();
       if (!userMessage) return;

       appendMessage("You", userMessage);
       $chatInput.val(''); // Limpar campo de input

       try {
           const response = await fetch("http://10.147.17.216:5005/ask?prompt=" + encodeURIComponent(userMessage));
           const data = await response.json();
           appendMessage("Buddy", data.response || "Sorry, I didn't understand that.");
       } catch (error) {
           appendMessage("Buddy", `Error: ${error.message}`);
       }
   });
});
