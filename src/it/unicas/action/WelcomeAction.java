package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;

public class WelcomeAction extends ActionSupport {
    @Override
    public String execute() {
        System.out.println("============ Welcome to the application ============");
        return SUCCESS;
    }
}
