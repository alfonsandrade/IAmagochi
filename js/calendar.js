document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const toggleButton = document.getElementById("calendar-toggle-button");

    // Toggle the visibility of the calendar
    toggleButton.addEventListener("click", () => {
        calendar.style.display = calendar.style.display === "none" ? "block" : "none";
    });

    // CALENDAR CONFIG QUESTIONS
    const cfgBtn = document.getElementById('calendar-config-button');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-popup');
    const popupOptions = document.querySelectorAll('.popup-option');

    cfgBtn.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    let answer = '';
    popupOptions.forEach(option => {
        option.addEventListener('click', function() {
            answer = this.getAttribute('data-answer');
            console.log('Answer:', answer);
            popup.style.display = 'none';
            fillCalendar(answer);
        });
    });

    function fillCalendar(answer) {
        const occupiedHours = {
            'Morning': [8, 9, 10, 11],
            'Afternoon': [12, 13, 14, 15],
            'Morning-Afternoon': [7, 8, 9, 10, 12, 13, 14, 15]
        };

        const days = document.querySelectorAll('.day');
        days.forEach(day => {
            const hoursContainer = day.querySelector('.hours');
            hoursContainer.innerHTML = ''; // Clear previous hours

            for (let hour = 0; hour < 24; hour++) {
                const hourBlock = document.createElement('div');
                hourBlock.classList.add('hour-block');
                hourBlock.textContent = `${hour}:00`;
                if (occupiedHours[answer].includes(hour)) {
                    hourBlock.classList.add('occupied');
                }
                hoursContainer.appendChild(hourBlock);
            }
        });
    }
});
