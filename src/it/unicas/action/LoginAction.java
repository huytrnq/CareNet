package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;

import it.unicas.dao.LoginDAO;

public class LoginAction extends ActionSupport {
    private String username;
    private String password;

    // Getters and setters for username and password
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

    @Override
    public String execute() {
        boolean status = LoginDAO.validate(username, password);
        if (!status) {
            return INPUT;
        }
        return SUCCESS;
    }
}