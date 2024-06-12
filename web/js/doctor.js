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

// Function to handle row click
function handleRowClick(patientId) {
    // Redirect to patient detail page or perform another action
    fetch('sessionData?patientId=' + patientId)
        .then(response => response.json())
        .then(data => {
            const patient = data.patient;
            const allergies = patient.allergies;
            const abdomen = patient.abdomen;
            const pulse = patient.pulse;
            const risk_factor = patient.risk_factor;
            const blood_pressure = patient.blood_pressure;
            const xray_path = patient.xray_path;
            const heart = patient.heart;
            const ultrasound_path = patient.ultrasound_path;
            const last_surgery = patient.last_surgery;

            if(risk_factor != null){
                document.getElementById('risk-factor').innerHTML = risk_factor;
            }else{
                document.getElementById('risk-factor').innerHTML = `<div class='update-risk-factor'>
                    <input type="text" id="risk-factor-input">
                    <button id="add-risk-factor-btn">Add risk factor</button>
                </div>`;
            }

            if (abdomen != null || pulse != null || blood_pressure != null || heart != null || allergies != null || last_surgery != null){
                document.getElementById('physical-exam-table').innerHTML = `
                    <tr>
                        <td>Abdomen</td>
                        <td>${abdomen}</td>
                    </tr>
                    <tr>
                        <td>Pulse</td>
                        <td>${pulse}</td>
                    </tr>
                    <tr>
                        <td>Blood Pressure</td>
                        <td>${blood_pressure}</td>
                    </tr>
                    <tr>
                        <td>Heart</td>
                        <td>${heart}</td>
                    </tr>
                    <tr>
                        <td>Allergies</td>
                        <td>${allergies}</td>
                    </tr>
                    <tr>
                        <td>Last Surgery</td>
                        <td>${last_surgery}</td>
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
                document.getElementById('xray-description').innerHTML = `<p>X-Ray: <span class="xray-description" data-image="">Description</span></p>`;
                document.getElementById('ultrasound-description').innerHTML = `<p>Ultrasonography: <span class="ultrasound-description" data-image="">Description</span></p>`;
            }else{
                document.getElementById('xray-description').innerHTML = `<p>X-Ray: <span class="xray-description" data-image="">No Description</span></p>`;
                document.getElementById('ultrasound-description').innerHTML = `<p>Ultrasonography: <span class="ultrasound-description" data-image="">No Description</span></p>`;
            }

        })
        .catch(error => console.error('Error fetching session data:', error));
}

function saveProfile(){
    const address = getValue(document.getElementById('doctor-address').textContent);
    const affiliations = getValue(document.getElementById('doctor-affiliations').textContent);
    const expiry_date = getValue(document.getElementById('doctor-expiry').textContent);
    const license_number = getValue(document.getElementById('doctor-license').textContent);
    const profile_path = document.getElementById('profile-picture').src;
    fetch('updateUserInfo?address=' + address + '&affiliations=' + affiliations + '&expiry_date=' + expiry_date + '&license_number=' + license_number + '&profile_path=' + profile_path)
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

function getValue(field){
    var value = field.split(':')[1].trim();
    if (value == null || value == ''){
        value = null;
    }
    return value;
}