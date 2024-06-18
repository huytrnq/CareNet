<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar - Patient Schedule</title>
    <link rel="stylesheet" href="css/doctor.css">
    <link rel="stylesheet" href="css/calendar.css">
    <link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.9.0/main.min.css' rel='stylesheet' />
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.9.0/main.min.js'></script>
    <script>
        // Embed Struts values into JavaScript variables
        var userId = "<s:property value='%{#session.userId}'/>";

        document.addEventListener('DOMContentLoaded', function() {
            console.log("User Id: " + userId);
        });
    </script>
</head>
<body>
<div class="container">
    <main class="main-content">
        <header class="header">
            <a href="/CareNet" style="text-decoration: none;"><div class="logo"">CareNet</div></a>
            <div class="search-bar">
                <input type="text" placeholder="Search Appointments, Staffs, etc">
            </div>
            <div class="list-items">
                <div class="overview"><a href="<s:url action='doctor'/>">OVERVIEW</a></div>
                <div class="calendar"><a href="<s:url action='calendar'/>">CALENDAR</a></div>
                <div class="user-name-container">
                    <div class="user-name"><s:property value="%{#session.user.firstname}"/> <s:property value="%{#session.user.lastname}"/></div>
                    <div class="dropdown-content">
                        <a href="<s:url action='logout'/>">Log Out</a>
                    </div>
                </div>
            </div>
        </header>
        <section class="calendar-section">
            <h3>Patient Schedule</h3>
            <div id="calendar"></div>
        </section>
    </main>
</div>
<script src="js/calendar.js"></script>
</body>
</html>
