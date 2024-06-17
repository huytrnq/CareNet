
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}


function saveProfile(){
    const birthday = document.getElementById('birthday').textContent;
    const gender = document.getElementById('gender').textContent;
    const occupation = document.getElementById('occupation').textContent;
    const address = document.getElementById('address').textContent;
    fetch('updateUserInfo?birthday=' + birthday + '&gender=' + gender + '&occupation=' + occupation + '&address=' + address)
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
        
        if (date_of_birth != null){
            document.getElementById('birthday').innerHTML = date_of_birth;
        }
        if (gender != null){
            document.getElementById('gender').innerHTML = gender;
        }
        if (occupation != null){
            document.getElementById('occupation').innerHTML = occupation;
        }
        if (address != null){
            document.getElementById('address').innerHTML = address;
        }
        if (weight != null){
            document.getElementById('weight').innerHTML = weight;
        }
        if (height != null){
            document.getElementById('height').innerHTML = height;
        }
        if (allergies != null){
            document.getElementById('allergies').innerHTML = allergies;
        }
        if (blood_pressure != null){
            document.getElementById('blood_pressure').innerHTML = blood_pressure;
        }
        if (current_medication != null){
            document.getElementById('current_medication').innerHTML = current_medication;
        }
        if (genetic_conditions != null){
            document.getElementById('genetic_conditions').innerHTML = genetic_conditions;
        }
        if (abdomen != null){
            document.getElementById('abdomen').innerHTML = abdomen;
        }
        if (pulse != null){
            document.getElementById('pulse').innerHTML = pulse;
        }
        if (last_surgery != null){
            document.getElementById('last_surgery').innerHTML = last_surgery;
        }
        if (insurance != null){
            document.getElementById('insurance').innerHTML = insurance;
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
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                document.getElementById('xray-description').innerHTML = `<p id="xray-description">X-Ray: <a class="xray-description" href="">No Description</a></p>`;
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
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                document.getElementById('ultrasound-description').innerHTML = `<p id="ultrasound-description">Ultrasonography: <a class="ultrasound-description" href="">No Description</a></p>`;
                document.getElementById('image-display-ultrasound').src = '';
            });
        }
        showImageModal();
    })
    .catch(error => console.error('Error fetching session data:', error));
});



document.addEventListener('DOMContentLoaded', function() {
    
    fetch('sessionData?doctors=all')
    .then(response => response.json())
    .then(data => {
        const doctors = data.doctors;
        doctors.forEach(doctor => {
            const doctorName = doctor.username;
            const doctorSpecialization = doctor.specialization;
            const doctorAddress = doctor.address;
            const doctorPhone = doctor.phone;
            const doctorEmail = doctor.email;
            const doctorId = doctor.id;
            const doctorFirstname = doctor.firstname;
            const doctorLastname = doctor.lastname;
            const doctorTable = document.getElementById('doctors-table');
            doctorTable.innerHTML += `<tr><td>${doctorFirstname} ${doctorLastname}</td><td>${doctorSpecialization}</td><td><a href="appointment?doctorId=${doctorId}">Click Here</a></td></tr>`;
        });
    }).catch(error => console.error('Error fetching session data:', error));
});


function updateMedicalInfo(){
    var data = parseTable('health-summary-table');
    var height = data[0].value;
    var weight = data[1].value;
    var allergies = data[2].value;
    var blood_pressure = data[3].value;
    var current_medication = data[4].value;
    var genetic_conditions = data[5].value;
    var abdomen = data[6].value;
    var pulse = data[7].value;
    var last_surgery = data[8].value;
    var insurance = data[9].value;
    fetch('updateMedicalInfo?patientId=' + patientId + '&height=' + height + '&weight=' + weight + '&allergies=' + allergies + '&blood_pressure=' + blood_pressure + '&current_medication=' + current_medication + '&genetic_conditions=' + genetic_conditions + '&abdomen=' + abdomen + '&pulse=' + pulse + '&last_surgery=' + last_surgery + '&insurance=' + insurance)
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



/// Effects
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-contact-info');
    const saveButton = document.getElementById('save-contact-info');
    const editableCells = document.querySelectorAll('.editable-contact');

    editButton.addEventListener('click', () => {
        editableCells.forEach(cell => {
            cell.contentEditable = 'true';
            cell.classList.add('editing');
        });
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
    });

    saveButton.addEventListener('click', () => {
        editableCells.forEach(cell => {
            cell.contentEditable = 'false';
            cell.classList.remove('editing');
        });
        saveButton.style.display = 'none';
        editButton.style.display = 'inline';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-health-summary');
    const saveButton = document.getElementById('save-health-summary');
    const editableCells = document.querySelectorAll('.editable-health');

    editButton.addEventListener('click', () => {
        editableCells.forEach(cell => {
            cell.contentEditable = 'true';
            cell.classList.add('editing');
        });
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
    });

    saveButton.addEventListener('click', () => {
        editableCells.forEach(cell => {
            cell.contentEditable = 'false';
            cell.classList.remove('editing');
        });
        saveButton.style.display = 'none';
        editButton.style.display = 'inline';
    });
});



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
