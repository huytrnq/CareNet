<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctor Dashboard</title>
    <link rel="stylesheet" href="css/Doctor.css">
    <script src="js/doctor.js"></script>
</head>
<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <div class="logo">CareNet</div>
            <div class="list-items">
                <div class="overview"><a href="<s:url action='doctor'/>">OVERVIEW</a></div>
                <div class="calendar"><a href="<s:url action='calendar'/>">CALENDAR</a></div>
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
                    <img src="<s:property value="%{#profileImageUrl}"/>" alt="Profile Picture" id="profile-picture">
                    <div class="profile-info">
                        <h2 contenteditable="false" id="doctor-name"><s:property value="#session.user.firstname"/> <s:property value="#session.user.lastname"/></h2>
                        <p contenteditable="false" id="doctor-qualifications"><s:property value="#session.user.qualifications"/></p>
                    </div>
                </div>
                <div class="contact-info">
                    <p contenteditable="false" id="doctor-license">Licence Number: <s:property value="#session.user.licenseNumber"/></p>
                    <p contenteditable="false" id="doctor-expiry">Expiry Date: <s:property value="#session.user.expiryDate"/></p>
                    <p contenteditable="false" id="doctor-address">Address: <s:property value="#session.user.address"/></p>
                    <p contenteditable="false" id="doctor-affiliations">Affiliations: <s:property value="#session.user.affiliations"/></p>
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
            <div class="risk-factor">
                <h3>Risk Factor</h3>
                <div id="risk-factor">
                    Choose a patient to view risk factor
                    <!-- <button id="add-risk-factor-btn">Add risk factor</button> -->
                </div>
            </div>
            <div class="physical-exam">
                <h3>Physical Exam</h3>
                <table id="physical-exam-table">
                    <tr>
                        <td>Choose a patient to view physical exam</td>
                    </tr>
                </table>
            </div>
            <div class="imaging">
                <h3>Imaging</h3>
                <div class="imaging-details" id="imaging-details">
                    <p>X-Ray: <span class="xray-description" data-image="">No Description</span></p>
                    <p>Ultrasonography: <span class="ultrasound-description" data-image="">No Description</span></p>
                </div>
                <div class="upload-imaging hidden">
                    <button id="show-upload-form">Upload New Imaging</button>
                    <div id="upload-form-container" style="display: none;">
                        <h4>Upload New Imaging</h4>
                        <form id="imaging-upload-form" action="<s:url action='uploadImaging'/>" method="post" enctype="multipart/form-data">
                            <label for="imaging-type">Type:</label>
                            <input type="text" id="imaging-type" name="imagingType" required>
                            <label for="imaging-description">Description:</label>
                            <input type="text" id="imaging-description" name="imagingDescription" required>
                            <label for="imaging-file">Select Image:</label>
                            <input type="file" id="imaging-file" name="imagingFile" accept="image/*" required>
                            <button type="submit">Upload</button>
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

<script src="js/patientData.js"></script>
<script src="js/profileEdit.js"></script>
<script src="js/imagingUpload.js"></script>
</body>
</html>
