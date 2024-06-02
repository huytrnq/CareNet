package it.unicas.action;
import it.unicas.dao.LoginDAO;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;

import java.util.Map;

public class LoginAction extends ActionSupport implements SessionAware{
    private String username;
    private String password;
    private Map<String, Object> session;

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
            session.put("error", "Invalid username or password");
            return LOGIN;
        } else {
            session.remove("error");
            session.put("username", username);
            return SUCCESS;
        }
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}