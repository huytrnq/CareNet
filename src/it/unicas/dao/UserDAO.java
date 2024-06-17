package it.unicas.dao;

import it.unicas.model.User;
import it.unicas.utils.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

public class UserDAO {

    public static void addUser(User user) {
        String sql = """
                    INSERT INTO user (username, firstname, lastname, role, 
                    gender, phone, email, address, password, occupation, license_number, expiry_date, date_of_birth, affiliations, profile_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """;

        try (Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql)) {

            // id, username, firstname, lastname, role, gender, phone, email, address, password, weight, height, occupation, allergies, current_medication, genetic_conditions, last_surgery, emergency_contact, insurance
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getFirstname());
            stmt.setString(3, user.getLastname());
            stmt.setString(4, user.getRole());
            stmt.setString(5, user.getGender());
            stmt.setString(6, user.getPhone());
            stmt.setString(7, user.getEmail());
            stmt.setString(8, user.getAddress());
            stmt.setString(9, user.getPassword());
            stmt.setString(10, user.getOccupation());
            stmt.setString(11, user.getLicenseNumber());
            stmt.setDate(12, user.getExpiryDate());
            stmt.setDate(13, user.getDateOfBirth());
            stmt.setString(14, user.getAffiliations());
            stmt.setString(15,  "default_user.png");

            stmt.executeUpdate();

            System.out.println("User " + user.getUsername() + " added successfully");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Optional<User> findByUsername(String username) {
        String sql = "SELECT * FROM user WHERE username = ?";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setFirstname(rs.getString("firstname"));
                user.setLastname(rs.getString("lastname"));
                user.setRole(rs.getString("role"));
                user.setGender(rs.getString("gender"));
                user.setPhone(rs.getString("phone"));
                user.setEmail(rs.getString("email"));
                user.setAddress(rs.getString("address"));
                user.setOccupation(rs.getString("occupation"));
                user.setLicenseNumber(rs.getString("license_number"));
                user.setExpiryDate(rs.getDate("expiry_date"));
                user.setAffiliations(rs.getString("affiliations"));
                user.setProfilePath(rs.getString("profile_path"));
                user.setDateOfBirth(rs.getDate("date_of_birth"));

                System.out.println("User " + username + " found");
                return Optional.of(user);
            }
            System.out.println("User " + username + " not found");
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    public static Optional<User> findByUserId(int user_id) {
        String sql = "SELECT * FROM user WHERE id = ?";
        try (Connection conn = DBUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, user_id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                if (rs.next()) {
                    User user = new User();
                    user.setUsername(rs.getString("username"));
                    user.setFirstname(rs.getString("firstname"));
                    user.setLastname(rs.getString("lastname"));
                    user.setRole(rs.getString("role"));
                    user.setGender(rs.getString("gender"));
                    user.setPhone(rs.getString("phone"));
                    user.setEmail(rs.getString("email"));
                    user.setAddress(rs.getString("address"));
                    user.setOccupation(rs.getString("occupation"));
                    user.setLicenseNumber(rs.getString("license_number"));
                    user.setExpiryDate(rs.getDate("expiry_date"));
                    user.setAffiliations(rs.getString("affiliations"));
                    user.setProfilePath(rs.getString("profile_path"));
                    user.setDateOfBirth(rs.getDate("date_of_birth"));
    
                    System.out.println("User " + user_id + " found");
                    return Optional.of(user);
                }
                System.out.println("User " + user_id + " not found");
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public String getPasswordHash(String username) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            conn = DBUtil.getConnection();
            String sql = "SELECT password FROM user WHERE username = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);
            rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getString("password");
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            assert conn != null;
            conn.close();
        }
    }

    public static boolean UpdateField(String username, String field, String value){
        String sql = "UPDATE user SET " + field + " = ? WHERE username = ?";

        try (Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            if (field.equals("expiry_date") || field.equals("date_of_birth")) {
                java.util.Date expiryDate = convertStringToDate(value);
                stmt.setDate(1, new java.sql.Date(expiryDate.getTime()));
            } else {
                stmt.setString(1, value);
            }
            stmt.setString(2, username);

            stmt.executeUpdate();

            System.out.println("Field " + field + " updated successfully for user " + username);

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public static boolean updateFields(String username, String[] fields, String[] values){
        for (int i = 0; i < fields.length; i++) {
            if (!UpdateField(username, fields[i], values[i])){
                return false;
            }
        }
        return true;
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

    public static String getProfilePath(String username){
        return findByUsername(username).get().getProfilePath();
    }
    
    // public static void UserWithMeicalInfo(String username){
    //     String sql = "SELECT * FROM user WHERE username = ?";
    //     try (Connection conn = DBUtil.getConnection();
    //             PreparedStatement stmt = conn.prepareStatement(sql)) {

    //     }
    //     catch (SQLException e) {
    //         e.printStackTrace();
    //     }
    // }
}
