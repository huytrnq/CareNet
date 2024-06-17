window.onload = fetchSessionData;

// Function to fetch session data using AJAX
function fetchSessionData() {
    fetch('sessionData')
        .then(response => response.json())
        .then(data => {
            // Process patient data
            let patients = data.patients;
            let patientTable = document.getElementById('patient-table-body');
            patients.forEach(patient => {
                let row = document.createElement('tr');
                row.classList.add('patient-row');
                row.setAttribute('onclick', `handleRowClick(${patient.id})`);
                row.innerHTML = `
                    <td>${patient.firstname} ${patient.lastname}</td>
                    <td>${patient.id}</td>
                    <td>${patient.insurance}</td>
                    <td>${DateToAge(patient.dateOfBirth)}</td>
                `;
                patientTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching session data:', error));
}


function DateToAge(date) {
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
}

function saveProfile(){
    const address = getValue(document.getElementById('doctor-address').textContent);
    const affiliations = getValue(document.getElementById('doctor-affiliations').textContent);
    const expiry_date = getValue(document.getElementById('doctor-expiry').textContent);
    const license_number = getValue(document.getElementById('doctor-license').textContent);
    fetch('updateUserInfo?address=' + address + '&affiliations=' + affiliations + '&expiry_date=' + expiry_date + '&license_number=' + license_number)
        .then(response => response.json())
        .then(data => {
            status = data.status;
            if (status == 'success'){
                alert('Profile saved');
            }else{
                alert('Error saving profile');
            }
        })
        .catch(error => console.error('Error saving profile:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('sessionData?doctor=' + userName)
    .then(response => response.json())
    .then(data => {
        const doctor = data.doctor;
        const doctorFirstname = doctor.firstname;
        const doctorLastname = doctor.lastname;
        const doctorLicenseNumber = doctor.license_number;
        const doctorExpiryDate = doctor.expiry_date;
        const doctorAffiliations = doctor.affiliations;
        const doctorAddress = doctor.address;

        if (doctorFirstname != null && doctorLastname != null){
            document.getElementById('doctor-name').innerHTML = doctorFirstname + ' ' + doctorLastname;
        }
        if (doctorLicenseNumber != null){
            document.getElementById('doctor-license').innerHTML = "Licence Number: " + doctorLicenseNumber;
        }
        if (doctorExpiryDate != null){
            document.getElementById('doctor-expiry').innerHTML = "Expiry Date: " + doctorExpiryDate;
        }
        if (doctorAffiliations != null){
            document.getElementById('doctor-affiliations').innerHTML = "Affiliations: " + doctorAffiliations;
        }
        if (doctorAddress != null){
            document.getElementById('doctor-address').innerHTML = "Address: " + doctorAddress;
        }
    })
    .catch(error => console.error('Error fetching session data:', error));
});

function parseTable(tableId) {
    // Get the table element by ID
    var table = document.getElementById(tableId);
    // Get all rows from the table body
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Initialize an array to hold the parsed data
    var data = [];

    // Loop through each row
    for (var i = 0; i < rows.length; i++) {
        // Get all cells in the current row
        var cells = rows[i].getElementsByTagName('td');
        // Extract the data from the cells
        var key = cells[0].textContent.trim();
        var value = cells[1].textContent.trim();
        // Add the extracted data to the array
        data.push({ key: key, value: value });
    }

    return data;
}

function updatePatientData(){
    const updateButton = document.getElementById('update-physical-exam');
    if (updateButton.textContent == 'Update'){
        return;
    }
    var data = parseTable('physical-exam-table');
    const patientId = data[0].value;
    const height = data[1].value;
    const weight = data[2].value;
    const allergies = data[3].value;
    const blood_pressure = data[4].value;
    const current_medication = data[5].value;
    const genetic_conditions = data[6].value;
    const abdomen = data[7].value;
    const pulse = data[8].value;
    const last_surgery = data[9].value;
    fetch('updateMedicalInfo?patientId=' + patientId + '&height=' + height + '&weight=' + weight + '&allergies=' + allergies + '&blood_pressure=' + blood_pressure + '&current_medication=' + current_medication + '&genetic_conditions=' + genetic_conditions + '&abdomen=' + abdomen + '&pulse=' + pulse + '&last_surgery=' + last_surgery)
        .then(response => response.json())
        .then(data => {
            status = data.status;
            if (status == 'success'){
                alert('Patient data updated');
            }else{
                alert('Error updating patient data');
            }
        })
        .catch(error => console.error('Error updating patient data:', error));
}

// Function to handle row click
function handleRowClick(patientId) {
    document.getElementById('upload-imaging').classList.remove('hidden');
    document.getElementById('update-physical-exam').classList.remove('hidden');
    document.getElementById('imaging-upload-form_patientId').value = patientId;
    // Redirect to patient detail page or perform another action
    fetch('sessionData?patientId=' + patientId)
        .then(response => response.json())
        .then(data => {
            const patient = data.patient;
            const patientName = patient.username;
            const allergies = patient.allergies;
            const abdomen = patient.abdomen;
            const pulse = patient.pulse;
            const blood_pressure = patient.blood_pressure;
            const xray_path = patient.xray_path;
            const ultrasound_path = patient.ultrasound_path;
            const last_surgery = patient.last_surgery;
            const weight = patient.weight;
            const height = patient.height;
            const current_medication = patient.current_medication;
            const genetic_conditions = patient.genetic_conditions;
            const date_of_birth = patient.date_of_birth;
            const gender = patient.gender;
            const occupation = patient.occupation;
            const address = patient.address;
            const insurance = patient.insurance;


            if (abdomen != null || pulse != null || blood_pressure != null || allergies != null || last_surgery != null || weight != null || height != null || current_medication != null || genetic_conditions != null || date_of_birth != null || gender != null || occupation != null || address != null){
                document.getElementById('physical-exam-table').innerHTML = `
                    <tr class="hidden">
                        <td>patientId</td>
                        <td>${patientId}</td>
                    </tr>
                    <tr>
                        <td>Height (m)</td>
                        <td>${height}</td>
                    </tr>
                    <tr>
                        <td>Weight (kg)</td>
                        <td>${weight}</td>
                    </tr>
                    <tr>
                        <td>Allergies (if applicable)</td>
                        <td>${allergies}</td>
                    </tr>
                    <tr>
                        <td>Blood Pressure (mmHg)</td>
                        <td>${blood_pressure}</td>
                    </tr>
                    <tr>
                        <td>Current Medication (if applicable)</td>
                        <td>${current_medication}</td>
                    </tr>
                    <tr>
                        <td>Genetic Conditions (if applicable)</td>
                        <td>${genetic_conditions}</td>
                    </tr>
                    <tr>
                        <td>Abdomen (if applicable)</td>
                        <td>${abdomen}</td>
                    </tr>
                    <tr>
                        <td>Pulse (bpm)</td>
                        <td>${pulse}</td>
                    </tr>
                    <tr>
                        <td>Last Surgery (if applicable)</td>
                        <td>${last_surgery}</td>
                    </tr>
                    <tr>
                        <td>Insurance (if applicable)</td>
                        <td>${insurance}</td>
                    </tr>
                `;
            }
            else{
                document.getElementById('physical-exam-table').innerHTML = `
                    <tr>
                        <td>No physical exam data</td>
                    </tr>
                `;
            }

            if (xray_path != null){
                fetch('getImage?medicalImagePath=' + xray_path)
                .then(response => {
                    if (response.ok) {
                        return response.blob();
                    } else {
                        throw new Error('Image not found');
                    }
                })
                .then(blob => {
                    const imgUrl = URL.createObjectURL(blob);
                    document.getElementById('image-display-xray').src = imgUrl;
                    if(!document.getElementById('xray-description-text').classList.contains('hidden')){
                        document.getElementById('xray-description-text').classList.add('hidden');
                    }
                    if(document.getElementById('xray-description').classList.contains('hidden')){
                        document.getElementById('xray-description').classList.remove('hidden');
                    }

                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                    if(document.getElementById('xray-description-text').classList.contains('hidden')){
                        document.getElementById('xray-description-text').classList.remove('hidden');
                    }
                    if(!document.getElementById('xray-description').classList.contains('hidden')){
                        document.getElementById('xray-description').classList.add('hidden');
                    }
                    document.getElementById('image-display-xray').src = '';
                });
            }
            if (ultrasound_path != null){
                fetch('getImage?medicalImagePath=' + ultrasound_path)
                .then(response => {
                    if (response.ok) {
                        return response.blob();
                    } else {
                        throw new Error('Image not found');
                    }
                })
                .then(blob => {
                    const imgUrl = URL.createObjectURL(blob);
                    document.getElementById('image-display-ultrasound').src = imgUrl;
                    if(!document.getElementById('ultrasound-description-text').classList.contains('hidden')){
                        document.getElementById('ultrasound-description-text').classList.add('hidden');
                    }
                    if(document.getElementById('ultrasound-description').classList.contains('hidden')){
                        document.getElementById('ultrasound-description').classList.remove('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                    if(document.getElementById('ultrasound-description-text').classList.contains('hidden')){
                        document.getElementById('ultrasound-description-text').classList.remove('hidden');
                    }
                    if(!document.getElementById('ultrasound-description').classList.contains('hidden')){
                        document.getElementById('ultrasound-description').classList.add('hidden');
                    }
                    document.getElementById('image-display-ultrasound').src = '';
                });
            }
            
            showImageModal();
        })
        .catch(error => console.error('Error fetching session data:', error));
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getValue(field){
    var value = field.split(':')[1].trim();
    if (value == null || value == ''){
        value = null;
    }
    return value;
}


function showProfilePicForm(){
    var imageUploadForm = document.getElementById('profile-pic-form');
    
    if (imageUploadForm.classList.contains('hidden')){
        imageUploadForm.classList.remove('hidden');
    }else{
        imageUploadForm.classList.add('hidden');
    }
    
    var hiddenElements = imageUploadForm.getElementsByClassName('hidden');
    if (hiddenElements.length > 0){
        // Convert the HTMLCollection to an array to safely iterate and remove class
        var hiddenElementsArray = Array.prototype.slice.call(hiddenElements);
            
        // Remove 'hidden' class from each element
        hiddenElementsArray.forEach(function(element) {
            element.classList.remove('hidden');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {

    fetch('getImage?username=' + userName)
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Image not found');
            }
        })
        .then(blob => {
            const imgUrl = URL.createObjectURL(blob);
            document.getElementById('profile-pic').src = imgUrl;
        })
        .catch(error => console.error('Error fetching image:', error));
});

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

    });
});


// PHYSICAL EXAM
document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('update-physical-exam');
    let isEditable = false;

    updateButton.addEventListener('click', () => {
        const statusCells = document.querySelectorAll('.physical-exam td:nth-child(2)');

        if (!isEditable) {
            statusCells.forEach(cell => {
                cell.contentEditable = 'true';
                cell.style.outline = '2px dashed #007BFF';
                cell.style.padding = '2px';
            });
            updateButton.textContent = 'Save';
            isEditable = true;
        } else {
            statusCells.forEach(cell => {
                cell.contentEditable = 'false';
                cell.style.outline = 'none';
                cell.style.padding = '0';
            });
            updateButton.textContent = 'Update';
            isEditable = false;

            // Save the updated content
            // Here you can add the logic to save the updated content, e.g., send it to a server
        }
    });
});






// document.addEventListener('DOMContentLoaded', () => {
//     const editButton = document.getElementById('edit-contact-info');
//     const saveButton = document.getElementById('save-contact-info');
//     const editableCells = document.querySelectorAll('.editable-contact');

//     editButton.addEventListener('click', () => {
//         editableCells.forEach(cell => {
//             cell.contentEditable = 'true';
//             cell.classList.add('editing');
//         });
//         editButton.style.display = 'none';
//         saveButton.style.display = 'inline';
//     });

//     saveButton.addEventListener('click', () => {
//         editableCells.forEach(cell => {
//             cell.contentEditable = 'false';
//             cell.classList.remove('editing');
//         });
//         saveButton.style.display = 'none';
//         editButton.style.display = 'inline';
//     });
// });


function showUploadForm(){
    var imageUploadForm = document.getElementById('upload-form-container');
    if(imageUploadForm.style.display === 'none'){
        imageUploadForm.style.display = 'block';
    }else{
        imageUploadForm.style.display = 'none';
    }
}


function showImageModal(){
    var showImageBtnXray = document.getElementById('showImageBtnXray');
    var showImageBtnUltrasound = document.getElementById('showImageBtnUltrasound');
    var modal = document.getElementById('image-modal');
    var span = modal.getElementsByClassName('close')[0];
    var imgDisplay = document.getElementById('image-display');
    

    if (showImageBtnXray != null){
        showImageBtnXray.onclick = function() {
            imgDisplay.src = document.getElementById('image-display-xray').src;
            // Show the modal
            modal.style.display = 'block';
        };
    }

    if (showImageBtnUltrasound != null){
        showImageBtnUltrasound.onclick = function() {
            imgDisplay.src = document.getElementById('image-display-ultrasound').src;
        // Show the modal
            modal.style.display = 'block';
        };
    }

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
}
