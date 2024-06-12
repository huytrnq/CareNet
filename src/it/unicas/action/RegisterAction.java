package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;
import it.unicas.model.User;
import it.unicas.dao.UserDAO;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;
import java.util.Map;

public class RegisterAction extends ActionSupport implements SessionAware{
    private String username;
    private String firstname;
    private String lastname;
    private String role;
    private String phone;
    private String gender;
    private String email;
    private String address;
    private String password;
    private Map<String, Object> session;

    public String execute() throws Exception {
        // Check if user data is correctly set
        User user = new User(username, firstname, lastname, role, gender, phone, email, address, password);   
        System.out.println("============ Registering user: " + user.toString() + " ============");
        System.out.println("Username: " + username);
        System.out.println("Firstname: " + firstname);
        System.out.println("Lastname: " + lastname);
        System.out.println("Role: " + role);
        System.out.println("Phone: " + phone);
        System.out.println("Gender: " + gender);
        System.out.println("Email: " + email);
        System.out.println("Address: " + address); 

        
        Optional<User> existingUser = UserDAO.findByUsername(username);
        if (existingUser.isPresent()) {
            System.out.println("User " + username + " already exists");
            session.put("error", "User " + username + " already exists");
            return ERROR;
        }else{
            if(user.getUsername() == null || user.getUsername().isEmpty()){
                return SUCCESS;
            }
            session.remove("error");
            // String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            user.setPassword(password);
            UserDAO.addUser(user);
            return SUCCESS;
        }
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    // Getters and Setters for username, password, and role
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname(String firstname) {
        return firstname; 
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname(String lastname) {
        return lastname; 
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getRole(String role) {
        return role; 
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone(String phone) {
        return phone; 
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
}
