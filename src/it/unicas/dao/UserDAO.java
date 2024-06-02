package it.unicas.dao;

import it.unicas.model.User;
import it.unicas.utils.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

public class UserDAO {

    public static void addUser(User user) {
        String sql = "INSERT INTO user (username, firstname, lastname, role, gender, phone, email, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getFirstname());
            stmt.setString(3, user.getLastname());
            stmt.setString(4, user.getRole());
            stmt.setString(5, user.getGender());
            stmt.setString(6, user.getPhone());
            stmt.setString(7, user.getEmail());
            stmt.setString(8, user.getAddress());
            stmt.setString(9, user.getPassword());

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
                user.setUsername(rs.getString("username"));
                user.setFirstname(rs.getString("firstname"));
                user.setLastname(rs.getString("lastname"));
                user.setRole(rs.getString("role"));
                user.setGender(rs.getString("gender"));
                user.setPhone(rs.getString("phone"));
                user.setEmail(rs.getString("email"));
                user.setAddress(rs.getString("address"));
                user.setPassword(rs.getString("password"));
                return Optional.of(user);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }
}
