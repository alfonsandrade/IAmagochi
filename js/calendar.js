document.addEventListener("DOMContentLoaded", () => {
   const calendar = document.getElementById("calendar");

   calendar.style.display = "none"; // Hide the calendar by default

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
         sleepTimePopup.style.display = 'none';
         fillCalendar(answer);
      });
   });

   function fillCalendar(answer) {
      const [studyTimeAnswer, sleepTimeAnswer] = answer.split('_');

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
});
