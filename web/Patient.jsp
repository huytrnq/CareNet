<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carenet: Profile</title>
    <link rel="stylesheet" href="css/Patient.css">
</head>
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
                        <h2><s:property value="%{#session.username}"/></h2>
                        <p>Patient Profile</p>
                    </div>
                </div>
                <div class="contact-info">
                    <p>Age: 26</p>
                    <p>Weight: 64 kg</p>
                    <p>Height: 1.72 m</p>
                    <p>Occupation: Software Developer</p>
                </div>
                <!-- <div class="edit-info">
                    <button>Edit information</button>
                </div> -->
            </div>
            <div class="patient-info">
                <h3>Calendar</h3>
                <table>
                    <tr>
                        <td>Patient Name</td>
                        <td>Patient ID</td>
                    </tr>
                    <tr>
                        <td>Mr. Lorem Ipsum</td>
                        <td>AHDUHIWSJFCD</td>
                    </tr>
                    <tr>
                        <td>Mr. Lorem Ipsum</td>
                        <td>AHDUHIWSJFCD</td>
                    </tr>
                    <tr>
                        <td>Mr. Lorem Ipsum</td>
                        <td>AHDUHIWSJFCD</td>
                    </tr>
                    <tr>
                        <td>Mr. Lorem Ipsum</td>
                        <td>AHDUHIWSJFCD</td>
                    </tr>
                    <tr>
                        <td>Mr. Lorem Ipsum</td>
                        <td>AHDUHIWSJFCD</td>
                    </tr>
                    <tr>
                        <td>Mr. Lorem Ipsum</td>
                        <td>AHDUHIWSJFCD</td>
                    </tr>
                </table>
            </div>
        </section>

        <section class="dashboard">
            <div class="health-summary">
                <h3>Health Summary</h3>
                <table>
                    <tr>
                        <td>Allergies</td>
                        <td>Pollen</td>
                    </tr>
                    <tr>
                        <td>Current Medication</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>Genetic Conditions</td>
                        <td>Asthma</td>
                    </tr>
                    <tr>
                        <td>Last surgery (if applicable)</td>
                        <td>None</td>
                    </tr>
                </table>
            </div>
            <div class="medical-img">
                <h3>Medical Images</h3>
                <div class="no-img">
                    <p>No images added</p>
                    <button>Add diagnosis</button>
                </div>
            </div>
            <div class="add-info">
                <h3>Additional information</h3>
                <table>
                    <tr>
                        <td>Emergency Contact</td>
                        <td>+35 785 7845</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>Via Luca Girodonio numero 7</td>
                    </tr>
                    <tr>
                        <td>Insurance</td>
                        <td>Maladie Health Insurance</td>
                    </tr>
                </table>
            </div>
        </section>
    </main>
</div>
</body>
</html>
