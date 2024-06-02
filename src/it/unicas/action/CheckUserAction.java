package it.unicas.action;

import it.unicas.dao.UserDAO;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.json.annotations.JSON;

public class CheckUserAction extends ActionSupport {
    private String username;
    private boolean userExists;

    @Override
    public String execute() {
        userExists = UserDAO.findByUsername(username).isPresent();
        return SUCCESS;
    }

    @JSON
    public boolean isUserExists() {
        return userExists;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
