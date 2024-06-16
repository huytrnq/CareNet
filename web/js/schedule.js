document.addEventListener('DOMContentLoaded', function() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let selectedDate = null;

    const calendarDays = document.getElementById('days');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const modal = document.getElementById('appointment-modal');
    const closeModalButton = document.querySelector('.modal .close');
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentDateInput = document.getElementById('appointment-date');
    const cancelButton = document.getElementById('cancel-button');

    let month = currentMonth;
    let year = currentYear;

    function generateCalendar(month, year) {
        calendarDays.innerHTML = '';
        monthYearDisplay.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarDays.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');
            dayCell.textContent = i;
            dayCell.addEventListener('click', () => openModal(i));
            calendarDays.appendChild(dayCell);
        }
    }

    function openModal(day) {
        selectedDate = new Date(year, month, day);
        appointmentDateInput.value = selectedDate.toDateString();
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function saveAppointment(event) {
        event.preventDefault();
        const time = document.getElementById('appointment-time').value;
        const description = document.getElementById('appointment-description').value;
        console.log(`Appointment saved: ${selectedDate.toDateString()} at ${time}, ${description}`);
        closeModal();
    }

    prevMonthButton.addEventListener('click', () => {
        if (month === 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
        generateCalendar(month, year);
    });

    nextMonthButton.addEventListener('click', () => {
        if (month === 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
        generateCalendar(month, year);
    });

    closeModalButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    appointmentForm.addEventListener('submit', saveAppointment);

    generateCalendar(month, year);
});
