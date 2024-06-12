package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;

import java.util.Map;

public class StartAction extends ActionSupport implements SessionAware {
    private Map<String, Object> session;

    @Override
    public String execute() throws Exception {
        //Authentication
        if(session == null) {
            return LOGIN;
        }
        // String username = (String) session.get("username");
        String role = (String) session.get("role");
        if (role == null){
            return LOGIN;
        }else{
            return role;
        }
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
