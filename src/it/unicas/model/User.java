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
    private double weight;
    private double height;
    private String occupation;
    private String licenseNumber;
    private java.sql.Date expiryDate;
    private java.sql.Date dateOfBirth;
    private String affiliations;
    private String profilePath;

    public User() {
        // Auto generated construction - Empty now. Filled if needed
    }

    public User(String username, String firstname, String lastname, String role, String gender, String phone, String email, String address, String password) {
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


    public User(String username, String firstname, String lastname, String role, String gender, String phone, String email, String address, String password,
                String licenseNumber, java.sql.Date expiryDate, java.sql.Date dateOfBirth, String affiliations, String profilePath) {
        super();
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.address = address;
        this.licenseNumber = licenseNumber;
        this.expiryDate = expiryDate;
        this.dateOfBirth = dateOfBirth;
        this.affiliations = affiliations;
        this.profilePath = profilePath;

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

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public java.sql.Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(java.sql.Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public java.sql.Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(java.sql.Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAffiliations() {
        return affiliations;
    }

    public void setAffiliations(String affiliations) {
        this.affiliations = affiliations;
    }

    public String getProfilePath() {
        return profilePath;
    }

    public void setProfilePath(String profilePath) {
        this.profilePath = profilePath;
    }
}
