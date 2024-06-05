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
        String username = (String) session.get("username");
        if (username == null){
            return LOGIN;
        }else{
            return "patient";
        }
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
