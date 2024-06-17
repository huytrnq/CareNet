<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar - Patient Schedule</title>
    <link rel="stylesheet" href="css/schedule.css">
    <link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.9.0/main.min.css' rel='stylesheet' />
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.9.0/main.min.js'></script>
    <script>
        var urlParams = new URLSearchParams(window.location.search);
        var doctorId = urlParams.get('doctorId');
        var patientId = urlParams.get('patientId');
    </script>
</head>
<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <div class="logo">CareNet</div>
            <div class="list-items">
                <div class="overview"><a href="/CareNet/patient">Profile</a></div>
                <div class="overview"><a href="qaPage.html">Q&A</a></div>
                <div class="user-name-container">
                    <div class="user-name"><s:property value="#session.user.firstname"/> <s:property value="#session.user.lastname"/></div>
                    <div class="dropdown-content">
                        <a href="<s:url action='logout'/>">Log Out</a>
                    </div>
                </div>
            </div>
        </header>
        <section class="calendar-section">
            <h3>Doctor Schedule</h3>
            <div id="calendar"></div>
        </section>
    </main>
</div>

<!-- Modal -->
<div id="event-modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <form id="event-form" method="post">
            <input type="hidden" name="doctorId" id="doctorId">
            <label for="eventTitle">Reason of appointment (sickness):</label>
            <input type="text" name="eventTitle" id="eventTitle" required>
            <label for="eventDate">Date:</label>
            <input type="date" name="eventDate" id="eventDate" required>
            <label for="eventTime">Time:</label>
            <input type="time" name="eventTime" id="eventTime" required>
            <button type="submit" onclick="addEvent()">Add Event</button>
        </form>
    </div>
</div>

<script src="js/schedule.js"></script>
</body>
</html>
