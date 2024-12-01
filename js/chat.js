document.addEventListener("DOMContentLoaded", () => {
    const chatDisplay = document.getElementById("chat-display");
    const chatInput = document.getElementById("chat-input");
    const chatSendButton = document.getElementById("chat-send-button");
 
    function appendMessage(sender, message) {
       const messageElement = document.createElement("p");
       messageElement.textContent = `${sender}: ${message}`;
       chatDisplay.appendChild(messageElement);
       chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to the latest message
    }
 
    chatSendButton.addEventListener("click", async () => {
       const userMessage = chatInput.value.trim();
       if (!userMessage) return;
 
       appendMessage("You", userMessage);
       chatInput.value = "";
 
       try {
          const response = await fetch("http://10.147.17.216:5005/ask?prompt=" + encodeURIComponent(userMessage));
          const data = await response.json();
          appendMessage("Buddy", data.response || "Sorry, I didn't understand that.");
       } catch (error) {
          appendMessage("Buddy", `Error: ${error.message}`);
       }
    });
 });
 