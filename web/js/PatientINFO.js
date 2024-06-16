// scripts.js

function openPopup() {
    // Fill the form with current values
    document.getElementById('age').value = document.querySelector('.age').innerText;
    document.getElementById('birth').value = document.querySelector('.birth').innerText;
    document.getElementById('nationality').value = document.querySelector('.nationality').innerText;
    document.getElementById('occupation').value = document.querySelector('.occupation').innerText;
    document.getElementById('marital-status').value = document.querySelector('.status').innerText;

    // Display the popup
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function saveEdit() {
    // Get the new values from the form
    const newAge = document.getElementById('age').value;
    const newBirth = document.getElementById('birth').value;
    const newNationality = document.getElementById('nationality').value;
    const newOccupation = document.getElementById('occupation').value;
    const newMaritalStatus = document.getElementById('marital-status').value;

    // Update the table with the new values
    document.querySelector('.age').innerText = newAge;
    document.querySelector('.birth').innerText = newBirth;
    document.querySelector('.nationality').innerText = newNationality;
    document.querySelector('.occupation').innerText = newOccupation;
    document.querySelector('.status').innerText = newMaritalStatus;

    // Close the popup
    closePopup();
}
