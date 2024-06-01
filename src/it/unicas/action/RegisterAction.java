package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;


public class RegisterAction extends ActionSupport{
    private String username;
    private String password;
    private String role;

    public String execute() throws Exception {
        // Check if user data is correctly set
        System.out.println("Registering user with the following data:");
        // System.out.println("Username: " + username);
        // System.out.println("Password: " + password);
        // System.out.println("Role: " + role);

        return SUCCESS;
    }

    // Getters and Setters for username, password, and role
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
