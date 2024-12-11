$(document).ready(function() {
    // Selecione os elementos do DOM usando jQuery
    const $calendar = $('#calendar');
    const $calendarOverlay = $('#calendar-overlay');
  
    const $cfgBtn = $('#calendar-config-button');
    const $studyTimePopup = $('#studyTimePopup');
    const $studyTimeCloseBtn = $studyTimePopup.find('.close-popup');
    const $studyTimePopupOpts = $studyTimePopup.find('.popup-option');
    const $sleepTimePopup = $('#sleepTimePopup');
    const $sleepTimeCloseBtn = $sleepTimePopup.find('.close-popup');
    const $sleepTimePopupOpts = $sleepTimePopup.find('.popup-option');
 
    let answer = ''; // Variável para armazenar as respostas do usuário
 
    // Esconde o calendário por padrão
    $calendar.hide();
    $calendarOverlay.hide();
 
    // Fechar o calendário ao clicar na sobreposição
    $calendarOverlay.on('click', function() {
       $calendar.hide();
       $calendarOverlay.hide();
    });
 
    // Abrir o popup de configuração (estudo)
    $cfgBtn.on('click', function() {
       $studyTimePopup.show();
       $calendar.hide();
       $calendarOverlay.hide();
    });
 
    // Fechar o popup de estudo
    $studyTimeCloseBtn.on('click', function() {
       $studyTimePopup.hide();
       $calendar.show();
       $calendarOverlay.show();
    });
 
    // Fechar o popup de estudo ou sono ao clicar fora
    $(window).on('click', function(event) {
       if (event.target === $studyTimePopup[0]) {
          $studyTimePopup.hide();
       } else if (event.target === $sleepTimePopup[0]) {
          $sleepTimePopup.hide();
       }
    });
 
    // Responder sobre o horário de estudo e abrir o popup de sono
    $studyTimePopupOpts.on('click', function() {
       answer = $(this).data('answer');
       $studyTimePopup.hide();
       $sleepTimePopup.show();
    });
 
    // Fechar o popup de sono
    $sleepTimeCloseBtn.on('click', function() {
       $sleepTimePopup.hide();
       $calendar.show();
       $calendarOverlay.show();
    });
 
    // Processar a seleção do horário de sono
    $sleepTimePopupOpts.on('click', function() {
       answer += `_${$(this).data('answer')}`;
       $sleepTimePopup.hide();
       fillCalendar(answer);
    });
 
    // Preencher o calendário com as horas ocupadas
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
 
       const $days = $('.day');
       $days.each(function() {
          const $hoursContainer = $(this).find('.hours');
          $hoursContainer.empty(); // Limpar as horas anteriores
 
          // Criar as horas para o dia
          for (let hour = 0; hour < 24; hour++) {
             const $hourBlock = $('<div>').addClass('hour-block').text(`${hour}:00`);
             if (occupiedHours[studyTimeAnswer].includes(hour) || occupiedHours[sleepTimeAnswer].includes(hour)) {
                $hourBlock.addClass('occupied');
             }
             $hoursContainer.append($hourBlock);
          }
       });
 
       $calendar.show();
       $calendarOverlay.show();
    }
 
 });
 