package it.unicas.dao;
import it.unicas.utils.DBUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.mindrot.jbcrypt.BCrypt;

public class LoginDAO {
    public static boolean validate(String username, String password) {
        boolean status = false;
        try {
            Connection con = DBUtil.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from user where username = '" + username + "'");
            if (rs.next()) {
                String hashedPassword = rs.getString("password");
                status = BCrypt.checkpw(password, hashedPassword);
            }
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return status;
    }
}
