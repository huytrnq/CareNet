package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;

import it.unicas.model.User;
import it.unicas.dao.UserDAO;

import org.apache.struts2.interceptor.SessionAware;

import java.util.Optional;
import java.util.Map;

public class CalendarAction extends ActionSupport implements SessionAware {
    private Map<String, Object> session;
    private Optional<User> user;

    @Override
    public String execute() throws Exception {
        // Authentication
        if (session != null && session.containsKey("username")) {
            String username = (String) session.get("username");
            user = UserDAO.findByUsername(username);
            if (user.isPresent()) {
                return SUCCESS;
            } else {
                return LOGIN;
            }
        } else {
            return LOGIN;
        }
    }

    // Getters for user property
    public Optional<User> getUser() {
        return user;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
