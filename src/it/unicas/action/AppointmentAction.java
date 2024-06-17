package it.unicas.action;

import it.unicas.dao.AppointmentDAO;
import it.unicas.model.Appointment;

import java.util.Map;
import java.util.Optional;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class AppointmentAction extends ActionSupport implements SessionAware {
    private Map<String, Object> session;
    private String doctorId;
    private String eventTitle;
    private String eventDate;
    private String eventTime;

    @Override
    public String execute() {
        String patientId = (String) session.get("userId");

        if(doctorId != null && eventTitle != null && eventDate != null && eventTime != null) {
            if (AppointmentDAO.findAppointment(patientId, doctorId, eventDate, eventTime)) {
                System.out.println("Appointment already exists: " + doctorId + " " + eventTitle + " " + eventDate + " " + eventTime);
                return ERROR;
            }
            boolean result = AppointmentDAO.createAppointment(patientId, doctorId, eventTitle, eventDate, eventTime);
            if(result) {
                System.out.println("Appointment created successfully: " + doctorId + " " + eventTitle + " " + eventDate + " " + eventTime);
            }
        }
        return SUCCESS;
    }

    public String getDoctorId() {
        return doctorId;
    }
    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getEventTitle() {
        return eventTitle;
    }
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventDate() {
        return eventDate;
    }
    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventTime() {
        return eventTime;
    }
    public void setEventTime(String eventTime) {
        this.eventTime = eventTime;
    }


    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
