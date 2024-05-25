package it.unicas.action;

import it.unicas.model.User;
import it.unicas.dao.UserDAO;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;
import java.util.Map;
import java.util.Optional;

public class UserAction extends ActionSupport implements SessionAware {
    private User user;
    private UserDAO userDAO;
    private Map<String, Object> session;

    public UserAction() {
        userDAO = new UserDAO();
    }

    public String register() {
        userDAO.save(user);
        return SUCCESS;
    }

    public String login() {
        Optional<User> existingUser = userDAO.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            session.put("user", existingUser.get());
            return SUCCESS;
        }
        addActionError("Invalid username or password");
        return ERROR;
    }

    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
