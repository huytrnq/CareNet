<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Profile</title>
    <link rel="stylesheet" href="css/Patient.css">
    <script>
        var patientId = "<s:property value='%{#session.userId}'/>";
        var userName = "<s:property value='%{#session.user.username}'/>";
    </script>

    <style>
        .row {
            display: flex;
            align-items: center;
        }
        .row button{
            margin-left: auto;
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>

<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <div class="logo">CareNet</div>
            <div class="list-items">
                <div class="overview"><a href="<s:url action='patient'/>">Profile</a></div>
                <div class="overview"><a href="qaPage.html">Q&A</a></div>
                <div class="user-name-container">
                    <div class="user-name"><s:property value="#session.user.firstname"/> <s:property value="#session.user.lastname"/></div>
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
                <div class="row">
                    <h3>Health Summary</h3>
                    <button class="edit-button" id="edit-health-summary">Edit</button>
                    <button class="edit-button" id="save-health-summary" style="display: none;" onclick="updateMedicalInfo()">Save</button>
                </div>
                <table id="health-summary-table">
                    <tr>
                        <td>Height</td>
                        <td id="height" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td id="weight" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Allergies</td>
                        <td id="allergies" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Blood Pressure</td>
                        <td id="blood_pressure" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Current medication (if applicable)</td>
                        <td id="current_medication" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Genetic conditions</td>
                        <td id="genetic_conditions" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Abdomen</td>
                        <td id="abdomen" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Pulse</td>
                        <td id="pulse" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Last surgery</td>
                        <td id="last_surgery" class="editable-health" contenteditable="false"></td>
                    </tr>
                    <tr>
                        <td>Insurance</td>
                        <td id="insurance" class="editable-health" contenteditable="false"></td>
                    </tr>
                </table>
            </div>
            
            <div class="imaging">
                <h3>Imaging</h3>
                <div class="imaging-details" id="imaging-details">
                    <p id="xray-description">X-Ray: <button id="showImageBtnXray">Show Image</button></p>
                    <p id="ultrasound-description">Ultrasonography: <button id="showImageBtnUltrasound">Show Image</button></p>
                </div>

                <!-- Image Modal -->
                <img id="image-display-xray" src="" alt="Image" class="hidden" />
                <img id="image-display-ultrasound" src="" alt="Image" class="hidden" />
                <div id="image-modal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img id="image-display" src="" alt="Image" />
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>



<script src="js/patient.js"></script>

</body>
</html>