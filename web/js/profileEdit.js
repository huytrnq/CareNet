document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');

    const editableFields = [
        document.getElementById('doctor-name'),
        document.getElementById('doctor-qualifications'),
        document.getElementById('doctor-license'),
        document.getElementById('doctor-expiry'),
        document.getElementById('doctor-address'),
        document.getElementById('doctor-affiliations')
    ];

    editButton.addEventListener('click', () => {
        editableFields.forEach(field => field.setAttribute('contenteditable', 'true'));
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
    });

    saveButton.addEventListener('click', () => {
        editableFields.forEach(field => field.setAttribute('contenteditable', 'false'));
        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';

        // Optionally, send updated data to the server or handle it as needed
        // For example:
        // const updatedData = {
        //     name: document.getElementById('doctor-name').textContent,
        //     qualifications: document.getElementById('doctor-qualifications').textContent,
        //     license: document.getElementById('doctor-license').textContent,
        //     expiry: document.getElementById('doctor-expiry').textContent,
        //     address: document.getElementById('doctor-address').textContent,
        //     affiliations: document.getElementById('doctor-affiliations').textContent
        // };
        // console.log('Updated Data:', updatedData);
    });
});
