package it.unicas.action;

import it.unicas.dao.UserDAO;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.json.annotations.JSON;
import org.apache.struts2.interceptor.SessionAware;

public class UpdateUserInfo extends ActionSupport implements SessionAware {

    private Map<String, Object> session;
    private String status;

    @Override
    public String execute() {
        String username = (String) session.get("username");
        String licenseNumber = ServletActionContext.getRequest().getParameter("license_number");
        String expiryDateString = ServletActionContext.getRequest().getParameter("expiry_date");
        String address = ServletActionContext.getRequest().getParameter("address");
        String affiliations = ServletActionContext.getRequest().getParameter("affiliations");
        if (UserDAO.updateFields(username, new String[] {"address", "affiliations", "expiry_date", "license_number"}, new String[] {address, affiliations, expiryDateString, licenseNumber})) {
            status = "success";
        } else {
            status = "error";
        }

        //Return status success or error
        HttpServletResponse response = ServletActionContext.getResponse();
        try {
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":\"" + status + "\"}");
            response.getWriter().flush();
            response.getWriter().close();
        } catch (IOException e) {
            // Handle the exception, e.g., log it or handle differently
            e.printStackTrace();
        }
        return NONE;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
