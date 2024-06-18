package it.unicas.action;

import it.unicas.dao.UserDAO;
import it.unicas.model.User;

import java.util.Map;
import java.util.Optional;

import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date; 
import java.text.ParseException;
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
        Optional<User> user = UserDAO.findByUsername(username);
        if (user.get().getRole().equals("patient")) {
            String birthday = ServletActionContext.getRequest().getParameter("birthday");
            String gender = ServletActionContext.getRequest().getParameter("gender");
            String occupation = ServletActionContext.getRequest().getParameter("occupation");
            String address = ServletActionContext.getRequest().getParameter("address");
            if (UserDAO.updateFields(username, new String[] {"date_of_birth", "gender", "occupation", "address"}, new String[] {birthday, gender, occupation, address})) {
                status = "success";
            } else {
                status = "error";
            }
        }
        else{
            String address = ServletActionContext.getRequest().getParameter("address");
            String affiliations = ServletActionContext.getRequest().getParameter("affiliations");
            String expiryDateString = ServletActionContext.getRequest().getParameter("expiry_date");
            String licenseNumber = ServletActionContext.getRequest().getParameter("license_number");
            String occupation = ServletActionContext.getRequest().getParameter("occupation");
            if (UserDAO.updateFields(username, new String[] {"address", "affiliations", "expiry_date", "license_number", "occupation"}, new String[] {address, affiliations, expiryDateString, licenseNumber, occupation})) {
                status = "success";
            } else {
                status = "error";
            }
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

    public static Date String2Date(String date) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yy");
        try {
            Date parsedDate = formatter.parse(date);
            return parsedDate;
        } catch (ParseException e) {
            e.printStackTrace();
            return null; // or handle more appropriately depending on your use case
        }
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
