package it.unicas.action;

import it.unicas.dao.UserDAO;
import it.unicas.model.User;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.json.annotations.JSON;

import java.util.Map;
import java.util.Optional;

public class FetchUserAction extends ActionSupport implements SessionAware {
    private Map<String, Object> session;
    private Optional<User> user;
    private boolean loggedIn;

    @Override
    public String execute() {
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

    @JSON
    public Optional<User> getUser() {
        return user;
    }

    @JSON 
    boolean isLoggedIn() {
        return loggedIn;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
