document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Patient 1 - Consultation',
                start: '2024-06-01T10:00:00',
                end: '2024-06-01T11:00:00'
            },
            {
                title: 'Patient 2 - Follow-up',
                start: '2024-06-02T12:00:00',
                end: '2024-06-02T13:00:00'
            },
            {
                title: 'Patient 3 - Surgery',
                start: '2024-06-03T09:00:00',
                end: '2024-06-03T12:00:00'
            }
        ]
    });

    calendar.render();
});
