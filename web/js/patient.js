
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
        const risk_factor = patient.risk_factor;
        const blood_pressure = patient.blood_pressure;
        const xray_path = patient.xray_path;
        const heart = patient.heart;
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
                document.getElementById('xray-description').innerHTML = `<p id="xray-description">X-Ray: <a class="xray-description" href="${imgUrl}">Description</a></p>`;
            })
            .catch(error => console.error('Error fetching image:', error));
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
                document.getElementById('ultrasound-description').innerHTML = `<p id="ultrasound-description">Ultrasonography: <a class="ultrasound-description" href="${imgUrl}">Description</a></p>`;
            })
            .catch(error => console.error('Error fetching image:', error));
        }
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
            doctorTable.innerHTML += `<tr><td>${doctorFirstname} ${doctorLastname}</td><td>${doctorSpecialization}</td><td><a href="calendarPage.jsp?doctorId=${doctorId}">Click Here</a></td></tr>`;
        });
    }).catch(error => console.error('Error fetching session data:', error));
});









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