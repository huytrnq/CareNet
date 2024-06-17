document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [
            // Add more events here
        ],
    });
    fetch(`sessionData?appointment=true&doctorId=${userId}`)
        .then(response => response.json())
        .then(data => {
            var appointments = data.appointments;
            appointments.forEach(appointment => {
                console.log(appointment, appointment.event_date, appointment.event_time);
                calendar.addEvent({
                    title: appointment.status,
                    start: appointment.event_date + 'T' + appointment.event_time
                });
            });
            calendar.render();
        });
    })


    var event_time = document.getElementsByClassName('fc-event-time');

    event_time.forEach(event => {
        event.addEventListener('click', function() {
            console.log('Event clicked:', event);
        });
    });
;


