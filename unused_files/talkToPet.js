 window.onload = function() {
    const message = document.querySelector('.typewriter');
    const charCount = message.textContent.length;
    message.style.animation = `typing 2s steps(${charCount}, end)`;
    console.log(charCount);
}