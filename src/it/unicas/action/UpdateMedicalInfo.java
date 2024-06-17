package it.unicas.action;

import it.unicas.dao.MedicalInfoDAO;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.json.annotations.JSON;
import org.apache.struts2.interceptor.SessionAware;

public class UpdateMedicalInfo extends ActionSupport implements SessionAware {

    private Map<String, Object> session;
    private String status;

    @Override
    public String execute() {
        String patientId = ServletActionContext.getRequest().getParameter("patientId");
        String height = ServletActionContext.getRequest().getParameter("height");
        String weight = ServletActionContext.getRequest().getParameter("weight");
        String abdomen = ServletActionContext.getRequest().getParameter("abdomen");
        String pulse = ServletActionContext.getRequest().getParameter("pulse");
        String blood_pressure = ServletActionContext.getRequest().getParameter("blood_pressure");
        String heart = ServletActionContext.getRequest().getParameter("heart");
        String allergies = ServletActionContext.getRequest().getParameter("allergies");
        String last_surgery = ServletActionContext.getRequest().getParameter("last_surgery");
        String current_medication = ServletActionContext.getRequest().getParameter("current_medication");
        String genetic_conditions = ServletActionContext.getRequest().getParameter("genetic_conditions");
        if (MedicalInfoDAO.updateFields(patientId, new String[] {"height", "weight", "abdomen", "pulse", "blood_pressure", "heart", "allergies", "last_surgery", "current_medication", "genetic_conditions"}, new String[] {height, weight, abdomen, pulse, blood_pressure, heart, allergies, last_surgery, current_medication, genetic_conditions})) {
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
