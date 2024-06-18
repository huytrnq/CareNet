var occupiedTime = [];

document.addEventListener('DOMContentLoaded', function() {
    var doctorId = urlParams.get('doctorId');
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [
            // Add more events here
        ],
        dateClick: function(info) {
            var modal = document.getElementById('event-modal');
            var span = document.getElementsByClassName('close')[0];
            var dateInput = document.getElementById('eventDate');
            var form = document.getElementById('event-form');

            // Pre-fill the date input
            dateInput.value = info.dateStr;

            // Show the modal
            modal.style.display = 'block';

            // Close the modal when the close button is clicked
            span.onclick = function() {
                modal.style.display = 'none';
            };

            // Close the modal when the user clicks outside of the modal
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };

            // Handle form submission
            form.onsubmit = function(event) {
                event.preventDefault();
                
                var title = document.getElementById('eventTitle').value;
                var date = document.getElementById('eventDate').value;
                var time = document.getElementById('eventTime').value;

                if (title && date && time) {
                    if (isAppointmentAvailable(date, time) && !inThePast(date, time)){
                        calendar.addEvent({
                            title: title,
                            start: date + 'T' + time
                        });
                        occupiedTime.push(date + 'T' + time);
                        // Clear the form
                        form.reset();
                        // Hide the modal
                        modal.style.display = 'none';
                    }
                } else {
                    alert('Please fill out the required fields.');
                }
            };
        }
    });
    fetch(`sessionData?appointment=true&doctorId=${doctorId}`)
        .then(response => response.json())
        .then(data => {
            var appointments = data.appointments;
            appointments.forEach(appointment => {
                calendar.addEvent({
                    title: appointment.status,
                    start: appointment.event_date + 'T' + appointment.event_time
                });
                occupiedTime.push(appointment.event_date + 'T' + appointment.event_time);
            });
            calendar.render();
        });
});


function addEvent() {
    var doctorId = urlParams.get('doctorId');
    var title = document.getElementById('eventTitle').value;
    var date = document.getElementById('eventDate').value;
    var time = document.getElementById('eventTime').value;
    if (isAppointmentAvailable(date, time) && !inThePast(date, time)){
        fetch(`/CareNet/appointment?doctorId=${doctorId}&eventTitle=${title}&eventDate=${date}&eventTime=${time}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        window.location.reload();
    } else if (inThePast(date, time)){
        alert('Appointment is in the past. Please select appropriate time slot.');
    }
    else{
        alert('Appointment is not available. Please select a time slot that is divided into 30-minute intervals.');
    }
}

function isAppointmentAvailable(date, time){
    var appointmentTime = date + 'T' + time;
    for (let i = 0; i < occupiedTime.length; i++) {
        let scheduledTime = occupiedTime[i];
        if (inThePast(appointmentTime, scheduledTime)){
            return false;
        }
        if (Math.abs(parseInt(timeDiff(appointmentTime, scheduledTime))) < 1000*60*30){
            return false;
        }
    }
    return true;
}

function inThePast(date, time){
    var appointmentTime = date + 'T' + time;
    var currentTime = new Date().toISOString();
    return parseInt(timeDiff(appointmentTime, currentTime)) < 0;
}

function timeDiff(time1, time2){
    var date1 = new Date(time1);
    var date2 = new Date(time2);
    var diff = date1.getTime() - date2.getTime();
    return diff;
}