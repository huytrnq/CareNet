package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;
import it.unicas.dao.UserDAO;
import it.unicas.model.User;

public class LoginAction extends ActionSupport {
    private String username;
    private String password;
    private User user;
    private UserDAO userDAO;

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
        // Add login logic here (e.g., validate credentials)
//        Optional<User> existingUser = userDAO.findByUsername(user.getUsername());
//        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
//            return SUCCESS;
//        }
//        addActionError("Invalid username or password");
//        return ERROR;    }
        System.out.println("Login action started");
        return SUCCESS;
    }
}