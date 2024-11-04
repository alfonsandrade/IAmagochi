document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const toggleButton = document.getElementById("calendar-toggle-button");

    // Toggle the visibility of the calendar
    toggleButton.addEventListener("click", () => {
        calendar.style.display = calendar.style.display === "none" ? "block" : "none";
    });

    // Predefined occupied hours
    const occupiedHours = {
        Monday: [9, 10, 11, 12, 14, 15, 16, 17],
        Tuesday: [13, 14, 15, 16, 17],
        Wednesday: [11, 12, 13],
        Thursday: [10, 11, 15],
        Friday: [9, 17],
        Saturday: [],
        Sunday: []
    };

    // Populate hours
    const days = document.querySelectorAll(".day");
    days.forEach(day => {
        const dayName = day.getAttribute("data-day");
        const hoursContainer = day.querySelector(".hours");

        for (let i = 0; i < 24; i++) {
            const hourBlock = document.createElement("div");
            hourBlock.classList.add("hour-block");
            if (occupiedHours[dayName].includes(i)) {
                hourBlock.classList.add("occupied");
            }
            hoursContainer.appendChild(hourBlock);
        }
    });
});
