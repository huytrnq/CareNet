package it.unicas.action;
import it.unicas.dao.AppointmentDAO;
import it.unicas.dao.MedicalInfoDAO;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.io.IOException;
import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.SQLException;

public class SessionDataAction extends ActionSupport implements SessionAware {
    private Map<String, Object> session;
    private static final String DB_URL = "jdbc:mysql://localhost:3306/CareNet";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "Huytr1997";


    @Override
    public String execute() {
        JSONObject json = new JSONObject();
        
        try {

            String patientId = ServletActionContext.getRequest().getParameter("patientId");
            if (patientId != null) {
                // Fetch the patient data
                JSONObject patient = getPatientById(Integer.parseInt(patientId));
                json.put("patient", patient);
            }else if(ServletActionContext.getRequest().getParameter("doctors") != null){
                // Fetch all doctors
                JSONArray doctors = getDoctors();
                json.put("doctors", doctors);
            }else if(ServletActionContext.getRequest().getParameter("doctor") != null){
                // Fetch the doctor data
                String doctorUsername = ServletActionContext.getRequest().getParameter("doctor");
                JSONObject doctor = getDoctorByUserName(doctorUsername);
                json.put("doctor", doctor);
            }else if(ServletActionContext.getRequest().getParameter("appointment") != null){
                // Fetch the appointment data
                String appointment = ServletActionContext.getRequest().getParameter("appointment");
                String doctorId = ServletActionContext.getRequest().getParameter("doctorId");
                JSONArray appointments = getAppointmentsByDoctor(doctorId);
                json.put("appointments", appointments);
            }else{
                // Get the currently logged-in doctor from the session
                String doctorUsername = (String) session.get("username");
                
                // Fetch all patients who have appointments with the current doctor
                JSONArray patients = getPatientsByDoctor(doctorUsername);
                json.put("patients", patients);
            }

            // Return JSON response
            HttpServletResponse response = ServletActionContext.getResponse();
            response.setContentType("application/json");
            response.getWriter().write(json.toString());
            response.getWriter().flush();
            response.getWriter().close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return NONE; // No result page needed
    }

    private JSONArray getDoctors() throws Exception {
        JSONArray doctors = new JSONArray();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "SELECT * FROM user WHERE role = 'doctor'";
            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        JSONObject doctor = new JSONObject();
                        doctor.put("username", rs.getString("username"));
                        doctor.put("firstname", rs.getString("firstname"));
                        doctor.put("lastname", rs.getString("lastname"));
                        doctor.put("id", rs.getInt("id"));
                        doctor.put("specialization", rs.getString("occupation"));
                        doctor.put("address", rs.getString("address"));
                        doctor.put("phone", rs.getString("phone"));
                        doctors.put(doctor);
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return doctors;
    }

    private JSONObject getDoctorByUserName(String username) throws Exception {
        JSONObject doctor = new JSONObject();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "SELECT * FROM user WHERE username = ?";
            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, username);
                try (ResultSet rs = stmt.executeQuery()) {
                    rs.next();
                    doctor.put("username", rs.getString("username"));
                    doctor.put("firstname", rs.getString("firstname"));
                    doctor.put("lastname", rs.getString("lastname"));
                    doctor.put("license_number", rs.getString("license_number"));
                    doctor.put("address", rs.getString("address"));
                    doctor.put("expiry_date", rs.getString("expiry_date"));
                    doctor.put("affiliations", rs.getString("affiliations"));
                    doctor.put("occupation", rs.getString("occupation"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return doctor;
    }

    private JSONArray getPatientsByDoctor(String doctorUsername) throws Exception {
        JSONArray patients = new JSONArray();
        
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "SELECT p.username, p.firstname, p.lastname, p.date_of_birth, a.status, p.id, m.insurance " +
                        "FROM user d " +
                        "JOIN appointment a ON d.id = a.doctor_id " +
                        "JOIN user p ON a.patient_id = p.id " +
                        "JOIN medical_info m ON p.id = m.user_id " +
                        "WHERE d.username = ?";

            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, doctorUsername);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        JSONObject patient = new JSONObject();
                        patient.put("username", rs.getString("p.username"));
                        patient.put("firstname", rs.getString("p.firstname"));
                        patient.put("lastname", rs.getString("p.lastname"));
                        patient.put("status", rs.getString("a.status"));
                        patient.put("id", rs.getInt("p.id"));
                        patient.put("insurance", rs.getString("m.insurance"));
                        patient.put("dateOfBirth", rs.getDate("p.date_of_birth"));
                        patients.put(patient);
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return patients;
    }

    private JSONObject getPatientById(int patientId) throws Exception {
        JSONObject patient = new JSONObject();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            // Check if the patient has a medical info
            if (MedicalInfoDAO.findMedicalInfo(String.valueOf(patientId))) {
                String query = "SELECT * FROM user JOIN medical_info m ON user.id = m.user_id WHERE user.id = ?";
                try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setInt(1, patientId);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) { // Check if ResultSet has at least one row
                        patient.put("username", rs.getString("username"));
                        patient.put("allergies", rs.getString("allergies"));
                        patient.put("last_surgery", rs.getString("last_surgery"));
                        patient.put("blood_pressure", rs.getString("blood_pressure"));
                        patient.put("pulse", rs.getString("pulse"));
                        patient.put("abdomen", rs.getString("abdomen"));
                        patient.put("xray_path", rs.getString("xray_path"));
                        patient.put("ultrasound_path", rs.getString("ultrasound_path"));
                        patient.put("date_of_birth", rs.getDate("date_of_birth"));
                        patient.put("gender", rs.getString("gender"));
                        patient.put("occupation", rs.getString("occupation"));
                        patient.put("address", rs.getString("address"));
                        patient.put("genetic_conditions", rs.getString("genetic_conditions"));
                        patient.put("current_medication", rs.getString("current_medication"));
                        patient.put("weight", rs.getString("weight"));
                        patient.put("height", rs.getString("height"));
                        patient.put("insurance", rs.getString("insurance"));
                    } else {
                    // Handle case where no data is found
                        patient.put("error", "No patient found with the specified ID.");
                        }
                    }
                }
            } else {
                String query = "SELECT * FROM user WHERE id = ?";
                try (PreparedStatement stmt = conn.prepareStatement(query)) {
                    stmt.setInt(1, patientId);
                    try (ResultSet rs = stmt.executeQuery()) {
                        if (rs.next()) {
                            patient.put("username", rs.getString("username"));
                            patient.put("firstname", rs.getString("firstname"));
                            patient.put("lastname", rs.getString("lastname"));
                            patient.put("date_of_birth", rs.getDate("date_of_birth"));
                            patient.put("gender", rs.getString("gender"));
                            patient.put("occupation", rs.getString("occupation"));
                            patient.put("address", rs.getString("address"));
                        } else {
                            patient.put("error", "No patient found with the specified ID.");
                        }
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return patient;
    }

    private JSONArray getAppointmentsByDoctor(String doctorId) throws Exception {
        JSONArray appointments = new JSONArray();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "SELECT * FROM appointment WHERE doctor_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, doctorId);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        JSONObject appointment = new JSONObject();
                        appointment.put("id", rs.getString("id"));
                        appointment.put("patient_id", rs.getString("patient_id"));
                        appointment.put("doctor_id", rs.getString("doctor_id"));
                        appointment.put("event_date", rs.getString("date"));
                        appointment.put("event_time", rs.getString("time"));
                        appointment.put("status", rs.getString("status"));
                        appointment.put("event_title", rs.getString("title"));
                        appointments.put(appointment);
                    }
                }
            }
        }
        return appointments;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
