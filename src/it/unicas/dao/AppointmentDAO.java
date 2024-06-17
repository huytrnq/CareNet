package it.unicas.dao;

import it.unicas.model.User;
import it.unicas.model.Appointment;
import it.unicas.utils.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Optional;
import java.text.ParseException;

public class AppointmentDAO {


    public static boolean deleteAppointment(String patientId, String doctorId) {
        return true;
    }

    public static boolean createAppointment(String patientId, String doctorId, String eventTitle, String eventDate, String eventTime) {
        java.util.Date date = convertStringToDate(eventDate);
        java.util.Date time = convertStringToTime(eventTime);
        String sql = "INSERT INTO appointment (patient_id, doctor_id, date, time, status, title) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, patientId);
            stmt.setString(2, doctorId);
            stmt.setDate(3, new java.sql.Date(date.getTime()));
            stmt.setTime(4, new java.sql.Time(time.getTime()));
            stmt.setString(5, "scheduled");
            stmt.setString(6, eventTitle);
            stmt.executeUpdate();
            stmt.close();
            conn.close();
            System.out.println("Appointment created successfully");
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static java.util.Date convertStringToDate(String dateStr) {
        String[] dateFormats = {"dd/MM/yy", "yyyy-MM-dd", "MM/dd/yyyy"};
        for (String format : dateFormats) {
            SimpleDateFormat formatter = new SimpleDateFormat(format);
            try {
                return formatter.parse(dateStr);
            } catch (ParseException e) {
                // Log the exception or handle it if necessary
                // Continue to the next format
            }
        }
        System.out.println("Date format not supported: " + dateStr);
        return null; // or throw an exception if no format matched
    }

    public static java.util.Date convertStringToTime(String timeStr) {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
        try {
            return formatter.parse(timeStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

}
