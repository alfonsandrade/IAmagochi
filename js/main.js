document.addEventListener("DOMContentLoaded", () => {
   const calendar = document.getElementById("calendar");
   const toggleButton = document.getElementById("calendar-toggle-button");

   calendar.style.display = "none"; // Hide the calendar by default

   // Toggle the visibility of the calendar
   toggleButton.addEventListener("click", () => {
       calendar.style.display = calendar.style.display === "none" ? "block" : "none";
   });

   // CALENDAR CONFIG QUESTIONS
   const cfgBtn = document.getElementById('calendar-config-button');
   const studyTimePopup = document.getElementById('studyTimePopup');
   const studyTimeCloseBtn = studyTimePopup.querySelector('.close-popup');
   const studyTimePopupOpts = studyTimePopup.querySelectorAll('.popup-option');

   const sleepTimePopup = document.getElementById('sleepTimePopup');
   const sleepTimeCloseBtn = sleepTimePopup.querySelector('.close-popup');
   const sleepTimePopupOpts = sleepTimePopup.querySelectorAll('.popup-option');

   cfgBtn.addEventListener('click', function() {
      studyTimePopup.style.display = 'block';
   });

   studyTimeCloseBtn.addEventListener('click', function() {
      studyTimePopup.style.display = 'none';
   });

   window.addEventListener('click', function(event) {
      if (event.target == studyTimePopup) {
         studyTimePopup.style.display = 'none';
      }
      else if (event.target == sleepTimePopup) {
         sleepTimePopup.style.display = 'none';
      }
   });

   let answer = '';
   studyTimePopupOpts.forEach(option => {
      option.addEventListener('click', function() {
         answer = this.getAttribute('data-answer');
         console.log('Answer:', answer);
         studyTimePopup.style.display = 'none';
         sleepTimePopup.style.display = 'block';
      });
   });

   sleepTimeCloseBtn.addEventListener('click', function() {
      sleepTimePopup.style.display = 'none';
   });

   sleepTimePopupOpts.forEach(option => {
      option.addEventListener('click', function() {
         answer = answer + '_' + this.getAttribute('data-answer');
         console.log('Answer:', answer);
         sleepTimePopup.style.display = 'none';
         fillCalendar(answer);
      });
   });

   function fillCalendar(answer) {
      const [studyTimeAnswer, sleepTimeAnswer] = answer.split('_');
      console.log('Study Time Answer:', studyTimeAnswer);
      console.log('Sleep Time Answer:', sleepTimeAnswer);

      const occupiedHours = {
         'Morning': [8, 9, 10, 11],
         'Afternoon': [12, 13, 14, 15],
         'Morning-Afternoon': [7, 8, 9, 10, 12, 13, 14, 15],
         '19h': [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5],
         '20h': [20, 21, 22, 23, 0, 1, 2, 3, 4, 5],
         '21h': [21, 22, 23, 0, 1, 2, 3, 4, 5],
         '22h': [22, 23, 0, 1, 2, 3, 4, 5],
      };

      const days = document.querySelectorAll('.day');
      days.forEach(day => {
         const hoursContainer = day.querySelector('.hours');
         hoursContainer.innerHTML = ''; // Clear previous hours

         for (let hour = 0; hour < 24; hour++) {
            const hourBlock = document.createElement('div');
            hourBlock.classList.add('hour-block');
            hourBlock.textContent = `${hour}:00`;
            if (occupiedHours[studyTimeAnswer].includes(hour) ||
                  occupiedHours[sleepTimeAnswer].includes(hour)) {
                  hourBlock.classList.add('occupied');
            }
            hoursContainer.appendChild(hourBlock);
         }
      });
   }

   const chatDisplay = document.getElementById("chat-display");
   const chatInput = document.getElementById("chat-input");
   const chatSendButton = document.getElementById("chat-send-button");

   // Function to append a message to the chat display
   function appendMessage(sender, message) {
      const messageElement = document.createElement("p");
      messageElement.textContent = `${sender}: ${message}`;
      chatDisplay.appendChild(messageElement);
      chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to the latest message
   }

   // Handle sending a message
   chatSendButton.addEventListener("click", async () => {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;
  
      // Display user message
      appendMessage("You", userMessage);
      chatInput.value = ""; // Clear input box
  
      try {
         const response = await fetch("http://10.147.17.216:5005/ask?prompt=" + encodeURIComponent(userMessage));
          if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
          }
  
          const data = await response.json();
          console.log("Chatbot Response Data:", data); // Debug response structure
  
          if (data.response) {
              appendMessage("Buddy", data.response); // Primary response
          } else if (data.message && data.message.content) {
              appendMessage("Buddy", data.message.content); // Fallback response
          } else if (data.error) {
              appendMessage("Buddy", `Error: ${data.error}`);
          } else {
              appendMessage("Buddy", "Sorry, I didn't understand that.");
          }
      } catch (error) {
          console.error("Error communicating with chatbot:", error);
          appendMessage("Buddy", `Sorry, I couldn't connect to the chatbot: ${error.message}`);
      }
  });
  

});
