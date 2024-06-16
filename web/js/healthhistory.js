function addIncident() {
    const incidentInput = document.getElementById('incident');
    const dateInput = document.getElementById('date');

    const incident = incidentInput.value;
    const date = dateInput.value;

    if (incident === '' || date === '') {
        alert('Please fill in both the incident and date.');
        return;
    }

    const tableBody = document.querySelector('#incident-table tbody');
    const newRow = document.createElement('tr');

    const incidentCell = document.createElement('td');
    incidentCell.textContent = incident;
    newRow.appendChild(incidentCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = date;
    newRow.appendChild(dateCell);

    tableBody.appendChild(newRow);

    // Show the table and hide the no-history message
    document.getElementById('incident-table').style.display = 'table';
    document.getElementById('no-history').style.display = 'none';

    // Clear the input fields
    incidentInput.value = '';
    dateInput.value = '';
}

function checkInitialHistory() {
    const tableBody = document.querySelector('#incident-table tbody');
    if (tableBody.children.length === 0) {
        document.getElementById('incident-table').style.display = 'none';
        document.getElementById('no-history').style.display = 'block';
    } else {
        document.getElementById('incident-table').style.display = 'table';
        document.getElementById('no-history').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', checkInitialHistory);
