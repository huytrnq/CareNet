package it.unicas.dao;

import it.unicas.model.User;
import it.unicas.utils.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Optional;
import java.text.ParseException;

public class MedicalInfoDAO {

    public static boolean updatedField(String patientId, String field, String value) {
        String sql = "UPDATE medical_info SET " + field + " = ? WHERE user_id = ?";
        try {
            Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, value);
            stmt.setString(2, patientId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean updateFields(String patientId, String[] fields, String[] values) {
        for (int i = 0; i < fields.length; i++) {
            if (!updatedField(patientId, fields[i], values[i])) {
                return false;
            }
        }
        return true;
    }

    public static boolean findMedicalInfo(String patientId) {
        String sql = "SELECT * FROM medical_info WHERE user_id = ?";
        try {
            Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, patientId);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean createMedicalInfo(String patientId, String height, String weight, String abdomen, String pulse, String blood_pressure, String allergies, String last_surgery, String current_medication, String genetic_conditions, String insurance, String xray_path, String ultrasound_path) {
        String sql = "INSERT INTO medical_info (user_id, height, weight, abdomen, pulse, blood_pressure, allergies, last_surgery, current_medication, genetic_conditions, insurance, xray_path, ultrasound_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, patientId);
            stmt.setString(2, height);
            stmt.setString(3, weight);
            stmt.setString(4, abdomen);
            stmt.setString(5, pulse);
            stmt.setString(6, blood_pressure);
            stmt.setString(7, allergies);
            stmt.setString(8, last_surgery);
            stmt.setString(9, current_medication);
            stmt.setString(10, genetic_conditions);
            stmt.setString(11, insurance);
            stmt.setString(12, xray_path);
            stmt.setString(13, ultrasound_path);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
