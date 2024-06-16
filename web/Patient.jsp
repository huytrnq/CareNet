<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Profile</title>
    <link rel="stylesheet" href="css/Patient.css">

    <script>
        // Embed Struts values into JavaScript variables
        var userName = "<s:property value='%{#session.user.username}'/>";
        var patientId = "<s:property value='%{#session.userId}'/>";

        document.addEventListener('DOMContentLoaded', function() {
            console.log("User Name: " + userName);
            console.log("Patient Id: " + patientId);
        });
    </script>
</head>

<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <div class="logo">CareNet</div>
            <div class="list-items">
                <div class="overview"><a href="testPage.jsp">Profile</a></div>
                <div class="overview"><a href="qaPage.jsp">Q&A</a></div>
                <div class="calendar"><a href="calendarPage.jsp">Schedule Appointment</a></div>
                <div class="user-name-container">
                    <div class="user-name">Options</div>
                    <div class="dropdown-content">
                        <a class="log" href="<s:url action='logout'/>">Log Out</a>
                    </div>
                </div>
            </div>
        </header>
        <section class="profile">
            <div class="patient-profile">
                <h3>Your information</h3>
                <div class="profile-header">
                    <img onclick="showProfilePicForm()" id="profile-pic" src="<s:property value="%{#profileImageUrl}"/>" alt="Profile Picture">
                    <div class="profile-info">
                        <h2><s:property value="%{#session.user.firstname}"/> <s:property value="%{#session.user.lastname}"/></h2>
                    </div>
                </div>
                <form id="profile-pic-form" class="hidden" name="profile-pic-form" action="uploadImage" method="post" enctype="multipart/form-data" class="">
                    <div class="form-group">
                        <input type="file" name="uploadFile" value="" id="profile-pic-form_uploadFile">
                        <input type="submit" value="Upload" id="profile-pic-form_0">
                    </div>
                </form>

                <div class="contact-info">
                    <table>
                        <tr>
                            <td>Birth</td>
                            <td id="birthday" class="editable-contact"><s:property value="#session.user.dateOfBirth"/></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td id="gender" class="editable-contact"><s:property value="#session.user.gender"/></td>
                        </tr>
                        <tr>
                            <td>Occupation</td>
                            <td id="occupation" class="editable-contact"><s:property value="#session.user.occupation"/></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td id="address" class="editable-contact"><s:property value="#session.user.address"/></td>
                        </tr>
                    </table>
                    <button  class="edit-button" id="edit-contact-info">Edit</button>
                    <button class="edit-button" id="save-contact-info" style="display: none;" onclick="saveProfile()"">Save</button>
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
                                <th>Schedule Appointment</th>
                            </tr>
                        </thead>
                        <tbody id="doctors-table">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="dashboard">
            <div class="health-summary">
                <h3>Health Summary</h3>
                <!-- <button class="edit-button" id="edit-health-summary">Edit</button>
                <button class="edit-button" id="save-health-summary" style="display: none;">Save</button> -->
                <table>
                    <tr>
                        <td>Height</td>
                        <td id="height" class="editable-health" contenteditable="false">1.72 m</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td id="weight" class="editable-health" contenteditable="false">70 kg</td>
                    </tr>
                    <tr>
                        <td>Allergies</td>
                        <td id="allergies" class="editable-health" contenteditable="false">Pollen</td>
                    </tr>
                    <tr>
                        <td>Blood Pressure</td>
                        <td id="blood_pressure" class="editable-health" contenteditable="false">O+</td>
                    </tr>
                    <tr>
                        <td>Current medication (if applicable)</td>
                        <td id="current_medication" class="editable-health" contenteditable="false">None</td>
                    </tr>
                    <tr>
                        <td>Genetic conditions</td>
                        <td id="genetic_conditions" class="editable-health" contenteditable="false">Asthma</td>
                    </tr>
                    <tr>
                        <td>Abdomen</td>
                        <td id="abdomen" class="editable-health" contenteditable="false">None</td>
                    </tr>
                    <tr>
                        <td>Pulse</td>
                        <td id="pulse" class="editable-health" contenteditable="false">None</td>
                    </tr>
                    <tr>
                        <td>Last surgery</td>
                        <td id="last_surgery" class="editable-health" contenteditable="false">None</td>
                    </tr>
                </table>
            </div>
            
            <div class="imaging">
                <h3>Imaging</h3>
                <div class="imaging-details" id="imaging-details">
                    <p>X-Ray: <span class="xray-description" data-image="">Description</span></p>
                    <p>Ultrasonography: <span class="ultrasound-description" data-image="">Description</span></p>
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

<!-- <script src="js/profileEdit.js"></script> -->
<!-- <script src="js/imagingUpload.js"></script> -->
<!-- <script src="js/profilePicUpload.js"></script> -->
<!-- <script src="js/physicalExamUpdate.js"></script> -->
<!-- <script src="js/PatientINFO.js"></script> -->
<!-- <script src="js/healthhistory.js"></script> -->
<script src="js/patient.js"></script>

</body>
</html>