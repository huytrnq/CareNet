<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carenet: Profile</title>
    <link rel="stylesheet" href="css/Patient.css">
    <script src="./js/patient.js"></script>
</head>
<style>
    a {
        text-decoration: none;
        color: white;
    }
</style>
<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <div class="logo-container">
                <div class="logo">CareNet</div>
                <img src="<s:url value='/IMG/CareNetLogo_1.png'/>" alt="Logo" class="small-logo">
            </div>
            <div class="list-items">
                <div class="menu"><a href="<s:url value='/userPage.jsp'/>">Profile</a></div>
                <div class="menu">Schedule Appointment</div>
                <div class="menu"><a href="<s:url value='/qaPage.jsp'/>">Q&A</a></div>
                <div class="menu"><a href="<s:url value='/aboutPage.jsp'/>">About us</a></div>
                <div class="options-container">
                    <div class="menu">Options</div>
                    <div class="dropdown-content">
                        <a class="edit" href="<s:url action='editProfile'/>">Edit</a>
                        <a class="log" href="<s:url action='logout'/>">Log Out</a>
                    </div>
                </div>
            </div>
        </header>

        <section class="profile">
            <div class="patient-profile">
                <div class="profile-header">
                    <img src="<s:url value='/IMG/huy_user.jpg'/>" alt="Profile Picture">
                    <div class="profile-info">
                        <h2><s:property value="%{#session.user.firstname}"/> <s:property value="%{#session.user.lastname}"/></h2>
                        <p>Patient Profile</p>
                    </div>
                </div>
                <div class="contact-info">
                    <p>Weight: <s:property value="%{#session.user.weight}"/> kg</p>
                    <p>Height: <s:property value="%{#session.user.height}"/> m</p>
                    <p>Occupation: <s:property value="%{#session.user.occupation}"/></p>
                </div>
            </div>
            <div class="patient-info">
                <h3>Calendar</h3>
                <table>

                </table>
            </div>
        </section>

        <section class="dashboard">
            <div class="health-summary">
                <h3>Health Summary</h3>
                <table>
                    <tr>
                        <td>Allergies</td>
                        <td><s:property value="%{#session.user.allergies}"/></td>
                    </tr>
                    <tr>
                        <td>Current Medication</td>
                        <td><s:property value="%{#session.user.currentMedication}"/></td>
                    </tr>
                    <tr>
                        <td>Genetic Conditions</td>
                        <td><s:property value="%{#session.user.geneticConditions}"/></td>
                    </tr>
                    <tr>
                        <td>Last surgery (if applicable)</td>
                        <td id="last-surgery"><s:property value="%{#session.user.lastSurgery}"/></td>
                    </tr>
                </table>
            </div>
            <div class="medical-img">
                <h3>Medical Images</h3>
                <!-- <s:if test="#session.user.images_path == null"> -->
                    <<form action="upload">
                        <input type="file" name="file" id="file" accept="image/*">
                        <button type="submit">Upload</button>
                    </form>
                <!-- </s:if>
                <s:else>
                    <img src="<s:url value='%{#session.user.images_path}'/>" alt="Medical Image">
                </s:else> -->
            </div>
            <div class="add-info">
                <h3>Additional information</h3>
                <table>
                    <tr>
                        <td>Emergency Contact</td>
                        <td><s:property value="%{#session.user.emergencyContact}"/></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><s:property value="%{#session.user.address}"/></td>
                    </tr>
                    <tr>
                        <td>Insurance</td>
                        <td><s:property value="%{#session.user.insurance}"/></td>
                    </tr>
                </table>
            </div>
        </section>
        <s:form action="uploadImage" method="post" enctype="multipart/form-data">
            <s:file label="Select an Image" name="uploadFile"/>
            <s:submit value="Upload"/>
        </s:form>
    </main>
</div>
</body>
</html>
