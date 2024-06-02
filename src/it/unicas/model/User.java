package it.unicas.model;

public class User {
    private String username;
    private String firstname;
    private String lastname;
    private String role;
    private String gender;
    private String phone;
    private String email;
    private String address;
    private String password;

    public enum Role {
        DOCTOR, PATIENT
    }

    public User(){
        // Auto generated construction - Empty now. Filled if needed
    }

    public User(String username, String firstname, String lastname, String role, String gender, String phone, String email, String address, String password) {
        super();
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender){
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address){
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
