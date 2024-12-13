function typeText(element, text, isBuddy = false) {
   return new Promise((resolve) => {  // Added Promise wrapper
       const speed = 30;
       let index = 0;
       const messageParagraph = document.createElement('p');
       
       if (isBuddy) {
           messageParagraph.style.color = '#43766C';
       }
       
       // Special handling for typing indicator
       if (text === "Buddy: ...") {
           messageParagraph.style.color = '#a1a1a1';
           messageParagraph.innerHTML = 'Buddy: <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
           element.appendChild(messageParagraph);
           
           // Add animation class to dots with delay
           const dots = messageParagraph.querySelectorAll('.dot');
           dots.forEach((dot, i) => {
               dot.style.animationDelay = `${i * 0.15}s`;
           });
           
           resolve(messageParagraph);  // Now resolve is defined
           return;
       }

       element.appendChild(messageParagraph);

       function type() {
           if (index < text.length) {
               messageParagraph.textContent += text.charAt(index);
               index++;
               setTimeout(type, speed);
           } else {
               resolve(messageParagraph);  // Resolve when typing is complete
           }
       }

       if (isBuddy) {
           type();
       } else {
           messageParagraph.textContent += text;
           resolve(messageParagraph);
       }
   });
}

//

document.addEventListener("DOMContentLoaded", () => {
   const chatDisplay = document.querySelector("#speech-bubble");
   const chatInput = document.getElementById("userInput");
   const chatSendButton = document.getElementById("sendButton");

   async function appendMessage(sender, message) {
       const fullMessage = `${sender}: ${message}`;
       const isBuddy = sender === "Buddy";
       return typeText(chatDisplay, fullMessage, isBuddy);
   }

   chatSendButton.addEventListener("click", async () => {
       const userMessage = chatInput.value.trim();
       if (!userMessage) return;

       // Clear input immediately
       chatInput.value = "";

       // Show user message first
       await appendMessage("You", userMessage);

       // Show typing indicator
       const typingIndicator = await appendMessage("Buddy", "...");

       try {
           const response = await fetch("http://127.0.0.1:5005/ask?prompt=" + encodeURIComponent(userMessage));
           const data = await response.json();
           
           // Remove typing indicator
           typingIndicator.remove();
           
           // Show Buddy's response
           appendMessage("Buddy", data.response || "Sorry, I didn't understand that.");
       } catch (error) {
           // Remove typing indicator
           typingIndicator.remove();
           
           appendMessage("Buddy", `Error: ${error.message}`);
       }
   });
});