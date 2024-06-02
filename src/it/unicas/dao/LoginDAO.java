package it.unicas.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import it.unicas.utils.DBUtil;

public class LoginDAO {
    public static boolean validate(String username, String password) {
        boolean status = false;
        try {
            Connection con = DBUtil.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from user where username = '" + username + "' and password = '" + password + "'");
            status = rs.next();
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return status;
    }
}
