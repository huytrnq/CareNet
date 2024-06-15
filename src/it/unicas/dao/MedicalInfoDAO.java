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
}
