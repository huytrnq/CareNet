<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Profile (Test)</title>
    <link rel="stylesheet" href="Patient.css">
</head>

<body>
    <div class="container">
        <main class="main-content">
            <header class="header">
                <div class="logo">CareNet</div>
                <div class="search-bar">
                    <input type="text" placeholder="Search Appointments, Staffs, etc">
                </div>
                <div class="list-items">
                    <div class="overview"><a href="testPage.html">Profile</a></div>
                    <div class="overview"><a href="qaPage.html">Q&A</a></div>
                    <div class="calendar"><a href="calendarPage.html">Schedule Appointment</a></div>
                    <div class="user-name-container">
                        <div class="user-name">Options</div>
                        <div class="dropdown-content">
                            <a href="index.html">Log Out</a>
                        </div>
                    </div>
                </div>
            </header>
            <section class="profile">
            <div class="patient-profile">
                <h3>Your information</h3>
                <div class="profile-header">
                    <img src="../IMG/default_user.png" alt="Profile Picture" id="profile-pic">
                    <div class="profile-info">
                        <h2 contenteditable="false" id="patient-name">Huy chin chon</h2>
                        
                    </div>
                </div>
                <div id="profile-pic-menu" class="profile-pic-menu" style="display:none;">
                    <button id="change-pic-button">Change Profile Picture</button>
                </div>
                <form id="profile-pic-form" style="display:none;">
                    <input type="file" id="profile-pic-upload" accept="image/*">
                    <button type="submit" class="upload-button">Upload</button>
                </form>
                <div class="contact-info">
                    <p contenteditable="false" id="patient-age">Age: 26</p>
                    <p contenteditable="false" id="patient-birth">Birth: 12/07/2023</p>
                    <p contenteditable="false" id="patient-nationality">Nationality: Chinese</p>
                    <p contenteditable="false" id="patient-occupation">Occupation: Dog Cooker</p>
                    <p contenteditable="false" id="patient-status">Marital status: Single</p>
                </div>
                <div class="initiate-visit">
                    <button id="edit-button">Edit</button>
                    <button id="save-button" style="display:none;">Save</button>
                </div>
            </div>
                <div class="doctor-info">
                    <h3>Doctor's Information</h3>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor's name</th>
                                    <th>Speciality</th>
                                    <th>Availability</th>
                                    <th>Schedule Appointment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>Mr. Lorem Ipsum 1</td>
                                <td>Cardiology</td>
                                <td>High</td>
                                <td class="patient-name" href="../html/calendarPage.html">here</td>
                                </tr>
                                <td>Mr. Lorem Ipsum 2</td>
                                <td>Dermatology</td>
                                <td>High</td>
                                <td class="patient-name" href="../html/calendarPage.html">here</td>
                                </tr>
                                <td>Mr. Lorem Ipsum 3</td>
                                <td>Neurology</td>
                                <td>Low</td>
                                <td class="patient-name" href="../html/calendarPage.html">here</td>
                                </tr>
                                <td>Mr. Lorem Ipsum 4</td>
                                <td>Pediatrics</td>
                                <td>Medium</td>
                                <td class="patient-name" href="../html/calendarPage.html">here</td>
                                </tr>
                                <td>Mr. Lorem Ipsum 5</td>
                                <td>Orthopedics</td>
                                <td>Medium</td>
                                <td class="patient-name" href="../html/calendarPage.html">here</td>
                                </tr>
                                <td>Mr. Lorem Ipsum 6</td>
                                <td>Oncology</td>
                                <td>High</td>
                                <td class="patient-name" href="../html/calendarPage.html">here</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section class="dashboard">
                <div class="physical-exam">
                    <h3>Health Summary</h3>
                    <button id="update-physical-exam" class="update-button">Update</button>
                    <table>
                        <tr>
                            <td>Height</td>
                            <td contenteditable="false">1.72 m</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td class="height-status" contenteditable="false">70 kg</td>
                        </tr>
                        <tr>
                            <td>Food Allergies</td>
                            <td class="heart-status" contenteditable="false">Pollen</td>
                        </tr>
                        <tr>
                            <td>Medication Allergies</td>
                            <td class="bp-status" contenteditable="false">Ibuprofren</td>
                        </tr>
                        <tr>
                            <td>Blood Type</td>
                            <td class="pulse-status" contenteditable="false">O+</td>
                        </tr>
                        <tr>
                            <td>Current medication (if applicable)</td>
                            <td class="abdomen-status" contenteditable="false">None</td>
                        </tr>
                        <tr>
                            <td>Genetic conditions</td>
                            <td class="weight-status" contenteditable="false">Asthma</td>
                        </tr>
                    </table>
                </div>
                <div class="medical-history">
                    <h3>Medical History</h3>
                    <div class="incident-form">
                        <label for="incident">Incident:</label>
                        <input type="text" id="incident" name="incident" placeholder="Describe the incident">
                        <label for="date">Date:</label>
                        <input type="date" id="date" name="date">
                        <button type="button" onclick="addIncident()">Add Incident</button>
                    </div>
                    <div id="no-history">No medical history</div>
                    <table id="incident-table" style="display: none;">
                        <thead>
                            <tr>
                                <th>Incident</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Incidents will be added here -->
                        </tbody>
                    </table>
                </div>
                <div class="imaging">
                    <h3>Imaging</h3>
                    <div class="imaging-details" id="imaging-details">
                        <p>X-Ray: <span class="xray-description" data-image="">Description</span></p>
                        <p>Ultrasonography: <span class="ultrasound-description" data-image="">Description</span></p>
                    </div>
                    <div class="upload-imaging">
                        <button id="show-upload-form">Upload New Imaging</button>
                        <div id="upload-form-container" style="display: none;">
                            <h4>Upload New Imaging</h4>
                            <form id="imaging-upload-form">
                                <label for="imaging-type">Type:</label>
                                <input type="text" id="imaging-type" name="imaging-type" required>
                                <label for="imaging-description">Description:</label>
                                <input type="text" id="imaging-description" name="imaging-description" required>
                                <label for="imaging-file">Select Image:</label>
                                <input type="file" id="imaging-file" name="imaging-file" accept="image/*" required>
                                <button type="submit" class="upload-button">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <!-- Image Modal -->
    <div id="image-modal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-image">
        <div id="caption"></div>
    </div>

    <!-- Pop up window-->
    <div id="popup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <h2>Edit Information</h2>
            <form id="edit-form">
                <label for="age">Age:</label>
                <input type="text" id="age" name="age"><br><br>
                <label for="birth">Birth:</label>
                <input type="text" id="birth" name="birth"><br><br>
                <label for="nationality">Nationality:</label>
                <input type="text" id="nationality" name="nationality"><br><br>
                <label for="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation"><br><br>
                <label for="marital-status">Marital Status:</label>
                <input type="text" id="marital-status" name="marital-status"><br><br>
                <button type="button" onclick="saveEdit()">Save</button>
            </form>
        </div>
    </div>

    <script src="patientData.js"></script>
    <script src="profileEdit.js"></script>
    <script src="imagingUpload.js"></script>
    <script src="profilePicUpload.js"></script>
    <script src="physicalExamUpdate.js"></script>
    <script src="PatientINFO.js"></script>
    <script src="healthhistory.js"></script>


</body>

</html>