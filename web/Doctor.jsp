<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctor Dashboard</title>
    <link rel="stylesheet" href="css/Doctor.css">
    <style>
        /* Hover effect for patient names */
        .patient-row {
            cursor: pointer;
            transition: color 0.3s, font-weight 0.3s;
        }

        .patient-row:hover {
            color: #007BFF;
            font-weight: bold;
        }
        #profile-pic-form {
            display: flex;
            align-items: center;
        }
        .form-group {
            display: inline-block;
            margin-right: 10px;
        }
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
    <script>
        // Embed Struts values into JavaScript variables
        var userName = "<s:property value='%{#session.user.username}'/>";

        document.addEventListener('DOMContentLoaded', function() {
            console.log("User Name: " + userName);
        });
    </script>

</head>
<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <a href="/CareNet" style="text-decoration: none;"><div class="logo"">CareNet</div></a>
            <div class="list-items">
                <div class="overview"><a href="<s:url action='doctor'/>">Profile</a></div>
                <div class="calendar"><a href="<s:url action='calendar'/>">Calendar</a></div>
                <div class="user-name-container">
                    <div class="user-name"><s:property value="#session.user.firstname"/> <s:property value="#session.user.lastname"/></div>
                    <div class="dropdown-content">
                        <a href="<s:url action='logout'/>">Log Out</a>
                    </div>
                </div>
            </div>
        </header>
        <section class="profile">
            <div class="doctor-profile">
                <div class="profile-header">
                    <s:url var="profileImageUrl" value="%{#session.user.profilePath}"/>
                    <img id="profile-pic" onclick="showProfilePicForm()" src="<s:property value="%{#profileImageUrl}"/>" alt="Profile Picture">
                    <div class="profile-info">
                        <h2 contenteditable="false" id="doctor-name"><s:property value="#session.user.firstname"/> <s:property value="#session.user.lastname"/></h2>
                        <p contenteditable="false" id="doctor-qualifications"><s:property value="#session.user.qualifications"/></p>
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
                            <td>Licence Number</td>
                            <td contenteditable="false" id="doctor-license"><s:property value="#session.user.licenseNumber"/></td>
                        </tr>
                        <tr>
                            <td>Expiry Date</td>
                            <td contenteditable="false" id="doctor-expiry"><s:property value="#session.user.expiryDate"/></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td contenteditable="false" id="doctor-address"><s:property value="#session.user.address"/></td>
                        </tr>
                        <tr>
                            <td>Affiliations</td>
                            <td contenteditable="false" id="doctor-affiliations"><s:property value="#session.user.affiliations"/></td>
                        </tr>
                        <tr>
                            <td>Specialization</td>
                            <td contenteditable="false" id="doctor-specialization"><s:property value="#session.user.occupation"/></td>
                        </tr>
                    </table>
                </div>
                <div class="initiate-visit">
                    <button id="edit-button">Edit</button>
                    <button id="save-button" style="display:none;" onclick="saveProfile()">Save</button>
                </div>
            </div>
            <div class="patient-info">
                <h3>Patients Information</h3>
                <div class="table-container">
                    <table id="patient-table">
                        <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Patient ID</th>
                            <th>Insurance Number</th>
                            <th>Age</th>
                        </tr>
                        </thead>
                        <tbody id="patient-table-body">
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="dashboard">
            <div class="physical-exam">
                <div class="row">
                    <h3>Physical Exam</h3>
                    <button id="update-physical-exam" class="update-button hidden" onclick=updatePatientData()>Update</button>
                </div>
                <table id="physical-exam-table">
                    <tr>
                        <td>Choose a patient to view physical exam</td>
                    </tr>
                </table>
            </div>
            <div class="imaging">
                <h3>Imaging</h3>
                <div class="imaging-details" id="imaging-details">
                    <p id="xray-description-text">X-Ray: <a class="xray-description">No Description</a></p>
                    <p id="ultrasound-description-text">Ultrasonography: <a class="ultrasound-description">No Description</a></p>
                    <p id="xray-description" class="hidden">X-Ray: <button id="showImageBtnXray">Show Image</button></p>
                    <p id="ultrasound-description" class="hidden">Ultrasonography: <button id="showImageBtnUltrasound">Show Image</button></p>
                </div>
                <div id="upload-imaging" class="upload-imaging hidden">
                    <button id="show-upload-form" onclick="showUploadForm()">Upload New Image</button>
                    <div id="upload-form-container" style="display: none;">
                        <h4>Upload New Image</h4>

                        <form action="uploadImage" method="post" enctype="multipart/form-data">
                            <label for="imaging-type">Type:</label>
                            <select id="imaging-type" name="imagingType" required>
                                <option value="xray">X-ray</option>
                                <option value="ultrasound">Ultrasound</option>
                            </select>
                            <label for="imaging-type">Select Image:</label>
                            <input type="hidden" name="patientId" id="imaging-upload-form_patientId">
                            <input type="file" name="uploadFile" value="" id="imaging-upload-form_uploadFile">
                            <input type="submit" value="Upload" id="imaging-upload-form_0">
                        </form>
                    </div>
                </div>
                <!-- Button to trigger the modal -->
                <!-- <button id="showImageBtn">Show Image</button> -->

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



<script src="js/doctor.js"></script>
<!-- <script src="js/imagingUpload.js"></script> -->
</body>
</html>
